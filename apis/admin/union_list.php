<?php 
include('head.php');
include('../../include/level.func.php');
$msg = $_REQUEST["msg"];
// $db->debug = true;
if($_REQUEST["action"]=="editsave"){
	if(empty($_REQUEST["name"])||empty($_REQUEST["loginpwd"])){
		$msg="名称或密码不能为空";
	}else{
		if(empty($_REQUEST["unionid"])){
			$db->Execute("INSERT INTO `union`(name,loginpwd) VALUES ('$_REQUEST[name]','$_REQUEST[loginpwd]');");
			$unionid=$db->Insert_ID();
			$db->Execute("update `union` set unionid='$unionid',note='/?u=$unionid' where unionid='$unionid'");
			operational_log(3,("添加联盟unionid,".$unionid),$_REQUEST);
		}else{
			$db->Execute("update `union` set name='$_REQUEST[name]',loginpwd='$_REQUEST[loginpwd]' where unionid='$_REQUEST[unionid]'");
			operational_log(4,"修改联盟unionid,{$_REQUEST[unionid]}",$_REQUEST);
		}
		$msg = "操作成功";
	}
}else if($_REQUEST["action"]=="edit"){
	$row = $db->GetRow("select * from `union` where unionid='$_GET[unionid]'");
	$_REQUEST["unionid"] = $row["unionid"];
	$_REQUEST["name"] = $row["name"];
	$_REQUEST["loginpwd"] = $row["loginpwd"];
}else if($_REQUEST["action"]=="del"){
	$row = $db->Execute("delete from `union` where unionid='$_GET[unionid]'");
	operational_log(5,"删除联盟unionid,{$_GET[unionid]}",$_REQUEST);
	unset($_REQUEST["unionid"]);
	$msg = "操作成功";
}
$sql = "select * from `union` c";
$data = $db->GetArray($sql);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>联盟管理</title>
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
    
    <tr><td class="head" colspan="5"><b>联盟编辑</b></td></tr>
    <tr class="b">
	<td colspan="5">
		<input type="hidden" name="action" value="editsave">
		<input type="hidden" name="unionid" value="<?php echo $_REQUEST["unionid"]?>">
		名称:<input type="text" name="name" value="<?php echo $_REQUEST["name"]?>"><br/>
		密码:<input type="text" name="loginpwd" value="<?php echo $_REQUEST["loginpwd"]?>">
	</td>
	</tr>
	<tr class="b"><td colspan="5">
	   <input type="submit" class="input_k" value="-保存-">
	</td></tr>
	<tr class="b"><td colspan="5">
		1.联盟帐号可以通过 http://<?php echo $_SERVER['SERVER_NAME']?>/apis/union_statistics.php	查看统计(需要输入联盟编号和密码)
		<br/>2.联盟统计接口查询 http://<?php echo $_SERVER['SERVER_NAME']?>/apis/union_statistics.php?unionid=<联盟编号>&loginpwd=<密码>&begin=2015-06-25&end=2015-06-25 &nbsp;&nbsp;&nbsp;(begin与end是开始和结束时间)
		<br/>返回json格式数据据如下:{"10011":{"reg":"67","reg2":"60","reg_youxiao":"50","chongzhi_count":"1","chongzhi_sum":"20"}}
		说明：10011是联盟编号，reg是注册用户数，reg2是二次登录数，reg_youxiao是有效用户数，chongzhi_count是充值人数，chongzhi_sum是充值总金额
	</td></tr>
	<tr><td class="head" colspan="5"><b>联盟列表</b></td></tr>
	<tr class="head_1">
	<td>联盟编号</td>
	<td>联盟名称</td>
	<td>密码</td>
	<td>推广地址</td>
	<td>操作</td>
	</tr>
		<?php foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["unionid"]?></td>
		<td><?php echo $v["name"]?></td>
		<td><?php echo $v["loginpwd"]?></td>
		<td>http://<?php echo _MAIN_DOMAIN_;?>/union.php?u=<?php echo $v["unionid"]?></td>
		<td>
		  <a href="?action=edit&unionid=<?php echo $v["unionid"]?>"><img src="../images/root/bdttn.png" style="width: 46px; height:20px;"></a>
		  <a href="?action=del&unionid=<?php echo $v["unionid"]?>" onclick="return confirm('确定要删除记录吗?')"><img src="../images/root/bbttn.png" style="width: 46px; height:20px;"></a>
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