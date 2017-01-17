<script src="/js/lib/jquery.cal.js"></script>
<div class="personbody">
<div class="person_left">
<?php $current_page="live";
include_once('./include/personal_tpl/person_menu.html');
?>
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
</div>
<div class="person_right">
<div class="person_tab">
<ul id="tags">
<li class="selectTag"><a href="javascript:void(0)" onclick="selectTag('tagContent0',this)"  id="tagContent0Btn">直播时间统计</a></li>
<li><a href="javascript:void(0)" onclick="selectTag('tagContent1',this)" id="tagContent1Btn">直播记录</a></li>
<li><a href="javascript:void(0)" onclick="selectTag('tagContent2',this)" id="blackbtn">房间黑名单</a></li>
<li><a href="javascript:void(0)" onclick="selectTag('tagContent3',this)" id="tagContent3Btn">房间密码</a></li>
</ul>
</div>
<div id="tagContent">
<!--直播时间统计-->
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
<input type="hidden" name="ptype" value="live" />
<input type="hidden" name="t" value="tagContent0" />
<?php
if(!isset($_GET['recvstartdate'])){
	$end_time = time();
	$start_time = $end_time-86400*7;
}else{
	$end_time = strtotime($_GET['recvenddate']." 23:59:59");
	$start_time = strtotime($_GET['recvstartdate']);
}
$_GET['recvstartdate'] = date("Y-m-d",$start_time);
$_GET['recvenddate'] = date("Y-m-d",$end_time);
?>
<ul>
<li><em>按查询时间段选择: </em><em>从 
    <input type="text" name="recvstartdate" class="infotxt" value="<?php echo $_GET['recvstartdate']?>"/> 到 <input type="text" name="recvenddate" class="infotxt" value="<?php echo $_GET['recvenddate']?>"/></em></li>
<li><input type="submit" value="确定" class="sure"></li>
</ul>
</form>
<p title="每天直播时长大于3小时为一个有效日">有效直播天数为: <em><?php echo live_shows_valid($user["userid"],$_GET['recvstartdate'],$_GET['recvenddate']);?></em>，销售充值(<?php echo $page_var['money_name'];?>):<?php echo agent_order_money($user["userid"],$_GET['recvstartdate'],$_GET['recvenddate'])?></p>
<p style="color:red">有效天数每天一统计，今天的有效天数明天统计</p>
<table cellpadding="0" cellspacing="0" border="0" width="100%" class="tablelist">
<thead>
<tr><td>日期</td><td>播出时长</td></tr>
</thead>
<tbody>
<?php //$db->debug = true;
$rs=$db->Execute("select * from shows_valid where userid='$user[userid]' and `date`>='$_GET[recvstartdate]' and `date`<='$_GET[recvenddate]' order by `date` desc");
$totalshow=0;

while($v=$rs->FetchRow()){
$totalshow += $v["time"];
?>
<tr>
<td><?php echo $v['date']?></td>
<td><?php echo interval_time($v["time"])?></td>
</tr>
<?php } ?>
</tbody>
<tfoot><tr>
<td>总计</td>
<td><?php echo interval_time($totalshow)?></td>
</tr></tfoot>
</table>
</div>
</div>
<!--直播时间统计end-->
<!--直播记录-->
<div class="tagContent" id="tagContent1">
<div class="basiccont">
<script>
function check2(){
	if(!validTime($("[name=recvstartdate2]").val(),$("[name=recvenddate2]").val())){
		alert("结束时间必须大于开始时间");
		return false;
	}
	return true;
}
</script>
<form method="get" onsubmit="return check2();">
<input type="hidden" name="ptype" value="live" />
<input type="hidden" name="t" value="tagContent1" />
<?php
if(!isset($_GET['recvstartdate2'])){
	$end_time = time();
	$start_time = $end_time-86400*7;
}else{
	$end_time = strtotime($_GET['recvenddate2']." 23:59:59");
	$start_time = strtotime($_GET['recvstartdate2']);
}
$_GET['recvstartdate2'] = date("Y-m-d",$start_time);
$_GET['recvenddate2'] = date("Y-m-d",$end_time);
?>
<ul>
<li><em>按查询时间段选择: </em><em>从 
    <input type="text" name="recvstartdate2" class="infotxt" value="<?php echo $_GET['recvstartdate2']?>"/> 到 <input type="text" name="recvenddate2" class="infotxt" value="<?php echo $_GET['recvenddate2']?>"/></em></li>
