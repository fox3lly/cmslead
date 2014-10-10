(function() {
	ads.lunbobanner = function(data) {
		var lunbobanner = new ads.Rotator(data.params);
		if(lunbobanner.el) {
			return lunbobanner.el;
		}
		/*var grid = document.getElementById(data.grid);
		 grid.appendChild(lunbobanner.el)*/
	};
	ads.Rotator = Class.extend({
		init : function(data) {
			this.updateData(data);
		},
		create : function() {
			this.data = {
				src : this.data.src,
				width : this.data.width,
				height : this.data.height,
				flashvars : {
					adlink : this.data.link
				},
				link:this.data.link
			}
			var rotator = new ads.Banner(this.data)
			this.el = rotator.el;
			this.el.className += " lunbo-"+this.data.width;
		},
		updateData : function(data) {
			this.config(data);
			this.data = data;
			var url = document.location.href;
			var cookiename = 'SinaRot' + escape(url.substr(url.indexOf('/', 7), 2) + url.substring(url.lastIndexOf('/')));
			if(!this.data.length)
				return;
			if( typeof (ads.globalRotatorId) == 'undefined' || ads.globalRotatorId == null) {
				var times = ads.getCookie(cookiename);
				this.times = times === null ? Math.floor(Math.random() * this.data.length) : ++times;
				ads.globalRotatorId = this.times;
			}
			this.index = ads.getIndex(ads.globalRotatorId, cookiename, this.data.length);
			this.data = this.data[this.index];
			if(this.data) {
				this.create();
			}
		},
		config : function(data) {
			if(data.setting) {
				var setting = data.setting;
				this.width = parseInt(setting.width);
				this.height = parseInt(setting.height);
				this.wraperStyle = setting;
				this.settings = {
					width : this.width,
					height : this.height
				}
			}
		}
	})
})();
