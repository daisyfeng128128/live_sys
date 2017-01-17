<?php
include("../include/header.inc.php");
include("../include/level.func.php");
require('../include/smarty/Smarty.class.php');
//读取配置
if(file_exists($app_path.'skin/'.$page_var['site_skin'].'/config.php')){
    include_once($app_path.'skin/'.$page_var['site_skin'].'/config.php');
}
if(isset($_GET['pcid'])){
    session_start();
    $_SESSION['pcid']=$_GET['pcid'];
}
if($page_var['IS_QQ']){
    if($_GET['app_userid']){
        $uid=(int)$_GET['app_userid'];
        $roomnumber=$db->GetOne("select usernumber from user where userid='{$uid}'");
        include("include/footer.inc.php");
        header("Location:/".$roomnumber.".html");
        exit;
    }
    include("include/QQZone/QQZone.inc.php");
}
$pointlimit=$_GET['l']?$_GET['l']:"0";
if($pointlimit==1){
    $pointlimit_sql=" and a.totalpoint <= $point_array[3] ";
}
else if($pointlimit==2){
    $pointlimit_sql=" and a.totalpoint > $point_array[3] and a.totalpoint <= $point_array[6] ";
}
else if($pointlimit==3){
    $pointlimit_sql=" and a.totalpoint > $point_array[6] and a.totalpoint <= $point_array[9] ";
}
else if($pointlimit==4){
    $pointlimit_sql=" and a.totalpoint > $point_array[9] ";
}
else if($pointlimit==9){
    $pointlimit_sql=" and rc.is_big_room =1 ";
}

$catelimit=(int)$_GET['c'];
if(!empty($catelimit)){
    $catelimit_sql=" and rc.showercateid=$catelimit ";
}
if(!empty($_GET['v'])){
    $catelimit_sql.=" and a.nickname='{$_GET['v']}' ";
}
$page_var[l1num]=rand(1,2000);
$page_var[l2num]=rand(1,2000);
$page_var[l3num]=rand(1,2000);
$page_var[l4num]=rand(1,2000);
$page_var['totalnum']=$page_var[l1num]+$page_var[l2num]+$page_var[l3num]+$page_var[l4num];
//smarty初始化
$smarty = new Smarty;
$smarty->caching = false;
$smarty->template_dir = "./templates";
$smarty->compile_dir = "./templates_c";
$smarty->assign('pointlimit', $pointlimit);
//$smarty->assign('isshowku', isset($_GET['isshowku'])?$_GET['isshowku']:"0");

