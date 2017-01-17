<?php 
include('head.php');
//$db->debug = true;
$msg = $_GET["msg"];
if($_REQUEST["action"]=="add"){
	if(empty($_REQUEST[words])){
		$msg = "请输入词汇名称";
	}else{
		$db->Execute("INSERT INTO `badwords`(`words`) VALUES ('$_REQUEST[words]');");
		operational_log(3,("添加屏蔽词汇id".$db->Insert_ID()),$_REQUEST);
	}
}else if($_REQUEST["action"]=="del"){
	$row = $db->Execute("delete from badwords where id='".(int)$_GET[id]."'");
	operational_log(5,"删除屏蔽词汇id{$_GET[id]}",$_REQUEST);
	unset($_REQUEST["id"]);
	$msg = "操作成功";
}
$where = "";
if(($_GET["words"])!=""){
	$where .= " and `words` like '%".$_GET["words"]."%'";
}
$page = max((int) $_GET['p'], 1);
$limit = 15;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";

$sql = "select * from badwords where 1=1 {$where} order by id desc {$where_limit}";
$sql_count = "select count(*) from badwords where 1=1 {$where}";

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
<script src="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.css">
<title>屏蔽词汇表</title>
</head>
<body>
<div class="pageexplain">屏蔽词汇的意思是,在直播间聊天的内容中不能出现下面列表中的词汇;修改完成之后需要重启房间生效(或房间内没有人了，再次直播即可生效)</div>
<table width="99%" align="center" cellspacing="1" cellpadding="3" class="i_table">
    <tbody>
	<form method="post">
    <tr><td class="head" colspan="3"><b>添加分类</b></td></tr>
    <tr class="b">
	<td colspan="3">
	<input type="hidden" name="action" value="add">
	词汇名称:<input type="text" name="words" value=""></td>
	</tr>
	<tr class="b">
	<td colspan="3">
	   <input type="submit" class="input_k" value="-添加-">
	</td>
	</tr>
	</form>
	<tr><td class="head" colspan="3"><b>屏蔽词汇</b></td></tr>
	<tr><td colspan="3">
	     <form action="?">
	           词汇名称:<input type="text" name="words" value="<?php echo $_GET["words"]?>">
	                <input type="submit" value="-查询-" class="input_k">
	     </form>
	   </td></tr>
	<tr class="head_1">
		<td>类别编号</td>
		<td>词汇名称</td>
		<td>操作</td>
	</tr>
<?php foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["id"]?></td>
		<td><?php echo $v["words"]?></td>
		<td><a href="?action=del&id=<?php echo $v["id"]?>"><img src="../images/root/bbttn.png" style="width: 46px; height:20px;" onclick="return confirm('确定要删除该词?')"></a></td>
		</tr>
<?php endforeach;?>
	<tr class="b"><td colspan="3">
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