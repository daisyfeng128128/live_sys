var Ttxy = Ttxy || {};
window.__uri = function(t) {
	return t
}, function(t) {
	var o = {
		site: "51weibo",
		name: "微播微播",
		mode: "@MODE@",
		siteVersion: "v2.5",
		assetVersion: "6.0.0",
		isCombo: !0,
		isProxy: !0,
		domain: {
			cookie: "51weibo.com",
			base: "http://static.51weibo.com",
			app: "http://static.51weibo.com",
			release: "www.51weibo.com",
			yuanlai: "t1.show.yuanlai.com",
			test: "http://test.51weibo.com"
		},
		path: {
			video: "/swf/player/rmtpswf/",
			defaultGameImage: "/styles/images/game/"
		},
		dataRoot: "http://api.51weibo.com/",
		dataDomain: "api.51weibo.com/",
		wsRoot: "http://ws.51weibo.com",
		userRoot: "http://ttus.51weibo.com/",
		defaultImg: "http://u.itlily.com/user/images/avatar.png",
		familyDefaultImg: "http://img.show.dongting.com/7/7/1383227235399.jpg",
		defaultCover: "/styles/images/common/defaultCover-98d0f0.png",
		isAutoRefreshUserList: !0,
		isTemplate: "localhost.51weibo.com" != location.host,
		privType: ["", "运营", "主播", "普通用户", "客服", "经纪人"],
		officialIDS: [1268841, 1268842, 1268843, 1268844, 1268845, 1270331]
	};
	o.mode = location.host === o.domain.release || location.host === o.domain.yuanlai ? "release" : "develop", "release" == o.mode ? (o.officialIDS = [1274711, 1268841, 1268842, 1268843, 1268844, 1268845, 4025401, 4025751, 1370716, 2118708, 4064267, 4099272, 4135447, 1470197, 1472853, 4135864, 2995166, 1743032, 4063498, 4100607, 4136272, 1243244, 4136001, 4136648, 3630508, 4136846, 4035501, 4031769, 2522362, 4035758, 4043573, 4029537, 4027305, 1477865, 2317122, 1819025, 4137494, 3494593, 1240228, 2478872, 1289549, 4137806, 2509022, 2433163, 6969738], o.isAutoRefreshUserList = !0) : (o.domain.test == "http://" + location.host || (o.domain.app = ""), o.dataRoot = "http://api.51weibo.com/", o.dataDomain = "test.api.51weibo.com/", o.wsRoot = "http://test.ws.dongting.com:7000", o.path.video = "/swf/player/v2.0.11/test/"), t.config = o
	//o.mode = location.host === o.domain.release || location.host === o.domain.yuanlai ? "release" : "develop", "release" == o.mode ? (o.officialIDS = [1274711, 1268841, 1268842, 1268843, 1268844, 1268845, 4025401, 4025751, 1370716, 2118708, 4064267, 4099272, 4135447, 1470197, 1472853, 4135864, 2995166, 1743032, 4063498, 4100607, 4136272, 1243244, 4136001, 4136648, 3630508, 4136846, 4035501, 4031769, 2522362, 4035758, 4043573, 4029537, 4027305, 1477865, 2317122, 1819025, 4137494, 3494593, 1240228, 2478872, 1289549, 4137806, 2509022, 2433163, 6969738], o.isAutoRefreshUserList = !0) : (o.domain.test == "http://" + location.host || (o.domain.app = ""), o.dataRoot = "http://api.51weibo.com/", o.dataDomain = "api.51weibo.com/", o.wsRoot = "http://ws.51weibo.com", o.path.video = "/swf/player/rmtpswf/"), t.config = o
}(Ttxy);;

