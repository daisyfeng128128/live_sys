<?php
header("Content-type: text/html; charset=utf-8");
include '../../include/header.inc.php';
$user=checklogin();
if(!$user){
	exit('请先登录');
}
$money=(int)$_GET['p3_Amt'];
$channel=(int)$_GET['paychannel'];
$reduce=1;
$balanceadd=$money*RMB_XNB*$reduce;
$orderid=payInsertOrders($user,$money,$channel,$balanceadd);

require("helper.php");

$bankCode = $_REQUEST['pd_FrpId'];
$orderNo = sprintf("%s%05d",date(Ymd),$orderid);
$orderAmount = $money;
$productName = $page_var['site_name'].'充值';
$productNum = 1;
$referer = REQ_REFERER;
$customerIp = getClientIp();
$customerPhone = $_POST[AppConstants::$CUSTOMER_PHONE];
$receiveAddr = $_POST[AppConstants::$RECEIVE_ADDRESS];
$returnParams = $_POST[AppConstants::$RETURN_PARAMS];
$currentDate = date(DATE_TIME_FORMAT);

$kvs = new KeyValues();
$kvs->add(AppConstants::$INPUT_CHARSET, CHARSET);
$kvs->add(AppConstants::$NOTIFY_URL, BACK_NOTIFY_URL);
$kvs->add(AppConstants::$RETURN_URL, PAGE_NOTIFY_URL);
$kvs->add(AppConstants::$PAY_TYPE, PAY_TYPE);
$kvs->add(AppConstants::$BANK_CODE, $bankCode);
$kvs->add(AppConstants::$MERCHANT_CODE, MER_NO);
$kvs->add(AppConstants::$ORDER_NO, $orderNo);
$kvs->add(AppConstants::$ORDER_AMOUNT, $orderAmount);
$kvs->add(AppConstants::$ORDER_TIME, $currentDate);
$kvs->add(AppConstants::$PRODUCT_NAME, $productName);
$kvs->add(AppConstants::$PRODUCT_NUM, $productNum);
$kvs->add(AppConstants::$REQ_REFERER, $referer);
$kvs->add(AppConstants::$CUSTOMER_IP, $customerIp);
$kvs->add(AppConstants::$CUSTOMER_PHONE, $customerPhone);
$kvs->add(AppConstants::$RECEIVE_ADDRESS, $receiveAddr);
$kvs->add(AppConstants::$RETURN_PARAMS, $returnParams);

$sign = $kvs->sign();

$gatewayUrl = GATEWAY_URL;
URLUtils::appendParam($gatewayUrl, AppConstants::$INPUT_CHARSET, CHARSET, false);
URLUtils::appendParam($gatewayUrl, AppConstants::$NOTIFY_URL, BACK_NOTIFY_URL, true, CHARSET);
URLUtils::appendParam($gatewayUrl, AppConstants::$RETURN_URL, PAGE_NOTIFY_URL, true, CHARSET);
URLUtils::appendParam($gatewayUrl, AppConstants::$PAY_TYPE, PAY_TYPE);
URLUtils::appendParam($gatewayUrl, AppConstants::$BANK_CODE, $bankCode);
URLUtils::appendParam($gatewayUrl, AppConstants::$MERCHANT_CODE, MER_NO);
URLUtils::appendParam($gatewayUrl, AppConstants::$ORDER_NO, $orderNo);
URLUtils::appendParam($gatewayUrl, AppConstants::$ORDER_AMOUNT, $orderAmount);
URLUtils::appendParam($gatewayUrl, AppConstants::$ORDER_TIME, $currentDate);
URLUtils::appendParam($gatewayUrl, AppConstants::$PRODUCT_NAME, $productName, true, CHARSET);
URLUtils::appendParam($gatewayUrl, AppConstants::$PRODUCT_NUM, $productNum);
URLUtils::appendParam($gatewayUrl, AppConstants::$REQ_REFERER, $referer, true, CHARSET);
URLUtils::appendParam($gatewayUrl, AppConstants::$CUSTOMER_IP, $customerIp);
URLUtils::appendParam($gatewayUrl, AppConstants::$CUSTOMER_PHONE, $customerPhone);
URLUtils::appendParam($gatewayUrl, AppConstants::$RECEIVE_ADDRESS, $receiveAddr, true, CHARSET);
URLUtils::appendParam($gatewayUrl, AppConstants::$RETURN_PARAMS, $returnParams, true, CHARSET);
URLUtils::appendParam($gatewayUrl, AppConstants::$SIGN, $sign);

//http_redirect($gatewayUrl);
include($app_path.'include/footer.inc.php');
?>
<!DOCTYPE html>
<html>
<head>
    <title>网关支付</title>
</head>
<body>
    <form action="<?php echo GATEWAY_URL?>" method="post">
        <input type="hidden" name="<?php echo AppConstants::$INPUT_CHARSET?>" value="<?php echo CHARSET?>"/>
        <input type="hidden" name="<?php echo AppConstants::$NOTIFY_URL?>" value="<?php echo BACK_NOTIFY_URL?>"/>
        <input type="hidden" name="<?php echo AppConstants::$RETURN_URL?>" value="<?php echo PAGE_NOTIFY_URL?>"/>
        <input type="hidden" name="<?php echo AppConstants::$PAY_TYPE?>" value="<?php echo PAY_TYPE?>"/>
        <input type="hidden" name="<?php echo AppConstants::$BANK_CODE?>" value="<?php echo $bankCode?>"/>
        <input type="hidden" name="<?php echo AppConstants::$MERCHANT_CODE?>" value="<?php echo MER_NO?>"/>
        <input type="hidden" name="<?php echo AppConstants::$ORDER_NO?>" value="<?php echo $orderNo?>"/>
        <input type="hidden" name="<?php echo AppConstants::$ORDER_AMOUNT?>" value="<?php echo $orderAmount?>"/>
        <input type="hidden" name="<?php echo AppConstants::$ORDER_TIME?>" value="<?php echo $currentDate?>"/>
        <input type="hidden" name="<?php echo AppConstants::$PRODUCT_NAME?>" value="<?php echo $productName?>"/>
        <input type="hidden" name="<?php echo AppConstants::$PRODUCT_NUM?>" value="<?php echo $productNum?>"/>
        <input type="hidden" name="<?php echo AppConstants::$REQ_REFERER?>" value="<?php echo $referer?>"/>
        <input type="hidden" name="<?php echo AppConstants::$CUSTOMER_IP?>" value="<?php echo $customerIp?>"/>
        <input type="hidden" name="<?php echo AppConstants::$CUSTOMER_PHONE?>" value="<?php echo $customerPhone?>"/>
        <input type="hidden" name="<?php echo AppConstants::$RECEIVE_ADDRESS?>" value="<?php echo $receiveAddr?>"/>
        <input type="hidden" name="<?php echo AppConstants::$RETURN_PARAMS?>" value="<?php echo $returnParams?>"/>
        <input type="hidden" name="<?php echo AppConstants::$SIGN?>" value="<?php echo $sign?>"/>
    </form>
    <script type="text/javascript">
        document.forms[0].submit();
    </script>
</body>
</html>