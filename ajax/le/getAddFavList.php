<?php 
//请求关注列表
/**
 * status=2直播中
 * status=1不在直播
 */
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include '../../include/header.inc.php';
include($app_path."include/level.func.php");
$user=checklogin();
$rs=$db->Execute("select a.totalpoint,a.usernumber,a.nickname,a.userid,c.room_admin from user a, bu_user_studio b,room_config c where b.showernumber=a.usernumber and a.usernumber=c.roomnumber and b.userid='{$user['userid']}'");
$allfav = array();
while($arr=$rs->FetchRow()){
	$arr=safe_output($arr,true);
	$arr['starlevel']=point2star($arr['totalpoint']);
	$arr['status'] = "2";
	if(strpos((",".$arr["room_admin"].","),$user["userid"])!==false){
		$arr["isadmin"] = 1;
	}else{
		$arr["isadmin"] = 0;
	}
	unset($arr["room_admin"]);
	$allfav[] = $arr;
}
echo json_encode($allfav);
include '../../include/footer.inc.php';