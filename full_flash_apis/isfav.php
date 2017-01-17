<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include('../include/header.inc.php');
include $app_path . 'include/level.func.php';
$userid=(int)$_GET['userid'];
$roomnumber=(int)$_GET['usernumber'];
//$db->debug=true;
$row=$db->GetRow("select * from bu_user_studio where userid='$userid' and showernumber='$roomnumber'");
if($row){
	echo '1';
}
else{
	echo '0';
}
echo ','.$db->GetOne("select count(userid) from bu_user_studio where showernumber='$roomnumber'");
include('../include/footer.inc.php');
?>