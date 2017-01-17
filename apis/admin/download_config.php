<?php 
include('head.php');
//$db->debug = true;
if($_REQUEST["type"]=="download"){
	$w = isset($_GET["w"])?$_GET["w"]:_SITE_URL_;
	$info = "网络繁忙，更新失败，请稍后再操作";
	$content = file_get_contents("http://test.5iu.org/apis/get_conf.php?w=".$w);
	if(strlen($content)>500){
		$file = $app_path."apis/get_conf.php";
		file_put_contents($file,$content);
		$info = "操作成功";
		operational_log(6,"更新配置",$_REQUEST);
	}
}
include('../../include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>重新下载配置</title>
<style>
p.a{padding-left:10px}
.hide{display:none;}
a{padding:0 5px;}
</style>
</head>
<body>
<form action="" method="post" enctype="multipart/form-data">
<input type="hidden" name="type" value="download"/>
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
		<tr class="b red"><td colspan="2"><p class="red">此操作是更新网站配置，只有远程配置更改之后需要操作，其它时候不需要操作</p></td></tr>
		<tr class="b"><td colspan="2">  <input type="submit" value="-更新-" class="input_k" onclick="return confirm('此操作，将覆盖原有配置，确定进行此操作吗?')" /></td></tr>
    </table>
</form>
<?php if(!empty($info)):?>
<script>
alert('<?php echo $info?>');
</script>
<?php endif;?>
</body>
</html>
