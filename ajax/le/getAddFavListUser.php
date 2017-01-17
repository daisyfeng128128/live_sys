<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include '../../include/header.inc.php';
$user=checklogin();
$isfav = 0;
//$db->debug = true;
if($user){
    $isfav = $db->GetOne("select count(*) from bu_user_studio where roomNumber='".(int)$_GET["roomnumber"]."' and userId='{$user["userid"]}' and isFollow =1");
}
$count = $db->GetOne("select count(*) from bu_user_studio where roomNumber='".(int)$_GET["roomnumber"]."'");

$arr = array(
    "userfav"=>$isfav,
    "favcount"=>$count?$count:0,

);
echo json_encode($arr);
include '../../include/footer.inc.php';