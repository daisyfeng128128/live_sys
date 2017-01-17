var Main = {};
var SITE_DOMAIN = 'http://'+window.location.host+'/';//站点域名
var isIE = !!window.ActiveXObject;
var ie6=isIE&&!window.XMLHttpRequest;
var ie8=isIE&&!!document.documentMode;  
var ie7=isIE&&!ie6&&!ie8;
function $ID(id){
	return document.getElementById(id);
}
//对字符串增加函数,返回字符长度
String.prototype.len=function(){
	return this.replace(/[^\x00-\xff]/g,"rr").length;
};
//截取字符串
String.prototype.sub = function(n){
	var r = /[^\x00-\xff]/g;
	if(this.replace(r, "mm").length <= n){return this;}
	// n = n - 3; 
	var m = Math.floor(n/2);
	for(var i=m; i<this.length; i++){
		if(this.substr(0, i).replace(r, "mm").length>=n){
			return this.substr(0, i) ; 
		}
	}
	return this;
};
//去特殊符号等
function filter(content){
	content=$.trim(content);
	var con=content.replace(/([{}%\\])/g,"").replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&acute;').replace(/"/g, '&quot;').replace(/\\/g, '\\\\').replace(/\s{1,}/g," ");
	if(!IsURL(con)){con=con.replace(/(http:\/\/)?([wW]{3}\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/g,'*');}
	return con;
}
function formatLuckNum(n){
	if(+n){
		return '<span class="fluck">('+n+')</span>';
	}else{
		return '';
	}
}
function IsURL(str_url){
	var strRegex=/(http:\/\/)?([wW]{3}\.)?(5iu)+\.(org)/g
	var re=new RegExp(strRegex);
	if(re.test(str_url)){
		return true;
	}else{
		return false;
	}
}
//弹框,js分页，SWFObject,等等用到的js
document.write('<script src="/js/flibsv1.03.js"></script><link href="" type="text/css" rel="stylesheet" />');
Main.alert=function(msg,fun,mType,getTlvLog){
	var iframe=ie6?'<iframe style="position:absolute;top:0;left:0;z-index:-1;height:100%;width:100%;border:0;background-color:transparent"></iframe>':'';
	TINY.box.show('<div class="tinyAlert">'+iframe+'<div class="h">信息</div><div class="c">'+msg+'</div><div class="t"><button type="button" onclick="TINY.box.hide();">确定</button></div></div>',0,0,0,0,3);
	if(fun){$('.tinyAlert button').click(fun);}
	if(IS_QQ=="1"){
		$("#tinybox").css("top",(qzo_top+"px"));
	}
};
Main.confirm=function(title,msg,oktext,okCallback,notext,noCallback){
	var ttl=title||'信息',con=msg||'',okt=oktext||'确定',not=notext||'取消';
	var iframe=ie6?'<iframe style="position:absolute;top:0;left:0;z-index:-1;height:100%;width:100%;border:0;background-color:transparent"></iframe>':'';
	TINY.box.show('<div class="tinyAlert">'+iframe+'<div class="h">'+ttl+'</div><div class="c c2">'+con+'</div><div class="t"><button type="button" id="yesBtn">'+okt+'</button><button type="button" id="noBtn">'+not+'</button></div></div>',0,0,0,0,3);
	//$('.tinyAlert button').off();
	$('#yesBtn').on('click',function(){
		TINY.box.hide();
		if(okCallback){
			okCallback();
		}
		return false;
	});
	$('#noBtn').on('click',function(){
		TINY.box.hide();
		if(noCallback){
			noCallback();
		}
		return false;
	});
};
//get请求
Main.getDate = function(params, callback){
	$.ajax({
		type: "GET",
		url: SITE_DOMAIN + params.url,
		data: params.data,
		dataType: "json",
		timeout:120000,
		success: function(data, textStatus, jqXHR){
			callback(data, textStatus, jqXHR);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			//alert(params.url+" error code:"+textStatus);
		}
	});
};
//post请求
Main.postDate = function(params, callback){
	$.ajax({
		type: "POST",
		url: SITE_DOMAIN + params.url,
		data: params.data,
		dataType: "json",
		timeout:1200000,
		success: function(data, textStatus, jqXHR){
			if(data&&data.nologin){
				Main.alert('没有登录，请重新登录。');
			}else{
				callback(data, textStatus, jqXHR);
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			//alert(params.url+" error code:"+textStatus);
		}
	});
};
//向类Date增加函数
Date.prototype.format = function(format){
	var o = {
	"M+" : this.getMonth()+1, //month
	"d+" : this.getDate(),    //day
	"h+" : this.getHours(),   //hour
	"m+" : this.getMinutes(), //minute
	"s+" : this.getSeconds(), //second
	"q+" : Math.floor((this.getMonth()+3)/3),  //quarter
	"S" : this.getMilliseconds() //millisecond
	} ;
	if(/(y+)/.test(format)){
		format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(var k in o){
		if(new RegExp("("+ k +")").test(format)){
			format = format.replace(RegExp.$1,RegExp.$1.length==1?o[k]:("00"+ o[k]).substr((""+ o[k]).length));
		}
	}
	return format;
};
//alert(new Date().format("yyyy-MM-dd hh:mm:ss"));
function getTime(v1){//计算时间差 
	if(/\d{4}-\d{2}-\d{2}.*/.test(v1)){
		var t1=v1.split(" ");
		var tt1=t1[0].split("-");
		t1=tt1[1]+"/"+tt1[2]+"/"+tt1[0]+" "+t1[1];
		var addm=Math.ceil((Date.parse(new Date())-Date.parse(t1))/1000/60); 
		var d=Math.floor(addm/60/24); 
		var h=Math.floor((addm-d*60*24)/60) ;
		var m=addm-d*60*24-h*60 ;
		var ds=0==d?'':d+"天";
		var hs=0==h?'':h+"小时";
		var ms=0==m?'':m+"分钟前";
		return ds+hs+ms;
	}else{
		return v1;
	}
}
//我的信箱查询
var getMainNumItv=0;
Main.getUnReadMsg=function(cal){
	Main.getDate({url:'ajax/ucenter/mail_unreadNum.do.php'}, function(json){
		if(200==json.code){
			var nd=$('#mailTopbox'),p=nd.find('.fn4_middle p');
			if(0<json.body){
				p.eq(0).hide();p.eq(1).show().find('span.f_o').text(json.body);
				nd.find('.icon_dotte').css('visibility','visible');
			}else{
				p.eq(0).show();p.eq(1).hide();
				nd.find('.icon_dotte').css('visibility','hidden');
			}
			if(cal){cal(json.body)}
		}
	});
};
Main.getMainNum=function(cal){
	Main.getUnReadMsg(cal);
	clearInterval(getMainNumItv);
	//getMainNumItv=setInterval(function(){Main.getUnReadMsg(cal)},50000);
};
//查当前用户还有多少钱
Main.queryBalance=function(){
	Main.getDate({
		url: 'ajax/le/getBalance.php',
		data:{
			t:new Date().getTime()
		}
	}, function(json){
		if('succ'==json.error){
			$('#xmoney').html(json.gold_balance);
			$('#xbeans').html(json.bean_balance);
		}
	});
};
//房间页用户登录后绑定弹框等等
Main.Room_topUserInit=function(){
	$(".border_center input").live("focus",function(){
		$(this).css("color","#333").parent().parent().addClass("orange");
	}).live("blur",function(){
		$(this).css("color","#999").parent().parent().removeClass("orange");
	});
	/*topbar功能模块——登录前*/
	//监听登录按钮事件
	$("#top .btn_login").click(function(){
		var n=$("#top .login_layout");
		if(n.hasClass('hide')){
			$("#loginBoxTips").empty();
			$(this).css("background-position","-66px 0");
			n.removeClass("hide");
			$("#top .email").focus();
		}else{
			n.addClass("hide");
			$("#top .btn_login").css("background-position","0 0");
			$("#top .email").blur();
		}
	});
	var fnlayoutHide=function(){
		var o=$("#top .fn_layout");
		o.removeClass("orange").find(".fn_content").addClass("hide");
		if(ie6){
			o.find(".arrows").css("background-position","-6px -198px");
			o.find(".icon_nick").css("background-position","0 -226px");
			o.find(".icon_online").css("background-position","0 -258px");
			o.find(".icon_mail").css("background-position","7px -293px");
		}
		return false;
	};
	/*topbar功能模块——登录成功后*/
	$("#top .fn_layout").live("mouseenter",function(){
		$(this).addClass("orange").find(".fn_content").removeClass("hide");
		if(ie6){
			$(this).find(".arrows").css("background-position","-6px -166px");
			$(this).find(".icon_nick").css("background-position","-70px -226px");
			$(this).find(".icon_online").css("background-position","-70px -258px");
			$(this).find(".icon_mail").css("background-position","-63px -293px");
		}
	}).live("mouseleave",fnlayoutHide);
	$('#mailTopbox .icon_close').live('click',fnlayoutHide);
}

//房间页面顶部修改昵称
Main.Room_editNickName=function(){
	var editnickname = $.trim($("#editnickname").val());
	if(''==editnickname){return;}
	if(4>editnickname.len()){Main.alert('昵称太短了，最少4位');return;}
	var nickname=filter(editnickname.sub(20).toString());
	Main.getDate({
		url: 'ucenter.php?action=nickname&js=1',
		data: {
			nickname:(nickname)
		}
	}, function(data){
		if('200'!=data.errorCode){
			Main.alert(data.errorMessage);
		}else{
			window.location.reload();
		}
	});
	return false;
};
//取得用户的关注列表
Main.Room_getAddFavList=function(){
	if(site_live_skin!=undefined && site_live_skin=="2339" && roomtype=="small"){
		$.get("/ajax/le/getAddFavListUser.php?roomnumber="+currentRoomNumber,function(obj){
			if(obj.userfav==0){
				$('#addFav2').removeClass("btn-default").addClass("btn-warn").html("+ 关注");
			}else{
				$('#addFav2').removeClass("btn-warn").addClass("btn-default").html("已关注");
			}
			$('.follow-count').html(obj.favcount);
		},"json");
	}else if(site_live_skin!=undefined && site_live_skin=="kugou2015"){
		$.get("/ajax/le/getAddFavListUser.php?roomnumber="+currentRoomNumber,function(obj){
			if(obj.userfav==0){
				$('#addFav2').removeClass("btn-default").addClass("btn-warn").html("立即关注");
			}else{
				$('#addFav2').removeClass("btn-warn").addClass("btn-default").html("取消关注");
			}
			$('#followNum').html(obj.favcount);
		},"json");
	}else if(site_live_skin!=undefined && site_live_skin=="51tv"){
		$.get("/ajax/le/getAddFavListUser.php?roomnumber="+currentRoomNumber,function(obj){
			if(obj.userfav==0){
				$('#addFav2').removeClass("off").html("+ 关注");
			}else{
				$('#addFav2').addClass("off").html("取消关注");
			}
			$('.follow-count').html(obj.favcount);
		},"json");
	}else{
			Main.getDate({
				url: 'ajax/le/getAddFavList.php'
			}, function(data){
				var list='';
				$('.fn3_middle ul').empty();
				if(0==data.length){
					list='<li class="noFav">暂无关注</li>';		
				}
				for(var i=0;i<data.length;i++){
					list+='<li><span class="camstate camstate'+data[i].status+' icons"></span><em class="fl zlevel zlv'+data[i].starlevel+'" ></em><span class="uname"><a href="/'+data[i].usernumber+'.html" target="_blank">'+data[i].nickname+'</a></span></li>';
					if(currentRoomNumber==data[i].usernumber){
						$('#addFav2').attr('title','已关注');			
						$('#addFav2').css('background-position','-1px -67px').off();
					}
				}
				$('.fn3_middle ul').append(list);
				$('.fn3_middle ul').append('<li style="text-align:center; "><a href="/ucenter.php?ptype=history" target="_blank" style="color:#ff6c00; text-decoration:underline;">我的关注主播</a></li>');
			});
	}
}

Main.autoSetPageHeightQQ=function(){
	if(IS_QQ=="1"){
		fusion2.canvas.setHeight({
			height : ($("body").height()+100)
		});
	}
}
Main.init = function(){};