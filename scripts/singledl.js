/**
 * @author Chris
 */ 
(function() {
	ads.singledl = function(data) {
		var singledl = new ads.SingleDl(data.params);
		addEvent(singledl.closeBtn,'click',function(){
			singledl.closeAll();
		});
		addEvent(window,'scroll',ads.throttle(function(){singledl.scroll(singledl.el)},300));
	}
	ads.SingleDl = Class.extend({
		init: function(data){
			this.data = data;
			this.create();
		},
		create: function(){
			var self = this;
			this.style = {
				width: this.data.width,
				height: this.data.height,
				position: 'absolute',
				top: this.data.top,
				src: this.data.src,
				flashvars:{adlink :this.data.link},
				type: this.data.type
			};	
			//this.el = this.makedl(this.style);
			this.el =  new ads.Banner(this.data).el;
			this.setPosition();
			document.body.appendChild(this.el);
			//this._super();
			this.createClossBtn(this.el);
		},
		setPosition:function(){
			ads.setStyle(this.el,{position:'absolute',top:(this.data.top?this.data.top:100)+"px",zIndex:'1'})
			if(typeof this.data.left != 'undefined'){
				this.textAlign = "left";
				ads.setStyle(this.el,{left:(this.data.left?this.data.left:5)+"px"})
			} else {
				this.textAlign = "right";
				ads.setStyle(this.el,{right:(this.data.right?this.data.right:5)+"px"})
			}
		},
		createClossBtn: function(){//创建带有“关闭”字样的按钮			
			this.closeBtn = ads.createElement('div',null,{
				fontSize: '12px',
				backgroundColor:'#fff',
				border:'none',
				padding:'1px 5px',
				display:'block',
				cursor:'pointer',
				textAlign:this.textAlign
			}, this.el)
			this.closeBtn.innerHTML = '\u5173&nbsp;\u95ed';
		},
		closeAll: function(){
			this.el.parentNode.removeChild(this.el);
		},
		scroll:function(){
			ads.animate(this.el, {
				top: (document.documentElement.scrollTop || document.body.scrollTop) + parseInt(this.data.top) + "px"
			},{
				duration: 500,
				easing: "easeOutCirc"
			});
		}
	})
})();
