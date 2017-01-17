<?php 
include('../include/header.inc.php');
include('../include/login.func.php');//Rtmp.php要用到
include('Rtmp/Rtmp.php');
set_time_limit(60);
$limit = 0;
file_put_contents("bot.a.t",'1');
if(empty($global_config_data["_bot_num_"])){
	include('../include/footer.inc.php');
	exit;
}
while(true){
	//$db->debug=true;
	$roomnumber=$db->GetOne("select roomnumber from shows where endtime is null order by rand() limit 1");
	if(empty($roomnumber)){//没有人在直播,直接结束
		include('../include/footer.inc.php');
		exit;
	}
	$bot_num_max = $db->GetOne("select bot_num_max from bot_opt where roomnumber=$roomnumber");//以单个房间的设置为主
	$bot_num_max = $bot_num_max==null?((int)$global_config_data["_bot_num_max_"]):$bot_num_max;
	if(empty($bot_num_max)){
		sleep((60/$global_config_data["_bot_num_"]));
		continue;
	}
	
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
	}else{
		try {
			$botuserid=$db->GetOne("select a.userid from show_users a,user b where a.userid=b.userid and b.accountfrom=9 and a.roomnumber='$roomnumber'");
			rtmp_connect($roomnumber,$botuserid,"quit");
		} catch (Exception $e) { 
			echo $e->getMessage();
			include('../include/footer.inc.php');
			exit;
		}
	}
	$limit++;
	if($limit>=$global_config_data["_bot_num_"]){
		include('../include/footer.inc.php');
		exit;
	}
	sleep((60/$global_config_data["_bot_num_"]));
}
include('../include/footer.inc.php');