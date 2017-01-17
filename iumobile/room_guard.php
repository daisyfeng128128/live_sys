<?php 
session_start();
include("../include/header.inc.php");
include($app_path."include/level.func.php");
require($app_path.'include/smarty/Smarty.class.php');
$user=checklogin();
//http://www.wpy.demo2015.com/iumobile/room_guard.php?roomnumber=55333

$roomnumber = (int)$_REQUEST["roomnumber"];
$guardList = $db->GetArray("select s.userid as isshow,c.*,s.ishide from (
select u.* from guard g,user u where u.userid=g.userid and roomnumber='$roomnumber' and vailddate>'".time()."' order by totalcost desc
) as c
LEFT JOIN show_users s on  c.userid=s.userid and s.roomnumber='$roomnumber'
");
foreach($guardList as $key=>$value){
	$value["richlevel"] = cost2rich($value["totalcost"]);
	$guardList[$key] = $value;
}
$smarty = new Smarty;
$smarty->caching = false;
$smarty->template_dir = "./templates";
$smarty->compile_dir = "./templates_c";


$page_var["RMB_XNB"] = RMB_XNB;
$page_var['user']=$user;
$page_var['id']=isset($_GET["id"])?$_GET["id"]:0;
$page_var['time']=time();
$page_var['roomnumber']=$roomnumber;
$page_var['guardList']=$guardList;

foreach($page_var as $key=>$val){
	$smarty->assign($key,$val);
}
$smarty->display("room_guard.html");

include($app_path."include/footer.inc.php");