<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/25
 * Time: 20:05
 */

ini_set('display_errors','On');
error_reporting(E_ALL ^ E_NOTICE  ^E_WARNING);
define('_CDNDOMAIN_','');//cdn服务器
define('_INTERFACE_','http://10.1.1.17');//接口
define('_IMAGES_DOMAIN_','http://images.181show.com');//图片服务器
define('_IMGPLUS_DOMAIN_','http://images.181show.com');//图片服务器
define('_MYSQL_HOST_','10.1.1.17');//数据库地址
define('_MYSQL_DB_','anchors');//数据库名
define('_MYSQL_USER_','root');//数据库用户名
define('_MYSQL_PWD_','ecdf50H31b1a');//数据库密码
define('_COREWEB_','http://10.1.1.17:8080/survival/guildsSoc/checkToken.mt');//公会地址
define('_REDIS_HOST_','112.124.58.61');//redis地址
define('_REDIS_PWD_','foobareds');//redis地址
define('_REDIS_KEYB_','loc');
define('_dbds_','debug');
$vsn = md5(date('Y-d-m')."S%sdfgd");

