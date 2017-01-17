<div id="ulist" class="col ulist">
	<div class="mh">
		<ul class="tab">
			<li rel="u_manager" class="n1"><a class="col" href="javascript:;"><span> </span>管理<span class="managerNum" id="adminnum">1</span></a></li>
			<li style="width:9px;cursor:inherit"></li>
			<li rel="u_people" class="n2 on"><a class="col" href="javascript:;"><span> </span>观众<span id="usernum">1</span></a></li>
		</ul>
	</div>
	<div id="ulistMb" class="mb scollAutoHide" style="overflow: hidden;">
		<div style="display:none" id="u_manager">
			<div><ul class="userList muserList" id="adminList">
			<li class="stlth0" id="p<?php echo $showinfo['userid']?>"><p></p><p class="u"><a href="javascript:;"><?php echo $showinfo['nickname']?></a></p></li>
			<!--li class="stlth0" id="m369652224"><p></p><p class="u"><a href="javascript:;"><?php echo $showinfo["nickname"]?></a></p></li-->
			</ul></div>
		</div>
		<div id="u_people">
			<div>
				<ul class="userList puserList" id="userList">
				
<?php
if($showinfo['usertype']==7)
	$orderinfo .='<img src="/img/lvv2/7.png" alt="代理"/>&nbsp;';
if($showinfo['usertype']==6)
	$orderinfo .='<img src="/img/lvv2/6.png" alt="客服"/>&nbsp;';
if($showinfo['usertype']==8)
	$orderinfo .='<img src="/img/lvv2/8.png" alt="运营"/>&nbsp;';
if($showinfo['viplevel']!=0)//VIP
	$orderinfo .='<img class="vip'.$showinfo[viplevel].'" src="/images/pixel.gif" alt="VIP特权"/>&nbsp;';
if($showinfo[medalname])
	$orderinfo .='<span onClick="window.open(\'/go.php?action=clanbyuid&userid='.$showinfo[userid].'\')" target="_blank" title="访问家族"><em class="famhuiz'.$showinfo[clantype].'">'.$showinfo[medalname].'</em></span>';
?>
				
				
				<li class="p" id="p<?php echo $showinfo['userid']?>">
				<div class="col avatar40"><img src="<?php echo $page_var['cdn_domain']?>/static_data/uploaddata/avatar/<?php echo substr($showinfo['userid'],0,1)?>/<?php echo $showinfo['userid']?>.gif"><span class="icon mdiPC"></span></div>
				<div class="col uInfo"><p><em class="zlevel zlv<?php echo $showinfo['starlevel']?>"></em><span class="lkn"><?php echo $showinfo['usernumber']?></span></p><p class="u"><?php echo $orderinfo?><span class="icon hz hz0"></span>
				<span class="icon hz hz0"></span><a href="javascript:;"><?php echo $showinfo["nickname"]?></a></p></div>
				</li>
				
				</ul>
				<ul class="userList vuserList" id="vuserList" style="display:none;"></ul>
				<div class="pngfix" id="getMoreUser"  style="display:none;"></div>
				<div  style="display:none;" id="yuserList"><div><p>游客<span id="yuserNum">0</span>人</p></div></div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
