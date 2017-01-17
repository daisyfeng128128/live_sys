//直播页用
//全局变量，如当前有几个飞屏正在显示
var GLB={
	autoScroll:{'pubHandBox':1,'priHandBox':1,'trendHandBox':1},//聊天框内容多了是否滚动
	lGiftHide:1//是否在显示星际争霸
};
var Node={};//jQuery选择器缓存
Room.sendGiftToId=currentShowerid;//默认是给主播送礼
Room.sendMsgToId="ALL";//对谁说
Room.limitWord=100;//聊天框可以输入的长度

//显示飞屏
GLB.flyRoad=[0,0,0,0,0,0,0,0];
//Room.flyScreen("aaa123");
Room.flyScreen=function(content){
	var tmp_color = ['#fff','#f00','#0f0','#0ff'];//颜色随机
	var t=mt_rand(0,tmp_color.length);
	var flyer=$('<marquee loop=1 scrollAmount=6 behavior="scroll" class="flyScreen"><table class="flycn"><tr><td style="color:'+tmp_color[t]+'">'+faceReplaceImg(content)+'</td></tr></table></marquee>');
	var rId=0,blk=true;
	for(var i=0;i<8;i++){
		if(0==GLB.flyRoad[i]){
			GLB.flyRoad[i]=1;
			rId=i;
			blk=false;
			break;
		}
	}
	if(blk){rId=parseInt(Math.random()*8);GLB.flyRoad[rId]=1;}
	var top=rId*50+50;
	flyer.css('top',top);
	$('body').append(flyer);
	var w=$(window).width()+flyer.children('.flycn').width();
	var t=w/0.065;
	var tm=ie6?t-10000:t;
	setTimeout(function(){
		flyer.remove();
		GLB.flyRoad[rId]=0;
	},tm);
};
//根据用户id取得头像
Room.getUserAvatar=function(userid){
	userid = ""+userid;
	return cdn_domain+'/static_data/uploaddata/avatar/'+userid.substr(0,1)+'/'+userid+'.gif';
};
//初始化用户菜单
Room.bindUserMenu=function(){
	//用户列表中的li
	$('.userList li').live({
		click:function(){
			var userid=parseInt($.trim(this.id.replace(/[a-zA-Z]/,'')));
			if(parseInt(userid)<=0){return;}
			Room.getUserMenu(userid,$.trim($(this).find('p.u a').text()));//对他说
		}
	});
	//公聊框和私聊框中,点击用户名,弹出菜单
	$('#pubChatList a.u,#priChatList a.u').live({
		click:function(){
			var userid=parseInt($.trim(this.id.replace(/[a-zA-Z]/,'')));
			Room.getUserMenu(userid,$.trim($(this).text()));
		}
	});
	//菜单中的，赠送礼物
	Node.sendGift.click(function(){
		Room.sendGiftToId=Room.MouseoverUser.userid;
		
		sendGiftTo=Room.MouseoverUser.userid;
		sendGiftToName=Room.MouseoverUser.nickName;
		
		toUserGiftInput(Room.MouseoverUser);
		Node.selGiftBtn.click();
		Room.UserMenuHide();
		return false;
	});
	
	//菜单中的，对Ta公开的说
	$('#say_pub').click(function(){
		Room.sendMsgToId=Room.MouseoverUser.userid+"-"+Room.MouseoverUser.nickName;//后来加的：userid-用户名
		Node.dstUser.val(Room.MouseoverUser.nickName);
		toUserSayInput(Room.MouseoverUser);
		Node.whisper.attr('checked',false).attr('disabled',false);
		Room.whisperImgChage();
		Node.msgCon.focus();
		Room.UserMenuHide();
		return false;
	});
	//菜单中的，对Ta悄悄的说
	$('#say_pri').click(function(){
		Room.sendMsgToId=Room.MouseoverUser.userid+"-"+Room.MouseoverUser.nickName;//后来加的：userid-用户名
		toUserSayInput(Room.MouseoverUser);
		Node.whisper.attr('checked',true).attr('disabled',false);
		Room.whisperImgChage();
		Node.msgCon.focus();
		Room.UserMenuHide();
		return false;
	});
};
//对所有人说
Room.toAllUser=function(){
	Node.dstUser.val('');
	Node.whisper.attr('checked',false).attr('disabled',true);
	Room.whisperImgChage();
	Room.sendMsgToId="ALL";
};
//显示用户菜单
Room.getUserMenu=function(userid,nickName){
	if(isNaN(userid) || userid<=0)return;//游客不显示菜单
	currentOptUid = userid;
	currentOptUname=nickName;
	currentChatTo=Room.sendMsgToId;
	//currentChatToJID=currentOptUid+"@huofengchat1"+"/"+currentRoomNumber;
	Node.uMenuTlt.text(nickName);
	Node.uMenuAvatar.attr("src",Room.getUserAvatar(userid));
	Room.MouseoverUser={userid:userid,nickName:nickName};
	Node.uMenu.show();
	Node.tinymask.show();
};
Room.UserMenuHide=function(){
	Node.tinymask.hide();
	Node.uMenu.hide();
}
//对他说
function toUserSayInput(user){
	//select不存在
	if(!Node.dstUser.find("option[value="+user.userid+"]").is("option")){
		Node.dstUser.append("<option value='"+user.userid+"'>"+user.nickName+"</option>");
	}
	 Node.dstUser.val(user.userid);
}
//给他送礼
function toUserGiftInput(user){
	//select不存在
	if(!Node.sendToUser.find("option[value="+user.userid+"]").is("option")){
		Node.sendToUser.append("<option value='"+user.userid+"'>"+user.nickName+"</option>");
	}
	 Node.sendToUser.val(user.userid);
}
Room.whisperImgChage=function(){
	if(Node.whisper.is(':checked')){
		Node.whisperImg.addClass("active");
	}else{
		Node.whisperImg.removeClass("active");
	}
}
function showSongRequestWin(){
	var tmpurl = '/songlist.php?action=wap&roomnumber='+currentRoomNumber;
	$("#songDiv .content2").html('<iframe frameborder="0" name="Iframe1" src="'+tmpurl+'" width="100%" height="100%"></iframe>');
}
//页面宽度调整
function pageRs(){
	var winHeight = $(window).height();
	var winWidth = $(window).width();
	var videoHeight = $("#video").height();
	var div_footerHeight = $("#div_footer").height();
	//设置聊天处外框宽度
	$("#div_middle").height((winHeight-videoHeight-div_footerHeight));
	
	
	var div_middleHeight = $("#div_middle").height();
	//聊天内容高度
	$("#div_middle .tabpnls").height((div_middleHeight-$("#div_middle .tab").height()));
	
}
$(function(){
	Node={
		uMenu:$('#userMenu'),//用户菜单div
		uMenuTlt:$("#userMenu .user h5"),//用户菜单中的用户名
		uMenuAvatar:$("#userMenu .user img"),//用户菜单中的用户头像
		sendGift:$('#sendGift'),//菜单中的，赠送礼物
		msgCon:$('#msgContent'),//聊天输入框
		dstUser:$('#dstUser'),//对谁说输入框
		whisper:$('#whisper'),//悄悄说复选框
		whisperImg:$('.div_footer .toolbar1 .checkbox_bg'),//悄悄说复选框,图片
		sendToUser:$('#sendToUser'),//给谁送礼输入框
		selGiftBtn:$('#selGiftBtn'),//送礼物按钮
		giftFix:$("#giftcontent ul.fix"),//每个礼物分类内容
		giftTabA:$("#giftcontent .tab li a"),//礼物切换tab
		giftLi:$('#giftcontent .gift li'),//礼物li
		tinymask:$('#tinymask')//阴影
	};
	pageRs();
	$(window).on("resize",function(){
		pageRs();
	});
	
	//点击页面的任意位置时,将弹出的窗口隐藏,礼物选择等等地方
	$(document).on('mousedown',function(event) {
		var et=$(event.target);
		if(et.hasClass('toggleBox')||et.parents('.toggleBox')[0]){
			return;
		}else if(et.parents('.tip-yellow')[0]){
			return;
		}else{
			$('.toggleBox').hide();
			closeShow();
		}
	});
	//点击弹窗关闭时
	$(".ShowInfo .show_title_close").click(function(){
		closeShow();
	});
	Node.selGiftBtn.click(function(){$('.popBox-gift').show();});
	$("#ribbon").click(function(){$('#ribbons').toggle();});
	$("#giftShapeBtns").click(function(){$('#stdSps').toggle();});
	//表情
	$('#faces,#facesAnn').html(faceHtml_phone);
	$("#msgFace,#msgFaceAnn").click( function() {
		if($(this).attr("id")=="msgFace"){
			$('#faces').toggle();
		}else if($(this).attr("id")=="msgFaceAnn"){
			$('#facesAnn').toggle();
		}
	});	
	initFaceList_phone($("#faces"),function(em){
		var limit=200;
		var text=$("#msgContent").val();
		var tmp=text+em;
		if(limit>=tmp.len()){
			text+=em;
		}
		$("#msgContent").val(text);
		//$("#faces").hide();
	});
	initFaceList_phone($("#facesAnn"),function(em){
		var limit=200;
		var text=$("#bcText").val();
		var tmp=text+em;
		if(limit>=tmp.len()){
			text+=em;
		}
		$("#bcText").val(text);
		//$("#facesAnn").hide();
	});
	//选项卡初始化,如聊天框上面的,排行榜等
	$(".tab li").on('click',function(){
		var rel=$(this).attr("rel");
		if(rel){
			$(this).parent().children().removeClass("on");
			$(this).addClass("on").parents(".mh").siblings('.mb').children().hide();
			$("#"+rel).show();
		}
		return false
	});
	
	//礼物分类
	Node.giftTabA.click(function(){
		Node.giftTabA.removeClass("on");
		$(this).addClass("on");
		Node.giftFix.hide();
		$("#gl"+$(this).parent().attr("class")).show();
		return false;
	});
	//点击某个礼物
	Node.giftLi.click(function(){
		Node.giftLi.removeClass("active");
		$(this).addClass("active");
		sendGiftID = parseInt($(this).attr('id').replace("gift",""));//live.js用
		//发送给谁显示一下名字
		//$('#sendToUser').val(sendGiftToName);
	});
	//选择上面的数量时
	$('#stdSps a').click(function(){
		$('#sendGiftNum').val($(this).attr('rel'));
		$('#stdSps').hide();
		return false;
	});
	Node.dstUser.change(function(){
		if($(this).val()==""){
			Node.whisper.attr('checked',false);
			Node.whisper.attr("disabled",true);
		}else{
			Node.whisper.attr("disabled",false);
		}
		Room.whisperImgChage();
	});
	Node.whisper.change(function(){
		Room.whisperImgChage();
	});
	Room.bindUserMenu();
});
//显示弹框，onClick='ShowInfo('ShowInfo',this);'
function ShowInfo(id,e){
	var e = arguments.callee.caller.arguments[0] || window.event;
	window.event?e.returnValue = false:e.preventDefault();
	window.event?e.cancelBubble:e.stopPropagation();
	var obj = $("#"+id);
	obj.css("width","640px");
	
	obj.css("left",0);
	obj.css("top",($("body").height()-obj.height())/2+"px");
	//obj.css("top","100px");
	obj.show();
	Node.tinymask.show();
	return false;
}
function closeShow(){
	$('.toggleBox').hide();
	Node.tinymask.hide()
}
//-------------------------------下面是函数------------------------------------
var isIE = !!window.ActiveXObject;
var ie6=isIE&&!window.XMLHttpRequest;
var ie8=isIE&&!!document.documentMode;  
var ie7=isIE&&!ie6&&!ie8;
function $ID(id){
	return document.getElementById(id);
}
//对字符串,返回字符长度
String.prototype.len=function(){
	return this.replace(/[^\x00-\xff]/g,"rr").length;
};
//截取字符串
String.prototype.sub = function(n){
	var r = /[^\x00-\xff]/g;
	if(this.replace(r, "mm").length <= n){return this;}
	// n = n - 3; 
	var m = Math.floor(n/2);
	for(var i=m; i<this.length; i++){
		if(this.substr(0, i).replace(r, "mm").length>=n){
			return this.substr(0, i) ; 
		}
	}
	return this;
};
//去特殊符号等
function filter(content){
	content=$.trim(content);
	var con=content.replace(/([{}%\\])/g,"").replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&acute;').replace(/"/g, '&quot;').replace(/\\/g, '\\\\').replace(/\s{1,}/g," ");
	if(!IsURL(con)){con=con.replace(/(http:\/\/)?([wW]{3}\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/g,'*');}
	return con;
}
function formatLuckNum(n){
	if(+n){
		return '<span class="fluck">('+n+')</span>';
	}else{
		return '';
	}
}
function IsURL(str_url){
	var strRegex=/(http:\/\/)?([wW]{3}\.)?(5iu)+\.(org)/g
	var re=new RegExp(strRegex);
	if(re.test(str_url)){
		return true;
	}else{
		return false;
	}
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
//-------------------------------函数end------------------------------------