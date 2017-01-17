<?php
include('../../include/header.inc.php');
session_start();
if($_GET['from']=="mobile"){
	$_SESSION['from']='mobile';
}
include_once( 'config.php' );
include_once( 'saetv2.ex.class.php' );
include($app_path."include/footer.inc.php");
$o = new SaeTOAuthV2( WB_AKEY , WB_SKEY );
$code_url = $o->getAuthorizeURL( WB_CALLBACK_URL );
header("Location:$code_url");
?>