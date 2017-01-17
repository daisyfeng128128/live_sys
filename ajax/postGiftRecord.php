<?php

header("Content-type: text/html; charset=utf-8");
include('../include/header.inc.php');


$redis = new Redis();
$redis->connect(_REDIS_HOST_, 6379);
$redis->auth(_REDIS_PWD_);

/*$redis->lPush("loc_c.mt.cs.ea.rt.lt.10022_5","sddddddddddddddd333333dddddd");
exit();*/

$roomNumber=$_POST['roomNumber'];
$nums=$_POST['number'];
if($nums<0 or !$roomNumber){
    exit();
}
if($nums>5 or $nums ==5){
    $del_nums=5;
}else{
    $del_nums=$nums;
}
$key=_REDIS_KEYB_."_c.mt.cs.ea.rt.lt.".$roomNumber."_7";
$data=urlencode(json_encode($_POST));
if($redis->lLen($key) + $nums >5){
    for($i=0;$i<$del_nums;$i++){
        if($redis->lLen($key)>0) {
            $redis->lPop($key);
        }
    }
}
$redis->rPush($key,$data);

if($redis->lLen($key) >5){
    $redis->lPop($key);
}
$redis->lTrim($key,0,5);
var_dump($data);
include('../include/footer.inc.php');


