<?php
date_default_timezone_set('PRC');
file_put_contents(("data/OrderReturnUser.".date("YmdHis").".".rand(1, 100)), json_encode($_REQUEST));
include '../../include/header.inc.php';
include 'deal.php';
//----------------------------------------------------
//  接收数据
//  Receive the data
//----------------------------------------------------
$billno = $_REQUEST['billno'];
$amount = $_REQUEST['amount'];
$mydate = $_REQUEST['date'];
$succ = $_REQUEST['succ'];
$msg = $_REQUEST['msg'];
$attach = $_REQUEST['attach'];
$ipsbillno = $_REQUEST['ipsbillno'];
$retEncodeType = $_REQUEST['retencodetype'];
$currency_type = $_REQUEST['Currency_type'];
$signature = $_REQUEST['signature'];

//'----------------------------------------------------
//'   Md5摘要认证
//'   verify  md5
//'----------------------------------------------------

//RetEncodeType设置为17（MD5摘要数字签名方式）
//交易返回接口MD5摘要认证的明文信息如下：
//billno+【订单编号】+currencytype+【币种】+amount+【订单金额】+date+【订单日期】+succ+【成功标志】+ipsbillno+【IPS订单编号】+retencodetype +【交易返回签名方式】+【商户内部证书】
//例:(billno000001000123currencytypeRMBamount13.45date20031205succYipsbillnoNT2012082781196443retencodetype17GDgLwwdK270Qj1w4xho8lyTpRQZV9Jm5x4NwWOTThUa4fMhEBK9jOXFrKRT6xhlJuU2FEa89ov0ryyjfJuuPkcGzO5CeVx5ZIrkkt1aBlZV36ySvHOMcNv8rncRiy3DQ)

//返回参数的次序为：
//billno + mercode + amount + date + succ + msg + ipsbillno + Currecny_type + retencodetype + attach + signature + bankbillno
//注2：当RetEncodeType=17时，摘要内容已全转成小写字符，请在验证的时将您生成的Md5摘要先转成小写后再做比较
$content = 'billno'.$billno.'currencytype'.$currency_type.'amount'.$amount.'date'.$mydate.'succ'.$succ.'ipsbillno'.$ipsbillno.'retencodetype'.$retEncodeType;
//请在该字段中放置商户登陆merchant.ips.com.cn下载的证书
$cert = $global_config_data["ips_Mer_key"];
$signature_1ocal = md5($content . $cert);
$showres = false;
if ($signature_1ocal == $signature)
{
	//----------------------------------------------------
	//  判断交易是否成功
	//  See the successful flag of this transaction
	//----------------------------------------------------
	if ($succ == 'Y')
	{
		/**----------------------------------------------------
		*比较返回的订单号和金额与您数据库中的金额是否相符
		*compare the billno and amount from ips with the data recorded in your datebase
		*----------------------------------------------------
		
		if(不等)
			echo "从IPS返回的数据和本地记录的不符合，失败！"
			exit
		else
			'----------------------------------------------------
			'交易成功，处理您的数据库
			'The transaction is successful. update your database.
			'----------------------------------------------------
		end if
		**/
		$r6_Order = $billno;
		$r3_Amt = $amount;
		$r2_TrxId = $ipsbillno;
		$showres = true;
		payOrdersDeal($r6_Order,$r3_Amt,$r2_TrxId);
		//echo '交易成功';
	}
}
include '../../include/footer.inc.php';
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