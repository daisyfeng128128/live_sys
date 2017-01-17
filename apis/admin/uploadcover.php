<?php 
header("Content-type:text/html;charset=utf-8");
include('head.php');
//$db->debug = true;
$usernumber=(int)$_REQUEST['usernumber'];
if($usernumber && $_REQUEST["act"]=="save"){
	include($app_path.'include/path_config.php');
	$path=$app_path."static_data/showcover/";
	$uploadfile = $path.$usernumber.'.jpg';
	if(file_exists($_FILES['userfile']['tmp_name'])){
		//move_uploaded_file($_FILES["userfile"]["tmp_name"], $uploadfile);
		include_once $app_path.'tools/phpthumb.php';
		//删除目录下此用户的封面及封面小图
		if ($dh = opendir($path)){
			while (($file = readdir($dh))!= false){
				if(strpos($file,($usernumber.'.jpg'))!==false){
					@unlink($path.$file);
					//echo $path.$file."<br/>";
				}
			}
			closedir($dh);
		}
		$file_type = strtolower(pathinfo($_FILES['userfile']['name'],PATHINFO_EXTENSION));
		if($file_type!='png' && $file_type!='gif' && $file_type!='jpg'){
			echo '封面上传错误,只能上传png,gif,jpg图像';
		}else{
			makeThumb($_FILES["userfile"]["tmp_name"], $uploadfile,400,300);
			echo '主播'.$usernumber.'封面上传成功';
			$db->Execute("update user set upload_cover='$usernumber.jpg' where usernumber='$usernumber'");
			$db->Execute("update shows set showcover='$usernumber.jpg' where roomnumber='$usernumber'");
			
			$userid=$db->GetOne("select userid from user where usernumber='$usernumber'");
			operational_log(4,"上传主播封面id,{$userid}",$_REQUEST,$userid);
		}
		@unlink($_FILES['userfile']['tmp_name']);
	}
}
$upload_cover = $db->GetOne("select upload_cover from user where usernumber='$usernumber'");
include('../../include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
</head>
<table width="99%" align=center cellspacing=1 cellpadding=3 border=0>
	<tr class=head>
		<td width='30%' align=center>上传封面</td>
	</tr>
</table>
<form action="" method="post" enctype="multipart/form-data">
<input type="hidden" name="act" value="save"/>
<input type="hidden" name="usernumber" value="<?php echo $usernumber?>"/>
<p>封面:
<input type="file" name="userfile" />
<span>高300px,宽400px</span>
</p>
<input type="submit" value="上传" />
<p>当前封面:</p>
<?php if($upload_cover):?>
<img src="/static_data/showcover/<?php echo $upload_cover?>?<?php echo time();?>"/>
<?php else:?>
无
<?php endif?>

</form>
</body>
</html>