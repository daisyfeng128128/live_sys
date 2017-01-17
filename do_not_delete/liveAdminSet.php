<?php if($self){//如果是主播显示房间设置 ,下面的#pMain是ie7下主播设置乱问题?>
		<div id="ownerToolsBar" class="head_toolspnl_bottom pngfix">
			<div class="col menubg sbgl"></div>
			<div class="col menubg sbgc">
				<div class="col f14 f_o"><h1><?php echo $showinfo["nickname"]?></h1><span> ~~</span></div>
				<div class="p colr mgr f14">
				<span class="ownerTools">
				<a class="admBtn" id="adm1" href="javascript:;">房间公告</a>
				<!--a class="admBtn" id="adm2" href="javascript:;">直播信息</a-->
				<a class="admBtn" id="adm6" href="javascript:;">房间装饰</a>
				<!--a class="admBtn" id="adm5" href="javascript:;">相册管理</a-->
				<a class="admBtn" id="addsongBtn" href="javascript:;">歌单管理</a>
				<a target="_blank" href="/html/signing.html">申请签约主播</a>
				<a target="_blank" href="/html/help.html">直播帮助</a>
				</span>
				</div>
			</div>
			<div class="colr menubg sbgr"></div>
		</div>
		<div class="clear"></div>
<!--admin menu-->
<div class="adminmenu">

<div class="setupbox box1 toggleBox boxposition_1 tip-yellow"><div class="tip-inner tip-bg-image"><div class="notesSetCon roomset"><span class="arrow"></span>
	<span class="arrow"></span><h3>设置房间公告(公聊区置顶)</h3>
	<textarea onfocus="if(this.innerHTML=='请输入文字，不超过40个字。')this.innerHTML=''; this.style.color='black'" maxlength="80" id="in_pubann"><?php if(empty($showinfo['public_announce']))echo "请输入文字，不超过40个字。";else echo $showinfo['public_announce'];?></textarea>
	<input id="in_publink" value="<?php if(empty($showinfo['public_link']))echo "公告的链接地址";else echo $showinfo['public_link'];?>" onfocus="if(this.value=='公告的链接地址')this.value='http://'; this.style.color='black'" type="text"><br>
	<h3>设置私聊留言（显示在私聊区）</h3>
	<textarea onfocus="if(this.innerHTML=='请输入文字，不超过40个字。')this.innerHTML=''; this.style.color='black'" maxlength="80" id="in_priann"><?php if(empty($showinfo['private_announce']))echo "请输入文字，不超过40个字。";else echo $showinfo['private_announce'];?></textarea>
	<input id="in_prilink" value="<?php if(empty($showinfo['private_link']))echo "私聊留言链接地址";else echo $showinfo['private_link'];?>" onfocus="if(this.value=='私聊留言链接地址')this.value='http://'; this.style.color='black'" type="text"><br/>
	<button type="button" id="saveAnnounceBtn" class="btns btn_blue60">提交</button>
</div><div class="clear"></div></div><div class="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left"></div></div>

<div class="setupbox box6 toggleBox boxposition_6 tip-yellow"><div class="tip-inner tip-bg-image"><div class="roomset"><span class="arrow"></span>
	<div class="boxbody">背景图片<input type="radio" class="bgattachbtn" name="bgattach" value="fixed" />固定<input class="bgattachbtn" type="radio" name="bgattach" value="scroll" />滚动
		<form action="roomactions.php?action=uploadbg" method="post" enctype="multipart/form-data" target="ipost">
		<input type="file" id="ifile" name="picupload"><input type="submit" value="上传">
		</form>
	</div>
</div><div class="clear"></div></div><div class="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left"></div></div>
</div>
<!--end adminmenu-->
<script type="text/javascript">
<!--
$(function(){
	$("#addsongBtn").click(function() {
		if(IS_QQ=="1"){
			art.dialog.open('/addsong.php?roomnumber='+currentRoomNumber, { 
				title:'维护歌单',
				lock:true, 
				top:qzo_top, 
				width:505, 
				height:400, 
				opacity:.1 
			});
		}else{
			art.dialog.open('/addsong.php?roomnumber='+currentRoomNumber, { 
				title:'维护歌单',
				lock:true, 
				width:505, 
				height:400, 
				opacity:.1 
			});
		}
	});
});
//-->
</script>
<?php }?>