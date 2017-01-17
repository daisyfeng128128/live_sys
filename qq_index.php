<?php

//读取配置
$page_var['images_domain']=_IMAGES_DOMAIN_;

if(isset($_GET['pcid'])){
    session_start();
    $_SESSION['pcid']=$_GET['pcid'];
}
include("include/QQZone/QQZone.inc.php");

$user=checklogin();
$page_var['user']=$user;

//hot-anchor
$datas = curl_get(_CDNDOMAIN_."/files/anchors.json","");
$acceptData=json_decode($datas, true);
$page_var['hotAnchorList']=json_decode($acceptData[json],true);

//new-anchor
$datas = curl_get(_CDNDOMAIN_."/files/newAnchors.json","");
$acceptData=json_decode($datas, true);
$page_var['newAnchorList']=json_decode($acceptData[json],true);


$isanchor=$db->GetOne("select pass from bu_user_anchors WHERE  userId={$user['userid']} and status=1");
if($isanchor){
    $page_var['user']['pass'] = $isanchor;
}

//banner
$banners=$db->CacheGetArray(5,"select * from bu_homeBanners WHERE  online =1 order by orders ASC");
$page_var['banners']=$banners;
//smarty初始化
$smarty = new Smarty;
$smarty->caching = false;
$smarty->template_dir = "./templates";
$smarty->compile_dir = "./templates_c";
$smarty->assign('pointlimit', $pointlimit);
//当前页面标示
$page_var['current_page']="index";
$weekGiftUserid = getGiftTopUserids();
$bot_guest=array();

if(file_exists($app_path.'skin/'.$page_var['site_skin'].'/include_include.php')){
    include_once($app_path.'skin/'.$page_var['site_skin'].'/include_include.php');
}

$top_limit = $page_var['site_skin']=="xiu8"?8:10;

$page_var['rank_star_dayList']=zhuboTopInfo(get_top_rank_mingxing("day",$top_limit));
$page_var['rank_super_star']=zhuboTopInfo(get_top_rank_mingxing("all",$top_limit));
$page_var['rank_star_weekList']=zhuboTopInfo(get_top_rank_mingxing("week",$top_limit));
$page_var['rank_star_monthList']=zhuboTopInfo(get_top_rank_mingxing("month",$top_limit));
$page_var['rank_fans_list']=fansTopInfo(get_top_rank_fans("all",$top_limit));
$page_var['rank_super_rich']=fuhaoTopInfo(get_top_rank_fuhao("all",$top_limit));


$limit = 8;
$cacheTime = 3600;
foreach($page_var as $key=>$val){
    $smarty->assign($key,$val);
}
$smarty->registerPlugin("function","toColor","toColor");
$smarty->registerPlugin("function","toTime","toTime");

$smarty->display("qq_index.html");

include("include/footer.inc.php");