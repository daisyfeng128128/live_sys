<?php
include("../../include/header.inc.php");
include 'deal.php';
//支付宝回调接口
require_once("../alipay/alipay.config.php");
require_once("../alipay/lib/alipay_notify.class.php");
file_put_contents(("data/return_url_alipay.".date("YmdHis").".".rand(1, 100)), json_encode($_REQUEST));
//计算得出通知验证结果
$alipayNotify = new AlipayNotify($aliapy_config);
$verify_result = $alipayNotify->verifyReturn();
if($verify_result) {//验证成功
	$out_trade_no	= $_GET['out_trade_no'];	//获取订单号
	$trade_no		= $_GET['trade_no'];		//获取支付宝交易号
	$total_fee		= $_GET['total_fee'];		//获取总价格

	if($_GET['trade_status'] == 'TRADE_FINISHED' || $_GET['trade_status'] == 'TRADE_SUCCESS') {
		$r6_Order=$out_trade_no;
		$r3_Amt=$total_fee;
		$r2_TrxId=$trade_no;
		deal();
	}
	else {
		//echo "trade_status=".$_GET['trade_status'];
	}
}
else {
	//验证失败
	//如要调试，请看alipay_notify.php页面的verifyReturn函数，比对sign和mysign的值是否相等，或者检查$responseTxt有没有返回true
	echo "验证失败";
}

include('../../include/footer.inc.php');