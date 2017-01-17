<?php
define('ADODB_FORCE_IGNORE',0);
$db = ADONewConnection('mysqli');
$sqldbname='my';
$db->PConnect('127.0.0.1', 'root', 'lebooo', $sqldbname);
$db->SetFetchMode(ADODB_FETCH_ASSOC);
//$ADODB_CACHE_DIR = $app_path."/cache";
//$db->cacheSecs = 3600*24*365;
//$db->memCache=true;
//$db->memCacheHost = array("1.4.7.108");
//$db->memCachePort = 1028; /// this is default memCache port
//$db->memCacheCompress = false;
//$db->debug=true;
$db->Execute("set names utf8");
