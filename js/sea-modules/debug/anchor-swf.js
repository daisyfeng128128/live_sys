define(function(require, exports, module) {
	module.exports = {
		init : function() {
            swfobject.embedSWF("/js/sea-modules/swf/MultyGiftNotice.swf?20140218", "MultyGiftNoticeSwf", "640", "360", "10.0", "", {
                mtadd : UIF.handler.flash
            }, {
                wmode : "transparent",
                allowScriptAccess : "always"
            });
            swfobject.embedSWF("/js/sea-modules/swf/CustomGift.swf?20140218", "CustomGiftSwf", "640", "360", "10.0", "", {
                mtadd : UIF.handler.flash
            }, {
                wmode : "transparent",
                allowScriptAccess : "always"
            });
            swfobject.embedSWF("/js/sea-modules/swf/LevelUpPlayer.swf?20140218", "LevelUpPlayerSwf", "640", "360", "10.0", "", {
                mtadd : UIF.handler.flash
            }, {
                wmode : "transparent",
                allowScriptAccess : "always"
            });
            swfobject.embedSWF("/js/sea-modules/swf/EffectPlayer.swf?v=102403", "EffectPlayerSwf", 940, 500, "10.0", "", {
                mtadd : UIF.handler.flash
            }, {
                wmode : "transparent",
                allowScriptAccess : "always"
            });
			swfobject.embedSWF("/js/sea-modules/swf/PetNew.swf?v=102403", "PetSwf", 440, 320, "10.0", "", {
                mtadd : UIF.handler.flash
            }, {
                wmode : "transparent",
                allowScriptAccess : "always"
            });
			swfobject.embedSWF("/js/sea-modules/swf/treasureBox.swf", "treasureBox_swf", 100, 100, "10.0", "", {
                mtadd : UIF.handler.flash
            }, {
                wmode : "transparent",
                allowScriptAccess : "always"
            });
		},
		close : function(data) {
			try {
				$("#" + data.elements).css("z-index", "0");
                $("#" + data.elements).css("pointer-events", "none");
				swfobject.getObjectById("EffectPlayerSwf").style.visibility = 'hidden';
			} catch (e) {
				setTimeout(function(){},5 * 1000);
			}
		},
        hideSuc : function(){
            alert("hide success");
        },
		filDescribe : "\u8C6A\u534E\u793C\u7269",
		fil : function(data) {
			if (UIF.handler.effect) {
				try {
					$("#EffectPlayerSwf").css("z-index", "3000");
					swfobject.getObjectById("EffectPlayerSwf").style.visibility = 'visible';
					var url = "/files/showGift/" + data.giftId + ".swf";
					swfobject.getObjectById('EffectPlayerSwf').jsNewGift(url, data.number, data.car, data.nickname, data.carName, data.needAddFlag);
				} catch (e) {
					UIF.log(e);
				}
			}
		},
		figDescribe : "\u6570\u7EC4\u793C\u7269",
		fig : function(data) {
			if (UIF.handler.effect) {
				try {
					$("#EffectPlayerSwf").css("z-index", "3000");
					swfobject.getObjectById("EffectPlayerSwf").style.visibility = 'visible';
					swfobject.getObjectById("EffectPlayerSwf").jsRun("/files/showGift/" + data.image, data.shape);
				} catch (e) {
					UIF.log(e);
				}
			}
		},
		cusDescribe : "\u968F\u673A\u793C\u7269",
		cus : function(data) {
			if (UIF.handler.effect) {
				try {
					$("#CustomGiftSwf").css("z-index", "3000");
					swfobject.getObjectById("CustomGiftSwf").style.visibility = 'visible';
					swfobject.getObjectById("CustomGiftSwf").jsRun("/files/showGift/" + data.image + ".png", data.number);
				} catch (e) {
					UIF.log(e);
				}
			}
		},
		mulDescribe : "\u8FDE\u9001\u793C\u7269",
		mul : function(data){
			if (UIF.handler.effect) {
				try {
					$("#MultyGiftNoticeSwf").css("z-index", "3000");
					swfobject.getObjectById("MultyGiftNoticeSwf").style.visibility = 'visible';
					swfobject.getObjectById("MultyGiftNoticeSwf").showMultyGift(data.uid,data.user,data.number,data.sendNum,data.headImg,"/files/showGift/" + data.giftImg + ".png");
				} catch (e) {
					UIF.log(e);
				}
			}
		},
		actDescribe : "\u6D3B\u8DC3\u5347\u7EA7",
		act : function(data){
			if (UIF.handler.effect) {
				try {
					$("#LevelUpPlayerSwf").css("z-index", "3000");
					$("#LevelUpPlayerSwf").css("pointer-events", "auto");
					swfobject.getObjectById("LevelUpPlayerSwf").style.visibility = 'visible';
					swfobject.getObjectById("LevelUpPlayerSwf").showActivityLevelup(data.headImg,data.actlevel);
				} catch (e) {
					UIF.log(e);
				}
			}
		},
		cohDescribe : "\u4EB2\u5BC6\u5347\u7EA7",
		coh : function(data){
			if (UIF.handler.effect) {
				try {
					$("#LevelUpPlayerSwf").css("z-index", "3000");
					$("#LevelUpPlayerSwf").css("pointer-events", "auto");
					swfobject.getObjectById("LevelUpPlayerSwf").style.visibility = 'visible';
					swfobject.getObjectById("LevelUpPlayerSwf").showIntimacyLevelup(data.headImg,data.cohlevel,data.anhimg);
				} catch (e) {
					UIF.log(e);
				}
			}
		},
		speDescribe : "\u7235\u4F4D\u5347\u7EA7",
		spe : function(data){
			if (UIF.handler.effect) {
				try {
					$("#LevelUpPlayerSwf").css("z-index", "3000");
					$("#LevelUpPlayerSwf").css("pointer-events", "auto");
					swfobject.getObjectById("LevelUpPlayerSwf").style.visibility = 'visible';
					swfobject.getObjectById("LevelUpPlayerSwf").showUserLevelup(data.nickname,data.speimg);
				} catch (e) {
					UIF.log(e);
				}
			}
		},
		guardLevelupDescribe : "用户守护升级特效",
		guardLevelup : function(data){
			if (UIF.handler.effect) {
				try {
					$("#LevelUpPlayerSwf").css("z-index", "3000");
					$("#LevelUpPlayerSwf").css("pointer-events", "auto");
					swfobject.getObjectById("LevelUpPlayerSwf").style.visibility = 'visible';
					swfobject.getObjectById("LevelUpPlayerSwf").showGuardLevelup(data.guardLevel, data.nickname);
				} catch (e) {
					UIF.log(e);
				}
			}
		},
		censorDescribe : "\u5173\u95ED\u76F4\u64AD\u95F4",
		censor : function(data){
            if("stop" == data.resultMessage){
                if(UIF.currentUserID == data.userId){
                    self.location = "/html/100.html";
                }
            }else{
                self.location = "/html/102.html";
            }
		},
		//主播pk数据处理
		anchorPK : function(data){
			UIF.log("主播pk信息：" + data.roomIds);
			var myRoomNum = UIF.currentRoomNumber;
			var pkRoomNum = data.roomIds[0];
			if(myRoomNum == pkRoomNum){
				pkRoomNum = data.roomIds[1];
			}
			swfobject.getObjectById("player").pkStart(pkRoomNum);
		},
		
		petPlayAction : function(data){
			var actionName = data;
			swfobject.getObjectById("PetSwf").playAction(actionName);
		},
		
		petUpdateData : function(data){
			var imageId = data.imageId;
			var level = data.level;
			var levelGap = data.levelGap;
			var randomMovieGap = data.randomMovieGap;
			swfobject.getObjectById("PetSwf").updateData(imageId, level, levelGap, randomMovieGap);
		},
		
		//改变主播状态
		changeTreasureBoxState : function(data){
			swfobject.getObjectById("treasureBox_swf").updateState(data);
		}
	}
})