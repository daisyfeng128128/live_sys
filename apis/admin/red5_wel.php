<?php include('head.php');?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>欢迎您进入管理后台</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script src="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.css">
<script>
$(function(){
});
</script>
</head>
<body style="padding:20px 10px;">
<h1>欢迎您进入管理后台！</h1>
<div class="pageexplain">下面是对后台的部分功能介绍:</div>
<h3>网站配置</h3>
<div class="pageexplain">
可修改网站的标题，上传网站的LOGO等等信息，请打开此页面查看，有对应的说明。
</div>

<h3>用户管理</h3>
<div class="pageexplain">
显示所有的用户,找到对应的用户可以禁用(禁用后，用户无法登录)/激活用户，修改密码，也可以在设置里，设置用户的等级加红包，更改所属家族，代理等等。
</div>

<h3>主播管理</h3>
<div class="pageexplain">
显示所有的主播，可以将主播的状态修改为审核通过(可以播放视频)/未通过(不可以播放视频)。
上传封面：是设置首页列表中显示的图片，设置完成后，主播以后每将开播就不需要每次上传封面了。
<p class="red">如果主播没有在首页显示，请到，主播管理->判断主播为什么不在首页显示,查看原因</p>
</div>

<h3>主播靓号修改</h3>
<div class="pageexplain">
主播如果更换了靓号，则应到这里提交一下。这个功能是更新主播用旧靓号直播过的数据。如果主播更换了新的靓号，没有在这里修改，则首页同一个主播可能会显示两次。
</div>

<h3>充值消费</h3>
<div class="pageexplain">
显示用户<?php echo $page_var['money_name']?>变更记录。可以通过筛选条件组合查出用户<?php echo $page_var['money_name']?>变更的记录。
</div>

<h3>充值记录</h3>
<div class="pageexplain">
显示用户所有充值记录(包括未成功的)。可以通过筛选条件组合统计充值情况(如需要查2014年12月11日用支付宝共充了多少钱：在搜索条件中这样查，充值日期输入2014-12-11到2014-12-11，充值渠道选择支付宝，	状态选择交易成功，点击查询，列表中会列出所有符合条件的记录,在列表标题中会显示共充值了多少钱，多少<?php echo $page_var['money_name']?>)。
</div>

</body>
</html><?php include('../../include/footer.inc.php');?>