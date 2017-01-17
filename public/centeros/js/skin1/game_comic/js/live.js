var hideMenuTimer0;
var hideMenuBool = false;
var hideMenuTimer1;
var isfaceInit = false;
var getUserTimes = 0;
$.ajaxSetup({
	cache : false
});

jQuery.fn.offsetWidth = function() {
	return this.offsetWidth;
}
var Announce = {
	push : function(_roomnumber, _roomnickname, words) {
		Room.printBc(now(), {
			"roomid" : _roomnumber,
			"src_nickname" : _roomnickname,
			"src_lucknumber" : _roomnickname
		}, replace_face(words));
	}
}

var PlySwf = {
	push : function(words) {
		Room.flyScreen(words);
	}
};

var FilterStr = {
	number : "\u62631234567890\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19\uff10\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u96f6\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u3220 \u3221 \u3222 \u3223 \u3224 \u3225 \u3226 \u3227 \u3228 \u2474 \u2475 \u2476 \u2477 \u2478 \u2479 \u247a \u247b \u247c\u58f9\u8d30\u53c1\u8086\u4f0d\u9646\u67d2\u634c\u7396",
	letter : "./\uff0e\u70b9\u3002abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ\uff41\uff42\uff43\uff44\uff45\uff46\uff47\uff48\uff49\uff47\uff4b\uff4c\uff4d\uff4e\uff4f\uff50\uff51\uff52\uff53\uff54\uff55\uff56\uff57\uff58\uff59\uff5a\uff21\uff22\uff23\uff24\uff25\uff26\uff27\uff28\uff29\uff27\uff2b\uff2c\uff2d\uff2e\uff2f\uff30\uff31\uff32\uff33\uff34\uff35\uff36\uff37\uff38\uff39\uff3a",
	dots : "\u3089\u310b\u2488\u2489\u248b\u248c\u248d\u248e\u248f\u2490\u0392\u0421\u039f\u039a\u041a\u041c\u0422\u03a7\u0399\u039d\u0442\u043a\u03c4\u03ba\u2530\u03a4"
};
var sofaid = 0;
var starty = 0;
var startdrag = false;
var initAdmin, initMember;

var Live = {
	showFlashGift : true,
	GiftSwitch : function() {
		if ($("#giftSwitch").hasClass('animate-off')) {
			$("#giftSwitch").removeClass('animate-off');
			Live.showFlashGift = true;
		} else {
			$("#giftSwitch").addClass('animate-off');
			Live.showFlashGift = false;
			try {
				swfobject.getObjectById("giftShapeSwf").style.visibility = 'hidden';
				swfobject.getObjectById("showGiftSwf").style.visibility = 'hidden';
				$("#giftShapeSwf").css("z-index", "0");
				$("#showGiftSwf").css("z-index", "0");
			} catch (err) {
			}
		}
	}
}
// Flash中调用
function alertinfo(msg) {
	msg = decodeURI(msg);
	Main.alert(msg);
}
var Chat = {
	blockSelf : function() {
		self.location = "/html/block.html";
	},
	isDisconnectSelf : function() {
		self.location = "/html/isDisconnectSelf.html";
	},
	endShow : function() {
		self.location = "/html/endShow.html";
	},
	scrollPublicChat : true,
	scrollPrivateChat : true,
	canChat : false,
	joinin : function() {
		Chat.canChat = true;
		$("#sendChatBtn").attr('disabled', false).removeClass('Tkdisabled');
	}
};

