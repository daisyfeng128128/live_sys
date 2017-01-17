<?php
function deal(){
	global $r6_Order,$db,$r3_Amt,$r2_TrxId;
	$orderid=(int)substr($r6_Order,8);
	$get_order_sql = "select * from orders where id='$orderid' FOR UPDATE";
	$db->StartTrans();
	$row=$db->GetRow($get_order_sql);
	if($row['status']==0){//尚未付款的订单
		$db->Execute("update orders set status=1,sid='$r2_TrxId' where id='$orderid'");
		$chooseuserid = empty($row["chooseuserid"])?$row["userid"]:$row["chooseuserid"];//给他人充值
		$user=$db->GetRow("select * from user where userid='$chooseuserid' FOR UPDATE");
		$money=$row['money']*RMB_XNB*ALI_REDUCE;
		$balance=$user['balance']+$money;
		//加钱
		$db->Execute("update user set balance='$balance' where userid='$chooseuserid'");
		$touserid = 0;
		$point = 0;
		if($row[agentid]){
			$touserid = $row[agentid];
			$point = $money*_PAY_ADD_;
			addPoint($touserid,$point);
		}
		//记录
		$db->Execute("insert into balance_change_log (`when`,`why`,`userid`,touserid,point,`money`,`balance`,`channel`,`agentid`)values('".time()."','0','$chooseuserid','$touserid','$point','$money','$balance','$row[paychannel]','$row[agentid]')");
		finish_task($row[userid], 8);
	}
	$db->CompleteTrans();
}