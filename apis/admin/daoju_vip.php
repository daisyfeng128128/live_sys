<?php 
include('head.php');
include('../../include/level.func.php');
//$db->debug = true;
$msg = $_GET["msg"];
//$where = "viplevel>0 and vip_vailddate>".time();
$where = "viplevel>0";
if(($_GET["usernumber"])!=""){
	$where .= " and u.usernumber=".((int)$_GET["usernumber"]);
}
if($_GET["begin"]){
	$where .= " and u.vip_vailddate>=".strtotime($_GET["begin"]);
}
if($_GET["end"]){
	$where .= " and u.vip_vailddate<=".strtotime($_GET["end"]);
}
$page = max((int) $_GET['p'], 1);
$limit = 15;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";
$sql = "select * from user as u where {$where} order by userid desc {$where_limit}";
$sql_count = "select count(*) from user as u where {$where}";

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
<link rel="stylesheet" type="text/css" href="style.css?20150326">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script src="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.css">
<script>
$(function(){
$('.infotxt').datepicker({ dateFormat:'yy-mm-dd',changeMonth:true,changeYear: true});
});
</script>
<title>VIP查询</title>
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
	<tr><td class="head" colspan="18"><b>VIP用户列表-当前显示为有效期内的用户</b></td></tr>
	<tr><td colspan="18">
	     <form action="?">
	           日期:<input class="infotxt" type="text" style="width:74px;" name="begin" value="<?php echo $_GET["begin"]?>">
	   -日期:<input class="infotxt" type="text" style="width:74px;" name="end" value="<?php echo $_GET["end"]?>">
	           视频号:<input type="text" name="usernumber" value="<?php echo $_GET["usernumber"]?>">
	                <input type="submit" value="-查询-" class="input_k">
	     </form> 
	   </td></tr>
	<tr class="head_1">
	<td>用户UserID</td>
	<td>用户昵称</td>
	<td>视频号</td>
	<td title="1:普通VIP,2:至尊VIP,3:黑色VIP">VIP类型</td>
	<td>到期时间</td>
	</tr>
		<?php foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["userid"]?></td>
		<td><?php echo $v["nickname"]?></td>
		<td><?php echo $v["usernumber"]?></td>
		<td><?php echo $v["viplevel"]?>级</td>
		<td><?php 
			echo date("Y-m-d H:i:s",$v["vip_vailddate"]);
			echo (time()>$v["vip_vailddate"])?'<span class="bgred">已过期</span>':'';
		?></td>
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