<?php

header("Content-type: text/html; charset=utf-8");
include('../include/header.inc.php');

$redis = new Redis();
$redis->connect(_REDIS_HOST_, 6379);
$redis->auth(_REDIS_PWD_);

/*$redis->lPush("loc_c.mt.cs.ea.rt.lt.10022_5","sddddddddddddddd333333dddddd");
exit();*/

$roomNumber=$_REQUEST['roomNumber'];
$key=_REDIS_KEYB_."_c.mt.cs.ea.rt.lt.".$roomNumber."_5"; 
$data =$redis->lRange($key,0,-1);
$new_array=array();
foreach($data as $k=>$v){
    $vv=json_decode(unserialize($v));
    $new_array[]=$vv;
}
echo json_encode($new_array);
include('../include/footer.inc.php');

