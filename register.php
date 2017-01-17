<?php
include('include/header.inc.php');
include('include/login.func.php');
$action=$_REQUEST['action'];
if(!$action){
	exit();
}
if($_GET['callback']){
	echo $_GET['callback'] . '(';
}

//广告位ID；
$exId=$_COOKIE['exId'];
if ($exId==''){
	$exId='1';
}else {
	$exId=$exId;
}


switch($action){
	case 'regcheck':
		if($_REQUEST['field']=='email'){
			echo json_encode(array('r'=>check_email($_REQUEST['value'])));
		}
		else if($_REQUEST['field']=='nickname'){
			echo json_encode(array('r'=>check_nickname($_REQUEST['value'])));
		}
		else if($_REQUEST['field']=='usernmae'){
			echo json_encode(array('r'=>check_usernmae($_REQUEST['value'])));
		}
		break;
	case 'reg':
		header("Content-Type: text/html; charset=UTF-8");
		session_start();
		$nick_check_result=check_nickname($_REQUEST['nickname']);
		$mail_check_result=check_usernmae($_REQUEST['email']);
		if($_REQUEST['from']!="client" && strtolower($_SESSION['code'])!=strtolower($_REQUEST['vaildcode'])){
			echo json_encode(array('r'=>'101','field'=>'vaildcode'));
		}
		else if($mail_check_result!='yes'){
			echo json_encode(array('r'=>$mail_check_result,'field'=>'email'));
		}	
		else if($nick_check_result!="yes"){
			echo json_encode(array('r'=>$nick_check_result,'field'=>'nickname'));
		}
		else if(strlen($_REQUEST['password'])<6){
			echo json_encode(array('r'=>'密码至少输入6位','field'=>'password'));
		}
		else if($_REQUEST['password']!=$_REQUEST['repassword']){
			echo json_encode(array('r'=>'您两次输入的密码不一致','field'=>'repassword'));
		}
		else{
			if($_REQUEST['unionid']){
				$_COOKIE['unionid']=$_REQUEST['unionid'];
			}

            $nickname=str_replace($nickname_blacklist,'',$_REQUEST[nickname]);
            $nickname=urlencode($nickname);
            $timer=date('Y-m-d H:i:s',$_SERVER['REQUEST_TIME']);
			$db->Execute("insert into bu_user(createDT,status,nickname,username,password,accountfrom,email,avatar,gender,exId,logins) values('".$timer."',1,'$nickname','$_REQUEST[email]','".password_deal($_REQUEST[password])."',0,'$_REQUEST[email]','46a920d47a9c287e627693554180598a',0,'$exId',1)");
			$userid=$db->Insert_ID();
            if($userid){
                $db->Execute("insert into bu_user_packs(createDT,status,userId) values('".$timer."',1,$userid)");
            }
            $users=search_save_user($userid);
            set_login_info($users);
			$token = logincookie(array('userId'=>$userid,'nickname'=>$_REQUEST['nickname']));
			setcookie("KDUUS",$token,time()+3600,'/',_COOKIE_DOMAIN_);
			echo json_encode(array('r'=>'yes','c'=>$nickname));
		}
		break;
}
if($_GET['callback']){
	echo ')';
}
include('include/footer.inc.php');