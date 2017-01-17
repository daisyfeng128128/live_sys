<?php

header("Content-type: text/html; charset=utf-8");
include('../include/header.inc.php');

$redis = new Redis();
$redis->connect(_REDIS_HOST_, 6379);
$redis->auth(_REDIS_PWD_);

/*$redis->lPush("loc_c.mt.cs.ea.rt.lt.10022_5","sddddddddddddddd333333dddddd");
exit();*/

$anc_type = $_REQUEST['anc_type'];
if($anc_type == "hot"){
    $json_url="/files/anchors.json";
}else if($anc_type =="new"){
    $json_url="/files/newAnchors.json";
}

$datas = curl_get(_INTERFACE_.$json_url,"");
$acceptData=json_decode($datas, true);
$hotlist=json_decode($acceptData,true);

$newAnchors=array();
foreach($hotlist as $k=>$v){
    $rtp_key=_REDIS_KEYB_."_c.mt.cs.ea.rt.hash.".$v['roomNumber']."_4";
    $hash_room=$redis->hGetAll("$rtp_key");

    if($hash_room != ""){
        $v['online']=$hash_room['online'];
    }

    $newAnchors[]=$v;
}
echo json_encode($newAnchors);
include('../include/footer.inc.php');