</div>
<script>
//排序，vip*100+级别
//o.orderbyjs = parseInt(o.viplevel)*100+parseInt(o.richlevel);
var room_users={};
$(function(){
	if(currentUserID==""){
		UseList.update_user_list();
	}
	//$("#ulistMb").scrollTop(0);//回到顶部
	//拖动用户列表时
	$("#ulistMb").scroll(function(){
		var $this =$(this),  
		viewH =$(this).height(),//可见高度  
		contentH =$(this).get(0).scrollHeight,//内容高度  
		scrollTop =$(this).scrollTop();//滚动高度
		if(contentH - viewH - scrollTop <= 0) {//到达底部0px时,加载新内容
			if(UseList.p>=1 && (!UseList.current_status)){
				UseList.p++;
				UseList.update_user_list();
			}
		}
		if(UseList.p!=1){//用户查用户列表后过20秒，自动回到第一页
			clearTimeout(UseList.scrollUploadList);
			UseList.scrollUploadList = setTimeout(function(){
				//$("#ulistMb").scrollTop(0);//回到顶部
				UseList.p=1;
				UseList.update_user_list();
			},20*1000);
		}
	});
});
var UseList={
	current_status:false,
	p:1,
	p1orderby:0,
	guard_online_count:0,////守护在线用户
	update_user_list:function(){//到服务器更新用户列表
		UseList.current_status = true;
		$.get("/ajax/get_room_users_page.php?roomnumber="+currentRoomNumber+"&botwords=0&type="+roomtype+"&viplevel="+currentUserVipLevel+"&usernumber="+currentUserNumber+"&p="+UseList.p,function(obj){
			room_users=obj;
			UseList.room_user_show();
			UseList.current_status = false;
		},'json');
		/*$.get("http://115.28.51.161/roomuser.php?roomnumber="+currentRoomNumber+"&p="+UseList.p,function(obj){
			room_users=obj;
			UseList.room_user_show();
		},'jsonp');*/
		return;
	},
	userInfoUpdate:function(cmd,info){//收到更新用户信息,fms调用
		cmd=decodeURI(cmd);
		info=decodeURI(info);
		if(cmd=="OR3"){//是3麦房,请求排麦操作
			try{
				get_room_mic_list();
			}catch(e){}
			return;
		}
		else if(cmd=="ULT"){//用户升级
			var tmp = info.split("-");
			var userid=tmp[2];
			if(userid!=currentShowerid){//主播不要显示升级
				Room.showLevelBall(tmp[1],userid,tmp[3]);
			}
		}
		if(cmd=="UPU"){
			var obj=eval('('+info+')');
			UseList.room_user_update(obj);
		}else if(cmd.substr(0,3)=="UAA"){
			self.location="/html/kicked_out.html";
			//Main.alert("请不要再次打开此页面。");
		}else if(cmd=="URL"){
			window.location.href=info;
		}else if(cmd=="HBF"){
			var tmp = info.split(",|");
			$("#pubChatList").append('<li>'+now()+':系统公告: 土豪 '+tmp[0]+' 送红包了 <a href="javascript:;" onClick="hongbao_qiang(\''+tmp[1]+'\')">立即抢红包</a>'+'</li>');
			if(Chat.scrollPublicChat){
				var div = $('.publicchat').get(0);
				div.scrollTop = div.scrollHeight;
			}
		}else if(cmd=="HBQ"){
			var tmp = info.split(",|");
			$("#pubChatList").append('<li>'+now()+':系统公告: 恭喜 '+tmp[0]+' 抢了 '+tmp[1]+' 个红包</li>');
			if(Chat.scrollPublicChat){
				var div = $('.publicchat').get(0);
				div.scrollTop = div.scrollHeight;
			}
		}else if(cmd=="setadminadd"){//设置管理员成功
			roomAdmins.push(info+"");
			UseList.p=1;
			UseList.update_user_list();
		}else if(cmd=="setadmindel"){//删除管理员成功
			roomAdmins.splice($.inArray((info+""),roomAdmins),1);//删除这个值
			UseList.p=1;
			UseList.update_user_list();
		}else if(cmd=="hongbaofasuccess"){//发红包成功回调
			art.dialog({id:'hongbao_page'}).close();
			Main.alert("发红包成功");
		}
	},
	userListUpdate:function(cmd,obj){//收到更新用户信息,fms调用
		cmd=decodeURI(cmd);
		if(cmd=="SUL"){
			//console.log(obj);
			room_users.user = obj;
			UseList.room_user_show();
		}
		
	},
	room_user_update:function(obj){//更新一个用户
		return;
	},
	room_user_add:function(obj){//用户列表+一个用户
		return;
	},
	room_user_update_usernum:function(o,num){//更新在线用户(管理员)数据
	},
	room_user_del:function(userid){//用户列表删除一个用户
		return;
	},
	room_user_value_set:function(userid,type,value){//更改用户列表中的数据
		return;
	},
	room_user_show:function(){//更新显示用户列表
		var obj=room_users;
		if(!obj || obj.user.length==0)return;
		if(UseList.p==1){
			obj.adminnum=1;
			initAdmin = '<li class="'+$("#adminList li").first().attr("class")+'" id="'+$("#adminList li").first().attr("id")+'">'+$("#adminList li").first().html()+'</li>';
			initMember = '<li class="'+$("#userList li").first().attr("class")+'" id="'+$("#userList li").first().attr("id")+'">'+$("#userList li").first().html()+'</li>';
			$("#adminList").html('');
			$("#userList").html('');
			$("#adminList").html(initAdmin);
			$("#userList").html(initMember);
			//显示管理员
			for(var ui8=0;ui8<obj.admin.length;ui8++){
				var user=obj.admin[ui8];
				//如果隐身则不显示
				if(user.ishide=="1"){
					obj.adminnum--;
					continue;
				}
				user.nickname = unescape(user.nickname);
				
				list='<li class="stlth0" id="p'+user.userid+'"><p></p><p class="u"><a href="javascript:;">'+user.nickname+'</a></p></li>';
				$("#adminList").append(list);
				obj.adminnum++;
			}
			$("#adminnum").html(obj.adminnum);
		}
		for(var ui8=0;ui8<obj.user.length;ui8++){
			var user=obj.user[ui8];
			//如果隐身则不显示
			if(user.ishide=="1"){
				obj.usernum--;
				continue;
			}
			//到as中更新当前用户的等级,直播的时候再加载
			//if(Chat.canChat && user.userid==currentUserID){
			//	swfobject.getObjectById("player").setLevel(user.richlevel);
			//}
			if(user.usernumber==currentRoomNumber){
				var tietiao='';
				if(user.tietiao!="")
					tietiao = '<span style="background:url(/img/tag2/gift_'+user.tietiao+'.png) no-repeat scroll 0 0 transparent" class="tagMk"> </span>';
				$('#u_people #p'+currentUserID+' .tagMk').remove();
				$("#u_people #p"+currentUserID).append(tietiao);
				continue;
			}
			var list;
			orderinfo="";
			user.nickname = unescape(user.nickname);
			list=UseList.user_format(user);
			
			$("#userList").append(list);
		}
		$("#usernum").html(obj.usernum);
		if(obj.user.length<15 && obj.guestnum>0){//最后一页了
			UseList.p=-1;
			$("#userList").append('<p style="text-align: center;font-size:14px;color:#000;" onClick="return false;">游客总数 '+obj.guestnum+'</p>');
		}
	},
	user_format:function(user){//li格式
		//守护相关
		var tmp=$("#UguardList"+user.userid);
		var tmp_guard_icon = '';
		if(tmp.length > 0){//当前用户是守护
			tmp_guard_icon = '<img src="/images/guard/level.gif">';
		}
		var tietiao='';
		if(user.tietiao!="")
			tietiao = '<span style="background:url(/img/tag2/gift_'+user.tietiao+'.png) no-repeat scroll 0 0 transparent" class="tagMk"> </span>';
			
		var orderinfo="";
		if(user.usertype==7)
			orderinfo +='<img src="/img/lvv2/7.png" alt="代理"/>&nbsp;';
		if(user.usertype==6)
			orderinfo +='<img src="/img/lvv2/6.png" alt="客服"/>&nbsp;';
		if(user.usertype==8)
			orderinfo +='<img src="/img/lvv2/8.png" alt="运营"/>&nbsp;';
		if(user.viplevel!=0)//VIP
			orderinfo +='<img class="vip'+user.viplevel+'" src="/images/pixel.gif" alt="VIP特权"/>&nbsp;';
		if(user.medal)
			orderinfo +='<span onClick="window.open(\'/go.php?action=clanbyuid&userid='+user.userid+'\')" target="_blank" title="访问家族"><em class="famhuiz'+user.clantype+'">'+user.medal+'</em></span>';
		if(user.userid && user.userid.length!=13){
			var avatar = cdn_domain+'/static_data/uploaddata/avatar/'+user.userid.substr(0,1)+'/'+user.userid+'.gif';
		}else{
			var avatar = cdn_domain+'/images/2456_120x120.jpg';
		}
		return '<li id="p'+user.userid+'" orderbyjs="order'+user.orderbyjs+'"><div class="col avatar40"><img src="'+avatar+'" /><span class="icon mdiPC"></span></div><div class="col uInfo"><p><em class="level lv'+user.richlevel+'"></em><span class="lkn">'+user.usernumber+'</span></p><p class="u">'+orderinfo+tmp_guard_icon+'<a href="javascript:;">'+user.nickname+'</a></p></div>'+tietiao+'</li>';

	},
	show_botwords:function(){//机器人说话,
			var obj=room_users;
			if(obj.botwords.nickname!="" && obj.botwords.nickname!=null){
				//Live.appendPublicChat("",obj.botwords.nickname,obj.botwords.usernumber,obj.botwords.botwords);
				//机器人说话修改成彩条
				Live.appendPublicChat("",obj.botwords.nickname,obj.botwords.usernumber,'@'+mt_rand(1,10)+'@');
			}
	}
};
</script>
<div id="tmpdiv"></div>