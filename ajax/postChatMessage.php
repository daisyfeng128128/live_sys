<?php

header("Content-type: text/html; charset=utf-8");
include('../include/header.inc.php');


$redis = new Redis();
$redis->connect(_REDIS_HOST_, 6379);
$redis->auth(_REDIS_PWD_);

/*$redis->lPush("loc_c.mt.cs.ea.rt.lt.10022_5","sddddddddddddddd333333dddddd");
exit();*/

$roomNumber=$_POST['roomNumber'];
$key=_REDIS_KEYB_."_c.mt.cs.ea.rt.lt.".$roomNumber."_5";
$data=serialize(json_encode($_POST));
$redis->rPush($key,$data);
if($redis->lLen($key) >12){
    $redis->lPop($key);
}
//var_dump($data);
include('../include/footer.inc.php');


