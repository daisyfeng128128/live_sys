<?php 
include('head.php');
//$db->debug = true;
$msg = $_GET["msg"];
if($_GET["act"]=="add"){
	if(empty($_REQUEST[username]) || empty($_REQUEST[userpass])){
		$msg = "用户名和密码不能为空!";
	}else{
		$db->Execute("INSERT INTO `rootadmin`(ADMINNAME,`ADMINPASS`) VALUES ('$_REQUEST[username]', '".md5($_REQUEST[userpass])."');");
		operational_log(3,("添加管理员id,".$db->Insert_ID()),$_REQUEST);
		$msg = "操作成功!";
	}
}else if($_GET["act"]=="update"){
	$id=(int)$_REQUEST['id'];
	if(empty($_REQUEST[userpass])){
		$msg = "密码不能为空!";
	}else{
		$db->Execute("update rootadmin set ADMINPASS='".md5($_REQUEST[userpass])."' where ID='$id'");
		operational_log(4,"修改管理员id,{$id}",$_REQUEST);
		$msg = "操作成功!";
	}
}else if($_GET["act"]=="delete"){
	$id=(int)$_REQUEST['id'];
	$db->Execute("delete from rootadmin where ID=$id");
	$db->Execute("delete from rootrights where rootid=$id");
	operational_log(5,"删除管理员id,{$id}",$_REQUEST);
	$msg = "操作成功";
}
$data = $db->GetArray("select * from rootadmin");
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>管理员用户列表</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>

<table width="99%" align=center cellspacing=1 cellpadding=3 border=0>
	<tr class=head>
		<td width='30%' align=center>
			PlatForm Administrator</td>
	</tr>
</table>
<br />

<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr><td class=head colspan=15><b>添加管理员</b></td></tr>
	<tr><td class="b">
			<ul>
				<form action="?act=add" method="post">
					用户名:<input type="text" name="username" />
					密码:<input type="text" name="userpass" /> <input type="submit" class="input_k" value="-添加-" /> 
				</form>
			</ul>
	   </td>
	</tr>
</table>
<br />

<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr><td class=head colspan=15><b>管理员列表</b></td></tr>
	<tr class="head_1">
	<td>ID</td>
	<td>用户名</td>
	<td>密码</td>
	<td>操作</td>
	</tr>
<?php foreach ($data as $v):?>
	<form action="?act=update" method="post">
	<tr class="b">
	<td><?php echo $v["ID"]?></td>
	<td><input type="text" name="username" value="<?php echo $v["ADMINNAME"]?>" /></td>
	<td><input type="text" name="userpass" value="" /></td>
	<td>
	    <input type="submit" class="input_k" value="-修改-" onclick="return confirm('确定要修改记录吗?')" />
		<input type="hidden" name="id" value="<?php echo $v["ID"]?>" />
	    <a href="?act=delete&id=<?php echo $v["ID"]?>" onclick="return confirm('确定要删除记录吗?')"><img src="../images/root/bbttn.png" style="width: 46px; height:20px;"/></a>
	    <a href="adminPermissions.php?id=<?php echo $v["ID"]?>">权限</a>
	</td>
	</tr>
	</form>
<?php endforeach;?>
</table>
<?php if($msg):?>
<script>alert("<?php echo $msg?>");</script>
<?php endif;?>
</body>
</html>
<?php include('../../include/footer.inc.php');?>