<?php
//此文件放到有支付权限的域名下
header("Cache-Control: no-cache");
header("Pragma: no-cache");
header("Content-Type:text/html;Charset=utf-8");
error_reporting(0);


$Mer_code        = $_REQUEST['Mer_code'];        //商户ID
$Billno          = $_REQUEST['Billno'];            //订单号
$Amount          = $_REQUEST['Amount'];            //订单金额。
$Date            = $_REQUEST['Date'];            //订单日期
$Currency_Type   = $_REQUEST['Currency_Type'];    //币种
$Gateway_Type    = $_REQUEST['Gateway_Type'];    //支付卡种
$Lang            = $_REQUEST['Lang'];            //语言
$Merchanturl     = $_REQUEST['Merchanturl'];        //支付结果成功返回的商户URL
$FailUrl         = $_REQUEST['FailUrl'];        //支付结果失败返回的商户URL
$Attach          = $_REQUEST['Attach'];            //商户数据包 
$OrderEncodeType = $_REQUEST['OrderEncodeType'];    //订单支付接口加密方式
$RetEncodeType   = $_REQUEST['RetEncodeType'];        //交易返回接口加密方式
$Rettype         = $_REQUEST['Rettype'];            //返回方式
$ServerUrl       = $_REQUEST['ServerUrl'];        //Server  to Server 返回页面
$Bankco       = $_REQUEST['Bankco'];        //哪个银行
$SignMD5         = $_REQUEST['SignMD5'];            //订单支付接口的Md5摘要

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>自动处理提交页</title>
</head>

<body onload="document.form1.submit()">

<form name=form1 method="post" action="https://pay.ips.com.cn/ipayment.aspx">
    <input type=hidden name="Mer_code" value="<?php echo $Mer_code; ?>" />
    <input type=hidden name="Billno" value="<?php echo $Billno; ?>" />
    <input type=hidden name="Amount" value="<?php echo $Amount; ?>" />
    <input type=hidden name="Date" value="<?php echo $Date; ?>" />
    <input type=hidden name="Currency_Type" value="<?php echo $Currency_Type; ?>" />
    <input type=hidden name="Gateway_Type" value="<?php echo $Gateway_Type; ?>" />
    <input type=hidden name="Lang" value="<?php echo $Lang; ?>" />
    <input type=hidden name="Merchanturl" value="<?php echo $Merchanturl; ?>" />
    <input type=hidden name="FailUrl" value="<?php echo $FailUrl; ?>" />
    <input type=hidden name="ErrorUrl" value="" />
    <input type=hidden name="Attach" value="<?php echo $Attach; ?>" />
	<input type=hidden name="DispAmount" value="" />
    <input type=hidden name="OrderEncodeType" value="<?php echo $OrderEncodeType; ?>" />
    <input type=hidden name="RetEncodeType" value="<?php echo $RetEncodeType; ?>" />
    <input type=hidden name="Rettype" value="<?php echo $Rettype; ?>" />
	<input type=hidden name="DoCredit" value="1" />
    <input type=hidden name="Bankco" value="<?php echo $Bankco; ?>" />
    <input type=hidden name="ServerUrl" value="<?php echo $ServerUrl; ?>" />
    <input type=hidden name="SignMD5" value="<?php echo $SignMD5; ?>" />

</form>

</body>
</html>