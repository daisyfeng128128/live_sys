<?php 
date_default_timezone_set('PRC');
include '../../include/header.inc.php';
$user=checklogin();
if(!$user){
	exit('请先登录');
}
$money=(int)$_GET['p3_Amt'];
$channel=(int)$_GET['paychannel'];
$reduce=1;
if($channel==14){//原来是3
	$reduce=JUN_REDUCE;
}
else if($channel==12){//原来是4
	$reduce=YD_REDUCE;
}
else if($channel==13){//原来是5
	$reduce=LT_REDUCE;
}
$balanceadd=$money*RMB_XNB*$reduce;
$orderid=payInsertOrders($user,$money,$channel,$balanceadd);
//神州行网关账户号
///请与快钱技术联系索取
$merchantAcctId=$kuaqian_kq_arr[$channel]["id"];   //*  商家用户编号		(30)

//设置神州行网关密钥
///区分大小写
$key=$kuaqian_kq_arr[$channel]["key"];


//字符集.固定选择值。可为空。
///只能选择1、2、3、5
///1代表UTF-8; 2代表GBK; 3代表gb2312; 5 代表big5
///默认值为1
$inputCharset="1";

//服务器接受支付结果的后台地址.与[pageUrl]不能同时为空。必须是绝对地址。
///快钱通过服务器连接的方式将交易结果发送到[bgUrl]对应的页面地址，在商户处理完成后输出的<result>如果为1，页面会转向到<redirecturl>对应的地址。
///如果快钱未接收到<redirecturl>对应的地址，快钱将把支付结果GET到[pageUrl]对应的页面。

$bgUrl	    = _API_URL_."kuaiqian/return_url_other.php";	//   直接跳转页面	(256)
//接受支付结果的页面地址.与[bgUrl]不能同时为空。必须是绝对地址。
///如果[bgUrl]为空，快钱将支付结果GET到[pageUrl]对应的地址。
///如果[bgUrl]不为空，并且[bgUrl]页面指定的<redirecturl>地址不为空，则转向到<redirecturl>对应的地址.
$pageUrl			= _API_URL_."kuaiqian/notify_url_other.php";;	//   后台传送页面	(256)
	
//网关版本.固定值
///快钱会根据版本号来调用对应的接口处理程序。
///本代码版本号固定为v2.0
$version="v2.0";

//语言种类.固定选择值。
///只能选择1、2、3
///1代表中文；2代表英文
///默认值为1
$language="1";

//签名类型.固定值
///1代表MD5签名
///当前版本固定为1
$signType="1";

   
//支付人姓名
///可为中文或英文字符
$payerName="w";

//支付人联系方式类型.固定选择值
///只能选择1
///1代表Email
$payerContactType="1";

//支付人联系方式
///只能选择Email或手机号
$payerContact=$user["email"];

//商户订单号
///由字母、数字、或[-][_]组成
$orderId=sprintf("%s%05d",date(Ymd),$orderid);

//订单金额
///以分为单位，必须是整型数字
///比方2，代表0.02元
$orderAmount=$money*100;

//支付方式.固定选择值
///可选择00、41、42、52
///00 代表快钱默认支付方式，目前为神州行卡密支付和快钱账户支付；41 代表快钱账户支付；42 代表神州行卡密支付和快钱账户支付；52 代表神州行卡密支付
$payType="42";

//神州行卡序号
///仅在商户定制了神州行卡密直连功能时填写
$cardNumber="";

//神州行卡密码
///仅在商户定制了神州行卡密直连功能时填写
$cardPwd="";

//全额支付标志
///只能选择数字 0 或 1
///0代表非全额支付方式，支付完成后返回订单金额为商户提交的订单金额。如果预付费卡面额小于订单金额时，返回支付结果为失败；预付费卡面额大于或等于订单金额时，返回支付结果为成功；
///1 代表全额支付方式，支付完成后返回订单金额为用户预付费卡的面额。只要预付费卡销卡成功，返回支上海快钱信息服务有限公司 版权所有 第 6 页付结果都为成功。如果商户定制神州行卡密直连时，本参数固定值为1
$fullAmountFlag="0";

//订单提交时间
///14位数字。年[4位]月[2位]日[2位]时[2位]分[2位]秒[2位]
///如；20080101010101
$orderTime=date("YmdHis");

//商品名称
///可为中文或英文字符
$productName=$page_var['site_name'].'充值';

/**
0,神州行
1,联通
4,骏网
*/
if($channel==3){
	$bossType = "4";
}
else if($channel==4){
	$bossType = "0";
}
else if($channel==5){
	$bossType = "1";
}

//商品数量
///可为空，非空时必须为数字
$productNum="1";

//商品代码
///可为字符或者数字
$productId="";

//商品描述
$productDesc="";
	
//扩展字段1
///在支付结束后原样返回给商户
$ext1="";

