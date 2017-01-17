<html>
<head lang="en">
    <meta charset="utf-8">
    <title><?php echo addslashes($showinfo['nickname'])?>的直播间_美女视频聊天室_视频交友房间_视频秀 &ndash; <?php echo $page_var['site_name']?></title>
<meta name="description" content="<?php echo $page_var['site_name']?>是超人气视频直播互动娱乐社区，在这里你可以展示自己的才艺，也可以跟众多优秀的美女主播在线互动聊天、视频交友" />
<meta content="视频交友,视频聊天,视频聊天室,美女视频,同城聊天室,视频秀,美女视频秀" name="keywords">
<script src="<?php echo $page_var['cdn_domain']?>/js/sea-modules/jquery/jquery/3.0.0/jquery-3.0.0.min.js"></script>
<script src="<?php echo $page_var['cdn_domain']?>/js/sea-modules/anchor-base.js?v=<?php echo $vsn;?>"></script>
<script src="<?php echo $page_var['cdn_domain']?>/js/sea-modules/jquery-ui-master/jquery-ui.min.js"></script>
<script src="<?php echo $page_var['cdn_domain']?>/js/sea-modules/jquery-ui-master/external/splitter/jqxcore.js"></script>
<script src="<?php echo $page_var['cdn_domain']?>/js/sea-modules/jquery-ui-master/external/splitter/jqxsplitter.js"></script>
<script src="<?php echo $page_var['cdn_domain']?>/js/sea-modules/radialIndicator-master/radialIndicator.js"></script>
<script src="<?php echo $page_var['cdn_domain']?>/js/sea-modules/jquery.nicescroll-master/jquery.nicescroll.min.js"></script>
<script src="<?php echo $page_var['cdn_domain']?>/js/sea-modules/seajs/seajs/3.0.0/sea.js"></script>

