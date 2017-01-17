<script src="/js/lib/jquery.cal.js"></script>
<!--main-->
<div class="personbody">
<div class="person_left">
<?php $current_page="clan";
include_once('./include/personal_tpl/person_menu.html');
?>
</div>
<div class="person_right">
<div class="person_tab">
<ul id="tags">
<li class="selectTag"><a href="javascript:void(0)" onclick="selectTag('tagContent0',this)" id="tagContent0Btn">家族管理</a></li>
<li><a href="javascript:void(0)" onclick="selectTag('tagContent1',this)" id="tagContent1Btn">成员管理</a></li>
<li><a href="javascript:void(0)" onclick="selectTag('tagContent2',this)" id="tagContent2Btn">申请审核</a></li>
<li><a href="javascript:void(0)" onclick="selectTag('tagContent4',this)" id="tagContent4Btn">退出审核</a></li>
<li><a href="javascript:void(0)" onclick="selectTag('tagContent3',this)" id="tagContent3Btn">家族账单</a></li>
</ul>
</div>
<div id="tagContent">
<!--家族管理-->
<div class="tagContent selectTag" id="tagContent0">
<div class="faminfo">
<span style="clear:both"><em class="familyname"><?php echo $clan['clanname']?></em><em class="familyzhuye"><a href="/clan<?php echo $clan['clanid'] ?>.html">进入家族主页</a></em></span>
<ul>
<li><em class="faminfotxt">徽章数量：<?php echo $clan['medalleft']?></em><em class="faminfotxtbz">（可授予数量）</em><em class="faminfotxt_1">副族长数量：<?php echo $clan['secondleaderleft']?></em><em class="faminfotxtbz">（可任命数量）</em></li>
<li>
<form action="?action=sendmedal" target="ipost" method="post" onsubmit="return confirm('确认要提交吗')">
<label class="faminfotxt">授予徽章：</label><input name="usernumber" value="输入用户号" onBlur="if (value ==''){value='输入用户号'}" onfocus="if (value =='输入用户号'){value =''}" type="text"  class="inputtxt"/><input  type="submit"  class="givebtn" value=""/>
</form>
<form action="?action=setsecondleader" target="ipost" method="post">
<label class="faminfotxt">设副族长：</label><input name="usernumber" value="输入用户号" onBlur="if (value ==''){value='输入用户号'}" onfocus="if (value =='输入用户号'){value =''}" type="text"  class="inputtxt"/><input  type="submit"  class="givebtn" value=""/>
</form>
</li>
<form action="?action=setclanannounce" target="ipost" method="post" onsubmit="return confirm('确认要提交吗')">
<li><label class="faminfotxt_2">家族公告：</label><textarea class="inputtxt_1" name="chanannounce"><?php echo $clan['announce']?></textarea><input  type="submit"  class="givebtn" value=""/></li>
</form>
<form action="?action=setallowjoin" target="ipost" method="post" onsubmit="return confirm('确认要提交吗')">
<li><label class="faminfotxt">加入限制：</label><select class="yxjr" name="allowjoin"><option value="1" <?php if($clan['allowjoin']==1) echo 'selected'?>>允许加入</option><option value="0" <?php if($clan['allowjoin']==0) echo 'selected'?>>不允许加入</option><option value="2" <?php if($clan['allowjoin']==2) echo 'selected'?>>需要审核</option></select><input  type="submit"  class="givebtn" value=""/></li>
</form>
</ul>
</div>
<div class="fuzu">
<h3 class="righttitle_1">副族长</h3>
<div class="fuzucont">
<div class="fuzuinfo">
<ul>
<?php if($clan['secondleaders']){ 
	$rs=$db->Execute("select * from user where userid in ($clan[secondleaders])");
	while($arr=$rs->FetchRow()){
		$arr=safe_output($arr);
		$arr['starlevel']=point2star($arr['totalpoint']);
		$arr['richlevel']=cost2rich($arr['totalcost']);
	?>
	<li>
	<p><a href="javascript:void(0)"><img src="/apis/avatar.php?uid=<?php echo $arr['userid']?>" width="50" /><?php echo $arr['nickname']?></a><span>(<?php echo $arr['usernumber']?>)</span><em class="ranklevel_1"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></em><em class="fhrank_1"><em class="level lv<?php echo $arr['richlevel']?>"></em></em></p>
	<p><em class="fuzuinfobnt"><a target="ipost" href="ucenter.php?action=delsecondleader&uid=<?php echo $arr['userid']?>" onclick="return confirm('确定要取消吗？')">取消副族长</a></em></p>
	</li>
	<?php 	}
}

