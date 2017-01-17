<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
/*if(strpos($_SERVER['HTTP_USER_AGENT'],'MSIE 6.0') !== false ){
    header("Location:/html/noie6.html");
}*/
include('include/header.inc.php');
include($app_path."include/level.func.php");
$user=checklogin();

//背景
$bgclassList=array("bg1","bg2");
$index=rand(0,count($bgclassList)-1);

$BSG=$bgclassList[$index];
if(!$_COOKIE["sbg"]){
    setcookie("sbg",$BSG,time()+10,'/',_COOKIE_DOMAIN_);
}else{
    $BSG=$_COOKIE["sbg"];
}
$roomnumber=(int)$_GET['roomnumber'];

//tokern校验
$db->Execute("update bu_user_packs set liveDT='".time()."' where userId='{$user[userId]}'");
$liveDT=$db->GetRow("select liveDT from bu_user_packs where userId='{$user[userId]}'");
if($liveDT){
    $currentToken=base64_encode(md5($user["username"].$user["password"].$liveDT["liveDT"]));
    $tokens=$user["username"].$user["password"].$liveDT["liveDT"];
}

$showinfo=$db->CacheGetRow(10,"select u.userId as userId,u.nickname as nickname,u.city as city,a.roomNumber as roomNumber,o.online as online from bu_user u left join  bu_user_anchors a on u.userId = a.userId LEFT JOIN bu_user_online o on u.userId = o.userId WHERE a.roomNumber=$roomnumber  and o.anchors=1");
$showinfo['starlevel']=1;

if(!$showinfo){
	include($app_path."include/footer.inc.php");
	header("Location:/html/noroom.html");
	exit;
}
$showinfo=safe_output($showinfo);


//是否主播
if($roomnumber==$user['roomNumber']){
    if($showinfo['online']){
        header("Location:/");
    }
	$self=true;
	$playerpath=("/js/sea-modules/swf/record.swf?".time());
	$playervars="chat=1&usernumber={$user['roomNumber']}&roomnumber=$roomnumber&c=".$_COOKIE['HFCOOKIE']."&mtadd="._SWF_CONF_ADD_;
}
else{
	$self=false;
	if(!$showinfo['online']){
		$nolivesql = "select a.totalpoint,a.nickname,a.birthday,b.roomnumber,b.showcover,c.num as viewernum,b.starttime,b.endtime from shows b , bu_user a,viewernum_count c,bu_user_anchors p,room_config rc where rc.roomnumber=a.usernumber and a.userid=p.userid and p.pass=1 and b.roomnumber=c.roomnumber and b.showcover<>'' and b.lastdisconnect is null and a.userid=b.userid and b.endtime is null and rc.pwd is null order by rand() limit 3";
	}
    $playerpath=("/js/sea-modules/swf/player.swf?".time());
    $playervars="token=".$_COOKIE['HFCOOKIE']."&chat=1&roomnumber=$roomnumber&fn=$roomnumber"."&mtadd="._SWF_CONF_ADD_;

}

$vhistory=explode(',',$_COOKIE['vhistory']);
if(!in_array($roomnumber,$vhistory)){
	array_unshift($vhistory,$roomnumber);
	$carr=array_chunk($vhistory,5);
	$result=join(',',$carr[0]);
	setcookie('vhistory',$result,time()+3600*356*10,'/',_COOKIE_DOMAIN_);
}


//礼物
$rs=$db->Execute("select * from gift a, giftcate b where a.giftcateid =b.giftcateid AND b.type=0 order by a.indexs DESC");
$giftId = $giftinfo = array();

$zhou_xing = explode(",",$global_config_data["top_week0"].",".$global_config_data["top_week1"]);
$giftId = $giftinfo = $zhou_xing_gift = array();
while($arr=$rs->FetchRow()){
	$arr['class']=str_replace('.png','',$arr['giftimage']);
	$arr['class']=str_replace('.gif','',$arr['class']);
	if(in_array($arr['giftid'],$zhou_xing)){
		$arr['week'] = true;
		$zhou_xing_gift[$arr["giftid"]] = $arr;
	}
	$giftinfo[$arr['giftcateid']][]=$arr;
	$giftId[$arr["giftid"]] = $arr;
}
shuffle($zhou_xing_gift);
$rs=$db->Execute("select * from giftcate WHERE type=0 order by indexs DESC");
 
$giftcate = array();
while($arr=$rs->FetchRow()){
	$giftcate[$arr["giftcateid"]] = $arr;

}
$tt = $page_var['site_live_skin'];
$page_var['cdn_domain']=_CDNDOMAIN_;
include($app_path."live_{$tt}.php");
include($app_path."include/footer.inc.php");