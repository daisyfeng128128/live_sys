<?php
$app_path_tmp=str_replace('\\','/',str_replace('common\\function\\path_config.php','',str_replace('common/function/path_config.php','',__FILE__)));

$avatar_path=$app_path_tmp."static_data/uploaddata/avatar/";
$idcard_path=$app_path_tmp."static_data/uploaddata/idcard/";
$bigphoto_path=$app_path_tmp."static_data/uploaddata/bigphoto/";
$tmp_path=$app_path_tmp."static_data/uploaddata/tmp/";
$tmp_url="/static_data/uploaddata/tmp/";
$upload_url=("http://".$_SERVER['HTTP_HOST']."/avatar_upload.php");
$pic_path=$app_path_tmp."static_data/uploaddata/pics/";
$showcover_path=$app_path_tmp."static_data/showcover/";
$avatar_domain=$_SERVER['HTTP_HOST'];
$live_photo=$app_path_tmp."static_data/uploaddata/photo/";
$clantopic_pic=$app_path_tmp."static_data/uploaddata/clantopic/";
$admin_upload_dir=$app_path_tmp."static_data/uploaddata/bg/";