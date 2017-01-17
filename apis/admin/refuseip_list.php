<?php 
include('head.php');
//$db->debug = true;
$msg = $_REQUEST["msg"];
if($_REQUEST["action"]=="delete"){
	$id = (int)$_REQUEST["id"];
	$ipv4=$db->GetOne("select lastloginip from refuseip where id='$id'");
	$db->Execute("delete from refuseip where id='$id'");
	clearRefuseipCache($ipv4);
	$msg = "操作成功";
	operational_log(5,"删除封IP,id{$id}",$_REQUEST);
}else if($_REQUEST["action"]=="add"){
	if(!empty($_REQUEST["lastloginip"])){
		$ipv4=ip2long($_REQUEST["lastloginip"]);
		$db->Execute("INSERT INTO `refuseip`(lastloginip,addtime) VALUES ('$ipv4', '".date("Y-m-d H:i:s")."');");
		clearRefuseipCache($ipv4);
		operational_log(3,("添加封IP,id".$db->Insert_ID()),$_REQUEST);
	}
	$msg = "操作成功";
}
function clearRefuseipCache($ip){
	global $db;
	$db->CacheGetOne(1,"select id from refuseip where lastloginip='".($ip)."'");
}

$sql = "select * from refuseip c";
$data = $db->GetArray($sql);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>封IP</title>
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
    
    <tr><td class="head" colspan="5"><b>添加要封的IP</b></td></tr>
    <tr class="b">
	<td colspan="5">
	<input type="hidden" name="action" value="add">
	IP:<input type="text" name="lastloginip" value=""></td>
	</tr>
	<tr class="b">
	<td colspan="5">
	   <input type="submit" class="input_k" value="-保存-">
	</td>
	</tr>
	<tr><td class="head" colspan="18"><b>已封IP列表</b></td></tr>
	<tr class="head_1">
	<td>编号</td>
	<td>IP</td>
	<td>添加时间</td>
	<td>操作</td>
	</tr>
		<?php foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["id"];?></td>
		<td><?php echo long2ip($v["lastloginip"]);?></td>
		<td><?php echo $v["addtime"];?></td>
		<td>
			<a href="?action=delete&id=<?php echo $v["id"]?>" onclick="return confirm('确定要删除记录吗?')"><img src="../images/root/bbttn.png" style="width: 46px; height:20px;"></a>
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