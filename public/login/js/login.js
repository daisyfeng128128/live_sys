var tLoginContent='<div class="bgmask" style="display: none; height: 100%; z-index: 20002;"></div>\
<div class="login-box-global-css" id="loginbox" style="display:none">\
	<div class="box_head">\
		<div style="position:relative"><div class="box_close icons Stat 2_3" onclick="login.close()"></div></div>\
		<ul class="loginswitch">\
		<li id="tab_login" class="regsw"><a href="javascript:void(0)" onclick="selectTagLoginBox(\'tab_login\');changeVaildcodeLogin();" id="loginboxLoginbtn">登录</a></li>\
			<li class="" id="tab_reg"><a href="javascript:void(0)"  onclick="selectTagLoginBox(\'tab_reg\');changeVaildcode();" id="loginboxRegbtn">注册</a></li>\
		</ul>\
	</div>\
	<div class="clear"></div>\
	<div class="rlbox" id="tab_reg_content" style="display: none;">\
		<div class="regbox">\
			<form id="registerForm" method="get" onsubmit="return false;">\
				<div class="regmail">\
					<div class="border_center topb">\
						<input type="text" id="reg_email" style = "margin-top:0" placeholder="帐号(邮箱号)" class="input210">\
					</div>\
					<div class="border_right topb"></div><div class="oktip"></div>\
					<div id="mailinputTip" class="regdes" style="display: none;">用于登录</div>\
					<div class="error" style="display: none;"></div>\
				</div>\
				<div class="regnic">\
					<div class="border_center topb">\
						<input type="text" id="reg_nickname" placeholder="昵称" class="input210 f_g">\
					</div>	\
					<div class="border_right topb"></div>\
					<div class="oktip"></div>\
					<div class="error" style="display: none;"></div>\
				</div>\
				<div class="regpw">\
					<div class="border_center topb">				\
						<input type="password" id="reg_password"  placeholder="创建密码" class="input210">\
					</div>	\
					<div class="border_right topb"></div><div class="oktip"></div>	\
					<div id="pwinputTip" class="regdes" style="display: none;">6-30位字符，区分大小写</div>\
					<span class="pwbar"></span>\
					<div class="error" style="display: none;"></div>\
					<div class="pwbar"></div>\
				</div>\
				<div class="regpw2">\
					<div class="border_center topb">	\
						<input type="password" id="reg_repassword"  placeholder="确认密码" class="input210">\
					</div>	\
					<div class="border_right topb"></div><div class="oktip"></div>\
					<div id="pwinput2Tip" class="regdes" style="display: none;">请再次输入密码 </div>\
					<div class="error" style="display: none;"></div>\
				</div>\
				<div class="regcode">\
					<div class="border_center topb">	\
						<input type="text" id="reg_vaildcode"  placeholder="验&nbsp;证&nbsp;码" class="input100">\
						<div class="checkCode"></div>\
					</div>\
					<div class="border_right topb"></div>\
					<img title="点击图片切换验证码" class="yzmimg yzmimg_reg" onclick="changeVaildcode()">\
					<div class="oktip"></div>\
					<div class="regdes"  onclick="changeVaildcode()">刷新</div>\
					<div class="error" style="display: none;"></div>\
				</div>\
				<p class="agree_p">\
					<label class="agree">\
						<input type="checkbox" checked="true" id="agreement" class="icon_checked fl v-middle">\
						我已阅读并同意\
						<a target="_blank" href="/news/4.html">网站使用协议</a>\
					</label>\
				</p>\
				<button class="Stat 2_1 regbtn" id="regsub" type="button">立即注册</button>\
			</form>\
			<div class="other_login_area">\
				<span class="other_log_qq">\
					<a href="javascript:login.qqlogin()"></a>\
				</span>\
				<span class="other_log_sina">\
					<a href="javascript:login.wxlogin()" class="Stat 2_2"></a>\
				</span>\
			</div>\
		</div>\
		<div></div>\
	</div>\
	<div class="rlbox" id="tab_login_content" style="display: block;">\
		<div class="regbox logbox">\
			<form id="login_form2" onsubmit="return false;">\
				<div class="regmail lip">\
					<div class="border_center topb">\
						<input type="text" id="tcuser" placeholder="帐号(邮箱号)" class="input210" style="color: rgb(153, 153, 153);margin-top:0">\
					</div>\
					<div class="border_right topb"></div><div class="oktip"></div>\
					<div style="display:none;" class="regdes">请输入正确的帐号地址</div>\
					<div class="error" style="display: none;"></div>\
				</div>\
				<div class="regpw lip">\
					<div class="border_center topb">	\
						<input type="password" placeholder="密码" id="tcpass" class="input210">\
					</div>\
					<div class="border_right topb"></div><div class="oktip"></div>	\
					<div class="regdes" style="display: none;">6-30位字符，区分大小写</div>\
					<div class="error" style="display: none;"></div>\
					<div class="pwbar"></div>\
				</div>\
				<div class="log_yzm lip">\
					<div class="border_center topb">\
						<input type="text" id="login_vaildcode" placeholder="验证码"  class="input100">\
					</div>\
					<div class="border_right topb"></div>\
					<img class="yzmimg yzmimg_login" style="width: 65px;" alt="点击图片切换验证码" onclick="changeVaildcodeLogin()">\
					<div class="oktip"></div>	\
					<div class="regdes"  onclick="changeVaildcodeLogin()">刷新</div>\
					<div class="error" style="display: none;"></div>\
					<div class="pwbar"></div>\
				</div>\
				<p class="agree_p">\
					<label class="agree">\
						<input type="checkbox" id="tcremember" class="icon_checked fl v-middl" checked="true">\
						下次自动登录\
						<a target="_blank" href="javascript:;">忘记密码</a>\
					</label>\
				</p> \
				<button id="loginsub" class="tcloginbtn" type="submit">登 录</button>\
			</form>\
			<div class="other_login_area">\
				<span class="other_log_qq">\
					<a href="javascript:login.qqlogin()"></a>\
				</span>\
				<span class="other_log_sina">\
					<a href="javascript:login.wxlogin()" class="Stat 2_2"></a>\
				</span>\
			</div>\
		</div>\
	</div>\
</div>';
document.write('<link href="/public/login/css/login.css?20150413" type="text/css" rel="stylesheet" />');
document.write(tLoginContent);
function changeVaildcode(){
	$(".yzmimg_reg").attr('src','/libs/extend/verify/captcha.php?_t='+getTimestamp());
}
function changeVaildcodeLogin(){
	$(".yzmimg_login").attr('src','/libs/extend/verify/captcha.php?loginCode=login&t='+getTimestamp());
}
function _login(){
	this.loginForm=document.getElementById('loginbox');
}
_login.prototype={
	loginForm:null,
	setPosition: function() {
		var top = parseInt(document.documentElement.scrollTop || document.body.scrollTop);
		//$("#loginbox").css("left",((($(window).width())/2-(parseInt(521) /2)))+"px").css("top",(($(window).height())/2-(parseInt(400)/2))+top+"px");
    },
	show:function(){
		//login.thirdlogin();return;
		$(".bgmask").show();
		$("#loginbox").show();
		this.setPosition();
		selectTagLoginBox('tab_login');
		this.loginForm.style.display="block";
		changeVaildcodeLogin();
	},
	reg:function(){
		//login.thirdreg();return
		$(".bgmask").show();
		$("#loginbox").show();
		this.setPosition();
		selectTagLoginBox('tab_reg');
		this.loginForm.style.display="block";
		changeVaildcode();
	},
	close:function(){
        $(".bgmask").hide();
		$("#loginbox").hide();
		//this.loginForm.style.display="none";
	},
    qqlogin:function(){
        this.close();
        var w=500;
        var h=400;
　　  	window.open('/app/view/login/qq/index.php','snslogin','top='+(window.screen.height-h)/2+',left='+(window.screen.width-w)/2+',width='+w+',height='+h);
    },
    wxlogin:function(){
        this.close();
        var w=580;
        var h=580;
        var redirect_uri="http%3a%2f%2fwww.kedo.tv%2fopensns%2fweixin%2findex.php";
        window.open('https://open.weixin.qq.com/connect/qrconnect?appid=wxedb924ffe29990ab&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect','snslogin','top='+(window.screen.height-h)/2+',left='+(window.screen.width-w)/2+',width='+w+',height='+h);
    },
	thirdlogin:function(){
		this.close();
		var w=500;
		var h=400;
　　	window.open('/app/view/login/third/index.php?action=login','snslogin','top='+(window.screen.height-h)/2+',left='+(window.screen.width-w)/2+',width='+w+',height='+h);
	},
	thirdreg:function(){
		this.close();
		var w=500;
		var h=400;
　　	window.open('/app/view/login/third/index.php?action=reg','snslogin','top='+(window.screen.height-h)/2+',left='+(window.screen.width-w)/2+',width='+w+',height='+h);
	},
	sinalogin:function(){
		this.close();
		var w=500;
		var h=400;
　　	window.open('/app/view/login/sina/index.php','snslogin','top='+(window.screen.height-h)/2+',left='+(window.screen.width-w)/2+',width='+w+',height='+h);
	},
	initTopIndexHtml:function(obj){
		//商城，充值页面窗口左上角还有多少钱
		$('#xmoney').html(obj.balance);
		$('#xpoint').html(obj.point);
        //initLoginInfoHead(obj);
        window.location.reload();
		return;
	}
};
var login=new _login();
$(function(){
	$(window).resize(function() {
	  login.setPosition();
	});
    $(".log,.login_im").click(function(){
        changeVaildcodeLogin();
        login.show();
        return false;
    })
    $(".reg,.register").click(function(){
        changeVaildcode();
        login.reg();
    })
    $(".search").on("click",function(){
        var wr=$('#searchText').val();
        if(!!wr){
            window.open("/"+wr,"_self");
        }
    });

    $('#searchText').on('keyup', function(event) {
        if (event.keyCode == "13") {
            var wr=$('#searchText').val();
            if(!!wr){
                window.open("/"+wr,"_self");
            }
        }
    });

    $("#loginbox").on("focus","input[type='text']",function(){
        $(this).css("border","1px solid #3b62db");
    }).on("blur","input[type='text']",function(){
        $(this).css("border","1px solid #ccc");
    });
	$(".tcloginbtn").click(function(){
		if($("#tcuser").val()==''){
			$("#login_form2 .regmail .oktip").hide();
			$("#login_form2 .regmail .error").html('请输入帐号(邮箱号)').show();
            $("#tcuser").css("border-color","#D33A34");
		}
		else if($("#tcpass").val()==''){
			$("#login_form2 .regpw .oktip").hide();
			$("#login_form2 .regpw .error").html('请输入密码').show();
            $("#tcpass").css("border-color","#D33A34");
		}
		else if($("#login_vaildcode").val()==''){
			$("#login_form2 .log_yzm .oktip").hide();
			$("#login_form2 .log_yzm .error").html('请输入验证码').show();
            $("#login_vaildcode").css("border-color","#D33A34");
		}
		else{
			$.post('/app/view/login/kedo/login.php',{username:$("#tcuser").val(),'password':$("#tcpass").val(),'login_vaildcode':$("#login_vaildcode").val(),'remember':$("#tcremember").attr('checked')},function(r){
				if(r.r==100){
					$("#login_form2 .regmail .error").html(r.field).show();
				}else if(r.r==101){
					$("#login_form2 .log_yzm .error").html('验证码校验失败').show();
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
		$.post('/app/view/login/kedo/register.php',{action:"reg",email:$("#reg_email").val(),password:$("#reg_password").val(),repassword:$("#reg_repassword").val(),nickname:$("#reg_nickname").val(),vaildcode:$("#reg_vaildcode").val()},function(r){
			if(r.r=='yes'){
				self.location=self.location+"?isshowku=1";
			}
			else if(r.r==101){
				// alert(r.r);
				$(".border_center .checkCode").html("验证码有误").show();
			}
		},'json');
	});
	$("#reg_email").blur(function(){
		if($("#reg_email").val()!=""){
			$.post("/register.php",{action:'regcheck',field:'usernmae',value:$("#reg_email").val()},function(r){
				if(r.r=='yes'){
					//$("#registerForm .regmail .oktip").show();
					$("#registerForm .regmail .error").html('').hide();
				}
				else{
					$("#registerForm .regmail .oktip").hide();
					$("#registerForm .regmail .error").html(r.r).show();
				}
			},'json');
		}
		else{
			$("#registerForm .regmail .oktip").hide();
			$("#registerForm .regmail .error").html('请填写帐号').show();
		}
	});
	$("#reg_nickname").blur(function(){
		if($("#reg_nickname").val()!=""){
			$.post("/register.php",{action:'regcheck',field:'nickname',value:$("#reg_nickname").val()},function(r){
				if(r.r=='yes'){
					$("#registerForm .regnic .error").html('').hide();
				}
				else{
					$("#registerForm .regnic .oktip").hide();
					$("#registerForm .regnic .error").html(r.r).show();
				}
			},'json');
		}
		else{
			$("#registerForm .regnic .oktip").hide();
			$("#registerForm .regnic .error").html('不允许含有’,",-,|,空格,').show();
		}
	});
	$("#reg_password").blur(function(){
		if($("#reg_password").val()!=""){
			if($("#reg_password").val().length<6){
				$("#registerForm .regpw .oktip").hide();
				$("#registerForm .regpw .error").html('密码长度至少为6位').show();
			}
			else{
				//$("#registerForm .regpw .oktip").show();
				$("#registerForm .regpw .error").html('').hide();
			}
		}
		else{
			$("#registerForm .regpw .oktip").hide();
			$("#registerForm .regpw .error").html('请填写密码').show();
		}
	});
	$("#reg_repassword").blur(function(){
		if($("#reg_password").val()!=""){
			if($("#reg_password").val()!=$("#reg_repassword").val()){
				$("#registerForm .regpw2 .oktip").hide();
				$("#registerForm .regpw2 .error").html('2次输入的密码不一致').show();
			}
			else{
			//	$("#registerForm .regpw2 .oktip").show();
				$("#registerForm .regpw2 .error").html('').hide();
			}
		}
		else{
			$("#registerForm .regpw2 .oktip").hide();
			$("#registerForm .regpw2 .error").html('密码需要填写2次').show();
		}
	});
	//点击背景层关闭登录框
	$("div.bgmask").click(function(){
		login.close();
	})



    var headerHover={
        usercard:function(){
            $(".hd_hov").hover(function(){
                $(".honor").show();
                $("#expand").removeClass("expand");
                $("#expand").addClass("expand_hov");
            },function(){
                setTimeout(function(){
                    var divThis = $(".honor");
                    if (!divThis.hasClass('hov'))
                    {
                        divThis.hide();

                        $("#expand").removeClass("expand_hov");
                        $("#expand").addClass("expand");
                    }
                }, 200);
            });
            $(".honor").mousemove(function () {
                $(".honor").addClass("hov");
            }).mouseleave(function(){
                $(".honor").removeClass("hov").hide();

            });
        }
    }
   // headerHover.usercard();
});
function refreshLoginSNS(){
	try{
		Live.ChatReLogin();
	}
	catch(e){}
	refreshIndexLogin();
}
function refreshIndexLogin(){
	/*if(site_skin=="2339"){
		initLoginInfoHead();
	}*/
	$.get('/login.php?action=get',function(obj){
		if(obj.result=='false'){
            login.initTopIndexHtml(obj);
			return;
		}
        try{
            Live.user_role=2;
        }
        catch(e){}
            currentUserNickname=obj.nickname;
            currentUserID=obj.userid;
            currentUserNumber=obj.usernumber;
            login.initTopIndexHtml(obj);
	},'json');
}
//登录注册标签切换
function selectTagLoginBox(showContent){
	$("#tab_login").removeClass('regsw');
	$("#tab_reg").removeClass('regsw');
	$("#tab_login_content").hide();
	$("#tab_reg_content").hide();
	$("#"+showContent+"_content").show();
	$("#"+showContent).addClass('regsw');
}
//个人中心标签切换
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
//返回时间戳
function getTimestamp(){
	return Math.round(new Date().getTime()/1000);
}
$(".header-notice").on("mouseover",function(){
    $(".notice-list").show();
})