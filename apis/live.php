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
	case 'startshow'://检查该用户是否存在尚未结束的show,如果有直接返回showid，如果没有新建show之后返回showid
		$showid=$db->GetOne("select id from shows where endtime is null and roomnumber='{$user['usernumber']}'");
		
		/*
		if(!$showid){
			if($user['upload_cover']){
				$showcover=$user['upload_cover'];
			}
			else{
				$showcover="";
			}
			$showercateid=$db->GetOne("select showercateid from room_config where roomnumber='{$user['usernumber']}'");
			if(empty($showercateid))$showercateid=1;
			
			$db->Execute("insert into shows (userid,roomnumber,starttime,showercateid,showcover)values('{$user['userid']}','{$user['usernumber']}','".time()."','$showercateid','$showcover')");
			$showid=$db->Insert_ID();
			$exist=false;
		}
		else{
			$exist=true;
			$db->Execute("update shows set lastdisconnect=null where roomnumber='{$user['usernumber']}'");
		}
		*/
		
		//每次开播都建一条记录,不显您存在尚未结束的直播
		if($user['upload_cover']){
			$showcover=$user['upload_cover'];
		}
		else{
			$showcover="";
		}
		$showercateid=$db->GetOne("select showercateid from room_config where roomnumber='{$user['usernumber']}'");
		if(empty($showercateid))$showercateid=1;
		$db->Execute("update shows set endtime=".time()." where roomnumber='{$user['usernumber']}' and endtime is null");
		
		$db->Execute("insert into shows (userid,roomnumber,starttime,showercateid,showcover)values('{$user['userid']}','{$user['usernumber']}','".time()."','$showercateid','$showcover')");
		$showid=$db->Insert_ID();
		$exist=false;
		//---------end-------
		
		
		$db->Execute("update user set isshowing=1 where usernumber='{$user['usernumber']}'");
		echo json_encode(array('isexist'=>$exist,'showid'=>$showid,'usernumber'=>$user['usernumber'],'showcover'=>$showcover));
		break;
	case 'endshow':
		$showid=(int)$_GET['showid'];
		$db->Execute("update shows set endtime='".time()."' where id='$showid' and roomnumber='{$user['usernumber']}' and endtime is null");
		$db->Execute("update user set isshowing=0 where usernumber='{$user['usernumber']}'");
		$db->Execute("delete from songrequest where roomnumber='{$user['usernumber']}'");
		$db->Execute("DELETE from show_users where roomnumber='{$user['usernumber']}' and userid in(select userid from user where accountfrom=9)");//主播退出删除在此房间的机器人
		break;
	case 'startrecord':
		break;
	case 'endrecord':
		break;
	case 'setup'://更新封面图片和标题
		if($_GET['pass']!='true'){
			$showid=$db->GetOne("select id from shows where endtime is null and roomnumber='{$user['usernumber']}'");
			$imgname=$showid.uniqid('_').".jpg";
			$filename=$showcover_path.$imgname;//要生成的图片名字
			$jpg = $GLOBALS[HTTP_RAW_POST_DATA];
			$title=addslashes(htmlspecialchars(unescape($_GET['title'])));
			$title=substr($title,0,30);
			if($_GET["onlytitle"]=="1"){
				$db->Execute("update shows set showtitle='".addslashes($title)."' where id='$showid'");
			}
			else{
				file_put_contents($filename,$jpg);
				$db->Execute("update shows set showtitle='".addslashes($title)."',showcover='$imgname' where id='$showid'");
			}
			//if($_GET['isupload']=='true'){
				$db->Execute("update user set upload_cover='$imgname' where userid='$user[userid]'");
			//}
		}		
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