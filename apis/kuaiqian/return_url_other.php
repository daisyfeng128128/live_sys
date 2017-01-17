<?PHP
date_default_timezone_set('PRC');
file_put_contents(("data/return_url_other.".date("YmdHis").".".rand(1, 100)), json_encode($_REQUEST));
include '../../include/header.inc.php';
/*
 * @Description: 快钱神州行支付网关接口范例
 * @Copyright (c) 上海快钱信息服务有限公司
 * @version 2.0
 */


//获取神州行网关账户号
$merchantAcctId=trim($_REQUEST['merchantAcctId']);

//设置神州行网关密钥
///区分大小写
$receiveBossType=trim($_REQUEST['receiveBossType']);
if($receiveBossType=="0"){//神州行充值卡
	$key=$kuaqian_kq_arr["4"]["key"];
}elseif($receiveBossType=="1"){//中国联通充值卡
	$key=$kuaqian_kq_arr["5"]["key"];
}elseif($receiveBossType=="4"){//骏网
	$key=$kuaqian_kq_arr["3"]["key"];
}

//获取网关版本.固定值
///本代码版本号固定为v2.0
$version=trim($_REQUEST['version']);

//获取语言种类.固定选择值。
///只能选择1、2
///1代表中文；2代表英文
$language=trim($_REQUEST['language']);

//获取支付方式
///可选择00、41、42、52
///00 代表快钱默认支付方式，目前为神州行卡密支付和快钱账户支付；41 代表快钱账户支付；42 代表神州行卡密支付和快钱账户支付；52 代表神州行卡密支付
$payType=trim($_REQUEST['payType']);

//神州行卡序号
///如果通过神州行卡直接支付时返回
$cardNumber=trim($_REQUEST['cardNumber']);

//获取神州行卡密码
///如果通过神州行卡直接支付时返回
$cardPwd=trim($_REQUEST['cardPwd']);

//获取商户订单号
$orderId=trim($_REQUEST['orderId']);


//获取原始订单金额
///订单提交到快钱时的金额，单位为分。
///比方2 ，代表0.02元
$orderAmount=trim($_REQUEST['orderAmount']);

//获取快钱交易号
///获取该交易在快钱的交易号
$dealId=trim($_REQUEST['dealId']);


//获取商户提交订单时的时间
///14位数字。年[4位]月[2位]日[2位]时[2位]分[2位]秒[2位]
///如：20080101010101
$orderTime=trim($_REQUEST['orderTime']);

//获取扩展字段1
///与商户提交订单时的扩展字段1保持一致
$ext1=trim($_REQUEST['ext1']);

//获取扩展字段2
///与商户提交订单时的扩展字段2保持一致
$ext2=trim($_REQUEST['ext2']);

//获取实际支付金额
///单位为分
///比方 2 ，代表0.02元
$payAmount=trim($_REQUEST['payAmount']);

//获取快钱处理时间
$billOrderTime=trim($_REQUEST['billOrderTime']);

//获取处理结果
///10代表支付成功； 11代表支付失败
$payResult=trim($_REQUEST['payResult']);
$bossType=trim($_REQUEST['bossType']);
$receiveBossType=trim($_REQUEST['receiveBossType']);
$receiverAcctId=trim($_REQUEST['receiverAcctId']);

//获取签名类型
///1代表MD5签名
///当前版本固定为1
$signType=trim($_REQUEST['signType']);

//获取加密签名串
$signMsg=trim($_REQUEST['signMsg']);
//echo 'signMsg='.$signMsg.'<br/>';





//生成加密串。必须保持如下顺序。
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"merchantAcctId",$merchantAcctId);
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"version",$version);
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"language",$language);
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"payType",$payType);
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"cardNumber",$cardNumber);
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"cardPwd",$cardPwd);
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"orderId",$orderId);
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"orderAmount",$orderAmount);
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"dealId",$dealId);
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"orderTime",$orderTime);
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"ext1",$ext1);
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"ext2",$ext2);	
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"payAmount",$payAmount);
    $merchantSignMsgVal=appendParam($merchantSignMsgVal,"billOrderTime",$billOrderTime);
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"payResult",$payResult);
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"signType",$signType);
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"bossType",$bossType);
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"receiveBossType",$receiveBossType);
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"receiverAcctId",$receiverAcctId);
	$merchantSignMsgVal=appendParam($merchantSignMsgVal,"key",$key);
	
    $merchantSignMsg= md5($merchantSignMsgVal);
	//echo '$merchantSignMsg='.$merchantSignMsg.'<br/>';


//初始化结果及地址
$rtnOk=0;
$rtnUrl="";
$showres = false;
//商家进行数据处理，并跳转会商家显示支付结果的页面
///首先进行签名字符串验证
if(strtoupper($signMsg)==strtoupper($merchantSignMsg)){

	switch($payResult){
		  
		  case "10":
			
			/* 
			// 商户网站逻辑处理，比方更新订单支付状态为成功
			// 特别注意：只有strtoupper($signMsg)==strtoupper($merchantSignMsg)，且payResult=10，才表示支付成功！
			*/
			payOrdersDeal($_GET[orderId],($_GET[orderAmount]/100),$_GET[orderId]);
			//报告给快钱处理结果，并提供将要重定向的地址。
			$rtnOk=1;
			$rtnUrl="http://219.233.173.50:8802/ouliang/shenzhouxing/show.php?msg=success";
			$showres = true;
			break;
		  
		  default:
			$rtnOk=1;
			$rtnUrl="http://219.233.173.50:8802/ouliang/shenzhouxing/show.php?msg=false";

			break;
	}

}Else{

	$rtnOk=1;
	$rtnUrl="http://219.233.173.50:8802/ouliang/shenzhouxing/show.php?msg=error";

} 





	//功能函数。将变量值不为空参数组成字符串
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
	//功能函数。将变量值不为空参数组成字符串。结束


//以下报告给快钱处理结果，并提供将要重定向的地址
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