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
	/*
	array(11) {
  ["amount"]=>
  int(4)
  ["bank"]=>
  string(12) "中信银行"
  ["bindid"]=>
  string(6) "130034"
  ["bindvalidthru"]=>
  int(1420969980)
  ["identityid"]=>
  string(1) "1"
  ["identitytype"]=>
  int(0)
  ["lastno"]=>
  string(4) "0295"
  ["merchantaccount"]=>
  string(13) "YB01000000732"
  ["orderid"]=>
  string(15) "cBlcEqR3LXdcoHk"
  ["status"]=>
  int(1)
  ["yborderid"]=>
  string(18) "411401116429368637"
}
	*/
}catch (yeepayMPayException $e) {
	//var_dump($e);
	// TODO：添加订单支付异常逻辑代码
	echo '充值失败';
	include("../apis/include/footer.inc.php");	
	exit;
}
header("Location:http://successpay.5iu.org");
include("../apis/include/footer.inc.php");	
?>