?>
</ul>
</div>
</div>
</div>
</div>
<!--家族管理end-->
<!--成员管理-->
<div  id="tagContent1" class="tagContent">
<div class="menber">
<div class="cygloperation">
<span class="cygloperationcon">
<form action="/ucenter.php" method="get">
	<input type="hidden" value="clan" name="ptype">
	<input type="hidden" value="tagContent1" name="t">
  <input type="text" name="usernumber" value="请输入会员号" onBlur="if (value ==''){value='请输入会员号'}" onfocus="if (value =='请输入会员号'){value =''}" class="mebersearchtxt"/>
  <input  type="submit"  class="givebtn" value=""/></span></div>
</form>
<script>
function check_clan(){
	return confirm('确定要进行此操作吗？');
}
</script>
<form action="/ucenter.php?action=clanmember" method="post" target="ipost" onsubmit="return check_clan();">
<table cellpadding="0" cellspacing="0" border="0" width="100%" class="tablelist">
<thead>
<tr>
<td><input type="checkbox" id="checkall" class="inputnoborder"></td>
<td>成员昵称</td>
<td>会员号</td>
<td>主播等级</td>
<td>用户等级</td>
<td>徽章有效期</td>
<td>家族主播</td>
<td>&nbsp;</td>
</tr>
</thead>
<tbody>
<?php include("include/page.inc.php");
$search=(int)$_GET['usernumber'];
$page_size=10;
$page=($_GET['p']=='')?1:(int)$_GET['p'];//默认第一页

if($search==""){
	$total=$db->GetOne("select count(*) from user where clanid='{$clan[clanid]}'");
	$sql="select * from user where clanid='{$clan[clanid]}'";
}
else{
	$total=$db->GetOne("select count(*) from user where clanid='{$clan[clanid]}' and usernumber='$search'");
	$sql="select * from user where clanid='{$clan[clanid]}' and usernumber='$search'";
}
if($page>ceil($total/$page_size)){
	$page=ceil($total/$page_size);
}
$page_handle=new page($page,ceil($total/$page_size),13);
$page_array=$page_handle->return_array();
$rs=$db->SelectLimit($sql,$page_size,($page-1)*$page_size);
while($arr=$rs->FetchRow()){
	$arr=safe_output($arr);
	$arr['starlevel']=point2star($arr['totalpoint']);
	$arr['richlevel']=cost2rich($arr['totalcost']);
?>
<tr>
<td><input type="checkbox" class="choose inputnoborder" name="ids[]" value="<?php echo $arr['userid']?>"/></td>
<td><?php echo $arr['nickname']?></td>
<td><?php echo $arr['usernumber']?></td>
<td><em class="ranklevel_1"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></em></td>
<td><em class="fhrank_1"><em class="level lv<?php echo $arr['richlevel']?>"></em></em></td>
<td>
<?php if($arr['medalvalid']){
echo date('Y-m-d',$arr['medalvalid']);
}	
?>
</td>
<td><?php if($arr['clanactor']==1){
	echo '是';
}
else{
	echo '否';
}
?></td>
<td>
<!--a href="/ucenter.php?action=setactor&userid=<?php echo $arr['userid']?>" title="设为主播" target="ipost" onclick="return confirm('确定吗？')"><img src="/images/fa.png" class="meberimg" alt="设为主播"/></a-->
<a href="/ucenter.php?action=delfromclan&userid=<?php echo $arr['userid']?>" title="从家族中删除" target="ipost" onclick="return confirm('确定吗？')"><img src="/images/de.png" class="meberimg" alt="删除"/></a>
</td>
</tr>
<?php }
?>