<link rel="stylesheet" type="text/css" href="/css/buttons.css" />
<link rel="stylesheet" type="text/css" href="/js/sea-modules/jquery-ui-master/jquery-ui.min.css" />
<link rel="stylesheet" href="/js/sea-modules/jquery-ui-master/jquery-splitter.base.css" type="text/css" />
<link href="<?php echo $page_var['cdn_domain']?>/css/login.css?<?php echo $vsn;?>" type="text/css" rel="stylesheet" />
<link href="<?php echo $page_var['cdn_domain']?>/css/nanoScroller.css" rel="stylesheet">
<link href="<?php echo $page_var['cdn_domain']?>/skin/<?php echo $skinType;?>/css/live.css?v=<?php echo $vsn;?>" rel="stylesheet">
<link href="<?php echo $page_var['cdn_domain']?>/static_data/images_css/icons.css" rel="stylesheet">
<link href="<?php echo $page_var['cdn_domain']?>/css/gift.css?v=<?php echo $vsn;?>" rel="stylesheet" type="text/css"/>
<script type="text/javascript">
    var UIF = {
        cdn_img : "<?php echo _IMAGES_DOMAIN_?>",
        thisHome:"<?php echo $thisHome;?>",
        roomType:"<?php echo $roomType;?>",
        currentToken : "<?php echo $currentToken;?>",
        currentUserID : "<?php echo addslashes($user['userId'])?>",
        currentRoomNumber : "<?php echo addslashes($roomnumber)?>",
        currentUserNickname : "<?php echo addslashes($user['nickname'])?>",
        version :"<?php echo $vsn?>",
        skinType :"<?php echo $skinType?>",
        log : function(msg){
            UIF.handler.weblog(msg);
        },
        swfClose : function(data){
            UIF.handler.close(data);
        },
        liveClose : function(data){
            UIF.handler.liveClose(data);
        },
        muteEffect : function(data){
            UIF.handler.effect = data == 0 ? false : true;
        },
        switchPlayer : function(){
            UIF.handler.ntsRoom();
        },
        init : function(){
            seajs.config({
                base : "/js/sea-modules/",
                alias : {
                    "socket" : "socket.io/socket.io",
                    "swfobject" : "swfobject/swfobject",
                    "jquery" : "jquery/jquery/1.10.1/jquery"
                },
                map:[
                    [".js",".js?v=<?php echo $vsn?>"]//映射规则
                ]
            })
            seajs.use("/js/sea-modules/anchor-webs",function(W){
                UIF.handler = new W();
                UIF.handler.QQGame = true;
                UIF.handler.loading(UIF.currentUserID, UIF.currentToken, UIF.currentRoomNumber);
            });
        },
        getCookie : function(sKey) {
            if (!sKey)
                return "";
            if (document.cookie.length > 0) {
                var startIndex = document.cookie.indexOf(sKey + "=")
                if (startIndex != -1) {
                    startIndex = startIndex + sKey.length + 1
                    var endIndex = document.cookie.indexOf(";", startIndex)
                    if (endIndex == -1) {
                        endIndex = document.cookie.length;
                    }
                    return decodeURIComponent(document.cookie.substring(startIndex, endIndex));
                }
            }
            return ""
        },
        setCookie : function(sKey, sValue, iExpireSeconds) {
            if (!sKey)
                return;
            var expireDate = new Date();
            expireDate.setTime(expireDate.getTime() + iExpireSeconds * 1000);
            document.cookie = sKey + "=" + encodeURIComponent(sValue) + ";expires=" + expireDate.toGMTString() + ";";
        }
    }
    $(function() {
        try {
            /*var guardarea = UIF.getCookie("guard-area");
            if(guardarea != null){
                $(".guard-area").attr("style",guardarea);
            }*/
            /*$(".guard-area").draggable({containment:"parent",stop:function(){
                var st = $(".guard-area").attr("style");
                UIF.setCookie("guard-area",st,60 * 24 * 60);
            }});
            $(".guard-area").resizable({alsoResize:".guard-main",minHeight:150,minWidth:208});*/

            /*var rankarea = UIF.getCookie("rank-area");
            if(rankarea != null){
                $(".rank-area").attr("style",rankarea);
            }*/
            /*$(".rank-area").draggable({containment:"parent",stop:function(){
                var st = $(".rank-area").attr("style");
                UIF.setCookie("rank-area",st,60 * 24 * 60);
            }});
            $(".rank-area").resizable({alsoResize:".rk-con1,.rk-con2,.rk-con3",minHeight:150,minWidth:208});*/

            /*var giftrecord = UIF.getCookie("gift-record");
            if(giftrecord != null){
                $(".gift-record").attr("style",giftrecord);
            }
            $(".gift-record").draggable({containment:"parent", cancel:"#span",stop:function(){
                var st = $(".gift-record").attr("style");
                UIF.setCookie("gift-record",st,60 * 24 * 60);
            }});
            $(".gift-record").resizable({alsoResize:".gr-main",minHeight:150,minWidth:208});

            $(".visitant-record").resizable({alsoResize:".gr-main",minHeight:150,minWidth:208});
            $(".visitant-record").draggable({containment:"parent", cancel:"#span",stop:function(){
               
            }});
            $(".visitant-record").resizable({alsoResize:".gr-main",minHeight:150,minWidth:208});*/

            /*var chatarea = UIF.getCookie("chat-area");
            if(chatarea != null){
                $(".chat-area").attr("style",chatarea);
            }*/
            /*$(".chat-area").draggable({containment:"parent",cancel:".hrr,input",stop:function(){
                var st = $(".chat-area").attr("style");
                UIF.setCookie("chat-area",st,60 * 24 * 60);
            }});
            $(".chat-area").resizable({alsoResize:".cr-body,#msgContent",minHeight:530,minWidth:340});
            $( ".chat-area" ).on( "resizestop", function( event, ui ) {
                $("#nano-pubChatList").nanoScroller();
                $("#nano-pubChatList").nanoScroller({ scroll: 'bottom' });
            } );*/

            /*var newGifts = UIF.getCookie("newGifts");
            if(newGifts != null){
                $(".newGifts").attr("style",newGifts);
            }*/
            /*$(".newGifts").draggable({containment:"parent",stop:function(){
                var st = $(".newGifts").attr("style");
                UIF.setCookie("newGifts",st,60 * 24 * 60);
            }});*/
            if(UIF.currentUserID != null && UIF.currentUserID.length > 0){
                UIF.radials = radialIndicator("#indicatorContainer2", {
                    radius: 44,
                    barWidth: 11,
                    minValue: 0,
                    maxValue: 100,
                    fontWeight: 'normal',
                    barColor: "#c5ff59",
                    barBgColor:"#2b2b2b",
                    roundCorner: true,
                    percentage: true
                });
            }
        } catch (e) {
            UIF.log(e);
        }
        UIF.init();
    });
</script>
</head>

