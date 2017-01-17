define(function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        Scroll = require("SCROLL"),
        Status = require("STATUS"),
        Dialog = require("DIALOG"),
        _default_text = {
            textarea: null,
            tips: "请输入...",
            maxFontNum: 30,
            rightTips: "还能输入",
            wrongTips: "已经超过",
            repairTips: "字",
            Ele_max_font: null,
            isStr: !0,
            isNull: !1,
            callback: function() {}
        },
        Text = function(options) {
            var setting = $.extend({}, _default_text, options);
            for (var name in setting) this[name] = setting[name]
        };
    Text.prototype = {
        init: function() {
            if (this.textarea == null) return !1;
            this.addEvent()
        },
        addEvent: function() {
            var _this = this;
            this.textarea.bind("focus", function() {
                var value = $.trim(this.value);
                value === _this.tips && (this.value = "", $(this).addClass("txt-focus"))
            }).bind("blur", function() {
                var value = $.trim(this.value);
                value === "" || value === _this.tips ? (this.value = _this.tips, $(this).removeClass("txt-focus")) : _this.checkComment()
            }).bind("keypress", function(e) {
                e.keyCode == 13 && _this.callback()
            }).bind("keyup", function() {
                _this.checkComment()
            }).bind("keydown", function(e) {
                e.stopPropagation()
            })
        },
        checkComment: function() {
            var value = $.trim(this.textarea.val());
            value == this.tips && !this.isNull && (value = "");
            var len = Util.strLen(value) / 2;
            this.isStr || (len = value.length);
            var count = this.maxFontNum - Math.ceil(len);
            count = Math.abs(count), len <= this.maxFontNum ? (this.Ele_max_font.removeClass("txt-error"), this.Ele_max_font.html(this.rightTips + count + this.repairTips), this.textarea.data("error", 0)) : (this.textarea.data("error", 1), this.Ele_max_font.addClass("txt-error"), this.Ele_max_font.html(this.wrongTips + count + this.repairTips))
        },
        clearText: function() {
            this.textarea.val(this.tips), this.textarea.data("error", 0), this.textarea.removeClass("txt-focus"), this.Ele_max_font.html(this.rightTips + this.maxFontNum + this.repairTips), this.Ele_max_font.removeClass("txt-error")
        },
        noText: function() {
            this.textarea.val(""), this.textarea.data("error", 0), this.textarea.addClass("txt-focus"), this.Ele_max_font.html(this.rightTips + this.maxFontNum + this.repairTips), this.Ele_max_font.removeClass("txt-error")
        },
        verify: function() {
            var value = $.trim(this.textarea.val());
            return !!this.isNull || value !== "" && value !== this.tips ? this.textarea.data("error") && this.textarea.data("error") == 1 ? "内容不能超过" + this.maxFontNum + "个字！" : null : "内容不能为空！"
        },
        isEmpty: function() {
            var value = this.val();
            return value == "" || value == this.tips ? !0 : !1
        },
        val: function() {
            return $.trim(this.textarea.val())
        },
        getValue: function() {
            var r = $.trim(this.textarea.val());
            return r == this.tips ? "" : r
        },
        setVal: function(value) {
            value !== "" && value !== this.tips && (this.textarea.val(value), this.textarea.addClass("txt-focus"), this.checkComment())
        }
    }, exports.Text = function(options) {
        return new Text(options)
    };
    var ScrollBoard = function(options) {
        var setting = $.extend({}, {
            container: null,
            initHeight: "auto",
            skin: "dds-scroll",
            maxMsg: 150,
            lockmaxMsg: 400,
            if_send_gift: !1,
            if_card: !1,
            isGift: !0,
            card: null,
            card_event_source: ".user-name",
            direct: "right",
            if_chat: !0,
            lock_scroll: !1
        }, options);
        for (var name in setting) this[name] = setting[name];
        this.MSG_SUM = 0, this.SCROLL_TOGGLE = !0, this.CARD_LOCK_TOGGLE = !1
    };
    ScrollBoard.prototype = {
        init: function() {
            if (this.container == null) return;
            this.dds = window.DDS || {}, this.dom(), this.initScroll(), this.if_card && this.card != null && this.cardEvent()
        },
        dom: function() {
            this.panel = $('<div class="MR-chat"></div>'), this.boarder = $('<div class="boarder"></div>'), this.uler = $('<ul class="clearfix"></ul>'), this.scroller = $('<div class="scroller"></div>'), this.boarder.append(this.uler), this.panel.append(this.boarder).append(this.scroller), this.container.append(this.panel), this.lock_scroll && (this.Ele_toggle = $('<span class="ICON-lock-screen"></span>'), this.panel.append(this.Ele_toggle), this.Ele_toggle.css({
                display: "none"
            }), this.bindLock())
        },
        initScroll: function() {
            this.scroll = Scroll.scroll({
                Ele_panel: this.uler[0],
                Ele_scroll: this.scroller[0],
                skin: this.skin,
                height: this.initHeight
            }), this.scroll.init()
        },
        addData: function(html) {
            this.uler.append(html), this.MSG_SUM += 1, this.SCROLL_TOGGLE && this.MSG_SUM > this.maxMsg && (this.uler[0].removeChild(this.uler[0].firstChild), this.MSG_SUM -= 1), this.scroll.resetH(), this.SCROLL_TOGGLE && this.scroll.toBottom();
            if (!this.SCROLL_TOGGLE && this.MSG_SUM > this.lockmaxMsg) {
                var _this = this;
                this.uler.find("li").each(function(i) {
                    i < _this.MSG_SUM - 10 && $(this).remove()
                }), this.MSG_SUM = 10, this.scroll.resetH(), this.scroll.toBottom()
            }
            Util.browser.lte8 && (this.uler.css({
                visibility: "hidden"
            }), this.uler.css({
                visibility: "visible"
            }))
        },
        isAnchor: function(id) {
            return id == this.dds.anchorInfo.anchorId ? !0 : !1
        },
        cardEvent: function() {
            var _this = this;
            this.uler.on("click", this.card_event_source, function() {
                var _objs = $(this);
                if (!_objs.attr("data-id")) return !1;
                var _ids = _objs.attr("data-id"),
                    _name = "card_speak_" + _ids,
                    _is_gift = _this.dds.config.roomType != "livehouse" && !_this.isAnchor(_this.dds.userInfo.userId) ? !0 : !1;
                _this.dds.userInfo.userId == _ids && (_is_gift = !1), _this.isGift || (_is_gift = !1);
                if (window[_name] && window[_name].TOGGLE) return window[_name].reShow(_objs), !1;
                var _type = _this.isAnchor(_ids) ? "anchor" : "user",
                    _roomId = _this.isAnchor(_ids) ? "" : _this.dds.baseInfo.roomId,
                    _if_chat = _this.isAnchor(_this.dds.userInfo.userId) ? !1 : !0;
                _this.if_chat || (_if_chat = _this.if_chat), window[_name] = new _this.card({
                    Ele_source: _objs,
                    userId: _ids,
                    direct: _this.direct,
                    roomId: _roomId,
                    isGift: _is_gift,
                    type: _type,
                    if_chat: _if_chat,
                    if_attr: _if_chat
                }), _this.SCROLL_TOGGLE && (_this.CARD_LOCK_TOGGLE = !0, _this.SCROLL_TOGGLE = !1, _this.Ele_toggle[0].className = "ICON-scroll-screen"), window[_name].onHide = function() {
                    window[_name].destroy(), _this.CARD_LOCK_TOGGLE && (_this.SCROLL_TOGGLE = !0, _this.CARD_LOCK_TOGGLE = !1, _this.Ele_toggle[0].className = "ICON-lock-screen", _this.scroll.resetH(), _this.scroll.toBottom())
                }, window[_name].create()
            }), this.uler.on("mouseover", this.card_event_source, function() {
                var _objs = $(this);
                if (!_objs.attr("data-id")) return !1;
                var _ids = _objs.attr("data-id"),
                    _name = "card_speak_" + _ids;
                window[_name] && window[_name].TOGGLE && clearTimeout(window[_name].timer_hide)
            }), this.uler.on("mouseout", this.card_event_source, function() {
                var _objs = $(this);
                if (!_objs.attr("data-id")) return !1;
                var _ids = _objs.attr("data-id"),
                    _name = "card_speak_" + _ids;
                window[_name] && window[_name].hide()
            })
        },
        bindLock: function() {
            var _this = this,
                _timer = null;
            this.panel.hover(function() {
                _timer = setTimeout(function() {
                    _this.Ele_toggle.css({
                        display: "block"
                    })
                }, 200)
            }, function() {
                clearTimeout(_timer), _this.Ele_toggle.css({
                    display: "none"
                })
            }), this.Ele_toggle.on("click", function() {
                return $(this).hasClass("ICON-lock-screen") ? (this.className = "ICON-scroll-screen", _this.SCROLL_TOGGLE = !1) : (this.className = "ICON-lock-screen", _this.SCROLL_TOGGLE = !0, _this.scroll.toBottom()), !1
            })
        }
    }, exports.ScrollBoard = function(options) {
        return new ScrollBoard(options)
    };
    var Progress = function(options) {
        var setting = $.extend({}, {
            container: null,
            title: "",
            has_num: 0,
            sum_num: 0,
            level: 1
        }, options);
        for (var name in setting) this[name] = setting[name]
    };
    Progress.prototype = {
        init: function() {
            this.createDom(), this.setParams()
        },
        createDom: function() {
            this.Ele_prog_panel = $('<div class="M-progress"></div>'), this.Ele_slider = $('<div class="slider"></div>'), this.Ele_num_show = $('<div class="num"></div>'), this.Ele_prog_panel.append(this.Ele_slider), this.Ele_prog_panel.append(this.Ele_num_show), this.container.append(this.Ele_prog_panel)
        },
        setParams: function() {
            this.prog_width = this.Ele_prog_panel.width()
        },
        changeSilder: function(callback) {
            this.has_num = Math.abs(this.has_num);
            var _width = this.has_num < this.sum_num ? Math.ceil(this.has_num / this.sum_num * this.prog_width) : this.prog_width;
            this.Ele_slider.css({
                width: _width
            }), typeof callback == "function" && callback()
        },
        levelProg: function(args, callback) {
            var _this = this;
            if (args.hasbeans < this.has_num && args.level <= this.level) return;
            this.has_num = args.hasbeans, this.sum_num = args.hasbeans + args.needbeans, this.level = args.level;
            var mark = parseInt(args.level) + 1;
            this.changeSilder(function() {
                typeof callback == "function" ? callback(args.needbeans) : _this.Ele_num_show.html("差" + args.needbeans + "星豆升级")
            })
        },
        fansProg: function(num, callback) {
            var _this = this;
            this.has_num = num;
            var params = this.getFansSum(num);
            this.sum_num = params.sum;
            var mark = params.mark;
            this.changeSilder(function() {
                _this.createFansMark ? _this.container.find(".ICON-fans-mark")[0].className = "ICON-fans-mark ICON-fm-" + mark : (_this.container.append('<span class="ICON-fans-mark ICON-fm-' + mark + '"></span>'), _this.createFansMark = !0);
                var _sum = _this.sum_num > 1e4 ? Util.toUnits(_this.sum_num) : _this.sum_num,
                    _hasSum = _this.has_num > 1e4 ? Util.toUnits(_this.has_num) : _this.has_num;
                _this.Ele_num_show.html("粉丝:" + _hasSum + "/" + _sum)
            });
            var _now_mark = params.mark - 1 == -1 ? 10 : params.mark - 1;
            typeof callback == "function" && callback(_now_mark)
        },
        getFansSum: function(num) {
            return Util.getFansSum(num)
        }
    }, exports.Progress = function(options) {
        return new Progress(options)
    };
    var Attention = function(options) {
        var setting = $.extend({}, {
            container: null,
            defaultState: !1,
            anchorId: "",
            isSocket: !1,
            socket: null,
            hasTitle: !1,
            model: 1,
            callback: function() {}
        }, options);
        for (var name in setting) this[name] = setting[name]
    };
    Attention.prototype = {
        init: function() {
            if (this.container == null) return !1;
            this.dom(), this.addEvent()
        },
        dom: function() {
            var _html = this.defaultState ? this.cancelDom() : this.attentionDom();
            this.model == 2 && this.defaultState && (_html = this.cancelDom2()), this.container.append(_html)
        },
        attentionDom: function() {
            var str = this.hasTitle ? 'title="关注"' : "";
            return '<a class="BTN-add-attention" href="javascript:void(0)" ' + str + ">+关注</a>"
        },
        cancelDom: function() {
            var str = this.hasTitle ? 'title="取消关注"' : "";
            return '<span class="has">已关注</span><span class="line">|</span><a href="javascript:void(0)" class="cancel"  ' + str + ">取消关注</a>"
        },
        cancelDom2: function() {
            var str = this.hasTitle ? 'title="取消关注"' : "";
            return '<a class="BTN-has-attention" href="javascript:void(0)" ' + str + ">已关注</a>"
        },
        httpAttentionPost: function(_btn) {
            var _this = this;
            Util.post("http://v.laifeng.com/attention/do", {
                anchorId: _this.anchorId
            }, function(data) {
                var _html = _this.cancelDom2();
                _this.container.html(_html), _this.callback(1)
            }, function() {
                _btn.removeClass("disable")
            }, function(code) {
                Status.ajaxError(code)
            })
        },
        socketAttentionPost: function(_btn) {
            var _this = this;
            Util.socketRequest({
                socket: this.socket,
                methodName: "Attention",
                upData: {
                    ai: _this.anchorId
                },
                downCallBack: function(data) {
                    if (data.cd == 0) {
                        var _html = _this.cancelDom2();
                        _this.container.html(_html), _this.callback(1)
                    } else Status.ajaxError(data.cd)
                }
            }), _btn.removeClass("disable")
        },
        httpUnAttentionPost: function(_btn) {
            var _this = this;
            Dialog.confirm("取消关注播客，您在播客的小社团活跃值将全部清空，确定这么做吗", function(flag) {
                flag ? Util.post("http://v.laifeng.com/attention/cancel_mine", {
                    anchorId: _this.anchorId
                }, function(d) {
                    _this.container.html(_this.attentionDom()), _this.callback(-1)
                }, function() {
                    _btn.removeClass("disable")
                }, function(code) {
                    Status.ajaxError(code)
                }) : _btn.removeClass("disable")
            })
        },
        socketUnAttentionPost: function(_btn) {
            var _this = this;
            Dialog.confirm("取消关注播客，您在播客的小社团活跃值将全部清空，确定这么做吗", function(flag) {
                flag && Util.socketRequest({
                    socket: _this.socket,
                    methodName: "UnAttention",
                    upData: {
                        ai: _this.anchorId
                    },
                    downCallBack: function(data) {
                        data.cd == 0 ? (_this.container.html(_this.attentionDom()), _this.callback(1)) : Status.ajaxError(data.cd)
                    }
                }), _btn.removeClass("disable")
            })
        },
        addEvent: function() {
            var _this = this;
            this.container.on("click", ".BTN-add-attention", function() {
                var _btn = $(this);
                if (_btn.hasClass("disable")) return !1;
                _btn.addClass("disable"), _this.isSocket && _this.socket != null ? _this.socketAttentionPost(_btn) : _this.httpAttentionPost(_btn)
            }), this.container.on("click", ".BTN-has-attention", function() {
                var _btn = $(this);
                if (_btn.hasClass("disable")) return !1;
                _btn.addClass("disable"), _this.isSocket && _this.socket != null ? _this.socketUnAttentionPost(_btn) : _this.httpUnAttentionPost(_btn)
            }), this.container.on("mouseover", ".BTN-has-attention", function() {
                $(this).html("取消关注")
            }), this.container.on("mouseout", ".BTN-has-attention", function() {
                $(this).html("已关注")
            })
        }
    }, exports.Attention = function(options) {
        return new Attention(options)
    };
    var arrowScroll = function(options) {
        var setting = $.extend({}, {
            container: null,
            direct: "x",
            content: "",
            width: "auto",
            content_width: "auto",
            begin_left: 0
        }, options);
        for (var name in setting) this[name] = setting[name]
    };
    arrowScroll.prototype = {
        init: function() {
            if (this.container == null) return !1;
            this.dom(), this.setArrow(), this.addEvent()
        },
        setArrow: function(isResize) {
            isResize && (this.leftArrow.show(), this.rightArrow.show()), this.content_width <= this.width ? (this.leftArrow.hide(), this.rightArrow.hide()) : this.begin_left == 0 ? this.leftArrow.hide() : this.begin_left + this.width == this.content_width && this.rightArrow.hide(), this.con.scrollLeft(this.begin_left)
        },
        dom: function() {
            this.panel = $('<div class="M-arrow-scroll"></div>'), this.leftArrow = $('<span class="left-arrow"></span>'), this.rightArrow = $('<span class="right-arrow"></span>'), this.con = $('<div class="con"></div>'), this.scroller = $('<div class="scroll"></div>'), this.panel.append(this.leftArrow), this.panel.append(this.rightArrow), this.panel.append(this.con), this.con.css({
                width: this.width
            }), this.con.append(this.scroller), this.scroller.css({
                width: this.content_width
            }), this.scroller.html(this.content), this.container.append(this.panel)
        },
        setPos: function(width) {
            this.content_width = width, this.scroller.css({
                width: this.content_width
            }), this.setArrow()
        },
        resetWidth: function(width, content_width, isResize) {
            this.width = width, this.content_width = content_width, this.con.css({
                width: this.width
            }), this.scroller.css({
                width: this.content_width
            }), this.begin_left = 0, this.setArrow(isResize)
        },
        addEvent: function() {
            var _this = this;
            this.leftArrow.on("click", function() {
                if ($(this).hasClass("on")) return !1;
                $(this).addClass("on");
                var _left = _this.begin_left - _this.width;
                _this.begin_left <= _this.width && (_left = 0), _this.con.stop().animate({
                    scrollLeft: _left
                }, "400", "swing", function() {
                    _this.begin_left = _left, _this.rightArrow.show(), _this.leftArrow.removeClass("on"), _this.begin_left == 0 && _this.leftArrow.hide()
                })
            }), this.rightArrow.on("click", function() {
                if ($(this).hasClass("on")) return !1;
                $(this).addClass("on");
                var _left = _this.begin_left + _this.width;
                _this.begin_left + 2 * _this.width > _this.content_width && (_left = _this.content_width - _this.width), _this.con.stop().animate({
                    scrollLeft: _left
                }, "400", "swing", function() {
                    _this.begin_left = _left, _this.leftArrow.show(), _this.rightArrow.removeClass("on"), _this.begin_left >= _this.content_width - _this.width && _this.rightArrow.hide()
                })
            })
        }
    }, exports.arrowScroll = function(options) {
        return new arrowScroll(options)
    };
    var _default_select = {
            container: null,
            at_user_list: [],
            max_user_num: 50,
            one_select_num: 10,
            callChange: function() {}
        },
        Select = function(options) {
            var setting = $.extend({}, _default_select, options);
            for (var name in setting) this[name] = setting[name];
            return this.MAX_USER_NAME = this.at_user_list.length > 0 ? Util.strLen(this.at_user_list[0].name) : 0, this
        };
    Select.prototype = {
        init: function() {
            return this.dom(), this.addEvent(), this
        },
        dom: function() {
            this.Ele_selected = $("<span></span>"), this.Ele_arrows = $("<cite></cite>"), this.Ele_line = $('<div class="clear-line"></div>'), this.Ele_items = $('<div class="so-list"></div>');
            var len = this.at_user_list.length;
            len > 0 && (this.Ele_selected.html(this.at_user_list[0].name), this.Ele_selected.data("value", this.at_user_list[0].value), this.Ele_selected.data("index", 0));
            for (var i = 0; i < len; i++) {
                var name = this.at_user_list[i].name;
                this.MAX_USER_NAME < Util.strLen(name) && (this.MAX_USER_NAME = Util.strLen(name)), this.Ele_items.append(this.getItemHtml(name, this.at_user_list[i].value, i))
            }
            this.container.append(this.Ele_selected), this.container.append(this.Ele_arrows), this.container.append(this.Ele_line), this.container.append(this.Ele_items), this.min_width = this.Ele_line.width(), this.Ele_items.css({
                width: this.getMaxWidth()
            })
        },
        addEvent: function() {
            var _this = this;
            this.container.hover(function() {
                _this.Ele_arrows.addClass("open-list")
            }, function() {
                _this.Ele_arrows.removeClass("open-list")
            }), this.container.bind("click", function(e) {}), this.Ele_selected.add(this.Ele_arrows).bind("click", function() {
                _this.openSelectList()
            }), $(document).on("click", function(e) {
                _this.container.find(e.target).length == 0 && !$(e.target).is(_this.container) && _this.closeSelectList()
            }), this.Ele_items.delegate("a", "click", function() {
                var name = $(this).html(),
                    value = $(this).attr("data-value"),
                    index = $(this).attr("data-index") ? $(this).attr("data-index") : -1;
                _this.Ele_selected.html(name), _this.Ele_selected.data("value", value), _this.Ele_selected.data("index", index), _this.closeSelectList(), _this.callChange(name, value, index)
            })
        },
        openSelectList: function() {
            this.Ele_selected.data("toggle") && this.Ele_selected.data("toggle") === "true" ? this.closeSelectList() : (Util.browser.lte8 && this.container.css("zIndex", 10), this.Ele_line.show(), this.Ele_items.show(), this.Ele_selected.data("toggle", "true"))
        },
        closeSelectList: function() {
            Util.browser.lte8 && this.container.css("zIndex", 0), this.Ele_line.hide(), this.Ele_items.hide(), this.Ele_selected.data("toggle", "false")
        },
        getItemHtml: function(name, value, i) {
            var _str = "";
            typeof i != "undefined" && (_str = 'data-index="' + i + '"');
            var _html = '<a href="javascript:void(0);" data-value="' + value + '" ' + _str + ">" + name + "</a>";
            return _html
        },
        getMaxWidth: function() {
            var width = this.MAX_USER_NAME * 6 + 20;
            return width <= this.min_width ? this.min_width : width
        },
        changeSelect: function(name, value, indexs) {
            value === window.DDS.anchorInfo.anchorId ? this.Ele_selected.html("播客") : this.Ele_selected.html(name), this.Ele_selected.data("value", value), typeof indexs != "undefined" && this.Ele_selected.data("index", indexs), this.callChange(name, value, indexs)
        },
        clearSelect: function() {
            this.changeSelect(this.at_user_list[0].name, this.at_user_list[0].value, 0)
        },
        addSelectList: function(name, value) {
            if (Util.indexOf(this.at_user_list, value, "value") != -1) return;
            this.at_user_list.push({
                name: name,
                value: value
            });
            var len = this.at_user_list.length,
                alist = this.Ele_items.find("a");
            if (this.max_user_num < len) {
                var arr = this.at_user_list;
                this.at_user_list = arr.slice(0, 2).concat(arr.slice(3, len)), this.Ele_items.remove(alist.eq(len - 1))
            }
            var objects = $(this.getItemHtml(name, value));
            objects.insertAfter(alist.eq(1)), len > this.one_select_num && this.Ele_items.css({
                height: this.one_select_num * 24
            });
            var ln = Util.strLen(name);
            ln > this.MAX_USER_NAME && (this.MAX_USER_NAME = ln, this.Ele_items.css({
                width: this.getMaxWidth()
            }))
        },
        val: function() {
            if (!this.at_user_list[0]) return -1;
            var _target_id = this.at_user_list[0].value,
                _target_name = this.at_user_list[0].name;
            return this.Ele_selected.data("value") && (_target_id = this.Ele_selected.data("value"), _target_name = this.Ele_selected.html()), {
                name: _target_name,
                value: _target_id
            }
        },
        setVal: function(value) {
            var options = this.Ele_items.find("a"),
                res = null;
            return options.each(function() {
                var node = $(this);
                if (node.attr("data-value") == value) return res = {
                    index: node.attr("data-index"),
                    name: node.html(),
                    value: value
                }, !1
            }), res ? (this.Ele_selected.html(res.name), this.Ele_selected.data("value", res.value), this.Ele_selected.data("index", res.index), this.callChange(res.name, res.value, res.index), this) : -1
        }
    }, exports.Select = function(options) {
        return new Select(options)
    };
    var BtnDefault = {
            ready: "ready",
            disabled: "disabled",
            loading: "loading"
        },
        BTN = function(node, options) {
            return this.DOM = {
                node: $(node)
            }, this._statusClassNode = this.DOM.node, this._statusClass = {
                ready: options.ready,
                disabled: options.disabled,
                loading: options.loading
            }, this._status = "", this.isReady = !1, this._addDisable = !1, this
        };
    BTN.prototype = {
        init: function(statusName) {
            var _this = this,
                statusName = statusName || "ready";
            if (this.DOM.node.length === 0) return !1;
            if (this.DOM.node[0].nodeName.toLowerCase() === "button" || this.DOM.node[0].nodeName.toLowerCase() === "input") this._addDisable = !0;
            return this._statusClassString = function() {
                var statusClassString = "";
                return $.each(_this._statusClass, function() {
                    statusClassString += " " + this
                }), $.trim(statusClassString)
            }(), $.each(this._statusClass, function(k) {
                _this["to" + k] = function() {
                    return _this.toStatus(k)
                }
            }), this["to" + statusName](), this
        },
        toStatus: function(statusName) {
            var node = this._statusClassNode;
            return node.hasClass(statusName) ? this : (this._addDisable && (this._status === "disabled" && node.removeAttr("disabled"), statusName === "disabled" && node.attr("disabled", "disabled")), node.removeClass(this._statusClassString), node.addClass(this._statusClass[statusName]), this._status = statusName, this)
        },
        show: function() {
            var node = this._statusClassNode;
            return node.css("display", "block"), this
        },
        hide: function() {
            var node = this._statusClassNode;
            return node.css("display", "none"), this
        }
    }, exports.Btn = function(node, options) {
        return options = $.extend({}, BtnDefault, options), new BTN(node, options)
    }
})