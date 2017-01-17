<?php 
include('head.php');
//$db->debug = true;
if($_POST["type"]=="save"){
	$exclude = array("type");
	
	foreach ($_POST as $k=>$v){
		if(in_array($k,$exclude)){
			continue;
		}
		$one = $db->GetOne("select k from swf_config where k='$k'");
		if($one){
			$sql = "UPDATE swf_config SET v='$v' WHERE k='$k' limit 1";
		}else{
			$sql = "INSERT INTO `swf_config` (`k` ,`v`)VALUES ('$k','$v')";
		}
		$db->Execute($sql);
	}
	operational_log(3,"更新配置",$_REQUEST);
}
$arr = $db->GetArray("select * from swf_config");
$data = array();
foreach ($arr as $v){
	$data[$v["k"]] = $v["v"];
}

if($_POST["type"]=="save"){
	include($app_path.'include/phpAes.inc.php');
	$aes = new phpAes("MK2X82eL6jkKbzvlJU1CMR6rcKO+SBhmbPOmFD/2Mxw=");
	$content = $aes->encrypt(json_encode($data));
	$file = $app_path."apis/get_conf.php";
	file_put_contents($file,$content);
	$info = "操作成功";
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>更新配置</title>
<style>
p.a{padding-left:10px}
.hide{display:none;}
a{padding:0 5px;}
.i_table .b input{width:100%}
</style>
<script type="text/javascript">
$(function() {
});
</script>

</head>
<body>
<form action="" method="post" enctype="multipart/form-data">
<input type="hidden" name="type" value="save"/>
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr class="b"><td>聊天服务器的地址:  </td><td><input type="text" name="chat_add" value="<?php echo $data["chat_add"]?>"/>   <span></span></td></tr>
	<tr class="b"><td>上传头像的地址:  </td><td><input type="text" name="avatar_url" value="<?php echo $data["avatar_url"]?>"/>   <span></span></td></tr>
	<tr class="b"><td>视频api地址:  </td><td><input type="text" name="live_api_url" value="<?php echo $data["live_api_url"]?>"/>   <span>上传封面开始结束直播等</span></td></tr>
	<tr class="b"><td>直播视频上行地址:  </td><td><input type="text" name="upload_video_add" value="<?php echo $data["upload_video_add"]?>"/>   <span></span></td></tr>
	<tr class="b"><td>直播视频下行地址:  </td><td><input type="text" name="download_video_add" value="<?php echo $data["download_video_add"]?>"/>   <span></span></td></tr>
	<tr class="b"><td>直播视频后缀:  </td><td><input type="text" name="video_address_suffix" value="<?php echo $data["video_address_suffix"]?>"/>   <span></span></td></tr>
	<tr class="b"><td>直播视频用户登录:  </td><td><input type="text" name="chat_login_url" value="<?php echo $data["chat_login_url"]?>"/>   <span></span></td></tr>
	<tr class="b"><td>礼物图形显示:  </td><td><input type="text" name="shape_xml_url" value="<?php echo $data["shape_xml_url"]?>"/>   <span>如1314个礼物显示</span></td></tr>
	<tr class="b"><td>flash礼物显示:  </td><td><input type="text" name="flash_gift_xml" value="<?php echo $data["flash_gift_xml"]?>"/>   <span></span></td></tr>
	<tr class="b"><td>录视频后缀:  </td><td><input type="text" name="video_address_suffix_file" value="<?php echo $data["video_address_suffix_file"]?>"/>   <span></span></td></tr>
	<tr class="b"><td>录视频api地址:  </td><td><input type="text" name="video_file_api_url" value="<?php echo $data["video_file_api_url"]?>"/>   <span></span></td></tr>
	<tr class="b"><td>录视频地址:  </td><td><input type="text" name="upload_video_add_file" value="<?php echo $data["upload_video_add_file"]?>"/>   <span></span></td></tr>
	<tr class=""><td colspan="2">  <input type="submit" value="-修改-" class="input_k" onclick="return confirm('确定要修改记录吗?')" /></td></tr>
</table>
</form>

<pre style="padding:5px;">
此操作是更新网站配置，如换了域名，换了聊天或视频服务器等需要在这里修改.
</pre>
<?php if(!empty($info)):?>
<script>
alert('<?php echo $info?>');
</script>
<?php endif;?>
</body>
</html>
<?php include('../../include/footer.inc.php');?>