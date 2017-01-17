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
$tpe=$_REQUEST['t'];
if($tpe==0){
    $_url = _INTERFACE_."/rest/usersGiftDetails/topUp.mt";
}else{
    $_url = _INTERFACE_."/rest/usersGiftDetails/trading.mt";
}

$year=$_POST['y']?$_POST['y']: date("Y");
$month=$_POST['m']?$_POST['m']:date("m");
$t=$year."-".$month."-01";
$t1= $year."-".($month+1)."-01";
$c_time=strtotime($t);
$n_time=strtotime($t1);
$page=$_POST['p']?$_POST['p']:1;

$limit=10;

$statrParam = array(
    'between'=>0,
    'end'=>0,
    'year'=>$year,
    'monte'=>$month,
    'userId'=>$user[userId]
);

$dataAll = curl_get($_url,$statrParam);
$pageDataAll =  json_decode($dataAll);
$count =count($pageDataAll->data);
$pageNum = ceil($count / $limit);
$pagelinks=breakLen("/",$page,$pageNum,$limit);


if($count < $limit){
    $dataObj = $dataAll;
}else{
    $dataObj = curl_get($_url,array(
        'between'=>($page-1)*$limit,
        'end'=>10,
        'year'=>$year,
        'monte'=>$month,
        'userId'=>$user[userId]
    ));
}


$dataObject = json_decode($dataObj);
$dataObject -> pagelinks = $pagelinks;
echo json_encode($dataObject);
exit();
?>