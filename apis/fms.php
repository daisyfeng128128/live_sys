<?php
include('../include/header.inc.php');
//限制局域网ip
switch($_GET['action']){
	case 'unpublish':
		//$roominfo=explode("-",$_GET['name']);
		$roomnumber=(int)$_GET['name'];
		$db->Execute("update shows set lastdisconnect='".time()."' where endtime is null and roomnumber='$roomnumber'");
		break;
}
include('../include/footer.inc.php');