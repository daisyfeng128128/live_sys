define(function(require, exports, module) {
	var cons = require("cons");
	var swf = require('./anchor-swf');
	var Tools = require('./anchor-tools');
	module.exports = {
		oWidth : 0,
		init : function() {
			$("#sendGiftBtn").click(
				function() {
					if (!UIF.handler.login) {
						UIF.handler.loging();
						return;
					}
					var sendGiftNum = parseInt($("#sendGiftNum").val());
					if (sendGiftNum == "") {
						sendGiftNum = 0;
					}

					if (UIF.handler.newSendGiftID == 0) {
						Tools.dialog("\u8BF7\u9009\u62E9\u793C\u7269");
						return;
					}
					if (sendGiftNum <= 0 || !$.isNumeric(sendGiftNum)) {
						Tools.dialog("\u8BF7\u6B63\u786E\u586B\u5199\u793C\u7269\u6570\u91CF");
						return;
					}
					var gid = UIF.handler.cache.get(cons.GIFT_TIMEGIFTIDS);
					var uid = UIF.handler.cache.get(cons.GIFT_TIMEUUIDS);
					var times = UIF.handler.cache.get(cons.GIFT_TRANSTIME);
					var gnu = UIF.handler.cache.get(cons.GIFT_TIMEGNUMBERS);
					var timeNumber = UIF.handler.cache.get(cons.GIFT_TIMENUMBERS);
					if (gid != null && uid != null && times != null && timeNumber != null && gnu != null && gid == UIF.handler.newSendGiftID && gnu == sendGiftNum) {
						var date = new Date().getTime();
						var diff = date - times;
						if (diff <= (5 * 1000)) {
							timeNumber++;
							if (timeNumber == 1)
								timeNumber++;
							times = new Date().getTime();
						} else {
							timeNumber = 0;
							uid = Tools.uuid();
							times = new Date().getTime();
						}
					} else {
						timeNumber = 0;
						gnu = sendGiftNum;
						uid = Tools.uuid();
						gid = UIF.handler.newSendGiftID;
						times = new Date().getTime();
					}
					UIF.handler.cache.put(cons.GIFT_TIMEUUIDS, uid);
					UIF.handler.cache.put(cons.GIFT_TRANSTIME, times);
					UIF.handler.cache.put(cons.GIFT_TIMEGIFTIDS, gid);
					UIF.handler.cache.put(cons.GIFT_TIMEGNUMBERS, gnu);
					UIF.handler.cache.put(cons.GIFT_TIMENUMBERS, timeNumber);
					UIF.handler
							.deduction(
									{
										uid : uid,
										sendNum : timeNumber,
										giftId : UIF.handler.newSendGiftID,
										number : sendGiftNum
									},
									function(data) {
										var fs = jQuery.parseJSON(data);
										if (fs.resultStatus == 100) { //100:余额不足 101:不存在 102:未登录 103:数量不足
											var yeless = '<div class="less-money">\
											                <div class="less-box">\
												            <div class="less-header">\u6E29\u99A8\u63D0\u793A</div>\
												            <div class="less-close"></div>\
												                <div class="hsr"></div>\
												                <div class="less-text">\u60A8\u7684<span>\u4F59\u989D</span>\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u8D2D\u4E70</div>\
												                <div class="less-butt">\
												                    <div class="less-charge butt"><a href="/pay.php">\u5145\u503C</a></div>\
												                    <div class="less-cancel butt">\u53D6\u6D88</div>\
												                </div>\
												            </div>\
												            </div>';
											$('body').append(yeless);
											$(".less-money").css({
												"left" : $(".newGifts").offset().left + 400,
												"top" : $(".newGifts").offset().top - 105
											});
											$(".less-money").show();
											return;
										}
										Tools.dialog(fs.resultMessage);
									});
				});
			$(".giveBtn").mousedown(function() {
				$(this).addClass("down");
			})
			$(".giveBtn").mouseup(function() {
				$(this).removeClass("down");
			})
            /* 礼物数量 */
            $('#stdSps li').click(function(){
                $('#sendGiftNum').val($(this).attr('data-count'));
                $('#stdSps').hide();
                return false;
            });
            $('#giftShapeBtns').click(function(){
                $('#stdSps').toggle();
                return false;
            });
			/**余额不足*/
			$("body").on("click", ".less-close,.less-cancel", function() {
				$(".less-money").hide();
			})
			$(".giftHeader").on('click', '.redot', function() {
				var gid = '';
				$.ajax({
					type : "POST",
					url : '/ajax/giftClick.php',
					data : '',
					dataType : "json",
					timeout : 1200000,
					success : function(data) {
						if (data == 1) {
							$(".giftHeader span:last").removeClass('redot');
						}
					},
					error : function(jqXHR, textStatus, errorThrown) {
					}
				});
			});

			/**礼物，鼠标跟随*/
			$(".giftLists  li:not(:first)").mouseover(
					function() {
						var price_html;
						if ($(this).find("div").attr("price") > 0) {
							price_html = $(this).find("img").attr("rel") + '</i>K豆';
						} else {
							price_html = '';
						}

						if ($(this).find("img").attr("join") > 0) {
							$('.gift-tip-popup').find(".gift-tip-info").html(
									'<div class="gift-tip-pic"><img alt="' + $(this).find(".gfname").html() + '" src="' + $(this).find("img").attr("src") + '" class="'
											+ $(this).find("img").attr("class") + '"/></div>\
                		<div class="gift-tip-detail"><p  class="gp1">'
											+ $(this).find(".gfname").html() + '<i>' + price_html + '</p><p class="gp2">连送<i>2</i>组<i> ' + $(this).find("img").attr("join")
											+ '</i>，触发连击特效</p></div>');
						} else {
							$('.gift-tip-popup').find(".gift-tip-info").html(
									'<div class="gift-tip-pic"><img alt="' + $(this).find(".gfname").html() + '" src="' + $(this).find("img").attr("src") + '" class="'
											+ $(this).find("img").attr("class") + '"/></div><div class="gift-tip-detail"><p  class="gp1">' + $(this).find(".gfname").html() + '<i>'
											+ price_html + '</p></div>')
						}
						if ($(this).attr("giftnum") != null) {
							p3 = '<p  class="gp3">\u6570\u91CF\uFF1A' + $(this).attr("giftnum") + '</p>';
							$(".gift-tip-detail").append(p3);
						}
						$('.gift-tip-popup').show();
					}).mouseout(function() {
				$('.gift-tip-popup').hide();
			}).mousemove(function(e) {
				var initL = e.pageX;
				var initT = e.pageY;
				$('.gift-tip-popup').css({
					'left' : initL + 40 + "px",
					'top' : initT - 120 + "px"
				});
			})
			/**自动增涨礼物*/
			if (UIF.handler.login) {
				var fi_time = 0;
				var fi_num = 0;
				var $cookie_fi_time = Tools.getCookie('fi_time');
				var $cookie_fi_num = Tools.getCookie('fi_num');
				if (!$cookie_fi_time) {
					Tools.setCookie("fi_time", 300, 86400);
					fi_time = 300;
				} else {
					fi_time = Tools.getCookie('fi_time');
				}
				if (!$cookie_fi_num) {
					Tools.setCookie("fi_num", 0, 86400);
					fi_num = 0;
				} else {
					fi_num = Tools.getCookie('fi_num');
				}
				if (fi_num >= 50) {
					clearInterval(dt_timer);
					$('.gift-tip-detail .gp22').text("今天获得星星已达上限!");
				}
				function change_dt() {
					fi_time--;
					$('.gift-tip-detail .gp22 i').text(fi_time);
					Tools.setCookie("fi_time", fi_time, 86400);
					if (fi_time <= 0) {
						fi_time = 300;
						if (fi_num < 50) {
							fi_num++;
						}
						Tools.setCookie("fi_num", fi_num, 86400);
						$('.first-nus').text(fi_num);
                        UIF.handler.countingStar({}, function(data) {
                            //console.log(data);
                        });
					}
					if (fi_num > 49) {
						clearInterval(dt_timer);
                        $(".gp22").text("今日星星已达上限");
					}
				}

				var dt_timer = setInterval(change_dt, 1000);
				$(".giftLists  li:first").mouseover(
						function() {
                            if($(this).find(".first-nus").text() > 49){
                                var $pp = "今日星星已达上限"
                            }else{
                                var $pp = '<p class="gp22"><i> ' + fi_time + '</i>秒获取下一颗</p>';
                            }

							$('.gift-tip-popup').find(".gift-tip-info").html(
									'<div class="gift-tip-pic"><img alt="' + $(this).find(".gfname").html() + '" src="' + $(this).find("img").attr("src") + '" class="'
                                    + $(this).find("img").attr("class") + '"/></div>\
                     <div class="gift-tip-detail"><p  class="gp1">'
                                    + $(this).find(".gfname").html() + '<i> ' + $(this).find(".first-nus").text() + '</i> 个</p>' + $pp + '</div>');

							if ($(this).attr("giftnum") != null) {
								p3 = '<p  class="gp3">\u6570\u91CF\uFF1A' + $(this).attr("giftnum") + '</p>';
								$(".gift-tip-detail").append(p3);
							}
							$('.gift-tip-popup').show();
						}).mouseout(function() {
					$('.gift-tip-popup').hide();
				}).mousemove(function(e) {
					var initL = e.pageX;
					var initT = e.pageY;
					$('.gift-tip-popup').css({
						'left' : initL + 40 + "px",
						'top' : initT - 120 + "px"
					});
				})
			}

			/** 切换礼物 */
			var currentIndex = 0;
			var len = $(".xGiftList li").length;
			$(".giftHeader span").click(function() {
				$("#stdSps").hide();
				currentIndex = 0;
				$(this).addClass("haselect");
				$(this).siblings().removeClass("haselect");
				$(".giftLists li").find("div").removeClass("intro");

				$(".giftLists ul").removeClass("xGiftList");
				$("#giftList" + $(this).attr("rel")).addClass("xGiftList");

				UIF.handler.newSendGiftID = "";
				len = $(".xGiftList li").length;
				this.oWidth = len * (Math.ceil($(".xGiftList  li").width()) + 6) + 5;
				this.oWidth = this.oWidth < 384 ? 384 : this.oWidth;
				$(".xGiftList").css({
					"width" : this.oWidth,
					"margin-left" : 0
				});
			});
			/** 礼物选中 */
			$(".visualGiftList").on("mouseover", 'li div', function(ext) {
				var gridimage = $(this).find('img');
				src = gridimage[0].src;
				gridimage.attr("src", src);
			}).on("mousedown", 'li div', function(ext) {
				if ($(this).find('img').attr("types") == "0") {
					$("#giftShapeBtns").show();
				} else {
					$("#sendGiftNum").val(1);
					$("#giftShapeBtns").hide();
				}
				$(this).addClass("intro");
				gridimage = $(this).find('img');
				$(this).parent().siblings().find("div").removeAttr("choose").removeClass("intro");
				UIF.handler.newSendGiftID = $(this).attr('id').replace("gift", "");
			}).on("mouseout", 'li div', function(ext) {
				var gridimage = $(this).find('img');
				if (!gridimage.hasClass("intro")) {
				}
			});
			/** 切换礼物 */
			var maxIndex = 0;
			var viewWidth = 0;
			var marginLeft = 0;
			this.oWidth = len * (Math.ceil($(".xGiftList  li").width()) + 8);
			viewWidth = 6 * ($(".xGiftList  li").width() + 6);
			maxIndex = Math.ceil(len / 6);
			$(".xGiftList").css({
				width : this.oWidth
			});
			$(".giftContents").on("click", ".toRight", function() {
				if (!(len > 6) || (currentIndex - maxIndex) >= -1) {
					return;
				}
				marginLeft = parseInt($(".xGiftList").css('marginLeft'));
				$(".xGiftList").animate({
					"margin-left" : marginLeft - viewWidth
				}, 300);
				currentIndex++;
			})
			$(".giftContents").on("click", ".toLeft", function() {
				if (currentIndex < 1) {
					return;
				}
				marginLeft = parseInt($(".xGiftList").css('marginLeft'));
				$(".xGiftList").animate({
					"margin-left" : marginLeft + viewWidth
				}, 300);
				currentIndex--;
			})

			//record
            /*var _this = this;
			var data = {
				roomNumber : UIF.handler.roomNumber
			}
			$.ajax({
				type : "POST",
				url : "/ajax/getGiftRecord.php",
				data : data,
				cache : false,
				dataType : "json",
				async : false
			}).done(function(datas) {
				if (datas != null && datas.length > 0) {
					$.each(datas, function(k, v) {
						_this.sendRecord(v);
					})
				}

			});*/

		},
		filGift : function(data) {
			swf.fil({
				giftId : data.giftId,
				number : data.number,
				car : 0
			});
		},
		figGift : function(data) {
			var giftName = "";
			var giftShowType = "A"
			if ((data.par != undefined) && (data.par != "")) {
				var showTypeObj = JSON.parse(data.par);
				giftShowType = showTypeObj[data.number];
			}
			var imageName = data.giftId;
			switch (giftShowType) {
			case "A":
				giftName = "giftShape_" + data.number;
				imageName = imageName + ".png";
				break;
			case "B":
				giftName = "giftShape_" + data.number + "_3d";
				imageName = imageName + ".png";
				break;
			case "C":
				giftName = "giftShape_" + data.number + "_puzzle";
				imageName = "big" + imageName + ".swf";
				break;
			}
			swf.fig({
				image : imageName,
				shape : giftName
			});
		},
		customGift : function(data) {
			swf.cus({
				image : data.giftId,
				number : data.number
			});
		},
		sendGift : function(data) {
			var giftNumber = [ 10, 66, 99, 188, 520, 1314 ];
			if ($.inArray(data.number, giftNumber) == -1 && data.giftType == 0) {
				data.giftType = "-1";
			}
			switch (data.giftType) {
				case "1":
					this.filGift(data);
					break;
				case "0":
					this.figGift(data);
					break;
				case "-1":
					this.customGift(data);
					break;
				default:
					break;
			}
			if (data != null && data.par != null && data.par != "") {
				var multys = JSON.parse(data.par);
				if (multys != null && multys["join"] != null) {
					if (data.number >= multys["join"]) {
						this.multyGift(data);
					}
				}
			}
		},
		multyGift : function(data) {
			if (data.sendNum > 0) {
				swf.mul({
					uid : data.uid,
					user : decodeURIComponent(data.user),
					number : data.number,
					sendNum : data.sendNum,
					headImg : UIF.cdn_img + "/" + data.avatar,
					giftImg : data.giftId
				});
			}
		},
		actGift : function(data) {
			swf.act({
				headImg : UIF.cdn_img + "/" + data.himage,
				actlevel : data.actlev
			});
		},
		cohGift : function(data) {
			swf.coh({
				headImg : UIF.cdn_img + "/" + data.himage,
				cohlevel : data.cohlevel,
				anhimg : UIF.cdn_img + "/" + data.anhimg
			});
		},
		speGift : function(data) {
			swf.spe({
				nickname : decodeURIComponent(data.nickname),
				speimg : "/static_data/images_css/upgrades/pic_consumelevel_" + data.splev + ".png"
			});
		},
		enterCar : function(data) {
			if (data.enterCar != null) {
				var enter = jQuery.parseJSON(data.enterCar);
				var carName = "";
				if (enter.carName == undefined || enter.carName == "") {
					carName = "\u8C6A\u8F66";
				} else {
					carName = enter.carName;
				}

				var needAddFlag = "1";
				if (enter.par != null && enter.par != "") {
					var params = JSON.parse(enter.par);
					if (params.flag == "1") {
						needAddFlag = "0";
					}
				}

				if (data.nickname == UIF.currentUserNickname) {
					setTimeout(function() {
						swf.fil({
							giftId : enter.giftId,
							number : enter.number,
							car : 1,
							nickname : decodeURIComponent(data.nickname),
							carName : carName,
							needAddFlag : needAddFlag
						});
					}, 3 * 1000);
				} else {
					swf.fil({
						giftId : enter.giftId,
						number : enter.number,
						car : 1,
						nickname : decodeURIComponent(data.nickname),
						carName : carName,
						needAddFlag : needAddFlag
					});
				}
			}
		},
		interval : false,
		giftQueue : new Array(),
		sendRecord : function(data) {
			if (data == null || data == undefined || data == "") {
				return false;
			}
			data.ctime = Tools.dateFormat(new Date(), "HH:mm");
			/*if (UIF.thisHome === 100000) {
				$.ajax({
					type : "POST",
					url : "/ajax/postGiftRecord.php",
					data : data,
					cache : false,
					dataType : "json",
					async : false,
                    timeout : 2000
				}).done(function(datas) {
					console.log(data);
				});
			}*/
			var base = this;
			var ls = '<span class="gr-ulevel {0}"></span>';
			var path = UIF.cdn_img + "/" + data.samllimg + "?p=0";
			var html = '<li>\
						<div>\
						<span class="gr-time">'
					+ Tools.dateFormat(new Date(), "HH:mm")
					+ '</span>{0}\
						<span class="gr-sender">{1}</span>\
						<span class="gr-song">\u9001</span>{2}\
						<img src="{3}" />\
						<span class="color-green">{4}</span>\
						</div>\
						</li>';
			if (data != null && data.number != "" && data.number > 0) {
				var ns = new Array();
				for (var n = 0; n < data.number; n++) {
					ns.push(n);
				}
				if (data.number > 300) {
					var $ns = new Array();
					$ns = ns.slice(0, 150);
					for (var n = data.number - 150; n < data.number; n++) {
						$ns.push(n);
					}
					ns = $ns;
				}
				var $p = "";
				$n = "";
				$h = "";
				for (var i = 0; i < ns.length; i++) {
					$p = Tools.stringFormat(path, data.giftId);
					$n = data.number == 1 ? "" : "X" + (ns[i] + 1);
					var $t = "";
					$touser = "";
					if (data.spender != null && data.spender != "" && data.spender.indexOf("pic_consumelevel_0") < 0) {
						$t += Tools.stringFormat(ls, data.spender);
					}
					if (data.guards != null && data.guards != "")
						$t += Tools.stringFormat(ls, data.guards);
					if (data.toUserName != null && data.toUserName != "")
						$touser += data.toUserName;
					$h = Tools.stringFormat(html, $t, decodeURIComponent(data.user), decodeURIComponent($touser), $p, $n);
					base.giftQueue.push($h);
				}
				var sh;
				if (!base.interval) {
					sh = setInterval(as, 50);
					base.interval = true;
				}
				function as() {
					var hs = base.giftQueue[0];
					base.giftQueue.splice(0, 1);
					$("#movelist1").append(hs);
					try {
						$("#nano-sendGiftList").nanoScroller();
						$("#nano-sendGiftList").nanoScroller({
							scroll : 'bottom'
						});
					} catch (e) {
						UIF.handler.weblog(e);
					}
					var tmpli = $("#movelist1 li").length;
					if (tmpli > 50) {
						$("#movelist1 li:lt(" + (tmpli - 50) + ")").remove();
					}
					if (base.giftQueue.length == 0) {
						clearInterval(sh);
						base.interval = false;
					}
				}
			}
		}
	}
})