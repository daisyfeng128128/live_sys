<?php 
include('head.php');
header("Content-type: text/html; charset=utf-8");
$db2=mysql_connect(_MYSQL_HOST_,_MYSQL_USER_,_MYSQL_PWD_);
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
	operational_log(4,"车行指定下轮开奖",$_REQUEST);
}
if($_GET['do']=='config'){
	mysql_query("update carconfig set value='{$_POST['systemdealerid']}' where name='systemdealerid'");
	mysql_query("update carconfig set value='{$_POST['dealerlimit']}' where name='dealerlimit'");
	mysql_query("update carconfig set value='{$_POST['roundlimit']}' where name='roundlimit'");
	mysql_query("update carconfig set value='{$_POST['taxrate']}' where name='taxrate'");
	mysql_query("update carconfig set value='{$_POST['taxfree']}' where name='taxfree'");
	mysql_query("update carconfig set value='{$_POST['winrate']}' where name='winrate'");
	operational_log(4,"修改车行配置",$_REQUEST);
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
<title>车行游戏管理</title>
<script>
$(function(){
	$('.infotxt').datepicker({ dateFormat:'yy-mm-dd',changeMonth:true,changeYear: true});
});
</script>
</head>
<body>
<h1>指定下轮开奖</h1>
<form action="?do=setaward" method='post'>
<p>填写1－8数字，1，2，3，4是小奖从左到右，5,6,7,8是大奖从左到右</p>
<input name="num" type="text" value="" /><br />
<input type="submit" value="确定">
</form>

<h1>配置修改</h1>
<form action="?do=config" method='post'>
<p>修改配置后请重启FMS中car应用</p>
系统庄用户ID:<input name="systemdealerid" type="text" value="<?php echo $config['systemdealerid']?>" /><br />
最低上庄限制:<input name="dealerlimit" type="text" value="<?php echo $config['dealerlimit']?>" /><br />
上庄轮数限制:<input name="roundlimit" type="text" value="<?php echo $config['roundlimit']?>"  /><br />
税收比例:<input name="taxrate" type="text" value="<?php echo $config['taxrate']?>" /><br />
税收免征额:<input name="taxfree" type="text" value="<?php echo $config['taxfree']?>" />输入1到100之间的数字<br />
吃大赔小(稳赢概率):<input name="winrate" type="text" value="<?php echo $config['winrate']?>" />输入0到100之间的数字<br />
<input type="submit" value="修改配置">
</form>
<h1>按用户查询</h1>
<form action="" method='get'>
用户id:<input type="text" name="queryuid" value="<?php echo $_GET['queryuid']?>">，请输入时间段:<input class="infotxt" type="text" name="start" value="<?php echo $_GET['start']?>">-<input class="infotxt" value="<?php echo $_GET['end']?>" type="text" name="end"> <input type="submit" value="确定">
</form>
<div>
<table>
	<tr>
		<td>下注情况</td>
		<td>开奖位置</td>
		<td>反奖金额</td>
		<td>税收</td>
		<td>开奖时间</td>
	</tr>
<?php 
$starttime=$_GET['start'].' 00:00:00';
$endtime=$_GET['end'].' 23:59:59';
$rs=mysql_query("SELECT * FROM `carrecord_person` WHERE userid='$_GET[queryuid]' and addtime>='$starttime' and addtime<='$endtime' order by addtime desc");
while($arr=mysql_fetch_array($rs)){
?>
	<tr>
		<td><?php echo $arr['bet']?></td>
		<td><?php echo $arr['awardnum']?></td>
		<td><?php echo $arr['awardmoney']?></td>
		<td><?php echo $arr['tax']?></td>
		<td><?php echo $arr['addtime']?></td>
	</tr>
<?php 
}
?>
</table>
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
		<td>总税收</td>
		<td>开奖时间</td>
	</tr>
<?php 
$starttime=$_GET['start'].' 00:00:00';
$endtime=$_GET['end'].' 23:59:59';
$rs=mysql_query("SELECT * FROM `carrecord` WHERE addtime>='$starttime' and addtime<='$endtime' order by addtime desc");
while($arr=mysql_fetch_array($rs)){
	$totalcj+=$arr['dealercj'];
	$totaltax+=$arr['tax'];
?>
	<tr>
		<td><?php echo $arr['dealerid']?></td>
		<td><?php echo $arr['dealercj']?></td>
		<td><?php echo $arr['result']?></td>
		<td><?php echo $arr['tax']?></td>
		<td><?php echo $arr['addtime']?></td>
	</tr>
<?php 
}
?>
	<tr>
		<td>合计：</td>
		<td><?php echo $totalcj?></td>
		<td>－－</td>
		<td><?php echo $totaltax?></td>
		<td>－－</td>
	</tr>
</table>
</div>
</body>
</html>
<?php mysql_close($db2);
include($app_path.'include/footer.inc.php');?>