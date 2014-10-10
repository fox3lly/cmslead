(function() {
	ads.Data = {};
	var allTypes = {};
	var positionRex = /(t\d{1,2}\-\d{1,2})\-(\d{1})/i;
	var req = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
	var hash = window.location.hash;
	ads.reformLunxunbanner = function() {
		ads.lunxunbannerData  = randomOrder(ads.lunxunbannerDataBeforeSort);//�������data����
	}
	function initLunxunBanner(data){//ƴװlunxunbanner
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
	//����ı����������
	function randomOrder (targetArray)
	{
		var arrayLength = targetArray.length
		//�ȴ���һ������˳�������
		var tempArray1 = new Array();
	
		for (var i = 0; i < arrayLength; i ++)
		{
			tempArray1 [i] = i
		}
		//�ٸ�����һ�����鴴��һ��������������
		var tempArray2 = new Array();
	
		for (var i = 0; i < arrayLength; i ++)
		{
			//������˳��������������Ԫ��
			tempArray2 [i] = tempArray1.splice (Math.floor (Math.random () * tempArray1.length) , 1)
		}
		//
		//��󴴽�һ����ʱ����洢 ������һ������������targetArray��ȡ������
		var tempArray3 = new Array();
	
		for (var i = 0; i < arrayLength; i ++)
		{
			tempArray3 [i] = targetArray [tempArray2 [i]]
		}
		//
		//�������ó�������
		return tempArray3
	}
	function orderList(itemArray){
		//������ȡλ����Ϣ���ƽ�λ����Ϣ����itemPositionArr;
		var itemPositionArr = []
		for(var j = 0; j < itemArray.length; j++){
			var postion = itemArray[j].position.toLowerCase().replace(/\-null/i,'');
			var posArray = postion.split('-');
			var ordernum = posArray[2];
			itemPositionArr.push(ordernum);
		}
		//˳������λ����Ϣ����itemPositionArr;
		itemPositionArr.sort(function(a,b){return a>b?1:-1});
		//ƥ��itemArray�е�ÿһ���������
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
	function ppscSplit(data){//��ֶ��Ʒ���Ӵ�
		var posAttr = [];
		for(var i = 0; i < data.length; i++){	
			var pos = data[i].position.split('-')[0];
			posAttr.push(pos);
		}
		//ȥ��
		posAttr = distinctArray(posAttr);
		var bigArr = []
		//��ʼ���
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
			//ȥ��
			posAttr = distinctArray(posAttr);
			
			//��ʼ���
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
	function formatbottomdata(data){//��ȡƷ���Ӵ����£����ݴ���bottomDataBeforeSort����
		ads.hasbottom = true;
		ads.bottomDataBeforeSort = ads.bottomDataBeforeSort || [];
		ads.bottomDataBeforeSort.push(data);
	}
	function formattopdata(data){//��ȡƷ���Ӵ����£����ݴ���topDataBeforeSort����
		ads.hastop = true;
		ads.topDataBeforeSort = ads.topDataBeforeSort || [];
		ads.topDataBeforeSort.push(data);
	}
	function formatoverlaydata(data){//��ȡƷ���Ӵ����ݴ���overlayDataBeforeSort����
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
     * ��ʽ���������
     * @param {Array} response �����������
     */

	ads.formatData = function(response) {/**/
		for(var i = 0; i < response.length; i++) {
			try{
				var item = response[i]/**���������Ϣ����*/
				if(!item.params){
					continue;
				}	
				if(item.position){
					item.position = item.position.toLowerCase();
				}
				/***���ι��***/
				if(hash){
					item.position = item.position.toLowerCase().replace(/\-null/i,'')/*��positionĩβ���ֵ�nullɾ��*/
					var posArr = item.position.split('-')/*����'-'��position�ֶβ��Ϊ����*/
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
				if(hid){//ƥ��¥����Ϣ
					if(!MatchHouseinfo(hid)){
						continue;
					};
				}
				var type = item.type = item.params.type || item.params[0].type;/*Ϊÿ������������type����*/
				if(!item.type){
					continue;
				}
				if(type=='lunxunbanner'){
					item.position="";
				}
				if(type=='ppsc_bottom'){//���������Ʒ���Ӵ�(��)������ȡ����
					formatbottomdata(item)
				}else if(type=='ppsc_overlay'){//��������ǻƽ���������ȡ����
					formatoverlaydata(item)
				}else if(type=='ppsc_top'){//���������Ʒ���Ӵ�(��)������ȡ����
					formattopdata(item)
				}else if (type == 'newvideo') { //������������Ӵ�������ȡ����
					formatnewVideo(item);
				}else{
					if(item.position){/**ȥ�Ĺ��ҳ��λ��position:"t01-1-2"*/
							item.position = item.position.toLowerCase().replace(/\-null/i,'')/*��positionĩβ���ֵ�nullɾ��*/
							var posArray = item.position.split('-')/*����'-'��position�ֶβ��Ϊ����*/
							item.grid = posArray[0].indexOf('s') > -1 ? 't00' : posArray[0];/*Ϊÿ������������grid���ԣ���ֵΪposition�ֶβ�ֺ�����ĵ�һ��Ԫ��,��������������S00 ������Ҫ��Input����S00��id*/
							item.col = posArray[1] || 1;/*Ϊÿ������������col���ԣ���ֵΪposition�ֶβ�ֺ�����ĵڶ���Ԫ��*/
							item.row = posArray[2] || 1;/*Ϊÿ������������row���ԣ���ֵΪposition�ֶβ�ֺ�����ĵ�����Ԫ�أ������Ԫ�ز����ڣ���Ĭ��Ϊ1*/
						  item.order = posArray[3] || 1;/*Ϊÿ������������order���ԣ���ֵΪposition�ֶβ�ֺ��������һ��Ԫ�أ������Ԫ�ز����ڣ���Ĭ��Ϊ1*/
					}
					delete item.params.type;
					if (item.grid && item.grid != "t00" && item.grid != "fd"){/**to�Ǹ�������*/
						ads.Data[item.grid] = ads.Data[item.grid] || [];/**���data�Ƿ��ж���*/
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
							/*�������ռλ��棬��ֱ�ӽ�����push�����յĹ������������*/
							ads.Data["t00"] = ads.Data["t00"] || [];
							ads.Data["t00"].push(item);
						}
					}	
				}
			} catch(e) {continue;}
		}
		if(ads.hasLunxunbanner && ads.config.lunxunList && ads.config.lunxunList.length>0){
			ads.reformLunxunbanner();//��������data����
			for(var i = 0; i < ads.lunxunbannerData.length; i++) {
				ads.Data[ads.config.lunxunList[i]]=ads.Data[ads.config.lunxunList[i]]?ads.Data[ads.config.lunxunList[i]]:[];
				var temarr = [];
				temarr.push(ads.lunxunbannerData[i]);
				ads.Data[ads.config.lunxunList[i]].push(temarr);
			}//��dataƴ��ads.Data
		}
		if (ads.hasnewVideo) {
			var newVideoAttr = ads.newVideoDataBeforeSort;
			ads.Data["t00"] = ads.Data["t00"] || [];
			ads.Data["t00"].push(newVideoAttr);
		}
		if(ads.hasbottom){
			var ppscAttr = ppscSplit(ads.bottomDataBeforeSort) //����Ҫ�洢�����Ʒ���Ӵ���������
 			ppscAttr = ppscSplit2(ppscAttr);
			for(var i = 0; i<ppscAttr.length;i++){
				
				var itemok = MergerItem(ppscAttr[i],'bottom');
				var posArray = itemok.position.split('-')/*����'-'��position�ֶβ��Ϊ����*/
				var position = posArray[0];
				var col = posArray[1];
				var row = posArray[2];
				ads.Data[position] = ads.Data[position]?ads.Data[position]:[];
				ads.Data[position][col-1]=ads.Data[position][col-1]?ads.Data[position][col-1]:[];/*����Ʒ��ͨ���޷�Ͷ�ŵ�ָ��λ�õ�bug*/
				var temarr = [];
				temarr.push(itemok);
				ads.Data[position][col-1] = temarr;/*����Ʒ��ͨ���޷�Ͷ�ŵ�ָ��λ�õ�bug*/
				//ads.Data[position].push(temarr);
			}
		}
		if(ads.hastop){
			var ppscAttr = ppscSplit(ads.topDataBeforeSort) //����Ҫ�洢�����Ʒ���Ӵ���������
			ppscAttr = ppscSplit2(ppscAttr);
			for(var i = 0; i<ppscAttr.length;i++){
				var itemok = MergerItem(ppscAttr[i],'top');
				var posArray = itemok.position.split('-')/*����'-'��position�ֶβ��Ϊ����*/
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
			var ppscAttr = ppscSplit(ads.overlayDataBeforeSort) //����Ҫ�洢�����Ʒ���Ӵ���������
			ppscAttr = ppscSplit2(ppscAttr);
			for(var i = 0; i<ppscAttr.length;i++){
				var itemok = MergerItem(ppscAttr[i],'overlay');
				var posArray = itemok.position.split('-')/*����'-'��position�ֶβ��Ϊ����*/
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
		//ads.showAds(ads.Data)/*��ʼ��Ⱦ���*Ϊ��Ӧ������ݽӿ��ƶ���processReqChange��/
	}
	ads.load = function(response) {
		ads.formatData(response.data);
	}
	ads.processReqChange = function(response) {
		/***console.log(response)*/
		ads.formatData(response.data);
		ads.showAds(ads.Data)/*��ʼ��Ⱦ���*/
	}
	/**
	 * ajax�������ݳɹ��Ļص����ݴ�����<br/>
	 */
	ads.xmlLoaded = function(){
		/***�����״̬��5��ֵ��0=δ��ʼ����1=���ڼ��أ�2=�Ѿ����أ�3=�����У�4=��ɣ�  */
		if(req.readyState == 4) {
			/**200��ӦOK����404=δ�ҵ���ҳ  */
			if(req.status == 200) {
				/**����Բ���ŵ�Ŀ������ʹeval�����ڴ���ת��Ϊ���� �����data����ֵ�� ����json����*/
				var response = eval('(' + req.responseText + ')').data;
				//document.getElementById('json').value = req.responseText;
				ads.formatData(response);
			} else {
				alert('There was a problem retrieving the XML data:\n' + req.statusText);
			}
		}
	}
	/**
	 * ����url����josn
	 **/
	ads.loadXMLDoc = function(url) {
		req.onreadystatechange = ads.xmlLoaded;
		req.open('GET', url, true);
		req.send();
	}
})();
