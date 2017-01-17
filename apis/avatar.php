<?php

include(dirname(dirname(__FILE__))."/include/header.inc.php");
$uid=(int)$_GET['uid'];
if(empty($uid)){
	header("Location:/images/2456_120x120.jpg");
	exit;
}

$md5=$db->GetOne("select avatar from bu_user where userId=$uid");

if($md5) {
    $imgurl=_IMAGES_DOMAIN_."/".$md5;
    header("Location:".$imgurl);
    exit;

}else{
	header("Location:/images/2456_120x120.jpg");
	exit;
}
?>
