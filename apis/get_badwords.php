<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include('../include/header.inc.php');
$rs=$db->CacheExecute(30,"select words from badwords");
while($arr=$rs->FetchRow()){
	$badwords[]=$arr[words];
}
echo join(",",$badwords);
include('../include/footer.inc.php');