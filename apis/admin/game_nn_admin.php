<?php 
include('head.php');
$msg = $_GET["msg"];
//$db->debug = true;
if($_POST['type']=='config'){
	$db->Execute("update global_config set v='{$_POST['game_nn_type']}' where k='game_nn_type'");
	$db->Execute("update global_config set v='{$_POST['game_nn_win_point']}' where k='game_nn_win_point'");
	operational_log(4,"牛牛配置修改",$_REQUEST);
	//清空缓存
	$db->CacheExecute(1,"select * from global_config");
}

$where = "";
if($_GET["userid"]){
	$where .= " and u.userid='".((int)$_GET["userid"])."'";
}
if($_GET["orderid"]){
	$where .= " and n.orderid='".(int)($_GET["orderid"])."'";
}
if($_GET["begin"]){
	$where .= " and n.currentts>='".($_GET["begin"])."'";
}
if($_GET["end"]){
	$where .= " and n.currentts<='".date("Y-m-d H:i:s",strtotime($_GET["end"])+86400-1)."'";
}
$page = max((int) $_GET['p'], 1);
$limit = 20;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";

$sql = "select n.*,u.nickname from nnbet n,user u where n.userid=u.userid {$where} ORDER BY orderid desc {$where_limit}";
$sql_count = "select count(*) from nnbet n,user u where n.userid=u.userid {$where}";

$total = (int) $db->GetOne($sql_count);
$multi = multi($total, $page, $limit);
$p = new page($page, $multi["pages"], $limit);
$page_count = $p->return_array();

$datalist = $db->GetArray($sql);

$arr = $db->GetArray("select * from global_config");
$data = array();
foreach ($arr as $v){
	$data[$v["k"]] = $v["v"];
}
$input_radio = array("game_nn_type","game_nn_win_point");//单选按钮
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script src="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.css">
<title>牛牛游戏</title>
<script type="text/javascript">
$(function() {
<?php foreach ($data as $k=>$v):
if(in_array($k,$input_radio)){?>
	$("[name=<?php echo $k?>][value=\"<?php echo $v?>\"]").attr("checked","checked");
<?php }?>
<?php endforeach;?>

	$('.infotxt').datepicker({ dateFormat:'yy-mm-dd',changeMonth:true,changeYear: true});
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
<form action="" method="post">
<input type="hidden" name="type" value="config"/>
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
<tr class="b"><td>开奖方式:  </td><td><input type="radio" value="0" name="game_nn_type">全随机<input type="radio" value="1" name="game_nn_type">固定胜率   <span></span></td></tr>
<tr class="b"><td>胜率:  </td><td>
	<input type="radio" value="0" name="game_nn_win_point">0%胜率
	<input type="radio" value="1" name="game_nn_win_point">25%胜率
	<input type="radio" value="2" name="game_nn_win_point">50%胜率
	<input type="radio" value="3" name="game_nn_win_point">75%胜率
</td></tr>
<tr class="b"><td colspan="2">  <input type="submit" value="-修改-" class="input_k" onclick="return confirm('确定要修改记录吗?')" /></td></tr>
</form>

<table width="99%" align="center" cellspacing="1" cellpadding="3" class="i_table">
    <tbody>
		<tr><td colspan="18">
	     <form action="?">
	           注册日期:<input type="text" class="infotxt" name="begin" value="<?php echo $_GET["begin"]?>" style="width:64px;"/>
				到:<input type="text" class="infotxt" name="end" value="<?php echo $_GET["end"]?>" style="width:64px;"/>
	           编号:<input type="text" name="orderid" id="orderid" value="<?php echo $_GET["orderid"]?>" style="width: 40px;"/>
			   Userid:<input type="text" name="userid" id="userid" value="<?php echo $_GET["userid"]?>" style="width: 40px;"/>
	                <input type="submit" value="-查询-" class="input_k">
	     </form> 
	   </td></tr>
	<tr class="head_1">
	<td>编号</td>
	<td>用户ID</td>
	<td>用户昵称</td>
	<td>下注金额</td>
	<td>结果</td>
	<td>下注时间</td>
	</tr>
		<?php foreach ($datalist as $v):?>
		<tr class="b">
		<td><?php echo $v["orderid"]?></td>
		<td><?php echo $v["userid"]?></td>
		<td><?php echo $v["nickname"]?></td>
		<td><?php echo $v["betmoney"]?></td>
		<td><?php echo $v["token"]?></td>
		<td><?php echo $v["currentts"]?></td>
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