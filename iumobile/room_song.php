<?php 
session_start();
if($_GET['isiphone']=="1"){
	$_SESSION['isiphone']=1;
}
include("../include/header.inc.php");
include($app_path."include/level.func.php");
require($app_path.'include/smarty/Smarty.class.php');
$user=checklogin();
//$db->debug = true;
//http://www.wpy.demo1.com/iumobile/room_song.php?roomnumber=42266
$roomnumber=(int)$_GET['roomnumber'];
$song_price = $db->GetOne("select giftprice from gift where giftid=200");
$songlist=$db->GetArray("select * from songlist where roomnumber='$roomnumber'");
foreach($songlist as $k=>$v){
	$songlist[$k]["i"] = $k+1;
}
$songrequest = $db->GetArray("select a.reqid,a.status,c.nickname,b.songname,b.singer from songrequest a,user c,songlist b where a.requestuserid=c.userid and a.songid=b.songid and a.roomnumber='$roomnumber' order by a.reqid desc limit 200");
foreach($songrequest as $k=>$v){
	$songrequest[$k]["i"] = $k+1;
}
$page_var['song_price'] = $song_price;
$page_var['songlist'] = $songlist;
$page_var['songrequest'] = $songrequest;

$smarty = new Smarty;
$smarty->caching = false;
$smarty->template_dir = "./templates";
$smarty->compile_dir = "./templates_c";


$page_var["RMB_XNB"] = RMB_XNB;
$page_var['user']=$user;
$page_var['id']=isset($_GET["id"])?$_GET["id"]:0;
$page_var['time']=time();

foreach($page_var as $key=>$val){
	$smarty->assign($key,$val);
}
$smarty->display("room_song.html");

include($app_path."include/footer.inc.php");