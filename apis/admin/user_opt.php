<?php 
include('head.php');
include($app_path."include/level.func.php");
//会员功能
//$db->debug = true;
header("Content-type:text/html;charset=utf-8");
$usernumber = (int)$_REQUEST["usernumber"];
$user = $db->GetRow("select * from user where usernumber='$usernumber'");
if($_POST["act"]=="addbalance"){
	if(empty($user)){
		$info = "此用户不存在,请重新操作";
	}else{
		operational_log(4,"设置用户userid,{$user[userid]}",$_REQUEST,$user[userid]);
		//主播等级
		if(isset($_POST["totalpoint"]) && $_POST["totalpoint"]>=0){
			$db->Execute("update user set totalpoint='$_POST[totalpoint]' where userid=$user[userid]");
		}
		//会员等级
		if($_POST["istotalcost"]=="on"){
			if(isset($_POST["totalcost"])){
				$db->Execute("update user set totalcost='$_POST[totalcost]' where userid=$user[userid]");
			}
		}
		//VIP等级
		if(isset($_POST["viplevel"])){
			if($_POST["viplevel"]=="0"){
				$db->Execute("update user set viplevel='0',vip_vailddate='0' where userid=$user[userid]");
			}else{
				$db->Execute("update user set viplevel='$_POST[viplevel]',vip_vailddate='".strtotime($_POST[vip_vailddate])."' where userid=$user[userid]");
			}
		}
		//隐身符
		if($_POST["yinshen"]!="-1"){
			if($_POST["yinshen"]=="0"){
				$db->Execute("update user set yinshen='0',yinshen_vailddate='0' where userid=$user[userid]");
			}else{
				$db->Execute("update user set yinshen='1',yinshen_vailddate='".strtotime($_POST[yinshen_vailddate])."' where userid=$user[userid]");
			}
		}
		//红包
		$gift1 = (int)$_POST["gift1"];
		if($gift1>0){
			$tmp = $db->GetOne("select userid from giftstore where userid='{$user['userid']}' and giftid=1");
			if($tmp){
				$db->Execute("update giftstore set num={$gift1} where userid='{$user['userid']}' and giftid=1");
			}else{
				$db->Execute("INSERT INTO `giftstore`(userid,giftid,num) VALUES ('$user[userid]', '1', '{$gift1}')");
			}
		}
		//广播
		$gift65 = (int)$_POST["gift65"];
		if($gift65>0){
			$tmp = $db->GetOne("select userid from giftstore where userid='{$user['userid']}' and giftid=65");
			if($tmp){
				$db->Execute("update giftstore set num={$gift65} where userid='{$user['userid']}' and giftid=65");
			}else{
				$db->Execute("INSERT INTO `giftstore`(userid,giftid,num) VALUES ('$user[userid]', '65', '{$gift65}')");
			}
		}
		//送座驾
		$carid = (int)$_POST["car"];
		if($carid!="-1"){
			$tmp = $db->GetOne("select userid from usercars where userid='{$user['userid']}' and carid=$carid");
			if($tmp){
				$db->Execute("update usercars set vailddate='".strtotime($_POST[car_vailddate])."' where userid='{$user['userid']}' and carid=$carid");
			}else{
				$db->Execute("insert into usercars(userid,carid,vailddate)values('{$user[userid]}','$carid','".strtotime($_POST[car_vailddate])."')");
			}
		}
		//账户类型
		if(isset($_POST["usertype"])){
			$db->Execute("update user set usertype='$_POST[usertype]' where userid=$user[userid]");
		}
		//所属家族
		if(isset($_POST["clanid"]) && $_POST["clanid"]!="-1"){
			$db->Execute("update user set clanid='$_POST[clanid]' where userid=$user[userid]");
		}
		//所属代理
		if(isset($_POST["agentid"])){
			$db->Execute("update user set agentid='$_POST[agentid]' where userid=$user[userid]");
		}
		//主播分类
		if(isset($_POST["showercateid"]) && $_POST["showercateid"]!="-1"){
			$db->Execute("update room_config set showercateid='$_POST[showercateid]' where roomnumber='$user[usernumber]'");
		}
		$count=$db->Affected_Rows();
		if($count>=1){
			$info = "操作成功";
		}
	}
}
$carlist = $db->GetArray("select * from gift where giftcateid=8 order by giftprice asc");
$showercate = $db->GetArray("select * from showercate");
$clanlist = $db->GetArray("select * from clan");
$agentlist = $db->GetArray("select u.nickname,u.usernumber,a.* from user as u,agentsalary a where a.userid=u.userid and u.usertype=7 ");
$user = $db->GetRow("select * from user where usernumber='$usernumber'");
$user['starlevel']=point2star($user['totalpoint']);
$user['richlevel']=cost2rich($user['totalcost']);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script src="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.css">
<script>
$(function(){
$('.infotxt').datepicker({ dateFormat:'yy-mm-dd',changeMonth:true,changeYear: true});

	$("#totalcost option[level=<?php echo $user["richlevel"]?>]").attr("selected",true);
	$("#totalpoint option[level=<?php echo $user["starlevel"]?>]").attr("selected",true);
	$("#viplevel").val('<?php echo $user["viplevel"]?>');
	<?php if($user["vip_vailddate"]){?>
		$("[name=vip_vailddate]").val('<?php echo date("Y-m-d",$user["vip_vailddate"])?>');
	<?php }?>
	$("#yinshen").val('<?php echo $user["yinshen"]?>');
	<?php if($user["yinshen_vailddate"]){?>
		$("[name=yinshen_vailddate]").val('<?php echo date("Y-m-d",$user["yinshen_vailddate"])?>');
	<?php }?>
	$("[name=usertype]").val('<?php echo $user["usertype"]?>');
	$("[name=clanid]").val('<?php echo $user["clanid"]?>');
	$("[name=agentid]").val('<?php echo $user["agentid"]?>');
});
</script>
<style>em{font-size:18px;}</style>
</head>
<body>
<table width="99%" align=center cellspacing=1 cellpadding=3 border=0>
	<tr class=head>
		<td width='30%' align=center>
			PlatForm Administrator</td>
	</tr>
