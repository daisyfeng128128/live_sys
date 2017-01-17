<?php
date_default_timezone_set('PRC');
include '../../include/header.inc.php';
$user=checklogin();
if(!$user){
	exit('请先登录');
}
$money=(int)$_GET['p3_Amt'];
$channel=(int)$_GET['paychannel'];
$balanceadd=$money*RMB_XNB;
$orderid=payInsertOrders($user,$money,$channel,$balanceadd);
//****************************************
	$v_mid = CHINABANK_v_mid;								    // 商户号，这里为测试商户号1001，替换为自己的商户号(老版商户号为4位或5位,新版为8位)即可
	$v_url = CHINABANK_v_url;	// 请填写返回url,地址应为绝对路径,带有http协议
	$key   = CHINABANK_key;								    // 如果您还没有设置MD5密钥请登陆我们为您提供商户后台，地址：https://merchant3.chinabank.com.cn/
														// 登陆后在上面的导航栏里可能找到“资料管理”，在资料管理的二级导航栏里有“MD5密钥设置” 
														// 建议您设置一个16位以上的密钥或更高，密钥最多64位，但设置16位已经足够了
//****************************************


$v_oid = sprintf("%s%05d",date(Ymd),$orderid);
	$v_amount = $money;                   //支付金额                 
    $v_moneytype = "CNY";                                            //币种

	$text = $v_amount.$v_moneytype.$v_oid.$v_mid.$v_url.$key;        //md5加密拼凑串,注意顺序不能变
    $v_md5info = strtoupper(md5($text));                             //md5函数加密并转化成大写字母

	 $remark1 = trim($_POST['remark1']);						//备注字段1
	 $remark2 = "[url:=".CHINABANK_v_url_server."]"; 			//备注字段2,例如：<input  type="hidden"  name="remark2" value="[url:=http://domain/chinabank/AutoReceive.asp]">



	$v_rcvname   = trim($_POST['v_rcvname'])  ;		// 收货人
	$v_rcvaddr   = trim($_POST['v_rcvaddr'])  ;		// 收货地址
	$v_rcvtel    = trim($_POST['v_rcvtel'])   ;		// 收货人电话
	$v_rcvpost   = trim($_POST['v_rcvpost'])  ;		// 收货人邮编
	$v_rcvemail  = trim($_POST['v_rcvemail']) ;		// 收货人邮件
	$v_rcvmobile = trim($_POST['v_rcvmobile']);		// 收货人手机号

	$v_ordername   = trim($_POST['v_ordername'])  ;	// 订货人姓名
	$v_orderaddr   = trim($_POST['v_orderaddr'])  ;	// 订货人地址
	$v_ordertel    = trim($_POST['v_ordertel'])   ;	// 订货人电话
	$v_orderpost   = trim($_POST['v_orderpost'])  ;	// 订货人邮编
	$v_orderemail  = trim($_POST['v_orderemail']) ;	// 订货人邮件
	$v_ordermobile = trim($_POST['v_ordermobile']);	// 订货人手机号 
include '../../include/footer.inc.php'; 
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>chinabank pay</title>
</head>
<body onLoad="javascript:document.E_FORM.submit()">
<form method="post" name="E_FORM" action="https://pay3.chinabank.com.cn/PayGate">
	<input type="hidden" name="v_mid"         value="<?php echo $v_mid;?>">
	<input type="hidden" name="v_oid"         value="<?php echo $v_oid;?>">
	<input type="hidden" name="v_amount"      value="<?php echo $v_amount;?>">
	<input type="hidden" name="v_moneytype"   value="<?php echo $v_moneytype;?>">
	<input type="hidden" name="v_url"         value="<?php echo $v_url;?>">
	<input type="hidden" name="v_md5info"     value="<?php echo $v_md5info;?>">
<!--以下几项项为网上支付完成后，随支付反馈信息一同传给信息接收页 -->
	<input type="hidden" name="remark1"       value="<?php echo $remark1;?>">
	<input type="hidden" name="remark2"       value="<?php echo $remark2;?>">
<!--以下几项只是用来记录客户信息，可以不用，不影响支付 -->
	<input type="hidden" name="v_rcvname"      value="<?php echo $v_rcvname;?>">
	<input type="hidden" name="v_rcvtel"       value="<?php echo $v_rcvtel;?>">
	<input type="hidden" name="v_rcvpost"      value="<?php echo $v_rcvpost;?>">
	<input type="hidden" name="v_rcvaddr"      value="<?php echo $v_rcvaddr;?>">
	<input type="hidden" name="v_rcvemail"     value="<?php echo $v_rcvemail;?>">
	<input type="hidden" name="v_rcvmobile"    value="<?php echo $v_rcvmobile;?>">

	<input type="hidden" name="v_ordername"    value="<?php echo $v_ordername;?>">
	<input type="hidden" name="v_ordertel"     value="<?php echo $v_ordertel;?>">
	<input type="hidden" name="v_orderpost"    value="<?php echo $v_orderpost;?>">
	<input type="hidden" name="v_orderaddr"    value="<?php echo $v_orderaddr;?>">
	<input type="hidden" name="v_ordermobile"  value="<?php echo $v_ordermobile;?>">
	<input type="hidden" name="v_orderemail"   value="<?php echo $v_orderemail;?>">
</form>
</body>
</html>