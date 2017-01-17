<?php 
header("Content-type:text/html;charset=utf-8");
include('head.php');
$today=strtotime(date('Y-m-d').' 00:00:00');

$today_down_ios=(int)$db->GetOne("select count(id) from phone_download_statistics where addtime>=$today and `type`=1");
$today_down_android=(int)$db->GetOne("select count(id) from phone_download_statistics where addtime>=$today and `type`=2");

$down_ios=(int)$db->GetOne("select count(id) from phone_download_statistics where `type`=1");
$down_android=(int)$db->GetOne("select count(id) from phone_download_statistics where `type`=2");


include('../../include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>手机应用下载统计</title>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
</head>
<body>
<br />
<div style="color:red">现在是<?php echo date("Y-m-d H点i分s秒");?></div>
<table width="500" cellspacing="1" cellpadding="3"  class=i_table>
  <tr class="b">
    <td><font color="red">今日下载次数</font></td>
    <td><?php echo $today_down_ios+$today_down_android;?>    (ios:<?php echo $today_down_ios;?>，android:<?php echo $today_down_android;?>)</td>
  </tr>
  <tr class="b">
    <td><font color="red">总下载次数</font></td>
    <td><?php echo $down_ios+$down_android;?>    (ios:<?php echo $down_ios;?>，android:<?php echo $down_android;?>)</td>
  </tr>
</table>
</body>
</html>