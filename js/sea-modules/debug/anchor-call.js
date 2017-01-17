define(function(require, exports, module) {
	var cons = require("cons");
	var lvs = require("./anchor-live");
	var swf = require("./anchor-swf");
	var ani = require("./anchor-anchor");
	var uni = require("./anchor-user");
        var gift = require("./anchor-gift");
    var guards = require("./anchor-guard");
    var hall = require("./anchor-hall");
    var chat = require("./anchor-chat");
    var list = require("./anchor-list");
	var pet = require("./anchor-pet");
	var treasureBox = require("./anchor-treasureBox");
    module.exports = {
		status : function(data) {
			lvs.stat(jQuery.parseJSON(data));
		},
		comMsg : function(data) {
			UIF.log("公共消息：" + data);
			var args = jQuery.parseJSON(data);
			if (args.type == "notice") {
				args.actions = "maintain";
				args.nickname = "系统管理员";
				chat.onAffMsg(args);
			} else if (args.type == "upgrade") {
				uni.upgrade(args);
			}
		},
		anchorsHeadInfo : function(data) {
			UIF.log("主播信息：" + data);
			var d = jQuery.parseJSON(data);
            ani.onMessage(d);
            list.flushBuUsers(d.userList);
			var boos = UIF.handler.cache.get(cons.LOCAL_TIMENICES);
			if (!boos) {
				chat.onNotice(jQuery.parseJSON(data));
				UIF.handler.cache.put(cons.LOCAL_TIMENICES, true);
			}
		},
		anchorsNotice : function(data) {
			UIF.log("设置公告：" + data);
			chat.onNotice(jQuery.parseJSON(data));
		},
		userInfo : function(data) {
			UIF.log("用户信息：" + data);
			var args = jQuery.parseJSON(data)
			uni.meters(args);
			list.addUsers({
				nickname : args.nickname,
				levs : args.levs,
				splev : args.splev,
				userId : args.userId
			});
		},
		sendGifts : function(data) {
			UIF.log("送礼扣费：" + data);
			gift.sendGift(jQuery.parseJSON(data));
			gift.sendRecord(jQuery.parseJSON(data));
		},
		userVisitors : function(data) {
			UIF.log("游客进入：" + data);
			chat.visitors(jQuery.parseJSON(data));
		},
		userEntersCars : function(data) {
			UIF.log("进场特效：" + data);
            var pd = jQuery.parseJSON(data);
			chat.welcome(pd);
            list.welcome(pd);
            list.addUsers(pd);
            list.flushBuUsers();
			setTimeout(gift.enterCar(pd), 10000);

		},
		guardList : function(data) {
			UIF.log("守护列表：" + data);
			guards.getGuardList(jQuery.parseJSON(data));
		},
		anchorsLocalNotice : function(data) {
			UIF.log("送礼本场榜：" + data);
			hall.onMessage(jQuery.parseJSON(data));
		},
		chatP2PMessage : function(data) {
			UIF.log("用户私聊：" + data);
			chat.onP2PMsg(jQuery.parseJSON(data));
		},
		chatMSGMessage : function(data) {
			UIF.log("公共聊天：" + data);
			chat.onAllMsg(jQuery.parseJSON(data));
		},
		chatPRVMessage : function(data) {
			UIF.log("主播私聊：" + data);
			chat.onPrvMsg(jQuery.parseJSON(data));
		},
		chatFLYMessage : function(data) {
			UIF.log("直播间飞屏：" + data);
			chat.onFlyMsg(jQuery.parseJSON(data));
		},
		/*chatAFFMessage : function(data) {
			UIF.log("全站公告：" + data);
			chat.onAffMsg(jQuery.parseJSON(data));
		},*/
		roomBanned : function(data) {
			UIF.log("禁止发言：" + data);
			chat.banned(jQuery.parseJSON(data));
		},
		roomKickOut : function(data) {
			UIF.log("踢出房间：" + data);
			chat.kickOut(jQuery.parseJSON(data));
		},
		upgrades : function(data) {
			UIF.log("爵位升级：" + data);
			gift.speGift(jQuery.parseJSON(data));
			//chat.onAffMsg(jQuery.parseJSON(data));
		},
		sendUsers : function(data) {
			UIF.log("收到礼物：" + data);
			gift.sendRecord(jQuery.parseJSON(data));
		},
		censor : function(data) {
			UIF.log("查封直播间：" + data);
			swf.censor(jQuery.parseJSON(data));
		},
		anchorPK : function(data) {
			UIF.log("主播pk信息：" + data);
			swf.anchorPK(jQuery.parseJSON(data));
		},
		guardsMessage : function(data) {
			UIF.log("守护升级：" + data);
			guards.onMessage(jQuery.parseJSON(data));
		},
		Runway: function(data){
			UIF.log("全站跑道：" + data);
			chat.runMsg(jQuery.parseJSON(data));
		},
		initPetData : function(data){
			UIF.log("宠物信息：" + data);
			pet.initPetData(jQuery.parseJSON(data));
		},
		updatePetData : function(data){
			UIF.log("刷新宠物信息：" + data);
			pet.updatePetData(jQuery.parseJSON(data));
		},
		petBirth : function(data){
			UIF.log("宠物出生");
			pet.petBirth();
		},
		initTreasureBox : function(data){
			UIF.log("宝箱数据：" + data);
			treasureBox.initTreasureBoxData(jQuery.parseJSON(data));
		}
	}
})
