<?php 
include('head.php');
$usernumber = (int)$_GET["usernumber"];
if($usernumber){
 	//$db->debug = true;
	$userid = $db->GetOne("select userid from user where usernumber='$usernumber';");
	if($userid){
		$numbers = $db->GetArray("select number from user_number where userid='$userid'");
		
		$where = null;
		foreach ($numbers as $value) {
			if(empty($where))
				$where = $value["number"];
			else 
				$where .= (",".$value["number"]);
		}
		$db->Execute("update guard set roomnumber='$usernumber' where roomnumber in ($where)");
		$db->Execute("update room_shoufei set roomnumber='$usernumber' where roomnumber in ($where)");
		$db->Execute("update shows set roomnumber='$usernumber' where roomnumber in ($where)");
		$db->Execute("DELETE from room_config where roomnumber in ($where) and roomnumber!='$usernumber'");
		$db->Execute("update bot_opt set roomnumber='$usernumber' where roomnumber in ($where)");
		operational_log(4,"主播靓号修改useridid,{$userid}",$_REQUEST,$userid);
	}
}
include('../../include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
</head>
<body>
<table width="99%" align=center cellspacing=1 cellpadding=3 border=0>
	<tr class=head>
		<td width='30%' align=center>主播靓号修改</td>
	</tr>
</table>
<br />
<?php if($usernumber):?>
	<p style="color:red">主播号:<?php echo $usernumber?>修改成功</p>
<?php endif;?>
<form onsubmit="return check();">
主播号：<input type="input" name="usernumber" id="usernumber" value="" size="20">
<input value="提交" type="submit">
<p style="color:red">主播更换靓号，在此输入正在使用的靓号。此功能将对之前该主播播放的记录等等修改为现在使用的靓号。</p>
</form>
</body>
</html>
