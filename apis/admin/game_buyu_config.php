<?php 
include('head.php');
//$db->debug = true;
$info = "";
if($_POST["type"]=="save"){
	$interval = (int)$_POST["interval"];
	$percentage = (int)$_POST["percentage"];
	if($interval<=0){
		$info = "秒数输入的不正确";
	}else if($percentage<1 || $percentage>100){
		$info = "百分比输入的不正确";
	}else{
		$percentage = 1-$percentage/100;
		$sql = "
CREATE EVENT `reduce_cap`
ON SCHEDULE EVERY $interval SECOND
ON COMPLETION NOT PRESERVE
ENABLE
DO
update gameconfig set value=FLOOR(value*$percentage) where name='cap';
";
		$db->Execute("DROP EVENT reduce_cap;");
		$db->Execute($sql);
		operational_log(4,"捕鱼抽水修改",$_REQUEST);
		$info = "操作成功";
	}
}
include('../../include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>捕鱼抽水设置</title>
<style>p.a{padding-left:10px}</style>
</head>
<body>
<table width="99%" align=center cellspacing=1 cellpadding=3 border=0>
	<tr class=head>
		<td width='30%' align=center>捕鱼抽水设置</td>
	</tr>
</table>
<form action="" method="post">
<input type="hidden" name="type" value="save"/>
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
		<tr class="b"><td>每隔多少秒执行:  </td><td><input type="text" name="interval" value=""/>   <span>输入大于等于1的整数</span></td></tr>
		<tr class="b"><td>每次扣百分比:  </td><td><input type="text" name="percentage" value=""/>   <span>输入1到100之间的整数</span></td></tr>
		<tr class="b"><td colspan="2">  <input type="submit" value="-修改-" class="input_k" onclick="return confirm('确定要修改记录吗?')" /></td></tr>
    </table>
</form>

<?php if(!empty($info)):?>
<script>
alert('<?php echo $info?>');
</script>
<?php endif;?>

</body>
</html>
