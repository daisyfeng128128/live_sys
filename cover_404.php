<?php
$url="http://".$_SERVER['HTTP_HOST'].$_SERVER['REDIRECT_URL'];//��Դ�������Դ�������������ͼ,�Զ����ɣ���д���ļ�

//�ֻ��ɿ���������|��ᣬ����һ��Сͼ(�ߺͿ�����һ����Ϊ0,�����Ϊ0,��ͨ���������ͼƬ��С�����Զ�������߶�)
//http://www.wpy.demo1.com/static_data/showcover/thumb200x150_11538_52d9098bbd6e7.jpg
preg_match("/.+thumb([0-9]+x[0-9]+).+.[jpg|jpeg|gif|png]/",$url,$match);
if($match){
	$tmp=explode('/',$url);
	$filename=$tmp[count($tmp)-1];
	if(strpos($_SERVER['REDIRECT_URL'],"photo")!==false){//�����,static_data/uploaddata/photo/thumb55_19838_54446d54d5e67.jpg
		$dir="./static_data/uploaddata/photo/";
	}else{//����������/static_data/showcover/thumb200x150_11538_52d9098bbd6e7.jpg
		$dir="./static_data/showcover/";
	}
	
	$dist_filename=$filename;
	$source_filename=str_replace('thumb'.$match[1].'_','',$filename);
	if(!file_exists($dir.$source_filename)){
		returnCode404();
		exit;
	}
	$size=explode('x',$match[1]);
	if(empty($size[0])){//��=0,����ͨ��������ȥ����
		$arr=getimagesize($dir.$source_filename);
		$size[0] = (int)($size[1]/($arr[1]/$arr[0]));
	}
	if(empty($size[1])){//��=0,����ͨ��������ȥ����
		$arr=getimagesize($dir.$source_filename);
		$size[1] = (int)($arr[1]/$arr[0]*$size[0]);
	}
	include_once 'tools/phpthumb.php';
	makeThumb($dir.$source_filename,$dir.$dist_filename,$size[0],$size[1],1,2);
	header("Location:$url");
//����û�û���ϴ�ͷ��������һ��Ĭ�ϵ�ͷ��
//http://www.wpy.demo1.com/static_data/uploaddata/avatar/1/1.gif
}else if(substr($_SERVER['REDIRECT_URL'],0,30)=="/static_data/uploaddata/avatar"){
	$tmp = explode('/',$_SERVER['REDIRECT_URL']);
	$user['userid'] = (int)$tmp[5];
	include_once('./include/path_config.php');
	$avatar_path=$avatar_path.substr($user['userid'],0,1)."/";
	if(!file_exists($avatar_path)){
		mkdir($avatar_path,0755);
	}
	$uploadfile = $avatar_path.$user['userid'].'.gif';
	copy($app_path_tmp."images/2456_120x120.jpg",$uploadfile);
	header("Location:$url");
}else{
	//header("Location:http://".$_SERVER['HTTP_HOST']."/");
	returnCode404();
}

function returnCode404(){
	header('HTTP/1.1 404 Not Found');
	header("status: 404 Not Found");
	exit;
}