/*!
 * JavaScript Base v1.0
 * Copyright (c) 2014 Rock.liuxn
 * Created: 2014-04-03
 * Last updated : 2015-06-16 21:30
 */

function $$(id){
   return "string" == typeof id ? document.getElementById(id) : id;
};
function Eval(x){
	if (x=="" || x==null || x==undefined)
		return null;
	return eval("("+x+")");
}
String.prototype.format = function(){
    var number;
    var template = this;
    for (var i = 0; i < arguments.length; i++){
        number = "\{(" + i + ")\}";
        var reg = new RegExp(number, "ig");
        template = template.replace(reg, arguments[i]);
    }   
    return template;
}  
String.prototype.length2 = function() {
//    var cArr = this.match(/[^x00-xff]/ig);
//    return this.length + (cArr == null ? 0 : cArr.length); 
    var len = 0;  
    for (var i=0; i<this.length; i++) {  
        if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {  
           len += 2;  
         } else {  
           len ++;  
         }  
    }  
    return len; 
}
Array.prototype.foreach = function (handler) {
    for (var i = 0; i < this.length; i++) {
        var obj = this[i];
        if (handler) { if (handler(obj, i, this)) { break; } }
    }
}
// 参数添加/替换
String.prototype.changeQuery = function(name, value){
    var reg = new RegExp("(^|)"+ name +"=([^&]*)(|$)");
    var tmp = name + "=" + value;
    if(this.match(reg) != null) {
        return this.replace(eval(reg),tmp);
    }
    else {
        if(this.match("[\?]")) {
            return this + "&" + tmp;
        } else {
            return this + "?" + tmp;
        }
    }
} 

