<?php
exit;
include('head_nologin.php');
if(!isset($_SESSION["admin"])){
	$islogin = false;
	if(isset($_SERVER['PHP_AUTH_USER'])){
		$unioninfo=$db->GetRow("select * from `union` where unionid='{$_SERVER['PHP_AUTH_USER']}'");
		if($unioninfo["loginpwd"]==$_SERVER['PHP_AUTH_PW']){
			$islogin = true;
		}
	}
	if(!$islogin){
		header('WWW-Authenticate: Basic realm="Admin Login"');
		header('HTTP/1.0 401 Unauthorized');
		echo 'Please Login';
		include('../../include/footer.inc.php');
		exit;
	}
}
//$db->debug = true;
$union_temp = $db->GetArray("select * from `union`");
$union_str = null;
foreach ($union_temp as $v) {
	$union_list[$v["unionid"]] = $v;
	if(empty($union_str))
		$union_str = $v["unionid"];
	else 
		$union_str .= ",".$v["unionid"];
}
if($_GET["unionid"]){
	$unionid = (int)$_GET["unionid"];
	$where .= "and u.unionid='{$unionid}'";
}

if($_GET["userid"]){
	$userid = (int)$_GET["userid"];
	$where .= "and u.userid='{$userid}'";
	//输入用户ID后，直接无视时间规则
	$_GET["begin"] = null;
	$_GET["end"] = null;
}else{
	if($_GET["begin"]){
		$begin = strtotime($_GET["begin"]);
	}else{
		$end = strtotime(date("Y-m-d 00:00:00"))+86400-1;
		$begin = strtotime(date("Y-m-d 00:00:00"));
	}
	if($_GET["end"]){
		$end = strtotime($_GET["end"])+86400-1;
	}
	
	$_GET["begin"] = date("Y-m-d",$begin);
	$_GET["end"] = date("Y-m-d",$end);
	
	$where .= " and u.regtime>=".$begin." and u.regtime<=".$end;
}
if($islogin){//是联盟查看
	$unionid = (int)$unioninfo["unionid"];
	$where .= " and unionid={$unionid}";
}
$page = max((int) $_GET['p'], 1);
$limit = 15;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";

$sql = "select * from user as u where unionid!=0 {$where} order by regtime desc {$where_limit}";
$sql_count = "select count(*) from user as u where unionid!=0 {$where}";

$total = (int) $db->GetOne($sql_count);
$multi = multi($total, $page, $limit);
$p = new page($page, $multi["pages"], $limit);
$page_count = $p->return_array();

$data = $db->GetArray($sql);
// print_r($data);
function getOrder($userid){
	global $db;
	$count = $db->GetOne("select sum(money) from orders where sid!='' and userid='$userid'");
	return $count?$count:0;
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script src="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.css">
<title>有效用户列表</title>
<script>
$(function(){
	$('.infotxt').datepicker({ dateFormat: 'yy-mm-dd',changeMonth:true,changeYear: true,currentText: "Now"});
});
</script>
</head>
<body>

<table align="center" border="0" cellpadding="3" cellspacing="1" width="99%">
	<tbody><tr class="head">
		<td align="center" width="30%">
			PlatForm Administrator</td>
	</tr>
</tbody></table>
<br>
<table class="i_table" align="center" cellpadding="3" cellspacing="1" width="99%">
    <tbody><tr><td class="head"><b>有效用户列表</b></td></tr>
	<tr><td>
	<div style="float: left"><form>
	      <input name="unionid" id="unionid" type="hidden" value="<?php echo $_GET["unionid"]?>">
	      用户ID:<input name="userid" id="userid" type="text" value="<?php echo $_GET["userid"]?>">
	         注册日期:<input style="width:74px;" class="infotxt" id="beginTime" name="begin" type="text" value="<?php echo $_GET["begin"]?>">
	   -到:<input style="width:74px;" class="infotxt" id="endTime" name="end" type="text" value="<?php echo $_GET["end"]?>">
	         <input value="-查询-" class="input_k" type="submit">
	</form></div>
	   </td></tr>
	 </tbody></table>
	<form action="" method="post" name="myform">
	<table class="i_table" id="tblout" align="center" cellpadding="3" cellspacing="1" width="99%">
	<tbody><tr class="head_1">
	<td>注册日期</td>
	<td>推广ID</td>
	<td>用户ID</td>
	<td>用户昵称</td>
	<!-- 
	<td>注册IP</td>
	<td>登录次数</td>
	 -->
	<td>最后登录IP</td>
	<td>送出掌声(红包)</td>
	<td>最后登录时间</td>
	<td>充值统计(总金额)</td>
	</tr>
<?php foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo date("Y-m-d H:i:s", $v["regtime"]);?></td>
		<td><?php echo $v["unionid"]?></td>
		<td><?php echo $v["userid"]?></td>
		<td><?php echo $v["nickname"]?></td>
		<!-- 
		<td>无</td>
		<td>无</td>
		-->
		<td><?php echo long2ip($v["lastloginip"])?></td>
		<td><?php echo (int)$db->GetOne("select count(*) from balance_change_log where userid='{$v["userid"]}' and giftid=1");?></td>
		<td><?php echo date("Y-m-d", $v["lastlogin"]);?></td>
	<td><?php echo getOrder($v["userid"]);?>元</td>
		</tr>
<?php endforeach;?>
<?php 
$get=null;
foreach ($_GET as $key=>$value) {
if($key=="p")continue;
	$get .= "&$key=$value";
}
?>
	<tr class="b"><td colspan="10">
<?php 
$get=null;
foreach ($_GET as $key=>$value) {
if($key=="p")continue;
	$get .= "&$key=$value";
}?>
		共<?php echo $multi["pages"]?>页 &nbsp;|&nbsp; 共<?php echo $multi["total"]?>条记录 &nbsp;|&nbsp; 当前<?php echo $multi["page"]?>/<?php echo $multi["pages"]?>
		<?php foreach ($page_count as $value):?>
		<a <?php if($page==$value)echo "class=active_page";?> href="?p=<?php echo $value?><?php echo $get?>"><?php echo $value?></a>&nbsp;
		<?php endforeach;?>
	     </td>
	</tr>	

</tbody></table>
<script type="text/javascript">
var msg='';
if(msg!='')
{
 alert(msg);
}
</script>

<center>
<blockquote><hr class="hr" size="1">

</blockquote><br>
</center>

</body>
</html>
<?php include('../../include/footer.inc.php');?>