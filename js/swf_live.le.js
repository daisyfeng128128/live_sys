var hideMenuTimer0;
var hideMenuBool=false;
var hideMenuTimer1;
var isfaceInit=false;
var getUserTimes=0;
$.ajaxSetup ({
cache: false
});
jQuery.fn.offsetWidth = function () {
    return this.offsetWidth;
}
var Announce={
	push:function(_roomnumber,_roomnickname,words){
	Room.printBc(now(),{"roomid":_roomnumber,"src_nickname":_roomnickname,"src_lucknumber":_roomnickname},replace_face(words));
	}
}

var PlySwf={
    push:function(words){
		Room.flyScreen(words);
    }
};
var showGift={
		show:function(gid,gnum,gwho){
			if(!Live.showFlashGift){
				return;
			}
			swfobject.getObjectById("showGiftSwf").style.visibility='visible';
			$("#showGiftSwf").css("z-index","3000");
			swfobject.getObjectById('showGiftSwf').jsNewGift(gid,gnum,gwho);
		},
		close:function(){
			swfobject.getObjectById("showGiftSwf").style.visibility='hidden';
			$("#showGiftSwf").css("z-index","0");
		},
		suitsFinish:function(){
			swfobject.getObjectById("showGiftSwf").style.visibility='hidden';
			$("#showGiftSwf").css("z-index","0");
			
		}
};
var giftShape={
    msgs:[],
    isPlaying:false,
    remove:function(){
        giftShape.isPlaying=false;
        swfobject.getObjectById("giftShapeSwf").style.visibility='hidden';
$("#giftShapeSwf").css("z-index","0");
        giftShape.show();
    },
    show:function(){
		if(!Live.showFlashGift){
			return;
		}
        if(giftShape.msgs.length>0){
            var shape=giftShape.msgs[0];
            giftShape.isPlaying=true;
            swfobject.getObjectById("giftShapeSwf").style.visibility='visible';
$("#giftShapeSwf").css("z-index","3000");
            swfobject.getObjectById("giftShapeSwf").jsRun(shape.i,shape.v);
            giftShape.msgs.shift();
        }
    },
    push:function(img,shape){
        giftShape.msgs.push({'i':img,'v':shape});
        if(!giftShape.isPlaying){
            giftShape.show();
        }
    }
};
var Live= {
	blockedPrivateUid:new Array(),
    user_role:1,
	showFlashGift:true,
	showflyMsgBoxSwitch:true,
	sendSwatch:function(sid){
		if($("#whisper").attr('checked')){
			Main.alert('私聊不能发彩条');
			return;
		}
		$("#msgContent").val(sid);
		$("#sendChatBtn").click();
	},
	disconnect:function(){
		self.location="/html/recorderror.html";
	},
	GiftSwitch:function(){
		if($("#giftSwitch").attr('class')=='giftanimation_on'){
			$("#giftSwitch").attr('class','giftanimation_off');
			Live.showFlashGift=false;
			try{
				swfobject.getObjectById("giftShapeSwf").style.visibility='hidden';
				swfobject.getObjectById("showGiftSwf").style.visibility='hidden';
				$("#giftShapeSwf").css("z-index","0");
				$("#showGiftSwf").css("z-index","0");
			}
			catch(err){
			
			}
		}
		else{
			$("#giftSwitch").attr('class','giftanimation_on');
			Live.showFlashGift=true;
		}
	},
	flyMsgBoxSwitch:function(){
		if($("#flyMsgBoxSwitch").attr('class')=='giftanimation_on'){
			$("#flyMsgBoxSwitch").attr('class','giftanimation_off');
			$(".flyScreen").remove();
			Live.showflyMsgBoxSwitch=false;
		}else{
			$("#flyMsgBoxSwitch").attr('class','giftanimation_on');
			Live.showflyMsgBoxSwitch=true;
		}
	},
	setAdmin:function(){
		if(!Chat.canChat){
			Main.alert('主播不在线不可以进行此操作');
			return;
		}
		$.get("roomactions.php?action=setadmin&roomnumber="+currentRoomNumber+"&userid="+currentOptUid,function(r){
			Main.alert('操作成功');
			if(r=='del'){
				roomAdmins = roomAdmins.splice($.inArray(currentOptUid,roomAdmins),1);//删除这个值
			}
			else if(r=='add'){
				roomAdmins.push(currentOptUid);
			}
			swfobject.getObjectById("player").userInfoUpdate(currentRoomNumber,currentOptUid,"UPU");
		});
	},
	blockIP:function(){
		if(confirm("您确定要封"+currentOptUname+"的IP吗?")){
			swfobject.getObjectById("player").blockIP(currentRoomNumber,currentOptUid);
		}
	},
	queryIP:function(){
		$.get("/ajax/useraction_inroom.php?action=queryip&roomnumber="+currentRoomNumber+"&userid="+currentOptUid,function(r){
			Main.alert(r);
		});
	},
	kickOut:function(){
		if(!Chat.canChat){
			Main.alert('主播不在线不可以进行此操作');
			return;
		}
		swfobject.getObjectById("player").kickOut(currentRoomNumber,currentOptUid);
	},
	switchChat:function(){//禁言
		if(!Chat.canChat){
			Main.alert('主播不在线不可以进行此操作');
			return;
		}
		swfobject.getObjectById("player").switchChat(currentRoomNumber,currentOptUid);
	},
	addBlockPrivateChat:function(){//屏蔽私聊
		Live.blockedPrivateUid.push(currentOptUid);
	},
	goInTo:function(){
		window.open("/go.php?action=byuid&userid="+currentOptUid);
	},
	setChatTo:function(){
		currentChatTo=currentOptUid+'-'+currentOptUname;
		currentChatToJID=currentOptUid+"@huofengchat1"+"/"+currentRoomNumber;
		setCurrentChatName(currentOptUname,currentOptUid);
		//$("#chatToDisplay").val(currentOptUname);
		$("#clearChatTo").show();
		$("#whisper").attr('checked',false);
	},
	setPChatTo:function(){
		currentChatTo=currentOptUid+'-'+currentOptUname;
		currentChatToJID=currentOptUid+"@huofengchat1"+"/"+currentRoomNumber;
		$("#whisper").attr('checked',true);
		setCurrentChatName(currentOptUname,currentOptUid);
		//$("#chatToDisplay").val(currentOptUname);
		$("#clearChatTo").show();
	},
	setGiftTo:function(){
		sendGiftTo=currentOptUid;
		sendGiftToName=currentOptUname;
		$(".choosepeople").val(sendGiftToName);
	},
	start:function(showid){
		currentShowid=showid;
		//$("#ucreateTime").html("开播时间："+now());
		swfobject.getObjectById("player").startShow(currentShowid);
	},
	refreshAnnounce:function(){
		
	},
	ChatReLogin:function(){
		//self.location=self.location;
		self.location.reload();
	},
    appendPrivateChat:function(from,fromid,words){
        words=htmlspecialchars(words, 'ENT_QUOTES');
        words=replace_face(words);
		var fromobj = from;
		from = fromobj[1];
		var level1=levelImg(fromid,fromobj);
        $("#priChatList").append('<li>'+level1+' <a href="javascript:;" class="u" id="'+fromid+'">'+from+'</a>对你说：'+words+'</li>');
		if(Chat.scrollPrivateChat){
            var div = $('.privatechat').get(0);
            div.scrollTop = div.scrollHeight;
        }
    },
	appendPrivateChatSelf:function(to,toid,words){
        words=htmlspecialchars(words, 'ENT_QUOTES');
        words=replace_face(words);
		var level1=levelImg(toid);
        if(level1==undefined)
        	level1="";
        $("#priChatList").append('<li>你对'+level1+'<a href="javascript:;" class="u" id="'+toid+'">'+to+'</a>说：'+words+'</li>');
		if(Chat.scrollPrivateChat){
            var div = $('.privatechat').get(0);
            div.scrollTop = div.scrollHeight;
        }
    },
    appendPublicChat:function(stamp,from,fromid,words,to,toid){
        if(stamp==""){
            stamp=now();
        }
        else{
            stamp=stamp.replace('T',' ');
            stamp=stamp.substr(0,4)+"-"+stamp.substr(4,2)+"-"+stamp.substr(6,2)+stamp.substr(8);
            stamp=strtotime("+8 hours",strtotime(stamp));
            var dt = new Date(stamp * 1000);
            var hours = checkTime(dt.getHours());
            var minutes = checkTime(dt.getMinutes());
            stamp=hours+":"+minutes;

        }
		var fromobj = from;
		from = fromobj[1];
        words=htmlspecialchars(words, 'ENT_QUOTES');
        words=replace_face(words);
		//<a href="javascript:;" class="u" id="'+toid+'">'+to+'</a>
        if(to==undefined){
			var level1=levelImg(fromid);
        	if(level1==undefined)
        		level1="";
            $("#pubChatList").append('<li>'+stamp+''+level1+'<a href="javascript:;" class="u" id="'+fromid+'">'+from+'</a>说:'+words+'</em></li>');
        }
        else{
			var level1=levelImg(fromid);
        	var level2=levelImg(toid);
        	if(level2==undefined)
        		level2="";
            $("#pubChatList").append('<li>'+stamp+''+level1+'<a href="javascript:;" class="u" id="'+fromid+'">'+from+'</a>对'+level2+'<a href="javascript:;" class="u" id="'+toid+'">'+to+'</a>说:'+words+'</em></li>');
        }
        if(Chat.scrollPublicChat){
            var div = $('.publicchat').get(0);
            div.scrollTop = div.scrollHeight;
        }
    },
	getSongRequestFlage:true,
	refreshSongRequest:function(){
		/*if(!Live.getSongRequestFlage)return;
		if($("#songTab").attr("class").indexOf("on")==-1)return;
		if(currentUserNumber==currentRoomNumber){//主播
			var status_txt=['<span><a class="f_o" href="javascript:song_agree(_REQID_)">同意</a></span>','已同意'];
			
		}
		else{
			var status_txt=['等待同意','已同意'];
		}
		$.get('/ajax/get_song_request.php?roomnumber='+currentRoomNumber,function(r){
			var tmp = '';
			for(i=0;i<r.songrequest.length;i++){
				var sl=r.songrequest[i];
				var status=status_txt[sl.status].replace('_REQID_',sl.reqid);
				tmp+='<li><span class="wtd1"></span><span title="'+sl.songname+'" class="wtd2">'+sl.songname+'</span><span title="'+sl.singer+'" class="wtd3">'+sl.singer+'</span><span>'+status+'</span></li>';
			}
			$("#songRequestList").html(tmp);
		},'json');*/
	},
	select_song:function(songid){
		//Main.alert('点歌完成');
		if (Live.user_role == 1) {
			login.show();
			return;
		}
		swfobject.getObjectById("player").sendGift(200,songid,"",currentShowerid,currentRoomNumber,currentShowid,currentShower,currentUserID,currentUserNickname,sofaid);
	},
	refreshSofa:function(){
		$.get('/ajax/getsofa.php?showid='+currentShowid,function(r){
			if(r[0].userid!=0){
				$("#chair1").attr('data_price',r[0].sofanum);
				$("#chair1 .atbd").css("visibility","visible");
				$("#chair1 .atbd img").attr("src",cdn_domain+"/apis/avatar.php?uid="+r[0].userid);
				$("#chair1 .atbd span").attr("title",r[0].nickname).html(r[0].nickname);
				$("#chair1 .lkn").html(r[0].usernumber).css("visibility","visible");
			}
			if(r[1].userid!=0){
				$("#chair2").attr('data_price',r[1].sofanum);
				$("#chair2 .atbd").css("visibility","visible");
				$("#chair2 .atbd img").attr("src",cdn_domain+"/apis/avatar.php?uid="+r[1].userid);
				$("#chair2 .atbd span").attr("title",r[1].nickname).html(r[1].nickname);
				$("#chair2 .lkn").html(r[1].usernumber).css("visibility","visible");
			}
			if(r[2].userid!=0){
				$("#chair3").attr('data_price',r[2].sofanum);
				$("#chair3 .atbd").css("visibility","visible");
				$("#chair3 .atbd img").attr("src",cdn_domain+"/apis/avatar.php?uid="+r[2].userid);
				$("#chair3 .atbd span").attr("title",r[2].nickname).html(r[2].nickname);
				$("#chair3 .lkn").html(r[2].usernumber).css("visibility","visible");
			}
		},'json');
	},
    welcome:function(who,car){
		who=decodeURI(who);
		car=decodeURI(car);
		var obj=eval('('+car+')');
		//vip3用户可以看到所有的人
		if(!(obj.car.state=="hide" && currentUserVipLevel<3)){
			if(currentUserID==obj.userinfo.userid){//本人刚进入记房间,1秒钟再用户列表显示，等加载用户列表完成后
				setTimeout(function(){UseList.room_user_add(obj);},1000);
			}else{
				UseList.room_user_add(obj);
			}
		}
		
		if(who.substr(0,5)=="Guest"){
			return;
		}
		if(obj.car.state=="hide"){
			$("#pubChatList").append('<li class="fontred">'+now()+':有人“咻”的一声进入了房间</li>');
			return;
		}
		var level1=levelImg(obj.userinfo.userid);
		var nameA = '<a id="'+obj.userinfo.userid+'" class="u" href="javascript:;">'+who+'</a>';
		if(obj.car.giftname!=""){//有座驾
			var carname=obj.car.giftname;
			var carimg=obj.car.giftimage;
			var xinren=obj.car.xinren;
			var xinrenImg = '';
			if(xinren=="1")
				var xinrenImg = ' <img src="'+cdn_domain+'/images/xinren.png" title="新人王"/>';
			
			if(carname!=""&&carimg!=""){
				$("#pubChatList").append('<li class="fontred">'+now()+'欢迎'+xinrenImg+level1+nameA+'乘坐一辆'+carname+'进入房间<img src="'+cdn_domain+'/static_data/car/smallimages/'+carimg+'" /></li>');
				carMovie.show(carimg);
			}else{
				$("#pubChatList").append('<li class="fontred">'+now()+':欢迎'+level1+xinrenImg+nameA+'进入房间</li>');
			}
		}
		else{
			$("#pubChatList").append('<li class="fontred">'+now()+':欢迎'+level1+nameA+'进入房间</li>');
		}
		if(Chat.scrollPublicChat){
            var div = $('.publicchat').get(0);
            div.scrollTop = div.scrollHeight;
        }
    },
	bye:function(userid,usernumber){
		UseList.room_user_del(userid);
    },
    systemAnnounce:function(content){
        $("#pubChatList").append('<li><em class="chatkuaibao">'+content+'</em></li>');
    },
    giftAnnounce:function(from,fromid,to,toid,gid,giftnum,time,arr){
		var giftname=$("#gift"+arr[8]).text();
		if(!giftname){
			return;
		}
		if($(".ggidgift_"+gid).hasClass('giftcate5') || $(".ggidgift_"+gid).hasClass('giftcate6')){
			Live.specialGiftAnnounce(from,fromid,to,toid,gid,giftname,giftnum,time);
			return;
		}
		if(giftnum<50){
			return;
		}
        $("#movelist1").prepend('<li class="gali"><a target="_blank" href="/findroom-'+toid+'.html"><span class="rf_b">'+from+'</span> 给 <span class="rf_b"> '+to+'</span> 赠送了 '+giftnum+'个&nbsp;<img class="giftsmall '+getFileNmae(gid)+'_x" src="/images/pixel.gif"></a></li>');		
		
		$(".gali").last().remove();
	},
    specialGiftAnnounce:function(from,fromid,to,toid,gid,giftname,giftnum,time){
		var giftname=$(".ggidgift_"+gid).html();
		if($("#specialGiftAnnounce li").length>=5){
			var lastLI = $("#specialGiftAnnounce").find("li").last();
			lastLI.detach();
		}
        $("#specialGiftAnnounce").append('<li><a href="/findroom-'+toid+'.html"><img class="gift_icon gift_'+gid+'" src="/images/pixel.gif" /><em>'+time+'</em><em class="topgiftgivname globalfontcolor">'+from+'</em>送给<em class="topgiftgivname globalfontcolor">'+to+'</em>'+giftnum+'个<em class="topgiftgivname globalfontcolor">'+giftname+'</em><em class="enterroom globalfontcolor"></a></em></li>');	
	},
    allSiteAnnounce:function(from,fromid,content,time){
        $("#allSiteAnnounce").append('<span class="annli"><a href="/'+fromid+'.html" target="_blank">'+from+'（'+fromid+'）：'+'<em style="color:#000">'+content+'</em><em>('+time+')</em></span></a>');
    },
    getRoomUsers:function(){
	//不用了
    },
    changeSofa:function(idx,userinfo){
        $("#sofa"+idx).html('<div class="wzpic"><a href="#"><img src="'+userinfo.avatar+'" width="49" height="40" style="border:none;"/></a></div><div class="sitename tc f12">'+userinfo.nickname+'</div><div class="btnct tc f12"><a href="#">踹他</a></div>');
    },
	sendGiftFail:function(r){
			r=decodeURI(r);
			if(r==0){
                login.show();
            }
            else if(r==1){
                Main.alert('您没有足够的'+money_name+'，请充值！');
            }
			else if(r==2){
                Main.alert('直播没有开始，无法抢沙发');
            }
	},
	sendKickbackFail:function(r){
		r=decodeURI(r);
		if(r==0){
                login.show();
            }
            else if(r==1){
                Main.alert('您已经没有掌声可以送啦！');
            }
	}
};
var carMovie={
	show:function(pic){
		$("#showCar").css("z-index","3000");
		swfobject.getObjectById("showCar").style.visibility='visible';
		swfobject.getObjectById("showCar").loadpic("/static_data/car/images/"+pic);
	},
	stop:function(){
		$("#showCar").css("z-index","0");
		swfobject.getObjectById("showCar").style.visibility='hidden';
	}
}
var FilterStr = {
    number: "\u62631234567890\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19\uff10\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u96f6\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u3220 \u3221 \u3222 \u3223 \u3224 \u3225 \u3226 \u3227 \u3228 \u2474 \u2475 \u2476 \u2477 \u2478 \u2479 \u247a \u247b \u247c\u58f9\u8d30\u53c1\u8086\u4f0d\u9646\u67d2\u634c\u7396",
    letter: "./\uff0e\u70b9\u3002abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ\uff41\uff42\uff43\uff44\uff45\uff46\uff47\uff48\uff49\uff47\uff4b\uff4c\uff4d\uff4e\uff4f\uff50\uff51\uff52\uff53\uff54\uff55\uff56\uff57\uff58\uff59\uff5a\uff21\uff22\uff23\uff24\uff25\uff26\uff27\uff28\uff29\uff27\uff2b\uff2c\uff2d\uff2e\uff2f\uff30\uff31\uff32\uff33\uff34\uff35\uff36\uff37\uff38\uff39\uff3a",
    dots: "\u3089\u310b\u2488\u2489\u248b\u248c\u248d\u248e\u248f\u2490\u0392\u0421\u039f\u039a\u041a\u041c\u0422\u03a7\u0399\u039d\u0442\u043a\u03c4\u03ba\u2530\u03a4"
};
var sofaid=0;
var starty=0;
var startdrag=false;
var initAdmin,initMember;
function setCurrentChatName(name,userid){
	var has=selectCurrentChatUser(name);
	if(!has){
		$("#chatToDisplay").append("<option value='"+userid+"'>"+name+"</option>");
	}
	selectCurrentChatUser(name);
}
function selectCurrentChatUser(name){
	var count=$("#chatToDisplay option").length;
	var has=false;
	for(var i=0;i<count;i++){
		if($("#chatToDisplay").get(0).options[i].text == name)  
		{  
			has=true;
			$("#chatToDisplay").get(0).options[i].selected = true;  
			break;
		}  
	}
	return has;
}
function song_agree(reqid){
	$.get("/ajax/change_songrequest.php",{'roomnumber':currentRoomNumber,'reqid':reqid,'status':'1'},function(r){
		if(r!=""){
			Main.alert(r);
		}
		else{
			Live.refreshSongRequest();
		}
	});
}
function updateAnnounce(str){
	swfobject.getObjectById("player").updateAnnounce(str);
}
function showAnnounceWin(){
	art.dialog.open('/ajax/room_public_announce.php', { 
	id:"room_public_announce",
	title:"修改房间公告",
        lock:false,
        width:235, 
        height:176, 
        opacity:.1 
    });
}
function showSongAddWin(){
art.dialog.open('/addsong.php?roomnumber='+currentRoomNumber, {
title:'维护歌单',
lock:true,
width:505,
height:400,
opacity:.1
});
}
function showSongRequestWin(){
	if (Live.user_role == 1) {
		login.show();
		return;
	}
	art.dialog.open('/songlist.php?roomnumber='+currentRoomNumber, { 
		id:"songwin",
		title:"点歌",
        lock:true, 
        width:505, 
        height:400, 
        opacity:.1 
    });
}
var Gift_show = {
    pres: [],
    isPlaying: 0,
    sn: 0,
    imgCache: {},
    addGift: function(b, a) {
		if(!Live.showFlashGift){return;}
        if (!b.info) {
            return
        }
        Gift_show.pCache(b);
        var c = Gift_show.createGif(b, a);
        Gift_show.start(c, b)
    },
    pCache: function(a) {
        if (!Gift_show.imgCache[a.id]) {
            Gift_show.imgCache[a.id] = a;
            var b = new Image;
            //b.onload = function() {
                //$(Gift_show).destroy()
            //};
            b.src = a.info.src
        }
    },
    npos_ani: function(e, b, c) {
        if (e == 7 || e == 40 || e == 49 || e == 55) {
            var b = 200,
                c = 400;
            var a = Math.round(Math.random() * b),
                d = Math.round(Math.random() * c);
            return {
                x: a,
                y: d
            }
        }
        if (e == 50) {
            var b = 400,
                c = 400;
            var a = Math.round(Math.random() * 550),
                d = Math.round(Math.random() * 150);
            return {
                x: a,
                y: d
            }
        }
        var a = Math.round(Math.random() * b),
            d = Math.round(Math.random() * c);
        if (a < 50) {
            a = a + 50
        }
        return {
            x: a,
            y: d
        }
    },
    npos: function(k, d) {
        var e = document.documentElement,
            f = e.scrollLeft,
            g = e.scrollTop,
            a = e.clientWidth,
            c = e.clientHeight;
        a = k;
        c = d;


        var j = Math.round(Math.random() * (a - 170)) + f,
            i = Math.round(Math.random() * d) ;

        if (j > 700 && i > 160 && i < 605) {
            j = j - 300 + (j - 730)
        }
        var X = $('#player').offset().left+50;
        var Y = $('#player').offset().top+100;
		Y-=200;
        return {
            x: j+X,
            y: i+Y
        }
    },
    xpos: function(i, c) {
        var b = document.getElementById("player"),
            a = (b.offsetWidth - i) / 2,
            d = (b.offsetHeight - c) / 2,
            g = b;
        var f = 0,
            e = 0;
        while (g != null) {
            f += g.offsetLeft;
            e += g.offsetTop;
            g = g.offsetParent
        }
        return {
            x: f + a,
            y: e + d - 10
        }
    },
    createGif_ani: function(b, a) {
        var e = [];
        for (var c = 0; c < a; c++) {
        	
            var d = document.createElement("div");
            //d.style.width = b.info.w + "px";
            //d.style.height = b.info.h + "px";
            
            //d.style.backgroundImage = "url(" + b.info.src + ")";
            d.style.backgroundRepeat = "no-repeat";
            d.style.backgroundPosition = "center center";
            d.style.position = "absolute";
            var f = Gift_show.npos_ani(b.id, 350, 200);
            d.style.left = f.x + "px";
            d.style.top = f.y + "px";
            d.innerHTML="<img src='"+b.info.src+"'>";
            e.push(d)
        }
        return e
    },
    createGif: function(b, a) {
        var e = [];
        for (var c = 0; c < a; c++) {
        	
            var d = document.createElement("div");
            //d.style.width = b.info.w + "px";
            //d.style.height = b.info.h + "px";
            //d.style.backgroundImage = "url(" + b.info.src + ")";
            d.style.backgroundRepeat = "no-repeat";
            d.style.backgroundPosition = "center center";
            d.style.position = "absolute";
            //if (page.tpl_a) {
                var f = Gift_show.npos(800, 250)
            //} else {
            //    var f = Gift_show.npos(800, 350)
            //}
            if (b.info.w > 800) {
                var f = {
                    x: 0,
                    y: 226
                }
            }
            d.style.left = f.x + "px";
            d.style.top = f.y  + "px";
            //if (page.tpl_a) {
                //d.style.top = f.y - 220 + "px"
            //}
            d.innerHTML="<img src='"+b.info.src+"'>";
            e.push(d)
        }
        return e
    },
    start: function(d, b) {
        var g = document.createElement("div");
        g.className = "giftShowBox";
        for (var c = 0; c < d.length; c++) {
            g.appendChild(d[c])
        }
        document.body.appendChild(g);
        var e = g.getElementsByTagName("div");
        if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
            if (DD_belatedPNG) {
                for (var c = 0; c < e.length; c++) {
                    var a = DD_belatedPNG;
                    a.fixPng(e[c])
                }
            }
        }
        var f = 8000;
        if (b.gold >= 100 && b.gold <= 1000) {
            f = 10 * 1000
        }
        setTimeout(function(){
            document.body.removeChild(g);
        }, f);
    }
};
//Flash中调用
function alertinfo(msg){
	msg=decodeURI(msg);
	Main.alert(msg);
}
var Chat={
	blockSelf:function(){
		self.location="/html/block.html";
	},
	isDisconnectSelf:function(){
		self.location="/html/isDisconnectSelf.html";
	},
	endShow:function(){
		self.location="/html/endShow.html";
	},
	switchChatSelf:function(){
		if($("#sendChatBtn").is(":visible")){
			Main.alert('您已被禁言');
			$("#sendChatBtn").hide();
		}
		else{
			Main.alert('您现在可以发言了');
			$("#sendChatBtn").show();
		}
	},
    scrollPublicChat:true,
    scrollPrivateChat:true,
	fromServerGiftAnnounce:function(cmd){
		cmd=decodeURI(cmd);
		var arr=cmd.split(",|");
		var command=arr[0].substr(0,3);
		var action_roomnumber=arr[0].substr(3);
        if(command=='SGG'){//送礼
            var num=arr[2];
			var gid=arr[1];
			var fromid=arr[5];
			var fromobj = fromid.split("-");
			fromid = fromobj[0];
			var from=arr[6];
			var toid=arr[3];
			var toobj = toid.split("-");
			toid = toobj[0];
			var to=arr[4];
			if(fromid==currentUserID){
				updateBalance();
			}
			var award=arr[7].split('|');
			if(award[0]!=0){
				if(award[0]>=300){
					PlySwf.push("恭喜 "+unescape(from)+" 赠送幸运礼物,获得"+award[0]+"倍大奖,金额"+award[1]+money_name);
				}
				if(action_roomnumber==currentRoomNumber){
					$("#pubChatList").append('<li class="fontred">'+now()+"恭喜 "+unescape(from)+" 赠送幸运礼物,获得"+award[0]+"倍大奖,金额"+award[1]+money_name+"</li>");
				}
			}
			else{
				Live.giftAnnounce(unescape(from),fromid,unescape(to),toid,gid,num,now(),arr);
			}
		}
	},
    fromServer:function(cmd){
		cmd=decodeURI(cmd);
        var arr=cmd.split(",|");
		var command=arr[0].substr(0,3);
		var action_roomnumber=arr[0].substr(3);
		if(arr[3]==currentUserID){
			updateBalance();
		}
        if(command=='SFM'){//飞屏
			//if(action_roomnumber!=currentRoomNumber){
			//	return;
				//别人的信息
			//}
            PlySwf.push(unescape(arr[1]));
        }
		else if(command=='SAN'){//共告
            Announce.push(action_roomnumber,unescape(arr[2]),unescape(arr[1]));
        }
		else if(command=='SKK'){
			//if(action_roomnumber!=currentRoomNumber){
			//	return;
				//别人的信息
			//}
			var fromid=arr[1];
			var from=arr[2];
			$("#pubChatList").append('<li>'+now()+':<a href="javascript:;" class="u" id="'+fromid+'">'+unescape(from)+'</a>送1个<img src="images/pixel.gif" class="cb"></em></li>');
			if(Chat.scrollPublicChat){
				var div = $('.publicchat').get(0);
				div.scrollTop = div.scrollHeight;
			}
			$("#cbnum").html(($("#cbnum").html()*1)+1);
			if(taskTT3 && fromid==currentUserID)//做任务，送出1个掌声
				taskOK(3);
		}
		/*else if(command=='BOT'){//踢出房间
			if(action_roomnumber!=currentRoomNumber){
				return;
				//别人的信息
			}
			var userid=arr[1];
			if(userid==currentUserID){
				self.location="/html/block.html";
			}
		}
		else if(command=='BIP'){
			if(action_roomnumber!=currentRoomNumber){
				return;
				//别人的信息
			}
			var userid=arr[1];
			if(userid==currentUserID){
				self.location="/html/block.html";
			}
		}
		else if(command=='BCT'){
			if(action_roomnumber!=currentRoomNumber){
				return;
				//别人的信息
			}
			var userid=arr[1];
			if(userid==currentUserID){
				
				if($("#sendChatBtn").is(":visible")){
					Main.alert('您已被禁言');
					$("#sendChatBtn").hide();
				}
				else{
					Main.alert('您现在可以发言了');
					$("#sendChatBtn").show();
				}
			}
		}*/
		else if(command=='END'){
			self.location="/html/end.html";
		}
		else if(command=='FLY'){
			PlySwf.push(arr[1]);
		}
		else if(command=='MOV'){
			self.location="/"+arr[1]+".html";
		}
		else if(command=="DGG"){//点歌
			var fromid=arr[5];
			var from=arr[6];
			if(fromid==currentUserID)
				Main.alert('点歌完成');
			Live.refreshSongRequest();
			$("#pubChatList").append('<li>'+now()+':<a href="javascript:;" class="u" id="'+fromid+'">'+unescape(from)+'</a>点歌一首</li>');
		}
		else if(command=='SGG'){//送礼
            var num=arr[2];
			var gid=arr[1];//图片全路径
			var fromid=arr[5];
			var fromobj = fromid.split("-");
			fromid = fromobj[0];
			var from=arr[6];
			var toid=arr[3];
			var toobj = toid.split("-");
			toid = toobj[0];
			var to=arr[4];
			var giftid=arr[8];
			if(action_roomnumber!=currentRoomNumber){
				return;
			}
			current_fan_top();//更新排行榜
			formerly_month_fan_top();
			formerly_all_fan_top();
			if(arr[9]=="tietiao"){
				var gname = $("#"+arr[8]+" a").html();
				$("#pubChatList").append('<li>'+now()+':<a href="javascript:;" class="u" id="'+fromid+'">'+unescape(from)+'</a> 给 <a href="javascript:;" class="u" id="'+toid+'">'+unescape(to)+'</a> 贴上 '+gname+' 贴条</li>');
				
				$('#u_people #p'+toid+' .tagMk').remove();
				$('#u_people #p'+toid).append('<span style="background:url('+cdn_domain+'/img/tag2/'+gid+') no-repeat scroll 0 0 transparent" class="tagMk"> </span>');
				
				UseList.room_user_value_set(toid,"tietiao",cdn_domain+'/img/tag2/'+gid);
				if(Chat.scrollPublicChat){
					var div = $('.publicchat').get(0);
					div.scrollTop = div.scrollHeight;
				}
				return;
			}else{
				$("#pubChatList").append('<li>'+now()+':<a href="javascript:;" class="u" id="'+fromid+'">'+unescape(from)+'</a>送<a href="javascript:;" class="u" id="'+toid+'">'+unescape(to)+'</a>'+num+'个<img src="images/pixel.gif" class="giftsmall '+getFileNmae(gid)+'_x"></em></li>');
				
				
			}
			if(giftid==4){
				Live.refreshSofa();
			}
			if(arr[10]=="5"|| arr[9]!=""){//是豪华礼物,flash显示
				showGift.show(giftid,num,unescape(from));
			}
			else{
				if(num==50){
					giftShape.push(cdn_domain+'/static_data/gift_s/'+gid,"v");
				}
				else if(num==99){
					giftShape.push(cdn_domain+'/static_data/gift_s/'+gid,"xin");
				}
				else if(num==100){
					giftShape.push(cdn_domain+'/static_data/gift_s/'+gid,"xiaolian");
				}
				else if(num==300){
					giftShape.push(cdn_domain+'/static_data/gift_s/'+gid,"love");
				}
				else if(num==520){
					giftShape.push(cdn_domain+'/static_data/gift_s/'+gid,"v520");
				}
				else if(num==999){
					giftShape.push(cdn_domain+'/static_data/gift_s/'+gid,"x");
				}
				else if(num==1314){
					giftShape.push(cdn_domain+'/static_data/gift_s/'+gid,"v1314");
				}
				else if(num==3344){
					giftShape.push(cdn_domain+'/static_data/gift_s/'+gid,"v3344");
				}
				else{
					Gift_show.addGift({info:{w:115,h:115,src:cdn_domain+'/static_data/gift/'+gid}},num);
				}
			}
			if(Chat.scrollPublicChat){
				var div = $('.publicchat').get(0);
				div.scrollTop = div.scrollHeight;
			}
			//这里的gid是图片中的id
			if(taskTT2 && arr[8]!=undefined && arr[8]=="5" && fromid==currentUserID)//做任务，送出1朵玫瑰
				taskOK(2);
		}
    },
	canChat:false,
    joinin:function(){
        Chat.canChat=true;
        $("#sendChatBtn").attr('disabled',false).removeClass('Tkdisabled');
    },
	breakdown:function(){
		Chat.canChat=false;
        $("#sendChatBtn").attr('disabled',true).addClass('Tkdisabled');  
		Main.alert("您已经和聊天服务器断开,请刷新页面再试");
    },
    getMsg:function(from,to,msg,fontobj){
		from=decodeURI(from);
		to=decodeURI(to);
		msg=decodeURI(msg);
		var fromobj=from.split('-',4);
        //var obj=msg.split(',|,',2);
        //var to=obj[0];
        //var msg=obj[1];
        if(to=="ALL"){
            Live.appendPublicChat("",fromobj,fromobj[0],msg);
        }
        else{
            var toobj=to.split('-',4);
            Live.appendPublicChat("",fromobj,fromobj[0],msg,toobj[1],toobj[0]);
        }
    },
    getPMsg:function(from,content,fontobj){
		from=decodeURI(from);
		content=decodeURI(content);
		var tmp=from.split('-',4);
		var fromuid=tmp[0];
		//var fromuname=tmp[1];
		//var fromuid=from.user;
		//var fromuname=msg.split('^',2)[0];
		//var content=msg.split('^',2)[1];
		if($.inArray(fromuid,Live.blockedPrivateUid)!== -1){
			return;
		}
		Live.appendPrivateChat(tmp,fromuid,content);
    },
    send:function(_to,_msg){
        var r=swfobject.getObjectById("player").sendMsgToRoom(_to,_msg);
        if(r==0){
            //登陆
        }
        else if(r==1){
            Main.alert('等级不够，发言不能超过10个汉字');
        }
        else if(r==2){
            Main.alert('等级不够，发言限制15秒一次');
        }
        else if(r==3){
            Main.alert('未知错误');
        }
		else{
			$("#msgContent").val('');
			if(taskTT4)//做任务，和主播打个招呼
				taskOK(4);
		}
    },
	sendP:function(_to,_msg){
        var r=swfobject.getObjectById("player").sendMsgToSomeone(_to.split('-',2)[0],_msg);
		if(r==0){
            //登陆
			Main.alert("登陆");
        }
        else if(r==1){
            Main.alert('一富以上才能私聊');
        }
        else if(r==3){
            Main.alert('未知错误');
        }
		else{
			Live.appendPrivateChatSelf(_to.split('-')[1],_to.split('-')[0],_msg);
			$("#msgContent").val('');
		}
    }
};
function numsel(num){
    $(".choosenumbox").hide();
    $("#sendGiftNum").val(num);
}
function now(){
    var d=new Date();
    return checkTime(d.getHours())+":"+ checkTime(d.getMinutes());
}
function htmlspecialchars (string, quote_style, charset, double_encode) {
    var optTemp = 0,
        i = 0,
        noquotes = false;
    if (typeof quote_style === 'undefined' || quote_style === null) {
        quote_style = 2;
    }
    string = string.toString();
    if (double_encode !== false) { // Put this first to avoid double-encoding
        string = string.replace(/&/g, '&amp;');
    }
    string = string.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    var OPTS = {
        'ENT_NOQUOTES': 0,
        'ENT_HTML_QUOTE_SINGLE': 1,
        'ENT_HTML_QUOTE_DOUBLE': 2,
        'ENT_COMPAT': 2,
        'ENT_QUOTES': 3,
        'ENT_IGNORE': 4
    };
    if (quote_style === 0) {
        noquotes = true;
    }
    if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
        quote_style = [].concat(quote_style);
        for (i = 0; i < quote_style.length; i++) {
            // Resolve string input to bitwise e.g. 'ENT_IGNORE' becomes 4
            if (OPTS[quote_style[i]] === 0) {
                noquotes = true;
            }
            else if (OPTS[quote_style[i]]) {
                optTemp = optTemp | OPTS[quote_style[i]];
            }
        }
        quote_style = optTemp;
    }
    if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
        string = string.replace(/'/g, '&#039;');
    }
    if (!noquotes) {
        string = string.replace(/"/g, '&quot;');
    }

    return string;
}
function replace_face(words,fly){
    if(fly==undefined){
		words = words;
    }
    else{
        words=str_replace('/','',words);
    }
    return words;
}
function str_replace (search, replace, subject, count) {
    var i = 0,
        j = 0,
        temp = '',
        repl = '',
        sl = 0,
        fl = 0,
        f = [].concat(search),
        r = [].concat(replace),
        s = subject,
        ra = Object.prototype.toString.call(r) === '[object Array]',
        sa = Object.prototype.toString.call(s) === '[object Array]';
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }

    for (i = 0, sl = s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }
        for (j = 0, fl = f.length; j < fl; j++) {
            temp = s[i] + '';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if (count && s[i] !== temp) {
                this.window[count] += (temp.length - s[i].length) / f[j].length;
            }
        }
    }
    return sa ? s : s[0];
}
function mt_rand (min, max) {
  var argc = arguments.length;
  if (argc === 0) {
    min = 0;
    max = 2147483647;
  }
  else if (argc === 1) {
    throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
  }
  else {
    min = parseInt(min, 10);
    max = parseInt(max, 10);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getFileNmae(v){
	return v.substring(0,v.lastIndexOf("."));;
}
function strtotime (str, now) {
    var i, l, match, s, parse = '';

    str = (str + '').replace(/\s{2,}|^\s|\s$/g, ' ').replace(/[\t\r\n]/g, ''); // unecessary spaces and chars

    if (str === 'now') {
        return now === null || isNaN(now) ? new Date().getTime() / 1000 | 0 : now | 0;
    } else if (!isNaN(parse = Date.parse(str))) {
        return parse / 1000 | 0;
    } else if (now) {
        now = new Date(now * 1000); // Accept PHP-style seconds
    } else {
        now = new Date();
    }

    str = str.toLowerCase();

    var __is = {
        day: {
            'sun': 0,
            'mon': 1,
            'tue': 2,
            'wed': 3,
            'thu': 4,
            'fri': 5,
            'sat': 6
        },
        mon: [
            'jan',
            'feb',
            'mar',
            'apr',
            'may',
            'jun',
            'jul',
            'aug',
            'sep',
            'oct',
            'nov',
            'dec'
        ]
    };

    var process = function (m) {
        var ago = (m[2] && m[2] === 'ago');
        var num = (num = m[0] === 'last' ? -1 : 1) * (ago ? -1 : 1);

        switch (m[0]) {
            case 'last':
            case 'next':
                switch (m[1].substring(0, 3)) {
                    case 'yea':
                        now.setFullYear(now.getFullYear() + num);
                        break;
                    case 'wee':
                        now.setDate(now.getDate() + (num * 7));
                        break;
                    case 'day':
                        now.setDate(now.getDate() + num);
                        break;
                    case 'hou':
                        now.setHours(now.getHours() + num);
                        break;
                    case 'min':
                        now.setMinutes(now.getMinutes() + num);
                        break;
                    case 'sec':
                        now.setSeconds(now.getSeconds() + num);
                        break;
                    case 'mon':
                        if (m[1] === "month") {
                            now.setMonth(now.getMonth() + num);
                            break;
                        }
                    // fall through
                    default:
                        var day = __is.day[m[1].substring(0, 3)];
                        if (typeof day !== 'undefined') {
                            var diff = day - now.getDay();
                            if (diff === 0) {
                                diff = 7 * num;
                            } else if (diff > 0) {
                                if (m[0] === 'last') {
                                    diff -= 7;
                                }
                            } else {
                                if (m[0] === 'next') {
                                    diff += 7;
                                }
                            }
                            now.setDate(now.getDate() + diff);
                            now.setHours(0, 0, 0, 0); // when jumping to a specific last/previous day of week, PHP sets the time to 00:00:00
                        }
                }
                break;

            default:
                if (/\d+/.test(m[0])) {
                    num *= parseInt(m[0], 10);

                    switch (m[1].substring(0, 3)) {
                        case 'yea':
                            now.setFullYear(now.getFullYear() + num);
                            break;
                        case 'mon':
                            now.setMonth(now.getMonth() + num);
                            break;
                        case 'wee':
                            now.setDate(now.getDate() + (num * 7));
                            break;
                        case 'day':
                            now.setDate(now.getDate() + num);
                            break;
                        case 'hou':
                            now.setHours(now.getHours() + num);
                            break;
                        case 'min':
                            now.setMinutes(now.getMinutes() + num);
                            break;
                        case 'sec':
                            now.setSeconds(now.getSeconds() + num);
                            break;
                    }
                } else {
                    return false;
                }
                break;
        }
        return true;
    };

    match = str.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/);
    if (match !== null) {
        if (!match[2]) {
            match[2] = '00:00:00';
        } else if (!match[3]) {
            match[2] += ':00';
        }

        s = match[1].split(/-/g);

        s[1] = __is.mon[s[1] - 1] || s[1];
        s[0] = +s[0];

        s[0] = (s[0] >= 0 && s[0] <= 69) ? '20' + (s[0] < 10 ? '0' + s[0] : s[0] + '') : (s[0] >= 70 && s[0] <= 99) ? '19' + s[0] : s[0] + '';
        return parseInt(this.strtotime(s[2] + ' ' + s[1] + ' ' + s[0] + ' ' + match[2]) + (match[4] ? match[4] / 1000 : ''), 10);
    }

    var regex = '([+-]?\\d+\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)' + '|(last|next)\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))' + '(\\sago)?';

    match = str.match(new RegExp(regex, 'gi')); // Brett: seems should be case insensitive per docs, so added 'i'
    if (match === null) {
        return false;
    }

    for (i = 0, l = match.length; i < l; i++) {
        if (!process(match[i].split(' '))) {
            return false;
        }
    }

    return now.getTime() / 1000 | 0;
}

function nl2br (str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display

    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
function refresh_pic(str){
	$("#piclisttab").html('');
	$("#thumblist").html('');
	if(str==""){
		return;
	}
	var arr=str.split('|');
	for(i=1;i<=arr.length;i++){
		$("#piclisttab").append('<tr><td width="240">相片 '+i+'</td><td class="fontpink"><a href="javascript:delpic('+i+')">删除</a></td></tr>');
		$("#thumblist").append('<img class="showpic" src="/static_data/uploaddata/pics/'+currentShowerid.substr(0,1)+'/thumb_'+arr[i-1]+'.jpg">');
	}
}
function delpic(idx){
	$.get('roomactions.php?action=delpic&idx='+idx,function(r){
		refresh_pic(r);
	})
}
function checkTime(i){
if (i<10) 
  {i="0" + i}
  return i
}
function refresh_background(uuid){
	$('body').css('background',"url('/static_data/uploaddata/pics/"+currentShowerid.substr(0,1)+"/"+uuid+".jpg')");
}
function backToIndex(){
	self.location='/';
}
function showmenu(event,obj){
	if (event.stopPropagation) {
		// this code is for Mozilla and Opera
		event.stopPropagation();
	}
	else if (window.event) {
		// this code is for IE
		window.event.cancelBubble = true;
	}
	if (Live.user_role == 1) {
        //login.show();
         return;
    }
	var objid=obj.getAttribute("id");
	if(objid.substr(0,14)=='rightmenuGUEST'){
		return;
	}
	currentOptUid=$.trim(objid.replace("rightmenu",""));
	if(currentUserID==currentOptUid){
		//return;//自己不显示菜单
	}
	//e.stopPropagation();
	if($.inArray(currentOptUid,roomAdmins)!==-1){
		$("#setAdminMenu").html('取消管理员');
	}
	else{
		$("#setAdminMenu").html('设为管理员');
	}
    var left = $("#righttab").offset().left;
    var top= $(obj).offset().top;
	$("#menu").css('left',(left-130)+"px");
	$("#menu").css('top',top+"px");
	if($("#menu").css('display')=="none"){
		$("#menu").show();
	}
	currentOptUname=$('#rightmenu'+currentOptUid+'_nn').html();
	$(".gzmenuname").html(currentOptUname);
}
function updateBalance(){
	if(Live.user_role==1){
		return;
	}
	Main.queryBalance();
}

//点开新手任务
function misBlockToggle(){
	var div1 = $("#hmk0wyll");
	$("#hmk0wyll").toggle();
	
	misBlockToggleData();
}
//更新任务列表
function misBlockToggleData(){
	if($("#hmk0wyll").css("display")!="none"){
		$("#hmk0wylk").html('<li style="text-align:center;background:none;"><img src="'+cdn_domain+'/images/task/loading_02.gif"/></li>');
		$.get("/ajax/get_current_user_tesk.php", function(v){
			$("#hmk0wylk").html(v);
		});
	}
}
var taskTT2 = false;//是否在做任务2
var taskTT4 = false;
var taskTT6 = false;
//做任务
function misTask(id){
	if(!islogin()){
		login.show();
		return;
	}
	//如果第一个任务没有做，则先做第一个任务
	if($("#mis5 .l a").is("a")){
		id = 5;
	}
	if(id=="5"){//验请邮箱
		showTaskWindow('<div class="bd"><p>完成邮箱验证是完成任务的前提条件哦，只有先验证邮箱才可以做其他任务</p><p style="text-align:center;padding: 5px 0;"><img class="fixpng" src="'+cdn_domain+'/images/task/j457831368685672.png?a"> &nbsp; 完成邮箱验证，奖励<strong>'+$("#mis5").attr("money")+'个'+money_name+'！</strong></p><p class="verifyPhoneWrap"><a href="javascript:void(0)" onClick="taskCheckEmail();" title="现在就验证" class="fixpng verifyPhone">&nbsp;</a></p></div>','','');
	}
	else if(id=="2"){
		taskTT2 = true;
		$("#gift5").click();
		showTaskWindow('<p>送出玫瑰，表达对主播的支持和爱意哦！</p><p>送出1朵玫瑰，奖励<strong>'+$("#mis2").attr("money")+'个'+money_name+'！</strong></p>',"#sendGiftBtn",510);
	}
	else if(id=="4"){
		taskTT4 = true;
		$("#msgContent").val("主播真漂亮[心]");
		showTaskWindow('<p><p>公聊上说句话，开始和主播聊天互动</p><p>和主播打个招呼，奖励<strong>'+$("#mis4").attr("money")+'个'+money_name+'</strong></p>',"#sendChatBtn",510);
	}
	else if(id=="6"){
		taskTT6 = true;
		scroll(0,0);
		showTaskWindow('<p>关注主播，下次再找主播就不迷路了。</p><p>关注1位主播，奖励<strong>'+$("#mis6").attr("money")+'个'+money_name+'</strong></p>',"#addFav2",305);
	}
	else if(id=="3"){
		taskTT3 = true;
		showTaskWindow('<p>每天第一次登录就自动获得10个掌声，还可以累积升级。</p><p></p>送出1个掌声，奖励<strong>'+$("#mis3").attr("money")+'个'+money_name+'</strong><p></p>',"#sendKickback",510);
	}
	else if(id=="7"){
		showTaskWindow('<p>爱心陪伴主播，努力成为主播的房间管理</p><p>成为房管，奖励<strong>'+$("#mis7").attr("money")+'个'+money_name+'</strong></p>','','');
	}
	else if(id=="8"){
		showTaskWindow('<p>有了'+money_name+'，玩的才够嗨！</p><p>第1次充值，奖励<strong>'+$("#mis8").attr("money")+'个'+money_name+'！</strong></p>','','');
	}
}
function taskNextGo(){
	var t = $("#hmk0wylk li .l a");
	if(t.is("a"))
		t.first().click();
	else{
		showTaskWindow('<p>恭喜您所有任务都做完了！</strong></p>','','');
	}
}
//任务完成，显示领钱
function taskOK(id){
	if(id==4){
		$.get("/ajax/get_money.php?taskid=OK4",function(v){
			misBlockToggleData();
		});
	}
	misBlockToggleData();
	showTaskWindow('<p class="notice fixpng">恭喜你完成了此任务！<span class="getRewardBtn fixpng" onClick="misTaskGetMoney('+id+')"></span></p>','','');
	if(id==2)
		taskTT2 = false;
	else if(id==4)
		taskTT4 = false;
	else if(id==6)
		taskTT6 = false;
	else if(id==3)
		taskTT3 = false;
}
//做验证邮箱
function taskCheckEmail(){
	var t='<div class="verifyPhoneForm"><div class="item fix"><span class="label">邮箱地址：</span><div class="fl fix">';
	t+= '<span style="float:left;height:26px;line-height:26px"><input onfocus="if(this.value==\'请填写你邮箱地址\') this.value=\'\'" onblur="if(this.value==\'\') this.value=\'请填写你邮箱地址\'" value="请填写你邮箱地址" id="vp-email" type="text"></span>';
	t+= '<button type="submit" id="vp-subNum" class="getNumBtn" title="获取验证码" onClick="taskCheckEmailData()"></button><p class="prompt" style="visibility:visible;">验证码在首次发送后15分钟内使用有效</p></div><em class="info2" id="vp-pNumInfo"></em></div><div class="item fix"><span class="label">验证码：</span><div class="fl fix"><input onfocus="if(this.value==\'请填写你收到的邮箱验证码\') this.value=\'\'" onblur="if(this.value==\'\') this.value=\'请填写你收到的邮箱验证码\'" value="请填写你收到的邮箱验证码" id="vp-pCode" type="text"><button type="submit" class="submitBtn" id="vp-subCode" title="提交绑定" onClick="taskCheckEmailCode()"></button><p id="vp-pCodeInfo" class="prompt error"></p></div></div></div>';
	showTaskWindow(t,'','');
	if(currentUserEmail!=""){
		$("#vp-email").val(currentUserEmail).attr("readOnly","true");
	}
}
//获取验证码
function taskCheckEmailData(c){
	if($("#vp-passwd").val()==""){
		alert("请填写当前密码");
		return false;
	}
	var email = $.trim($("#vp-email").val());
	if(email=="请填写你邮箱地址" || email==""){
		alert("请填写你邮箱地址");
		return false;
	}
	if(!_IsEmail(email)){
		alert("请填写正确的邮件地址");
		return false;
	}
	
	$("#vp-subNum").addClass("getNumBtn-disable");
	$.get("/ajax/get_money.php?taskid=email&email="+email,function(v){
		$("#vp-subNum").removeClass("getNumBtn-disable");
		alert(v);
	});
}
/*判断Email是否合法*/
function _IsEmail(v){return /^([a-z0-9][a-z0-9_\-\.]+)@([a-z0-9][a-z0-9\.\-]{0,20})\.([a-z]{2,4})$/i.test(v);}
//验证邮箱验证码
function taskCheckEmailCode(){
	var t = $("#vp-pCode").val();
	if(t=="" || t=="请填写你收到的邮箱验证码" || t.length!=6){
		alert("请输入6位验证码");
		return;
	}
	$("#vp-subCode").addClass("submitBtn-disable");
	$.get("/ajax/get_money.php?taskid=CheckEmailCode&code="+t,function(v){
		$("#vp-subCode").removeClass("submitBtn-disable");
		if(v=="ok"){
			misBlockToggleData();
			showTaskWindow('<p class="notice fixpng">恭喜你完成了此任务！<span class="getRewardBtn fixpng" onClick="misTaskGetMoney(5)"></span></p>','','');
		}else
			alert("未找到验证码");
	});
}
//显示弹出框
function showTaskWindow(c,obj,top){
	$(".mis-overlay").remove();
	$("body").append('<div class="mis-overlay" style="display: block;"><div class="bg"></div><b class="close" title="\u5173\u95ed" onClick="$(this).parent().remove()"></b><div class="content"><div class="hd"><img src="'+cdn_domain+'/images/task/f242881368168949.png" />\u4efb\u52a1\u63d0\u793a</div><div class="bd">'+c+'</div></div></div>');
	if(obj!=""){//根据传入的对像对齐
		var offset = $(obj).offset();
		console.log(offset);
		var leftOff = 160;
		if(obj=="#addFav2"){//向上箭头
			$(".mis-overlay").prepend('<img src="'+cdn_domain+'/images/task/v799881368433523.png" class="mis-arrow" style="top:-75px">');
			leftOff += 20;
			top = offset.top+106;
		}else{//向下箭头
			$(".mis-overlay").append('<img src="'+cdn_domain+'/images/task/f530301368433523.png" class="mis-arrow">');
			top -=20;
		}
		
		if(obj=="#sendGiftBtn"){
			top = offset.top-219;
		}else if(obj=="#sendKickback"){//掌声
			leftOff += 25;
			top = offset.top-217;
		}else if(obj=="#sendChatBtn"){
			top = offset.top-225;
		}
		
		
		
		$(".mis-overlay").css("left",(offset.left-leftOff-$(obj).width()/2)+"px").css("top",top+"px");
	}else{//居中
		scroll(0,0);
		$(".mis-overlay").css("left",((($(window).width())/2-(parseInt(500) /2))+parseInt(document.documentElement.scrollTop))+"px").css("top",(($(window).height())/2-(parseInt(285)/2))+"px");
	}
}
//领取任务所得的钱
function misTaskGetMoney(id){
	if(!islogin()){
		login.show();
		return false;
	}
    $.get("/ajax/get_money.php?taskid="+id,function(v){
	    if(v.code=='yes'){
		    misBlockToggleData();
		    showTaskWindow('<p class="done fixpng">成功领取'+v.money+'个'+money_name+'！<span class="nextMission fixpng" onClick="taskNextGo()"></span></p>','','');
		    updateBalance();
		}else{
			alert(v.money);
		}
	},'json');
    return false;
}
function levelImg(u){
	if(isNaN(u))
		return "";
	if(currentShowerid==u){
		//return '<img src="'+cdn_domain+'/apis/levelImg.php?u='+u+'&t=2" class=starTT>';
		return '<em class="zlevel zlv'+currentShowstarlevel+'"></em>';
	}else{
		return '<img src="'+cdn_domain+'/apis/levelImg.php?u='+u+'&t=1" class=richTT>';
	}
}

function getTimeInt(){
	return parseInt(new Date().getTime()/1000);
}
var top5_3_creeent = 0;
//本场直播的粉丝排行榜
function current_fan_top(){
	if(getTimeInt()-top5_3_creeent>120){//2分钟内只能请求1次
		$.get("/ajax/get_room_formerly_month_fan_top.php?v=today&touserid="+currentShowerid,function(data){
			$("#current_fan_top").html(data);
			top5_3_creeent = getTimeInt();
		});
	}
}
var top5_3_month = 0;
//过去30天的粉丝排行榜
function formerly_month_fan_top(){
	if(getTimeInt()-top5_3_month>120){//2分钟内只能请求1次
		$.get("/ajax/get_room_formerly_month_fan_top.php?v=month&touserid="+currentShowerid,function(data){
			$("#formerly_month_fan_top").html(data);
			top5_3_month = getTimeInt();
		});
	}
}
var top5_3_all = 0;
//过去所有的粉丝排行榜
function formerly_all_fan_top(){
	if(getTimeInt()-top5_3_all>120){//2分钟内只能请求1次
		$.get("/ajax/get_room_formerly_month_fan_top.php?v=all&touserid="+currentShowerid,function(data){
			$("#formerly_all_fan_top").html(data);
			top5_3_all = getTimeInt();
		});
	}
}
$(function(){
	if(Chat.canChat){
		Chat.joinin();
	}
	$(document).mouseup(function(e){
		starty=0;
		startdrag=false;
	}).mousemove(function(e){
		if(startdrag){
			var ch=e.pageY-starty;
			$(".public_area").css('height',(290+ch)+'px');
			$(".publicchat").css('height',(250+ch)+'px');
			
			$(".private_area").css('height',(109-ch)+'px');
			$(".privatechat").css('height',(108-ch)+'px');
		}
	});
	//sofaid,的值，已经在room.js中设置了
	$("#getSofaBtn").click(function(){
		if(!Chat.canChat){
			Main.alert('主播不在线不可以进行此操作');
			return;
		}
		var sendNum = $.trim($("#getSofaNum").val());
		if(sendNum<=0 || !$.isNumeric(sendNum)){
			Main.alert('请正确填写沙发数量');
			return;
		}
		swfobject.getObjectById("player").sendGift(4,sendNum,"",currentShowerid,currentRoomNumber,currentShowid,escape(currentShower),currentUserID,escape(currentUserNickname),sofaid);
		$("#buyChairBar").hide();
	});
	$("#saveAnnounceBtn").click(function(){
		var in_pubann = $("#in_pubann").val();
		var in_publink = $("#in_publink").val();
		var in_priann = $("#in_priann").val();
		var in_prilink = $("#in_prilink").val();
		if(in_pubann=="请输入文字，不超过40个字。"){
			in_pubann="";
		}
		if(in_priann=="请输入文字，不超过40个字。"){
			in_priann="";
		}
		if(in_pubann.length>40 || in_priann.length>40){
			Main.alert('公告最长400个汉字');
			return;
		}
		$("#rNoticeCon a").attr("href",in_publink).html(in_pubann);
		$.post("roomactions.php?action=save_announce",{'pub_ann':in_pubann,'pub_link':in_publink,'pri_ann':in_priann,'pri_link':in_prilink},function(r){});
		$(".box1").hide();
		Main.alert("房间公告修改完成");
	});
    setInterval(function(){
		Live.refreshSongRequest();
    },5000);
    $("#bcText").focus(function(){
        $("#bcText").val('');
    });
    $("#bcText").blur(function(){
        if($(this).val()==''){
            $(this).val('50个字以内，每次'+$("#gift65").attr("price")+money_name+'！');
        }
    });
    $(".userList li").live('mousemove',function(e){
        var xx = e.pageX;
        var yy = e.pageY;
    });
	$("#sendAnnounceBtn").live("click",function(){
		if(!Chat.canChat){
			Main.alert('主播不在线不可以发公告');
			return;
		}
        if (Live.user_role == 1) {
            login.show();
            return;
        }
        var k = $('#bcText').val();
        if (k == "" || k=='50个字以内，每次'+$("#gift65").attr("price")+money_name+'！') {
            $('#bcText').focusInput();
            try {
                $("#bcText").focus()
            } catch(j) {}
            return
        }
        if (k.length > 100) {
            Main.alert("您的公告内容过长，请确保不超过50个汉字!");
            return
        }
        $('#bcText').val("");
		swfobject.getObjectById("player").sendGift(65,1,escape(k),currentShowerid,currentRoomNumber,currentShowid,escape(currentShower),currentUserID,escape(currentUserNickname),0);
		
    });
    $("#flyMsgSend").click(function(){
		if(!Chat.canChat){
			Main.alert('主播不在线不可以发飞屏');
			return;
		}if (Live.user_role == 1) {
            login.show();
            return;
        }
        var k = $("#msgContent").val();
        if (k == "") {
			Node.msgCon.focusInput();
            try {
                $("#msgContent").focus()
            } catch(j) {}
            return
        }
        if (k.length > 50) {
            Main.alert("您的飞屏内容过长，请确保不超过25个汉字!");
            return
        }
        $("#msgContent").val('');
        k=replace_face(k,true);//头像替换成文字
		swfobject.getObjectById("player").sendGift(3,1,escape(currentUserNickname+"说："+k),currentShowerid,currentRoomNumber,currentShowid,escape(currentShower),currentUserID,escape(currentUserNickname),0);
    });
	$("#sendKickback").click(function(){
		 if(!Chat.canChat){
			Main.alert('主播不在线不可以送掌声');
			return;
		}
        if (Live.user_role == 1) {
            login.show();
            return;
        }
		swfobject.getObjectById("player").sendKickback(currentShowerid,currentRoomNumber,currentShowid);
    });
	$('#msgContent').keypress(function (e) {
		if (e.which == 13) {
			e.preventDefault();
			if(!$("#sendChatBtn").attr('disabled') && $("#sendChatBtn").is(":visible")){
				$("#sendChatBtn").click();
			}
		} 
	});
    $("#sendChatBtn").click(function(){
		if(!Chat.canChat){
			Main.alert('主播不在线不可以发言');
			return;
		}
        if (Live.user_role == 1) {
            login.show();
            return;
        }
        var k = $("#msgContent").val();
        if (k == "") {
			Node.msgCon.focusInput();
            try {
                $("#msgContent").focus()
            } catch(j) {}
            return
        }
        if ((k.length > 100) && currentUserNumber!=10000) {
            Main.alert("您的聊天内容过长，请确保不超过50个汉字!");
            return
        }
        if (true) {
            var b = 0,
                a = 0,
                d = 0;
            for (var g = 0; g < k.length; g++) {
                var m = k.charAt(g);
                if (FilterStr.dots.indexOf(m) > -1) {
                    d = 1;
                    break
                }
                if (FilterStr.number.indexOf(m) > -1) {
                    b++
                } else {
                    if (FilterStr.letter.indexOf(m) > -1) {
                        a++
                    }
                }
            }
            if ((d || b > 10 || (b + a) > 10) && currentUserNumber!=10000) {
                Main.alert("您的发言中包含过多字母或数字");
                return
            }
        }
        

        if($("#whisper").attr('checked')){
			if(Room.sendMsgToId=="" || Room.sendMsgToId=="ALL"){
				Main.alert("请选择私聊对象");
			}
			Chat.sendP(Room.sendMsgToId,k);
			
		}
		else{
			Chat.send(Room.sendMsgToId,k);
		}
		
    });
    $("#sendGiftBtn").click(function(){
		if(!Chat.canChat){
			Main.alert('主播不在线不可以送礼');
			return;
		}
		if (Live.user_role == 1) {
			login.show();
			return;
		}
		sendGiftNum=$.trim($("#sendGiftNum").val());
		if(sendGiftNum==""){
			sendGiftNum=0;
		}
		if(sendGiftID==0){
			Main.alert('请选择礼物');
			return;
		}
		if(sendGiftNum<=0 || !$.isNumeric(sendGiftNum)){
			Main.alert('请正确填写礼物数量');
			return;
		}
		if(Room.sendGiftToId==0){
			Main.alert('请赠送对象');
			return;
		}
		//$("#sendToUser").val()
		swfobject.getObjectById("player").sendGift(sendGiftID,sendGiftNum,"",Room.sendGiftToId,currentRoomNumber,currentShowid,escape($("#sendToUser").val()),currentUserID,escape(currentUserNickname),0);
    });
	$('#taglist a').live('click',function(){//帖条
		if(!Chat.canChat){
			Main.alert('主播不在线不可以进行此操作');
			return false;
		}
		var sendGiftID=$(this).parent('li').attr('id');
		swfobject.getObjectById("player").sendGift(sendGiftID,1,"",currentOptUid,currentRoomNumber,currentShowid,escape(currentOptUname),currentUserID,escape(currentUserNickname),0);
		$("#taglist").hide();
		return false;
	});
	$(".admBtn").click(function(e){
		e.stopPropagation();
		$(".setupbox").hide();
		$(".admBtn").removeClass('current');
		$(this).addClass('current');
		var boxid=$(this).attr('id').substr(3);
		$(".box"+boxid).show();
	});
	$(".bgattachbtn").click(function(e){
		e.stopPropagation();
		$('body').css('background-attachment',$(this).val());
		if($(this).val()=='fixed'){
			$.post("roomactions.php?action=save_bgtype",{'typeid':0});
		}
		else{
			$.post("roomactions.php?action=save_bgtype",{'typeid':1});
		}
	});
	$(".main_mic").click(function(e){
		$.post("roomactions.php?action=save_main_mic",{'main_mic':$(this).val()});
	});
	Live.refreshSofa();
	Live.refreshSongRequest();
	setTimeout(function(){
		try{
			//swfobject.getObjectById("flyMsgBox").style.visibility='hidden';
			swfobject.getObjectById("giftShapeSwf").style.visibility='hidden';
			swfobject.getObjectById("showGiftSwf").style.visibility='hidden';
			swfobject.getObjectById("showCar").style.visibility='hidden';
			$("#giftShapeSwf").css("z-index","0");
			$("#showGiftSwf").css("z-index","0");
			$("#showCar").css("z-index","0");
		}
		catch(err){
		
		}
	},1000);
});