/*create 11 16 14:53*/
define(function(require, exports, module) {
    var cons = require("cons");
    var Tools = require('./anchor-tools');
    var Face = require('./anchor-face');
    var screen = require('flyScreen');
    var toproom = require('toproom');

    module.exports = {
        /** 发送内容 */
        init : function() {
            $('#msgContent').keypress(function(e) {
                if (e.which == 13) {
                    e.preventDefault();
                    if (!$("#sendChatBtn").attr('disabled') && $("#sendChatBtn").is(":visible")) {
                        $("#sendChatBtn").click();
                    }
                }
            })
            $(".msgContent").focus(function(){
                $(".cf-inputs").css({"border":"1px solid #7cbcf4","box-shadow":"1px 1px 1px #bed4e7 inset"});
            });
            $(".msgContent").blur(function(){
                $(".cf-inputs").css("border","1px solid #c9c7ca");
            });
            /** 聊天 */
            $("#sendChatBtn").click(function() {
                if (!UIF.handler.login) {
                    UIF.handler.loging();
                    return;
                }
                var clealMsg = false;
                var msg = $("#msgContent").val();
                if (msg == "") {
                    try {
                        $("#msgContent").focusInput();
                        $("#msgContent").focus();
                    } catch (e) {
                    }
                    return;
                }
                if (msg.length > 50) {
                    Tools.dialog("您的聊天内容过长，请确保不超过15个汉字!");
                }
                var headimg = UIF.handler.cache.get(cons.USER_HEADIMAG);
                switch (UIF.handler.sendTsg) {
                    case "ALL":
                        var btime;
                        var roles = UIF.handler.cache.get(cons.USER_HEADROLES);
                        var head = UIF.handler.cache.get(cons.USER_HEADINFOS);
                        var stime = UIF.handler.cache.get(cons.LOCAL_TIMESENDMSG);
                        if (head != null && head.anchorId != UIF.handler.userId && roles != null && roles.length > 0) {
                            var $roles = jQuery.parseJSON(roles);
                            if (!Tools.arrayContains($roles, 1) && !Tools.arrayContains($roles, 2)) {
                                btime = 2 * 1000;
                            }
                            if (Tools.arrayContains($roles, 1)) {
                                btime = 1 * 1000;
                            }
                            if (Tools.arrayContains($roles, 2)) {
                                btime = 1 * 1000;
                            }
                        }
                        var bool = false;
                        if (stime != null) {
                            var times = new Date().getTime();
                            if ((times - stime) >= btime) {
                                bool = true;
                                stime = new Date().getTime();
                            }
                        } else {
                            bool = true;
                            stime = new Date().getTime();
                        }
                        UIF.handler.cache.put(cons.LOCAL_TIMESENDMSG, stime);
                        if (bool || UIF.handler.userId == UIF.handler.anchorId) {
                            if (UIF.handler.sendUserId != null && UIF.handler.sendUserId.length > 0) {
                                UIF.handler.sendChatP2P({
                                    nickname : UIF.currentUserNickname,
                                    message : msg,
                                    levs : headimg,
                                    toUser : UIF.handler.sendUserId
                                }, function(data) {
                                });
                                UIF.handler.sendUserId = null;
                            } else {
                                UIF.handler.sendChatALL({
                                    nickname : UIF.currentUserNickname,
                                    message : msg,
                                    levs : headimg
                                }, function(data) {
                                });
                            }
                            clealMsg = true;
                        } else {
                            // 发送消息太频繁
                            // Tools.dialog("发送消息太频繁,请稍后再发送!");
                            var i = 3;
                            function d3() {
                                i--;
                                $("#sendChatNotice").text(" [" + i + "]秒后再试");
                                $("#sendChatNotice").show();
                                $("#sendChatBtn").attr("disabled", true);
                                if (i == 0) {
                                    clearInterval(ti);
                                    $("#sendChatBtn").attr("disabled", false);
                                    $("#sendChatNotice").hide();
                                }
                            }
                            var ti = setInterval(d3, 1000);
                        }
                        break;
                    case "FLY":
                        var dbools = UIF.handler.cache.get(cons.USER_SENDDANMU);
                        if (!dbools) {
                            Tools.dialog("弹幕200蚪币每条!", function(e) {
                                UIF.handler.cache.put(cons.USER_SENDDANMU, true);
                                UIF.handler.sendChatFLY({
                                    nickname : UIF.currentUserNickname,
                                    message : msg,
                                    levs : headimg
                                }, function(data) {
                                    if (data.resultStatus == 100) {
                                        Tools.dialog(data.resultMessage);
                                    }
                                });
                            }, function(e) {
                            });
                        }
                        if (dbools) {
                            UIF.handler.sendChatFLY({
                                nickname : UIF.currentUserNickname,
                                message : msg,
                                levs : headimg
                            }, function(data) {
                                if (data.resultStatus == 100) {
                                    Tools.dialog(data.resultMessage);
                                }
                            });
                        }
                        clealMsg = true;
                        break;
                    case "GLO":
                        var roles = UIF.handler.cache.get(cons.USER_HEADROLES);
                        if (roles != null && roles.length > 0) {
                            var $roles = jQuery.parseJSON(roles);
                            if (Tools.arrayContains($roles, 8)) {
                                var nbools = UIF.handler.cache.get(cons.USER_SENDNICE);
                                if (!nbools) {
                                    Tools.dialog("全站公告5000蚪币每条!", function(e) {
                                        UIF.handler.cache.put(cons.USER_SENDNICE, true);
                                        UIF.handler.sendChatGLO({
                                            nickname : UIF.currentUserNickname,
                                            message : msg,
                                            levs : headimg
                                        }, function(data) {
                                            if (data.resultStatus == 100) {
                                                Tools.dialog(data.resultMessage);
                                            }
                                        });
                                    }, function(e) {
                                    });
                                }
                                if (nbools) {
                                    UIF.handler.sendChatGLO({
                                        nickname : UIF.currentUserNickname,
                                        message : msg,
                                        levs : headimg
                                    }, function(data) {
                                        if (data.resultStatus == 100) {
                                            Tools.dialog(data.resultMessage);
                                        }
                                    });
                                }
                            } else {
                                Tools.dialog("全站公告需要爵位6级以上\!");
                            }
                        }
                        clealMsg = true;
                        break;
                    default:
                        var bool = false;
                        var roles = UIF.handler.cache.get(cons.USER_HEADROLES);
                        if (roles != null && roles.length > 0) {
                            var $roles = jQuery.parseJSON(roles);
                            if (Tools.arrayContains($roles, 12)) {
                                bool = true;
                                UIF.handler.sendChatPRV({
                                    nickname : UIF.currentUserNickname,
                                    message : msg,
                                    levs : headimg
                                }, function(data) {
                                });
                            }
                        }
                        if (!bool) {
                            Tools.dialog("向主播发送私聊消息,需要爵位达到6级以上!")
                        }
                        clealMsg = true;
                        break;
                }
                if(clealMsg)
                    $("#msgContent").val("");
            });

            $(".sdChat").mousedown(function(){
                $(this).addClass("sdChatBtnC");
            })
            $(".sdChat").mouseup(function(){
                $(this).removeClass("sdChatBtnC");
            })
            var isset =0;
            // 弹框
            $("#pubChatList").on("click", 'li .u', function(e) {
                var clazz = $(this).attr("rel");
                var classz =$(this).attr("class");
                if (undefined == clazz)
                    return;
                var userId = clazz.split(" ")[0];
                var nickname = clazz.split(" ")[1];
                var spimg = clazz.split(" ")[2] + " " + clazz.split(" ")[3];
                var initL = e.pageX;
                var initT = e.pageY;
                var aa = $('.chat-area');
                var clientLeft = aa[0].offsetLeft;
                if (spimg != null && spimg.indexOf("undefined") == -1) {
                    $(".levelss").html("<span class='" + spimg + "'></span>");
                    $(".chat-tip-name").css('margin-left', '15px');
                    $(".levelss").show();
                } else {
                    $(".levelss").hide();
                    $(".chat-tip-name").css('margin-left', '0px');
                }
                $(".chat-tip-id").html("ID：" + userId);
                $(".chat-tip-id").attr("tid", userId);
                $(".chat-tip-name").text(nickname);
                $('.chat-tip-warp').css({
                    'left' : clientLeft + 20,
                    'top' : initT + 20 + "px"
                });
                var roles = UIF.handler.cache.get(cons.USER_HEADROLES);
                $(".chat-tip-kick .kick").hide();
                $(".chat-tip-atan .atan").hide();
                $(".chat-tip-jinyan .jinyan").hide();
                var headInfo = UIF.handler.cache.get(cons.USER_HEADINFOS);


                $('.chat-tip-img img').attr("src", "/apis/avatar.php?uid=" + userId);
                //$('.chat-tip-img img').attr("src", $(this).attr('data-img'));
                if (headInfo != null && UIF.handler.anchorId != userId && headInfo.userId != userId && roles != null && roles.length > 0) {
                    if (roles.indexOf("12") > 0) {
                        $(".chat-tip-atan .atan").show();
                    }
                    if (roles.indexOf("13") > 0 || roles.indexOf("14") > 0 || roles.indexOf("15") > 0) {
                        $(".chat-tip-jinyan .jinyan").show();
                    }
                    if (roles.indexOf("16") > 0 || roles.indexOf("17") > 0 || roles.indexOf("18") > 0) {
                        $(".chat-tip-kick .kick").show();
                    }
                    if(roles.indexOf("18") > 0 && roles.indexOf("15") > 0  && UIF.handler.anchorId == UIF.currentUserID){
                        $(".setManager,.resetManager").hide();
                        if(classz.indexOf("gl") < 0 && isset == 0){
                            $('.setManager').show();
                        }else{
                            $('.resetManager').show();
                        }
                        $(".chat-tip-setM").show();
                    }
                }
                $(".chat-tip-warp").show();
            })
            //添加管理
            $(".setManager").click(function(){
                var userId = $(".toggleBox .chat-tip-id").attr("tid");
                UIF.handler.roomManagers({
                    toIds : userId,
                    drives : "adds"
                }, function(data) {
                    data = jQuery.parseJSON(data);
                    if (data != null && data.resultMessage == "success") {
                        Tools.dialog("添加成功！");
                        $(".resetManager").show();
                        $(".setManager").hide();
                        isset = 1;
                    }
                });
            })

            //删除管理
            $(".resetManager").click(function(){
                var userId = $(".toggleBox .chat-tip-id").attr("tid");
                UIF.handler.roomManagers({
                    toIds : userId,
                    drives : "dels"
                }, function(data) {
                    data = jQuery.parseJSON(data);
                    if (data != null && data.resultMessage == "success") {
                        Tools.dialog("删除成功！");
                        $(".resetManager").hide();
                        $(".setManager").show();
                        isset = 0;
                    }
                });
            })



            // 用户私聊
            $(".toggleBox").on("click", ".chat-tip-atan .atan", function(e) {
                if (!UIF.handler.login) {
                    UIF.handler.loging();
                    return;
                }
                var userId = $(".toggleBox .chat-tip-id").attr("tid");
                var names = $(".toggleBox .chat-tip-name").text();
                if (userId == UIF.handler.userId) {
                    Tools.dialog('不能自我私聊!');
                    return;
                }
                $("#msgContent").val("@" + names + ":");
                UIF.handler.sendUserId = userId;
                $("#msgContent").focus();
            });
            // 查封直播间
            $(".chat-header .closing").click(function() {
                if (!UIF.handler.login) {
                    UIF.handler.loging();
                    return;
                }
                Tools.dialog("确定关闭此直播间，进行重新审查！", function(e) {
                    UIF.handler.censor({}, function(data) {
                    });
                }, function(e) {
                });
            });
            // 禁言
            $(".toggleBox").on("click", '.chat-tip-bottom .jinyan', function(e) {
                if (!UIF.handler.login) {
                    UIF.handler.loging();
                    return;
                }
                var userId = $(".toggleBox .chat-tip-id").attr("tid");
                if (userId == UIF.handler.userId) {
                    Tools.dialog('不能自我禁言!');
                    return;
                }
                UIF.handler.blacks({
                    toIds : userId,
                    drives : "banned"
                }, function(data) {
                    var ds = jQuery.parseJSON(data);
                    if (ds.resultStatus == 200) {
                        Tools.dialog('禁言成功!');
                    } else {
                        Tools.dialog('禁言失败,' + ds.resultMessage);
                    }
                });

                var data ={
                    userId:userId,
                    roomNumber:UIF.currentRoomNumber
                };

                $.ajax({
                    type : "POST",
                    url : "/ajax/delChatMessage.php",
                    data : data,
                    cache : false,
                    dataType : "json",
                    async : false
                }).done(function(data){
                    console.log(data);
                })

            })

            // 踢出
            $(".toggleBox").on("click", '.chat-tip-bottom .kick', function(e) {
                if (!UIF.handler.login) {
                    UIF.handler.loging();
                    return;
                }
                var userId = $(".toggleBox .chat-tip-id").attr("tid");
                if (userId == UIF.handler.userId) {
                    Tools.dialog('不能自我踢出!');
                    return;
                }
                UIF.handler.blacks({
                    toIds : userId,
                    drives : "kickout"
                }, function(data) {
                    var ds = jQuery.parseJSON(data);
                    if (ds.resultStatus == 200) {
                        Tools.dialog('踢出成功!');
                    } else {
                        Tools.dialog('踢出失败,' + ds.resultMessage);
                    }
                });
            });

            // 增送礼物
            $(".toggleBox").on("click", '.send-h-gift', function(e) {
                console.log(000)
                if (!UIF.handler.login) {
                    UIF.handler.loging();
                    return;
                }
                var userId = $(".toggleBox .chat-tip-id").attr("tid");
                if (userId == UIF.handler.userId) {
                    Tools.dialog('不能自我增送礼物!');
                    return;
                }
                if (UIF.handler.newSendGiftID == 0) {
                    Tools.dialog("请在礼物栏中选择要送出的礼物!");
                    return;
                }
                var sendGiftNum = $.trim($("#sendGiftNum").val());
                if (sendGiftNum <= 0 || !$.isNumeric(sendGiftNum)) {
                    Tools.dialog("请正确填写礼物数量");
                    return;
                }


                var name = $(".toggleBox .chat-tip-name").text();
                var giftName = $("#gift" + UIF.handler.newSendGiftID + " >span").text();
                Tools.dialog("赠送" + name + sendGiftNum + giftName, function(e) {
                    UIF.handler.sendUserGift({
                        toUser : userId,
                        giftId : UIF.handler.newSendGiftID,
                        number : sendGiftNum
                    }, function(data) {
                        Tools.dialog("赠送成功!");
                    });
                }, function(e) {
                });
            });

            // 选择全站
            $(".son_ul li").on("click", function() {
                UIF.handler.sendTsg = this.id;
                $("#dstUserV").html($(this).text());
                $(".switchChat").html($(this).text());
                $(".changeCh").css("background",$(this).css("background"));
                $(".son_ul").hide();
            });
            $(".cfchange").click(function() {
                $(".son_ul").show();
                $(".switchChat").html("　");
                return false;
            });
            // 面板选择
            $(".chat-header .chat_right").click(function() {
                $(".chat-header .chat_right").removeClass("issel");
                $(this).addClass("issel");
                var a = $(this).attr("ct");
                var i = a.charAt(a.length - 1, 1);
                $(".chat-header").siblings("div").hide();
                $(".ui-resizable-handle").show();
                $(".chs" + i).show();
            });

            /**记录i*/
            this.getCacheChat(UIF.handler.roomNumber);
        },
        /** 爵位图片 */
        spimg : function(data) {
            var spimg = "";
            if (data != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var $img = data[i];
                    if ($img != null && $img != "" && $img.indexOf("pic_consumelevel") > 0) {
                        spimg = $img;
                        break;
                    }
                }
            }
            return spimg;
        },
        /** 用户头衔 */
        headimg : function(data) {
            var heads = "";
            if (data != null && data !="" && data.length > 0) {
                var img = '<span class="{0}"></span>';
                var $data = jQuery.parseJSON(data);
                if ($data != null && $data.length > 0) {
                    for (var i = 0; i < $data.length; i++) {
                        var $img = $data[i];
                        if ($img != null && $img != "")
                            heads += Tools.stringFormat(img, $img);
                    }
                }
            }
            return heads;
        },
        /** 字体颜色 */
        pclass : function(data) {
            var heads = "";
            if (data != null && data.length > 0) {
                var $data = jQuery.parseJSON(data);
                if ($data != null && $data.length > 0) {
                    for (var i = 0; i < $data.length; i++) {
                        var $img = $data[i];
                        if ($img != null && $img != "") {
                            if ($img.indexOf("pic_consumelevel") > 0) {
                                var jvs = "";
                                var c = $img.split("_consumelevel_");
                                if (c[1] < 10) {
                                    jvs = ' jv1';
                                } else if (c[1] > 10 && c[1] < 21) {
                                    jvs = ' jv2';
                                } else if (c[1] > 20) {
                                    jvs = ' jv2';
                                }
                                heads += jvs;
                            }
                            if ($img.indexOf("pic_liverlevel") > 0) {
                                heads += ' anc';
                            }
                            if ($img.indexOf("pic_guanli") > 0) {
                                heads += ' gl';
                            }
                            if ($img.indexOf("pic_guardlevel") > 0) {
                                var gds = "";
                                var c = $img.split("pic_guardlevel_S_");
                                if (c[1] < 6) {
                                    gds = ' gd1';
                                } else if (c[1] > 5 && c[1] < 11) {
                                    gds = ' gd2';
                                } else if (c[1] > 10) {
                                    gds = ' gd2';
                                }
                                heads += gds;
                            }
                        }

                    }
                }
            }
            return heads;
        },


        getCacheChat : function(roomNumber) {
            var _this=this;
            var data={
                roomNumber:roomNumber
            }
            $.ajax({
                type : "POST",
                url : "/ajax/getChatMessage.php",
                data : data,
                cache : false,
                dataType : "json",
                async : false
            }).done(function(datas){
                $.each(datas,function(k,v){
                    var htmls = '<li class="fontred"><span class="gr-time">{0}</span>{1}<a href="javascript:;" class="u{2}" rel="{3} {4} {5}">{6}</a>{7}</li>';
                    words = Face.faceReplaceImg(v.message);
                    try{
                        v.levs = v.levs.replace(/\\/g,'');
                    }catch (e){
                        v.levs = "";
                    }
                    htmls = Tools.stringFormat(htmls, v.ctime,_this.headimg(v.levs), _this.pclass(v.levs), v.userId, decodeURIComponent(v.nickname), _this.spimg(v.levs), decodeURIComponent(v.nickname)+"：", words);
                    $("#pubChatList").append(htmls);
                    try {
                        $("#nano-pubChatList").nanoScroller();
                        $("#nano-pubChatList").nanoScroller({
                            scroll : 'bottom'
                        });
                    } catch (e) {
                        UIF.handler.weblog(e);
                    }
                })
            });
        },
        visitors : function(data) {
            /** 游客进入 */
            if (data.nickname != null) {
                var htmls = '<li class="fontred"><span>欢迎   </span><span class="u">{0} </span><span>进入房间</span></li>';
                htmls = Tools.stringFormat(htmls, decodeURIComponent(data.nickname));
                $("#pubChatList").append(htmls);
                try {
                    $("#nano-pubChatList").nanoScroller();
                    $("#nano-pubChatList").nanoScroller({
                        scroll : 'bottom'
                    });
                } catch (e) {
                    UIF.handler.weblog(e);
                }
            }
        },
        welcome : function(data) {
            /** 进入直播间 */
            if (data.userId != null && data.nickname != null) {
                if (data.numbers != null)
                    $(".live-info .s-else .s-people").text(data.numbers);
                if(data.himage != null){
                    var himage = data.himage;
                }
                var htmls = '<li class="fontred"><span>欢迎   </span>{0}<a href="javascript:;" class="u{1}" rel="{2} {3} {4}" data-img="{5}">{6}</a><span>进入房间</span></li>';
                htmls = Tools.stringFormat(htmls, this.headimg(data.levs), this.pclass(data.levs), data.userId, decodeURIComponent(data.nickname), this.spimg(data.levs), himage,decodeURIComponent(data.nickname));
                $("#pubChatList").append(htmls);
                try {
                    $("#nano-pubChatList").nanoScroller();
                    $("#nano-pubChatList").nanoScroller({
                        scroll : 'bottom'
                    });
                } catch (e) {
                    UIF.handler.weblog(e);
                }
            }
        },

        /** 公共聊天 */
        onAllMsg : function(data) {
            if (UIF.thisHome == 1) {
                data.ctime = Tools.dateFormat(new Date(), "HH:mm");
                $.ajax({
                    type : "POST",
                    url : "/ajax/postChatMessage.php",
                    data : data,
                    cache : false,
                    dataType : "json",
                    async : false
                }).done(function(datas) {
                    UIF.handler.weblog(data);
                });
            }
            var htmls = '<li class="fontred"><span class="gr-time">' + Tools.dateFormat(new Date(), "HH:mm")
                + '  </span>{0}<a href="javascript:;" class="u{1}" rel="{2} {3} {4}">{5}</a>{6}</li>';
            words = Face.faceReplaceImg(data.message);
            htmls = Tools.stringFormat(htmls, this.headimg(data.levs), this.pclass(data.levs), data.userId, decodeURIComponent(data.nickname), this.spimg(data.levs), decodeURIComponent(data.nickname) + "：", words);
            $("#pubChatList").append(htmls);
            try {
                $("#nano-pubChatList").nanoScroller();
                $("#nano-pubChatList").nanoScroller({
                    scroll : 'bottom'
                });
            } catch (e) {
                UIF.handler.weblog(e);
            }
        },

        /** 主播私聊 */
        onPrvMsg : function(data) {
            var msg = '<li class="fontred"><span class="gr-time">' + Tools.dateFormat(new Date(), "HH:mm")
                + '  </span>{0}<a href="javascript:;" class="u{1}" rel="{2} {3} {4}">{5}</a><span class="prwords">{6}：{7}</span></li>';
            var head = UIF.handler.cache.get(cons.USER_HEADINFOS);
            var action = Tools.stringFormat("{0}", (head != null && head.userId == data.userId) ? "" : "对你说");
            words = Face.faceReplaceImg(data.message);
            msg = Tools.stringFormat(msg, this.headimg(data.levs), this.pclass(data.levs), data.userId, decodeURIComponent(data.nickname), this.spimg(data.levs), decodeURIComponent(data.nickname), action, words);
            $("#priChatList").append(msg);
            try {
                $("#nano-priChatList").nanoScroller();
                $("#nano-priChatList").nanoScroller({
                    scroll : 'bottom'
                });
            } catch (e) {
                UIF.handler.weblog(e);
            }
        },
        /** 用户私聊 */
        onP2PMsg : function(data) {
            var msg = '<li class="fontred"><span class="gr-time">' + Tools.dateFormat(new Date(), "HH:mm") + '  </span>{0}<span>{1}{2}：{3}</span></li>';
            var head = UIF.handler.cache.get(cons.USER_HEADINFOS);
            var action = Tools.stringFormat("{0}", (head != null && head.userId == data.userId) ? "" : "对你说");
            words = Face.faceReplaceImg(data.message);
            if (words.indexOf(":") > 0) {
                words = words.substring(words.indexOf(":") + 1, words.length);
            }
            msg = Tools.stringFormat(msg, this.headimg(data.levs), decodeURIComponent(data.nickname), action, words);
            $("#priChatList").append(msg);
        },
        /** 主播公告 */
        onNotice : function(data) {
            var msg = '<div class="roomIntro"><span class="gr-time">公告：{0}</span></div>';
            var notice = (data != null && data.notice != null) ? data.notice : "";
            if (notice != null && notice.length > 0)
                $("#priChatList").append(Tools.stringFormat(msg, notice));
        },
        /** 房间弹幕 */
        onFlyMsg : function(data) {
            var msg = data.nickname + "说：" + data.message;
            screen.fly(msg);
        },

        runMsg : function(data) {
            if(data.id=='hornLi'){
                var msg = data.userName + "说：" + data.content;
                toproom.rwMsgH(Tools.dateFormat(new Date(), "HH:mm"), {
                    "hornText" : data.content,
                    "src_nickname" : decodeURIComponent(data.userName),
                }, Face.replace_face(msg));

            }else if (data.id=='giftLi') {
                var msg = data.userName+"在"+data.liverName+data.roomNumber+"的房间赠送了"+data.itemName+data.number;
                toproom.rwMsgGift(Tools.dateFormat(new Date(), "HH:mm"), {
                    "src_nickname" : decodeURIComponent(data.userName),
                    "anchorsName" : decodeURIComponent(data.liverName),
                    "roomid" : decodeURIComponent(data.roomNumber),
                    "giftId" : data.itemName,
                    "number" : data.number,

                }, Face.replace_face(msg));
            }else if(data.id=='guardLi') {
                var msg = data.userName+"在"+data.liverName+data.roomNumber+"的房间升级为"+data.consumeLevel;
                toproom.rwMsgG(Tools.dateFormat(new Date(), "HH:mm"), {
                    "src_nickname" : decodeURIComponent(data.userName),
                    "anchorsName" : decodeURIComponent(data.liverName),
                    "roomid" : decodeURIComponent(data.roomNumber),
                    "level" : data.consumeLevel,
                }, Face.replace_face(msg));
            }else if (data.id=='spenderLi') {
                var msg = "恭喜" + data.userName + "升级为"+ data.consumeLevel;
                toproom.rwMsgS(Tools.dateFormat(new Date(), "HH:mm"), {
                    "level" : decodeURIComponent(data.consumeLevel),
                    "src_nickname" : decodeURIComponent(data.userName),
                }, Face.replace_face(msg));

            }else if (data.id==null) {
                console.log('there is no data');
            }
        },

        /** 禁止说话 */
        banned : function(data) {
            $("#sendChatBtn").attr("disabled", true);
            $("#msgContent").attr("disabled", true);
            Tools.dialog("你已被禁言！");
        },
        /** 踢出房间 */
        kickOut : function(data) {
            self.location = "/html/101.html";
        }
    }
});

