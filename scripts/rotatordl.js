/**
 * @author nttdocomo
 */
(function() {
	var leftMiniDl, rightMiniDl, top = '10px', banner;
	var dls = [leftMiniDl, rightMiniDl];
	function creaCloseBtn(el) {
		var closeBtn = ads.createElement('div', {
			"className" : 'close_btn'
		}, null, el)
	}

	function createElement(data, align, delay) {
		var el = new ads.Banner(data).el;
		el.style.position = 'absolute';
		el.style[align] = '0px';
		el.style.top = top;
		el.id = align + "_miniDl";
		addEvent(el, 'mouseenter', function() {
			banner.style.display = 'block';
		})
		addEvent(el, 'mouseleave', function() {
			banner.style.display = 'none';
		})
		setTimeout(function(){
           document.body.appendChild(el);			
		},delay)
		creaCloseBtn(el);
		return el;
	}

	function createBanner(data,zindex) {
		var el = new ads.Banner(data).el;
		ads.setStyle(el, {
			position : 'absolute',
			top : '10px',
			left : (document.body.clientWidth - 950) / 2 + 'px',
			display : 'none',
			zIndex : zindex
		});
		el.id = "centerkl";
		banner = el;
        document.body.appendChild(el);			
	}


	ads.miniDl = function(data) {
		var align = ['left', 'right'];
		var src = data.params.src;
		var delay = data.params.delay || 1000;
		var zindex = data.params.zIndex || 9999;
		for(var i = 0, len = src.length; i < len - 1; i++) {
			dls[i] = createElement({
				src : src[i],
				width : '25',
				height : '300',
				flashvars : {
					link : data.params.link
				}
			}, align[i], delay)
		}
		addEvent(document, 'click', function(e) {
			var target = ads.getEventTarget(e);
			if(target.className === 'close_btn' && /miniDl/.test(target.parentNode.id)) {
				for(var i = 0, len = dls.length; i < len; i++) {
					dls[i].parentNode.removeChild(dls[i])
				}
				if(document.getElementById("centerkl").style.display != "none" ){
					document.getElementById("centerkl").parentNode.removeChild(document.getElementById("centerkl"));
				}
			}
		})
		createBanner({
			src : src[2],
			width : '950',
			height : '70',
			flashvars : {
				link : data.params.link
			}
		},zindex);
	}
})();
