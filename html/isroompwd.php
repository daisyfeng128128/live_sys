<?php 
include('../include/header.inc.php');
$roomnumber=(int)$_GET['roomnumber'];
if(isset($_POST["room_config_pwd"])){
	$pwd = $db->GetOne("select pwd from room_config where roomnumber='{$roomnumber}'");
	if($pwd==$_POST["room_config_pwd"]){
		setcookie("roompwd".$roomnumber,$pwd,(time()+3600*24*365),'/',_COOKIE_DOMAIN_);
		echo '<script>parent.location="/'.$roomnumber.'.html?hide=1";</script>';
	}else{
		echo '<script>alert("密码不正确");</script>';
	}
	include('../include/footer.inc.php');
	exit;
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
<div class="txfont">请输入(<?php echo $roomnumber?>)房间密码:<br />
<iframe width="0" height="0" style="display:none" name="ipost"></iframe>
<form action="?roomnumber=<?php echo $roomnumber?>" method="post" target="ipost">
<input type="text" name="room_config_pwd">
<input type="submit" value="提交"/>
</form>
</div>
</div>
</body>
</html>
<?php 
include('../include/footer.inc.php');
?>
