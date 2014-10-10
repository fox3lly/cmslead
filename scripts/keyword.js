(function() {
	ads.keyword = function(data) {
		var key = new ads.Key(data);
	}
	ads.Key = function(data) {
		var keyobj = data.params;
		var inputList = ads.getElementsByAttribute('input[adsdefault]');
		if (keyobj.text) {
			for (var i = 0, ci; ci = inputList[i++];) {
				ci.value = keyobj.text;
			}
		}
	}
})();
(function() {
	ads.focus = function(data) {
		var focus = new ads.Focus(data);
	}
	ads.Focus = function(data) {
		var id = data.params.wrapId || "slideBox",
			box = document.getElementById(id);
		if (box && data.params.src && data.params.src.lastIndexOf('.jpg') != -1) {
			var width = (data.params.width || 300) + "px",
				height = (data.params.height || 200) + "px",
				alt = data.params.alt,
				src = data.params.src,
				link = data.params.link,
				warp = box.getElementsByTagName('ol')[0] || box.getElementsByTagName('ul')[0],
				count = warp.getElementsByTagName('li').length,
				_value = !+"\v1" ? box["slideo"] : box.getAttribute("slideo"),
				li = document.createElement('li');
			ads.setStyle(li, {
				width: width,
				height: height
			});
			li.innerHTML = '<a href="' + data.params.link + '"><img width="' + width + '" height="' + height + '" slidesrc="' + data.params.src + '" src="' + data.params.src + '" alt="' + data.params.alt + '"></a>';
			count++;
			box.setAttribute('slideo', _value + '_' + count);
			return warp.appendChild(li);
		}
	}
})();
(function() {
	ads.baiduFocus = function(data) {
		var baiduFocus = new ads.BaiduFocus(data);
	}
	ads.BaiduFocus = function(data) {
		var id = data.params.wrapId || "focus_image",
			box = document.getElementById(id),
			numberId = data.params.numberId || "focus_pages",
			numberBox = document.getElementById(numberId);
			if (box && data.params.src && data.params.src.lastIndexOf('.jpg') != -1) {
				var width = (data.params.width || 300) + "px",
					height = (data.params.height || 200) + "px",
					alt = data.params.alt,
					src = data.params.src,
					link = data.params.link,
					warp = box,
					count = box.children.length, 
					div = document.createElement('div'),
					label = document.createElement('label');
				div.innerHTML = '<a target="_blank" href="' + data.params.link + '"><img width="' + width + '" height="' + height + '" alt="' + data.params.alt + '" title="' + data.params.alt + '" src="' + data.params.src + '"></a>';
				count++;
				label.innerHTML = count;
				numberBox.appendChild(label);
				warp.appendChild(div);
			}
	}
})();
