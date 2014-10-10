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
     * ��ʽ���������
     * @param {Array} response �����������
     */
	ads.formatData = function(response) {/**/
		for(var i = 0; i < response.length; i++) {
			var item = response[i]/**���������Ϣ����*/
			if(item.position){/**ȥ�Ĺ��ҳ��λ��position:"t01-1-2"*/
				item.position = item.position.toLowerCase().replace(/\-null/i,'')/*��positionĩβ���ֵ�nullɾ��*/
				var posArray = item.position.split('-')/*����'-'��position�ֶβ��Ϊ����*/
				item.grid = posArray[0];/*Ϊÿ������������grid���ԣ���ֵΪposition�ֶβ�ֺ�����ĵ�һ��Ԫ��*/
				item.col = posArray[1] || 1;/*Ϊÿ������������col���ԣ���ֵΪposition�ֶβ�ֺ�����ĵڶ���Ԫ��*/
				item.row = posArray[2] || 1;/*Ϊÿ������������row���ԣ���ֵΪposition�ֶβ�ֺ�����ĵ�����Ԫ�أ������Ԫ�ز����ڣ���Ĭ��Ϊ1*/
				item.order = posArray[3] || 1;/*Ϊÿ������������order���ԣ���ֵΪposition�ֶβ�ֺ��������һ��Ԫ�أ������Ԫ�ز����ڣ���Ĭ��Ϊ1*/
			}
			var type = item.type = item.params.type || item.params[0].type;/*Ϊÿ������������type����*/
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
				/*�������ռλ��棬��ֱ�ӽ�����push�����յĹ������������*/
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
		ads.showAds(ads.Data)/*��ʼ��Ⱦ���*/
	}
	ads.processReqChange = function(response) {
		/***console.log(response)*/
		ads.formatData(response.data);
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
