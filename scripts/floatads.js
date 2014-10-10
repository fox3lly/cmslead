/**
 * @author Chris
 */ 
(function() {
	ads.floatads = function(data) {
		var floatads = new ads.Floatads(data.params);
	}
	ads.sdlCreate = Class.extend({
		init:function(playtime,src,attributes,link,ds,delay,zindex,eventType){
			var self = this;
			this.dl = [];
			this.dataStyle = [];
			for (var i = 0; i<2;i++){
				this.dataStyle[i] = this.settingWHT(attributes[i],ds[i]);
				var dataAttrs = {
					src:src[i],
					width:/^\d+/.exec(this.dataStyle[i].width),
					height:/^\d+/.exec(this.dataStyle[i].height)
				}
				link?dataAttrs.link = link:"";
				this.dataStyle[i].position = "absolute";
				this.dl[i] = new ads.Banner(dataAttrs).el;
			}
			this.top = /^\d+/.exec(this.dataStyle[0].top);
			this.dl[1].style.display = "none";
			this.el = document.createElement('div');

			ads.setStyle(this.el,this.dataStyle[0]);
			this.el.style.zIndex = zindex||'9999';
			this.el.appendChild(this.dl[0]);
			this.el.appendChild(this.dl[1]);
			setTimeout(function(){
	           document.body.appendChild(self.el);			
			},delay?delay:0);
			if(eventType != 'click'){
				if(src[1]) {

					var showlock = false;
					

					addEvent(this.dl[0], 'mouseenter', function() {
						self.el.style.width = self.dataStyle[1].width;
						self.dl[0].style.display = "none";
						self.dl[1].style.display = "block";
					});
					addEvent(this.dl[1], 'mouseleave', function() {
						if(!showlock){
							showlock = true
							setTimeout(function() {
								self.el.style.width = self.dataStyle[0].width;
								self.dl[0].style.display = "block";
								self.dl[1].style.display = "none";
								showlock = false;
							}, playtime);
						}
						
					});
				}
			}
		},
		settingWHT:function(a,d){
			var wht={};
			for (i in a){
				if(/^\d+$/.test(a[i]) || a[i] == ""){
					if(d[i]==""){wht[i] = ""}
					else{
						wht[i] = a[i]?a[i]+"px":d[i]+"px";
					}
				}else {wht[i] = a[i];}
			}
			return wht;
		},
		creaCloseBtn:function() {
			this.closeBtn = ads.createElement('div', {
				"className" : 'close_btn'
			}, null, this.el);
			this.closeBtn.style.position = 'absolute';
			this.closeBtn.style.top = this.dataStyle[0].height;
			this.dataStyle[0].left?this.closeBtn.style.left = 0:this.closeBtn.style.right = 0;
		},
		pcreateCloseBtn:function(){
			var psStyle = {
	            top: '-19px',
	            left: '0px'
	        };
	        var self = this;
	        this.closeBtn = ads.createElement('div', null, ads.extend({
	            background: 'url("http://www.sinaimg.cn/hs/sinahouse/images/adb.png") no-repeat scroll 0 -22px transparent',
	            height: '19px',
	            width: '57px',
	            position: 'absolute',
	            cursor: 'pointer'
	        }, psStyle), this.el);
	        addEvent(this.closeBtn, 'click', function(){
	            self.closeAll(self.el);
	        })
		},
		closeAll: function(el){
			el.parentNode.removeChild(el);
		},
		scroll:function(){
			ads.animate(this.el, {
				top: (document.documentElement.scrollTop || document.body.scrollTop) + parseInt(this.top) + "px"
			},{
				duration: 500,
				easing: "easeOutCirc"
			});
		},
		pscroll : function() {
			ads.setStyle(this.el, {
				top : (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - (/^\d+/.exec(this.dataStyle[0].height)) - (/^\d+/.exec(this.dataStyle[0].bottom)) + "px"
			});
			var self = this;
			addEvent(window, 'scroll', ads.throttle(function() {
				ads.animate(self.el, {
					top : (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - self.el.clientHeight - (/^\d+/.exec(self.dataStyle[0].bottom)) + "px"
				}, {
					duration : 500,
					easing : "easeOutCirc"
				})
			}, 200));
			addEvent(window, 'resize', ads.throttle(function() {
				ads.animate(self.el, {
					top : (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - self.el.clientHeight - (/^\d+/.exec(self.dataStyle[0].bottom)) + "px"
				}, {
					duration : 500,
					easing : "easeOutCirc"
				})
			}, 200));
		}
	});
	ads.Floatads = Class.extend({
		init: function(data){
			this.data = data;
			for (var i = 0; i<this.data.attributes[0].length;i++){
				this.data.attributes[0][i].left = !this.data.attributes[0][i].left?this.data.attributes[0][i].left==0 ?"0":"":this.data.attributes[0][i].left;
				this.data.attributes[0][i].right = !this.data.attributes[0][i].right?this.data.attributes[0][i].right==0 ?"0":"":this.data.attributes[0][i].right;
			}
			this.data.delay = this.data.delay || 1000;
			//区分播放时间，为空的话修改为默认值8，为0表示不延迟（流媒体的话会被覆盖为5）
			this.data.playtime = String(this.data.playtime);
			if(this.data.playtime ==''){
				this.data.playtime = 8;
			}else{
				this.data.playtime = Number(this.data.playtime);
			}
			//this.data.playtime = this.data.playtime || 8;
			this.create();
		},
		create: function(){
			var self = this;
			var srcLength = this.data.src.length;
			
			var defStyle = [{"width":"25","height":"300","top":"60","left":"0","right":"","bottom":""},{"width":"100","height":"300","top":"60","left":"0","right":"","bottom":""}];
			if(srcLength == 1){
				
				if(this.data.eventType == "click"){
					//流媒体
					defStyle = [{"width":"200","height":"200","top":"60","left":"0","right":"","bottom":""},{"width":"20","height":"200","top":"","left":"","right":"5","bottom":"150"}];
					var cosbuttonh = 57;
				    var cosbuttonw = 20;
				    var leftlength, idTime;
					this.leftdl = new ads.sdlCreate(this.data.playtime*1000,this.data.src[0],this.data.attributes,this.data.link,defStyle,this.data.delay,this.data.zIndex,this.data.eventType);
					var largdiv = this.leftdl.dl[0];
					var smalldiv = this.leftdl.dl[1];
			    	var data = this.data;
					smalldiv.style.overflow="hidden";
					var media = this.leftdl.el;
					media.isclick = false;
					media.style.position = 'absolute';
					media.style.width = "";
					media.style.height = "";
					media.style.top = getheight(this.data.attributes[0].height||defStyle[0].height);
					media.style.right = (document.body.clientWidth - (this.data.attributes[0].width||defStyle[0].width))/2 + 'px';
					media.style.zIndex = '9999';
					media.style.cursor = 'pointer';
					media.preRight = media.style.right;
					media.preWidth = this.data.attributes[0].width||defStyle[0].width;
					
					addEvent(window, 'scroll',ads.throttle(function(){
						divplay(media.isclick);
					}, 200));
					addEvent(window, 'resize', ads.throttle(function(){
						media.preRight = (document.body.clientWidth - media.preWidth)/2 + 'px';
						divplay(media.isclick);			
					}, 10));
					
					if(this.data.closebtn) {
						var closediv = document.createElement('div');
						closediv.style.backgroundImage = 'url(http://www.sinaimg.cn/hs/sinahouse/images/adb.png)';
						closediv.style.backgroundPosition = '-0px -65px';
						closediv.style.height = '40px';
						closediv.style.width = cosbuttonw +'px';					
						closediv.style.position = 'absolute';
						closediv.style.top = ((this.data.attributes[1].height||defStyle[1].height)*1+20)+'px';
						closediv.style.zIndex = '9999';
						closediv.style.display='none';
						closediv.style.right='0';
						media.appendChild(closediv);
						//流媒体小图关闭
						addEvent(closediv, 'click',function(){
							media.parentNode.removeChild(media);
						});					
					}
					var contrdiv = document.createElement('div');
					contrdiv.style.backgroundImage = 'url(http://www.sinaimg.cn/hs/sinahouse/images/adb.png)';
					contrdiv.style.backgroundPosition = '0px 0px';
					contrdiv.style.height = cosbuttonw+'px';
					contrdiv.style.width = cosbuttonh+'px';
					contrdiv.style.top = '0px';					
					contrdiv.style.right = '0px';
					contrdiv.style.position = 'absolute';
					contrdiv.style.zIndex = '9999';
					media.appendChild(contrdiv);
					//流媒体大图关闭
					addEvent(contrdiv, 'click', ads.throttle(function(){
						timefun();
					}, 20));
					idTime = window.setTimeout(timefun,(this.data.playtime||5)*1000);
					addEvent(window,'scroll',ads.throttle(function(){
						self.leftdl.scroll(self.leftdl.el)},300));
				}else{
					// 漂流瓶
					if (!(this.data.attributes[0] instanceof Array)){
						defStyle = [{"width":"150","height":"150","top":"","left":"150","right":"","bottom":"0"},{"width":"300","height":"150","top":"","left":"150","right":"","bottom":"0"}];
						this.leftdl = new ads.sdlCreate(this.data.playtime*1000,this.data.src[0],this.data.attributes,this.data.link,defStyle,this.data.delay,this.data.zIndex,this.data.eventType);
						this.leftdl.el.style.bottom = "";
						this.leftdl.dl[0].style.marginBottom = "0px";
						this.leftdl.dl[1].style.marginBottom = "0px";
						if(this.data.closebtn){
				        	this.leftdl.pcreateCloseBtn()
				        }
				        this.leftdl.pscroll();


				        //调整漂流瓶首先显示大图(激活playtime参数)

						var PthatSelf = this;
						if(PthatSelf.data.src[0][1]){
				        	//console.log(PthatSelf.data.playtime*1000+this.data.delay);
							if (PthatSelf.data.playtime > 0) {
								
								PthatSelf.leftdl.el.style.width = PthatSelf.leftdl.dataStyle[1].width;
								PthatSelf.leftdl.dl[0].style.display = "none";
								PthatSelf.leftdl.dl[1].style.display = "block";
								setTimeout(function() {
									PthatSelf.leftdl.el.style.width = PthatSelf.leftdl.dataStyle[0].width;
									PthatSelf.leftdl.dl[0].style.display = "block";
									PthatSelf.leftdl.dl[1].style.display = "none";
								}, PthatSelf.data.playtime*1000+this.data.delay);
							}
				        }
						
						 //调整漂流瓶首先显示大图(激活playtime参数)end
					}else{
						//单边
						if((!this.data.attributes[0][0].left) && this.data.attributes[0][0].right){
							defStyle = [{"width":"25","height":"300","top":"60","left":"","right":"0","bottom":""},{"width":"100","height":"300","top":"60","left":"","right":"0","bottom":""}];
						}
						this.leftdl = new ads.sdlCreate(this.data.playtime*1000,this.data.src[0],this.data.attributes[0],this.data.link,defStyle,this.data.delay,this.data.zIndex,this.data.eventType);
						//调整单边首先显示大图(激活playtime参数)
						var thatSelf = this;
						//console.log(thatSelf.data.playtime*1000+this.data.delay);
						if(thatSelf.data.src[0][1]){
							if (thatSelf.data.playtime > 0) {
								thatSelf.leftdl.el.style.width = thatSelf.leftdl.dataStyle[1].width;
								thatSelf.leftdl.dl[0].style.display = "none";
								thatSelf.leftdl.dl[1].style.display = "block";
								setTimeout(function() {
									thatSelf.leftdl.el.style.width = thatSelf.leftdl.dataStyle[0].width;
									thatSelf.leftdl.dl[0].style.display = "block";
									thatSelf.leftdl.dl[1].style.display = "none";
								}, thatSelf.data.playtime*1000+this.data.delay);
							}
						}
						
						//调整单边首先显示大图(激活playtime参数)end
						if(this.data.closebtn) {
							this.leftdl.creaCloseBtn();
							addEvent(this.leftdl.closeBtn,'click',function(){
								self.leftdl.closeAll(self.leftdl.el);
							});
							addEvent(window,'scroll',ads.throttle(function(){
								self.leftdl.scroll(self.leftdl.el)
							},300));
						}
					}
				}
			}else {
				//对联或者跨栏
				this.miniDl = [];
				this.miniDl[0] = new ads.sdlCreate(this.data.playtime*1000,this.data.src[0],this.data.attributes[0],this.data.link,defStyle,this.data.delay,this.data.zIndex);
				
				//delete this.data.attributes[0][0].left; 
				//delete this.data.attributes[0][1].left;
				defStyle = [{"width":"25","height":"300","top":"60","left":"","right":"0","bottom":""},{"width":"100","height":"300","top":"60","left":"","right":"0","bottom":""}];
				
				this.miniDl[1] = new ads.sdlCreate(this.data.playtime*1000,this.data.src[1],this.data.attributes[0],this.data.link,defStyle,this.data.delay,this.data.zIndex);
				
				if(this.data.closebtn){
					this.miniDl[0].creaCloseBtn();
					this.miniDl[1].creaCloseBtn();
					addEvent(this.miniDl[0].closeBtn,'click',function(){
						self.miniDl[0].closeAll(self.miniDl[0].el);
						self.miniDl[1].closeAll(self.miniDl[1].el);
					});
					addEvent(this.miniDl[1].closeBtn,'click',function(){
						self.miniDl[0].closeAll(self.miniDl[0].el);
						self.miniDl[1].closeAll(self.miniDl[1].el);
					});
				}
				//双边
				if (srcLength == 2) {
					//调整双边首先显示大图(激活playtime参数)
					var SthatSelf = this;
					//console.log(SthatSelf.data.playtime*1000+this.data.delay);
					if (SthatSelf.data.src[0][1]&&SthatSelf.data.src[1][1]) {
						if (SthatSelf.data.playtime > 0) {
							//self.el.style.width = self.dataStyle[1].width;
							SthatSelf.miniDl[1].el.style.width = SthatSelf.miniDl[0].dl[1].style.width
							//console.log(SthatSelf.miniDl[0].dl[1].style.width)
							//左边
							SthatSelf.miniDl[0].dl[0].style.display = "none";
							SthatSelf.miniDl[0].dl[1].style.display = "block";
							//右边
							SthatSelf.miniDl[1].dl[0].style.display = "none";
							SthatSelf.miniDl[1].dl[1].style.display = "block";
							setTimeout(function() {
								SthatSelf.miniDl[1].el.style.width = SthatSelf.miniDl[0].dl[0].style.width
								SthatSelf.miniDl[0].dl[0].style.display = "block";
								SthatSelf.miniDl[0].dl[1].style.display = "none";
								SthatSelf.miniDl[1].dl[0].style.display = "block";
								SthatSelf.miniDl[1].dl[1].style.display = "none";
							}, SthatSelf.data.playtime * 1000 + this.data.delay);
						}
					}

					//调整双边首先显示大图(激活playtime参数)end

					addEvent(window, 'scroll', ads.throttle(function() {
						self.miniDl[0].scroll(self.miniDl[0].el)
					}, 300));
					addEvent(window, 'scroll', ads.throttle(function() {
						self.miniDl[1].scroll(self.miniDl[1].el)
					}, 300));
				}
				//跨栏
				if(srcLength == 3){
					//跨栏暂未调整成对联的效果
					var banner = new ads.Banner({
						src : this.data.src[2],
						width : this.data.attributes[1].width||'950',
						height : this.data.attributes[1].height||'70',
						link : this.data.link
					}).el;
					ads.setStyle(banner, {
						position : 'absolute',
						top : this.data.attributes[1].top?this.data.attributes[1].top+"px":'10px',
						left : (document.body.clientWidth - (/^\d+/.exec(banner.style.width))) / 2 + 'px',
						display : 'none',
						zIndex : this.data.zIndex || "9999"
					});
					banner.id = "centerkl";
			        document.body.appendChild(banner);
					this.miniDl[0].el.id = "left_miniDl";
					this.miniDl[1].el.id = "right_miniDl";
					var kualanDural = (this.data.playtime||5)*1000;
					for(var i = 0; i < 2; i++) {
						if(kualanDural > 0) {
							addEvent(this.miniDl[i].el, 'mouseleave', function() {								
								banner.kualanTime = setTimeout(function() {banner.style.display = 'none';}, kualanDural);
							});
						} else {							
							addEvent(this.miniDl[i].el, 'mouseleave', function() {
								banner.kualanTime = setTimeout(function() {banner.style.display = 'none';}, kualanDural);
							});
						}
						addEvent(this.miniDl[i].el, 'mouseenter', function() {
								if(banner.kualanTime) {
									clearTimeout(banner.kualanTime);
								}
								banner.style.display = 'block';
						});
						
						addEvent(this.miniDl[i].closeBtn,'click',function(){
							if(document.getElementById("centerkl").style.display != "none" ){
								document.getElementById("centerkl").parentNode.removeChild(document.getElementById("centerkl"));
							}
						});
					}
					addEvent(window, 'resize', ads.throttle(function() {
						ads.animate(banner, {
							left : (document.body.clientWidth - (/^\d+/.exec(banner.style.width))) / 2 + 'px'
						}, {
							duration : 500,
							easing : "easeOutCirc"
						})
					}, 200));					
				}
			}
			function getheight(height){
				var toph = media.isclick?(document.documentElement.clientHeight - (data.attributes[1].bottom||defStyle[1][5]) - height - cosbuttonh):(document.documentElement.clientHeight - height)/2;
				
				return (document.documentElement.scrollTop || document.body.scrollTop) +toph+'px';
			}
			function divplay(isclick){
				if(isclick){
					var num = 1;
					var rightVal = data.attributes[1].right||defStyle[1].right
				}else{
					var num = 0;
					var rightVal = (document.body.clientWidth - (data.attributes[0].width||defStyle[0].width))/2
				}
				
				//leftlength = media.isclick?(data.attributes[1].right||defStyle[1][4])+'px':(document.body.clientWidth - (data.attributes[0].width||defStyle[0][0]))/2+'px';
				ads.animate(media, {top:getheight(data.attributes[num].height||defStyle[0].height),right:rightVal},{duration: 500,easing: "easeOutCirc"});
			}
			function timefun(){
				media.isclick = !media.isclick;
	            if(media.isclick){
					window.clearTimeout(idTime);
					media.preRight = media.style.right;
					media.style.right = "";
		            idTime = null;
					if(data.attributes[1].left) {
						media.style.left = data.attributes[1].left + "px";
					}
					if(data.attributes[1].right) {
						media.style.right = data.attributes[1].right + "px";
					}
				    contrdiv.style.backgroundPosition = '0px -46px';
				    contrdiv.style.height = '20px';
				    contrdiv.style.width = cosbuttonw+'px';
				    contrdiv.style.top = (data.attributes[1].height||defStyle[1].height)+'px';
		            largdiv.style.display='none';
		            smalldiv.style.display='block';
					if(data.closebtn) {
						closediv.style.display='block';
					}
					divplay(media.isclick);
	            }else{
					media.style.left = "";
					media.style.right = media.preRight;
				    contrdiv.style.backgroundPosition = '0px 0px';
				    contrdiv.style.height = cosbuttonw+'px';
				    contrdiv.style.width = cosbuttonh+'px';
				    contrdiv.style.top = '0px';
					contrdiv.style.right = '0px';
	            	largdiv.style.display='block';
		            smalldiv.style.display='none';
					if(data.closebtn) {
						closediv.style.display='none';
					}
	            	idTime = window.setTimeout(timefun, (data.playtime||5)*1000);
					divplay(media.isclick);
	            }
			}
		}
	})
})();