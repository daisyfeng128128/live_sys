<?php 
exit;
include('../include/header.inc.php');
include('../include/login.func.php');//Rtmp.php要用到
include('Rtmp/Rtmp.php');
set_time_limit(0);
while(true){
	//$db->debug=true;
	$showid=$db->GetOne("select roomnumber from shows where endtime is null order by rand() limit 1");
	if(empty($showid)){//没有人在直播,等1分钟再试
		sleep(60);
		continue;
	}
	$user=$db->GetRow("select userid,totalcost,usernumber from user where accountfrom=9 order by rand() limit 1");
	$botnum=$db->GetOne("select count(a.userid) from show_users a,user b where a.userid=b.userid and b.accountfrom=9 and a.roomnumber='$showid'");
	$total=$db->GetOne("select count(userid) from show_users where roomnumber='$showid'");
	/*print_r($showid);
	var_dump($botnum);
	var_dump($total);*/
	$isinroom=$db->GetOne("select count(*) from show_users where usernumber=$showid and usernumber=$showid");
	if($botnum<=(($total-$botnum)*100)&&$isinroom>0){//主播需要在自己的房间
		try {
			rtmp_connect($showid,$user[userid],"join");
		} catch (Exception $e) { 
			$e->getMessage();
			sleep(5);
			continue;
		}
		$del=$db->GetRow("SELECT a.userid,a.roomnumber from show_users a,user b,user c where a.roomnumber=b.usernumber and b.isshowing=0 and c.accountfrom=9 and c.userid=a.userid");
		if(!empty($del[userid])){
			rtmp_connect($del[roomnumber],$del[userid],"quit");
		}
		echo "$user[usernumber] InTo $showid\r\n";
		//exit;
	}
	//exit;
	sleep(5);
}
include('../include/footer.inc.php');