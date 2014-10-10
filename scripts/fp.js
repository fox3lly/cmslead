/**
 * @author nttdocomo
 */
(function() {
	ads.fp = function(data) {
		/*var div = ads.createElement('div', {
			className : "fp"
		}, null, document.body)*/
		var fp = new ads.Fp(data.params);
		return fp.el
	}
	ads.Fp = (function() {
		ads.init();
		var isSupportCss3 = supports('borderRadius') && supports('boxShadow');
		return Class.extend({
			init : function(data) {
				this.version = "7";
				this.slideIndex = 0;
				this.effect = ['easeOutBack', 'easeOutQuint', 'easeOutBounce'];
				this.data = data;
				this.create();
			},
			create : function() {
				var self = this;
				var len = this.data.length;
				if(!isSupportCss3) {
					var pics = [], urls = [];
					for(var i = 0; i < len; i++) {
						if(this.data[i]) {
							pics.push(this.data[i].src);
							urls.push(escape(this.data[i].link));
						}
					}
					var settings = {
						src : "http://i0.sinaimg.cn/hs/zjwei/base/swf/picshow_160x90.swf",
						width : "165",
						height : "95",
						flashvars : {
							ad_num : len == 1 ? 2 : len,
							pic_width : "160",
							pic_height : "90",
							flip_time : "300",
							pause_time : "4000",
							wait_time : "1000",
							pics : pics.join("§"),
							urls : urls.join("§"),
							def_pic : this.data[len - 1].src,
							def_link : escape(this.data[len - 1].link)
						},
						params : {
							menu : "false",
							wmode : "opaque"	 /*fix limeng 修正翻盘遮蔽视窗的bug,原来没这行，这行为注释掉的wmode : "transparent"*/
						}
					}
					self.data = settings;
					var fp = new ads.Banner(self.data);
					ads.setStyle(fp.el, {
						width : '166px',
						height : '96px',
						'float' : 'left',
						padding : '2px 0 0 0',
						overflow : 'hidden'
					});
					this.el = fp.el;
					return;
				} else {
					this.el = ads.createElement('div', {className:"fp"}, {
						borderRadius : '6px',
						width : '160px',
						height : '90px',
						border : '1px solid #000',
						boxShadow : '0 0 3px 1px #333',
						margin : '3px',
						position : 'relative',
						'float' : 'left',
						overflow : 'hidden'
					}, this.el);
					var container = this.container = ads.createElement('ul', null, {
						position : 'absolute',
						padding : '0px',
						margin : '0px'
					}, this.el);
					var fragment = document.createDocumentFragment();
					this.liArray = [];
					for(var i = 0; i < len; i++) {
						if(this.data[i]) {
							var li = ads.createElement('li', null, {
								display : 'block'
							}, null);
							var a = ads.createElement('a', {
								href : this.data[i].link,
								target : '_blank'
							}, {
								backgroundImage : 'url(' + this.data[i].src + ')',
								borderRadius : '4px',
								width : '160px',
								height : '90px',
								border : '0px solid transparent',
								display : 'block'
							}, li);
							this.liArray.push(li);
						}
					}
					this.container.appendChild(this.liArray[this.slideIndex]);
					var btnStyle = {
						borderWidth : '5px',
						borderStyle : 'solid',
						position : 'absolute',
						bottom : '3px',
						height : '0',
						cursor : 'pointer',
						display : 'none'
					};
					var upSlide = this.upSlide = ads.createElement('div', null, ads.extend(btnStyle, {
						borderColor : 'transparent #fff transparent transparent',
						right : '13px'
					}), this.el);
					var downSlide = this.downSlide = ads.createElement('div', null, ads.extend(btnStyle, {
						borderColor : 'transparent transparent transparent #fff',
						right : '0'
					}), this.el);
					addEvent(this.el, 'mouseenter', function() {
						ads.setStyle(self.upSlide, {
							display : 'block'
						});
						ads.setStyle(self.downSlide, {
							display : 'block'
						});
					});
					addEvent(this.el, 'mouseleave', function() {
						ads.setStyle(self.upSlide, {
							display : 'none'
						});
						ads.setStyle(self.downSlide, {
							display : 'none'
						});
					});
					addEvent(upSlide, 'click', function() {
						self.slide(-1);
					});
					addEvent(downSlide, 'click', function() {
						self.slide(1);
					});
					addEvent(downSlide, 'mouseenter', function() {
						ads.setStyle(this, {
							borderColor : 'transparent transparent transparent #000'
						});
					});
					addEvent(upSlide, 'mouseleave', function() {
						ads.setStyle(this, {
							borderColor : 'transparent #fff transparent transparent'
						});
					});
					addEvent(downSlide, 'mouseleave', function() {
						ads.setStyle(this, {
							borderColor : 'transparent transparent transparent #fff'
						});
					});
					container.appendChild(fragment);
					this.startSlide();
				}
			},
			slide : function(direction) {
				if(!this.animateLock) {
					clearInterval(this.timerId);
					this.animateLock = true;
					var self = this;
					var index = this.slideIndex = this.slideIndex + direction;
					if(index < 0) {
						this.slideIndex = index = this.liArray.length - 1;
					}
					if(index == this.liArray.length) {
						this.slideIndex = index = 0;
					}
					var cloneNode = this.liArray[this.slideIndex].cloneNode(true);
					this.container.appendChild(cloneNode);
					ads.animate(this.container, {
						top : -90 + 'px'
					}, {
						duration : 700,
						easing : this.effect[Math.floor(Math.random() * this.effect.length)],
						complete : function() {
							this.removeChild(this.firstChild);
							ads.setStyle(this, {
								top : '0px'
							});
							self.animateLock = false;
							self.startSlide();
						}
					});
				}
			},
			startSlide : function() {
				var self = this;
				this.timerId = setInterval(function() {
					self.slide(1);
				}, 4000);
			}
		});
	})();
})();
