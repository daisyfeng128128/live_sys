define(function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        IO = require("IO"),
        Dialog = require("DIALOG"),
        Drag = require("DRAG"),
        Widgets = require("WIDGETS"),
        Share = require("SHARE"),
        Card = require("CARD"),
        Login = require("LOGIN"),
        Status = require("STATUS"),
        Emoticon = require("EMOTICON"),
        XmClass = require("XM"),
        drawProgress = require("DRAWPROGRESS"),
        ZIndexManager = require("room/js/app/z_index_manager.js"),
        AppSong = require("room/js/song/app.js"),
        AppMulti = require("room/js/multi/app.js"),
        appVote = require("room/js/vote/vote.js"),
        tCard = require("TCARD"),
        imNotice = require("IMNOTICE"),
        userGift = require("room/js/gifteachv2/control.js"),
        mobileBind = require("user/js/controls/mobile_option.js"),
        regDialog = require("user/js/controls/dialog_follow_list.js"),
        AnchorMicroNotice = require("room/js/tv/anchor_notice.js"),
        Main = {},
        MODULES = {},
        Cache = {
            DDS: window.DDS
        },
        config = Cache.DDS.config.models,
        userEach = null,
        _isBefore = [],
        _others = [];
    for (var i = 0, len = config.length; i < len; i++) config[i].isBefore ? _isBefore.push(config[i]) : _others.push(config[i]);

    function loadModules(data) {
        var control = require(data.depend.controls),
            view = null;
        if (control == null) return;
        if (data.depend.views) var view = require(data.depend.views);
        var params = data.data || {};
        data.isExtra && (params = $.extend({}, params, loadExtra(data.name))), params.socket = Cache.socket ? Cache.socket : null, params.container = $(data.container), view != null && (params.views = view);
        var objects = new control(params);
        return objects.init(), objects
    }
    function getHornData() {
        var arr = [];
        if (Cache.DDS.config.roomType == "livehouse") arr = [{
            name: "金喇叭",
            type: 0,
            num: 0,
            gid: "",
            price: 2e3
        }];
        else {
            arr = [{
                name: "金喇叭",
                type: 0,
                num: 0,
                gid: "",
                price: 2e3
            }, {
                name: "全站喇叭",
                price: 5e4,
                num: 0,
                gid: "",
                type: 1
            }];
            if (Cache.DDS.config.packGoods) {
                var temp = Cache.DDS.config.packGoods;
                for (var i = 0; i < temp.length; i++) temp[i].product && (temp[i].product.typeid == "horn" ? (arr[0].num = temp[i].count, arr[0].gid = temp[i].gid) : temp[i].product.typeid == "ghorn" && (arr[1].num = temp[i].count, arr[1].gid = temp[i].gid))
            }
        }
        return arr
    }
    function loadExtra(name) {
        if (name == "horn") return {
            gold_show_con: $(".MR-video"),
            site_show_con: $("#LF-stager"),
            sendHornCallback: function(price) {
                MODULES.my.reduceBalance(price)
            },
            initData: getHornData(),
            packageSuccessCall: function(gid, num) {
                if (MODULES.packages) {
                    var lis = MODULES.packages.wrap.find(".goods");
                    lis.each(function() {
                        $(this).attr("data-gid") == gid && MODULES.packages.successCall($(this), num)
                    })
                }
            }
        };
        if (name == "bonus") return {
            getMoneyCallback: function(price) {
                MODULES.my.addBalance(price)
            }
        };
        if (name == "gift") return {
            Ele_charm: $(".MR-about .star"),
            sendGiftCallback: function(price) {
                MODULES.my.reduceBalance(price)
            }
        };
        if (name == "online") return {
            openDialogCallback: function(ele, panel) {
                Cache.Fx.nav.bgLeftMove(ele, panel)
            },
            closeDialogCallback: function() {
                Cache.Fx.nav.bgRightMove()
            },
            persons: MODULES.count.onlinenum
        };
        if (name == "square") return {
            openDialogCallback: function(ele, panel) {
                Cache.Fx.nav.bgLeftMove(ele, panel)
            },
            closeDialogCallback: function() {
                Cache.Fx.nav.bgRightMove()
            }
        };
        if (name == "appSong") return {
            reduceBalance: function(price) {
                MODULES.my.reduceBalance(price)
            }
        };
        if (name == "guard") return {
            enoughBalance: function(price) {
                return MODULES.my.enoughBalance(price)
            },
            reduceBalance: function(price) {
                MODULES.my.reduceBalance(price)
            }
        };
        if (name == "appVote") return {
            reduceBalance: function(price) {
                MODULES.my.reduceBalance(price)
            },
            enoughBalance: function(price) {
                return MODULES.my.enoughBalance(price)
            }
        };
        if (name == "communityPanel") return {
            my: MODULES.my
        };
        if (name == "packages") return {
            depend: {
                horn: MODULES.horn,
                ghorn: MODULES.horn,
                song: MODULES.appSong
            },
            goods: Cache.DDS.config.packGoods
        };
        if (name == "sofa") return {
            sendChatMsg: function(args) {
                MODULES.msg.sofaMsg(args)
            },
            my: MODULES.my
        };
        if (name == "giftLink") return {
            reduceBalance: function(price) {
                MODULES.my.reduceBalance(price)
            }
        }
    }
    function loadMore(arr) {
        for (var j = 0, ln = arr.length; j < ln; j++) MODULES[arr[j].name] = loadModules(arr[j])
    }
    Cache.ele = {
        nav: $("#LF-nav"),
        navLi: $("#LF-nav-fg .had-dialog"),
        navPanel: $("#LF-nav-bg .nav-panel"),
        navFg: $("#LF-nav-fg"),
        navBg: $("#LF-nav-bg"),
        linkList: $("#LF-nav-link li"),
        stager: $("#LF-stager")
    }, Cache.Fx = {
        nav: {
            navShow: function() {
                Cache.ele.nav.animate({
                    left: 0
                }, 300, "swing", function() {
                    MODULES && MODULES.berth && MODULES.berth.panel.animate({
                        left: -246
                    }, 300, "swing")
                })
            },
            stagerCenter: function() {
                var _left = 70,
                    _width = $(window).width() - _left,
                    _stager_width = Cache.ele.stager.width();
                _width > _stager_width && (_left += (_width - _stager_width) / 2), Cache.ele.stager.css({
                    "margin-left": _left
                })
            },
            bgLeftMove: function(ele, panel) {
                if (ele.hasClass("on")) return;
                Cache.Fx.nav.setEleOn(ele, panel);
                if (Cache.ele.navBg.hasClass("bg-show")) return;
                Cache.ele.navBg.css({
                    opacity: 0,
                    display: "block"
                }).animate({
                    left: 70,
                    opacity: 1
                }, 400, "swing", function() {
                    $(this).addClass("bg-show")
                })
            },
            bgRightMove: function() {
                Cache.ele.navBg.animate({
                    left: -190,
                    opacity: 0
                }, 400, "swing", function() {
                    $(this).hide(), $(this).removeClass("bg-show"), Cache.Fx.nav.setEleOn()
                })
            },
            setEleOn: function(ele, panel) {
                Cache.ele.navLi.removeClass("on"), Cache.ele.navPanel.hide(), typeof ele != "undefined" && typeof panel != "undefined" && (ele.addClass("on"), panel.show())
            }
        }
    }, Cache.events = {
        navEvent: function() {
            var _timer = null;
            Cache.ele.linkList.hover(function() {
                var _this = $(this);
                _timer = setTimeout(function() {
                    Util.browser.lte8 && (_this.find("dt").hide(), _this.find(".ICON-nav-help").hide()), _this.find(".info").css({
                        opacity: 0,
                        display: "block"
                    }).animate({
                        opacity: 1,
                        top: 0
                    }, 300, "swing")
                }, 300)
            }, function() {
                clearTimeout(_timer), Util.browser.lte8 && ($(this).find("dt").show(), $(this).find(".ICON-nav-help").show()), $(this).find(".info").css({
                    opacity: 0,
                    display: "block"
                }).animate({
                    opacity: 0,
                    top: 40
                }, 300, "swing", function() {
                    $(this).hide()
                })
            }), $(window).on("click", function() {
                Cache.Fx.nav.bgRightMove()
            }), Cache.ele.nav.on("click", function(e) {
                e.stopPropagation()
            })
        }
    }, Cache.events.navEvent();

    function loadApp() {
        var zIndexManager = (new ZIndexManager).init(),
            appManager = MODULES.appManager;
        $.each(["appSong", "appMulti", "appVote"], function() {
            var app = MODULES[this];
            app && (app._zIndexManager = zIndexManager, appManager.addApp(app))
        })
    }
    function loadNotice() {
        imNotice.imNotice({
            noticeArea: "#LF-toggle-news",
            msgArea: "#LF-nav",
            type: "room",
            listArea: "#LF-panel-news",
            openListCallback: function(ele, panel) {
                Cache.Fx.nav.bgLeftMove(ele, panel)
            },
            closeListCallback: function() {
                Cache.Fx.nav.bgRightMove()
            }
        }).init()
    }
    function loadTopCard() {
        tCard.tCard({
            container: "#M-user-name-hook"
        }).init()
    }
    function loadUserSendGift() {
        $(document.body).on("click", ".M-send-user-gift", function() {
            var _id = $(this).attr("data-id"),
                _name = $(this).attr("data-name"),
                _faceUrl = $(this).attr("data-faceUrl");
            _userLevel = $(this).attr("data-level"), userEach == null ? userEach = new userGift({
                touser: {
                    userid: _id,
                    username: _name,
                    faceUrl: _faceUrl,
                    userLevel: _userLevel
                },
                socket: Cache.socket,
                sendGiftCallback: function(price) {
                    MODULES.my.reduceBalance(price)
                },
                data: DDS
            }) : userEach.openWin({
                touser: {
                    userid: _id,
                    username: _name,
                    faceUrl: _faceUrl,
                    userLevel: _userLevel
                },
                data: DDS
            })
        })
    }
    function imCommand(option, codes) {
        $.each(codes, function(e) {
            codes[e] == 250 && $.extend(option, {
                identity: "1"
            })
        })
    }
    function loadMobileBindDialog() {
        var skip = !! Cache.DDS.config.roomType || Cache.DDS.userInfo.mBindSkip;
        if (skip) return !1;
        var obj = new mobileBind.dialogMobileOptionClient;
        obj.onSkip = function() {
            regDialog.dialogFollowList().init()
        }, obj.init()
    }
    function loadAnchorNotice() {
        var notice = (new AnchorMicroNotice({
            container: ".MR-video",
            anchor: !1
        })).init();
        MODULES.anchorMicroNotice = notice
    }
    Main.socket = function() {
        $.ajax({
            url: Cache.DDS.baseInfo.host + "/" + Cache.DDS.baseInfo.roomId,
            type: "GET",
            dataType: "jsonp",
            cache: !1,
            success: function(data) {
                if (data && data.host) {
                    var host = data.host;
                    typeof window.GOLBALPARAMS == "undefined" && (window.GOLBALPARAMS = {}), window.GOLBALPARAMS.ROOMPORT = host, Util.setCookie("nck", encodeURIComponent(window.DDS.baseInfo.token), "", "/", "laifeng.com"), Cache.socket = IO.connect(host), Main.dealLoad()
                } else Dialog.alert("服务器异常，请刷新重试。")
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                Dialog.alert("服务器异常，请刷新重试。")
            }
        })
    }, window.HAD_CONNECT_TOGGLE = !1, window.HAD_VERIFY_TOGGLE = !1, Main.listener = function() {
        loadMore(_isBefore);
        if (Cache.DDS.userInfo.isKickOut == "1" || Cache.DDS.userInfo.isRoomKickOut == "1") return Status.kickConnect(Cache.DDS.userInfo.isRoomKickOutMsg), !1;
        Main.socket()
    }, Main.dealLoad = function() {
        var socket = Cache.socket;
        if (socket == null) return;
        var _isPushHis = Cache.DDS.baseInfo.isShowing ? "1" : "0";
        socket.on("connect", function(args) {
            var _cps = Util.getCookie("premium_cps") ? "ct_" + Util.getCookie("premium_cps") : "ct_",
                _yktk = Util.getCookie("yktk") ? Util.getCookie("yktk") : "",
                socketOption = {
                    token: Cache.DDS.baseInfo.token,
                    uid: Cache.DDS.userInfo.userId,
                    roomid: Cache.DDS.baseInfo.roomId,
                    isPushHis: _isPushHis,
                    yktk: _yktk,
                    endpointtype: _cps + ",dt_1__" + (new Date).getTime()
                },
                hash = window.location.hash.replace("#", "");
            /lt/.test(hash) && (hash = hash.replace("lt", "").split(","), imCommand(socketOption, hash)), socket.emit("enter", socketOption);
            if (window.HAD_CONNECT_TOGGLE) return;
            window.HAD_CONNECT_TOGGLE = !0, loadMore(_others), Cache.DDS.config.roomType != "livehouse" && setTimeout(function() {
                Cache.Fx.nav.navShow()
            }, 400), loadApp(), loadNotice(), loadTopCard(), loadMobileBindDialog(), loadUserSendGift(), loadAnchorNotice(), typeof window.DDS_INTERFACE_SOCKET == "undefined" && (window.DDS_INTERFACE_SOCKET = Cache.socket), socket.emit("vipuserlist", {
                batch: 0,
                roomid: window.DDS.baseInfo.roomId
            });
            var im = require("CONTROLS_SOCKET");
            (new im({
                socket: socket,
                data: Cache.DDS,
                models: MODULES
            })).init(), window.INFO.isLogin && $.ajax({
                type: "GET",
                url: "/room/" + window.DDS.baseInfo.roomId + "/enter",
                cache: !1
            }), $(window).on("resize", function() {
                reSizeDpi(), Cache.Fx.nav.stagerCenter()
            })
        }), socket.on("result", function(args) {
            args.code == 0 ? Dialog.alert(args.msg, function() {
                Util.delCookie("xk", "/", window.location.host.split(":")[0].replace("www.", "")), location.href = location.href
            }, !0) : window.HAD_VERIFY_TOGGLE = !0
        })
    };
    var _body = $(document.body);

    function reSizeDpi() {
        var _width = $(window).width();
        _width <= 1360 && !_body.hasClass("dpi1280") ? _body[0].className = "dpi1280" : _width >= 1600 && !_body.hasClass("dpi1600") ? _body[0].className = "dpi1600" : _width > 1360 && _width < 1600 && (_body.hasClass("dpi1280") || _body.hasClass("dpi1600")) && (_body[0].className = "")
    }
    exports.init = function() {
        Cache.ele.stager.show(), reSizeDpi(), Cache.Fx.nav.stagerCenter(), Main.listener(), Util.browser.IE6 && Status.saybyeie6()
    }
})/**
 * Created by Administrator on 2016/4/19.
 */
