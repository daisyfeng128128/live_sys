<script>
var cdn_domain="<?php echo $page_var['cdn_domain']?>";
var money_name="<?php echo $page_var['money_name']?>";
var money_name2="<?php echo $page_var['money_name2']?>";
var site_skin="<?php echo $page_var['site_skin']?>";
//var IS_QQ="<?php echo $page_var['IS_QQ']?>";
var IS_QQ="0";//在新页面打开
var IS_SINGLE_MONEY="<?php echo IS_SINGLE_MONEY?>";
var site_live_skin="<?php echo $page_var['site_live_skin']?>";
</script>
<?php if($page_var['IS_QQ']):?>
<script src="/js/fancybox/jquery.fancybox.js?v=custom2.1.4"></script>
<link rel="stylesheet" type="text/css" href="/css/ext/jquery.fancybox.css?v=custom2.1.4" media="screen" />
<script src="http://fusion.qq.com/fusion_loader?appid=<?php echo $page_var['appid']?>&platform=qzone"></script>
<!--link rel="stylesheet" type="text/css" href="<?php echo $page_var['cdn_domain']?>/css/liveqq.css" media="screen" /-->
<style>
.login-box{display:none;}
</style>
<script>
$(function(){
	$("a[href^='/ucenter.php?ptype=pay']").fancybox({
		'width'				: 430,
        'autoScale'     	: false,
        'transitionIn'		: 'none',
		'transitionOut'		: 'none',
		'type'				: 'iframe',
		'helpers' : {
        'overlay' :null
        }
	});
	//$("a").attr("target","_self");
	onWinSizeChange();
});
var qzo_top=150;
var qzo_height=1750;
var clientRect = {
	top : 0,
	bottom : 700,
	left : 0,
	right : 760
};
if(typeof fusion2 !== "undefined"){
	fusion2.interface.updateClientRect(function(args){
		if(top != self){
			qzo_top=parseInt(args.top+150);
			qzo_height=1750;
			clientRect = args;
			onWinSizeChange();
		}
	});
}
function onWinSizeChange(){
	/*$(".taskPnl").css("top",(parseInt(clientRect.bottom-74-340))+"px");//任务弹出
	$("#taskPnlBtn").css("top",(parseInt(clientRect.bottom-62-16))+"px");//任务
	$("#bcbtn").css("top",(parseInt(clientRect.bottom-40))+"px");//发送喇叭
	$("#bcpop").css("top",(parseInt(clientRect.bottom-40-$("#bcpop").height()))+"px");//弹出发送喇叭
	$("#broadcast").css("top",(parseInt(clientRect.bottom-0-$("#broadcast").height()))+"px");//喇叭显示
	*/
}
</script>
<?php endif;?>
<?php if(true):?>
<div class="page_head">
	<div class="page">
		<div class="Prow head">
			<div id="top">
				<a class="logo pngfix" target="_blank" title="<?php echo $page_var['site_name']?>" href="/"> </a>
				<ul>
					<li><a class="deskico f_w" title="桌面图标" target="_blank" href="/download_shortcut.php?title=<?php echo urlencode($showinfo["nickname"])?>&roomid=<?php echo $roomnumber?>">+桌面图标</a></li>
					<li><em class="aile wicon"></em></li>
				</ul>
				
				<div class="right" id="topbar">
