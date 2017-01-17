<?php

include(dirname(dirname(__FILE__))."/include/header.inc.php");
include(dirname(dirname(__FILE__))."/include/level.func.php");

//$path = $_SERVER['DOCUMENT_ROOT'];
//include $path."/index.php";
//header('Content-Type: text/html; charset=utf-8');
$result = array();
$result['success'] = false;
$success_num = 0;
$msg = '';
$user=checklogin();
//上传目录
$dir = "/public/upload/";

if(!file_exists($dir)){
    mkdir($dir,0755);
}

function uploadImages1($imgurl){
    $zimg_upload_url = _IMAGES_DOMAIN_;
    $simg=$imgurl;

    $ch = curl_init();

    $post_data = file_get_contents($simg); // raw_post方式

    $headers = array();
    $headers[] = 'Content-Type:jpg'; // 还有这里！

    curl_setopt($ch, CURLOPT_URL, $zimg_upload_url);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    $info = curl_exec($ch);
    curl_close($ch);
    $json = json_decode($info, true);
    if($json['ret']==true){
        return $json['info']['md5'];
    }
    return false;
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
            $md5_fanmian=uploadImages1($savePath);
            $result['avatarUrls'][$i] = _IMAGES_DOMAIN_."/".$md5_fanmian;
            global $db;
            $db->Execute("update bu_user set avatar='$md5_fanmian' where userId= $user[userId]");
            $_SESSION['login_info']['avatar']=$md5_fanmian;
            if($db->Affected_Rows()>0){
                $result['message']=200;
            }else{
                $result['message']=$savePath;
            }
        }else{
            $result['success'] = "error to load to local server!";
        }


	}
} 
//<------------------------------------------------------------------------处理头像图片结束
//upload_url中传递的额外的参数，如果定义的method为get请换为$_GET
$result["userId"]	= $_POST["userId"];
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