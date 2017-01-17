<?php
date_default_timezone_set('PRC');
file_put_contents(("data/notify_url.".date("YmdHis").".".rand(1, 100)), json_encode($_REQUEST));
include '../../include/header.inc.php';
$payResult      =    $_GET[payResult];   //*取出支付结果
$key			=    $kuaqian_kq_key; //* 商户密钥
//      核对签名是否正确 ==============  开始 =================
function kq_ck_null($kq_va,$kq_na){if($kq_va == ""){return $kq_va="";}else{return $kq_va=$kq_na.'='.$kq_va.'&';}}
$kq_check_all_para=kq_ck_null($_GET[merchantAcctId],'merchantAcctId').kq_ck_null($_GET[version],'version').kq_ck_null($_GET[language],'language').kq_ck_null($_GET[signType],'signType').kq_ck_null($_GET[payType],'payType').kq_ck_null($_GET[bankId],'bankId').kq_ck_null($_GET[orderId],'orderId').kq_ck_null($_GET[orderTime],'orderTime').kq_ck_null($_GET[orderAmount],'orderAmount').kq_ck_null($_GET[dealId],'dealId').kq_ck_null($_GET[bankDealId],'bankDealId').kq_ck_null($_GET[dealTime],'dealTime').kq_ck_null($_GET[payAmount],'payAmount').kq_ck_null($_GET[fee],'fee').kq_ck_null($_GET[ext1],'ext1').kq_ck_null($_GET[ext2],'ext2').kq_ck_null($_GET[payResult],'payResult').kq_ck_null($_GET[errCode],'errCode');

//      核对签名是否正确 ==============  结束 =================
$o_sign=$_GET[signMsg];
$n_sign=strtoupper(md5($kq_check_all_para.'key='.$key));
echo 'Original signMsg: '.$o_sign;
echo '<BR>Check signMsg: '.$n_sign;
echo '<BR><BR>';

if($n_sign==strtoupper($o_sign)){
	switch($payResult){
		  case "10":
			/* 
			' 商户网站逻辑处理，比方更新订单支付状态为成功
			' 特别注意：只有strtoupper($signMsg)==strtoupper($merchantSignMsg)，且payResult=10，才表示支付成功！
			*/
			
			//报告给快钱处理结果，并提供将要重定向的地址。
				$rtnOk=1;
				$rtnUrl="http://www.yoursite.com/show.php?msg=success!";
				payOrdersDeal($_GET[orderId],($_GET[orderAmount]/100),$_GET[orderId]);
				break;
		  
		    default:

			$rtnOk=1;
			$rtnUrl="http://www.yoursite.com/show.php?msg=false!";
			break;
	}

}Else{
	$rtnOk=1;
	$rtnUrl="http://www.yoursite.com/show.php?msg=error!";
}
include('../../include/footer.inc.php');
?>
<result><?php  echo $rtnOk?></result><redirecturl><?php  echo $rtnUrl?></redirecturl>