Date.prototype.add = function (strInterval, NumDay) {
    var dtTmp = this;
    if (isNaN(dtTmp)) dtTmp = new Date();
    switch (strInterval) {
        case "s": return new Date(Date.parse(dtTmp) + (1000 * NumDay));
        case "n": return new Date(Date.parse(dtTmp) + (60000 * NumDay));
        case "h": return new Date(Date.parse(dtTmp) + (3600000 * NumDay));
        case "d": return new Date(Date.parse(dtTmp) + (86400000 * NumDay));
        case "w": return new Date(Date.parse(dtTmp) + ((86400000 * 7) * NumDay));
        case "m": return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + NumDay, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case "y": return new Date((dtTmp.getFullYear() + NumDay), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
    return dtTmp;
}

Date.prototype.format = function(format){
 // eg:format="yyyy-MM-dd hh:mm:ss";
    var o = {
        "M+" :  this.getMonth()+1,  //month
        "d+" :  this.getDate(),     //day
        "h+" :  this.getHours(),    //hour
        "m+" :  this.getMinutes(),  //minute
        "s+" :  this.getSeconds(), //second
        "q+" :  Math.floor((this.getMonth()+3)/3),  //quarter
        "S"  :  this.getMilliseconds() //millisecond
    }

    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}


var TgBase = {version:"1.0.0"};
var TgProj =  {version:"1.0.0"};
TgBase.Browser= {
	ie:/msie/.test(window.navigator.userAgent.toLowerCase()),
	ie6:((/msie/.test(window.navigator.userAgent.toLowerCase()))&&!window.XMLHttpRequest&&window.ActiveXObject),
	ie7:((/msie/.test(window.navigator.userAgent.toLowerCase()))&&window.XMLHttpRequest),
	moz:/gecko/.test(window.navigator.userAgent.toLowerCase()),
	opera:/opera/.test(window.navigator.userAgent.toLowerCase()),
	safari:/safari/.test(window.navigator.userAgent.toLowerCase())	
};
TgBase.Cookie= {
	set:function(name,value,expiresSeconds,path,domain){
	    //console.log(name+"_"+value);
		var expires;
		if(typeof(expiresSeconds)=="undefined" || (expiresSeconds==null)){
			expires=new Date(new Date().getTime()+24*3600*1000);
		}else{
			expires=new Date(new Date().getTime()+expiresSeconds*1000);
		}
		document.cookie=name+"="+escape(value)+((expires)?"; expires="+expires.toGMTString():"")+((path)?"; path="+path:"; path=/")+((domain)?";domain="+domain:"");
	},
    //sMainName： Cookie名；sSubName：Cookie子键名，留空表示单值Cookie	
	get:function(sMainName,sSubName){
        var re = new RegExp((sSubName ? sMainName + "=(?:.*?&)*?" + sSubName + "=([^&;$]*)" : sMainName + "=([^;$]*)"),"i");
        return re.test(unescape(document.cookie)) ? RegExp["$1"] : "";
	},
	clear:function(name,path,domain){
		if(this.get(name)){
			document.cookie=name+"="+((path)?"; path="+path:"; path=/")+((domain)?"; domain="+domain:"")+";expires=Fri, 02-Jan-1970 00:00:00 GMT";
		}
	}
};
TgBase.Util = {  
	addSite:function(sUrl, sTitle){
		if(document.all){
		    try{
				window.external.addFavorite(sUrl, sTitle);
			}
			catch (e1) {
				try { 
	            	window.external.addToFavoritesBar(sUrl, sTitle);
	            }
				catch (e2) { 
					alert("加入收藏失败，请使用Ctrl+D进行添加");
				} 
	    	}
	    }
	    else if (window.sidebar) {
	    	window.sidebar.addPanel(sTitle, sUrl, "");
	    }
	    else {
	    	alert("加入收藏失败，请使用Ctrl+D进行添加");
	    }	    
	    return false;
	},
	getQueryStr:function(name){
		var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
		if (reg.test(location.href)) return decodeURIComponent(RegExp.$2.replace(/\+/g, " ")); 
		return "";
	},
    getAbsMiddleLeft:function(id){
       var obj = $$(id);
       return (document.documentElement.clientWidth-obj.clientWidth)/2+document.documentElement.scrollLeft;
    },
    getAbsMiddleTop:function (id){
        var obj = $$(id);
        return (document.documentElement.clientHeight-obj.clientHeight)/2+document.documentElement.scrollTop; 
    },
    getLeft:function(id){
        var e = $$(id); 
        var offset=e.offsetLeft;  
        if(e.offsetParent!=null) offset+=this.getLeft(e.offsetParent);  
        return offset; 
    },
    getTop:function(id){
        var e = $$(id);     
        var offset=e.offsetTop;  
        if(e.offsetParent!=null) offset+=this.getTop(e.offsetParent);  
        return offset;   
    },
    getCutString:function (s,num,isp){    //s: 待截取字符串 n:保留字符长度 isp: 是否带省略号（默认不带）
	    var totalLength = 0;     
        var i;
        var charCode;   
        var tempStr = "";   
        for (i = 0; i < s.length; i++) {   
          charCode = s.charCodeAt(i);   
          if (charCode < 0x007f) {   
            totalLength = totalLength + 1;   
          } else{   
            totalLength += 2;   
          }    
          if (totalLength>=num && tempStr==""){   
              tempStr = s.substring(0,i+1); //+"..."
              if(isp) tempStr+="...";
            }   
        }   
        if (totalLength <= num)   
        {   
            return s;
        }   
        else   
        {   
            return tempStr;   
        }
     },
     padLeft:function(num,n) {
        var len = num.toString().length;
        while(len < n) {
            num = '0' + num;
            len++;
        }
        return num;  
     },
     getRandom:function(miniNum, maxNum){    // 获取随机数 (miniNum:随机数下界, maxNum:随机数上界)
        return Math.round(Math.random()*(maxNum-miniNum)+miniNum);
     },     
	createHttpRequest:function(){
		var xmlHttp = false;
		try{
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e){
			try{
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e2){
				xmlHttp = false;
			}
		}
		
		if (!xmlHttp && typeof XMLHttpRequest != 'undefined'){
			xmlHttp = new XMLHttpRequest();
			if (xmlHttp.overrideMimeType){
				//xmlHttp.overrideMimeType('text/xml');
			}
		}
		return xmlHttp;
	},
    GetLocalAreaData:function (callback) {
          var cookieName = "LocalArea",
//               province = TgBase.Cookie.get(cookieName, "province"), 
//               city = TgBase.Cookie.get(cookieName,"city"),
               json = { province:TgBase.Cookie.get(cookieName, "province"), city:TgBase.Cookie.get(cookieName,"city") };
          if(json.province==""|| json.city==""){
                $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',function () {
                    if(remote_ip_info && remote_ip_info.ret==1){
                         json.province = remote_ip_info.province;
                         json.city =  remote_ip_info.city;
                         var area = "province="+json.province+"&city="+json.city;
                         TgBase.Cookie.set(cookieName,area,null,"",TgBase.Com.CookieDomain);  // cookie time : 24hour
                        if (callback != null) {
                            callback(json);
                        }                          
                    }
                });                 
          }else{
                if (callback != null) {
                    callback(json);
                }              
          }                      
    }     
	
};
TgBase.UI = {
    createMask:function(opaNum,color){  // 创建遮盖层  opaNum：灰度值,  color：背景色
        
        if($$("d_hidemask") == null){ 
            
            if(opaNum){
                opaNum = opaNum;
            }else if(opaNum == 0){
                opaNum = 0; 
            }else{
                opaNum = 4;
            }
            if(!color){
                color = "#000";
            }             
             
            var objDiv = document.createElement("div");
            objDiv.id = "d_hidemask";
            objDiv.style.backgroundColor = color;
            objDiv.style.filter = "alpha(opacity = "+opaNum*10+")";   
            objDiv.style.opacity =""+opaNum/10+"";                  
            objDiv.style.position="absolute";   
            objDiv.style.left = "0";
            objDiv.style.top = "0";          
            objDiv.style.width = document.documentElement.clientWidth + "px";  //"100%";   
            objDiv.style.height = Math.max(document.documentElement.clientHeight, document.body==null ? 3000 : document.body.scrollHeight ) + "px";//document.documentElement.scrollHeight +"px";              
            objDiv.style.zIndex = "200";  
            objDiv.style.zoom = "1";  
            
            var w = objDiv.style.width;
            var h = objDiv.style.height;
            
            var iframe = "<!--[if lte IE 6]><iframe style=\"background-color:"+color+"; display:block; position:absolute; top:0; left:0;filter:alpha(opacity="+opaNum*10+"); opacity:"+opaNum/10+"; width:"+w+"; height:"+h+"; z-index:1000;\"></iframe><![endif]-->";  
            objDiv.innerHTML = iframe;

            document.body.appendChild(objDiv);
         }else{
             if(opaNum){ 
                 $$("d_hidemask").style.filter = "alpha(opacity = "+opaNum*10+")";   
                 $$("d_hidemask").style.opacity =""+opaNum/10+"";   
             }
             if(color){
                 $$("d_hidemask").style.backgroundColor = color;
             }    
             $$("d_hidemask").style.display = "block";
         }  
    },
    closeMask:function(){    // 关闭遮盖层
        $$("d_hidemask").style.display = "none";
    },
    createMaskDiv:function(strHtml,w,h,opaNum,color){
        if(opaNum){
            opaNum = opaNum;
        }else if(opaNum == 0){
            opaNum = 0; 
        }else{
            opaNum = 4;
        }
        this.createMask(opaNum,color);

        if($$("d_hidediv")==null) {
            var objDiv = document.createElement("div");
            objDiv.id = "d_hidediv";
            objDiv.style.width = w+"px";   
            objDiv.style.height = h+"px";                             
            objDiv.innerHTML = strHtml;
            
            document.body.appendChild(objDiv); 
            
        }else{
            $$("d_hidediv").innerHTML = strHtml;
            $$("d_hidediv").style.display = "block";
        } 
        var obj = $$("d_hidediv");
        obj.style.position = "absolute";
        obj.style.zIndex = "202";                  
        obj.style.left=TgBase.Util.getAbsMiddleLeft("d_hidediv")+"px";
        obj.style.top=TgBase.Util.getAbsMiddleTop("d_hidediv")+"px"; 
    },
    closeMaskDiv:function(){
        this.closeMask();
        $$("d_hidediv").style.display = "none";   
    },     
    createFrame:function(w,h,s){   //创建Iframe层   w：宽，h：高，s：地址
        this.createMask();
        if($$("d_hideframe")==null) {
            var iframe = "<iframe id=\"PopFrame\" frameBorder=\"0\" scrolling=\"no\" allowTransparency=\"true\" src=\""+s+"\" marginwidth=\"0\" marginheight=\"0\"  style=\"width:"+w+"px; height:"+h+"px; border:0;\"></iframe>";
            var objDiv = document.createElement("div");
            objDiv.id = "d_hideframe";
            objDiv.style.width = w+"px";   
            objDiv.style.height = h+"px";                             
            objDiv.innerHTML = iframe;
            
            document.body.appendChild(objDiv); 
            
        }else{
            $$("PopFrame").src = s;
            $$("d_hideframe").style.display = "block";
        } 
        var obj = $$("d_hideframe");
        obj.style.position = "absolute";
        obj.style.zIndex = "201";                  
        obj.style.left=TgBase.Util.getAbsMiddleLeft("d_hideframe")+"px";
        obj.style.top=TgBase.Util.getAbsMiddleTop("d_hideframe")+"px"; 
     },
     closeFrame:function(){   //关闭Iframe层
        this.closeMask();
        $$("d_hideframe").style.display = "none";
     },
     IsMaskShow:function(){
         var ishow = false;
         if($$("d_hidemask") != null){
              ishow =  ($$("d_hidemask").style.display == "block");
         }
         return ishow;  
     },
     closeAllMask:function(){
         if($$("d_hidediv") != null){
              $$("d_hidediv").style.display == "none";
         }      
         if($$("d_hideframe") != null){
              $$("d_hideframe").style.display == "none";
         }     
         if($$("d_hidemask") != null){
              $$("d_hidemask").style.display == "none";
         }
     }     
};
TgProj.Weibo = {
     Appto:{
          UserSpace:function(uidx){
                return "appto:gourl/#800-{0}-1".format(uidx);
          },
          WeiboItem:function(itemId){
                return "appto:gourl/#900-{0}".format(itemId);
          }
     }
};
TgBase.Com = {
    CookieDomain:window.location.href, 
    CookieName:"tg_v_passport",    
    VisitFrom : window.location.href,
    Link:{
       Site:window.location.href
    }
};
TgProj.UserData = {
    CookieName:TgBase.Com.CookieName,
    CookieDomain:TgBase.Com.CookieDomain,
    iUIdx:function(){
        var uidx = TgBase.Cookie.get(this.CookieName,'uidx');
        if(uidx!="") 
          return parseInt(uidx);
        else
          return 0;         
    },
    sUId:function(){
        var uid = decodeURIComponent(TgBase.Cookie.get(this.CookieName,'uid'));
        if(uid!="") 
          return uid;
        else
          return "游客";         
    }, 
    sNick:function(){
        var nick = decodeURIComponent(TgBase.Cookie.get(this.CookieName,'myname'));
        if(nick!="") 
          return nick;
        else
          return "游客";         
    },
    sUsign:function(){
        return TgBase.Cookie.get(this.CookieName,'Usign');
    },
    sAvatar:function(){
        return "http://" + decodeURIComponent(TgBase.Cookie.get(this.CookieName,'photo'));
    },
    ModifyMyName:function(name){
        TgBase.Cookie.modify(this.CookieName,'myname',name,0,null,this.CookieDomain);
    }  
};
TgProj.User = {
    SynchInfo:function () {
         var c_info = TgBase.Cookie.get('C_info'),
               uidx =  TgProj.UserData.iUIdx();   
         if (c_info!=null&&c_info.length>0&&uidx==0) {
                $.ajax({
	                type : "GET",
	                url :  TgBase.Com.Link.Site+"/Ajax/Member.ashx?act=7&rd="+Math.random(),
                    dataType:"jsonp",  
	                async : false,
	                success : function (data) {}
                });         
         }
         if(c_info==""&&uidx>0){
               TgBase.Cookie.clear(TgBase.Com.CookieName,"",TgBase.Com.CookieDomain);
         }       
    }  
};
TgProj.Room = {
    // 客户端进入房间 
    IntoRoom:function(roomIdx,uLevel,roomType){
        var userId =  TgBase.Util.getQueryStr("userid");
        if (!roomType) {
             roomType = 1;
        }
        $.ajax({
                    type: "POST",
                    url: "../Apps/Room.ashx",
                    dataType:"json", 
                    data: {act:1,roomidx:roomIdx,userid:userId,ulevel:uLevel,roomtype:roomType,from:TgBase.Com.VisitFrom},
//                    beforeSend: function () {
//                        $.blockUI({
//                            message: "<img src='http://sr.ok.sina.com.cn/v3.0/images/loading.gif'/>"
//                        });
//                    },
                    success: function(d) {
//                        $.unblockUI();
                        if(d.ret==1){                    
                            if(d.fun==null||d.fun==""){
                                alert("获取房间信息失败，请稍候再试！");
                            }else{
                                eval(d.fun);
                            }        
                        }else if(d.ret ==-1){
                            alert("系统错误，请稍候再试！");                                            
                        }else if(d.ret==-2){
                            alert("请登录后再试！");                                            
                        }
                    }
           }); 
    },
    GetGiftImg:function (giftid) {
        var img = ""; 
        switch(giftid) {
        case 1:
            img="<img border =0 src='../images/t_Integrate/鲜花.gif' title='鲜花'>";
        	break;
        case 8:
            img="<img border =0 src='../images/t_Integrate/啤酒16.gif' title='啤酒'>";
        	break;
        case 9:
            img="<img border =0 src='../images/t_Integrate/牛16.gif' title='牛人'>";
        	break;   
        case 10:
            img="<img border =0 src='../images/Integrate/3_3.gif' title='棒棒糖' >";
        	break;  
        case 16:
            img="<img border =0 src='../images/t_Integrate/10_3.gif' title='乌龟'>";
        	break;
        case 31:
            img="<img border =0 src='../images/t_Integrate/红包16.gif' title='红包'>";
        	break;
        case 39:
            img="<img border =0 src='../images/t_Integrate/荧光棒.gif' title='荧光棒'>";
        	break;        	
        case 68:
            img="<img border =0 src='../images/t_Integrate/香水.gif' title='香水'>";
        	break;        	      	     	        
        case 102:
            img="<img border =0 src='../images/t_Integrate/102_3.gif' title='八戒' >";
        	break;
        case 306:
            img="<img border =0 src='../images/t_Integrate/306.gif' title='小主金安'>";
        	break;
        case 312:
            img="<img border =0 src='../images/t_Integrate/神灯16.gif' title='神灯'>";
        	break;
        case 313:
            img="<img border =0 src='../images/t_Integrate/313.gif' title='四叶草'>";
        	break;   
        case 70:
            img="<img border =0 src='../images/t_Integrate/雪茄16.gif' title='雪茄'>";
        	break;    
        case 88:
        case 315:
            img="<img border =0 src='../images/t_Integrate/315_16.gif' title='招桃花'>";
        	break;
        case 320:
        case 73: 
            img="<img border =0 src='../images/t_Integrate/320_16.gif' title='么么哒'>";
        	break;   
        case 322:
        case 84:
            img="<img border =0 src='../images/t_Integrate/322_16.gif' title='女神'>";
        	break;         	    	     	
        } 
        return img; 
    }    

}

