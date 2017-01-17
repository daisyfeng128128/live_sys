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
$_GET['p3_Amt']==30000?0.01:(int)$_GET['p3_Amt'];
$channel=(int)$_GET['paychannel'];
$reduce=1;
$balanceadd=$money*RMB_XNB*$reduce;
$orderid=WxPayConfig::MCHID.date("YmdHisu");
$money=$_GET['p3_Amt'];
echo $money;
global $db;
$sql="insert into bu_gift_details(createDT,moneys,userId,status,type,orderId,tradeStatus) values('".date('Y-m-d H:i:s')."','$money','$user[userid]','1','0','$orderid',0)";
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

//模式二
/**
 * 流程：
 * 1、调用统一下单，取得code_url，生成二维码
 * 2、用户扫描二维码，进行支付
 * 3、支付完成之后，微信服务器会通知支付成功
 * 4、在支付成功通知中需要查单确认是否真正支付成功（见：notify.php）

$trade_no = sprintf("%s%05d",date(Ymd),$orderid);
$_GET["trade_no"] = $trade_no;
$input = new WxPayUnifiedOrder();
$input->SetBody($page_var['site_name'].'充值');
$input->SetAttach($page_var['site_name'].'充值');
$input->SetOut_trade_no($trade_no);
$input->SetTotal_fee($money);
$input->SetTime_start(date("YmdHis"));
$input->SetTime_expire(date("YmdHis", time() + 600));
$input->SetGoods_tag("充值");
$input->SetNotify_url(_API_URL_."Wxpay/example51543/notify.php");
$input->SetTrade_type("NATIVE");
$input->SetProduct_id("123456789");
$result = $notify->GetPayUrl($input);

$url2 = $result["code_url"];
*/
include $app_path.'include/footer.inc.php';
?>

<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>微信支付</title>
    <script src="/js/jquery.min.js" type="text/javascript"></script>
</head>
<body>
<!--div style="margin-left: 10px;color:#556B2F;font-size:30px;font-weight: bolder;">扫描支付模式一</div><br/>
	<img alt="模式一扫码支付" src="http://paysdk.weixin.qq.com/example/qrcode.php?data=<?php echo urlencode($url1);?>" style="width:150px;height:150px;"/>
	<br/><br/--><br/>
<div style="margin-left: 10px;color:#556B2F;font-size:30px;font-weight: bolder;">扫描支付</div><br/>
<img alt="模式一扫码支付" src="/apis/Wxpay/example51543/qrcode.php?data=<?php echo urlencode($url1);?>" style="width:150px;height:150px;"/>
<script>
    $(function(){
        payIsOk();
    });
    function payIsOk(){
        $.get("payIsOk.php?id=<?php echo $orderid;?>",function(obj){
            if(obj.code==200){
                window.location.href='payIsOkRes.php';
            }else{
                payIsOk();
            }
        },"json");
    }
</script>
</body>
</html>