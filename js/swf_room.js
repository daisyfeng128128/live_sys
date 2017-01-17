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
//对字符串增加函数,返回字符长度
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
//用户登录后绑定弹框等等
Room.topUserInit=function(){
	$(".border_center input").live("focus",function(){
		$(this).css("color","#333").parent().parent().addClass("orange");
	}).live("blur",function(){
		$(this).css("color","#999").parent().parent().removeClass("orange");
	});
	/*topbar功能模块——登录前*/
	//监听登录按钮事件
	$("#top .btn_login").click(function(){
		var n=$("#top .login_layout");
		if(n.hasClass('hide')){
			$("#loginBoxTips").empty();
			$(this).css("background-position","-66px 0");
			n.removeClass("hide");
			$("#top .email").focus();
		}else{
			n.addClass("hide");
			$("#top .btn_login").css("background-position","0 0");
			$("#top .email").blur();
		}
	});
	var fnlayoutHide=function(){
		var o=$("#top .fn_layout");
		o.removeClass("orange").find(".fn_content").addClass("hide");
		if(ie6){
			o.find(".arrows").css("background-position","-6px -198px");
			o.find(".icon_nick").css("background-position","0 -226px");
			o.find(".icon_online").css("background-position","0 -258px");
			o.find(".icon_mail").css("background-position","7px -293px");
		}
		return false;
	};
	/*topbar功能模块——登录成功后*/
	$("#top .fn_layout").live("mouseenter",function(){
		$(this).addClass("orange").find(".fn_content").removeClass("hide");
		if(ie6){
			$(this).find(".arrows").css("background-position","-6px -166px");
			$(this).find(".icon_nick").css("background-position","-70px -226px");
			$(this).find(".icon_online").css("background-position","-70px -258px");
			$(this).find(".icon_mail").css("background-position","-63px -293px");
		}
	}).live("mouseleave",fnlayoutHide);
	$('#mailTopbox .icon_close').live('click',fnlayoutHide);
}
//页面顶部修改昵称
Room.editNickName=function(){
	var editnickname = $.trim($("#editnickname").val());
	if(''==editnickname){return;}
	if(4>editnickname.len()){Main.alert('昵称太短了，最少4位');return;}
	var nickname=filter(editnickname.sub(20).toString());
	Main.getDate({
		url: 'ucenter.php?action=nickname&js=1',
		data: {
			nickname:(nickname)
		}
	}, function(data){
		if('200'!=data.errorCode){
			Main.alert(data.errorMessage);
		}else{
			window.location.reload();
		}
	});
	return false;
};
//取得用户的关注列表
Room.getAddFavList=function(){
	Main.getDate({
		url: 'ajax/le/getAddFavList.php'
	}, function(data){
		var list='';
		$('.fn3_middle ul').empty();
		if(0==data.length){
			list='<li class="noFav">暂无关注</li>';		
		}
		for(var i=0;i<data.length;i++){
			list+='<li><span class="camstate camstate'+data[i].status+' icons"></span><em class="fl zlevel zlv'+data[i].starlevel+'" ></em><span class="uname"><a href="/'+data[i].usernumber+'.html" target="_blank">'+data[i].nickname+'</a></span></li>';
			if(currentRoomNumber==data[i].usernumber){
				$('#addFav2').attr('title','已关注');			
				$('#addFav2').css('background-position','-1px -67px').off();
			}
		}
		$('.fn3_middle ul').append(list);
		$('.fn3_middle ul').append('<li style="text-align:center; "><a href="/ucenter.php?ptype=history" target="_blank" style="color:#ff6c00; text-decoration:underline;">我的关注主播</a></li>');
	});
}
//关注主播
Main.addSiteFav=function(b){
	if(!islogin()){
		return false;
	}
	Main.getDate({
		url: 'ajax/addfav.php?b='+b,
		data: {
			roomnumber:currentRoomNumber
		}
	}, function(data){
		if('200'==data.errorCode){
			if(!ie6 && $('.noFav')[0]){
				$('.noFav').remove();
				$("html,body").animate({scrollTop: $("#topbar").offset().top}, 600);
				$(".att_prompt").show(1000).delay(2000).hide(300);  
			}
			Room.getAddFavList();
			if(taskTT6)//做任务，关注1位主播
				taskOK(6);
		}else if('10110'==data.errorCode){
			//Main.alert('已添加关注');
		}else{
			//Main.alert(data.errorMessage);
		}
		//通知flash刷新
		swfobject.getObjectById("player").refreshFav();
	});
};
//绑定礼物跑道
Room.bindGiftTrack=function(){
	$('.giftShowPnl .wrap_rel').hover(function(){
		clearTimeout(GLB.outTimer);
		GLB.hoverTimer=setTimeout(function(){
			if($('#giftShowPnl').hasClass('runwayOn')){
				$('#toGiftTip').slideDown();
			}
			$('#giftShowPnl .atab').fadeIn();
		},100)
	},function(){
		clearTimeout(GLB.hoverTimer);
		GLB.outTimer=setTimeout(function(){
			if($('#giftShowPnl').hasClass('runwayOn')){
				$('#toGiftTip').slideUp();
			}
			$('#giftShowPnl .atab').fadeOut();
		},100);
	});
	$('#giftShowPnl .atab a').on('click',function(){
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
		if($(this).hasClass('atab1')){
			GLB.lGiftHide=1;
			$('#giftShowPnl').removeClass('runwayOn');
			$('#xjGiftTip2').css('text-indent','-1000px');
			//$('#movelist1').empty();
			$('.toGiftTip').hide();
		}else{
			GLB.lGiftHide=0;
			$('#giftShowPnl').addClass('runwayOn');
			$('#xjGiftTip2').css('text-indent','0');
			$('.toGiftTip').show();
		}
		return false;
	});
	$('.xjGiftTip').hover(function(){
		clearTimeout(GLB.outtTimer);
		GLB.hovertTimer=setTimeout(function(){
			var tip=$('#giftShowPnl .newStip');
			if(!tip[0]){
				tip=$('<div class="newStip"><div class="wrap_rel"><p>送给主播星际战舰达到一定数量就可跟主播一起成为星际堡垒主人，堡垒主人拥有炫丽的房间进场效果和用户列表特殊展示哦。</p><div class="arrow icon"></div></div></div>');
				$('#giftShowPnl').append(tip);
			}
			tip.fadeIn();
		},100)
	},function(){
		clearTimeout(GLB.hovertTimer);
		GLB.outtTimer=setTimeout(function(){
			var tip=$('#giftShowPnl .newStip');
			tip.fadeOut(function(){
				tip.remove();
			});
		},500);
	});
	$('.xjGiftTip2').hover(function(){
		clearTimeout(GLB.outtTimer);
		GLB.hovertTimer=setTimeout(function(){
			var tip2=$('#giftShowPnl .newStip');
			if(!tip2[0]){
				tip2=$('<div class="newStip" style="top:16px"><div class="wrap_rel"><p>送出礼物宝箱-豪华下的礼物或单次送礼价值超过10000，即可<br/>展示在礼物跑道上哦。</p><div class="arrow icon"></div></div></div>');
				$('#giftShowPnl').append(tip2);
			}
			tip2.fadeIn();
		},100)
	},function(){
		clearTimeout(GLB.hovertTimer);
		GLB.outtTimer=setTimeout(function(){
			var tip2=$('#giftShowPnl .newStip');
			tip2.fadeOut(function(){
				tip2.remove();
			});
		},500);
	});
}
//字幕滚动,如礼物跑道
function movelist(list,t,direct,speed){
	var _wrap=$(list);
	var _interval=t||5000;
	var _moving;
	speed=speed||600;
	_wrap.hover(function(){
		clearInterval(_moving);
	},function(){
		_moving=setInterval(function(){
			_wrap=$(list);
			var _field=_wrap.find('li:first');
			if(_field[0]){
				if(direct){
					var _w=_field.width();
					_field.animate({marginLeft:-_w+'px'},speed,function(){
						_field.css('marginLeft',0).appendTo(_wrap);
					});
				}else{
					var _h=_field.height();
					_field.animate({marginTop:-_h+'px'},600,function(){
						_field.css('marginTop',0).appendTo(_wrap);
					});
				}
			}
		},_interval);
	}).trigger('mouseleave');
}
//星际争霸
var XjRunway={
	obj:null,
	name:'xjRunway',
	init:function(){
		swfobject.embedSWF("/static_data/swf/XjRunway1.0.swf", this.name, '100%', '100%', "10.0", "", {},{wmode: "transparent",allowScriptAccess: "always"});
	},
	callJs:function(obj){
			XjRunway.obj=swfobject.getObjectById(XjRunway.name);
			Main.getDate({url:'ajax/le/get_xjRunway.php?rankerId=1'}, function(data){
				if(data.dstNickName!=""){
					var msg='<font color="#edebeb"><font color="#AAF2F9">'+(data.srcNickName)+'</font> 送出 '+(data.amount)+' 架星际战舰为<font color="#AAF2F9">'+(data.dstNickName)+'</font> 攻下了星际堡垒，他们正在统治整个星球！</font>';
					XjRunway.setData(msg,'','onlyShowInfo');
				}else{
					XjRunway.setData('星际堡垒无人占领，1架战舰即可攻占，快快来抢先占领吧！','','onlyShowInfo');
				}
			});
	},
	setData:function(msg,time,type){
		type=type||'pass';
		XjRunway.obj.setData({"type":type,"msg":msg,"time":''});
	}
	
};

