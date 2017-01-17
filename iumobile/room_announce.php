<?php 
session_start();
if($_GET['isiphone']=="1"){
	$_SESSION['isiphone']=1;
}
include("../include/header.inc.php");
require($app_path.'include/smarty/Smarty.class.php');
$user=checklogin();
//$db->debug = true;
//http://www.wpy.demo1.com/iumobile/room_announce.php
$page_var['gift_price'] = $db->GetOne("select giftprice from gift where giftid=65");

$page_var['gift_num'] = $db->GetOne("select num from giftstore where giftid=65 and userid='{$user['userid']}'");
if($page_var['gift_num']==null){
	$page_var['gift_num'] = 0;
}
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
$smarty->display("room_announce.html");

include($app_path."include/footer.inc.php");