<body onselectstart="return false;">
<div class="<?php echo $BSG;?>">
<?php if(1==2){?>
<div class="nav-left">
    <div class="live-logo" style="width:70px;height:82px;background:url(/skin/logo_zhibojian.png) no-repeat;position: absolute;top:8px;left:2px">
        <a style="width:54px;height:32px;display: inline-block" href="/"  ></a>
    </div>
    <?php if(!$user){ ?>
        <div class="nl-nologin">
            <span class="login-left">登录</span>
            <span class="regis-left">注册</span>
        </div>
    <?php }else{?>
        <div class="nl-login">
            <div class="main-title">
                <div class="infoBox" style="display:none">
                    <div class="mt-right">
                        <div class="mt-rl1">　
                            <div class="mtname"><?php echo $user["nickname"]?></div>
                            <em></em>
                            <div class="mtlevel"></div>
                        </div>
                        <div class="mt-rl2">
                            <div class="mt-outer">
                                <div class="mt-inner" style="width:<?php echo $user["totalpoint"]/$user["nextrichV"]*100?>%"></div>
                            </div>
                        </div>
                        <div class="mt-rl3">
                            <span class="dbicon"></span>
                            <span class="kb">0</span>
                            <span class="mt-charge"><a  href="/pay.php">充值</a></span>
                        </div>
                    </div>
                </div>
                <div class="ospan"><a href="/centeros.php"  > <img src="<?php echo _IMAGES_DOMAIN_.'/'.$user[avatar]?>" alt="<?php echo $user["nickname"]?>"></a></div>
            </div>
        </div>
    <?php }?>
    <div class="nl-nav">
        <ul>
            <li class="cur"><a href="/index_qqgame.php">首页</a></li>
            <li><a href="/square.php" >广场</a></li>
            <li><a href="/mall.php"   >商城</a></li>
            <li><a href="javascript:"   >活动</a></li>
            <li class="aud"><span><a href="#">观众</a></span></li>
            <li><a href="/help.php"  >帮助</a></li>
        </ul>
    </div>

        <div class="nl-else">
            <ul class="euc">
                <li style="height: 30px;"></li>
                <li class="eu"><a  href="javascript:"   class="download"><span>下载</span></a></li>
                <li class="eu"><a  href="javascript:"   class="wenjuan"><span>问卷</span></a></li>
                <li class="eu"><a  href="javascript:"   class="libao"><span>礼包</span></a></li>
                <li class="eu"><a  href="javascript:"   class="jubao"><span>举报</span></a></li>
            </ul>
        </div>
</div>
<?php }?>
<div class="gift-record myDiv3" id="recordResizable">
    <div class="gr-header"><span id="span"></span></div>
    <div class="nano gr-main" id="nano-sendGiftList">
        <ul id="movelist1" class="content"></ul>
    </div>
    <div class="lt"></div>
    <div class="rt"></div>
    <div class="lb"></div>
    <div class="rb"></div>
</div>

<div id="broadcast">
    <div class="bcConb">
        <div class="bcCon" id="bcCon" style="width: 640px;">
            <div id="bclistWin"><ul id="bclist"></ul></div>
        </div>
    </div>
</div>
<div class="video-area">
    <!--主视频区-->
    <div class="live-video">
        <div class="player-area" >
            <div id="video">
                <div class="no-live"></div>
            </div>
        </div>
    </div>
    <!--主视频区结束-->
    <div class="live-info">
        <div class="self-photo"><img class="showerImg" src="<?php echo _IMAGES_DOMAIN_.'/'.$showinfo[avatar]?>" onerror="javascript:this.src='http://img.kedo.tv/46a920d47a9c287e627693554180598a'" alt="<?php echo $showinfo[nickname]?>"> </div>
        <div class="self-name">
            <div class="s-name">
                <span class="anchor-info-names"><?php echo $showinfo["nickname"]?></span>
                <span class="anchor-level"></span>
            </div>
            <div class="s-else"><span class="s-position"><?php echo $showinfo['city'];?> </span><span class="s-people">0</span></div>
        </div>
        <div class="self-level">
            <div class="level-bar-area">
                <div class="lvout"><div class="lvinner" style="width:0"></div></div>
                <span class="anchor-level-next anchor-level pic_liverlevel_<?php echo $showinfo['starlevel']+1?>"></span>
                <div class="lhaicha">升级还差0经验值</div>
            </div>
            <div class="level-margin-area">
                <span class="l-fire">0</span><span class="l-xin">0</span>
            </div>
        </div>
        <div class="self-care" id="addFav2" style="display: block">
            <a id="isfollow1" href="javascript:;" class="button button-highlight button-rounded followme"title="关注TA">关注</a>
            <a id="isfollow0" href="javascript:;"title="已关注" class="button button-rounded button-tiny followout"  style="display: none">取消关注</a>
        </div>
    </div>
