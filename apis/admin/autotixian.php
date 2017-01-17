<?php 
exit;
//自动为主播提现,为网站定制http://www.bf0101.com/
ob_start();
include('head.php');
include($app_path."include/level.func.php");
$bili_global = $global_config_data["pay_JF_TIXIAN_TEMP"];//主播提现比例
$mintixian = $global_config_data["pay_XNB_TI_MIN_TEMP"];//主播最低提现积分

$list = $db->GetArray("select u.nickname,u.usernumber,u.point,u.balance,u.totalpoint,a.* from user u,bu_user_anchors a where u.userid=a.userid and a.pass=1 and u.point>=(select min(xnb_ti_min) from jifen_tixian_conf)");

$allBankInfo = getAllBankInfo();
$table_head = array("时间","用户ID","视频号","姓名","开户银行","开户姓名","银行卡号","扣除{$page_var['money_name2']}","金额(元)","剩余{$page_var['money_name2']}");
$export_data = array(0=>$table_head);
$date = date("Y-m-d H:i:s");
if(empty($list)){
	$export_data[] = array(
			"暂无符合条件的数据",
		);
}else{
	$tmp = $db->GetArray("select * from jifen_tixian_conf");
	foreach($tmp as $value){
		$jifenti[$value["level"]] = $value;
	}
	
	foreach($list as $value){
		if(IS_SINGLE_MONEY){//是单货币,提现从balance提
			$point = $value["balance"];
		}else{
			$point = $value["point"];
		}
		$level=point2star($value['totalpoint']);
		if(isset($jifenti[$level])){
			$bili = $jifenti[$level]["jifen_tixian"];
			$minti = $jifenti[$level]["xnb_ti_min"];
		}else{
			$bili = $bili_global;
			$minti = $mintixian;
		}
		if($point<$minti){
			continue;
		}
		
		$money = floor($point/($bili*100));
		$yu = $point-$money*$bili*100;
		if(IS_SINGLE_MONEY){
			$db->Execute("update user set balance=$yu where userid='{$value['userid']}'");
			$balance = $db->GetOne("select balance from user where userid='{$value['userid']}'");
		}else{
			$db->Execute("update user set point=$yu where userid='{$value['userid']}'");
			$balance = $db->GetOne("select point from user where userid='{$value['userid']}'");
		}
		
		$db->Execute("insert into balance_change_log
			 (`when`,why,giftid,giftnum,userid,touserid,money,balance,point,roomnumber,showid)
			 values('".time()."','6','0','1','{$value['userid']}','0','".($money*100)."','$balance','-".($point-$yu)."','0','0')");
			 
		$export_data[] = array(
			$date,
			$value["userid"],
			$value["usernumber"],
			$value["truename"],
			$allBankInfo[$value["banktype"]],
			$value["bankname"],
			("\t".$value["banknumber"]),
			($point-$yu),
			($money*100),
			$yu,
		);
	}
	operational_log(6,"自动为主播提现",$_REQUEST);
}
if(count($export_data)==1){
	$export_data[] = array(
		"暂无符合条件的数据",
	);
}
exportDataArray($export_data);
include('../../include/footer.inc.php');