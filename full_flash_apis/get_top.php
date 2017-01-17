<?php 
/**
 * 主播页，粉丝排行榜
 * 过去30天的粉丝排行榜,或所有的
 */
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include('../include/header.inc.php');
include $app_path . 'include/level.func.php';
$cacheTime=10;
$roomnumber=(int)$_GET['roomnumber'];
if(isset($_GET['touserid'])){
	$uid=(int)$_GET['touserid'];
	$where_touserid = " and a.touserid='$uid'";
}else{
	$where_touserid = null;
}
//本月
$current_time =  strtotime(date(("Y-m-d"." H:i:00")));
//过去30天的数据，3*3600*24=2592000
$before_time =  $current_time-1*3600*24;
$where = " and (`when` BETWEEN {$before_time} AND {$current_time})";
$rs = $db->CacheSelectLimit($cacheTime, "SELECT a.userid,sum(a.money) as usemoney,b.usernumber,b.nickname,b.totalcost,b.avatar FROM `balance_change_log` a,user b WHERE a.giftid<>1 and a.userid=b.userid and a.why=1 and b.usernumber!='$roomnumber' {$where} {$where_touserid} group by a.userid order by usemoney asc", 5);
$i = 0;

while ($arr = $rs->FetchRow()) {
	$i ++;
	$arr = safe_output($arr);
	$arr['richlevel'] = cost2rich($arr['totalcost']);
	$all['week'][]=$arr;
}
//全部
$rs = $db->CacheSelectLimit($cacheTime, "SELECT a.userid,sum(a.money) as usemoney,b.usernumber,b.nickname,b.totalcost,b.avatar FROM `balance_change_log` a,user b WHERE a.giftid<>1 and a.userid=b.userid and a.why=1 and b.usernumber!='$roomnumber' {$where_touserid} group by a.userid order by usemoney asc", 5);
$i = 0;

while ($arr = $rs->FetchRow()) {
	$i ++;
	$arr = safe_output($arr);
	$arr['richlevel'] = cost2rich($arr['totalcost']);
	$all['all'][]=$arr;
}
//当前守护
$rs = $db->CacheSelectLimit($cacheTime,"select u.* from guard g,user u where u.userid=g.userid and roomnumber='$roomnumber' and vailddate>'".time()."' order by totalcost desc",250);
while ($arr = $rs->FetchRow()) {
	$arr['richlevel'] = cost2rich($arr['totalcost']);
	$all['guards'][]=$arr;
}
//当前会员

//当前座驾
$carlist=$db->GetArray("select carid,giftname as carname,
giftimage as carimage,d.nickname,c.userid,c.usernumber from gift a,
usercars b,show_users c,user d where d.userid=c.userid and c.userid=b.userid and b.carid=a.giftid
 and c.roomnumber='$roomnumber' and b.vailddate>".time()." order by b.active desc,a.giftprice desc");
$all['cars']=$carlist;
//最近4条送礼
$all['giftsannounce']=$db->GetArray("select c.giftnum,a.giftname,a.giftimage,b.nickname,c.when from gift a,user b,balance_change_log c where c.userid=b.userid and c.giftid=a.giftid and c.why='1' and c.money<0 and a.giftcateid<>0 and a.giftcateid<>1 and c.roomnumber=$roomnumber order by id desc limit 4");
//红包数量
$all['kknum']=$db->GetOne("select ordernum from user where usernumber='$roomnumber'");
//砖头数量
//$all['kknum']=$db->GetOne("select ordernum from user where usernumber='$roomnumber'");
//当前观众席
$all['sit']=$db->CacheGetArray($cacheTime,"select a.*,b.nickname from sit a,user b where a.userid=b.userid and a.roomnumber='$roomnumber'");

echo json_encode($all);

include('../include/footer.inc.php');
?>