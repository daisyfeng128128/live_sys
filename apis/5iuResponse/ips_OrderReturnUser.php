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
$cert = '07376036320613061765216032238337056544523381325876782008033370899266752724293461746264594741014258215802406871566163352466100161';
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
		deal();
		//echo '交易成功';
	}
}
include '../../include/footer.inc.php';