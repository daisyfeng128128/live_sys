<?php 
include('head.php');
$usernumber = (int)$_GET["usernumber"];
if(!$usernumber){
	include('../../include/footer.inc.php');
	exit;
}
include($app_path."include/login.func.php");
$password = $_GET["password"];
if($usernumber && $password	){
	$sql = "update `user` set `password`='".password_deal($password)."' where usernumber='$usernumber' limit 1";
	$temp = $db->Execute($sql);
	$userid = $db->GetOne("select userid from user where usernumber='$usernumber'");
	operational_log(4,"修改用户密码userid,{$userid}",$_REQUEST,$userid);
}
include('../../include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>修改密码</title>
<script>
function check(){
	var usernumber = document.getElementById("usernumber").value;
	var password = document.getElementById("password").value;
	if(usernumber=="" || password==""){
		alert("用户号和密码必须填写");
		return false;
	}
	if(password.length<6){
		alert("密码长度至少为6位");
		return false;
	}
	var str = '确认将密码修改为：'+password+'吗？';
	if(confirm(str)){
		return true;
	}else{
		return false;
	}
}
</script>
</head>
<body>
<table width="99%" align=center cellspacing=1 cellpadding=3 border=0>
	<tr class=head>
		<td width='30%' align=center>密码修改</td>
	</tr>
</table>
<br />
<?php if($usernumber && $password):?>
	<p style="color:red">主播号/用户号:<?php echo $usernumber?>密码修改成功</p>
<?php endif;?>
<form onsubmit="return check();">
<input type="hidden" name="usernumber" id="usernumber" value="<?php echo $usernumber?>">
新密码：<input type="input" name="password" id='password' value="" size="20">
<input value="提交" type="submit">
</form>
</body>
</html>
