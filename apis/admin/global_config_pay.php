<?php 
include('head.php');
//$db->debug = true;
if($_POST["type"]=="save"){
	operational_log(4,"手机到帐比例配置",$_REQUEST);
	//清空缓存
	$db->CacheExecute(1,"select * from global_config");
	$exclude = array("type");
	
	foreach ($_POST as $k=>$v){
		if(in_array($k,$exclude)){
			continue;
		}
		$one = $db->GetOne("select k from global_config where k='$k'");
		if($one){
			$sql = "UPDATE global_config SET v='$v' WHERE k='$k' limit 1";
		}else{
			$sql = "INSERT INTO `global_config` (`k` ,`v`)VALUES ('$k','$v')";
		}
		$db->Execute($sql);
	}
}
$arr = $db->GetArray("select * from global_config");
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
<?php foreach($global_order_paychannel as $key=>$value):?>
	<tr class="b"><td><?php echo $value?>: </td><td><input type="text" name="pay_shiji-<?php echo $key?>" value="<?php echo $data[("pay_shiji-".$key)]?>"/>   <span></span></td></tr>
<?php endforeach;?>
		<tr class="b"><td colspan="2">  <input type="submit" value="-修改-" class="input_k" onclick="return confirm('确定要修改记录吗?')" /></td></tr>
    </table>
</form>
</body>
</html>
