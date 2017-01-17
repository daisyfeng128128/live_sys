<?php
function deal($f=true){
	global $r6_Order,$db,$r3_Amt,$r2_TrxId;
	
//用户在用骏网等充值时会让用户出手续费，在这里算一下由商户承担[与post4.php文件中的修改要一致]
if($_REQUEST['rb_BankId']=="JUNNET-NET"){
	$r3_Amt /= 0.75;
}else if($_REQUEST['rb_BankId']=="SZX-NET"){
	$r3_Amt /= 0.8;
}
	$get_order_sql = "select * from orders4 where sid='$r6_Order' FOR UPDATE";
	$db->StartTrans();
	$row=$db->GetRow($get_order_sql);
	if($row['money']==$r3_Amt){
		$db->Execute("update orders4 set status=1,more_blank='".json_encode($_REQUEST)."' where sid='$r6_Order'");
	}
	$db->CompleteTrans();
	$time = date("YmdHis");
	$Sign = md5(md5($r6_Order.$time));
	$post_string = "TransID=$r6_Order&money=$r3_Amt&time=$time&Sign=$Sign";
	if(!empty($row)){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $row["Return_url"]);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post_string);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$data = curl_exec($ch);
		curl_close($ch);
		if($f)
			echo $data;
		/* 
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $row["Merchant_url"]);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post_string);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$data = curl_exec($ch);
		curl_close($ch);
		echo $data;
		 */
	}
}
//b4b2ef292a18f4f9c30426b3505b457e,20130918144858
/*
$time = date("YmdHis");
echo md5(md5("168CU2013091802586".$time));
echo ",$time";
*/
//http://www.wpy.168cu.com/apis/5iu/return_url4.php?TransID=168CU2013091802586&money=2&time=20130918144858&Sign=b4b2ef292a18f4f9c30426b3505b457e