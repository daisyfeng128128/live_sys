<?php 
include('head.php');
//$db->debug = true;
$msg = $_GET["msg"];
//当前充值情况
for($i=0;$i<24;$i++){
	$lastupdate = strtotime(date("Y-m-d $i:0:0"));
	$money = (int)$db->GetOne("select sum(money) from `orders` where `status`=1 and lastupdate>=$lastupdate and lastupdate<".($lastupdate+3600-1));
	$xmlstr1 .= "<category Name='$lastupdate时' />";
	$xmlstr2 .="<set value='$money' />";
}

if($_GET["begin"]){
	$begin = strtotime($_GET["begin"]);
}else {
	$begin = time()-15*86400;
}
if($_GET["end"]){
	$end = strtotime($_GET["end"])+86400;
}else {
	$end = strtotime(date("Y-m-d"))+86400;
}
//$db->debug = true;
$data_tmp = $db->GetArray("select * from `orders` as b where `status`=1 and b.`lastupdate`>=$begin and b.`lastupdate`<=$end");
$data = array();
foreach($data_tmp as $value){
	$day = strtotime(date("Y-m-d",$value["lastupdate"]));
	$data[$day][$value["paychannel"]] += $value["money"];
}

$tmp_pay = $db->GetArray("select * from global_config where `k` like 'pay_shiji-%'");
$pay_shiji = array();
foreach($tmp_pay as $value){
	$tmp = explode("-",$value["k"]);
	$pay_shiji[$tmp[1]] = $value["v"];
}
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
	$("#paychannel option[value=<?php echo $_GET["paychannel"]?>]").attr("selected","selected");
	$('.infotxt').datepicker({ dateFormat:'yy-mm-dd',changeMonth:true,changeYear: true});
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
<br />
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
    <tr><td class="head" colspan="9"><b>充值统计</b></td></tr>
	<tr><td colspan="9" align="right">
	     <form action="">
	     <form action="?">
			   日期:<input type="text" class="infotxt" name="begin" value="<?php echo $_GET["begin"]?>" style="width:64px;"/>
				到:<input type="text" class="infotxt" name="end" value="<?php echo $_GET["end"]?>" style="width:64px;"/>
	            </select>
	                <input type="submit" value="-查询-" class="input_k">
	     </form> 
	     </form> 
	   </td></tr>
	 </table>
<div id="recharge_div">
	<script type="text/javascript">
	var tempmaxy = 0;
	var maxyvalue = 0;
	var xmlstr1 ="<categories><?php echo $xmlstr1;?>";
	var xmlstr2 ="<dataset color='#A9C7A9' anchorBorderColor='' anchorRadius='4'><?php echo $xmlstr2;?>";
	</script>
	<script language="javascript" src="../javascript/charts/FusionCharts.js"></script>
	<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr class="b">
	<td align="center" valign="top">
	<div id="ChartImg" style="width:1100px;"></div>
	</td></tr>
	</table>
	<script type="text/javascript">
		xmlstr1 +="</categories>";
		xmlstr2 +="</dataset>";
		var XMLS="<graph caption='今天24时充值概况' numdivlines='4' baseFontSize='12' lineThickness='2' showValues='1' numVDivLines='10' formatNumberScale='0' rotateNames='1' decimalPrecision='0' anchorRadius='2' anchorBgAlpha='0' numberSuffix='元' divLineAlpha='30' showAlternateHGridColor='1' yAxisMinValue='0' yAxisMaxValue='"+maxyvalue+"' shadowAlpha='50' >";
		XMLS += xmlstr1;
		XMLS += xmlstr2;
		XMLS += "</graph>";
		var chartDay = new FusionCharts("../javascript/charts/FCF_MSLine.swf", "ChId1", "1150", "350");
		chartDay.setDataXML(XMLS);
		chartDay.render("ChartImg");
	</script>
</div>
	<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr><td colspan="9" ><b><?php echo date("Y-m-d",$begin)?>~<?php echo date("Y-m-d",$end)?></b></td></tr>
	<tr class="head_1">
	<td style="width:70px;">日期</td>
<?php foreach($global_order_paychannel as $key=>$value):?>
<td><?php echo $value?></td>
<?php endforeach;?>
	<td>总计(元)</td>
	<td>&nbsp;</td>
	</tr>
<?php 
$sum_day = array();
$tmp_end = $end-86400;
for($i=$tmp_end;$i>=$begin;$i=$i-86400){?>
		<tr class="b">
		<td><?php echo date("Y-m-d",$i)?></td>
	<?php 
	$sum_row = 0;
	foreach($global_order_paychannel as $key=>$value): 
	$sum_row+=$data[$i][$key];
	$sum_day[$key] += $data[$i][$key];
	?>
		<td><?php echo $data[$i][$key]?></td>
	<?php endforeach;?>
		<td><?php echo $sum_row?></td>
		<td><a href="orders_list.php?begin=<?php echo date("Y-m-d",$i)?>&end=<?php echo date("Y-m-d",$i)?>&status=1">详细</a></td>
		</tr>
<?php }?>
	
	<tr class="head_1">
	<td>小计</td>
	<?php 
	$sum=0;
	foreach($global_order_paychannel as $key=>$value):$sum+=$sum_day[$key];?>
		<td><?php echo $sum_day[$key]?></td>
	<?php endforeach;?>
	<td><?php echo $sum?></td>
	<td>/</td>
	</tr>
	
	<tr class="head_1">
	<td><a href="global_config_pay.php" target="_blank" title="点击设置实际到帐比例">实际到帐</a></td>
	<?php 
	$sum=0;
	foreach($global_order_paychannel as $key=>$value):$sum+=$sum_day[$key]*$pay_shiji[$key];?>
		<td><?php echo $sum_day[$key]*$pay_shiji[$key]?></td>
	<?php endforeach;?>
	<td><?php echo $sum?></td>
	<td>/</td>
	</tr>
</table>

<?php if($msg):?>
<script>alert("<?php echo $msg?>");</script>
<?php endif;?>
</body>
</html>
<?php include($app_path.'include/footer.inc.php');?>