</tbody>
</table>
<div class="cygloperation">
<span class="cygloperationcon">
<!--input type="submit" value="" name="setactor" class="swjzzb"/-->
<input type="submit" value="" name="delmember" class="delmember"/>
</span>
</div>
</div>
</form>
<!--分页-->
<div class="fenyelist" style="float:right;padding-right:25px;">
<?php foreach($page_array as $pstr){
?>
<span class="fenye<?php if($pstr==$page){?>click<?php }?>"><a href="/ucenter.php?ptype=clan&t=tagContent1&p=<?php echo $pstr?>"><?php echo $pstr?></a></span>
<?php }
?>
<!--分页-->
</div>
</div>
<!--成员管理end-->
<!--申请审核-->
<div  id="tagContent2" class="tagContent">
<div class="menber">
<div class="cygloperation">
<span class="cygloperationcon">
  <form action="/ucenter.php" method="get">
	<input type="hidden" value="clan" name="ptype">
	<input type="hidden" value="tagContent2" name="t">
  <input type="text" name="passusernumber" value="请输入会员号" onBlur="if (value ==''){value='请输入会员号'}" onfocus="if (value =='请输入会员号'){value =''}" class="mebersearchtxt"/>
  <input  type="submit"  class="givebtn" value=""/></span></div>
</form>
<form action="/ucenter.php?action=clanpass" method="post" target="ipost">
<table cellpadding="0" cellspacing="0" border="0" width="100%" class="tablelist">
<thead>
<tr>
<td><input type="checkbox" id="passcheckall" class="inputnoborder"></td>
<td>昵称</td>
<td>帐号</td>
<td>主播等级</td>
<td>用户等级</td>
<td>&nbsp;</td>
</tr>
</thead>
<tbody>
<?php $search=(int)$_GET['passusernumber'];
$page=($_GET['pp']=='')?1:(int)$_GET['pp'];//默认第一页

if($search==""){
	$total=$db->GetOne("select count(*) from user a,clanapply b where a.userid=b.userid and b.clanid='{$clan[clanid]}'");
	$sql="select a.* from user a,clanapply b where a.userid=b.userid and b.clanid='{$clan[clanid]}'";
}
else{
	$total=$db->GetOne("select count(*) from user a,clanapply b where a.userid=b.userid and b.clanid='{$clan[clanid]}' and a.usernumber='$search'");
	$sql="select a.* from user a,clanapply b where a.userid=b.userid and b.clanid='{$clan[clanid]}' and a.usernumber='$search'";
}
if($page>ceil($total/$page_size)){
	$page=ceil($total/$page_size);
}
$page_handle=new page($page,ceil($total/$page_size),13);
$page_array=$page_handle->return_array();
$rs=$db->SelectLimit($sql,$page_size,($page-1)*$page_size);
while($arr=$rs->FetchRow()){
	$arr=safe_output($arr);
	$arr['starlevel']=point2star($arr['totalpoint']);
	$arr['richlevel']=cost2rich($arr['totalcost']);
?>
<tr>
<td><input type="checkbox" class="passchoose inputnoborder" name="passids[]" value="<?php echo $arr['userid']?>"/></td>
<td><?php echo $arr['nickname']?></td>
<td><?php echo $arr['usernumber']?></td>
<td><em class="ranklevel_1"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></em></td>
<td><em class="fhrank_1"><em class="level lv<?php echo $arr['richlevel']?>"></em></em></td>
<td>
<a href="/ucenter.php?action=passclan&userid=<?php echo $arr['userid']?>" title="通过" target="ipost" onclick="return confirm('确定吗？')"><img src="/images/ok.png" class="meberimg"/></a>
<a href="/ucenter.php?action=unpassclan&userid=<?php echo $arr['userid']?>" title="不通过" target="ipost" onclick="return confirm('确定吗？')"><img src="/images/de.png" class="meberimg"/></a></td>
</tr>
<?php }	
?>
</tbody>
</table>
<div class="cygloperation">
<span class="cygloperationcon">
<input type="submit" value="" name="passbtn" class="yxjrbtn"/>
<input type="submit" value="" name="unpassbtn" class="delmember"/>
</span>
</div>
</div>
</form>
<!--分页-->
<div class="fenyelist">
<?php foreach($page_array as $pstr){
?>
<span class="fenye<?php if($pstr==$page){?>click<?php }?>"><a href="/ucenter.php?ptype=clan&t=tagContent2&pp=<?php echo $pstr?>"><?php echo $pstr?></a></span>
<?php }
?>
<!--分页-->
</div>
</div>
<!--申请审核end-->
<!--退出审核-->
<div  id="tagContent4" class="tagContent">
<div class="menber">
<div class="cygloperation">
<span class="cygloperationcon">
  <form action="/ucenter.php" method="get">
	<input type="hidden" value="clan" name="ptype">
	<input type="hidden" value="tagContent4" name="t">
  <input type="text" name="passusernumber" value="请输入会员号" onBlur="if (value ==''){value='请输入会员号'}" onfocus="if (value =='请输入会员号'){value =''}" class="mebersearchtxt"/>
  <input  type="submit"  class="givebtn" value=""/></span></div>