</table>
<br/>
<form action="" method="post">
<input type="hidden" name="usernumber" id="usernumber" value="<?php echo $usernumber;?>"/>
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr><td class=head colspan="2"><b>会员功能</b></td></tr>
<?php if($_GET["type"]=="user"){?>
	<tr class="b">
	<td>
	  会员等级 
	</td>
	<td>
	<select id="totalcost" name="totalcost">
	              <option value="-1">请选择...</option>
<?php foreach ($cost_array as $key => $value):?>
	              <option value="<?php echo $value?>" level="<?php echo $key?>"><?php echo $key?>级--<?php echo $value?><?php echo $page_var['money_name']?></option>
<?php endforeach;?>
	</select>
	<input type="checkbox" name="istotalcost"/>
	<em style="color: red;">勾选后设置它，对应的<?php echo $page_var['money_name']?>数是指对应等级需要消费<?php echo $page_var['money_name']?>的数量</em>
	</td>
	</tr>
	<tr class="b">
	<td>VIP等级</td>
	<td>
		<select id="viplevel" name="viplevel" style="width: 100px;">
		   <option value="-1">请选择...</option>
		   <option value="0">非VIP</option>
		   <option value="1">黄色VIP</option>
		   <option value="2">紫色VIP</option>
		   <option value="3">黑色VIP</option>
		</select>
		截止时间:
		<input type="text" class="infotxt" name="vip_vailddate" id="vip_vailddate" value="<?php echo date("Y-m-d",(time()+86400*30));?>"/><em style="color: red;">设置后会覆盖原有vip</em>
	</td>
	</tr>
	<tr class="b">
	<td>送座驾</td>
	<td>
		<select name="car" style="width: 100px;">
		   <option value="-1">请选择...</option>
<?php foreach ($carlist as $value):?>
	<option value="<?php echo $value["giftid"]?>"><?php echo $value["giftname"]?>--价格：<?php echo $value["giftprice"].$page_var['money_name'];?></option>
<?php endforeach;?>
		</select>
		截止时间:
		<input type="text" class="infotxt" name="car_vailddate" id="car_vailddate" value="<?php echo date("Y-m-d",(time()+86400*30));?>"/><em style="color: red;">如果用户已经拥有此车，则清空原有有效期</em>
	</td>
	</tr>
	<tr class="b">
	<td>隐身符</td>
	<td>
		<select name="yinshen" style="width: 100px;">
		   <option value="-1">请选择...</option>
		   <option value="0">取消隐身符</option>
		   <option value="1">设置隐身符</option>
		</select>
		截止时间:
		<input type="text" class="infotxt" name="yinshen_vailddate" id="yinshen_vailddate" value="<?php echo date("Y-m-d",(time()+86400*30));?>"/><em style="color: red;">不要忘记选择隐身符(设置后会覆盖原有隐身符)</em>
	</td>
	</tr>
	<tr class="b">
	<td>加红包(掌声)</td>
	<td>
		<input type="text" name="gift1" id="gift1" value="<?php echo $db->GetOne("select num from giftstore where userid='$user[userid]' and giftid=1");?>"/><em style="color: red;">请输入数字</em>
	</td>
	</tr>
	
	<tr class="b">
	<td>加广播道具</td>
	<td>
		<input type="text" name="gift65" id="gift65" value="<?php echo $db->GetOne("select num from giftstore where userid='$user[userid]' and giftid=65");?>"/><em style="color: red;">请输入数字</em>
	</td>
	</tr>
	<tr class="b">
	<td>账户类型：</td>
	<td>
		<select name="usertype" style="width: 100px;">
		   <option value="-1">请选择...</option>
		   <option value="0">普通用户</option>
		   <!--option value="9">站长</option-->
		   <option value="7">代理</option>
		   <option value="8">运营</option>
		   <!--option value="6">客服</option-->
		</select>（运营帐号，属于网站管理人员，可以在直播间有特权，可在后台->房间权限设置,中设置运营在直播间的权限。如果是代理，不用在这里设置，直接到添加代理中设置）
	</td>
	</tr>
	<tr class="b"><td>所属家族</td><td>
	<select id="clanid" name="clanid">
	              <option value="0">请选择...</option>
<?php foreach ($clanlist as $value):?>
	              <option value="<?php echo $value["clanid"]?>"><?php echo $value["clanname"]?></option>
<?php endforeach;?>
	</select>
	</td></tr>
	<tr class="b"><td>所属代理</td><td>
	<select id="agentid" name="agentid">
	              <option value="0">请选择...</option>
<?php foreach ($agentlist as $value):?>
	              <option value="<?php echo $value["userid"]?>"><?php echo $value["nickname"]?></option>
<?php endforeach;?>
	</select>
	</td></tr>
<?php }?>
<?php if($_GET["type"]=="show"){?>
	<tr class="b">
	<td width="5%">主播等级</td>
	<td>
	<select id="totalpoint" name="totalpoint">
	              <option value="-1">请选择...</option>
<?php foreach ($point_array as $key => $value):?>
	              <option value="<?php echo $value?>" level="<?php echo $key?>"><?php echo $key?>级--<?php echo $value?><?php echo $page_var['money_name2']?></option>
<?php endforeach;?>
	            </select><em style="color: red;">对应的<?php echo $page_var['money_name2']?>数是指对应等级需要收到的<?php echo $page_var['money_name2']?>的数量</em>
	</td>
	</tr>
	<!--tr class="b">
	<td>主播分类</td>
	<td>
		<select name="showercateid" style="width: 100px;">
		   <option value="-1">请选择...</option>
<?php foreach ($showercate as $value):?>
		   <option value="<?php echo $value["id"]?>"><?php echo $value["catename"]?></option>
<?php endforeach;?>
		</select>
	</td>
	</tr-->
<?php }?>
	<tr>
	<td>
	    <input type="submit" class="input_k" value="-添加-" onclick="return confirm('您确认要执行这项操作吗？')"/>
	    <input type="hidden" name="act" value="addbalance" />
	</td>
	</tr>
</table>
</form>
<?php if(!empty($info)):?>
<script>
alert('<?php echo $info?>');
</script>
<?php endif;?>
</body>
</html>
<?php include('../../include/footer.inc.php');?>