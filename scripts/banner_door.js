/**
 * @author ningxiao
 */
(function() {
	var minWidth, expandWidth,mainWidth,data,mainDiv,leftDl,rightDl,mainId="main-"+(new Date).getTime(),
			leftDlId = "left-"+(new Date).getTime(),
			rightDlId = "right-"+(new Date).getTime(),
			top;
	var createElement = function (data){
		var mainData = {
			"id" : mainId,
			"src" : "http://www.sinaimg.cn/hs/lingyun/adsswf/Main_B.swf",
			"link" : data.link[0],
			"width" : data.width[2],
			"height" : data.height,
			"flashvars" : {
				showArray : data.src[2],
				adlink : data.link[0],
				playeTime:"10"
			},
			"params":{wmode:'transparent',allowscriptaccess:'always'}
		}
		var leftData = {
			"id" : leftDlId,
			"src" : "http://www.sinaimg.cn/hs/lingyun/adsswf/LeftButton_B.swf",
			"link" : data.link[0],
			"width" : data.width[0],
			"height" : data.height,
			"flashvars" : {
				showArray : [data.src[0], data.src[1]].join(','),
				adlink : data.link[0]
			},
			"params":{wmode:'transparent',allowscriptaccess:'always'}
		}
		var rightData = {
			"id" : rightDlId,
			"src" : "http://www.sinaimg.cn/hs/lingyun/adsswf/RightButton_B.swf",
			"link" : data.link[1],
			"width" : data.width[0],
			"height" : data.height,
			"flashvars" : {
				showArray : [data.src[0], data.src[1]].join(','),
				adlink : data.link[1]
			},
			"params":{wmode:'transparent',allowscriptaccess:'always'}
		}
		mainDiv = (new ads.Banner(mainData)).el;
		mainDiv.id = "mainDiv";
		leftDl = (new ads.Banner(leftData)).el;
		leftDl.id = "leftDiv";
		rightDl = (new ads.Banner(rightData)).el;
		rightDl.id = "rightDiv";
		ads.setStyle(mainDiv, {
			position : "absolute",
			top : top + "px",
			left : (document.documentElement.clientWidth-data.width[2])/2 +"px",
			zIndex:data.zIndex,
			display:"none"
		});
		ads.setStyle(leftDl, {
			position : "absolute",
			top : top + "px",
			zIndex:data.zIndex,
			left : (document.documentElement.clientWidth-data.width[2])/2 - data.width[1] +"px"
		});
		ads.setStyle(rightDl, {
			position : "absolute",
			top : top + "px",
			zIndex:data.zIndex,
			right : (document.documentElement.clientWidth-data.width[2])/2 - data.width[1] +"px"
		});
		document.body.appendChild(mainDiv);
		document.body.appendChild(leftDl);
		document.body.appendChild(rightDl);
	}
	ads.door = function(data) {
		data = data.params;
		top = data.top;
		minWidth = data.width[0] + "px";
		expandWidth = data.width[1] + "px",
		mainWidth = data.width[2] + "px",
		createElement(data)
	}
	var alreadyShow = '';
	//排列顺序左 中 右
	var isPlay = false;
	//是否第一次加载
	var SdivW;
	//竖放广告宽
	var SswfUrl;
	//播放广告位置
	var SdivWa;
	//竖放广告最大宽
	var SdivH;
	//竖放广告高
	var HdivW;
	//横放广告宽
	var HdivH;
	//横放广告高

	/** 横幅广告播放完成执行删除,并且将开关设为true*/
	ads.deleteMain = function() {
		ads.animate(mainDiv,{
			"width" : '0px'
		},{
			duration : 1000,
			easing : 'easeOutQuint',
			complete : function() {
				ads.setStyle(this,{"display":"none"})
			}
		})
		isPlay = true;
	}
	/** 滑入右边的swf触发播放横幅广告*/
	ads.slideAdvertising = function(isheng, uiButton) {
		if(isheng && alreadyShow == '') {
			alreadyShow = uiButton;
			ads.setStyle(mainDiv,{"display":"block","width":"0px"});
			ads.animate(mainDiv,{
				"width" : mainWidth
			},{
				duration : 1000,
				easing : 'easeOutQuint'
			})			
			if(uiButton == 'left') {
				setSwfMaix(isheng, 'leftDiv', expandWidth);
			} else {
				setSwfMaix(isheng, 'rightDiv', expandWidth);
			}
		}
		if(!isheng && alreadyShow != '') {
			alreadyShow = '';
			if(uiButton === 'left') {
				setSwfMaix(isheng, 'leftDiv', minWidth);
			} else {
				setSwfMaix(isheng, 'rightDiv', minWidth);
			}
		}
	}
	/**公用的复位修改js实现*/
	function setSwfMaix(isheng, objectID, width) {
		var swfObject = ads.getSwfObject(objectID == 'leftDiv' ? 'rightDiv' : 'leftDiv');
		if(isheng) {
			swfObject.onMouseMove()
		} else {
			swfObject.onMouseLeave()
		}
		var leftDiv = document.getElementById('leftDiv');
		var rightDiv = document.getElementById('rightDiv');
		leftDiv.style.width = width;
		rightDiv.style.width = width;
	}

})();
