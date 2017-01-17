<?php 
include('head.php');
include('../../include/level.func.php');
//$db->debug = true;
$msg = $_REQUEST["msg"];
if($_REQUEST["action"]=="editgift"){
	if(empty($_REQUEST["roomnumber"])){
		$msg="房间号不能为空";
	}else{
		if(!isset($_REQUEST["bot_num_max"])){
			$msg="机器人数量不能为空";
		}else{
			$_REQUEST[roomnumber] = (int)$_REQUEST[roomnumber];
			$roomnumber = $_REQUEST[roomnumber]."";
			$tmp = $db->GetOne("select userid from user where usernumber='$_REQUEST[roomnumber]'");
			if(!!$tmp){
				$_REQUEST["bot_num_max"] = (int)$_REQUEST["bot_num_max"];
				$_REQUEST["bot_num_guest"] = (int)$_REQUEST["bot_num_guest"];
				if($_REQUEST["bot_num_max"]==0){
					$db->Execute("DELETE from show_users where roomnumber='$roomnumber' and userid in(SELECT userid from user where accountfrom=9)");
				}
				if($_REQUEST["bot_num_guest"]==0){
					$db->Execute("DELETE from show_users where roomnumber='$roomnumber' and userid not in(SELECT userid from user)");
				}
				$db->Execute("INSERT INTO `bot_opt`(bot_num_max,bot_num_guest,roomnumber) VALUES ('$_REQUEST[bot_num_max]','$_REQUEST[bot_num_guest]', '$roomnumber');");
				if($db->Affected_Rows()==0){
					$db->Execute("update bot_opt set bot_num_max='$_REQUEST[bot_num_max]',bot_num_guest='$_REQUEST[bot_num_guest]' where roomnumber='$_REQUEST[roomnumber]'");
					operational_log(4,"修改房间机器人设置roomnumber,{$_REQUEST[roomnumber]}",$_REQUEST);
				}else{
					operational_log(3,("添加房间机器人设置roomnumber,{$_REQUEST[roomnumber]}"),$_REQUEST);
				}
				$msg = "操作成功";
				
				$db->CacheExecute(1,"select bot_num_max from bot_opt where roomnumber=".$_REQUEST[roomnumber]);
				$db->CacheExecute(1,"select bot_num_guest from bot_opt where roomnumber=".$_REQUEST[roomnumber]);
			}else{
				$msg = "房间号不存在";
			}
		}
	}
}else if($_REQUEST["action"]=="del"){
	$_REQUEST[roomnumber] = (int)$_REQUEST[roomnumber];
	$row = $db->Execute("delete from bot_opt where roomnumber='$_REQUEST[roomnumber]'");
	operational_log(5,"删除房间机器人设置roomnumber,{$_REQUEST[roomnumber]}",$_REQUEST);
	unset($_REQUEST["roomnumber"]);
	$msg = "删除成功";
}
$sql = "select * from bot_opt c";
$data = $db->GetArray($sql);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>房间机器人设置</title>
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
    <tr><td class="head" colspan="4"><b>房间机器人设置</b></td></tr>
    <tr class="b">
	<td colspan="4">
	<input type="hidden" name="action" value="editgift"></td>
	</tr>
	<tr class="b">
	<td colspan="4">房间号:<input type="text" name="roomnumber" value="<?php echo $_REQUEST["roomnumber"]?>"><font color="red"><span></span></font></td>
	</tr>
	<tr class="b">
	<td colspan="4">最多机器人用户数量:<input type="text" name="bot_num_max" value="<?php echo $_REQUEST["bot_num_max"]?>"><font color="red"><span>请输入数字，0表示不进入机器人用户</span></font></td>
	</tr>
	<tr class="b">
	<td colspan="4">房间机器人游客数量:<input type="text" name="bot_num_guest" value="<?php echo $_REQUEST["bot_num_guest"]?>"><font color="red"><span>请输入数字，0表示不进入机器人游客</span></font></td>
	</tr>
	<tr class="b">
	<td colspan="4">
	   <input type="submit" class="input_k" value="-保存-">
	</td>
	</tr>
	<tr><td class="head" colspan="4"><b>房间机器人列表</b></td></tr>
	<tr class="head_1">
	<td>房间号</td>
	<td>房间机器人用户数</td>
	<td>房间机器人游客数量</td>
	<td>操作</td>
	</tr>
		<?php foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["roomnumber"]?></td>
		<td><?php echo $v["bot_num_max"]?></td>
		<td><?php echo $v["bot_num_guest"]?></td>
		<td>
		  <a href="?action=del&roomnumber=<?php echo $v["roomnumber"]?>" onclick="return confirm('确定要删除记录吗?')"><img src="../images/root/bbttn.png" style="width: 46px; height:20px;"></a>
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