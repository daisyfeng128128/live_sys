<?php 
include('head.php');
include('../../include/level.func.php');
$msg = $_REQUEST["msg"];
$clearCache = false;
// $db->debug = true;
if($_REQUEST["action"]=="editgift"){
	if(empty($_REQUEST["catename"])){
		$msg="分类名称不能为空";
	}else{
		if(empty($_REQUEST["id"])){
			$db->Execute("INSERT INTO `showercate`(catename,catename_phone) VALUES ('$_REQUEST[catename]','$_REQUEST[catename_phone]');");
			operational_log(3,("添加主播分类id,".$db->Insert_ID()),$_REQUEST);
		}else{
			$db->Execute("update showercate set catename='$_REQUEST[catename]',catename_phone='$_REQUEST[catename_phone]' where id='$_REQUEST[id]'");
			operational_log(4,"修改主播分类id,{$_REQUEST[id]}",$_REQUEST);
		}
		$msg = "操作成功";
	}
	$clearCache = true;
}else if($_REQUEST["action"]=="edit"){
	$row = $db->GetRow("select * from showercate where id='$_GET[id]'");
	$_REQUEST["id"] = $row["id"];
	$_REQUEST["catename"] = $row["catename"];
	$_REQUEST["catename_phone"] = $row["catename_phone"];
	$_REQUEST["commission"] = $row["commission"];
	$clearCache = true;
}else if($_REQUEST["action"]=="del"){
	$row = $db->Execute("delete from showercate where id='$_GET[id]'");
	operational_log(5,"删除主播分类id,{$_GET[id]}",$_REQUEST);
	unset($_REQUEST["id"]);
	$msg = "操作成功";
	$clearCache = true;
}
if($clearCache){//清空缓存
	$db->CacheExecute(1,"select * from showercate order by id asc");
}
$sql = "select * from showercate c";
$data = $db->GetArray($sql);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>主播分类</title>
<style>
.lab2{display: inline-block;width: 90px;}
</style>
</head>
<body>
<table width="99%" align="center" cellspacing="1" cellpadding="3" border="0">
	<tbody><tr class="head">
		<td width="30%" align="center">
			PlatForm Administrator</td>
	</tr>
</tbody></table>
<br>
<form method="post">
<table width="99%" align="center" cellspacing="1" cellpadding="3" class="i_table">
    <tbody>
    
    <tr><td class="head" colspan="4"><b>添加分类</b></td></tr>
    <tr class="b">
	<td colspan="4">
	<input type="hidden" name="action" value="editgift">
	<input type="hidden" name="id" value="<?php echo $_REQUEST["id"]?>">
	<span class="lab2">分类名称:</span><input type="text" name="catename" value="<?php echo $_REQUEST["catename"]?>"><br/>
	<span class="lab2">手机分类显示:</span><input type="text" name="catename_phone" value="<?php echo $_REQUEST["catename_phone"]?>">手机上显示的主播分类，不能太长否则手机显示可能会乱，一般两个汉字
	
	</td>
	</tr>
	<tr class="b">
	<td colspan="3">
	   <input type="submit" class="input_k" value="-保存-">
	</td>
	</tr>
	
	<tr><td class="head" colspan="18"><b>主播分类列表</b></td></tr>
	<tr class="head_1">
	<td>类别编号</td>
	<td>分类名称</td>
	<td>手机分类显示</td>
	<td>操作</td>
	</tr>
		<?php foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["id"]?></td>
		<td><?php echo $v["catename"]?></td>
		<td><?php echo $v["catename_phone"]?></td>
		<td>
		  <a href="?action=edit&id=<?php echo $v["id"]?>"><img src="../images/root/bdttn.png" style="width: 46px; height:20px;"></a>
		  <a href="?action=del&id=<?php echo $v["id"]?>" onclick="return confirm('确定要删除记录吗?')"><img src="../images/root/bbttn.png" style="width: 46px; height:20px;"></a>
		</td>
		</tr>
	</tr>
	<?php endforeach;?>
</tbody></table>
</form>
<?php if($msg):?>
<script>alert("<?php echo $msg?>");</script>
<?php endif;?>
</body>
</html>
<?php include('../../include/footer.inc.php');?>