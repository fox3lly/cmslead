(function() {
	var div = document.createElement('div');
	div.style.display = "none";
	div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[0], select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
	ads = ads ? ads : {};

	ads.support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace : div.firstChild.nodeType === 3,

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody : !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize : !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText insted)
		style : /red/.test(a.getAttribute("style")),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized : a.getAttribute("href") === "/a",

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity : /^0.55$/.test(a.style.opacity),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat : !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn : div.getElementsByTagName("input")[0].value === "on",

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected : opt.selected,

		// Will be defined later
		deleteExpando : true,
		optDisabled : false,
		checkClone : false,
		noCloneEvent : true,
		noCloneChecked : true,
		boxModel : null,
		inlineBlockNeedsLayout : false,
		shrinkWrapBlocks : false,
		reliableHiddenOffsets : true
	};
	ads.isWindow = function(obj) {
		return obj && typeof obj === "object" && "setInterval" in obj;
	};
	ads.offset = {
		initialize : function() {
			var body = document.body, container = document.createElement("div"), innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat(jQuery.css(body, "marginTop")) || 0, html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";

			ads.extend(container.style, {
				position : "absolute",
				top : 0,
				left : 0,
				margin : 0,
				border : 0,
				width : "1px",
				height : "1px",
				visibility : "hidden"
			});

			container.innerHTML = html;
			body.insertBefore(container, body.firstChild);
			innerDiv = container.firstChild;
			checkDiv = innerDiv.firstChild;
			td = innerDiv.nextSibling.firstChild.firstChild;

			this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
			this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

			checkDiv.style.position = "fixed";
			checkDiv.style.top = "20px";

			// safari subtracts parent border width here which is 5px
			this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
			checkDiv.style.position = checkDiv.style.top = "";

			innerDiv.style.overflow = "hidden";
			innerDiv.style.position = "relative";

			this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

			this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);

			body.removeChild(container);
			ads.offset.initialize = jQuery.noop;
		},
		bodyOffset : function(body) {
			var top = body.offsetTop, left = body.offsetLeft;

			ads.offset.initialize();

			if(ads.offset.doesNotIncludeMarginInBodyOffset) {
				top += parseFloat(ads.css(body, "marginTop")) || 0;
				left += parseFloat(ads.css(body, "marginLeft")) || 0;
			}

			return {
				top : top,
				left : left
			};
		},
		setOffset : function(elem, options, i) {
			var position = ads.css(elem, "position");

			// set position first, in-case top/left are set even on static elem
			if(position === "static") {
				elem.style.position = "relative";
			}

			//var curElem = jQuery( elem ),
			var curOffset = ads.offset(elem), curCSSTop = ads.css(elem, "top"), curCSSLeft = ads.css(elem, "left"), calculatePosition = (position === "absolute" || position === "fixed") && ads.inArray("auto", [curCSSTop, curCSSLeft]) > -1, props = {}, curPosition = {}, curTop, curLeft;

			// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
			if(calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}

			if(ads.isFunction(options)) {
				options = options.call(elem, i, curOffset);
			}

			if(options.top != null) {
				props.top = (options.top - curOffset.top) + curTop;
			}
			if(options.left != null) {
				props.left = (options.left - curOffset.left) + curLeft;
			}

			if("using" in options) {
				options.using.call(elem, props);
			} else {
				curElem.css(props);
			}
		}
	};
	ads.isNaN = function(obj) {
		return obj == null || !rdigit.test(obj) || isNaN(obj);
	};
	ads.each = function(object, callback, args) {
		var name, i = 0, length = object.length, isObj = length === undefined || ads.isFunction(object);

		if(args) {
			if(isObj) {
				for(name in object ) {
					if(callback.apply(object[name], args) === false) {
						break;
					}
				}
			} else {
				for(; i < length; ) {
					if(callback.apply(object[i++], args) === false) {
						break;
					}
				}
			}

			// A special, fast, case for the most common use of each
		} else {
			if(isObj) {
				for(name in object ) {
					if(callback.call(object[name], name, object[name]) === false) {
						break;
					}
				}
			} else {
				for(var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {
				}
			}
		}

		return object;
	};
	// Check for digits
	var rdigit = /\d/;
	function getWindow(elem) {
		return ads.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
	}

	if("getBoundingClientRect" in document.documentElement) {
		ads.offSet = function(selector) {
			var elem = typeof selector === "string" ? Sizzle(selector)[0] : selector, box;

			if(!elem || !elem.ownerDocument) {
				return null;
			}

			if(elem === elem.ownerDocument.body) {
				return ads.offset.bodyOffset(elem);
			}

			try {
				box = elem.getBoundingClientRect();
			} catch(e) {
			}

			var doc = elem.ownerDocument, docElem = doc.documentElement;

			// Make sure we're not dealing with a disconnected DOM node
			if(!box || !Sizzle.contains(docElem, elem)) {
				return box ? {
					top : box.top,
					left : box.left
				} : {
					top : 0,
					left : 0
				};
			}

			var body = doc.body, win = getWindow(doc), clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0, scrollTop = (win.pageYOffset || ads.support.boxModel && docElem.scrollTop || body.scrollTop ), scrollLeft = (win.pageXOffset || ads.support.boxModel && docElem.scrollLeft || body.scrollLeft), top = box.top + scrollTop - clientTop, left = box.left + scrollLeft - clientLeft;

			return {
				top : top,
				left : left
			};
		};
	} else {
		ads.offSet = function(selector) {

			var elem = typeof selector === "string" ? Sizzle(selector)[0] : selector;

			if(!elem || !elem.ownerDocument) {
				return null;
			}

			if(elem === elem.ownerDocument.body) {
				return ads.offset.bodyOffset(elem);
			}

			ads.offset.initialize();

			var computedStyle, offsetParent = elem.offsetParent, prevOffsetParent = elem, doc = elem.ownerDocument, docElem = doc.documentElement, body = doc.body, defaultView = doc.defaultView, prevComputedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle, top = elem.offsetTop, left = elem.offsetLeft;

			while(( elem = elem.parentNode) && elem !== body && elem !== docElem) {
				if(ads.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") {
					break;
				}
				computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
				top -= elem.scrollTop;
				left -= elem.scrollLeft;

				if(elem === offsetParent) {
					top += elem.offsetTop;
					left += elem.offsetLeft;

					if(ads.offset.doesNotAddBorder && !(ads.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName))) {
						top += parseFloat(computedStyle.borderTopWidth) || 0;
						left += parseFloat(computedStyle.borderLeftWidth) || 0;
					}
					prevOffsetParent = offsetParent;
					offsetParent = elem.offsetParent;
				}

				if(ads.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible") {
					top += parseFloat(computedStyle.borderTopWidth) || 0;
					left += parseFloat(computedStyle.borderLeftWidth) || 0;
				}
				prevComputedStyle = computedStyle;
			}

			if(prevComputedStyle.position === "relative" || prevComputedStyle.position === "static") {
				top += body.offsetTop;
				left += body.offsetLeft;
			}

			if(ads.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") {
				top += Math.max(docElem.scrollTop, body.scrollTop);
				left += Math.max(docElem.scrollLeft, body.scrollLeft);
			}

			return {
				top : top,
				left : left
			};
		};
	}

	var heightWidth = ["height", "width"];
	ads.each(["Height", "Width"], function(i, name) {
		var type = name.toLowerCase();
		ads[type] = function(elem, size) {
			if(ads.isWindow(elem)) {
				// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
				// 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat
				var docElemProp = elem.document.documentElement["client" + name];
				return elem.document.compatMode === "CSS1Compat" && docElemProp || elem.document.body["client" + name] || docElemProp;

				// Get document width or height
			} else if(elem.nodeType === 9) {
				// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
				return Math.max(elem.documentElement["client" + name], elem.body["scroll" + name], elem.documentElement["scroll" + name], elem.body["offset" + name], elem.documentElement["offset" + name]);

				// Get or set width or height on the element
			} else if(size === undefined) {
				var orig = ads.css(elem, type), ret = parseFloat(orig);

				return ads.isNaN(ret) ? orig : ret;

				// Set the width or height on the element (default to pixels if value is unitless)
			} else {
				return this.css(type, typeof size === "string" ? size : size + "px");
			}
		}
	})
	var leftTop = ["Left", "Top"];
	for(var i = 0; i < leftTop.length; i++) {
		var method = "scroll" + leftTop[i];

		ads[method] = function(elem, val) {
			var win;

			if(!elem) {
				return null;
			}

			if(val !== undefined) {
				// Set the scroll offset
				return this.each(function() {
					win = getWindow(this);

					if(win) {
						win.scrollTo(!i ? val : ads.scrollLeft(win), i ? val : ads.scrollTop(win));

					} else {
						this[method] = val;
					}
				});
			} else {
				win = getWindow(elem);

				// Return the scroll offset
				return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset"] : ads.support.boxModel && win.document.documentElement[method] || win.document.body[method] : elem[method];
			}
		};
	};

	ads.belowthefold = function(element, settings) {
		var fold = ads.height(window) + ads.scrollTop(window);
		return fold <= ads.offSet(element).top - settings.threshold;
	};
	ads.abovethetop = function(element, settings) {
		var top = ads.scrollTop(window);
		return top >= ads.offSet(element).top + ads.height(element) + settings.threshold;
	};
	/*ads.rightofscreen = function(element, settings) {
	 var fold = ads.width(window) + ads.scrollLeft(window);
	 return fold <= ads.offSet(element).left - settings.threshold;
	 };
	 ads.leftofscreen = function(element, settings) {
	 var left = ads.scrollLeft(window);
	 return left >= ads.offSet(element).left + ads.width(element) + settings.threshold;
	 };*/
	ads.inViewPort = function(element, settings) {
		var element = typeof element === "string" ? Sizzle(element)[0] : element;
		if(!element) {
			return false;
		}
		return !ads.belowthefold(element, settings) && !ads.abovethetop(element, settings);
	};
})();
