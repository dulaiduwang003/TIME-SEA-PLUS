package com.cn.bdth.net;

import cn.dev33.satoken.stp.StpUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cn.bdth.common.ChatGptCommon;
import com.cn.bdth.common.ControlCommon;
import com.cn.bdth.constants.AiTypeConstant;
import com.cn.bdth.constants.WeChatConstant;
import com.cn.bdth.dto.GptMiniDto;
import com.cn.bdth.entity.SysLog;
import com.cn.bdth.exceptions.CloseException;
import com.cn.bdth.exceptions.DrawingException;
import com.cn.bdth.exceptions.ExceptionMessages;
import com.cn.bdth.exceptions.FrequencyException;
import com.cn.bdth.mapper.SysLogMapper;
import com.cn.bdth.model.GptModel;
import com.cn.bdth.service.GptService;
import com.cn.bdth.structure.ControlStructure;
import com.cn.bdth.utils.ChatUtils;
import com.cn.bdth.utils.SpringContextUtil;
import com.cn.bdth.utils.UserUtils;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicBoolean;


/**
 * 长连接响应. (标准)
 *
 * @author bdth
 */
@Slf4j
@ServerEndpoint("/gpt/api/{token}/{model}")
@SuppressWarnings("all")
@Service
public class MiniGptWss {

    private Session session;
    private static ChatUtils chatUtils;
    private static GptService gptService;
    private static ChatGptCommon chatGptCommon;
    private static ControlCommon controlCommon;
    private static SysLogMapper sysLogMapper;

    AtomicBoolean isColse = new AtomicBoolean(true);

    /**
     * On open.
     *
     * @param session the session
     */
    @OnOpen
    public void onOpen(final Session session, @PathParam("token") final String token) {
        try {
            assert session.getId() != null;
            assert StpUtil.getLoginIdByToken(token) != null;
        } catch (Exception e) {
            log.warn("无法获取到建立连接数据,已拒绝连接");
            return;
        }
        this.session = session;
        if (gptService == null) {
            initDependencies();
        }
    }

    private void initDependencies() {
        chatUtils = (ChatUtils) SpringContextUtil.getBean("chatUtils");
        gptService = (GptService) SpringContextUtil.getBean("gptServiceImpl");
        chatGptCommon = (ChatGptCommon) SpringContextUtil.getBean("chatGptCommon");
        controlCommon = (ControlCommon) SpringContextUtil.getBean("controlCommon");
        sysLogMapper = (SysLogMapper) SpringContextUtil.getBean("sysLogMapper");
    }

