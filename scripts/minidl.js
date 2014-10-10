/**
 * @author nttdocomo
 */
ads.MiniDl = ads.extend('Base',{
    updateData: function(data){
        this._super(data);
    },
    create: function(){
        this.style = {
            width: this.data.width,
            height: this.data.height,
            position: 'absolute',
            top: this.data.top
        };
        this.wraperStyle = {
            width: this.data.width,
            height: this.data.height
        };
        if (this.data.left) {
            this.style.left = this.data.left;
            this.textAlign = 'right';
            delete this.data.left;
        }
        else {
            this.style.right = this.data.right;
            this.textAlign = 'left';
            delete this.data.right;
        }
        this.el = ads.createElement("div", null, this.style, document.body, null);
        this._super();
        this.createClossBtn();
    },
    createClossBtn: function(){
        this.closeBtn = ads.createElement('div', null, {
            height: '58px',
            textAlign: this.textAlign,
            cursor: 'pointer'
        }, this.el);
        if (this.type == 'dl') {
            ads.setStyle(this.closeBtn, {
            	height: '17px',
                background: '#ccc'
            })
            this.closeBtn.innerHTML = '\u5173\u95ED';
        }
        else {
            ads.setStyle(this.closeBtn, {
                background: 'url("http://www.sinaimg.cn/hs/sinahouse/images/adb.png") no-repeat scroll -23px -107px transparent'
            })
        }
    }
});
