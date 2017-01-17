<?php 
include('head.php');
include('../../include/level.func.php');
$msg = $_GET["msg"];
//$db->debug = true;
$where = "";
if($_GET["begin"]){
	$where .= " and a.addtime>=".strtotime($_GET["begin"]);
}
if($_GET["end"]){
	$where .= " and a.addtime<=".strtotime($_GET["end"]." 23:59:59");
}
if($_GET["id"]){
	$where .= " and a.id=".((int)$_GET["id"]);
}
if($_GET["usernumber"]){
	$where .= " and u.usernumber=".((int)$_GET["usernumber"]);
}
if($_GET["nickname"]){
	$where .= " and u.nickname='".($_GET["nickname"])."'";
}
if($_GET["userid"]){
	$where .= " and u.userid='".((int)$_GET["userid"])."'";
}
if(isset($_GET["why"]) && $_GET["why"]!="-1"){
	$where .= " and a.why='".((int)$_GET["why"])."'";
}
$page = max((int) $_GET['p'], 1);
$limit = 15;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";

$sql = "select a.*,u.nickname,u.usernumber,u.totalpoint from user u,exchange_log a where u.userid=a.userid {$where} order by a.id desc {$where_limit}";
$sql_count = "select count(*) from user u,exchange_log a where u.userid=a.userid {$where}";

$total = (int) $db->GetOne($sql_count);
$multi = multi($total, $page, $limit);
$p = new page($page, $multi["pages"], $limit);
$page_count = $p->return_array();

$data = $db->GetArray($sql);
$arr_why = array("1"=>"<span class='blue'>{$global_config_data["money_name2"]}兑换{$global_config_data["money_name"]}</span>","2"=>"<span class='green'>{$global_config_data["money_name"]}兑换游戏币</span>","4"=>"<span class='red'>游戏币兑换{$global_config_data["money_name"]}</span>");
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>兑换记录</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script src="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.css">
<script>
$(function(){
	$('.infotxt').datepicker({ dateFormat:'yy-mm-dd',changeMonth:true,changeYear: true});
	$("#why option[value=<?php echo $_GET["why"]?>]").attr("selected","selected");
});
</script>
</head>
<body>

<table width="99%" align=center cellspacing=1 cellpadding=3 border=0>
	<tr class=head>
		<td width='30%' align=center>
			PlatForm Administrator</td>
	</tr>
</table>
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
    <tr><td class="head" colspan="15"><b>兑换记录列表</b></td></tr>
	<tr><td colspan="15">
	     <form action="">
			兑换日期:<input type="text" class="infotxt" name="begin" value="<?php echo $_GET["begin"]?>" style="width:64px;"/>
				到:<input type="text" class="infotxt" name="end" value="<?php echo $_GET["end"]?>" style="width:64px;"/>
	          编号<input type="text" name="id" id="id" value="<?php echo $_GET["id"]?>" style="width: 40px;"/> 
	          用户ID<input type="text" name="userid" id="userid" value="<?php echo $_GET["userid"]?>" style="width: 40px;"/> 
	          用户昵称<input type="text" name="nickname" id="userid" value="<?php echo $_GET["nickname"]?>" style="width: 74px;"/> 
	          用户靓号<input type="text" name="usernumber" id="usernumber" value="<?php echo $_GET["usernumber"]?>" style="width: 80px;"/>
			  兑换方式<select id="why" name="why">
              <option value="-1">请选择..</option>
              <option value="1"><?php echo $arr_why[1]?></option>
              <option value="2"><?php echo $arr_why[2]?></option>
              <option value="4"><?php echo $arr_why[4]?></option>
            </select>
	          <input type="submit" value="-查询-" class="input_k"/>
	     </form> 
	   </td></tr>
	 </table>
	<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr class="head_1">
	<td>编号</td>
	<td>用户ID</td>
	<td>用户昵称</td>
	<td>视频号</td>
	<td>兑换方式</td>
	<td><?php echo $global_config_data["money_name2"]?></td>
	<td><?php echo $global_config_data["money_name"]?></td>
	<td>游戏币</td>
	<td>兑换日期</td>
	</tr>
<?php 
foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["id"]?></td>
		<td><?php echo $v["userid"]?></td>
		<td><?php echo $v["nickname"]?></td>
		<td><?php echo $v["usernumber"]?></td>
		<td><?php echo $arr_why[$v["why"]]?></td>
		<td><?php echo $v["point"]?></td>
		<td><?php echo $v["balance"]?></td>
		<td><?php echo $v["gamemoney"]?></td>
		<td><?php echo date("Y-m-d H:i:s",$v["addtime"])?></td>
		</tr>
<?php endforeach;?>
	<tr class="b"><td colspan="15">
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
</table>
<?php if($msg):?>
<script>alert("<?php echo $msg?>");</script>
<?php endif;?>
</body>
</html><?php include('../../include/footer.inc.php');?>