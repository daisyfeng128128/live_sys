<?php 
include('head.php');
header("Content-type:text/html;charset=utf-8");
$user = $db->GetRow("select * from user where userid='".(int)$_REQUEST["userid"]."'");
if($_POST["action"]=="clear"){
	if(empty($user)){
		$info = "此用户不存在,请重新操作";
	}else{
		$user = $db->GetRow("select * from user where userid='{$user[userid]}'");
		$_REQUEST["before_balance"] = $user["balance"];
		$_REQUEST["before_gamemoney"] = $user["gamemoney"];
		$_REQUEST["before_point"] = $user["point"];
		$db->Execute("update user set balance='".(int)$_POST[balance]."',gamemoney='".(int)$_POST[gamemoney]."',point='".(int)$_POST[point]."' where userid=$user[userid]");
		$count=$db->Affected_Rows();
		if($count>=1){
			$info = "操作成功";
			$db->Execute("insert into balance_change_log
				 (`when`,why,giftid,giftnum,userid,touserid,money,balance,point,roomnumber,showid)
				 values('".time()."','11','0','1','{$user['userid']}','0','".(int)$_POST[gamemoney]."','".(int)$_POST[balance]."','".(int)$_POST[point]."','0','0')");
			operational_log(4,"清理用户userid,{$user['userid']}",$_REQUEST,$user['userid']);
		}
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>账户清理</title>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script src="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.css">
</head>
<body>
<p class="paddingleft10 red">此功能是将用户的余额等等直接修改为下面输入的值</p>
<form action="?" method="post">
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr><td class=head colspan="2"><b>账户清理</b></td></tr>
	<tr class="b">
	<td width="5%">用户信息</td>
	<td><input type="hidden" name="userid" value="<?php echo $user["userid"]?>"/>UserId:<?php echo $user["userid"]?><br/>昵称:<?php echo $user["nickname"]?><br/></td>
	</tr>
	<tr class="b">
	<td width="5%">
	    金币账户余额
	</td>
	<td><input type="text" name="balance" id="balance" value="0"/>(<?php echo $page_var['money_name']?>)</td>
	</tr>
	<tr class="b">
	<td width="5%">
	    游戏账户余额
	</td>
	<td><input type="text" name="gamemoney" id="gamemoney" value="0"/>(游戏币)</td>
	</tr>
	<tr class="b">
	<td width="5%">
	   积分账户余额
	</td>
	<td><input type="text" name="point" id="point" value="0"/>(<?php echo $page_var['money_name2']?>)</td>
	</tr>
	<tr>
	<td>
	    <input type="submit" class="input_k" value="-添加-" onclick="return confirm('您确认要执行这项操作吗？')"/>
	    <input type="hidden" name="action" value="clear" />
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