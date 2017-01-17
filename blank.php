<?php

include("include/header.inc.php");
include($app_path."include/level.func.php");
require('include/smarty/Smarty.class.php');
include_once('include/login.func.php');

$user=checklogin();
$page_var['user']=$user;
//smarty初始化
$smarty = new Smarty;
$smarty->caching = false;
$smarty->template_dir = "./templates";
$smarty->compile_dir = "./templates_c";

$type=$_GET['type'];

$page_var['type']= $type;
foreach($page_var as $key=>$val){
    $smarty->assign($key,$val);
}
$smarty->display("blank.html");
include("include/footer.inc.php");
?>

