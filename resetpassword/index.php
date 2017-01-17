<?php 
include("../include/header.inc.php");
include($app_path."include/level.func.php");
$user=checklogin();
$rs=$db->Execute("SELECT sum(viewernum) as num,showercateid FROM `shows` where endtime is null group by showercateid");
while($arr=$rs->FetchRow()){
	$showviewer[$arr['showercateid']]=$arr['num'];
}
$recommend_shows=$db->GetArray("select a.totalpoint,a.nickname,b.roomnumber,b.showcover,b.viewernum,b.starttime from shows b , user a where a.userid=b.userid and b.endtime is null order by b.isrecommend desc limit 24");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>美女主播、视频交友、美女视频、在线K歌</title>
<link href="/css/head.css" type="text/css" rel="stylesheet" />
<link href="/css/help.css" type="text/css" rel="stylesheet" />
<script src="/js/jquery.min.js" type="text/javascript"></script>

</head>
<body>
<br />
<br />
<br />
<div id="container">

<div class="mainbody">
<div class="help">
<p class="helptitle">重新设定密码</p>
<div class="forgetpass"> 
<ul>
<li><label for="email">请输入密码：</label><input type="password" class="forgetinput" id="pass"/></li>
<li><label for="email">再输入一次：</label><input type="password" class="forgetinput" id="repass"/></li>
<input type="hidden" id="token" value="<?php echo $_GET['token']?>">
<li>
  <input type="button" id="findbtn" value="提交" class="forgetbtn"/>
</li>
</ul>
</div>
</div>
</div>

</div>
<script>
$("#findbtn").click(function(){
	if($("#pass").val()!=$("#repass").val()){
		alert('您输入的密码不一致，请检查');
		return;
	}
	$.get("/ajax/resetpassword.php?password="+$("#pass").val()+"&token="+$("#token").val(),function(r){
		alert(r);
	});
});
</script>
</body>
</html>