function getCssStyle(fontobj) {
	return "";
	if (fontobj == undefined) {
		return "";
	}
	var css = "font-size:" + fontobj.size + "px;color:#" + fontobj.color + ";font-family:" + fontobj.family;
	if (fontobj.weight == "1") {
		css += ";font-weight:bold";
	}
	if (fontobj.style == "1") {
		css += ";font-style:italic";
	}
	return css;
}
function getCssStyleMy() {
	return "";
	var css = "font-size:" + $("#fontsize").val() + "px;color:#" + $("#fontcolor").val() + ";font-family:" + $("#fontfamily").val();
	if ($("#fontweight").val() == "1") {
		css += ";font-weight:bold";
	}
	if ($("#fontstyle").val() == "1") {
		css += ";font-style:italic";
	}
	return css;
}
function mt_rand(min, max) {
	var argc = arguments.length;
	if (argc === 0) {
		min = 0;
		max = 2147483647;
	} else if (argc === 1) {
		throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
	} else {
		min = parseInt(min, 10);
		max = parseInt(max, 10);
	}
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function replace_face(words, fly) {
	if (fly == undefined) {
		words = faceReplaceImg(words);
	} else {
		words = str_replace('/', '', words);
	}
	return words;
}
$(function() {
	if (Chat.canChat) {
		Chat.joinin();
	}
	$(document).mouseup(function(e) {
		starty = 0;
		startdrag = false;
	}).mousemove(function(e) {
		if (startdrag) {
			var ch = e.pageY - starty;
			$(".public_area").css('height', (290 + ch) + 'px');
			$(".publicchat").css('height', (250 + ch) + 'px');

			$(".private_area").css('height', (109 - ch) + 'px');
			$(".privatechat").css('height', (108 - ch) + 'px');
		}
	});
	// sofaid,的值，已经在room.js中设置了
	$(".sofa-area li .btn-primary").click(
			function() {
				if (!Chat.canChat) {
					Main.alert('主播不在线不可以进行此操作');
					return;
				}
				var sendNum = $.trim($(this).parent().find("input").val());
				if (sendNum <= 0 || !$.isNumeric(sendNum)) {
					Main.alert('请正确填写沙发数量');
					return;
				}
				sofaid = $(this).attr("rel");
				swfobject.getObjectById("player").sendGift(4, sendNum, "", currentShowerid, currentRoomNumber, currentShowid, escape(currentShower), currentUserID,
						escape(currentUserNickname), sofaid);
			});
	$("#bcText").focus(function() {
		$("#bcText").val('');
	});
	$("#bcText").blur(function() {
		if ($(this).val() == '') {
			$(this).val('50个字以内，每次' + $("#gift65").attr("price") + money_name + '！');
		}
	});
	$(".userList li").on('mousemove', function(e) {
		var xx = e.pageX;
		var yy = e.pageY;
	});
	$("#sendAnnounceBtn").on(
			"click",
			function() {
				if (!Chat.canChat) {
					Main.alert('主播不在线不可以发公告');
					return;
				}
				if (Live.user_role == 1) {
					login.show();
					return;
				}
				var k = $('#bcText').val();
				if (k == "" || k == '50个字以内，每次' + $("#gift65").attr("price") + money_name + '！') {
					$('#bcText').focusInput();
					try {
						$("#bcText").focus()
					} catch (j) {
					}
					return

					

										

					

				}
				if (k.length > 100) {
					Main.alert("您的公告内容过长，请确保不超过50个汉字!");
					return

					

										

					

				}
				$('#bcText').val("");
				$('#bcText .info').html(Room.limitWord);
				swfobject.getObjectById("player").sendGift(65, 1, escape(k), currentShowerid, currentRoomNumber, currentShowid, escape(currentShower), currentUserID,
						escape(currentUserNickname), 0);
			});

	$("#flyMsgSend").click(
			function() {
				if (!Chat.canChat) {
					Main.alert('主播不在线不可以发飞屏');
					return;
				}
				if (Live.user_role == 1) {
					login.show();
					return;
				}
				var k = $("#msgContent").val();
				if (k == "") {
					$('#msgContent').focusInput();
					try {
						$("#msgContent").focus()
					} catch (j) {
					}
					return

					

										

					

				}
				if (k.length > Room.limitWord) {
					Main.alert("您的飞屏内容过长，请确保不超过" + Room.limitWord + "个汉字!");
					return

					

										

					

				}
				$("#msgContent").val('');
				k = replace_face(k, true);// 头像替换成文字
				swfobject.getObjectById("player").sendGift(3, 1, escape(currentUserNickname + "说：" + k), currentShowerid, currentRoomNumber, currentShowid, escape(currentShower),
						currentUserID, escape(currentUserNickname), 0);
			});

	$('#taglist a').on(
			'click',
			function() {// 帖条
				if (!Chat.canChat) {
					Main.alert('主播不在线不可以进行此操作');
					return false;
				}
				var sendGiftID = $(this).parent('li').attr('id');
				swfobject.getObjectById("player").sendGift(sendGiftID, 1, "", currentOptUid, currentRoomNumber, currentShowid, escape(currentOptUname), currentUserID,
						escape(currentUserNickname), 0);
				$("#taglist").hide();
				return false;
			});
	$(".admBtn").click(function(e) {
		e.stopPropagation();
		$(".setupbox").hide();
		$(".admBtn").removeClass('current');
		$(this).addClass('current');
		var boxid = $(this).attr('id').substr(3);
		$(".box" + boxid).show();
	});
	$(".bgattachbtn").click(function(e) {
		e.stopPropagation();
		$('body').css('background-attachment', $(this).val());
		if ($(this).val() == 'fixed') {
			$.post("roomactions.php?action=save_bgtype", {
				'typeid' : 0
			});
		} else {
			$.post("roomactions.php?action=save_bgtype", {
				'typeid' : 1
			});
		}
	});
	$(".main_mic").click(function(e) {// 选择麦之成功之后广播一下
		$.post("roomactions.php?action=save_main_mic", {
			'main_mic' : $(this).val()
		}, function(r) {
			get_room_mic_listSWF();
		});
	});
	setTimeout(function() {
		try {
			swfobject.getObjectById("flyMsgBox").style.visibility = 'hidden';
			swfobject.getObjectById("giftShapeSwf").style.visibility = 'hidden';
			swfobject.getObjectById("showGiftSwf").style.visibility = 'hidden';
			swfobject.getObjectById("showCar").style.visibility = 'hidden';
			$("#giftShapeSwf").css("z-index", "0");
			$("#showGiftSwf").css("z-index", "0");
			$("#showCar").css("z-index", "0");
		} catch (err) {
		}
	}, 1000);
});