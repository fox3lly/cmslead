/**
 * @author Chris
 */ 
(function() {
	ads.doubledl = function(data) {
		var doubledl = new ads.DoubleDl(data.params);
	}
	ads.DoubleDl = Class.extend({
		init: function(data){
			this.data = data;
			this.create();
		},
		create: function(){
			var self = this;
			var dlWidth = this.data.width?this.data.width:"25";
			var dlHeight = this.data.height?this.data.height:"300";
			var dlEdge = this.data.border?this.data.border:"0";
			var dlTop = this.data.top?this.data.top :100;
			var dlLeft = this.data.left?this.data.left :0;
			var dlRight = this.data.right?this.data.right :0;
			var src = this.data.src;
			this.leftparams = {
				width:dlWidth,
				height:dlHeight,
				left:dlLeft,
				top:dlTop,
				src:src[0]
			};
			this.rightparams = {
				width:dlWidth,
				height:dlHeight,
				right:dlRight,
				top:dlTop,
				src:src[1]
			}
			if(this.data.link){
				this.leftparams.link = this.data.link;
				this.rightparams.link = this.data.link
			}
			this.leftdl = new ads.SingleDl(this.leftparams);
			this.rightdl = new ads.SingleDl(this.rightparams);

			addEvent(this.leftdl.closeBtn,'click',function(){
				self.closeAll();
			});
			addEvent(this.rightdl.closeBtn,'click',function(){
				self.closeAll();
			});
			addEvent(window,'scroll',ads.throttle(function(){self.leftdl.scroll(self.leftdl.el)},300));
			addEvent(window,'scroll',ads.throttle(function(){self.rightdl.scroll(self.rightdl.el)},300));
		},
		closeAll: function(){
			var self = this;
			this.leftdl.el.parentNode.removeChild(this.leftdl.el);
			this.rightdl.el.parentNode.removeChild(this.rightdl.el);
		}
	})
})();
