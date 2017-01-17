<?php include('head.php');?>

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
		<td width='30%' align=center>收回靓号功能</td>
	</tr>
</table>
<br />
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr><td class=head colspan="2"><b></b></td></tr>
	<tr><td colspan="2"><h2 style="color:red">此功能会删除输入的靓号，及此靓号对应的直播记录，请确认后再进行操作</h2></td></tr>	
	<form action="index.php" method="get">
	<tr class="b"><td>请输入要收回的靓号</td><td><input type="text" name="number"/><span style="color:red">用户有两个及以上靓号时才可以回收，否则回收失败</span></td></tr>
	<tr>
	<td>
	    <input type="submit" class="input_k" value="-确定-" onclick="return confirm('您确认要执行这项操作吗？')"/>
	    <input type="hidden" name="action" value="back_number" />
	</td>
	</tr>
	</form>
</table>

<center>
<blockquote><hr class=hr size=1>

</blockquote><br>
</center>
</body>
</html>
<?php include('../../include/footer.inc.php');?>