<?php
include("../../include/header.inc.php");
include 'deal.php';
//易宝回调接口
include '../yee/yeepayCommon.php';
file_put_contents(("data/callback_yee.".date("YmdHis").".".rand(1, 100)), json_encode($_REQUEST));
$return = getCallBackValue($r0_Cmd,$r1_Code,$r2_TrxId,$r3_Amt,$r4_Cur,$r5_Pid,$r6_Order,$r7_Uid,$r8_MP,$r9_BType,$hmac);
$bRet = CheckHmac($r0_Cmd,$r1_Code,$r2_TrxId,$r3_Amt,$r4_Cur,$r5_Pid,$r6_Order,$r7_Uid,$r8_MP,$r9_BType,$hmac);
if($bRet){
	if($r1_Code=="1"){
		if($r9_BType=="1"){
			deal();
		}elseif($r9_BType=="2"){
			deal();
		}
	}
	
}else{
	echo "交易信息被篡改";
}
include('../../include/footer.inc.php');