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
global $userid;
$userid= $user[userId];
function imagecropper($source_path, $target_width, $target_height,$x,$y,$nw,$nh,$new_small_img_path)
{
    $source_info   = getimagesize($source_path);
    $source_width  = $source_info[0];
    $source_height = $source_info[1];
    $source_mime   = $source_info['mime'];
    $source_ratio  = $source_height / $source_width;
    $target_ratio  = $target_height / $target_width;

    // 源图过高
    if ($source_ratio > $target_ratio)
    {
        $cropped_width  = $source_width;
        $cropped_height = $source_width * $target_ratio;
        $source_x = 0;
        $source_y = ($source_height - $cropped_height) / 2;
    }
    // 源图过宽
    elseif ($source_ratio < $target_ratio)
    {
        $cropped_width  = $source_height / $target_ratio;
        $cropped_height = $source_height;
        $source_x = ($source_width - $cropped_width) / 2;
        $source_y = 0;
    }
    // 源图适中
    else
    {
        $cropped_width  = $source_width;
        $cropped_height = $source_height;
        $source_x = 0;
        $source_y = 0;
    }

    switch ($source_mime)
    {
        case 'image/gif':
            $source_image = imagecreatefromgif($source_path);
            break;

        case 'image/jpeg':
            $source_image = imagecreatefromjpeg($source_path);
            break;

        case 'image/png':
            $source_image = imagecreatefrompng($source_path);
            break;

        default:
            return false;
            break;
    }

    $target_image  = imagecreatetruecolor($target_width, $target_height);
    $cropped_image = imagecreatetruecolor($nw, $nh);

    // 裁剪
    imagecopy($cropped_image, $source_image, 0, 0, $x, $y, $nw, $nh);
    // 缩放
    imagecopyresampled($target_image, $cropped_image, 0, 0, 0, 0, $target_width, $target_height, $nw,$nh);
    //文件名
    function get_newi_name(){
        global $userid;
        return $userid."_small_protrait.jpg";
    }
    $filepath=$new_small_img_path.get_newi_name();
    header('Content-Type: image/jpeg');
    if(imagejpeg($target_image,$filepath)){
        imagedestroy($source_image);
        imagedestroy($target_image);
        imagedestroy($cropped_image);
        return $filepath;
    }else{
        return $target_image;
    }
}
$new_small_img_path=dirname(dirname(__FILE__))."/static_data/image_fengmian/";

$dir_path="/static_data/tmp_img/";
$tmp_path= dirname(dirname(__FILE__)).$dir_path;
$source_img=dirname(dirname(__FILE__)).$_POST[srcImage];
$newimg = imagecropper($source_img,268,408,$_POST[startX],$_POST[startY],$_POST[newWidth],$_POST[newHeight],$new_small_img_path);        //保存裁切图片

if(!$newimg){
    echo json_encode(array("message"=>"cai tu 失败!",'code'=>100));
    exit();
}else{
    unlink($source_img);
}
//传送小图到images服务器

//TODO 修改为配置
$zimg_upload_url = _IMAGES_DOMAIN_;
$simg=_CDNDOMAIN_."/static_data/image_fengmian/".$userid."_small_protrait.jpg";
// 上传图片到zimg图片存储服务
$ch = curl_init();
// 关键在这里！
$post_data = file_get_contents($simg); // raw_post方式

$headers = array();
$headers[] = 'Content-Type:jpg'; // 还有这里！

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


if($json['ret']!=true){
    echo json_encode(array("message"=>"error load to images server!",'code'=>300));
    exit();
}else{
    $db->Execute("update  bu_user_anchors set addtime='".date("Y-m-d H:i:s",time())."',bigCover='$signature' where userId='{$user['userId']}'");
    if($db->Affected_Rows()>0){
        echo json_encode(array("message"=>true,'code'=>200,'md5'=>$signature));
        exit();
    }else{
        echo json_encode(array('code'=>120,'message'=>"insert error!"));
        exit();
    }
}

?>
