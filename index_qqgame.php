<?php

header("Content-type: text/html; charset=utf-8");
include("include/header.inc.php");
include("include/level.func.php");
require('include/smarty/Smarty.class.php');
include_once('include/login.func.php');
//读取配置
$page_var['images_domain'] = _IMAGES_DOMAIN_;
$page_var['sitename'] = SITENAME;


if ($_GET['param'] == 'userinfo' and $_GET['openid'] != null) {
    $userInfo = array();
    $snsid = $_GET['openid'];
    //$snsid = '8B8A85FA742C9B279C765B9F1E08E191';
    $sql = "SELECT userId from bu_user WHERE snsid = '{$snsid}'";
    $user = $db->GetRow($sql);
    $userId = $user['userId'];
    if(!$userId){
        $userInfo[result] = -1;
        $userInfo[resultstr] ='false';
        echo json_decode($userInfo);
        exit();
    }


    $sql1 = "SELECT coins,xcoins from bu_user_packs WHERE userId = '{$userId}'";
    $packs = $db->GetRow($sql1);
    $xcoins = $packs['xcoins']? $packs['xcoins']:0;
    $xcoins = intval($xcoins);
    $coins = $packs['coins'];
    $coins = intval($coins);

    $rs = $db->GetAll("select b.roomNumber,
(SELECT o.online from bu_user_online o where o.roomnumber = b.roomNumber and o.anchors=1) online,
u.nickname,u.userId,u.avatar,a.followeds,p.packs
from  bu_user_studio b,bu_user u,bu_user_anchors a,bu_user_packs p
where b.userId='{$userId}'
and a.roomNumber = b.roomNumber
and u.userId = a.userId
and p.userid =a.userId
and b.isFollow =1
");

    $ac = array();
    $ab=array();
    foreach ($rs as $k => $v) {

        $ac['live_id'] = $v['roomNumber'];
        $ac['room_name'] = urldecode($v['nickname']);
        $ac['nickname'] = urldecode($v['nickname']);
        $ac['emcee_avatar'] = _IMGPLUS_DOMAIN_."/".$v['avatar'];
        $ac['user_count'] = $v['followeds'];
        $jsona = json_decode($v['packs'],1);
        $rtype = $jsona['rtype'];
        if($rtype == 2){
            $ac['show_label']='游戏';
        }else{
            $ac['show_label']='娱乐';
        }
        $ab[] = $ac;
    }
    $userInfo[result] = 0;
    $userInfo[resultstr] ='success';
    $data['balance'] = array(
        'coins' => $coins
    );
    $data['livelist'] = $ab;

    $userInfo[data]=$data;
    echo json_encode($userInfo);
    exit();

}

if (isset($_GET[openid]) and $_GET[openid] != '') {
    include("include/QQZone/QQGame.inc.php");
}
$user = checklogin();
$page_var['user'] = $user;
$page_var['source'] = "QQGame";
$page_var['vsn']=$vsn;

if ($_GET['param'] != "" and is_numeric($_GET['param']) and !empty($user)) {
    $roomNumber = $_GET["param"];
    $_SESSION['param'] =  'built';
    header('location:/' . $roomNumber."?param=built");
    exit();
}
//smarty初始化
$smarty = new Smarty;
$smarty->caching = false;
$smarty->template_dir = "./templates";
$smarty->compile_dir = "./templates_c";

//当前页面标示
$page_var['current_page'] = "index";

$key = "UJJ$@#KIREW&*&#OHJ";
$str = $user['username'] . $user['password'];
$gf_token = getSignature($str, $key);
$page_var['gf_token'] = $gf_token;
$page_var['coreweb'] = _COREWEB_;
$limit = 8;
$cacheTime = 3600;
foreach ($page_var as $key => $val) {
    $smarty->assign($key, $val);
}
$smarty->registerPlugin("function", "toColor", "toColor");
$smarty->registerPlugin("function", "toTime", "toTime");
$smarty->display("index_kedo.html");
include("include/footer.inc.php");