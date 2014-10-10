/**
 * @author river
 */
(function() {
	ads.hjt = function(data){
		var hjt = new ads.Hjt(data.params);
		return hjt.bgbox;
	}
	ads.Hjt = Class.extend({
		init:function(data){
			this.data = data;
			this.create();
		},
		create : function() {
			var self = this;
			var data = self.data;
			var outerheight = (data.height!='')?data.height:"90";// 外围宽高
			var outerwidth = (data.width!='')?data.width:"950";
			var innerheight = (data.show_height!='')?data.show_height:"60";//显示宽高
			var innerwidth = (data.show_width!='')?data.show_width:"700";
			var btn_icon_width=(data.icon_width!="")?data.icon_width:"135";//按钮宽度
			var btn_icon_height=(data.icon_height!="")?data.icon_height:"60";
			var boxMR = (data.box_marginRight!="")?data.box_marginRight:"15";//靠右的距离
			var btnML = (data.btn_marginleft!="")?data.btn_marginleft:"6";//按钮间距
			var margintop = (outerheight-innerheight)/2;
			//创建外围
			self.bgbox = ads.createElement('div',null, {
				width : outerwidth+"px",
				height : outerheight+"px",
				margin :'0 auto',
				clear: 'both',
				overflow:'hidden',
				position:'relative',
				background:'url(' + data.src + ') no-repeat scroll center top #fff'
			},null,null);
			//创建按钮盒子
			self.btnbox = ads.createElement('div',null, {
				clear: 'both',
				height: innerheight+"px",
				marginTop :	margintop+'px',
				marginRight : boxMR+"px",
				'float': 'right',
				width: (parseInt(innerwidth)+parseInt(btnML))+"px"
			},self.bgbox,null);
			//创建显示盒子
			self.showbox = ads.createElement('div',null, {
				height: innerheight+"px",
				position: 'absolute',
				right : boxMR+"px",
				top : margintop+'px',
				overflow:'hidden',
				display:'none',
				width: innerwidth+"px"
			},self.bgbox,null);
			//轮循环加入banner
			for(var i=0; i<data.icon_src.length; i++){
				//先创建一个a，插入到div
				self.btn_a = ads.createElement('a',{
					href : data.links[i],
					target : '_blank'
				}, {
					'float': 'right',
					height: btn_icon_height+'px',
					marginLeft: btnML+'px',
					width: btn_icon_width+'px'
				}, self.btnbox, null);
				//再创建一个img，追加到a里
				self.btn_img = ads.createElement('img',{src : data.icon_src[i]},{
					width : btn_icon_width+'px',
					height : btn_icon_height+'px',
					border : 'none'
				},self.btn_a,null);
				(function(i,self){
					//鼠标移入
					addEvent(self.btn_a, 'mouseover', function() {
						self.showbox.innerHTML = "<a href="+data.links[i]+" style='border:none;'><img alt='' style='border:none;' width="+innerwidth+" heigth="+innerheight+"  src="+data.show_src[i]+" /></a>";
						ads.setStyle(self.showbox, {
							display:'block'
						})
						//隐藏btnbox
						ads.setStyle(self.btnbox, {
							display:'none'
						})
					});
					//鼠标移出
					addEvent(self.showbox, 'mouseout', function() {
						self.showbox.innerHTML='';
						ads.setStyle(self.showbox, {
							display:'none'
						})
						//显示btnbox
						ads.setStyle(self.btnbox, {
							display:'block'
						})
					})
				})(i,self)
				
			}
		}
	})
})();