</div>
<!--中间部分结束-->
<div id="CustomGiftSwf"></div>
<div id="LevelUpPlayerSwf"></div>
<div id="MultyGiftNoticeSwf"></div>
<div id="EffectPlayerSwf"></div>

<div style="display:none">
    <?php
    foreach($giftId as $v){
        if($v["giftcateid"]=="0" || $v["giftcateid"]=="1"){
            ?>
            <span id="gift<?php echo $v["giftid"]?>" class="ggid<?php echo $v["class"]?>" price="<?php echo $v["giftprice"]?>"><?php echo $v["giftname"]?></span>
        <?php }}?>
</div>
<div class="rank-area myDiv2" id="rank_area">
    <div class="lt"></div>
    <div class="rt"></div>
    <div class="lb"></div>
    <div class="rb"></div>
    <div class="rk-header" style="width:100%; ">
        <div class="r-current "></div>
        <div class="r-week nosel"></div>
        <div class="r-active nosel"></div>
    </div>
    <div class="rk-contents">
        <div class="rk-con1 rk-conn nano">
            <ul class="content" id="current_fan_top"></ul>
        </div>
        <div class="rk-con2 rk-conn nano"   style="display: none">
            <ul class="content" id="formerly_month_fan_top" ></ul>
        </div>
        <div class="rk-con3 rk-conn nano"   style="display: none" >
            <ul class="content" id="formerly_all_fan_top"></ul>
        </div>
    </div>
    <div class="b" style="width:100%; height:10px; position:absolute; right:0; bottom:0; cursor:n-resize; "></div>
    <div class="r" style="width:10px; height:100%; position:absolute; right:0; top:0; cursor:e-resize;"></div>
    <div class="br" style="width:10px; height:10px; position:absolute; right:0; bottom:0; cursor:nw-resize"></div>
</div>
<!--守护区 !-->
<?php
if($roomType != "game"){

    ?>
    <div class="guard-area myDiv6">
        <div class="guard-header">
            <span class="guard-title"></span>
            <span class="gdnum">0/32</span>
            <span class="kais button button-highlight button-rounded"></span>
        </div>
        <div class="guard-main nano"><ul class="content">  </ul></div>
        <div class="lt"></div>
        <div class="rt"></div>
        <div class="lb"></div>
        <div class="rb"></div>
    </div>
<?php }?>

<!-- 任务区-->
<?php
// include('./include/studio/recharge.php');
include('./include/studio/task.php');
include('./include/studio/audience.php');
if($_SERVER['HTTP_HOST'] != "0www.kedo.tv"){
    // include('./include/studio/pet.php');
}
if($thisHome ==1){
    include('./include/studio/setting.php');
}
?>
<!-- 聊天区-->
<div class="chat-area myDiv4">
    <div class="chat-header">
        <div class="closing" style="display: none" id="closing">关闭</div>
        <div class="issel chat_right chatTit" ct="ch1"></div>
        <div class="lt"></div>
        <div class="rt"></div>
    </div>
    <div class="chs1">
        <div class="cr-body nano" id="nano-pubChatList">
            <div class="chat-body content">
                <ul id="pubChatList"></ul>
            </div>
        </div>
        <div class="hrr bg-000-50"></div>

        <div class="bCorner">
            <div class="pr-body nano"  id="nano-priChatList">
                <div class="chat-body content">
                    <ul class="" id="priChatList"></ul>
                </div>
            </div>
            <div class="lb"></div>
            <div class="rb"></div>
        </div>
        <div class="chat-footer">
            <div class="cf-select">
                <div class="cfchange">
                    <span data="" class="switchChat changeCh"><!-- 公共频道 --></span>
                    <!-- <i class="liii"></i> -->
                </div>
                <ul class="son_ul" style="display:none ">
                    <li id="GLO"></li>
                    <li id="FLY"></li>
                    <li id="<?php echo addslashes($showinfo['userId'])?>" class="private"></li>
                    <li id="ALL" class="no-b"></li>
                </ul>
            </div>
            <div class="cf-inputs">
                <input type="text" id="msgContent" class="msgContent" maxlength="50"/>
                <span id="msgFace" class="smileyBtn"></span>
                <!-- <a id="sendChatBtn" href="javascript:;" class="button button-highlight button-rounded sendChatBtn">发送</a> -->
                <a id="flyMsgSend"  href="javascript:;" class="button button-highlight button-rounded flyMsgSend" style="display: none">全屏</a>
            </div>
            <a id="sendChatBtn" href="javascript:;" class="sendChatBtn sdChat"></a>
        </div>
        <div style="display:none;" class="FaceBox toggleBox" id="faces">
            <div class="col" id="facesBd"></div>
            <ul><li data_tp="lx" class="on">流行</li><li data_tp="jd">经典</li></ul>
            <div class="clear"></div>
        </div>
    </div>
    <div class="chs2 nano" id="nano-songList" style="display: none">
        <div class="song-main content">
            <ul id=""></ul>
        </div>
        <!-- <div class="lb"></div>
        <div class="rb"></div> -->
    </div>