//开灯关灯
Room.bindOpenCloseLight=function(){
	$('.c_lc').on("mouseenter",function(){
		$(this).animate({"top": "89px"}, 500);
		return false;    
	}).on("mouseleave",function(){
		$(this).animate({"top": "79px"}, 500);
		return false;
	}).toggle(function(){
		$(this).css("background-position","-12px -89px");
		$(this).attr({"_img":$("body").attr("style"),"title":"开灯"});
		$("body").attr("style","");
	},function(){
		$(this).css("background-position","-91px -89px").attr("title","关灯");
		$("body").attr({"style":$(this).attr("_img")});
	});
}

//沙发
Room.shaFa=function(){
	$('#chairList li').live({
		mouseenter:function(){
			var offset=$(this).offset();
			$('#chairCrtip').css({
				top:offset.top-10,
				left:offset.left-8
			}).show();
			$ID('chrPrice').innerHTML=+$(this).attr('data_price')+1;
		},
		mouseleave:function(){
			$('#chairCrtip').hide();
		},
		click:function(){
			sofaid=this.id.replace('chair','');
			var offset=$(this).offset();
			$('#getSofaNum').val(+$(this).attr('data_price')+1);
			$('#buyChairBar').css({
				top:offset.top+50,
				left:offset.left-17
			}).show();
			return false;
		}
	});
}
//礼物初始化
Room.giftsInit=function(){
	//浏览器窗口改变时将礼物窗口位置重新调整
	$(window).resize(function(){
		$('#bcCon').width(document.body.clientWidth-400).parents('#broadcast');
		var p=$('.popBox-gift');
		if('none'!=p.css('display')){
			p.hide();
			$('#selGiftBtn').mousedown();
		}
	});
	//显示出礼物
	$('#selGiftBtn').mousedown(function(){
		$('.giftShapeList').hide();
		var c=167,cc=21;
		var offset=$(this).offset();
		$('.popBox-gift').css({top:offset.top-c,left:offset.left-cc}).toggle();
		return false;
	});
	//礼物分类
	$("#giftcontent .tab li a").click(function(){
		$("#giftcontent .tab li a").removeClass("on");
		$(this).addClass("on");
		$(this).parent().parent().siblings(".fix").hide();
		$("#gl"+$(this).parent().attr("class")).show();
		return false;
	});
	//点击某个礼物
	$('#giftcontent .gift li').click(function(){
		$('#tinymask').hide();
		$('#selGiftBtn').removeClass('gftIdx').html('<img class="'+$(this).children('img').attr('class')+'" title="'+$(this).children('.gfname').text()+'" src="'+$(this).children('img').attr('src')+'" />');
		sendGiftID = parseInt($(this).attr('id').replace("gift",""));//live.js用
		$('.popBox-gift').hide();
		$('.hiborder').hide();
		//发送给谁显示一下名字
		$('#sendToUser').val(sendGiftToName);
	})
	.toolTip()//鼠标移到礼物上，显示礼物价格
	;
	
	//将礼物窗口打开
	//$('#selGiftBtn').mousedown();
}
//加载本次直播礼物排行(公聊旁边的)
Room.updateGift=true;
Room.getGiftLog=function(){
	if(Room.updateGift){
		Room.updateGift=false;
		var giftList=$('#giftList');
		if(currentShowid=="")return false;
		Main.getDate({
			url: 'ajax/le/currentGiftsTop.php',
			data:{
				end_time:new Date().format("yyyy-MM-dd hh:mm:ss"),
				showid:currentShowid
			}
		}, function(json){
			//请求响应后，最少要再等5秒可再次请求
			setTimeout(function(){
				Room.updateGift=true;
			},5000);
			if('succ'==json.error){
				if(!json.items){return;}
				var list='',ii=1;
				for(var i=0;i<json.items.length;i++){
					var d=data=json.items[i];
					list+='<li><p class="name"><span>'+ii+'. </span><a data_gvid="'+d.userid+'" href="javascript:;" title="'+d.nickname+'">'+d.nickname+'</a></p><p class="g">'+d.giftimg+'<span>'+d.giftnum+'</span></p></li>';
					ii++;
				}
				giftList.html(list);
			}else{
				Main.alert(json.error);
			}
		});
	}else{
		return false;
	}
};
//聊天框中的拖动条
Room.initDragSlider=function(){
	var slideTop=$('#cChat_slideBar').css("top");
	var pubBoxHeight=$('#cChat_pubHandBox').height();
	var priBoxHeight=Node.cPriBox.height();
	var trendBoxHeight=$('#cChat_trendHandBox').height();
	var tslideTop=$('#trendslideBar').css("top");
	var tHandBoxTop=$('#trendHandBox').css('top');
	var priHandBoxTop=$('#priHandBox').css('top');
	var cgY,tcgY;
	
};
//初始化清屏操作
Room.initHandBox=function(){
	var pubHandBox = $("#pubHandBox");
	var priHandBox = $("#priHandBox");
	//鼠标移到按钮上，按钮还显示
	$('.pubHandBox').on({
		mouseenter:function(){
			$(this).show();
		},
		mouseleave:function(){
			$(this).children('a').hide().end().children('button').show();
		}
	});
	//鼠标移到公聊框
	$('#cChat_pubHandBox').on({
		mouseenter:function(){
			pubHandBox.show();
		},
		mouseleave:function(){
			pubHandBox.hide();
		}
	});
	//鼠标移到私聊框
	Node.cPriBox.on({
		mouseenter:function(){
			priHandBox.show();
		},
		mouseleave:function(){
			priHandBox.hide();
		}
	});
	
	$('.scollAutoHide').hover(function(){
		$(this).css('overflow','auto');
		var id=this.id.replace('cChat_','');
		if(GLB.autoScroll[id]){
			$(this).scrollTop(this.scrollHeight);
		}
	},function(){
		$(this).css('overflow','hidden');
	});
	
	//鼠标移到按钮上
	$('.pubHandBox button').on({
		mouseenter:function(){
			$(this).hide().siblings('a').css('display','inline-block');
		}
	});
	//绑定操作事件
	Node.cHandBox.children('a').on('click',function(){
		var pid=$(this).parent().attr('id');
		switch(this.className){
			case 'clearListBtn'://清屏
				$('#cChat_'+pid+' .chatList li').remove('li');
			break;
			case 'rollPauseBtn'://滚动
				this.className='rollAutoBtn';
				GLB.autoScroll[pid]=0;
				if(pid=="pubHandBox"){
					Chat.scrollPublicChat = false;
				}else{
					Chat.scrollPrivateChat = false;
				}
				
			break;
			case 'rollAutoBtn'://不要滚动
				this.className='rollPauseBtn';
				GLB.autoScroll[pid]=1;
				if(pid=="pubHandBox"){
					Chat.scrollPublicChat = true;
				}else{
					Chat.scrollPrivateChat = true;
				}
			break;
		}
		return false;
	});
};
//Room.printBc("10:90",{"roomid":600336,"src_nickname":"hao123","src_lucknumber":"ccccccc","src_usrid":"123"},"我的中国心");
//显示广播
Room.printBc=function(time,obj,content){
	$('#bcCon').width(document.body.clientWidth-400).parents('#broadcast');
	content=content||obj.msginfo[0].content;
	var list=$('<li class="bcItem"><span class="tipTime">'+time+'</span><a href="/'+obj.roomid+'" target="_blank"><span class="tipName">'+obj.src_nickname+'</span>'+formatLuckNum(obj.src_lucknumber)+'：<span class="tipWords">'+content+'</span></a></li>');
	var ul=$('#bclist'),bc=$('#broadcast');
	ul.append(list);
	bc.show();
	var _w=$('#bcCon').width();
	list.css('marginLeft',_w);
	list.animate({'marginLeft':0},2000);
	setTimeout(function(){
		list.fadeOut(function(){
			$(this).remove();
			if(''==ul.html()){
				bc.hide();
			}
		})
	},15000);
};
//显示飞屏函数
GLB.flyRoad=[0,0,0,0,0,0,0,0];
//Room.flyScreen("aaa123");
Room.flyScreen=function(content){
	if(!Live.showflyMsgBoxSwitch){return;}
	var tmp_color = ['#fff','#f00','#0f0','#0ff'];//颜色随机
	var t=mt_rand(0,tmp_color.length);
	var flyer=$('<marquee loop=1 scrollAmount=6 behavior="scroll" class="flyScreen"><table class="flycn"><tr><td style="color:'+tmp_color[t]+'">'+content+'</td></tr></table></marquee>');
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
	var top=rId*50+260;
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
//初始化用户菜单
Room.bindUserMenu=function(){
	//用户列表中的li
	$('.userList li').live({
		mouseenter:function(){
			var userid=parseInt($.trim(this.id.replace(/[a-zA-Z]/,'')));
			Room.getUserMenu(userid,$.trim($(this).find('p.u a').text()),$(this));
		},
		mouseleave:function(){
			Node.uMenu.hide();
		},
		click:function(){
			if (Live.user_role == 1) {
				login.show();
				return;
			}
			var userid=parseInt($.trim(this.id.replace(/[a-zA-Z]/,'')));
			if(parseInt(userid)<0){return;}
			Room.sendMsgToId=userid+"-"+$.trim($(this).find(".u a").html());//后来加的：userid-用户名
			toUserSayInput($.trim($(this).find('p.u a').text()));//对他说
			Node.msgCon.focus();
		}
	});
	//公聊框和私聊框中,点击用户名,弹出菜单
	$('#pubChatList a.u,#priChatList a.u').live({
		click:function(){
			if (Live.user_role == 1) {
				login.show();
				return;
			}
			var userid=parseInt($.trim(this.id.replace(/[a-zA-Z]/,'')));
			Room.getUserMenu(userid,$.trim($(this).text()),$(this));
		}
	});
	//菜单外框
	Node.uMenu.hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
	});
	//菜单中的，赠送礼物
	Node.sendGift.click(function(){
		Room.sendGiftToId=Room.MouseoverUser.userid;
		
		sendGiftTo=Room.MouseoverUser.userid;
		sendGiftToName=Room.MouseoverUser.nickName;
		
		toUserGiftInput(Room.MouseoverUser.nickName);
		$('#selGiftBtn').mousedown();
		return false;
	});
	
	//菜单中的，对Ta公开的说
	$('#say_pub').click(function(){
		Room.sendMsgToId=Room.MouseoverUser.userid+"-"+Room.MouseoverUser.nickName;//后来加的：userid-用户名
		Node.dstUser.val(Room.MouseoverUser.nickName);
		toUserSayInput(Room.MouseoverUser.nickName);
		Node.whisper.attr('checked',false);
		Node.msgCon.focus();
		return false;
	});
	//菜单中的，对Ta悄悄的说
	$('#say_pri').click(function(){
		Room.sendMsgToId=Room.MouseoverUser.userid+"-"+Room.MouseoverUser.nickName;//后来加的：userid-用户名
		toUserSayInput(Room.MouseoverUser.nickName);
		Node.whisper.attr('checked',true);
		Node.msgCon.focus();
		return false;
	});
	//对谁说输入框
	Node.dstUser.hover(function(){
		Node.switchChat.css('visibility','visible');
	},function(){
		Node.switchChat.css('visibility','hidden');
	}).click(function(){
		if(Node.talkUser.children().length>0){
			var offset=$(this).offset();
			$('#talkUser').css({top:offset.top+25,left:offset.left}).show();
			$(this).addClass('o_bder');
		}
		return false;
	});
	//鼠标移动到对谁说输入框上显示X
	Node.switchChat.hover(function(){
		$(this).css('visibility','visible');
	},function(){
		$(this).css('visibility','hidden');
	});
	//点击上面，显示X
	Node.switchChat.click(function(){
		Room.toAllUser();
		return false;
	});
	//点击对谁说输入框，弹出的a
	$('#talkUser a').live('click',function(){
		Room.sendMsgToId=this.id.replace('sid','')+"-"+$(this).html();//后来加的：userid-用户名
		Node.dstUser.val($(this).text()).removeClass('o_bder');
		Node.whisper.attr('disabled',false);
		Node.switchChat.show();
		$('#talkUser').hide();
		return false;
	});
	//函数，鼠标移到pnd上显示cnd,用在给他贴条
	Room.hoverFun=function(pnd,cnd,ot,ol){
		var hoverTimer,outTimer;
		ot=ot||0;ol=ol||0;
		pnd.live({
			mouseenter:function(){
				clearTimeout(hoverTimer);
				var $this=$(this);
				setTimeout(function(){
					var offset=$this.offset();
					if(offset.top){
						cnd.css({top:offset.top+ot,left:offset.left+ol}).show();
					}
				},50)
			},
			mouseleave:function(){
				outTimer=setTimeout(function(){
					cnd.hide();
				},100);
			}
		});
		cnd.live({
			mouseenter:function(){
				clearTimeout(outTimer);
				pnd.addClass('menuovr');
				$(this).show();
				Node.uMenu.show();
			},
			mouseleave:function(){
				var $this=$(this);
				Node.uMenu.hide();
				pnd.removeClass('menuovr');
				hoverTimer=setTimeout(function(){
					$this.hide();
				},100);
			}
		});
	};
	//绑定给他贴条
	Room.hoverFun($('#addTag'),$('#taglist'),-130,180);
};
//对所有人说函数
Room.toAllUser=function(){
	Node.dstUser.val('所有人').removeClass('o_bder');
	Node.whisper.attr('checked',false).attr('disabled',true);
	Room.sendMsgToId="ALL";
	Node.switchChat.hide();
	$('#talkUser').hide();
};
//显示用户菜单
Room.getUserMenu=function(userid,nickName,o,micMenu){
	if(isNaN(userid) || userid<=0)return;//游客不显示菜单
	if (Live.user_role == 1)return;//不登录不显示菜单
	currentOptUid = userid;
	currentOptUname=nickName;
	currentChatTo=Room.sendMsgToId;
	currentChatToJID=currentOptUid+"@huofengchat1"+"/"+currentRoomNumber;
	if($.inArray(currentOptUid,roomAdmins)!==-1){
		$("#setAdmin").html('取消管理员');
	}
	else{
		$("#setAdmin").html('设为管理员');
	}
	//主播自己不显示设为管理员
	if(userid==currentShowerid)
		$("#setAdmin").hide();
	else
		$("#setAdmin").show();
	Node.uMenuTlt.text(nickName);
	var offset=o.offset();
	Node.uMenu.css({top:offset.top-5,left:offset.left-181}).show();
	Node.adminMenu.show();//隐藏管理员面板
	Room.MouseoverUser={userid:userid,nickName:nickName};
	Node.sendGift.css('display','block');
	Node.addTag.css('display','block');
};
//对他说
function toUserSayInput(uname){
	uname = $.trim(uname);
	Node.dstUser.val(uname);
	Node.whisper.attr('disabled',false);
	Node.switchChat.show();
	var li='<a href="javascript:;" id="sid'+Room.MouseoverUser.userid+'" class="preUser">'+uname+'</a>';
	if(!$('#talkUser #sid'+Room.MouseoverUser.userid)[0]){
		Node.talkUser.append(li);
	}
	Node.talkUser.children('a').removeClass('liodd');
	Node.talkUser.children('a:even').addClass('liodd');
}
//给他送礼
function toUserGiftInput(uname){
	Node.sendToUser.val(uname);
	var li='<a href="javascript:;" id="gid'+Room.sendGiftToId+'" class="preSdUser">'+uname+'</a>';
	if('1'==Room.sendGiftToId){
		Node.giftUser.append(li);
	}else{
		if($('#giftUser #gid'+Room.sendGiftToId).length<1){
			Node.giftUser.append(li);
		}
	}
	Node.giftUser.children('a').removeClass('liodd');
	Node.giftUser.children('a:even').addClass('liodd');
}
//广告滚动
var initSlider=function(){
	var play,$active,isRotate=0;
	clearInterval(play);
	$(".paging").show();
	//$(".paging a:first").addClass("active");
	var win=$(".window");
	var imageWidth=win.width();
	var imageSum=$(".image_reel img").size();
	$(".image_reel").css({'width':imageWidth*imageSum});
	var t=isIE?1:500;
	var rotate=function(){
		var triggerID=+$active.attr("rel")-1;
		$(".paging a").removeClass('active');
		$active.addClass('active');
		var left=-triggerID*imageWidth;
		$(".image_reel").animate({
			left:left
		}, t);
	}; 
	var rotateSwitch=function(){
		isRotate=1;
		play=setInterval(function(){
			$active=$('.paging a.active').next('a');
			if($active.length===0){
				$active=$('.paging a:first');
			}
			rotate();
		},11000);
	};
	$(window).on('scroll',function(){
		if($(window).scrollTop()+$(window).height()>(win.offset().top+win.height()+100)){
			if(!isRotate){
				rotateSwitch();
			}
		}else{
			isRotate=0;
			clearInterval(play);
		}
	}); 
	$(".paging a").click(function() {
		$active=$(this); 
		clearInterval(play);
		rotate();
		rotateSwitch();
		return false;
	});
	$(".image_reel a").hover(function() {
		clearInterval(play);
	}, function() {
		rotateSwitch();
	});
};
Main.getBanner=function(type,callback){
	Main.getDate({url:'ajax/new/getBanne.php',data:{bannerType:type}},callback);
};
Main.initBanner=function(index,id){
	Main.getBanner(index,function(d){
		var o=$(id),n=d.length;
		if(n>0){
			var lk='',cls='',alk='';
			for(var i=0;i<n;i++){
				lk+='<a href="'+d[i].url+'" target="_blank"><img src="'+d[i].picSrc+'" title="'+d[i].title+'" alt="'+d[i].title+'"></a>';
				cls=0==i?'active':''
				alk+='<a href="" rel="'+(i+1)+'" id="" class="'+cls+'"> </a>';
			}
			if(Main.index){
				$('#KinSlideshow').html(lk);				
				$.getScript("js/plugins/KinSlideshow.min.js", function() {
					$("#KinSlideshow").KinSlideshow({mouseEvent:"mouseover",titleFont:{TitleFont_size:14},btn:{btn_bgColor:"#b3b3b3",btn_bgHoverColor:"#fe7e00", btn_fontColor:"#2d2d2d",btn_fontHoverColor:"#FFF",btn_borderColor:"0",btn_borderHoverColor:"0",btn_borderWidth:0,btn_bgAlpha:0.9}});
				});													
			}else{
				$('.image_reel').html(lk);
				$('.paging').html(alk);
				if(n>1){
					initSlider();
					if(ie6){
						DD_belatedPNG.fix('.paging a'); 
					}
				}
			}
			if(lk){
				o.show();
			}
		}else{
			o.hide();
		}
	});
}
//聊天下面的滚动广告
Room.initBanner=function(){

};
//表情,彩条，发言快捷方式隐藏
Room.hideChatBox=function(){
};

