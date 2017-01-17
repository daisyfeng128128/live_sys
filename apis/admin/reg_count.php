<?php 
header("Content-type:text/html;charset=utf-8");
include('head.php');
$today=strtotime(date('Y-m-d').' 00:00:00');
$today_reg=$db->GetOne("select count(userid) from user where regtime>=$today");
$today_login=$db->GetOne("select count(userid) from user where lastlogin>=$today");
$current_count_sum=$db->GetOne("select count(userid) from show_users");//当前在线
$current_count=$db->GetOne("select count(s.userid) from show_users s,user u where u.userid=s.userid and accountfrom!=9");//当前在线
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
<div style="color:red">现在是<?php echo date("Y-m-d H点i分s秒");?></div>
<table width="500" cellspacing="1" cellpadding="3"  class=i_table>
  <tr class="head_1">
    <td width="43%">日期/时间</td>
    <td width="57%">注册数</td>
  </tr>
  <tr class="b">
    <td><font color="red">今日注册</font></td>
    <td><?php echo $today_reg?></td>
  </tr>
  <tr class="b">
    <td><font color="red">今日登陆</font></td>
    <td><?php echo $today_login?></td>
  </tr>
    <tr class="b">
    <td><font color="red">当前在线人数</font></td>
    <td style="color:red;"><?php echo $current_count?></td>
  </tr>
    <tr class="b">
    <td><font color="red">当前机器人在线数</font></td>
    <td><?php echo $current_count_sum-$current_count?></td>
  </tr>
</table>
</body>
</html>
