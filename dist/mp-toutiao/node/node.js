"use strict";function t(t,i,r){return i in t?Object.defineProperty(t,i,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[i]=r,t}Component({data:{ctrl:{}},properties:{childs:Array,opts:Array},options:{addGlobalClass:!0},methods:{noop:function(){},getNode:function(t){try{for(var i=t.split("_"),r=this.data.childs[i[0]],e=1;e<i.length;e++)r=r.children[i[e]];return r}catch(t){return{text:"",attrs:{},children:[]}}},play:function(t){if(this.root.triggerEvent("play"),this.root.data.pauseVideo){for(var i=!1,r=t.target.id,e=this.root._videos.length;e--;)this.root._videos[e].id===r?i=!0:this.root._videos[e].pause();if(!i){var o=tt.createVideoContext(r,this);o.id=r,this.root.playbackRate&&o.playbackRate(this.root.playbackRate),this.root._videos.push(o)}}},imgTap:function(t){var i=this.getNode(t.target.dataset.i);if(i.a)return this.linkTap(i.a);if(!i.attrs.ignore&&(this.root.triggerEvent("imgtap",i.attrs),this.root.data.previewImg)){var r=this.root.imgList[i.i];tt.previewImage({current:r,urls:this.root.imgList})}},imgLoad:function(i){var r,e=i.target.dataset.i,o=this.getNode(e);o.w?(this.data.opts[1]&&!this.data.ctrl[e]||-1===this.data.ctrl[e])&&(r=1):r=i.detail.width,r&&r!==this.data.ctrl[e]&&this.setData(t({},"ctrl."+e,r)),this.checkReady()},checkReady:function(){var t=this;this.root.data.lazyLoad||(this.root.imgList._unloadimgs-=1,this.root.imgList._unloadimgs||setTimeout(function(){t.root.getRect().then(function(i){t.root.triggerEvent("ready",i)}).catch(function(){t.root.triggerEvent("ready",{})})},350))},linkTap:function(t){var i=t.currentTarget?this.getNode(t.currentTarget.dataset.i):{},r=i.attrs||t,e=r.href;this.root.triggerEvent("linktap",Object.assign({innerText:this.root.getText(i.children||[])},r)),e&&("#"===e[0]?this.root.navigateTo(e.substring(1)).catch(function(){}):e.split("?")[0].includes("://")?this.root.data.copyLink&&tt.setClipboardData({data:e,success:function(){return tt.showToast({title:"链接已复制"})}}):tt.navigateTo({url:e,fail:function(){tt.switchTab({url:e,fail:function(){}})}}))},mediaError:function(i){var r=i.target.dataset.i,e=this.getNode(r);if("video"===e.name||"audio"===e.name){var o=(this.data.ctrl[r]||0)+1;if(o>e.src.length&&(o=0),o<e.src.length)return this.setData(t({},"ctrl."+r,o))}else"img"===e.name&&(this.data.opts[2]&&this.setData(t({},"ctrl."+r,-1)),this.checkReady());this.root&&this.root.triggerEvent("error",{source:e.name,attrs:e.attrs,errMsg:i.detail.errMsg})}}});