//动态加载css
function loadCSS(url){
    window.cssloaded=window.cssloaded||{};
    if(window.cssloaded[url])return;
    window.cssloaded[url]=1;
    var css=document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("type", "text/css");
    css.setAttribute("href", url);
    document.getElementsByTagName('head')[0].appendChild(css);
}

function requireDialog(func){
    if($.fn.dialog)
    {
        func();
    } 
    else 
    {
        asyncCall(TgBase.Com.Link.Site+'/js/v3.0/weishow.dialog.min.js?d=20120807', function () {
            func();
        },function(){
            loadCSS(TgBase.Com.Link.Site+'/Themes/v3.0/css/weishow.dialog.css');
        },false);
    }
}
function asyncCall(url,func,loadbefore){
    window.jsLoading=window.jsLoading||{};
    window.jsLoaded=window.jsLoaded||{};
    if(jsLoading[url]){
        setTimeout(function(){
            asyncCall(url,func);
        },2);
        return;
    }
    if(jsLoaded[url]){
        func&&func();
    }else{
        jsLoading[url]=1;
        loadbefore&&loadbefore();
        $.getScript(url,function(){
            jsLoading[url]=0;
            jsLoaded[url]=1;
            func&&func();
        });
    }
}


function favorite() 
{  
    var sTitle = document.title;
    var sURL = window.location.href; 
    
    if(sTitle == null){ 
        var t_titles = document.getElementByTagName("title") 
        if(t_titles && t_titles.length >0) 
        { 
           sTitle = t_titles[0]; 
        }else{ 
           sTitle = ""; 
        } 
    } 
    
    TgBase.Util.addSite(sURL,sTitle); 
}

