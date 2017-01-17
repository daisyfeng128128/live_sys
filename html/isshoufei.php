<?php 
include("../include/header.inc.php");
$roomnumber = (int)$_GET['roomnumber'];
$showinfo = $db->GetRow("select * from user where usernumber='{$roomnumber}'");
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>美女主播、视频交友、美女视频、在线K歌</title>
<script type="text/javascript" src="<?php echo $page_var['cdn_domain']?>/js/jquery-1.7.2.min.js"></script>
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
<!--收费房 --> 
<?php 
$shoufei_price = $db->CacheGetOne(60,"select giftprice from gift where giftid='8000'");
?>
<script>
var shoufei_price = <?php echo $shoufei_price?>;
var shoufei_userid = '<?php echo $showinfo['userid']?>';
$(function(){
	$("#shoufei_buy_button").click(function(){
		if(shoufei_userid==0||shoufei_userid==""){
			return false;
		}
		if(!confirm('确认购买吗？这将共花费'+shoufei_price+'<?php echo $page_var['money_name']?>')){
			return false;
		}
		$.get("/ajax/buy_shoufei.php?shoufei_userid="+shoufei_userid, function(data){
			alert(data);
			if(data=="恭喜您，购买成功！"){
				window.location.href='/<?php echo $roomnumber;?>.html';
			}
		});
	});
});
</script>
</head>

<body>
<div class="noroom">
<div class="txfont">此房间为收费房间，请先购买.<br />
  <a href="javascript:;" id="shoufei_buy_button">立即购买</a> <a href="/" target="_self">返回首页</a></div>
</div>
</body>
</html>
<?php include($app_path."include/footer.inc.php");?>