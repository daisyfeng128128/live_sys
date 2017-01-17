<?php 
include('head.php');
//$db->debug = true;
$id=(int)$_REQUEST['id'];
if($_REQUEST['active']=='save'){
	if(empty($_REQUEST[title])){
		echo '<script>alert("标题不能为空")</script>';
	}else if(empty($_REQUEST[subtitle])){
		echo '<script>alert("子标题不能为空")</script>';
	}else if(empty($_REQUEST[url])){
		echo '<script>alert("视频地址不能为空")</script>';
	}else if(empty($id) && !file_exists($_FILES['userfile']["tmp_name"])){
		echo '<script>alert("请上传图片图片")</script>';
	}else{
		if($id){
			$db->Execute("update video set title='$_REQUEST[title]',subtitle='$_REQUEST[subtitle]',url='$_REQUEST[url]',`content`='$_REQUEST[content]' where id='$id'");
			operational_log(4,"修改首页视频上传id,{$id}",$_REQUEST);
		}else{
			$db->Execute("INSERT INTO `video`(title,subtitle,url,`content`,strdate) VALUES ('$_REQUEST[title]','$_REQUEST[subtitle]','$_REQUEST[url]', '$_REQUEST[content]', '".date("Y-m-d H:i:s")."');");
			$id = $db->Insert_ID();
			operational_log(3,("添加首页视频上传id,".$db->Insert_ID()),$_REQUEST);
		}
		if(file_exists($_FILES['userfile']['tmp_name'])){
			include_once $app_path.'tools/phpthumb.php';
			//删除目录下此用户的封面及封面小图
			$path=$app_path."static_data/uploaddata/video/";
			$uploadfile = $path.$id.'.jpg';
			@unlink($uploadfile);
			
			makeThumb($_FILES["userfile"]["tmp_name"], $uploadfile,70,48);
			@unlink($_FILES['userfile']['tmp_name']);
			
			$db->Execute("update video set img='".$id.".jpg' where id='$id'");
		}
		echo '<script>alert("操作成功");parent.window.location.href="video.php"</script>';
	}
	include('../../include/footer.inc.php');
	exit;
}
if(!empty($id)){
	$row = $db->GetRow("select * from video where id=$id");
}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>视频</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<link rel="stylesheet" type="text/css" href="style.css">
	<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script>
$(function(){
});
</script>
</head>
<body>

<table width="99%" align=center cellspacing=1 cellpadding=3 border=0>
	<tr class=head>
		<td width='30%' align=center>
			<iframe width="0" height="0" style="display:none" name="ipost"></iframe>
			PlatForm Administrator</td>
	</tr>
</table>
<br />
<form action="?active=save" method="post" target="ipost" enctype="multipart/form-data">
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr class="b">
	<td>
	     <b>视频标题&nbsp;&nbsp;</b>
		 <input type="hidden" name="id" id="id" value="<?php echo $row["id"]?>"/>
		 <input type="text" name="title" id="title" value="<?php echo $row["title"]?>"/><em style="color: red;">标题长度小于250个字符</em>
	</td>
	</tr>
	<tr class="b">
	<td>
	     <b>子标题&nbsp;&nbsp;</b>
		 <input type="text" name="subtitle" id="subtitle" value="<?php echo $row["subtitle"]?>"/><em style="color: red;">子标题长度小于250个字符</em>
	</td>
	</tr>
	<tr class="b">
	<td>
	     <b>视频地址&nbsp;&nbsp;</b>
		 <input type="text" name="url" id="url" value="<?php echo $row["url"]?>"/><em style="color: red;">视频的文件地址，如:http://xxx.com/a.flv</em>
	</td>
	</tr>
	<tr class="b">
	<td>
	     <b>图片&nbsp;&nbsp;</b>
		 <input type="file" name="userfile" /><em style="color: red;">高48px,宽70px</em>
		 <?php if($row["img"]):?>
		<img src="/static_data/uploaddata/video/<?php echo $row["img"]?>?<?php echo time();?>"/>
		<?php endif?>
	</td>
	</tr>
	<!--tr class="b">
	<td>
	    <b>视频内容</b><br/>
		<textarea id="content" name="content" style="height:400px;width:100%"><?php echo $row["content"]?></textarea>
	</td>
	</tr-->
	<tr>
	<td>
	    <input type="submit" class="input_k" value="-添加-" onclick="return confirm('确定要添加记录吗?')" />
	    <input type="hidden" name="act" value="add" />
	</td>
	</tr>
</table>
</form>
<?php if(!empty($info)):?>
<script>
alert('<?php echo $info?>');
</script>
<?php endif;?>
</body>
</html>
<?php include('../../include/footer.inc.php');?>