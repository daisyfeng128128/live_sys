<?php

include(dirname(dirname(__FILE__))."/include/header.inc.php");
header('Content-Type: text/html; charset=utf-8');
$result = array();
$result['success'] = false;
$success_num = 0;
$msg = '';
//上传目录
$dir = dirname(dirname(__FILE__))."/upload/";

if(!file_exists($dir)){
    mkdir($dir,0755);
}

$filename = date("YmdHis").'_'.floor(microtime() * 1000).'_'.createRandomCode(8);

$avatars = array("__avatar1");
$avatars_length = count($avatars);
for ( $i = 0; $i < $avatars_length; $i++ )
{ 
	$avatar = $_FILES[$avatars[$i]];
	$avatar_number = $i + 1;
	if ( $avatar['error'] > 0 )
	{
		$msg .= $avatar['error'];
	}
	else
	{
		$savePath =  $dir."$filename.jpg";

        if(move_uploaded_file($avatar["tmp_name"], $savePath)){
               $success_num++;
            $result['avatarUrls'][$i] = toVirtualPath($savePath);
        }else{
            $result['avatarUrls'][$i] = "1111____";
        }


	}
} 
//<------------------------------------------------------------------------处理头像图片结束
//upload_url中传递的额外的参数，如果定义的method为get请换为$_GET
$result["userid"]	= $_POST["userid"];
$result["username"]	= $_POST["username"];

$result['msg'] = $msg;
if ($success_num > 0)
{
	$result['success'] = true;
}
//返回图片的保存结果（返回内容为json字符串）
print json_encode($result);

/**************************************************************
*  生成指定长度的随机码。
*  @param int $length 随机码的长度。
*  @access public
**************************************************************/
function createRandomCode($length)
{
	$randomCode = "";
	$randomChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for ($i = 0; $i < $length; $i++)
	{
		$randomCode .= $randomChars { mt_rand(0, 35) };
	}
	return $randomCode;
}

/**************************************************************
*  将物理路径转为虚拟路径。
*  @param string $physicalPpath 物理路径。
*  @access public
**************************************************************/
function toVirtualPath($physicalPpath)
{
	$virtualPath = str_replace($_SERVER['DOCUMENT_ROOT'], "", $physicalPpath);
	$virtualPath = str_replace("\\", "/", $virtualPath);
	return $virtualPath;
}
?>