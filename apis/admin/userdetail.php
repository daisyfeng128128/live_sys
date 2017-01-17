<?php 
include('head.php');
include('../../include/level.func.php');
$msg = $_GET["msg"];
$usertypeArr = array("0"=>"普通用户","9"=>"站长","8"=>"运营","6"=>"客服");
$userid=(int)$_GET["userid"];
$user = $db->GetRow("select * from user where userid=$userid");
//$db->debug = true;
$time = time();
$numberlist = $db->GetOne("select group_concat(number) from user_number where userid=$userid");
$carlist = $db->GetArray("select giftname,giftprice,vailddate from usercars u,gift g where g.giftid=u.carid and userid=$userid and vailddate>$time");
$guardlist = $db->GetArray("select roomnumber,vailddate from guard where userid=$userid and vailddate>$time");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script src="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.css">
<title>用户详细信息</title>
<style>.red{color:red;}</style>
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
    <tr><td colspan="18">
	<b><a href="balance_change_log.php?touserid=<?php echo $userid?>&why=1"><span class="tal_01_01"></span><span class="tal_01_02">收礼记录</span><span class="tal_01_03"></span></a>
	   <a href="balance_change_log.php?userid=<?php echo $userid?>&why=1"><span class="tal_01_01"></span><span class="tal_01_02">消费记录</span><span class="tal_01_03"></span></a>
	   <a href="balance_change_log.php?userid=<?php echo $userid?>&why=0"><span class="tal_01_01"></span><span class="tal_01_02">充值记录</span><span class="tal_01_03"></span></a>
	   <a href="balance_change_log.php?userid=<?php echo $userid?>&why=2"><span class="tal_01_01"></span><span class="tal_01_02">中奖记录</span><span class="tal_01_03"></span></a>
	   </b></td></tr>
	<tr><td class="head" colspan="18"><b>用户详情</b></td></tr>
	<tr class="b"><td width="15%">头像:</td><td><img width="60" height="60" alt="" src="/apis/avatar.php?uid=<?php echo $user["userid"]?>"></td></tr>
	<tr class="b"><td width="15%">用户类型:</td><td><?php echo $usertypeArr[$user["usertype"]]?></td></tr>
	<tr class="b"><td width="15%">用户ID:</td><td><?php echo $user["userid"]?></td></tr>
	<tr class="b"><td width="15%">家族ID:</td><td><?php echo $user["clanid"]?></td></tr>
	<tr class="b"><td width="15%">代理ID:</td><td><?php echo $user["agentid"]?></td></tr>
	<tr class="b"><td width="15%">昵称:</td><td><?php echo $user["nickname"]?></td></tr>
	<tr class="b"><td width="15%">视频号:</td><td><?php echo $user["usernumber"]?></td></tr>
	<tr class="b"><td width="15%">性别:</td><td><?php echo $user["gender"]==0?"女":"男";?></td></tr>
	<tr class="b"><td width="15%">生日:</td><td><?php echo $user["birthday"]?></td></tr>
	<tr class="b"><td width="15%">邮箱:</td><td><?php echo $user["email"]?></td></tr>
	<tr class="b"><td width="15%">省:<?php echo $user["province"]?></td><td>市：<?php echo $user["city"]?></td></tr>
	<tr class="b"><td width="15%">会员等级:</td><td><?php echo cost2rich($user["totalcost"])?>富</td></tr>
	<tr class="b"><td width="15%">主播等级:</td><td><?php echo point2star($user["totalpoint"])?>星</td></tr>
	<tr class="b"><td width="15%">账户余额:</td><td><?php echo $user["balance"]?></td></tr>
	<tr class="b"><td width="15%">积分余额:</td><td><?php echo $user["point"]?></td></tr>
	<tr class="b"><td width="15%">注册时间:</td><td><?php echo date("Y-m-d H:i:s",$user["regtime"])?></td></tr>
	<tr class="b"><td width="15%">最后登录时间:</td><td><?php echo date("Y-m-d H:i:s",$user["lastlogin"])?></td></tr>
	<tr class="b"><td width="15%">登录IP:</td><td><?php echo long2ip($user["lastloginip"])?></td></tr>
	<tr class="b"><td width="15%"><span class="red">其它信息:</span></td><td></td></tr>
	<tr class="b"><td width="15%">拥有的座驾:</td><td>
	<?php foreach ($carlist as $value):?>
	<?php echo $value["giftname"]?>(价格：<?php echo $value["giftprice"].$page_var['money_name']?>):有效期截止到 <?php echo date("Y-m-d H:i:s",$value["vailddate"]);?><br/>
	<?php endforeach;?>
	</td></tr>
	<tr class="b"><td width="15%">守护列表:</td><td>
	<?php foreach ($guardlist as $value):?>
	房间号:<a href="/<?php echo $value["roomnumber"]?>.html" target="_blank"><?php echo $value["roomnumber"]?></a>:有效期截止到 <?php echo date("Y-m-d H:i:s",$value["vailddate"]);?><br/>
	<?php endforeach;?>
	</td></tr>
	<tr class="b"><td width="15%">拥有的靓号:</td><td><?php echo $numberlist;?></td></tr>
	<tr class="b"><td width="15%">vip信息:</td><td><?php echo ($user["viplevel"])?>级vip<?php echo empty($user["vip_vailddate"])?"":",有效期截止到".date("Y-m-d H:i:s",$user["vip_vailddate"]);?></td></tr>
	<tr class="b"><td width="15%">隐身道具:</td><td><?php echo ($user["yinshen"])?"有":"无"?><?php echo empty($user["yinshen_vailddate"])?"":",有效期截止到".date("Y-m-d H:i:s",$user["yinshen_vailddate"]);?></td></tr>
	<tr class="b"><td width="15%">新人王:</td><td><?php echo ($user["xinren"])?"有":"无"?><?php echo empty($user["xinren_vailddate"])?"":",有效期截止到".date("Y-m-d H:i:s",$user["xinren_vailddate"]);?></td></tr>
</table>

<?php if($msg):?>
<script>alert("<?php echo $msg?>");</script>
<?php endif;?>
</body>
</html>
<?php include('../../include/footer.inc.php');?>