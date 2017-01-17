<?php

header("Content-type: text/html; charset=utf-8");
include('../include/header.inc.php');

$redis = new Redis();
$redis->connect(_REDIS_HOST_, 6379);
$redis->auth(_REDIS_PWD_);

/*$redis->lPush("loc_c.mt.cs.ea.rt.lt.10022_5","sddddddddddddddd333333dddddd");
exit();*/

$roomNumber=$_REQUEST['roomNumber'];


$rtp_key=_REDIS_KEYB_."_c.mt.cs.ea.rt.hash.".$roomNumber."_4";
$hash_room=$redis->hGetAll("$rtp_key");
$online= $hash_room['online'];

echo json_encode($hash_room);
include('../include/footer.inc.php');

