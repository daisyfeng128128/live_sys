<?php
set_time_limit (120);
/*定任务调用，每5分钟同步1次用户*/
include('../include/header.inc.php');
	$db->debug =true;
	$roomnumberAll = $db->GetArray("select DISTINCT(roomnumber) from shows where endtime is null or endtime>".(time()-600));
	foreach ($roomnumberAll as $v){
		$roomnumber=(int)$v['roomnumber'];
		echo _RTMP_HTTP_ADD_."?roomnumber=$roomnumber&app="._RTMP_DOMAIN_APP_;
		$userids=file_get_contents(_RTMP_HTTP_ADD_."?roomnumber=$roomnumber&app="._RTMP_DOMAIN_APP_);
		if(empty($userids)){
			continue;
		}
		$useridarr=explode(',',$userids);
		foreach($useridarr as $uid){
			if(empty($uid)){
				continue;
			}
			if(strlen($uid)!=13){
				$narr[]=$uid;
			}else{
				$guest[] = "'$uid'";
			}
		}
		if(empty($guest)){
			$guest[] = 0;
		}
		$userids=join(',',$narr);
		$guests=join(',',$guest);
		$rs=$db->Execute("select userid from show_users where roomnumber=$roomnumber and (userid not in($userids) and usernumber not in($guests) and userid not in (select a.userid from user a,show_users b where a.userid=b.userid and a.accountfrom=9))");
		
		$uids=array();
		while($arr=$rs->FetchRow()){
			$uids[]=$arr['userid'];
		}
		if(!empty($uids) && is_array($uids)){
			$uidstr=join(',',$uids);
			$db->Execute("delete from show_users where roomnumber='$roomnumber' and userid in ($uidstr)");
		}
	}
	
include('../include/footer.inc.php');