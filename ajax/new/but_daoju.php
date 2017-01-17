<?php //商城，兑换
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include '../../include/header.inc.php';
include($app_path."include/level.func.php");
$user=checklogin();
if(!$user){
	echo '{"errorCode":10110,"errorMessage":"'.$page_var['money_name'].'不足"}';
	include '../../include/footer.inc.php';
	exit;
}
// $db->debug = true;
$packageId = (int)$_POST["packageId"];
if(!in_array($packageId,array(431,432,433,434, 420,421,422, 441,442,443))){
	echo '{"errorCode":10110,"errorMessage":"请求错误"}';
	include '../../include/footer.inc.php';
	exit;
}
//价格等等
$row = $db->GetRow("select g.*,c.commission from gift g,giftcate c where g.giftcateid=c.giftcateid and g.giftid='$packageId' and g.giftimage='daoju'");
//扣费
$db->Execute("update user set balance=balance-".($row["giftprice"]).",totalcost=totalcost+".($row["giftprice"])." where userid='$user[userid]' and balance>=".$row["giftprice"]);
if($db->Affected_Rows()==0){
	echo '{"errorCode":10110,"errorMessage":"'.$page_var['money_name'].'不足"}';
	include '../../include/footer.inc.php';
	exit;
}
$balance = $user["balance"]-$row["giftprice"];
$time = time();
if(in_array($packageId, array(431,432,433,434))){//隐身符
	$time15 = $time+$row[giftflash]*30*86400;
	$db->Execute("update user set yinshen=1,yinshen_vailddate='$time15' where userid='$user[userid]'");
}else if(in_array($packageId, array(420,421,422))){//广播
	$tmp = $db->GetOne("select userid from giftstore where userid='{$user['userid']}' and giftid=65");
	if($tmp){
		$db->Execute("update giftstore set num=num+{$row[giftflash]} where userid='{$user['userid']}' and giftid=65");
	}else{
		$db->Execute("INSERT INTO `giftstore`(userid,giftid,num) VALUES ('$user[userid]', '65', '{$row[giftflash]}')");
	}
}else if(in_array($packageId, array(441,442,443))){//红包
	$tmp = $db->GetOne("select userid from giftstore where userid='{$user['userid']}' and giftid=1");
	if($tmp){
		$db->Execute("update giftstore set num=num+{$row[giftflash]} where userid='{$user['userid']}' and giftid=1");
	}else{
		$db->Execute("INSERT INTO `giftstore`(userid,giftid,num) VALUES ('$user[userid]', '1', '{$row[giftflash]}')");
	}
}
//通过某个房间来买
$roomnumber = (int)$_REQUEST["roomnumber"];
if($roomnumber){
	$to_userid = $db->GetOne("select userid from user where usernumber='$roomnumber'");
	if($to_userid){
		$pointadd = $row["commission"]*$row["giftprice"];
		addPoint($to_userid,$pointadd);
	}
}else{
	$pointadd=0;
}
//记录消费
$db->Execute("insert into balance_change_log
		 (`when`,why,giftid,giftnum,userid,touserid,money,balance,point,roomnumber,showid)
		 values('".time()."','1','$packageId','1','{$user['userid']}','$to_userid','".(0-$row["giftprice"])."','$balance','$pointadd','$roomnumber','0')");
//记录日志
if($_GET["type"]!="buy"){
	$db->Execute("INSERT INTO `exchange_log_jifen`(userid,createTime,point,packageName,packageId) VALUES ('$user[userid]', '$time', '{$pack[$packageId]['point']}', '{$pack[$packageId]['packageName']}', '$packageId')");
}

echo '{"errorCode":200,"errorMessage":""}';
include '../../include/footer.inc.php';