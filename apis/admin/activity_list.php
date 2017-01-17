<?php 
exit;
//vli人定制
include('head.php');
$msg = $_GET["msg"];
//$db->debug = true;
if($_GET['active']=='del'){
	$id=$_GET['id'];
	$db->Execute("delete from activity_list where id=$id");
	operational_log(5,"删除活动id,{$id}",$_REQUEST);
	$msg = "操作成功";
}
$page = max((int) $_GET['p'], 1);
$limit = 20;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";

$sql = "select DISTINCT * from activity_list where 1=1 {$where} ORDER BY `order` asc,id desc {$where_limit}";
$sql_count = "select count(*) from activity_list where 1=1 {$where}";

$total = (int) $db->GetOne($sql_count);
$multi = multi($total, $page, $limit);
$p = new page($page, $multi["pages"], $limit);
$page_count = $p->return_array();

$data = $db->GetArray($sql);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>活动</title>
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
    <tbody>
	<tr><td colspan="18">
	
		 <a href="activity_list_edit.php"><span class="tal_01_01"></span><span class="tal_01_02">添加</span><span class="tal_01_03"></span></a>
	   </td></tr>
	<tr><td class="head" colspan="18"><b>活动</b></td></tr>
	<tr class="head_1">
	<td>标题</td>
	<td>图片路径</td>
	<td>链接地址</td>
	<td>排序（越小越靠前）</td>
	<td>开始时间</td>
	<td>结束时间</td>
	<td>操作</td>
	</tr>
		<?php foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["title"]?></td>
		<td><?php echo $v["picSrc"]?></td>
		<td><?php echo $v["url"]?></td>
		<td><?php echo $v["order"]?></td>
		<td><?php echo date("Y-m-d",$v['start_date'])?></td>
		<td><?php echo date("Y-m-d",$v['end_date'])?></td>
		<td><a href="activity_list_edit.php?id=<?php echo $v["id"]?>">编辑</a>&nbsp;<a onClick="return confirm('确定进行此操作吗？')" href="?active=del&id=<?php echo $v["id"]?>">删除</a></td>
		</tr>
	</tr>
	<?php endforeach;?>
	<tr class="b"><td colspan="9">
<?php 
$get=null;
foreach ($_GET as $key=>$value) {
if($key=="p")continue;
	$get .= "&$key=$value";
}
?>
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