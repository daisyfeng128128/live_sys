<?php 
include('head.php');
include('../../include/level.func.php');
$msg = $_GET["msg"];
//$db->debug = true;
if($_GET["action"]=="budan"){
	$orderid = (int)$_GET["id"];
	$out_trade_no = sprintf("%s%05d",date(Ymd),$orderid);
	$order = $db->GetRow("select * from `orders` where id='{$orderid}'");
	$r6_Order=$out_trade_no;
	$r3_Amt=$order["money"];
	$r2_TrxId=$_GET["sid"];
	payOrdersDeal($r6_Order,$r3_Amt,$r2_TrxId);
	$optuserid = $db->GetOne("select userid from `orders` where id='{$orderid}'");
	operational_log(4,"补单orderid,{$orderid}",$_REQUEST,$optuserid);
	$msg = "操作成功";
}
$where = "";
if($_GET["begin"]){
	$where .= " and a.lastupdate>=".strtotime($_GET["begin"]);
}
if($_GET["end"]){
	$where .= " and a.lastupdate<=".strtotime($_GET["end"]." 23:59:59");
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
if($_GET["chooseuserid"]!=""){
	$where .= " and a.`chooseuserid`=".((int)$_GET["chooseuserid"]);
}
if($_GET["paychannel"]!=""){
	$where .= " and a.`paychannel`=".((int)$_GET["paychannel"]);
}
if(isset($_GET["status"]) && $_GET["status"]!="-1"){
	$where .= " and a.status='".((int)$_GET["status"])."'";
}
$page = max((int) $_GET['p'], 1);
$limit = 15;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";

$sql = "select a.*,u.nickname,u.usernumber,u.totalpoint from user u,orders a where u.userid=a.userid {$where} order by a.id desc {$where_limit}";
$sql_count = "select count(*) from user u,orders a where u.userid=a.userid {$where}";

$total = (int) $db->GetOne($sql_count);
$multi = multi($total, $page, $limit);
$p = new page($page, $multi["pages"], $limit);
$page_count = $p->return_array();

$data = $db->GetArray($sql);

$arr_status = array("1"=>"<span class='green'>交易成功</span>","0"=>"<span class='red'>未成功</span>");
//总计
$orders_sum = $db->GetRow("select sum(money) as money,sum(balanceadd) as balanceadd from user u,orders a where u.userid=a.userid {$where}");
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>充值记录</title>
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
	$("#paychannel option[value=<?php echo $_GET["paychannel"]?>]").attr("selected","selected");
	$("#status option[value=<?php echo $_GET["status"]?>]").attr("selected","selected");
});
function budan(id){
	var txt = window.prompt("补单原因","");
    if(txt){
		if(txt==""){
			alert("请输入补单原因");
		}else{
			window.location.href=("?action=budan&id="+id+"&sid="+txt);
		}
	}
}
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
    <tr><td class="head" colspan="15"><b>充值记录列表</b>---列表总计，<?php echo $orders_sum["money"];?>元，<?php echo $orders_sum["balanceadd"];?><?php echo $global_config_data["money_name"];?></td></tr>
	<tr><td colspan="15">
	     <form action="">
			充值日期:<input type="text" class="infotxt" name="begin" value="<?php echo $_GET["begin"]?>" style="width:64px;"/>
				到:<input type="text" class="infotxt" name="end" value="<?php echo $_GET["end"]?>" style="width:64px;"/>
	          订单编号<input type="text" name="id" id="id" value="<?php echo $_GET["id"]?>" style="width: 40px;"/> 
	          用户ID<input type="text" name="userid" id="userid" value="<?php echo $_GET["userid"]?>" style="width: 40px;"/> 
	          用户昵称<input type="text" name="nickname" id="userid" value="<?php echo $_GET["nickname"]?>" style="width: 74px;"/> 
	          用户靓号<input type="text" name="usernumber" id="usernumber" value="<?php echo $_GET["usernumber"]?>" style="width: 80px;"/> 
	          给谁充值<input type="text" name="chooseuserid" id="chooseuserid" value="<?php echo $_GET["chooseuserid"]?>" style="width: 80px;"/> 
				充值渠道<select id="paychannel" name="paychannel">
	              <option value="">请选择..</option>
<?php foreach($global_order_paychannel as $key=>$value):?>
	              <option value="<?php echo $key?>"><?php echo $value?></option>
<?php endforeach;?>
	            </select>
	           状态<select id="status" name="status">
              <option value="-1">请选择..</option>
              <option value="1">成功</option>
              <option value="0">未成功</option>
            </select>
	          <input type="submit" value="-查询-" class="input_k"/>
	     </form> 
	   </td></tr>
	 </table>
	<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr class="head_1">
	<td>订单编号</td>
	<td>订单号</td>
	<td>用户ID</td>
	<td>用户昵称</td>
	<td>视频号</td>
	<td>充值金额(元)</td>
	<td><?php echo $global_config_data["money_name"]?>数目(个)</td>
	<td>状态</td>
	<td>充值渠道</td>
	<td>交易流水号/备注</td>
	<td>代理ID</td>
	<td>给谁充值userid(0表示自己)</td>
	<td>充值日期</td>
	<td title="补单是对充值未成功的订单修改为成功，并给用户加钱">操作</td>
	</tr>
<?php 
foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["id"]?></td>
		<td><?php echo $orderid=sprintf("%s%05d",$v['adddate'],$v['id']);?></td>
		<td><?php echo $v["userid"]?></td>
		<td><?php echo $v["nickname"]?></td>
		<td><?php echo $v["usernumber"]?></td>
		<td><?php echo $v["money"]?></td>
		<td><?php echo $v["balanceadd"]?></td>
		<td><?php echo $arr_status[$v["status"]]?></td>
		<td><?php echo $global_order_paychannel[$v["paychannel"]]?></td>
		<td><?php echo $v["sid"]?></td>
		<td><?php echo $v["agentid"]?></td>
		<td><?php echo $v["chooseuserid"]?></td>
		<td><?php echo date("Y-m-d H:i:s",$v["lastupdate"])?></td>
		<td><?php if($v["status"]==0){?>
			<a href="javascript:;" onClick="budan(<?php echo $v["id"]?>)">补单</a>
		<?php }?></td>
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