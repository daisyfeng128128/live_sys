<?php 
include('head.php');
header("Content-type:text/html;charset=utf-8");
// $db->debug = true;
if($_GET['action8']=='close'){
	$roomnumber=(int)$_GET['roomnumber'];
	$db->Execute("update shows set endtime='".time()."' where endtime is null and roomnumber='$roomnumber'");
	$db->Execute("update user set isshowing=0 where usernumber='$roomnumber'");
	$db->Execute("delete from show_users where usernumber=$roomnumber and roomnumber=$roomnumber");
	
	require_once($app_path."include/login.func.php");
	require_once($app_path."tools/Rtmp/RtmpClient.class.php");
	$userinfo = $db->GetRow("select * from user where usernumber='10000'");
	$userinfo["token"] = logincookie($userinfo);
	$client = new RtmpClient();
	//到房间发句end
	$client->connect(_RTMP_DOMAIN_,(_RTMP_DOMAIN_APP_."/".$roomnumber),_RTMP_PORT_,array($userinfo["nickname"],$userinfo["token"],$userinfo["usernumber"],$userinfo["userid"],"quit"));
	$arr_value = array("ALL","END");
	$client->call("sendMessage",$arr_value);
	$client->close();
	
	if(function_exists("operational_log")){
		$opt_userid = $db->GetOne("select * from user where usernumber='{$roomnumber}'");
		operational_log(6,"房间监控关闭房间roomnumber:{$roomnumber}",$_REQUEST,$opt_userid);	
	}
}else if($_GET['action8']=='closesmall'){
	$roomnumber=(int)$_GET['roomnumber'];
	if($_GET['arrange']=="2"){
		$db->Execute("update room_config set m2='-1' where roomnumber='$roomnumber'");
	}else if($_GET['arrange']=="3"){
		$db->Execute("update room_config set m3='-1' where roomnumber='$roomnumber'");
	}
	if(function_exists("operational_log")){
		$opt_userid = $db->GetOne("select * from user where usernumber='{$roomnumber}'");
		operational_log(6,"房间监控关闭小房间roomnumber:{$roomnumber},{$_GET['arrange']}麦",$_REQUEST,$opt_userid);
	}
}
$all=$db->GetArray("select a.totalpoint,a.nickname,b.roomnumber,b.showcover,c.num as viewernum,b.starttime,b.endtime,r.is_big_room,r.m2,r.m3
from shows b , user a,viewernum_count c ,bu_user_anchors p,room_config r
where a.userid=p.userid and a.isblock<>1 and b.roomnumber=c.roomnumber and b.lastdisconnect is null and a.userid=b.userid and b.endtime is null 
and r.roomnumber=b.roomnumber order by c.num asc");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>正在直播所有房间</title>
<style>
ul.wall{margin-top:10px;}
ul.wall li{
	font-size:12px;
	float:left;
	margin-left:5px;
	border:1px solid #000;
	padding-left:5px;
	list-style:none;
	height:300px;
	width: 200px;
}
.table_a{display:block;}
.liisbig0{height: 230px !important;padding-top: 70px;}
.liisbig1{}
</style>
</head>
<body screen_capture_injected="true">
<p style="color:red">
<br/>注：下列视频居中为小房间，距顶部为大房间
</p>
<div id="tagContent">
<?php if(empty($all)){
	echo "<h1>当前没有用户在直播</h1>";
}else{?>
<ul class="wall">
<?php
foreach ($all as $value):?>
<li class="liisbig<?php echo $value['is_big_room']?>">
			<?php echo showSWF($value['roomnumber']);?>
				<br><?php echo $value['nickname']?> <br> <a href="/<?php echo $value['roomnumber']?>.html" target="_blank">进入房间</a> | <a href="?action8=close&roomnumber=<?php echo $value['roomnumber']?>">关闭</a>
				<br/>房间号: <?php echo $value['roomnumber']?>
<?php if($value['is_big_room']=="1")://是大房间?>
<table width="100%"><tr><td valign="top" width="50%">
	<?php if($value['m2']!="-1" && !empty($value['m2'])):?>
		<?php echo showSWF($value['m2'],90,69);?>
		<a class="table_a" href="?action8=closesmall&roomnumber=<?php echo $value['roomnumber']?>&arrange=2">关闭2视频</a>
	<?php endif;?>
</td><td valign="top" width="50%">
	<?php if($value['m3']!="-1" && !empty($value['m3'])):?>
		<?php echo showSWF($value['m3'],90,69);?>
		<a class="table_a" href="?action8=closesmall&roomnumber=<?php echo $value['roomnumber']?>&arrange=3">关闭3视频</a>
	<?php endif;?>
</td></tr></table>
<?php endif;?>
</li>
<?php endforeach;?>
</ul>
<?php }?>
</div>
</body>
</html>
<?php function showSWF($roomnumber,$w=180,$h=138){?>
<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="<?php echo $w?>" height="<?php echo $h?>" id="player" align="middle">
					<param name="movie" value="/static_data/swf/player.swf?a4" />
					<param name="flashvars" value="chat=0&roomnumber=<?php echo $roomnumber?>&fn=<?php echo $roomnumber?>&confadd=<?php echo _SWF_CONF_ADD_?>">
					<param name="quality" value="high" />
					<param name="wmode" value="opaque" />
					<param name="allowScriptAccess" value="always" />
					<!--[if !IE]>-->
					<object type="application/x-shockwave-flash" data="/static_data/swf/player.swf?a4" id="player" width="<?php echo $w?>" height="<?php echo $h?>">
						<param name="movie" value="/static_data/swf/player.swf?a4" />
						<param name="flashvars" value="chat=0&roomnumber=<?php echo $roomnumber?>&fn=<?php echo $roomnumber?>&confadd=<?php echo _SWF_CONF_ADD_?>">
						<param name="quality" value="high" />
						<param name="wmode" value="opaque" />
						<param name="allowScriptAccess" value="always" />
					<!--<![endif]-->
						<a href="http://www.adobe.com/go/getflash">
							<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" />
						</a>
					<!--[if !IE]>-->
					</object>
					<!--<![endif]-->
				</object>
<?php }?>
<?php include('../../include/footer.inc.php');?>