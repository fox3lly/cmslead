(function() {
	ads.slide = function(data) {
		try{
			if(window.insertad){
				var slidedata = data.params;
				window.insertad(slidedata);
			}
		}catch(e){
		}
	}
})();
