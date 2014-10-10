/**
 * @author nttdocomo
 */
(function() {
	ads.lunxianbanner = function(data) {
		var marqueen = new ads.Marqueen(data.params);
		return marqueen.el;
	}
	ads.Marqueen = Class.extend({
		init : function(data) {
			this.index=0;
			this.data = data;
			this.el = document.createElement('div');
			this.updateIndex();
			return this.el;
		},
		create : function() {
			var self = this;
			var temp = {
				src : this.data[this.index].src,
				width : this.data[this.index].width,
				height : this.data[this.index].height,
				link : this.data[this.index].link,
				flashvars : {
					adlink : this.data[this.index].link
				}
			};
			//return new ads.Banner(temp);
			if(this.data.length - 1) {
				setTimeout(function() {
					self.updateIndex();
				}, 15000);
			}
			this.el.innerHTML = "";
			this.el.appendChild((new ads.Banner(temp)).el);
			return
		},
		updateIndex : function() {
			var length = this.data.length;
			var tempData=[];
			for(var i=0; i<length; i++){
				if(typeof (this.data[i]) != 'undefined' && this.data[i] != null){
					tempData.push(this.data[i]);
				}
			};
			this.data=tempData;
			if(this.data.length<2){
				this.oneData();
			}else{
				var url = document.location.href;
				var cookiename = 'SinaMar' + escape(url.substr(url.indexOf('/', 7), 2) + url.substring(url.lastIndexOf('/'))) + this.data[this.index].pdps;
				if( typeof (ads.globalMarqueenId) == 'undefined' || ads.globalMarqueenId == null) {
					var times = ads.getCookie(cookiename);
					this.times = times === null ? Math.floor(Math.random() * this.data.length) : ++times;
					ads.globalMarqueenId = this.times;
				} else {
					this.times = ads.getCookie(cookiename);
					this.times++;
				}
				this.index = this.data.length==1?0:ads.getIndex(this.times, cookiename, this.data.length);
				this.create();
			}
			
		},
		oneData : function(){
			var self = this;
			var temp = {
				src : this.data[this.index].src,
				width : this.data[this.index].width,
				height : this.data[this.index].height,
				link : this.data[this.index].link,
				flashvars : {
					adlink : this.data[this.index].link
				}
			};
			this.el.innerHTML = "";
			this.el.appendChild((new ads.Banner(temp)).el);
			return
		}
	});
})();
