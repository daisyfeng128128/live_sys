<?php 
session_start();
if($_GET['isiphone']=="1"){
	$_SESSION['isiphone']=1;
}
include("../include/header.inc.php");
require($app_path.'include/smarty/Smarty.class.php');
$smarty = new Smarty;
$smarty->caching = false;
$smarty->template_dir = "./templates";
$smarty->compile_dir = "./templates_c";
foreach($page_var as $key=>$val){
	$smarty->assign($key,$val);
}
$smarty->display("register.html");
include($app_path."include/footer.inc.php");