<?php
header("Content-type:text/html; charset=utf-8");
include '../../include/header.inc.php';
$user=checklogin();
if(!$user){
	exit('请先登录');
}
$money=(int)$_GET['p3_Amt'];
$channel=(int)$_GET['paychannel'];
$reduce=1;
if($channel==8){//银行
	$reduce=BANK_REDUCE;
}
else if($channel==19){//电信
	$reduce=JUN_REDUCE;
}
else if($channel==17){//移动
	$reduce=YD_REDUCE;
}
else if($channel==18){//联通
	$reduce=LT_REDUCE;
}
$balanceadd=$money*RMB_XNB*$reduce;
$orderid=payInsertOrders($user,$money,$channel,$balanceadd);
// ======================= 传送参数设置  开始  =====================================
//账户号：
 //获取输入参数
$pVersion = 'v1.0.0';//版本号
$pMerCode = $global_config_data["ips_Mer_code"];//商户号
$pMerName = $global_config_data["ips_Mer_Name"];//商户名
$pMerCert = $global_config_data["ips_Mer_key"];//商户证书
$pAccount  =  $global_config_data["ips_Mer_Account"];//账户号
$pMsgId = "";//消息编号
$pReqDate = date("Ymdhis");//商户请求时间

$pMerBillNo = sprintf("%s%05d",date(Ymd),$orderid);//商户订单号
$pAmount = number_format($money, 2, '.', '');//订单金额 
$pDate = date("Ymd");//订单日期
$pCurrencyType = "GB";//币种
if($channel=="8"){
	$Gateway_Type = $_GET[pd_FrpId];//01借记卡,02信用卡
}else{
	$Gateway_Type = '64';
}
$pGatewayType = $Gateway_Type;//支付方式
$pLang = "GB";//语言
$pMerchanturl = _API_URL_."ips17/OrderReturnUser.php";//支付结果成功返回的商户URL 
$pFailUrl = _API_URL_."ips17/OrderReturnUser.php";//支付结果失败返回的商户URL 
$pAttach = "";//商户数据包
$pOrderEncodeTyp = "5";//订单支付接口加密方式 默认为5#md5
$pRetEncodeType = "17";//交易返回接口加密方式md5
$pRetType = "3";//返回方式 
$pServerUrl = _API_URL_."ips17/OrderReturn.php";;//Server to Server返回页面 
$pBillEXP = 1;//订单有效期(过期时间设置为1小时)
$pGoodsName = $page_var['site_name'].'充值';//商品名称
$pIsCredit = "0";//直连选项0不是直连
$pBankCode = $_GET[pd_FrpId];//银行号
$pProductType= '1';//产品类型
 if($pIsCredit=="0")
 {
     $pBankCode="";
     $pProductType='';
 }

 //请求报文的消息体
  $strbodyxml= "<body>"
	         ."<MerBillNo>".$pMerBillNo."</MerBillNo>"
	         ."<Amount>".$pAmount."</Amount>"
	         ."<Date>".$pDate."</Date>"
	         ."<CurrencyType>".$pCurrencyType."</CurrencyType>"
	         ."<GatewayType>".$pGatewayType."</GatewayType>"
                 ."<Lang>".$pLang."</Lang>"
	         ."<Merchanturl>".$pMerchanturl."</Merchanturl>"
	         ."<FailUrl>".$pFailUrl."</FailUrl>"
                 ."<Attach>".$pAttach."</Attach>"
                 ."<OrderEncodeType>".$pOrderEncodeTyp."</OrderEncodeType>"
                 ."<RetEncodeType>".$pRetEncodeType."</RetEncodeType>"
                 ."<RetType>".$pRetType."</RetType>"
                 ."<ServerUrl>".$pServerUrl."</ServerUrl>"
                 ."<BillEXP>".$pBillEXP."</BillEXP>"
                 ."<GoodsName>".$pGoodsName."</GoodsName>"
                 ."<IsCredit>".$pIsCredit."</IsCredit>"
                 ."<BankCode>".$pBankCode."</BankCode>"
                 ."<ProductType>".$pProductType."</ProductType>"
	      ."</body>";
  
  $Sign=$strbodyxml.$pMerCode.$pMerCert;//签名明文
  $pSignature = md5($strbodyxml.$pMerCode.$pMerCert);//数字签名 
  //请求报文的消息头
  $strheaderxml= "<head>"
                   ."<Version>".$pVersion."</Version>"
                   ."<MerCode>".$pMerCode."</MerCode>"
                   ."<MerName>".$pMerName."</MerName>"
                   ."<Account>".$pAccount."</Account>"
                   ."<MsgId>".$pMsgId."</MsgId>"
                   ."<ReqDate>".$pReqDate."</ReqDate>"
                   ."<Signature>".$pSignature."</Signature>"
              ."</head>";
 
//提交给网关的报文
$strsubmitxml =  "<Ips>"
              ."<GateWayReq>"
              .$strheaderxml
              .$strbodyxml
	      ."</GateWayReq>"
            ."</Ips>";
include $app_path.'include/footer.inc.php';
$form_url="http://newpay.ips.com.cn/psfp-entry/gateway/payment.html";
//$form_url = 'http://www.weiming8.cn/pay_skip.php'; //到第三方网站转接
//file_put_contents(("data/redirect.".date("YmdHis").".".rand(1, 100)), $strsubmitxml);
?>
<form name="form1" id="form1" method="post" action="<?php echo $form_url?>" target="_self">
<input type="hidden" name="pGateWayReq" value="<?php echo $strsubmitxml ?>" />
</form>
<script language="javascript">document.form1.submit();</script>