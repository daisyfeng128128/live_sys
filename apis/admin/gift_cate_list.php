<?php 
include('head.php');
include('../../include/level.func.php');
$msg = $_REQUEST["msg"];
if($_REQUEST["action"]=="editgift"){
	if(empty($_REQUEST["catename"])){
		$msg="类别名称不能为空";
	}else{
		if(empty($_REQUEST["commission"])){
			$msg="返佣比例不能为空";
		}else{
			$_REQUEST["commission"] = (float)$_REQUEST["commission"];
			if($_REQUEST["commission"]<0 || $_REQUEST["commission"]>1){
				$msg="返佣比例只能是0到1之间的数字";
			}else{
				$isphone = (int)$_REQUEST["isphone"];
				if(empty($_REQUEST["giftcateid"])){
					$db->Execute("INSERT INTO `giftcate`(commission,catename,isphone) VALUES ('$_REQUEST[commission]', '$_REQUEST[catename]',$isphone);");
					operational_log(3,("添加礼物分类id".$db->Insert_ID()),$_REQUEST);
				}else{
					$db->Execute("update giftcate set commission='$_REQUEST[commission]',catename='$_REQUEST[catename]',isphone=$isphone where giftcateid='$_REQUEST[giftcateid]'");
					operational_log(4,"修改礼物分类id{$_REQUEST[giftcateid]}",$_REQUEST);
				}
				$msg = "操作成功";
			}
		}
	}
}else if($_REQUEST["action"]=="edit"){
	$row = $db->GetRow("select * from giftcate where giftcateid='$_GET[giftcateid]'");
	$_REQUEST["giftcateid"] = $row["giftcateid"];
	$_REQUEST["catename"] = $row["catename"];
	$_REQUEST["commission"] = $row["commission"];
	$_REQUEST["isphone"] = $row["isphone"];
}else if($_REQUEST["action"]=="del"){
	$row = $db->Execute("delete from giftcate where giftcateid='$_GET[giftcateid]'");
	operational_log(5,"删除礼物分类id{$_REQUEST["giftcateid"]}",$_REQUEST);
	unset($_REQUEST["giftcateid"]);
	$msg = "操作成功";
}
$sql = "select * from giftcate c";
$data = $db->GetArray($sql);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>礼物分类</title>
<script>
$(function(){
	$("[name=isphone][value=<?php echo $_REQUEST["isphone"]?>]").attr("checked","checked");
});
</script>
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
    
    <tr><td class="head" colspan="5"><b>添加分类</b></td></tr>
    <tr class="b">
	<td colspan="5">
	<input type="hidden" name="action" value="editgift">
	<input type="hidden" name="giftcateid" value="<?php echo $_REQUEST["giftcateid"]?>">
	类别名称:<input type="text" name="catename" value="<?php echo $_REQUEST["catename"]?>"></td>
	</tr>
	<tr class="b">
	<td colspan="5">返佣比例:<input type="text" name="commission" value="<?php echo $_REQUEST["commission"]?>"><font color="red"><span id="notecomm">只能是0到1之间的数字</span></font></td>
	</tr>
<?php if(_IS_PHONE_):?>
	<tr class="b"><td colspan="5">手机显示:<input type="radio" value="0" name="isphone">显示<input type="radio" value="1" name="isphone">不显示</td></tr>
<?php endif;?>
	<tr class="b">
	<td colspan="5">
	   <input type="submit" class="input_k" value="-保存-">
	</td>
	</tr>
	<tr><td class="head" colspan="18"><b>礼物分类列表</b></td></tr>
	<tr class="head_1">
	<td>类别编号</td>
	<td>类别名称</td>
	<td>返佣比例</td>
<?php if(_IS_PHONE_):?>
	<td>手机上显示</td>
<?php endif;?>
	<td>操作</td>
	</tr>
		<?php foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["giftcateid"]?></td>
		<td><?php echo $v["catename"]?></td>
		<td><?php echo $v["commission"]?></td>
<?php if(_IS_PHONE_):?>
		<td><?php echo empty($v["isphone"])?"显示":"不显示"?></td>
<?php endif;?>
		<td>
			<a href="?action=edit&giftcateid=<?php echo $v["giftcateid"]?>"><img src="../images/root/bdttn.png" style="width: 46px; height:20px;"></a>
<?php if(!($v["giftcateid"]==1 || $v["giftcateid"]==14 || $v["giftcateid"]==8)):?>
			<a href="?action=del&giftcateid=<?php echo $v["giftcateid"]?>" onclick="return confirm('确定要删除记录吗?')"><img src="../images/root/bbttn.png" style="width: 46px; height:20px;"></a>
<?php endif;?>
		  </td>
		</tr>
	</tr>
	<?php endforeach;?>
</tbody></table>
</form>
<center>
<blockquote><hr class="hr" size="1">

</blockquote><br>
</center>
<?php if($msg):?>
<script>alert("<?php echo $msg?>");</script>
<?php endif;?>
</body>
</html>
<?php include('../../include/footer.inc.php');?>