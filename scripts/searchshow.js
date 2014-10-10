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