<li><input type="submit" value="确定" class="sure"></li>
</ul>
</form>
<table cellpadding="0" cellspacing="0" border="0" width="100%" class="tablelist">
<thead>
<tr><td>日期</td><td>开播时间</td><td>结束时间</td><td>播出时长</td></tr>
</thead>
<tbody>
<?php $rs=$db->Execute("select * from shows where endtime is not null and userid='$user[userid]' and starttime>$start_time and starttime<=$end_time order by starttime desc");
$totalshow=0;
while($arr=$rs->FetchRow()){
	$arr=safe_output($arr);
	$totalshow+=($arr['endtime']-$arr['starttime']);
	if($totalshow<0){
		continue;
	}
?>
<tr>
<td title='<?php echo $arr['id']?>'><?php echo date('Y-m-d',$arr['starttime'])?></td>
<td><?php echo date('m-d G:i',$arr['starttime'])?></td>
<td><?php echo date('m-d G:i',$arr['endtime'])?></td>
<td><?php echo interval_time($arr['endtime']-$arr['starttime'])?></td>
</tr>
<?php }
?>
</tbody>
<tfoot><tr>
<td>总计</td>
<td>----</td>
<td>----</td>
<td><?php echo interval_time($totalshow)?></td>
</tr></tfoot>
</table>
</div>
</div>
<!--直播记录end-->
<!--房间黑名单-->
<div  id="tagContent2" class="tagContent">
<div class="basiccont">
<table cellpadding="0" cellspacing="0" border="0" width="100%" class="tablelist">
<thead>
<tr><td>昵称</td><td>被禁时间</td><td>移出黑名单</td></tr>
</thead>
<tbody>
<?php 
$rs=$db->Execute("select a.*,b.nickname from blacklist a,user b where a.userid=b.userid and a.roomnumber='{$user['usernumber']}' and a.endtime>".time());
while($arr=$rs->FetchRow()){
	$arr=safe_output($arr);
?>
<tr>
<td><?php echo $arr['nickname']?></td>
<td><?php echo date('Y-m-d G:i',$arr['endtime']) ?></td>
<td><input type="button" class="moveout" value="移出" onclick="self.location='/ucenter.php?action=deletefromblack&userid=<?php echo $arr['userid']?>'"/></td>
</tr>
<?php
}
?>
</tbody>
</table>
</div>
</div>
<!--房间黑名单end-->
<!--房间密码-->
<div  id="tagContent3" class="tagContent">
<div class="basiccont">
<?php 
$pwd = $db->GetOne("select pwd from room_config where roomnumber='{$user[usernumber]}'");
?>
<ul class="dhjf">
  <li><span class="dhjftxt">房间密码：</span>
  <span>
    <input class="dhjfinput" type="text" maxlength="20" value="<?php if($pwd!=""&&$pwd!=null):?><?php echo $pwd?><?php endif;?>" id="room_config_pwd">
  </span>
  </li>
  <li class="attention_1">提示：用户只有知道此密码才可以进入房间(提交空密码为不设置密码)</li>
</ul>
<div class="dhjfbtns"><input id="setroompwd" type="button" value="设置" class="sure"/></div>
</div>
</div>
<!--房间密码end-->
</div>
</div>
</div>
<script>
$(function(){
	$("#setroompwd").click(function(){
		if(!confirm("确认进行此操作吗?"))return false;
		$.post("/ucenter.php?action=room_config_pwd",{pwd:($("#room_config_pwd").val())},function(r){
			if(r!=""){
				alert(r);
			}
			else{
				alert("操作成功");
				self.location="ucenter.php?ptype=live&t=3";
			}
		});
	});
});
$(".infotxt").focus(function(){
  $("table.datepicker .close").click();
});
$('.infotxt').simpleDatepicker();
</script>
<?php
if($_GET['toblack']=='true'){
?>
<script>
$("#blackbtn").click();
</script>
<?php
}
?>
<!--main-->
<?php 
if($_GET['t']){
echo '<script>$("#'.$_GET['t'].'Btn").click()</script>';
}
?>