<?php 
include('../include/header.inc.php');
include('../include/login.func.php');//Rtmp.php要用到
include('Rtmp/Rtmp.php');
set_time_limit(60);
$limit = 0;
file_put_contents("bot.a.t",'1');
while(true){
	$db->debug=true;
	$roomnumber=666;
	$bot_num_max = 500;
	
	$user=$db->GetRow("select userid,totalcost,usernumber from user where accountfrom=9 order by rand() limit 1");//找一个机器人
	$botnum=$db->GetOne("select count(a.userid) from show_users a,user b where a.userid=b.userid and b.accountfrom=9 and a.roomnumber='$roomnumber'");//当前房间机器人总数
	$isinroom=$db->GetOne("select count(*) from show_users where usernumber=$roomnumber and usernumber=$roomnumber");//主播在自己房间
	if($botnum<$bot_num_max && $isinroom>0){//主播需要在自己的房间,没有超过机器人上限
		try {
			rtmp_connect($roomnumber,$user[userid],"join");
		} catch (Exception $e) { 
			echo $e->getMessage();
			include('../include/footer.inc.php');
			exit;
		}
		echo "$user[usernumber] InTo $roomnumber\r\n";
	}
}
include('../include/footer.inc.php');