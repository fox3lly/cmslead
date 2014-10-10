var minirdlBg = "#000000", minirdlAlpha = 70, bdy = document.documentElement && document.documentElement.clientWidth ? document.documentElement : document.body;
function _get(a){
    return document.getElementById(a)
}

var mainWidth = bdy.offsetWidth - 50, miniDL_bg_swf_l = "http://d2.sina.com.cn/ads/test/081121/miniDL_bg_swfl.swf", miniDL_bg_swf_r = "http://d3.sina.com.cn/ads/test/081121/miniDL_bg_swfr.swf", miniDL_bg_swf, css = document.getElementsByTagName("head")[0].getElementsByTagName("style")[0], miniDL_css = "#miniDL_left{position:absolute;width:25px;height:350px;top:5px;left:0;overflow:hidden;display:none;font-size:12px;z-index:8888888;}#miniDL_left_cls{position:absolute;width:25px;height:17px;background:url(http://i0.sinaimg.cn/hs/ouyi/11Q1/images/icon1.png) no-repeat -67px -298px;top:305px;left:0;display:none;cursor:pointer;overflow:hidden;z-index:8888888;}#miniDL_right{position:absolute;width:25px;height:350px;top:5px;right:0;overflow:hidden;display:none;font-size:12px;z-index:8888888;}#miniDL_right_cls{position:absolute;width:25px;height:17px;background:url(http://i0.sinaimg.cn/hs/ouyi/11Q1/images/icon1.png) no-repeat -67px -298px;top:305px;right:0;display:none;cursor:pointer;overflow:hidden;z-index:8888888;}#miniDL_out{position:absolute;width:950px;height:90px;top:5px;overflow:hidden;display:none;font-size:12px;z-index:8888889;}#miniDL_cls{position:absolute;width:66px;height:22px;background:url(http://i0.sinaimg.cn/hs/ouyi/11Q1/images/icon1.png) no-repeat 0 -293px;cursor:pointer;top:75px;overflow:hidden;display:none;z-index:8888889;}#miniDL_bg{position:absolute;height:90px;top:5px;left:0;overflow:hidden;font-size:12px;z-index:8888888;text-align:center;display:none;overflow:hidden;filter:alpha(opacity=" + minirdlAlpha +
");-moz-opacity:" +
minirdlAlpha / 100 +
";opacity:" +
minirdlAlpha / 100 +
";background:none;}";
if (css.styleSheet) 
    css.styleSheet.cssText += miniDL_css;
else {
    var css_text = document.createTextNode(miniDL_css);
    css.appendChild(css_text)
}
var miniDL_html = '<div id="miniDL_left"></div><div id="miniDL_left_cls" title="5173 95ed"></div><div id="miniDL_right"></div><div id="miniDL_right_cls" title="5173 95ed"></div><div id="miniDL_out"></div><div id="miniDL_bg"></div><div id="miniDL_cls" title="5173 95ed"></div>', miniDL_st, miniDL_init_st, FSswitch = true, Extswitch = true, doclose = false, doBg = false;
function ckeFs(){
    FSswitch = typeof SYfullscreen == "undefined" ? false : SYfullscreen
}

function ckeFloat(){
    Extswitch = typeof ifshowbig == "undefined" ? false : typeof closeall == "undefined" ? ifshowbig : closeall == true ? !ifshowbig : ifshowbig
}

function show_out(a){
    ckeFs();
    ckeFloat();
    if (!Extswitch && !doclose && !FSswitch) {
        clearTimeout(miniDL_st);
        if (!doBg) {
            _get("miniDL_bg").style.background = "none";
            _get("miniDL_bg").style.display = "block";
            if (a == "left") 
                miniDL_bg_swf = miniDL_bg_swf_l;
            else 
                if (a == "right") 
                    miniDL_bg_swf = miniDL_bg_swf_r;
            a = new sinaFlash(miniDL_bg_swf, "extBg", mainWidth, 90, "7", "", false, "High");
            a.addParam("wmode", "transparent");
            a.addVariable("tmpColor", minirdlBg);
            a.addVariable("tmpAlpha", minirdlAlpha);
            a.addVariable("tmpWidth", mainWidth);
            a.write("miniDL_bg");
            _get("miniDL_bg").style.width = mainWidth + "px";
            _get("miniDL_bg").style.left = "25px";
            _get("miniDL_bg").style.top = "5px";
            doBg = true
        }
        setTimeout(function(){
            _get("miniDL_bg").innerHTML = "";
            _get("miniDL_out").style.display = "block";
            _get("miniDL_cls").style.display = "block";
            _get("miniDL_out").style.left = (bdy.offsetWidth - 950) / 2 + "px";
            _get("miniDL_cls").style.left = (bdy.offsetWidth - 950) / 2 + 883 + "px";
            siExtV = setInterval("siExt()", 50)
        }, 400);
        miniDL_st = setTimeout("hide_out()", 5400)
    }
}

var siExtV;
function siExt(){
    mainWidth = bdy.offsetWidth - 50;
    _get("miniDL_bg").style.width = mainWidth + "px";
    _get("miniDL_out").style.left = (bdy.offsetWidth - 950) / 2 + "px";
    _get("miniDL_cls").style.left = (bdy.offsetWidth - 950) / 2 + 883 + "px"
}

function hide_miniDL(){
    clearInterval(siExtV);
    _get("miniDL_bg").style.background = "none";
    _get("miniDL_left").style.display = "none";
    _get("miniDL_right").style.display = "none";
    _get("miniDL_left_cls").style.display = "none";
    _get("miniDL_right_cls").style.display = "none";
    _get("miniDL_out").style.display = "none";
    _get("miniDL_cls").style.display = "none";
    _get("miniDL_bg").style.display = "none";
    doBg = false
}

