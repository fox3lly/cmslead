/**
 * @author Linlin
 */ 
(function() {
	ads.bottomBanner = function(data) {
			var bottomBanner = new ads.BottomBanner(data.params);
	}

	ads.BottomBanner = ads.closeBtn.extend({
		init: function(data){
			  this.data = data;
			  this.data.bottom = this.data.bottom || 0;
			  this.el = (new ads.Banner(this.data)).el;
	   	  var style = {position:"absolute",zIndex:this.data.zIndex};
	        if(this.data.left){
	        	style.left=this.data.left+"px"
	        }else if(this.data.right){
	        	style.right=this.data.right+"px"
	        }else{
	        	style.left = (document.body.clientWidth - 950) / 2 + 'px'
	        }
	        ads.setStyle(this.el,style);
	       if(this.data.closebtn){
	        	this.createCloseBtn()
	        }
			document.body.appendChild(this.el);
			this.scroll();
		},
		scroll : function() {
			ads.setStyle(this.el, {
				top : (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - this.el.clientHeight - this.data.bottom + "px"
			});

			var self = this;
			addEvent(window, 'scroll', ads.throttle(function() {
				ads.animate(self.el, {
					top : (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - self.el.clientHeight - self.data.bottom + "px"
				}, {
					duration : 500,
					easing : "easeOutCirc"
				})
			}, 200));
			addEvent(window, 'resize', ads.throttle(function() {
				ads.animate(self.el, {
					top : (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - self.el.clientHeight - self.data.bottom + "px"
				}, {
					duration : 500,
					easing : "easeOutCirc"
				})
			}, 200));
			/*addEvent(self.closeBtn, 'click', function() {
				self.closeAll();
			});*/
		}
		
	})
})();
