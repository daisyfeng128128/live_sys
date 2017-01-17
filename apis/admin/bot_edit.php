<?php 
exit;
//不用了，很早的机器人处理方式，进一个真人带几个机器人进房间
include('head.php');
if($_GET["type"]=="bot"){
	$usernumber = (int)$_GET["usernumber"];
	if($usernumber==0){
		$db->Execute("delete from show_users where userid in (select userid from user where accountfrom=9)");
	}
	$db->Execute("update gameconfig set value=$usernumber where name='bot_count'");
	$info = "操作成功";
}
$bot_count = $db->GetOne("select value from gameconfig where name='bot_count'");
$bot_count = (int)$bot_count;
include('../../include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>无标题文档</title>
<script>
function check(){
	var usernumber = document.getElementById("usernumber").value;
	if(usernumber=="" || usernumber==0){
		return confirm("此操作将关闭机器人功能，并删除所有的在房间的机器人，请确认?");
	}
}
</script>
</head>
<body>
<table width="99%" align=center cellspacing=1 cellpadding=3 border=0>
	<tr class=head>
		<td width='30%' align=center>启用/关闭机器人</td>
	</tr>
</table>
<form onsubmit="return check();">
用户进入房间带的机器人数：<input type="input" name="usernumber" id="usernumber" value="<?php echo $bot_count?>" size="20">
<input type="hidden" name="type" value="bot">
<input value="提交" type="submit">
<br>机器人进入房间的方法是：有一个人进入房间，则带2个机器人进入，如果用户退出则再删除2个机器人(数量可设置，关闭机器人则设置为0)
</form>

<?php if(!empty($info)):?>
<script>
alert('<?php echo $info?>');
</script>
<?php endif;?>

</body>
</html>
