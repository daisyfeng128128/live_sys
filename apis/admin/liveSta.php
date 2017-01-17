<?php 
ob_start();
include('head.php');
$msg = $_GET["msg"];
$where = null;
if($_GET["usernumber"]){
	$where .= " and u.usernumber=".((int)$_GET["usernumber"]);
}
if($_GET["agentid"]){
	$where .= " and u.agentid=".((int)$_GET["agentid"]);
}
if($_GET["nickname"]){
	$where .= " and u.nickname='".($_GET["nickname"])."'";
}
if($_GET["begin"]){
	$end_time = strtotime($_GET['end']." 23:59:59");
	$start_time = strtotime($_GET['begin']);
}else{
	$end_time = time();
	$start_time = $end_time-86400*7;
}
$_GET['begin'] = date('Y-m-d',$start_time);
$_GET['end'] = date('Y-m-d',$end_time);
//$where .= " and s.starttime>$start_time and s.starttime<=$end_time";

$page = max((int) $_GET['p'], 1);
$limit = 20;
$start = ($page - 1) * $limit;
if($_GET["exportData"]!="1"){//不是导出加条件
	$where_limit = " limit $start, $limit";
}else{
	$where_limit = " limit 1000";
	operational_log(6,"导出主播直播统计",$_REQUEST);
}

$sql = "select DISTINCT a.userid,u.usernumber,u.nickname,a.truename,a.basicsalary from bu_user_anchors a, shows s,user u where s.userid=a.userid and a.userid=u.userid {$where} order by userid desc {$where_limit}";
$sql_count = "select count(DISTINCT a.userid) from bu_user_anchors a, shows s,user u where s.userid=a.userid and a.userid=u.userid {$where}";

$total = (int) $db->GetOne($sql_count);
$multi = multi($total, $page, $limit);
$p = new page($page, $multi["pages"], $limit);
$page_count = $p->return_array();

$data = $db->GetArray($sql);
$data_ok = array();
$userids = null;
foreach ($data as $v){
	$userids.=$v["userid"].",";
	$v["time"] = 0;
	$data_ok[$v["userid"]] = $v;
}
$userids = trim($userids,",");
//现在已经找出了当有页有哪此主播，查这些主播的直播记录
//$show_data = $db->GetArray("select * from shows where endtime is not null and userid in($userids) and ((starttime>=$start_time and starttime<=$end_time) or (endtime>=$start_time and endtime<=$end_time)) order by starttime desc");

if($_GET["exportData"]!="1"){//不是导出加条件
	$show_data = $db->GetArray("select * from shows_valid where userid in($userids) and date>='$_GET[begin]' and date<='$_GET[end]'");
}else{
	$show_data = $db->GetArray("select * from shows_valid where date>='$_GET[begin]' and date<='$_GET[end]'");
}

foreach ($show_data as $v){
	$data_ok[$v["userid"]]["time"] += ($v['time']);
}
//print_r($data_ok);
//print_r($data);
//print_r($show_data);
//exit;
$agentlist = $db->GetArray("select u.nickname,u.usernumber,u.userid from user as u,agentsalary a where a.userid=u.userid and u.usertype=7");
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
	$("select[name=agentid]").val("<?php echo $_GET["agentid"]?>");
	
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
	<tr><td class="head" colspan="18"><b>主播直播统计</b></td></tr>
	<tr><td colspan="18">
	     <form action="?">
		 <input name="exportData" type="hidden" value="0"/>
	           日期:<input type="text" class="infotxt" style="width:74px;" name="begin" value="<?php echo $_GET["begin"]?>">
	   -日期:<input type="text" class="infotxt" style="width:74px;" name="end" value="<?php echo $_GET["end"]?>">
	           视频号:<input type="text" name="usernumber" id="username" value="<?php echo $_GET["usernumber"]?>"> 
			   选择代理
		<select name="agentid" id="agentid">
		   <option value="0">请选择</option>
<?php foreach ($agentlist as $value):?>
		   <option value="<?php echo $value["userid"]?>"><?php echo $value["nickname"]?>(<?php echo $value["usernumber"]?>)</option>
<?php endforeach;?>
		</select>
		<input type="submit" value="-查 询-" onClick="$('[name=exportData]').val(0);"/>
		<input type="submit" value="导出Excel" onClick="$('[name=exportData]').val(1);"/>
	     </form> 
		 <p style="color:red">有效天数为每天统计一次，今天的有效天数明天统计</p>
	   </td></tr>
<?php 
$table_head = array("用户UserID","视频号","用户昵称","真实姓名","直播时长","销售充值({$page_var['money_name']})","底薪(RMB:元)","销售({$page_var['money_name']})","得到({$page_var['money_name2']})","统计日期","有效直播天数",);
$export_data = array(0=>$table_head);?>
	<tr class="head_1">
	<?php foreach ($table_head as $value):?>
		<td><?php echo $value?></td>
	<?php endforeach;?>
	<td>操作</td>
	</tr>
		<?php foreach ($data_ok as $v):
		if(empty($v["userid"])){
			continue;
		}
		$xiaoshou = show_xiaoshou_money($v["userid"],$_GET['begin'],$_GET['end']);
$tmp = array(
		$v["userid"],
		$v["usernumber"],
		$v["nickname"],
		$v["truename"],
		interval_time($v["time"]),
		show_order_money($v["userid"],$_GET['begin'],$_GET['end']),
		$v["basicsalary"],
		$xiaoshou["balance"],
		$xiaoshou["point"],
		($_GET['begin']."至".$_GET['end']),
		live_shows_valid($v["userid"],$_GET['begin'],$_GET['end']),
);
$export_data[] = $tmp;
		?>
			<tr class="b">
			<?php foreach ($tmp as $value):?>
				<td><?php echo $value?></td>
			<?php endforeach;?>
				<td><a href="liveSta_more.php?userid=<?php echo $v["userid"]?>&begin=<?php echo $_GET['begin']?>&end=<?php echo $_GET['end']?>">详情</a></td>
			</tr>
	</tr>
	<?php endforeach;?>
	<tr class="b"><td colspan="18">
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
<?php if($msg):?>
<script>alert("<?php echo $msg?>");</script>
<?php endif;?>
</body>
</html>
<?php 
if($_GET["exportData"]=="1"){
	exportDataArray($export_data);
}
include('../../include/footer.inc.php');?>