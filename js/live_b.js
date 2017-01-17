$(function(){
	get_room_mic_list();
	/*setInterval(function(){
        get_room_mic_list()
    },5000);*/
	
	if(m2Number==currentUserNumber){
		changeToRecord("2");
	}
	if(m3Number==currentUserNumber){
		changeToRecord("3");
	}
});
function get_room_mic_listSWF(){//有操作通过房间其它人更新
	return false;
}
function get_room_mic_list(){//更新排麦
	$.get("/ajax/get_room_mic_list.php?roomnumber="+currentRoomNumber+"&type="+roomtype,function(obj){
		live3(obj);
	},'json');
}
var get_room_mic_list_count = 0;//共加载多少次3排麦请求
var get_room_mic_main_mic = 0;//主播是多少
function live3(obj){
	if(obj=="" || obj==null || obj.m1==undefined){
		return;
	}
	$("#showerOrderList").html('');
	//$("#avatarTicketOrder").html('');
	//列出上麦的用户
	//if(obj.noworders){
		var currentUser=false;
		if(obj.m1==currentUserNumber || obj.m2==currentUserNumber || obj.m3==currentUserNumber){
			currentUser=true;
		}
		for(i=0;i<obj.noworders.length;i++){
			var user=obj.noworders[i];
			var itemhtml="";
			var tstr="";
			if(obj.m1==user.usernumber){
				tstr="主麦";
			}else if(obj.m2==user.usernumber){
				tstr="二麦";
			}else if(obj.m3==user.usernumber){
				tstr="三麦";
			}
			if(currentUserID!="" && currentUserID!=0 && (currentUserNumber==currentRoomNumber || $.inArray(currentUserID,clan_leaderid)!==-1 || $.inArray(currentUserID,clan_secondleaders)!==-1)){//房主,及所在家族长,副族长可操作
				if(user.usernumber!=currentRoomNumber){
					itemhtml="<tr><td>"+user.nickname+"</td><td>"+tstr+"</td><td>"+'<a href="javascript:downMic('+user.usernumber+')">下麦</a></td><tr>';
				}
				else{
					itemhtml="<tr><td>"+user.nickname+"</td><td>"+tstr+"</td><td>"+'</td><tr>';
				}
			}
			else{
				itemhtml="<tr><td>"+user.nickname+"</td><td>"+tstr+"</td><td></td><tr>";
			}
			$("#showerOrderList").append(itemhtml);
		}
	//}
	//列出排麦的用户
	for(i=0;i<obj.orders.length;i++){
		var user=obj.orders[i];
		var itemhtml="";
		if(currentUserID!="" && currentUserID!=0 && (currentUserNumber==currentRoomNumber || $.inArray(currentUserID,clan_leaderid)!==-1 || $.inArray(currentUserID,clan_secondleaders)!==-1)){//房主,及所在家族长,副族长可操作
			itemhtml="<tr><td>"+user.nickname+"</td><td></td><td>"+'<a href="javascript:toMic('+user.usernumber+',2)">上二麦</a> <a href="javascript:toMic('+user.usernumber+',3)">上三麦</a> <a href="javascript:delOrder('+user.usernumber+')">删除</a>'+"</td><tr>";
		}
		else{
			itemhtml="<tr><td>"+user.nickname+"</td><td></td><td></td><tr>";
		}
		if(user.userid==currentUserID){
			currentUser = true;
		}
		$("#showerOrderList").append(itemhtml);
	}
	if(currentUserID!=""){
		if(currentUser){
			$("#micbtn").html('<a href="javascript:cancelMic()" style="display:block;background-image:url(\'images/wysm.gif\');width:114px;height:24px;color:white;line-height:24px;text-align:right;font-weight:bold">取消上麦&nbsp;&nbsp;</a>');
		}else{
			$("#micbtn").html('<a href="javascript:upMic()" style="display:block;background-image:url(\'images/wysm.gif\');width:114px;height:24px;color:white;line-height:24px;text-align:right;font-weight:bold">我要上麦&nbsp;&nbsp;</a>');
		}
	}
	if(m2Number!=obj.m2){
		art.dialog({id:"win2"}).close();
		
		m2Number=obj.m2;
		if(m2Number=="-1"){
			$("#mwin2").html('<span id="win2"><img width="209" height="157" src="/images/novideo.gif" /></span>');
		}
		else{
			changeToPlayer("2",m2Number);
			if(m2Number==currentUserNumber){
				alert("管理员邀请您上二麦，请调整坐姿，开始直播:)");
				changeToRecord("2");
			}
		}
	}
	if(m3Number!=obj.m3){
		art.dialog({id:"win3"}).close();
		
		m3Number=obj.m3;
		if(m3Number=="-1"){
			$("#mwin3").html('<span id="win3"><img width="209" height="157" src="/images/novideo.gif" /></span>');
		}
		else{
			changeToPlayer("3",m3Number);
			if(m3Number==currentUserNumber){
				alert("管理员邀请您上三麦，请调整坐姿，开始直播:)");
				changeToRecord("3");
			}
		}
	}
	if(currentRoomNumber==currentUserNumber){//是主播则不换顺序
		return;
	}
	if(get_room_mic_list_count!=0){//第1次加载不处理谁在主麦问题,因为主麦已经被
		if((obj.main_mic==1 || obj.main_mic==2 || obj.main_mic==3) && get_room_mic_main_mic==1 || get_room_mic_main_mic==2 || get_room_mic_main_mic==3){//两个值只能是1,2,3
			if(get_room_mic_main_mic != obj.main_mic){//主播的位置有变化
				//videoSwitch(obj.m1,obj.m2,obj.m3);
				if(obj.main_mic==1){
					videoSwitch("player",currentRoomNumber);
					videoSwitch("player2",obj.m2);
					videoSwitch("player3",obj.m3);
				}
				else if(obj.main_mic==2){
					videoSwitch("player",obj.m2);
					videoSwitch("player2",currentRoomNumber);
					videoSwitch("player3",obj.m3);
				}
				else if(obj.main_mic==3){
					videoSwitch("player",obj.m3);
					videoSwitch("player2",obj.m2);
					videoSwitch("player3",currentRoomNumber);
				}
			}
		}
	}
	get_room_mic_list_count++;
	get_room_mic_main_mic = obj.main_mic;//记录谁在主麦
}
//交换视频的位置
function micSwitch(n1,n2){
	var t = $("#mwin"+n1).html();
	var t3 = $("#mwin"+n2).html();
	$("#mwin"+n1).html(t3);
	$("#mwin"+n2).html(t);
}
//切换视频地址
function videoSwitch(obj,number){
	if($("#"+obj).is("object")){
		if(number!="" && number!=-1){
			swfobject.getObjectById(obj).switchVideo(number);
		}
	}
}
function buyTicket(){
	if (Live.user_role == 1) {
            login.show();
            return;
    }
	swfobject.getObjectById("player").sendGift(100,1,"",currentShowerid,currentRoomNumber,currentShowid,escape(currentShower),currentUserID,escape(currentUserNickname),0);
	alert("已经下单购买麦票，购买结果稍后将出现在麦序中");
}
//主播让用户上麦
function toMic(usernumber,position){
	swfobject.getObjectById("player").micOpt("up",currentRoomNumber,usernumber,position);
}
//主播让用户下麦
function delOrder(usernumber){
	swfobject.getObjectById("player").micOpt("down",currentRoomNumber,usernumber,0);
}
function changeToRecord(winid){
	//$("#win"+winid).html('');
	//swfobject.embedSWF("/static_data/swf/record_small.swf", "win"+winid, "209", "157", "11.0", "", {usernumber:currentUserNumber,c:ctoken,roomnumber:currentRoomNumber},{wmode: "opaque",allowScriptAccess: "always"});
	/*art.dialog.open('/static_data/swf/record_small.swf?usernumber='+currentUserNumber+'&c='+ctoken+'&roomnumber='+currentRoomNumber, { 
		id:"win"+winid,
		title:"直播--您在上"+winid+"麦",
        lock:false,
        width:235, 
        height:176, 
        opacity:.1 
    });*/
	art.dialog.open('/ajax/big_room_video.php?usernumber='+currentUserNumber+'&c='+ctoken+'&roomnumber='+currentRoomNumber, { 
		id:"win"+winid,
		title:"直播--您在上"+winid+"麦",
        lock:false,
        width:235, 
        height:176, 
        opacity:.1 
    });
}
//主播让用户下麦
function downMic(usernumber){
	swfobject.getObjectById("player").micOpt("down",currentRoomNumber,usernumber,0);
}
//用户取消排麦
function cancelMic(){
	swfobject.getObjectById("player").micOpt("cancelmic",currentRoomNumber,currentUserNumber,0);
}
//用户上麦
function upMic(){
	if (Live.user_role == 1) {
	    login.show();
		return;
	}
	swfobject.getObjectById("player").micOpt("upmic",currentRoomNumber,currentUserNumber,0);
}
function changeToPlayer(winid,playfn){
	var ww=209;
	var hh=157;
	playerswf="/static_data/swf/player.swf";
	$("#win"+winid).html('');
	swfobject.embedSWF(playerswf, "win"+winid, ww, hh, "10.0", "", {'fn':playfn,'roomnumber':currentRoomNumber,'token':ctoken,'chat':'0',confadd:_SWF_CONF_ADD_},{wmode: "opaque",allowScriptAccess: "always"});
}