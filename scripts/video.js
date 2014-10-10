(function() {
	var height = 310;
	ads.video = function(data) {
		ads.videonumber ++;
		var datechar = (new Date).getTime();
		var id = 'player'+datechar;
		var objid = 'video'+datechar;
		var objname = 'videoname'+datechar;
		var delay = data.params.delay || 2000;
		//ie下关不了的src : "http://www.sinaimg.cn/hs/lingyun/adsswf/SinaPlayer.swf",
		//SinaPlayer201212181000 被拦截弹出窗口
		//SinaPlayer20130301,20130301_2 这两个应该一样,修改时找到2分12月18日的源码
		//SinaPlayer20130325 此版本去除暂停按钮
		//SinaPlayer20130418 此版本修改为鼠标移入自动播放
		//SinaPlayer20130418_2 此版本js判断是否鼠标移入,flash开放againplayer方法供js调用(使用swfobject)
		//SinaPlayer20130418_3 此版本修复跨域时flash的安全限制(修改了flash)
		var param = {
			id : objid,
			name : objname,
			src : "http://www.sinaimg.cn/hs/lingyun/adsswf/SinaPlayer20130325.swf",
			width : 320,
			height : height,
			params:{wmode:'transparent',allowscriptaccess:'always'},
			flashvars : {
				flv : data.params.flv,
				imageurl:data.params.imageurl || "http://imgcdn.house.sina.com.cn/2.0/ads/image/videoimage.png",
				onload : "ads.onVideoLoaded",
				onclose : "ads.onVideoClosed",
				oncomplete :"ads.onVideoComplete",
				link : escape(data.params.link),
				containerID:id
			}
		}
		var el = new ads.Banner(param).el;
		el.id=id;
		ads.setStyle(el,{
			bottom:'-260px',
			position:'absolute',
			right: (ads.videonumber - 1)*320 + 'px',
			zIndex : data.params.zIndex || 9999,
			top:(document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - height + "px"
		})
		addEvent(window, 'scroll', ads.throttle(function() {
			ads.animate(el, {
				top : (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - height + "px"
			}, {
				duration : 500,
				easing : "easeOutCirc"
			})
		}, 200));
		addEvent(window, 'resize', ads.throttle(function() {
			ads.animate(el, {
				top : (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - height + "px"
			}, {
				duration : 500,
				easing : "easeOutCirc"
			})
		}, 200));
		setTimeout(function(){
           document.body.appendChild(el);			
		},delay)
	}
})();
