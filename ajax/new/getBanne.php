<?php 
//首页中间上方图片轮播
//http://www.xxx.com/ajax/index/getBanne.php?bannerType=0
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");

include("../../include/header.inc.php");
$bannerType = (int)$_GET['bannerType'];//0:首页,1直播页
$time = time();
if($bannerType=="1"){//直播页
	$roomnumber = (int)$_REQUEST["roomnumber"];
	$tmp = $db->CacheGetArray(60,"select title,picSrc,url from pic_banner where position='直播页' and start_date<=$time and $time<=end_date and (roomnumber='' or roomnumber is null or roomnumber='0' or roomnumber='$roomnumber') ORDER BY `order` asc,id desc");
}else{//首页
	$tmp = $db->CacheGetArray(60,"select title,picSrc,url from pic_banner where position='首页' and start_date<=$time and $time<=end_date ORDER BY `order` asc,id desc");
}
foreach ($tmp as $k=>$v) {
	$tmp[$k]["picSrc"] = ($page_var['cdn_domain']."/static_data/banner/".$v["picSrc"]);
	if(empty($v["title"]))
		$tmp[$k]["title"]="";
}
echo json_encode($tmp);
include("../../include/footer.inc.php");