<?php 
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
//http://www.wpy.demo1.com/full_flash_apis/api.php?u=19838&t=1
include('../include/header.inc.php');
//$db->debug = true;
$userid = (int)$_GET["u"];
$t = (int)$_GET["t"];
if(empty($userid)||empty($t)){
	$arr['medalname'] = "";
	$arr['clantype'] = "";
	$arr["level"]="0";
	$arr['medalvalid']=0;
	echo json_encode($arr);
	include('../include/footer.inc.php');
	exit;
}
//取得用户等级等等信息
if($t == "1"){
	include('../include/level.func.php');
	$arr['medalname'] = "";
	$arr['clantype'] = "";
	$arr = $db->CacheGetRow(60,"select totalcost,medalname,clantype,medalvalid,viplevel from user b left join clan c on b.clanid=c.clanid where userid='$userid'");
	if(!empty($arr)){
		if(!empty($arr["totalcost"])){
			$arr["level"] = cost2rich($arr["totalcost"]);
		}else{
			$arr["level"]="0";
		}
		if(!($arr['medalvalid']>time() && $arr['medalname']!="")){
			$arr['medalname'] = "";
			$arr['clantype'] = "";
		}
	}
	echo json_encode($arr);
}
include('../include/footer.inc.php');