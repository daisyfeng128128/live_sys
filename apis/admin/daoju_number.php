<?php 
include('head.php');
include('../../include/level.func.php');
$msg = $_GET["msg"];
$where = "";
if(($_GET["usernumber"])!=""){
	$where .= " and (n.number=".((int)$_GET["usernumber"])." or u.usernumber=".((int)$_GET["usernumber"]).")";
}
$page = max((int) $_GET['p'], 1);
$limit = 15;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";
//$db->debug = true;
$sql = "select u.userid,u.nickname,u.usernumber,n.number from user as u,user_number n where n.userid=u.userid and u.usernumber!=n.number {$where} order by userid desc {$where_limit}";
$sql_count = "select count(*) from user as u,user_number n where n.userid=u.userid and u.usernumber!=n.number {$where}";

$total = (int) $db->GetOne($sql_count);
$multi = multi($total, $page, $limit);
$p = new page($page, $multi["pages"], $limit);
$page_count = $p->return_array();

$data = $db->GetArray($sql);
//print_r($data);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script src="/js/lib/jquery.cal.js"></script>
<script>
$(function(){
$('.infotxt').simpleDatepicker();
});
</script>
<title>靓号查询</title>
</head>
<body>
<table width="99%" align="center" cellspacing="1" cellpadding="3" border="0">
	<tbody><tr class="head">
		<td width="30%" align="center">
			
			PlatForm Administrator</td>
	</tr>
</tbody></table>
<br>
<table width="99%" align="center" cellspacing="1" cellpadding="3" class="i_table">
    <tbody><tr><td colspan="18"><?php include 'daoju_head.php';?></td></tr>
	<tr><td class="head" colspan="18"><b>靓号查询</b></td></tr>
	<tr><td colspan="18">
	     <form action="?">
	           视频号:<input type="text" name="usernumber" value="<?php echo $_GET["usernumber"]?>">
	                <input type="submit" value="-查询-" class="input_k">
	     </form> 
	   </td></tr>
	<tr class="head_1">
	<td>用户UserID</td>
	<td>用户昵称</td>
	<td>当前使用视频号</td>
	<td>拥有的视频号</td>
	</tr>
		<?php foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["userid"]?></td>
		<td><?php echo $v["nickname"]?></td>
		<td><?php echo $v["usernumber"]?></td>
		<td><?php echo $v["number"]?></td>
		</tr>
		
	</tr>
	<?php endforeach;?>
	<tr class="b"><td colspan="5">
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