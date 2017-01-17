<?php 
//if($_SERVER['REMOTE_ADDR']!="127.0.0.1" && $_SERVER['REMOTE_ADDR']!='58.221.32.115'){
	//exit('Access Died!'.$_SERVER['REMOTE_ADDR']);
//}
include('head.php');
switch($_REQUEST['action']){
	case 'clan_recount':
		exit;
		$clanid=(int)$_REQUEST['clanid'];
		if($clanid==0){
			$userid=(int)$_REQUEST['userid'];
			$clanid=$db->GetOne("select clanid from user where userid='$userid'");
		}
		if($clanid){
			$actor_num=$db->GetOne("SELECT count(a.userid) FROM`user` a,`bu_user_anchors` b WHERE a.userid=b.userid and b.pass=1 and a.clanid =$clanid");
			$db->Execute("update clan set actor_num='$actor_num' where clanid='$clanid'");
			$member_num=$db->GetOne("SELECT count(userid) FROM`user` where clanid =$clanid");
			$db->Execute("update clan set member_num='$member_num' where clanid='$clanid'");
			echo json_encode(array('action'=>$_REQUEST['action'],'result'=>true,'member_num'=>$member_num,'actor_num'=>$actor_num));
		}
		else{
			echo json_encode(array('action'=>$_REQUEST['action'],'result'=>false));
		}
	break;
	case 'back_number':
		//$db->debug=true;
		//先获取userid
		$number=(int)$_GET['number'];
		$userid=$db->GetOne("select userid from user_number where number='$number'");
		$count=$db->GetOne("select count(*) from user_number where userid='$userid'");
		if($count>1){
			//先从使用表删除
			$db->Execute("delete from user_number where number='$number'");
			$db->Execute("update beauty_number set isused=0 where number='$number'");
			//删除shows表数据
			$db->Execute("DELETE from shows where roomnumber='$number'");
			//删除直播统计数据
			$db->Execute("DELETE from shows_valid where roomnumber='$number'");
			//再取出一个正常的
			$normal_number=$db->GetOne("select number from user_number where userid='$userid'");
			$db->Execute("update user set usernumber='$normal_number' where userid='$userid'");
			operational_log(5,"靓号回收,{$userid}",$_REQUEST,$userid);
			header("Location: http://"._SITE_URL_."/apis/"._ADMIN_DIR_."/userList.php?msg=靓号回收成功");
		}else{
			header("Location: http://"._SITE_URL_."/apis/"._ADMIN_DIR_."/userList.php?msg=用户只有一个靓号，不可以回收");
		}
		
	break;
	case 'blockip'://封IP
		exit;
		$ips=array('42.121.90.25','61.158.162.115','42.121.96.59');
		foreach($ips as $ip){
			file_get_contents('http://'.$ip.':9393/dropon?ip='.$_REQUEST['ip']);
		}
	break;
	case 'unblockip'://封IP
		exit;
		$ips=array('42.121.90.25','61.158.162.115','121.10.141.178','42.121.96.59');
		foreach($ips as $ip){
			file_get_contents('http://'.$ip.':9393/dropoff?ip='.$_REQUEST['ip']);
		}
	break;
}
include('../../include/footer.inc.php');
?>
