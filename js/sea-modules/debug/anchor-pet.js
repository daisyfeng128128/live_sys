define(function(require, exports, module) {
	var swf = require("./anchor-swf");
	var Tools = require("./anchor-tools");
	var UserData = require("./anchor-user");
	module.exports = {
		// 训练动作
		TRAIN_PET : "TRAIN_PET",
		// 攻击动作
		ATTACK_PET : "ATTACK_PET",

		LEVEL_GAP : 5,
		petData : null,
		MaxTrainGapTime : 3,
		currentGapTime : 0,
		timeOut : null,
		TrainCompleteStr : "今日训练已完成",
		TrainLeftCountStr : "今日剩余<font color='#0000FF'>{0}</font>次",
		TrainGapStr : "训练中...剩余<font color='#0000FF'>{0}</font>s",
		PetNotBornStr : "精灵尚未出生",
		PetNameIllegal : "精灵名字包含非法字符",
		PetNameMaxLength : 14,
		PetNameTooLong : "名字过长",
		MustFollowAnchor : "关注主播才可以训练",
		PetHelpTip : "训练或者赠送主播礼物都可以增加精灵经验，帮助精灵升级。\n每天可以训练精灵3次，提升爵位等级可以增加每日训练次数",
		// 随机动画间隔时间
		RandomAnimateGap : 30,
		Switch : false,
		RandomAnimateSwitch : true,
		socketAfter : function() {
			this.sendPetInit();
		},
		init : function(options) {
			if(UIF.roomType){
				var param = jQuery.parseJSON(options.params);
				if(param.hasOwnProperty(UIF.roomType)){
					this.Switch = eval(param[UIF.roomType]["pets"]);
				}
			}
			this.initPetView();
			this.initPetOptView();
			this.initPetInteractions();
			this.initHelpTipView();
		},
		initHelpTipView : function() {
			$("#pet-opt-ui-helpTip-textArea").val(this.PetHelpTip);
		},
		initPetView : function() {
			$("#Pet").hide();
			$("#petName").hide();
			$("#clickRect").hide();
		},
		initPetData : function(data) {
			if (!data.hasOwnProperty("level")) {
				return;
			}

			$("#Pet").show();
			$("#petName").show();
			$("#clickRect").show();

			this.petData = data;
			if (0 == data.level) {// 处于蛋的形态
				this.petData.isBorn = false;
			} else {
				this.petData.isBorn = true;
			}
			this.updatePetshow();
		},
		petBirth : function() {
			this.sendPetInit();
		},
		// 刷新宠物信息 不包括个人信息数据 如训练次数上限、当前次数
		updatePetData : function(data) {
			if (null == this.petData) {
				return;
			}
			this.petData.attack = data.attack;
			this.petData.blood = data.blood;
			this.petData.defense = data.defense;

			this.petData.level = data.level;
			this.petData.name = data.name;
			this.petData.petName = data.petName;
			this.petData.sname = data.sname;

			this.petData.now = data.now;
			this.petData.upExp = data.upExp;

			if (data.hasOwnProperty("count")) {
				this.petData.count = data.count;
			}
			if (data.hasOwnProperty("maxCount")) {
				this.petData.maxCount = data.maxCount;
			}
			this.updatePetshow();
		},
		startTrainTimeTick : function() {
			this.currentGapTime = this.MaxTrainGapTime;
			_this = this;
			var timeTick = function() {
				_this.currentGapTime--;
				_this.updateTrainGapShow();
				if (_this.currentGapTime <= 0) {
					_this.currentGapTime = 0;
					clearTimeout(_this.timeOut);
					return;
				}
				_this.timeOut = setTimeout(timeTick, 1000);
			}
			timeTick();

		},
		updateTrainGapShow : function() {
			if (this.checkIfTrainLimit()) {
				$("#pet-opt-ui-trainCountleft").html(this.TrainCompleteStr);
				$("#pet-opt-ui-trainCountleft").show();
				$("#pet-opt-ui-trainGap").hide();
				$("#pet-opt-ui-trainBtn").attr("class", "pet-opt-ui-trainBtn-disable");
			} else {
				if (this.currentGapTime > 0) {// 正在训练中
					$("#pet-opt-ui-trainCountleft").hide();
					$("#pet-opt-ui-trainGap").html(this.TrainGapStr.replace("{0}", this.currentGapTime));
					$("#pet-opt-ui-trainGap").show();
					$("#pet-opt-ui-trainBtn").attr("class", "pet-opt-ui-trainBtn-disable");
				} else {
					var countLeft = this.petData.maxCount - this.petData.count;
					if (countLeft < 0) {
						countLeft = 0;
					}
					$("#pet-opt-ui-trainCountleft").html(this.TrainLeftCountStr.replace("{0}", countLeft));
					$("#pet-opt-ui-trainCountleft").show();
					$("#pet-opt-ui-trainGap").hide();
					$("#pet-opt-ui-trainBtn").attr("class", "pet-opt-ui-trainBtn");
				}
			}
		},
		checkIfTrainLimit : function() {
			if (this.petData.count >= this.petData.maxCount) {
				return true;
			}
			return false;
		},
		updatePetMovie : function() {
			var _this = this;
			var upSwfData = function() {
				var param = {};
				if (!_this.checkIfPetBorn()) {
					param.imageId = "0";
					param.level = 0;
					param.levelGap = _this.LEVEL_GAP;
					if (_this.RandomAnimateSwitch) {
						param.randomMovieGap = _this.RandomAnimateGap;
					}
					swf.petUpdateData(param);
				} else {
					param.imageId = _this.petData.petId;
					param.level = _this.petData.level;
					param.levelGap = _this.LEVEL_GAP;
					if (_this.RandomAnimateSwitch) {
						param.randomMovieGap = _this.RandomAnimateGap;
					}
					swf.petUpdateData(param);
				}
			}
			try {
				upSwfData();
			} catch (e) {
				setTimeout(upSwfData, 2000);
			}
		},
		playTrainMoive : function() {
			if (!this.checkIfPetBorn()) {
				return;
			}
			var _this = this;
			var upSwfData = function() {
				swf.petPlayAction(_this.TRAIN_PET);
			}
			try {
				upSwfData();
			} catch (e) {
				setTimeout(upSwfData, 2000);
			}
		},
		updatePetshow : function() {
			this.updatePetMovie();
			if (!this.checkIfPetBorn()) {
				return;
			}
			$("#petName").show();
			$("#petName").html(this.petData.name);
			$("#pet-opt-ui-title").html(this.petData.petName);
			$("#pet-opt-ui-petNameInput").val(this.petData.name);
			$("#pet-opt-ui-level").html(this.petData.level);
			$("#pet-opt-ui-hpTxt").html(this.petData.blood);
			$("#pet-opt-ui-powerTxt").html(this.petData.attack);
			$("#pet-opt-ui-expText").html(this.petData.now + "/" + this.petData.upExp);
			var maxWidth = $("#pet-opt-ui-petlevelBar").css("max-width").split("px")[0];
			$("#pet-opt-ui-petlevelBar").width(maxWidth * this.petData.now / this.petData.upExp + "px");
			this.updateTrainGapShow();
		},
		sendPetInit : function() {
			if(this.Switch){
				UIF.handler.sendPetInit();
			}
		},
		showPetUI : function(initL, initT) {

			if (!UIF.handler.login) {
				UIF.handler.loging();
				return;
			}
			if (!this.checkIfPetBorn()) {
				Tools.dialog(this.PetNotBornStr);
				return;
			}
			$('.pet-opt-ui').css({
				'left' : $("#Pet")[0].offsetLeft + $("#Pet")[0].clientWidth * .5 + $("#clickRect")[0].clientWidth * .5 + "px",
				'top' : $("#Pet")[0].offsetTop + $("#Pet")[0].clientHeight * .5 + "px"
			});
			this.updatePetshow();
			$(".pet-opt-ui").show();
		},
		hidePetUI : function() {
			$(".pet-opt-ui").hide();
		},
		showNameChange : function() {
			if (this.checkIfAnchor()) {
				document.getElementById("pet-opt-ui-petNameInput").readOnly = false;
				$("#pet-opt-ui-changenameBtn").hide();
				$("#pet-opt-ui-changename-confirmBtn").show();
				$("#pet-opt-ui-changename-cancelBtn").show();

				$("#pet-opt-ui-petNameInput").focus();
			}
		},
		hideNameChange : function() {
			document.getElementById("pet-opt-ui-petNameInput").readOnly = true;
			$("#pet-opt-ui-changenameBtn").show();
			$("#pet-opt-ui-changename-confirmBtn").hide();
			$("#pet-opt-ui-changename-cancelBtn").hide();

		},
		confirmNameChangeFunc : function() {
			this.changePetName();
		},
		cancelNameChangeFunc : function() {
			this.hideNameChange();
		},
		showHelpFunc : function(initL, initT) {
			$("#pet-opt-ui-helpTip").css({
				left : 20 + initL + "px",
				top : initT + "px"
			})
			$("#pet-opt-ui-helpTip").show();
		},
		hideHelpFunc : function() {
			$("#pet-opt-ui-helpTip").hide();
		},
		trainPetFunc : function() {
			if (!UIF.handler.login) {
				UIF.handler.loging();
				return;
			}
			if (!this.checkIfPetBorn()) {
				return;
			}
			if ((!UserData.data.isFollows) && (!this.checkIfAnchor())) {
				Tools.dialog(this.MustFollowAnchor);
				return;
			}
			if (this.checkIfTrainLimit()) {
				Tools.dialog(this.TrainCompleteStr);
				return;
			}
			var _this = this;

			var param = {
				giftType : "pet"
			};
			UIF.handler.deduction(param, function(data) {
				var fs = jQuery.parseJSON(data);
				if (220 == fs.resultStatus) {
					_this.updateTrainInfo(fs);
					_this.startTrainTimeTick();
					_this.playTrainMoive();
				}
			});
		},
		updateTrainInfo : function(data) {
			if (data.hasOwnProperty("count")) {
				this.petData.count = data.count;
			}
			if (data.hasOwnProperty("maxCount")) {
				this.petData.maxCount = data.maxCount;
			}
			this.updatePetshow();
		},
		changePetName : function($name) {
			if (!this.checkIfAnchor()) {
				return;
			}
			var testName = $("#pet-opt-ui-petNameInput").val();
			if (testName.replace(/[^\x00-\xff]/g, "**").length > this.PetNameMaxLength) {
				Tools.dialog(this.PetNameTooLong);
				return;
			}
			var petName = $("#pet-opt-ui-petNameInput").val();
			if (petName == this.petData.name) {
				this.hideNameChange();
				return;
			}
			this.hideNameChange();
			var param = {
				"petName" : petName
			};
			UIF.handler.changePetName(param, function(data) {
				var result = jQuery.parseJSON(data);
				if (110 == result.resultStatus) {
					Tools.dialog(this.PetNameIllegal);
				}
			});
		},
		checkIfPetBorn : function() {
			if (!this.petData) {
				return false;
			} else {
				return this.petData.isBorn;
			}
		},
		// 初始化宠物操作面板
		initPetOptView : function() {
			var _this = this;
			// 宠物操作面板事件
			$(".pet-opt-ui button").click(function(event) {
				if (!_this.checkIfPetBorn()) {
					return;
				}
				var actionName = event.target.className;
				switch (actionName) {
				case "pet-opt-ui-closeBtn":// 关闭按钮
					_this.hidePetUI();
					break;
				case "pet-opt-ui-changenameBtn":
					_this.showNameChange();
					break;
				case "pet-opt-ui-changename-confirmBtn":
					_this.confirmNameChangeFunc();
					break;
				case "pet-opt-ui-changename-cancelBtn":
					_this.cancelNameChangeFunc();
					break;
				case "pet-opt-ui-helpBtn":
					// do Nothing
					break;
				case "pet-opt-ui-trainBtn":
					_this.trainPetFunc();
					break;
				}
			});
			$("#pet-opt-ui-helpBtn").mouseover(function(e) {
				_this.showHelpFunc(e.pageX, e.pageY);
			});
			$("#pet-opt-ui-helpBtn").mouseout(function(e) {
				_this.hideHelpFunc();
			});
			// 宠物改名按钮
			$("#pet-opt-ui-changenameBtn").hide();
			$("#pet-opt-ui-changename-confirmBtn").hide();
			$("#pet-opt-ui-changename-cancelBtn").hide();
			if (this.checkIfAnchor()) {
				$("#pet-opt-ui-changenameBtn").show();
			}
		},

		// 注册宠物点击、移动等事件
		initPetInteractions : function() {
			// 宠物点击弹窗
			var _this = this;
			$(".clickRect").click(function(e) {
				_this.showPetUI(e.pageX, e.pageY);
			})
		},
		// 检测是否是主播
		checkIfAnchor : function() {
			if (UIF.handler.anchorId != UIF.handler.userId) {
				return false;
			}
			return true;
		}
	}
});
