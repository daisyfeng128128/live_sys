<?php 
header("Expires: Mon, 26 Jul 1970 05:00:00 GMT");      
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");      
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Content-type: text/html; charset=utf-8");
include("../../include/header.inc.php");
$user=checklogin();
if(!$user){
	exit('请先登录');
}
$money=(int)$_GET['p3_Amt'];
$channel=(int)$_GET['paychannel'];
$ifid=$_GET['ifid'];
$reduce=1;
if($channel==1){//银行
	$reduce=BANK_REDUCE;
}
else if($channel==3){//骏网
	$reduce=JUN_REDUCE;
}
else if($channel==4){//移动
	$reduce=YD_REDUCE;
}
else if($channel==5){//联通
	$reduce=LT_REDUCE;
}
$balanceadd=$money*RMB_XNB*$reduce;
$agentid=(int)$_GET['agentid'];
$chooseuserid=(int)$_GET['chooseuserid'];
$db->Execute("insert into orders(adddate,money,userid,status,paychannel,balanceadd,agentid,lastupdate,chooseuserid) values('".date('Ymd')."','$money','$user[userid]','0','$channel','$balanceadd','$agentid','".time()."','$chooseuserid')");
$orderid=$db->Insert_ID();


$_TransID=sprintf("%s%05d",date(Ymd),$orderid);//流水号
$_PayID=$ifid;//支付方式
$_TradeDate=date("YmdHis");//交易时间
$_OrderMoney=$money*100;
$_ProductName=$_REQUEST['p5_Pid'];//产品名称
$_Amount='1';//数量
$_Username=$user['nickname'];//支付用户名
$_NoticeType=0;
$_Md5Sign=md5($_MerchantID.$_PayID.$_TradeDate.$_TransID.$_OrderMoney.$_Merchant_url.$_Return_url.$_NoticeType.$_Md5Key);
if(empty($_ProductName))
	$_ProductName = $_TransID;
//此处加入判断，如果前面出错了跳转到其他地方而不要进行提交
include '../../include/footer.inc.php';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>自动处理提交页</title>
</head>

<body onload="document.form1.submit()">
<form id="form1" name="form1" method="post" action="alipayapi.php">
        <input type='hidden' name='WIDseller_email' value="<?php echo $aliapy_config['seller_email']; ?>" />
        <input type='hidden' name='WIDout_trade_no' value="<?php echo $_TransID; ?>" />
        <input type='hidden' name='WIDsubject' value="<?php echo $page_var['site_name']."充值"; ?>" />
        <input type='hidden' name='WIDtotal_fee' value="<?php echo $money; ?>" />
        <input type='hidden' name='WIDbody' value="<?php echo $page_var['site_name']."充值"; ?>" />
        <input type='hidden' name='WIDdefaultbank' value="<?php echo $_PayID;//默认网银 ?>" />
        <input type='hidden' name='WIDshow_url' value="<?php echo "http://"._MAIN_DOMAIN_; //商品展示地址?>" />
</form>
</body>
</html>
