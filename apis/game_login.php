<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
$_COOKIE['HFCOOKIE']=$_GET['cookie'];
include('../include/header.inc.php');
include_once($app_path."include/aes.func.php");
include_once($app_path."include/level.func.php");
//check login
$user=checklogin();
if(!$user){
	//生成游客id
	$usernumber=uniqid("");
	$username="Guest_".$usernumber;
	$nickname=$username;
	$user['userid']=$usernumber;
}
else{
	$username=$user['userid'];
	$usernumber=$user['usernumber'];
	$nickname=$user['nickname'];
}
echo $usernumber."\n";
echo $nickname."\n";
echo $user['userid']."\n";
echo $user['gamemoney'];
include('../include/footer.inc.php');