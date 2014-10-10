/**
 * @author nttdocomo
 */
(function() {
	ads.insertAfter = function(newEl, targetEl) {
		var parentEl = targetEl.parentNode;

		if(parentEl.lastChild == targetEl) {
			parentEl.appendChild(newEl);
		} else {
			parentEl.insertBefore(newEl, targetEl.nextSibling);
		}
	}
	ads.cleanArr = function(arr){
		for(var i =arr.length-1;i>-1;i--){
			if(!arr[i] || arr[i] == ''){
				arr.splice(i,1);
			}
		}
	}
	ads.que = {};
	ads.startShow = function(type, data) {
		/*var type = type.replace(/^[a-z]/, function(val) {
		 return val.toUpperCase();
		 });
		 if(data.data) {
		 var data = data;
		 ads.newAds(type, data);
		 }*/
		if(ads[type])
			return ads[type](data);
	}
	var adsWithOutPosition = {
		"fullscreen" : true,
		"plp" : true,
		"lmt" : true,
		"rotatorDl" : true,
		"dl" : true,
		"window" : true,
		"sinaHouseBanner" : true
	}
	ads.displayAds = function() {
		ads.showAScreen();
	}
	ads.showAds = function(adsData) {
		if(ads.flashChecker.f) {
			if(!ads.dataRest) {
				ads.dataRest = adsData;
				ads.displayAds(adsData);
				addEvent(window, 'scroll', ads.throttle(ads.displayAds, 100));
			}
		}
	};
	ads.threshold = {
		threshold : 100
	};
	ads.loopAds = function(el, data) {
		el.innerHTML='';
		for(var i = 0; i < data.length; i++) {
			var container = document.createElement('div');
			var item = data[i];
			if(item) {
				ads.cleanArr(item);
				container.className = "col row-"+item.length + " cf";		
				for(var j = 0; j < item.length; j++) {
					if(item[j].type == 'searchshow'){
						ads.setStyle(container, {
							height:'90px',
							margin:'3px auto 10px',
							backgroundColor:'#fdfee1',
							overflow:'hidden',
							fontFamily:'\u5b8b\u4f53'
						});
					}
					var ad = ads.startShow(item[j].type, item[j]);
					if(ad){
						if(item.length>1){
							//一行2列加间距
							if(j>0 && item[0].type == "banner"){
								ads.setStyle(ad,{'marginLeft':"10px"});
							}
							//一顶两边是轮显的情况 去除中间通栏的marginTop防止错位
							if(j==1 && item[0].type != "fp"){
								ads.setStyle(ad,{'marginTop':"0px"});
							}
							//文字链组样式
							if(item[0].type == "text"){
								ads.setStyle(ad,{'float':"left","display":"block","width":(99/item.length)+"%"});
							}
						}
						container.appendChild(ad);
					}
				}
				if(container.children.length){
					el.appendChild(container)
				}
			}
		}
	}
	ads.showAScreen = function() {
		if(ads.dataRest) {
			var adsData = ads.dataRest;
			ads.dataRest={};
			//ads.ret = {};
			for(var name in adsData) {
				var data = ads.Data[name];
				if(name != "t00"){
					var selector = '#' + name;
					var el = document.getElementById(name)
					if(ads.inViewPort(selector, ads.threshold)) {
						ads.loopAds(el, data)
					} else {
						ads.dataRest[name] = data;
					}
					
				} else {
					for (var i = 0; i < data.length; i++){
						var item = data[i];
						if(ads.hasOwnProperty(item.type)){
							if(item.type == "window"){
								item.params.name = "PopWin_"+i;
							}
						   ads[item.type](item);						
						}

						if(ads.isArray(item)){
							if(item[0].type == "newvideo"){
								ads[item[0].type](item);
							}
							
						}
//						else{
//						   console.log(item.type+"\u5e7f\u544a\u7c7b\u578b\u4e0d\u5b58\u5728");
//						}
					}
				}
			}
		}
	}
	ads.newAds = function(type, data, el, action, style) {
		if(ads[type]) {
			if(ads[type].dependence) {
				ads._getDependence(type, function() {
					var ad = ads.newAds(type, data, el, action, style);
				});
			} else if(ads[type].required && ads[type].required.length) {
				ads.getRequired(type, function() {
					var ad = ads.newAds(type, data, el, action, style);
				});
			} else {
				// ads is surly loaded. the que is clean!
				var ad = new ads[type](data, el, action, style);
			}

		} else {
			if(!ads.que[type]) {
				// ads not loaded. load it
				ads.que[type] = [];
				ads.getAds(type);
			}
			// now ads is still loading, store its callbacks in que!
			ads.que[type].push(function() {
				var ad = ads.newAds(type, data, el, action, style);
			});
		}
	};
	ads._getDependence = function(type, fn) {
		var typeDepend = ads[type].dependence, //parentClass
		extObj = ads[type].extObj;
		if(ads[typeDepend] && ads[typeDepend].extend) {
			// won't happen
			var requried = ads[type].extObj.required;
			ads[type] = ads[typeDepend].extend(ads[type].extObj);
			if(requried)
				ads[type].required = requried;
			fn();
		} else {
			if(!ads.que[typeDepend]) {
				// parent ads is not loaded. load it
				ads.que[typeDepend] = [];
				ads.getAds(typeDepend);
			}
			// now ads is still loading, store its callbacks in que!
			ads.que[typeDepend].push(function() {
				// parent loaded, load child
				if(ads[type].dependence) {
					var requried = ads[type].extObj.required;
					ads[type] = ads[typeDepend].extend(ads[type].extObj);
					if(requried)
						ads[type].required = requried;
				}
				fn();
			});
		}
	};
	ads.getRequired = function(type, fn) {
		var required = ads[type].required.shift();
		if(!ads[required] || !ads[required].extend) {// required not loaded?
			if(!ads.que[required]) {
				ads.que[required] = [];
				ads.getAds(required);
			}
			ads.que[required].push(function() {
				fn();
			});
		} else {
			fn();
		}
	}
	ads.getAds = function(type) {
		var uri = (ads.config.host || '') + (ads.config.path || '') + type.replace(/./g, function(a) {
			return a.toLowerCase()
		}) + ".js";
		ads.ajax({
			url : uri
		}, function() {
			ads.exeQue(type)
		});
	}
	ads.exeQue = function(type) {
		if(ads[type]) {
			ads.que[type] = ads.que[type] || [];
			var typeDepend = ads[type].dependence;
			if(typeDepend) {
				// parent needed!
				ads._getDependence(type, function() {
					ads.exeQue(type);
				});
			} else if(ads[type].required && ads[type].required.length) {
				// requirement needed!!!
				var required = ads[type].required.shift();
				if(!ads[required] || !ads[required].extend) {// required not loaded?
					if(!ads.que[required]) {
						ads.que[required] = [];
						ads.getAds(required);
					}
					ads.que[required].push(function() {
						ads.exeQue(type);
					});
				} else {
					ads.exeQue(type);
				}
			} else {
				var x;
				while( x = ads.que[type].shift()) {
					x();
				}
			}
		};
	}
	ads.ajax = function(s, callback) {
		var script, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
		script = document.createElement("script");
		script.async = "async";
		if(s.scriptCharset) {
			script.charset = s.scriptCharset;
		}
		script.src = s.url;

		// Attach handlers for all browsers
		script.onload = script.onreadystatechange = function(_, isAbort) {
			if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
				// Handle memory leak in IE
				script.onload = script.onreadystatechange = null;
				// Remove the script
				if(head && script.parentNode) {
					head.removeChild(script);
				}
				// Dereference the script
				script = undefined;
				// Callback if not abort
				if(!isAbort) {
					callback(200, "success");
				}
			}
		};
		// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
		// This arises when a base node is used (#2709 and #4378).
		head.insertBefore(script, head.firstChild);

		/*
		 abort: function () {
		 if (script) {
		 script.onload(0, 1);
		 }
		 }*/

	};
})();
