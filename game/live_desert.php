<html>
<head lang="en">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <title><?php echo addslashes($showinfo['nickname'])?>的直播间_美女视频聊天室_视频交友房间_视频秀 &ndash; <?php echo $page_var['site_name']?></title>
    <meta name="description" content="<?php echo $page_var['site_name']?>是超人气视频直播互动娱乐社区，在这里你可以展示自己的才艺，也可以跟众多优秀的美女主播在线互动聊天、视频交友" />
    <meta content="视频交友,视频聊天,视频聊天室,美女视频,同城聊天室,视频秀,美女视频秀" name="keywords">
    <script src="<?php echo $page_var['cdn_domain']?>/skin/desert/js/jquery.min.js"></script>
    <script src="<?php echo $page_var['cdn_domain']?>/js/sea-modules/anchor-base.js"></script>
    <script src="<?php echo $page_var['cdn_domain']?>/js/sea-modules/jquery-ui-master/jquery-ui.min.js"></script>
    <script src="<?php echo $page_var['cdn_domain']?>/js/sea-modules/jquery-ui-master/external/splitter/jqxcore.js"></script>
    <script src="<?php echo $page_var['cdn_domain']?>/js/sea-modules/jquery-ui-master/external/splitter/jqxsplitter.js"></script>
    <script src="<?php echo $page_var['cdn_domain']?>/js/sea-modules/radialIndicator-master/radialIndicator.js"></script>
    <script src="<?php echo $page_var['cdn_domain']?>/js/sea-modules/jquery.nicescroll-master/jquery.nicescroll.min.js"></script>
    <script src="<?php echo $page_var['cdn_domain']?>/js/sea-modules/seajs/seajs/3.0.0/sea.js"></script>
    <!--[if IE]>
    <script src="http://libs.useso.com/js/html5shiv/3.7/html5shiv.min.js"></script>
    <![endif]-->
    <link rel="stylesheet" type="text/css" href="/js/sea-modules/jquery-ui-master/jquery-ui.min.css" />
    <link rel="stylesheet" href="/js/sea-modules/jquery-ui-master/jquery-splitter.base.css" type="text/css" />
    <link href="<?php echo $page_var['cdn_domain']?>/css/login.css?20150413" type="text/css" rel="stylesheet" />
    <link href="<?php echo $page_var['cdn_domain']?>/skin/desert/css/nanoScroller.css" rel="stylesheet">
    <link href="<?php echo $page_var['cdn_domain']?>/skin/desert/css/live.css" rel="stylesheet">
    <link href="<?php echo $page_var['cdn_domain']?>/static_data/images_css/icons.css" rel="stylesheet">
    <link href="<?php echo $page_var['cdn_domain']?>/css/gift.css?<?php echo time()?>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript">
        var UIF = {
            swfconfAdd : "<?php echo _SWF_CONF_ADD_?>",
            cdn_img : "<?php echo _IMAGES_DOMAIN_?>",
            cdn_domain : "<?php echo $page_var['cdn_domain']?>",
            currentToken : "<?php echo $currentToken;?>",
            currentUserID : "<?php echo addslashes($user['userId'])?>",
            currentRoomNumber : "<?php echo addslashes($roomnumber)?>",
            currentUserNickname : "<?php echo addslashes($user['nickname'])?>",
            log : function(msg){
                console.log(msg);
            },
            swfClose : function(data){
                UIF.handler.close(data);
            },
            muteEffect : function(data){
                UIF.handler.effect = data == 0 ? false : true;
            },
            init : function(){
                seajs.config({
                    base : UIF.cdn_domain + "/js/sea-modules/",
                    alias : {
                        "socket" : "socket.io/socket.io",
                        "swfobject" : "swfobject/swfobject",
                        "jquery" : "jquery/jquery/1.10.1/jquery"
                    }
                })
                seajs.use(UIF.cdn_domain + "/js/sea-modules/anchor-webs",function(W){
                    UIF.handler = new W();
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
				var guardarea = UIF.getCookie("guard-area");
				if(guardarea != null){
					$(".guard-area").attr("style",guardarea);
				}
                $(".guard-area").draggable({containment:"parent",stop:function(){
                	var st = $(".guard-area").attr("style");
                	UIF.setCookie("guard-area",st,60 * 24 * 60);
                }});
                $(".guard-area").resizable({alsoResize:".guard-main",minHeight:150,minWidth:208});
                
                var rankarea = UIF.getCookie("rank-area");
				if(rankarea != null){
					$(".rank-area").attr("style",rankarea);
				}
                $(".rank-area").draggable({containment:"parent",stop:function(){
                	var st = $(".rank-area").attr("style");
                	UIF.setCookie("rank-area",st,60 * 24 * 60);
                }});
                $(".rank-area").resizable({alsoResize:".rk-con1,.rk-con2,.rk-con3",minHeight:150,minWidth:208});
                
                var giftrecord = UIF.getCookie("gift-record");
				if(giftrecord != null){
					$(".gift-record").attr("style",giftrecord);
				}
                $(".gift-record").draggable({containment:"parent", cancel:"#span",stop:function(){
                	var st = $(".gift-record").attr("style");
                	UIF.setCookie("gift-record",st,60 * 24 * 60);
                }});
                $(".gift-record").resizable({alsoResize:".gr-main",minHeight:150,minWidth:208});
                
                var chatarea = UIF.getCookie("chat-area");
				if(chatarea != null){
					$(".chat-area").attr("style",chatarea);
				}
                $(".chat-area").draggable({containment:"parent",cancel:".hrr,input",stop:function(){
                	var st = $(".chat-area").attr("style");
                	UIF.setCookie("chat-area",st,60 * 24 * 60);
                }});
                $(".chat-area").resizable({alsoResize:".cr-body,#msgContent",minHeight:530,minWidth:340});
                $( ".chat-area" ).on( "resizestop", function( event, ui ) {
                    $("#nano-pubChatList").nanoScroller();
                    $("#nano-pubChatList").nanoScroller({ scroll: 'bottom' });
                } );
								                
                var newGifts = UIF.getCookie("newGifts");
				if(newGifts != null){
					$(".newGifts").attr("style",newGifts);
				}
                $(".newGifts").draggable({containment:"parent",stop:function(){
                	var st = $(".newGifts").attr("style");
                	UIF.setCookie("newGifts",st,60 * 24 * 60);
                }});
                if(UIF.currentUserID != null && UIF.currentUserID.length > 0){
                    UIF.radials = radialIndicator("#indicatorContainer2", {
                        radius: 40,
                        barWidth: 10,
                        minValue: 0,
                        maxValue: 100,
                        fontWeight: 'normal',
                        barColor: "#e0be40",
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

<body class="<?php echo $BSG;?>" onselectstart="return false;">
<div class="nav-left">
    <div class="live-logo" style="width:70px;height:82px;background:url(/skin/desert/images/logo_zhibojian.png) no-repeat;position: absolute;top:8px;left:2px">
        <a style="width:54px;height:32px;display: inline-block" href="<?php echo _CDNDOMAIN_?>" target="_blank"></a>
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
                           <!-- <span class="mt-charge"><a target="_blank" href="/pay.php">充值</a></span>-->
                            <span class="nl-login-out"><a href="/login.php?action=logout&amp;type=html">退出</a></span>
                        </div>
                    </div>
                </div>
                <div class="ospan"><a href="/centeros.php" target="_blank"><img src="/apis/avatar.php?uid=<?php echo $user['userId']?>" alt="name"></a></div>
            </div>
        </div>
    <?php }?>
    <div class="nl-nav">
        <ul>
            <li class="cur"><a href="/"  target="_blank">首页</a></li>
            <li><a href="/square.php"  target="_blank">广场</a></li>
            <li><a href="/mall.php"  target="_blank">商城</a></li>
            <li><a href="javascript:"  target="_blank">活动</a></li>
            <li class="aud"><span><a href="#">观众</a></span></li>
            <li><a href="/">帮助</a></li>
        </ul>
    </div>
    <div class="nl-else">
        <ul class="euc">
            <li style="height: 30px;"></li>
            <li class="eu"><a  href="javascript:" target="_blank" class="download"><span>下载</span></a></li>
            <li class="eu"><a  href="javascript:" target="_blank" class="wenjuan"><span>问卷</span></a></li>
            <li class="eu"><a  href="javascript:" target="_blank" class="libao"><span>礼包</span></a></li>
            <li class="eu"><a  href="javascript:" target="_blank" class="jubao"><span>举报</span></a></li>
        </ul>
    </div>
</div>
<div class="gift-record myDiv3" id="recordResizable">
    <div class="gr-header"><span id="span">送礼记录</span></div>
    <div class="nano gr-main" id="nano-sendGiftList">
        <ul id="movelist1" class="content"></ul>
    </div>
</div>
<div id="broadcast">
    <div class="bcConb">
        <div class="bcCon" id="bcCon" style="width: 800px;">
            <div id="bclistWin"><ul id="bclist"></ul></div>
        </div>
    </div>
</div>
<div class="video-area">
    <!--主视频区-->
    <div class="live-video">
        <div class="player-area" >
            <div id="video">
                <?php
                $width=640;$height=360;
                if(!$showinfo['online'] && !$self){      //主播不在线
                            ?>
                                <img src="<?php echo $page_var['cdn_domain']?>/skin/desert/images/10005.png" style="display: none;">
                                <div class="no-live" >
                                    <div class="nol-title noltext">  </div>
                                    <div class="nol-recommend noltext">  </div>
                                    <div class="nol-list">
                                        <ul>
                                            <li>
                                                <div class="nol-ul-lid"  style="display: none">
                                                    <div class="lid-header">
                                                        <span class="nol-level"></span>
                                                        <span class="nol-people">在线人数:254</span>
                                                    </div>
                                                    <div class="lid-img">
                                                        <img src="" />
                                                    </div>
                                                    <div class="lid-footer">
                                                        <div class="nol-name">大逗逼</div>
                                                        <span class="lid-adress">上海</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            <?php

                }else{?>
                    <div class="flash-area" style="width:<?php echo $width;?>px;height:<?php echo $height;?>px">
                        <div id="mwin1">
                            <!--<![endif]-->
                            </object>
                            <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="<?php echo $width;?>" height="<?php echo $height;?>" id="player" name='player' align="middle">
                                <param name="movie" value="<?php echo $playerpath?>" />
                                <param name="flashvars" value="<?php echo $playervars?>">
                                <param name="quality" value="high" />
                                <param name="wmode" value="transparent" />
                                <param name="allowScriptAccess" value="always" />
                                <param name="allowfullscreen" value="true" />
                                <!--[if !IE]>-->
                                <object type="application/x-shockwave-flash" data="<?php echo $playerpath?>" id="player" name='player' width="<?php echo $width;?>" height="<?php echo $height;?>">
                                    <param name="movie" value="<?php echo $playerpath?>" />
                                    <param name="flashvars" value="<?php echo $playervars?>">
                                    <param name="quality" value="high" />
                                    <param name="wmode" value="transparent" />
                                    <param name="allowScriptAccess" value="always" />
                                    <param name="allowfullscreen" value="true" />
                                    <!--<![endif]-->
                                    <a href="http://www.adobe.com/go/getflash">
                                        <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" />
                                    </a>
                                    <!--[if !IE]>-->
                                </object>
                                <!--<![endif]-->
                            </object>
                        </div>
                    </div>
                <?php
                }?>
            </div>
        </div>
    </div>
    <!--主视频区结束-->
    <div class="live-info">
        <div class="self-photo"><img class="showerImg" src="/apis/avatar.php?uid=<?php echo $showinfo[userId]?>" alt="<?php echo $showinfo[nickname]?>"> </div>
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
            <div class="followme" id="isfollow1">关注</div>
            <div class="followout" id="isfollow0" style="display: none" title="已关注">取消关注</div>
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
    <div class="rk-header" style="width:100%; ">
        <div class="r-current " style="width:33%;"><span><cite>本场榜</cite></span></div>
        <div class="r-week nosel" style="width:33%;"><span><cite>周榜</cite></span></div>
        <div class="r-active nosel" style="width:33%;"><span><cite>亲密榜</cite></span></div>
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
    <div class="b" style="width:100%; height:10px; position:absolute; rigth:0; bottom:0; cursor:n-resize; "></div>
    <div class="r" style="width:10px; height:100%; position:absolute; right:0; top:0; cursor:e-resize;"></div>
    <div class="br" style="width:10px; height:10px; position:absolute; right:0; bottom:0; cursor:nw-resize"></div>
</div>
<!--守护区 !-->
<div class="guard-area myDiv6">
    <div class="guard-header">
        <span class="guard-title">守护</span>
        <span class="gdnum">0/32</span>
        <span class="kais">开通守护</span>
    </div>
    <div class="guard-main nano"><ul class="content"></ul></div>
</div>
<!-- 任务区-->
<?php
include('./include/studio/task.php');
include('./include/studio/audience.php');
?>
<!-- 聊天区-->
<div class="chat-area myDiv4">
    <div class="chat-header">
        <div class="setting" style="display: none" id="setting">设置</div>
        <div class="closing" style="display: none" id="closing">关闭</div>
        <div class="issel chat_right" style="border-bottom-right-radius:5px;" ct="ch1">聊天</div>
        <div class="chat_right" id="choSong" style="border-radius: 0px 0px 5px 5px;" ct="ch2">点歌</div>
    </div>
    <div class="chs1">
        <div class="cr-body nano" id="nano-pubChatList">
            <div class="chat-body content">
                <ul id="pubChatList"></ul>
            </div>
        </div>
        <div class="hrr bg-000-50"></div>
        <div class="pr-body nano"  id="nano-priChatList">
            <div class="chat-body content">
                <ul class="" id="priChatList"></ul>
            </div>
        </div>
        <div class="chat-footer">
            <div class="cf-select">
                <div class="cfchange"><span data="" class="switchChat">公共频道</span><i class="liii"></i></div>
                <ul class="son_ul toggleBox" style="display:none ">
                    <li id="GLO">全站</li>
                    <li id="FLY">飞屏</li>
                    <li id="<?php echo addslashes($showinfo['userId'])?>">私聊主播</li>
                    <li id="ALL">公共频道</li>
                </ul>
            </div>
            <div class="cf-inputs">
                <input type="text" id="msgContent" maxlength="50"/>
                <span id="msgFace" class="smileyBtn"></span>
                <button id="sendChatBtn">发送</button>
                <button id="flyMsgSend" style="display: none">全屏</button>
            </div>
        </div>
        <div style="display:none;" class="FaceBox toggleBox" id="faces">
            <div class="col" id="facesBd"></div>
            <ul><li data_tp="lx" class="on">流行</li><li data_tp="jd">经典</li></ul>
            <div class="clear"></div>
        </div>
    </div>
    <div class="chs2 nano" id="nano-songList" style="display: none">
        <div class="song-main content">
            <ul id="song_item"></ul>
        </div>
    </div>
</div>

<div class="switch-area">
    <div class="sw-guard Bmenu" id="sw-guard"></div>
    <div class="sw-chat Bmenu" id="sw-chat"></div>
    <div class="sw-record Bmenu" id="sw-record"></div>
    <div class="sw-rank Bmenu" id="sw-rank"></div>
    <div class="sw-mission-hover Bmenu" id="sw-mission"></div>
</div>
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
        <div class="send-h-gift">赠送礼物</div>
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
    <div class="portraits">
        <?php if(!$user){?>
            <div class="circle-n">
                <div class="circle-i">
                    <div class="login-cents to-dl divc">登录</div>
                    <div class="circle-line"></div>
                    <div class="regis-cents to-zc divc">注册</div>
                </div>
            </div>
        <?php }else{ ?>
            <div class="circle  login-circle">
                <div class="price" id="indicatorContainer2"></div>
                <div class="circleImg">
                    <img src="/apis/avatar.php?uid=<?php echo $user['userId']?>" alt="<?php echo $user["nickname"]?>">
                </div>
                <div class="portrait-level-pane"><div class="circleLevel activelevel"></div></div>
            </div>
        <?php } ?>
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
                <span id="gt<?php echo $giftcateid;?>"  rel="<?php echo $giftcateid;?>"  <?php echo $ac;?>><?php echo $arr["catename"];?></span>
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
                                ?>
                                <li class="<?php if($gift['catename'] == "背包"){ echo "hideli ";}  echo $gift['giftid'];?>">
                                    <div price="<?php echo $gift['giftprice']?>" id="gift<?php echo $gift['giftid']?>" >
                                        <img src="<?php echo _IMAGES_DOMAIN_."/".$gift['giftimage']?>?p=0" types="<?php echo $gift['giftType'];?>" rel="<?php echo $gift['giftprice']?><?php echo $page_var['money_name']?>" />
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
                    <li data-count="66"><span>66个</span> 笑脸</li>
                    <li data-count="10" style=" border-bottom:none"><span>10个</span>音符</li>
                </ul>
            </div>
            <div class="sendInfos">
                <div class="sendNum"><input type="inpuut" id="sendGiftNum" class="sendGiftNum" maxlength="6" value="1"/>
                    <em id="giftShapeBtns" class="xia-la"></em></div>
                <div class="sendBtn"><span id="sendGiftBtn" >赠送</span></div>
            </div>
        </div>
    </div>
</div>
<div class="shadow" id="shadow"></div>
<div id="pop" class="pop">
    <a href="javascript:;" id="close" class="close">×</a>
    <div class="noti_mana_song" id="noti_mana_song">
        <a href="javascript:;" class="notice active">公告</a>
        <a href="javascript:;" id="manage" class="manage">管理</a>
        <a href="javascript:;" class="song">点歌</a>
    </div>
    <div id="info">
        <div style="display:block;" id="notice_info">
            <div class="noti_bg">
                <span class="laba"></span>
                <span class="notice">公告</span>
            </div>
            <textarea id="roomNotice" class="textarea">
            </textarea>
            <input type="hidden" id="id" value=""/>
            <div id="save" class="save">保存</div>
        </div>
        <div id="manage_info">
            <div class="tit clearFix">
                <span class="rank fl">排序</span>
                <span class="name fl">称号</span>
                <span class="operate fl">操作</span>
                <span class="add fr" id="add_user">添加</span>
            </div>
            <div class="divide"></div>
            <div class="no_added" id="no_added">
                <div class="manage_detail">
                    <p class="tip">您还未添加任何管理，请添加</p>
                    <div class="add_btn" id="add_btn">添加</div>
                </div>
                <div class="bottom clearFix">
                    <p class="bottom_tip fl">每位管理都必须满足消费额度才可以添加</p>
                    <a class="fl" href="javascript:;">查看管理成长体系></a>
                </div>
            </div>
            <div class="added" id="added">
                <ul class="added_list" id="added_list"></ul>
                <div class="bottom clearFix">
                    <p class="bottom_tip fl">每位管理都必须满足消费额度才可以添加</p>
                    <a class="fl" href="javascript:;">查看管理成长体系></a>
                </div>
            </div>
        </div>
        <div id="song_info">
            <h4 id="add_tip" style="margin-top:16px; font-size:14px; color:#333; margin-left:88px; margin-bottom:6px;">添加歌曲</h4>
            <div class="add_song clearFix">
                <input class="songname fl" type="text" id="songsName" />
                <span class="save_song fl" id="songsSave">保存</span>
            </div>
            <h4 class="song_list">歌曲列表</h4>
            <div class="list_tit clearFix">
                <span class="rank_tit fl">排序</span>
                <span class="name_tit fl">歌曲名称</span>
                <span class="operate_tit fl">操作</span>
            </div>
            <div class="divide"></div>
            <div class="song_detail" id="song_detail"></div>
        </div>
    </div>
    <div class="mana_shadow" id="mana_shadow">
        <div class="add_mana">
            <a class="mana_close" id="mana_close" href="javascript:;">×</a>
            <h2 class="tit">添加管理</h2>
            <p>通过ID查找需要添加的管理</p>
            <div class="search">
                <span></span>
                <input type="text" id="userId"/>
            </div>
            <span class="search_btn" id="search_btn">查找</span>

            <div class="appear" id="appear">
                <p class="find" >查找到一下用户</p>
                <div class="divide"></div>
                <div class="user_info clearFix">
                    <div class="img fl">
                        <img src="" id="userImg" style="width:60px;height：60px"/>
                    </div>
                    <div class="name_id fl">
                        <p class="name" id="userName"></p>
                        <p><span>ID：</span><span id="idNum"></span></p>
                    </div>
                    <div class="user_add fl" id="user_add">添加</div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="login-html"></div>
</body>

</html>