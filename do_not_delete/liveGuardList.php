<div id="guardList" class="guardList">
<div class="title"><span class="spantitle">贵宾区<label> (<span class="guard_online_count">0</span>/<span class="guard_all_count">0</span>)</label></span><a class="open_guard" target="_blank" href="/market.php?roomnumber=<?php echo $roomnumber?>#tab=4">开通守护</a></div>
<ul class="scollAutoHide" id="ulGuardList"></ul>
</div>
<script>
$(function(){
	getGuardList();
});
function getGuardList(){
	$("#ulGuardList").load("/ajax/get_guard_list.php", {roomnumber: currentRoomNumber}, function(){
		$("#guardList .guard_all_count").html($("#ulGuardList li").length);
		$("#guardList .guard_online_count").html($("#ulGuardList li").not(".offLine").length);
		<?php if($current_user_guard)://如果当前用户已经开了，就隐藏?>
		$("#guardList .open_guard").hide();
		<?php endif;?>
	});
}
//守护用户进出
function GuardInOut(type,userid){
	var c = $("#UguardList"+userid);
	if(!c.is("li")){
		return false;
	}
	var gtmp1 = c.html();
	c.remove();
	if(type=="in"){
		$("#ulGuardList").prepend('<li id="UguardList'+userid+'">'+gtmp1+'</li>');
	}else if(type=="out"){
		$("#ulGuardList").append('<li id="UguardList'+userid+'" class="offLine">'+gtmp1+'</li>');
	}
	$("#guardList .guard_online_count").html($("#ulGuardList li").not(".offLine").length);
}
</script>