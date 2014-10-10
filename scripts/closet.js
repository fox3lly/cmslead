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
			data.delay = data.delay || 500;					//���������ʱ��
			data.height = data.height || 0;					//��������߶�
			data.width = data.width || 0;					//����������
			data.spacing = data.spacing || 8;				//Сͼ���
			data.background = data.background || "#aaa"; 	//����ͼ
			data.location = data.location || "bottom";		//��ͼλ��
			//����Сͼpadding����
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
			//�������
			var closetCon = ads.createElement(
			'div', '', {
				width: data.width+"px",
				position: 'relative',
				background: data.background
			}, this.el, 'append');
			
			//Ʒ��Сͼ����
			var brandCon = ads.createElement('div', '', {
				padding: paddingStr+"px",
				overflow: 'hidden',
				zoom: '1'
			}, closetCon, 'append');
			//Ʒ�ƴ�ͼ����
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
			//����Ʒ��Сͼ�ʹ�ͼԪ��
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
					//�����ͼλ������
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
