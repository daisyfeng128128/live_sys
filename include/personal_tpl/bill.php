<script src="/js/lib/jquery.cal.js"></script>
<!--main-->
<div class="personbody">
<div class="person_left">
<?php 
$current_page="bill";
include_once('./include/personal_tpl/person_menu.html');
?>

</div>
<div class="person_right">
<div class="person_tab">
<ul id="tags">
<li class="selectTag"><a href="javascript:void(0)" onclick="selectTag('tagContent0',this)" id="tagContent0Btn">收到的礼物</a></li>
<li><a href="javascript:void(0)" onclick="selectTag('tagContent1',this)"  id="tagContent1Btn">消费记录</a></li>
<li><a href="javascript:void(0)" onclick="selectTag('tagContent2',this)"  id="tagContent2Btn">充值记录</a></li>
<!--li><a href="javascript:void(0)" onclick="selectTag('tagContent3',this)">消费记录</a></li-->
<!--li><a href="javascript:void(0)" onclick="selectTag('tagContent4',this)">中奖记录</a></li-->
</ul>
</div>
<script>
function validTime(startTime,endTime){
   var arr1 = startTime.split("-");
   var arr2 = endTime.split("-");
   var date1=new Date(parseInt(arr1[0]),parseInt(arr1[1])-1,parseInt(arr1[2]),0,0,0); 
   var date2=new Date(parseInt(arr2[0]),parseInt(arr2[1])-1,parseInt(arr2[2]),0,0,0);
   if(date1.getTime()>date2.getTime()) {
        return false;
   }else{
         return true;
   }
}
</script>
<div id="tagContent">
<!--收到的礼物-->
<div class="tagContent selectTag" id="tagContent0">
<div class="basiccont">
<script>
function check1(){
	if(!validTime($("[name=recvstartdate]").val(),$("[name=recvenddate]").val())){
		alert("结束时间必须大于开始时间");
		return false;
	}
	return true;
}
</script>
<form method="get" onsubmit="return check1();">
<input type="hidden" name="ptype" value="bill" />
<input type="hidden" name="t" value="tagContent0" />
<ul>
<li><em>按查询时间段选择: </em><em>从 
    <input type="text" name="recvstartdate" class="infotxt" value="<?php echo $_GET['recvstartdate']?>"/> 到 <input type="text" name="recvenddate" class="infotxt" value="<?php echo $_GET['recvenddate']?>"/></em></li>
