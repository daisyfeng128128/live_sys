<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include('../include/header.inc.php');
include('../include/path_config.php');
//check login
$_COOKIE['HFCOOKIE']=$_GET['c'];
$user=checklogin();
/*
$showercateid=1;
if($user['totalpoint']>=1000){
	$showercateid++;
}
if($user['totalpoint']>=100000){
	$showercateid++;
}
if($user['totalpoint']>=1200000){
	$showercateid++;
}*/
if(!$user){
	exit();
}

switch($_GET['action']){
	case 'startrecord'://检查用户储存的视频是否超过限制,http://www.wpy.demo1.com/apis/record.php?action=startrecord&c=854982eae00bfe4540cbad1e2a2cf19d36ed01e407aa006e04eaea288bc4f550
		$count = $db->GetOne("select count(*) from live_photo where userid=$user[userid] and isvideo in(1,2)");
		$isvideo = (int)$_GET['isvideo'];
		//是录视频次数是否超过限制
		if($count<$global_config_data["live_record_count"]){//判断是否超过录视频上限
			$isallow = "yes";
			$db->Execute("insert into live_photo (`userid`,title,path,addtime,isvideo)values('{$user['userid']}','','','".time()."',{$isvideo})");
			$id=$db->Insert_ID();
		}else{
			$isallow = "no";
		}
		echo json_encode(array('isallow'=>$isallow,'id'=>$id));
		break;
	case 'setup'://更新封面图片和标题
		//$db->debug = true;
		$showid = (int)$_GET['id'];
		//$showid=$db->GetOne("select photoid from live_photo where photoid=$id and userid='{$user['userid']}'");
		$imgname=$showid.uniqid('_').".jpg";
		$filename=$live_photo.$imgname;//要生成的图片名字
		$jpg = $GLOBALS[HTTP_RAW_POST_DATA];
		$title=addslashes(htmlspecialchars(unescape($_GET['title'])));
		$title=substr($title,0,30);
		file_put_contents($filename,$jpg);
		$db->Execute("update live_photo set title='".addslashes($title)."',path='$imgname' where photoid='$showid' and userid='{$user['userid']}'");
		break;
}
include('../include/footer.inc.php');
function unescape($str) 
{ 
    $ret = ''; 
    $len = strlen($str); 
    for ($i = 0; $i < $len; $i ++) 
    { 
        if ($str[$i] == '%' && $str[$i + 1] == 'u') 
        { 
            $val = hexdec(substr($str, $i + 2, 4)); 
            if ($val < 0x7f) 
                $ret .= chr($val); 
            else  
                if ($val < 0x800) 
                    $ret .= chr(0xc0 | ($val >> 6)) . 
                     chr(0x80 | ($val & 0x3f)); 
                else 
                    $ret .= chr(0xe0 | ($val >> 12)) . 
                     chr(0x80 | (($val >> 6) & 0x3f)) . 
                     chr(0x80 | ($val & 0x3f)); 
            $i += 5; 
        } else  
            if ($str[$i] == '%') 
            { 
                $ret .= urldecode(substr($str, $i, 3)); 
                $i += 2; 
            } else 
                $ret .= $str[$i]; 
    } 
    return $ret; 
}