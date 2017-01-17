<?php 
include('head.php');
$msg = $_GET["msg"];
$where = null;
if($_GET["usernumber"]){
	$where .= " and u.usernumber=".((int)$_GET["usernumber"]);
}
if($_GET["nickname"]){
	$where .= " and u.nickname='".($_GET["nickname"])."'";
}
if($_GET["userid"]){
	$where .= " and u.userid='".($_GET["userid"])."'";
}
if($_GET["begin"]){
	$end_time = strtotime($_GET['end']." 23:59:59");
	$start_time = strtotime($_GET['begin']);
}else{
	$end_time = time();
	$start_time = $end_time-86400*7;
}
$_GET['begin'] = date('Y-m-d',$start_time);
$_GET['end'] = date('Y-m-d',($end_time));
$where .= " and s.starttime>=$start_time and s.starttime<=".($end_time);
//$db->debug = true;
$page = max((int) $_GET['p'], 1);
$limit = 20;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";

$sql = "select u.nickname,s.* from shows s,user u where s.userid=u.userid and endtime is not null {$where} order by starttime desc";
$data = $db->GetArray($sql);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script src="../../js/lib/jquery.cal.js"></script>
<title>无标题文档</title>
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
	$("#isblock option[value=<?php echo $_GET["isblock"]?>]").attr("selected","selected");
	
$(".infotxt").focus(function(){
  $("table.datepicker .close").click();
});
$('.infotxt').simpleDatepicker();
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
<tr><td colspan="6">
	     <form action="?">
		 <input type="hidden" name="userid" value="<?php echo $_GET["userid"]?>">
	           开始时间:<input type="text" class="infotxt" style="width:74px;" name="begin" value="<?php echo $_GET["begin"]?>">
	   -结束时间:<input type="text" class="infotxt" style="width:74px;" name="end" value="<?php echo $_GET["end"]?>">
	                <input type="submit" value="-查询-" class="input_k">
	     </form> 
</td></tr>
	<tr><td class="head" colspan="6"><b>主播直播记录</b></td></tr>
	<tr class="head_1">
	<td>用户UserID</td>
	<td>视频号</td>
	<td>用户昵称</td>
	<td>开始直播时间</td>
	<td>结束直播时间</td>
	<td>直播时长</td>
	</tr>
		<?php foreach ($data as $v):?>
		<tr class="b">
		<td title="showid_<?php echo $v["id"]?>"><?php echo $v["userid"]?></td>
		<td><?php echo $v["roomnumber"]?></td>
		<td><?php echo $v["nickname"]?></td>
		<td><?php echo date("Y-m-d H:i:s",$v["starttime"]);?></td>
		<td><?php echo date("Y-m-d H:i:s",$v["endtime"]);?></td>
		<td><?php echo interval_time($v["endtime"]-$v["starttime"])?></td>
		</tr>
	</tr>
	<?php endforeach;?>
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