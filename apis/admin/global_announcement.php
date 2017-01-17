<?php 
include('head.php');
//发布公告
header("Content-type:text/html;charset=utf-8");
if($_POST["act"]=="GLB"){
	$roomnumber = $db->GetOne("select roomnumber from shows where endtime is null");
	if(empty($roomnumber)){
		$info = "当前没有正在直播的房间不可以发布公告";
	}else{
		$ann_content = $_POST["ann_content"];
		if($ann_content){
			roomAnn($ann_content,((int)$_POST["room"]));
			$info = "发布成功";
		}else{
			$info = "请输入内容";
		}
		operational_log(6,("发布公告roomnumber,".((int)$_POST["room"])),$_REQUEST);
	}
}
include('../../include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
</head>
<body>
<br />
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr><td class=head colspan="2"><b>发布公告</b></td></tr>
	<form action="" method="post">
	<tr class="b">
	<td width="5%">房间号</td>
	<td>
	<input type="text" name="room"/>
	<em style="color: red;">为空则是向所有房间发广播</em></td>
	</tr>
	<tr class="b">
	<td width="5%">公告内容</td>
	<td>
	<textarea id="ann_content" name="ann_content" cols="50" rows="2"  ></textarea>
	<em style="color: red;"></em></td>
	</tr>
	<tr>
	<td>
	    <input type="submit" class="input_k" value="-发布-" onclick="return confirm('您确认要执行这项操作吗？')"/>
	    <input type="hidden" name="act" value="GLB" />
	</td>
	</tr>
	</form>
</table>
<?php if(!empty($info)):?>
<script>
alert('<?php echo $info?>');
</script>
<?php endif;?>
</body>
</html>
