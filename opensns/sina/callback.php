<?php
include_once("../../include/header.inc.php");
include_once('../../include/login.func.php');
session_start();
include_once( 'config.php' );
include_once( 'saetv2.ex.class.php' );

$o = new SaeTOAuthV2( WB_AKEY , WB_SKEY );

if (isset($_REQUEST['code'])) {
	$keys = array();
	$keys['code'] = $_REQUEST['code'];
	$keys['redirect_uri'] = WB_CALLBACK_URL;
	try {
		$token = $o->getAccessToken( 'code', $keys ) ;
		//var_dump($token);
	} catch (OAuthException $e) {
	}
}

if ($token) {
	
	$_SESSION['token'] = $token;
	setcookie( 'weibojs_'.$o->client_id, http_build_query($token) );
	$userinfo=$db->GetRow("select * from user where snsid='{$token['uid']}'");
	if($userinfo){
		$_COOKIE['HFCOOKIE']=logincookie($userinfo);
		setcookie("HFCOOKIE",logincookie($userinfo),time()+3600,'/',_COOKIE_DOMAIN_);
		//var_dump($userinfo);
	}
	else{
		$c = new SaeTClientV2( WB_AKEY , WB_SKEY , $_SESSION['token']['access_token'] );
		$uid_get = $c->get_uid();
		$uid = $uid_get['uid'];
		$userinfo = $c->show_user_by_id( $uid);
		$_COOKIE['HFCOOKIE']=register_by_opensns(2,$token['uid'],$userinfo['screen_name'],$userinfo['avatar_large']);
	}
	if($_SESSION['from']=='mobile'){
			echo "<script src='/iumobile/js/StageWebViewBridge.js?20141114c'></script>"."<script>StageWebViewBridge.call('fnCalledFromJS', null, '".$_COOKIE['HFCOOKIE']."');</script>";
	}
	else{
			echo '<script>window.opener.refreshLoginSNS();window.close()</script>';
	}
}	
include($app_path."include/footer.inc.php");
?>