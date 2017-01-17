<?php
/*读取手枪配置*/
$global_config_phone_tmp = $db->CacheGetArray(86400,"select * from global_config_phone");
$global_config_phone_data = array();
foreach ($global_config_phone_tmp as $v){
	$global_config_phone_data[$v["k"]] = $v["v"];
}