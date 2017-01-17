<?php 
include('head.php');
$msg = $_GET["msg"];
//$db->debug = true;
if($_GET["action"]=="dealresult"){
	$id = (int)$_POST["id"];
	$db->Execute("UPDATE drawcash SET dealresult='".(int)$_POST["value"]."' WHERE id='".(int)$_POST["id"]."' limit 1");
	operational_log(4,"修改提现状态id,{$_POST["id"]}",$_REQUEST);
	include('../../include/footer.inc.php');
	exit;
}
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
if($_GET["userid"]){
	$where .= " and u.userid='".((int)$_GET["userid"])."'";
}
if($_GET["truename"]){
	$where .= " and p.truename='".$_GET["truename"]."'";
}
if(isset($_GET["dealresult"]) && $_GET["dealresult"]!="-1"){
	$where .= " and a.dealresult='".((int)$_GET["dealresult"])."'";
}
$page = max((int) $_GET['p'], 1);
$limit = 15;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";

$sql = "select a.*,u.nickname,u.usernumber,u.point,p.truename,p.banknumber,p.banktype,p.bankname from user u,drawcash a,bu_user_anchors p where p.userid=u.userid and u.userid=a.userid {$where} order by a.id desc {$where_limit}";
$sql_count = "select count(*) from user u,drawcash a,bu_user_anchors p where p.userid=u.userid and  u.userid=a.userid {$where}";

$total = (int) $db->GetOne($sql_count);
$multi = multi($total, $page, $limit);
$p = new page($page, $multi["pages"], $limit);
$page_count = $p->return_array();

$data = $db->GetArray($sql);

$arr_status = array("0"=>"<span class='gray'>待审核</span>","1"=>"<span class='green'>已审核</span>","2"=>"<span class='red'>审核未通过</span>","3"=>"<span class='blue'>待支付</span>","4"=>"<span class='maroon'>已支付</span>","5"=>"<span class=''>作废</span>");
//总计
$drawcash_sum = $db->GetRow("select sum(money) as money from user u,drawcash a,bu_user_anchors p where p.userid=u.userid and u.userid=a.userid {$where}");
$allBankInfo = getAllBankInfo();
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>提现记录</title>
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
	$("#dealresult option[value=<?php echo $_GET["dealresult"]?>]").attr("selected","selected");
});
function dealresult_select(id){
	var value=$("#dealresult_"+id+" select").val();
	$.post("?action=dealresult",{id:id,value:value}, function(data){
		//$("#dealresult_"+id+" .savestate").html("保存成功");
		$("#dealresult_"+id+" .savestate").html($("#dealresult_"+id+" select option[value="+value+"]").html());
		$("#dealresult_"+id+" select").remove();
	});
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
    <tr><td class="head" colspan="15"><b>提现记录列表</b>---列表总计，<?php echo $drawcash_sum["money"];?>元</td></tr>
	<tr><td colspan="15">
	     <form action="">
			提现日期:<input type="text" class="infotxt" name="begin" value="<?php echo $_GET["begin"]?>" style="width:64px;"/>
				到:<input type="text" class="infotxt" name="end" value="<?php echo $_GET["end"]?>" style="width:64px;"/>
	          编号<input type="text" name="id" id="id" value="<?php echo $_GET["id"]?>" style="width: 40px;"/> 
	          用户ID<input type="text" name="userid" id="userid" value="<?php echo $_GET["userid"]?>" style="width: 40px;"/> 
	          用户靓号<input type="text" name="usernumber" id="usernumber" value="<?php echo $_GET["usernumber"]?>" style="width: 80px;"/>
			  姓名<input type="text" name="truename" id="truename" value="<?php echo $_GET["truename"]?>" style="width: 74px;"/> 
	           状态<select id="dealresult" name="dealresult">
              <option value="-1">请选择..</option>
              <option value="0"><?php echo $arr_status[0]?></option>
              <option value="1"><?php echo $arr_status[1]?></option>
              <option value="2"><?php echo $arr_status[2]?></option>
              <option value="3"><?php echo $arr_status[3]?></option>
              <option value="4"><?php echo $arr_status[4]?></option>
              <option value="5"><?php echo $arr_status[5]?></option>
            </select>
	          <input type="submit" value="-查询-" class="input_k"/>
	     </form> 
	   </td></tr>
	 </table>
	<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr class="head_1">
	<td>编号</td>
	<td>申请时间</td>
	<td>用户ID</td>
	<td>视频号</td>
	<td>姓名</td>
	<td>开户银行</td>
	<td>开户姓名</td>
	<td>银行卡号</td>
	<td>申请提现金额(元)</td>
	<td>状态</td>
	</tr>
<?php 
foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["id"]?></td>
		<td><?php echo date("Y-m-d H:i:s",$v["addtime"])?></td>
		<td><?php echo $v["userid"]?></td>
		<td><?php echo $v["usernumber"]?></td>
		<td><?php echo $v["truename"]?></td>
		<td><?php echo $allBankInfo[$v["banktype"]]?></td>
		<td><?php echo $v["bankname"]?></td>
		<td><?php echo $v["banknumber"]?></td>
		<td><?php echo $v["money"]?></td>
		<td id="dealresult_<?php echo $v["id"]?>">
			<select class="dealresult_select" onchange="dealresult_select(<?php echo $v["id"]?>);">
			  <option value="0" style="color: gray;"><?php echo $arr_status[0]?></option>
			  <option value="1" style="color: green;"><?php echo $arr_status[1]?></option>
			  <option value="2" style="color: red;"><?php echo $arr_status[2]?></option>
			  <option value="3" style="color: blue;"><?php echo $arr_status[3]?></option>
			  <option value="4" style="color: maroon;"><?php echo $arr_status[4]?></option>
			  <option value="5" ><?php echo $arr_status[5]?></option>
			</select>
			<span class="red savestate"></span>
		<?php $select_str .= '$("#dealresult_'.$v["id"].' select option[value='.$v["dealresult"].']").attr("selected","selected");';?></td>
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
<script>
$(function(){
<?php echo $select_str;?>
});
</script>
<?php if($msg):?>
<script>alert("<?php echo $msg?>");</script>
<?php endif;?>
</body>
</html><?php include('../../include/footer.inc.php');?>