<?php
include('../include/header.inc.php');
include("../include/level.func.php");

$user=checklogin();
if(!$user){
    $data['resultStatus']=100;
    $data['data']="no login!";
    echo json_encode($data);
    exit();
}
$tpe=$_POST['t'];
if($tpe==0){
    $_sql = "d.type=0";
}else{
    $_sql = "d.type <> 0";
}
switch($tpe){
    case 1:
        $__sql=" d.userId ";
        $_sql=  $_sql = "d.type <> 0";
        break;
    case 0:
        $__sql=" d.userId ";
        $_sql=  $_sql = "d.type = 0";
        break;
    case 2:
        $__sql=" d.toUserId ";
        $_sql=  $_sql = "d.type <> 0";
        break;
    default:
        $__sql=" d.userId ";
        $_sql=  $_sql = "d.type <> 0";

}

$year=$_POST['y']?$_POST['y']: date("Y");
$month=$_POST['m']?$_POST['m']:date("m");
$t=$year."-".$month."-01";
$t1= $year."-".($month+1)."-01";
$c_time=strtotime($t);
$n_time=strtotime($t1);

$page=$_POST['p']?$_POST['p']:1;
$limit=10;

$sql="select d.*, u.nickname as nickname,g.giftname as giftname,g.giftimage as giftimage from bu_gift_details d left JOIN bu_user u on d.toUserId= u.userId LEFT JOIN gift g on d.giftIds = g.giftid
 where ".$__sql." = 23 and unix_timestamp(d.createDT) > $c_time and unix_timestamp(d.createDT) < $n_time  and ".$_sql." and  d.status = 1 order by createDT desc";
$rsc=$db->CacheGetArray($sql);
$count =count($rsc);
$pageNum = ceil($count / $limit);
$pagelinks=breakLen("/",$page,$pageNum,$limit);

if(!($count>$limit)){
    $rs=$rsc;
}else{
    $start=($page-1)*$limit;
    $sql="select d.*, u.nickname as nickname,g.giftname as giftname,g.giftimage as giftimage from bu_gift_details d left JOIN bu_user u on d.toUserId= u.userId LEFT JOIN gift g on d.giftIds = g.giftid
 where  ".$__sql."  = $user[userId] and unix_timestamp(d.createDT) > $c_time and unix_timestamp(d.createDT) < $n_time and ".$_sql." and d.status = 1 order by createDT desc limit $start,$limit";
    $rs=$db->CacheGetArray($sql);
}
if($rs){
    $data['resultStatus']=200;
    $data['num']=count($rs);
    $data['data']=reArrayNickname($rs);
    $data['pagelinks']=$pagelinks;
    $data['imghost'] = _IMAGES_DOMAIN_;
}else{
    $data['resultStatus']=100;
    $data['data']="";
    $data['pagelinks']="";
}

echo json_encode($data);
include('../include/footer.inc.php');
?>