<?php if(!$user){?>
<div class="befor_login">
<div class="register">
	<a href="javascript:login.show()">登录</a> | 
	<a href="javascript:login.reg()">注册</a> | 
	<a href="/html/help.html" target="_blank">帮助</a>
</div>
</div>
<?php }else{?>
<div class="finished_login" id="hasLogin"> 
<!--个人信息--> 
<div class="fn_layout personalInfo"> 
<div class="fn_personl"> 
 <div class="fn_left"></div> 
 <div class="fn_center iewd"> 
  <p> <a target="_blank" id="tnickname" href="/ucenter.php"><span class="nickName" title="<?php echo $user['nickname']?>"><?php echo $user['nickname']?></span></a> <em class="arrows icons"></em> </p> 
 </div> 
 <div class="fn_right"></div> 
</div> 
<div class="clear"></div> 
<div class="fn_content w123 hide"> 
 <div class="fn_top topa pngfix"></div> 
 <div class="fn_middle topc pngfix"> 
  <ul> 
   <li class=""><a target="_blank" href="/ucenter.php"><em class="icon_myinfo icons"></em>我的资料</a></li> 
   <li><a target="_blank" href="/ucenter.php?ptype=clan"><em class="icon_myfam icons"></em>我的家族</a></li> 
   <li><a target="_blank" href="/ucenter.php?ptype=bill"><em class="icon_myorder icons"></em>我的账单</a></li> 
   <li><a target="_blank" href="/ucenter.php?ptype=myprops"><em class="icon_myprop icons"></em>我的道具</a></li> 
   <li><a target="_blank" href="/ucenter.php?ptype=car"><em class="icon_myrid icons"></em>我的座驾</a></li> 
   <li><a target="_blank" href="/ucenter.php?ptype=exchange"><em class="icon_myledou icons"></em>积分兑换</a></li> 
  </ul> 
 </div> 
 <div class="fn_bottom topa pngfix"></div> 
</div> 
</div> 
<!--昵称信息--> 
<div class="fn_layout"> 
<div class="fn_other"> 
 <div class="fn_left"></div> 
 <div class="fn_center"> 
  <em class="icon_nick icons"></em> 
 </div> 
 <div class="fn_right"></div> 
</div> 
<div class="fn_content w203 hide"> 
 <div class="fn2_top topa pngfix"></div> 
 <div class="fn2_middle topc pngfix"> 
  <p>账号：<span class="userAccout"><?php echo $user['email']?></span></p> 
  <p>昵称：<span class="nickName" title="<?php echo $user['nickname']?>"><?php echo $user['nickname']?></span></p> 
  <p>修改昵称：<input type="" value="" maxlength="20" id="editnickname" class="input100" /></p> 
  <p class="font_info">注：修改后，原昵称可能被抢注</p> 
  <div>
   <input type="submit" value="确 认" class="btn_sub btn_blue60 btns" onclick="Main.Room_editNickName();" id="editnicknamebtn" />
  </div> 
 </div> 
 <div class="fn2_bottom topa pngfix"></div> 
</div> 
</div> 
<!--在线信息--> 
<div class="fn_layout"> 
<div class="fn_other"> 
 <div class="fn_left"></div> 
 <div class="fn_center"> 
  <em class="icon_online icons"></em> 
 </div> 
 <div class="fn_right"></div> 
</div> 
<div class="fn_content hide"> 
 <div class="fn3_top topa pngfix"></div> 
 <div class="fn3_middle topc pngfix"> 
  <ul>
   <li style="text-align:center; "><a style="color:#ff6c00; text-decoration:underline;" target="_blank" href="/ucenter.php?ptype=history">我的关注主播</a></li>
  </ul> 
 </div> 
 <div class="fn3_bottom topa pngfix"></div> 
</div> 
</div> 
<div id="mailTopbox" class="fn_layout"> 
<div class="fn_other"> 
 <div class="fn_left"></div> 
 <div class="fn_center"> 
  <a target="_blank" href="/ucenter.php?ptype=mymailbox"><em class="icon_mail icons"><span class="icon_dotte icons" style="visibility: hidden;"></span></em></a> 
 </div> 
 <div class="fn_right"></div> 
</div> 
<div class="fn_content hide"> 
 <div class="fn3_top topa pngfix"></div> 
 <div class="fn4_middle topc pngfix"> 
  <div class="box_drop">
   <span class="icon_close icons"></span>
   <p>目前没有收到新消息</p> 
   <p style="display: none;"><span class="f_o"></span> 新信息，<a class="f_o" target="_blank" href="/ucenter.php?ptype=mymailbox">点击查看</a></p>
  </div> 
 </div> 
 <div class="fn3_bottom topa pngfix"></div> 
</div> 
</div>
<div class="fn_layout chargInfo">
<a title="充值" class="chargeLink" target="_blank" href="/ucenter.php?ptype=pay"><span class="xmoney icon"></span>&nbsp;<span id="xmoney" class="pngfix" title="金币"><?php echo $user['balance']?></span></a>
<?php if(!IS_SINGLE_MONEY):?>
<a title="积分兑换" target="_blank" href="/ucenter.php?ptype=exchange"><span class="xbeans icon"></span><span id="xbeans" class="pngfix" title="积分"><?php echo $user['point']?></span></a>
<?php endif;?>
</div>
<div class="fn_layout"> 
<ul class="font_area"> 
 <li><a target="_blank" class="chargeLink" href="/ucenter.php?ptype=pay">充值</a></li>
 <li>|</li>
 <li><a target="_blank" href="/market.php?roomnumber=<?php echo $roomnumber?>">商城</a></li>
 <li>|</li>
 <li><a target="_blank" href="/html/help.html">帮助</a></li> 
 <?php if(!$page_var['IS_QQ']):?>
 <li class="logout">|</li> 
 <li style="padding-right:0" class="logout"><a href="/login.php?action=logout&type=html">退出</a></li> 
 <?php endif;?>
</ul> 
</div> 
<div class="clear"></div> 
</div>
<?php }?>
</div>
			</div>
		</div>
	</div>
</div>
<?php endif;?>