<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
//http://www.wpy.demo1.com/iumobile/apis/update_andorid.php
include('../../include/header.inc.php');
include($app_path.'iumobile/apis/phone_init.php');

$db->Execute("INSERT INTO `phone_download_statistics` (`ip` ,`type` ,`addtime`)VALUES ('".ip2long($_SERVER['REMOTE_ADDR'])."','2','".time()."')");
include($app_path.'include/footer.inc.php');
header("Location:".$global_config_phone_data["android_address"]);