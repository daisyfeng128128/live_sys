//对字符串增加函数,返回字符长度
String.prototype.len=function(){
	return this.replace(/[^\x00-\xff]/g,"rr").length;
};
//去特殊符号等
function filter(content){
	content=$.trim(content);
	var con=content.replace(/([{}%\\])/g,"").replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&acute;').replace(/"/g, '&quot;').replace(/\\/g, '\\\\').replace(/\s{1,}/g," ");
	if(!IsURL(con)){con=con.replace(/(http:\/\/)?([wW]{3}\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/g,'*');}
	return con;
}
function fnCalledFromAs3( data )
{
	if(data=="getPage"){
		var url = window.location.toString();
		var id = url.split('#')[1];
		return id;
	}else if(data=="beginUpload"){//显示开始上传头像
		$("#info_alert .show_title").html("正在上传头像...");
		//$("#info_alert,#tinymasknoclick").show();
		ShowInfoNoClick("info_alert","tinymasknoclick");
	}
}
//显示弹框，onClick='ShowInfo('ShowInfo',this);'
function ShowInfoNoClick(id,bg){
	var obj = $("#"+id);
	obj.css("width",($("body").width()*0.8+"px"));
	
	obj.css("left",($("body").width()-obj.width())/2+"px");
	obj.css("top",($("body").height()-obj.height())/2+"px");
	obj.show();
	$("#"+bg).show();
	return false;
}
//修改头像之后，手机回调
function editAvatarOk(){
	$("#avatarimg").attr("src","/apis/avatar.php?uid="+userid+"&_t="+(new Date()).valueOf());
	closeShow();
	$("#info_alert,#tinymasknoclick").hide();
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
$(function(){
	//点击页面的任意位置时,将弹出的窗口隐藏,礼物选择等等地方
	$(document).on('mousedown',function(event) {
		var et=$(event.target);
		if(et.hasClass('toggleBox')||et.parents('.toggleBox')[0]){
			return;
		}else{
			closeShow();
		}
	});
	$(".ShowInfo .show_title_close").click(function(){
		closeShow();
	});
});
function closeShow(){
	$('.toggleBox').hide();
	$('#tinymask').hide()
}
function alertDiv(c){
	$("#alert_page_content").html(c);
	$("#linkalert_page").click();
}
//显示弹框，onClick='ShowInfo('ShowInfo',this);'
function ShowInfo(id,e){
	var e = arguments.callee.caller.arguments[0] || window.event;
	window.event?e.returnValue = false:e.preventDefault();
	window.event?e.cancelBubble:e.stopPropagation();
	var obj = $("#"+id);
	obj.css("width",($("body").width()*0.8+"px"));
	
	obj.css("left",($("body").width()-obj.width())/2+"px");
	obj.css("top",($("body").height()-obj.height())/2+"px");
	obj.show();
	$("#tinymask").show();
	return false;
}
//修改昵称
function editNickName(){
	var editnickname_tmp = $.trim($("#editnickname").val());
	if(''==editnickname_tmp){return;}
	if(4>editnickname_tmp.len()){alertDiv('昵称太短了，最少4位');return;}
	var nickname=(editnickname_tmp);
	$.post('/ucenter.php?action=nickname&js=1',{nickname:(nickname)},function(data){
		if('200'==data.errorCode){
			window.location.href="ucenter_edit.php";
			$("#show_nickname").html(nickname);
		}else{
			alertDiv(data.errorMessage);
		}
	},'json');
	return false;
}
//修改性别
function edit_gender(v,t){
	$.get('ucenter_edit.php?action=edit_gender&v='+v,function(data){
		if('200'==data.errorCode){
			closeShow()
			$("#show_gender").html(t);
		}else{
			alertDiv(data.errorMessage);
		}
	},'json');
	return false;
}
//城市
function edit_city(){
	$.get('ucenter_edit.php?action=edit_ctiy&province='+$("#province").val()+'&city='+$("#city").val(),function(data){
		if('200'==data.errorCode){
			$("#show_city").html($("#province").val()+","+$("#city").val());
			closeShow()
		}else{
			alertDiv(data.errorMessage);
		}
	},'json');
	
	
	return false;
}
//出生日期
function edit_birthday(){
	$.get('ucenter_edit.php?action=edit_birthday&year='+$("#year").val()+'&month='+$("#month").val()+'&day='+$("#day").val(),function(data){
		if('200'==data.errorCode){
			$("#show_birthday").html($("#year").val()+"-"+$("#month").val()+"-"+$("#day").val());
			closeShow()
		}else{
			alertDiv(data.errorMessage);
		}
	},'json');
	return false;
}
function birthday_selected(year,month,day){
	var count=$("#year option").length;
	for(var i=0;i<count;i++){
		if($("#year").get(0).options[i].text == year)  
		{  
			$("#year").get(0).options[i].selected = true;  
			break;
		}  
	} 
	var count=$("#month option").length;
	for(var i=0;i<count;i++){
		if($("#month").get(0).options[i].text == month)  
		{  
			$("#month").get(0).options[i].selected = true;  
			break;
		}  
	}
	var count=$("#day option").length;
	for(var i=0;i<count;i++){
		if($("#day").get(0).options[i].text == day)  
		{  
			$("#day").get(0).options[i].selected = true;  
			break;
		}  
	}
}
