(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/master/view/personalView"],{"30c6":function(e,t,n){"use strict";n.r(t);var r=n("d978"),a=n("43b9");for(var i in a)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("41bf");var u=n("f0c5"),s=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],void 0);t["default"]=s.exports},"41bf":function(e,t,n){"use strict";var r=n("6881"),a=n.n(r);a.a},"43b9":function(e,t,n){"use strict";n.r(t);var r=n("e13f"),a=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=a.a},"48fb":function(e,t,n){"use strict";n.r(t);var r=n("7877"),a=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=a.a},"5c74":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return r}));var r={customWaterfallsFlow:function(){return n.e("uni_modules/custom-waterfalls-flow/components/custom-waterfalls-flow/custom-waterfalls-flow").then(n.bind(null,"be01"))},uniPopup:function(){return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null,"50c5"))}},a=function(){var e=this,t=e.$createElement,n=(e._self._c,e.userInfo.avatar?e.conversionImage(e.userInfo.avatar):null),r=e.userData.list.length,a=!e.isFlushed&&0===e.userData.list.length,i=e.publicData.list.length,u=!e.isFlushed&&0===e.publicData.list.length,s=e.userInfoForm.avatar?e.conversionImage(e.userInfoForm.avatar):null;e._isMounted||(e.e0=this.$parent.watchVideo,e.e1=function(e){return this.$refs.personalInfoPopup.open("center")},e.e2=function(e){return this.$refs.personalInfoPopup.close()}),e.$mp.data=Object.assign({},{$root:{m0:n,g0:r,g1:a,g2:i,g3:u,m1:s}})},i=[]},"5cc4":function(e,t,n){"use strict";var r=n("66a2"),a=n.n(r);a.a},"63c5":function(e,t,n){"use strict";(function(e,t){var r=n("4ea4");n("48aa");r(n("66fd"));var a=r(n("6b47"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(a.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"66a2":function(e,t,n){},6881:function(e,t,n){},"6b47":function(e,t,n){"use strict";n.r(t);var r=n("5c74"),a=n("48fb");for(var i in a)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("5cc4");var u=n("f0c5"),s=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],void 0);t["default"]=s.exports},7877:function(e,t,n){"use strict";(function(e,r){var a=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("2eee")),u=a(n("448a")),s=a(n("c973")),o=n("1623"),c=a(n("0ad6")),l=n("68f3"),f=n("29d7"),p=a(n("30c6")),d=n("a6cf"),h=n("60b2"),v={components:{DisconnectComponent:function(){n.e("wxcomponents/components/disconnectComponent").then(function(){return resolve(n("715c"))}.bind(null,n)).catch(n.oe)},LoadingDataComponent:p.default,EmptyComponent:function(){n.e("wxcomponents/components/emptyComponent").then(function(){return resolve(n("e53b"))}.bind(null,n)).catch(n.oe)}},computed:{env:function(){return c.default}},data:function(){return{isFlushed:!1,userInfo:{},userInfoForm:{userName:""},userData:{list:[],isPublic:0,current:1},publicData:{list:[],isPublic:1,current:1},active:0,isAppreciate:!0}},methods:{conversionImage:h.conversionImage,refreshAppreciate:function(){var e=this.$refs.appreciateFlowRef;e&&(this.publicData.list=[],this.publicData.current=1,this.getPublicOps(),e.refresh())},refreshCreation:function(){var e=this.$refs.creationFlowRef;e&&(this.userData.list=[],this.userData.current=1,this.getUserOps(),e.refresh())},onLoadShow:function(){this.getUserInfo(),this.getUserOps()},toDrawingDetail:function(t){e.navigateTo({url:"/pages/drawing/drawingResultView?drawingId="+t.value.drawingId})},getUserOps:function(){var e=(0,s.default)(i.default.mark((function e(){var t,n,r,a,s;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,t=this.userData,n=t.current,r=t.isPublic,e.next=4,this.getOps(n,r);case 4:a=e.sent,a.length>0&&((s=this.userData.list).push.apply(s,(0,u.default)(a)),this.userData.current=n+1),e.next=10;break;case 8:e.prev=8,e.t0=e["catch"](0);case 10:case"end":return e.stop()}}),e,this,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),getPublicOps:function(){var e=(0,s.default)(i.default.mark((function e(){var t,n,r,a,s;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,t=this.publicData,n=t.current,r=t.isPublic,e.next=4,this.getOps(n,r);case 4:a=e.sent,a.length>0&&((s=this.publicData.list).push.apply(s,(0,u.default)(a)),this.publicData.current=n+1),e.next=10;break;case 8:e.prev=8,e.t0=e["catch"](0);case 10:case"end":return e.stop()}}),e,this,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),getOps:function(){var t=(0,s.default)(i.default.mark((function t(n,r){var a,u,s=this;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,this.isFlushed=!0,t.next=4,(0,d.getDrawingOpsResult)(n,r);case 4:return a=t.sent,u=a.records,u.length>0&&u.forEach((function(e){e.image=c.default.imageBaseUrl+e.image;var t=e.value.prompt.toString(),n=t.split(/[,，]/);Array.isArray(n)&&(e.value.prompt=n.slice(0,4))})),t.abrupt("return",u);case 10:t.prev=10,t.t0=t["catch"](0),e.showToast({icon:"none",duration:4e3,title:t.t0});case 13:return t.prev=13,setTimeout((function(){s.isFlushed=!1}),1e3),t.finish(13);case 16:case"end":return t.stop()}}),t,this,[[0,10,13,16]])})));return function(e,n){return t.apply(this,arguments)}}(),toLayoutPage:function(){e.navigateTo({url:"/pages/layout/layoutView"})},onChangeTabs:function(e){this.isAppreciate&&1===e.detail.index&&(this.isAppreciate=!0,this.getPublicOps())},signIn:function(){var t=(0,s.default)(i.default.mark((function t(){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.showLoading(),t.next=4,(0,f.userSignInReward)();case 4:t.sent,e.hideLoading(),e.showToast({icon:"none",duration:3e3,title:"签到成功"}),e.$emit("master_userInfo"),t.next=15;break;case 10:t.prev=10,t.t0=t["catch"](0),e.hideLoading(),console.log(t.t0),e.showToast({icon:"none",duration:6e3,title:t.t0});case 15:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(){return t.apply(this,arguments)}}(),getUserInfo:function(){var e=(0,s.default)(i.default.mark((function e(){var t,n;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this.$parent,e.prev=1,t.openShowAnimation(),e.next=5,(0,o.getCurrentUserInfo)();case 5:n=e.sent,n&&(this.userInfo=n,(0,l.setUser)(this.userInfo),this.userInfoForm=JSON.parse(JSON.stringify(this.userInfo))),t.isConnection=!0,e.next=14;break;case 10:e.prev=10,e.t0=e["catch"](1),console.log(e.t0),t.isConnection=!1;case 14:return e.prev=14,setTimeout((function(){t.closeShowAnimation()}),200),e.finish(14);case 17:case"end":return e.stop()}}),e,this,[[1,10,14,17]])})));return function(){return e.apply(this,arguments)}}(),refreshUserInfo:function(){var e=(0,s.default)(i.default.mark((function e(){var t,n;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this.$parent,e.prev=1,t.isConnection=!0,e.next=5,(0,o.getCurrentUserInfo)();case 5:n=e.sent,n&&(this.userInfo=n,(0,l.setUser)(this.userInfo),this.userInfoForm=JSON.parse(JSON.stringify(this.userInfo))),e.next=13;break;case 9:e.prev=9,e.t0=e["catch"](1),console.log(e.t0),t.isConnection=!1;case 13:case"end":return e.stop()}}),e,this,[[1,9]])})));return function(){return e.apply(this,arguments)}}(),onNickName:function(e){this.userInfoForm.userName=e.detail.value},uploadAvatar:function(){var t=(0,s.default)(i.default.mark((function t(n){var a,u;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a=this,u=c.default.baseUrl+"/user/upload/avatar",e.showLoading({title:"正在上传",mask:!0}),r.uploadFile({url:u,filePath:n.detail.avatarUrl,name:"avatar",header:{token:(0,l.getToken)()},success:function(){a.getUserInfo(),e.hideLoading(),e.showToast({title:"上传头像成功",icon:"none",duration:2e3})},fail:function(t){console.log(t),e.hideLoading(),e.showToast({title:"上传头像失败,请稍后重试",icon:"none",duration:2e3})}});case 4:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}(),uploadName:function(){var t=(0,s.default)(i.default.mark((function t(){var n;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=this.userInfoForm.userName,n.length>0){t.next=4;break}return e.showToast({title:"昵称不能为空",icon:"none",duration:2e3}),t.abrupt("return");case 4:return t.prev=4,e.showLoading({title:"正在修改 ing~",mask:!0}),t.next=8,(0,o.uploadName)(n);case 8:return t.next=10,this.getUserInfo();case 10:e.hideLoading(),e.showToast({title:"修改昵称成功",icon:"none",duration:2e3}),t.next=17;break;case 14:t.prev=14,t.t0=t["catch"](4),e.showToast({title:"昵称不合法!",icon:"none",duration:2e3});case 17:case"end":return t.stop()}}),t,this,[[4,14]])})));return function(){return t.apply(this,arguments)}}(),copyOpenId:function(){var t=(0,s.default)(i.default.mark((function t(){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.setClipboardData({data:this.userInfo.openId,success:function(t){e.showToast({title:"已复制粘贴板",icon:"none",duration:2e3})}});case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}(),onImageLoad:function(e){this.imageList[e].defaultUrl=""}}};t.default=v}).call(this,n("543d")["default"],n("bc2e")["default"])},d978:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){}));var r=function(){var e=this.$createElement;this._self._c},a=[]},e13f:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default={data:function(){return{}}}}},[["63c5","common/runtime","common/vendor"]]]);