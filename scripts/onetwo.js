/**
 * @author nttdocomo
 */
(function() {
	ads.onetwo = function(data) {
		var onetwo = new ads.OneTwo(data.params)
		return onetwo.el;
		/*var grid = document.getElementById(data.grid);
		grid.appendChild(onetwo.el)*/
	};
	ads.OneTwo = Class.extend({
		init : function(data) {
			this.data = data
			this.create();
		},
		create : function(data) {
			this.el = ads.createElement('div', {
				id : "pdps" + (new Date).getTime()
			}, {
				width : '950px',
				height : '96px',
				margin : '0 auto',
				overflow : 'hidden'
			});
			var styles = {
				'width' : '585px',
				'height' : '90px',
				'float' : 'left',
				'margin' : '4px 14px'
			}
			this.fp_l = new ads.Fp(this.data[0], this.el);
			var rotator;
			if(this.data[1].length) {
				rotator = new ads.Rotator(this.data[1], this.el);
			} else {
				rotator = new ads.Banner(this.data[1], this.el);
			}
			ads.setStyle(rotator.el,styles);
			this.el.appendChild(rotator.el);
			this.fp_r = new ads.Fp(this.data[2], this.el);
		}
	})
})();