</form>
<table cellpadding="0" cellspacing="0" border="0" width="100%" class="tablelist">
<thead>
<tr>
<td><input type="checkbox" id="passcheckall2" class="inputnoborder"></td>
<td>昵称</td>
<td>帐号</td>
<td>主播等级</td>
<td>用户等级</td>
<td>&nbsp;</td>
</tr>
</thead>
<tbody>
<?php 
$search=(int)$_GET['passusernumber'];
$page=($_GET['pp']=='')?1:(int)$_GET['pp'];//默认第一页

if($search==""){
	$total=$db->GetOne("select count(*) from user a,clancancle b where a.userid=b.userid and b.clanid='{$clan[clanid]}'");
	$sql="select a.* from user a,clancancle b where a.userid=b.userid and b.clanid='{$clan[clanid]}'";
}
else{
	$total=$db->GetOne("select count(*) from user a,clancancle b where a.userid=b.userid and b.clanid='{$clan[clanid]}' and a.usernumber='$search'");
	$sql="select a.* from user a,clancancle b where a.userid=b.userid and b.clanid='{$clan[clanid]}' and a.usernumber='$search'";
}
if($page>ceil($total/$page_size)){
	$page=ceil($total/$page_size);
}
$page_handle=new page($page,ceil($total/$page_size),13);
$page_array=$page_handle->return_array();
$rs=$db->SelectLimit($sql,$page_size,($page-1)*$page_size);
while($arr=$rs->FetchRow()){
	$arr=safe_output($arr);
	$arr['starlevel']=point2star($arr['totalpoint']);
	$arr['richlevel']=cost2rich($arr['totalcost']);
?>
<tr>
<td><input type="checkbox" class="passchoose2 inputnoborder" name="passids[]" value="<?php echo $arr['userid']?>"/></td>
<td><?php echo $arr['nickname']?></td>
<td><?php echo $arr['usernumber']?></td>
<td><em class="ranklevel_1"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></em></td>
<td><em class="fhrank_1"><em class="level lv<?php echo $arr['richlevel']?>"></em></em></td>
<td>
<a href="/ucenter.php?action=passclanquit&userid=<?php echo $arr['userid']?>" title="同意退出" target="ipost" onclick="return confirm('确定吗？')"><img src="/images/ok.png" class="meberimg"/></a>
<a href="/ucenter.php?action=unpassclanquit&userid=<?php echo $arr['userid']?>" title="不同意退出" target="ipost" onclick="return confirm('确定吗？')"><img src="/images/de.png" class="meberimg"/></a></td>
</tr>
<?php 
}	
?>
</tbody>
</table>
</div>
<!--分页-->
<div class="fenyelist">
<?php 
foreach($page_array as $pstr){
?>
<span class="fenye<?php if($pstr==$page){?>click<?php }?>"><a href="/ucenter.php?ptype=clan&t=tagContent4&pp=<?php echo $pstr?>"><?php echo $pstr?></a></span>
<?php 
}
?>
<!--分页-->
</div>
</div>
<!--退出审核end-->


<!--家族账单-->
<div class="tagContent" id="tagContent3">
<div class="basiccont">
<form method="get">
<input type="hidden" value="clan" name="ptype">
<input type="hidden" name="t" value="tagContent3" />
<ul>
<li><em>按查询时间段选择: </em><em>从 
    <input type="text" name="recvstartdate" class="infotxt" value="<?php echo $_GET['recvstartdate']?>"/> 到 <input type="text" name="recvenddate" class="infotxt" value="<?php echo $_GET['recvenddate']?>"/></em></li>
