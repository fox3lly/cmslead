/**
 * @author nttdocomo
 */
ads.tearpage = function(data){
	var tearpage = new ads.Tearpage(data);
};
ads.Tearpage = Class.extend({
    init: function(data){
    	var self = this;
    	var datechar = (new Date).getTime();
    	var id = 'tearpage'+datechar;
		var objid = 'tear'+datechar;
		var objname = 'tearname'+datechar;
        this.data = data.params;
        var zindex = this.data.zIndex || 9999;
        this.data.id = objid;
        this.data.name = objname;
        this.data.params.allowscriptaccess = 'always';
        this.data.src = "http://www.sinaimg.cn/hs/lingyun/adsswf/sy.swf";
        this.data.flashvars.onopen = "ads.onTearOpen";
        this.data.flashvars.onclose = "ads.onTearClose";
        this.data.flashvars.containerID = id+"|"+zindex;
		this.data.type = data.type;
        this.el = (new ads.Banner(this.data)).el;
        this.el.id = id;
        ads.setStyle(this.el,{position:"absolute",right:"0px",top:"0px",zIndex:zindex});
    	setTimeout(function(){
    		document.body.appendChild(self.el)
    	},this.data.delay || 1000);
    }
});
