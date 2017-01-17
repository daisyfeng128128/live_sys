<?php include('head.php');;
if($_GET["action"]=="logout"){
	operational_log(2,"退出",$_REQUEST);
	echo "您已经成功退出";
	session_unset();	
	header('Location: red5.php');
	include('../../include/footer.inc.php');
	exit;
}
if($_REQUEST["login_txt"] && $_REQUEST["login_txt_password"]){
	$tmparr=$_REQUEST;
	unset($tmparr["login_txt_password"]);//不保存密码
	operational_log(1,"尝试登录",$tmparr);
	//$_SESSION['code']=$_REQUEST['code'];
	if(strtolower($_SESSION['code'])!=strtolower($_REQUEST['code'])){
		$alertinfo =  "您输入的验证码不正确";
	}else{
		if($_REQUEST["login_txt"] && $_REQUEST["login_txt_password"]){
			$info = $db->GetRow("select * from rootadmin where ADMINNAME='{$_REQUEST["login_txt"]}' and ADMINPASS='".md5($_REQUEST["login_txt_password"])."'");
			if($info!=false){
				$_SESSION["admin"] = $info;
				$_SESSION["admin"]["logintime"] = time();
				operational_log(1,"登录",$tmparr);
				header('Location: red5_index.php');
				//$alertinfo =  "登录成功";
			}else{
				$alertinfo =  "用户名或密码不正确";
			}
		}
	}
}
include($app_path.'include/footer.inc.php');
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>后台登陆</title>
    <style type="text/css">
	<!--
	*{
		padding:0px;
		margin:0px;
		font-family:Verdana, Arial, Helvetica, sans-serif;
	}
	body {
		margin: 0px;
		background:#F7F7F7;
		font-size:12px;
	}
	input{
		vertical-align:middle;
	}
	img{
		border:none;
		vertical-align:middle;
	}
	a{
		color:#333333;
	}
	a:hover{
		color:#FF3300;
		text-decoration:none;
	}
	.main{
		width:640px;
		margin:40px auto 0px;
		border:4px solid #EEE;
		background:#FFF;
		padding-bottom:10px;
	}
	
	.main .title{
		width:600px;
		height:50px;
		margin:0px auto;
		background:url(../images/root/login_toptitle.jpg) -10px 0px no-repeat;
		text-indent:326px;
		line-height:46px;
		font-size:14px;
		letter-spacing:2px;
		color:#F60;
		font-weight:bold;
	}
	
	.main .login{
		width:560px;
		margin:20px auto 0px;
		overflow:hidden;
	}
	.main .login .inputbox{
		width:260px;
		float:left;
		background:url("../images/root/login_input_hr.gif") right center no-repeat;
	}
	.main .login .inputbox dl{
		width:230px;
		height:41px;
		clear:both;
	}
	.main .login .inputbox dl dt{
		float:left;
		width:60px;
		height:31px;
		line-height:31px;
		text-align:right;
		font-weight:bold;
	}
	.main .login .inputbox dl dd{
		width:160px;
		float:right;
		padding-top:1px;
	}
	.main .login .inputbox dl dd input{
		font-size:12px;
		font-weight:bold;
		border:1px solid #888;
		padding:4px;
		background:url(../images/root/login_input_bg.gif) left top no-repeat;
	}
	
	
	.main .login .butbox{
		float:left;
		width:200px;
		margin-left:26px;
	}
	.main .login .butbox dl{
		width:200px;
	}
	.main .login .butbox dl dt{
		width:160px;
		height:41px;
		padding-top:5px;
	}
	.main .login .butbox dl dt input{
		width:98px;
		height:33px;
		background:url(../images/root/login_submit.gif) no-repeat;
		border:none;
		cursor:pointer;
	}
	.main .login .butbox dl dd{
		height:21px;
		line-height:21px;
	}
	.main .login .butbox dl dd a{
		margin:5px;
	}
	
	
	.main .msg{
		width:480px;
		margin:10px auto;
		clear:both;
		line-height:17px;
		padding:6px;
		border:1px solid #FC9;
		background:#FFFFCC;
		color:#666;
	}
	
	.copyright{
		width:640px;
		text-align:right;
		margin:10px auto;
		font-size:10px;
		color:#999999;
	}
	.copyright a{
		font-weight:bold;
		color:#F63;
		text-decoration:none;
	}
	.copyright a:hover{
		color:#000;
	}
	-->
	</style>
<script type="text/javascript">
	if (self != top)
	{
	    /* 在框架内，则跳出框架 */
	    top.location = self.location;
	}

	</script>
	<script language="JavaScript">
<!--
document.oncontextmenu = new Function("return false;");

function runicode(str){ 
	var k = new Array ();
	var rs="";
	k	= str.split(";");
	if(k.length > 1 ){
		for(i=0;i< (k.length -1);i++){ 
			var op = new Array ();
			op		= k[i].split("&#");
			if(op[0] != ""){
				rs		+= op[0];
			}
			rs	+=	String.fromCharCode(op[1]); 
		}
		return rs;
	}else{
		return str;
	}
}
function checkForm()
{
	if (document.getElementById("login_txt").value=="")
	{
		alert(runicode("用户名不能为空!"));
		document.getElementById("login_txt").focus();
		return false;
	}
	
	if (document.getElementById("login_txt_password").value=="")
	{
		alert(runicode("密码不能为空!"));
		document.getElementById("login_txt_password").focus();
		return false;
	}
	if (document.getElementById("code").value=="")
	{
		alert(runicode("验证码不能为空"));
		document.getElementById("code").focus();
		return false;
	}
	return true;
		
}
if (top.location != self.location)
{
     top.location = self.location;
}
<?php 
if($alertinfo)
	echo "alert('$alertinfo');";
?>
//-->
</script>
  </head>
  
  <body>

	<div class="main">
		<div class="title"></div>
	<div style="display:none;"><img id="img" src="#"/></div>
		<div class="login">
		<form method="post" name="LoginForm" action="" onSubmit="return checkForm()" id="loginForm">
            <div class="inputbox">
				<dl>
					<dt>用户:</dt>
					<dd>
					<input type="text" name="login_txt" id="login_txt" size="15" onfocus="this.style.borderColor='#F93'" onblur="this.style.borderColor='#888'" />
					</dd>
				</dl>
				<dl>
					<dt>密码:</dt>
					<dd><input type="password" name="login_txt_password" id="login_txt_password" size="15" onfocus="this.style.borderColor='#F93'" onblur="this.style.borderColor='#888'" />
					</dd>
				</dl>
				<dl>
					<dt>验证:</dt>
					<dd>
					<input name="code" id="code" size="3" maxlength="4" onfocus="this.style.borderColor='#F93'" onblur="this.style.borderColor='#888'" />
					<img src="/tools/red5_captcha.php" border="0" onclick="this.src='/tools/red5_captcha.php?t='+new Date().getTime()" alt="请输入此验证码，如看不清请点击刷新。" style="cursor:pointer" />
					&nbsp;</dd>
				</dl>				
			</div>
            <div class="butbox">
            <dl>
					<dt><input name="" type="submit" value="" />
					<input name="act" type="hidden" value="checklog" />
					</dt>
				</dl>
			</div>
		</form>
		</div>
</div>
<?php 
include($app_path."tools/queryip.php");
if(strpos(convertip_full($_SERVER['REMOTE_ADDR']),"福建")===false){?>
	<div class="copyright">
		Power by <a href="http://www.ju4.com.cn" target="_blank">聚思软件</a> (http://www.ju4.com.cn) QQ:451488
	</div>
<?php }?>
  </body>
</html>