<?php
//先去客户的网站数据库去扣钱，扣钱成功之后，在此站给用户加钱等等。
$response = array(
	"response"=>array(
		"action"=>"pay",
		"mestat"=>array(
			"status"=>500,
			"message"=>"验证失败",
		),
		"info"=>"",
	)
);

$money=(int)$_GET['p3_Amt'];
if($money<=0){
	$response["response"]["mestat"]["message"]="请输入正确的充值金额";
	echo json_encode($response);
	exit;
}

include '../../include/header.inc.php';

//$db->debug = true;
$user=checklogin();
if(!$user){
	$response["response"]["mestat"]["message"]="请先登录";
	echo json_encode($response);
	include('../../include/footer.inc.php');
	exit;
}

//去客户网站去扣钱
$conn_string = "host=121.40.16.144 port=5432 dbname=qgrs_db user=dbqgrsuser password=258qweasd";
$dbconn = pg_connect($conn_string);
$result = pg_query($dbconn, "update tbuseraccount set nk=nk-$money where nuserid='$user[snsid]' and nk>=$money");
$cmdtuples = pg_affected_rows($result);
if($cmdtuples<=0){
	$response["response"]["mestat"]["message"]="充值失败，请确认您的帐号余额是否足够";
	echo json_encode($response);
	include('../../include/footer.inc.php');
	exit;
}



$channel=(int)$_GET['paychannel'];
$reduce=1;
$balanceadd=$money*RMB_XNB*$reduce;
$agentid=(int)$_GET['agentid'];
$chooseuserid=(int)$_GET['chooseuserid'];
$db->Execute("insert into orders(adddate,money,userid,status,paychannel,balanceadd,agentid,lastupdate,chooseuserid) values('".date('Ymd')."','$money','$user[userid]','1','$channel','$balanceadd','$agentid','".time()."','$chooseuserid')");

$chooseuserid = empty($chooseuserid)?$user["userid"]:$chooseuserid;//给他人充值
$db->Execute("update user set balance=balance+$balanceadd where userid='$chooseuserid'");

//记录
$db->Execute("insert into balance_change_log (`when`,`why`,`userid`,`money`,`balance`,`channel`,`agentid`)values('".time()."','0','$chooseuserid','$money','$balanceadd','6','$agentid')");
finish_task($user[userid], 8);


$response["response"]["mestat"]["status"]=200;
$response["response"]["mestat"]["message"]="";
$response["response"]["info"]["balance"]=$balance;
echo json_encode($response);

include('../../include/footer.inc.php');