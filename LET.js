/*Simple JavaScript Inheritance
* By John Resig http://ejohn.org/
* MIT Licensed.
*/
// Inspired by base2 and Prototype
(function() {
	var lly = "20140718";
	var initializing = false, fnTest = /xyz/.test(function() { xyz;
	}) ? /\b_super\b/ : /.*/;
	// The base Class implementation (does nothing)
	this.Class = function() {
	};
	// Create a new Class that inherits from this class
	Class.extend = function(prop) {
		var _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for(var name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn) {
				return function() {
					var tmp = this._super;

					// Add a new ._super() method that is the same method
					// but on the super-class
					this._super = _super[name];

					// The method only need to be bound temporarily, so we
					// remove it when we're done executing
					var ret = fn.apply(this, arguments);
					this._super = tmp;

					return ret;
				};
			})(name, prop[name]) : prop[name];
		}

		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if(!initializing && this.init)
				this.init.apply(this, arguments);
		}

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;

		return Class;
	};
})();
(function () {
	if (!String.repeat) {
	    String.prototype.repeat = function (n) {
	        return new Array(n + 1).join(this);
	    }
	}
	if (!String.trim) {
	    String.prototype.trim = function () {
	        return this.replace(/^\s+|\s+$/g, '');
	    }
	}
	/*http://ejohn.org/blog/objectgetprototypeof/*/
    if (typeof Object.getPrototypeOf !== "function") {
        if (typeof "test".__proto__ === "object") {
            Object.getPrototypeOf = function (object) {
                return object.__proto__;
            };
        } else {
            Object.getPrototypeOf = function (object) {
                // May break if the constructor has been tampered with
                return object.constructor.prototype;
            };
        }
    }
	var hasOwn = Object.prototype.hasOwnProperty, class2type = {}, toString = Object.prototype.toString;
	// Populate the class2type map
	var name = "Boolean Number String Function Array Date RegExp Object".split(" ");
	for (var i = 0; i < name.length; i++){
		class2type["[object " + name[i] + "]"] = name[i].toLowerCase();
	}
	function namespace(string, props) {
        var object = window;
        var names = string.split(".");
        for (var i = 0; i < names.length; i++) {
            var name = names[i];
            if (typeof object[name] === "undefined") {
            	object[name] = {};
            }
            object = object[name];
        }
        if (props) {
            for (var key in props) {
                object[key] = props[key];
            }
        }
        return object;
    }
	namespace("LET", {
		$:function(){
		    var elements = new Array();
		    for(var i = 0;i<arguments.length;i++)
		    {
		        var element = arguments[i];
		        if(typeof element == 'string')
		            element = document.getElementById(element);
		        if(arguments.length == 1)
		            return element;
		        elements.push(element);
		    }
		    return elements;
		},
		isFunction : function(obj) {
			return LET.type(obj) === "function";
		},
		isWindow : function(obj) {
			return obj && typeof obj === "object" && "setInterval" in obj;
		},
		type : function(obj) {
			return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
		},
		isArray:function (obj) {
		    return Object.prototype.toString.apply(obj) === '[object Array]';
		},
		isEmptyObject : function(obj){
            for ( var p in obj ) {
                return false;
            }
            return true;
        },
		addEvent:function (node,type,listener){    
		    if(!(node = LET.$(node))) { return false;}  
		    if(node.addEventListener)
		    {
		        node.addEventListener(type,listener,false);
		        return true;
		    }
		    else if(node.attachEvent)
		    {
		        node['e'+type+listener] = listener;
		        node[type+listener] = function(){
		            node['e'+type+listener](window.event);
		        }
		        node.attachEvent('on'+type,node[type+listener]);
		        return true;
		    }
		    return false;
		},
		removeEvent:function (node,type,listener){
		    if(!(node = LET.$(node))) { return false;}
		    if(node.removeEventListener)
		    {
		        node.removeEventListener(type,listener,false);
		        return true;
		    }
		    else if(node.detachEvent)
		    {
		        node.detachEvent('on'+type,node[type+listener]);
		        node[type+listener] = null;
		        return true;
		    }
		    return false;
		},
        getTarget:function (eventObject) {
		    eventObject = eventObject || window.event;
		    var target = eventObject.target || eventObject.srcElement;
		    if(target.nodeType == LET.nodeType.TEXT_NODE) {
		        target = node.parentNode;
		    }
		    return target;
		},
		nodeType:{
		    ELEMENT_NODE                    : 1,
		    ATTRIBUTE_NODE                  : 2,
		    TEXT_NODE                       : 3,
		    CDATA_SECYION_NODE              : 4,
		    ENTITY_REFERENCE_NODE           : 5,
		    ENTITY_NODE                     : 6,
		    PROCESSING_INSTRUCTION_NODE     : 7,
		    COMMENT_NODE                    : 8,
		    DOCUMENT_NODE                   : 9,
		    DOCUMENT_TYPE_NODE              : 10,
		    DOCUMENT_FRAGMENT_NODE          : 11,
		    NOTATION_NODE                   : 12
		},
		getElementsByClassName:function (className,tag,parent){
		    parent = parent || document;
		    if(!(parent = LET.$(parent))) { return false;}
		    var allTags = (tag == "*" && parent.all) ? parent.all:parent.getElementsByTagName(tag);
		    var matchingElements = new Array();
		    className = className.replace(/\-/g,"\\-");
		    var regex = new RegExp("(^|\\s)"+className+"(\\s|$)");
		    var element;
		    for(var i = 0 ;i<allTags.length;i++)
		    {
		        element = allTags[i];
		        if(regex.test(element.className))
		            matchingElements.push(element);
		    }
		    return matchingElements;
		},
		isType: function (obj, type) {
            var toString = Object.prototype.toString, undefined;
            return (type === "Null" && obj === null) ||
		    (type === "Undefined" && obj === undefined) ||
		    toString.call(obj).slice(8, -1) === type;
        },
        isPlainObject: function( obj ) {
			// Must be an Object.
			// Because of IE, we also have to check the presence of the constructor property.
			// Make sure that DOM nodes and window objects don't pass through, as well
			if ( !obj || LET.type(obj) !== "object" || obj.nodeType || LET.isWindow( obj ) ) {
				return false;
			}
			
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
			
			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own.
		
			var key;
			for ( key in obj ) {}
			
			return key === undefined || hasOwn.call( obj, key );
		},
	    extend:function(){
	    	var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

			// Handle a deep copy situation
			if ( typeof target === "boolean" ) {
				deep = target;
				target = arguments[1] || {};
				// skip the boolean and the target
				i = 2;
			}

			// Handle case when target is a string or something (possible in deep copy)
			if ( typeof target !== "object" && !LET.isFunction(target) ) {
				target = {};
			}

			// extend jQuery itself if only one argument is passed
			if ( length === i ) {
				target = this;
				--i;
			}

			for ( ; i < length; i++ ) {
				// Only deal with non-null/undefined values
				if ( (options = arguments[ i ]) != null ) {
					// Extend the base object
					for ( name in options ) {
						src = target[ name ];
						copy = options[ name ];

						// Prevent never-ending loop
						if ( target === copy ) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if ( deep && copy && ( LET.isPlainObject(copy) || (copyIsArray = LET.isArray(copy)) ) ) {
							if ( copyIsArray ) {
								copyIsArray = false;
								clone = src && LET.isArray(src) ? src : [];

							} else {
								clone = src && LET.isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[ name ] = LET.extend( deep, clone, copy );

						// Don't bring in undefined values
						} else if ( copy !== undefined ) {
							target[ name ] = copy;
						}
					}
				}
			}

			// Return the modified object
			return target;
	    },
		deepCopy: function (result, source) {
			//深度递归合并对象
            for (var key in source) {
                var copy = source[key];
                if (result === copy) continue;
                if (LET.isType(copy, "Object")) {
                    result[key] = arguments.callee(result[key] || {}, copy);
                } else if (LET.isType(copy, "Array")) {
                    result[key] = arguments.callee(result[key] || [], copy);
                } else {
                    result[key] = copy;
                }
            }
            return result;
        },
        throttle: function (fn, delay) {//http://remysharp.com/2010/07/21/throttling-function-calls/
            var timer = null;
            return function () {
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    fn.apply(context, args);
                }, delay);
            };
        },
		toggleDisplay:function (node,value){
			//切换元素显隐
			if(!(node = LET.$(node))) { return false;}
			var _display = node.style.display || LET.getStyle(node,'display');
		    if(_display != 'none')
		        node.style.display='none';
		    else{
		        node.style.display = value || '';
			}
		    return true;
		},
		bindFunction:function (obj,func){
			//改变函数运行环境
		    return function(){
		        func.apply(obj,arguments);
		    }
		},
		getPreviousSibling: function(el) {
			//获取上个兄弟节点
			if(el.previousSibling.nodeType == LET.nodeType.TEXT_NODE) {
				return LET.getPreviousSibling(el.previousSibling);
			} else {
				return el.previousSibling;
			}
		},	
		getNextSibling : function(el) {
			//获取下个兄弟节点
			if(el.nextSibling.nodeType == LET.nodeType.TEXT_NODE) {
				return LET.getNextSibling(el.nextSibling);
			} else {
				return el.nextSibling;
			}
		},
		insertAfter:function (node,refnode){
			if(!(node = LET.$(node))) { return false;}
			if(!(refnode = LET.$(refnode))) { return false;}
		    return refnode.parentNode.insertBefore(node,refnode.nextSibling);
		},
		removeChild:function (parent){
			//移除所有子节点
			if(!(parent = LET.$(parent))) { return false;}
		    while(parent.firstChild){
		        parent.firstChild.parentNode.removeChild(parent.firstChild);
		    }
		    return parent;
		},
		removeNode:(function(){
			//移除指定节点
			var fn = !+"\v1" ? function(){  
			    var d;  
			    return function(node){  
			if(!(node = LET.$(node))) { return false;}
			        if(node && node.tagName != 'BODY'){  
			            d = d || document.createElement('DIV');  
			            d.appendChild(node);  
			            d.innerHTML = '';  
			        }  
			    }  

			}() : function(node){  
			    if(!(node = LET.$(node))) { return false;}
			    if(node && node.parentNode && node.tagName !=  'BODY'){  
			        node.parentNode.removeChild(node);  
			    }  
			}
			return fn;
		})(),
		camelize:function (s){
			//处理样式转换font-size 为fontSize
		    return s.replace(/-(\w)/g,function(strMatch,p1){
		       return p1.toUpperCase(); 
		    });
		},
		uncamelize:function (s, sep) {
			//处理样式转换fontSize 为font-size
		    sep = sep || '-';
		    return s.replace(/([a-z])([A-Z])/g, function (strMatch, p1, p2){
		        return p1 + sep + p2.toLowerCase();
		    });
		},
		setStyle:function (element,styles) {
			//为元素设置样式
		    if(!(element = LET.$(element))) return false;
		    for(property in styles) {
		        if(!styles.hasOwnProperty(property)) continue;
		        
		        if(element.style.setProperty) {
		            element.style.setProperty(LET.uncamelize(property,'-'),styles[property],null);
		        } else {
		            element.style[LET.camelize(property)] = styles[property];
		        }
		    }
		    return true;
		},
		getStyle:function (element,property) {
			//获取元素计算样式
		    if(!(element = LET.$(element)) || !property) return false;
		    var value = element.style[LET.camelize(property)];
		    if(!value) {
		        //取得计算样式的值
		        if(document.defaultView && document.defaultView.getComputedStyle) {
		            var css =document.defaultView.getComputedStyle(element,null);
		            value = css ? css.getPropertyValue(LET.uncamelize(property,'-')) : null;
		        } else if (element.currentStyle){
		            value = element.currentStyle[LET.camelize(property)];
		        }
		    }
		    
		    return (value == '' || value == 'auto') ? 0 : value;
		},
		getCoords:function(el){ 
			 //获取元素在页面中的位置
			 var box = el.getBoundingClientRect(), 
				 doc = el.ownerDocument, 
				 body = doc.body, 
				 html = doc.documentElement, 
				 clientTop = html.clientTop || body.clientTop || 0, 
				 clientLeft = html.clientLeft || body.clientLeft || 0, 
				 top  = box.top  + (self.pageYOffset || html.scrollTop  ||  body.scrollTop ) - clientTop, 
				 left = box.left + (self.pageXOffset || html.scrollLeft ||  body.scrollLeft) - clientLeft; 
			 return { 'top': top, 'left': left }; 
		},
		getElementsByAttribute:function (search){
	    	//根据属性取得元素
	    	//LET.getElementsByAttribute('img[lsrc]');存在lsrc
	    	//LET.getElementsByAttribute('img[lsrc=xx]');lsrc等于xx
	    	//LET.getElementsByAttribute('img[lsrc!=xx]');lsrc不等于xx
	    	//*=包含,~=匹配单词,^=以xx开头,$=以xx结尾,|=属性为xx或xx-开头
		    var tag = /([\*a-zA-Z1-6]*)?(\[(\w+)\s*(\^|\$|\*|\||~|!)?=?\s*([\w\u00C0-\uFFFF\s\-_\.]+)?\])?/,
		    node = arguments[1] || document,
		    agent = search.match(tag),
		    tag = agent[1] || "*",
		    attribute = agent[3],
		    type =  agent[4]+"=",
		    value = agent[5],
		    ieAttrFix = {"class": "className","for": "htmlFor"},
		    returnElements = [],
		    //IE5.5不支持“*”
		    elements = (tag === "*" && node.all)? node.all : node.getElementsByTagName(tag),
		    length = elements.length;
		    if((!!document.querySelectorAll) && type != "!="){
		      elements = document.querySelectorAll(search);
		      for(var i=0,length = elements.length;i < length;i++){
		        returnElements.push(elements[i]);
		      }
		      return returnElements;
		    }
		    if(!+"\v1")
		      attribute = ieAttrFix[attribute] ? ieAttrFix[attribute] : attribute;
		    while(--length >= 0){
		      var current = elements[length],
		      _value = !+"\v1" ? current[attribute] : current.getAttribute(attribute);
		      if(typeof _value === "string" && _value.length > 0){
		        if(!!value){
		          var condition =
		            type === "=" ?//完全等于
		          _value === value :
		            type === "!=" ?//不等于
		          _value != value :
		            type === "*=" ?//包含
		          _value.indexOf(value) >= 0 :
		            type === "~=" ?//匹配当中的某个单词，如<span class="red bold">警告</span>
		          (" " + _value + " ").indexOf(value) >= 0:
		            type === "^=" ?//以XX开头
		          _value.indexOf(value) === 0 :
		            type === "$=" ?//以XX结尾
		          _value.slice(-value.length) === value:
		            type === "|=" ?//匹配属性值为XX或以XX-打头的元素
		          _value === value ||  _value.substring(0,value.length+1) === value+"-" :
		            false;
		          condition && returnElements.push(current);
		        }else{
		          returnElements.push(current);
		        }
		      }
		    }
		    return returnElements;
	    },
		getClassNames:function (element) {
			//取得包含元素类名的数组
		    if(!(element = LET.$(element))) return false;
		    return element.className.replace(/\s+/,' ').split(' ');
		},
		hasClassName:function (element, className) {
			//检查元素中是否存在某个类
		    if(!(element = LET.$(element))) return false;
		    var classes = LET.getClassNames(element);
		    for (var i = 0; i < classes.length; i++) {
		        if (classes[i] === className) { return true; }
		    }
		    return false;
		},
		addClassName:function (element, className) {
			//为元素添加类			
		    if(!(element = LET.$(element))) return false;
		    element.className += (element.className ? ' ' : '') + className;
		    return true;
		},
		removeClassName: function (element, className) {
			//从元素中删除类
		    if(!(element = LET.$(element))) return false;
		    var classes = LET.getClassNames(element);
		    var length = classes.length
		    for (var i = length-1; i >= 0; i--) {
		        if (classes[i] === className) { delete(classes[i]); }
		    }
		    //由于在getClassNames中移除了空格 取得了数组 所以要重新用空格分隔
		    element.className = classes.join(' ');
		    return (length == classes.length ? false : true);
		},
		createElement: function(tag, attrs, styles, target, action) {
			//创建元素LET.createElement('a', {href : "ddd"}, {width :"50px",},document.body,'prepend');
			var el = document.createElement(tag);
			attrs && LET.extend(el, attrs);
			styles && LET.setStyle(el, styles);
			if(target) {
				switch(action){
					case 'before':
						target.parentNode.insertBefore(el, target)
						break
					case 'after':
						LET.insertAfter(el, target)
						break
					case 'prepend':
						target.insertBefore(el,target.firstChild)
						break
					default:
						target.appendChild(el);
				}
			};
			return el;
		},
		stopPropagation:function (eventObject){
			//阻止事件冒泡
		    eventObject = eventObject || window.event;
		    if(eventObject.stopPropagation)
		        eventObject.stopPropagation();
		    else
		        eventObject.cancelBubble = true;
		},
		startMove:function(obj,json,tiem,fn){
			//缓动特效 1,执行对象 2,执行特效属性{top:12}3,执行每步毫秒4,执行完毕回调(宁肖创建)
            var tiem = tiem || 30;
            clearInterval(obj.timer);
            obj.isplay = false;
            obj.timer=setInterval(function (){
                obj.isplay = false;
                var attr='';
                var comp=true;
                for(attr in json){
                    var iCur=0;
                    if(attr=='opacity'){
                        iCur=Math.round(parseFloat(LET.getStyle(obj, attr))*100);
                    }else{
                        iCur=parseInt(LET.getStyle(obj, attr));
                    }
                    if(iCur!=json[attr]){
                        comp=false;
                    }
                    var iSpeed=(json[attr]-iCur)/8;
                    iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
                    if(attr=='opacity'){
                        obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
                        obj.style.opacity=(iCur+iSpeed)/100;
                    }else{
                        obj.style[attr]=iCur+iSpeed+'px';
                    }
                }
                obj.isplay = true;
                if(comp){
                    obj.isplay = false;
                    clearInterval(obj.timer);
                    if(fn){
                        fn();
                    }
                }
            }, tiem);
        },
		outerHeight:function(obj){ 
			//取得对象高度包括marg值 (宁肖创建)
			return parseInt(obj.offsetHeight) + parseInt(LET.getStyle(obj,"marginBottom")) + parseInt(LET.getStyle(obj,"marginTop"));
		},
		outerWidth:function(obj){
			//取得对象宽带包括marg值 (宁肖创建)
			return parseInt(obj.offsetWidth) + parseInt(LET.getStyle(obj,"marginLeft")) + parseInt(LET.getStyle(obj,"marginRight"));	
		},
		scrollmember:function(json,dire,ript){
			var memobj=json.memobj,marg=json.marg,men=parseInt(json.men),offl=parseInt(json.offl);
			var retdata = {},parint = Math.abs(parseInt(LET.getStyle(memobj,marg)));
			if(dire){
				if(ript==0||ript){
					ript==0?1:ript+1;
		           parint = -(offl*ript);
				}else{
					if(parint>=men){
						memobj.style[marg] = "0px";
						parint = 0;
					}				
				    parint = -(parint+offl);
				}			
		  	}else{
				if(ript){
					ript==0?1:ript+1;
					parint = offl*ript;
				}else{
			  		if(parint<=0){
						memobj.style[marg] = -men+"px";
						parint = men;
					}
		  		    parint = -(parint-offl);
				}
		  	}
		  	 retdata[marg]= parint;
		  	return retdata;		
		},
		contains:function(p,c){
			return p.contains?p!=c&&p.contains(c):!!(p.compareDocumentPosition(c)&16);
		},
		fixedMouse:function(e,target){//用于事件代理检测当然触发是否为改对象子对象(宁肖创建)
	        var related,type=e.type.toLowerCase();//这里获取事件名字
	        if(type=='mouseover'){
	            related=e.relatedTarget||e.fromElement
	        }else if(type='mouseout'){
	            related=e.relatedTarget||e.toElement
	        }else return true;
	        return related && related.prefix!='xul' && !LET.contains(target,related) && related!==target;		
		},								
		preventDefault:function (eventObject){
			//取消事件默认动作
		    eventObject = eventObject || window.event;
		    if(eventObject.preventDefault)
		        eventObject.preventDefault();
		    else
		        eventObject.returnValue = false;

		},
		chartCount:function(str,end) {
			//宁肖创建传入str截取多余转为....
            var endstr="";
            for (var i = 0, len = str.length, count = 0 ; i < len ; i++) {
                if ( str.charCodeAt(i) > 127) {
                    count += 2;
                } else {
                    count++;
                }
            }
            if(end && count>=end){
               return str.slice(0,end)+"....";
            }else if(end && count<end){
                return str+".....";
            }else{
                return count;
            }
        },
		addLoadEvent:(function (){
            var isReady = false,
                fnArr = [];
            function doReady(){
                //确保onready只执行一次
                isReady = true;
                for(var ci;ci=fnArr.pop();){
                   ci();
                }
            }
            return function(onready,waitForImages){
            	if(waitForImages) {return LET.addEvent(window,'load',onready);}
                if ( document.readyState === "complete" ) {
                    return onready && setTimeout( onready, 1 );
                }
                onready && fnArr.push(onready);
                isReady && doReady();
                if( !+"\v1" ){
                    (function(){
                        if ( isReady ) return;
                        try {
                            document.documentElement.doScroll("left");
                        } catch( error ) {
                            setTimeout( arguments.callee, 0 );
                            return;
                        }
                        doReady();
                    })();
                    window.attachEvent('onload',doReady);
                }else{
                    document.addEventListener( "DOMContentLoaded", function(){
                        document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
                        doReady();
                    }, false );
                    window.addEventListener('load',doReady,false);
                }
            }
        })(),
		addNewLoadEvent:function (loadEvent,waitForImages){
		    if(waitForImages) return LET.addEvent(window,'load',loadEvent);
		    var init = function(){  
		        if(arguments.callee.done) return;
		        arguments.callee.done = true;
		        loadEvent.apply(document,arguments);
		    };
		   
		    if(document.addEventListener)
		        document.addEventListener('DOMContentLoaded', init, false);
		    if(/WebKit/i.test(navigator.userAgent)) {
		        var _timer = setInterval(function() {
		            if(/loaded|complete/.test(document.readyState)) {
		                clearInterval(_timer);
		                init();
		            }
		        },10);
		    }
		    /*@cc_on @*/
		    /*@if (@_win32)
		    document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
		    var script = document.getElementById("__ie_onload");
		    script.onreadystatechange = function() {
		        if(this.readyState == "complete") {
		            init();
		        }
		    };
		    /*@end @*/
		    return true;
		},
		loadScript :function(url, callback,jsonp) {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			if(jsonp && !/[&?]callback=/.test(url)){
				if (typeof callback == 'function'){
					var cb = "_"+(+new Date)+ Math.round(Math.random()*1000);
					window[cb] = callback;
					callback = null;
					url += (/\?/.test(url)) ? "&" : "?";
					url += "callback="+cb;
				}
			}
			if(script.readyState) {
				script.onreadystatechange = function() {
					if(script.readyState == 'loaded' || script.readyState == 'complete') {
						script.onreadystatechange = null;
						callback && callback();
						script.parentNode.removeChild(script);
					}
				}
			} else {
				script.onload = function() {
					callback && callback();
					script.parentNode.removeChild(script);
				}
			}
			script.src = url;
			document.getElementsByTagName('head')[0].appendChild(script);
		},
		ajax: (function(){
			var json2str = function(json) {
				var strArr = [];
				for (var i in json) {
					if(i=="method" || i=="timeout" || i=="async") continue;
					if (!((typeof json[i]).toLowerCase() == "function" || (typeof json[i]).toLowerCase() == "object")) {
						strArr.push( encodeURIComponent(i) + "="+encodeURIComponent(json[i]) );
					}
				}
				return strArr.join("&");
			};
			var creatAjaxRequest = function() {
				var xmlHttp = null;
				if (window.XMLHttpRequest) {
					xmlHttp = new XMLHttpRequest();
				} else {
					try {
						xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
					} catch (e) {
						try {
							xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
						} catch (e) {
						}
					}
				}
				return xmlHttp;
			};
			
			return function(options) {
				//例如LET.ajax({url:'xxxx',method:'GET',data:{id:'a',name:'b'},completeListener:function() {alert(this.responsetext);}});
				//options.url 					请求地址
				//options.method                字符串 请求类型 默认为GET
				//options.data 					ajax参数对象
				//options.timeout 				超时时间设置(毫秒),默认8000,超时后触发timeOutListener
				//options.loadListener          当readState为1时调用
				//options.loadedListener        当readState为2时调用
				//options.interaciveListener    当readState为3时调用
				//options.jsResponseListener     请求成功 并且响应的Content-Type为text/javascript 或 application/javascript 这个侦听器将用响应的js字符串作为第一个参数 执行必须用eval()
				//options.jsonResponseListener  请求成功 并且响应的Content-Type为application/json 这个侦听器将用响应的JSON对象作为第一个参数
				//options.xmlResponseListener   请求成功 并且响应的Content-Type为application/xml 或 application/xhtml+html 这个侦听器将用响应的XML DOM文档作为第一个参数
				//options.htmlResponseListener  请求成功 并且响应的Content-Type为text/html 这个侦听器将用响应的HTML 字符串作为第一个参数
				//options.completeListener      这个方法总是在成功响应的最后被调用 如果响应中没有适当的Content-Type头部信息 则执行此方法
				//options.errorListener         当响应状态值不是200也不是0时被调用 如是在不会提供响应代码系统（如硬盘驱动器本地文件系统）上运行XMLHttpRequest 那么状态始终为0，只有completeListener被调用
				//options.timeOutListener		当请求超时时被调用
			    var timeIsOut = false, submitStr = '';
			    var req = creatAjaxRequest();
			    if(!req || !options.url) return false;
			    options = options || {};
			    options.method = options.method	? options.method.toUpperCase() : 'GET';
			    options.send = options.send || null;
			    options.timeout = options.timeout || 8000;
			    
			    var timerID = setTimeout(function() {
	                if (req.readyState != 4) {
	                    timeIsOut = true;
	                    req.abort();
	                    clearTimeout(timerID);
	                }
	            }, options.timeout);
	            
	            if (!LET.isEmptyObject(options.data)){
                	submitStr = json2str(options.data);
				}
				
			    req.onreadystatechange = function() {
			        switch (req.readyState) {
			            case 1:
			                if(options.loadListener) {
			                    options.loadListener.apply(req,arguments);
			                }
			                break;
			            case 2:
			                if(options.loadedListener) {
			                    options.loadedListener.apply(req,arguments);
			                }
			                break;
			            case 3:
			                if(options.ineractiveListener) {
			                    options.interaciveListener.apply(req,arguments);
			                }
			                break;
			            case 4:
			                try {
				                if (!timeIsOut && req.status == 200) {
				                    var contentType = req.getResponseHeader('Content-Type');
				                    var mimeType = contentType.match(/\s*([^;]+)\s*(;|$)/i)[1];                       
				                    switch(mimeType) {
				                        case 'text/javascript':
				                        case 'application/javascript':
				                            if(options.jsResponseListener) {
				                                options.jsResponseListener.call(
				                                    req,
				                                    req.responseText
				                                );
				                            }
				                            break;
				                        case 'application/json':
				                            if(options.jsonResponseListener) {
				                                try {
				                                    var json = LET.parseJSON(
				                                        req.responseText
				                                    );
				                                } catch(e) {
				                                    var json = false;
				                                }
				                                options.jsonResponseListener.call(
				                                    req,
				                                    json
				                                );
				                            }
				                            break;
				                        case 'text/xml':
				                        case 'application/xml':
				                        case 'application/xhtml+xml':
				                            if(options.xmlResponseListener) {
				                                options.xmlResponseListener.call(
				                                    req,
				                                    req.responseXML
				                                );
				                            }
				                            break;
				                        case 'text/html':
				                            if(options.htmlResponseListener) {
				                                options.htmlResponseListener.call(
				                                    req,
				                                    req.responseText
				                                );
				                            }
				                            break;
				                    }
				                
				                    if(options.completeListener) {
				                        options.completeListener.apply(req,arguments);
				                    }

				                } else {
				                
									if(timeIsOut){
										options.timeOutListener.apply(req,arguments);
									} else if(options.errorListener) {
				                        options.errorListener.apply(req,arguments);
				                    }
				                }
			                
			                } catch(e) {
			                	
			                }
			                break;
			        }
			    };
			    var str = options.url + (options.url.indexOf("?")==-1?"?":"&") + (options.method=="POST"?"":submitStr+ "&noCache=" + +new Date);
			    req.open(options.method, str, true);
			    req.setRequestHeader('X-LET-Ajax-Request','AjaxRequest');
				if (options.method == "POST") {
					req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					req.send(submitStr);
				} else {
					req.send(null);
				}
			};
		})(),
		parseJSON:function (s,filter) {
		    var j;
		    function walk(k, v) {
		        var i;
		        if (v && typeof v === 'object') {
		            for (i in v) {
		                if (v.hasOwnProperty(i)) {
		                    v[i] = walk(i, v[i]);
		                }
		            }
		        }
		        return filter(k, v);
		    }
		    if (/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(s)) {
		        try { j = eval('(' + s + ')'); } catch (e) { throw new SyntaxError("parseJSON"); }
		    } else {
		        throw new SyntaxError("parseJSON");
		    }
		    if(typeof filter == 'function') {
		        j = walk('',j);
		    }
		    
		    return j;
		}
	});
	LET.addLoadEvent();
})();