<?php
header("Content-type: text/html; charset=utf-8");
date_default_timezone_set('PRC');
file_put_contents(("data/payReturnNotify.".date("YmdHis").".".rand(1, 100)), json_encode($_REQUEST));
include '../../include/header.inc.php';

require("helper.php");


$merchantCode = $_GET[AppConstants::$MERCHANT_CODE];
$notifyType = $_GET[AppConstants::$NOTIFY_TYPE];
$orderNo = $_GET[AppConstants::$ORDER_NO];
$orderAmount = $_GET[AppConstants::$ORDER_AMOUNT];
$orderTime = $_GET[AppConstants::$ORDER_TIME];
$returnParams = $_GET[AppConstants::$RETURN_PARAMS];
$tradeNo = $_GET[AppConstants::$TRADE_NO];
$tradeTime = $_GET[AppConstants::$TRADE_TIME];
$tradeStatus = $_GET[AppConstants::$TRADE_STATUS];
$sign = $_GET[AppConstants::$SIGN];

$kvs = new KeyValues();
$kvs->add(AppConstants::$MERCHANT_CODE, $merchantCode);
$kvs->add(AppConstants::$NOTIFY_TYPE, $notifyType);
$kvs->add(AppConstants::$ORDER_NO, $orderNo);
$kvs->add(AppConstants::$ORDER_AMOUNT, $orderAmount);
$kvs->add(AppConstants::$ORDER_TIME, $orderTime);
$kvs->add(AppConstants::$RETURN_PARAMS, $returnParams);
$kvs->add(AppConstants::$TRADE_NO, $tradeNo);
$kvs->add(AppConstants::$TRADE_TIME, $tradeTime);
$kvs->add(AppConstants::$TRADE_STATUS, $tradeStatus);
$_sign = $kvs->sign();

if ($_sign == $sign)
{
    if ($tradeStatus == "success")
    {
        $tradeResult = "支付成功！success";
        //这个success字符串在支付成功的情况下必须填入，因为交易平台回调商户的后台通知地址后，会通过返回的内容中包含success来判别商户是否收到通知，并成功告知交易平台。
        //这个success字符串只有在商户后台通知时必须填写，页面通知可不填写。
		$r6_Order = $orderNo;
		$r3_Amt = $orderAmount;
		$r2_TrxId = $trade_no;
		$showres = true;
		payOrdersDeal($r6_Order,$r3_Amt,$r2_TrxId);
    }
    else
    {
        $tradeResult = "支付失败";
    }
}
else
{
    $tradeResult = "不合法数据";
}
echo $tradeResult;

include($app_path.'include/footer.inc.php');