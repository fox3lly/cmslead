(function() {
	ads.Data = {};
	var allTypes = {};
	var positionRex = /(t\d{1,2}\-\d{1,2})\-(\d{1})/i;
	var req = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
	var hash = window.location.hash;
	ads.reformLunxunbanner = function() {
		ads.lunxunbannerData  = randomOrder(ads.lunxunbannerDataBeforeSort);//随机排列data数据
	}
	function initLunxunBanner(data){//拼装lunxunbanner
		ads.hasLunxunbanner = true;
		ads.lunxunbannerDataBeforeSort = ads.lunxunbannerDataBeforeSort || [];
		data.type = data.params.type='banner';
		ads.lunxunbannerDataBeforeSort.push(data);
	}
	function initDataRow(item){
		var params = [];
		params[item.order - 1] = item.params;
		item.params = params;
	}
	function pushDataIntoRow(item){
		ads.Data[item.grid][item.col - 1][item.row - 1].params[item.order - 1] = item.params;
	}
	//随机改变数组的排序
	function randomOrder (targetArray)
	{
		var arrayLength = targetArray.length
		//先创建一个正常顺序的数组
		var tempArray1 = new Array();
	
		for (var i = 0; i < arrayLength; i ++)
		{
			tempArray1 [i] = i
		}
		//再根据上一个数组创建一个随机乱序的数组
		var tempArray2 = new Array();
	
		for (var i = 0; i < arrayLength; i ++)
		{
			//从正常顺序数组中随机抽出元素
			tempArray2 [i] = tempArray1.splice (Math.floor (Math.random () * tempArray1.length) , 1)
		}
		//
		//最后创建一个临时数组存储 根据上一个乱序的数组从targetArray中取得数据
		var tempArray3 = new Array();
	
		for (var i = 0; i < arrayLength; i ++)
		{
			tempArray3 [i] = targetArray [tempArray2 [i]]
		}
		//
		//返回最后得出的数组
		return tempArray3
	}
	function orderList(itemArray){
		//首先提取位置信息，推进位置信息数组itemPositionArr;
		var itemPositionArr = []
		for(var j = 0; j < itemArray.length; j++){
			var postion = itemArray[j].position.toLowerCase().replace(/\-null/i,'');
			var posArray = postion.split('-');
			var ordernum = posArray[2];
			itemPositionArr.push(ordernum);
		}
		//顺序排列位置信息数组itemPositionArr;
		itemPositionArr.sort(function(a,b){return a>b?1:-1});
		//匹配itemArray中的每一项，重新排列
		var tempItemArr = [];
		for(var k = 0; k<itemPositionArr.length; k++ ){
			for(var m = 0; m<itemArray.length; m++){
				var temppositon = itemArray[m].position.toLowerCase().replace(/\-null/i,'');
				var tempposArray = temppositon.split('-');
				var tempordernum = tempposArray[2];
				if(itemPositionArr[k] == tempordernum){
					tempItemArr.push(itemArray[m]);
				}
			}
		}
		return tempItemArr;
	}
	function MergerItem(itemArray,location){
			itemArray = orderList(itemArray);
			var list=[];
			for(var i = 0; i < itemArray.length; i++){	
				var listi={};
				listi.width = itemArray[i].params.list_width;
				listi.src = itemArray[i].params.list_src;
				listi.esrc = itemArray[i].params.list_esrc;
				listi.link = itemArray[i].params.list_link;
				listi.cheight = itemArray[i].params.cheight;
				listi.cwidth = itemArray[i].params.cwidth;
				list.push(listi);
			}
			var itemafter={};
			itemafter.pdps = itemArray[0].pdps;
			itemafter.position = itemArray[0].position;
			itemafter.type = "closet";
			itemafter.params = {};
			itemafter.params.height = itemArray[0].params.height;
			itemafter.params.width = itemArray[0].params.width;
			itemafter.params.spacing = itemArray[0].params.spacing;
			//itemafter.params.cheight = itemArray[0].params.cheight;
			//itemafter.params.cwidth = itemArray[0].params.cwidth;
			itemafter.params.delay = itemArray[0].params.delay;
			itemafter.params.padding = itemArray[0].params.padding;
			itemafter.params.background = itemArray[0].params.background;
			itemafter.params.location = location;
			itemafter.params.list = list;
			return itemafter
	}
	function ppscSplit(data){//拆分多个品牌视窗
		var posAttr = [];
		for(var i = 0; i < data.length; i++){	
			var pos = data[i].position.split('-')[0];
			posAttr.push(pos);
		}
		//去重
		posAttr = distinctArray(posAttr);
		var bigArr = []
		//开始拆分
		if(posAttr.length != 1){
			for(var k=0;k<posAttr.length ;k++){
				var samllArr = [];
				for(var l = 0;l< data.length; l++){
					var pos2 = data[l].position.split('-')[0];
					if(pos2 == posAttr[k]){
						samllArr.push(data[l])
					}
				}
				bigArr.push(samllArr);
			}
		}else{
			bigArr.push(data);
		}
		return bigArr;
		
	}
	function ppscSplit2(data){
		var bigArr = []
		for(var z=0 ; z<data.length;z++){
			var posAttr = [];
			for(var i = 0; i < data[z].length; i++){	
				var pos = data[z][i].position.split('-')[1];
				posAttr.push(pos);
			}
			//去重
			posAttr = distinctArray(posAttr);
			
			//开始拆分
			if(posAttr.length != 1){
				for(var k=0;k<posAttr.length ;k++){
					var samllArr = [];
					for(var l = 0;l< data[z].length; l++){
						var pos2 = data[z][l].position.split('-')[1];
						if(pos2 == posAttr[k]){
							samllArr.push(data[z][l])
						}
					}
					bigArr.push(samllArr);
				}
			}else{
				bigArr.push(data[z]);
			}
			
		}
		return bigArr;
	}
	function distinctArray(arr){
		var obj={},temp=[];
		for(var i=0;i<arr.length;i++){
			if(!obj[arr[i]]){
				temp.push(arr[i]);
				obj[arr[i]] =true;
			}
		}
		return temp;
   	}
	function formatbottomdata(data){//获取品牌视窗（下）数据创建bottomDataBeforeSort数组
		ads.hasbottom = true;
		ads.bottomDataBeforeSort = ads.bottomDataBeforeSort || [];
		ads.bottomDataBeforeSort.push(data);
	}
	function formattopdata(data){//获取品牌视窗（下）数据创建topDataBeforeSort数组
		ads.hastop = true;
		ads.topDataBeforeSort = ads.topDataBeforeSort || [];
		ads.topDataBeforeSort.push(data);
	}
	function formatoverlaydata(data){//获取品牌视窗数据创建overlayDataBeforeSort数组
		ads.hasoverlay = true;
		ads.overlayDataBeforeSort = ads.overlayDataBeforeSort || [];
		ads.overlayDataBeforeSort.push(data);
	}
	function MatchHouseinfo(id){
		if(ads.config.houseId){
			for(var i = 0; i < id.length; i++) {
				if(id[i]==ads.config.houseId){
					return true;
				}
			}
		}
		return false;
	}
	function formatnewVideo(data) {
		ads.hasnewVideo = true;
		ads.newVideoDataBeforeSort = ads.newVideoDataBeforeSort || [];
		ads.newVideoDataBeforeSort.push(data);
	}
	/**
     * 格式化数据入口
     * @param {Array} response 广告数据数组
     */

	ads.formatData = function(response) {/**/
		for(var i = 0; i < response.length; i++) {
			try{
				var item = response[i]/**广告的相关信息对象*/
				if(!item.params){
					continue;
				}	
				if(item.position){
					item.position = item.position.toLowerCase();
				}
				/***屏蔽广告***/
				if(hash){
					item.position = item.position.toLowerCase().replace(/\-null/i,'')/*将position末尾出现的null删除*/
					var posArr = item.position.split('-')/*按照'-'将position字段拆分为数组*/
					var adPosi = posArr[0];
					if(hash =='#p' && adPosi =='t00'){
						continue;
					}else if(hash =='#all'){
						continue;
					}else if(hash =='#nad'){
						var chart = adPosi.substring(0,1);
						if(chart=='t'||chart=='d'){
							continue;
						}
					}
				}
				var hid = item.params.hid;
				if(hid){//匹配楼盘信息
					if(!MatchHouseinfo(hid)){
						continue;
					};
				}
				var type = item.type = item.params.type || item.params[0].type;/*为每个广告数据添加type属性*/
				if(!item.type){
					continue;
				}
				if(type=='lunxunbanner'){
					item.position="";
				}
				if(type=='ppsc_bottom'){//如果类型是品牌视窗(下)，做提取处理
					formatbottomdata(item)
				}else if(type=='ppsc_overlay'){//如果类型是黄金条，做提取处理
					formatoverlaydata(item)
				}else if(type=='ppsc_top'){//如果类型是品牌视窗(上)，做提取处理
					formattopdata(item)
				}else if (type == 'newvideo') { //如果类型是新视窗，做提取处理
					formatnewVideo(item);
				}else{
					if(item.position){/**去的广告页面位置position:"t01-1-2"*/
							item.position = item.position.toLowerCase().replace(/\-null/i,'')/*将position末尾出现的null删除*/
							var posArray = item.position.split('-')/*按照'-'将position字段拆分为数组*/
							item.grid = posArray[0].indexOf('s') > -1 ? 't00' : posArray[0];/*为每个广告数据添加grid属性，其值为position字段拆分后数组的第一个元素,过滤搜索文字链S00 否则需要给Input设置S00的id*/
							item.col = posArray[1] || 1;/*为每个广告数据添加col属性，其值为position字段拆分后数组的第二个元素*/
							item.row = posArray[2] || 1;/*为每个广告数据添加row属性，其值为position字段拆分后数组的第三个元素，如果该元素不存在，则默认为1*/
						  item.order = posArray[3] || 1;/*为每个广告数据添加order属性，其值为position字段拆分后数组最后一个元素，如果该元素不存在，则默认为1*/
					}
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
									item.params.pdps = item.pdps;
									pushDataIntoRow(item);
									break;
								case "lunxunbanner":
									initLunxunBanner(item,i);
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
									item.params.pdps = item.pdps;
									initDataRow(item)
									break;
								default:
									ads.Data[item.grid][item.col - 1][item.row - 1] = item
							}
						}
					} else {
						if(type=='lunxunbanner'){
							initLunxunBanner(item);
						}else{
							/*如果不是占位广告，则直接将数据push如最终的广告数据数组里*/
							ads.Data["t00"] = ads.Data["t00"] || [];
							ads.Data["t00"].push(item);
						}
					}	
				}
			} catch(e) {continue;}
		}
		if(ads.hasLunxunbanner && ads.config.lunxunList && ads.config.lunxunList.length>0){
			ads.reformLunxunbanner();//重新排列data数据
			for(var i = 0; i < ads.lunxunbannerData.length; i++) {
				ads.Data[ads.config.lunxunList[i]]=ads.Data[ads.config.lunxunList[i]]?ads.Data[ads.config.lunxunList[i]]:[];
				var temarr = [];
				temarr.push(ads.lunxunbannerData[i]);
				ads.Data[ads.config.lunxunList[i]].push(temarr);
			}//将data拼入ads.Data
		}
		if (ads.hasnewVideo) {
			var newVideoAttr = ads.newVideoDataBeforeSort;
			ads.Data["t00"] = ads.Data["t00"] || [];
			ads.Data["t00"].push(newVideoAttr);
		}
		if(ads.hasbottom){
			var ppscAttr = ppscSplit(ads.bottomDataBeforeSort) //返回要存储过多个品牌视窗广告的数组
 			ppscAttr = ppscSplit2(ppscAttr);
			for(var i = 0; i<ppscAttr.length;i++){
				
				var itemok = MergerItem(ppscAttr[i],'bottom');
				var posArray = itemok.position.split('-')/*按照'-'将position字段拆分为数组*/
				var position = posArray[0];
				var col = posArray[1];
				var row = posArray[2];
				ads.Data[position] = ads.Data[position]?ads.Data[position]:[];
				ads.Data[position][col-1]=ads.Data[position][col-1]?ads.Data[position][col-1]:[];/*修正品牌通栏无法投放到指定位置的bug*/
				var temarr = [];
				temarr.push(itemok);
				ads.Data[position][col-1] = temarr;/*修正品牌通栏无法投放到指定位置的bug*/
				//ads.Data[position].push(temarr);
			}
		}
		if(ads.hastop){
			var ppscAttr = ppscSplit(ads.topDataBeforeSort) //返回要存储过多个品牌视窗广告的数组
			ppscAttr = ppscSplit2(ppscAttr);
			for(var i = 0; i<ppscAttr.length;i++){
				var itemok = MergerItem(ppscAttr[i],'top');
				var posArray = itemok.position.split('-')/*按照'-'将position字段拆分为数组*/
				var position = posArray[0];
				var col = posArray[1];
				var row = posArray[2];
				
				ads.Data[position]=ads.Data[position]?ads.Data[position]:[];
				ads.Data[position][col-1]=ads.Data[position][col-1]?ads.Data[position][col-1]:[];
				var temarr = [];
				temarr.push(itemok);
				ads.Data[position][col-1] = temarr;
			}
		}
		if(ads.hasoverlay){
			var ppscAttr = ppscSplit(ads.overlayDataBeforeSort) //返回要存储过多个品牌视窗广告的数组
			ppscAttr = ppscSplit2(ppscAttr);
			for(var i = 0; i<ppscAttr.length;i++){
				var itemok = MergerItem(ppscAttr[i],'overlay');
				var posArray = itemok.position.split('-')/*按照'-'将position字段拆分为数组*/
				var position = posArray[0];
				var col = posArray[1];
				var row = posArray[2];
				ads.Data[position]=ads.Data[position]?ads.Data[position]:[];
				ads.Data[position][col-1]=ads.Data[position][col-1]?ads.Data[position][col-1]:[];
				var temarr = [];
				temarr.push(itemok);
				ads.Data[position][col-1] = temarr;
			}
		}
		//ads.showAds(ads.Data)/*开始渲染广告*为适应多个数据接口移动至processReqChange中/
	}
	ads.load = function(response) {
		ads.formatData(response.data);
	}
	ads.processReqChange = function(response) {
		/***console.log(response)*/
		ads.formatData(response.data);
		ads.showAds(ads.Data)/*开始渲染广告*/
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
