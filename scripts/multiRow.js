/**
 * @author ningxiao
 */
(function(){
	ads.multirow = function(data){
		var multirow = new ads.multiRow(data);
		return multirow.el;	
	}
	ads.multiRow = function(data){
		this.el = document.createElement("div");
		var bannerobj = null,data = data.params,index = data.list.length-1;
		this.el.style.cssText = "width:"+data.width+"px;height:"+data.height+"px;overflow:hidden;"
		for(var i in data.list){
			if(data.list[i].src){
				data.list[i].height = data.height;
				bannerobj = new ads.Banner(data.list[i]).el;
				ads.setStyle(bannerobj,{'float':'left','marginRight': data.marginRight+"px"});
				this.el.appendChild(bannerobj);
				index = bannerobj;
			}
		}
		ads.setStyle(index,{'marginRight':"0px"});
	};	
})();
