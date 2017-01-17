<?php
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
header("Content-Type: text/html; charset=UTF-8");
include('../include/header.inc.php');
include('../include/path_config.php');
include('../include/FileUpload.php');
$user=checklogin();
if(!$user){
    exit();
}

if(!empty($_FILES['Filedata'])){
    $up = new FileUpload();
    //设置属性(上传的位置， 大小， 类型， 名是是否要随机生成)
    $dir_path="/static_data/tmp_img/";
    $tmp_path= dirname(dirname(__FILE__)).$dir_path;
    $up -> set("path", $tmp_path);
    $up -> set("maxsize", 2000000);
    $up -> set("allowtype", array("gif", "png", "jpg","jpeg"));
    $up -> set("israndname", false);

    if($up -> upload('Filedata')) {
        $sha1["ht1"] =$dir_path.$up->getFileName();
        echo json_encode($sha1);
    } else {
        echo json_encode($up->getErrorMsg());
    }

}else{
    print_r($_FILES);
}
?>
