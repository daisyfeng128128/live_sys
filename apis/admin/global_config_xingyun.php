<?php 
include('head.php');
//$db->debug = true;
if($_POST["type"]=="save"){
	operational_log(4,"幸运礼物配置",$_REQUEST);
	//清空缓存
	$db->CacheExecute(1,"select * from global_config");
	$exclude = array("type","luckcap");
	
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
	
	$db->Execute("UPDATE gameconfig SET `value`='{$_POST["luckcap"]}' WHERE `name`='luckcap' limit 1");
}
$arr = $db->GetArray("select * from global_config");
$data = array();
foreach ($arr as $v){
	$data[$v["k"]] = $v["v"];
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>幸运礼物中奖配置</title>
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
	<tr class="b"><td>幸运礼物进入水库的值比例:  </td><td><input type="text" name="_LUCK_IN_VALUE_" value="<?php echo $data["_LUCK_IN_VALUE_"]?>"/>   <span>(0.8表示送100币有80币进水库)</span></td></tr>
	<tr class="b"><td>水库值:  </td><td><input type="text" name="luckcap" value="<?php echo $db->GetOne("select `value` from gameconfig where `name`='luckcap'");?>"/>   <span></span></td></tr>
	<tr class="b"><td>水库每小时清理:  </td><td><input type="text" name="_LUCK_luckcap_hour_" value="<?php echo $data["_LUCK_luckcap_hour_"]?>"/>   <span>(0.2表时每小时水库清除20%)</span></td></tr>
	<tr class="b"><td>幸运礼物中奖比例:  </td><td><input type="text" name="_CHANCE_ADD_" value="<?php echo $data["_CHANCE_ADD_"]?>"/>   <span>(0.03表示中奖率为3%)</span></td></tr>
	<tr class="b"><td>幸运礼物中多少倍全站飞屏:  </td><td><input type="text" name="_LUCK_MULT_ANN_" value="<?php echo $data["_LUCK_MULT_ANN_"]?>"/>   <span>大于1的数字</span></td></tr>
	<tr class="b"><td colspan="2">  <input type="submit" value="-修改-" class="input_k" onclick="return confirm('确定要修改记录吗?')" /></td></tr>
</table>
</form>

<pre style="padding:5px;">
幸运礼物是指在直播页中送出的礼物是幸运分类下的礼物。
如设置幸运礼物中奖比例为1%，送幸运礼物时有1%的可能性会中奖，如果中奖，可能会中得以下倍数。
34%的机会,中5倍
50%的机会,中15倍
14%的机会,中50倍
2%的机会,中200倍

例,送1个幸运玫瑰，有1%的机会会中上面的倍数。如果中了15倍，则用户所中的奖就是15*幸运玫瑰的价格.

例,送10个幸运玫瑰,程序会按每1个礼物1%的机会中奖，将每个礼物中的倍数累计起来，就是本次送礼的中奖倍数。

中奖有水库(奖池)的概念，水库是系统每收到一次幸运礼物，就会将本奖收到总金额的80%(可以设置是上面，幸运礼物进入水库的值比例)放到水库中。
用户如果中了奖，会在水库中减去中奖的金额，如果用户中的奖的总金额水库中不够，则本次不中奖。
</pre>
<?php if(!empty($info)):?>
<script>
alert('<?php echo $info?>');
</script>
<?php endif;?>
</body>
</html>
<?php include('../../include/footer.inc.php');?>