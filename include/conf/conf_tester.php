<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/25
 * Time: 20:05
 */

ini_set('display_errors','On');
error_reporting(0);
define('_CDNDOMAIN_','');//cdn服务器
define('_INTERFACE_','http://tester.kedo.tv');//接口
define('_IMAGES_DOMAIN_','http://img.kedo.tv');//图片服务器
define('_IMGPLUS_DOMAIN_','http://img.kedo.tv');//图片服务器
define('_MYSQL_HOST_','rm-bp13gx2a9433w42r1.mysql.rds.aliyuncs.com');//数据库地址
define('_MYSQL_DB_','anchors');//数据库名
define('_MYSQL_USER_','anchors');//数据库用户名
define('_MYSQL_PWD_','a@n#c$h%o&r*sZ');//数据库密码
define('_COREWEB_','http://core.kedo.tv/guildsSoc/checkToken.mt');//公会地址
define('_REDIS_HOST_','09ede0159aa64f40.m.cnhza.kvstore.aliyuncs.com');//redis地址
define('_REDIS_PWD_','09ede0159aa64f40:fooBa4eds');//redis地址
define('_REDIS_KEYB_','ext');
define('_dbds_','dest');

$vsn = md5(date('Y-d-m')."S%000");

