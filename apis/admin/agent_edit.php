<?php 
include('head.php');
$userid = (int)$_REQUEST["userid"];
//$db->debug = true;
if($_REQUEST["type"]=="save"){
	$rechargerate = (float)$_REQUEST["rechargerate"];
	$consumerate = (float)$_REQUEST["consumerate"];
	if(!($rechargerate>=0 && $rechargerate<=1)){
		echo "<script>alert('请输入正确的销售提成');</script>";
		include('../../include/footer.inc.php');
		exit;
	}
	if(!($consumerate>=0 && $consumerate<=1)){
		echo "<script>alert('请输入正确的刷礼提成');</script>";
		include('../../include/footer.inc.php');
		exit;
	}
	$isuser = $db->GetOne("select userid from user where userid='$userid'");
	if(empty($isuser)){
		echo "<script>alert('您输入的用户id不存在');</script>";
		include('../../include/footer.inc.php');
		exit;
	}
	$basicsalary = (int)$_REQUEST["basicsalary"];
	$istrade = (int)$_REQUEST["istrade"];
	if(empty($_REQUEST["id"])){//新增
		$sql = "INSERT INTO `agentsalary`(userid,basicsalary,rechargerate,consumerate,bankname,banknumber,idcard,truename,istrade) VALUES 
				('$userid', '$basicsalary', '$rechargerate','$consumerate','$_REQUEST[bankname]','$_REQUEST[banknumber]','$_REQUEST[idcard]','$_REQUEST[truename]', '$istrade');";
		operational_log(3,("添加代理id".$userid),$_REQUEST,$userid);
		$db->Execute("update user set usertype=7 where userid='$userid';");
	}else{
		$sql = "UPDATE agentsalary set 
userid='$userid',
basicsalary='$basicsalary',
rechargerate='$rechargerate',
consumerate='$consumerate',
bankname='$_REQUEST[bankname]',
banknumber='$_REQUEST[banknumber]',
idcard='$_REQUEST[idcard]',
truename='$_REQUEST[truename]',
istrade='$istrade'
where id='$_REQUEST[id]'";
		operational_log(4,"修改代理id{$userid}",$_REQUEST,$userid);
	}
	$db->Execute($sql);
	echo "<script>alert('操作完成');parent.location='agent_list.php?userid=$userid';</script>";
	include('../../include/footer.inc.php');
	exit;
}else{
	$row = $db->GetRow("select * from agentsalary where userid='$userid'");
}
include('../../include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>代理编辑</title>
</head>
<body>
<table width="99%" align=center cellspacing=1 cellpadding=3 border=0>
	<tr class=head>
		<td width='30%' align=center>代理编辑</td>
	</tr>
</table>
<iframe width="0" height="0" style="display:none" name="ipost"></iframe>
<form method="post" target="ipost">
<input type="hidden" name="type" value="save"/>
<input type="hidden" name="id" value="<?php echo $row["id"]?>"/>
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr class="b">
	<td colspan="1">
	   <b>用户UserId</b></td><td colspan="6"><input type="text" name="userid" id="userid" value="<?php echo (empty($userid)?"":$userid)?>"/><font color="red">*必填</font>
	 </td> 
	</tr>
	<tr class="b">
	<td colspan="1">
	   <b>代理底薪</b></td><td colspan="6"><input type="text" name="basicsalary" id="basicsalary" value="<?php echo $row["basicsalary"]?>"/>
    </td> 
	</tr>
	<tr class="b">
	<td colspan="1">
	   <b>真实姓名</b></td><td colspan="6"><input type="text" name="truename" id="truename"  value="<?php echo $row["truename"]?>"/>
    </td> 
    </tr>
    <tr class="b">
	<td colspan="1">
	   <b>身份证号</b></td><td colspan="6"><input type="text" name="idcard" id="idcard"  value="<?php echo $row["idcard"]?>"/>
    </td> 
	</tr>
    <tr class="b">
	<td colspan="1">
	   <b>银行名称</b></td><td colspan="6"><input type="text" name="bankname" id="bankname"  value="<?php echo $row["bankname"]?>"/>
    </td> 
	</tr>
	<tr class="b">
	<td colspan="1">
	   <b>银行卡号</b></td><td colspan="6"><input type="text" name="banknumber" id="banknumber"  value="<?php echo $row["banknumber"]?>"/>
    </td> 
	</tr>
	<tr class="b">
	<td colspan="1">
	   <b>是否有销售权限</b></td><td colspan="6">
	   <select type="text" name="istrade">
	     <option value="0"<?php if($row["istrade"]=="0"):?> selected="selected"<?php endif;?>>有权限</option>
	     <option value="1"<?php if($row["istrade"]=="1"):?> selected="selected"<?php endif;?>>无权限</option>
	   </select>
    </td> 
	</tr>
	<tr class="b">
	<td colspan="1">
	   <b>销售提成(0.1代表10％提成)</b></td><td colspan="6">
	   <input type="text" name="rechargerate" id="rechargerate"  value="<?php echo $row["rechargerate"]?>"/>
    </td> 
	</tr>
	<tr class="b">
	<td colspan="1">
	   <b>刷礼提成(0.1代表10％提成)</b></td><td colspan="6">
	   <input type="text" name="consumerate" id="consumerate"  value="<?php echo $row["consumerate"]?>"/>
    </td> 
	</tr>
	<tr class="b">
	<td colspan="2"><input value="提交" type="submit"/></td> 
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
