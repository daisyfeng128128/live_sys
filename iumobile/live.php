<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
/*if(strpos($_SERVER['HTTP_USER_AGENT'],'MSIE 6.0') !== false ){
    header("Location:/html/noie6.html");
}*/
include('../include/header.inc.php');
include($app_path."include/level.func.php");
$user=checklogin();
$roomnumber=(int)$_GET['roomnumber'];
if($roomnumber!=$user["usernumber"] && $user["email"]=="jusitest@163.com"){
	include("include/footer.inc.php");
	header("Content-Type: text/html; charset=UTF-8");
	echo "测试帐号只可以进自己的房间";
	exit;
}
/*
if($user && $roomnumber!=$user["usernumber"] && ($user['usernumber']<=10000 || $user['viplevel']==3 || ($user['yinshen_vailddate']>time()&&$user['yinshen']=="1"))){//运营号 黑vip号
	if(strpos($_SERVER['REQUEST_URI'],'hide')===false){
		header("Location:/html/ishide.php?roomnumber=".$roomnumber);
		include($app_path."include/footer.inc.php");
		exit;
	}
}*/
$ply_fn=$roomnumber;
//$blocklevel=$db->CacheGetOne(0,"select a.level from blacklist a,user b where a.roomnumber='$roomnumber' and a.userid=b.userid and (b.lastloginip='".ip2long($_SERVER['REMOTE_ADDR'])."' or a.userid='{$user['userid']}') and a.endtime>".time());
$blocklevel=$db->CacheGetOne(0,"select a.level from blacklist a,user b where a.roomnumber='$roomnumber' and a.userid=b.userid and (a.userid='{$user['userid']}') and a.endtime>".time());
$blocklevel=(int)$blocklevel;
if($blocklevel=="1"){
	include($app_path."include/footer.inc.php");
	header("Location:/html/block.html");
	exit;
}
//Read show info
$showinfo=$db->CacheGetRow(10,"select 
	a.*,
	b.starttime,b.id as showid,b.showtitle,b.sofa1num,b.sofa2num,b.sofa3num,b.sofa4num,b.sofa5num,b.sofa1userid,b.sofa2userid,b.sofa3userid,b.sofa4userid,b.sofa5userid,
	c.roomnumber as config_roomnumber,c.*,
	d.clanname ,d.medalname,d.clantype,d.leaderid,d.secondleaders
	from user a left join shows b on a.usernumber=b.roomnumber AND b.endtime IS NULL 
	left join room_config c on c.roomnumber=a.usernumber 
	left join clan d on d.clanid=a.clanid 
	where a.usernumber='$roomnumber' and b.endtime is null");
if(!$showinfo){
	include($app_path."include/footer.inc.php");
	header("Location:/html/noroom.html");
	exit;
}
include $app_path.'do_not_delete/livePwd.php';//判断房间是否设置密码
if($showinfo['shoufei']=="1" && $roomnumber!=$user['usernumber']){//此房间为收费房间
	if($creeent_acc_perm&$access_type["shoufei"]["value"]){//后台设置了此等级可以进
		echo null;
	}else{
		$room_shoufei = $db->GetOne("select id from room_shoufei where roomnumber='$roomnumber' and userid='{$user[userid]}'");
		if(!$room_shoufei){
			include($app_path."include/footer.inc.php");
			header("Location:/html/isshoufei.php?roomnumber=$roomnumber");
			exit;
		}
	}
}
//level exchange
$showinfo['starlevel']=point2star($showinfo['totalpoint']);
$showinfo['richlevel']=cost2rich($showinfo['totalcost']);
$rs=$db->CacheExecute(3600*24,"select * from gift order by giftcateid asc,giftid asc");
$giftId = $giftinfo = array();
while($arr=$rs->FetchRow()){
	$arr['class']=str_replace('.png','',$arr['giftimage']);
	$arr['class']=str_replace('.gif','',$arr['class']);

	$giftinfo[$arr['giftcateid']][]=$arr;
	$giftId[$arr["giftid"]] = $arr;
}
?><!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="target-densitydpi=device-dpi,width=640,height=1136,user-scalable=no">
<title><?php echo addslashes($showinfo['nickname'])?>的直播间 &ndash; <?php echo $page_var['site_name']?> 触屏版</title>
<link rel="stylesheet" href="<?php echo $page_var['cdn_domain']?>/iumobile/css/live.css?<?php echo time()?>">
<link rel="stylesheet" href="<?php echo $page_var['cdn_domain']?>/css/level.css"/>
<link rel="stylesheet" href="<?php echo $page_var['cdn_domain']?>/css/gift.css?<?php echo time()?>" type="text/css"/>
<script type="text/javascript">
var Room={};
var roomtype="<?php echo ($is_big_room)?"big":"small";?>";
var ctoken="<?php echo $_COOKIE['HFCOOKIE']?>";
var m2Number="<?php echo $showinfo['m2']?>";
var m3Number="<?php echo $showinfo['m3']?>";
var clan_leaderid="<?php echo $showinfo['leaderid']?>".split(",");
var clan_secondleaders="<?php echo $showinfo['secondleaders']?>".split(",");
var currentRoomNumber="<?php echo addslashes($roomnumber)?>";
var currentShowerid="<?php echo addslashes($showinfo[userid])?>";
var currentShowid="<?php echo addslashes($showinfo[showid])?>";
var currentShower="<?php echo addslashes($showinfo['nickname'])?>";
var currentShowstarlevel="<?php echo addslashes($showinfo['starlevel'])?>";
var currentUserNickname="<?php echo addslashes($user['nickname'])?>";
var currentUserID="<?php echo addslashes($user['userid'])?>";
var currentUserNumber="<?php echo addslashes($user['usernumber'])?>";
var currentUserEmail="<?php echo addslashes($user['email'])?>";
var sendGiftID=0;
var sendGiftNum=0;
var currentOptUid=0;
var currentOptUname="";
var currentChatTo="ALL";
var currentChatToJID="";
var sendGiftTo=currentShowerid;
var sendGiftToName=currentShower;
var roomAdmins="<?php echo addslashes($showinfo['room_admin'])?>".split(",");
var currentUserVipLevel="<?php echo addslashes($user['viplevel'])?>";
var _LUCK_MULT_ANN_="<?php echo $global_config_data['_LUCK_MULT_ANN_']?>";
var guestshow="<?php echo $global_config_data['guestshow']?>";
var _SWF_CONF_ADD_="<?php echo _SWF_CONF_ADD_?>";
var cdn_domain="<?php echo $page_var['cdn_domain']?>";
var money_name="<?php echo $page_var['money_name']?>";
var money_name2="<?php echo $page_var['money_name2']?>";
var site_skin="<?php echo $page_var['site_skin']?>";
</script>
<script src="<?php echo $page_var['cdn_domain']?>/js/jquery-1.7.2.min.js"></script>
<script src="<?php echo $page_var['cdn_domain']?>/js/face.js?<?php echo time()?>"></script>
<script src="<?php echo $page_var['cdn_domain']?>/iumobile/js/live.js?<?php echo time()?>"></script>
</head>
<body>
<div id="video" class="videotop">
<video src="http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8" width="640" height="480">
</div>
<div id="div_middle" class="div_middle">
	<ul class="tab mh">
		<li class="on" rel="chat_public">公聊</li>
		<li rel="chat_private">私聊</li>
		<li rel="u_people">观众</li>
		<li rel="baohe">宝盒</li>
	</ul>
	<div class="mb">
		<div class="tabpnls over_auto" id="chat_public" style="display: block;">
			<div class="taking">
				<ul id="pubChatList" class="chatList">
					<li class="fontred">14:47:欢迎<em class="zlevel zlv15"></em><a href="javascript:;" class="u" id="19843">阿冰.</a>进入房间</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:asd</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:fa</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:sdf</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:as</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:asd</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:fa</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:sdf</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:as</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:asd</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:fa</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:sdf</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:as</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:asd</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:fa</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:sdf</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:as</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:asd</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:fa</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:sdf</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:as</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:asd</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:fa</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:sdf</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:as</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:asd</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:fa</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:sdf</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:as</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:asd</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:fa</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:sdf</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:as</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:asd</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:fa</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:sdf</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:as</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:asd</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:fa</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:sdf</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:as</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:asd</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:fa</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:sdf</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:as</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:asd</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:fa</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:sdf</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:as</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:asd</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:fa</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:sdf</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:as</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:asd</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:fa</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:sdf</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:as</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:asd</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:fa</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:sdf</li>
					<li>14:47<em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>说:as</li>
					<li>14:47<em class="zlevel zlv15"></em>:<a id="19843" class="u" href="javascript:;">阿冰.</a>送 <em class="zlevel zlv15"></em><a id="19843" class="u" href="javascript:;">阿冰.</a>1个<img class="giftsmall gift_6_x_wap" src="/images/pixel.gif"></li>
				</ul>
			</div>
		</div>
		<div class="tabpnls over_auto" id="chat_private" style="display: none;">
			<div class="taking">
				<ul id="priChatList" class="chatList">
						<li><a href="javascript:;" class="u ush" id="19843">阿冰.</a> 对你说：<span style="color:#0"><a onclick="return islogin()" href="/ucenter.php?ptype=pay&amp;a=300001" target="_blank">来了加群在走</a></span></li>
						<li><a id="19843" class="u ush" href="javascript:;">阿冰.</a> 对你说：<span style="color:#0"><a target="_blank" href="/ucenter.php?ptype=pay&amp;a=300001" onclick="return islogin()">来了加群在走</a></span></li>
						<li style="">你对<em class="zlevel zlv15"></em><a href="javascript:;" class="u" id="19843">阿冰.</a>说：sdf</li>
						<li style=""><em class="zlevel zlv15"></em> <a href="javascript:;" class="u" id="19843">阿冰.</a>对你说：sdf</li><li style="">你对<em class="zlevel zlv15"></em><a href="javascript:;" class="u" id="19843">阿冰.</a>说：as</li><li style=""><em class="zlevel zlv15"></em> <a href="javascript:;" class="u" id="19843">阿冰.</a>对你说：as</li><li style="">你对<em class="zlevel zlv15"></em><a href="javascript:;" class="u" id="19843">阿冰.</a>说：d</li><li style=""><em class="zlevel zlv15"></em> <a href="javascript:;" class="u" id="19843">阿冰.</a>对你说：d</li><li style="">你对<em class="zlevel zlv15"></em><a href="javascript:;" class="u" id="19843">阿冰.</a>说：fasdf</li><li style=""><em class="zlevel zlv15"></em> <a href="javascript:;" class="u" id="19843">阿冰.</a>对你说：fasdf</li><li style="">你对<em class="level lv1"></em><a href="javascript:;" class="u" id="19837">刘刘</a>说：sss</li><li style="">你对<em class="level lv1"></em><a href="javascript:;" class="u" id="19837">刘刘</a>说：你好</li><li style="">你对<em class="level lv1"></em><a href="javascript:;" class="u" id="19837">刘刘</a>说：你好</li><li style="">你对<em class="level lv1"></em><a href="javascript:;" class="u" id="19837">刘刘</a>说：你好</li><li style="">你对<em class="level lv1"></em><a href="javascript:;" class="u" id="19837">刘刘</a>说：你好</li><li style="">你对<em class="level lv1"></em><a href="javascript:;" class="u" id="19837">刘刘</a>说：你好</li>
				</ul>
			</div>
		</div>
		<div class="tabpnls over_auto" id="u_people" style="display: none;">
		<?php include $app_path.'do_not_delete/liveUserListWap.php';//加载用户列表?>
		</div>
		<div class="tabpnls over_auto" id="baohe" style="display: none;">
			<div class="item_list"><a href="javascript:;" onClick="showSongRequestWin();ShowInfo('songDiv',this);"><img src="/iumobile/images/live/ico_song.png"/><span>点歌</span></a></div>
			<div class="item_list"><a href="javascript:;" onClick="ShowInfo('bcpop',this);"><img src="/iumobile/images/live/ico_announce.png"/><span>发公告</span></a></div>
		</div>
		 
	</div>
</div>
<div id="div_footer" class="div_footer">
	<div class="toolbar1">
		<div class="selectdiv">
			<select id="dstUser">
				<option value="">所有人</option>
			</select>
		</div>
		<label for="whisper">
			<img class="checkbox_bg" onClick='' src="/images/pixel.gif"/>
			<input type="checkbox" id="whisper" disabled="true">
			<span class="input"></span>
			<span>悄悄</span>
		</label>
		<div id="ribbon" class="ribbonBtn"><img src="/iumobile/images/live/ico_caitiao.png"/><span>发彩条</span>
			<div style="display:none;" class="ribbonBox" id="ribbons">
				<a rel="1" href="javascript:;">非常好听</a>
				<a rel="2" href="javascript:;">你真棒！</a>
				<a rel="3" href="javascript:;">冒个泡</a>
				<a rel="4" href="javascript:;">加油</a>
				<a rel="5" href="javascript:;">啪啪啪</a>
				<a rel="6" href="javascript:;">太强悍了</a>
				<a rel="7" href="javascript:;">太感动了</a>
				<a rel="8" href="javascript:;">好</a>
				<a rel="9" href="javascript:;">赞</a>
				<a rel="10" href="javascript:;">真好听</a>
			</div>
		</div>
		<a href="javascript:void(0);" id="selGiftBtn"><img src="/iumobile/images/live/ico_giftbtn.png"/><span>送礼物</span></a>
	</div>
	<div class="toolbar2">
		<div id="msgFace"><img src="/iumobile/images/live/ico_facebtn.png"/><div id="faces" class="" style="display:none;"></div></div>
		<input type="text" class="tex txt" id="msgContent" value="" maxlength="200" name="msgContent">
		<button id="sendChatBtn" onClick='Room.flyScreen($("#msgContent").val());'>发言</button>
	</div>
</div>
<?php include $app_path.'do_not_delete/liveGiftsInfoWap.php';//加载礼物信息?>
<div id="tinymask" style="height: 100%; opacity: 0.5; display: none; width: 100%;"></div>
<div style="display:none;" class="toggleBox ShowInfo" id="bcpop">
	<a href="javascript:;" class="show_title">发布公告</a><span class="show_title_close">X</span><hr/>
	<div class="text-center padding2">
		<div id="msgFaceAnn"><img src="/iumobile/images/live/ico_facebtn.png" class="smileyBtnAnn"/><div id="facesAnn" class="" style="display:none;"></div></div>
		<input type="text" class="input_style" id="bcText" value="" data-role="none" placeholder="50个字以内，每次<?php echo $giftId[65]["giftprice"]?><?php echo $page_var['money_name']?>！" x-webkit-speech="" style="width:86%;">
	</div>
<hr/>
<div class="btn2"><a href="javascript:;">确定</a></div>
	<div class="clear"></div>
</div>
<div style="display:none;" class="toggleBox ShowInfo" id="songDiv">
	<a href="javascript:;" class="show_title">点歌</a><span class="show_title_close">X</span>
	<div class="content2" style="height:400px;"></div>
	<div class="clear"></div>
</div>
<div style="display:none;" class="toggleBox" id="userMenu">
	<div class="user"><img src="/images/pixel.gif"/><h5></h5></div>
	<ul>
		<li><a id="say_pub" href="javascript:;"><img src="/iumobile/images/live/ico_pub.png"/><label>公聊</label></a></li>
		<li><a id="say_pri" href="javascript:;"><img src="/iumobile/images/live/ico_pub.png"/><label>私聊</label></a></li>
		<li><a id="sendGift" href="javascript:;"><img src="/iumobile/images/live/ico_gift.png"/><label>送礼</label></a></li>
	</ul>
</div>
</body>
</html><?php include($app_path."include/footer.inc.php");?>