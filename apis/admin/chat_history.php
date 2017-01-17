<?php 
include('head.php');
$where = null;
if($_GET["roomnumber"]){
	$where .= " and c.roomnumber=".((int)$_GET["roomnumber"]);
}
if($_GET["type"]){
	$where .= " and c.type=".((int)$_GET["type"]);
}
if($_GET["nickname"]){
	$where .= " and u.nickname='".($_GET["nickname"])."'";
}
if($_GET["begin"]){
	$where .= " and c.`when`>=".strtotime($_GET["begin"]);
}
if($_GET["end"]){
	$where .= " and c.`when`<=".strtotime($_GET["end"]." 23:59:59");
}
$page = max((int) $_GET['p'], 1);
$limit = 15;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";

$sql = "select c.*,u.nickname from chat_history c LEFT JOIN user u on u.userid=c.fromuserid where 1=1 {$where} ORDER BY c.`when` desc {$where_limit}";
$sql_count = "select count(*) from chat_history c LEFT JOIN user u on u.userid=c.fromuserid where 1=1 {$where}";

$total = (int) $db->GetOne($sql_count);
$multi = multi($total, $page, $limit);
$p = new page($page, $multi["pages"], $limit);
$page_count = $p->return_array();

$data = $db->GetArray($sql);
$type_arr = array("0"=>"公聊","1"=>"公告区域","2"=>"私聊");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script src="/js/face.js" type="text/javascript"></script>
<script src="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.css">
<title>聊天记录</title>
<script>
var cdn_domain="<?php echo $page_var['cdn_domain']?>";
var money_name="<?php echo $page_var['money_name']?>";
var money_name2="<?php echo $page_var['money_name2']?>";

$(function(){
	$("#type option[value=<?php echo $_GET["type"]?>]").attr("selected","selected");
	$('.infotxt').datepicker({ dateFormat:'yy-mm-dd',changeMonth:true,changeYear: true});
	$("td.chat_value").each(function(i){
	   $(this).html(faceReplaceImg($(this).html()));
	});
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
	<tr><td class="head" colspan="6"><b>聊天记录列表</b></td></tr>
	<tr><td colspan="6">
	     <form action="?">
	           开始日期:<input type="text" class="infotxt" style="width:74px;" name="begin" value="<?php echo $_GET["begin"]?>">
	   -结束日期:<input type="text" class="infotxt" style="width:74px;" name="end" value="<?php echo $_GET["end"]?>">
	           房间号:<input type="text" name="roomnumber" id="roomnumber" value="<?php echo $_GET["roomnumber"]?>">
	           发言人昵称:<input type="text" name="nickname" id="nickname" value="<?php echo $_GET["nickname"]?>">
			   聊天类型<select id="type" name="type">
	              <option value="">请选择</option>
	              <option value="0">公聊</option>
	              <option value="2">私聊</option>
	            </select>
	                <input type="submit" value="-查询-" class="input_k">
	     </form> 
	   </td></tr>
	<tr class="head_1">
	<td width="80">房间号</td>
	<td width="150">时间</td>
	<td width="80">聊天类型</td>
	<td width="150">发言人昵称</td>
	<td width="150">对谁说</td>
	<td>内容</td>
	</tr>
<?php foreach ($data as $v):
if(empty($v["touserid"])){
	$to = "所有人";
}else{
	$to = $db->CacheGetOne(120,"select nickname from user where userid='{$v["touserid"]}'");
}
?>
		<tr class="b">
		<td><?php echo $v["roomnumber"]?></td>
		<td><?php echo date("Y-m-d H:i:s",$v["when"])?></td>
		<td><?php echo $type_arr[$v["type"]]?></td>
		<td><?php echo $v["nickname"]==""?"游客":$v["nickname"];?></td>
		<td><?php echo $to?></td>
		<td class="chat_value"><?php echo $v["v"]?></td>
		</tr>
<?php endforeach;?>
	<tr class="b"><td colspan="6">
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
<?php if($msg):?>
<script>alert("<?php echo $msg?>");</script>
<?php endif;?>
</body>
</html>
<?php include('../../include/footer.inc.php');?>