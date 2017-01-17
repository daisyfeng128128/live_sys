document.write('<link href="/css/login.css" type="text/css" rel="stylesheet" />');
document.write('<div class="loginbox" id="loginbox" style="display:none">');
document.write('<div class="loginmain">');
document.write('<ul id="loginboxtags">');
document.write('<li class="loginboxselectTag"><a href="javascript:void(0)" onclick="selectTag(\'loginboxtagContent0\',this,\'loginbox\')" id="loginboxLoginbtn">登录</a></li>');
document.write('<li><a href="javascript:void(0)"  onclick="selectTag(\'loginboxtagContent1\',this,\'loginbox\');changeVaildcode();" id="loginboxRegbtn">免费注册</a></li></ul>');
document.write('<div class="loginclose" onclick="login.close()"></div>');
document.write('<div id="loginboxtagContent">');
document.write('<div class="loginboxtagContent0 loginboxselectTag" id="loginboxtagContent0">');
document.write('<div class=" logininput">');
document.write('<span class="error" id="loginerror"></span>');
document.write('<form method="get" onsubmit="return false;">');
document.write('<ul>');
document.write('<li><em class="logintxt">邮&nbsp;&nbsp;箱</em> <input type="text" id="tcuser" class="loginput"/><em class="logininputtxt wjmmlogin"><input id="tcremember" type="checkbox" class="remember"/>记住我</em></li>');
document.write('<li><em class="logintxt">密&nbsp;&nbsp;码</em> <input type="password" id="tcpass"  class="loginput"/><em class="wjmmlogin"><a href="/html/findpassword.html" target="_blank">忘记密码？</a></em></li>');
document.write('<li><input type="submit" class="tcloginbtn" value=""/></li>');
document.write('</ul>');
document.write('</form>');
document.write('</div>');
document.write('<div class="loginboxqqlogin"><a href="javascript:login.qqlogin()"><img src="/images/qqdl.png" class="loginboxqqloginimg"/></a><a href="javascript:login.sinalogin()"><img src="/images/sinadl.gif" class="loginboxqqloginimg"/></a></div>');
document.write('</div>');
document.write('<div class="loginboxtagContent" id="loginboxtagContent1">');
document.write('<div class=" logininput_1" id="regbox">');
document.write('<span class="error_1" id="regerror"></span>');
document.write('<ul>');
document.write('<form method="get" onsubmit="return false">');
document.write('<li><em class="logintxt_1">电子邮箱</em><em class="dot">*</em><input id="reg_email" type="text" class="loginput_1" value=""/><em class="" id="emailresult"></em></li>');
document.write('<li><em class="logintxt_1">昵称</em><em class="dot">*</em><input id="reg_nickname" type="text"  class="loginput_1"/><em class="" id="nicknameresult"></em></li>');
document.write('<li><em class="logintxt_1">密码</em><em class="dot">*</em><input id="reg_password" type="password"  class="loginput_1"/><em class="" id="passwordresult"></em></li>');
document.write('<li><em class="logintxt_1">确认密码</em><em class="dot">*</em><input id="reg_repassword" type="password"  class="loginput_1"/><em class="" id="repasswordresult"></em></li>');
document.write('<li><em class="logintxt_1">验证码</em><em class="dot">*</em><input id="reg_vaildcode" type="text"  class="loginputyz"/><img width="89" height="30" class="yzmimg" src=""><em class="yzmtxt"><a href="javascript:changeVaildcode()">换一张！</a></em></li>');
document.write('<li><input type="submit" class="tctjbtn regbtn" value="" /><a href="javascript:login.qqlogin()"><img src="/images/qqdl.png" class="loginboxqqloginimg_1"/></a><a href="javascript:login.sinalogin()"><img src="/images/sinadl.gif" class="loginboxqqloginimg_1"/></a></li>');
document.write('</form>');
document.write('</ul>');
document.write('</div>');
<!--document.write('<div class="loginboxqqlogin"><a href="javascript:login.qqlogin()"><img src="/images/qqdl.gif" class="loginboxqqloginimg_1"/></a><a href="javascript:login.sinalogin()"><img src="/images/sinadl.gif" class="loginboxqqloginimg_1"/></a></div>');-->
document.write('</div>');
document.write('</div>');
document.write('</div>');
document.write('</div>');
function changeVaildcode(){
	$(".yzmimg").attr('src','/tools/captcha.php?_t='+Math.round(new Date().getTime()/1000));
}
function _login(){
	this.loginForm=document.getElementById('loginbox');
}
_login.prototype={
	loginForm:null,
	setPosition: function() {
        //var st = document.documentElement.scrollTop || document.body.scrollTop;
        //this.loginForm.style.left = ((document.documentElement.offsetWidth - 700) / 2) + 'px';
        //this.loginForm.style.top = (document.documentElement.clientHeight - 460) / 2 + st + 'px';
		$("#loginbox").css("left",((($(window).width())/2-(parseInt(618) /2))+parseInt(document.documentElement.scrollTop))+"px").css("top",(($(window).height())/2-(parseInt(332)/2))+"px");
    },
	show:function(){
		this.setPosition();
		selectTag('loginboxtagContent0',document.getElementById("loginboxLoginbtn"),'loginbox');
		this.loginForm.style.display="block";
	},
	reg:function(){
		this.setPosition();
		selectTag('loginboxtagContent1',document.getElementById("loginboxRegbtn"),'loginbox');
		this.loginForm.style.display="block";
		changeVaildcode();
	},
	close:function(){
		this.loginForm.style.display="none";
	},
	qqlogin:function(){
		this.close();
		var w=500;
		var h=400;
　　	window.open('/opensns/qq/index.php','snslogin','top='+(window.screen.height-h)/2+',left='+(window.screen.width-w)/2+',width='+w+',height='+h);
	},
	sinalogin:function(){
		this.close();
		var w=500;
		var h=400;
　　	window.open('/opensns/sina/index.php','snslogin','top='+(window.screen.height-h)/2+',left='+(window.screen.width-w)/2+',width='+w+',height='+h);
	}
};
var login=new _login();
$(function(){
	$(window).resize(function() {
	  login.setPosition();
	});
	$(".tcloginbtn").click(function(){
		if($("#tcuser").val()==''){
			alert('请输入邮箱');
		}
		else if($("#tcpass").val()==''){
			alert('请输入密码');
		}
		else{
			$.post('/login.php',{username:$("#tcuser").val(),'password':$("#tcpass").val(),'remember':$("#tcremember").attr('checked')},function(r){
				if(r.r=='no'){
					alert('登陆失败，请检查邮箱和密码');
				}
				else{
					try{
						Live.ChatReLogin();
					}
					catch(e){}
					refreshIndexLogin();
					login.close();
				}
			},'json');
		}
	});
	$(".regbtn").click(function(){
		$("#regerror").html("");
		$("#nicknameresult").attr('class','');
		$("#emailresult").attr('class','');
		$("#passwordresult").attr('class','');
		$("#repasswordresult").attr('class','');
		$.post('/register.php',{action:"reg",email:$("#reg_email").val(),password:$("#reg_password").val(),repassword:$("#reg_repassword").val(),nickname:$("#reg_nickname").val(),vaildcode:$("#reg_vaildcode").val()},function(r){
			if(r.r=='yes'){
				self.location="http://www.huofeng.com";
			}
			else{
				$("#regerror").html(r.r);
				$("#"+r.field+"result").attr('class','loginwrong');
			}
		},'json');
	});
	$("#reg_email").blur(function(){
		if($("#reg_email").val()!=""){
			$.post("/register.php",{action:'regcheck',field:'email',value:$("#reg_email").val()},function(r){
				if(r.r=='yes'){
					$("#emailresult").attr('class','loginright');
					$("#regerror").html('');
				}
				else{
					$("#emailresult").attr('class','loginwrong');
					$("#regerror").html(r.r);
				}
			},'json');
		}
		else{
			$("#emailresult").attr('class','loginwrong');
			$("#regerror").html('请填写邮件');
		}
	});
	$("#reg_nickname").blur(function(){
		if($("#reg_nickname").val()!=""){
			$.post("/register.php",{action:'regcheck',field:'nickname',value:$("#reg_nickname").val()},function(r){
				if(r.r=='yes'){
					$("#nicknameresult").attr('class','loginright');
					$("#regerror").html('');
				}
				else{
					$("#nicknameresult").attr('class','loginwrong');
					$("#regerror").html(r.r);
				}
			},'json');
		}
		else{
			$("#nicknameresult").attr('class','loginwrong');
			$("#regerror").html('请填写昵称且昵称不允许含有’,",-,|,空格,');
		}
	});
	$("#reg_password").blur(function(){
		if($("#reg_password").val()!=""){
			if($("#reg_password").val().length<6){
				$("#passwordresult").attr('class','loginwrong');
				$("#regerror").html('密码长度至少为6位');
			}
			else{
				$("#passwordresult").attr('class','loginright');
				$("#regerror").html('');
			}
		}
		else{
			$("#passwordresult").attr('class','loginwrong');
			$("#regerror").html('请填写密码');
		}
	});
	$("#reg_repassword").blur(function(){
		if($("#reg_password").val()!=""){
			if($("#reg_password").val()!=$("#reg_repassword").val()){
				$("#repasswordresult").attr('class','loginwrong');
				$("#regerror").html('2次输入的密码不一致');
			}
			else{
				$("#repasswordresult").attr('class','loginright');
				$("#regerror").html('');
			}
		}
		else{
			$("#repasswordresult").attr('class','loginwrong');
			$("#regerror").html('密码需要填写2次');
		}
	});
});
function refreshLoginSNS(){
	self.location='http://www.huofeng.com';
}
function refreshIndexLogin(){
	self.location='http://www.huofeng.com';
}
// JavaScript Document
function selectTag(showContent,selfObj,prefix){
	if(prefix==undefined){
		prefix="";
	}
	// 操作标签
	var tag = document.getElementById(prefix+"tags").getElementsByTagName("li");
	var taglength = tag.length;
	for(i=0; i<taglength; i++){
		tag[i].className = "";
	}
	selfObj.parentNode.className = prefix+"selectTag";
	// 操作内容
	for(i=0; j=document.getElementById(prefix+"tagContent"+i); i++){
		j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
	
}
function islogin(){
	try{
		if(!currentUserNumber){
			login.show();
			return false;
		}
	}
	catch(err){
		login.show();
		return false;
	}
	return true;
}
function toSelfShow(){
	if(!islogin()){
		login.show();
		return;
	}
	self.location="/"+currentUserNumber+".html"
}
