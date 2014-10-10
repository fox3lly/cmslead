/**
 * @author nttdocomo
 */
(function() {
	ads.banner = function(data){
		var text = new ads.Banner(data.params);
		return text.el;
		/*var grid = document.getElementById(data.grid);
		grid.appendChild(text.el);*/
	}
	ads.Banner = Class.extend({
		init : function(data) {
			var isSwf = (/\.swf$/i).test(data.src);
			this.el = document.createElement('div');
			this.el.className="leju-ads";
			
			ads.setStyle(this.el,{width:data.width ? data.width+"px" : 0,height:data.height ? data.height+"px":0})
			if(isSwf){
				if(!data.flashvars){
    				data.flashvars ={"adlink":data.link || ""};
				} else {
					if(!data.flashvars.adlink){
						data.flashvars["adlink"]=data.link || "";
					}
				}
				if(ads.isChrome){
					if(data.type == 'tearpage'||data.type == 'plp'){
						this.swf(data);
					}else{
						this.newswf(data);
					}	
				}else{
					this.swf(data);
				}
			} else {
				this.image(data);
			}
		},
		newswf:function(data){
				var flashvars = data.flashvars || "";
				this.el.className += " banner-" + data.width;
				var swflink = [];
				if (flashvars) {
					for (var i in flashvars) {
						if ("adlink" == i) {
							swflink.push(i+"="+escape(flashvars[i]));
						}
						else {
							swflink.push(i+"="+flashvars[i]);
						}
					}
				}
				var swfObj='<object style="outline:none;width:'+data.width+'px;height:'+data.height+'px;" data="'+data.src+'" ><param value="never" name="allowscriptaccess"><param value="opaque" name="wmode"><param value="high" name="quality"><param value="'+swflink.join('&')+'" name="flashvars"><param value="application/x-shockwave-flash" name="type"></object>'
				this.el.style.position = 'relative';
				this.el.innerHTML = swfObj;
		},
		swf:function(data){
			var swfUrl = data.src, id = data.id || "", width = data.width || "100%", height = data.height || "100%", version = data.version || "7", flashvars = data.flashvars || "", params = data.params || {wmode:'opaque'}, attributes = data.attributes || "", bgcolor = data.bgcolor || "", quality = data.quality || "high", useExpressInstall = data.useExpressInstall || false
			var swf = new sinaFlash(swfUrl, id, width, height, version, useExpressInstall, bgcolor, quality);
			if (flashvars) {
                for (var i in flashvars) {
                    if ("adlink" == i) {
                        swf.addVariable(i, escape(flashvars[i]));
                    }
                    else {
                        swf.addVariable(i, flashvars[i]);
                    }
                }
            }
            if (params) {
                for (var i in params) {
                    swf.addParam(i, params[i]);
                }
            }
            swf.__forSetAttribute("id",data.id);
            swf.__forSetAttribute("name",data.name);
            swf.__forSetAttribute("width","100%")
            swf.__forSetAttribute("height","100%");
            this.el.className += " banner-" + width;
			this.el.innerHTML = swf.getFlashHtml();
			this.swfobj = swf;
		},
		image:function(data){
			var width = data.width ? data.width+"px" : "100%",
				height = data.height ? data.height+"px" : "100%",
				src = data.src ||"" ,
				link = data.link ||"";
			this.el.className += " banner-" + data.width;
			this.el.innerHTML = '<a href="'+link+'" target="_blank" style="border:none;"><img alt="" style="border:none;width:'+width+';height:'+height+';" width="'+data.width+'" height="'+data.height+'"  src="'+src+'" /></a>';
		}
	});
})();
