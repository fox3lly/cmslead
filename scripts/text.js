(function() {
	ads.text = function(data){
		var text = new ads.Text(data.params)
		return text.el;
		/*var grid = document.getElementById(data.grid);
		grid.appendChild(text.el)*/
	}
	ads.Text = Class.extend({
		init : function(data) {
			data.color=data.color|| "#000";
			var snippet = '<a href="{{=it.link}}" style="color:{{=it.color}}">{{=it.text}}<a>';
			var doUCompiled = doU.template(snippet);
			var div = document.createElement('div');
			div.innerHTML = doUCompiled(data);
			this.el = div.firstChild;
		}
	});
})();
(function() {
	ads.multitext = function(data){
		var multitext = new ads.multiText(data);
		return multitext.el;	
	}
	ads.multiText = Class.extend({
		init : function(data) {
			this.el = ads.createElement('div',null,{
				border:data.border || '1px solid #CCCCCC',
				clear:'both',
				textAlign:'center',
				overflow:'hidden',
				width:data.width+'px' || '950px',	
				height:data.height+'px' || '50px'	
			});
			var warp = document.createElement('ul');
	        ads.setStyle(warp,{margin:data.margin});
	        this.el.appendChild(warp);
			for(var i = 0 ;i < data.params.length;i++){
				if(data.params[i].text){
					var li = ads.createElement('li', null, {
							width : data.textwidth+'px' || '160px',
							lineHeight:data.lineHeight+'px' || '25px',
							margin:data.textmargin || '0px 40px',
							"float":"left",
							"fontSize":"12px"
					}, null);
					var a = ads.createElement('a', {
						href : data.params[i].link
					}, {
						color : data.params[i].color
					}, li);
					a.innerHTML = data.params[i].text;
					warp.appendChild(li);
				}
			}
			
		}
	});
})();
