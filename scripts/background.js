/**
 * @author nttdocomo
 */
(function() {
	ads.bg = function(data) {
		var data = data.params;
		data.width = data.width || 950;
		data.height = data.height || 30;
		data.width = data.width + '';
		ads.setStyle(document.body, {
			background : 'url(' + data.src + ') no-repeat scroll center top #fff'
		});
		var el = ads.createElement('a', {
			href : data.link,
			target : '_blank'
		}, {
			display : 'block',
			width : data.width.indexOf('%') > -1 ? data.width : data.width+"px",
			height:data.height+"px",
			margin:'0 auto',
			textIndent:'-99999px'
		},document.body,'prepend');
		el.innerHTML = data.text;
	}
})();
