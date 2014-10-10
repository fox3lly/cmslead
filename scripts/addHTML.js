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
