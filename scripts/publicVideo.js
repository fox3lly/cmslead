/**
 * @author ningxiao
 */
var video = {};
(function(){
	 var flashvars = null;
	 var flashstr = '';
	 var str;
	 var EventUtil=new Object;
	 var height;
	 var width;
	 var iebool = top.execScript?1:0;
	 var id;
	 var isIE6=MicrosoftIE();
	 var swfobj;
	 var index=0;
	 var eventlist = {};
	video.init=function(data){
		 var playerdiv,isplay = true;
		id=data.id||'SinaPlayer', src=data.src||null;
		if(!src){
			return;
		}
		playerdiv = document.createElement('div');
		flashvars = data.flashvars||{flv:str,onload:"video.onloadjs",onclose:"video.onclosejs",link:"http://www.baidu.com/",imageurl:"http://127.0.0.1:8020/SwfUpload/image/videoImage.jpg",containerID:"Playerdiv"};
		playerdiv.id = flashvars.containerID;
		height=data.height||260;
		width=data.width||310;
		playerdiv.style.zIndex = '100';
		playerdiv.style.position = 'fixed';
		playerdiv.style.width = width+'px';
		playerdiv.style.height = '0px';
		playerdiv.style.overflow = 'hidden';
		playerdiv.style.right = index*width+'px';
		playerdiv.style.bottom = '0px';
		document.body.appendChild(playerdiv);
		index++;
		if(isIE6){
			playerdiv.style.top = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight+'px';
			playerdiv.style.position = 'absolute';
			eventlist[flashvars.containerID] = [movetop,movetop];
			EventUtil.addEventHandler(window, 'scroll',eventlist[flashvars.containerID][0]);
		    EventUtil.addEventHandler(window, 'resize',eventlist[flashvars.containerID][1]);
		}		
		if(flashvars!=''){
			for(var i in flashvars){
				flashstr+=(i+'='+flashvars[i]+'&');
			}			
		}
		str ="<object height= "+height+" classid=clsid:D27CDB6E-AE6D-11cf-96B8-444553540000 align=middle width="+width+" type=application/x-shockwave-flash id="+id+">"
		+"<param name='quality' value='high'>"
		+"<param value="+src+" name=movie>"
		+"<param name='bgcolor' value='#ffffff'>"
		+"<param name='allowscriptaccess' value='sameDomain'>"
		+"<param name='allowfullscreen' value='true'>"
		+"<param name='flashvars' value="+flashstr+">"
		+"<embed height="+height+" width="+width+" flashvars="+flashstr+" allowfullscreen=true  allowscriptaccess=sameDomain type=application/x-shockwave-flash pluginspage=http://www.macromedia.com/go/getflashplayer quality=high src="+src+" id="+id+">"
		+"</object>";
		playerdiv.innerHTML = str;
		str = ''
		flashstr = '';  
		function movetop(){
	           startMove(playerdiv,{"height":height,"top":(document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - height});						
		}
	    video.onclosejs =function(name) {/**关闭事件调用*/
			var json = {'height':0};
			var playerdiv = get$(name);
			if(isIE6){
				EventUtil.removeEventHandler(window, 'scroll',eventlist[playerdiv.id][0]);
		        EventUtil.removeEventHandler(window, 'resize',eventlist[playerdiv.id][1]);
				json = {'height':0,'top':(document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight};
			}
		   startMove(playerdiv,json,function(){
			  freeLeak(playerdiv);
			   if(video.onclose){
				  video.onclose(name);
		       }
		   });
		}		
	}
	video.onloadjs=function(swfid){/**初始化事件调用*/
		var json = {'height':height};
		var playerdiv = get$(swfid);
		if(isIE6){
			json = {'height':height,'top':(document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight-height};
		}
    	startMove(playerdiv,json,function(){
    		swfobj=iebool?get$(id):get$(id).getElementsByTagName('embed')[0];
    		if(video.onload){
    			video.onload(swfid);
    		}
    	});
    }
	function get$(id){/**取得对象*/
		return typeof id=='string'?document.getElementById(id):id;
	}
	function freeLeak(obj){/**释放不需要的元素*/
	   removeNode(obj);
    }
	function getStyle(obj, name){/**取得样式*/
		if(obj.currentStyle){
			return obj.currentStyle[name]||obj.style[name];
		}else{
			return getComputedStyle(obj, document)[name]||obj.style[name];
		}
	}
	function startMove(obj, json, fn){/**缓动*/
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			var attr='';
			var comp=true;
			for(attr in json){
				var iCur=0;
				if(attr=='opacity'){
					iCur=Math.round(parseFloat(getStyle(obj, attr))*100);
				}else{
					iCur=parseInt(getStyle(obj, attr));
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
			if(comp){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}
		}, 30);
	}	
	EventUtil.addEventHandler=function(oTarget,sEventType,fhHandler){
		if(oTarget.attachEvent){/**IE下面的注册事件*/
			oTarget.attachEvent('on'+sEventType,fhHandler);
		}else if(oTarget.addEventListener){/**非IE下面的注册事件*/
			oTarget.addEventListener(sEventType,fhHandler,false);
		}else{
			oTarget['on'+sEventType] = fhHandler;
		}
	};
	EventUtil.removeEventHandler=function(oTarget,sEventType,fhHandler){
		if(oTarget.detachEvent){/**IE下面的删除事件*/
			oTarget.detachEvent('on'+sEventType,fhHandler);
		}else if(oTarget.removeEventListener){/**非IE下面的删除事件*/
			oTarget.removeEventListener(sEventType,fhHandler,false);
		}else{
			oTarget['on'+sEventType] = null;
		}
	};
    var removeNode = iebool? function(node){/**删除元素公共方法*/
    	var d;
		if(node && node.tagName!='BODY'){
				d = d||document.createElement('DIV');
				d.appendChild(node);
				d.innerHTML = '';
			}
		}:function(node){
			if(node && node.parentNode && node.tagName!='BODY'){
				node.parentNode.removeChild(node);
			}
	};
	function MicrosoftIE(){/**判断是否为IE6*/
		if(iebool){
			var browser=navigator.appName
			var b_version=navigator.appVersion
			var version=b_version.split(";");
			var trim_Version=version[1].replace(/[ ]/g,"");
			if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0"){
				return true;
			}
			return false;		
		}		
	}			
})(video);
