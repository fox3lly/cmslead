/**
 * @author nttdocomo
 */
(function() {
	ads.window = function(data) {
		return new ads.Window(data.params)
	}
	ads.Window = Class.extend({
		init : function(data) {
			this.data = data;
			this.order = parseInt(this.data.name.split("_")[1]);
			this.left = 300*this.order+20;
			this.param = "width=300,height=250,top=100,left="+this.left;
			this.srcType = /.(\w+)$/.exec(this.data.src)[1];
			this.link = "http://d1.sina.com.cn/d1images/pu/pu1.html?"+this.data.link+";"+this.srcType+";"+this.data.src;
			this.create();
		},
		create : function() {
			var self = this;
			open(self.link, (window.name != self.data.name) ? self.data.name : "", self.param);
			/*window.onload = function(){
				console.log('onload')
			}
			addEvent(window, 'load', function() {
				console.log('ok')
				open(self.data.link, (window.name != self.data.name) ? self.data.name : "", self.param);
			});*/
		}
	})
})();
