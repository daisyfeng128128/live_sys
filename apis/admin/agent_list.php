<?php 
include('head.php');
include('../../include/level.func.php');
$msg = $_GET["msg"];
if($_GET["act"]=="deleteagent"){
	$userid = (int)$_GET["usernumber"];
	$user = $db->GetRow("select * from user where userid='$userid'");
	if(empty($user)){
		$msg = "此用户不存在";
	}else{
		$db->Execute("DELETE from agentsalary where userid='$userid'");
		$db->Execute("update user set usertype=0 where userid='$userid';");
		$count=$db->Affected_Rows();
		if($count>=1){
			operational_log(5,"删除代理id{$userid}",$_REQUEST,$userid);
			$msg = "操作成功";
		}else{ 
			$msg = "没有执行任务操作";
		}
	}
	unset($_GET["usernumber"]);
}
$where = "";
if(($_GET["usernumber"])!=""){
	$where .= " and u.usernumber=".(int)$_GET["usernumber"]."";
}
if(($_GET["userid"])!=""){
	$where .= " and u.userid=".(int)$_GET["userid"]."";
}
$where_rechargerate='';
$where_consumerate='';
if(!empty($_GET["begin"]) && !empty($_GET["end"])){//如果有时间统计时将时间加进去
	$_GET["begin"] = date("Y-m-d",strtotime($_GET["begin"]));
	$_GET["end"] = date("Y-m-d",strtotime($_GET["end"]));
	
	$where_rechargerate = "and adddate>=".str_replace("-", "", $_GET["begin"])." and adddate<=".str_replace("-", "", $_GET["end"]);
	$where_consumerate = "and a.`when`>=".strtotime($_GET["begin"]." 00:00:00")." and a.`when`<=".strtotime($_GET["end"]." 23:59:59");
}else{
	$end_time = time();
	$start_time = $end_time-86400*7;
	
	$_GET["begin"] = date("Y-m-d",$start_time);
	$_GET["end"] = date("Y-m-d",$end_time);
}
$page = max((int) $_GET['p'], 1);
$limit = 15;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";
// $db->debug = true;
$sql = "select u.nickname,u.usernumber,a.* from user as u,agentsalary a where a.userid=u.userid and u.usertype=7 {$where} order by a.userid desc {$where_limit}";
$sql_count = "select count(*) from user as u,agentsalary a where a.userid=u.userid and u.usertype=7 {$where}";

$total = (int) $db->GetOne($sql_count);
$multi = multi($total, $page, $limit);
$p = new page($page, $multi["pages"], $limit);
$page_count = $p->return_array();

$data = $db->GetArray($sql);
//print_r($data);

//代理消费提成
function agent_consumerate($userid,$where){
	global $db;
	return $db->GetOne("SELECT sum(a.money) as money FROM `user` b ,`balance_change_log` a,bu_user_anchors p
WHERE b.agentid='$userid' and p.userid=b.userid and a.touserid=b.userid and a.why='1' $where");
}

//代理充了多少币
function agent_rechargerate($userid,$where){
	global $db;
	return $db->GetOne("select sum(balanceadd) from orders where `status`=1 and agentid='$userid' $where");
}
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
<title>代理列表</title>
</head>
<body>
<div class="pageexplain">更改用户所属代理，在后台<span class="phppagelink">用户管理</span>，找到对应的用户,点击<span class="phppagelink">设置</span>，更改所属代理</div>
<table width="99%" align="center" cellspacing="1" cellpadding="3" class="i_table">
    <tbody><tr><td colspan="18">
	   <a href="agent_edit.php"><span class="tal_01_01"></span><span class="tal_01_02">添加代理</span><span class="tal_01_03"></span></a></td></tr>
	<tr><td class="head" colspan="18"><b>代理列表</b></td></tr>
	<tr><td colspan="18">
	     <form action="?">
	           用户UserId:<input type="text" name="userid" value="<?php echo $_GET["userid"]?>">
	           视频号:<input type="text" name="usernumber" value="<?php echo $_GET["usernumber"]?>">
			   	           日期:<input class="infotxt" type="text" style="width:74px;" name="begin" value="<?php echo $_GET["begin"]?>">
	   -日期:<input class="infotxt" type="text" style="width:74px;" name="end" value="<?php echo $_GET["end"]?>">
	                <input type="submit" value="-查询-" class="input_k">
	     </form>
	   </td></tr>
	<tr class="head_1">
		<td>用户UserId</td>
		<td>昵称</td>
		<td>视频号</td>
		<td>底薪(元)</td>
		<td>充值提成/消费提成</td>
		<td>充值(<?php echo $page_var['money_name'];?>)</td>
		<td>充值提成(<?php echo $page_var['money_name'];?>/元)</td>
		<td>消费(<?php echo $page_var['money_name'];?>)</td>
		<td>消费提成(<?php echo $page_var['money_name'];?>/元)</td>
		<td>旗下主播销售充值(<?php echo $page_var['money_name'];?>)</td>
		<td>操作</td>
	</tr>
		<?php foreach ($data as $v):
$sum = agent_rechargerate($v["userid"],$where_rechargerate);
$sum_consumerate = agent_consumerate($v["userid"],$where_consumerate);
		?>
		<tr class="b">
		<td><?php echo $v["userid"]?></td>
		<td><?php echo $v["nickname"]?></td>
		<td><?php echo $v["usernumber"]?></td>
		<td><?php echo $v["basicsalary"]?></td>
		<td><?php echo $v["rechargerate"]?>/<?php echo $v["consumerate"]?></td>
		<td><?php echo $sum?></td>
		<td><?php echo floor($sum*$v["rechargerate"])?>/<?php echo floor($sum*$v["rechargerate"]/RMB_XNB)?></td>
		<td><?php echo $sum_consumerate*-1?></td>
		<td><?php echo floor($sum_consumerate*-1*$v["consumerate"])?>/<?php echo floor($sum_consumerate*-1*$v["consumerate"]/RMB_XNB)?></td>
		<td><?php echo agent_order_money($v["userid"],$_GET["begin"],$_GET["end"],"agent");?></td>
<td>
	<a href="?act=deleteagent&usernumber=<?php echo $v["userid"]?>" onclick="return confirm('您确认要执行这项操作吗？')"><img src="../images/root/bbttn.png" style="width: 46px; height:20px;"></a>
	<a href="liveSta.php?agentid=<?php echo $v["userid"]?>&begin=<?php echo $_GET["begin"]?>&end=<?php echo $_GET["end"]?>"><img src="../images/root/zbbtn.png" style="width: 46px; height:20px;"></a>
	<a href="agent_edit.php?userid=<?php echo $v["userid"]?>"><img src="../images/root/bdttn.png" style="width: 46px; height:20px;"></a>
</td>
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