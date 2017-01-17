<?php
define('ADODB_FORCE_IGNORE',0);
$db = ADONewConnection('mysqli');
$sqldbname='qq';
$db->PConnect('10.66.104.107', 'root', 'jin*#12yingjin', $sqldbname);
$db->SetFetchMode(ADODB_FETCH_ASSOC);
//$ADODB_CACHE_DIR = $app_path."/cache";
$db->cacheSecs = 3600*24*365;
$db->memCache=true;
$db->memCacheHost = array("127.0.0.1");
$db->memCachePort = 1028; /// this is default memCache port
$db->memCacheCompress = false;
//$db->debug=true;
$db->Execute("set names utf8");
