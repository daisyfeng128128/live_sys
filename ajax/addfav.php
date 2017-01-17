<?php 
include('../include/header.inc.php');
$user=checklogin();
if(!$user){
	echo '请先登录';
}
else{
	$roomnumber=(int)$_GET['roomnumber'];
	$return_arr = array("errorCode"=>10110,"errorMessage"=>"操作成功");
	if($db->GetOne("select count(*) from bu_user_studio where userid='{$user['userid']}' and showernumber='$roomnumber'")>=1){
		$db->Execute("DELETE from bu_user_studio where userid='{$user['userid']}' and showernumber='$roomnumber'");
		$return_arr["fav"]="del";
	}else{
		$db->Execute("insert into bu_user_studio(userid,showernumber)values('{$user['userid']}','$roomnumber')");
		finish_task($user['userid'], 6);
		$return_arr["errorCode"]=200;
		$return_arr["fav"]="add";
	}
	echo json_encode($return_arr);
}
include('../include/footer.inc.php');