//转义
function htmlEscape(str)
{
	var sTemp = str.replace(/</g,"&lt;");
	str.replace(/</g,"&lt;");
	str.replace(/"/g,"&quot;");
	str.replace(/&/g,"&amp;");
	str.replace(/>/g,"&gt;");
    sTemp = sTemp.replace(/\r\n/g,"<br>");
	var patten = /\[E(\d\d\d)\]/g;
	return sTemp;
}

function foreachCheckBox(name, hFn, hFnFilter){
	var arrCtl = document.body.getElementsByTagName("input");
	var arrBox = new Array();
	for(var i=0; i<arrCtl.length;i++){ 
		var obj = arrCtl[i];
		if (obj.type == "checkbox" && obj.name == name) {
			if(hFnFilter)
			 { 
				if (hFnFilter(obj))
				{
					arrBox.push(obj); 
				}
			} 
			else 
			{ 
				arrBox.push(obj); 
			}
		}
	}
	arrBox.foreach(	function(obj, i) { if (hFn) { hFn(obj, i, arrBox.length); } });
	return arrBox;
}


//选择CheckBox
function chooseCheckBox(name, v){
	foreachCheckBox(name, function(obj,i) { obj.checked = v; });
}

//反选
function checkReverse(name){
	foreachCheckBox(name, function(obj,i) { obj.checked = !obj.checked; });
}

function getCheckBoxValue(name){
	var ids = "";
	var arrBox = foreachCheckBox(name, null,	function(box) { return box.checked; } );
	arrBox.foreach(function(box,i){
		if (i == 0){
			ids = box.value;
		} else {
			ids += "," + box.value;
		}
	});
	return ids;
}


function start(ServerTypeName,roomid,roomname,ServerName,ServerPort,VideoPort,AudioPort,RoomTypeName,RoomDescription,RoomMaxOnlineUser,RoomMaxMike){
    Invoke.SetRegName(TgBase.Com.VisitFrom);
    Invoke.SetCommandType("1");
    Invoke.SetServerType(ServerTypeName);
    Invoke.SetRoomTypeName(RoomTypeName);
    Invoke.SetRoomInfo(RoomDescription);
    Invoke.SetMaxUserAmount(RoomMaxOnlineUser);
    Invoke.SetMaxMikeAmount(RoomMaxMike);
    Invoke.SetChatName(roomname);
    Invoke.SetPort (ServerPort, VideoPort, AudioPort);
    Invoke.SetIPAddr(ServerName);
    Invoke.SetRoomID(roomid);
    Invoke.Start();
}
function start2(ServerTypeName,roomid,roomname,ServerName,ServerPort,VideoPort,AudioPort,RoomTypeName,RoomDescription,RoomMaxOnlineUser,RoomMaxMike){
    Invoke.SetRegName(TgBase.Com.VisitFrom);
    Invoke.SetCommandType("2");
    Invoke.SetServerType(ServerTypeName);
    Invoke.SetRoomTypeName(RoomTypeName);
    Invoke.SetRoomInfo(RoomDescription);
    Invoke.SetMaxUserAmount(RoomMaxOnlineUser);
    Invoke.SetMaxMikeAmount(RoomMaxMike);
    Invoke.SetChatName(roomname);
    Invoke.SetPort (ServerPort, VideoPort, AudioPort);
    Invoke.SetIPAddr(ServerName);
    Invoke.SetRoomID(roomid);
    Invoke.Start();
}
function startKTV(ServerTypeName,roomid,roomname,ServerName,ServerPort,VideoPort,AudioPort,RoomTypeName,RoomDescription,RoomMaxOnlineUser,RoomMaxMike,KTVPort){
    if (!KTVPort) KTVPort="9999"; 
    Invoke.SetRegName(TgBase.Com.VisitFrom);
    Invoke.SetCommandType("33");
    Invoke.SetKTVPort(KTVPort);
    Invoke.SetServerType(ServerTypeName);
    Invoke.SetRoomTypeName(RoomTypeName);
    Invoke.SetRoomInfo(RoomDescription);
    Invoke.SetMaxUserAmount(RoomMaxOnlineUser);
    Invoke.SetMaxMikeAmount(RoomMaxMike);
    Invoke.SetChatName(roomname);
    Invoke.SetPort(ServerPort, VideoPort, AudioPort);
    Invoke.SetIPAddr(ServerName);
    Invoke.SetRoomID(roomid);
    Invoke.Start();
}
function startKTV2(ServerTypeName,roomid,roomname,ServerName,ServerPort,VideoPort,AudioPort,RoomTypeName,RoomDescription,RoomMaxOnlineUser,RoomMaxMike,KTVPort){
    if (!KTVPort) KTVPort="9999";
    Invoke.SetRegName(TgBase.Com.VisitFrom);
    Invoke.SetCommandType("34");
    Invoke.SetKTVPort(KTVPort);
    Invoke.SetServerType(ServerTypeName);
    Invoke.SetRoomTypeName(RoomTypeName);
    Invoke.SetRoomInfo(RoomDescription);
    Invoke.SetMaxUserAmount(RoomMaxOnlineUser);
    Invoke.SetMaxMikeAmount(RoomMaxMike);
    Invoke.SetChatName(roomname);
    Invoke.SetPort (ServerPort, VideoPort, AudioPort);
    Invoke.SetIPAddr(ServerName);
    Invoke.SetRoomID(roomid);
    Invoke.Start();
}
function startVIP(ServerTypeName,roomid,roomname,ServerName,ServerPort,VideoPort,AudioPort,RoomTypeName,RoomDescription,RoomMaxOnlineUser,RoomMaxMike,KTVPort,TransIP){
    if (!KTVPort) KTVPort="9999";
    Invoke.SetRegName(TgBase.Com.VisitFrom);
    Invoke.SetCommandType("35");
    Invoke.SetKTVPort(KTVPort);
    Invoke.SetServerType(ServerTypeName);
    Invoke.SetRoomTypeName(RoomTypeName);
    Invoke.SetRoomInfo(RoomDescription);
    Invoke.SetMaxUserAmount(RoomMaxOnlineUser);
    Invoke.SetMaxMikeAmount(RoomMaxMike);
    Invoke.SetChatName(roomname);
    Invoke.SetPort (ServerPort, VideoPort, AudioPort);
    Invoke.SetIPAddr(ServerName);
    Invoke.SetRoomID(roomid);
    Invoke.SetTransServerIP(TransIP);
    Invoke.Start();
}
function startVIP2(ServerTypeName,roomid,roomname,ServerName,ServerPort,VideoPort,AudioPort,RoomTypeName,RoomDescription,RoomMaxOnlineUser,RoomMaxMike,KTVPort,TransIP){
    if (!KTVPort) KTVPort="9999";
    Invoke.SetRegName(TgBase.Com.VisitFrom);
    Invoke.SetCommandType("36");
    Invoke.SetKTVPort(KTVPort);
    Invoke.SetServerType(ServerTypeName);
    Invoke.SetRoomTypeName(RoomTypeName);
    Invoke.SetRoomInfo(RoomDescription);
    Invoke.SetMaxUserAmount(RoomMaxOnlineUser);
    Invoke.SetMaxMikeAmount(RoomMaxMike);
    Invoke.SetChatName(roomname);
    Invoke.SetPort (ServerPort, VideoPort, AudioPort);
    Invoke.SetIPAddr(ServerName);
    Invoke.SetRoomID(roomid);
    Invoke.SetTransServerIP(TransIP);
    Invoke.Start();
}
function startGuest(ServerTypeName,roomid,roomname,ServerName,ServerPort,VideoPort,AudioPort,RoomTypeName,RoomDescription,RoomMaxOnlineUser,RoomMaxMike,KTVPort,TransIP){
    if (!KTVPort) KTVPort="9999";
    Invoke.SetRegName(TgBase.Com.VisitFrom);
    Invoke.SetCommandType("1098");
    Invoke.SetKTVPort(KTVPort);
    Invoke.SetServerType(ServerTypeName);
    Invoke.SetRoomTypeName(RoomTypeName);
    Invoke.SetRoomInfo(RoomDescription);
    Invoke.SetMaxUserAmount(RoomMaxOnlineUser);
    Invoke.SetMaxMikeAmount(RoomMaxMike);
    Invoke.SetChatName(roomname);
    Invoke.SetPort (ServerPort, VideoPort, AudioPort);
    Invoke.SetIPAddr(ServerName);
    Invoke.SetRoomID(roomid);
    Invoke.SetTransServerIP(TransIP);
    Invoke.Start();
}
function startGuest2(ServerTypeName,roomid,roomname,ServerName,ServerPort,VideoPort,AudioPort,RoomTypeName,RoomDescription,RoomMaxOnlineUser,RoomMaxMike,KTVPort,TransIP){
    if (!KTVPort) KTVPort="9999";
    Invoke.SetRegName(TgBase.Com.VisitFrom);
    Invoke.SetCommandType("1099");
    Invoke.SetKTVPort(KTVPort);
    Invoke.SetServerType(ServerTypeName);
    Invoke.SetRoomTypeName(RoomTypeName);
    Invoke.SetRoomInfo(RoomDescription);
    Invoke.SetMaxUserAmount(RoomMaxOnlineUser);
    Invoke.SetMaxMikeAmount(RoomMaxMike);
    Invoke.SetChatName(roomname);
    Invoke.SetPort (ServerPort, VideoPort, AudioPort);
    Invoke.SetIPAddr(ServerName);
    Invoke.SetRoomID(roomid);
    Invoke.SetTransServerIP(TransIP);
    Invoke.Start();
}  
//十人房进入
function startTenRoom(ServerTypeName,roomid,roomtype,roomname,KTVPort,ServerPort,VideoPort,AudioPort,ServerIP,TransIP,EnterRoomType)
{
	Invoke.SetRegName(TgBase.Com.VisitFrom);
	Invoke.SetCommandType("50");
	Invoke.SetServerType(ServerTypeName);
	Invoke.SetKTVPort(KTVPort);
	Invoke.SetChatName(roomname);
	Invoke.SetPort(ServerPort, VideoPort, AudioPort);
	Invoke.SetIPAddr(ServerIP);
	Invoke.SetRoomID(roomid);
	Invoke.SetRoomType(roomtype);
	Invoke.SetUserName("1");
	Invoke.SetUserPwd("1");
	Invoke.SetTransServerIP(TransIP);
//		Invoke.EnterRoomType(EnterRoomType);
	Invoke.Start();			
}
//十人房进入-管理
function startTenRoomAdmin(ServerTypeName,roomid,roomtype,roomname,KTVPort,ServerPort,VideoPort,AudioPort,ServerIP,TransIP,EnterRoomType)
{
	Invoke.SetRegName(TgBase.Com.VisitFrom);
	Invoke.SetCommandType("51");
	Invoke.SetServerType(ServerTypeName);
	Invoke.SetKTVPort(KTVPort);
	Invoke.SetChatName(roomname);
	Invoke.SetPort(ServerPort, VideoPort, AudioPort);
	Invoke.SetIPAddr(ServerIP);
	Invoke.SetRoomID(roomid);
	Invoke.SetRoomType(roomtype);
	Invoke.SetUserName("1");
	Invoke.SetUserPwd("1");
	Invoke.SetTransServerIP(TransIP);
//		Invoke.EnterRoomType(EnterRoomType);
	Invoke.Start();				
}

