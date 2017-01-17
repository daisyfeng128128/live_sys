<?php
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
header("Content-Type: text/html; charset=UTF-8");
include('../include/header.inc.php');
include('../include/FileUpload.php');
$user=checklogin();
if(!$user){
    exit();
}


$up = new FileUpload();

//设置属性(上传的位置， 大小， 类型， 名是是否要随机生成)
$dir_path="/static_data/tmp_img/";
$tmp_path= dirname(dirname(__FILE__)).$dir_path;
$up -> set("path", $tmp_path);
$up -> set("maxsize", 2000000);
$up -> set("allowtype", array("gif", "png", "jpg","jpeg"));
$up -> set("israndname", false);

$fileinfo = empty($_FILES['Filedata'])?'__avatar1':'Filedata';


if($up -> upload($fileinfo)) {

    $sha1["src"] =$dir_path.$up->getFileName();
    $md5_fanmian=uploadImages($sha1["src"]);

    echo json_encode($md5_fanmian);
} else {

    echo json_encode($up->getErrorMsg());
}


?>










