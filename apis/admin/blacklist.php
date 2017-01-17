<?php 
include('head.php');
include('../../include/level.func.php');
$msg = $_GET["msg"];
if($_GET["act"]=="del"){
	$dateinfo = $db->GetRow("select * from blacklist where id='{$_GET["id"]}'");
	$_REQUEST["dateinfo"] = $dateinfo;
	operational_log(5,"删除房间黑名单roomnumber,{$dateinfo["roomnumber"]}",$_REQUEST,$dateinfo["userid"]);
	$db->Execute("DELETE from blacklist where id='{$_GET["id"]}' limit 1");
	$msg = "操作成功!";
}
//$where = " and b.endtime>".time()." and b.level='1'";
if($_GET["roomnumber"]){
	$where .= " and b.roomnumber=".((int)$_GET["roomnumber"]);
}
if($_GET["userid"]){
	$where .= " and u.usernumber='".($_GET["usernumber"])."'";
}
$page = max((int) $_GET['p'], 1);
$limit = 15;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";

$sql = "select b.*,u.nickname,u.usernumber from blacklist b,user u where u.userid=b.userid {$where} order by addtime desc {$where_limit}";
$sql_count = "select count(*) from blacklist b,user u where u.userid=b.userid {$where}";

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
<title>房间黑名单</title>
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
	<tr><td class="head" colspan="18"><b>被封用户列表</b></td></tr>
	<tr><td colspan="18">
	     <form action="?">
	           房间号:<input type="text" name="roomnumber" id="username" value="<?php echo $_GET["roomnumber"]?>">
	           被封用户号:<input type="text" name="usernumber" id="usernumber" value="<?php echo $_GET["usernumber"]?>">
	                <input type="submit" value="-查询-" class="input_k">
	     </form> 
	   </td></tr>
	<tr class="head_1">
	<td>房间号</td>
	<td>被封用户号</td>
	<td>被封用户昵称</td>
	<td>开始时间</td>
	<td>结束时间</td>
	<td>类型</td>
	<td>操作</td>
	</tr>
		<?php foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["roomnumber"]?></td>
		<td><?php echo $v["usernumber"]?></td>
		<td><?php echo $v["nickname"]?></td>
		<td><?php echo date("Y-m-d H:i:s",$v["addtime"])?></td>
		<td><?php echo date("Y-m-d H:i:s",$v["endtime"])?></td>
		<td><?php 
		if($v["level"]=="2"){
			echo "禁言/解禁";
		}else if($v["level"]=="1"){
			echo "封ip/踢出房间";
		}
		?></td>
		<td>
		<a href="?id=<?php echo $v["id"]?>&act=del" onClick="return confirm('确定要进行此操作吗？');">删除</a>
		</td>
		</tr>
		
	</tr>
	<?php endforeach;?>
	<tr class="b"><td colspan="18">
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