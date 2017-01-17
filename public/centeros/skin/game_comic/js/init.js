var Node={};//jQuery选择器缓存
var GLB={};
Room.limitWord=50;//聊天框可以输入的长度
//初始化用户菜单
Room.bindUserMenu=function(){

    //用户列表中的li
    $('.userList li').on({
        mouseenter:function(){
            var userid=parseInt($.trim(this.id.replace(/[a-zA-Z]/,'')));
            Room.usermenuleft=0;
            Room.getUserMenu(userid,$.trim($(this).find('.user-nickname').text()),$(this));
        },/*
         mouseleave:function(){
         Node.uMenu.hide();
         },*/
        click:function(){
            if (Live.user_role == 1) {
                login.show();
                return;
            }
            var userid=parseInt($.trim(this.id.replace(/[a-zA-Z]/,'')));
            if(parseInt(userid)<=0){return;}
            Room.sendMsgToId=userid+"-"+$.trim($(this).find(".user-nickname").html());//后来加的：userid-用户名
            toUserSayInput($.trim($(this).find('.user-nickname').text()));//对他说
            Node.msgCon.focus();
        }
    });

    //公聊框和私聊框中,点击用户名,弹出菜单
    $('#pubChatList a.u,#priChatList a.u').on({
        click:function(){
            if (Live.user_role == 1) {
                login.show();
                return;
            }
            var userid=parseInt($.trim(this.id.replace(/[a-zA-Z]/,'')));
            Room.usermenuleft=-220;
            Room.getUserMenu(userid,$.trim($(this).text()),$(this));
        }
    });

  
    //菜单外框
    Node.uMenu.hover(function(){
        $(this).show();
    },function(){
        $(this).hide();
    });
    //菜单中的，赠送礼物
    Node.sendGift.click(function(){
        Room.sendGiftToId=Room.MouseoverUser.userid;

        sendGiftTo=Room.MouseoverUser.userid;
        sendGiftToName=Room.MouseoverUser.nickName;

        toUserGiftInput(Room.MouseoverUser.nickName);
        return false;
    });

    //菜单中的，对Ta公开的说
    $('#say_pub').click(function(){
        Room.sendMsgToId=Room.MouseoverUser.userid+"-"+Room.MouseoverUser.nickName;//后来加的：userid-用户名
        Node.dstUserV.html(Room.MouseoverUser.nickName);
        toUserSayInput(Room.MouseoverUser.nickName);
        Node.whisper.attr('checked',false);
        Node.msgCon.focus();
        return false;
    });
    //菜单中的，对Ta悄悄的说
    $('#say_pri').click(function(){
        Room.sendMsgToId=Room.MouseoverUser.userid+"-"+Room.MouseoverUser.nickName;//后来加的：userid-用户名
        toUserSayInput(Room.MouseoverUser.nickName);
        Node.whisper.attr('checked',true);
        Node.msgCon.focus();
        return false;
    });
    //对谁说输入框
    Node.dstUser.click(function(){
        if(Node.talkUser.children().length>0){
            $("#talkUser").toggle();
        }
        return false;
    });
    //点击上面，显示X
    Node.switchChat.click(function(){
        //Room.toAllUser();
        //return false;
    });

    //点击对谁说输入框，弹出的a
    /*	$('#talkUser li').on('click',function(){
     Room.sendMsgToId=this.id.replace('sid','')+"-"+$(this).html();//后来加的：userid-用户名
     Node.dstUserV.html($(this).text());
     if(this.id.replace('sid','')!="ALL"){
     Node.whisper.attr('disabled',false);
     }else{
     Node.whisper.attr('checked',false).attr('disabled',true);
     Room.sendMsgToId="ALL";
     }
     $("#talkUser").hide();
     return false;
     });*/

    //函数，鼠标移到pnd上显示cnd,用在给他贴条
    Room.hoverFun=function(pnd,cnd,ot,ol){
        var hoverTimer,outTimer;
        ot=ot||0;ol=ol||0;
        pnd.on({
            mouseenter:function(){
                clearTimeout(hoverTimer);
                var $this=$(this);
                setTimeout(function(){
                    var offset=$this.offset();
                    if(offset.top){
                        cnd.css({top:offset.top+ot,left:offset.left+ol}).show();
                    }
                },50)
            },
            mouseleave:function(){
                outTimer=setTimeout(function(){
                    cnd.hide();
                },100);
            }
        });
        cnd.on({
            mouseenter:function(){
                clearTimeout(outTimer);
                pnd.addClass('menuovr');
                $(this).show();
                Node.uMenu.show();
            },
            mouseleave:function(){
                var $this=$(this);
                Node.uMenu.hide();
                pnd.removeClass('menuovr');
                hoverTimer=setTimeout(function(){
                    $this.hide();
                },100);
            }
        });
    };
    //绑定给他贴条
    Room.hoverFun($('#addTag'),$('#taglist'),-130,180);
};
//对所有人说函数
Room.toAllUser=function(){
    Node.dstUser.val('所有人').removeClass('o_bder');
    Node.whisper.attr('checked',false).attr('disabled',true);
    Room.sendMsgToId="ALL";
    //Node.switchChat.hide();
    $('#talkUser').hide();
};
//显示用户菜单
Room.getUserMenu=function(userid,nickName,o,micMenu){
    if(isNaN(userid) || userid<=0)return;//游客不显示菜单
    if (Live.user_role == 1)return;//不登录不显示菜单
    currentOptUid = userid;
    currentOptUname=nickName;
    currentChatTo=Room.sendMsgToId;
    currentChatToJID=currentOptUid+"@huofengchat1"+"/"+currentRoomNumber;
    if($.inArray((currentOptUid+""),roomAdmins)!==-1){
        $("#setAdmin").html('取消管理员');
    }
    else{
        $("#setAdmin").html('设为管理员');
    }
    //主播自己不显示设为管理员
    if(userid==currentShowerid)
        $("#setAdmin").hide();
    else
        $("#setAdmin").show();
    Node.uMenuTlt.text(nickName);
    var offset=o.offset();
    Node.uMenu.css({top:offset.top,left:(offset.left+320+Room.usermenuleft)}).show();
    //Node.adminMenu.show();//隐藏管理员面板
    Room.MouseoverUser={userid:userid,nickName:nickName};
    Node.sendGift.css('display','block');
    Node.addTag.css('display','block');
};
//对他说
function toUserSayInput(uname){
    uname = $.trim(uname);
    Node.dstUserV.html(uname);
    Node.whisper.attr('disabled',false);
    Node.switchChat.show();
    var li='<li class="text-overflow" id="sid'+Room.MouseoverUser.userid+'">'+uname+'</li>';
    if(!$('#talkUser #sid'+Room.MouseoverUser.userid)[0]){
        Node.talkUser.append(li);
    }
    Node.talkUser.children('a').removeClass('liodd');
    Node.talkUser.children('a:even').addClass('liodd');
}
//给他送礼
function toUserGiftInput(uname){
    Node.sendToUserV.html(uname);
    var li='<li href="javascript:;" id="gid'+Room.sendGiftToId+'" class="text-overflow preSdUser">'+uname+'</li>';
    if($('#giftUser #gid'+Room.sendGiftToId).length<1){
        Node.giftUser.append(li);
    }
    Node.giftUser.children('a').removeClass('liodd');
    Node.giftUser.children('a:even').addClass('liodd');
}
//关注主播
Main.addSiteFav=function(){
    if(!islogin()){
        return false;
    }
    WIO.follow({},function(data){
        data = jQuery.parseJSON(data);
        if(data.resultStatus!=200) return;
        if(data.isFollows == 0){
            $("#isfollow1").show().siblings("#isfollow0").hide();
        } else{
            $("#isfollow0").show().siblings("#isfollow1").hide();
        }
    })

};
//加载本次直播礼物排行(公聊旁边的)
Room.updateGift=true;
Room.getGiftLog=function(){
    if(Room.updateGift){
        Room.updateGift=false;
        var giftList=$('#giftList');
        if(currentShowid=="")return false;
        Main.getDate({
            url: 'ajax/le/currentGiftsTop.php',
            data:{
                end_time:new Date().format("yyyy-MM-dd hh:mm:ss"),
                showid:currentShowid
            }
        }, function(json){
            //请求响应后，最少要再等5秒可再次请求
            setTimeout(function(){
                Room.updateGift=true;
            },5000);
            if('succ'==json.error){
                if(!json.items){return;}
                var list='',ii=1;
                for(var i=0;i<json.items.length;i++){
                    var d=data=json.items[i];
                    list+='<li><p class="name"><span>'+ii+'. </span><a data_gvid="'+d.userid+'" href="javascript:;" title="'+d.nickname+'">'+d.nickname+'</a></p><p class="g">'+d.giftimg+'<span>'+d.giftnum+'</span></p></li>';
                    ii++;
                }
                giftList.html(list);
                $("#nano-giftList").nanoScroller();
            }else{
                Main.alert(json.error);
            }
        });
    }else{
        return false;
    }
};
GLB.LevelBallPNG=0;
Room.showLevelBall=function(level,skyId,name,gift){
    var jumpByTop=function(f,gm,vp,sp,start,cal){
        sp=sp||30;vp=vp||0.62;
        if(start){f.style.top=start+'px';}
        //LvTip.j&&clearInterval(LvTip.j);
        var v=1,j;
        var run=function(){
            if(f){
                var b=+f.style.top.replace('px','')+v;
                if(b>=gm){b=gm}
                f.style.top=b+'px';
                if(b<gm){
                    v+=2
                } else {
                    v=-1*parseInt(v*vp);
                }
                if(v==0&&b==gm){
                    clearTimeout(j);
                    if(cal){cal();}
                }
            }
            j=setTimeout(run,sp);
        };
        run();
    };
    var link='',lv='',s='',title='恭喜';
    if(skyId==currentShowerid){
        s='z';title='恭喜主播';
    }
    if(skyId==currentUserID){
        title='恭喜你';
        link=gift?'<a href="javascript:;" onclick="$(\'#selGiftBtn\').mousedown();$(\'.n999 a\',\'#giftcontent\').click();return false;">请注意查收升级礼包</a>':'';
    }
    lv='<em class="'+s+'level '+s+'lv'+level+'"></em>'
    var ndId='leveUPTip'+Math.random();
    var box=$('<div id="'+ndId+'" class="leveUPTip">\
		<div class="lutop"><div class="col pfix"></div><div class="colr pfix"></div></div>\
		<div class="lucon pfix"><a class="cls pfix" href="javascript:;"> </a><div class="con pfix"><h2>'+title+'</h2><p class="f_p f18">'+name+'</p><p>升级到 '+lv+'</p><p>'+link+'</p></div></div>\
	</div>');
    $('body').append(box);
    var wh=$(window).height();
    var c=wh/2-560;
    var nd=$ID(ndId);
    nd.style.display='block';
    var cls=box.find('a.cls');
    if(ie6){
        nd.style.top=c+'px';
        DD_belatedPNG.fix('.pfix');
        setTimeout(function(){cls.click()},4000);
    }else{
        if(GLB.LevelBallPNG){
            jumpByTop(nd,c,0.6,30,-775,function(){
                setTimeout(function(){cls.click()},3000);
            });
        }else{
            new loadImage('/img/new/levelup.png',function(){
                GLB.LevelBallPNG=1;
                jumpByTop(nd,c,0.6,30,-775,function(){
                    setTimeout(function(){cls.click()},3000);
                });
            });
        }
    }
    cls.on('click',function(){
        if(ie6){box.remove();return false;}
        box.find('.lucon').animate({bottom:-2400},1000,function(){
            box.find('.lutop').slideUp('slow',function(){
                box.remove();
            });
        });
        return false;
    });
};
//未登录下，过20秒弹出层
Room.setDefaultRegAdLocation=function(){
    var a = $("#defaultRegAd"),
        b = $("body").width(),
        c = a.width(),
        d = $(window).height(),
        e = a.height();
    a.css({
        right: (b - c) / 2,
        top: (d - e) / 2
    });

    setTimeout(function() {
        a.show();
        a.find(".close").click(function() {
            a.hide();
        });
        a.find(".regNow").click(function() {
            a.hide();
            login.reg();
        });
    }, 20000);
}
function loadImage(url,callback){
    var img=new Image();
    this.img=img;
    this.img.src=url;
    var appname = navigator.appName.toLowerCase();
    if(appname.indexOf("netscape")==-1){
        img.onreadystatechange=function(){
            if(img.readyState=="complete"){
                callback(img);
            }
        };
    }else{
        img.onload=function(){
            if(img.complete==true){
                callback(img);
            }
        }
    }
}
Room.hideChatBox=function(){
    $('#faces').hide();
    $('#ribbons').hide();
    $('.quickly_post').hide();
};
//Room.printBc("10:90",{"roomid":600336,"src_nickname":"hao123","src_lucknumber":"ccccccc","src_usrid":"123"},"我的中国心");
//显示广播
Room.printBc=function(time,obj,content){
    content=content||obj.msginfo[0].content;
    var list=$('<li class="bcItem"><img src="/skin/desert/images/zij.gif" alt="公告"/><span class="tipTime">'+time+'</span><a href="/'+obj.roomid+'.html" target="_blank">'+formatLuckNum(obj.src_lucknumber)+'<span class="tipWords">'+faceReplaceImg(content)+'</span></a></li>');
    var ul=$('#bclist'),bc=$('#broadcast');

    ul.append(list);
    bc.show();
    var _w=$('#bcCon').width();
    list.css('marginLeft',_w);
    list.animate({'marginLeft':0},3000);
    if($("#bclist li").length>1){
        ul.children("li").first().remove();
    }
    setTimeout(function(){
        list.fadeOut(function(){
            $(this).remove();
            if(''==ul.html()){
                bc.hide();
            }
        })
    },105000);
};
//显示飞屏函数
GLB.flyRoad=[0,0,0,0,0,0,0,0];
//Room.flyScreen("aaa123");
Room.flyScreen=function(content){
    if(!Live.showFlashGift){return;}
    var tmp_color = ['#fff','#f00','#0f0','#0ff'];//颜色随机
    var t=mt_rand(0,tmp_color.length);
    var flyer=$('<marquee loop=1 scrollAmount=6 behavior="scroll" class="flyScreen"><table class="flycn"><tr><td style="color:'+tmp_color[t]+'">'+replace_face(content)+'</td></tr></table></marquee>');
    var rId=0,blk=true;
    for(var i=0;i<8;i++){
        if(0==GLB.flyRoad[i]){
            GLB.flyRoad[i]=1;
            rId=i;
            blk=false;
            break;
        }
    }
    if(blk){rId=parseInt(Math.random()*8);GLB.flyRoad[rId]=1;}
    var top=rId*50+60;
    flyer.css('top',top);
    $('body').append(flyer);
    var w=$(window).width()+flyer.children('.flycn').width();
    var t=w/0.065;
    var tm=ie6?t-10000:t;
    setTimeout(function(){
        flyer.remove();
        GLB.flyRoad[rId]=0;
    },tm);
};

