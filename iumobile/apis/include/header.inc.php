<?php
error_reporting (E_ALL ^ E_NOTICE);
$app_path=str_replace('\\','/',str_replace('include\\header.inc.php','',str_replace('include/header.inc.php','',__FILE__)));
include($app_path.'include/dob/adodb.inc.php');
include($app_path."include/mysql_config.php");
?>
