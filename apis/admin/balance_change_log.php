<?php 
include('head.php');
//$db->debug = true;
$msg = $_GET["msg"];
if($_GET["id"]){
	$where .= " and b.id=".((int)$_GET["id"]);
}
if($_GET["userid"]){
	$where .= " and b.userid=".((int)$_GET["userid"]);
}
if($_GET["touserid"]){
	$where .= " and b.touserid=".((int)$_GET["touserid"]);
}
if($_GET["giftid"]){
	$where .= " and b.giftid=".((int)$_GET["giftid"]);
}
if($_GET["why"]!=""){
	$where .= " and b.`why`=".((int)$_GET["why"]);
}
if($_GET["begin"]){
	$where .= " and b.`when`>=".strtotime($_GET["begin"]);
}
if($_GET["end"]){
	$where .= " and b.`when`<=".(strtotime($_GET["end"])+86400-1);
}
$page = max((int) $_GET['p'], 1);
$limit = 15;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";

$sql = "select * from balance_change_log as b where 1=1 {$where} order by id desc {$where_limit}";
$sql_count = "select count(*) from balance_change_log as b where 1=1 {$where}";

$total = (int) $db->GetOne($sql_count);
$multi = multi($total, $page, $limit);
$p = new page($page, $multi["pages"], $limit);
$page_count = $p->return_array();

$data = $db->GetArray($sql);
$userwhyArr = array("0"=>"充值","1"=>"消费","2"=>"中奖","3"=>("抽奖等赠送".$page_var['money_name']),"4"=>"抽奖等赠送礼物如座驾","5"=>"红包","6"=>($page_var['money_name2']."提现"),"7"=>($page_var['money_name2']."兑换".$page_var['money_name']),"8"=>("游戏币兑换".$page_var['money_name']),"9"=>($page_var['money_name']."兑换游戏币"),"10"=>"完成任务","11"=>"后台清理用户");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script src="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.css">
<title>充值/消费历史记录</title>
<script>
$(function(){
	$("#why option[value=<?php echo $_GET["why"]?>]").attr("selected","selected");
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
<table width="99%" align="center" cellspacing="1" cellpadding="3" class="i_table">
    <tbody>
	<tr><td class="head" colspan="18"><b>充值/消费历史记录</b></td></tr>
	<tr><td colspan="18">
	     <form action="?">
	           编号:<input type="text" name="id" id="id" value="<?php echo $_GET["id"]?>" style="width: 60px;"/>
			   日期:<input type="text" class="infotxt" name="begin" value="<?php echo $_GET["begin"]?>" style="width:64px;"/>
				到:<input type="text" class="infotxt" name="end" value="<?php echo $_GET["end"]?>" style="width:64px;"/>
	           送礼人Userid:<input type="text" name="userid" id="userid" value="<?php echo $_GET["userid"]?>" style="width: 40px;"/>
	           收礼人Userid:<input type="text" name="touserid" id="touserid" value="<?php echo $_GET["touserid"]?>" style="width: 40px;"/>
	           礼物ID:<input type="text" name="giftid" id="giftid" value="<?php echo $_GET["giftid"]?>" style="width: 40px;"/>
	            变动原因<select id="why" name="why">
	              <option value="">请选择..</option>
<?php foreach($userwhyArr as $key=>$value):?>
	              <option value="<?php echo $key?>"><?php echo $value?></option>
<?php endforeach;?>
	            </select>
	                <input type="submit" value="-查询-" class="input_k">
	     </form> 
	   </td></tr>
	<tr class="head_1">
	<td>编号</td>
	<td>送礼/消费人Userid</td>
	<td>送礼人昵称</td>
	<td>收礼人Userid</td>
	<td>收礼人昵称</td>
	<td>账户变动时间</td>
	<td>为何变动</td>
	<td>礼物ID</td>
	<td>礼物</td>
	<td>礼物数量</td>
	<td>变动数值</td>
	<td title="送礼显示的是扣完费后用户的<?php echo $page_var['money_name']?>余额;充值显示的是用户得到多少<?php echo $page_var['money_name']?>;">账户余额</td>
	<td>代理ID</td>
	</tr>
		<?php foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["id"]?></td>
		<td><?php echo $v["userid"]?></td>
		<td><?php echo $db->CacheGetOne(120,"select nickname from user where userid='{$v["userid"]}'");?></td>
		<td><?php echo $v["touserid"]?></td>
		<td><?php echo $db->CacheGetOne(120,"select nickname from user where userid='{$v["touserid"]}'");?></td>
		<td><?php echo date("Y-m-d H:i:s",$v["when"])?></td>
		<td><?php echo $userwhyArr[$v["why"]]?></td>
		<td><?php echo $v["giftid"]?></td>
		<td><?php echo $db->CacheGetOne(120,"select giftname from gift where giftid='{$v["giftid"]}'");?></td>
		<td><?php echo $v["giftnum"]?></td>
		<td><?php echo $v["money"]?></td>
		<td><?php echo $v["balance"]?></td>
		<td><?php echo $v["agentid"]?></td>
		</tr>
		
	</tr>
	<?php endforeach;?>
	<tr class="b"><td colspan="20">
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