//字幕滚动,如礼物跑道
function movelist(list,t,direct,speed){
    var _wrap=$(list);
    var _interval=t||5000;
    var _moving;
    speed=speed||600;
    _wrap.hover(function(){
        clearInterval(_moving);
    },function(){
        _moving=setInterval(function(){
            _wrap=$(list);
            var _field=_wrap.find('p:first');
            if(_field[0]){
                if(direct){
                    var _w=_field.width();
                    _field.animate({marginLeft:-_w+'px'},speed,function(){
                        _field.css('marginLeft',0).appendTo(_wrap);
                    });
                }else{
                    var _h=_field.height();
                    _field.animate({marginTop:-_h+'px'},600,function(){
                        _field.css('marginTop',0).appendTo(_wrap);
                    });
                }
            }
        },_interval);
    }).trigger('mouseleave');
}
//小视频拖动
Room.mic_div_init=function(){
    /*Room.fdiv=$("#mic_div");
     var tmp = $("#video").offset()
     Room.fdiv.css("left",(tmp.left+239) + "px");
     Room.fdiv.css("top",(tmp.top) + "px");

     $('#mic_div').drag(
     {
     handle:'h3.title',
     viewArea:false,
     ondragstart:function()
     {
     //	$h3.html('拖动开始');
     },
     ondraging:function()
     {
     //	$h3.html('拖动过程中……');
     },
     ondragstop:function()
     {
     //	$h3.html('拖动停止');
     }
     });*/
}


