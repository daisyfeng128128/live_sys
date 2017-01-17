<?php
include '../../include/header.inc.php';
$user=checklogin();
if(!$user){
	echo '{"code":200,"msg":"succ"}';
}
else{
	$temp = array();
	$temp['code']='200';
	$temp['msg']='';
	
	$ids = trim($_POST["ids"]);
	$db->Execute("delete from mailbox where id in($ids) and userid='$user[userid]'");
	echo json_encode($temp);
}
include '../../include/footer.inc.php';