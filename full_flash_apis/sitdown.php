<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include('../include/header.inc.php');
$roomnumber=(int)$_GET['roomnumber'];
$sitid=(int)$_GET['sitid'];
if($_GET['cookie']){
	$_COOKIE['HFCOOKIE']=$_GET['cookie'];
}
$user=checklogin();
if($user){
	$db->Execute("delete from sit where roomnumber='$roomnumber' and userid='$user[userid]'");
	$db->Execute("insert into sit (roomnumber,userid,sitid)values('$roomnumber','$user[userid]','$sitid')");
	echo $sitid.','.$user[userid].','.$user['nickname'];
}
include('../include/footer.inc.php');
?>