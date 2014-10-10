/**
 * @author nttdocomo
 */
(function() {
	ads.plp = function(data) {
		var plp = new ads.Plp(data.params);
	}
	ads.closeBtn = Class.extend({
		createCloseBtn:function(){
			var psStyle = {
	            top: '-19px',
	            left: '0px'
	        };
	        var self = this;
	        switch (this.data.type) {
	            case 'rt':
	                psStyle = {
	                    top: '0',
	                    right: '0'
	                }
	        };
	        this.closeBtn = ads.createElement('div', null, ads.extend({
	            background: 'url("http://www.sinaimg.cn/hs/sinahouse/images/adb.png") no-repeat scroll 0 -22px transparent',
	            height: '19px',
	            width: '57px',
	            position: 'absolute',
	            cursor: 'pointer'
	        }, psStyle), this.el);
	        addEvent(this.closeBtn, 'click', function(){
	            self.remove();
	        })
		},
		remove:function(){
			this.el.parentNode.removeChild(this.el);
		}
	})
	ads.Plp = ads.closeBtn.extend({
		init:function(data){
			this.data = data;
			this.data.height = "150";
			this.data.width = "300";
			this.data.bottom = this.data.bottom || 0;
			this.data.params = {wmode:'transparent'};
			this.data.type = 'plp';
	        this.el = (new ads.Banner(this.data)).el;
			var style = {position:"absolute",zIndex:this.data.zIndex || 9999};
	        if(this.data.left){
	        	style.left=this.data.left+"px"
	        }
	        if(this.data.right){
	        	style.right=this.data.right+"px"
	        }
	        ads.setStyle(this.el,style);
	        if(this.data.closebtn){
	        	this.createCloseBtn()
	        }
			var self=this;
			setTimeout(function(){
        		document.body.appendChild(self.el)
        		self.scroll();
        	},this.data.delay || 1000)	
			
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
