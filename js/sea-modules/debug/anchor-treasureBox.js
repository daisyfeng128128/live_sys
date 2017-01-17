define(function(require, exports, module) {
	var swf = require("./anchor-swf");
	var Tools = require("./anchor-tools");
	var UserData = require("./anchor-user");
	module.exports = {
		Cannotopen_State : "cannotopen_state",
		Couldopen_State : "couldopen_state",
		Open_Animation : "open_animation",
		Close_Animation : "close_animation",
		CONST_MAXCOUNT : 3,//最大可领取次数
		//CONST_GAPARRAY : [ 5 * 60, 15 * 60, 30 * 60 ],
		CONST_GAPARRAY : [5, 15, 30],
		CONST_REACHMAX : "今日宝箱已经领取完毕",
		CONST_TIMELIMIT : " 宝箱冷却中",
		CONST_LEFTTIME : "剩余{0}",
		CONST_COULDLINGQU : "点击领取",
		CONST_GIFTNUM : "x{0}",
		current_count : 0,
		timetick : 0,
		timetick_timeout : 0,
		Switch : false,
		socketAfter : function() {
			var base = this;
			if(this.Switch){
				UIF.handler.sendTreasureBoxInit(null, function(data){
					base.initTreasureBoxData(data);
				});
			}
		},
		init : function(options) {
			if(UIF.roomType){
				var param = jQuery.parseJSON(options.params);
				if(param.hasOwnProperty(UIF.roomType)){
					this.Switch = eval(param[UIF.roomType]["boxs"]);
				}
			}
			this.initView();
			this.initInteractions();
		},

		initView : function() {
			$("#treasureBox_div").hide();
			$("#treasureBox_reward_div").hide();
		},

		initInteractions : function() {
			var _this = this;
			$("#treasureBox_clickRect").click(function(e) {
				_this.openTreasureBox();
			})

			$("#treasureBox_reward_confirm").click(function(e) {
				_this.showCloseMovie();
				_this.startTimeTick();
				_this.hideTreasureBox_reward();
			})
		},

		initTreasureBoxData : function(data) {
			this.current_count = parseInt(data.boxNum);
			if (this.checkIfReachMax()) {
				this.hideTreasureBox();
				return;
			}
			this.showTreasureBox();
			this.startTimeTick();
		},

		showTreasureBox : function() {
			$("#treasureBox_div").show();
		},

		hideTreasureBox : function() {
			$("#treasureBox_div").hide();
		},

		startTimeTick : function() {
			if (this.checkIfReachMax()) {
				this.hideTreasureBox();
				return;
			}
			if (this.current_count >= this.CONST_GAPARRAY.length) {
				return;
			}
			this.setBoxToTimeTickState();
			this.timetick = this.CONST_GAPARRAY[this.current_count];
			var _this = this;
			var timeTickFunc = function() {
				_this.timetick--;
				_this.updateBoxStateShow();
				if (_this.timetick <= 0) {
					_this.timetick = 0;
					_this.stopTimeTick();
					_this.setBoxToReadyOpenState();
					return;
				}
				this.timetick_timeout = setTimeout(timeTickFunc, 1000);
			}
			timeTickFunc();
		},

		stopTimeTick : function() {
			clearTimeout(this.timetick_timeout);
		},

		setBoxToReadyOpenState : function() {
			this.showState(this.Couldopen_State);
		},

		setBoxToTimeTickState : function() {
			this.showState(this.Cannotopen_State);
		},

		showOpenMovie : function() {
			this.showState(this.Open_Animation);
		},

		showCloseMovie : function() {
			this.showState(this.Close_Animation);
		},

		showState : function(stateName) {
			var swfFunc = function() {
				swf.changeTreasureBoxState(stateName);
			}
			try {
				swfFunc();
			} catch (e) {
				setTimeout(swfFunc, 1000);
			}
		},

		updateBoxStateShow : function() {
			if (this.timetick > 0) {
				$("#treasureBox_text").html(this.CONST_LEFTTIME.replace("{0}", this.convertToMS(this.timetick)));
			} else {
				$("#treasureBox_text").html(this.CONST_COULDLINGQU);
			}
		},

		convertToMS : function(val) {
			var result = "";
			var minute = Math.floor(val / 60);
			var second = val % 60;
			if (minute >= 10) {
				result += minute;
			} else {
				result += "0" + minute;
			}
			result += ":";
			if (second >= 10) {
				result += second;
			} else {
				result += "0" + second;
			}
			return result;
		},

		openTreasureBox : function() {
			if (!UIF.handler.login) {
				UIF.handler.loging();
				return;
			}
			if (this.checkIfReachMax()) {
				Tools.dialog(this.CONST_REACHMAX);
				return;
			}
			if (this.timetick > 0) {
				Tools.dialog(this.CONST_TIMELIMIT);
				return;
			}
			var _this = this;

			var param = {
				count : this.current_count + 1
			};
			UIF.handler.openTreasureBox(param, function(data) {
				var result = jQuery.parseJSON(data);
				if (200 == result.resultStatus) {
					_this.current_count = parseInt(result.boxNum);
					_this.updateRewardShow(result);
					_this.showTreasureBox_reward();
					_this.showOpenMovie();
				} else if (110 == result.resultStatus) {
					_this.current_count = parseInt(result.boxNum);
					_this.startTimeTick();
				}
			});
		},

		GiftType_Money : 0,
		GiftType_Luxury : 1,
		GiftType_Common : 2,
		FrameUrl_Money : "/images/treasurebox/coins.png",
		FrameUrl_Luxury : "/images/treasurebox/specialGift.png",
		FrameUrl_Common : "/images/treasurebox/normalGift.png",
		updateRewardShow : function(data) {
			$("#treasureBox_reward_name").html(data.giftName);
			$("#treasureBox_reward_num").html(this.CONST_GIFTNUM.replace("{0}", data.giftNum));
			var frameUrl = "";
			switch (data.giftType) {
			case this.GiftType_Money:
				frameUrl = this.FrameUrl_Money;
				$("#treasureBox_reward_rewardIcon").css("background-image", "url(/images/treasurebox/coin.png?p=0)");
				break;
			case this.GiftType_Luxury:
				frameUrl = this.FrameUrl_Luxury;
				$("#treasureBox_reward_rewardIcon").css("background-image", "url(" + data.giftPic + "?p=0)");
				break;
			case this.GiftType_Common:
				frameUrl = this.FrameUrl_Common;
				$("#treasureBox_reward_rewardIcon").css("background-image", "url(" + data.giftPic + "?p=0)");
				break;
			}
			$("#treasureBox_reward_frame").css("background-image", "url(" + frameUrl + "?p=0)");
		},

		checkIfReachMax : function() {
			if (this.current_count >= this.CONST_MAXCOUNT) {
				return true;
			}
			return false;
		},

		showTreasureBox_reward : function() {
			$("#treasureBox_reward_div").show();
			$("#shadow").show();
		},

		hideTreasureBox_reward : function() {
			$("#treasureBox_reward_div").hide();
			$("#shadow").hide();
		}
	}
});
