<?php
include("../../include/header.inc.php");
file_put_contents(("data/return_url4.".date("YmdHis").".".rand(1, 100)), json_encode($_REQUEST));
$_TransID =$_REQUEST['TransID'];//流水号
$_factMoney=$_REQUEST['money'];//实际成交金额
$_time=$_REQUEST['time'];//实际成交金额
$_Sign=$_REQUEST['Sign'];//实际成交金额
$_WaitSign=md5(md5($_TransID.$_time));

if ($_Sign == $_WaitSign) {
  $r6_Order=substr($_TransID,5);
  $r3_Amt=$_factMoney;
  $r2_TrxId=$_time;
  //处理想处理的事情，验证通过，根据提交的参数判断支付结果
  payOrdersDeal($r6_Order,$r3_Amt,$r2_TrxId);
//   echo 'ok';
} 
 else {
  exit ("Fail");
   //处理想处理的事情
}
include('../../include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo $page_var['site_name']?>－美女主播、视频交友、美女视频、在线K歌</title>
<meta name="description" content="<?php echo $page_var['site_name']?>是超人气视频直播互动娱乐社区，在这里你可以展示自己的才艺，也可以跟众多优秀的美女主播在线互动聊天、视频交友" />
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
-->
.noroom{ width:542px; margin:200px auto; background:url(/images/payseccess.gif) no-repeat; height:202px}
.txfont{  margin-left:150px;width:350px; line-height:40px; padding-top:80px}
.txfont a{ color:#F06}
</style>
</head>

<body>
<div class="noroom">
<div></div>
<div class="txfont">恭喜您支付成功！<br />
  如果您的浏览器没有自动跳转，请<a href="http://<?php echo _MAIN_DOMAIN_?>">点击这里</a></div>
</div>
</body>
</html>