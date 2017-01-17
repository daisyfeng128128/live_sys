<?php
header("Content-type:text/html; charset=utf-8");
?>
<form name="form1" id="form1" method="post" action="http://newpay.ips.com.cn/psfp-entry/gateway/payment.html" target="_self">
<input type="hidden" name="pGateWayReq" value="<?php echo $_POST["pGateWayReq"] ?>" />
</form>
<script language="javascript">document.form1.submit();</script>