<?php 
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include('../include/header.inc.php');
$user=checklogin();
if(!$user){
	echo '-2';
}
else{
	echo buy_car();
}
include('../include/footer.inc.php');
function buy_car(){
	global $db,$user;
	$userid = $user["userid"];
	$time=time();
	$id=(int)$_POST["id"];
	$row=$db->GetRow("select giftprice from gift where giftid='$id'");
	if(!$row['giftprice']){
		return '-3';
	}
	else if($user['balance']<$row['giftprice']){
		return '-1';
	}
	else{
		//扣钱
		$db->Execute("update user set balance=balance-".$row['giftprice'].",totalcost=totalcost+".$row['giftprice']." where userid='{$user['userid']}' and balance>=".$row['giftprice']);
		$balance=$user['balance']-$row['giftprice'];
		
		$carid=$id;
		$usercars = $db->GetRow("SELECT * from usercars where userid=$userid and carid='{$carid}'");
		if(empty($usercars)){
			$db->Execute("insert into usercars(userid,carid,vailddate)values('{$user[userid]}','$id','".($time+30*24*3600)."')");
		}else{
			//用户之前的车还没有过期
			if($usercars["vailddate"]>=$time){
				$vailddate = $usercars["vailddate"]+30*24*3600;
			}else{
				$vailddate = $time+30*24*3600;
			}
			$db->Execute("update usercars set vailddate=$vailddate where userid='$userid' and carid='{$carid}'");
		}
		//记录消费
		$db->Execute("insert into balance_change_log
		 (`when`,why,giftid,giftnum,userid,touserid,money,balance,roomnumber,showid)
		 values('".time()."','1','$id','1','{$user['userid']}','0','".(0-$row[giftprice])."','$balance','0','0')");
	}
	return 1;
}
//
?>