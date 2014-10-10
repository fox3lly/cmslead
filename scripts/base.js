/**
 * @author nttdocomo
 */
ads.Base = Class.extend({
    init: function(data, el, action, style){
        this.type = data.type;
        var position;
        if (data.pdps) {
            this.pdps = data.positionMark ? data.positionMark : data.pdps.replace(/;|,|\|/g, '');
            position = this.position = ads.position[this.pdps];
        }
        if (position && position.selector) {
            var element = Sizzle(position.selector);
            this.el = element.length ? element[0] : (el || document.body);
            this.action = position.action || null;
            this.exStyle = style || position.style || {};
            this.updateData(data);
        }
        else {
            this.el = el || document.body;
            this.action = action || null;
            this.exStyle = style || {};
            this.updateData(data);
        }
    },
    updateData: function(data){
        this.data = data;
        if (this.data) 
            this.create();
    },
    create: function(){
        var url = (/\.swf$/i).test(this.data.swfUrl);
        this.id = this.id ? this.id : "pdps" + (++ads.id);
        this.wraper = this.wraper ? this.wraper : ads.createElement('div', {
            id: this.id,
            className: 'leju-ads'
        }, ads.extend(this.wraperStyle || {}, this.exStyle), this.el, this.action);
        if (url && ads.flashChecker.f) {
            this.swf();
        }
        else {
            if (this.type == 'video') 
                return;
            if (!ads.flashChecker.f) {
                this.data.swfUrl = 'http://d1.leju.com/ia/1103/30/053801_9223.jpg';//TODO use config file
            }
            this.image();
        }
        this.dom = this.wraper.firstChild;
    },
    closeAll: function(){
        this.wraper.style.display = "none";
    },
    swf: function(){
        var data = this.data;
        if (data.swfUrl) {
            var swfUrl = data.swfUrl, id = data.id || this.id, width = data.width || "", height = data.height || "", version = data.version || "7", flashvars = data.flashvars || "", params = data.params || "", attributes = data.attributes || "", bgcolor = data.bgcolor || "", quality = data.quality || "high", useExpressInstall = data.useExpressInstall || false;
            var swf = new sinaFlash(swfUrl, id, width, height, version, useExpressInstall, bgcolor, quality);
            if (flashvars) {
                for (var i in flashvars) {
                    if ("adlink" == i) {
                        swf.addVariable(i, escape(flashvars[i]));
                    }
                    else {
                        swf.addVariable(i, flashvars[i]);
                    }
                }
            }
            if (params) {
                for (var i in params) {
                    swf.addParam(i, params[i]);
                }
            }
            swf.write(this.id);
            this.swfObj = swf;
        }
    },
    image: function(){
        var data = this.data;
        if (data.swfUrl) {
            var swfUrl = data.swfUrl, width = data.width || "", height = data.height || "", adlink = data.flashvars ? (data.flashvars.adlink || "http://house.sina.com.cn") : "http://house.sina.com.cn";//TODO use config file
            this.wraper.innerHTML = '<a target="_blank" href="' + adlink + '"><img src="' + swfUrl + '" height="' + height + '" width="' + width + '"></a>';
        }
    },
    createClossBtn: function(position, inWraper){
        var psStyle = {
            top: '-17px',
            left: '0px'
        };
        var self = this;
        switch (position) {
            case 'rt':
                psStyle = {
                    top: '0',
                    right: '0'
                }
        };
        this.closeBtn = ads.createElement('div', null, ads.extend({
            background: 'url("http://www.sinaimg.cn/hs/sinahouse/images/adb.png") no-repeat scroll 0 -22px transparent',
            height: '19px',
            width: '57px',
            position: 'absolute',
            cursor: 'pointer'
        }, psStyle), this.wraper);
        addEvent(this.closeBtn, 'click', function(){
            self.closeAll();
        })
    }
});
