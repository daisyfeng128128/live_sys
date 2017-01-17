<?php 
$type=(int)$_GET['type'];
$roomnumber=(int)$_GET['roomnumber'];
$userid=$_GET['userid'];
include('../include/header.inc.php');
//$db->debug = true;
$time = time();
$action = $_GET["action"];
switch($action){
	case 'topicadd'://新建话题
		$user=checklogin();
		if(!$user){
			echo "<script>parent.Main.alert('请先登录');</script>";
		}else if(empty($_POST["title"])){
			echo "<script>parent.Main.alert('标题不能为空');</script>";
		}else if(strlen($_POST["title"])>100){
			echo "<script>parent.Main.alert('标题最多不能超过100字');</script>";
		}else if(empty($_POST["content"])){
			echo "<script>parent.Main.alert('内容不能为空');</script>";
		}else if(strlen($_POST["content"])>1000){
			echo "<script>parent.Main.alert('内容最多不能超过1000字');</script>";
		}else if(empty($user["clanid"])){
			echo "<script>parent.Main.alert('请先加入家族再发布话题');</script>";
		}else{
		
			if(file_exists($_FILES['Filedata']['tmp_name'])){
				$extension = substr(strrchr($_FILES['Filedata']['name'], '.'), 1);
				if(in_array($extension,array("gif","png","jpg"))){
					$uuid=uniqid('');
					$upload_name= $user['userid']."_". $uuid .'.'.$extension;
					include_once($app_path."include/path_config.php");
					$uploadfile = $clantopic_pic.$upload_name;
					
					$arr=getimagesize($_FILES['Filedata']['tmp_name']); 
					$width = 600;
					$height = (int)($arr[1]/$arr[0]*$width);
					
					include_once $app_path.'tools/phpthumb.php';
					$tmp = makeThumb($_FILES['Filedata']['tmp_name'],$uploadfile,$width,$height);
					if($tmp[0]!="0"){
						$upload_name = '';
					}
				}else{
					echo "<script>parent.Main.alert('只能上传gif,png,jpg格式的图片');</script>";
				}
				@unlink($_FILES['Filedata']['tmp_name']);
			}
			$content = strip_tags($_POST["content"]);
			$title = strip_tags($_POST["title"]);
			$db->Execute("insert into clantopic(`clanid`,`userid`,`title`,`content`,`path`,`addtime`)values('$user[clanid]','$user[userid]','$title','$content','$upload_name','".time()."')");
			echo "<script>parent.add_topic_success();</script>";
		}
		break;
	case 'topiccomment'://评论
		$user=checklogin();
		$res = array("code"=>500,"txt"=>"","info"=>"");
		if(!$user){
			$res["txt"]="请先登录";
		}else if(strlen($_GET["content"])>200){
			$res["txt"]="最多不能超过200字";
		}else{
			$topicid = (int)$_GET["topicid"];
			$content = strip_tags($_GET["content"]);
			$parentid = (int)$_GET["parentid"];
			$row = $db->GetRow("select * from clantopic where topicid='$topicid'");
			if(!empty($row)){
				$db->Execute("insert into clantopic_comment (`topicid`,userid,`content`,`parentid`,addtime)values('$topicid','{$user['userid']}','$content','$parentid','".time()."')");
				$topic_Commentid=$db->Insert_ID();
				$db->Execute("update clantopic set commentcount=commentcount+1 where topicid='$topicid'");
				$res["code"]=200;
				$res["userid"]=$user["userid"];
				$res["nickname"]=$user["nickname"];
				$res["topic_Commentid"]=$topic_Commentid;
				$res["addtime"]=date("Y-m-d");
			}else{
				$res["txt"]="评论失败，请刷新页面后再试";
			}
		}
		echo json_encode($res);
		break;
	case 'topicCommentDel'://删除评论
		$user=checklogin();
		$res = array("code"=>500,"txt"=>"");
		if(!$user){
			$res["txt"]="请先登录";
		}else{
			$topiccommentid = (int)$_GET["id"];
			$row = $db->GetRow("select c.*,p.clanid from clantopic_comment c,clantopic p where p.topicid=c.topicid and c.topiccommentid=$topiccommentid");
			if($row["userid"]==$user["userid"] || isClanAdmin($row["clanid"],$user)){
				$db->Execute("DELETE from clantopic_comment where topiccommentid='$topiccommentid'");
				if($db->Affected_Rows()>0){
					$db->Execute("update clantopic set commentcount=commentcount-1 where topicid='$row[topicid]' and commentcount>0");
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
	case 'topicdel'://删除话题
		$user=checklogin();
		$res = array("code"=>500,"txt"=>"");
		if(!$user){
			$res["txt"]="请先登录";
		}else{
			$topicid = (int)$_GET["topicid"];
			$row = $db->GetRow("select * from clantopic where topicid=$topicid");
			if($row[userid]==$user["userid"] || isClanAdmin($row["clanid"],$user)){
				$db->Execute("DELETE from clantopic where topicid='$topicid'");
				if($db->Affected_Rows()>0){
					$db->Execute("DELETE from clantopic_comment where topicid='$topicid'");
					include_once($app_path."include/path_config.php");
					$uploadfile = $clantopic_pic.$row["path"];
					@unlink($uploadfile);
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
	case 'top'://置顶,清除置顶
		$user=checklogin();
		$res = array("code"=>500,"txt"=>"");
		if(!$user){
			$res["txt"]="请先登录";
		}else{
			$topicid = (int)$_GET["topicid"];
			$row = $db->GetRow("select * from clantopic where topicid=$topicid");
			//只有管理可以操作
			if(isClanAdmin($row["clanid"],$user)){
				if(isset($_GET["topvalue"])){
					$top = (int)$_GET["topvalue"];
				}else{
					$top = $db->GetOne("select max(top)+1 from clantopic where clanid='$row[clanid]'");
				}
				$db->Execute("update clantopic set `top`='$top' where topicid='$topicid'");
				if($db->Affected_Rows()>0){
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
}
include('../include/footer.inc.php');