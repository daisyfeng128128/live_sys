<?php
header("Content-type: text/html; charset=utf-8");
ini_set('date.timezone','Asia/Shanghai');

include '../../../include/header.inc.php';

//------------------
require_once "../lib/WxPay.Api.php";
require_once "WxPay.NativePay.php";
require_once 'log.php';
$user=checklogin();
if(!$user){
    include $app_path.'include/footer.inc.php';
    exit('请先登录');
}

$c=$_POST['p3_Amt'];
if($c=="30000"){
    $b="0.01";
}else{
    $b=$c;
}

function getHisutoString() {
    list($s1, $s2) = explode(' ', microtime());
    $str=(float)sprintf('%.0f', (floatval($s1) + floatval($s2)) * 1000);
    $haomiao=substr($str,-3,strlen($str));
    $miao=substr($str,0,-3);
    $time=date("YmdHis",$miao);
    return $time.$haomiao;
}
$_SESSION[dou]=$b*100;
$channel=(int)$_POST['paychannel'];
$reduce=1;
$balanceadd=$money*RMB_XNB*$reduce;
$orderid=getHisutoString().sprintf("%04d", rand(0,9999));
$consume =$b;;
$money=$_SESSION[dou];
global $db;
$sql="insert into bu_gift_details(createDT,consume,money,userId,touserId,status,type,orderId,tradeStatus,giftIds,numbers,topups) values('".date('Y-m-d H:i:s')."',$consume,'$money','$user[userId]','$user[userId]','1','0','$orderid',0,0,0,1)";
$db->Execute($sql);

//模式一
/**
 * 流程：
 * 1、组装包含支付信息的url，生成二维码
 * 2、用户扫描二维码，进行支付
 * 3、确定支付之后，微信服务器会回调预先配置的回调地址，在【微信开放平台-微信支付-支付配置】中进行配置
 * 4、在接到回调通知之后，用户进行统一下单支付，并返回支付信息以完成支付（见：native_notify.php）
 * 5、支付完成之后，微信服务器会通知支付成功
 * 6、在支付成功通知中需要查单确认是否真正支付成功（见：notify.php）
 */

$notify = new NativePay();
$url1 = $notify->GetPrePayUrl($orderid);//$url1 = $notify->GetPayUrl1("999",$money);
$url1=@$url1[short_url];
$arr=array();
$arr['src']=urlencode($url1);
$arr['orderid']=$orderid;
echo json_encode($arr);
exit();

include $app_path.'include/footer.inc.php';
?>
