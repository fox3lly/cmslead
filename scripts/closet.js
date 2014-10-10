/**
 * @author hujinglin
 */
(function() {
	ads.closet = function(data){
		var obj = new ads.Closet(data.params);
		return obj.el;
	}
	ads.Closet = Class.extend({
		init: function(data) {
			this.el = document.createElement('div');
			this.el.className = "leju-ads";	
			data.delay = data.delay || 500;					//弹出层持续时间
			data.height = data.height || 0;					//外层容器高度
			data.width = data.width || 0;					//外层容器宽度
			data.spacing = data.spacing || 8;				//小图间距
			data.background = data.background || "#aaa"; 	//背景图
			data.location = data.location || "bottom";		//大图位置
			//处理小图padding数据
			data.padding = data.padding || "0";
			var paddingStr = data.padding.replace(/\s/g, "px ");
			var marginStr = '0';
			var topStr = '0';
			var leftStr = '0';
			var paddingList = data.padding.split(" ");
			var paddingTop = paddingList[0] || 0;
			var paddingBottom = paddingList[2] || paddingList[0] || 0;
			var paddingLeft = paddingList[paddingList.length - 1];
			var outerHeight = parseInt(paddingBottom) +  parseInt(paddingTop) +  parseInt(data.height);
			//外层容器
			var closetCon = ads.createElement(
			'div', '', {
				width: data.width+"px",
				position: 'relative',
				background: data.background
			}, this.el, 'append');
			
			//品牌小图容器
			var brandCon = ads.createElement('div', '', {
				padding: paddingStr+"px",
				overflow: 'hidden',
				zoom: '1'
			}, closetCon, 'append');
			//品牌大图容器
			var bannerCon = ads.createElement('div', '', {
				marginBottom: '10px',
				display: 'none',
				overflow: 'hidden',
				position: 'absolute'
			}, closetCon, 'append');
			bannerCon.timeOutX = {};
			var brandList = [];
			var bannerList = [];
			var isSwf, sWidth, link, esrc, src;
			//创建品牌小图和大图元素
			for(var i=0; data.list[i]; i++) {
				var bannerData = {
					width: data.list[i].width || 150,
					height: data.height || 40,
					src: data.list[i].src,
					link: data.list[i].link,
					flashvars:{adlink: data.link}
				}
				brandList[i] = new ads.Banner(bannerData).el;
				ads.setStyle(brandList[i], {
					cssFloat: 'left',
					styleFloat: 'left',
					overflow: 'hidden',
					marginRight: data.spacing+'px',
					marginBottom: "0"
				});
				brandCon.appendChild(brandList[i]);	
				data.list[i].cwidth = data.list[i].cwidth || 950;
				data.list[i].cheight = data.list[i].cheight || 100;
				bannerData.src = data.list[i].esrc;
				bannerData.width = data.list[i].cwidth;
				bannerData.height = data.list[i].cheight;
				if(bannerData.src){
					bannerList[i] = new ads.Banner(bannerData).el;
					//处理大图位置数据
					switch(data.location) {
						case "top":
							marginStr = (parseInt(data.list[i].cheight)+10) + "px 0 0 0";
							topStr = '-' + (parseInt(data.list[i].cheight)+10) + 'px';
							break;
						case "bottom":
							marginStr = "0 0 " + (parseInt(data.list[i].cheight)+20) + "px 0";
							topStr = (parseInt(outerHeight)+10) + 'px';
							break;
						case "overlay": 
							topStr = paddingTop + 'px';
							leftStr = paddingLeft + 'px';
							closetCon.style['overflow'] = "hidden";
							break;
					}
					addEvent(brandList[i], 'mouseover', function(i, marginStr,topStr,leftStr) {
						return function() {
							clearTimeout(bannerCon.timeOutX);
							if(bannerCon.firstChild) {
								bannerCon.removeChild(bannerCon.firstChild);
							}
							bannerCon.appendChild(bannerList[i]);
							ads.setStyle(bannerCon, {
								display : 'block',
								width: data.list[i].cwidth+"px",
								height: data.list[i].cheight+"px",
								top: topStr,
								left: leftStr
							});
							closetCon.style['margin'] = marginStr;
						}
					}(i, marginStr,topStr,leftStr));
					if(data.location != "overlay"){
						addEvent(brandList[i], 'mouseout', function(i) {
							return function() {
								bannerCon.timeOutX = setTimeout(function() {
									ads.setStyle(bannerCon, {
										display : 'none',
										width: data.list[i].cwidth+"px",
										height: data.list[i].cheight+"px",
										top: topStr,
										left: leftStr
									});
									closetCon.style['margin'] = "0 0 0 0";
								}, data.delay);
							}
						}(i));
					}else{
						addEvent(bannerCon, 'mouseout', function(i) {
							return function() {
								bannerCon.timeOutX = setTimeout(function() {
									ads.setStyle(bannerCon, {
										display : 'none',
										width: data.list[i].cwidth+"px",
										height: data.list[i].cheight+"px",
										top: topStr,
										left: leftStr
									});
									closetCon.style['margin'] = "0 0 0 0";
								}, data.delay);
							}
						}(i));
					}
				}
			}
			brandList[i-1].style['marginRight'] = '0';
		}
	});
})();
