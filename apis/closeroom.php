<?php 
include('../include/header.inc.php');
$roomnum=(int)$_GET['roomnumber'];
$db->Execute("update shows set endtime='".time()."' where roomnumber='$roomnum' and endtime is null");
$db->Execute("update user set isshowing=0 where usernumber='$roomnum'");
include('../include/footer.inc.php');
?>
