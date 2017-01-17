<?php 
header("Content-type:text/html;charset=utf-8");
$tmp = explode("/",$_SERVER["REQUEST_URI"]);
define('_ADMIN_DIR_',$tmp[count($tmp)-2]);//后台目录
include('../../include/header.inc.php');
include($app_path.'include/page.inc.php');
session_start();
session_set_cookie_params(0,'/'); //让所有子域名都共享会话
//判断登录
if($_SERVER['PHP_SELF']!=("/apis/"._ADMIN_DIR_."/login.php") && $_SERVER['PHP_SELF']!=("/apis/"._ADMIN_DIR_."/red5.php")){
	if((!isset($_SESSION["admin"])) || (time()-$_SESSION["admin"]["logintime"])>1800){
		//header('Location: '._JAVA_DOMAIN_.'/red5/root/logon.do');
		header("Content-Type: text/html; charset=UTF-8"); 
		header("location:/apis/admin/red5.php");
		include('../../include/footer.inc.php');
		exit;
	}
}
$_SESSION["admin"]["logintime"] = time();
//判断权限
if($db->GetOne("select count(*) from rootrights where rootid='{$_SESSION["admin"]["ID"]}' and strurl='{$_SERVER[SCRIPT_NAME]}'")>0){
	header('Location: /apis/'._ADMIN_DIR_.'/noQuanxian.php');
	include('../../include/footer.inc.php');
	exit;
}
/*广告图片配置*/
if(file_exists($app_path.'skin/'.$page_var['site_skin'].'/config.php')){
	include_once($app_path.'skin/'.$page_var['site_skin'].'/config.php');
}
if(file_exists($app_path.'skin/live_'.$page_var['site_live_skin'].'/config.php')){
	include_once($app_path.'skin/live_'.$page_var['site_live_skin'].'/config.php');
}
if(file_exists($app_path.'skin/mobile/config.php')){
	include_once($app_path.'skin/mobile/config.php');
}
$pic_banner_str = "'".implode("','", $pic_banner)."'";

/**
 * 记录系统日志
 * operational_log(4,"禁用用户userid,{$_GET["userid"]}",$_REQUEST,$_GET["userid"]);
 *
 * @param number $type 类型(1:登录2退出3增加4修改5删除6其它)
 * @param string $info 文字说明
 * @param string $details 请求的参数
 * @param number $opt_userid 操作哪个用户
 */
function operational_log($type=0,$info,$details=null,$opt_userid=0){
	$data = array(
		"rootid"=>empty($_SESSION["admin"]["ID"])?0:$_SESSION["admin"]["ID"],
		"type"=>$type,
		"opt_userid"=>((int)$opt_userid),
		"info"=>$info,
		"details"=>empty($details)?null:json_encode($details),
		"addtime"=>time(),
		"ip"=>ip2long($_SERVER['REMOTE_ADDR']),
	);
	global $db;
	//$db->debug = true;
	$db->Execute("INSERT INTO `root_operational_log`(rootid,`opt_userid`,info,`details`,`type`,`addtime`,`ip`,`url`) VALUES ('{$data["rootid"]}','{$data["opt_userid"]}','{$data["info"]}','{$data["details"]}','{$data["type"]}','{$data["addtime"]}','{$data["ip"]}','{$_SERVER["REQUEST_URI"]}')");
}