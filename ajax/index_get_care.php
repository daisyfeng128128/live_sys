<?php

include("../include/header.inc.php");
include_once("../include/level.func.php");
include_once('../include/login.func.php');

$user=checklogin();
$care_list=array();
$recommand_list=array();


//get-hot-anchor
    function getHotAnchor($num){
        $datas = curl_post(_CDNDOMAIN_."/rest/homeAnchors/hotAnchors.mt","");
        $acceptData=json_decode($datas, true);
        if($num>0 && count($acceptData) >5){
            array_slice($acceptData,0,$num);
        }
        return $acceptData[data];
    }
    function getCareAhchor($userId){
         global $db;
        return $db->CacheGetArray("select b.roomNumber,
(SELECT o.online from bu_user_online o where o.roomnumber = b.roomNumber and o.anchors=1) online,
u.nickname,u.userId,u.totalpoint,
a.followeds
from  bu_user_studio b,user u,bu_user_anchors a
where b.userId=$userId
and u.usernumber = b.roomNumber
and a.roomNumber = b.roomNumber
limit 5
");
    }

if(!$user){
    $data['array']=getHotAnchor(5);
    $data['num']=5;
}else{
    $care_list =getCareAhchor($user[userId]);
    $data['array']=$care_list;
    $data['num']=count($care_list);
    //为关注
    if(!$care_list){
        $data['array']=getHotAnchor(5);
        $data['num']=5;
    }
    //补全
    if($data['num'] <5){
        //拼合去重

    }

}

echo "<pre>";
print_r($data);
echo "</pre>";

echo json_encode($data,true);

include('../include/footer.inc.php');

?>