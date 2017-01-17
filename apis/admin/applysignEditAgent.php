<?php 
include('head.php');
$userid = (int)$_REQUEST["userid"];
//$db->debug = true;
if(!empty($userid)){
	$isuser = $db->GetRow("select * from user where userid='$userid'");
	if(!$isuser){
		echo "<script>alert('出错了');</script>";
		include('../../include/footer.inc.php');
		exit;
	}
}else{
	echo "<script>alert('出错了');</script>";
	include('../../include/footer.inc.php');
	exit;
}
if($_REQUEST["type"]=="save"){
	$agentid = (int)$_REQUEST["agentid"];
	$sql = "UPDATE user set agentid='$agentid' where userid='$isuser[userid]'";
	$db->Execute($sql);
	operational_log(4,"更改代理,代理id,{$agentid}",$_REQUEST,$isuser[userid]);
	echo "<script>alert('操作完成');</script>";
	include('../../include/footer.inc.php');
	exit;
}
$agentlist = $db->GetArray("select u.nickname,u.usernumber,u.userid from user as u,agentsalary a where a.userid=u.userid and u.usertype=7");
include('../../include/footer.inc.php');
?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>更改代理</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script>
$(function(){
	$("select[name=agentid]").val("<?php echo $isuser["agentid"]?>");
});
</script>
	<style>
		@charset "utf-8";
/* CSS Document */

.datepicker { border-collapse: collapse; border: 1px solid #ccc; position: absolute; }
.datepicker tr.controls th { height: 22px; font-size: 12px; }
.datepicker select { font-size: 12px; }
.datepicker tr.days th { height: 18px; }
.datepicker tfoot td { height: 18px; text-align: center; text-transform: capitalize; }
.datepicker th, .datepicker tfoot td { background: #eee; font: 10px/18px Verdana, Arial, Helvetica, sans-serif; }
.datepicker th span, .datepicker tfoot td span { font-weight: bold; }

.datepicker tbody td { width: 24px; height: 24px; border: 1px solid #ccc; font: 12px/22px Arial, Helvetica, sans-serif; text-align: center; background: #fff; }
.datepicker tbody td.date { cursor: pointer; }
.datepicker tbody td.date.over { background-color: #99ffff; }
.datepicker tbody td.date.chosen { font-weight: bold; background-color: #ccffcc; }
	</style>
</head>
<body>
<table width="99%" align=center cellspacing=1 cellpadding=3 border=0>
	<tr class=head>
		<td width='30%' align=center>
			PlatForm Administrator</td>
	</tr>
</table>
<br />
<iframe width="0" height="0" style="display:none" name="ipost"></iframe>
<form method="post" target="ipost">
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr><td class=head><b>修改代理</b></td></tr>
	<tr class="b">
	<td>
		<input type="hidden" name="userid" value="<?php echo $userid?>"/>
		<b>当前用户&nbsp;&nbsp;</b><em style="color: red;"><?php echo $isuser["nickname"]?>(<?php echo $isuser["usernumber"]?>)</em>
	</td>
	</tr>
	<tr class="b">
	<td>
	    <b>选择代理&nbsp;&nbsp;</b>
		<select name="agentid" id="agentid">
		   <option value="0">请选择</option>
<?php foreach ($agentlist as $value):?>
		   <option value="<?php echo $value["userid"]?>"><?php echo $value["nickname"]?>(<?php echo $value["usernumber"]?>)</option>
<?php endforeach;?>
		</select>
	</td>
	</tr>
	<tr>
	<td>
	    <input type="submit" class="input_k" value="-修改-" onclick="return confirm('确认无误要修改吗?')"  />
	    <input type="hidden" name="type" value="save" />
	</td>
	</tr>
</table>
</form>
<center>
<blockquote><hr class=hr size=1>

</blockquote><br>
</center>
</body>
</html>