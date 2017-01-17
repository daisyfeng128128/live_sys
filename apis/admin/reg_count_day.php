<?php 
header("Content-type:text/html;charset=utf-8");
include('head.php');
$rs=$db->CacheExecute(3600,"select * from `stat`.`reg_sum_by_hour` where `year`='{$_GET['year']}' and `month`='{$_GET['month']}' and `day`='{$_GET['day']}' order by `hour` desc");
include('../../include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
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
<a href="reg_count.php"> << 返回列表</a>&nbsp;<?php echo $_GET['year']?>-<?php echo $_GET['month']?>-<?php echo $_GET['day']?><br/><br/><br/>
<table width="500" cellspacing="1" cellpadding="3"  class=i_table>
  <tr class="header_1">
    <td width="43%" class="head">日期/时间</td>
    <td width="57%" class="head">注册数</td>
  </tr>
  <?php 
  while($arr=$rs->FetchRow()){
  ?>
  <tr class="b">
    <td width="43%"><?php echo $arr['hour']?>时</td>
    <td width="57%"><?php echo $arr['regnum']?></td>
  </tr>
  <?php 
  }
  ?>
</table>
</body>
</html>
