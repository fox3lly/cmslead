/**
 * @author nttdocomo
 */
ads.Dl = ads.extend('Base',{
	required:['MiniDl'],
    updateData: function(data){
		this._super(data.data);
    },
	create:function(){
		var self = this;
		var dlWidth = self.data.width?self.data.width+'px':"25px";
		var dlHeight = self.data.height?self.data.height+'px':"300px";
		var dlEdge = self.data.border?self.data.border+'px':"0px";
		var dlTop = self.data.top?self.data.top+'px':"5px";
		this.leftDl = new ads.MiniDl({
			swfUrl:this.data.left,
			width:dlWidth,
			height:dlHeight,
			left:dlEdge,
			top:dlTop,
			flashvars:{"adlink":this.data.url},
			type:this.type
		});
		this.rightDl = new ads.MiniDl({
			swfUrl:this.data.right,
			width:dlWidth,
			height:dlHeight,
			right:dlEdge,
			top:dlTop,
			flashvars:{"adlink":this.data.url},
			type:this.type
		});
		addEvent(this.rightDl.closeBtn,'click',function(){
			self.closeAll();
		});
		addEvent(this.leftDl.closeBtn,'click',function(){
			self.closeAll();
		});
		if(this.type === 'dl'){
			addEvent(window,'scroll',ads.throttle(ads.bind(this,this.scroll),300));
		}
	},
	closeAll:function(){
		this.rightDl.el.parentNode.removeChild(this.rightDl.el);
		this.leftDl.el.parentNode.removeChild(this.leftDl.el)
	},
	scroll:function(){
		ads.animate(this.rightDl.el, {
            top: (document.documentElement.scrollTop || document.body.scrollTop) + this.data.top + "px"
        },{
			duration: 500,
			easing: "easeOutCirc"
		});
		ads.animate(this.leftDl.el, {
            top: (document.documentElement.scrollTop || document.body.scrollTop) + this.data.top + "px"
        },{
			duration: 500,
			easing: "easeOutCirc"
		})
	}
});