$.fn.dragDiv = function(divWrap) {
    return this.each(function() {
        var $divMove = $(this);//鼠标可拖拽区域
        var $divWrap = divWrap ? $divMove.parents(divWrap) : $divMove;//整个移动区域
        var mX = 0, mY = 0;//定义鼠标X轴Y轴
        var dX = 0, dY = 0;//定义div左、上位置
        var isDown = false;//mousedown标记
        var _clientWidth=1920;
        var _clientHeight=975;
        if(document.attachEvent) {//ie的事件监听，拖拽div时禁止选中内容，firefox与chrome已在css中设置过-moz-user-select: none; -webkit-user-select: none;
            $divMove[0].attachEvent('onselectstart', function() {
                return false;
            });
        }
        $divMove.mousedown(function(event) {
            var event = event || window.event;
            mX = event.clientX;
            mY = event.clientY;
            dX = $divWrap.offset().left;
            dY = $divWrap.offset().top;
            var _width=$divWrap[0].clientWidth;
            var _height=$divWrap[0].clientHeight;

            maxleft=_clientWidth-_width;
            maxheight=_clientHeight-_height;
            //alert(maxleft);
            isDown = true;//鼠标拖拽启动
            // event.style.cursor="pointer";
        });
        $(document).mousemove(function(event) {
            var event = event || window.event;
            var x = event.clientX;//鼠标滑动时的X轴
            var y = event.clientY;//鼠标滑动时的Y轴
            if(isDown) {
                var _left=x - mX + dX;
                var _top=y - mY + dY;
                _left=_left>maxleft?maxleft:_left;
                _top=_top>maxheight?maxheight:_top;

                $divWrap.css({"left":_left, "top": _top});//div动态位置赋值
            }
        });
        $divMove.mouseup(function() {
            isDown = false;//鼠标拖拽结束
        });
    });
};
String.prototype.len=function(){
    return this.replace(/[^\x00-\xff]/g,"rr").length;
};
function sswapTab(name,title,content,Sub,cur) {
    $(name + ' ' + title).click(function () {
        $(this).removeClass(cur).siblings().addClass(cur);
        $(content + " > " + Sub).eq($(name + ' ' + title).index(this)).show().siblings().hide();
    })
}

