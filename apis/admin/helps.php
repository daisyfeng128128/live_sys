<?php 
include('head.php');
$msg = $_GET["msg"];
//$db->debug = true;
if($_GET['active']=='del'){
	$id=$_GET['id'];
	$db->Execute("delete from help where id=$id");
	operational_log(5,"删除帮助id{$id}",$_REQUEST);
	$msg = "操作成功";
}
$page = max((int) $_GET['p'], 1);
$limit = 20;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";

$sql = "select DISTINCT * from help ORDER BY id desc {$where_limit}";
$sql_count = "select count(*) from help";

$total = (int) $db->GetOne($sql_count);
$multi = multi($total, $page, $limit);
$p = new page($page, $multi["pages"], $limit);
$page_count = $p->return_array();

$data = $db->GetArray($sql);
$helptype = array(0=>"用户帮助",1=>"主播帮助");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>帮助列表</title>
<style>
.datepicker { border-collapse: collapse; border: 2px solid #999; position: absolute;width:210px;}
.datepicker tr.controls th { height: 22px; font-size: 11px; }
.datepicker select { font-size: 11px; }
.datepicker tr.days th { height: 18px; }
.datepicker tfoot td { height: 18px; text-align: center; text-transform: capitalize; }
.datepicker th, .datepicker tfoot td { background: #eee; font: 10px/18px Verdana, Arial, Helvetica, sans-serif; }
.datepicker th span, .datepicker tfoot td span { font-weight: bold; }

.datepicker tbody td { width: 24px; height: 24px; border: 1px solid #ccc; font: 11px/22px Arial, Helvetica, sans-serif; text-align: center; background: #fff; }
.datepicker tbody td.date { cursor: pointer; }
.datepicker tbody td.date.over { background-color: #99ffff; }
.datepicker tbody td.date.chosen { font-weight: bold; background-color: #ccffcc; }
</style>
<script>
$(function(){
	$("#position option[value=<?php echo $_GET["position"]?>]").attr("selected","selected");
});
</script>
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
	<tr><td class="head" colspan="18"><b>帮助列表</b>
		<span style="padding-left:10px;" class="red">帮助修改完成后，<a target="_blank" href="/tools/makehtml.php">点击我</a>，重新生成帮助页面。</span>
	</td></tr>
	<tr><td colspan="18">
	
		 <a href="helps_edit.php"><span class="tal_01_01"></span><span class="tal_01_02">添加内容</span><span class="tal_01_03"></span></a><br>
	   </td></tr>
	<tr class="head_1">
	<td>编号</td>
	<td>标题</td>
	<td>类别</td>
	<td>添加日期</td>
	<td>操作</td>
	</tr>
		<?php foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["id"]?></td>
		<td><?php echo $v["title"]?></td>
		<td><?php echo $helptype[$v["type"]]?></td>
		<td><?php echo $v["strdate"]?></td>
		<td><a href="helps_edit.php?id=<?php echo $v["id"]?>">编辑</a>&nbsp;<a onClick="return confirm('确定进行此操作吗？')" href="?active=del&id=<?php echo $v["id"]?>">删除</a></td>
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