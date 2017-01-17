<?php
header("Content-type: text/html; charset=utf-8");
include '../../include/header.inc.php';
$user=checklogin();
$res = array("code"=>500,"info"=>"");
if(!$user){
	$res["info"] = "请先登录";
	echo json_encode($res);
	include $app_path.'include/footer.inc.php';
}
$money=(int)$_GET['p3_Amt'];
$channel=7;
$balanceadd=$money*RMB_XNB*ALI_REDUCE;
$orderid=payInsertOrders($user,$money,$channel,$balanceadd);

$res["code"] = 200;
$res["orderid"] = sprintf("%s%05d",date(Ymd),$orderid);
echo json_encode($res);
include $app_path.'include/footer.inc.php';