// JavaScript Document
//create on 2016-11-23 14.23
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
                //alert(params.url+" error code:"+textStatus);


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
                    // return false;


                },
                200: function(){
                    // alert("请求成功");

                }
            },
            success: function (data, textStatus, jqXHR) {
                callback(data, textStatus, jqXHR);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert(params.url+" error code:"+jqXHR.status);


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
            '<div class="row foLi"><a href="/{0}" target="_blank">\
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

        Tools.getDate({
            url: '/rest/homeAnchors/ipView.mt',
            data: {userId:currentUserId}
        }, function (data) {
        });

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

            "anc_game":"/files/gameAnchors.json",//精彩推荐

            "anc_new":"/files/newAnchors.json" //"/ajax/getLiveAnchors.php"+"?anc_type=new"

        }


        var ht_rank='<li class="clearFix">\
				<span class="icon_shuzi_{0} sprite_top fl"></span>\
					<img class="rank_pho img-circle lazy" src="{1}" alt="{2}">\
						{3}\
					<span class="diamond fl sprite liverlevel-pic_liverlevel_{4}"></span>\
					<a href="{5}"><span class="name fl">{6}</span> </a>\
				</li>';
        var ht_ransT='<div class="row foLi"><a href="{0}" target="_blank">\
						<span class="icon_shuzi_{1} sprite_top pull-left hidden-md hidden-sm hidden-xs"></span>\
						<img class="pull-left img-circle lazy"  src="{2}" alt="{3}"/>\
						<span class="crown hidden-md hidden-sm hidden-xs"></span>\
					<div class="pull-left state">\
						<p class="name">{4}</p>\
					</div>\
					<div class="pull-left spriteLev liverlevel-pic_liverlevel_{5}"></div>\
					</a></div>';
        var ht_rans='<div class="row foLi"><a href="{0}" target="_blank">\
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
            bightml:
                '<a href="{0}"  target="_blank" class="thumbnail firHot">\
                <img class="lazy" src="{1}&w=240&h=360" alt="{2}"/>\
                {3}\
                    <div class="firT thumbnail clearfix">\
                        <div class="pull-left sprite_l pic_liverlevel_L_{4}"></div>\
                        <p class="text-center">人数：<span>{5}</span></p>\
                         </div>\
                    <div class="firB ellipsis">\
                        <p class="colorPin f16">{6}</p>\
                        <p class="clearfix f12">\
                            <span class="glyphicon glyphicon-user"></span>\
                            <span>{7}</span>\
                            {8}\
                        </p>\
                    </div>\
                    <div class="shadow thumbnail"></div>\
                    <div class="playBtn"></div></a>',
            bightmlNew:
                '<a href="{0}"  target="_blank" class="thumbnail firHot">\
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
                        <a href="{1}"  target="_blank" class="hotItem thumbnail">\
                        <img class="lazy" src="{2}&w=110&h=165" alt="{3}"/>\
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
            lithtmlNew:
                '<div class="{0}">\
                        <a href="{1}"  target="_blank" class="hotItem thumbnail">\
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
                ' <div class="col-lg-3 col-sm-3 col-xs-4">\
                    <a href="{0}" target="_blank" class="thumbnail">\
                    {1}\
                    <div class="recommImg thumbnail">\
                        <img class="lazy" src="{2}&w=248&h=127" alt="{3}"/>\
                        <div class="thumb-bar"></div>\
                        <div class="shadow"></div>\
                        <div class="playBtn"></div>\
                    </div>\
                    <div class="recommB">\
                        <div class="clearfix">\
                            <span class="color33 pull-left ellipsis">{4}</span>\
                            <div class="color99 pull-right">\
                                <span class="glyphicon glyphicon-eye-open"></span>\
                                <span>{5}</span>\
                            </div>\
                        </div>\
                        <p class="color99 ellipsis f12">{5}</p>\
                    </div></a>\
                    </div>\
            ',

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
                    }
                    else{
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
                    //alert(datas);
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
                    var advertisement =
                        '<a href="/applyHome.php" target="_blank" class="thumbnail adImg">\
                            <img class="lazy" src="public/index/images/banner_zhaomu.png" alt="">\
                        </a>\
                        ';
                    var bwrap = $('<div class="col-lg-3 col-md-4 col-sm-4 col-xs-6"></div>');
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

                            s_big = Tools.stringFormat(compiliter.bightml,v.roomNumber,v.image,ndecodeURI(v.nickName),compiliter.tolive(v.online,1),v.totalpoint, v.numbers,ndecodeURI(v.nickName),compiliter.totime(v.onlineTime), compiliter.toCity(v.city));
                            bwrap.append(s_big);
                            bwrap.append(advertisement);

                        }else if(k>0 && k<=6){
                            s_sml = Tools.stringFormat(compiliter.lithtml,"col-lg-2 col-md-3 col-sm-3 col-xs-6",v.roomNumber,v.image, ndecodeURI(v.nickName),v.totalpoint,compiliter.tolive(v.online,1),v.numbers,ndecodeURI(v.nickName),compiliter.totime(v.onlineTime));
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
                    var advertisement =
                        '<a href="#" target="_blank" class="thumbnail adImg">\
                            <img class="lazy" src="public/index/images/banner_zhaomu.png" alt="">\
                        </a>\
                        ';
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
                            bwrap.append(advertisement);
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

        compiliter.parseAnchors(ulList.anc_hot,"hot");
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
                        li += Tools.stringFormat(compiliter.gameHtml,v.roomNumber,compiliter.tolive(v.online,1),v.image, ndecodeURI(v.nickName), ndecodeURI(v.nickName),v.numbers,ndecodeURI(v.title));
                    })
                    $("#gameAnchors").append(li);

                    $(".recomm img.lazy").lazyload({
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
                            item+='<div class="item '+$active+'"><a href="'+v.url+'"><img class="lazy" data-src="'+v.image+'" alt="900x500" src="'+v.image+'" data-holder-rendered="true"/></a></div>';
                        }else{
                            item+='<div class="item '+$active+'"><a href="javascript:;"><img class="lazy" data-src="'+v.image+'" alt="900x500"  src="'+v.image+'" data-holder-rendered="true"/></a></div>';
                        }
                        if(k==0){
                            lo='<li data-target="#carousel-example-captions" data-slide-to="'+k+'" class="active"></li>';
                        }else{
                            lo+='<li data-target="#carousel-example-captions" data-slide-to="'+k+'" class=""></li>';
                        }
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
