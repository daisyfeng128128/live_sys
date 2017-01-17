<?php
include('include/header.inc.php');
$userid=$_GET['userid'];
$avatar=$db->GetOne("select avatar from users where userid='$userid'");
if($avatar==''){
	$avatar="http://www.5iu.org/my/apis/default.png";
}
header("Location:$avatar");
include('include/footer.inc.php');
?>
