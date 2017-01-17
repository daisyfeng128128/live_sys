<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include('../../include/header.inc.php');
$w = isset($_GET["w"])?$_GET["w"]:$_SERVER["SERVER_NAME"];

$data  = $db->GetArray("select * from swf_config where w='$w'");
$res = array();
foreach($data as $row){
	$res[$row["k"]] = $row["v"];
}
include('../../include/phpAes.inc.php');
$aes = new phpAes("MK2X82eL6jkKbzvlJU1CMR6rcKO+SBhmbPOmFD/2Mxw=");  
echo $aes->encrypt(json_encode($res)); 

include('../../include/footer.inc.php');