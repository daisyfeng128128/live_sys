<?php
header('P3P: CP=CAO PSA OUR');
error_reporting (E_ALL ^ E_NOTICE);
$app_path=str_replace('\\','/',str_replace('include\\header.inc2.php','',str_replace('include/header.inc2.php','',__FILE__)));
include($app_path.'include/global_config.inc.php');
include($app_path.'include/dob.lksdf3200230220232/adodb.inc.php');
include($app_path."include/mysql_config2.php");
include($app_path."include/third_part_config.php");
include($app_path."include/task.inc.php");
include_once($app_path."include/global.func.php");
include($app_path.'bi/index.php');
if($_COOKIE[',_HFCOOKIE']){
	$_GET['token']=$_COOKIE[',_HFCOOKIE'];
}
if ( !get_magic_quotes_gpc() ) { 
	$_GET = add_slashes($_GET); 
	$_POST = add_slashes($_POST); 
	$_COOKIE = add_slashes($_COOKIE); 
} 
if($_GET['token']){
	$exptime=time()+3600*2;
	setcookie("HFCOOKIE",$_GET['token'],$exptime,'/',_COOKIE_DOMAIN_);
	$_COOKIE['HFCOOKIE']=$_GET['token'];
}
if($_GET['u']){
	setcookie ( "unionid" , (int)$_GET['u'] , time()+3600*2 ,"/",_COOKIE_DOMAIN_ );
}
function checklogin(){
	global $db;
	if(!$_COOKIE['HFCOOKIE']){
		return false;
	}
	if(!function_exists("aes_decrypt")){
		global $app_path;
		include($app_path.'include/aes.func.php');
	}
	$cookie_decode=aes_decrypt($_COOKIE['HFCOOKIE']);
	$cookie_arr=explode(',',$cookie_decode);
	global $db;
	$userinfo=$db->GetRow("select * from user where userid='{$cookie_arr[0]}'");
	//如果今天首次登陆计入活跃用户
	if($userinfo['lastlogin']<strtotime(date('Y-m-d')." 00:00:00")){
		//@bi_dau($userinfo['snsid'],"",$_SERVER['REMOTE_ADDR']);
	}
	//纪录最后登陆，纪录停留时间
	if($userinfo){
		if($userinfo['isblock']==1){
			return false;
		}
		if(date('Y-m-d',$userinfo[lastlogin])!=date('Y-m-d')){//每天第一次登录加红包
			$db->Execute("update giftstore set num=1 where userid='{$userinfo['userid']}' and giftid=1");
		}
		$db->Execute("update user set lastlogin='".time()."', lastloginip='".ip2long($_SERVER['REMOTE_ADDR'])."' where userid='{$userinfo['userid']}'");
	}
	$userinfo=safe_output($userinfo,true);
	return $userinfo;
}
?>
