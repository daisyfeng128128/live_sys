<?php 
include('../include/header.inc.php');
$roomnumber=(int)$_GET['roomnumber'];
$user=checklogin();
if($user && ($user['usernumber']<=10000 || $user['viplevel']==3 || ($user['yinshen_vailddate']>time()&&$user['yinshen']=="1"))){//运营号 黑vip号
	if($_GET['action']=='hide'){
		$db->Execute("insert into hideself(roomnumber,userid)values('$roomnumber','$user[userid]')");
		header("Location:/$roomnumber.html?hide=1");
		include('../include/footer.inc.php');
		exit;
	}else{
		$db->Execute("DELETE from hideself where roomnumber='$roomnumber' and userid='$user[userid]'");
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>美女主播、视频交友、美女视频、在线K歌</title>
<meta name="description" content="超人气视频直播互动娱乐社区，在这里你可以展示自己的才艺，也可以跟众多优秀的美女主播在线互动聊天、视频交友" />
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
-->
.noroom{ width:542px; margin:200px auto; background:url(/images/noroom.gif) no-repeat; height:202px}
.txfont{  margin-left:150px;width:350px; line-height:40px; padding-top:80px;}
.txfont a{ color:#F06}
</style>
</head>

<body>
<div class="noroom">
<div class="txfont">请选择进入房间的方式？<br />
  <a href="?action=hide&roomnumber=<?php echo $roomnumber?>" target="_self">悄悄的进</a> <a href="/<?php echo $roomnumber?>.html?hide=1" target="_self">光明正大的进</a></div>
</div>
</body>
</html>
<?php 
include('../include/footer.inc.php');
?>
