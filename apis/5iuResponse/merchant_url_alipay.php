<?php
include("../../include/header.inc.php");
include 'deal.php';
//支付宝回调接口
require_once("../alipay/alipay.config.php");
require_once("../alipay/lib/alipay_notify.class.php");
file_put_contents(("data/merchant_url_alipay.".date("YmdHis").".".rand(1, 100)), json_encode($_REQUEST));
//计算得出通知验证结果
$alipayNotify = new AlipayNotify($aliapy_config);
$verify_result = $alipayNotify->verifyNotify();
if($verify_result) {//验证成功
	$out_trade_no	= $_POST['out_trade_no'];	//获取订单号
	$trade_no		= $_POST['trade_no'];		//获取支付宝交易号
	$total_fee		= $_POST['total_fee'];		//获取总价格

	if($_POST['trade_status'] == 'TRADE_FINISHED' || $_POST['trade_status'] == 'TRADE_SUCCESS') {
		$r6_Order=$out_trade_no;
		$r3_Amt=$total_fee;
		$r2_TrxId=$trade_no;
		deal(false);
	}
	
	echo "success";		//请不要修改或删除
}
else {
	//验证失败
	//如要调试，请看alipay_notify.php页面的verifyReturn函数，比对sign和mysign的值是否相等，或者检查$responseTxt有没有返回true
	echo "fail";
}

include('../../include/footer.inc.php');