<?php
header("Expires: Mon, 26 Jul 1970 05:00:00 GMT");      
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");      
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
include("../../include/header.inc.php");
$user=checklogin();
if(!$user){
	exit('请先登录');
}
$money=(int)$_GET['p3_Amt'];
$channel=(int)$_GET['paychannel'];
$ifid=$_GET['pd_FrpId'];
$reduce=1;
if($channel==1){//银行
	$reduce=BANK_REDUCE;
}
else if($channel==3|| $channel==19){//骏网
	$reduce=JUN_REDUCE;
}
else if($channel==4|| $channel==17){//移动
	$reduce=YD_REDUCE;
}
else if($channel==5|| $channel==18){//联通
	$reduce=LT_REDUCE;
}
else if($channel==2){//支付宝
	$reduce=ALI_REDUCE;
}
$balanceadd=$money*RMB_XNB*$reduce;
$orderid=payInsertOrders($user,$money,$channel,$balanceadd);
$_TransID=$_BaoFuSid4.sprintf("%s%05d",date(Ymd),$orderid);//流水号

// onload="document.form1.submit()"
//此处加入判断，如果前面出错了跳转到其他地方而不要进行提交
include '../../include/footer.inc.php';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>自动处理提交页</title>
</head>
<body onload="document.form1.submit()">
<form id="form1" name="form1" method="post" action="<?php echo $_TestBaoFuPost?>">
        <input type='hidden' name='paychannel' value="<?php echo $channel; ?>" />
        <input type='hidden' name='ifid' value="<?php echo $ifid; ?>"/>
        <input type='hidden' name='balanceadd' value="<?php echo $balanceadd; ?>" />
        <input type='hidden' name='money' value="<?php echo $money; ?>" />
        <input type='hidden' name='TransID' value="<?php echo $_TransID; ?>" />
        
        <input type='hidden' name='Merchant_url4' value="<?php echo $_Merchant_url4; ?>" />
        <input type='hidden' name='Return_url4' value="<?php echo $_Return_url4; ?>" />
</form>
</body>
</html>
