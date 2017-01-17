<?php 
exit;
header("Content-type:text/html;charset=utf-8");
include('head.php');
$id=(int)$_REQUEST['id'];
//$db->debug = true;
if($_REQUEST['active']=='save'){
	$path=$app_path."static_data/uploaddata/activity/";
	$filename = uniqid('').'.jpg';
	$uploadfile = $path.$filename;
	$img = null;
	if(file_exists($_FILES['userfile']['tmp_name'])){
		move_uploaded_file($_FILES["userfile"]["tmp_name"], $uploadfile);
		@unlink($_FILES['userfile']['tmp_name']);
		$img = ",picSrc='$filename'";
	}
	$start_date = strtotime($_REQUEST[start_date]);
	$end_date = strtotime($_REQUEST[end_date]);
	$_REQUEST[order] = (int)$_REQUEST[order];
	if($id){
		$db->Execute("update activity_list set title='$_REQUEST[title]' $img ,url='$_REQUEST[url]',`order`='$_REQUEST[order]',`start_date`='$start_date',`end_date`='$end_date' where id='$id'");
		operational_log(4,"修改活动id,{$id}",$_REQUEST);
	}else{
		$db->Execute("INSERT INTO `activity_list`(title,picSrc,url,`order`,`start_date`,`end_date`) VALUES ('$_REQUEST[title]','$filename', '$_REQUEST[url]', '$_REQUEST[order]','$start_date','$end_date');");
		$id = $db->Insert_ID();
		operational_log(3,("添加活动id,".$id),$_REQUEST);
	}
}
$row = $db->GetRow("select * from activity_list where id='$id'");
if(empty($row['start_date'])){
	$row['start_date'] = time();
}
if(empty($row['end_date'])){
	$row['end_date'] = time()+86400*30;
}

include('../../include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>活动编辑</title>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script src="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.css">
<script>
$(function(){
	$("#position option[value=<?php echo $row["position"]?>]").attr("selected","selected");
	$('.infotxt').datepicker({ dateFormat:'yy-mm-dd',changeMonth:true,changeYear: true});
});
</script>
</head>
<table width="99%" align=center cellspacing=1 cellpadding=3 border=0>
	<tr class=head>
		<td width='30%' align=center>图片信息（如首页和直播页的图片轮波）</td>
	</tr>
</table>
<p style="color:red">修改完成,1分钟后生效<span style="color:red;padding-left:10px;"><?php echo _HOME_TEMPLATES_?></span></p>
<form action="" method="post" enctype="multipart/form-data">
<input type="hidden" name="id" value="<?php echo $row['id']?>"/>
<input type="hidden" name="active" value="save"/>

<table>

<tr><td valign="top">标题:</td><td valign="top">
	<input type="text" name="title" value="<?php echo $row['title']?>"/>
</td></tr>
<tr><td valign="top">图片:</td><td valign="top">
	<input type="file" name="userfile" />
	<br>
	<span style="color:red">宽137px,高333px</span>
	<?php if($row['picSrc']){?>
	<br/><img height="50" src="/static_data/uploaddata/activity/<?php echo $row['picSrc']?>"/>
<?php }?>
</td></tr>

<tr><td valign="top">链接地址:</td><td valign="top">
	<input type="text" name="url" value="<?php echo $row['url']?>"/>
</td></tr>
<tr><td valign="top">排序（越小越靠前）:</td><td valign="top">
	<input type="text" name="order" value="<?php echo $row['order']?>"/>
</td></tr>
<tr><td valign="top">开始时间(包括):</td><td valign="top">
	<input type="text" class="infotxt" name="start_date" value="<?php echo date("Y-m-d",$row['start_date'])?>"/>
</td></tr>
<tr><td valign="top">结束时间(包括):</td><td valign="top">
	<input type="text" class="infotxt" name="end_date" value="<?php echo date("Y-m-d",$row['end_date'])?>"/>
</td></tr>
</table>
<input type="submit" value="提交" />

</form>
</body>
</html>