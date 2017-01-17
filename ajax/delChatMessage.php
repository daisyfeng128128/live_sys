<?php

header("Content-type: text/html; charset=utf-8");
include('../include/header.inc.php');

$redis = new Redis();
$redis->connect(_REDIS_HOST_, 6379);
$redis->auth(_REDIS_PWD_);

$roomNumber=$_REQUEST['roomNumber'];
$userId=$_REQUEST['userId'];

$key=_REDIS_KEYB_."_c.mt.cs.ea.rt.lt.".$roomNumber."_5";
$data =$redis->lRange($key,0,-1);
$new_array=array();
foreach($data as $k=>$v){
    $vv=json_decode(unserialize($v));
    if($userId == $vv->userId){
        $redis->lRem($key,$v,0);
    }
}