//当前页面标示
$page_var['current_page']="index";
//当前在线[现在是通过前台js根据每个主播的在线人数计算出来的]
//$page_var['now_online']=(int)$db->CacheGetOne(3,"select sum(num) from viewernum_count");
//主播分类
$rs=$db->CacheExecute(3600*24,"select * from showercate order by id asc");
while($arr=$rs->FetchRow()){
    $page_var['showercate'][]=$arr;
}
$user=checklogin();
if($user){
    $user['starlevel']=point2star($user['totalpoint']);
    $user['richlevel']=cost2rich($user['totalcost']);
    $user['nextstar']=($user['starlevel']!=count($point_array)-1)?($point_array[$user['starlevel']+1]-$user['totalpoint']):'0';
    $user['nextrich']=($user['richlevel']!=count($cost_array)-1)?($cost_array[$user['richlevel']+1]-$user['totalcost']):'0';
    //主播升级还差
    if($user['nextstar']!=0){
        $user['starshenji'] = $point_array[$user['starlevel']+1]-$user['totalpoint'];
        if($user['starlevel']!=count($point_array)-1){
            $user['starshenjiB'] = ($user['totalpoint']-($point_array[$user['starlevel']]))/(($point_array[$user['starlevel']+1])-($point_array[$user['starlevel']]))*100;
        }
        $user['nextstarJ'] = $user['starlevel']+1;
    }else{
        $user['starshenji'] =0;
        $user['starshenjiB']=100;
        $user['nextstarJ'] = $user['starlevel'];
    }
    //富豪升级还差
    if($user['nextrich']!=0){
        $user['richshenji'] = $cost_array[$user['richlevel']+1]-$user['totalcost'];
        if($user['richlevel']!=count($cost_array)-1){
            $user['richshenjiB'] = ($user['totalcost']-($cost_array[$user['richlevel']]))/(($cost_array[$user['richlevel']+1])-($cost_array[$user['richlevel']]))*100;
        }
        $user['nextrichJ'] = $user['richlevel']+1;
    }else{
        $user['richshenji'] =0;
        $user['richshenjiB']=100;
        $user['nextrichJ'] = $user['starlevel'];
    }
    $page_var['user']=$user;
    $page_var['xinshoulibao']=isxinshoulibao($user);
}
$weekGiftUserid = getGiftTopUserids();
$bot_guest=array();
if($page_var['site_skin']=="lebo"){//正在直播和未直播是分开的
    include($app_path."skin/lebo/index_data.php");
}else{
    //人气主播";
    $recommend_shows=$db->CacheGetArray(5,"select a.totalpoint,a.nickname,a.birthday,a.userid,b.roomnumber,b.showcover,c.num as viewernum,b.starttime,b.endtime from shows b , user a,viewernum_count c,bu_user_anchors p ,room_config rc where rc.roomnumber=a.usernumber and a.userid=p.userid $pointlimit_sql $catelimit_sql and p.pass=1 and b.roomnumber=c.roomnumber and b.showcover<>'' and b.lastdisconnect is null and a.userid=b.userid and b.endtime is null and rc.pwd is null order by c.num desc");
    if(count($recommend_shows)<100){
        $tmpjoin=array();
        for($i=0;$i<count($recommend_shows);$i++){
            $tmpjoin[]=$recommend_shows[$i][roomnumber];
        }
        $noids=@join(',',$tmpjoin);
        if(!$noids){
            $noids=0;
        }
        $bot_guest = get_bot_guest_num($noids);
        $recommend_shows_ext=$db->CacheGetArray(5,"select * from(select a.totalpoint,a.nickname,a.province,a.birthday,a.userid,b.roomnumber,b.showcover
		,b.starttime,b.endtime,'0' as viewernum from shows b , user a,bu_user_anchors p 
		,room_config rc where rc.roomnumber=a.usernumber and  a.userid=p.userid $pointlimit_sql $catelimit_sql and p.pass=1 and b.showcover<>'' and a.userid=b.userid and b.roomnumber not in ($noids) and rc.pwd is null order by starttime  desc) as rows group by roomnumber order by endtime desc limit ".(40-count($recommend_shows)));
        $recommend_shows = (!empty($recommend_shows))?array_merge($recommend_shows,$recommend_shows_ext):$recommend_shows_ext;
    }
    $page_var['recommend_shows']=zhuboShowInfo($recommend_shows,$weekGiftUserid,$bot_guest);
    //最近观看
    if($_COOKIE['vhistory']){
        $prev_roomnumber=explode(',',$_COOKIE['vhistory']);
        if(is_array($prev_roomnumber)){
            foreach($prev_roomnumber as $prevuid){
                $prevusers[]=(int)$prevuid;
            }
            $ids=join(',',$prevusers);
            $view_history=$db->CacheGetArray(10,"select a.userid,a.usernumber as roomnumber,a.nickname,a.totalpoint,a.isshowing from user a where a.usernumber in ($ids)");
            $page_var['view_history']=zhuboShowInfo($view_history,$weekGiftUserid,$bot_guest);
        }
    }
    $fav=$db->CacheGetArray(30,"select floor(rand()*3000) as num, b.nickname,b.usernumber from user b,bu_user_studio a where a.showernumber=b.usernumber and a.userid='$user[userid]'");
    $smarty->assign('fav', $fav);
}

//推荐主播（随机取4个在线的主播）
$top_num = isset($skin_config["index_tuijian_num"])?$skin_config["index_tuijian_num"]:4;
/*
$recommend_top4=$db->CacheGetArray(5,"select a.totalpoint,a.nickname,a.birthday,a.userid,b.roomnumber,b.showcover,c.num as viewernum,b.starttime,b.endtime from shows b , user a,viewernum_count c,applysign p,room_config rc where rc.roomnumber=a.usernumber and a.userid=p.userid and p.pass=1 and b.roomnumber=c.roomnumber and b.showcover<>'' $pointlimit_sql $catelimit_sql and b.lastdisconnect is null and a.userid=b.userid and b.endtime is null and rc.pwd is null order by rand() limit ".$top_num);
$page_var['recommend_top4']=zhuboShowInfo($recommend_top4,$weekGiftUserid,$bot_guest);
*/
$page_var['recommend_top4']=zhuboShowInfo(array_slice($recommend_shows,0,$top_num),$weekGiftUserid,$bot_guest);
//echo "<pre>";
echo json_encode($recommend_shows);
//echo "</pre>";
exit();