<?php

include("include/header.inc.php");
include($app_path."include/level.func.php");
require('include/smarty/Smarty.class.php');
include_once('include/login.func.php');

$user=checklogin();
$page_var['user']=$user;
$datas = curl_get(_CDNDOMAIN_."/files/allAnchors.json","");
$acceptData=json_decode($datas, true);
$page_var['sqAnchorList']=json_decode($acceptData[json],true);

//smarty初始化
$smarty = new Smarty;
$smarty->caching = false;
$smarty->template_dir = "./templates";
$smarty->compile_dir = "./templates_c";

$page_var['openid']=$_SESSION['openid'];
$page_var['openkey']=$_SESSION['openkey'];
$page_var['pf']=$_SESSION['pf'];
$page_var['pfkey']=$_SESSION['pfkey'];

$page_var['cdn_domain']=_CDNDOMAIN_;
foreach($page_var as $key=>$val){
    $smarty->assign($key,$val);
}
$smarty->display("pay.html");
include("include/footer.inc.php");
?>

