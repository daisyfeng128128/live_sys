<?php
date_default_timezone_set('PRC');
file_put_contents(("data/OrderReturnUser.".date("YmdHis").".".rand(1, 100)), json_encode($_REQUEST));
include '../../include/header.inc.php';
$paymentResult = $_POST["paymentResult"];//获取信息
$xml=simplexml_load_string($paymentResult,'SimpleXMLElement', LIBXML_NOCDATA);
  //读取相关xml中信息
   $ReferenceIDs = $xml->xpath("GateWayRsp/head/ReferenceID");//关联号
   //var_dump($ReferenceIDs); 
   $ReferenceID = $ReferenceIDs[0];//关联号
   $RspCodes = $xml->xpath("GateWayRsp/head/RspCode");//响应编码
   $RspCode=$RspCodes[0];
   $RspMsgs = $xml->xpath("GateWayRsp/head/RspMsg"); //响应说明
   $RspMsg=$RspMsgs[0];
   $ReqDates = $xml->xpath("GateWayRsp/head/ReqDate"); // 接受时间
    $ReqDate=$ReqDates[0];
   $RspDates = $xml->xpath("GateWayRsp/head/RspDate");// 响应时间
    $RspDate=$RspDates[0];
   $Signatures = $xml->xpath("GateWayRsp/head/Signature"); //数字签名
    $Signature=$Signatures[0];
   $MerBillNos = $xml->xpath("GateWayRsp/body/MerBillNo"); // 商户订单号
    $MerBillNo=$MerBillNos[0];
   $CurrencyTypes = $xml->xpath("GateWayRsp/body/CurrencyType");//币种
    $CurrencyType=$CurrencyTypes[0];
   $Amounts = $xml->xpath("GateWayRsp/body/Amount"); //订单金额
    $Amount=$Amounts[0];
   $Dates = $xml->xpath("GateWayRsp/body/Date");    //订单日期
    $Date=$Dates[0];
   $Statuss = $xml->xpath("GateWayRsp/body/Status");  //交易状态
    $Status=$Statuss[0];
   $Msgs = $xml->xpath("GateWayRsp/body/Msg");    //发卡行返回信息
    $Msg=$Msgs[0];
   $Attachs = $xml->xpath("GateWayRsp/body/Attach");    //数据包
    $Attach=$Attachs[0];
   $IpsBillNos = $xml->xpath("GateWayRsp/body/IpsBillNo"); //IPS订单号
    $IpsBillNo=$IpsBillNos[0];
   $IpsTradeNos = $xml->xpath("GateWayRsp/body/IpsTradeNo"); //IPS交易流水号
    $IpsTradeNo=$IpsTradeNos[0];
   $RetEncodeTypes = $xml->xpath("GateWayRsp/body/RetEncodeType");    //交易返回方式
    $RetEncodeType=$RetEncodeTypes[0];
   $BankBillNos = $xml->xpath("GateWayRsp/body/BankBillNo"); //银行订单号
    $BankBillNo=$BankBillNos[0];
   $ResultTypes = $xml->xpath("GateWayRsp/body/ResultType"); //支付返回方式
    $ResultType=$ResultTypes[0];
   $IpsBillTimes = $xml->xpath("GateWayRsp/body/IpsBillTime"); //IPS处理时间
    $IpsBillTime=$IpsBillTimes[0];

//验签明文
//billno+【订单编号】+currencytype+【币种】+amount+【订单金额】+date+【订单日期】+succ+【成功标志】+ipsbillno+【IPS订单编号】+retencodetype +【交易返回签名方式】+【商户内部证书】
 $sbReq = "<body>"
                          . "<MerBillNo>" . $MerBillNo . "</MerBillNo>"
                          . "<CurrencyType>" . $CurrencyType . "</CurrencyType>"
                          . "<Amount>" . $Amount . "</Amount>"
                          . "<Date>" . $Date . "</Date>"
                          . "<Status>" . $Status . "</Status>"
                          . "<Msg><![CDATA[" . $Msg . "]]></Msg>"
                          //. "<Attach><![CDATA[" . $Attach . "]]></Attach>"
                          . "<IpsBillNo>" . $IpsBillNo . "</IpsBillNo>"
                          . "<IpsTradeNo>" . $IpsTradeNo . "</IpsTradeNo>"
                          . "<RetEncodeType>" . $RetEncodeType . "</RetEncodeType>"
                          . "<BankBillNo>" . $BankBillNo . "</BankBillNo>"
                          . "<ResultType>" . $ResultType . "</ResultType>"
                          . "<IpsBillTime>" . $IpsBillTime . "</IpsBillTime>"
                       . "</body>";
$pmercode = $global_config_data["ips_Mer_code"];//商户号
$sign=$sbReq.$pmercode.$global_config_data["ips_Mer_key"];
$md5sign=  md5($sign);
$showres = false;
//判断签名
if($Signature==$md5sign){
	if($RspCode=='000000'){
		$r6_Order = $MerBillNo;
		$r3_Amt = $Amount;
		$r2_TrxId = $IpsBillNo;
		payOrdersDeal($r6_Order,$r3_Amt,$r2_TrxId);
		$showres = true;
    }
}
include $app_path.'include/footer.inc.php';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo $page_var['site_name']?>－美女主播、视频交友、美女视频、在线K歌</title>
<meta name="description" content="<?php echo $page_var['site_name']?>是超人气视频直播互动娱乐社区，在这里你可以展示自己的才艺，也可以跟众多优秀的美女主播在线互动聊天、视频交友" />
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
-->
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