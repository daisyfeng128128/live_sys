<?php 
include('head.php');
//$db->debug = true;
header("Content-type:text/html;charset=utf-8");
if($_POST["action"]=="addnumber"){
	$user = $db->GetRow("select * from user where usernumber='".(int)$_REQUEST["usernumber"]."'");
	if(empty($user)){
		$info = "此用户不存在,请重新操作";
	}else{
		$betternumber = (int)$_REQUEST["betternumber"];
		if(empty($betternumber)){
			$info = "赠送靓号不正确,请重新输入";
		}else{
			$new_number = $db->GetRow("select * from user_number where number='$betternumber'");
			$new_number_user = $db->GetRow("select * from user where usernumber='$betternumber'");
			if(!empty($new_number) || !empty($new_number_user)){
				$info = "对不起,该靓号已经被暂用";
			}else{
				$db->Execute("INSERT into user_number(number,userid) value($betternumber,$user[userid])");
				$db->Execute("update user set usernumber='$betternumber',islianghao=1 where userid=$user[userid]");
				$count=$db->Affected_Rows();
				if($count>0){
					$db->Execute("update beauty_number set isused=1 where number='$betternumber'");
				}
				$info = "操作成功";
				operational_log(4,"赠送靓号useridid,{$user[userid]}",$_REQUEST,$user[userid]);
			}
		}
	}
}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>赠送靓号</title>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script src="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.css">
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
	<tr><td class=head colspan="2"><b>赠送靓号功能</b></td></tr>
	<form action="" method="post">
	<tr class="b">
	<td width="5%">视频号</td>
	<td><input type="text" name="usernumber" id="usernumber"/><em style="color: red;">请准确输入视频号</em></td>
	</tr>
	<tr class="b"><td>赠送靓号</td><td><input type="text" name="betternumber"/></td></tr>
	<tr>
	<td>
	    <input type="submit" class="input_k" value="-添加-" onclick="return confirm('确认无误要添加该记录吗?')"/>
	    <input type="hidden" name="action" value="addnumber" />
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
</html><?php include('../../include/footer.inc.php');?>