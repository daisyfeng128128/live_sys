<?php
include('../include/header.inc.php');
$user =checklogin();
$idd =$_POST['idd'];
$userid= $user['userId'];
$info=array();
$select="update bu_user_cars set active =1 WHERE id= $idd";
if($db->Execute($select)){
    $db->Execute("update bu_user_cars set active =0 WHERE userId=$userid and  id <> $idd");
    $info['resultCode']=200;
}else{
    $info['resultCode']=$idd;
}

echo json_encode($info, true);
include('../include/footer.inc.php');
?>