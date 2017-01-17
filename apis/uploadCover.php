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


//TODO 修改为配置
$zimg_upload_url = _IMAGES_DOMAIN_;

$realpath = dirname(dirname(__FILE__)).$_POST[srcImage];
$ext=explode('.',$realpath);
$ext=$ext[1];
// 上传图片到zimg图片存储服务
$ch = curl_init();

// 关键在这里！
$post_data = file_get_contents($realpath); // raw_post方式

$headers = array();
$headers[] = 'Content-Type:'.$ext; // 还有这里！

curl_setopt($ch, CURLOPT_URL, $zimg_upload_url);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//启用时会发送一个常规的POST请求，类型为：application/x-www-form-urlencoded，就像表单提交的一样。
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);

$info = curl_exec($ch);
curl_close($ch);

$json = json_decode($info, true);
$signature = $json['info']['md5'];

$ratio=268/$_POST[newWidth];

$w=268*$ratio;
$h=408*$ratio;
echo $signature."?w=$w&h=$h&x=$_POST[startX]&y=$_POST[startY]&p=3";

?>