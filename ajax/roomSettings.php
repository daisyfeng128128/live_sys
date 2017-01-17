<?php

header("Content-type: text/html; charset=utf-8");
include('../include/header.inc.php');

$roomNumber=$_POST['roomNumber'];
$skid=$_POST['skid'];
if($roomNumber =="" or $skid == ""){
    echo $roomNumber;
    exit();
}
$redis = new Redis();
$redis->connect(_REDIS_HOST_, 6379);
$redis->auth(_REDIS_PWD_);

$key=_REDIS_KEYB_."_c.mt.cs.ea.rt.nx.".$roomNumber."_6";
$redis->set($key,$skid);
echo "success";
include('../include/footer.inc.php');
