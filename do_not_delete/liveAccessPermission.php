<?php
/**
 * 直播页，进入房间都有用
 */
include($app_path."include/live_access_permission.php");
$user_spot="";
if($user){
	if($user["usernumber"]==$roomnumber){//主播
		$user_spot="show";
	}
	else if($user["usertype"]=="8"){//运营
		$user_spot="usertype8";
	}
	else if($showinfo['room_admin'] && strpos((",$showinfo[room_admin],"),$user["userid"])!==false){//管理员
		$user_spot="admin";
	}else{
		if($user['viplevel']>0){
			$user_spot="vip{$user['viplevel']}";
		}else{
			$user_spot="level_{$user['richlevel']}";
		}
	}
}
else{
	$user_spot="guest";
}
 //$db->debug = true;
$where = " (roomnumber=-1 or roomnumber=$roomnumber) and `k`='$user_spot' ";
//$tmp = $db->CacheGetArray(3600,"select * from access_permission where $where ORDER BY roomnumber desc");
$tmp = $db->GetArray("select * from access_permission where $where ORDER BY roomnumber desc");
$creeent_acc_perm = 0;//当前用户权限
if($tmp[0]["roomnumber"]==$roomnumber){//房间设置过，按房间设置
	$creeent_acc_perm = $tmp[0]["value"];
	$creeent_acc_perm_fayan = $tmp[0]["fayan"];
	$creeent_acc_perm_caitiao = $tmp[0]["caitiao"];
}else{
	$creeent_acc_perm = (int)($tmp[0]["value"]);
	$creeent_acc_perm_fayan = (int)$tmp[0]["fayan"];
	$creeent_acc_perm_caitiao = (int)$tmp[0]["caitiao"];
}