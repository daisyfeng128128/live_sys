<?php
header("Content-type: text/html; charset=utf-8");
header("Expires: Mon, 26 Jul 1970 05:00:00 GMT");      
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");      
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
include("../../include/header.inc.php");

// $db->debug=true;
$from = substr($_POST[TransID], 0, 5);
$from2 = substr($_POST[TransID], 0, 2);
$db->Execute("insert into orders4(`from`,adddate,money,`status`,sid,Merchant_url,Return_url,more,lastupdate) ".
	"values('$from','".date('Ymd')."','$_POST[money]','0','$_POST[TransID]','$_POST[Merchant_url4]','$_POST[Return_url4]','".json_encode($_POST)."','".time()."')");
$tmp = $db->Affected_Rows();
if($tmp<=0){
	header("Content-Type: text/html; charset=UTF-8");
	echo "系统繁忙充值失败，请重新再试!";
	include('../../include/footer.inc.php');
	exit;
}
//支付宝付款
if($_POST["paychannel"]=="2"){
	require_once("../alipay/alipay.config.php");
	require_once("../alipay/lib/alipay_service.class.php");
	/**************************请求参数**************************/
	
	//必填参数//
	
	//请与贵网站订单系统中的唯一订单号匹配
	$out_trade_no = $_POST[TransID];
	//订单名称，显示在支付宝收银台里的“商品名称”里，显示在支付宝的交易管理的“商品名称”的列表里。
	$subject      = $from2."奇异果";
	//订单描述、订单详细、订单备注，显示在支付宝收银台里的“商品描述”里
	$body         = $from2."奇异果";
	//订单总金额，显示在支付宝收银台里的“应付总额”里
	$total_fee    = $_POST[money];
	
	
	
	//扩展功能参数——默认支付方式//
	
	//默认支付方式，取值见“即时到帐接口”技术文档中的请求参数列表
	$paymethod    = '';
	//默认网银代号，代号列表见“即时到帐接口”技术文档“附录”→“银行列表”
	$defaultbank  = '';
	
	
	//扩展功能参数——防钓鱼//
	
	//防钓鱼时间戳
	$anti_phishing_key  = '';
	//获取客户端的IP地址，建议：编写获取客户端IP地址的程序
	$exter_invoke_ip = '';
	//注意：
	//1.请慎重选择是否开启防钓鱼功能
	//2.exter_invoke_ip、anti_phishing_key一旦被使用过，那么它们就会成为必填参数
	//3.开启防钓鱼功能后，服务器、本机电脑必须支持SSL，请配置好该环境。
	//示例：
	//$exter_invoke_ip = '202.1.1.1';
	//$ali_service_timestamp = new AlipayService($aliapy_config);
	//$anti_phishing_key = $ali_service_timestamp->query_timestamp();//获取防钓鱼时间戳函数
	
	
	//扩展功能参数——其他//
	
	//商品展示地址，要用 http://格式的完整路径，不允许加?id=123这类自定义参数
	$show_url			= "http://"._MAIN_DOMAIN_;
	//自定义参数，可存放任何内容（除=、&等特殊字符外），不会显示在页面上
	$extra_common_param = '';
	
	//扩展功能参数——分润(若要使用，请按照注释要求的格式赋值)
	$royalty_type		= "";			//提成类型，该值为固定值：10，不需要修改
	$royalty_parameters	= "";
	//注意：
	//提成信息集，与需要结合商户网站自身情况动态获取每笔交易的各分润收款账号、各分润金额、各分润说明。最多只能设置10条
	//各分润金额的总和须小于等于total_fee
	//提成信息集格式为：收款方Email_1^金额1^备注1|收款方Email_2^金额2^备注2
	//示例：
	//royalty_type 		= "10"
	//royalty_parameters= "111@126.com^0.01^分润备注一|222@126.com^0.01^分润备注二"
	
	/************************************************************/
	
	//构造要请求的参数数组
	$parameter = array(
			"service"			=> "create_direct_pay_by_user",
			"payment_type"		=> "1",
	
			"partner"			=> trim($aliapy_config['partner']),
			"_input_charset"	=> trim(strtolower($aliapy_config['input_charset'])),
			"seller_email"		=> trim($aliapy_config['seller_email']),
			"return_url"		=> trim($_Return_url_alipay),
			"notify_url"		=> trim($_Merchant_url_alipay),
	
			"out_trade_no"		=> $out_trade_no,
			"subject"			=> $subject,
			"body"				=> $body,
			"total_fee"			=> $total_fee,
	
			"paymethod"			=> $paymethod,
			"defaultbank"		=> $defaultbank,
	
			"anti_phishing_key"	=> $anti_phishing_key,
			"exter_invoke_ip"	=> $exter_invoke_ip,
	
			"show_url"			=> $show_url,
			"extra_common_param"=> $extra_common_param,
	
			"royalty_type"		=> $royalty_type,
			"royalty_parameters"=> $royalty_parameters
	);
	
	//构造即时到帐接口
	$alipayService = new AlipayService($aliapy_config);
	$html_text = $alipayService->create_direct_pay_by_user($parameter);
	echo $html_text;
}else if(in_array($_POST["paychannel"],array("8","17","18","19"))){
	include "ips_redirect.php";
}else{//易宝付款
	include '../yee/yeepayCommon.php';
	
	//用户在用骏网等充值时会让用户出手续费，在这里算一下由商户承担[[与callback_yee.php文件中的修改要一致]]
	if($_POST[ifid]=="JUNNET-NET")//骏网手续费为1/3
		$_POST[money]*=0.75;
	else if($_POST[ifid]=="SZX-NET")//神州行20%
		$_POST[money]*=0.8;
	
	#	商家设置用户购买商品的支付信息.
	##易宝支付平台统一使用GBK/GB2312编码方式,参数如用到中文，请注意转码
	
	#	商户订单号,选填.
	##若不为""，提交的订单号必须在自身账户交易中唯一;为""时，易宝支付会自动生成随机的商户订单号.
	$p2_Order					= $_POST[TransID];
	
	#	支付金额,必填.
	##单位:元，精确到分.
	$p3_Amt						= $_POST[money];
	
	#	交易币种,固定值"CNY".
	$p4_Cur						= "CNY";
	
	#	商品名称
	##用于支付时显示在易宝支付网关左侧的订单产品信息.
	$p5_Pid						= $_REQUEST['p5_Pid'];
	
	#	商品种类
	$p6_Pcat					= "";
	
	#	商品描述
	$p7_Pdesc					= "";
	
	#	商户接收支付成功数据的地址,支付成功后易宝支付会向该地址发送两次成功通知.
	$p8_Url						= _API_URL_."5iuResponse/callback_yee.php";	
	
	#	商户扩展信息
	##商户可以任意填写1K 的字符串,支付成功时将原样返回.
	$pa_MP						= $_REQUEST['pa_MP'];
	
	#	支付通道编码
	##默认为""，到易宝支付网关.若不需显示易宝支付的页面，直接跳转到各银行、神州行支付、骏网一卡通等支付页面，该字段可依照附录:银行列表设置参数值.
	$pd_FrpId					= $_POST[ifid];
	
	#	应答机制
##默认为"1": 需要应答机制;
	$pr_NeedResponse	= "1";
	
	#调用签名函数生成签名串
	$hmac = getReqHmacString($p2_Order,$p3_Amt,$p4_Cur,$p5_Pid,$p6_Pcat,$p7_Pdesc,$p8_Url,$pa_MP,$pd_FrpId,$pr_NeedResponse);
?>
<html>
<head>
<title>To YeePay Page</title>
</head>
<body onLoad="document.yeepay.submit();">
<form name='yeepay' action='<?php echo $reqURL_onLine; ?>' method='post'>
<input type='hidden' name='p0_Cmd'					value='<?php echo $p0_Cmd; ?>'>
<input type='hidden' name='p1_MerId'				value='<?php echo $p1_MerId; ?>'>
<input type='hidden' name='p2_Order'				value='<?php echo $p2_Order; ?>'>
<input type='hidden' name='p3_Amt'					value='<?php echo $p3_Amt; ?>'>
<input type='hidden' name='p4_Cur'					value='<?php echo $p4_Cur; ?>'>
<input type='hidden' name='p5_Pid'					value='<?php echo $p5_Pid; ?>'>
<input type='hidden' name='p6_Pcat'					value='<?php echo $p6_Pcat; ?>'>
<input type='hidden' name='p7_Pdesc'				value='<?php echo $p7_Pdesc; ?>'>
<input type='hidden' name='p8_Url'					value='<?php echo $p8_Url; ?>'>
<input type='hidden' name='p9_SAF'					value='<?php echo $p9_SAF; ?>'>
<input type='hidden' name='pa_MP'						value='<?php echo $pa_MP; ?>'>
<input type='hidden' name='pd_FrpId'				value='<?php echo $pd_FrpId; ?>'>
<input type='hidden' name='pr_NeedResponse'	value='<?php echo $pr_NeedResponse; ?>'>
<input type='hidden' name='hmac'						value='<?php echo $hmac; ?>'>
</form>
</body>
</html>
<?php
}
include('../../include/footer.inc.php');
?>