$.module("Ttxy.core", function() {
	function _getURI(e, t, o) {
		var s = t ? Ttxy.config.domain[t] : location.host,
			r = s ? s + e : e;
		return o === !0 && (o = Ttxy.config.version), o && (r = $.query.set("v", o, r)), r
	}
	function _loadScriptCss(e, t) {
		if (e) {
			var o = _organizeFileAry(e.baseStyles, _baseRoot, !0),
				s = _organizeFileAry(e.baseScripts, _baseRoot, !0),
				r = _organizeFileAry(e.appStyles, _appStyleRoot, !1),
				a = _organizeFileAry(e.appScripts, _appScriptRoot, !0);
			_loadCss(o), _loadCss(r), _loadScript(s.concat(a), t)
		}
	}
	function _loadScript(e, t) {
		var o = [];
		$.ajaxSetup({
			cache: !0,
			crossDomain: !0
		});
		for (var s = 0, r = e.length; r > s; s++) o.push($.getScript(e[s]));
		Ttxy.core.debug("loadsAllScripts", e), $.when.apply(null, o).then(function() {
			"function" == typeof t && t()
		})
	}
	function _loadCss(e) {
		for (var t = 0, o = e.length; o > t; t++) $("head").append('<link href="' + e[t] + '" rel="stylesheet">')
	}
	function _organizeFileAry(e, t, o) {
		if (!e) return [];
		var s = [],
			r = "";
		if (o && _isRelease()) {
			r = t;
			for (var a = 0, n = e.length; n > a; a++) {
				var i = e[a];
				i = i.replace(_appReg, ""), r += i + (a === n - 1 ? "" : ",")
			}
			s.push(r)
		} else for (var a = 0, n = e.length; n > a; a++) {
			var i = e[a];
			t === _baseRoot && (i = t + i), s.push(i)
		}
		return s
	}
	function _isCrossDomain(e) {
		var t = $.query.parseURL(),
			o = $.query.parseURL(e);
		return !(t.host == o.host && t.port == o.port)
	}
	function _isRelease() {
		return "release" == Ttxy.config.mode
	}
	function _isLocal() {
		return !Ttxy.config.domain.app
	}
	function _isIE6() {
		return _isie6
	}
	var _isInit = !1,
		_options = {},
		_commbo = _isRelease() ? "/--" : "/--",
		_baseRoot = _getURI("/base/scripts" + _commbo, "base"),
		_appScriptRoot = _getURI("/scripts" + _commbo, "app"),
		_appStyleRoot = _getURI("/styles", "app"),
		_appReg = /http:\/\/static.51weibo.com\/ttxiu\/(styles|scripts)/,
		_isie6 = $.browser.msie && "6.0" === $.browser.version;
	return {
		init: function(e) {
			_isInit || ($.extend(_options, e || {}), _isInit = !0)
		},
		isRelease: _isRelease,
		getURI: _getURI,
		store: function(e, t, o) {
			return $.exists(o) || (e = (Ttxy.config.site + "_" + e).toUpperCase()), "undefined" != typeof t ? $.store.set(e, t) : $.store.get(e)
		},
		cookie: function(e, t, o, s) {
			return $.exists(s) || (e = (Ttxy.config.site + "_" + e).toUpperCase()), $.cookie(e, t, o)
		},
		resolveAction: function(e) {
			if (e = $.extend({
				domain: Ttxy.config.dataDomain,
				isProxy: Ttxy.config.isProxy,
				protocol: "http:"
			}, e), !("url" in e)) return "";
			var t = e.isProxy && "" !== e.domain && location.host != e.domain;
			return e = t ? "develop" == Ttxy.config.mode ? "/ajax/" + e.domain + e.url : "http://" + location.host + "/ajax/" + e.domain + e.url : e.protocol + "//" + e.domain + e.url
		},
		getResult: function(e) {
			if (e.url || e.action) {
				$.support.cors = !0;
				var t = this,
					o = e.url;
				if (this.time(o), e = $.extend({
					type: "GET",
					data: {},
					cache: !0,
					format: !0,
					success: function() {},
					error: function() {}
				}, e), e.requireToken) {
					if (!Ttxy.user.isLogin()) return void Ttxy.user.popupLogin();
					e.data.access_token = Ttxy.user.getToken()
				}
				/*for(var as in e){
					if(as=='async'&&e.async==false){
						e.async=false;
						break
					}
				}*/
				var s = e.success,
					r = e.error,
					a = e.data;
				if (/^http/i.test(e.url) || e.disableProxy || "GET" === e.type) {
					if (/^http/i.test(e.url) || (e.url = Ttxy.config.dataRoot + e.url), _isCrossDomain(e.url)) {
						if ("get" != e.type.toLowerCase()) return void this.crossDomainPost(e);
						e.dataType = "json", e.contentType = "application/json;charset=utf-8", e.crossDomain = !0, e.url = e.url.replace(/[\#&]*$/, ""), e.url += -1 == e.url.indexOf("?") && -1 == e.url.indexOf("#") ? "?callback=?" : "&callback=?"
					}
				} else e.url = this.resolveAction(e);
				e.format && ("string" == typeof e.jsonpCallback && (e.data.callback = e.jsonpCallback), e.url = $.formatByVal(e.url, e.data, !0), "get" == e.type.toLowerCase() && (e.data = {})), e.success = function(o) {
					"string" == typeof o && (o = $.parseJSON(o)), t.resolveResult(o, "function" == typeof e.resolveError) ? (o.params = a, "function" == typeof s && s.apply(this, arguments)) : "function" == typeof e.resolveError && e.resolveError(o)
				}, e.error = function() {
					"function" == typeof r && r.apply(this, arguments)
				}, $.ajax(e)
			}
		},
		crossDomainPost: function(e) {
			var t = document.createElement("iframe"),
				o = "iframe" + parseInt(Math.random() + 1e8, 10);
			e.url = $.formatByVal(e.url, e.data), document.body.appendChild(t), t.style.display = "none", t.contentWindow.name = o;
			var s = document.createElement("form");
			s.target = o, s.action = e.url, s.method = "POST";
			for (var r in e.data) {
				var a = e.data[r];
				if ("[object Array]" == Object.prototype.toString.call(a)) for (var n = 0; n < a.length; n++) {
					var i = document.createElement("input");
					i.type = "hidden", i.name = r, i.value = a[n], s.appendChild(i)
				} else {
					var i = document.createElement("input");
					i.type = "hidden", i.name = r, i.value = a, s.appendChild(i)
				}
			}
			document.body.appendChild(s), s.submit()
		},
		resolveResult: function(result, noPopup) {
			if ("string" == typeof result && 0 === result.search(/^\{"code"/i) && (result = eval("(" + result + ")")), "undefined" == typeof result.code) return !0;
			var code = parseInt(result.code, 10),
				msg = result.msg,
				flag = !1;
			if (1 == code) return !0;
			if (code > 3e4 && 4e4 > code) switch (msg = msg || "服务异常,请稍候访问!", code) {
			default:
				break;
			case 30405:
				msg = "身份已经过期", noPopup || Ttxy.user.expired();
				break;
			case 30412:
				msg = "余额不足，请充值", noPopup || (Ttxy.ui.hideMenu(), Ttxy.ui.noMoney());
				break;
			case 30301:
			case 30302:
				msg = "用户名或密码不正确";
				break;
			case 30307:
				msg = "昵称重复";
				break;
			case 30308:
				msg = "此用户名已被注册";
				break;
			case 30312:
				msg = "用户名不存在";
				break;
			case 30413:
				msg = "权限不足";
				break;
			case 30415:
				msg = "房间已关闭直播";
				break;
			case 30416:
				msg = "因您直播室出现违规行为，现在处于禁播状态，15分钟后方可正常直播";
				break;
			case 30417:
				msg = "任务还未完成，无法领取金币";
				break;
			case 30418:
			case 30421:
				msg = "您的账号已被冻结，请联系客服,QQ：599939900", noPopup || (Ttxy.user.isLogin() ? Ttxy.user.logout() : (Ttxy.user.hidePopupLogin(), Ttxy.messager.error((30418 == code ? "你好，你的帐号已经被系统冻结，如需解除冻结状态，" : "访问异常，") + "请联系客服QQ：2405825383", Ttxy.user.logout)));
				break;
			case 30419:
				msg = "验证码验证失败";
				break;
			case 30420:
				msg = "沙发已经被捷足先登了，来！再战一次！", noPopup || Ttxy.messager.alert("沙发已经被捷足先登了，来！再战一次！");
				break;
			case 30422:
				msg = "VIP特权，请购买VIP";
				break;
			case 30423:
				msg = "注册过于频繁，请稍后注册";
				break;
			case 30424:
				msg = "已被抢光，明天早点来";
				break;
			case 30444:
				msg = "您还没有验证邮箱"
			} else(0 >= code || code > 2e4 && 3e4 > code) && (msg = msg || "网络异常，请稍后重试!");
			return result.msg = msg, flag
		},
		debug: function() {
			if (!this.isRelease() && window.console) if (console.log.apply) console.log.apply(console, arguments);
			else switch (arguments.length) {
			case 1:
				console.log(arguments[0]);
				break;
			case 2:
				console.log(arguments[0], arguments[1]);
				break;
			case 3:
				console.log(arguments[0], arguments[1], arguments[2]);
				break;
			case 4:
				console.log(arguments[0], arguments[1], arguments[2], arguments[3])
			}
		},
		alert: function() {
			this.isRelease()
		},
		time: function(e) {
			!this.isRelease() && window.console && $.isFunction(console.time) && console.time(e)
		},
		timeEnd: function(e) {
			!this.isRelease() && window.console && $.isFunction(console.timeEnd) && console.timeEnd(e)
		},
		shuffleArray: function(e) {
			for (var t, o, s = e.length; s; t = parseInt(Math.random() * s), o = e[--s], e[s] = e[t], e[t] = o);
			return e
		},
		loadScriptCss: _loadScriptCss,
		isIE6: _isIE6
	}
}());;


$.module("Ttxy.common", function() {
	function _getSensitiveWords() {
		Ttxy.core.getResult({
			url: _action,
			data: {
				type: 1
			},
			success: function(e) {
				_sensitiveAry = e.data, _sensitiveLength = _sensitiveAry.length, _allWordsAry = _sensitiveAry.concat(_forbidAry), _allWordsLength = _allWordsAry.length
			}
		})
	}
	function _getForbidNames() {
		Ttxy.core.getResult({
			url: _action,
			data: {
				type: 0
			},
			success: function(e) {
				_forbidAry = e.data, _forbidLength = _forbidAry.length, _allWordsAry = _sensitiveAry.concat(_forbidAry), _allWordsLength = _allWordsAry.length
			}
		})
	}
	function _getWeiForbidWords() {
		return ;
		Ttxy.core.loadScriptCss({
			appScripts: ["/scripts/weiFilterWords-49c273.js"]
		}, function() {
			_isWeiFilterGeted = !0, _weiAryLength = WEI_FILTER_ARY.length
		})
	}
	function _insertSWF(e, t, r, n, i, a) {
		var s = {
			quality: "high",
			allowscriptaccess: "sameDomain",
			allowfullscreen: "false",
			wmode: "transparent"
		},
		o = {
			id: t,
			name: t,
			align: "middle"
		},
		c = "9";
		
		// 添加视频地址
		k = Ttxy.live.liveControl, 
		R = k.getActions(),
		// alert(Ttxy.live.liveControl.getRoomId());
		// alert(Ttxy.user.getToken());
		// alert(Ttxy.user.getActions.AnchorUrlPath());
		// alert(R.live.AnchorUrlPath);
		// roomId :
		// Ttxy.live.liveControl.getRoomId(),access_token:Ttxy.user.getToken(),url:R.live.AnchorUrlPath
		swfobject.embedSWF(e, t, r, n, c, "", {roomId : Ttxy.live.liveControl.getRoomId(),access_token:Ttxy.user.getToken(),url:R.live.AnchorUrlPath},
		s, o,
		function() {
			if ($.isFunction(i) && $.isFunction(a)) var e = 0,
				r = setInterval(function() {
					e++;
					var n = swfobject.getObjectById(t);
					i(n) && (a(n), clearInterval(r)), e > 20 && clearInterval(r)
				}, 300)
		})
	}
	var _action = "common/blackword_list?type={type}",
		_sensitiveAry = [],
		_sensitiveLength = 0,
		_forbidAry = [],
		_forbidLength = 0,
		_allWordsAry = [],
		_allWordsLength = 0,
		_doubleBytes = /[^\x00-\xff]/g,
		_tibetReg = /[\u0F00-\u0FFF]+/,
		_weiLanguageReg = /[\u0600-\u06FF|\uFB50-\uFDFF|\uFE70-\uFEFF]+/,
		_isWeiFilterGeted = !1,
		_weiAryLength = 0;
	return _getSensitiveWords(), _getForbidNames(), _getWeiForbidWords(), {
		autoRenderCommon: function(e) {
			var t = $.extend({}, e),
				r = this;
			t.success = function(e) {
				e.params = t;
				var n = r.manuRenderCommon(t.selector, t.template, e, t.appendMethod);
				"function" == typeof t.successCallback && t.successCallback(n, e)
			}, Ttxy.core.getResult(t)
		},
		manuRenderCommon: function(e, t, r, n) {
			var i = "string" == typeof e ? $(e) : e,
				a = "";
			if (i.hasClass) return a = r ? $.template(t, {
				data: r
			}) : t, n = "string" == typeof n ? n : "html", i[n](a), i
		},
		time2now: function(e) {
			if (!e) return "";
			var t = ((new Date).getTime() - e) / 1e3,
				r = this.lastTime(t, "str");
			return r + "前"
		},
		lastTime: function(time, type, acr, isFormat) {
			var result = {
				h: Math.floor(time / 3600),
				m: Math.floor(time % 3600 / 60),
				s: Math.floor(time % 60)
			},
				str = "";
			acr = acr || "s";
			for (var key in result) {
				var value = result[key];
				result[key] = 10 > value && isFormat ? "0" + value : value
			}
			if ("str" == type) result.h > 0 && (str += result.h + "小时"), result.m > 0 && (str += "h" !== acr ? result.m + "分钟" : ""), result.s > 0 && !(result.m > 0 || result.h > 0) && (str += "s" !== acr ? "" : result.s + "秒");
			else if ("timer" === type) with(result) if (h > 0 && (str = (10 > h ? h.charAt(1) : h) + "小时"), m > 0) {
				if (!str.length) return (10 > m ? m.charAt(1) : m) + "分";
				str += (10 > m ? m.charAt(1) : m) + "分"
			} else if (!str.length) return (10 > s ? s.charAt(1) : s) + "秒";
			return type ? str : result
		},
		getLastDay: function(e) {
			var t = {
				day: Math.floor(e / 864e5),
				hour: Math.floor(e % 864e5 / 36e5)
			},
				r = "";
			return t.day > 0 && (r += t.day + "天"), t.hour > 0 && (r += t.hour + "小时"), 0 === t.day && 0 === t.hour && (r = "1小时"), r
		},
		getTime: function(e, t) {
			var r = e ? new Date(new Number(e)) : new Date,
				n = {
					year: r.getFullYear(),
					month: r.getMonth() + 1,
					date: r.getDate(),
					hour: r.getHours(),
					min: r.getMinutes(),
					sec: r.getSeconds()
				};
			for (var i in n) {
				var a = n[i];
				n[i] = 10 > a ? "0" + a : a
			}
			return "str" == t ? n.year + "-" + n.month + "-" + n.date + " " + n.hour + ":" + n.min + ":" + n.sec : n
		},
		getNow: function(e) {
			var t = this.getTime(e),
				r = t.hour + ":" + t.min;
			return r
		},
		formatTime: function(e, t) {
			var r = new Date(e),
				n = {
					"M+": r.getMonth() + 1,
					"d+": r.getDate(),
					"h+": r.getHours(),
					"m+": r.getMinutes(),
					"s+": r.getSeconds(),
					"q+": Math.floor((r.getMonth() + 3) / 3),
					S: r.getMilliseconds()
				};
			/(y+)/.test(t) && (t = t.replace(RegExp.$1, (r.getFullYear() + "").substr(4 - RegExp.$1.length)));
			for (var i in n) new RegExp("(" + i + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? n[i] : ("00" + n[i]).substr(("" + n[i]).length)));
			return t
		},
		/*getLevel: function(e, t) {
			e = e || 0;
			for (var r = !0, n = 0, i = 0, a = 0, s = 0, o = t ? 100 : 1e3; r;) {
				if (i = e - n, t) if (21 > s) a = ((s + 1) * (s + 1) * (s + 1) + 2 * s) * o;
				else {
					if (!(27 > s)) {
						i = 0, a = 0, r = !1;
						break
					}
					switch (s) {
					case 21:
						a = 6421900;
						break;
					case 22:
						a = 14e6;
						break;
					case 23:
						a = 26e6;
						break;
					case 24:
						a = 562e5;
						break;
					case 25:
						a = 6e7;
						break;
					case 26:
						a = 9e7
					}
				} else if (55 > s) a = ((s + 1) * (s + 1) + s) * o;
				else {
					if (!(61 > s)) {
						i = 0, a = 0, r = !1;
						break
					}
					switch (s) {
					case 55:
						a = 9535e3;
						break;
					case 56:
						a = 2e7;
						break;
					case 57:
						a = 3e7;
						break;
					case 58:
						a = 5e7;
						break;
					case 59:
						a = 9e7
					}
				}
				if (n += a, n > e || 0 === a) {
					r = !1;
					break
				}
				s++
			}
			
			if(t) {
				if(e<1000) {
					s = 0;
				} else {
					s = (e<2000 && 1)||(e<5000 && 2)||(e<10000 && 3)||(e<20000 && 4)||(e<36000 && 5)||(e<60000 && 6)||(e<94000 && 7)||(e<140000 && 8)||(e<200000 && 9)||(e<300000 && 10)||(e<420000 && 11)||(e<570000 && 12)||(e<750000 && 13)||(e<1000000 && 14)||(e<1280000 && 15)||(e<1580000 && 16)||(e<1900000 && 17)||(e<2250000 && 18)||(e<2630000 && 19)||(e<3030000 && 20)||(e<3460000 && 21)||(e<3930000 && 22)||(e<4440000 && 23)||(e<4990000 && 24)||(e<5580000 && 25)||(e<6220000 && 26)||(e<6910000 && 27)||(e<7650000 && 28)||(e<8440000 && 29)||(e<9290000 && 30)||(e<10220000 && 31)||(e<11270000 && 32)||(e<12480000 && 33)||(e<13910000 && 34)||(e<15640000 && 35)||(e<17770000 && 36)||(e<20420000 && 37)||(e<23730000 && 38)||(e<27840000 && 39)||40;
				}
			} else {
				if(e<50000) {
					s = 0;
				} else {
					s = (e<100000 && 1)||(e<200000 && 2)||(e<300000 && 3)||(e<500000 && 4)||(e<750000 && 5)||(e<1000000 && 6)||(e<1300000 && 7)||(e<1600000 && 8)||(e<2000000 && 9)||(e<2500000 && 10)||(e<3000000 && 11)||(e<4000000 && 12)||(e<5000000 && 13)||(e<6000000 && 14)||(e<8000000 && 15)||(e<10000000 && 16)||(e<12500000 && 17)||(e<15000000 && 18)||(e<17500000 && 19)||(e<20000000 && 20)||(e<23000000 && 21)||(e<26000000 && 22)||(e<29500000 && 23)||(e<33000000 && 24)||(e<37000000 && 25)||(e<41000000 && 26)||(e<45500000 && 27)||(e<50000000 && 28)||(e<55000000 && 29)||30;
				}
			}
			return $.extend({
				level: s,
				extraCoin: i,
				currLvCoin: a,
				percentNum: 0 !== a ? i / a : 1,
				percent: 0 !== a ? (i / a * 100).toFixed(1) + "%" : "100%"
			}, t ? this.getRichIcon(0, s) : this.getAnchorIcon(0, s))
		},*/
		
		
		getLevel: function(e, t) {
			e = e || 0;
			var n = 0,
				r = 0,
				i = 0,
				a = null;
			//return t ? (a = Ttxy.level.getRichLevel(e), r = a.levelCoin, n = e - a.coin, i = a.level) : (a = Ttxy.level.getStarLevel(e), r = a.levelBean, n = e - a.bean, i = a.level), 
			return t ? (a = Ttxy.level.getRichLevel(e), r = a.levelCoin, n = e, i = a.level) : (a = Ttxy.level.getStarLevel(e), r = a.levelBean, n = e, i = a.level), 
				$.extend({
				level: a.level,
				extraCoin: n,
				currLvCoin: r,
				percentNum: 0 !== r ? n / r : 1,
				percent: 0 !== r && parseInt((n / r * 100).toFixed(1))<=100 ? (n / r * 100).toFixed(1) + "%" : "100%"
			}, 
			t ? this.getRichIcon(0, i) : this.getAnchorIcon(0, i))
		},
		
		getLevel2Coin: function(e, t) {
			e -= 1;
			for (var r = 0, n = t ? 100 : 1e3; e >= 0;) r += (t ? (e + 1) * (e + 1) * (e + 1) + 2 * e : (e + 1) * (e + 1) + e) * n, e--;
			return r
		},
		getRichIcon: function(e, t) {
			var r = $.isNumeric(t) ? t : this.getLevel(e, !0).level;
			return r = r > 40 ? 40 : r, {
				icon: "r_" + r,
				title: r + "级"
			}
		},
		getAnchorIcon: function(e, t) {
			var r = $.isNumeric(t) ? t : this.getLevel(e).level;
			return r = r > 30 ? 30 : r, {
				level: r,
				icon: "s_" + r + (r > 30 ? " angleLV" : ""),
				title: r + "级主播"
			}
		},
		createAnchorIcon: function(e, t) {
			var r = this.getAnchorIcon(e, t),
				n = '					<span class="starLV <%=icon%>" title="<%=title%>">						<%if (level > 30 ) { %>							<i></i>						<% } %>					</span>				';
			return $.template(n, r)
		},
		convertAnchorIcons: function(e) {
			var t = e.find(".starLV"),
				r = this;
			$.each(t, function(e, t) {
				var n = $(t);
				n.replaceWith(r.createAnchorIcon(n.data("beantotal")))
			})
		},
		getVipIcon: function(e) {
			if (!$.isNumeric(e)) return null;
			if (e = parseInt(e, 10), 0 === e) return null;
			var t = "",
				r = "";
			switch (e) {
			case -1:
				t = "tvipIcon", r = "试用VIP";
				break;
			case 1:
				t = "vipIcon", r = "VIP";
				break;
			case 2:
				t = "svipIcon", r = "VIP"
			}
			return {
				icon: t,
				title: r
			}
		},
		getShinningStar: function(e) {
			var t = {
				isShinning: !1,
				icon: "",
				title: ""
			};
			return $.isNumeric(e) ? (e = parseInt(e, 10), e >= 5e5 ? (t.isShinning = !0, t.type = 5, t.icon = "star_5", t.title = "闪耀5星") : e >= 2e5 ? (t.isShinning = !0, t.type = 4, t.icon = "star_4", t.title = "闪耀4星") : e >= 1e5 ? (t.isShinning = !0, t.type = 3, t.icon = "star_3", t.title = "闪耀3星") : e >= 5e4 ? (t.isShinning = !0, t.type = 2, t.icon = "star_2", t.title = "闪耀2星") : e >= 2e4 && (t.isShinning = !0, t.type = 1, t.icon = "star_1", t.title = "闪耀1星"), t) : t
		},
		convertRichEles: function(e) {
			var t = e.find(".richLV"),
				r = this;
			$.each(t, function(e, t) {
				var n = $(t),
					i = n.attr("data-coinTotal"),
					a = n.attr("data-weekSpend"),
					s = r.getLevel(i, !0),
					o = r.getShinningStar(a);
				//n.removeAttr("data-coinTotal").attr("title", s.title).addClass(s.icon), o.isShinning && n.append('<span class="' + o.icon + '" title="' + s.title + "&" + o.title + '"></span>')
				//去掉闪星
				n.removeAttr("data-coinTotal").attr("title", s.title).addClass(s.icon), o.isShinning && n.append('<span class="' + o.icon + '" title="' + s.title +'"></span>')
			})
		},
		createRoom: function(e) {
			return $.isNumeric(e) ? "/" + e : "javascript:;"
		},
		createCount: function(e) {
			if (!$.isNumeric(e) || !e) return 0;
			switch (e = parseInt(e, 10)) {
			case 20 > e:
				e = 100 * e;
				break;
			case 50 > e:
				e = 80 * e;
				break;
			default:
				e = 68 * e
			}
			return e + Math.round(100 * Math.random())
		},
		formatNum: function(e) {
			for (var t = e.toString().split(""), r = t.length - 1; r >= 0; r -= 3) r != t.length - 1 && r >= 0 && t.splice(r + 1, 0, ",");
			return t.join("")
		},
		createAuthCode: function() {
			return Ttxy.config.dataRoot + "user/authcode/" + Ttxy.user.getToken() + "?t=" + (new Date).getTime()
		},
		filterWords: function(e) {
			for (var t = 0; _sensitiveLength > t; t++) e = e.replace(_sensitiveAry[t], "**");
			if (_isWeiFilterGeted) for (var r = 0; _weiAryLength > r; r++) e = e.replace(WEI_FILTER_ARY[r], "**");
			return e
		},
		filterXss: function(e) {
			return e.replace(/</g, "&lt").replace(/>/g, "&gt").replace(/'/g, "&#39;").replace(/"/g, "&#34;")
		},
		isSensitive: function(e, t) {
			var r = _sensitiveAry,
				n = _sensitiveLength,
				i = !1;
			"all" == t && (r = _allWordsAry, n = _allWordsLength);
			for (var a = 0; n > a; a++) {
				if (!r[a]) return;
				if (-1 != e.indexOf(r[a])) {
					i = !0;
					break
				}
			}
			return i
		},
		isLegal: function(e) {
			return !/[~!@#$%^&*()+`='{}<>,./\?\\\|\[\]\-;:'"]+/.test(e)
		},
		isWeiLanguage: function(e) {
			return _weiLanguageReg.test(e) || _tibetReg.test(e)
		},
		bytesLength: function(e) {
			return e.replace(_doubleBytes, "aa").length
		},
		isFlashEnabled: function() {
			var e = !1;
			try {
				var t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				t && (e = !0)
			} catch (r) {
				void 0 !== navigator.mimeTypes["application/x-shockwave-flash"] && (e = !0)
			}
			return e
		},
		insertSWF: _insertSWF,
		isOfficalID: function(e) {
			return $.inArray(e, Ttxy.config.officialIDS) > -1
		},
		openServiceQQ: function() {
			window.open("http://b.qq.com/webc.htm?new=0&sid=800085020&eid=2188z8p8p8p8z8R8p8K8p&o=www.51weibo.com&q=7&ref=" + document.location, "_blank", "height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no")
		},
		openSeniorServiceQQ: function() {
			Ttxy.user.isLogin() ? Ttxy.user.getRichLv() > 10 ? window.open("http://wpa.qq.com/msgrd?v=3&uin=1692775749&site=qq&menu=yes") : Ttxy.messager.warn("您当前等级还不够，赶快升级吧") : Ttxy.user.popupLogin()
		},
		//自己封装一个stringbuffer
		StringBuffer:function(str){
			var arr = [];
		    str = str || "";
		    arr.push(str);
		    this.append = function(str1)
		    {
		        arr.push(str1);
		        return this;
		    };
		    this.toString = function()
		    {
		        return arr.join("");
		    };
		}
	}
});;



$.module("Ttxy.level", function() {
	function n(n) {
		for (var e = 1, a = c.star.length; a > e; e++) {
			var y = c.star[e];
			if (n < y.cny) break
		}
		return {
			name: c.star[e - 1].name,
			bean: c.star[e - 1].cny,
			//levelBean: y.cny - c.star[e - 1].cny,
			levelBean: y.cny,
			level: e - 1
		}
	}
	function e(n) {
		for (var e = 1, a = c.rich.length; a > e; e++) {
			var y = c.rich[e];
			if (n < y.cny) break
		}
		return {
			name: c.rich[e - 1].name,
			coin: c.rich[e - 1].cny,
			//levelCoin: y.cny - c.rich[e - 1].cny,
			levelCoin: y.cny,
			level: e - 1
		}
	}
	var c = {
		star: [{
			name: "0级",
			cny: 0
		}, {
			name: "1级",
			cny: 5e3
		}, {
			name: "2级",
			cny: 2e4
		}, {
			name: "3级",
			cny: 5e4
		}, {
			name: "4级",
			cny: 9e4
		}, {
			name: "5级",
			cny: 15e4
		}, {
			name: "6级",
			cny: 25e4
		}, {
			name: "7级",
			cny: 4e5
		}, {
			name: "8级",
			cny: 6e5
		}, {
			name: "9级",
			cny: 1e6
		}, {
			name: "10级",
			cny: 15e5
		}, {
			name: "11级",
			cny: 22e5
		}, {
			name: "12级",
			cny: 3e6
		}, {
			name: "13级",
			cny: 4e6
		}, {
			name: "14级",
			cny: 5e6
		}, {
			name: "15级",
			cny: 6e6
		}, {
			name: "16级",
			cny: 8e6
		}, {
			name: "17级",
			cny: 1e7
		}, {
			name: "18级",
			cny: 125e5
		}, {
			name: "19级",
			cny: 15e6
		}, {
			name: "20级",
			cny: 175e5
		}, {
			name: "21级",
			cny: 2e7
		}, {
			name: "22级",
			cny: 23e6
		}, {
			name: "23级",
			cny: 26e6
		}, {
			name: "24级",
			cny: 295e5
		}, {
			name: "25级",
			cny: 33e6
		}, {
			name: "26级",
			cny: 37e6
		}, {
			name: "27级",
			cny: 41e6
		}, {
			name: "28级",
			cny: 455e5
		}, {
			name: "29级",
			cny: 5e7
		}, {
			name: "30级",
			cny: 55e6
		}],
		rich: [{
			name: "0级",
			cny: 0
		}, {
			name: "1级",
			cny: 1e3
		}, {
			name: "2级",
			cny: 2e3
		}, {
			name: "3级",
			cny: 5e3
		}, {
			name: "4级",
			cny: 1e4
		}, {
			name: "5级",
			cny: 2e4
		}, {
			name: "6级",
			cny: 36e3
		}, {
			name: "7级",
			cny: 6e4
		}, {
			name: "8级",
			cny: 94e3
		}, {
			name: "9级",
			cny: 14e4
		}, {
			name: "10级",
			cny: 2e5
		}, {
			name: "11级",
			cny: 3e5
		}, {
			name: "12级",
			cny: 42e4
		}, {
			name: "13级",
			cny: 57e4
		}, {
			name: "14级",
			cny: 75e4
		}, {
			name: "15级",
			cny: 1e6
		}, {
			name: "16级",
			cny: 128e4
		}, {
			name: "17级",
			cny: 158e4
		}, {
			name: "18级",
			cny: 19e5
		}, {
			name: "19级",
			cny: 225e4
		}, {
			name: "20级",
			cny: 263e4
		}, {
			name: "21级",
			cny: 303e4
		}, {
			name: "22级",
			cny: 346e4
		}, {
			name: "23级",
			cny: 393e4
		}, {
			name: "24级",
			cny: 444e4
		}, {
			name: "25级",
			cny: 499e4
		}, {
			name: "26级",
			cny: 558e4
		}, {
			name: "27级",
			cny: 622e4
		}, {
			name: "28级",
			cny: 691e4
		}, {
			name: "29级",
			cny: 765e4
		}, {
			name: "30级",
			cny: 844e4
		}, {
			name: "31级",
			cny: 929e4
		},{
			name: "32级",
			cny: 1022e4
		}, {
			name: "33级",
			cny: 1127e4
		}, {
			name: "34级",
			cny: 1248e4
		},{
			name: "35级",
			cny: 1391e4
		}, {
			name: "36级",
			cny: 1564e4
		}, {
			name: "37级",
			cny: 1777e4
		},{
			name: "38级",
			cny: 2042e4
		}, {
			name: "39级",
			cny: 2373e4
		}, {
			name: "40级",
			cny: 2784e4
		}]
	};
	return {
		getRichList: function() {
			return c.rich
		},
		getStarList: function() {
			return c.star
		},
		getStarLevel: n,
		getRichLevel: e,
		getStarLevelBean: function(n) {
			var e = c.star.length;
			return n = n > e ? e : n, c.star[n].cny
		},
		getRichLevelCoin: function(n) {
			var e = c.rich.length;
			return n = n > e ? e : n, c.rich[n].cny
		}
	}
});;


$.module("Ttxy.messager", function() {
	function e(e, a) {
		var c = e,
			t = {
				time: 3,
				msg: "",
				closable: !0,
				callback: function() {},
				icon: "",
				id: Math.floor(1e5 * Math.random())
			};
		"string" == typeof e && (c = {
			msg: e,
			icon: a ? a : "info"
		}), c.callback = c.callback ||
		function() {}, $.extend(t, c), n.push(t.id), $("body").append($.template(i, t));
		var r = $("#ui-messager-" + t.id);
		return r.css({
			left: "50%",
			marginLeft: -r.outerWidth() / 2
		}), t.time && (t.timerID = setTimeout(function() {
			s(t.id)
		}, 1e3 * t.time)), r.data("settings", t), r
	}
	function s(e) {
		var s = e || n.pop(),
			i = $("#ui-messager-" + s),
			c = i.data("settings");
		c.closable && (i.fadeOut(), $("#ui-messager-mask-" + s).fadeOut().remove(), e && a(e), c.callback(), c.time && clearTimeout(c.timerID), i.remove())
	}
	function a(e) {
		for (var s = 0; s < n.length; s++) n[s] == e && n.splice(s, 1)
	}
	var i = '<div class="ui-messager-mask" id="ui-messager-mask-<%=id%>" onclick="Ttxy.messager.close(<%=id%>)"></div>        <div class="ui-messager fix"  id="ui-messager-<%=id%>"><span class="ui-messager-icon ui-messager-<%=icon%>"></span><span class="ui-messager-cnt"><%=msg%></span></div>',
		n = [];
	return {
		alert: e,
		warn: function(s, a) {
			return e({
				msg: s,
				icon: "warn",
				callback: a
			})
		},
		error: function(s, a) {
			return e({
				msg: s,
				icon: "error",
				callback: a
			})
		},
		success: function(s, a) {
			return e({
				msg: s,
				icon: "success",
				callback: a
			})
		},
		loading: function(s, a) {
			return e({
				msg: s || "正在努力加载……",
				icon: "loading",
				callback: a,
				time: 0
			})
		},
		close: s
	}
});;
$.module("Ttxy.ui", function() {
	function e(e, n, i) {
		e = $.extend({
			id: "",
			width: 0,
			height: 0,
			top: "50%",
			left: "50%",
			center: !1,
			title: "",
			content: "",
			noMsk: !1,
			disableMsk: !1,
			enableDrag: !1,
			footer: "",
			force: !1
		}, e), l = e.disableMsk;
		var o = $("#" + e.id);
		if (o.length > 0 && !e.force) return o.show(), o;
		if (o.length > 0) try {
			o.remove()
		} catch (r) {}
		var c = $.template(Tmpl.overAll.commonPopup, e),
			s = $(c).css({
				top: e.top,
				left: e.left
			});
		return s.find(".close").click(function() {
			var e = !0;
			$.isFunction(i) && (e = i()), e && (s.hide(), $("#mask").hide())
		}), $("body").append(s), e.width && "auto" != e.width ? s.css("width", e.width) : e.width = s.width(), e.height ? s.css("height", e.height) : e.height = s.height(), "function" == typeof n && n(s), e.center && (0 === e.height && (e.height = s.height()), s.css({
			marginLeft: $.isNumeric(e.width) ? -e.width / 2 : -(s.width() / 2 || 100),
			marginTop: $.isNumeric(e.height) ? -e.height / 2 : -(s.height() / 2 || 100)
		})), 1.5 * s.height() < screen.height && !Ttxy.core.isIE6() && s.css("position", "fixed"), e.enableDrag === !0 && (s.children(".title").addClass("move"), t()), s
	}
	function t() {
		o !== !0 && (o = !0, $("body").delegate(" .popupMenu .move", "mousedown", function(e) {
			r = !0;
			var t = $(this),
				n = t.parent();
			return s.left = parseInt(n.css("left").slice(0, -2), 10), s.top = parseInt(n.css("top").slice(0, -2), 10), c.x = e.pageX, c.y = e.pageY, a = t.parent(), e && e.preventDefault ? e.preventDefault() : window.event.returnValue = !1, !1
		}), $("body").delegate(" .popupMenu .move", "mouseup", function() {
			r = !1, a = null
		}), $("body").bind("mouseup", function() {
			r = !1, a = null
		}), $("body").bind("mousemove", function(e) {
			r !== !1 && null !== a && a.css({
				left: s.left + (e.pageX - c.x),
				top: s.top + (e.pageY - c.y)
			})
		}))
	}
	function n(e) {
		if ("string" == typeof e) try {
			$("#" + e).remove()
		} catch (t) {
			$("#" + e).hide()
		} else try {
			$(".popupMenu").remove(".popupMenu")
		} catch (t) {
			$(".popupMenu").hide()
		}
		$("#mask").hide()
	}
	function i(e, t) {
		function n(t) {
			var n = -t * i.width;
			e.find("ul").stop(!0, !1).animate({
				left: n
			}, 300), h.removeClass("on").eq(t).addClass("on")
		}
		var i = {
			time: 4e3,
			width: 800
		};
		$.extend(i, t);
		for (var o, r = e.find("ul li").length, c = 0, s = "<div class='ui-simpleSlide-btn'>", a = 0; r > a; a++) s += '<span class="icon-index"></span>';
		s += "</div>", e.append(s);
		var h = e.find(".ui-simpleSlide-btn span");
		h.mouseover(function() {
			c = h.index(this), n(c)
		}).eq(0).trigger("mouseover"), e.find("ul").css("width", i.width * r), e.hover(function() {
			clearInterval(o)
		}, function() {
			o = setInterval(function() {
				n(c), c++, c == r && (c = 0)
			}, i.time)
		}).trigger("mouseleave")
	}
	var o = !1,
		r = !1,
		c = {
			x: 0,
			y: 0
		},
		s = {
			left: 0,
			top: 0
		},
		a = null,
		h = null,
		l = !1;
	return {
		createPopupMenu: function(t, n, i) {
			return this.hideMask(), t.noMsk || this.showMask(), e(t, n, i)
		},
		hideMenu: n,
		noMoney: function() {
			var e = '<p>余额不足，请充值</p><p><a href="javascript:;" onclick="Ttxy.user.redirectToCharge()">充值</a></p>',
				t = {
					id: "rechargeTip",
					width: 400,
					height: 240,
					center: !0,
					title: "提示",
					content: e
				};
			this.createPopupMenu(t)
		},
		commonTip: function(e, t, n) {
			if ("string" == typeof e) {
				var i = {
					id: "commonTip",
					width: 400,
					height: "auto",
					center: !0,
					title: "提示",
					content: "<p>" + e + "</p>",
					force: !0
				};
				if ("number" == typeof t) {
					var o = this;
					setTimeout(function() {
						o.hideMenu(), "function" == typeof n && n()
					}, 1e3 * t)
				}
				return this.createPopupMenu(i)
			}
		},
		confirmTip: function(e, t, n, i, o, r) {
			if ("string" == typeof t) {
				o = o || "取消", r = r || "确定";
				var c = {
					id: "confirmTip",
					width: 400,
					height: "auto",
					center: !0,
					title: e || "提示",
					content: t,
					footer: '<a href="javascript:void(0);" class="confirm">' + r + '</a><a href="javascript:void(0);" class="cancel">' + o + "</a>",
					force: !0
				},
					s = this;
				return this.createPopupMenu(c, function(e) {
					e.find(".confirm").one("click", function() {
						s.hideMenu(), "function" == typeof n && n(e)
					}), e.find(".cancel").one("click", function() {
						"function" == typeof i && i(), s.hideMenu()
					})
				})
			}
		},
		showMask: function(e, t) {
			var n = $("#mask"),
				i = this;
			0 === n.length && ($("body").append('<div id="mask"></div>'), n = $("#mask")), n.show(), t !== !0 && (h = e, $("#mask").unbind().click(function() {
				i.hideMask()
			}))
		},
		hideMask: function() {
			l || ($("#mask").hide(), this.hideMenu(), "function" == typeof h && h())
		},
		reachBottom: function(e, t) {
			t = "number" == typeof t ? t : 0;
			var n = e[0].clientHeight,
				i = e[0].scrollTop,
				o = e[0].scrollHeight;
			return i + n >= o - t ? !0 : !1
		},
		openWindow: function(e, t, n) {
			var i = (window.screen.height - n) / 2,
			o = (window.screen.width - t) / 2;
			window.open(e, "newwindow", "Detail", "Scrollbars=no,Toolbar=no,Location=no,Direction=no,Resizeable=no,Width=" + t + " ,Height=" + n + ",top=" + i + ",left=" + o)
		
			/*alert($.browser.msie);
			if($.browser.msie){
				window.open(e, "_blank", "Detail", "Scrollbars=no,Toolbar=no,Location=no,Direction=no,Resizeable=no,Width=" + t + " ,Height=" + n + ",top=" + i + ",left=" + o)
			}else{
				window.open(e, "newwindow", "Detail", "Scrollbars=no,Toolbar=no,Location=no,Direction=no,Resizeable=no,Width=" + t + " ,Height=" + n + ",top=" + i + ",left=" + o)
			}*/
	},
		scrollArea: function(e) {
			var t = $.extend({
				selector: null,
				time: 1e3,
				line: 1
			}, e),
				n = !1;
			t.selector && (t.selector.bind("mouseover", function() {
				n = !0
			}), t.selector.bind("mouseleave", function() {
				n = !1
			}), t.children = t.selector.children(), t.children.length <= 1 || setInterval(function() {
				if (!n) {
					t.children = t.selector.children();
					var e = $(t.children[0]),
						i = e.height();
					e.animate({
						marginTop: -i * t.line
					}, 500, "linear", function() {
						for (var e = 0; e < t.line; e++) {
							var n = $(t.children[e]);
							n.detach().css("marginTop", 0), t.selector.append(n)
						}
					})
				}
			}, t.time))
		},
		simpleSlide: i
	}
});;
$.module("Tmpl.overAll", 
function() {
	this.userInfo = '<% if (data.vip == 2) { %><li class="header-logininfo-item" style="display:none;" ><span class="svipIcon icon-vip"></span><div class="topbox vipbox">    <i class="icon-base icon-arrow-up"></i>    隐身状态：<a href="javascript:;" id="j-btnSwitch" class="icon-base vipbox-switch <%=data.vip_hiding == 1 ? "on" : ""%>"></a></div></li><% } %><li class="header-logininfo-item header-logininfo-item-nickname"><a class="header-logininfo-nickname" id="j-userNickname" href="/user.html" target="user"><%=data.nick_name%></a><% var richLvData = Ttxy.common.getLevel(data.finance.coin_spend_total || 0, true), anchorLvData = Ttxy.common.getLevel(data.finance.bean_count_total || 0); %><div class="topbox userbox">    <i class="icon-base icon-arrow-up"></i>    <div class="userbox-headpic">	<a target="user" href="/user.html"><img src="<%=data.pic%>"/></a> <a target="user" href="/user.html#a=avatar&type=avatar" class="photo">修改头像</a><br />	<span class="richLV <%=richLvData.icon%>" title="<%=richLvData.title%>"></span><br />		<!--<a href="javascript:;" onclick="Ttxy.user.logout();">退出登录</a>-->    </div>    <div class="userbox-menu">	<ul class="fix">	    <li><a target="_blank" href="/user.html"><i class="icon-base icon-home"></i>个人中心</a></li>	    <li><a target="_blank" href="/u/<%=data._id%>"><i class="icon-base icon-archive"></i>我的主页</a></li>	    <li><a target="_blank" href="/user.html#a=follow"><i class="icon-base icon-follow"></i>我的主播</a></li>		<!--<li><a target="_blank" href="/user.html#a=<%=data.family?"family":"noFamily"%>"><i class="icon-base icon-myfamily"></i>我的家族</a></li>-->		<li><a target="_blank" href="/user.html#a=charge"><i class="icon-base icon-charge"></i>消费记录</a></li>		<li><a href="javascript:;" onclick="Ttxy.user.topController.popupAdvice();"><i class="icon-base icon-exchange"></i>意见建议</a></li> <li><a href="javascript:;" onclick="Ttxy.user.logout();"><i class="icon-base icon-myfamily"></i>退出登录</a></li>	    <!--<li><a target="_blank" href="javascript:;" onclick="Ttxy.user.redirectToCharge()"><i class="icon-base icon-coin"></i>充值中心</a></li>	    <li><a target="_blank" href="/user.html"><i class="icon-base icon-exchange"></i>兑换管理</a></li>	    <li><a target="_blank" href="/conversation"><i class="icon-base icon-conversation"></i>官方话题</a></li>-->	</ul>	<!--<div class="userbox-switch fix"><div class="userbox-switch-btn"><span class="userbox-switch-close <%=data.vip_hiding == 1 ? "on" : ""%>">关闭</span><span class="userbox-switch-open  <%=data.vip_hiding == 1 ? "" : "on"%>">开启</span></div><i class="icon-base icon-glass"></i>隐身开关</div>-->    </div></div></li>  <li class="header-logininfo-item header-logininfo-item-update"><a href="javascript:;" class="header-logininfo-update">[修改昵称]<span class="icon-base icon-nickname" style="display:none;"></span></a><div class="topbox nicknameBox">    <i class="icon-base icon-arrow-up"></i>    <table>	<tr>	    <th>当前昵称：</th>	    <td id="j-currentNickname"><%=data.nick_name%></td>	</tr>	<tr id="j-nicknameFormat" style="display:none">	    <th>马甲格式：</th>	    <td><span class="nicknameFormat"></span><a class="nicknamBox-use" href="javascript:;" id="j-btnUseFormat">使用</a></td>	</tr>	<tr>	    <th>修改昵称：</th>	    <td><input id="j-nickname" class="textbox" name="nickname" size="18" maxlength="8" type="text" value="<%=data.nick_name%>"></td>	</tr>	<tr>	    <th></th>	    <td>		<span class="nickname-tip" id="j-nicknameTip"></span>		<input id="j-updateNickname" type="button" value="修改" class="btn btn-primary">		<input id="j-cancleNickname" class="btn btn-default" type="button" value="取消" style="display:none;">	    </td>	</tr>    </table></div></li><li class="header-logininfo-item">	<a href="javascript:;"><span class="icon-base icon-letter"></span></a>	<div class="topbox mailbox">	    <i class="icon-base icon-arrow-up"></i>	    <p id="j-mailbox-msg" class="mailbox-dashline"><a href="/user.html#a=msg&type=msg" target="_blank">我的通知(<span>0</span>)</a></p>	    <p id="j-mailbox-remind" ><a href="/user.html#a=msg&type=remind" target="_blank">我的提醒(<span>0</span>)</a></p>	</div></li><% if (Ttxy.user.isOperate() || (Ttxy.live && Ttxy.live.liveControl && Ttxy.live.liveControl.getRoomId() === data._id)) { %>	<li class="header-logininfo-item">		<a href="javascript:;"><span class="icon-base icon-anchor"></span></a>		<div class="topbox anchor-box">		    <i class="icon-base icon-arrow-up"></i>	    	<ul class="fix">		    	<li><a href="javascript:;" data-type="cover">设置封面</a></li>		    	<!--<li><a href="javascript:;" data-type="egg">发起砸蛋</a></li>-->		    	<!--<li><a href="javascript:;" data-type="nickFormat">设置马甲</a></li>-->		    	<!--<li><a href="javascript:;" data-type="puzzle">发起拼图</a></li>-->		    	<li><a href="javascript:;" data-type="greeting">设置问候语</a></li>		    	<li><a href="javascript:;" data-type="defaultSong">预设歌单</a></li>		    	<!--<li><a href="javascript:;" data-type="roomBg">设置背景图</a></li>-->		    </ul>		</div>	</li><% } %><% if (Ttxy.live) { %>	<li class="header-logininfo-item user-coin-count"><%=data.finance.coin_count || 0%>金币</li><% } %><li class="header-logininfo-item"><a href="javascript:;" onclick="Ttxy.user.redirectToCharge()" class="header-logininfo-pay">充值</a></li> <li class="header-logininfo-item"><a target="_blank" href="/info.html">帮助中心</a></li><% if (Ttxy.live) { %>	<!--<li class="header-logininfo-item"><a target="_blank" href="/info.html">客服</a></li>--><% } else { %>	<li class="header-logininfo-item" style="position:absolute;right:0; top:35px;">		<%if(! Ttxy.user.mainController.isAnchor()){%>			<a target="_blank" href="/apply.html" class="i_live"><!--<i class="sqqyue"></i>-->申请签约</a>		<%}else{%>			<a href="/<%=data._id%>" class="i_live"><!--<i class="kszbo"></i>-->开始直播</a>		<%}%>	</li><% } %>',
	this.userInfo2 = '<% if (data.vip == 2) { %><li class="header-logininfo-item" style="display:none;" ><span class="svipIcon icon-vip"></span><div class="topbox vipbox">       隐身状态：<a href="javascript:;" id="j-btnSwitch" class="icon-base vipbox-switch <%=data.vip_hiding == 1 ? "on" : ""%>"></a></div></li><% } %><li class="header-logininfo-item header-logininfo-item-nickname yhpic" style="height:50px;"><a class="header-logininfo-nickname" id="live_personinfo" href="/user.html" target="user" style="height:46px;"><img src=<%=data.pic%> style="width:46px; height:46px;" /></a><span class="piczz"></span><% var richLvData = Ttxy.common.getLevel(data.finance.coin_spend_total || 0, true), anchorLvData = Ttxy.common.getLevel(data.finance.bean_count_total || 0); %><div class="topbox userbox person_box">     <div class="person-headpic person_new"><a target="user" href="/user.html" class="person_pic"><img src="<%=data.pic%>"/><i></i></a>	<a href="javascript:;" class="person_name"><%=data.nick_name%></a><a href="javascript:;" class="header-logininfo-update photo2" id="photo2">修改昵称<div class="topbox nicknameBox" style="display:none;">    <i class="icon-base icon-arrow-up"></i>    <table>	<tr>	    <th>当前昵称：</th>	    <td id="j-currentNickname"><%=data.nick_name%></td>	</tr>	<tr id="j-nicknameFormat" style="display:none">	    <th>马甲格式：</th>	    <td><span class="nicknameFormat"></span><a class="nicknamBox-use" href="javascript:;" id="j-btnUseFormat">使用</a></td>	</tr>	<tr>	    <th>修改昵称：</th>	    <td><input id="j-nickname" class="textbox" name="nickname" size="18" maxlength="8" type="text" value="<%=data.nick_name%>"></td>	</tr>	<tr>	    <th></th>	    <td>		<span class="nickname-tip" id="j-nicknameTip"></span>		<input id="j-updateNickname" type="button" value="修改" class="btn btn-primary">		<input id="j-cancleNickname" class="btn btn-default" type="button" value="取消" style="display:none;">	    </td>	</tr>    </table></div></a><a target="_blank" href="/pay.html" class="charge">充值</a>	 <span class="richLV <%=richLvData.icon%>" title="<%=richLvData.title%>"></span>		<!--<a href="javascript:;" onclick="Ttxy.user.logout();">退出登录</a>-->    </div>    <div class="userbox-menu person_live person_detail">	<ul class="fix">	   <li >金币:<%=data.finance.coin_count || 0%> </li> <li>银币:<%=data.finance.bean_count || 0%></li>	 <li><a target="_blank" href="/user.html"><i class="icon-base icon-home"></i>个人中心</a></li>	    <li><a target="_blank" href="/u/<%=data._id%>"><i class="icon-base icon-archive"></i>我的主页</a></li>	    <li><a target="_blank" href="/user.html#a=follow"><i class="icon-base icon-follow"></i>我的主播</a></li>		<!--<li><a target="_blank" href="/user.html#a=<%=data.family?"family":"noFamily"%>"><i class="icon-base icon-myfamily"></i>我的家族</a></li>-->		<li><a target="_blank" href="/user.html#a=charge"><i class="icon-base icon-charge"></i>消费记录</a></li>		<li><a href="javascript:;" onclick="Ttxy.user.topController.popupAdvice();"><i class="icon-base icon-exchange"></i>意见建议</a></li> <li><a href="javascript:;" onclick="Ttxy.user.logout();"><i class="icon-base icon-myfamily"></i>退出登录</a></li>	    <!--<li><a target="_blank" href="javascript:;" onclick="Ttxy.user.redirectToCharge()"><i class="icon-base icon-coin"></i>充值中心</a></li>	    <li><a target="_blank" href="/user.html"><i class="icon-base icon-exchange"></i>兑换管理</a></li>	    <li><a target="_blank" href="/conversation"><i class="icon-base icon-conversation"></i>官方话题</a></li>-->	</ul>	<!--<div class="userbox-switch fix"><div class="userbox-switch-btn"><span class="userbox-switch-close <%=data.vip_hiding == 1 ? "on" : ""%>">关闭</span><span class="userbox-switch-open  <%=data.vip_hiding == 1 ? "" : "on"%>">开启</span></div><i class="icon-base icon-glass"></i>隐身开关</div>-->    </div></div></li>  <li class="header-logininfo-item">	<a href="javascript:;"><span class="icon-base icon-letter new-letter"></span></a>	<div class="topbox mailbox">	    <i class="icon-base icon-arrow-up"></i>	    <p id="j-mailbox-msg" class="mailbox-dashline"><a href="/user.html#a=msg&type=msg" target="_blank">我的通知(<span>0</span>)</a></p>	    <p id="j-mailbox-remind" ><a href="/user.html#a=msg&type=remind" target="_blank">我的提醒(<span>0</span>)</a></p>	</div></li><% if (Ttxy.user.isOperate() || (Ttxy.live && Ttxy.live.liveControl && Ttxy.live.liveControl.getRoomId() === data._id)) { %>	<li class="header-logininfo-item">		<a href="javascript:;"><span class="icon-base icon-anchor new-anchor"></span></a>		<div class="topbox anchor-box">		    <i class="icon-base icon-arrow-up"></i>	    	<ul class="fix">		    	<li><a href="javascript:;" data-type="cover">设置封面</a></li>		    	    	<li><a href="javascript:;" data-type="greeting">设置问候语</a></li>		    	<li><a href="javascript:;" data-type="defaultSong">预设歌单</a></li>		    	<!--<li><a href="javascript:;" data-type="roomBg">设置背景图</a></li>-->		    </ul>		</div>	</li><% } %>',
	this.userInfo3 = '<% if (data.vip == 2) { %><% } %>  <li class="header-logininfo-item">	<a href="javascript:;"><span class="icon-base icon-letter"></span></a>	<div class="topbox mailbox">	    <i class="icon-base icon-arrow-up"></i>	    <p id="j-mailbox-msg" class="mailbox-dashline"><a href="/user.html#a=msg&type=msg" target="_blank">我的通知(<span>0</span>)</a></p>	    <p id="j-mailbox-remind" ><a href="/user.html#a=msg&type=remind" target="_blank">我的提醒(<span>0</span>)</a></p>	</div></li><% if (Ttxy.user.isOperate() || (Ttxy.live && Ttxy.live.liveControl && Ttxy.live.liveControl.getRoomId() === data._id)) { %>	<li class="header-logininfo-item">		<a href="javascript:;"><span class="icon-base icon-anchor"></span></a>		<div class="topbox anchor-box">		    <i class="icon-base icon-arrow-up"></i>	    	<ul class="fix">		    	<li><a href="javascript:;" data-type="cover">设置封面</a></li><li><a href="javascript:;" data-type="greeting">设置问候语</a></li>		    	<li><a href="javascript:;" data-type="defaultSong">预设歌单</a></li>		    		    </ul>		</div>	</li><% } %><% if (Ttxy.live) { %>	<li class="header-logininfo-item user-coin-count"><%=data.finance.coin_count || 0%>金币</li><% } %><li class="header-logininfo-item"><a href="javascript:;" onclick="Ttxy.user.redirectToCharge()" class="header-logininfo-pay">充值</a></li> <li class="header-logininfo-item"><a target="_blank" href="/info.html">帮助中心</a></li><% if (Ttxy.live) { %>	<!--<li class="header-logininfo-item"><a target="_blank" href="/info.html">客服</a></li>--><% } else { %>	<li class="header-logininfo-item" style="position:absolute;right:0; top:35px;">		<%if(! Ttxy.user.mainController.isAnchor()){%>			<a target="_blank" href="/apply.html" class="i_live"><!--<i class="sqqyue"></i>-->申请签约</a>		<%}else{%>			<a href="/<%=data._id%>" class="i_live"><!--<i class="kszbo"></i>-->开始直播</a>		<%}%>	</li><% } %>',
	//this.userInfo3 = ' <% if (Ttxy.live) {} else { %>	<li class="header-logininfo-item" style="position:absolute;right:0; top:25px;">		<%if(! Ttxy.user.mainController.isAnchor()){%>			<a target="_blank" href="/apply.html" class="i_live">申请签约</a>		<%}else{%>			<a href="/<%=data._id%>" class="i_live">开始直播</a>		<%}%>	</li><% } %>',
	
	// 登陆的字符串
	this.userLogin = '	<div class="left">		<ul>			<li><input name="user_name" type="text" class="nick_name inputData" placeholder="用户名"/></li>			<li><input name="password" type="password" class="password inputData" placeholder="密码"/></li>			<% if (isSecondLogin === true) { %>				<li>					<input name="auth_code" type="text" class="auth_code inputData" placeholder="验证码"/>					<input name="auth_key" type="hidden" id="loginAuthKey"/>					<img id="login_auth_img" src="" alt="验证码" title="点击刷新验证码" />				</li>			<% } %>		</ul>		<div class="fix">			<label><input type="checkbox" checked="true" name="isAutoLogin">下次自动登录</label>	<a href="findPws.xhtml" target="_blank" class="forget-pw">忘记密码？</a>	</div>		<a href="javascript:void(0);" class="loginBtns dl" data-type="login"></a>	</div>	<div class="login_line"></div><div class="right">		<span>没有账号<a class="keyLink" href="javascript:void(0);" data-type="register"></a></span>	<p>使用合作账号登录</p>	<a href=javascript:Ttxy.user.redirectToLogin("qq"); class="loginBtns qqLogin" data-type="qq"></a> 	</div>',
	// this.userLogin = ' <div class="left"> <ul> <li><input name="user_name"
	// type="email" class="nick_name inputData" placeholder="用户名"/></li>
	// <li><input name="password" type="password" class="password inputData"
	// placeholder="密码"/></li> <% if (isSecondLogin === true) { %> <li> <input
	// name="auth_code" type="text" class="auth_code inputData"
	// placeholder="验证码"/> <input name="auth_key" type="hidden"
	// id="loginAuthKey"/> <img id="login_auth_img" src="" alt="验证码"
	// title="点击刷新验证码" /> </li> <% } %> </ul> <div class="fix"> <label><input
	// type="checkbox" checked="true" name="isAutoLogin">下次自动登录</label> <a
	// href="http://v2.ttus.ttpod.com/find_pwd/index.html" target="_blank"
	// class="forget-pw">忘记密码？</a> </div> <a href="javascript:void(0);"
	// class="loginBtns dl" data-type="login"></a> </div> <div class="right">
	// <span>没有账号？<a class="keyLink" href="javascript:void(0);"
	// data-type="register">立即注册</a></span> <a
	// href=javascript:Ttxy.user.redirectToLogin("qq"); class="loginBtns
	// qqLogin" data-type="qq"></a> <a
	// href=javascript:Ttxy.user.redirectToLogin("sina"); class="loginBtns
	// sinaLogin" data-type="sina"></a> <p>使用合作网站账号直接登录</p> </div>',
	
	// this.userRegister = ' <div class="left"> <ul> <li><input id="text_id"
	// class="email inputData" type="hidden" name="user_name"
	// placeholder="用户名"/></li> <li><input class="nick_name inputData"
	// type="text" name="nick_name" placeholder="昵称"/></li> <li><input
	// class="password inputData" type="password" name="password"
	// placeholder="密码"/></li> <li><input class="confirmPassword inputData"
	// type="password" name="confirmPassword" placeholder="确认密码"/></li>
	// <li><input class="auth_code inputData" type="text" name="auth_code"
	// placeholder="验证码"/><img id="auth_img" src="" alt="验证码" title="点击刷新验证码"
	// /></li> <input id="regAuthKey" type="hidden" name="auth_key" />
	// <li><label><input type="checkbox" checked="true" name="isReadAgreement"
	// /><span>我已阅读并同意<a class="keyLink" href="/agreement.html"
	// target="_blank">相关服务条款</a></label></span></li> </ul> <a
	// href="javascript:void(0);" class="loginBtns btnRegister"
	// data-type="register"></a> </div> <div class="right"> <span>已有账号？<a
	// class="keyLink" href="javascript:void(0);"
	// data-type="login">直接登录</a></span> <a
	// href=javascript:Ttxy.user.redirectToLogin("qq"); class="loginBtns
	// qqLogin" data-type="qq"></a> <a
	// href=javascript:Ttxy.user.redirectToLogin("sina"); class="loginBtns
	// sinaLogin" data-type="sina"></a> <p>使用合作网站账号直接登录</p> </div>',
	// 注册拼接的字符串
	this.userRegister = '	<div class="left">		<ul>			<li><input   id="text_id"  class="email inputData" type="hidden" name="user_name" placeholder="用户名"/></li>			<li><input class="nick_name inputData" type="text" name="nick_name" placeholder="用户名"/></li>			<li><input class="password inputData" type="password" name="password" placeholder="密码"/></li>			<li><input class="confirmPassword inputData" type="password" name="confirmPassword" placeholder="确认密码"/></li>			<li><input class="auth_code inputData" type="text" name="auth_code" placeholder="验证码"/><img id="auth_img" src="" alt="验证码" title="点击刷新验证码" /></li>			<input id="regAuthKey" type="hidden" name="auth_key" />			<li><label><input type="checkbox" checked="true" name="isReadAgreement" /><span>我已阅<a class="keyLink2" href="/agreement.html" target="_blank">相关服务条款读并同意</a></label></span></li>		</ul>		<a href="javascript:void(0);" class="loginBtns btnRegister" data-type="register"></a>	</div><div class="regist_line"></div>	<div class="right">		<span>已有账号<a class="keyLink" href="javascript:void(0);" data-type="login"></a></span>	<p>使用合作账号登录</p>	<a href=javascript:Ttxy.user.redirectToLogin("qq"); class="loginBtns qqLogin" data-type="qq"></a> 	</div>',
	this.errorTip = '<span class="errorTip"><%=data.text%></span>',
	this.emailAsso = '		<% for (var i = 0; i < data.suffixAry.length; i++) { %>			<li class="text-overflow"><%=data.currText%>@<%=data.suffixAry[i]%>.com</li>		<% } %>    ',
	this.loginTipBar = '	<div id="loginTipBar">		<div>			<div class="gold">首次登录后即可领取新人大礼哦~</div>			<div class="loginBtns">				<p class="text">无需注册，用以下账号直接登录微播微播</p>				<p class="btns">					<a class="qqLogin" href=javascript:Ttxy.user.redirectToLogin("qq");></a>					<a class="sinaLogin" href=javascript:Ttxy.user.redirectToLogin("sina");></a>					<a class="moreLogin" href=javascript:Ttxy.user.popupLogin();></a>				</p>			</div>			<div class="slogan"></div>		</div>	</div>',
	this.followArea = '	<div class="followLayer wrapItem">		<div class="wrapIcon">            <span class="text record" data-type="record"><strong>最近看过的</strong></span>            <span class="line"></span>			<span class="text follow active" data-type="all"><strong>关注的(0/0)</strong></span>			<span class="point" title="关闭">×</span>			<span class="new"></span>		</div>		<div class="followList">			<ul class="list fix all">			</ul>            <ul class="list fix record"></ul>		</div>	</div>',
	this.followAreaList = '	<% var users = data.users || [], rooms = data.rooms || []; for (var i = 0; i < rooms.length; i++) { var room = rooms[i]; %>		<% if ((type == "online" && room.live) || type != "online") { %>			<% var user = null; for (var j = 0; j < users.length; j++) {if(users[j]._id == room.xy_star_id){user=users[j];break;}}; %>			<li>			 <a class="btn" href="<%=Ttxy.common.createRoom(room._id)%>" target="_blank">             <img src="<%=user.pic%>" alt="<%=user.nick_name%>" title="<%=user.nick_name%>"><% var starIconData = Ttxy.common.getAnchorIcon(user.finance ? user.finance.bean_count_total : 0); %>						<span class="starLV <%=starIconData.icon%>" title="<%=starIconData.title%>"></span>				<span class="name text-overflow" title="<%=user.nick_name%>"><%=user.nick_name%></span><%if(room.live){%>    <span class="play icon-index"></span><%}%></a>            </li>        <% } %>    <% } %>',
	this.viewRecordList = '	<% for (var i = 0; i < data.length; i++) { var item = data[i]; %>			<li>				<a href="<%=Ttxy.common.createRoom(item.room_id)%>" target="_blank"><img src="<%=item.user_pic%>" alt="<%=item.nick_name%>" title="<%=item.nick_name%>"><% var starIconData = Ttxy.common.getAnchorIcon(item.bean_count_total); %>						<span class="starLV <%=starIconData.icon%>" title="<%=starIconData.title%>"></span>					<span class="name text-overflow" title="<%=item.nick_name%>"><%=item.nick_name%></span></a>            </li>    <% } %>',
	this.missionTask = '			<h2 class="commonTitle">				<span>新手任务</span>				<span class="close"></span>			</h2>			<ul class="show">			</ul>',
	this.missionList = '	<% var complete = data.complete_mission, all = data.all_mission; %>	<% for (var i = 0,missionCount=0,length=all.length; i < length; i++ ) { var mission = all[i]; if(mission._id=="sign_daily"){missionCount++;}else{%>		<li>			<span class="missionText"><%=mission.title%></span>			<span class="missionCoin"><%=mission.coin_count%></span>			<span class="status" data-id="<%=mission._id%>">				<% if (complete && typeof complete[mission._id] === "number") { %>					<% if (complete[mission._id] == 1) { missionCount++;%>						已完成					<% } else { %>						<a class="get" href="javascript:void(0);" data-id="<%=mission._id%>">立即领取</a>					<% } %>				<% } else { %>						<a class="undo" href="javascript:void(0);" data-id="<%=mission._id%>">立即完成</a>				<% } %>			</span>		</li><%}%>	<% if(i+1==length){    Ttxy.mission.setFinished(missionCount==length);}} %>',
	this.missionPanel = '	<div class="missionPanel wrapItem">		<div class="commonTitle title">			<span class="text">提示</span>			<span class="close"></span>		</div>		<div class="content fix"></div>		<div class="footer fix">			<a class="confirm" href="javascript:void(0);">确定</a>		</div>	</div>',
	this.editNickMission = '	<% var userInfo = Ttxy.user.getUserInfo(); %>	<% if (userInfo.user_name) { %>		<p>			<span class="tip">登录账号：</span>			<span><%=userInfo.user_name%></span>		</p>	<% } %>	<p>		<span>修改昵称：</span>		<input type="text" placeholder="昵称"></input>	</p>	<p class="errorTip"></p>',
	this.followList = '	<ul>		<% for (var i = 0, l = data.length; i < l; i++ ) { var tempData = data[i]; %>			<li>				<img src="<%=tempData.pic_url%>" alt="<%=tempData.nick_name%>" title="<%=tempData.nick_name%>">				<label>					<input type="checkbox" checked="true" name="anchor_id" value="<%=tempData._id%>">					<%=tempData.nick_name%>				</label>			</li><li>				<img src="<%=tempData.pic_url%>" alt="<%=tempData.nick_name%>" title="<%=tempData.nick_name%>">				<label>					<input type="checkbox" checked="true" name="anchor_id" value="<%=tempData._id%>">					<%=tempData.nick_name%>				</label>			</li><li>				<img src="<%=tempData.pic_url%>" alt="<%=tempData.nick_name%>" title="<%=tempData.nick_name%>">				<label>					<input type="checkbox" checked="true" name="anchor_id" value="<%=tempData._id%>">					<%=tempData.nick_name%>				</label>			</li>		<% } %>	</ul>',
	this.getAward = '	<p class="awardTip">领取<%=data.title%>奖励：<%=data.coin_count%>金币</p>	<p><input type="text" placeholder="验证码"><img src="<%=Ttxy.common.createAuthCode()%>" alt="验证码" title="点击刷新验证码" /></p>	<p><a class="btn btn-primary" href="javascript:void(0);">领 取</a><span class="errorTip"></span></p>',
	// 发送邮箱
	// this.verifyTip = ' <div class="verifyTip"> <h2>请先确认邮箱账号后免费领取金币大礼</h2>
	// <p>系统已发送一封确认邮件到您的邮箱</p> <p class="bdr-b">请访问您的邮箱：<a
	// href="http://mail.<%=email.substr(email.indexOf("@")+1)%>"
	// target="_blank"><%=email%></a>，点击邮件中的链接便可确认您的账号</p> <p>若没有收到确认邮件：</p>
	// <p>也许邮件被您的邮箱误认为是垃圾邮件而放到垃圾箱中，请检查一下</p> </div>',
	this.commonPopup = '	<div class="popupMenu <%=footer ? "hasFooter" : ""%>" id="<%=id%>">		<div class="commonTitle title fix">			<div><%=title%></div>			<span class="close"></span>		</div>		<div class="content fix"><%=content%></div>		<% if (footer) { %>			<div class="popup-footer fix"><%=footer%></div>		<% } %>	</div>',
	this.signInfo = '                <h2 class="commonTitle">                    <span>签到领金币</span>	                    <span class="close"></span>                </h2>                <div class="signContent">                <div id="signInfo">每天签到可免费领取4星币<br/>当月已签到<%=data.data.length%>天，总共签到<%=data.sign_daily_total||0%>天</div>                        <%if(!data.isReceivedToday){%>                            <div id="calendarYear">                        <a class="icon-index" href="javascript:;"  title="点击签到"></a>                            <%}else{%><div id="calendarYear" class="received">                        <a class="icon-index" href="javascript:;" title="已签到"></a>    <%}%>                        <span><%=data.yearMonth%></span>                    </div>                <div id="signInCalendar" class="calendar">                    <table>                     <thead>                     <tr>                     <td>日</td>                     <td>一</td>                     <td>二</td>                     <td>三</td>                     <td>四</td>                     <td>五</td>                     <td>六</td>                     </tr>                    </thead>                     <tbody id="calendarDate"><%=data.dateHtml%></tbody>                     </table>            </div>                <div class="getCoin">                    <p>本月内累积签到天数还能获得额外奖励：</p>                    <ul>                            <li><span class="day">3天</span><span class="coinPic icon-index"></span><span class="coin">8星币</span><a href="javascript:;" data-coin="8" data-type="1" class="<%=!Ttxy.signIn.isReceivedOther(1,data.award)&&data.data.length>=3?"get icon-index":"icon-index"%>"><%=Ttxy.signIn.isReceivedOther(1,data.award)?"已领取":"领取"%></a></li>                        <li><span class="day">7天</span><span class="coinPic icon-index"></span><span class="coin">20星币</span><a href="javascript:;" data-coin="20" data-type="2" class="<%=!Ttxy.signIn.isReceivedOther(2,data.award)&&data.data.length>=7?"get icon-index":"icon-index"%>"><%=Ttxy.signIn.isReceivedOther(2,data.award)?"已领取":"领取"%></a></li>                        <li><span class="day">15天</span><span class="coinPic icon-index"></span><span class="coin">50星币</span><a href="javascript:;" data-coin="50" data-type="3" class="<%=!Ttxy.signIn.isReceivedOther(3,data.award)&&data.data.length>=15?"get icon-index":"icon-index"%>"><%=Ttxy.signIn.isReceivedOther(3,data.award)?"已领取":"领取"%></a></li>                        <li><span class="day">28天</span><span class="coinPic icon-index"></span><span class="coin">100星币</span><a href="javascript:;" data-coin="100"  data-type="4" class="<%=!Ttxy.signIn.isReceivedOther(4,data.award)&&data.data.length>=28?"get icon-index":"icon-index"%>"><%=Ttxy.signIn.isReceivedOther(4,data.award)?"已领取":"领取"%></a></li>                    </ul>                </div>                    </div>',
	//this.fixedBar = '<div id="fixedBar"><div id="fixedBtn"> <div id="fixedWrap"><div class="wrapItem taskList"></div><div class="wrapItem signinWrap"></div><div class="wrapItem activeWrap"></div><div class="wrapItem weixinWrap"><i class="icon-base icon-weixin"></i></div><div class="wrapItem"></div></div><ul class="fixwrap-bottom"><li><a class="fixbtn fixbtn-broadcast fixbtn-hover broadcast" data-type="fixbtn-broadcast" href="javascript:;" title="发布广播"></a></li></ul></div></div>',
	//this.fixedBar = '<div id="fixedBar"><ul class="fix fixwrap-top"><li style="display:none;"><a class="icon-fix fixbtn fixbtn-top" href="javascript:;" title="返回头部"></a></li><li><a class="icon-fix fixbtn fixbtn-home" href="/" target="_blank" title="返回首页"></a></li></ul> <div id="fixedBtn"><div id="fixedWrap"><div class="wrapItem taskList"></div><div class="wrapItem signinWrap"></div><div class="wrapItem activeWrap"></div><div class="wrapItem weixinWrap"><i class="icon-base icon-weixin"></i></div><div class="wrapItem"></div></div>	<ul class="fixwrap-bottom">	<li><a class="icon-fix fixbtn fixbtn-follow" data-type="fixbtn-follow" href="javascript:;" title="我的主播"></a></li><li><a class="icon-fix fixbtn fixbtn-broadcast fixbtn-hover" data-type="fixbtn-broadcast" href="javascript:;" title="发布广播"></a></li></ul></div></div>',
	this.fixedBar_old = '<div id="fixedBar">                <div id="fixedWrap">                    <div class="wrapItem taskList"></div>                    <div class="wrapItem signinWrap"></div>                    <div class="wrapItem activeWrap"></div>                    <div class="wrapItem"></div>                </div>                <div id="fixedBtn">                    <ul class="fix">                        <li><a class="top" href="javascript:;" title="返回头部"></a></li>                        <li><a class="active" href="javascript:;" title="房间活跃"><span>0</span></a></li>                        <li><a class="signin" href="javascript:;" title="每日签到"></a></li>                        <li><a class="task" href="javascript:;" title="免费领星币"></a></li>                        <li><a class="follow" href="javascript:;" title="我的主播"></a></li>                        <li><a class="broadcast" href="javascript:;" title="发布广播"></a></li>                    </ul>                </div>            </div>',
	this.feedback = '<table class="feedback-grid" id="j-lotteryForm">		<tr>		<th width="60px">内容：</th>		<td><textarea id="j-feedback-content" style="width:250px;height:100px;" class="textbox" placeholder="填写详细内容，10-400字符之间"></textarea></td>		</tr>		<tr>		<th>联系方式：</th>		<td><input type="text" id="j-feedback-contact" style="width:250px;" class="textbox"  placeholder="如：电话/邮箱/QQ等"/></td>		</tr>		<tr>		<th></th>	<td>		<a id="j-feedback-btn" href="javascript:;" class="btn btn-primary">确定</a> <a href="javascript:;" class="btn btn-default">取消</a>  <span id="j-feedback-tip" class="text-danger"></span>	</td>	</tr>	</table>'
});;

$.module("Ttxy.user.extraController",
 function() {
	function t() {
		x = Ttxy.user.unionController,
		k = Ttxy.user.mainController,
		T = k.getActions()
	}
	function o() {
		return w ? w : (w = $.query.get("from"), void 0 === w && (w = $.cookie("from")), (void 0 === w || null === w) && (w = "1000001"), $.cookie("from", w), w)
	}
	function e() {
		return _ ? _ : (_ = $.query.get("sid"), void 0 === _ && (_ = $.cookie("subfrom")), (void 0 === _ || null === _) && (_ = ""), $.cookie("subfrom", _), _)
	}
	
	
	function n(t) {
		if (x.isUnion()) return void x.login();
	/*	if (v && $.browser.msie) {
			var e = T[t + "Root"] + "&redirect_uri=" + encodeURIComponent(Ttxy.config.userRoot+"thirdlogin/" + t + "?url=" + location.href);
			location.href = e
		} else {*/
			var o = "http://" + location.host + "/result.html";
			e = T[t + "Root"] + "&redirect_uri=" + encodeURIComponent(Ttxy.config.userRoot + "thirdlogin/" + t + "?url=" + (o.indexOf("http") > -1 ? o : "http://" + location.host + o))
			"qq" == t && Ttxy.ui.openWindow(e, 472, 465);
			"sina" == t && Ttxy.ui.openWindow(e, 760, 572);
		//}
	}
	function r() {
		if (k.isLogin()) {
			var t = window.open("apply.html", "_blank");
			t.focus()
		} else Ttxy.user.popupController.popupLogin()
	}
	
	function i() {
		 k.isLogin()?c(arguments):Ttxy.user.popupController.popupLogin()
	}
	function c() {
		var t = (typeof arguments[0][0] == 'string')?("/pay.xhtml?"+ arguments[0][0]):("/pay.html"),
			o = window.open(t, x.isUnion() ? "_self" : "_blank");
		o.focus();
	}
	
	function u() {
		title = document.title, url = document.location;
		try {
			window.external.AddFavorite(url, title)
		} catch (t) {
			try {
				window.sidebar.addPanel(title, url, "")
			} catch (t) {
				if ("object" == typeof opera) return a.rel = "sidebar", a.title = title, a.url = url, !0;
				Ttxy.messager.warn("请按Ctrl+D 添加标签")
			}
		}
		return !1
	}
	function l(t) {
		var o = "";
		 return L.test(t) ? o = "用户名不能为中文" : 0 === t.length ? o = "请填写用户名" : t.length < 6 ? o = "用户名太短" : t.length > 19 ? o = "用户名太长" : y.test(t) ? C.test(t) || (o = "用户名不能有特殊字符") : o = "请以字母开头 ",  
		 o
	}
	function s(t) {
		var o = "";
		 return L.test(t) ? o = "用户名不能为中文" : 0 === t.length ? o = "请填写用户名" : t.length < 6 ? o = "用户名太短" : t.length > 19 ? o = "用户名太长" : y.test(t) ? C.test(t) || (o = "用户名不能有特殊字符") : o = "请以字母开头",
				 o
	}
	function f(t, o, e) {
		Ttxy.core.getResult({
			url: T.checkNick,
			data: {
				nick_name: t
			},
			success: function(t) {
				"function" == typeof o && o(t)
			},
			resolveError: function(t) {
				"function" == typeof e && e(t)
			}
		})
	}
	function d(t, o, e) {
		Ttxy.core.getResult({
			url: T.checkEmail,
			data: {
				user_name: t
			},
			success: function(t) {
				"function" == typeof o && o(t)
			},
			resolveError: function(t) {
				"function" == typeof e && e(t)
			}
		})
	}
	function g(t) {
		var o = "";
		return "string" == typeof t && (t.length < 6 || t.length > 20 ? o = "密码长度必须大于6小于20" : t.indexOf(" ") >= 0 && (o = "密码中不能包含有空格")), o
	}
	function m(t, o) {
		var e = "";
		return 0 === t.length ? e = "请输入确认密码" : t !== o && (e = "确认密码和密码不一致"), e
	}
	function p() {
		var t = Ttxy.common.getTime().date,
			o = $.store.get(h) || {},
			e = k.getUserInfo();
		o && t == o[e._id] || (o[e._id] = t, 
		Ttxy.core.getResult({
			url: T.loginLog,
			requireToken: !0,
			success: function() {
				$.store.set(h, o)
			}
		}))
	}
	// var y =
	// /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
	var  C = /^\w+$/, 
	 //y = /[a-zA-Z_]+/, 
	L = /[\u4E00-\u9FA5]+/,
	//y = /^[a-zA-Z]+[a-zA-Z][0-9a-zA-Z_]*$/,
	y = /^[a-zA-Z][a-zA-Z0-9_]{5,17}/,
	h = "LOGIN_DATE",
	k = null,
	x = null,
	T = {},
	v = !0,
	w = "",
	_ = "";
	return {
		init: t,
		getFrom: o,
		getSubFrom: e,
		redirectToLogin: n,
		redirectToApply: r,
		redirectToCharge: i,
		gotoPay: c,
		addBookMark: u,
		checkEmail: l,
		checkNick: s,
		checkNickRepeat: f,
		checkEmailRepeat: d,
		checkPwd: g,
		checkConfirmPwd: m,
		sendLoginLog: p
	}
});;
$.module("Ttxy.user.popupController", 
function() {
	function e() {
		g = Ttxy.user.mainController,
		p = Ttxy.user.extraController,
		m = Ttxy.user.unionController,
		v = g.getActions()
	}
	function i(e) {
		var i = (new Date).getTime(),
			n = $.store.get(e);
		return !n || i - n > 36e5 ? !1 : !0
	}
	function n(e) {
		$.store.set(e, (new Date).getTime())
	}
	function t(e, i) {
		o(e), Ttxy.common.manuRenderCommon(e, Tmpl.overAll.errorTip, {
			text: i
		}, "append")
	}
	function r(e) {
		o(e), e.append('<span class="loginBtns correctTip"></span>')
	}
	function o(e, i) {
		i = "boolean" == typeof i ? i : !1, e.find(".errorTip").remove(), i || e.find(".correctTip").remove()
	}
	function u(e) {
		m.isUnion() && m.login ? m.login() : C.show(e), y = !0
	}
	function s(e) {
		m.isUnion() && m.register ? m.register() : b.show(e), y = !0
	}
	function l() {
		return y
	}
	function a() {
		q !== !0 && (R = setTimeout(Ttxy.user.popupRegister, 2e4))
	}
	function c() {
		q = !0, null !== R && clearTimeout(R)
	}
	function d() {
		q = !1, a()
	}
	function f(e, i, n) {
		var t = e.parent();
		t.append('<ul class="assoArea"></ul>'), $.isFunction(n) && n(), e.bind("keyup", function(e) {
			var t = $(this),
				r = t.siblings("ul"),
				o = e.keyCode,
				u = t.val();
			if (r.find("li").length > 0) {
				if (38 === o || 40 === o) return void h(r, o);
				if (13 === o) return t.val(r.find(".active").text()).focus(), void r.html("").hide()
			}
			0 === u.length || u.indexOf("@") > -1 ? ($.isFunction(n) && r.is(":visible") && n(), r.html("").hide()) : (Ttxy.common.manuRenderCommon(r, Tmpl.overAll.emailAsso, {
				currText: u,
				suffixAry: P
			}), r.show(), $.isFunction(i) && i())
		}), e.bind("blur", function() {
			Ttxy.core.debug("blur"), $(this).siblings("ul").html("").hide()
		}), t.find("ul").delegate("li", "mousedown", function() {
			var e = $(this),
				i = e.parent(),
				n = i.siblings("input"),
				t = e.text();
			n.val(t).blur(), i.html("").hide()
		})
	}
	function h(e, i) {
		var n = e.find("li"),
			t = e.find(".active"),
			r = n.length,
			o = t.length > 0 ? n.index(t) : 0,
			u = (o + (38 === i ? -1 : 1) + r) % r;
		0 === t.length && 40 === i && (u = 0), $(n[u]).addClass("active").siblings().removeClass("active")
	}
	var g = null,
	p = null,
	m = null,
	v = {},
	y = !1,
	k = function() {
		location.href = $.query.set("registered", !0)
	},
	E = !1,
	T = "LAST_REG",
	_ = null,
	b = {
		show: function() {
			C.hide(),
			c(),
			_ = Ttxy.ui.createPopupMenu({
				id: "userRegMenu",
				width: 548,
				height: 418,
				center: !0,
				title: "",
				content: Tmpl.overAll.userRegister
			}),
			_.find(".email").focus(),
			f(_.find(".email"), this.removeEnterEvents, this.registerEnterEvents),
			this.initAuthCode(),
			this.registerEvents()
		},
		hide: function() {
			y = !1,
			Ttxy.ui.hideMenu()
		},
		isShowing: function() {
			return _ ? _.is(":visible") : !1
		},
		registerEvents: function() {
			var e = this;
			_.delegate(".content a", "click",
			function() {
				var i = $(this),
				n = i.attr("data-type");
				n && ("register" == n &&e.handleRegister(), "login" == n && C.show())
			}),
			_.delegate("input", "blur",
			function() {
				var e = $(this),
				i = e.attr("name"),
				n = $.serializeForm(_),
				o = "",
				u = 0;
				if ("auth_key" !== i) {
					switch (i) {
					/*
					 * case "user_name": o = p.checkEmail(n.user_name), o ||
					 * p.checkEmailRepeat(n.user_name, null, function() {
					 * t(_.find(".left li:eq(0)"), "用户名已被注册") }); break;
					 */
					case "nick_name":
						$("#text_id").attr("value",n.nick_name);// 填充内容
						o = p.checkNick(n.nick_name),
						u = 1,
						o || p.checkNickRepeat(n.nick_name, null,
						function() {
							// t(_.find(".left li:eq(1)"), "昵称已存在")
							t(_.find(".left li:eq(1)"), "用户名已存在")
						});
						break;
					case "password":
						o = p.checkPwd(n.password),
						u = 2;
						break;
					case "confirmPassword":
						o = p.checkConfirmPwd(n.confirmPassword, n.password),
						u = 3;
						break;
					case "auth_code":
						o = n.auth_code ? "": "请填写验证码",
						u = 4;
						break;
					case "isReadAgreement":
						o = "on" !== n.isReadAgreement ? "您没有同意相关条款": "",
						u = 5
					}
					if(u != 0){
					var s = _.find(".left li:eq(" + u + ")");
					if (o) E = !1,
					t(s, o);
					else {
						if ("isReadAgreement" === i) return;
						r(s)
					}
					}
				}
			}),
			_.find("#auth_img").click(this.initAuthCode)
		},
		handleRegister: function() {
			if (E = !0, _.find("input").trigger("blur"), E) {
				_.find('.btnRegister').remove()//removeClass("btnRegister").addClass('Registerwait');
				var e = $.serializeForm(_),
				strBtn='<a href="javascript:void(0);" class="loginBtns btnRegister" data-type="register"></a>',
				strspan='<span class="loginBtns Registerwait" data-type="register"></span>';
				_.find('.left').append(strspan);
				Ttxy.core.debug("data: ", e),				
				g.register(e, k,
				function(e) {
					_.find('.Registerwait').remove()
					_.find('.left').append(strBtn);
					Ttxy.core.debug("errorTip: ", e);
					var i = 1;
					switch (e.code) {
					case 30419:
						i = 4,
						_.find("#auth_img").trigger("click");
						break;
					case 30308:
						i = 0,
						e.msg = "用户名已被注册"
					}
					t(_.find(".left li:eq(" + i + ")"), e.msg)
				}),
				n(T)
			}
		},
		initAuthCode: function() {
			Ttxy.core.getResult({
				url: i(T) ? v.authcode2: v.authcode,
				success: function(e) {
					_.find("#auth_img").attr("src", e.data.auth_url),
					_.find("#regAuthKey").val(e.data.auth_key)
				}
			})
		},
		handleEnterEvents: function(e) {
			13 == e.keyCode && b.handleRegister()
		},
		registerEnterEvents: function() {
			_.delegate("input", "keyup", b.handleEnterEvents)
		},
		removeEnterEvents: function() {
			_.undelegate("input", "keyup", b.handleEnterEvents)
		}
	},
	w = null,
	x = "LAST_LOGIN",
	A = null,
	C = {
		show: function(e) {
			A = "function" == typeof e ? e: function() {
				location.reload()
			},
			c(),
			b.hide();
			var n = i(x);
			w = Ttxy.ui.createPopupMenu({
				id: "userLoginMenu",
				height: "372",
				center: !0,
				title: "",
				content: $.template(Tmpl.overAll.userLogin, {
					isSecondLogin: n
				})
			}),
			n && (w.addClass("secondLogin"), this.initAuthCode()),
			w.find(".email").focus(),
			f(w.find(".email"), this.removeEnterEvents, this.registerEnterEvents),
			this.registerEvents()
		},
		hide: function() {
			y = !1,
			Ttxy.ui.hideMenu()
		},
		isShowing: function() {
			return w ? w.is(":visible") : !1
		},
		registerEvents: function() {
			w.delegate("a", "click",
			function() {
				var e = $(this),
				i = e.attr("data-type"),
				r = $.serializeForm(w);
				if (i) switch (_isAutoLogin = "on" === r.isAutoLogin, i) {
				case "login":
					if (!r.user_name) return void t(w.find(".left > ul li:eq(0)"), "请填写用户名");
					if (!r.password) return void t(w.find(".left > ul li:eq(1)"), "请填写密码");
					if ("auth_code" in r && !r.auth_code) return void t(w.find(".left > ul li:eq(2)"), "请填写验证码");
					g.login(r, A,
					function(e) {
						Ttxy.core.debug("res: ", e),
						30419 === e.code ? (t(w.find(".left > ul li:eq(2)"), "验证码错误"), w.find("#login_auth_img").trigger("click")) : (t(w.find(".left > ul li:eq(0)"), "密码或用户名有误"), t(w.find(".left > ul li:eq(1)"), "密码或用户名有误"))
					}),
					n(x);
					break;
				case "register":
					b.show()
				}
			}),
			w.delegate("input", "click",
			function() {
				o(w)
			}),
			i(x) && w.find("#login_auth_img").click(this.initAuthCode)
		},
		initAuthCode: function() {
			Ttxy.core.getResult({
				url: v.authcode2,
				success: function(e) {
					w.find("#login_auth_img").attr("src", e.data.auth_url),
					w.find("#loginAuthKey").val(e.data.auth_key)
				}
			})
		},
		handleEnterEvents: function(e) {
			13 == e.keyCode && w.find(".dl").trigger("click")
		},
		registerEnterEvents: function() {
			w.delegate("input", "keyup", C.handleEnterEvents)
		},
		removeEnterEvents: function() {
			w.undelegate("input", "keyup", C.handleEnterEvents)
		}
	},
	R = null,
	q = !1,
	// P = ["qq", "163", "sohu", "sina", "gmail", "hotmail"];
	P = [];
	return {
		init: e,
		popupLogin: u,
		hidePopupLogin: C.hide,
		popupRegister: s,
		hidePopupRegister: b.hide,
		showErrorTip: t,
		clearErrorTip: o,
		delayPopupRegister: a,
		cancelDelayPopup: c,
		enableDelayPopup: d,
		isAnyPopup: l
	}
});;
$.module("Ttxy.user.topController", function() {
	function e() {
		$("#header").delegate(".menu-item", {
			mouseover: function() {
				$(this).addClass("menu-hover")
			},
			mouseout: function() {
				$(this).removeClass("menu-hover")
			}
		}), a = Ttxy.user.mainController, l = a.getActions()
	}
	function t(e) {
		var roomId = parseInt(location.pathname.substr(1), 10);
		var indexLogin = location.pathname;
		
		a.isLogin() && 
		(
			e = e || a.getUserInfo(),
		  $("#j-loginNav").hide(),
		  isNaN(roomId)?indexLogin==="/index.xhtml"||indexLogin==="/"?$("#j-loginInfo").html($.template(Tmpl.overAll.userInfo3, {
				data: e
			})).show():$("#j-loginInfo").html($.template(Tmpl.overAll.userInfo, {
			data: e
		})).show():$("#j-loginInfo").html($.template(Tmpl.overAll.userInfo2, {
				data: e
			})).show(),
		s = $("#changeName"), 
		u = $("#j-nickname"), 
		d = $("#j-userNickname"),
		ni=$(".person_name"),
		f = $("#financeDataWrap"), 
		m = $(".nicknameBox"), 
		x = $("#j-currentNickname"),
		g = $("#j-nicknameFormat"), 
		v = $("#j-nicknameTip"),
		o(),
		h || (n(), i(), h = !0));
		nihs();
	}
	function nihs(){	
		var l=$('#photo2'),
		nbox=l.find('.nicknameBox'),
		time=null;
		$('#photo2').hover(function(){
			clearTimeout(time);
			nbox.show();
		},function(){
			time=setTimeout(function(){
				nbox.hide();
			},200);
		});
		nbox.hover(function(){
			clearTimeout(time);
			nbox.show();
		},function(){
			time=setTimeout(function(){
				nbox.hide();
			},200);
		});
	}
	function n() {
		Ttxy.core.getResult({
			url: l.msgUnreadCount,
			requireToken: !0,
			success: function(e) {
				e.data > 0 && ($("#j-mailbox-msg span").text(e.data), $(".icon-letter").addClass("on"))
			}
		})
	}
	function i() {
		Ttxy.core.getResult({
			url: l.remindUnread,
			requireToken: !0,
			success: function(e) {
				e.data > 0 && ($("#j-mailbox-remind span").text(e.data), $(".icon-letter").addClass("on"))
			}
		})
	}
	function o() {
		try {
			var e = Ttxy.live.anchorController.getAnchorInfo().room.nick_format || "";
			e && g.show().find(".nicknameFormat").html(e)
		} catch (t) {}
		$("#j-btnUseFormat", m).click(function() {
			u.val(g.find(".nicknameFormat").text() + x.text())
		}), m.find("input").keypress(function(e) {
			13 === e.keyCode && m.find(".btnSubmit").trigger("click")
		}), $("#j-updateNickname").click(function() {
			v.text("");
			var e = $.trim(u.val());
			return !e.length || e.length > 18 ? (v.text("昵称错误"), void u.focus()) : Ttxy.common.isSensitive(e, "all") || !Ttxy.common.isLegal(e) ? (v.text("含特殊字符"), void u.focus()) : x.text() == e ? void c() : (Ttxy.core.getResult({
				url: l.editUser,
				data: {
					nick_name: e
				},
				type: "POST",
				requireToken: !0,
				crossDomain: !0,
				success: function() {}
			}), a.setUserInfo({
				nick_name: e
			}), d.text(e),ni.text(e), x.text(e), v.text(""), void c())
		}), $(".btnCancel", m).click(function() {
			c()
		});
		var n = $(".userbox-switch-btn span");
		n.click(function() {
			if (a.isSVip()) {
				var e = $(this),
					t = 1 == a.getUserInfo().vip_hiding ? 0 : 1;
				e.removeClass("on").siblings().addClass("on"), Ttxy.core.getResult({
					url: l.hide,
					requireToken: !0,
					data: {
						type: t
					},
					success: function() {
						a.setUserInfo({
							vip_hiding: t
						})
					}
				})
			} else Ttxy.messager.warn('操作失败，必须是至尊VIP才能使用隐身功能，<a href="/shop.html" target="_blank">立即开通</a>')
		})
	}
	function c() {}
	function r() {
		Ttxy.ui.createPopupMenu({
			id: "feedback",
			width: 400,
			height: 255,
			center: !0,
			force: !0,
			title: "意见建议",
			content: Tmpl.overAll.feedback
		}, function(e) {
			var t = $("#j-feedback-tip"),
				n = $("#j-feedback-content");
			$("#j-feedback-btn").click(function() {
				var e = $.trim(n.val()),
					i = $("#j-feedback-contact").val();
				return e ? e.length > 400 || e.length < 10 ? void t.text("内容字符数应该在10-400之间") : i.length < 6 ? void t.text("联系方式过短") : i.length > 40 ? void t.text("联系方式过长") : void Ttxy.core.getResult({
					url: l.feedback,
					data: {
						content: e,
						from: Ttxy.user.getFrom(),
						tid: a.getUserInfo()._id,
						contact: i
					},
					success: function() {
						Ttxy.messager.success("感谢您提出宝贵的意见/建议。"), Ttxy.ui.hideMenu()
					},
					resolveError: function() {
						t.text("提交失败，请重试")
					}
				}) : void t.text("内容不能为空")
			}), $(".btn-default", e).click(function() {
				Ttxy.ui.hideMenu()
			})
		})
	}
	var a = null,
		l = {},
		s = null,
		u = null,
		d = null,
		f = null,
		m = null,
		x = null,
		g = null,
		v = null,
		h = !1;
	return {
		init: e,
		renderTopUserArea: t,
		popupAdvice: r
	}
});;
$.module("Ttxy.user.unionController", function() {
	function t() {
		$("a").live("click", function() {
			if (Ttxy.core.debug("this: ", this), !$(this).data("defaultclick") && this.href && this.href.indexOf("javascript") < 0) {
				var t = this.href + (this.href.indexOf("?") >= 0 ? "&" + location.search.substr(1) : location.search);
				return e("yuanlai") && (t = t.replace(/show.dongting.com|www.51weibo.com/, a)), window.open(t, "_self"), !1
			}
		})
	}
	function i() {
		if (h = Ttxy.user.mainController, c = Ttxy.user.extraController, s = Ttxy.user.popupController, u = h.getActions(), l = c.getFrom(), e(l)) switch (l) {
		case "tuli":
			d.init(), $.extend(Ttxy.user.unionController, d);
			break;
		case "yuanlai":
			w.init(), $.extend(Ttxy.user.unionController, w)
		}
	}
	function e(t) {
		if (t = t || l, t !== l) return !1;
		if ($.inArray(t, n) < 0) return !1;
		var i = !0;
		switch (t) {
		case "tuli":
			i = self != top
		}
		return i
	}
	function o() {
		$("a").live("click", function() {
			return this.href.indexOf("javascript") < 0 ? (window.open(this.href, "_self"), !1) : void 0
		}), $("#nav .logo, #header .logo, #liveNav .backBtn").attr("href", "/qq/index.xhtml")
	}
	var n = ["tuli", "yuanlai"],
		r = "http://app.huaseji.com/js/proxy.js",
		a = "t1.show.yuanlai.com",
		l = "",
		u = {},
		c = null,
		s = null,
		h = null,
		f = !1,
		d = {
			init: function() {
				var i = this;
				$.getScript(r), setTimeout(i.setFrameHeight, 500), setTimeout(i.setFrameHeight, 4e3), t()
			},
			setFrameHeight: function() {
				try {
					var t = $("body").innerHeight() + 100;
					window.Tuli.send("setifm", {
						height: t + "px"
					})
				} catch (i) {}
			},
			initUserType: function() {
				if (h.isLogin()) {
					Ttxy.core.getResult({
						url: u.tuliUserType,
						data: {
							id: h.getUserInfo()._id
						},
						success: function(t) {
							1 != t.data && (f = !0)
						}
					})
				}
			},
			register: function() {
				window.Tuli.register()
			},
			login: function() {
				window.Tuli.login({
					url: "http://" + location.host + location.pathname
				})
			},
			logout: function() {
				window.Tuli.logout()
			},
			follow: function(t) {
				window.Tuli.follow({
					follow_id: t.follow_id,
					follow_room: t.follow_room,
					follow_nickname: t.follow_nickname,
					follow_avatar: t.follow_avatar
				})
			},
			charge: function() {
				c.gotoPay()
			}
		},
		w = function() {
			function i() {
				$("#page").addClass("yuanlai-wrap"), location.host === a && (document.domain = "show.yuanlai.com"), t(), setTimeout(n, 3e3)
			}
			function e() {
				var t = document.createElement("a");
				return t.click ? (t.setAttribute("href", r), t.setAttribute("data-defaultclick", !0), t.setAttribute("target", "_blank"), t.style.display = "none", document.body.appendChild(t), void t.click()) : void(window.location = r)
			}
			function o() {
				//window.top.location.href = "http://www.yuanlai.com/login/user-login.do?forward=http://show.yuanlai.com"
			}
			function n() {
				try {
					var t = top.document.getElementById("ttshow");
					t.height = $("body").height() + 10
				} catch (i) {
					Ttxy.core.debug("set iframe height error")
				}
			}
			var r = "http://game.yuanlai.com/vpay/show/index.html?gameServerId=100331";
			return {
				init: i,
				charge: e,
				login: o,
				register: o,
				setFrameHeight: n
			}
		}();
	return {
		init: i,
		isUnion: e,
		initQQOpenEvents: o
	}
});;
$.module("Ttxy.user.mainController", function() {
	function e() {
		if (
				G = Ttxy.user.extraController,
				X = Ttxy.user.popupController, 
				Z = Ttxy.user.topController,
				en = Ttxy.user.unionController,
				$.extend(Ttxy.user, G), 
				$.extend(Ttxy.user, X), 
				$.extend(Ttxy.user, Z), 
				$.extend(Ttxy.user, Ttxy.user.mainController), 
				G.init(),
				X.init(), 
				Z.init(),
				en.init(),
				l())
		{
			i();
			var e = null;
			en.isUnion("tuli") && (e = en.initUserType), r().indexOf("qq") > -1 && (e = en.initQQOpenEvents), o(e)
		} else f() ? a() : ($.query.get("register") === !0 && X.popupRegisterControl.show(), $("#nav .action").attr("href", "javascript:Ttxy.user.redirectToLogin('qq')").text("").addClass("qqLogin").show())
	}
	//注册必经之路
	function n(e, n, o, r) {
		var i = function() {
				Ttxy.core.getResult({
					url: P.register,
					data: e,
					success: function() {
						t(e, n, r)
					},
					error: function() {
						"function" == typeof r && r()
					},
					resolveError: function(e) {
						"function" == typeof o && o(e)
					}
				})
			},
			a = function() {
				"function" == typeof o && o({
					msg: "昵称已存在"
				})
			};
		G.checkNickRepeat(e.nick_name, i, a)
	}
	
	//登录必经之路
	function t(e, n, t, r) {
		Ttxy.core.getResult({
			url: P.login,
			data: e,
			success: function(e) {
				if (!e.data || !e.data.access_token) return void Ttxy.messager.warn("登录失败，请稍后再试！");
	/*			if(e.params.hasOwnProperty('isReadAgreement')){
					//alert("注册登录");
				}else{
					//alert("直接登录");
//					$.cookie('loginStart',tj_date);
//					Ttxy.core.getResult({
//						url: 'http://api.51weibo.com/user/info/'+e.data.access_token,
//						success: function(dz) {
//							tj_uid = dz.data._id;
//							tj_event_id='dau';
//							tj_hadoop(tj_login());
//						},
//						error: function() {
//							"function" == typeof r && r()
//						}
//					})

				}*/
				var t = e.data;
				u(t.access_token, M ? t.expires_at : 0),o(n, r)
			},
			error: function() {
				"function" == typeof r && r()
			},
			resolveError: function(e) {
				"function" == typeof t && t(e)
			}
		})
	}

	/**
	 * 用户登陆打点函数
	 * @returns {String}
	 */
	function tj_login() {
		var arr = [
		'pkg_version',tj_pkg_version,
		'app_id',tj_app_id,
		'platform',tj_platform,
		'app_version',tj_app_version,
		'uid',tj_uid,
		'channel_id', tj_channel_id,
		'client_id', tj_channel_id,
		'event_id',tj_event_id,		
		'date',tj_date,
		];
		return tj_arr2context(arr);
	}
	function o(e) {
		r() && Ttxy.core.getResult({
			url: P.extraUserInfo,
			data: {
				qd: G.getFrom(),
				child_qd: G.getSubFrom()
			},
			requireToken: !0,
			success: function(n) {
				W = !0, H = n.data, c(H), Z.renderTopUserArea(H), G.sendLoginLog(), "function" == typeof e && e(H), Y.fire(), Y.empty()
				//登录打点
				if($.cookie("login_point")!="0"){
					$.cookie('loginStart',tj_date);
					tj_uid = n.data._id;
					tj_event_id='dau';
					tj_channel_id=$.cookie("u_cc") == null ? "1000001":$.cookie("u_cc")
					tj_hadoop(tj_login());
					$.cookie("login_point","0");
				}
			},
			resolveError: function(e) {
				Ttxy.messager.error(e.msg)
			},
			errorCallback: function() {}
		})
	}
	function r() {
		if (K) return K;
		if ($.cookie(Q)) return K = $.cookie(Q);
		/*if (en.isUnion()) {
			var e = $.query.get("token");
			if (!e) return;
			return en.isUnion("tuli") && (e = "kb-" + e), K = e
		}
		if (location.search.indexOf("callback") > -1) {
			var n = $.query.get("callback", location.search.replace("/&/g", "＆").replace(/&quot;/g, "")),
				t = $.parseJSON(decodeURIComponent(n)).data;
			return K = t.access_token || ""
		}*/
		return $.query.get("access_token") || ""
	}
	function i(e) {
		// 修改登录的方式
		/*var n = $.query.get("access_token", e);
		Ttxy.ui.hideMenu(), Ttxy.messager.loading("努力加载中 请稍后......"), n && (u(n,24*60*60*1000), 
		location.reload(),
		o())
		o(function() {
			location.reload()
		}))*/
		
		if (H) return H;
		var n = "",
			t = location.search;
		if (e ? n = e.replace(/&quot;/g, "") : (t.indexOf("callback") > -1 && (t = t.replace("/&/g", "＆").replace(/&quot;/g, "")), n = $.query.get("callback", t)), n) {
			var r = $.query.get("access_token", e);
			//var r = $.parseJSON(decodeURIComponent(n)).data;
			return r ? (
					u(r), Ttxy.ui.hideMenu(), Ttxy.messager.loading("登录中    请稍后......"),
				void(t.indexOf("access_token") > -1 ? location.href = $.query.set("access_token", "").replace(/[?|&]access_token=/, "") : location.reload())) : void Ttxy.messager.warn("登录失败，请稍后再试！",
				function() {
					location.href = $.query.set("access_token", "").replace(/[?|&]access_token=/, "")
				})
		}
		var i = $.store.get(J),
			a = $.cookie(Q),
			c = $.query.get("token");
		if (a) {
			/*if (en.isUnion()) {
				if (!c) return void E();
				var s = !1;
				en.isUnion("tuli") && a.indexOf(c) < 0 ? (s = !0, a = "kb-" + c) : en.isUnion("yuanlai") && a !== c && (s = !0, a = c), s && (i = null, u(a))
			}*/
			return $.isPlainObject(i) && !$.isEmptyObject(i) ? (H = i, W = !0, Y.fire(), Y.empty()) : o(), H
		}
		return c && en.isUnion() ? (a = en.isUnion("tuli") ? "kb-" + c : c, u(a), null) : (E(), null)
		
	
		}
	/*function i(e) {
		var n = $.query.get("access_token", e);
		Ttxy.ui.hideMenu(), Ttxy.messager.loading("登录中,请稍等"), n && (u(n), o(function() {
			location.reload()
		}))
	}*/
	
	function a() {
		Ttxy.core.getResult({
			url: P.qqOpenLogin,
			data: $.parseParam(location.search),
			success: function(e) {
				u(e.access_token), o()
			}
		})
	}
	function c(e) {
		H = $.extend(!0, H, e), $.store.set(J, H)
	}
	function u(e, n) {
		var t = Ttxy.core.isRelease() ? {
			path: "/",
			domain: Ttxy.config.domain.cookie
		} : {
			path: "/"
		};
		Ttxy.messager.loading("登录中  请稍后......");
		K = e, 
		n && (t.expires = new Date(1e3 * n)), 
		$.cookie(Q, e, t)
	}
	function s() {
		return l() ? Ttxy.common.getLevel(i().finance.coin_spend_total, !0).level : 0
	}
	function l() {
		return !!r()
	}
	function f() {
		return !!$.query.get("openid")
	}
	function d(e, n) {
		return l() && null !== i() ? i()[e] === n : !1
	}
	function p() {
		return d("priv", 1)
	}
	function g() {
		return d("priv", 2)
	}
	function m() {
		return d("priv", 4)
	}
	function y() {
		return d("priv", 5)
	}
	function k() {
		return d("priv", 3)
	}
	function _() {
		return l() ? i().vip > 0 : !1
	}
	function x() {
		return d("vip", 1)
	}
	function h() {
		return d("vip", 2)
	}
	function v(e) {
		return d("_id", e)
	}
	function T() {
		return l() ? !! i().family : null
	}
	function q() {
		return T() ? i().family : null
	}
	function U(e, n) {
		T() && (i().family[e] = n)
	}
	function b(e) {
		return T() && i().family.family_priv === e
	}
	function C() {
		return b(1)
	}
	function R() {
		return b(2)
	}
	function O() {
		return b(3)
	}
	//打点方法
	
	/**
	 * 打点的总的调用的方法 
	 * @param context
	 */
	function tj_hadoop(context) {
		var method = 'post';
		var url = "http://union.51weibo.com/api/receive";
		var data = context;
		tj_post( method, url, data);
	}
	/**
	 * post的方法
	 * @param pre
	 * @param method
	 * @param url
	 * @param what
	 * @param data
	 */
	function tj_post(method, url,data) {
		$.ajax({
			   type: "POST",  
		        url: url,  
		        data: data,  
		        timeout: '3000',  
		        beforeSend:function(){  
		            //alert("正在提交，请稍候.....");  
		        },  
		        success:function(data){  
		           // alert('提交完成');  
		        },  
		        error:function(){  
		        	//alert("错误");  
		        } 
		});
	}
	
	/**
	 * 参数 字符串的拼接
	 * @param arr
	 * @returns {String}
	 */
	function tj_arr2context(arr) {
		var str='';
		for(var i=0;i<arr.length;i+=2) {
			if(str!='') {
				str += "&";
			}
			str+=arr[i]+"=";
			if(arr[i+1]==''){
				arr[i+1] ='';
			}
			str +=arr[i+1];
		}
		return str;
	}
	
	//打点参数
	var tj_pkg_version ="1.0";
	var tj_app_id = "2001";
	var tj_platform = "web";
	var tj_app_version = "1.0";
	var tj_uid = 0;
	var tj_channel_id=$.cookie("u_cc") == null ? "1000001":$.cookie("u_cc");
	var tj_event_id = "";
	var tj_date = parseInt(new Date().getTime()/1000);
	var tj_event_value = "";
	/**
	 * 用户退出的时候的打点
	 * @returns {String}
	 */
	function tj_exit() {
		var arr = [
		'pkg_version',tj_pkg_version,
		'app_id',tj_app_id,
		'platform',tj_platform,
		'app_version',tj_app_version,
		'uid',tj_uid,
		'channel_id', tj_channel_id,
		'client_id', tj_channel_id,
		//'client_id',tj_client_id,
		'event_id',tj_event_id,
		//'os_brand',tj_os_brand,
		//'os_module',tj_os_module,
		'event_value',tj_event_value,
		'date',tj_date
		
		];
		return tj_arr2context(arr);
	}
	//退出必经之路
	function w() {
		if(Ttxy.user.getUserInfo()._id != null){
			tj_uid = Ttxy.user.getUserInfo()._id;
			var curt = new Date().getTime()/1000;
			var orgt = $.cookie('loginStart');
			tj_event_value = (curt - orgt).toFixed(2);
			tj_event_id = 'logout'; 
			tj_hadoop(tj_exit()); //退出打点
			$.cookie("login_point","");
		}
		
		return E(), en.isUnion() && en.logout ? en.logout() : void(/user.html/.test(location.pathname) || en.isUnion() ? location.href = "/" : location.search.indexOf("callback") > -1 ? location.href = $.query.set("callback", "").replace(/[?|&]callback=/, "") : location.reload())
	}
	function E() {
		$.cookie(B, null), $.cookie("from", null), H = null, $.cookie(Q, null, {
			path: "/"
		}), $.cookie(Q, null, {
			path: "/",
			domain: Ttxy.config.domain.cookie
		}), $.store.remove(J), $.store.remove("VERIFYED")
	}
	function I() {
		Ttxy.messager.warn("您的身份已经过期，请重新登录", function() {
			w()
		})
	}
	function L(e) {
		return "function" == typeof e ? (Y.add(e), W ? (Y.fire(), void Y.empty()) : void 0) : void 0
	}
	function S() {
		return j
	}
	function F() {
		return l() ? j[H.constellation || 0] : void 0
	}
	function A() {
		if (l()) {
			var e = 1 === H.sex ? D : z;
			return e[H.stature ? H.stature < 0 ? 0 : H.stature : 0]
		}
	}
	function N() {
		return 1 === H.sex ? D : z
	}
	function V() {
		return P
	}
	var P = {
		registerRoot: Ttxy.config.userRoot + "register?user_name={user_name}&password={password}&qd={qd}&nick_name={nick_name}",
		loginRoot: Ttxy.config.userRoot + "login?user_name={user_name}&password={password}",
		checkNick: Ttxy.config.userRoot + "user/checkname?nick_name={nick_name}",
		checkEmail: Ttxy.config.userRoot + "user/checkname?={user_name}",
		register: "ttus/register?nick_name={nick_name}&user_name={user_name}&password={password}&auth_code={auth_code}&auth_key={auth_key}",
		login: "ttus/login?user_name={user_name}&password={password}&auth_code={auth_code}&auth_key={auth_key}",
		qqOpenLogin: "qq/login?openid={openid}&openkey={openkey}&pf={pf}",
		authcode: "ttus/authcode_image",
		authcode2: "ttus/authcode_image2",
		extraUserInfo: "user/info/{access_token}?qd={qd}&child_qd={child_qd}",
		editUser: "user/edit/{access_token}",
		loginLog: "user/day_login/{access_token}",
		feedback: "public/feedback?content={content}&app=ttshow&f={from}&tid={tid}&contact={contact}",
		sinaRoot: "https://api.weibo.com/oauth2/authorize?scope=follow_app_official_microblog&client_id=3374293008&display=default",
		qqRoot: "https://graph.qq.com/oauth2.0/authorize?scope=upload_pic,add_topic,get_user_info&client_id=101155929&response_type=code",
		tuliUserType: "tuli/user_type?_id={id}",
		hide: "user/vip_hiding/{access_token}/{type}",
		letterUnreadCount: "mail/unread_count/{access_token}",
		xunleiLogin: "kankan/login?username={username}&password={password}",
		msgUnreadCount: "msg/unread_count/{access_token}",
		remindUnread: "remind/unread_count/{access_token}"
	},
		j = ["保密", "白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座", "魔蝎座", "水瓶座", "双鱼座"],
		D = ["消瘦", "结实", "强壮", "魁梧"],
		z = ["苗条", "丰满", "丰硕", "富态"],
		J = "TTSHOW_USER_INFO",
		Q = "ACCESS_TOKEN",
		B = "VIDEO_OPT",
		H = null,
		K = "",
		M = !0,
		W = !1,
		Y = $.Callbacks(),
		G = null,
		X = null,
		Z = null,
		en = null;
	return resolveUserResult = i, {
		init: e,
		register: n,
		login: t,
		getToken: r,
		getUserInfo: i,
		setUserInfo: c,
		getRichLv: s,
		isLogin: l,
		isOperate: p,
		isAnchor: g,
		isService: m,
		isBroker: y,
		isCommonUser: k,
		isVIP: _,
		isCVip: x,
		isSVip: h,
		isSelf: v,
		hasFamily: T,
		getFamilyInfo: q,
		setFamilyInfo: U,
		isFamilyMember: O,
		isFamilyLeader: C,
		isFamilyViceLeader: R,
		logout: w,
		expired: I,
		getConstAry: S,
		getUserConst: F,
		getStature: A,
		getStatureAry: N,
		getActions: V,
		getExtraUserInfo: o,
		setUserOriginToken: u,
		registerExtraCallback: L
	}
}), $(function() {
	Ttxy.user.mainController.init()
});;
$.module("Ttxy.viewRecordController", {
	_store_tag: "TTXIU_VIEWRECORD",
	MAX_LENGTH: 10,
	show: function() {
		var t = this.getList();
		Ttxy.core.debug("viewRecord-get", t), t && $(".followLayer .followList .record").html($.template(Tmpl.overAll.viewRecordList, {
			data: t
		}))
	},
	store: function(t) {
		for (var e = this.getList(), o = 0, r = e.length; r > o; o++) {
			var i = e[o];
			if (i.room_id == t.room_id) {
				e.splice(o, 1);
				break
			}
		}
		e.splice(0, 0, t), e.length > this.MAX_LENGTH && e.splice(this.MAX_LENGTH), $.store.set(this._store_tag, e)
	},
	getList: function() {
		return $.store.get(this._store_tag) || []
	}
});;
$.module("Ttxy.mission", function() {
	function t() {
		$("#page").append(Tmpl.overAll.fixedBar), H = $("#fixedWrap"), j = $("#fixedBtn"), D = $("#fixedBtn .fixbtn-task"), O = H.find(".taskList").append(Tmpl.overAll.missionTask), z = O.children("ul"), G = $("#fixedBar .fixbtn-top"), $weixinWrap = H.find(".weixinWrap"), n(), Ttxy.user.isLogin() ? (Ttxy.user.registerExtraCallback(a), Ttxy.user.registerExtraCallback(x)) : (D.parent().show(), D.click(function() {
			Ttxy.user.popupLogin()
		}))
	}
	function e(t, e, i) {
		j.find("." + t).parent().show(), J[t] = e, Q[t] = i
	}
	function i(t, e) {
		for (var i in Q) i != t && Q[i](!0);
		e()
	}
	function n() {
		j.delegate(".fixbtn-hover", {
			mouseover: function() {
				$(this).stop().animate({
					width: 104
				}, 200)
			},
			mouseout: function() {
				$(this).stop().animate({
					width: 104
				}, 200)
			}
		}), j.delegate("a", {
			click: function(t) {
				var e = $(this).data("type");
				e && J[e] && J[e](), t.stopPropagation()
			}
		}).delegate(".fixwrap-bottom li", "mouseleave", function() {}), $("#fixedBar").click(function(t) {
			t.stopPropagation()
		}), $(document).click(function() {
			s()
		}), e("fixbtn-task", function() {}, function() {}), e("weixin", function() {
			o()
		}, r), e("fixbtn-more", function() {
			s("fixbtn-more"), $(".fixbtn-more").parent().toggleClass("on");
			var t = $("#fixedBtn .fixwrap-bottom>li:visible").length;
			3 > t && $("#fixedBtn .fixwrap-more").css("top", "-41px"), 4 > t && $("#fixedBar").hasClass("fixed-live") && $("#fixedBtn .fixwrap-more").css("top", "-41px")
		}, function() {
			$(".fixbtn-more").parent().removeClass("on")
		}), O.find(".close").click(function() {
			T()
		}), O.delegate("li a", "click", function() {
			var t = $(this),
				e = t.attr("class"),
				i = t.attr("data-id");
			if (q = t, O.removeClass("show"), "get" === e) p(i);
			else switch (i) {
			case "edit_nick":
				_();
				break;
			case "add_following":
				k();
				break;
			case "send_gift":
				I();
				break;
			case "money":
				Ttxy.user.redirectToCharge();
				break;
			case "add_icon":
				A()
			}
		}), G.click(function() {
			var t = $(window.opera ? "CSS1Compat" == document.compatMode ? "html" : "body" : "html,body");
			t.animate({
				scrollTop: 0
			}, 400)
		}), F.bind("scroll resize", function() {
			F.scrollTop() > 400 ? G.show().parent().show() : G.hide().parent().hide()
		})
	}
	function o() {
		0 === parseInt($weixinWrap.css("right"), 10) ? r() : Ttxy.mission.showWrap("weixin", function() {
			$weixinWrap.animate({
				right: 0
			})
		})
	}
	function r(t) {
		$weixinWrap.stop()[t ? "css" : "animate"]({
			right: -134
		})
	}
	function s(t) {
		$("#fixedWrap>div").each(function() {
			var t = $(this);
			0 === parseInt(t.css("right"), 10) && $(this).animate({
				right: -t.width() - 5
			})
		}), (void 0 == typeof t || "fixbtn-more" != t) && $(".fixbtn-more").parent().removeClass("on")
	}
	function a(t) {
		"MISSION_" + Ttxy.user.getUserInfo()._id;
		return c() ? void D.hide().parent().hide() : void Ttxy.core.getResult({
			url: S.list,
			data: {
				type: 1
			},
			requireToken: !0,
			success: function(e) {
				U = e.data.all_mission, z.html($.template(Tmpl.overAll.missionList, {
					data: e.data
				})), t !== !0 && (E = e.data.complete_mission, f("register") && !$.store.get("POP_REG_AWARD") && (O.find(".get[data-id=register]").trigger("click"), $.store.set("POP_REG_AWARD", !0)), x())
			}
		})
	}
	function c() {
		if (Ttxy.user.isLogin()) {
			var t = "MISSION_" + Ttxy.user.getUserInfo()._id;
			return 1 == $.store.get(t)
		}
		return !1
	}
	function u(t) {
		var e = "MISSION_" + Ttxy.user.getUserInfo()._id;
		t ? ($.store.set(e, !0), $(window).resize()) : $.store.remove(e)
	}
	function l(t) {
		for (var e = null, i = 0, n = U.length; n > i; i++) if (U[i]._id === t) {
			e = U[i];
			break
		}
		return e
	}
	function d(t) {
		return 1 === E[t]
	}
	function f(t) {
		return 0 === E[t]
	}
	function p(t) {
		if (g(t)) return void Ttxy.messager.warn("当前设备的领取机会已经使用完，请明天再来");
		T();
		var e = l(t);
		e && ("register" === t && (e.tip = "欢迎您加入微播微播"), Ttxy.core.debug(e), Ttxy.ui.createPopupMenu({
			id: "getAward",
			width: 400,
			height: 225,
			center: !0,
			force: !0,
			title: "领取奖励",
			content: $.template(Tmpl.overAll.getAward, {
				data: e
			})
		}, function(e) {
			e.find("img").click(function() {
				var t = $(this);
				t.attr("src", Ttxy.common.createAuthCode())
			}), e.find("input").keypress(function(t) {
				13 === t.keyCode && e.find("a").trigger("click")
			}), e.find("a").click(function() {
				var i = $.trim(e.find("input").val());
				i && Ttxy.core.getResult({
					url: S.getAward,
					requireToken: !0,
					data: {
						mission_id: t,
						auth_code: i
					},
					success: function(e) {
						Ttxy.core.debug(e), R(), Ttxy.ui.hideMenu(), "register" === t && h(), m(t), Ttxy.user.getExtraUserInfo()
					},
					resolveError: function(t) {
						Ttxy.core.debug(t), 30444 === t.code ? x(!0) : (e.find(".errorTip").text(t.msg), e.find("img").trigger("click"), e.find("input").val(""))
					}
				})
			}), e.find("input").click(function() {
				e.find(".errorTip").text("")
			})
		}))
	}
	function m(t) {
		if (!(P.indexOf(t) < 0)) {
			var e = $.store.get(W) || [];
			3 !== e.length || g(t) || (e = []), e.push(t), $.store.set(W, e), 3 === e.length && $.store.set(B, (new Date).getTime())
		}
	}
	function g(t) {
		if (P.indexOf(t) < 0) return !1;
		var e = $.store.get(B);
		if (!e) return !1;
		var i = (new Date).getTime();
		return i - e > L ? !1 : !0
	}
	function x(t) {
		var e = Ttxy.user.getUserInfo();
		if (!t) {
			if ($.store.get(V) === e._id) return;
			if ($.query.get("registered") !== !0) return
		}
		// 提出掉 现在的邮箱的验证的提示
		/*
		 * Ttxy.ui.createPopupMenu({ id: "getAward", width: 500, height: "auto",
		 * center: !0, force: !0, title: "提示", content:
		 * $.template(Tmpl.overAll.verifyTip, { email:
		 * Ttxy.user.getUserInfo().user_name }) }),
		 */
		
		$.store.set(V, e._id), setTimeout(function() {
			D.trigger("click")
		}, 2e3)
	}
	function h() {
		Ttxy.ui.createPopupMenu({
			id: "getAward",
			width: 400,
			height: 160,
			center: !0,
			force: !0,
			title: "test",
			content: '<p class="tip"><span>“</span><span class="text">您已成功领取10金币</span><span>”</span></p><a class="loginBtns" href="javascript:void(0);">更多奖励</a>'
		}, function(t) {
			t.find(".content a").click(function() {
				Ttxy.ui.hideMenu(), D.trigger("click")
			})
		})
	}
	function T() {
		0 === parseInt($(".taskList").css("right"), 10) ? v() : (a(!0), i(K, function() {
			O.animate({
				right: 0
			})
		}))
	}
	function v(t) {
		O.stop()[t ? "css" : "animate"]({
			right: -C
		}), w()
	}
	function y(t, e, i, n) {
		N = H.find(".missionPanel"), N.length || (H.prepend(Tmpl.overAll.missionPanel), N = H.find(".missionPanel"), N.animate({
			right: C
		}, 500), N.find(".close").one("click", w)), Ttxy.core.debug(e), $("#" + e).length || (t = t || "提示", i = i || "", e = e || "", N.find(".confirm").unbind(), N.find(".title .text").text(t), N.find(".content").html(i).attr("id", e), N.find(".confirm").click(function() {
			"function" == typeof n && n(N)
		}))
	}
	function w() {
		N && N.remove()
	}
	function _() {
		y("修改昵称", "editNick", $.template(Tmpl.overAll.editNickMission), function(t) {
			var e = t.find("input").val();
			return !e.length || e.length > 18 ? void t.find(".errorTip").text("昵称为1-18个字符") : Ttxy.common.isSensitive(e, "all") ? void t.find(".errorTip").text("包含敏感词或保留词") : e === Ttxy.user.getUserInfo().nick_name ? void t.find(".errorTip").text("昵称没有改变") : (Ttxy.core.getResult({
				url: S.editUser,
				data: {
					nick_name: e
				},
				type: "POST",
				requireToken: !0,
				crossDomain: !0,
				success: function() {}
			}), void setTimeout(function() {
				M(), w(), p("edit_nick")
			}, 2e3))
		})
	}
	function k() {
		$("#followAnchors").length || Ttxy.core.getResult({
			url: S.recommondList,
			data: {
				size: 6
			},
			success: function(t) {
				Ttxy.core.debug("res: ", t), y("关注至少一名主播", "followAnchors", $.template(Tmpl.overAll.followList, {
					data: t.data
				}), function(t) {
					var e = $.serializeForm(t).anchor_id;
					if (e) {
						e = e.split(",");
						for (var i = 0, n = e.length; n > i; i++) Ttxy.follow.add(e[i], b)
					}
				})
			}
		})
	}
	function b() {
		X || (X = !0, M(), p("add_following"))
	}
	function A() {
		return d("add_icon") ? void(location.href = "/微播.url") : f("add_icon") ? (p("add_icon"), void(location.href = "/微播.url")) : (T(), void Ttxy.core.getResult({
			url: S.completeMission,
			requireToken: !0,
			success: function() {
				M(), p("add_icon"), location.href = "/微播.url"
			}
		}))
	}
	function I() {
		Ttxy.live ? T() : Ttxy.core.getResult({
			url: S.roomList,
			success: function(t) {
				var e = Ttxy.common.createRoom(t.data[0]._id);
				$.store.set("showGiftBox", !0), location.href = e
			}
		})
	}
	function M() {
		q.attr("class", "get").text("立即领取")
	}
	function R() {
		q.replaceWith("已完成")
	}
	var C = 309,
		L = 864e5,
		P = ["register", "edit_nick", "add_following"],
		W = "LIMIT_AWARD",
		B = "LIMIT_TIME",
		S = {
			//list: "mission/list/{access_token}/{type}",
			getAward: "mission/award/{access_token}?mission_id={mission_id}&auth_code={auth_code}",
			completeMission: "mission/add_icon/{access_token}",
			authCode: "user/authcode/",
			editUser: "user/edit/{access_token}",
			recommondList: "public/room_found_latest?size={size}",
			roomList: "public/room_list?page=1&size=1"
		},
		E = [],
		U = [],
		O = null,
		z = null,
		D = null,
		q = null,
		N = null,
		G = null,
		F = $(window),
		j = null,
		H = null,
		J = {},
		K = "mission",
		Q = {},
		V = "REGISTERED",
		X = !1;
	return {
		init: t,
		showMoreMission: h,
		handleAddIcon: A,
		setFinished: u,
		initFixedBtn: e,
		showWrap: i
	}
}), $(function() {
	Ttxy.mission.init()
});;
$.module("Ttxy.follow", function() {
	function o() {
		y.delegate(".text", {
			click: function() {
				var o = $(this);
				o.addClass("active").siblings(".text").removeClass("active");
				var n = o.data("type");
				v.find("ul").hide(), v.find("." + n).show(), "record" == n && Ttxy.viewRecordController.show()
			}
		}), m.click(function() {
			return Ttxy.user.isLogin() ? void n() : void Ttxy.user.popupLogin()
		})
	}
	function n() {
		0 === parseInt(w.css("right"), 10) ? t() : (r(), Ttxy.mission.showWrap(p, function() {
			w.animate({
				right: 0
			})
		}))
	}
	function t(o) {
		w.removeClass("show"), w.stop()[o ? "css" : "animate"]({
			right: -209
		})
	}
	function i(o, n, t) {
		Ttxy.core.getResult({
			url: s[t],
			data: {
				star_id: o
			},
			requireToken: !0,
			success: function() {
				if (e(), "function" == typeof n && n(), "add" == t && Ttxy.user.unionController.isUnion() && !$.isEmptyObject(Ttxy.live)) {
					var o = Ttxy.live.anchorController.getAnchorInfo(),
						i = {
							follow_id: o.user._id,
							follow_room: o.room._id,
							follow_nickname: o.user.nick_name,
							follow_avatar: o.user.pic
						};
					try {
						Ttxy.user.unionController.follow(i)
					} catch (l) {}
				}
			}
		})
	}
	function e(o) {
		Ttxy.core.getResult({
			url: s.list,
			requireToken: !0,
			success: function(n) {
				l(n), "function" == typeof o && o(n)
			}
		})
	}
	function l(o) {
		u = o;
		for (var n = o.data.rooms || [], t = n.length, i = 0, e = 0; t > e; e++) n[e].live && i++;
		try {
			y.find(".follow strong").text("关注的(" + i + "/" + t + ")"), g.html($.template(Tmpl.overAll.followAreaList, {
				data: o.data,
				type: "all"
			}))
		} catch (l) {}
	}
	function r() {
		e(function() {
			c = !0, "function" == typeof d && (d(), d = null), a
		})
	}
	var s = {
		list: "user/following_list/{access_token}",
		add: "user/add_following/{access_token}/{star_id}",
		del: "user/del_following/{access_token}/{star_id}",
		isFollowing: "user/is_following?access_token={access_token}&id1={_id}"
	},
		a = !1,
		u = null,
		d = null,
		c = !1,
		f = !1,
		p = "fixbtn-follow",
		w = null,
		y = null,
		g = null,
		v = null,
		m = null,
		x = function() {
			$(function() {
				Ttxy.user.isLogin() && ($("#fixedBar").addClass("fixed-login"), $("#fixedWrap").append(Tmpl.overAll.followArea), w = $("#fixedWrap .followLayer"), y = w.children(".wrapIcon"), v = w.find(".followList"), g = w.find(".all"), m = y.find(".point"), f = !0, r(), Ttxy.mission.initFixedBtn(p, function() {
					return Ttxy.user.isLogin() ? void n() : void Ttxy.user.popupLogin()
				}, t), o())
			})
		};
	return x.prototype = {
		add: function(o, n) {
			return this.isFollowed(o) ? void Ttxy.messager.warn("您已关注该主播") : void i(o, n, "add")
		},
		del: function(o, n) {
			i(o, n, "del")
		},
		handleFollowUpdate: function(o) {
			for (var n = u.data.rooms, t = o.data_d, i = 0; i < n.length; i++) {
				var e = n[i];
				if (e._id == t.room_id) {
					e.live = t.live, e.timestamp = t.timestamp;
					break
				}
			}
			l(u)
		},
		enableRealTime: function() {
			a = !0
		},
		isFollowed: function(o) {
			if ("number" == typeof o) {
				var n = !1;
				if (u) for (var t = u.data.users || [], i = 0; i < t.length; i++) if (t[i]._id == o) {
					n = !0;
					break
				}
				return n
			}
		},
		isFollowing: function(o, n) {
			Ttxy.core.getResult({
				url: s.isFollowing,
				requireToken: !0,
				data: {
					_id: o
				},
				success: function(o) {
					"function" == typeof n && n(o.data.following)
				}
			})
		},
		addLoadedCallback: function(o) {
			c ? o() : d = o
		},
		loopRenderFollowList: r
	}, new x
});;
var signInCalendar = $.Class({
	init: function(t) {
		this.Days = [], this.SetOptions(t), this.Year = this.options.Year, this.Month = this.options.Month, this.SelectDay = this.options.SelectDay ? new Date(this.options.SelectDay) : null, this.onSelectDay = this.options.onSelectDay, this.onToday = this.options.onToday, this.onFinish = this.options.onFinish, this.signRecord = this.options.signRecord, this.isReceivedToday = this.options.isReceivedToday
	},
	SetOptions: function(t) {
		this.options = {
			Year: (new Date).getFullYear(),
			Month: (new Date).getMonth() + 1,
			SelectDay: null,
			onSelectDay: function() {},
			onToday: function() {},
			onFinish: function() {},
			isReceivedToday: !1
		}, $.extend(this.options, t || {})
	},
	Draw: function() {
		for (var t = [], e = 1, n = new Date(this.Year, this.Month - 1, 1).getDay(); n >= e; e++) t.push(-e);
		for (var e = 1, i = new Date(this.Year, this.Month, 0).getDate(); i >= e; e++) t.push(e);
		var s = document.createElement("div");
		for (this.Days = []; t.length > 0;) {
			for (var o = document.createElement("tr"), e = 1; 7 >= e; e++) {
				var a = document.createElement("td");
				if (a.innerHTML = " ", t.length > 0) {
					var r = t.shift();
					a.innerHTML = "<span>" + (r > 0 ? r : "") + "</span>", r > 0 && (this.Days[r] = a, this.IsSame(new Date(this.Year, this.Month - 1, r), new Date) && (this.onToday(a), a.className = "today"), this.SelectDay && this.IsSame(new Date(this.Year, this.Month - 1, r), this.SelectDay) && this.onSelectDay(a), this._isSigned(this.Year, this.Month, r) && (a.className = "today" == a.className ? "today dateSigned icon-index" : "dateSigned icon-index", a.setAttribute("title", "已签到")))
				}
				o.appendChild(a)
			}
			s.appendChild(o)
		}
		return s
	},
	IsSame: function(t, e) {
		return t.getFullYear() == e.getFullYear() && t.getMonth() == e.getMonth() && t.getDate() == e.getDate()
	},
	_isSigned: function(t, e, n) {
		for (var i = 0, s = this.signRecord.length; s > i; i++) {
			var o = this._getDateObj(this.signRecord[i]._id.split("_")[0]);
			if (o.year == t && o.month == e && o.day == n) return !0
		}
		return !1
	},
	_getDateObj: function(t) {
		return {
			year: t.substring(0, 4),
			month: t.substring(4, 6),
			day: t.substring(6, 8)
		}
	}
});
$.module("Ttxy.signIn", function() {
	function t() {
		u = $("#fixedWrap .signinWrap"),
		Ttxy.mission.initFixedBtn(d, function() {
			Ttxy.user.isLogin() ? 0 === parseInt(u.css("right"), 10) ? a() : (e(), Ttxy.mission.showWrap(d, function() {
				u.animate({
					right: 0
				})
			})) : Ttxy.user.popupLogin()
		}, a), 
		Ttxy.user.isLogin() && i();
	}
	function e() {
		Ttxy.core.getResult({
			url: c.signList,
			requireToken: !0,
			success: function(t) {
				Ttxy.core.getResult({
					url: c.missionList,
					requireToken: !0,
					success: function() {
						t.isReceivedToday = n(t.data);
						var e = new signInCalendar({
							signRecord: t.data,
							isReceivedToday: t.isReceivedToday
						});
						t.dateHtml = e.Draw().innerHTML, t.yearMonth = e.Year + "年" + (e.Month < 10 ? "0" : "") + e.Month + "月", Ttxy.common.manuRenderCommon(u, Tmpl.overAll.signInfo, t, "html")
					}
				})
			},
			error: function() {}
		})
	}
	function n(t) {
		for (var e = Ttxy.user.getUserInfo()._id, n = new Date, i = n.getFullYear() + "" + (n.getMonth() + 1 < 10 ? "0" : "") + (n.getMonth() + 1) + (n.getDate() < 10 ? "0" : "") + n.getDate(), s = 0; s < t.length; s++) if (i + "_" + e == t[s]._id) return !0;
		return !1
	}
	function i() {
		u.delegate("#calendarYear a", "click", function() {
			var t = $(this);
			t.parent().hasClass("received") || s({
				title: "每日签到",
				coin_count: 4,
				action: c.signToday,
				data: {}
			})
		}).delegate(".getCoin .get", "click", function() {
			s({
				title: "额外",
				coin_count: $(this).data("coin"),
				action: c.signAward,
				data: {
					type: $(this).data("type")
				}
			})
		}).delegate(".close", "click", function() {
			a()
		})
	}
	function s(t) {
		Ttxy.ui.createPopupMenu({
			id: "getAward",
			width: 400,
			height: 225,
			center: !0,
			force: !0,
			title: "领取奖励",
			content: $.template(Tmpl.overAll.getAward, {
				data: t
			})
		}, function(n) {
			n.find("input").keypress(function(t) {
				13 === t.keyCode && n.find("a").trigger("click")
			}), n.find("img").click(function() {
				var t = $(this);
				t.attr("src", Ttxy.common.createAuthCode())
			}), n.find("a").click(function() {
				var i = $.trim(n.find("input").val());
				if (i) {
					var s = $.extend({
						auth_code: i
					}, t.data);
					Ttxy.core.getResult({
						url: t.action,
						requireToken: !0,
						data: s,
						success: function() {
							Ttxy.user.getExtraUserInfo(), Ttxy.messager.success("领取成功"), e(), Ttxy.ui.hideMenu()
						},
						resolveError: function(t) {
							Ttxy.core.debug(t), 30444 === t.code ? o() : (n.find(".errorTip").text(t.msg), n.find("img").trigger("click"), n.find("input").val(""))
						}
					})
				}
			}), n.find("input").click(function() {
				n.find(".errorTip").text("")
			})
		})
	}
	function o() {
		Ttxy.ui.createPopupMenu({
			id: "getAward",
			width: 500,
			height: "auto",
			center: !0,
			force: !0,
			title: "提示",
			content: $.template(Tmpl.overAll.verifyTip, {
				email: Ttxy.user.getUserInfo().user_name
			})
		})
	}
	function a(t) {
		u.stop()[t ? "css" : "animate"]({
			right: -h
		})
	}
	function r(t, e) {
		if (!e) return !1;
		for (var n = 0, i = e.length; i > n; n++) if (e[n].type == t) return !0;
		return !1
	}
	var c = {
		signList: "sign/list/{access_token}",
		signAward: "sign/award/{access_token}/{type}?auth_code={auth_code}",
		signToday: "mission/award/{access_token}?mission_id=sign_daily&auth_code={auth_code}",
		missionList: "mission/list/{access_token}/1"
	},
		u = null,
		d = "signin",
		h = 325;
	return {
		init: t,
		isReceivedOther: r
	}
}), 

$(function() {
	Ttxy.signIn.init()
});