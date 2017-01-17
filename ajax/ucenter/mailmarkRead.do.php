<?php //2 新信息,在页面头部js:Main.getUnReadMsg();?>
<?php 
include '../../include/header.inc.php';
$user=checklogin();
if($user){
	$db->Execute("update mailbox set `read`='1' where userid='{$user["userid"]}'");
}

include '../../include/footer.inc.php';
?>
{"code":200,"msg":"succ"}