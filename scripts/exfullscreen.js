/**
 * @author Chris
 */
(function() {
	ads.exfullscreen = function(data) {
		var exfullscreen = new ads.ExFullscreen(data.params);
		return exfullscreen.el;
	}
	ads.ExFullscreen = ads.Base.extend({
		init: function(data){
			this.data = data;
			this.data[0].width = this.data[0].width || 950;
			this.data[0].height = this.data[0].height || 70;
			this.data[1].width = this.data[1].width || 950;
			this.data[1].height = this.data[1].height || 450;
			this.create();
		},
		create : function() {
			var self = this;
			this.el = document.createElement('div');
			this.wrap = [];
			this.fsobj = [];
			this.fsa = [];
			this.wrap[0] = ads.createElement('div',{id : 'exfssmall'},{
				width : this.data[0].width + 'px',
				height : this.data[0].height + 'px',
				overflow : 'hidden',
				position: 'relative',
				clear : 'both'
			},this.el,self.action);//action如果改成'before',ie67就出不来
			this.wrap[1] = ads.createElement('div',{id : 'exfsbig'},{
				width : this.data[1].width + 'px',
				height : '0px',
				overflow : 'hidden',
				clear : 'both',
				position: 'relative',
				display : 'none'
			},this.el,self.action);//action如果改成'before',ie67就出不来
			var templink = this.data[1].link;
			for(var i=0,len=this.data.length; i<len; i++){
				if(this.data[i].src.lastIndexOf('.swf') != -1){
					this.data[i].link = templink;
					this.fsobj[i] = new ads.Banner(this.data[i]).el;
					this.wrap[i].appendChild(this.fsobj[i]);
				}
				else{				
					//先创建一个a，插入到div
					this.fsa[i] = ads.createElement('a',{
						href : this.data[i].link,
						target : '_blank'
					}, null, this.wrap[i], null);
					//再创建一个img，追加到a里
					this.fsobj[i] = ads.createElement('img',{src : this.data[i].src},{
						width : this.data[i].width,
						height : this.data[i].height,
						border : 'none'
					},this.fsa[i],null );
				}
			}
			this.show();
			
		},
		small2big: function(callback){
			var self = this;
			ads.animate(self.wrap[0], {
				height : "0px"
			},{
				duration: 1200,
				easing: "easeOutCirc"
			});
			setTimeout(function(){
				self.wrap[1].style.display = 'block';
				ads.animate(self.wrap[1], {
					height : self.data[1].height + 'px'
				},{
					duration: 2000,
					easing: "easeOutCirc"
				});
				if(callback){setTimeout(function(){callback()},8000)}
			},1200)
		},
		big2small: function(){
			var self = this;
			ads.animate(self.wrap[1], {
				height : '0px'
			},{
				duration: 1800,
				easing: "easeOutCirc"
			});
			setTimeout(function(){
				ads.animate(self.wrap[0], {
					height : self.data[0].height
				},{
					duration: 800,
					easing: "easeOutCirc"
				});
				self.createReplayBtn();
			},1800)
		},
		createReplayBtn : function() {
			var self = this;
			if(self.data[0].replay) {
				this.wraper = this.wrap[0] ? this.wrap[0] : document.body;
				this.replayBtn = ads.createElement('div', null, {
					background : 'url("http://www.sinaimg.cn/hs/sinahouse/images/adb.png") no-repeat scroll -23px -46px transparent',
					height : '57px',
					width : '20px',
					position : 'absolute',
					cursor : 'pointer'
				}, self.wrap[0] ,null); ads.setStyle(this.replayBtn, {
					top : '0px',
					right : '0px'
				}), addEvent(this.replayBtn, 'click', function() {
					self.notimeshow();
				})
			}
		},
		show : function() {
			var self = this;
			setTimeout(function(){
				self.small2big(function(){self.big2small();});
				
			},2500)
		},
		notimeshow : function() {
			var self = this;
			setTimeout(function(){
				self.small2big(function(){self.big2small();});
				
			},10)
		}
	})
})();