</div>

<!-- <div class="switch-area">
    <div class="sw-chat Bmenu" id="sw-chat"></div>
    <div class="sw-record Bmenu" id="sw-record"></div>
    <div class="sw-rank Bmenu" id="sw-rank"></div>

    <div class="sw-guard Bmenu" id="sw-guard"></div>
    <?php if(1==2){?>
        <div class="sw-mission-hover Bmenu" id="sw-mission"></div>
    <?php }?>
</div> -->
<div class="chat-tip-warp toggleBox" >
    <div class="chat-tip-top">
        <div class="chat-tip-img"><img src="http://r3.ykimg.com/0510000056AC9CAA67BC3D5EB409503F" class="chat-top-imgs" alt="#" /></div>
        <div class="chat-tip-title">
            <div class="levelss"></div>
            <div class="chat-tip-name"></div>　
            <div class="clear"></div>
            <div class="chat-tip-id"></div>
            <div class="chat-tip-adress"></div>
        </div>
    </div>
    <div class="chat-tip-line"></div>
    <div class="chat-tip-bottom">
        <div class="send-h-gift" >赠送礼物</div>
        <div class="chat-tip-atan"><a href="javascript:" class="atan">@私聊</a></div>
        <div class="chat-tip-jinyan"><a href="javascript:" class="jinyan">禁言</a></div>
        <div class="chat-tip-kick"><a href="javascript:" class="kick">踢出</a></div>
    </div>
</div>
<div class="gift-tip-popup live-popups live-popup-left live-popup-exp">
    <div class="gift-tip-info fix"></div>
</div>

