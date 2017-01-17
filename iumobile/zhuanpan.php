<?php 
session_start();
if($_GET['isiphone']=="1"){
	$_SESSION['isiphone']=1;
}
include("../include/header.inc.php");
include($app_path."include/level.func.php");
require($app_path.'include/smarty/Smarty.class.php');
$user=checklogin();
$user['starlevel']=point2star($user['totalpoint']);
$user['richlevel']=cost2rich($user['totalcost']);

$smarty = new Smarty;
$smarty->caching = false;
$smarty->template_dir = "./templates";
$smarty->compile_dir = "./templates_c";


$page_var["RMB_XNB"] = RMB_XNB;
$page_var['user']=$user;
$page_var['id']=isset($_GET["id"])?$_GET["id"]:0;
$page_var['time']=time();
$page_var['token']=$_COOKIE['HFCOOKIE'];

foreach($page_var as $key=>$val){
	$smarty->assign($key,$val);
}
$smarty->display("zhuanpan.html");
		
include($app_path."include/footer.inc.php");