//页面初始化
$(function(){
	Node={
		cHandBox:$('.pubHandBox'),//清屏设置按钮
		pubBox:$('#pubHandBox'),//公聊清屏设置按钮
		priBox:$('#priHandBox'),//私聊清屏设置按钮
		uMenu:$('#userMenu'),//用户菜单div
		uMenuTlt:$("#userMenu h5"),//用户菜单中的用户名
		adminMenu:$('#adminMenu'),//管理员菜单
		sendGift:$('#sendGift'),//菜单中的，赠送礼物
		addTag:$('#addTag'),//菜单中的，给Ta贴条
		talkUser:$('#talkUser div'),//对谁说弹出选择框
		giftUser:$('#giftUser div'),//给谁送礼弹出选择框
		cPriBox:$('#cChat_priHandBox'),//私聊外框
		taskPnl:$('.taskPnl'),//页面右侧中部新手任务弹出按钮
		taskPnlBd:$('.taskPnl .bd'),//新手任务内容框
		ucreateTime:$('#ucreateTime'),//开播时间
		msgCon:$('#msgContent'),//聊天输入框
		dstUser:$('#dstUser'),//对谁说输入框
		whisper:$('#whisper'),//悄悄说复选框
		switchChat:$('.switchChat'),//切公聊
		sendToUser:$('#sendToUser')//给谁送礼输入框
	};
	//用户已经登录了
	if(currentUserNumber!=""){
		Room.topUserInit();//用户登录后绑定弹框等等
		Room.getAddFavList();//取得用户的关注列表
		//绑定关注主播按钮
		$('#addFav2').css('background-position','-1px -13px');
		$('#addFav2').off().on('click',Main.addSiteFav);
		Room.bindUserMenu();//初始化用户菜单,没登录则不需
		Main.getMainNum();//查一下是否有信，只有直播页要查,在头部显示
	}else{
		$("#botBox").show();//页面低部显示注册有礼div
		setInterval(function(){//用户没有登录间隔1分钟弹出登录框
			login.show();
		},60000);
	}
	Room.bindGiftTrack();//礼物跑道切换
	movelist('#movelist1');//礼物跑道滚动
	XjRunway.init();//星际争霸
	$("#xjzbBtn").click();//点击一下星际争霸
	Room.bindOpenCloseLight();//开灯关灯
	Room.shaFa();//沙发
	Room.giftsInit();//礼物初始化
	//点击页面的任意位置时,将弹出的窗口隐藏,礼物选择等等地方
	$(document).on('mousedown',function(event) {
		var et=$(event.target);
		if(et.hasClass('toggleBox')||et.parents('.toggleBox')[0]){
			return;
		}else if(et.parents('.tip-yellow')[0]){
			return;
		}else{
			$('.toggleBox').hide();
			$('#dstUser').removeClass('o_bder');
			$('#sendToUser').removeClass('o_bder');
		}
	});
	//选项卡初始化,如聊天框上面的,排行榜等
	$(".tab li").on('click',function(){
		var rel=$(this).attr("rel");
		if(rel){
			if(rel=="cSong")Live.refreshSongRequest();//加载一下点歌列表
			$(this).parent().children().removeClass("on");
			$(this).addClass("on").parents(".mh").siblings('.mb').children().hide();
			$("#"+rel).show();
		}
		return false
	});
	
	//弹出礼物数量选择
	$('#giftShapeBtns').mousedown(function(){
		$('.popBox-gift').hide();
		var pnl=$('.giftShapeList');
		var offset=$(this).offset();
		var c=213;
		pnl.css({top:offset.top-c,left:offset.left-31}).toggle();
		return false;
	}).click(function(){return false});
	//选择上面的数量时
	$('#stdSps a').click(function(){
		$('#sendGiftNum').val($(this).attr('rel')).data('id',$(this).attr('data-id'));
		$('.giftShapeList').hide();
		return false;
	});
	//点击送给谁礼物input框
	$('#sendToUser').click(function(){
		if($('#giftUser div').children().length>0){
			var offset=$(this).offset();
			$('#giftUser').css({top:offset.top+25,left:offset.left}).show();
			$(this).addClass('o_bder');
		}
		return false;
	});
	//点击上面弹出的用户名时
	$('#giftUser a').live('click',function(){
		var username = $(this).text();
		sendGiftTo=this.id.replace('gid','');
		sendGiftToName=username;
		$('#sendToUser').val(username).removeClass('o_bder');
		$('#giftUser').hide();
		return false;
	});
	//鼠标移到飞屏按钮上时
	$('#flyMsgSend').hover(function(){
		$('#fsTip').fadeIn();
	},function(){
		$('#fsTip').fadeOut();
	});
	//点击公聊旁边的礼物选项卡时
	$('#giftTab').click(function(){
		Room.getGiftLog();
	});
	
	Room.initDragSlider();//聊天框中的拖动条
	Room.initHandBox();//初始化清屏操作
	
	//聊天表情初始化
	$('.smileyBtn').live('mousedown',function(){
		var pnl=$('#faces');
		$('#ribbons').hide();
		var offset=$(this).offset();
		if(''==$('#facesBd').html()){
			initFaceList(function(em){
				var id,limit;
				if(Room.botFaceOn){
					id='#bcText';limit=100;
				}else{
					id='#msgContent';limit=Room.limitWord;
				}
				var text=$(id).val();
				var tmp=text+em;
				if(limit>=tmp.len()){
					text+=em;
				}
				$(id).val(text).focus();
			});
		}
		if('msgFace'==this.id){
			Room.botFaceOn=false;
			pnl.css({top:offset.top-210,left:offset.left}).toggle();
		}else{
			Room.botFaceOn=true;
			pnl.css({top:offset.top-175,left:offset.left-352}).toggle();
		}
		return false;
	}).live('click',function(){return false});
	//点击彩条按钮时
	$('#ribbon').mousedown(function(){
		Room.hideChatBox();
		var offset=$(this).offset();
		$('#ribbons').css({top:offset.top-248,left:offset.left}).toggle();
		return false;
	}).click(function(){return false});
	//点击彩条时
	$('#ribbons a').click(function(){
		var con='@'+$(this).attr('rel')+'@';
		Live.sendSwatch(con);
		Room.hideChatBox();
		return false;
	});
	//点击发言快捷方式按钮时
	$('.quickly_btn').mousedown(function(){
		Room.hideChatBox();
		var offset=$(this).offset();
		$('.quickly_post').css({top:offset.top-298,left:offset.left-395}).toggle();
		return false;
	}).click(function(){return false});
	//点击发言快捷内容时
	$('.quickly_post a').click(function(){
		Node.msgCon.val($(this).find("p").text());
		$(".quickly_post").hide();
		return false;
	}).mouseover(function(){
		$(".quickly_post a p").removeClass("on");
		$(this).find("p").addClass("on");
	});;
	
	
	//弹出发送喇叭,
	$('#bcbtn').click(function(){
		$('#lbTip').hide();
		var pnl=$('#bcpop');
		if(!pnl[0]){
			pnl=$('<div id="bcpop" class="pop"><div class="pc">\
				<a class="close" href="javascript:;" title="关闭" onclick="$(\'#bcpop\').remove();return false;">X</a>\
				<textarea class="f_g" id="bcText" onfocus="if($(this).hasClass(\'f_g\')){$(this).removeClass(\'f_g\').val(\'\');}">50个字以内，每次'+$("#gift65").attr("price")+money_name+'！</textarea>\
				<div class="pcbot"><a href="javascript:;" title="插入表情" id="botFace" class="smileyBtn icon"> </a><a id="sendAnnounceBtn" href="javascript:void(0);" class="subBtn" title="提交">提交</a></div></div></div>');
			pnl.appendTo('body').show();
		}else{
			pnl.toggle();
		}
		return false;
	});
	//新手任务按钮
	$('#taskPnlBtn').click(function(){
		if(!islogin()){
			Node.taskPnlBd.hide();return false;
		}
		if($(this).hasClass('taskTitleOn')){
			var $this=$(this);
			Node.taskPnlBd.slideUp(function(){
				$this.removeClass('taskTitleOn');
			});
		}else{
			misBlockToggleData();
			Node.taskPnlBd.slideDown();
			$(this).addClass('taskTitleOn');
		}
	});
	//新手任务,关闭按钮
	$('.tPnlHd').click(function(){
		Node.taskPnlBd.slideUp(function(){
			$('#taskPnlBtn').removeClass('taskTitleOn');
		});
	});
	
	//聊天下面的滚动广告
	Room.initBanner();
});