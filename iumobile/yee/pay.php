<?php 
include("../apis/include/header.inc.php");
include("yeepay/yeepayMPay.php");
include("config.php");
$db->Execute("insert into yborders (userid,money,adddate)values('$_GET[userid]','$_GET[money]','".time()."')");
$order_id=$db->Insert_ID();
$yeepay = new yeepayMPay($merchantaccount,$merchantPublicKey,$merchantPrivateKey,$yeepayPublicKey);


	
	$order_id = str_repeat('0',15-strlen($order_id)).$order_id;                      //客户订单号
	$transtime = time();                                                          //交易时间
	$product_catalog ='1';   //商品类别码
	$identity_id = $_GET['userid'];           //支付身份标识
	$identity_type = 0;     //支付身份标识类型码
 	$user_ip = $_SERVER['REMOTE_ADDR'];                                   //用户ip
    $callbackurl ='http://www.5iu.org/my/yee/callback.php';           //商户后台系统回调地址，前后台的回调结果一样
    $fcallbackurl ='http://www.5iu.org/my/yee/fcallback.php';           //商户前台系统回调地址，前后台的回调结果一样
	$product_name = '麦友金币';        //商品名称
	$product_desc = '金币';        //商品描述
	$other = 'ergrttth245345.4565.33434';                           //其他支付身份信息
	$amount =$_GET['money']*100;		                  //交易金额
				
	$url = $yeepay->webPay($order_id,$transtime,$amount,$product_catalog,$identity_id,$identity_type,$user_ip,$callbackurl,$fcallbackurl,$currency=156,$product_name,$product_desc,$other);

 	$arr = explode("&",$url);
 	$encrypt = explode("=",$arr[1]);
 	$data = explode("=",$arr[2]); 
 		
include("../apis/include/footer.inc.php");	
header("Location:$url");
exit();
?>