$(function(){
    $(".gf-outer-header").dragDiv(".myDiv1");
    $(".rk-header").dragDiv(".myDiv2");
    $(".gr-header").dragDiv(".myDiv3");
    $(".giftHeader").dragDiv(".newGifts");
    $(".mission-header,.top-line").dragDiv(".myDiv5");
    $(".chat-header").dragDiv(".myDiv4");
    $(".guard-header").dragDiv(".myDiv6");

    $(".nano").nanoScroller({contentClass:'content',paneClass:'pane',sliderClass:'slider'});
    $(".giftHeader span").click(function(){
        $(this).addClass("haselect");
        $(this).siblings().removeClass("haselect");
        $(".giftLists li").find("img").css({width:"69px",height:"69px",left:0,top:0});
        $(".giftLists li").find("img").removeClass("intro");
        $(".giftLists ul").removeClass("xGiftList");
        $("#giftList"+$(this).attr("rel")).addClass("xGiftList");

        len=$(".xGiftList li").length;
        iwidth=(len+1)*69+(len)*28;

    })

    sswapTab(".rk-header","div",".rk-contents",".rk-conn","nosel");
    $("#sw-chat").click(function () {
        $(".chat-area").toggle();
        if($(".chat-area").is(":hidden")){
            $(this).addClass("sw-chat-hover").removeClass("newGifts");
        }else{
            $(this).addClass("sw-chat").removeClass("sw-chat-hover");
        }
    });
    $("#sw-gift").click(function () {
        $(".gift-record").toggle();
        if($(".gift-record").is(":hidden")){
            $(this).addClass("sw-gift-hover").removeClass("sw-gift");
        }else{
            $(this).addClass("sw-gift").removeClass("sw-gift-hover");
        }
    });
    $("#sw-rank").click(function () {
        $(".rank-area").toggle();
        if($(".rank-area").is(":hidden")){
            $(this).addClass("sw-rank-hover").removeClass("sw-rank");
        }else{
            $(this).addClass("sw-rank").removeClass("sw-rank-hover");
        }
    });

    $(".chat-header .chat_right").click(function () {
        $(".chat-header .chat_right").removeClass("issel");
        $(this).addClass("issel");
        var a=$(this).attr("ct");
        var i=a.charAt(a.length-1,1);
        $(".chat-header").siblings("div").hide();
        $(".chs"+i).show();

    })

    $(".ospan").hover(function(){
        $(".infoBox").show();
    },function(){
        setTimeout(function(){
            var divThis = $(".infoBox");
            if (!divThis.hasClass('hov'))
            {
                divThis.hide();
            }
        }, 1000); // 延迟，这个看你多久合适。
    });
    $(".infoBox").mousemove(function () {
        $(".infoBox").addClass("hov");
    }).mouseleave(function(){
        $(".infoBox").removeClass("hov").hide();
    });

    $(".cfchange").click(function(){
        $(".son_ul").show();
        return false;
    });
    $('.son_ul li').on('click',function(){
    	WIO.chatT = this.id;
        Node.dstUserV.html($(this).text());
        Node.switchChat.html($(this).html());
        $(".son_ul").hide();
    });
    
    $("#nano-sendGiftList").nanoScroller({ scroll: 'bottom' });
    //$(".task-left").nanoScroller();
    /*礼物*/

    len=$(".xGiftList li").length;
    iwidth=(len+1)*69+(len)*28;
    $(".xGiftList").width(iwidth+"px");
    _index =0;
    _left =0;
    _moveWidth=(_index+1)*69+(_index*28);
    if(len<5){
        $(".toLeft").attr("disabled",true);
        $(".toRight").attr("disabled",true);
    }else{
        $(".toLeft").attr("disabled",false);
        $(".toRight").attr("disabled",false);
    }
    $(".toLeft").click(function(){
        if(parseInt($(".xGiftList").css('marginLeft'))< 0 ){
            _left +=97;
        }else{
            return;
        }
        $(".xGiftList").animate({"margin-left":_left+"px"});
    })
    $(".toRight").click(function () {
        if((-parseInt($(".xGiftList").css('marginLeft')))+97 > (iwidth-457) || (-parseInt($(".xGiftList").css('marginLeft')))+97 == (iwidth-457)){
            return;
        }else{
            _left -=97;
        }
        $(".xGiftList").animate({"margin-left":_left+"px"});
    })

    $(".visualGiftList").on("mouseover",'li div',function(ext){
        gridimage = $(this).find('img');
        src=gridimage[0].src;
        //    src2 ="/static_data/gift/gift_9207.gif";
        gridimage.attr("src",src);
        gridimage.stop().animate({width: 80,height:80,left:-3,top:-6}, 150);
    }).on("mousedown",'li div',function(ext){
        if($(this).find('img').attr("types")=="0"){
            $("#giftShapeBtns").show();
        }else{
            $("#sendGiftNum").val(1);
            $("#giftShapeBtns").hide();
        }
        gridimage = $(this).find('img');
        gridimage.addClass("intro");
        $(this).parent().siblings().find("img").removeAttr("choose").removeClass("intro");
        $(this).parent().siblings().find("img").animate({width: 69,height:69,left:0,top:0}, 150);
        sendGiftID = parseInt($(this).attr('id').replace("gift",""));
    }).on("mouseout",'li div',function(ext){
        gridimage = $(this).find('img');
        if(!gridimage.hasClass("intro")){
            gridimage.stop().animate({width: 69,height:69,left:0,top:0}, 150);
        }
    })


    var resiziable= function(){
        var aa=$('.video-area');
        clientLeft=aa[0].offsetLeft;
        clientTop=aa[0].offsetTop;
        $(".chat-area").css({left:(clientLeft+640+90)+"px"});
        $("#CustomGiftSwf").css({left:clientLeft+"px",top:clientTop+"px",margin:0});
        if(document.body.clientWidth<1500){
            $(".newGifts").css({left:"88px"});
        }else{
            $(".newGifts").css({left:(clientLeft)+"px"});
        }
        if(document.body.clientWidth<1650){
            $(".guard-area").css({left:"95px"});
            $(".rank-area").css({left:"95px"});
            $(".gift-record").css({left:"95px"});
        }else{
            $(".guard-area").css({left:(clientLeft-100-340)+"px"});
            $(".rank-area").css({left:(clientLeft-100-340)+"px"});
            $(".gift-record").css({left:(clientLeft-100-340)+"px"});
        }

    };
    resiziable();
    $(window).resize(function() {
        resiziable();
    });



    Node={
        cHandBox:$('.live-radius-tip-lg'),//清屏,滚动,设置按钮
        uMenu:$('#userMenu'),//用户菜单div
        uMenuTlt:$("#userMenu h5"),//用户菜单中的用户名
        adminMenu:$('#adminMenu'),//管理员菜单
        sendGift:$('#sendGift'),//菜单中的，赠送礼物
        addTag:$('#addTag'),//菜单中的，给Ta贴条
        talkUser:$('#talkUser ul'),//对谁说弹出选择框
        giftUser:$('#giftUser'),//给谁送礼弹出选择框
        cPriBox:$('#cChat_priHandBox'),//私聊外框
        taskPnl:$('.taskPnl'),//页面右侧中部新手任务弹出按钮
        taskPnlBd:$('.taskPnl'),//新手任务内容框
        ucreateTime:$('#ucreateTime'),//开播时间
        msgCon:$('#msgContent'),//聊天输入框
        dstUser:$('#dstUser'),//对谁说输入框
        dstUserV:$('#dstUserV'),
        whisper:$('#whisper'),//悄悄说复选框
        switchChat:$('.switchChat'),//切公聊
        sendToUserV:$('#sendToUserV'),
        ulGuardList:$("#ulGuardList"),
        usernum:$('.usernum'),//用户数
        sonUl:$(".son_ul"),
        cfchange:$(".cfchange"),

        sendToUser:$('#sendToUser')

    };

    $(".nano").nanoScroller({contentClass:'content',paneClass:'pane',sliderClass:'slider'});
    //页面效果
    $("#left-expand-area").on("click",function() {
        $(".j_fixedbars").animate( {left:"-70px"},500,function(){})

    });
    $(".sofa-toggle-area").on("click",function() {
        $(".sofa-area").toggle(),
            $(".sofa-area").is(":visible") ? $(".sofa-toggle-show-area").hide() : $(".sofa-toggle-show-area").show()
    });/*
     //排行
     $(".fans-area .area-header span").on("click",function() {
     $(".fans-area .area-header span").removeClass("active");
     $(this).addClass("active");

     $(".fans-area .area-content>ul").hide();
     $(".fans-area-list-"+$(this).attr("data-type")).show();
     });*/
    //在线用户列表
    $(".handle-header").on("click",function() {
        var s=$(this).attr("data-type");
        var o=$(".left-hide-area");
        if($(".left-hide-area.show-"+s).is("div")){
            o.removeClass("show").fadeOut(500);
            setTimeout(function() {
                o.removeClass("show-userlist show-miracle show-act")
            });
        }else{//展开
            o.addClass("show-" + s).fadeIn(300);
            setTimeout(function() {
                o.addClass("show")
            });
            if(s=="userlist"){//更新用户列表
                UseList.p=1;
                UseList.update_user_list();
            }
        }
    });
    //聊天tab切换
    $(".message-area-header-left li").on("click",function() {
        $(".area-content").show();
        var type = $(this).attr("data-type");
        if(type){
            $(".message-area-header-left li").removeClass("active");
            $(this).addClass("active");

            $(".area-content>ul").hide();
            $(".fans-area-list-"+$(this).attr("data-type")).show();

            /*$(".message-area-content .message-area-content-box").hide();
             $(".message-area-content .content-"+type).show();
             if($("#giftTab").hasClass("active")){
             Room.getGiftLog();
             }
             if($("#songTab").hasClass("active")){
             Live.refreshSongRequest();
             }*/
        }
    });
    //用户列表里切换
    $(".userlist-tabs span").on("click",function() {
        $(".userlist-tabs span").removeClass("active");
        $(this).addClass("active");

        $(".userlist-area .nano").hide();
        $(".userlist-list-"+$(this).attr("data-type")).show();
    });
    //礼物
    $(".gift-show-area-header ul li").on("click",function() {
        $(".gift-show-area-header ul li").removeClass("active");
        $(this).addClass("active");

        $(".gift-show-area-list .nano").hide();
        $(".gift-list-"+$(this).attr("rel")).show();
        $(".gift-list-"+$(this).attr("rel")).nanoScroller();
    });
    $(".gf-content-list li").click(function(){
        $(".gf-content-list li.active").removeClass("active");
        $(this).addClass("active");
        sendGiftID = parseInt($(this).attr('id').replace("gift",""));
    });
    movelist('#movelist1');//礼物跑道滚动
    //礼物，鼠标跟随
    $(".giftLists  li").mouseover(function(){
        $('.gift-tip-popup').find(".gift-tip-info").html('<div class="gift-tip-pic"><img alt="'+$(this).find(".gfname").html()+'" src="'+$(this).find("img").attr("src")+'" class="'+$(this).find("img").attr("class")+'"/></div>\
        <div class="gift-tip-detail"><p  class="gp1">'+$(this).find(".gfname").html()+'</p><p class="gp2">价值<i>'+$(this).find("img").attr("rel")+'</i></p></div>');
        if($(this).attr("giftnum")!=null){
            p3='<p  class="gp3">数量：'+$(this).attr("giftnum")+'</p>';
            $(".gift-tip-detail").append(p3);
        }
        $('.gift-tip-popup').show();
    }).mouseout(function(){
        $('.gift-tip-popup').hide();
    }).mousemove(function(e){
        var initL=e.pageX;
        var initT=e.pageY;
        $('.gift-tip-popup').css({'left':initL+40+"px",'top':initT-120+"px"});

    });
    //选择上面的数量时
    $('#stdSps li').click(function(){
        $('#sendGiftNum').val($(this).attr('data-count'));
        $('#stdSps').hide();
        return false;
    });
    $('#giftShapeBtns').click(function(){
        $('#stdSps').toggle();
        return false;
    });
    //点击送给谁礼物input框
    $('#sendToUser').click(function(){
        $('#giftUser').toggle();
        return false;
    });
    //点击上面弹出的用户名时
    $('#giftUser li').on('click',function(){
        var username = $(this).text();
        Room.sendGiftToId=this.id.replace('gid','');
        sendGiftTo=Room.sendGiftToId;
        sendGiftToName=username;
        Node.sendToUserV.html(username);
        $('#giftUser').hide();
        return false;
    });

    //点击发言快捷方式按钮时
    $('.quickly_btn').mousedown(function(){
        $('.quickly_post').toggle();
        return false;
    }).click(function(){return false});
    //点击发言快捷内容时
    $('.quickly_post li').click(function(){
        Node.msgCon.val($(this).text());
        $(".quickly_post").hide();
        return false;
    });
    //用户已经登录了
    if(currentUserNumber!=""){
        Room.bindUserMenu();//初始化用户菜单,没登录则不需
         Main.Room_getAddFavList();//取得用户的关注列表
        //绑定关注主播按钮
        $('#addFav2').on('click',Main.addSiteFav);
    }else{
        Room.setDefaultRegAdLocation();
    }
    //聊天表情初始化
    $('.smileyBtn').on('mousedown',function(){
        var pnl=$('#faces');
        $('#ribbons').hide();
        var offset=$(this).offset();
        if(''==$('#facesBd').html()){
            initFaceList(function(em){
                var id,limit;
                if(Room.botFaceOn){
                    id='#bcText';limit=100;
                }else{
                    id='#msgContent';limit=Room.limitWord;
                }
                var text=$(id).val();
                var tmp=text+em;
                if(limit>=tmp.len()){
                    text+=em;
                }
                $(id).val(text).focus();
            });
        }
        if('msgFace'==this.id){
            Room.botFaceOn=false;
            pnl.css({top:290}).toggle();
        }else{
            Room.botFaceOn=true;
            pnl.css({top:290}).toggle();
        }
        return false;
    }).on('click',function(){return false});
    //点击彩条按钮时
    $('#ribbon').mousedown(function(){
        Room.hideChatBox();
        var offset=$(this).offset();
        $('#ribbons').css({top:offset.top-248,left:offset.left}).toggle();
        return false;
    }).click(function(){return false});
    //点击彩条时
    $('#ribbons a').click(function(){
        var con='@'+$(this).attr('rel')+'@';
        Live.sendSwatch(con);
        Room.hideChatBox();
        return false;
    });
    //拖动条
    $(".hr").mousedown(function(e){
        var _ = e.pageY;

        var T = $(".cr-body").height();
        var W = $(".pr-body").height();
        $(document).on("mousemove", function(mme){
            var n = mme.pageY - _;
            T + n > 50 & W - n > 50 && ($(".cr-body").height(T + n), $(".pr-body").height(W - n));
            e.preventDefault();
        });
        $(document).on("mouseup", function(){
            $(document).off("mousemove");
            $(document).off("mouseup");
        });
    });

    $(".hrrr").mousedown(function(e){
        var _ = e.pageY;
        var T = $(".cr-body").height();
        var W = $(".chat-area").height();

    })
    //活动
    $("#nano-active .content").load("/ajax/le/getNews.php", function(){
        $("#nano-active").nanoScroller();
    });
    //点击页面的任意位置时,将弹出的窗口隐藏,礼物选择等等地方
    $(document).on('mousedown',function(event) {
        var et=$(event.target);
        if(et.hasClass('toggleBox')||et.parents('.toggleBox')[0]){
            return;
        }else if(et.parents('.tip-yellow')[0]){
            return;
        }else{
            $('.toggleBox').hide();
            $('#dstUser').removeClass('o_bder');
            $('#sendToUser').removeClass('o_bder');
            $('.aud').removeClass('on');

        }
    });
    //绑定操作事件
    Node.cHandBox.on('click',function(){
        var pid=$(this).parent().attr('data-area');
        var rel=$(this).attr('data-action');
        if(pid=="all-pub"){//公聊
            if(rel=="lock"){
                if(Chat.scrollPublicChat){
                    $(this).find("em").html("解锁");
                    $(this).find("i").removeClass("icon-lock").addClass("icon-unlock");
                }else{
                    $(this).find("em").html("锁屏");
                    $(this).find("i").addClass("icon-lock").removeClass("icon-unlock").html("锁屏");
                }
                Chat.scrollPublicChat=!Chat.scrollPublicChat;
            }else if(rel=="clear"){
                $('#pubChatList li').remove('li');
                $("#nano-pubChatList").nanoScroller();
            }
        }else if(pid=="all-pri-pri"){
            if(rel=="lock"){
                if(Chat.scrollPrivateChat){
                    $(this).find("em").html("解锁");
                    $(this).find("i").removeClass("icon-lock").addClass("icon-unlock");
                }else{
                    $(this).find("em").html("锁屏");
                    $(this).find("i").addClass("icon-lock").removeClass("icon-unlock").html("锁屏");
                }
                Chat.scrollPrivateChat=!Chat.scrollPrivateChat;
            }else if(rel=="clear"){
                $('#priChatList li').remove('li');
                $("#nano-priChatList").nanoScroller();
            }
        }
        return false;
    });

    //输入框字数限制
    $('#msgContent').bind('input propertychange', function() {
        $(this).parent().find(".info").html((Room.limitWord-$(this).val().length)+"/"+Room.limitWord);
    });
    //座驾
    $("#j_carBtn").click(function(){
        $(".right-hide-area").toggle();
        return false;
    });
    //守护，移动
    $("#guardList .icon-pre,#guardList .icon-next").click(function(){
        var v1 = parseInt(Node.ulGuardList.css("left").replace("px",''));
        var vulWinth = parseInt(Node.ulGuardList.css("width").replace("px",''));
        if($(this).hasClass("icon-pre") && v1!=0){
            Node.ulGuardList.animate({left:v1+50},50);
        }else if($(this).hasClass("icon-next") && vulWinth-Math.abs(v1)>250){
            Node.ulGuardList.animate({left:v1-50},50);
        }
    });
    Room.mic_div_init();
});
