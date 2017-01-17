<?php 
$type=(int)$_GET['type'];
$roomnumber=(int)$_GET['roomnumber'];
$userid=$_GET['userid'];
include('../include/header.inc.php');
//$db->debug = true;
$time = time();
$action = $_GET["action"];
switch($action){
	case "demo1":
		$user=checklogin();
		
		$showinfo["blocklevel"] = $blocklevel;
		$showinfo['haverights']=o2oHaverRoom($user,$roomnumber);
		
		echo json_encode($showinfo);
		break;
	case "getlist"://取得相册列表		
		//http://www.wpy.demo1.com/apis/phont_api.php?action=getlist&roomnumber=300095
		$user=checklogin();
		
		$page = max((int) $_GET['p'], 1);
		$limit = 10;
		$start = ($page - 1) * $limit;
		$where_limit = " limit $start, $limit";
		$list = $db->GetArray("select * from live_photo where userid=(select userid from user where usernumber=$roomnumber) ORDER BY photoid desc $where_limit");
		$data = array();
		$photos = "";
		foreach($list as $value){
			$value["like_text"] = "赞";
			$value["month"] = date("m",$value["addtime"]);
			$value["day"] = date("d",$value["addtime"]);
			$photos .= ",".$value["photoid"];
			$data[$value["photoid"]] = $value;
		}
		if($user){
			$photos = trim($photos,",");
			if($photos){
				$live_photo_zan = $db->GetArray("select photoid from live_photo_zan where userid=$user[userid] and photoid in($photos)");
				foreach($live_photo_zan as $value){
					$data[$value["photoid"]]["like_text"] = "取消赞";
				}
			}
		}
		
		$data = array_values($data);
		echo json_encode($data);
		break;
	case "zan"://赞
		$user=checklogin();
		$photoid = (int)$_POST["id"];
		if(!empty($photoid) && $user){
			$db->Execute("insert into live_photo_zan(userid,photoid) value('$user[userid]','$photoid')");
			if($db->Affected_Rows()>0){
				$db->Execute("UPDATE live_photo set zancount=zancount+1 where photoid=$photoid");
				$res = array("code"=>200);
			}
		}
		if(empty($res)){
			$res = array("code"=>500,"info"=>"操作失败，请稍后再试");
		}
		echo json_encode($res);
		break;
	case "zan_cancel"://取消赞
		$user=checklogin();
		$photoid = (int)$_POST["id"];
		if(!empty($photoid) && $user){
			$db->Execute("DELETE from live_photo_zan where userid=$user[userid] and photoid=$photoid");
			if($db->Affected_Rows()>0){
				$db->Execute("UPDATE live_photo set zancount=zancount-1 where photoid=$photoid and zancount>0");
				$res = array("code"=>200);
			}
		}
		if(empty($res)){
			$res = array("code"=>500,"info"=>"操作失败，请稍后再试");
		}
		echo json_encode($res);
		break;
	case "live_upphoto"://上传相册
		$user=checklogin();
		if(empty($_POST["photoname"])){
			echo "<script>parent.Main.alert('请输入标题');</script>";
		}else if(strlen($_POST["photoname"])>200){
			echo "<script>parent.Main.alert('标题最多不能超过200字');</script>";
		}else{
			//file_put_contents("1", json_encode($_FILES));
			if(file_exists($_FILES['Filedata']['tmp_name'])){
				$extension = substr(strrchr($_FILES['Filedata']['name'], '.'), 1);
				if(in_array($extension,array("gif","png","jpg"))){
					$uuid=uniqid('');
					$upload_name= $user['userid']."_". $uuid .'.'.$extension;
					include_once($app_path."include/path_config.php");
					$uploadfile = $live_photo.$upload_name;
					//exec('convert "'.$_FILES['Filedata']['tmp_name'].'" -gravity center "'.$uploadfile.'"');
					
					$arr=getimagesize($_FILES['Filedata']['tmp_name']); 
					$width = 600;
					$height = (int)($arr[1]/$arr[0]*$width);
					
					include_once $app_path.'tools/phpthumb.php';
					$tmp = makeThumb($_FILES['Filedata']['tmp_name'],$uploadfile,$width,$height);
					if($tmp[0]=="0"){
						$db->Execute("insert into live_photo (`userid`,title,path,addtime)values('{$user['userid']}','".strip_tags($_POST["photoname"])."','$upload_name','".time()."')");
						echo "<script>parent.Photo.ShowUploadSuccess()</script>";
					}else{
						echo "<script>parent.Main.alert('操作失败，请重新再试');parnet.$('#photoUpload .close').click();</script>";
					}
					/*
					$attr = $width."x".$height;
					exec('convert "'.$_FILES['Filedata']['tmp_name'].'" -thumbnail "'.$attr.'^" -gravity center -extent "'.$attr.'" "'.$uploadfile.'"');
					$db->Execute("insert into live_photo (`userid`,title,path,addtime)values('{$user['userid']}','".$_POST["photoname"]."','$upload_name','".time()."')");
					echo "<script>parent.Photo.ShowUploadSuccess()</script>";
					*/
					/*if (move_uploaded_file($_FILES['Filedata']['tmp_name'], $uploadfile)) {
						$db->Execute("insert into live_photo (`userid`,title,path,addtime)values('{$user['userid']}','".$_POST["photoname"]."','$upload_name','".time()."')");
						echo "<script>parent.Photo.ShowUploadSuccess()</script>";
					}else{
						echo "<script>parent.Main.alert('操作失败，请重新再试');parnet.$('#photoUpload .close').click();</script>";
					}*/
				}else{
					echo "<script>parent.Main.alert('只能上传gif,png,jpg格式的图片');</script>";
				}
				@unlink($_FILES['Filedata']['tmp_name']);
			}else{
				echo "<script>parent.Main.alert('请上图片');</script>";
			}
		}
		break;
	case 'photocomment'://相册评论
		$user=checklogin();
		$res = array("code"=>500,"txt"=>"","info"=>"");
		if(!$user){
			$res["txt"]="请先登录";
		}else if(strlen($_GET["content"])>200){
			$res["txt"]="最多不能超过200字";
		}else{
			$photoid = (int)$_GET["photoid"];
			$content = strip_tags($_GET["content"]);
			$row = $db->GetRow("select * from live_photo where photoid='$photoid'");
			if(!empty($row)){
				$db->Execute("insert into live_photo_comment (`photoid`,userid,`content`,addtime)values('$photoid','{$user['userid']}','$content','".time()."')");
				$photocommentid=$db->Insert_ID();
				$db->Execute("update live_photo set commentcount=commentcount+1 where photoid='$photoid'");
				$res["code"]=200;
				$res["userid"]=$user["userid"];
				$res["nickname"]=$user["nickname"];
				$res["photocommentid"]=$photocommentid;
				$res["addtime"]=date("Y-m-d");
			}else{
				$res["txt"]="评论失败，请刷新页面后再试";
			}
		}
		echo json_encode($res);
		break;
	case 'photodel'://相册删除
		$user=checklogin();
		$res = array("code"=>500,"txt"=>"");
		if(!$user){
			$res["txt"]="请先登录";
		}else{
			$photoid = (int)$_GET["photoid"];
			$row = $db->GetRow("select * from live_photo where photoid=$photoid");
			if($row[userid]==$user["userid"]){
				$db->Execute("DELETE from live_photo where photoid='$photoid'");
				if($db->Affected_Rows()>0){
					$db->Execute("DELETE from live_photo_comment where photoid='$photoid'");
					$db->Execute("DELETE from live_photo_zan where photoid='$photoid'");
					include_once($app_path."include/path_config.php");
					@unlink($live_photo.$row["path"]);
					$res["code"]=200;
				}else{
					$res["txt"]="操作失败，请稍后再试";
				}
			}else{
				$res["txt"]="权限不足";
			}
		}
		echo json_encode($res);
		break;
	case 'photoCommentDel'://删除相册评论
		$user=checklogin();
		$res = array("code"=>500,"txt"=>"");
		if(!$user){
			$res["txt"]="请先登录";
		}else{
			$photocommentid = (int)$_GET["id"];
			$row = $db->GetRow("select c.*,p.userid as suserid from live_photo_comment c,live_photo p where p.photoid=c.photoid and c.photocommentid=$photocommentid");
			if($row["userid"]==$user["userid"] || $row["suserid"]==$user["userid"]){//只有自己或主播可以删除
				$db->Execute("DELETE from live_photo_comment where photocommentid='$photocommentid'");
				if($db->Affected_Rows()>0){
					$db->Execute("update live_photo set commentcount=commentcount-1 where photoid='$row[photoid]' and commentcount>0");
					$res["code"]=200;
				}else{
					$res["txt"]="操作失败，请稍后再试";
				}
			}else{
				$res["txt"]="权限不足";
			}
		}
		echo json_encode($res);
		break;
	case "isvideo"://设为(取消)离线
		$user=checklogin();
		$photoid = (int)$_POST["id"];
		if(!empty($photoid) && $user){
			$isvideo = (int)$_POST["isvideo"];
			if($isvideo==1){
				$isvideo = 2;
			}else{
				$isvideo = 1;
			}
			$db->Execute("UPDATE live_photo set isvideo='$isvideo' where photoid=$photoid and userid='{$user["userid"]}'");
			$res = array("code"=>200,"isvideo"=>$isvideo);
		}
		if(empty($res)){
			$res = array("code"=>500,"info"=>"操作失败，请稍后再试");
		}
		echo json_encode($res);
		break;
}
include('../include/footer.inc.php');