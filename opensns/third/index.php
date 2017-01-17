<?php
/*
秘钥为
gwau6izfDXVHFe91eiqer8cl3cvb75aa

回调地址
http://www.wpy.demo1.com/opensns/third/?userid=811&partnerid=6&token=f50fa1a86fabc57ff12db166f434a0dc)
*/
session_start();
include('../../include/third_part_config.php');
$action = isset($_GET['action']) ? $_GET['action'] : '';
function third_login(){
	if($_GET['action']=="reg"){
		header("Location:".REG_THIRD_URL);
	}else{
		header("Location:".LOGIN_THIRD_URL);
	}
}
switch($action){
	case 'reg':
		third_login();
		break;
	case 'login':
		third_login();
		break;
	//Step4：Qzone引导用户跳转到第三方应用
	case '':
		include_once("../../include/header.inc.php");
		include_once('../../include/login.func.php');
		include_once('../../include/path_config.php');
		//$db->debug = true;
		third_callback();
		include_once("../../include/footer.inc.php");
		break;
}
function third_callback()
{
	global $db;
	$partnerid = $_REQUEST['partnerid'];
    if($_REQUEST['userid'] && $_REQUEST['token']){
		$auth = md5($_REQUEST['userid'].LOGIN_THIRD_KEY);
		if($auth==strtolower($_REQUEST['token'])){
			$userinfo=$db->GetRow("select * from user where accountfrom='$partnerid' and snsid='{$_REQUEST['userid']}'");
			if(!!$userinfo){
				setcookie("HFCOOKIE",logincookie($userinfo),time()+3600,'/',_COOKIE_DOMAIN_);
				//var_dump($userinfo);
			}
			else{
				$nickname = $_REQUEST['nickname']?$_REQUEST['nickname']:$_REQUEST['userid'];
				register_by_opensns($partnerid,$_REQUEST['userid'],$nickname,"");
			}
			if($_GET["redirect"]=="true"){
				header("Location:/");
			}else{
				echo '<script>window.opener.refreshLoginSNS();window.close()</script>';
			}
			
		}
		else{
			echo("The state does not match. You may be a victim of CSRF.==");
		}
    }
    else 
    {
        echo("The state does not match. You may be a victim of CSRF.");
    }
}