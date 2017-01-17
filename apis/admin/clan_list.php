<?php 
include('head.php');
include('../../include/level.func.php');
$msg = $_GET["msg"];
$where = "";
if(($_GET["usernumber"])!=""){
	$where .= " and u.usernumber=".(int)$_GET["usernumber"]."";
}
if(($_GET["userid"])!=""){
	$where .= " and u.userid=".(int)$_GET["userid"]."";
}
if(($_GET["clanname"])!=""){
	$where .= " and a.clanname='".$_GET["clanname"]."'";
}
$where_consumerate='';
if(!empty($_GET["begin"]) && !empty($_GET["end"])){//如果有时间统计时将时间加进去
	$_GET["begin"] = date("Y-m-d",strtotime($_GET["begin"]));
	$_GET["end"] = date("Y-m-d",strtotime($_GET["end"]));
	
	$where_consumerate = "and bill.`when`>".strtotime($_GET["begin"]." 00:00:00")." and bill.`when`<".strtotime($_GET["end"]." 23:59:59");
}
$page = max((int) $_GET['p'], 1);
$limit = 15;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";
//$db->debug = true;
$sql = "select u.nickname,u.usernumber,u.userid,a.* from user as u,clan a where a.leaderid=u.userid {$where} order by u.userid desc {$where_limit}";
$sql_count = "select count(*) from user as u,clan a where a.leaderid=u.userid {$where}";

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
<script src="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.css">
<script>
$(function(){
$('.infotxt').datepicker({ dateFormat:'yy-mm-dd',changeMonth:true,changeYear: true});
});
</script>
<title>家族列表</title>
</head>
<body>
<div class="pageexplain">更改用户所属家族，在后台<span class="phppagelink">用户管理</span>，找到对应的用户,点击<span class="phppagelink">设置</span>，更改所属家族</div>
<div class="pageexplain">帐单每天统计一次，今天的帐单明日统计</div>
<table width="99%" align="center" cellspacing="1" cellpadding="3" class="i_table">
    <tbody>
	<tr><td class="head" colspan="18"><b>家族列表-,提成金额=收到的积分*提成比例/<?php echo RMB_XNB?>(人民币比例)    [家族提成比例在<a href="global_config.php" class="red_important phppagelink">网站配置</a>中修改]</b></td></tr>
	<tr><td colspan="18">
	     <form action="?">
	           家族名:<input type="text" name="clanname" value="<?php echo $_GET["clanname"]?>">
	           族长用户UserId:<input type="text" name="userid" value="<?php echo $_GET["userid"]?>">
	          族长  视频号:<input type="text" name="usernumber" value="<?php echo $_GET["usernumber"]?>">
			   	           日期:<input class="infotxt" type="text" style="width:74px;" name="begin" value="<?php echo $_GET["begin"]?>">
	   -日期:<input class="infotxt" type="text" style="width:74px;" name="end" value="<?php echo $_GET["end"]?>">
	                <input type="submit" value="-查询-" class="input_k">
	     </form>
	   </td></tr>
	<tr class="head_1">
		<td>家族名</td>
		<td>族长用户UserId</td>
		<td>族长昵称</td>
		<td>族长视频号</td>
		<td title="用户向主播花了多少钱">业绩</td>
		<td>收到<?php echo $page_var['money_name2'];?></td>
		<td title="收到的积分*提成比例/<?php echo RMB_XNB?>(人民币比例)">提成(元)</td>
	</tr>
		<?php foreach ($data as $v):
$sum_consumerate = $db->GetRow("select sum(bill.money) money,sum(bill.point) as point from clan_bill bill where bill.clanid='{$v["clanid"]}' $where $where_consumerate");
		?>
		<tr class="b">
		<td><?php echo $v["clanname"]?></td>
		<td><?php echo $v["userid"]?></td>
		<td><?php echo $v["nickname"]?></td>
		<td><?php echo $v["usernumber"]?></td>
		<td><?php echo (int)$sum_consumerate["money"]?></td>
		<td><?php echo (int)$sum_consumerate["point"]?></td>
		<td><?php echo $sum_consumerate["point"]*CLAN_CONSUMERATE/RMB_XNB?></td>
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