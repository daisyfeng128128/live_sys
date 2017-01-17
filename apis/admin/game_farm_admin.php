<?php 
include('head.php');
include('../../include/footer.inc.php');
header("Content-type: text/html; charset=utf-8");
$db=mysql_connect(_MYSQL_HOST_,_MYSQL_USER_,_MYSQL_PWD_);
mysql_query("set names utf8");
mysql_select_db(_MYSQL_DB_);
mysql_query("set names utf8");
if(!$_GET['start']){
	$_GET['start']=date('Y-m-d');
}
if(!$_GET['end']){
	$_GET['end']=date('Y-m-d');
}
if($_GET['do']=='setaward'){
	mysql_query("insert into `caraward`(num)values('{$_POST['num']}')");
}
if($_GET['do']=='config'){
	mysql_query("update frameconfig set value='{$_POST['systemdealerid']}' where name='systemdealerid'");
	mysql_query("update frameconfig set value='{$_POST['dealerlimit']}' where name='dealerlimit'");
	mysql_query("update frameconfig set value='{$_POST['roundlimit']}' where name='roundlimit'");
	//mysql_query("update frameconfig set value='{$_POST['taxrate']}' where name='taxrate'");
	//mysql_query("update frameconfig set value='{$_POST['taxfree']}' where name='taxfree'");
}
$rs=mysql_query("select * from carconfig");
while($arr=mysql_fetch_array($rs)){
	$config[$arr['name']]=$arr['value'];
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script src="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.css">
<title>鸡同鸭讲游戏</title>
<script>
$(function(){
	$('.infotxt').datepicker({ dateFormat:'yy-mm-dd',changeMonth:true,changeYear: true});
});
</script>
</head>
<body>
<h1></h1>
<h1>游戏结果查询</h1>
<form action="" method='get'>
请输入时间段:<input class="infotxt" type="text" name="start" value="<?php echo $_GET['start']?>">-<input class="infotxt" value="<?php echo $_GET['end']?>" type="text" name="end"> <input type="submit" value="确定">
</form>
<div>
<table>
	<tr>
		<td>庄家ID</td>
		<td>庄家成绩</td>
		<td>开奖位置</td>
		<!--td>总税收</td-->
		<td>开奖时间</td>
	</tr>
<?php
$starttime=$_GET['start'].' 00:00:00';
$endtime=$_GET['end'].' 23:59:59';
$rs=mysql_query("SELECT * FROM `framerecord` WHERE addtime>='$starttime' and addtime<='$endtime' order by addtime desc");
while($arr=mysql_fetch_array($rs)){
	$totalcj+=$arr['dealercj'];
	$totaltax+=$arr['tax'];
?>
	<tr>
		<td><?php echo $arr['dealerid']?></td>
		<td><?php echo $arr['dealercj']?></td>
		<td><?php echo $arr['result']?></td>
		<!--td><?php echo $arr['tax']?></td-->
		<td><?php echo $arr['addtime']?></td>
	</tr>
<?php
}
?>
	<tr>
		<td>合计：</td>
		<td><?php echo $totalcj?></td>
		<td>－－</td>
		<!--td><?php echo $totaltax?></td-->
		<td>－－</td>
	</tr>
</table>
</div>
</body>
</html>
<?php mysql_close($db);?>