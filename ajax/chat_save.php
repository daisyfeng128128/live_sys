<?php 
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include('../include/header.inc.php');

//"?roomnumber="+roomnumber+"&fromuserid="+p_client.userid+"&touserid="+to+"&v="+msg+"&type=2&null=1");
$roomnumber = (int)$_GET["roomnumber"];
$fromuserid = $_GET["fromuserid"];
if(strlen($fromuserid)==13){//是游客在说
	$fromuserid = 0;
}else{
	$fromuserid = (int)$fromuserid;
}
if(empty($roomnumber)){
	include('../include/footer.inc.php');
	exit;
}
$touserid = (int)$_GET["touserid"];
$v = $_GET["v"];
$type = $_GET["type"];
//0公聊1vip区域2私聊
if($type=="vip"){
	$type=1;
}else if($type=="common"){
	$type=0;
}
$type = (int)$type;
$db->Execute("INSERT INTO `chat_history` (`roomnumber`,`when` ,`fromuserid` ,`touserid` ,`v` ,`type`)VALUES ('$roomnumber','".time()."','$fromuserid', '$touserid', '$v', '$type')");
include('../include/footer.inc.php');