<ul id="userList" class="userList puserList">
	<div id="yuserList" style="display: none;"><div><p>游客<span id="yuserNum">0</span>人</p></div></div>
</ul>
<script>
//排序，vip*100+级别
//o.orderbyjs = parseInt(o.viplevel)*100+parseInt(o.richlevel);
var room_users={};
$(function(){
	UseList.update_user_list();
	setInterval(function(){
		if($("#div_middle .tab li[rel=u_people]").hasClass("on")){
			UseList.update_user_list();
		}
	},5000);
});
var UseList={
	update_user_list:function(){//到服务器更新用户列表
		$.get("/ajax/get_room_users.php?roomnumber="+currentRoomNumber+"&botwords=0&type="+roomtype+"&viplevel="+currentUserVipLevel+"&usernumber="+currentUserNumber,function(obj){
			room_users=obj;
			UseList.room_user_show();
		},'json');
		/*$.get("http://115.28.51.161/roomuser.php?roomnumber="+currentRoomNumber,function(obj){
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
		}else if(cmd=="SYS"){
			info=info.replace(/\\"/g,'"');
			info=info.replace(/\\'/g,"'");
			$("#pubChatList").append('<li>'+now()+':系统公告: '+info+'</li>');
			
			if(info.indexOf("成功开通守护")>=0){
				getGuardList();
				var tmp_guard = $("div#guard_img");
				if(!tmp_guard.is("div")){
					$("body").append('<div id="guard_img" style="position:absolute;left:'+$('#video').offset().left+'px;top:'+($('#video').offset().top-200)+'px;z-index:100;"><img src="/img/guard.gif"/></div>');
					setTimeout(function(){$("div#guard_img").remove()},8000);
				}
			}
		}else if(cmd=="URL"){
			window.location.href=info;
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
		obj.adminnum=1;
		//obj.usernum=1;
		$("#adminList").html('');
		$("#userList").html('');
		var ai=0;
		var bi=0;
		var gi=0;
		var orderinfo;
		for(var ui8=0;ui8<obj.user.length;ui8++){
			var user=obj.user[ui8];
			if(user.type!="user"){
				continue;			
			}
			//如果隐身则不显示
			if(user.ishide=="1"){
				obj.usernum--;
				continue;
			}
			var tietiao='';
			if(user.tietiao!=""){
				tietiao = '<span style="background:url(/img/tag2/gift_'+user.tietiao+'.png) no-repeat scroll 0 0 transparent" class="tagMk"> </span>';
			}
			var list;
			orderinfo="";
			user.nickname = unescape(user.nickname);
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
				var avatar = Room.getUserAvatar(user.userid);
			}else{
				var avatar = cdn_domain+'/images/2456_120x120.jpg';
			}
			list='<li id="p'+user.userid+'" orderbyjs="order'+user.orderbyjs+'"><div class="col avatar40"><img src="'+avatar+'" /><span class="icon mdiPC"></span></div><div class="col uInfo"><p><em class="level lv'+user.richlevel+'"></em><span class="lkn">'+user.usernumber+'</span></p><p class="u">'+orderinfo+'<a href="javascript:;">'+user.nickname+'</a></p></div>'+tietiao+'</li>';
			$("#userList").append(list);
		}
		if(obj.guestnum>0){
			$("#userList").append('<div style="text-align: center;" onClick="return false;">游客总数 '+obj.guestnum+'</div>');
		}
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