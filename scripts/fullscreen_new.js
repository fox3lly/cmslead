/**
 * @author nttdocomo
 */
(function() {
	ads.fullscreen = function(data) {
		var fullscreen = new ads.Fullscreen(data.params);
		return fullscreen.wraper;
	}
	ads.Fullscreen = ads.Base.extend({
		create : function() {
			var self = this;
			var fwidth = this.data.width || 950;
			var fheight = this.data.height || 450;
			self.wraper = ads.createElement('div', null, {
				width : fwidth,
				margin : '0 auto',
				height : '0px',
				display : 'none',
				position : 'relative'
			}, self.el, self.action);
            self.linkwrap = ads.createElement('a',{
				href : this.data.link,
				target : '_blank'
			}, null,self.wraper);

			var img = new Image();
			img.onload = function(){
			    ads.createElement('img',{
					src : self.data.src,
					width:fwidth,
					height:fheight
				},null,self.linkwrap); 
				self.delayId = setTimeout(function() {
					self.show();
				}, self.data.delay || 1000);
			};
			img.src = this.data.src;
		},
		createCloseBtn : function() {
			var self = this;
			if(self.data.closebtn) {
				self.closeBtn = ads.createElement('div', null, {
					background : 'url("http://www.sinaimg.cn/hs/sinahouse/images/adb.png") no-repeat scroll 0px 0px transparent',
					height : '20px',
					width : '57px',
					position : 'absolute',
					cursor : 'pointer',
					zIndex: '1'
				}, self.wraper); ads.setStyle(self.closeBtn, {
					top : '0px',
					right : '0px'
				}), addEvent(self.closeBtn, 'click', function() {
					self.closeAll();
				})
			}
		},
		createReplayBtn : function() {

			var self = this;
			if(self.data.replay) {
				this.wraper = this.wraper ? this.wraper : document.body;
				this.replayBtn = ads.createElement('div', null, {
					background : 'url("http://www.sinaimg.cn/hs/sinahouse/images/adb.png") no-repeat scroll -23px -46px transparent',
					height : '57px',
					width : '20px',
					position : 'absolute',
					cursor : 'pointer',
					zIndex: '1'
				}, document.body); ads.setStyle(this.replayBtn, {
					top : ads.getCoords(this.wraper).top + 'px',
					left : (document.body.clientWidth - 950) / 2 + 950 + 'px'
				}), addEvent(this.replayBtn, 'click', function() {
					self.show();
				})
			}
		},
		closeAll : function() {
			var self = this;

			if(self.replayBtn) {
				ads.setStyle(self.replayBtn, {
					display : 'block'
				});
			} else {
				self.createReplayBtn();
			}
			ads.setStyle(self.wraper, {
				display : 'none',
				height : '0px'
			});
		},
		show : function() {
			var self = this;
			if(self.replayBtn) {
				ads.setStyle(self.replayBtn, {
					display : 'none'
				});
			}
			ads.setStyle(self.wraper, {
				display : 'block',
				height : (self.data.height || 450) + 'px'
			});
			if(this.closeBtn) {
				ads.setStyle(self.closeBtn, {
					display : 'block'
				});
			} else {
				self.createCloseBtn();
			}
			self.timerId = setTimeout(function() {
				self.closeAll();
			}, self.data.playtime || 5000);
		}
	})
})();
