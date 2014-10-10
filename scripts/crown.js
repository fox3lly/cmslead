/**
 * @author hujinglin
 */
(function() {
	ads.crown = function(data){
		var obj = new ads.Crown(data.params);
	}
	ads.Crown = Class.extend({
		init: function(data) {
			data.width = data.width || 0;
			data.height = data.height || 0;
			data.cwidth = data.cwidth || 0;
			data.cheight = data.cheight || 0;
			data.pause = data.playtime || 8000;
			data.link = data.link || "";
			data.flashvars = {adlink: data.link};
			var banner = new ads.Banner(data).el;
			ads.setStyle(banner, {
				margin: "0 auto",
				position: "relative"
			});
			document.body.insertBefore(banner, document.body.firstChild);			
			var bigRight = ads.createElement('div', '', {
				width: data.cwidth + 'px',
				height: data.cheight + 'px',
				background: 'url('+data.rsrc+') 0 0 no-repeat',
				position: 'absolute',
				top: '0px',
				right: '-'+data.cwidth+'px',
				zIndex: '1'
			}, banner, 'append');
			var bigLeft = ads.createElement('div', '', {
				width: data.cwidth + 'px',
				height: data.cheight + 'px',
				background: 'url('+ data.lsrc +') 0 0 no-repeat',
				position: 'absolute',
				top: '0px',
				left: '-'+data.cwidth+'px',
				zIndex: '1'
			}, banner, 'append');
			var button = ads.createElement('div', '', {
				width: '18px',
				background: '#dedede',
				border: '1px solid #666',
				position: 'absolute',
				right: '-20px',
				top: '0px',
				display: 'none',
				zIndex:'1'
			}, banner, 'append');
			button.innerHTML = '<p style="padding:4px 0;text-align:center;cursor:pointer;">\u5C55\u5F00<p>';
			setTimeout(rollUp, data.pause);
			addEvent(button, 'mouseover', function() {button.style['display'] = 'none';expan();});
			function expan() {
				var cur = parseInt(bigRight.style['height']);
				cur += 10;
				if (cur < data.cheight) {				
					bigRight.style['height'] = cur + 'px';
					bigLeft.style['height'] = cur + 'px';
					setTimeout(expan, 60);
				} else {
					bigRight.style['height'] = data.cheight + 'px';
					bigLeft.style['height'] = data.cheight + 'px';
					setTimeout(rollUp, data.pause);
				}
			}
			function rollUp() {
				var cur = parseInt(bigRight.style['height']);
				cur -= 10;
				if (cur > 0) {				
					bigRight.style['height'] = cur + 'px';
					bigLeft.style['height'] = cur + 'px';
					setTimeout(rollUp, 60);
				} else {
					bigRight.style['height'] = '0px';
					bigLeft.style['height'] = '0px';
					button.style['display'] = 'block';
				}
			}
		}
	});
})();