//扩展字段2
///在支付结束后原样返回给商户
$ext2="";


	
//生成加密签名串
///请务必按照如下顺序和规则组成加密串！
	$signMsgVal=appendParam($signMsgVal,"inputCharset",$inputCharset);
	$signMsgVal=appendParam($signMsgVal,"bgUrl",$bgUrl);
	$signMsgVal=appendParam($signMsgVal,"pageUrl",$pageUrl);
	$signMsgVal=appendParam($signMsgVal,"version",$version);
	$signMsgVal=appendParam($signMsgVal,"language",$language);
	$signMsgVal=appendParam($signMsgVal,"signType",$signType);
	
	$signMsgVal=appendParam($signMsgVal,"merchantAcctId",$merchantAcctId);
	$signMsgVal=appendParam($signMsgVal,"payerName",urlencode($payerName));
	$signMsgVal=appendParam($signMsgVal,"payerContactType",$payerContactType);
	$signMsgVal=appendParam($signMsgVal,"payerContact",$payerContact);
	
	$signMsgVal=appendParam($signMsgVal,"orderId",$orderId);
	$signMsgVal=appendParam($signMsgVal,"orderAmount",$orderAmount);
	$signMsgVal=appendParam($signMsgVal,"payType",$payType);
	$signMsgVal=appendParam($signMsgVal,"cardNumber",$cardNumber);
	$signMsgVal=appendParam($signMsgVal,"cardPwd",$cardPwd);
	$signMsgVal=appendParam($signMsgVal,"fullAmountFlag",$fullAmountFlag);
	$signMsgVal=appendParam($signMsgVal,"orderTime",$orderTime);
	$signMsgVal=appendParam($signMsgVal,"productName",urlencode($productName));
	$signMsgVal=appendParam($signMsgVal,"productNum",$productNum);
	$signMsgVal=appendParam($signMsgVal,"productId",$productId);
	$signMsgVal=appendParam($signMsgVal,"productDesc",urlencode($productDesc));
	$signMsgVal=appendParam($signMsgVal,"ext1",urlencode($ext1));
	$signMsgVal=appendParam($signMsgVal,"ext2",urlencode($ext2));
	$signMsgVal=appendParam($signMsgVal,"bossType",urlencode($bossType));
	$signMsgVal=appendParam($signMsgVal,"key",$key);
$signMsg= strtoupper(md5($signMsgVal)); //安全校验域

 ?>
<?php 
	//功能函数。将变量值不为空的参数组成字符串
	Function appendParam($returnStr,$paramId,$paramValue){

		if($returnStr!=""){
			
				if($paramValue!=""){
					
					$returnStr.="&".$paramId."=".$paramValue;
				}
			
		}else{
		
			If($paramValue!=""){
				$returnStr=$paramId."=".$paramValue;
			}
		}
		
		return $returnStr;
	}
	//功能函数。将变量值不为空的参数组成字符串。结束
include '../../include/footer.inc.php';
?>
<html>
<head>
<title>To 99bill Page</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
</head>
<body onLoad="document.kuaiqian.submit();">
<form method=get action="https://www.99bill.com/szxgateway/recvMerchantInfoAction.htm" name="kuaiqian">
		<input type="hidden" name="inputCharset" value="<?php echo $inputCharset ; ?>">
		<input type="hidden" name="bgUrl" value="<?php echo $bgUrl ; ?>">
		<input type="hidden" name="pageUrl" value="<?php echo $pageUrl ; ?>">
		<input type="hidden" name="version" value="<?php echo $version ; ?>">
		<input type="hidden" name="language" value="<?php echo $language ; ?>">
		<input type="hidden" name="signType" value="<?php echo $signType ; ?>">			
		<input type="hidden" name="merchantAcctId" value="<?php echo $merchantAcctId ; ?>">
		<input type="hidden" name="payerName" value="<?php echo urlencode($payerName) ; ?>">
		<input type="hidden" name="payerContactType" value="<?php echo $payerContactType ; ?>">
		<input type="hidden" name="payerContact" value="<?php echo $payerContact ; ?>">
		<input type="hidden" name="orderId" value="<?php echo $orderId ; ?>">
		<input type="hidden" name="orderAmount" value="<?php echo $orderAmount ; ?>">
		<input type="hidden" name="payType" value="<?php echo $payType ; ?>">
		<input type="hidden" name="bossType" value="<?php echo $bossType ; ?>">
		<input type="hidden" name="cardNumber" value="<?php echo $cardNumber ; ?>">
		<input type="hidden" name="cardPwd" value="<?php echo $cardPwd ; ?>">
		<input type="hidden" name="fullAmountFlag" value="<?php echo $fullAmountFlag ; ?>">
		<input type="hidden" name="orderTime" value="<?php echo $orderTime ; ?>">
		<input type="hidden" name="productName" value="<?php echo urlencode($productName) ; ?>">
		<input type="hidden" name="productNum" value="<?php echo $productNum ; ?>">
		<input type="hidden" name="productId" value="<?php echo $productId ; ?>">
		<input type="hidden" name="productDesc" value="<?php echo urlencode($productDesc) ; ?>">
		<input type="hidden" name="ext1" value="<?php echo urlencode($ext1) ; ?>">
		<input type="hidden" name="ext2" value="<?php  echo urlencode($ext2) ; ?>">	
		<input type="hidden" name="signMsg" value="<?php echo $signMsg ; ?>">
		<input type="submit" value="SUBMIT" name="go_pay" style="font-size:32px;padding:10px;font-weight:bold;font-family:arail">
</form>
</body>
</html>