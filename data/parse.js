(function() {
	ads.Data = {};
	var allTypes = {};
	var positionRex = /(t\d{1,2}\-\d{1,2})\-(\d{1})/i;
	var req = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
	ads.reformLunxunbanner = function() {
		var times = ads.getCookie("sinaHouseBanner");
		times = times == "" ? Math.floor(Math.random() * ads.lunxunbannerDataBeforeSort.data.length) : ++times;
		var index = ads.getIndex(times, "sinaHouseBanner", ads.lunxunbannerDataBeforeSort.data.length);
		var temp = ads.lunxunbannerDataBeforeSort.data.slice(index, ads.lunxunbannerDataBeforeSort.data.length);
		ads.lunxunbannerDataBeforeSort.data.splice(index, ads.lunxunbannerDataBeforeSort.data.length - index);
		ads.lunxunbannerDataBeforeSort.data = temp.concat(ads.lunxunbannerDataBeforeSort.data);
		ads.lunxunbannerData = {};
		for(var i = 0, len = ads.lunxunbannerDataBeforeSort.data.length; i < len; i++) {
			ads.lunxunbannerDataBeforeSort.data[i].type = "banner";
			delete ads.lunxunbannerDataBeforeSort.data[i].position;
			ads.lunxunbannerData[ads.lunxunbannerDataBeforeSort.position[i]] = ads.lunxunbannerDataBeforeSort.data[i];
		}
	}
	function initLunxunBanner(data){
		ads.hasLunxunbanner = true;
		ads.lunxunbannerDataBeforeSort = ads.lunxunbannerDataBeforeSort || {};
		var name = [data.grid, data.col, data.row].join('-');
		ads.lunxunbannerDataBeforeSort.position = ads.lunxunbannerDataBeforeSort.position || [];
		ads.lunxunbannerDataBeforeSort.position.push(name);
		ads.lunxunbannerDataBeforeSort.data = ads.lunxunbannerDataBeforeSort.data || [];
		ads.lunxunbannerDataBeforeSort.data.push(data);
	}
	function initDataRow(item){
		var params = [];
		params[item.order - 1] = item.params;
		item.params = params;
	}
	function pushDataIntoRow(item){
		ads.Data[item.grid][item.col - 1][item.row - 1].params[item.order - 1] = item.params;
	}
	/**
     * 格式化数据入口
     * @param {Array} response 广告数据数组
     */
	ads.formatData = function(response) {/**/
		for(var i = 0; i < response.length; i++) {
			var item = response[i]/**广告的相关信息对象*/
			if(item.position){/**去的广告页面位置position:"t01-1-2"*/
				item.position = item.position.toLowerCase().replace(/\-null/i,'')/*将position末尾出现的null删除*/
				var posArray = item.position.split('-')/*按照'-'将position字段拆分为数组*/
				item.grid = posArray[0];/*为每个广告数据添加grid属性，其值为position字段拆分后数组的第一个元素*/
				item.col = posArray[1] || 1;/*为每个广告数据添加col属性，其值为position字段拆分后数组的第二个元素*/
				item.row = posArray[2] || 1;/*为每个广告数据添加row属性，其值为position字段拆分后数组的第三个元素，如果该元素不存在，则默认为1*/
				item.order = posArray[3] || 1;/*为每个广告数据添加order属性，其值为position字段拆分后数组最后一个元素，如果该元素不存在，则默认为1*/
			}
			var type = item.type = item.params.type || item.params[0].type;/*为每个广告数据添加type属性*/
			delete item.params.type;
			if (item.grid && item.grid != "t00" && item.grid != "fd"){/**to是浮动窗口*/
				ads.Data[item.grid] = ads.Data[item.grid] || [];/**检测data是否有对象*/
				ads.Data[item.grid][item.col - 1] = ads.Data[item.grid][item.col-1] || [];
				if(ads.Data[item.grid][item.col - 1][item.row - 1]){
					switch(ads.Data[item.grid][item.col - 1][item.row - 1].type){
						case "fp":
							pushDataIntoRow(item);
							break;
						case "lunbobanner":
							pushDataIntoRow(item);
							break;
						case "lunxianbanner":
							pushDataIntoRow(item);
							break;
						case "lunxunbanner":
							initLunxunBanner(item);
							break;
						default:
							ads.Data[item.grid][item.col - 1][item.row - 1] = item
					}
				} else {
					ads.Data[item.grid][item.col - 1][item.row - 1] = item
					switch(item.type){
						case "fp":
							initDataRow(item)
							break;
						case "lunbobanner":
							initDataRow(item)
							break;
						case "lunxianbanner":
							initDataRow(item)
							break;
						case "lunxunbanner":
							initLunxunBanner(item);
							break;
						default:
							ads.Data[item.grid][item.col - 1][item.row - 1] = item
					}
				}
			} else {
				/*如果不是占位广告，则直接将数据push如最终的广告数据数组里*/
				ads.Data["t00"] = ads.Data["t00"] || [];
				ads.Data["t00"].push(item);
			}
		}
		//ads.hasLunxunbanner && ads.reformLunxunbanner();
		if(ads.hasLunxunbanner){
			ads.reformLunxunbanner();
			for(var i = 0; i < ads.lunxunbannerDataBeforeSort.position.length; i++) {
				var arr = ads.lunxunbannerDataBeforeSort.position[i].split('-');
				ads.Data[arr[0]][arr[1]-1][arr[2]-1] = ads.lunxunbannerDataBeforeSort.data[i];
			}
		}
		ads.showAds(ads.Data)/*开始渲染广告*/
	}
	ads.processReqChange = function(response) {
		/***console.log(response)*/
		ads.formatData(response.data);
	}
	/**
	 * ajax请求数据成功的回调数据处理函数<br/>
	 */
	ads.xmlLoaded = function(){
		/***请求的状态有5个值：0=未初始化；1=正在加载；2=已经加载；3=交互中；4=完成；  */
		if(req.readyState == 4) {
			/**200对应OK，如404=未找到网页  */
			if(req.status == 200) {
				/**加上圆括号的目的是迫使eval函数在处理转化为对象 里面的data属性值。 返回json对象*/
				var response = eval('(' + req.responseText + ')').data;
				//document.getElementById('json').value = req.responseText;
				ads.formatData(response);
			} else {
				alert('There was a problem retrieving the XML data:\n' + req.statusText);
			}
		}
	}
	/**
	 * 传入url加载josn
	 **/
	ads.loadXMLDoc = function(url) {
		req.onreadystatechange = ads.xmlLoaded;
		req.open('GET', url, true);
		req.send();
	}
})();