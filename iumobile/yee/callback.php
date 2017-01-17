<?php
include("../apis/include/header.inc.php");
include 'config.php';
include 'yeepay/yeepayMPay.php';
$yeepay = new yeepayMPay($merchantaccount, $merchantPublicKey, $merchantPrivateKey, $yeepayPublicKey);
try {
	$return = $yeepay->callback($_REQUEST['data'], $_REQUEST['encryptkey']);
	$orderid=(int)$return[orderid];
	$orders=$db->GetRow("select * from yborders where orderid='$orderid' and status=0");
	if($orders){//加钱
		$db->Execute("update users set balance=balance+".($return[amount]/100)." where userid=".$orders[userid]);
		$db->Execute("update yborders set status=1 where orderid='$orderid'");
	}
	
}catch (yeepayMPayException $e) {
// TODO：添加订单支付异常逻辑代码

}
include("../apis/include/footer.inc.php");	
?>