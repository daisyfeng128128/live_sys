<?php 
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include('../include/header.inc.php');
include $app_path . 'include/level.func.php';
$userid=(int)$_GET['userid'];
$kknum=(int)($db->GetOne("select num from giftstore where giftid=1 and userid='$userid'"));
echo $kknum;
include('../include/footer.inc.php');
?>