<script src="/js/lib/jquery.cal.js"></script>
<!--main-->
<div class="personbody">
<div class="person_left">
<?php $current_page="agent";
include_once('./include/personal_tpl/person_menu.html');
?>

</div>
<div class="person_right">
<div class="person_tab">
<ul id="tags">
<li class="selectTag"><a href="javascript:void(0)" onclick="selectTag('tagContent0',this)" id="tagContent0Btn">主播业绩</a></li>
<li><a href="javascript:void(0)" onclick="selectTag('tagContent1',this)" id="tagContent1Btn">充值业绩</a></li>
</ul>
</div>
<div id="tagContent">
<!--收到的礼物-->
<div class="tagContent selectTag" id="tagContent0">
<div class="basiccont">
<form method="get">
<input type="hidden" name="ptype" value="agent" />
<input type="hidden" name="t" value="tagContent0" />
<ul>
<li><em>按查询时间段选择: </em><em>从 
    <input type="text" name="recvstartdate" class="infotxt" value="<?php echo $_GET['recvstartdate']?>"/> 到 <input type="text" name="recvenddate" class="infotxt" value="<?php echo $_GET['recvenddate']?>"/></em></li>
<li><em>按主播查询:<input type="text" name="recvusernumber" value="<?php echo $_GET['recvusernumber']?$_GET['recvusernumber']:"输入视频号";?>" class="searchnc" onBlur="if (value ==''){value='输入视频号'}" onfocus="if (value =='输入视频号'){value =''}"/></em></li>
<li><input type="submit" class="searchsure" value=""/></li>
</ul>
</form>
<?php if($_GET['recvstartdate']!="" && $_GET['recvenddate']!=""){
if($_GET['recvusernumber']!="" && $_GET['recvusernumber']!="输入视频号"){
	$unumber=(int)$_GET['recvusernumber'];
	$useridquery="and b.usernumber='$unumber'";
}
?>
<table cellpadding="0" cellspacing="0" border="0" width="100%" class="tablelist">
<thead>
<tr><td colspan="8" class="searchtime"><?php echo $_GET['recvstartdate']?> 至 <?php echo $_GET['recvenddate']?></td></tr>
<tr><td>主播昵称/主播号</td><td>直播天数</td><td>直播时长</td><td>销售充值(<?php echo $page_var['money_name'];?>)</td><td>底薪</td><td>业绩</td><td>主播提成</td><td>您的提成</td></tr>
</thead>
<tbody>
<?php $starttime=strtotime($_GET['recvstartdate']." 00:00:00");
$endtime=strtotime($_GET['recvenddate']." 23:59:59");
$rs=$db->Execute("SELECT sum(a.money) as money,sum(a.point) as point,b.userid,b.nickname,b.usernumber FROM `user` b ,`balance_change_log` a WHERE b.agentid='{$user['userid']}' and  a.touserid=b.userid and a.why='1' and (a.`when`>'$starttime' and a.`when`<'$endtime') $useridquery group by touserid");
while($arr=$rs->FetchRow()){
	$actor_sale[$arr[userid]]=$arr;
}
$rs=$db->Execute("select a.*,b.* from bu_user_anchors a,user b where a.userid=b.userid and b.agentid='{$user['userid']}'$useridquery");
$totalshowcomition=0;
while($arr=$rs->FetchRow()){
	$arr=safe_output($arr);
	$totalshowcomition+=($actor_sale[$arr['userid']]['money']);
	
	$day = live_shows_valid($arr["userid"],$_GET['recvstartdate'],$_GET['recvenddate']);
	$sum_day += $day;
	$time = get_showtime($arr["userid"],$_GET['recvstartdate'],$_GET['recvenddate']);
	$sum_time += $day;
	
	$yueji = ($actor_sale[$arr['userid']]['money']*-1);
	$sum_yueji += $yueji;
	
	$ti = (int)($actor_sale[$arr['userid']]['point']);
	$sum_ti += $ti;
	$order = agent_order_money($arr['userid'],$_GET['recvstartdate'],$_GET['recvenddate']);
	$sum_order += $order;
?>
<tr>
<td><?php echo $arr['nickname']?>/<?php echo $arr['usernumber']?></td>
<td><?php echo $day?></td>
<td><?php echo interval_time($time)?></td>
<td><?php echo $order;?></td>
<td><?php echo $arr['basicsalary']?></td>
<td><?php echo $yueji?><?php echo $page_var['money_name']?></td>
<td><?php echo $ti?><?php echo $page_var['money_name2']?></td>
<td>￥<?php echo floor((($actor_sale[$arr['userid']]['money']*-1)*$agentinfo['consumerate'])/RMB_XNB)?></td>
</tr>
<?php }
?>
<tr>
<td>合计</td>
<td>--</td>
<td>--</td>
<td><?php echo $sum_order?></td>
<td>－－</td>
<td><?php echo $sum_yueji?><?php echo $page_var['money_name']?></td>
<td><?php echo $sum_ti?><?php echo $page_var['money_name2']?></td>
<td>￥<?php echo floor($totalshowcomition*-1*$agentinfo['consumerate']/RMB_XNB)?></td>
</tr>
</tbody>
</table>
<?php }
else{
	echo "请选择开始时间和结束时间";
}
?>
</div>
</div>
<!--收到的礼物end-->
<!--送出的礼物-->
<div  id="tagContent1" class="tagContent">
<div class="basiccont">
<form method="get">
<input type="hidden" name="ptype" value="agent" />
<input type="hidden" name="t" value="tagContent1" />
<ul>
<li><em>按查询时间段选择: </em><em>从 
<input type="text" name="paystartdate"  class="infotxt" value="<?php echo $_GET['paystartdate']?>"/> 到 <input type="text" name="payenddate" class="infotxt" value="<?php echo $_GET['payenddate']?>"/></em></li>
<li><input type="submit" class="searchsure" value="" /></li>
</ul>
</form>
<?php if($_GET['paystartdate']!="" && $_GET['payenddate']!=""){
?>
<table cellpadding="0" cellspacing="0" border="0" width="100%" class="tablelist">
<thead>
<tr><td colspan="6" class="searchtime"><?php echo $_GET['paystartdate']?> 至 <?php echo $_GET['payenddate']?></td></tr>
<tr><td>昵称</td><td>充值方式</td><td>充值金额</td><td>获取<?php echo $page_var['money_name']?></td><td>时间</td><td>您的提成</td></tr>
</thead>
<tbody>
<?php $starttime=strtotime($_GET['paystartdate']." 00:00:00");
$endtime=strtotime($_GET['payenddate']." 23:59:59");
$rs=$db->Execute("SELECT a.*,b.nickname from orders a,user b WHERE a.userid=b.userid and a.agentid='{$user['userid']}' and  a.`lastupdate`>'$starttime' and a.`lastupdate`<'$endtime' and a.status=1 
order by a.`lastupdate` desc");
$paychannel=array('','网银','支付宝','骏网一卡通','神州行充值卡','联通充值卡');
while($arr=$rs->FetchRow()){
	$arr=safe_output($arr);
	$totalcomition+=$arr['money']*$agentinfo['rechargerate'];
?>
<tr>
<td><?php echo $arr['nickname']?></td>
<td><?php echo $paychannel[$arr['paychannel']]?></td>
<td>￥<?php echo $arr['money']?></td>
<td><?php echo $arr['balanceadd']?></td>
<td><?php echo date('Y-m-d G:i:s',$arr['lastupdate'])?></td>
<td>￥<?php echo $arr['money']*$agentinfo['rechargerate']?></td>
</tr>
<?php }
?>
<tr>
<td>合计</td>
<td>－－</td>
<td>－－</td>
<td>－－</td>
<td>－－</td>
<td>￥<?php echo $totalcomition?></td>
</tr>
</tbody>
</table>
<?php }
else{
	echo "请选择开始时间和结束时间";
}
?>
</div>
</div>
<!--送出的礼物end-->
<!--充值记录-->
<div  id="tagContent2" class="tagContent">
<div class="basiccont">
<ul>
<li><em>查询时间段选择: </em><em>从 <input type="text" name="paystartdate" class="infotxt"/> 到 <input type="text" name="payenddate" class="infotxt"/></em></li>
<li><input type="submit" class="searchsure" value="" /></li>
</ul>
<table cellpadding="0" cellspacing="0" border="0" width="100%" class="tablelist">
<thead>
<tr><td colspan="6" class="searchtime">2012-06-19 至 2012-07-18</td></tr>
<tr><td>充值订单号</td><td>充值方式</td><td>充值金额</td><td>获得<?php echo $page_var['money_name']?></td><td>状态</td><td>时间</td></tr>
</thead>
<tbody>
<tr>
<td>12345</td>
<td>网银</td>
<td>400</td>
<td>40000</td>
<td>？</td>
<td>2012-12-12</td>
</tr>
<tr>
<td>12345</td>
<td>网银</td>
<td>400</td>
<td>40000</td>
<td>？</td>
<td>2012-12-12</td>
</tr>
<tr>
<td>12345</td>
<td>网银</td>
<td>400</td>
<td>40000</td>
<td>？</td>
<td>2012-12-12</td>
</tr>
</tbody>
<tfoot><tr>
<td>总计</td>
<td>----</td>
<td>222222</td>
<td>21000</td>
<td>----</td>
<td>----</td>
</tr></tfoot>
</table>
</div>
</div>
<!--充值记录end-->
<!--消费记录-->
<div  id="tagContent3" class="tagContent">
<div class="basiccont">
<ul>
<li><em>查询时间段选择: </em><em>从 <input type="text"  class="infotxt"/> 到 <input type="text"  class="infotxt"/></em></li>
<li><input type="submit" class="searchsure" value="" /></li>
</ul>
<table cellpadding="0" cellspacing="0" border="0" width="100%" class="tablelist">
<thead>
<tr><td colspan="5" class="searchtime">2012-06-19 至 2012-07-18</td></tr>
<tr><td>消费方式</td><td>物品</td><td>数量</td><td>支付<?php echo $page_var['money_name']?></td><td>时间</td></tr>
</thead>
<tbody>
<tr>
<td>网银</td>
<td>400</td>
<td>40000</td>
<td>？</td>
<td>2012-12-12</td>
</tr>
<tr>
<td>网银</td>
<td>400</td>
<td>40000</td>
<td>？</td>
<td>2012-12-12</td>
</tr>
<tr>
<td>网银</td>
<td>400</td>
<td>40000</td>
<td>？</td>
<td>2012-12-12</td>
</tr>
</tbody>
</table>
</div>
</div>
<!--消费记录end-->
<!--中奖纪录-->
<div  id="tagContent4" class="tagContent">
<div class="basiccont">
<table cellpadding="0" cellspacing="0" border="0" width="100%" class="tablelist">
<thead>
<tr><td>时间</td><td>奖项</td><td>数量</td><td>价值<?php echo $page_var['money_name']?></td></tr>
</thead>
<tbody>
<tr>
<td>2012-12-12</td>
<td>400</td>
<td>40000</td>
<td>1212313</td>
</tr>
<tr>
<td>2012-12-12</td>
<td>400</td>
<td>40000</td>
<td>1212313</td>
</tr>
<tr>
<td>2012-12-12</td>
<td>400</td>
<td>40000</td>
<td>1212313</td>
</tr>
</tbody>
</table>
</div>
</div>
<!--中奖纪录end-->
</div>
</div>
</div>
<!--main-->
<script>
$('.infotxt').simpleDatepicker();
</script>
<?php if($_GET['t']){
echo '<script>$("#'.$_GET['t'].'Btn").click();</script>';
}
?>