<li><em>按赠送人选择查询:<input type="text" name="recvusernumber" value="输入视频号" class="searchnc" onBlur="if (value ==''){value='输入视频号'}" onfocus="if (value =='输入视频号'){value =''}"/></em></li>
<li><input type="submit" value="确定" class="sure"></li>
</ul>
</form>
<?php 
if($_GET['recvstartdate']!="" && $_GET['recvenddate']!=""){
if($_GET['recvusernumber']!="" && $_GET['recvusernumber']!="输入视频号"){
	$uid=$db->GetOne("select userid from user where usernumber='".((int)$_GET[recvusernumber])."'");
	if($uid){
		$useridquery="and d.userid='$uid'";
	}
}
?>
<table cellpadding="0" cellspacing="0" border="0" width="100%" class="tablelist">
<thead>
<tr><td colspan="5" class="searchtime"><?php echo $_GET['recvstartdate']?> 至 <?php echo $_GET['recvenddate']?></td></tr>
<tr><td>赠送人</td><td>礼物</td><td>数量</td><td>获得<?php echo $page_var['money_name2']?></td><td>时间</td></tr>
</thead>
<tbody>
<?php 
$starttime=strtotime($_GET['recvstartdate']." 00:00:00");
$endtime=strtotime($_GET['recvenddate']." 23:59:59");
$rs=$db->Execute("SELECT a.*,b.giftname,d.nickname 
	FROM balance_change_log a,gift b,user d 
	WHERE a.userid=d.userid and a.giftid=b.giftid and b.giftcateid<>0 and a.touserid='{$user['userid']}' and (`when`>'$starttime' and `when`<'$endtime') $useridquery order by `when` desc");
$totalgetpoint=0;
while($arr=$rs->FetchRow()){
	$arr=safe_output($arr);
	$totalgetpoint+=$arr['point'];
?>
<tr>
<td><?php echo $arr['nickname']?></td>
<td><?php echo $arr['giftname']?></td>
<td><?php echo $arr['giftnum']?></td>
<td><?php echo $arr['point']?></td>
<td><?php echo date('Y-m-d G:i',$arr['when'])?></td>
</tr>
<?php 
}
?>
<tr>
<td>合计</td>
<td>－－</td>
<td>－－</td>
<td><?php echo $totalgetpoint?></td>
<td>－－</td>
</tr>
</tbody>
</table>
<?php 
}
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
<script>
function check2(){
	if(!validTime($("[name=sendstartdate]").val(),$("[name=sendenddate]").val())){
		alert("结束时间必须大于开始时间");
		return false;
	}
	return true;
}
</script>
<form method="get" onsubmit="return check2();">
<input type="hidden" name="ptype" value="bill" />
<input type="hidden" name="t" value="tagContent1" />
<ul>
<li><em>按查询时间段选择: </em><em>从 
    <input type="text" name="sendstartdate"  class="infotxt" value="<?php echo $_GET['sendstartdate']?>"/> 到 <input type="text" name="sendenddate" class="infotxt" value="<?php echo $_GET['sendenddate']?>"/></em></li>
<li><em>按礼物接受人选择查询:<input type="text" name="sendusernumber" value="输入视频号" class="searchnc" onBlur="if (value ==''){value='输入视频号'}" onfocus="if (value =='输入视频号'){value =''}"/></em></li>
<li><input type="submit" value="确定" class="sure"></li>
</ul>
</form>
<?php 
if($_GET['sendstartdate']!="" && $_GET['sendenddate']!=""){
if($_GET['sendusernumber']!="" && $_GET['sendusernumber']!="输入视频号"){
	$uid=$db->GetOne("select userid from user where usernumber='".((int)$_GET[sendusernumber])."'");
	if($uid){
		$useridquery="and d.userid='$uid'";
	}
	else{
		$useridquery="";
	}
}
?>
<table cellpadding="0" cellspacing="0" border="0" width="100%" class="tablelist">
<thead>
<tr><td colspan="5" class="searchtime"><?php echo $_GET['sendstartdate']?> 至 <?php echo $_GET['sendenddate']?></td></tr>
<tr><td>接受人</td><td>消费项目</td><td>数量</td><td>消费<?php echo $page_var['money_name']?></td><td>时间</td></tr>
</thead>
<tbody>
<?php 
$starttime=strtotime($_GET['sendstartdate']." 00:00:00");
$endtime=strtotime($_GET['sendenddate']." 23:59:59");
$rs=$db->Execute("SELECT a.*,b.giftname,b.giftprice,d.nickname ,d.usernumber
	FROM balance_change_log a left join user d on a.touserid=d.userid ,gift b 
	WHERE  a.giftid=b.giftid and a.userid='{$user['userid']}' and (`when`>'$starttime' and `when`<'$endtime') $useridquery order by `when` desc ");
$totalcost=0;
while($arr=$rs->FetchRow()){
	$arr=safe_output($arr);
$totalcost+=$arr['money']*-1;
?>
<tr>
<td>
<?php 
if($arr['nickname']==""){
echo $user['nickname'].'/'.$user['usernumber'];
}
else{
echo $arr['nickname'].'/'.$arr['usernumber'];
}
?>
</td>
<td><?php echo $arr['giftname']?></td>
<td><?php echo $arr['giftnum']?></td>
<td><?php echo $arr['money']*-1?></td>
<td><?php echo date('Y-m-d',$arr['when'])?></td>
</tr>
<?php 
}
?>
<tr>
<td>合计</td>
<td>－－</td>
<td>－－</td>
<td><?php echo $totalcost?></td>
<td>－－</td>
</tr>
</tbody>
</table>
<?php 
}
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
<script>
function check3(){
	if(!validTime($("[name=paystartdate]").val(),$("[name=payenddate]").val())){
		alert("结束时间必须大于开始时间");
		return false;
	}
	return true;
}
</script>
<form method="get" onsubmit="return check3();">
<input type="hidden" name="ptype" value="bill" />
<input type="hidden" name="t" value="tagContent2" />
<ul>
<li><em>查询时间段选择: </em><em>从 <input type="text" name="paystartdate" class="infotxt" value="<?php echo $_GET['paystartdate']?>"/> 到 <input type="text" name="payenddate" class="infotxt" value="<?php echo $_GET['payenddate']?>"/></em></li>
<li><input type="submit" value="确定" class="sure"></li>
</ul>
</form>
<?php 
if($_GET['paystartdate']!="" && $_GET['payenddate']!=""){
?>
<table cellpadding="0" cellspacing="0" border="0" width="100%" class="tablelist">
<thead>
<tr><td colspan="6" class="searchtime"><?php echo $_GET['paystartdate']?> 至 <?php echo $_GET['payenddate']?></td></tr>
<tr><td>充值单号</td><td>充值方式</td><td>充值金额</td><td>获取<?php echo $page_var['money_name']?></td><td>时间</td><td>状态</td></tr>
</thead>
<tbody>
<?php 
$starttime=strtotime($_GET['paystartdate']." 00:00:00");
$endtime=strtotime($_GET['payenddate']." 23:59:59");
$rs=$db->Execute("SELECT * from orders WHERE  `lastupdate`>'$starttime' and `lastupdate`<'$endtime' and userid='{$user['userid']}' order by `lastupdate` desc ");
while($arr=$rs->FetchRow()){
	$arr=safe_output($arr);
	$orderid=sprintf("%s%05d",$arr['adddate'],$arr['id']);
	if($arr['status']==0){
		$status="未付款";
	}
	else if($arr['status']==1){
		$status="已成功";
	}
?>
<tr>
<td><?php echo $orderid?></td>
<td><?php echo $global_order_paychannel[$arr['paychannel']]?></td>
<td>￥<?php echo $arr['money']?></td>
<td><?php echo $arr['balanceadd']?></td>
<td><?php echo date('Y-m-d G:i:s',$arr['lastupdate'])?></td>
<td><?php echo $status?></td>
</tr>
<?php 
}
?>
</tbody>
</table>
<?php 
}
else{
	echo "请选择开始时间和结束时间";
}
?>
</div>
</div>
<!--充值记录end-->
<!--消费记录-->
<div  id="tagContent3" class="tagContent">
<div class="basiccont">
<ul>
<li><em>查询时间段选择: </em><em>从 <input type="text"  class="infotxt"/> 到 <input type="text"  class="infotxt"/></em></li>
<li><input type="submit" value="确定" class="sure"></li>
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
$(".infotxt").focus(function(){
  $("table.datepicker .close").click();
});
$('.infotxt').simpleDatepicker();

</script>
<?php 
if($_GET['t']){
echo '<script>$("#'.$_GET['t'].'Btn").click()</script>';
}
?>