    /**
     * 发送消息
     *
     * @param messages 请求体数据
     * @param type     执行类型
     * @param token    用户token
     */
    @OnMessage
    public void onMessage(final String messages, @PathParam("token") final String token, @PathParam("model") final String model) {
        try {
            final GptMiniDto gptMiniDto = JSONObject.parseObject(messages, GptMiniDto.class);
            //校验用户次数
            final Long userId = UserUtils.getLoginIdByToken(token);
            //更新用户最后操作时间
            chatUtils.lastOperationTime(userId);

            final ChatGptCommon.ChatGptStructure chatGptStructure = chatGptCommon.getChatGptStructure();

            final GptModel gptModel = chatUtils.conversionStructure(gptMiniDto);

            //每次存最后一条的 user 提问信息
            GptModel.Messages lastMessage = gptModel.getMessages().get(gptModel.getMessages().size()-1);
            lastMessage.getContent();
            sysLogMapper.insert(new SysLog()
                    .setMethod("com.cn.bdth.net.WebGptWss.onMessage")
                    .setLogContent("gpt对话-app")
                    .setRequestParam(lastMessage.getContent())
                    .setUserId(userId));

            final String s = chatUtils.drawingCueWord(gptModel.getMessages());
            if (s == null) {

                final ControlStructure control = controlCommon.getControl();

//                final boolean isAdvancedModel = AiTypeConstant.ADVANCED.equals(model);
                final boolean isAdvancedModel = false;
                final boolean isAzure = true;

                final Long frequency = control.getEnableGptPlus() ? (isAdvancedModel ? chatGptStructure.getGptPlusFrequency() : chatGptStructure.getGptFrequency()) : chatGptStructure.getGptFrequency();

                chatUtils.deplete(frequency, userId);

                final StringBuilder builder = new StringBuilder(500);

                gptService.concatenationGpt(gptModel, isAzure, chatGptStructure)
                        .doFinally(signal -> handleWebSocketCompletion())
                        .subscribe(data -> {
                            if (JSON.isValid(data)) {
                                JSONObject jsonObject = JSONObject.parseObject(data);
                                JSONArray choices = jsonObject.getJSONArray("choices");
                                if (choices != null && !choices.isEmpty()) {
                                    JSONObject delta = choices.getJSONObject(0).getJSONObject("delta");
                                    if (delta.containsKey("content")) {
                                        // 可能会抛出关闭异常
                                        try {
                                            final String content = delta.getString("content");
                                            // 是否开启自定义校验
                                            builder.append(content.trim().toUpperCase());
                                            if (control.getEnableSensitive() && chatUtils.isSusceptible(builder.toString(), control.getSensitiveWords())) {
                                                appointSendingSystem(WeChatConstant.RC_MODE);
                                                builder.setLength(0);
                                            }
                                            this.session.getBasicRemote().sendText(content);
                                        } catch (Exception e) {
                                            if (!(e instanceof RuntimeException)) {
                                                //用户可能手动端口连接
                                                throw new CloseException();
                                            }
                                        }
                                    }
                                }
                            }
                        }, throwable -> {
                            //为 Close异常时 过滤
                            if (!(throwable instanceof CloseException)) {
                                isColse.set(false);
                                log.error("调用GPT-AZURE-APP时出现异常 userId:{} 提问内容:{} 异常信息:{} ", userId, lastMessage.getContent(), (throwable instanceof WebClientResponseException)?((WebClientResponseException) throwable).getResponseBodyAsString():throwable.getMessage());

                                gptService.concatenationGpt(gptModel, false, chatGptStructure)
                                        .doFinally(signal1 -> handleWebSocketCompletion())
                                        .subscribe(data -> {
                                            isColse.set(true);
                                            if (JSON.isValid(data)) {
                                                JSONObject jsonObject = JSONObject.parseObject(data);
                                                JSONArray choices = jsonObject.getJSONArray("choices");
                                                if (choices != null && !choices.isEmpty()) {
                                                    JSONObject delta = choices.getJSONObject(0).getJSONObject("delta");
                                                    if (delta.containsKey("content")) {
                                                        // 可能会抛出关闭异常
                                                        try {
                                                            final String content = delta.getString("content");
                                                            // 是否开启自定义校验
                                                            builder.append(content.trim().toUpperCase());
                                                            if (control.getEnableSensitive() && chatUtils.isSusceptible(builder.toString(), control.getSensitiveWords())) {
                                                                appointSendingSystem(WeChatConstant.RC_MODE);
                                                                builder.setLength(0);
                                                            }
                                                            this.session.getBasicRemote().sendText(content);
                                                        } catch (Exception e) {
                                                            if (!(e instanceof RuntimeException)) {
                                                                //用户可能手动端口连接
                                                                throw new CloseException();
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }, throwable1 -> {
                                            isColse.set(true);
                                            //为 Close异常时 过滤
                                            if (!(throwable1 instanceof CloseException)) {
                                                log.error("调用GPT-OPEN-APP时出现异常 userId:{} 提问内容:{} 异常信息:{} ", userId, lastMessage.getContent(), (throwable1 instanceof WebClientResponseException)?((WebClientResponseException) throwable1).getResponseBodyAsString():throwable1.getMessage());

                                                chatUtils.compensate(frequency, userId);
                                                appointSendingSystem(ExceptionMessages.GPT_TIMEOUT);
                                            }
                                        });
                            }
                        });
            } else {

                Long frequency = null;

                try {
                    frequency = chatGptStructure.getGptTextImageFrequency();
                    chatUtils.deplete(frequency, userId);
                    final String context = gptService.drawAccordingGpt(s, chatGptStructure);
                    this.session.getBasicRemote().sendText(context);
                } catch (DrawingException e) {
                    chatUtils.compensate(frequency, userId);
                    appointSendingSystem(ExceptionMessages.GPT_TIMEOUT);
                } finally {
                    handleWebSocketCompletion();
                }
            }

        } catch (FrequencyException e) {
            appointSendingSystem(e.getMessage());
            handleWebSocketCompletion();
        } catch (Exception e) {
            log.error("与 OPEN Ai建立连接失败 原因:{}", e.getMessage());
            appointSendingSystem(ExceptionMessages.GPT_ERR);
            handleWebSocketCompletion();
        }
    }

    @OnClose
    public void handleWebSocketCompletion() {
        if(isColse.get()) {
            try {
                this.session.close();
            } catch (IOException e) {
                log.error("关闭 微信 WebSocket 会话失败.", e);
            }
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        log.warn("微信GPT websocket出现异常 原因:{}", throwable.getMessage());
        //打印堆栈
        //      throwable.printStackTrace();
    }


    public void appointSendingSystem(final String message) {
        try {
            this.session.getBasicRemote().sendText(message);
        } catch (Exception e) {

        }
    }

}
