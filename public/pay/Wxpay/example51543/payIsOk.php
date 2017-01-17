<?php
include_once('../../../../common/function/func/header.inc.php');
//$db->debug = true;
$user=checklogin();
if(!$user){
	include $app_path.'include/footer.inc.php';
	exit('请先登录');
}

$id = $_POST["id"];
if(!$id){
    $res["code"] = 100;
    echo json_encode($res);
    exit();
}
$order = $db->GetOne("select id from `bu_gift_details` where orderId='$id' and `tradeStatus`=1");
$res = array("code"=>$id);
if($order){
    $res["code"] = 200;
    echo json_encode($res);
    exit();
}
include $app_path.'include/footer.inc.php';
