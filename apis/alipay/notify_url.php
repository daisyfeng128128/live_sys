<?php
include '../../include/header.inc.php';
require_once("../../include/third_part_config.php");
require_once("alipay.config.php");
require_once("lib/alipay_notify.class.php");
file_put_contents(("data/notify.".date("YmdHis").rand(1, 100)), json_encode($_POST));
//计算得出通知验证结果
$alipayNotify = new AlipayNotify($aliapy_config);
$verify_result = $alipayNotify->verifyNotify();

if($verify_result) {//验证成功
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//请在这里加上商户的业务逻辑程序代
	
	//——请根据您的业务逻辑来编写程序（以下代码仅作参考）——
    //获取支付宝的通知返回参数，可参考技术文档中服务器异步通知参数列表
    $out_trade_no	= $_POST['out_trade_no'];	    //获取订单号
    $trade_no		= $_POST['trade_no'];	    	//获取支付宝交易号
    $total_fee		= $_POST['total_fee'];			//获取总价格

    if($_POST['trade_status'] == 'TRADE_FINISHED' || $_POST['trade_status'] == 'TRADE_SUCCESS') {
		$r6_Order=$out_trade_no;
		$r3_Amt=$total_fee;
		$r2_TrxId=$trade_no;
		payOrdersDeal($r6_Order,$r3_Amt,$r2_TrxId);
    }

	//——请根据您的业务逻辑来编写程序（以上代码仅作参考）——
	ob_end_clean();
	echo "success";//请不要修改或删除
	include('../../include/footer.inc.php');
	exit;
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
else {
    //验证失败
    echo "fail";
}
include('../../include/footer.inc.php');