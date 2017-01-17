<?php 
include('head.php');
//$db->debug = true;
if($_POST["type"]=="save"){
	operational_log(4,"手机配置",$_REQUEST);
	//清空缓存
	$db->CacheExecute(1,"select * from global_config_phone");
	$verify0_1 = array("_LUCK_IN_VALUE_","_PAY_ADD_","_BUY_NUMBER_ADD_","_CHANCE_ADD_");
	$verify_gt1 = array("_SHOWS_VALID_");
	$exclude = array("type");
	
	foreach ($_POST as $k=>$v){
		if(in_array($k,$exclude)){
			continue;
		}
		$one = $db->GetOne("select k from global_config_phone where k='$k'");
		if($one){
			$sql = "UPDATE global_config_phone SET v='$v' WHERE k='$k' limit 1";
		}else{
			$sql = "INSERT INTO `global_config_phone` (`k` ,`v`)VALUES ('$k','$v')";
		}
		$db->Execute($sql);
	}
}
$arr = $db->GetArray("select * from global_config_phone");
$data = array();
foreach ($arr as $v){
	$data[$v["k"]] = $v["v"];
}
include('../../include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>网站全局配置</title>
<style>
p.a{padding-left:10px}
.hide{display:none;}
a{padding:0 5px;}
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
		<tr class="b"><td>IOS下载地址: </td><td><input type="text" name="ios_add_address" value="<?php echo $data["ios_add_address"]?>" style="width:100%"/>   <span></span></td></tr>
		<tr class="b"><td>IOS版本: </td><td><input type="text" name="ios_version" value="<?php echo $data["ios_version"]?>"/>   <span></span></td></tr>
		<tr class="b"><td>Android下载地址: </td><td><input type="text" name="android_address" value="<?php echo $data["android_address"]?>" style="width:100%"/>   <span></span></td></tr>
		<tr class="b"><td>Android版本: </td><td><input type="text" name="android_version" value="<?php echo $data["android_version"]?>"/>   <span></span></td></tr>
		<tr class="b"><td colspan="2">  <input type="submit" value="-修改-" class="input_k" onclick="return confirm('确定要修改记录吗?')" /></td></tr>
    </table>
</form>
<?php if(!empty($info)):?>
<script>
alert('<?php echo $info?>');
</script>
<?php endif;?>
</body>
</html>
