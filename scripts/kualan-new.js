/**
 * @author Adam
 */

if (typeof(miniRotatorDL) != "object") {
	function selectRenderDl(data){//循环跨栏广告数据
		var minidls = [];
		var j = 1;//轮播数
		var z = 2;//轮播数
		for (var i = 0; i < data.length; i++) {
			var now = new Date().getTime();//获取当前时间
			var startDate = new Date(data[i][4]).getTime();//获取广告投放开时间
			var endDate = new Date(data[i][5] + " 23:59:59").getTime();//获取广告投放结束时间
			if (now > startDate && now < endDate) {//如果当前时间在开始和结束时间之内
				minidls.push(data[i]);
			}
		}
		var url = document.location.href;
	    var cookieFiled = "sinaRotatorDL" + escape(url.substr(url.indexOf("/", 7), 2));
		var currentId = getCurrentId(cookieFiled);//获取cookie中显示次数
		currentId = currentId == "" ? Math.floor(Math.random() * minidls.length) : ++currentId;//判断是否有显示过跨栏，以currentId为判断条件，如果没有显示过，则按照候选广告长度随机初始化一个值，如果显示过，则显示次数加1
    	adsNum = currentId%minidls.length;//用显示次数除以候选广告长度，取余数，模拟每次刷新按顺序显示候选广告
        _setCookie(cookieFiled, currentId);//将像是此时写入cookie
        console.log(minidls.length);
		miniRotatorDL(minidls[adsNum]);//渲染广告
	}
	function miniRotatorDL(minidls){
		var _this = this;
		var $body = $(document.body);
		var minirdlBg = "#000000", minirdlAlpha = 70;
		var bdy = (document.documentElement && document.documentElement.clientWidth) ? document.documentElement : document.body;
		var mainWidth = bdy.offsetWidth - 50;
		var miniDL_bg_swf_l = "http://d1.sina.com.cn/ads/test/081121/miniDL_bg_swfl.swf";
		var miniDL_bg_swf_r = "http://d1.sina.com.cn/ads/test/081121/miniDL_bg_swfr.swf";
		var miniDL_bg_swf;
		var miniDL_st;
		var hasShow = false;
		var css = document.getElementsByTagName("head")[0].getElementsByTagName("style")[0];
		css = css ? css : document.getElementsByTagName("head")[0].appendChild(document.createElement("style"));
		var miniDL_css = '#miniDL_left{position:absolute;width:25px;height:350px;top:5px;left:0;overflow:hidden;display:none;font-size:12px;z-index:8888888;}#miniDL_left_cls,#miniDL_right_cls{position:absolute;width:25px;height:17px;background:url(http://d1.sina.com.cn/ads/test/lmttest/080828/demo2/close.gif) no-repeat 0 0;top:305px;display:none;cursor:pointer;overflow:hidden;z-index:8888888;}#miniDL_left_cls{left:0;}#miniDL_right{position:absolute;width:25px;height:350px;top:5px;right:0;overflow:hidden;display:none;font-size:12px;z-index:8888888;}#miniDL_right_cls{right:0;}#miniDL_out{position:absolute;width:950px;height:90px;top:5px;overflow:hidden;display:none;font-size:12px;z-index:8888889;}#miniDL_cls{position:absolute;width:77px;height:31px;background:url(http://d4.sina.com.cn/ads/test/lmttest/080828/demo2/cls_77x31.gif) no-repeat center;cursor:pointer;top:75px;overflow:hidden;display:none;z-index:8888889;}#miniDL_bg{position:absolute;height:90px;top:5px;left:0;overflow:hidden;font-size:12px;z-index:8888888;text-align:center;display:none;overflow:hidden;filter:alpha(opacity=' + minirdlAlpha + ');-moz-opacity:' + minirdlAlpha / 100 + ';opacity:' + minirdlAlpha / 100 + ';background:none;}';
		if (css.styleSheet) {//For IE
		    css.styleSheet.cssText += miniDL_css;
		}
		else {
		    var css_text = document.createTextNode(miniDL_css);
		    css.appendChild(css_text);
		};
		var $leftDl = banner([minidls[0],minidls[3],minidls[4],minidls[5],minidls[6],minidls[7]],"miniDL_left");
		var $miniDlLeftCloseButton = closeButton("miniDL_left_cls");
		var $rightDl = banner([minidls[1],minidls[3],minidls[4],minidls[5],minidls[6],minidls[7]],"miniDL_right");
		var $miniDlRightCloseButton = closeButton("miniDL_right_cls");
		var $miniDl = $("<div></div>").attr("id","miniDL_out");
		appendAds($miniDl[0],[minidls[2],minidls[3],minidls[4],minidls[5],minidls[6],minidls[7]],950,70)
		var $miniDlCloseButton = $("<div></div>").attr("id","miniDL_cls").bind("click",function(){
			$(this).hide();
			$miniDl.hide();
			hasShow = false;
		});
		var $miniDlBackground = $("<div></div>").attr("id","miniDL_bg");
		$body.append($miniDl);
		$body.append($miniDlCloseButton);
		$body.append($miniDlBackground);
		function banner(data,name){
			var $miniDl = $("<div></div>").css({width:"25px",height:"300px"}).attr("id",name).bind("mouseover",function(){
				var direction = name.split("_")[1];
				centerDl = centerBanner([minidls[2],minidls[3],minidls[4],minidls[5],minidls[6],minidls[7]],direction);
			}).appendTo($body).show();
			appendAds($miniDl[0],data,25,300);
			return $miniDl;
		};
		function closeButton(name){
			return $("<div></div>").attr("id",name).bind("click",function(){
				$leftDl.hide();
				$miniDlLeftCloseButton.hide();
				$rightDl.hide();
				$miniDlRightCloseButton.hide();
				$miniDl.hide();
				$miniDlCloseButton.hide();
				$miniDlBackground.hide();
			}).appendTo($body).show();
		}
		function centerBanner (data,derection){
			if (!hasShow){
				hasShow = true;
				clearTimeout(miniDL_st);
				var miniDL_bg_swf;
				if (derection == "left"){
					miniDL_bg_swf = "http://d1.sina.com.cn/ads/test/081121/miniDL_bg_swfl.swf";
				}else {
					miniDL_bg_swf = "http://d1.sina.com.cn/ads/test/081121/miniDL_bg_swfr.swf";
				}
				var b = new sinaFlash(miniDL_bg_swf, "extBg", mainWidth, 90, "7", "", false, "High");
	            b.addParam("wmode", "transparent");
	            b.addVariable("tmpColor", minirdlBg);
	            b.addVariable("tmpAlpha", minirdlAlpha);
	            b.addVariable("tmpWidth", mainWidth);
	            b.write($miniDlBackground[0]);
				$miniDlBackground.show();
				var hideBg = setTimeout(function(){
					clearTimeout(hideBg);
					$miniDlBackground.html("");
					$miniDl.show().css("left",(bdy.offsetWidth - 950) / 2 + "px");
					$miniDlCloseButton.show().css("left",(bdy.offsetWidth - 950) / 2 + 873 + "px");
		        }, 400);
		        miniDL_st = setTimeout(function(){
					$miniDl.hide();
					hasShow = false;
					$miniDlCloseButton.hide();
					$miniDlBackground.hide();
				}, 5400);
			}
		};
		function getSuffix(fileUrl){
			var index = fileUrl.lastIndexOf(".");
			var suffix = fileUrl.substring(index+1,fileUrl.length);
			return suffix;
		};
		function appendAds(el,data,width,height){
			var suffix = getSuffix(data[0]);
			if (suffix == "swf") {
                var s = new sinaFlash(data[0], el.id + "_swf", width, height, "7", "", false, "High");
                s.addParam("wmode", "transparent");
                s.addVariable("adlink", escape(data[1]));
                s.write(el)
            }
            if (suffix == "jpg" || suffix == "gif") {
                el.innerHTML = '<a href="' + data[1] + '"><img src="' + data[0] + '" border="0" width="' + width + '" height="' + height + '" /></a>';
            }
		}
	};
	function getCurrentId(field){
        var cookieArray = document.cookie.split("; ");
        for (var i = 0; i < cookieArray.length; i++) {
            var keyValue = cookieArray[i].split("=");
            if (keyValue[0] == field) {
                return unescape(keyValue[1])
            }
        }
        return "";
    }
    function _setCookie(filed, currentId){
        var now = new Date();
        var expire = new Date(now.getTime() + 1440 * 60000);
        var domain = document.domain != "" ? ("domain=" + document.domain + ";") : "";
        document.cookie = filed + "=" + escape(currentId) + ";path=/;" + domain + "expires=" + expire.toGMTString() + ";"
    }
};