<div class="newGifts" onselectstart="return false" >
    <div class="draggift"></div>
    <div class="infoBox2">
        <div class="mt-right">
            <div class="mt-rl1">　
                <div class="mtname"><?php echo $user["nickname"]?></div>
                <em></em>
                <div class="mtlevel"></div>
            </div>
            <div class="mt-rl2">
                <div class="mt-outer">
                    <div class="mt-inner" style="width:<?php echo $user["totalpoint"]/$user["nextrichV"]*100?>%"></div>
                </div>
            </div>
            <div class="mt-rl3">
                <span class="dbicon"></span>
                <span class="kb">0</span>
                <span class="mt-charge"><a target="_blank" href="/pay.php">充值</a></span>
                <span class="nl-login-out"><a href="/login.php?action=logout&amp;type=html">退出</a></span>
            </div>
        </div>
    </div>
    <style>
        .nl-login {position: relative;}
        .ospan{position: relative;top: 15px; display:block;width:70px;margin-left:5px;text-align:center;color: #FFffff;font-size: 12px;margin-top: 9px;cursor: pointer;}
        .infoBox2{width:312px;height: 90px; border-radius: 3px;background:rgba(230, 232, 207, 0.8);position: absolute;font-size: 12px;margin-left: 2px;top: -70px;z-index: 99999; display: none }
        .mt-right{position: absolute;right:15px;top:15px;width:180px}
        .mt-right .mt-rl1,.nl-login .mt-right .mt-rl2,.nl-login .mt-right .mt-rl1{width:205px;}
        .mt-right .mt-rl1 .mtname{color: #0C1417;font-size: 14px;float: left}
        .mt-right .mt-rl1 .mtlevel{color: #fff;float: right;margin-right: 20px;}
        .mt-right .mt-rl2 .mt-outer{width:180px;height: 8px;background-color:#4C5A63;border:2px solid #fff;position: relative;margin: 10px 0;overflow: hidden;}
        .mt-right .mt-rl2 .mt-inner{background: #F9BA00;height: 4px;max-width: 100%}
        .mt-rl3 span{float: left}
        .kb{color: #ffffff;background: url("/img/icon_money.png") left center no-repeat; padding-left: 30px;height: 28px; display: inline-block; width:96px; line-height: 28px;  margin-right: 5px;overflow: hidden}
        .mt-charge{width: 40px;height: 28px;color:#fff;background:#FDBC02;cursor: pointer;text-align: center;line-height: 28px;display: inline-block;border-radius: 3px;overflow: hidden;margin-left: 5px;margin-right: 5px;}
        .nl-login-out{float: right;margin-top: 7px}
    </style>
    <script>
        $(function(){
            $(".hoverAble").on('mouseover',function(){
                $('.infoBox2').show();
            });
        });
    </script>
    <div class="portraits">
        <div class="circle  login-circle">
            <div class="portBg hoverAble"></div>
            <div class="price" id="indicatorContainer2"></div>
            <div class="circleImg">
                <img src="<?php echo _IMAGES_DOMAIN_.'/'.$user[avatar]?>"alt="<?php echo $user["nickname"]?>">
            </div>
            <div class="portrait-level-pane"><div class="circleLevel activelevel"></div></div>
        </div>
    </div>
    <div class="mainGifts" >
        <div class="giftHeader">
            <?php
            echo "<pre>";
            //print_r($giftcate);
            echo "</pre>";
            foreach($giftcate as $giftcateid=>$arr):
                if($giftcateid != 25){
                    $ac = '';
                }else{
                    $ac = 'class="haselect"';
                }
                ?>
                <span id="gt<?php echo $giftcateid;?>"  rel="<?php echo $giftcateid;?>"  <?php echo $ac;?> class="ct"></span>

            <?php endforeach;?>
        </div>
        <div class="giftContents">
            <div class="giftwarp">
                <div class="inshaddow">
                    <div class="toLeft">   </div>
                    <div class="giftLists">
                        <?php
                        // print_r($giftinfo);
                        foreach($giftinfo as $cateid=>$gifts){
                            if(in_array($cateid, array("0","1","8","15")))continue;//分类为0,1的不显示,8是汽车
                            if($cateid==25){
                                $class='xGiftList';
                            }else{
                                $class='';
                            }
                            echo '<ul id="giftList'.$cateid.'"  class="visualGiftList '.$class.'" >';
                            foreach($gifts as $gift){
                                $parm=json_decode($gift['parameters'],true);
                                $join=$parm['join']?$parm['join']:0;

                                ?>
                                <li class="<?php if($gift['catename'] == "背包"){ echo "hideli ";}  echo $gift['giftid'];?>">
                                    <div price="<?php echo $gift['giftprice']?>" id="gift<?php echo $gift['giftid']?>" >
                                        <img src="<?php echo _IMAGES_DOMAIN_."/".$gift['giftimage']?>?p=0" types="<?php echo $gift['giftType'];?>" join="<?php echo $join;?>" rel="<?php echo $gift['giftprice']?><?php echo $page_var['money_name']?>" />
                                        <span title="<?php echo $gift['giftname']?>" class="tooltip gfname" style="display: none"><?php echo $gift['giftname']?></span>
                                    </div>
                                </li>

                            <?php }
                            echo '</ul> ';
                        }?>
                    </div>
                    <div class="toRight">  </div>
                </div>
            </div>
            <div id="stdSps" class="live-popup live-popup-menu" style="display: none">
                <ul>
                    <li data-count="1314"><span>1314个 </span>一生一世</li>
                    <li data-count="520"><span>520个</span> 我爱你</li>
                    <li data-count="188"><span>188个</span> 皇冠</li>
                    <li data-count="99"><span>99个</span> 星愿</li>
                    <li data-count="66"><span>66个</span> 666</li>
                    <li data-count="10" style=" border-bottom:none"><span>10个</span>音符</li>
                </ul>
            </div>
            <div class="sendInfos">
                <div class="sendNum"><input type="inpuut" id="sendGiftNum" class="sendGiftNum" maxlength="6" value="1"/>
                    <em id="giftShapeBtns" class="xia-la"></em></div>
                <div class="sendBtn"><a href="javascript:;" id="sendGiftBtn" class="sendGiftBtn giveBtn"></a></div>
            </div>
        </div>
    </div>
</div>
<div class="shadow" id="shadow"></div>
<div class="login-html"></div>
</div>
</body>

</html>