// JavaScript Document
$(document).ready(function(){
    function SwapTab(name, title, content, Sub, cur) {
        $(name + ' ' + title).mouseover(function () {
            $(this).addClass(cur).siblings().removeClass(cur);
            $(content + " > " + Sub).eq($(name + ' ' + title).index(this)).show().siblings().hide();
        })
    }


    SwapTab(".captitle", "a", ".cons", ".foLi", "active");
    SwapTab("#orderTit", "li", "#orderBody", ".orderItem", "active");


    function ndecodeURI(str){
        var $a="";
        try{
            $a = decodeURIComponent(str);
        }catch (e){
            $a="错误编码";
        }
        return $a;
    }


    var Tools = {};
    Tools.getDate = function (params, callback) {
        $.ajax({
            type: "POST",
            url: params.url,
            data: params.data,
            dataType: "json",
            timeout: 120000,
            success: function (data, textStatus, jqXHR) {
                callback(data, textStatus, jqXHR);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (typeof(params.error)==='function') {
                    params.error(jqXHR,textStatus,errorThrown);
                }
            }
        });
    };
    //post请求
    Tools.getJson = function (params, callback) {
        $.ajax({
            type: "GET",
            url: params.url,
            data: params.data,
            dataType: "json",
            timeout: 120000,
            statusCode: {
                404: function() {
                    if (typeof(params.error)==='function') {
                        params.error(jqXHR,textStatus,errorThrown);
                    }
                },
                200: function(){
                }
            },
            success: function (data, textStatus, jqXHR) {
                callback(data, textStatus, jqXHR);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (typeof(params.error)==='function') {
                    params.error(jqXHR,textStatus,errorThrown);
                }
            }
        });
    };


    Tools.stringFormat = function () {
        if (arguments.length == 0)
            return this;
        var $ = arguments[0];
        if ($ != null && $ != "") {
            for (var i = 1; i < arguments.length; i++) {
                var vas = new RegExp("\\{" + (i - 1) + "\\}", "gm");
                if (arguments[i] != null) {
                    $ = $.replace(vas, arguments[i]);
                }
            }
        }
        return $;
    };


    Tools.sliceObject=function(o,s,n){

        if(o==null || o==undefined || o==""){
            return false;
        }
        var newo={};
        for(var i=s;i< n;i++){
            newo['']=o[i];
        }
        return newo;
    }


    //关注
    $(function () {
        var Mycare = {};
        Mycare.listlen=0;
        Mycare.loop=0;
        canBottomNum=0;

        Mycare.lii =
            '<div class="row foLi"><a class="liveLink" href="/{0}" target="_blank">\
                <img class="pull-left img-circle lazy"  src="{1}" alt="{2}">\
                <div class="pull-left state">\
                    <p class="name">{3}</p>\
                {4}\
            </div>\
            <div class="pull-left spriteLev liverlevel-pic_liverlevel_{5}"></div>\
            </a></div>';


        Mycare.init=function(){
            htm ="";
            Tools.getDate({
                url: '/rest/homeAnchors/followList.mt',
                data: {userId:currentUserId}
            }, function (data) {
                if (data != null) {
                    $x=data.data;
                    var  $listObj = $.extend(true,$x,data.data);
                    $num=$listObj.length;
                    $.each($listObj, function() {
                        var _self = $(this)[0];
                        if(_self.tj!=undefined && _self.Abc!=undefined =="11"){_self.nickName};
                        if (_self.online == true) {
                            htm += Tools.stringFormat(Mycare.lii,_self.roomNumber,_self.imagePrivate, ndecodeURI(_self.nickName), ndecodeURI(_self.nickName), "<p class='yesLiv'><span>"+Math.ceil(_self.onlineTime/600000)+"</span>分钟前开播</p>",_self.totalpoint);
                        }else{
                            htm += Tools.stringFormat(Mycare.lii,_self.roomNumber,_self.imagePrivate, ndecodeURI(_self.nickName), ndecodeURI(_self.nickName),'<p class="ynLiv">未开播</p>',_self.totalpoint);
                        }
                    })
                    $(".follow .caption .boxx").html(htm);

                    $(".follow img.lazy").lazyload({
                        effect: "fadeIn"
                    });

                    Mycare.listlen=$num*1;
                    if(Mycare.listlen>5){
                        canBottomNum = Math.floor((Mycare.listlen-1)/5);
                        Mycare.addEvent();
                        $(".follow .titD .xii").removeClass('glyphicon-menu-down-hover').addClass('glyphicon-menu-down');
                    }else{
                    	$(".follow .titD .xii").removeClass('glyphicon-menu-down').addClass('glyphicon-menu-down-hover');
                    }
                }
            });
        };


        var canTop=false;
        var canBottom=false;
        // alert(Math.ceil(12/5));


        Mycare.addEvent=function(){
            var li_len=65;
            scrollerTop=0;
            scrollNum=0;
            function changeClose(name1){
                switch (name1){ //glyphicon-menu-up  glyphicon-menu-down

                    case 'glyphicon-menu-down':
                        $(".titD .xii").removeClass('glyphicon-menu-down').addClass('glyphicon-menu-down-hover');
                        break;
                    case 'glyphicon-menu-up':
                        $(".titD .shh").removeClass('glyphicon-menu-up').addClass('glyphicon-menu-up-hover');
                        break;
                    case 'glyphicon-menu-up-hover':
                        $(".titD .shh").removeClass('glyphicon-menu-up-hover').addClass('glyphicon-menu-up');
                        break;
                    case 'glyphicon-menu-down-hover':
                        $(".titD .xii").removeClass('glyphicon-menu-down-hover').addClass('glyphicon-menu-down');
                        break;
                }
            }
            function setScrollRange(range){
                scrollerTop = range;
            }

            $('.titD').on('click','.glyphicon-menu-down',function(){
                if(canBottomNum>0){
                    $('.follow .caption .boxx .foLi').animate({top:scrollerTop -li_len * 5}, 300);
                    canBottomNum --;
                    scrollNum ++;
                    setScrollRange(-scrollNum*334);
                    if(canBottomNum <=0){
                        changeClose('glyphicon-menu-down');
                    }
                    changeClose('glyphicon-menu-up-hover');
                }
            });
            $('.titD').on('click','.glyphicon-menu-up',function(){
                $('.follow .caption .boxx .foLi').animate({top:scrollerTop + li_len * 5}, 300);
                scrollNum--;
                canBottomNum++;
                setScrollRange(-scrollNum*334);
                if(scrollNum<=0){
                    changeClose('glyphicon-menu-up');
                }
                changeClose('glyphicon-menu-down-hover');
            });
        }
        Mycare.init();

        /*Tools.getDate({
            url: '/rest/homeAnchors/ipView.mt',
            data: {userId:currentUserId}
        }, function (data) {
        });*/
    })


    $(function(){

        var ulList={

            "dayList":"/files/giftWeels.json", //主播周塝

            "weekList":"/files/giftMonth.json", //主播月

            "monthList":"/files/giftYear.json", //主播年榜

            "th_week":"/files/localTyrantDay.json",//土豪周

            "th_month":"/files/localTyrantMonth.json",//土豪月

            "th_year":"/files/localTyrantYear.json",//土豪年

            "hy_week":"/files/fansActive.json",//活跃周

            "hy_month":"/files/fansActive.json",//活跃月

            "hy_year":"/files/fansActive.json",//活跃年

            "anc_banner":"/files/banners.json",//banner

            "anc_hot":"/files/anchors.json",  //"/ajax/getLiveAnchors.php"+"?anc_type=hot"

            "newHotAnchors":"/rest/homeAnchors/hotAnchorsNew.mt?count=45",//new hot anchors interface

            "newHotAnchorsJson":"/files/hotAnchorsNew.json",//new hot anchors interface json

            "anc_game":"/files/gameAnchors.json",//精彩推荐

           "anc_gameType":"/rest/homeAnchors/gameType.mt",//首页游戏分类
           "anc_gameTypeJson":"/files/gameType.json",//首页游戏分类静态

            "gameHeald":"/rest/homeAnchors/gameHeald.mt",//首页游戏综合推荐

            "anc_new":"/files/newAnchors.json" //"/ajax/getLiveAnchors.php"+"?anc_type=new"

        }


        var ht_rank='<li class="clearFix">\
				<span class="icon_shuzi_{0} sprite_top fl"></span>\
					<img class="rank_pho img-circle lazy" src="{1}" alt="{2}">\
						{3}\
					<span class="diamond fl sprite liverlevel-pic_liverlevel_{4}"></span>\
					<a class="liveLink" href="{5}"><span class="name fl">{6}</span> </a>\
				</li>';

        var ht_ransT='<div class="row foLi"><a class="liveLink" href="{0}" target="_blank">\
						<span class="icon_shuzi_{1} sprite_top pull-left hidden-md hidden-sm hidden-xs"></span>\
						<img class="pull-left img-circle lazy"  src="{2}" alt="{3}"/>\
						<span class="crown hidden-md hidden-sm hidden-xs"></span>\
					<div class="pull-left state">\
						<p class="name">{4}</p>\
					</div>\
					<div class="pull-left spriteLev liverlevel-pic_liverlevel_{5}"></div>\
					</a></div>';

        var ht_rans='<div class="row foLi"><a class="liveLink" href="{0}" target="_blank">\
						<span class="icon_shuzi_{1} sprite_top pull-left hidden-md hidden-sm hidden-xs"></span>\
						<img class="pull-left img-circle lazy" src="{2}" alt="{3}"/>\
					<div class="pull-left state">\
						<p class="name">{4}</p>\
					</div>\
					<div class="pull-left spriteLev liverlevel-pic_liverlevel_{5}"></div>\
					</a></div>';


        function parse_to_board(listid,url,type){
            Tools.getJson({
                url: url,
                data: ""
            }, function (data) {
                if(data == "" || data ==undefined){
                    return 0;
                }
                data=data;

                if (data.data != null && data.data.length > 0) {
                    var s_ht3;
                    var roomnumber="javascript:;";
                    $.each(data.data, function(k, v) {
                        if(type == "anchor"){
                            roomnumber = v.roomNumber;
                        }
                        if(k==0){

                            s_ht3 = Tools.stringFormat(ht_ransT,roomnumber,k+1,v.avatar,ndecodeURI(v.nickname), ndecodeURI(v.nickname),v.totalpoint);
                        }else{
                            s_ht3 = Tools.stringFormat(ht_rans,roomnumber,k+1,v.avatar, ndecodeURI(v.nickname), ndecodeURI(v.nickname),v.totalpoint);
                        }
                        $("#"+listid+"").append(s_ht3);
                        if(k==7){return false;}
                    })
                }
            });
        }


        parse_to_board("dayList",ulList.dayList,"anchor");
        parse_to_board("weekList",ulList.weekList,"anchor");
        parse_to_board("monthList",ulList.monthList,"anchor");

        parse_to_board("th_week",ulList.th_week);
        parse_to_board("th_month",ulList.th_month);
        parse_to_board("th_year",ulList.th_year);

        parse_to_board("hy_week",ulList.hy_week);
        parse_to_board("hy_month",ulList.hy_month);
        parse_to_board("hy_year",ulList.hy_year);


        var compiliter={
            bigH:
                '<a href="{0}"  target="_blank" class="thumbnail firHot bord1Pin liveLink">\
                    <div class="hotT">\
                        <img class="lazy" data-original="{1}&w=263&h=386" alt="{2}">\
                        {3}\
                        <div class="shadow"></div>\
                        <div class="playBtn"></div>\
                    </div>\
                    <div class="firB bgff">\
                        <div class="clearfix">\
                        <p class="colorPin pull-left f18">{4}</p>\
                        <div class="pull-right f12 weathLiv"><span class="color99">{5}</span></div>\
                    </div>\
                    <div class="clearfix f12 color99">\
                        <div class="onliNum pull-left">\
                        <span class="glyphicon glyphicon-eye-open"></span>\
                        <span class="num">{6}</span></div><div class="heat pull-left"><span class="glyphicon glyphicon-fire"></span>\
                        <span class="heatNum">{7}</span>\
                        </div></div>\
                    </div></a>',
            bightmlNew:
                '<a href="{0}"  target="_blank" class="thumbnail firHot liveLink">\
                    <img class="lazy" src="{1}&w=240&h=360" alt="{2}"/>\
                    {3}\
                    <div class="firB ellipsis">\
                        <p class="colorPin f16">{4}</p>\
                        <p class="clearfix f12">\
                            <span class="glyphicon glyphicon-eye-open"></span>\
                            <span>{5}</span>\
                            <span class="glyphicon glyphicon-fire"></span>\
                            <span>{6}</span>\
                        </p>\
                    </div>\
                    <div class="shadow thumbnail"></div>\
                    <div class="playBtn"></div></a>',

            lithtml:
                '<div class="{0}">\
                        <a href="{1}"  target="_blank" class="hotItem thumbnail liveLink">\
                        <img class="lazy" da="{2}&w=110&h=165" alt="{3}"/>\
                        <div class="sprite_s pic_liverlevel_S_{4}"></div>\
                        {5}\
                            <div class="hotT thumbnail">\
                                <p class="text-center">人数：<span>{6}</span></p>\
                            </div>\
                            <div class="hotB">\
                                <div class="colorPin f14 ellipsis">{7}</div>\
                                <p class="f12">\
                                    <span>{8}</span>\
                                </p>\
                            </div>\
                        </a>\
                        </div>',
            littleH:
                '<div class="col-pc-i col-md-3 col-sm-3 col-xs-6"><a href="{0}" target="_blank" class="hotItem thumbnail bord1d liveLink">\
                    <div class="hotT">\
                        <img class="lazy" data-original="{1}&w=120&h=184" alt="{2}">\
                        {3}\
                        <div class="shadow"></div>\
                        <div class="playBtn"></div>\
                    </div>\
                    <div class="hotB bgff">\
                        <div class="color1f f12 ellipsis">{4}</div>\
                        <div class="f12 color99">\
                            <span>{5}</span>\
                        </div>\
                    </div>\
                </a></div>',
            lithtmlNew:
                '<div class="{0}">\
                        <a href="{1}"  target="_blank" class="hotItem thumbnail liveLink">\
                            <img class="lazy" src="{2}&w=110&h=165" alt="{3}"/>\
                            {4}\
                            <div class="hotB">\
                                <div class="colorPin f14 ellipsis">{5}</div>\
                                <p class="f12 ellipsis">\
                                    <span class="glyphicon glyphicon-eye-open"></span>\
                                    <span>{6}</span>\
                                </p>\
                            </div>\
                        </a>\
                </div>',


            sonh:
                '<a href="#" target="_blank" class="hotItem thumbnail">\
                <img class="lazy" src="images/girl02.png" alt="">\
                <span class="glyphicon glyphicon-stats"></span>\
                <div class="hotT thumbnail">\
                <div class=""></div>\
                <p class="text-center">人数：<span>268</span></p>\
                </div>\
                    <div class="hotB">\
                        <span class="colorPin f14">小蜜桃sasa</span>\
                        <p class="f12">\
                            <span>30</span>\
                            <span>分钟之前</span>\
                        </p>\
                    </div>\
                    <div class="playBtn"></div>\
                </a>',

            gameHtml:
                ' <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">\
                    <a href="{0}" target="_blank" class="thumbnail padd1 bgnone liveLink">\
                        <img src="{1}&w=166&h=250"/>\
                        {2}\
                        <div class="color99 f18 text-center gameN">{3}</div>\
                    </a>\
                  </div>\
            ',

            gameType:
            '<div class="col-lg-3 col-md-4 col-sm-4 col-xs-6 gameItem"><a href="{0}" target="_blank" class="bgff block bordR3 liveLink">\
                {1}\
                <div class="recommImg thumbnail">\
                    <img class="lazy" data-original="{2}&w=262&h=150" alt="{3}">\
                    <div class="shadow"></div>\
                    <div class="playBtn"></div>\
                </div>\
                <div class="recommB clearfix">\
                    <img class="recomBL pull-left img-circle lazy" data-original="{4}&w=40&h=40"/>\
                    <div class="recomBR pull-right">\
                        <div class="clearfix">\
                            <span class="pull-left nameElli ellipsis color1f">{5}</span>\
                            <div class="color99 pull-right f12">\
                                <span class="glyphicon glyphicon-eye-open"></span> <span>{6}</span>\
                            </div>\
                        </div>\
                        <p class="color99 ellipsis f12">{7}</p>\
                    </div>\
                </div></a>\
            </div>',

            gameTypeTit:
                '<div class="recomm gameItems">\
                    <div class="page-header clearfix hpGameTit">\
                        <h4 class="pull-left gameM">\
                            <img class="gameIcon" src="{0}"/>\
                            <span class="color99 gameName">. {1}</span>\
                        </h4>\
                        <h4 class="pull-right recommR">\
                                <span class="pull-left hidden-xs"></span>\
                                <a class="pull-right more" href="/square"><small class="colordd">更多</small></a>\
                        </h4>\
                    </div>\
                    <div class="row">\
                    </div>\
                </div>',

            toboard:function($level){
                var bk="white";
                if($level<5){
                    bk="white";
                }else if($level>5 && $level <11){
                    bk="blue";
                }else if($level>10 && $level <16){
                    bk="size";
                }else if($level>15 && $level <21){
                    bk="yellow";
                }else if($level>20 && $level <26){
                    bk="orange";
                }else if($level>25 && $level <31){
                    bk="black";
                }
                return bk;
            },
            totime:function(tm){
                if(!tm){
                    return "未开播";
                }
                return Math.ceil(tm/60000)+"分钟前开播";
            },
            toCity:function(ct){
                if(ct){
                    return '<span class="glyphicon glyphicon-map-marker"></span><span>'+ct+'</span>'
                }else{
                    return '';
                }
            },
            tolive:function(s,b){
                if(s == null){
                    return '';
                }
                if(s !="0" || s != 0 ){
                    if(b ==1){
                        return '<span class="glyphicon glyphicon-stats"></span>';
                    }else{
                        return '<span class="iszb"></span>';
                    }
                }else{
                    return '';
                }
            }
        };


        compiliter.parseAnchors = function(url,type){
            Tools.getJson({
                url: ulList.anc_hot,
                data: ""
            }, function (data) {
                if(data == "" || data ==undefined){
                    return 0;
                }
                try{
                    var datas=data;
                }catch(e){
                    var datas="";
                    return false;
                }
                var $h="hotList";
                datas=datas.data;

                if (datas != null && datas.length > 0) {
                    try{
                        var row1=datas.slice(0,19);
                    }
                    catch(e){
                        alert(e);
                    }


                    var s_big,s_sml;
                    var bwrap = $('<div class="col-pc-f col-md-4 col-sm-4 col-xs-6"></div>');
                    var swrap = $('<div class="col-lg-9 col-md-8 col-sm-8 col-xs-6"></div>');
                    var srow = $('<div class="row"></div>');
                    $.each(row1, function(k, v) {
                        if(v.image =="" || v.image == null ){
                            v.image ="http://images.181show.com/c32caba0b2bb669870247e21125c6d16";
                        }
                        if(v.city==""||v.city==null){
                            $(".glyphicon-map-marker").removeClass();
                        }
                        if(k==0){
                            s_big = Tools.stringFormat(compiliter.bigH,v.roomNumber,v.image,ndecodeURI(v.nickName),compiliter.tolive(v.online,1), ndecodeURI(v.nickName),v.numbers,ndecodeURI(v.nickName),compiliter.totime(v.onlineTime), v.numbers,v.heats);
                            bwrap.append(s_big);

                        }else if(k>0 && k<=6){
                            s_sml = Tools.stringFormat(compiliter.lithtml,"col-lg-2 col-md-3 col-sm-3 col-xs-6",v.roomNumber,v.image, ndecodeURI(v.nickName),compiliter.tolive(v.online,1),v.numbers,compiliter.totime(v.onlineTime));
                        }else if(k>6 && k <=12){
                            s_sml = Tools.stringFormat(compiliter.lithtml,"col-lg-2 col-md-3 col-sm-3 hidden-xs",v.roomNumber,v.image,ndecodeURI(v.nickName),v.totalpoint,compiliter.tolive(v.online,1),v.numbers,ndecodeURI(v.nickName),compiliter.totime(v.onlineTime));
                        }else if(k>12 && k <=18){
                            s_sml = Tools.stringFormat(compiliter.lithtml,"col-lg-2 hidden-md hidden-sm hidden-xs",v.roomNumber,v.image, ndecodeURI(v.nickName),v.totalpoint,compiliter.tolive(v.online,1),v.numbers,ndecodeURI(v.nickName),compiliter.totime(v.onlineTime));
                        }
                        srow.append(s_sml);
                    })
                    swrap.append(srow);
                    $("#"+$h+" .hotLiCon").append(bwrap);
                    $("#"+$h+" .hotLiCon").append(swrap);

                    $("#hotList img.lazy").lazyload({
                        effect: "fadeIn"
                    });
                }
            });
        }


        //new hot anchors interface
        compiliter.parseNewHotAnchors = function(url,type){
            Tools.getJson({
                url:url,
                data:"",
                error:function(){
                    compiliter.parseNewHotAnchors(ulList.newHotAnchorsJson,"hot");
                    return;
                }
            },function(data){
                if (data == '' || data == undefined) {
                    compiliter.parseNewHotAnchors(ulList.newHotAnchorsJson,"hot");
                    return;
                }
                try {
                    var datas = data;
                } catch(e) {
                    datas = '';
                    return false;
                }
                var h = "hotList";
                bigData = data.data.big;
                hotData = data.data.hot;

                if (hotData != null && hotData.length > 0) {
                    try {
                        rowData = hotData.slice(0,45);
                    } catch(e) {
                        console.log(e);
                    }

                    var s_big,s_sml;
                    var bwrap = $('<div class="col-pc-f col-md-4 col-sm-4 col-xs-6"></div>');

                    if (bigData.image == "" || bigData.image == null) {
                        bigData.image = "http://images.181show.com/c32caba0b2bb669870247e21125c6d16";
                    }
                    if (bigData.city == '' || bigData.city == null) {
                        $(".glyphicon-map-marker").removeClass();
                    }

                    s_big = Tools.stringFormat(compiliter.bigH,bigData.roomNumber,bigData.image,ndecodeURI(bigData.nickName),compiliter.tolive(bigData.online,1), ndecodeURI(bigData.nickName),compiliter.totime(bigData.onlineTime),bigData.numbers,bigData.heats);
                    bwrap.append(s_big);

                     $("#"+h+" .hotLiCon").append(bwrap);
                    $.each(rowData,function(k,v){
                        if(v.image =="" || v.image == null ){
                            v.image ="http://images.181show.com/c32caba0b2bb669870247e21125c6d16";
                        }
                        if(v.city==""||v.city==null){
                            $(".glyphicon-map-marker").removeClass();
                        }
                  
                        s_sml = Tools.stringFormat(compiliter.littleH,v.roomNumber,v.image, ndecodeURI(v.nickName),compiliter.tolive(v.online,1),ndecodeURI(v.nickName),compiliter.totime(v.onlineTime));
                        $("#"+h+" .hotLiCon").append(s_sml);
                        $("#hotList img.lazy").lazyload({
                            placeholder : "public/index/images/moren_yule.jpg",
                            effect: "fadeIn"
                        });
                    });                    
                }
            });
        }

        


        compiliter.parseNewAnchors = function(url,type){
            Tools.getJson({
                url: ulList.anc_new,
                data: ""
            }, function (data) {
                if(data == "" || data ==undefined){
                    return 0;
                }

                try{
                    var dealData=data;
                }catch(e){
                    var datas="";
                    return false;
                }

                var $new="newList";
                dealData= dealData.data;
                if (dealData != null && dealData.length > 0) {
                    var row1=dealData.slice(0,19);
                    var s_big,s_sml;
                    
                    var bwrap = $('<div class="col-lg-3 col-md-4 col-sm-4 col-xs-6"></div>');
                    var swrap = $('<div class="col-lg-9 col-md-8 col-sm-8 col-xs-6"></div>');
                    var srow = $('<div class="row"></div>');
                    $.each(row1, function(k, v) {
                        if(v.image =="" || v.image == null ){
                            v.image ="http://images.181show.com/c32caba0b2bb669870247e21125c6d16";
                        }
                        if(k==0){
                            s_big = Tools.stringFormat(compiliter.bightmlNew,v.roomNumber,v.image,ndecodeURI(v.nickName), compiliter.tolive(v.online,1),ndecodeURI(v.nickName),v.numbers,v.heats);
                            bwrap.append(s_big);
                        }else if(k>0 && k<=6){
                            s_sml = Tools.stringFormat(compiliter.lithtmlNew,"col-lg-2 col-md-3 col-sm-3 col-xs-6",v.roomNumber,v.image, ndecodeURI(v.nickName),compiliter.tolive(v.online,1),ndecodeURI(v.nickName),v.numbers);
                        }else if(k>6 && k <=12){
                            s_sml = Tools.stringFormat(compiliter.lithtmlNew,"col-lg-2 col-md-3 col-sm-3 hidden-xs",v.roomNumber,v.image,ndecodeURI(v.nickName),compiliter.tolive(v.online,1),ndecodeURI(v.nickName),v.numbers);
                        }else if(k>12 && k <=18){
                            s_sml = Tools.stringFormat(compiliter.lithtmlNew,"col-lg-2 hidden-md hidden-sm hidden-xs",v.roomNumber,v.image, ndecodeURI(v.nickName),compiliter.tolive(v.online,1),ndecodeURI(v.nickName),v.numbers);
                        }
                        srow.append(s_sml);
                    })
                    swrap.append(srow);
                    $("#"+$new+" .newLiCon").append(bwrap);
                    $("#"+$new+" .newLiCon").append(swrap);

                    $("#newList img.lazy").lazyload({
                        effect: "fadeIn"
                    });



                }

            });
        }



        //compiliter.parseAnchors(ulList.anc_hot,"hot");
        compiliter.parseNewHotAnchors(ulList.newHotAnchors,"hot");
        compiliter.parseNewAnchors(ulList.anc_new,"new");
        compiliter.parseGame=function(){
            Tools.getJson({
                url: ulList.anc_game,
                data: ""
            }, function (data) {
                if(data == "" || data ==undefined){
                    return 0;
                }
                try
                {
                    datas=data;
                    datas =datas.data;
                }
                catch (e)
                {
                    datas="";
                    return false;
                }
                var li="";
                if (datas != null && datas.length > 0) {
                    $.each(datas, function(k, v) {
                        descri =v.descri?v.descri:"　";
                        li += Tools.stringFormat(compiliter.gameHtml,
                            v.roomNumber,
                            v.image,
                            compiliter.tolive(v.online,1),
                            ndecodeURI(v.nickName)
                        );
                    })
                    $("#gameAnchors").append(li);
                    $(".recomm img.lazy").lazyload({
                        effect: "fadeIn"
                    });
                }
            });
        }();

        compiliter.parseGameType=function(url){
            Tools.getJson({
                url: url,
                data: "",
                error:function(){
                    compiliter.parseGameType(ulList.anc_gameType);
                    return;
                }
            }, function (data) {
                if (data.data == '' || data.data == undefined || data.data == null ) {
                    compiliter.parseGameType(ulList.anc_gameType);
                    return;
                }
                try
                {
                    datas=data;
                    datas =datas.data;
                }
                catch (e)
                {
                    datas="";
                    return false;
                }

                var typeTit="";
                var gameIcon="";
                var key=0;
                $.each(datas, function(k, v) { 
                    var typeTit=Tools.stringFormat(compiliter.gameTypeTit,v.gameIcon,v.gameName);
                    $("#games").append(typeTit);

                    $.each(v.list,function(kk,vv){
                        descri =vv.descri?vv.descri:"　";
                        var li = Tools.stringFormat(compiliter.gameType,
                            vv.roomNumber,
                            compiliter.tolive(vv.online,1),
                            vv.image,
                            ndecodeURI(vv.title),
                            vv.imagePrivate,
                            ndecodeURI(vv.title),
                            vv.numbers,
                            descri
                        );  

                        $(".gameItems .row").each(function(index,element){
                            if(index == key){
                                $ele = $(element);
                                $ele .append(li);
                            }
                        });     


                    })  
                    key++         
                })
               
                $(".recomm img.lazy").lazyload({
                    placeholder : "public/index/images/pic_youxi_moren.png",
                    effect: "fadeIn"
                });
               
            });
        };

        compiliter.parseGameType(ulList.anc_gameTypeJson);
        compiliter.gameHeald=function(){
            Tools.getJson({
                url: ulList.gameHeald,
                data: ""
            }, function (data) {
                if(data == "" || data ==undefined){
                    return 0;
                }
                try
                {
                    datas=data;
                    datas =datas.data;
                }
                catch (e)
                {
                    datas="";
                    return false;
                }
                var li="";
                if (datas != null && datas.length > 0) {
                    $.each(datas, function(k, v) {
                        descri =v.descri?v.descri:"　";
                        li += Tools.stringFormat(compiliter.gameType,
                            v.roomNumber,
                            compiliter.tolive(v.online,1),
                            v.image,
                            ndecodeURI(v.title),
                            v.imagePrivate,
                            ndecodeURI(v.title),
                            v.numbers,
                            descri
                        );  
                    })
                    $(".gameHeald .row").append(li);
                    $(".recomm img.lazy").lazyload({
                        placeholder : "public/index/images/pic_youxi_moren.png",
                        effect: "fadeIn"
                    });
                }
            });
        }();
      
        compiliter.parseBanner=function(){
            Tools.getJson({
                url: ulList.anc_banner,
                data: ""
            }, function (data) {
                if(data == "" || data == undefined){
                    return 0;
                }
                datas=data.data;
                var item="";
                var lo="";
                if (datas != null && datas.length > 0) {
                    $.each(datas, function(k, v) {
                        $active = k==0?"active":"";
                        if(v.url !=''){
                            item+='<div class="item '+$active+'"><a href="/assist/applyHome"><img class="lazy" data-src="'+v.image+'" alt="900x500" src="'+v.image+'" data-holder-rendered="true"/></a></div>';
                        }else{
                            item+='<div class="item '+$active+'"><a href="/assist/applyHome"><img class="lazy" data-src="'+v.image+'" alt="900x500"  src="'+v.image+'" data-holder-rendered="true"/></a></div>';
                        }
                        if(k==0){
                            lo='<li data-target="#carousel-example-captions" data-slide-to="'+k+'" class="active"><a href="/assist/applyHome"><img class="lazy" data-src="'+v.image+'" alt="900x500"  src="'+v.image+'" data-holder-rendered="true"/><div class="shadow"></div></a></li>';
                        }else{
                            lo+='<li data-target="#carousel-example-captions" data-slide-to="'+k+'" class=""><a href="/assist/applyHome"><img class="lazy" data-src="'+v.image+'" alt="900x500"  src="'+v.image+'" data-holder-rendered="true"/><div class="shadow"></div></a></li>';
                        }

                        $(".carousel-indicators li").css("background",v.image);
                    })
                    $(".carousel-inner").html(item);
                    $(".carousel-indicators").html(lo);

                    $(".carousel-inner img.lazy").lazyload({
                        effect: "fadeIn"
                    });
                }

            });

        }();


    })



    //c3转化成js
    var $changeWid=$("#carousel-example-captions");
    var $doneWid=$("#carousel-example-captions .thumb-bar")
    $changeWid.hover(function(){
        $doneWid.css("width","100%");
    },function(){
        $doneWid.css("width","0");
    });


})
