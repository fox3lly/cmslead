/**
 * @author nttdocomo
 */
(function() {
	ads.exbanner = function(data){
		var exbanner = new ads.exBanner(data.params);
		return exbanner.el;
	}
	ads.exBanner = Class.extend({
		init:function(data){
			this.data = data;
			this.create();
		},
		create : function() {
			var self = this;
			var data = self.data;
			self.before = new ads.Banner({
				src : data[0].src,
				width : data[0].width,
				params:{wmode:'opaque'},
				height : data[0].height
			});
			ads.setStyle(self.before.el,{width:data[0].width+"px"})
			self.after = new ads.Banner({
				src : data[1].src,
				width : data[1].width,
				height : data[1].height,
				link : data[1].link,
				params:{wmode:'opaque'},
				flashvars:{
					"adlink":data[1].link
				}
			});
			addEvent(self.after.el, 'mouseleave', function() {
				ads.setStyle(self.before.el, {
					visibility : 'visible',
					height : data[0].height + 'px'
				});
				ads.setStyle(this, {
					visibility : 'hidden'
				})
			})
			addEvent(self.before.el, 'mouseenter', function() {
				ads.setStyle(self.after.el, {
					visibility : 'visible'
				});
				ads.setStyle(this, {
					visibility : 'hidden',
					height : data[1].height + 'px'
				})
			})
			ads.setStyle(self.after.el,{visibility:"hidden",zIndex:"999",position:"absolute",top:"0px"})
			var div = document.createElement('div');
			div.appendChild(self.before.el);
			div.appendChild(self.after.el);
			this.el = div;
			ads.setStyle(this.el,{position:"relative"})
		}
	})
})();
