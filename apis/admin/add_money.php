<?php 
include('head.php');
//会员加钱
header("Content-type:text/html;charset=utf-8");
if($_POST["act"]=="addbalance"){
	$usernumber = (int)$_POST["usernumber"];
	$user = $db->GetRow("select * from user where usernumber=$usernumber");
	if(empty($user)){
		$info = "此用户不存在";
	}else{
		$money = $_POST["balance"];
		if(!is_numeric($money)){
// 			$info = "钱数必须为数字";
		}else{
			$balance = $money*RMB_XNB;
			$tem = time();
// 			$db->debug = true;
			$db->Execute("INSERT INTO `balance_change_log`(userid,touserid,why,roomnumber,balance,money,`when`) VALUES ($user[userid],0,0,$usernumber,'$balance','$money',$tem)");
			$db->Execute("INSERT INTO `orders`(userid,`adddate`,agentid,money,balanceadd,lastupdate,paychannel,sid,status) VALUES ($user[userid],'".(date("Ymd"))."','0','$money','$balance','$tem','0','$_POST[description]','1')");
			
			$db->Execute("update user set balance=balance+$balance where userid=$user[userid]");
			operational_log(4,"会员加钱,人民币:{$money},{$global_config_data["money_name"]}:{$balance}",$_REQUEST,$user[userid]);
			$info = "操作成功";
		}

	}
}
include('../../include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>会员加钱</title>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
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
	<tr><td class=head colspan="2"><b>会员加钱</b></td></tr>
	<form action="" method="post">
	<tr class="b">
	<td width="5%">视频号</td>
	<td><input type="text" name="usernumber" id="usernumber"/><em style="color: red;">请准确输入视频号</em></td>
	</tr>
	<tr class="b">
	<td width="5%">
	    加钱数目
	</td>
	<td><input type="text" name="balance" id="balance"/>(元)</td>
	</tr>

	<tr class="b">
	<td width="5%">
	    备注
	</td>
	<td><textarea name="description" id="description" style="height:100px;width:200px"></textarea>50字以内</td>
	</tr>
	
	<tr>
	<td>
	    <input type="submit" class="input_k" value="-添加-" onclick="return confirm('您确认要执行这项操作吗？')"/>
	    <input type="hidden" name="act" value="addbalance" />
	</td>
	</tr>
	</form>
</table>
<?php if(!empty($info)):?>
<script>
alert('<?php echo $info?>');
</script>
<?php endif;?>


</body>
</html>
