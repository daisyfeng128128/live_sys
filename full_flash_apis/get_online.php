<?php 
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include('../include/header.inc.php');
include $app_path . 'include/level.func.php';
$cacheTime=10;
$sql = "select a.totalpoint, a.nickname, b.roomnumber, b.showcover, c.num as viewernum, 
b.starttime, b.endtime from shows b, user a,viewernum_count c where b.roomnumber = c.roomnumber and a.userid = b.userid and b.lastdisconnect is null 
and b.endtime is null  order by id desc, viewernum limit 3";
$show_user=$db->CacheGetArray($cacheTime,$sql);
foreach ($show_user as $value){
	$obj['img'] = $value["showcover"]?("/static_data/showcover/".$value["showcover"]):"/images/default.jpg";
	$obj['roomnumber']=$value[roomnumber];
	$obj['nickname']=$value[nickname];
	$obj['viewernum']=$value[viewernum];
	$result[]=$obj;
}
echo json_encode($result);
include('../include/footer.inc.php');
?>