function hide_out(){
    _get("miniDL_out").style.display = "none";
    _get("miniDL_cls").style.display = "none";
    _get("miniDL_bg").style.display = "none";
    doBg = false
}

function init_miniDL(){
    ckeFs();
    ckeFloat();
    if (!Extswitch && !FSswitch) {
        clearTimeout(miniDL_init_st);
        _get("miniDL_left").style.display = "block";
        _get("miniDL_right").style.display = "block";
        _get("miniDL_left_cls").style.display = "block";
        _get("miniDL_right_cls").style.display = "block";
        _get("miniDL_left").onmouseover = function(){
            show_out("left")
        };
        _get("miniDL_right").onmouseover = function(){
            show_out("right")
        };
        _get("miniDL_left_cls").onclick = function(){
            hide_miniDL()
        };
        _get("miniDL_right_cls").onclick = function(){
            hide_miniDL()
        };
        _get("miniDL_cls").onclick = function(){
            hide_out();
            doclose = true
        }
    }
    else 
        miniDL_init_st = setTimeout("init_miniDL();", 50)
}

if (typeof miniRotatorDL != "function") 
    var miniRotatorDL = function(a, l){
        function q(g){
            for (var f = document.cookie.split("; "), b = 0; b < f.length; b++) {
                var k = f[b].split("=");
                if (k[0] == g) 
                    return unescape(k[1])
            }
            return ""
        }
        function r(g, f, b){
            b = new Date((new Date).getTime() + b * 6E4);
            var k = document.domain != "" ? "domain=" + document.domain + ";" : "";
            document.cookie = g + "=" + escape(f) + ";path=/;" + k + "expires=" + b.toGMTString() + ";"
        }
        function o(g, f){
            var b = [];
            b = g.split("-");
            b = new Date(b[0], b[1] - 1, b[2], 9, 0, 0);
            if (f) 
                b = new Date(b.getTime() + 864E5);
            return b
        }
        var c = new Date, h = 0, j = document.location.href;
        h = "sinaRotatorDL" + escape(j.substr(j.indexOf("/", 7), 2));
        j = a.width;
        for (var p = a.height, s = a.num, d = [], e = 0; e < a.length; e++) {
            var t = o(a[e][2].replace("<startdate>", "").replace("</startdate>", "")), u = o(a[e][3].replace("<enddate>", "").replace("</enddate>", ""), true);
            if (c > t && c < u) 
                d.push([a[e][0], a[e][1], a[e][4], a[e][5] ? a[e][5] : 0])
        }
        d.sort(function(g, f){
            return g[3] > f[3] ? 1 : -1
        });
        if (typeof globalRotatorId == "undefined" || globalRotatorId == null || isNaN(globalRotatorId)) {
            curId = q(h);
            curId = curId == "" ? Math.floor(Math.random() * 99) : ++curId;
            if (curId > 99 || curId == null || isNaN(curId)) 
                curId = 0;
            r(h, curId, 1440);
            globalRotatorId = curId
        }
        h = globalRotatorId % s + 1;
        try {
            if (h <= a.length && d.length) {
                document.write(miniDL_html);
                c = h - 1;
                var m = d[c][0].substring(d[c][0].length - 3).toLowerCase(), v = document.getElementById(l);
                init_miniDL();
                if (m == "swf") {
                    var n = new sinaFlash(d[c][0], l + "_swf", j, p, "7", "", false, "High");
                    n.addParam("wmode", "transparent");
                    n.addVariable("adlink", escape(d[c][1]));
                    n.write(l)
                }
                if (m == "jpg" ||
                m == "gif") 
                    v.innerHTML = '<a href="' + d[c][1] + '"><img src="' + d[c][0] + '" border="0" width="' + j + '" height="' + p + '" /></a>';
                if (d[c][2] != "" && d[c][2] != null) 
                    (new Image).src = d[c][2]
            }
        } 
        catch (w) {
        }
    };
var minirdll = [];
minirdll.width = 25;
minirdll.height = 300;
var minirdlr = [];
minirdlr.width = 25;
minirdlr.height = 300;
var minirdlc = [];
minirdlc.width = 950;
minirdlc.height = 70;
minirdlnum = 1;
minirdll.num = minirdlr.num = minirdlc.num = minirdlnum;
var minirdl = [];
minirdl.push(["http://d1.sina.com.cn/201103/01/287157.swf", "http://d5.sina.com.cn/201103/01/287156.swf", "http://d4.sina.com.cn/201103/01/287155.swf", "", "<startdate>2011-3-2</startdate>", "<enddate>2011-3-2</enddate>", "", "0A7D06245859"]);
for (var i = 0; i < minirdl.length; i++) {
    minirdll.push([minirdl[i][0], minirdl[i][3], minirdl[i][4], minirdl[i][5], minirdl[i][6], minirdl[i][7]]);
    minirdlr.push([minirdl[i][1], minirdl[i][3], minirdl[i][4], minirdl[i][5], minirdl[i][6], minirdl[i][7]]);
    minirdlc.push([minirdl[i][2], minirdl[i][3], minirdl[i][4], minirdl[i][5], minirdl[i][6], minirdl[i][7]])
}
new miniRotatorDL(minirdll, "miniDL_left");
new miniRotatorDL(minirdlr, "miniDL_right");
new miniRotatorDL(minirdlc, "miniDL_out");
