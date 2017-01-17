<?php
date_default_timezone_set('PRC');
file_put_contents(("data/return_url.".date("YmdHis").".".rand(1, 100)), json_encode($_REQUEST));
include '../../include/header.inc.php';
$payResult      =    $_GET[payResult];   //*取出支付结果
$key			=    $kuaqian_kq_key; //* 商户密钥
//      核对签名是否正确 ==============  开始 =================
function kq_ck_null($kq_va,$kq_na){if($kq_va == ""){return $kq_va="";}else{return $kq_va=$kq_na.'='.$kq_va.'&';}}
$kq_check_all_para=kq_ck_null($_GET[merchantAcctId],'merchantAcctId').kq_ck_null($_GET[version],'version').kq_ck_null($_GET[language],'language').kq_ck_null($_GET[signType],'signType').kq_ck_null($_GET[payType],'payType').kq_ck_null($_GET[bankId],'bankId').kq_ck_null($_GET[orderId],'orderId').kq_ck_null($_GET[orderTime],'orderTime').kq_ck_null($_GET[orderAmount],'orderAmount').kq_ck_null($_GET[dealId],'dealId').kq_ck_null($_GET[bankDealId],'bankDealId').kq_ck_null($_GET[dealTime],'dealTime').kq_ck_null($_GET[payAmount],'payAmount').kq_ck_null($_GET[fee],'fee').kq_ck_null($_GET[ext1],'ext1').kq_ck_null($_GET[ext2],'ext2').kq_ck_null($_GET[payResult],'payResult').kq_ck_null($_GET[errCode],'errCode');

//      核对签名是否正确 ==============  结束 =================
$o_sign=$_GET[signMsg];
$n_sign=strtoupper(md5($kq_check_all_para.'key='.$key));
$showres = false;
if($n_sign==strtoupper($o_sign)){
	switch($payResult){
		  case "10":
			/* 
			' 商户网站逻辑处理，比方更新订单支付状态为成功
			' 特别注意：只有strtoupper($signMsg)==strtoupper($merchantSignMsg)，且payResult=10，才表示支付成功！
			*/
				$showres = true;
				payOrdersDeal($_GET[orderId],($_GET[orderAmount]/100),$_GET[orderId]);
				break;
	}

}
include('../../include/footer.inc.php');
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