<li><em>按主播查询:<input type="text" name="recvusernumber" value="<?php echo $_GET['recvusernumber']?$_GET['recvusernumber']:"输入视频号";?>" class="searchnc" onBlur="if (value ==''){value='输入视频号'}" onfocus="if (value =='输入视频号'){value =''}"/></em></li>
<li><input type="submit" class="searchsure" value="" /></li>
</ul>
</form>
<?php 
if($_GET['recvstartdate']!="" && $_GET['recvenddate']!=""){
if($_GET['recvusernumber']!="" && $_GET['recvusernumber']!="输入视频号"){
	$unumber=(int)$_GET['recvusernumber'];
	$useridquery="and b.usernumber='$unumber'";
}
?>
<table cellpadding="0" cellspacing="0" border="0" width="100%" class="tablelist">
<thead>
<tr><td colspan="7" class="searchtime"><?php echo $_GET['recvstartdate']?> 至 <?php echo $_GET['recvenddate']?></td></tr>
<tr><td>主播昵称/主播号</td><td>直播天数</td><td>直播时长</td><td>底薪</td><td>业绩</td><td>主播提成</td><td>您的提成</td></tr>
</thead>
<tbody>
<?php 
$starttime=strtotime($_GET['recvstartdate']." 00:00:00");
$endtime=strtotime($_GET['recvenddate']." 23:59:59");
$rs=$db->Execute("select u.userid,u.nickname,u.usernumber,p.basicsalary from user u,bu_user_anchors p where u.userid=p.userid and p.pass=1 and u.clanid='{$clan['clanid']}'");
while($arr=$rs->FetchRow()){
	$arr=safe_output($arr);
	$actor_sale = $db->GetRow("select sum(money) as money,sum(point) as point from clan_bill bill WHERE clanid='{$clan['clanid']}' and userid='{$arr['userid']}' and bill.`when`>={$starttime} and bill.`when`<={$endtime} GROUP BY userid");
	
	$yueji = (int)($actor_sale['money']);
	$sum_yueji += $yueji;
	
	$ti = (int)($actor_sale['point']);
	$sum_ti += $ti;
	
	$day = live_shows_valid($arr["userid"],$_GET['recvstartdate'],$_GET['recvenddate']);
	$sum_day += $day;
	$time = get_showtime($arr["userid"],$_GET['recvstartdate'],$_GET['recvenddate']);
	$sum_time += $day;
	
	//$m = ((($ti)*CLAN_CONSUMERATE)/RMB_XNB);
	$m = (int)((($ti)*CLAN_CONSUMERATE));
	$m_sum += $m;
?>
<tr>
<td><?php echo $arr['nickname']?>/<?php echo $arr['usernumber']?></td>
<td><?php echo $day?></td>
<td><?php echo interval_time($time)?></td>
<td><?php echo $arr['basicsalary']?></td>
<td><?php echo $yueji?><?php echo $page_var['money_name']?></td>
<td><?php echo $ti?><?php echo $page_var['money_name2']?></td>
<td><?php echo $m?><?php echo $page_var['money_name2']?></td>
</tr>
<?php 
}
?>
<tr>
<td>合计</td>
<td>--</td>
<td>--</td>
<td>－－</td>
<td><?php echo $sum_yueji?><?php echo $page_var['money_name']?></td>
<td><?php echo $sum_ti?><?php echo $page_var['money_name2']?></td>
<td><?php echo $m_sum?><?php echo $page_var['money_name2']?></td>
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
<!--家族账单end-->

</div>
</div>
</div>
<?php if($_GET['t']){
echo '<script>$("#'.$_GET['t'].'Btn").click()</script>';
}
?>
<script>
$('.infotxt').simpleDatepicker();
$("#checkall").click(function(){
	if($("#checkall").attr('checked')==undefined){
		$(".choose").attr('checked',false);
	}
	else{
		$(".choose").attr('checked',$("#checkall").attr('checked'));
	}
});
$("#passcheckall").click(function(){
	if($("#passcheckall").attr('checked')==undefined){
		$(".passchoose").attr('checked',false);
	}
	else{
		$(".passchoose").attr('checked',$("#passcheckall").attr('checked'));
	}
});
$("#passcheckall2").click(function(){
	if($("#passcheckall2").attr('checked')==undefined){
		$(".passchoose2").attr('checked',false);
	}
	else{
		$(".passchoose2").attr('checked',$("#passcheckall2").attr('checked'));
	}
});
</script>