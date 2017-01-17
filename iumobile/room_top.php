<?php 
include("../include/header.inc.php");
require($app_path.'include/smarty/Smarty.class.php');
$roomnumber=(int)$_GET['roomnumber'];

$currentShowerid=$db->GetOne("select userid from user where usernumber='{$roomnumber}'");
$page_var['roomnumber'] = $roomnumber;
$page_var['currentShowerid'] = $currentShowerid;

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
$smarty->display("room_top.html");

include($app_path."include/footer.inc.php");