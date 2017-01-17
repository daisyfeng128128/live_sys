<?php
//连接数据库
$db = ADONewConnection('mysqli');
$db->PConnect(_MYSQL_HOST_, _MYSQL_USER_, _MYSQL_PWD_, _MYSQL_DB_);
$db->SetFetchMode(ADODB_FETCH_ASSOC);
//$ADODB_CACHE_DIR = $app_path."/cache";
//设置缓存为memcache
//$db->debug=true;
$db->Execute("set names utf8");