<?php 
header("Content-type:text/html;charset=utf-8");
include('head.php');
$action = $_GET["action"];
switch($action){
	case 'uploadfile'://上传图片
		if(file_exists($_FILES['imgFile']['tmp_name'])){
			$extension = substr(strrchr($_FILES['imgFile']['name'], '.'), 1);
			if(in_array($extension,array("gif","png","jpg"))){
				$uuid=uniqid('');
				$upload_name= $_SESSION["admin"]["ID"]."_". $uuid .'.'.$extension;
				include_once($app_path."include/path_config.php");
				$uploadfile = $admin_upload_dir.$upload_name;
				
				$arr=getimagesize($_FILES['imgFile']['tmp_name']);
				include_once $app_path.'tools/phpthumb.php';
				
				$arr=getimagesize($_FILES['imgFile']['tmp_name']); 
				$width = $arr[0];
				$height = $arr[1];
				$tmp = makeThumb($_FILES['imgFile']['tmp_name'],$uploadfile,$width,$height);
				if($tmp[0]=="0"){
					echo json_encode(array('error' => 0, 'url' => '/static_data/uploaddata/bg/'.$upload_name));
				}
			}else{
				echo json_encode(array('error' => 1, 'message' => "上传有错..只能上传，gif,png,jpg格式的图片."));
			}
			@unlink($_FILES['imgFile']['tmp_name']);
		}
		break;
	case 'top':
		break;
}
include('../../include/footer.inc.php');