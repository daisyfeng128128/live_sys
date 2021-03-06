define(function(require, exports, module) {
	require('jquery');
	var Tools = require('./anchor-tools');
	module.exports = {
		init : function() {
			// \u767B\u9646
			$(".nl-nologin .login-left").click(function() {
				$(".circle-n .login-cents").click();
			});
			// \u6CE8\u518C
			$(".nl-nologin .regis-left").click(function() {
				$(".circle-n .regis-cents").click();
			});
			$(".circle-n .login-cents").click(function() {
				$(".login-html").html(baseHtml);
				$(".bgmask").show();
				$("#loginbox").show();
				var top = parseInt(document.documentElement.scrollTop || document.body.scrollTop);
				$(".yzmimg_login").attr('src','/tools/captcha.php?_t='+new Date().toString());
				$("#tab_login").removeClass('regsw');
				$("#tab_reg").removeClass('regsw');
				$("#tab_login_content").hide();
				$("#tab_reg_content").hide();
				$("#tab_login_content").show();
				$("#tab_login").addClass('regsw');
				$("#loginbox").draggable();
			});
			$(".circle-n .regis-cents").click(function() {
				$(".login-html").html(baseHtml);
				$(".bgmask").show();
				$("#loginbox").show();
				var top = parseInt(document.documentElement.scrollTop || document.body.scrollTop);
				$(".yzmimg_login").attr('src','/tools/captcha.php?_t='+new Date().toString());
				$("#tab_login").removeClass('regsw');
				$("#tab_reg").removeClass('regsw');
				$("#tab_login_content").hide();
				$("#tab_reg_content").hide();
				$("#tab_reg_content").show();
				$("#tab_reg").addClass('regsw');
				$("#loginbox").draggable();
			});
			//\u5173\u95ED\u767B\u5F55\u6846
			$(".login-html").on("click",'#loginbox .box_close',function(e){
                $(".bgmask").hide();
                $("#loginbox").hide();
            });
			//\u9A8C\u8BC1\u7801
			$(".login-html").on("click",".yzmimg_reg,.re1",function(){
				$(".yzmimg_reg").attr('src','/tools/captcha.php?_t='+new Date().toString());
			});
			$(".login-html").on("click",'.yzmimg_login,.re2',function(e){
				$(".yzmimg_login").attr('src','/tools/captcha.php?_t='+new Date().toString());
            });
			//\u767B\u9646tab
			$(".login-html").on("click",'.loginswitch #loginboxLoginbtn',function(e){
				$("#tab_reg").removeClass('regsw');
				$("#tab_login_content").hide();
				$("#tab_reg_content").hide();
				$("#tab_login_content").show();
				$("#tab_login").addClass('regsw');
				$(".yzmimg_login").attr('src','/tools/captcha.php?_t='+new Date().toString());
            });
			//\u6CE8\u518Ctab
			$(".login-html").on("click",'.loginswitch #loginboxRegbtn',function(e){
				$("#tab_login").removeClass('regsw');
				$("#tab_login_content").hide();
				$("#tab_reg_content").hide();
				$("#tab_reg_content").show();
				$("#tab_reg").addClass('regsw');
				$(".yzmimg_reg").attr('src','/tools/captcha.php?_t='+new Date().toString());
            });
			//\u767B\u9646
			$(".login-html").on("click",".tcloginbtn",function(){
				if($("#tcuser").val()==''){
					$("#login_form2 .regmail .oktip").hide();
					$("#login_form2 .regmail .error").html('\u8BF7\u8F93\u5165\u5E10\u53F7/\u9753\u53F7').show();
		            $("#tcuser").css("border-color","#D33A34");
				}else if($("#tcpass").val()==''){
					$("#login_form2 .regpw .oktip").hide();
					$("#login_form2 .regpw .error").html('\u8BF7\u8F93\u5165\u5BC6\u7801').show();
		            $("#tcpass").css("border-color","#D33A34");
				}else if($("#login_vaildcode").val()==''){
					$("#login_form2 .log_yzm .oktip").hide();
					$("#login_form2 .log_yzm .error").html('\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801').show();
                    $("#login_vaildcode").css("border-color","#D33A34");
				}else{
					$.post('/login.php',{username:$("#tcuser").val(),'password':$("#tcpass").val(),'login_vaildcode':$("#login_vaildcode").val(),'remember':$("#tcremember").attr('checked')},function(data){
						if(data.r=='no'){
							Tools.dialog(data.field);
						}else{
							$.get("/login.php?action=get",function(data){
								if(data.result == "true"){
									window.location.reload();
								}else{Tools.dialog("\u7528\u6237\u540D\u5BC6\u7801\u9519\u8BEF!");}
							},"json");
						}
					},'json');
				}
			});
			//\u6CE8\u518C
			$(".login-html").on("click",".regbtn",function(){
				$.post('/register.php',{action:"reg",email:$("#reg_email").val(),password:$("#reg_password").val(),repassword:$("#reg_repassword").val(),nickname:$("#reg_nickname").val(),vaildcode:$("#reg_vaildcode").val()},function(data){
					if(data.r=='yes'){
						self.location=self.location+"?isshowku=1";
					}else{
						Tools.dialog(data.r);
					}
				},'json');
			});
            $(".login-html").on("focus","input[type='text']",function(){
                $(this).css("border","1px solid #4CCC21");
            }).on("blur","input[type='text']",function(){
                $(this).css("border","1px solid #ccc");
            });
            //qq\u767B\u9646
            $(".login-html").on("click",".other_log_qq .qqloin",function(){
                $(".bgmask").hide();
                $("#loginbox").hide();
                var w=500,h=400;
                window.open("/opensns/qq/index.php?rid="+UIF.currentRoomNumber,"snslogin",'top='+(window.screen.height-h)/2+',left='+(window.screen.width-w)/2+',width='+w+',height='+h);
            });
            //wx_login
            $(".login-html").on("click",".other_log_sina .Stat",function(){
                $(".bgmask").hide();
                $("#loginbox").hide();
                var w=580,h=580;
                var redirect_uri="http%3a%2f%2fwww.kedo.tv%2fopensns%2fweixin%2findex.php";
                window.open('https://open.weixin.qq.com/connect/qrconnect?appid=wxedb924ffe29990ab&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect','snslogin','top='+(window.screen.height-h)/2+',left='+(window.screen.width-w)/2+',width='+w+',height='+h);
            });
		},
		showLoing : function(){
			$(".circle-n .login-cents").click();
		}
	}
	var baseHtml = '<div class="bgmask" style="display: none; height: 100%; z-index: 20002;"></div>\
		<div class="login-box-global-css" id="loginbox" style="display:none">\
		<div class="box_head">\
			<div style="position:relative"><div class="box_close icons Stat 2_3" id="box_close"></div></div>\
			<ul class="loginswitch">\
				<li id="tab_login" class="regsw"><a href="javascript:void(0)" id="loginboxLoginbtn">\u767B\u5F55</a></li>\
				<li id="tab_reg" class="" ><a href="javascript:void(0)" id="loginboxRegbtn">\u6CE8\u518C</a></li>\
			</ul>\
		</div>\
		<div class="clear"></div>\
		<div class="rlbox" id="tab_reg_content" style="display: none;">\
			<div class="regbox">\
				<form id="registerForm" method="get" onsubmit="return false;">\
					<div class="regmail">\
						<div class="border_center topb">\
							<input type="text" id="reg_email" placeholder="账号(邮箱号)" class="input210" style="margin-top:0">\
						</div>\
						<div class="border_right topb"></div><div class="oktip"></div>\
						<div id="mailinputTip" class="regdes" style="display: none;">\u7528\u4E8E\u767B\u5F55</div>\
						<div class="error" style="display: none;"></div>\
					</div>\
					<div class="regnic">\
						<div class="border_center topb">\
							<input type="text" id="reg_nickname" placeholder="\u6635\u79F0" class="input210 f_g">\
						</div>	\
						<div class="border_right topb"></div>\
						<div class="oktip"></div>\
						<div class="error" style="display: none;"></div>\
					</div>\
					<div class="regpw">\
						<div class="border_center topb">				\
							<input type="password" id="reg_password"  placeholder="\u521B\u5EFA\u5BC6\u7801" class="input210">\
						</div>	\
						<div class="border_right topb"></div><div class="oktip"></div>	\
						<div id="pwinputTip" class="regdes" style="display: none;">6-30\u4F4D\u5B57\u7B26\uFF0C\u533A\u5206\u5927\u5C0F\u5199</div>\
						<span class="pwbar"></span>\
						<div class="error" style="display: none;"></div>\
						<div class="pwbar"></div>\
					</div>\
					<div class="regpw2">\
						<div class="border_center topb">	\
							<input type="password" id="reg_repassword"  placeholder="\u786E\u8BA4\u5BC6\u7801" class="input210">\
						</div>	\
						<div class="border_right topb"></div><div class="oktip"></div>\
						<div id="pwinput2Tip" class="regdes" style="display: none;">\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801 </div>\
						<div class="error" style="display: none;"></div>\
					</div>\
					<div class="regcode">\
						<div class="border_center topb">	\
							<input type="text" id="reg_vaildcode"  placeholder="\u9A8C&nbsp;\u8BC1&nbsp;\u7801" class="input100">\
						</div>\
						<div class="border_right topb"></div>\
						<img title="\u70B9\u51FB\u56FE\u7247\u5207\u6362\u9A8C\u8BC1\u7801" class="yzmimg yzmimg_reg" src="/tools/captcha.php">\
						<div class="oktip"></div>\
						<div class="regdes re1">\u5237\u65B0</div>\
						<div class="error" style="display: none;"></div>\
					</div>\
					<p class="agree_p">\
						<label class="agree">\
							<input type="checkbox" checked="true" id="agreement" class="icon_checked fl v-middle">\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F\
							<a target="_blank" href="/news/4.html">\u7F51\u7AD9\u4F7F\u7528\u534F\u8BAE</a>\
						</label>\
					</p>\
					<button class="Stat 2_1 regbtn" id="regsub" type="button">\u7ACB\u5373\u6CE8\u518C</button>\
				</form>\
				<div class="other_login_area">\
					<span class="other_log_qq">\
						<a class="qqloin" href="javascript:void(0)"></a>\
					</span>\
					<span class="other_log_sina">\
						<a href="javascript:void(0)" class="Stat 2_2"></a>\
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
							<input type="text" id="tcuser" placeholder="\u5E10\u53F7/\u9753\u53F7" class="input210" style="color: rgb(153, 153, 153);margin-top:0">\
						</div>\
						<div class="border_right topb"></div><div class="oktip"></div>\
						<div style="display:none;" class="regdes">\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u5E10\u53F7\u5730\u5740</div>\
						<div class="error" style="display: none;"></div>\
					</div>\
					<div class="regpw lip">\
						<div class="border_center topb">	\
							<input type="password" placeholder="\u5BC6\u7801" id="tcpass" class="input210">\
						</div>\
						<div class="border_right topb"></div><div class="oktip"></div>	\
						<div class="regdes" style="display: none;">6-30\u4F4D\u5B57\u7B26\uFF0C\u533A\u5206\u5927\u5C0F\u5199</div>\
						<div class="error" style="display: none;"></div>\
						<div class="pwbar"></div>\
					</div>\
					<div class="log_yzm lip">\
						<div class="border_center topb">\
							<input type="text" id="login_vaildcode" placeholder="\u9A8C\u8BC1\u7801"  class="input100">\
						</div>\
						<div class="border_right topb"></div>\
						<img class="yzmimg yzmimg_login" style="width: 65px;" alt="\u70B9\u51FB\u56FE\u7247\u5207\u6362\u9A8C\u8BC1\u7801" src="/tools/captcha.php?_t='+ new Date().toString()+ '">\
						<div class="oktip"></div>	\
						<div class="regdes re2">\u5237\u65B0</div>\
						<div class="error" style="display: none;"></div>\
						<div class="pwbar"></div>\
					</div>\
					<p class="agree_p">\
						<label class="agree">\
							<input type="checkbox" id="tcremember" class="icon_checked fl v-middl" checked="true">\
							\u4E0B\u6B21\u81EA\u52A8\u767B\u5F55\
							<a target="_blank" href="/html/findpassword.html">\u5FD8\u8BB0\u5BC6\u7801</a>\
						</label>\
					</p> \
					<button id="loginsub" class="tcloginbtn" type="submit">\u767B \u5F55</button>\
				</form>\
				<div class="other_login_area">\
					<span class="other_log_qq">\
						<a class="qqloin" href="javascript:void(0)"></a>\
					</span>\
					<span class="other_log_sina">\
						<a href="javascript:void(0)" class="Stat 2_2"></a>\
					</span>\
				</div>\
			</div>\
		</div>\
	</div>';
});