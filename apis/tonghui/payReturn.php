<?php
header("Content-type: text/html; charset=utf-8");
date_default_timezone_set('PRC');
file_put_contents(("data/payReturn.".date("YmdHis").".".rand(1, 100)), json_encode($_REQUEST));
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
include($app_path.'include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo $page_var['site_name']?>－美女主播、视频交友、美女视频、在线K歌</title>
<meta name="description" content="<?php echo $page_var['site_name']?>是超人气视频直播互动娱乐社区，在这里你可以展示自己的才艺，也可以跟众多优秀的美女主播在线互动聊天、视频交友" />
<style type="text/css">
.noroom{ width:542px; margin:200px auto; background:url(/images/payseccess.gif) no-repeat; height:202px}
.txfont{  margin-left:150px;width:350px; line-height:40px; padding-top:80px}
.txfont a{ color:#F06}
</style>
</head>

<body>
<div class="noroom">
<div></div>
<div class="txfont"><?php if($showres):?>恭喜您支付成功！<?php else:?>支付失败！<?php endif;?><br />
  如果您的浏览器没有自动跳转，请<a href="/">点击这里</a></div>
</div>
</body>
</html>