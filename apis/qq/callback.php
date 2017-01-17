<?php
include '../../include/header.inc.php';
include_once($app_path.'apis/qq/lib/SnsSigCheck.php');//验证签名
//$SnsSigCheck->verifySig('get', $url_path, $params, $secret, $sig);
$payitem=$_GET['payitem'];
$sid=$_GET['billno'];
$tmp=explode('*',$payitem);
$orderid=$tmp[0];
$num=$tmp[2];
$get_order_sql = "select * from orders where id='$orderid' FOR UPDATE";
$db->StartTrans();
$row=$db->GetRow($get_order_sql);
if($row['status']==0 ){//尚未付款的订单
	$db->Execute("update orders set status=1,sid='$sid',money=money*$num,balanceadd=balanceadd*$num where id='$orderid'");
	$user=$db->GetRow("select * from user where userid='$row[userid]' FOR UPDATE");
	$balance=$user['balance']+$row['balanceadd']*$num;
	$addmoney=$row['balanceadd']*$num;
	//加钱
	$db->Execute("update user set balance='$balance' where userid='$row[userid]'");
	//记录
	$db->Execute("insert into balance_change_log (`when`,`why`,`userid`,`money`,`balance`,`channel`,`agentid`)values('".time()."','0','$row[userid]','$addmoney','$balance','$row[paychannel]','$row[agentid]')");
	echo '{"ret":0,"msg":"OK"} ';
	//@bi_payment($user['snsid'],$user['lastloginip'],$sid,$_GET['amt']/100,$num);
	//@bi_economy($user['snsid'],"earning",'recharge','','','',$user['totalcost'],$addmoney,"");
}
else{
	echo '{"ret":2,"msg":"Order is not exist"} ';
}
$db->CompleteTrans();
include '../../include/footer.inc.php';