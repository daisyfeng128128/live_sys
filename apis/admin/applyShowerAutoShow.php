<?php 
header("Content-type:text/html;charset=utf-8");
include('head.php');
$roomnumber = (int)$_GET["roomnumber"];
if(empty($roomnumber)){
	$roomnumber="";
}
//$db->debug = true;
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>判断主播为什么不在首页显示</title>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
</head>
<body class="pageexplain">
<br />
<div style="color:red">现在是<?php echo date("Y-m-d H点i分s秒");?></div>
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr><td class=head colspan="2"><b>判断主播为什么不在首页显示</b></td></tr>
	<form>
	<tr class="b">
	<td width="5%">房间号</td>
	<td><input type="text" name="roomnumber" id="roomnumber" value="<?php echo $roomnumber?>"/><em style="color: red;">请准确输入房间号</em></td>
	</tr>
	<tr>
	<td>
	    <input type="submit" class="input_k" value="-判断-"/>
	</td>
	</tr>
	</form>
</table>
<?php if($roomnumber){?>

		<?php if(empty($roomnumber)):?>
		<p class="red">请准确输入房间号</p>
		<?php else:?>
		<p>房间号：<?php echo $roomnumber?><p/>
		<?php endif;?>

		<?php 
		$user = $db->GetRow("select * from user where usernumber='$roomnumber'");
		if(empty($user)):?>
		<p class="red">输入的房间号对应的主播不存在,<span class="green">可能主播更换过靓号,查找主播当使用的靓号(道具管理->靓号查询)</span></p>
		<?php else:?>
		<p>主播昵称：<?php echo $user["nickname"]?><p/>
		<?php endif;?>

		<?php 
		$applysign = $db->GetRow("select * from bu_user_anchors where userid='$user[userid]'");
		if(empty($applysign)){?>
		<p class="red">此主播未签约,<span class="green">主播登录后，在首页右上角，点击签约(或都管理员在后台给主播签约,主播管理->添加签约主播)</span></p>
		<?php }else if($applysign['pass']==0){?>
		<p class="red">此主播签约未通过,<span class="green">在后台，主播管理,中找到此主播,在操作栏中，点击通过审核</span></p>
		<?php }?>

		<?php 
		$shows = $db->GetRow("select * from shows where roomnumber='$roomnumber' ORDER BY id desc");
		if(empty($shows)){?>
		<p class="red">此房间没有直播过,<span class="green">主播开始直播</span></p>
		<?php }else if(empty($shows['showcover'])){?>
		<p class="red">此房间没有上传封面,<span class="green">主播直播时上传封面（或在后台主播管理中，找到对应的主播，上传封面）</span></p>
		<?php }else if(!empty($shows['lastdisconnect']) && empty($shows['endtime'])){?>
		<p class="red">此房间已经与聊天服务器断开,<span class="green">主播直播时与聊天服务器断开了，请主播刷新页面，再次开播</span></p>
		<?php }else if(!empty($shows['endtime'])){?>
		<p class="red">此房间尚未开播,<span class="green">主播开始直播</span></p>
		<?php }?>

		<?php 
		$viewernum_count = $db->GetRow("select * from viewernum_count where roomnumber='$roomnumber'");
		if(empty($viewernum_count)):?>
		<p class="red">此房间没有人,<span class="green">开播后,最多等一分钟即可,如果1分钟后还没有显示，则说明是网站定时任务没有开启</span></p>
		<?php endif;?>
		<hr/>
		<p>上面的<span class="red">红色字体</span>是主播不在首页显示的原因，如果没有红色字体，则主播在首页显示</p>
		<p><span class="green">绿色字体</span>是对应的解决方法，请<span class="red bold">从上到下逐条解决</span></p>
		
<?php }?>

<br/>
</body>
</html><?php include('../../include/footer.inc.php');?>