define("flyScreen", [], function(require, exports, module) {
    var Tools = require('./anchor-tools');
    var Face = require('./anchor-face');
    module.exports = {
        flyRoad : [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        fly : function(msg) {
            var base = this;
            var tmp_color = [ '#fff', '#f00', '#0f0', '#0ff' ];// 颜色随机
            var t = Tools.rand(0, tmp_color.length);
            var flyer = $('<marquee loop=1 scrollAmount=6 behavior="scroll" class="flyScreen"><table class="flycn"><tr><td style="color:' + tmp_color[t] + '">'
            + Face.replace_face(msg) + '</td></tr></table></marquee>');
            var rId = 0, blk = true;
            for (var i = 0; i < 8; i++) {
                if (0 == base.flyRoad[i]) {
                    base.flyRoad[i] = 1;
                    rId = i;
                    blk = false;
                    break;
                }
            }
            if (blk) {
                rId = parseInt(Math.random() * 8);
                base.flyRoad[rId] = 1;
            }
            var top = rId * 50 + 60;
            flyer.css('top', top);
            $('body').append(flyer);
            var w = $(window).width() + flyer.children('.flycn').width();
            var t = w / 0.065;
            var tm = UIF.handler.ie6 ? t - 10000 : t;
            setTimeout(function() {
                flyer.remove();
                base.flyRoad[rId] = 0;
            }, tm);
        }
    }
});

define("toproom", [], function(require, exports, module) {
    var Face = require('./anchor-face');
    module.exports = {
        rwMsgH : function(time, obj, content) {
            if(obj != null && obj.hornText != null && obj.hornText != ""){
                obj.hornText = Face.faceReplaceImg(obj.hornText);
            }
            var list = $('<li id="hornLi"><div>' + '<label><span class="rwUser">' + obj.src_nickname + ' : </span><span class="chatContent">'+obj.hornText+'</span></label></div></li>');
            var ul = $('#ulid'), bc = $('.list_top');
            ul.append(list);
            bc.slideDown();
            if ($("#ulid li").length > 1) {
                ul.children("li").first().remove();
            }
            setTimeout(function(){
                $('#ulid li').remove();
                $(".list_top").slideUp();
            },105000)
        },

        rwMsgS : function(time, obj, content) {
            var list = $('<li id="spenderLi"><div>' + '<label>恭喜 <span class="rwUser">' + obj.src_nickname + ' </span>升级为 <span class="upTit">'+obj. level+'</span></label></div></li>');
            var ul = $('#ulid'), bc = $('.list_top');

            ul.append(list);
            bc.slideDown();
            if ($("#ulid li").length > 1) {
                ul.children("li").first().remove();
            }
            setTimeout(function(){
                $('#ulid li').remove();
                $(".list_top").slideUp();
            },105000)
        },

        rwMsgG : function(time, obj, content) {
            var list = $('<li id="guardLi"><div>' + '<label><span class="rwUser">' + obj.src_nickname + ' </span> 在 <a href="/'+obj.roomid+'" target="_blank" class="anchor">'+obj. anchorsName+'</a> 的房间升级为 <span class="upTit">'+obj. level+'</span></label></div></li>');
            var ul = $('#ulid'), bc = $('.list_top');
            ul.append(list);
            bc.slideDown();
            if ($("#ulid li").length > 1) {
                ul.children("li").first().remove();
            }
            setTimeout(function(){
                $('#ulid li').remove();
                $(".list_top").slideUp();
            },105000)
        },

        rwMsgGift : function(time, obj, content) {
            var list = $('<li id="giftLi"><div>' + '<label><span class="rwUser">' + obj.src_nickname + ' </span> 在 <a href="/'+obj.roomid+'" target="_blank" class="anchor">'+obj. anchorsName+'</a> 的房间赠送了 <span class="gifts">'+obj. giftId+' x'+obj.number+'</span></label></a></li>');
            var ul = $('#ulid'), bc = $('.list_top');

            ul.append(list);
            bc.slideDown();
            if ($("#ulid li").length > 1) {
                ul.children("li").first().remove();
            }
            setTimeout(function(){
                $('#ulid li').remove();
                $(".list_top").slideUp();
            },105000)
        },

        formatLuckNum : function(n) {
            if (+n) {
                return '<span class="fluck">(' + n + ')</span>';
            } else {
                return '';
            }
        }
    }
});