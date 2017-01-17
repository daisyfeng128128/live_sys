<?php
if(isset($_REQUEST['username']) && strlen($_REQUEST['username'])>50 && isset($_GET['action']) && $_GET['action']!='get' && $_GET['action']!='logout'){
	echo jsonp_encode(array('r'=>'no'));
	exit;
}

header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include_once('../../../../common/function/func/header.inc.php');
include_once('../../../../common/function/func/login.func.php');
include_once('../../../../common/function/function.php');

$ip=cip();

if($_GET['action']=='logout'){
	session_start();
	session_destroy();
	$_COOKIE['KDUUS']="";
	setcookie("KDUUS",'',time()-3600,'/',_COOKIE_DOMAIN_);
	header("location:/");
	//include('include/footer.inc.php');
	$db->close();
	exit();
}else if($_GET['action']=='get'){
	include_once("../../../../common/function/func/level.func.php");
	$user=checklogin();
	if(!$user){
		echo jsonp_encode(array('result'=>'false'));
	}else{
		$user['result']='true';
		echo jsonp_encode($user);
	}
}else{
	session_start();
	
	if($_GET['from']!='client' && strtolower($_SESSION['code'])!=strtolower($_REQUEST['login_vaildcode'])){
		echo json_encode(array('r'=>101,'field'=>'您输入的验证码不正确'));
		//include('include/footer.inc.php');
		$db->close();
		exit;
	}

    $userinfo=$db->GetRow("select * from bu_user where username='{$_REQUEST['username']}'");
	if($userinfo['isblock']=="1"){
		echo json_encode(array('r'=>100,'field'=>'登陆失败，请检查帐号和密码'));
		//include('include/footer.inc.php');
		$db->close();
		exit;
	}
	if($userinfo['password']==password_deal($_REQUEST['password'])){
		if($_REQUEST['remember']=='checked'){
			$exptime=time()+3600*24*365;
		}else{
			$exptime=null;
		}

        $userinfo=search_save_user($userinfo['userId']);
        set_login_info($userinfo);
		setcookie("KDUUS",logincookie($userinfo),$exptime,'/',_COOKIE_DOMAIN_);
		$db->Execute("update bu_user set loginIp='{$ip}' where userId='{$userinfo['userId']}'");
		if($_GET['from']=='client'){
			echo logincookie($userinfo);
		}else{
			echo(jsonp_encode(array('r'=>'yes','c'=>logincookie($userinfo),'u'=>$userinfo)));
		}
	}else{
		if($_GET['from']=='client'){
			echo '0';
		}else{
			echo json_encode(array('r'=>100,'field'=>'登陆失败，请检查帐号和密码'));
		}
    }
}
//include('include/footer.inc.php');
$db->close();
