/**
 * @author river
 */
(function() {
	ads.newvideo = function(data){
		var list = [];
		for (var i = 0; i < data.length; i++) {
			list[i] = data[i].params;
		};
		var newvideo = new ads.newVideo(list);
		return newvideo.outwraper;
	}
	ads.newVideo = Class.extend({
		init:function(data){
			this.data = data;
			//this.data =[{
			//		"type": "newvideo",
			//		"flv": "http:\/\/d1.leju.com\/ia\/2014\/03\/11\/531ec166250f7.flv",
			//		"imageurl": "http:\/\/www.sinaimg.cn\/hs\/lingyun\/adsswf\/videoImage.jpg",
			//		"link": "http:\/\/sina.allyes.com\/main\/adfclick?db=sina&bid=638558,707513,712774&cid=0,0,0&sid=718243&advid=14159&camid=113616&show=ignore&url=http%3A%2F%2Fadm.leju.sina.com.cn%2Fadd_click%2F%3Fsid%3Dcdm_531ec176ebc6d%26url%3Dhttp%253A%252F%252Fwww.xishanyihaoyuan.com%252F",
			//		"time": 10000,
			//		"delay": 8000
			//	
			//},{
			//		"type": "newvideo",
			//		"flv": "http:\/\/d1.leju.com\/ia\/2014\/03\/13\/532122a604221.flv",
			//		"imageurl": "http:\/\/www.sinaimg.cn\/hs\/lingyun\/adsswf\/videoImage.jpg",
			//		"link": "http:\/\/sina.allyes.com\/main\/adfclick?db=sina&bid=638558,707513,712774&cid=0,0,0&sid=718243&advid=14159&camid=113616&show=ignore&url=http%3A%2F%2Fadm.leju.sina.com.cn%2Fadd_click%2F%3Fsid%3Dcdm_531ec176ebc6d%26url%3Dhttp%253A%252F%252Fwww.xishanyihaoyuan.com%252F",
			//		"time": 10000,
			//		"delay": 8000	
			//}];
			ads.newvideolength = this.data.length;
			this.create();
		},
		run:function(){

		},
		create : function() {
			var self = this;
			var data = self.data;
			//var showtime = data.time || 10000;
			//var delaytime = data.delay || 1000;
			//创建最外围层设定over
			self.outwraper = ads.createElement('div',null, {
				height: '306px',
				position: 'absolute',
				width: '22px',
				right:'0',
				overflow: 'hidden',
				zIndex:'1000',
				top:(document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - 314 + "px"
			},document.body,null);

			//大框架
			self.wraper = ads.createElement('div',null, {
				background: '#eee',
				height: '306px',
				position: 'relative',
				width: '672px',
				left:'22px'
			},self.outwraper,null);
			//边角
			self.outer = ads.createElement('div',null, {
				background: 'url("http://www.sinaimg.cn/hs/lingyun/adsswf/video_sidebar.png") no-repeat scroll 0 0',
				bottom: '5px',
				height: '166px',
				left: '-22px',
				position: 'absolute',
				width: '22px',
				zIndex:'1010',
				cursor:'pointer'
			},self.wraper,null);
			//临时遮罩层 用于将左边的视频关闭按钮屏蔽
			if(data.length > 1){
				self.mark = ads.createElement('div',null, {
					background: 'url("http://imgcdn.house.sina.com.cn/2.0/ads/image/newvideomark3.jpg") no-repeat scroll 0 0',
					top: '5px',
					height: '18px',
					left: '260px',
					position: 'absolute',
					width: '308px'

				},self.wraper,null);
			}
			//视频box
			//self.inter_box = ads.createElement('div',null,{
				//height: '306px',
				//overflow:'hidden',
				//width: '314px'
			//},self.wraper,null);
			//视频
			//var id = 'player'+(new Date).getTime();
			var datechar = (new Date).getTime();
			var id = 'player'+datechar;
			//ads.newvideolist.push(id);
			//var objid = 'video'+datechar;
			//var objname = 'videoname'+datechar;
			//var inner1id = 'inner1'+datechar;
			//var inner2id = 'inner2'+datechar;
			self.outwraper.id=	id;

			//相互通信开始
			//ie下关不了的src : "http://www.sinaimg.cn/hs/lingyun/adsswf/SinaPlayer.swf",
			//SinaPlayer201212181000 被拦截弹出窗口
			//SinaPlayer20130301,20130301_2 这两个应该一样,修改时找到2分12月18日的源码
			//SinaPlayer20130325 此版本去除暂停按钮
			//SinaPlayer20130418 此版本修改为鼠标移入自动播放
			//SinaPlayer20130418_2 此版本js判断是否鼠标移入,flash开放againplayer方法供js调用(使用swfobject)
			for (var i = 0; i < data.length; i++) {
				self['inter_box'+ i] = ads.createElement('div',null,{
					height: '306px',
					overflow:'hidden',
					width: '314px',
					'float':'left'
				},self.wraper,null);
				self['objwrap' + i] = ads.createElement('div',null,{id:'inner'+i},self['inter_box'+ i],null);
				self['objwrap' + i].id = 'inner'+i;
			};
			//self.objwrap1 = ads.createElement('div',null,{id:inner1id},self.inter_box,null);
			//self.objwrap2 = ads.createElement('div',null,{id:inner2id},self.inter_box,null);
			//self.objwrap1.id = inner1id;
			//self.objwrap2.id = inner2id;
			var flashvars = {
				flv : data[0].flv,
				imageurl:data[0].imageurl || "http://imgcdn.house.sina.com.cn/2.0/ads/image/videoimage.png",
				onload : "ads.onVideoLoaded",
				onclose : "ads.onNewVideoClosed",
				oncomplete :"ads.onNewVideoComplete",
				link : escape(data[0].link),
				containerID:id+'_0'
			};
			var params = {wmode:'transparent',allowscriptaccess:'always'};
			var attributes = { id:'videoid0', name:'videoid0' };
			swfobject.embedSWF("http://www.sinaimg.cn/hs/lingyun/adsswf/SinaPlayer20130418_3.swf", 'inner0', "314", "306", "9.0.0", "", flashvars, params, attributes, function(status) {
				if (status.success) {
					//var obj = status.ref;
					self.obj1 = status.ref;
					setTimeout(function(){
						self.outwraper.style.width = "336px";
					  	//ads.animate(self.outwraper, {
						//		 width: "336px"
						//}, {
						//		duration : 500,
						//		easing : "easeOutCirc"
						//});	
					},1000);
				}
				
			});
			if(data[1]){
				//setTimeout(function(){
					swfobject.embedSWF("http://www.sinaimg.cn/hs/lingyun/adsswf/SinaPlayer20130418_3.swf", 'inner1', "314", "306", "9.0.0", "", {
						flv: data[1].flv,
						imageurl: data[1].imageurl || "http://imgcdn.house.sina.com.cn/2.0/ads/image/videoimage.png",
						onload: "ads.onVideoLoaded",
						onclose: "ads.onNewVideoClosed",
						oncomplete: "ads.onNewVideoComplete",
						link: escape(data[1].link),
						containerID: id + '_1'
					}, {
						wmode: 'transparent',
						allowscriptaccess: 'always'
					}, {
						id: 'videoid1',
						name: 'videoid1'
					}, function(status2) {
						if (status2.success) {
							self.obj2 = status2.ref;
							
							setTimeout(function() {
							self.outwraper.style.width = "652px";
							//	ads.animate(self.outwraper, {
							//		width: "652px"
							//	}, {
							//		duration: 500,
							//		easing: "easeOutCirc"
							//	});
							}, 1000);
						}
					});
				//},10);
			}
			addEvent(self.outer, 'mouseover', function() {
				if(!ads.newvideodisplay){
					openbox(function(){
						ads.newvideodisplay = true;
						
						if(ads.newvideoplaystatus.video0){
							ads.newvideoplaystatus.video0 = '';
							if (self.obj1 && typeof self.obj1.againplayer != "undefined") {
								self.obj1.againplayer();
							}
						}
						if(ads.newvideoplaystatus.video1){
							ads.newvideoplaystatus.video1 = '';
							if (self.obj2 && typeof self.obj2.againplayer != "undefined") {
								self.obj2.againplayer();
							}
						}
						
					});
				}
			});
			
			//相互通信结束
			
			//重置或者滚动
			addEvent(window, 'scroll',ads.throttle(function() {
				getposition();
			},300));
			addEvent(window, 'resize', ads.throttle(function() {
				getposition();
			},300));
			//打开的按钮
			var openbox = function(callback){ 
				var width = self.data.length > 1 ? "652px" : "336px";
				ads.animate(self.outwraper, {
						 width: width
				}, {
						duration : 500,
						easing : "easeOutCirc"
				});
				callback && callback();
			}
			//获取位置
			var getposition = function(){ 
				ads.animate(self.outwraper, {
						top:(document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - 314 + "px"
				}, {
						duration : 500,
						easing : "easeOutCirc"
				});
			}
		}
	})
	
})();
/**
 * @author river
 */
(function() {
	ads.searchshow = function(data){
		var searchshow = new ads.Searchshow(data.params);
		return searchshow.wraper;
	}
	ads.Searchshow = Class.extend({
		init:function(data){
			this.data = data;
			this.create();
		},
		create : function() {
			var self = this;
			var data = self.data;
			var height = data.height || 60;
			var width = data.width || 80;
			data.link = data.link || "";
			data.title = data.title || "";
			data.price = data.price || "";
			data.tel = data.tel || "";
			data.telext = data.telext || "";
			data.map_url = data.map_url || "http://map.house.sina.com.cn/";
			data.unitType = data.unitType || "\u5143/\u5e73\u7c73";//fix by limeng
			if(data.map_url){
				var mapHtml =  '<p style="margin-right: 10px;display: inline;float: right;"><a style="color: #09548D;text-decoration: none; background:url(http://imgcdn.house.sina.com.cn/2.0/ads/image/icon_s.png) left top no-repeat; padding-left:15px;" href="'+data.map_url+'" target="_blank">\u67e5\u770b\u5730\u56fe</a></p>'
			}else{
				var mapHtml = "";
			}
			self.wraper = ads.createElement('div',null, {
				'float':'left',
				marginLeft:'-1px',
				display:'inline',
				background:'url(http://imgcdn.house.sina.com.cn/2.0/ads/image/line_h.png) left 15px no-repeat',
				color:'#666',
				overflow: 'hidden',
				width: '365px',
				height:'90px'
			},null,null);
			if(data.telext!==''){
				self.wraper.innerHTML = '<div style="display: inline; float: left; position: relative; width:100%; height:90px;"><div style="position: absolute;right: 10px;top:4px; line-height:18px;">\u63a8\u5e7f\u8fde\u63a5</div><div style="position:relative; height: 62px;width: 82px;display: inline;float: left; margin:15px 0 0 24px; background-color:#d9d9d9;"><a href="'+data.link+'" target="_blank"><img style="height:'+height+'px;width: '+width+'px; border:none; border:1px solid #000; position:absolute; left:-3px; top:-3px;" src="'+data.img+'" alt=""></a></div><div style="width: 250px;display: inline; float: right;"><p style="font-weight: 700;font-size: 14px; padding:8px 0 3px 0; line-height:24px;"><a id="a_id" style="color: #333333; text-decoration: none;" href="'+data.link+'" target="_blank">'+data.title+'</a></p><p style="font-size: 12px; line-height:18px;">\u4ef7\u683c<i style="font-style: normal;color: #fa2603; margin:0 5px;">'+data.price+'</i>'+data.unitType+'</p><p style="font-size: 12px; line-height:18px;"><i style="font-style: normal;color: #fa2603;">'+data.tel+'</i>\u8f6c<i style="font-style: normal;color: #fa2603;">'+data.telext+'</i></p>'+mapHtml+'</div></div>';
			}else{
				self.wraper.innerHTML = '<div style="display: inline; float: left; position: relative; width:100%; height:90px;"><div style="position: absolute;right: 10px;top:4px; line-height:18px;">\u63a8\u5e7f\u8fde\u63a5</div><div style="position:relative; height: 62px;width: 82px;display: inline;float: left; margin:15px 0 0 24px; background-color:#d9d9d9;"><a href="'+data.link+'" target="_blank"><img style="height:'+height+'px;width: '+width+'px; border:none; border:1px solid #000; position:absolute; left:-3px; top:-3px;" src="'+data.img+'" alt=""></a></div><div style="width: 250px;display: inline; float: right;"><p style="font-weight: 700;font-size: 14px; padding:8px 0 3px 0; line-height:24px;"><a id="a_id" style="color: #333333; text-decoration: none;" href="'+data.link+'" target="_blank">'+data.title+'</a></p><p style="font-size: 12px; line-height:18px;">\u4ef7\u683c<i style="font-style: normal;color: #fa2603; margin:0 5px;">'+data.price+'</i>'+data.unitType+'</p><p style="font-size: 12px; line-height:18px;"><i style="font-style: normal;color: #fa2603;">'+data.tel+'</i></p>'+mapHtml+'</div></div>';
			}
		}
	})
})();
/**
 * @author river
 * @13.14.10
 */
(function() {
	ads.addHTML = function(data){
		var addHTML = new ads.AddHTML(data.params);
		return addHTML.wraper;
	}
	ads.AddHTML = Class.extend({
		init:function(data){
			this.data = data;
			this.create();
		},
		create : function() {
			var self = this;
			var data = self.data;
			var height = data.height || 70;
			var width = data.width || 950;
			data.html = data.html || "";
			self.wraper = ads.createElement('div',null, null,null,null);
			if(data.html){
				self.wraper.innerHTML = data.html;
			}
		}
	})
})();
