<?php

header("Content-type: text/html; charset=utf-8");
include("include/header.inc.php");
include("include/level.func.php");
require('include/smarty/Smarty.class.php');
include_once('include/login.func.php');
//读取配置
$page_var['images_domain']=_IMAGES_DOMAIN_;
$page_var['sitename']=SITENAME;


if(isset($_GET[openid]) and $_GET[openid] !=''){
    include("qq_index.php");
    exit();
}

$user=checklogin();
$page_var['user']=$user;

//banner
$page_var['v'] = md5(date('Y-d-m'));


//smarty初始化
$smarty = new Smarty;
$smarty->caching = false;
$smarty->template_dir = "./templates";
$smarty->compile_dir = "./templates_c";
$smarty->assign('pointlimit', $pointlimit);

//当前页面标示
$page_var['current_page']="index";

$key = "UJJ$@#KIREW&*&#OHJ";
$str=$user['username'].$user['password'];
$gf_token = getSignature($str,$key);
$page_var['gf_token'] =$gf_token;
$page_var['coreweb'] =_COREWEB_;
$limit = 8;
$cacheTime = 3600;
foreach($page_var as $key=>$val){
    $smarty->assign($key,$val);
}
$smarty->registerPlugin("function","toColor","toColor");
$smarty->registerPlugin("function","toTime","toTime");

    $smarty->display("index_kedo.html");

include("include/footer.inc.php");