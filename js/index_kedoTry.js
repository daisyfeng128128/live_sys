// JavaScript Document
//create on 2016-10-25 14.10
$(document).ready(function(){
	function SwapTab(name, title, content, Sub, cur) {
    $(name + ' ' + title).mouseover(function () {
        $(this).addClass(cur).siblings().removeClass(cur);
        $(content + " > " + Sub).eq($(name + ' ' + title).index(this)).show().siblings().hide();
    })
}
$(function () {
    SwapTab(".captitle", "a", ".cons", ".foLi", "active");
    SwapTab("#orderTit", "li", "#orderBody", ".orderItem", "active");
})

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
    Mycare.li = '<li class="clearFix"><a href="/{0}" target="_blank">\
                <img class="fl" src="{1}" alt="{2}">\
                <span class="diamond fl sprite liverlevel-pic_liverlevel_{3}"></span>\
                <span class="name fl">{4}</a></span>\
                {5}\
                </li>';
    Mycare.lii =
        '<div class="row foLi"><a href="/{0}"  target="_blank">\
            <img class="pull-left" src="{1}" alt="{2}">\
            <div class="pull-left">\
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
                    if(_self.tj!=undefined && _self.Abc!=undefined =="11"){_self.nickname += "c"};
                    if (_self.online == true) {
                        htm += Tools.stringFormat(Mycare.lii,_self.roomNumber,_self.imagePrivate, _self.nickName, _self.nickName,_self.nickName, "<p><span>"+Math.ceil(_self.onlineTime/600000)+"</span>分钟前开播</p>",_self.totalpoint);
                    }else{
                        htm += Tools.stringFormat(Mycare.lii,_self.roomNumber,_self.imagePrivate, _self.nickName, _self.nickName,'<p class="ynLiv">未开播</p>',_self.totalpoint);
                    }
                })
                $(".follow .caption .boxx").html(htm);

                Mycare.listlen=$num*1;
                if(Mycare.listlen>5){
                    canBottomNum = Math.floor((Mycare.listlen-1)/5);
                    Mycare.addEvent();
                    $(".follow .titD .xii").removeClass('glyphicon-menu-down-hover').addClass('glyphicon-menu-down');
                }
            }
        });
    };

    var canTop=false;
    var canBottom=false;
    // alert(Math.ceil(12/5));


    Mycare.addEvent=function(){
        var li_len=67;
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
                $('.follow .caption .boxx').animate({top:scrollerTop -li_len * 5}, 300);
                canBottomNum --;
                scrollNum ++;
                setScrollRange(-scrollNum*290);
                if(canBottomNum <=0){
                    changeClose('glyphicon-menu-down');
                }
                changeClose('glyphicon-menu-up-hover');
            }
        });
        $('.titD').on('click','.glyphicon-menu-up',function(){
            $('.follow .caption .boxx').animate({top:scrollerTop + li_len * 5}, 300);
            scrollNum--;
            canBottomNum++;
            setScrollRange(-scrollNum*290);
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
                <img class="rank_pho" src="{1}" alt="{2}">\
                    {3}\
                <span class="diamond fl sprite liverlevel-pic_liverlevel_{4}"></span>\
                <a href="{5}" target="_blank"><span class="name fl">{6}</span> </a>\
            </li>';
    var ht_rans='<div class="row foLi"><a href="{0}">\
                    <img class="pull-left" src="{1}" alt="{2}"/>\
                <div class="pull-left">\
                    <p class="name">{3}</p>\
                </div>\
                <div class="pull-left spriteLev liverlevel-pic_liverlevel_{4}"></div>\
                </a></div>';
    function parse_to_board(listid,url,type){
        Tools.getJson({
            url: url,
            data: ""
        }, function (data) {
            if(data == "" || data ==undefined){
                return 0;
            }
            data=JSON.parse(data);

            if (data.data != null && data.data.length > 0) {
                var s_ht3;
                var roomnumber="javascript:;";
                $.each(data.data, function(k, v) {
                    if(type == "anchor"){
                        roomnumber = v.roomNumber;
                    }
                    if(k==0){
                        s_ht3 = Tools.stringFormat(ht_rans,roomnumber,v.avatar, v.nickname, v.nickname,v.totalpoint);
                    }else{
                        s_ht3 = Tools.stringFormat(ht_rans,roomnumber,v.avatar, v.nickname, v.nickname,v.totalpoint);
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
            '<a href="{0}" class="thumbnail firHot">\
            <img src="{1}" alt="{2}"/>\
            <span class="glyphicon glyphicon-stats"></span>\
                <div class="firT thumbnail">\
                    <div class=""></div>\
                    <p class="text-center">人数：<span>{3}</span></p>\
                     </div>\
                <div class="firB ellipsis">\
                    <p class="colorPin f16">{4}</p>\
                    <p class="clearfix f12">\
                        <span class="glyphicon glyphicon-user"></span>\
                        <span>{5}</span>\
                        <span>分钟之前开播</span>\
                        <span class="glyphicon glyphicon-map-marker"></span>\
                        <span>{6}</span>\
                    </p>\
                </div>\
                <div class="shadow thumbnail"></div>\
                <div class="playBtn"></div></a>',
        bightmlNew:
            '<a href="{0}" class="thumbnail firHot">\
            <img src="{1}" alt="{2}"/>\
                <div class="firB ellipsis">\
                    <p class="colorPin f16">{3}</p>\
                    <p class="clearfix f12">\
                        <span class="glyphicon glyphicon-eye-open"></span>\
                        <span>{4}</span>\
                        <span class="glyphicon glyphicon-fire"></span>\
                        <span>{5}</span>\
                    </p>\
                </div>\
                <div class="shadow thumbnail"></div>\
                <div class="playBtn"></div></a>',

        lithtml:
            '<div class="{0}">\
                    <a href="{1}" class="hotItem thumbnail">\
                    <img src="{2}" alt="{3}"/>\
                    <span class="glyphicon glyphicon-stats"></span>\
                        <div class="hotT thumbnail">\
                            <div class=""></div>\
                            <p class="text-center">人数：<span>{4}</span></p>\
                        </div>\
                        <div class="hotB">\
                            <div class="colorPin f14 ellipsis">{5}</div>\
                            <p class="f12">\
                                <span>{6}</span>\
                                <span>分钟之前</span>\
                            </p>\
                        </div>\
                        <div class="playBtn"></div>\
                    </a>\
                    </div>',
        lithtmlNew:
            '<div class="{0}">\
                    <a href="{1}" class="hotItem thumbnail">\
                        <img src="{2}" alt="{3}"/>\
                        <div class="hotB">\
                            <div class="colorPin f14 ellipsis">{4}</div>\
                            <p class="f12 ellipsis">\
                                <span class="glyphicon glyphicon-eye-open"></span>\
                                <span>{5}</span>\
                            </p>\
                        </div>\
                    </a>\
            </div>',

        sonh:
            '<a href="#" class="hotItem thumbnail">\
            <img src="images/girl02.png" alt="">\
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
                <a href="{0}" class="thumbnail">\
                <div class="recommImg thumbnail">\
                    <img src="{1}?w=234&h=127" alt="{2}" style="width: 234px;height:127px"/>\
                    <div class="thumb-bar"></div>\
                    <div class="shadow"></div>\
                    <div class="playBtn"></div>\
                </div>\
                <div class="recommB">\
                    <div class="clearfix">\
                        <span class="color33 pull-left">{3}</span>\
                        <div class="color99 pull-right">\
                            <span class="glyphicon glyphicon-eye-open"></span>\
                            <span>{4}</span>\
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
        tolive:function(s,b){
            if(s == null){
                return '';
            }
            if(s !="0" || s != 0 ){
                if(b ==1){
                    return '<span class="Biszb"></span>';
                }
                else{
                    return '<span class="iszb"></span>';
                }
            }else{
                return '';
            }
        }
    };

    compiliter.parseAnchors = function(){
    	var anchor=[{"city":"","image":"http:\/\/images.181show.com\/da46e9e3777d2fdb5a6365da429ac775","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u964c\u964c\u4e0d\u9ad8\u5174","numbers":"0","online":"0","onlineTime":0,"roomNumber":"10001","totalpoint":"5"},
    	{"city":"","image":"http:\/\/images.181show.com\/dc03386c5b279505fd183f7def087495","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u8089\u8089\u7684\u8349\u8393","numbers":"0","online":"0","onlineTime":0,"roomNumber":"10002","totalpoint":"5"},
    	{"city":"","image":"http:\/\/images.181show.com\/37167dca57bb8eddff048cff31e73448","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u5c0f\u871c\u6843","numbers":"0","online":"0","onlineTime":0,"roomNumber":"10003","totalpoint":"8"},
    	{"city":"","image":"http:\/\/images.181show.com\/8b023d13b6b55ebae8cb1ece92848e73","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u5c0f\u4e0d\u70b9\u4e0d\u9ad8\u5174","numbers":"0","online":null,"onlineTime":0,"roomNumber":"10004","totalpoint":"5"},
    	{"city":"","image":"http:\/\/images.181show.com\/4bf40b2d4ef7d16177e56f64a1164399","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u5e03\u5c0f\u55b5\u2192\u2190","numbers":"0","online":null,"onlineTime":0,"roomNumber":"10007","totalpoint":"1"},
    	{"city":"","image":"http:\/\/images.181show.com\/692f5264befb8009e8ea5e4d84e01460","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u9759\u5019\u4f73\u97f3","numbers":"0","online":"0","onlineTime":0,"roomNumber":"10009","totalpoint":"1"},
    	{"city":"","image":"http:\/\/images.181show.com\/bc98922261e3ca4feff56f79701fd9c8","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u5c0f\u4ed9\u5973\u742a\u742a","numbers":"0","online":null,"onlineTime":0,"roomNumber":"10010","totalpoint":"1"},
    	{"city":"","image":"http:\/\/images.181show.com\/8a13d367021281692b4433c893d2d78b","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u4ece\u5fc3\u5f00\u59cb","numbers":"0","online":null,"onlineTime":0,"roomNumber":"10011","totalpoint":"1"},
    	{"city":"","image":"http:\/\/images.181show.com\/1e018829047f6204925e2cadc7740671","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u5c0f\u83ab\u83ab\u7231\u5531\u6b4c","numbers":"0","online":null,"onlineTime":0,"roomNumber":"10012","totalpoint":"1"},
    	{"city":"","image":"http:\/\/images.181show.com\/8cf20aeb93688622d80e2a9a2d901c53","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u51b7\u82e5\u51b0\u971c","numbers":"0","online":null,"onlineTime":0,"roomNumber":"10014","totalpoint":"1"},
    	{"city":"","image":"http:\/\/images.181show.com\/b73e674261e7f81ec9840b6fa22be862","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u598d\u598dAmi","numbers":"0","online":null,"onlineTime":0,"roomNumber":"10015","totalpoint":"1"},
    	{"city":"","image":"http:\/\/images.181show.com\/bbf79e87261f68a3a4cd485068f67f5c","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u8c46\u8c46","numbers":"0","online":null,"onlineTime":0,"roomNumber":"10016","totalpoint":"1"},
    	{"city":"\u5e7f\u5143\u5e02","image":"http:\/\/images.181show.com\/7494cef5a7f73e5505153b86cb05f9c8","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u6628\u5929\u7684\u4e8b\u60c5","numbers":"0","online":null,"onlineTime":0,"roomNumber":"10021","totalpoint":"3"},
    	{"city":"","image":"http:\/\/images.181show.com\/f9ff6aff8fe39b7f1f019211e0428492","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"Fantasy","numbers":"0","online":null,"onlineTime":0,"roomNumber":"10022","totalpoint":"1"},
    	{"city":"","image":"http:\/\/images.181show.com\/c8b064da691cbd42c425d425e86e4996","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u6652\u592a\u9633\u4e00\u53f7","numbers":"0","online":"0","onlineTime":0,"roomNumber":"1001","totalpoint":"6"},
    	{"city":"","image":"http:\/\/images.181show.com\/8cf20aeb93688622d80e2a9a2d901c53","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u874c\u86aa\u76f4\u64ad\u62db\u52df","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1007","totalpoint":"5"},
    	{"city":"","image":"http:\/\/images.181show.com\/f9ff6aff8fe39b7f1f019211e0428492","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u718a\u5409","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1008","totalpoint":"1"},
    	{"city":"","image":"http:\/\/images.181show.com\/46cb6eb14780d5604787e266e33c7772","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u6cbb\u6108\u7cfb\u2764\u6960\u6960","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1013","totalpoint":"3"},
    	{"city":"","image":"http:\/\/images.181show.com\/3319fc08b4deb43c9d3fc5fa3fcba9b8","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u8f6f\u8f6f\u4e36","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1011","totalpoint":"1"},
    	{"city":"","image":"http:\/\/images.181show.com\/2cebf9a46e6326e780865147f3d4f998","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u563f\uff0c\u6211\u662f\u5927\u7f8e\uff01","numbers":"0","online":"1","onlineTime":0,"roomNumber":"1009","totalpoint":"2"},
    	{"city":"","image":"http:\/\/images.181show.com\/e3d19f37d7e37096f05be8fbb9570c92","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u6de1\u6de1DE","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1015","totalpoint":"1"},
    	{"city":"\u7ef5\u9633\u5e02","image":"http:\/\/images.181show.com\/fbd9e3aa94dea5e17b9db13d4e921cf1","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u96c5\u59b9\u59b9\u4e36","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1014","totalpoint":"1"},
    	{"city":"","image":"http:\/\/images.181show.com\/f1c187e1829b7e8a7d502eb3d2f76128","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u6ecb\u6ecb \u3043","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1020","totalpoint":"2"},
    	{"city":"","image":"http:\/\/images.181show.com\/f306f4f45dc64a5dba4d795004e17f20","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u4e5d\u59b9 \ud83c\udf49","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1017","totalpoint":"1"},
    	{"city":"","image":"http:\/\/images.181show.com\/bcb05f903766a38e425fb285b62999a9","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u6708\u4eae\u5c0f\u5fae","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1018","totalpoint":"1"},
    	{"city":"","image":"http:\/\/images.181show.com\/3c3b645eee9b3badc80ac8bbc5e998c5","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u5c0f\u96e8\u71d5","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1022","totalpoint":"1"},
    	{"city":"","image":"http:\/\/images.181show.com\/394ed018603d43355eac42cd055ff710","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u6843\u5b89","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1021","totalpoint":"1"}];
    	/*if(anchor == "" || anchor ==undefined){
                return 0;
        }*/
        /*try{
        	var datas=JSON.parse(anchor);
        	console.log(datas);
        }catch(e){
        	alert("catch");
        	var datas="";
        	return false;
        }*/

        var $h="hotList";
        if (anchor != null && anchor.length > 0) {
        		//alert(datas.length);
        		console.log(anchor);
                var row1=anchor.slice(0,13);
                console.log(row1);
                var row2=anchor.slice(5,15);
                var row3=anchor.slice(15,21);
                var row4=anchor.slice(17,25);
                

                var s_big,s_sml;
                var bwrap = $('<div class="col-lg-3 col-md-4 col-sm-4 col-xs-6"></div>');
                var swrap = $('<div class="col-lg-9 col-md-8 col-sm-8 col-xs-6"></div>');
                var srow = $('<div class="row"></div>');
                $.each(row1, function(k, v) {
                    if(v.image =="" || v.image == null ){
                        v.image ="http://images.181show.com/c32caba0b2bb669870247e21125c6d16";
                    }
                    if(k==0){
                        s_big = Tools.stringFormat(compiliter.bightml,v.roomNumber,v.image,v.nickName, v.numbers,v.nickName,compiliter.totime(v.onlineTime), v.city);
                        bwrap.append(s_big);
                    }else if(k>0 && k<=4){
                        s_sml = Tools.stringFormat(compiliter.lithtml,"col-lg-2 col-md-3 col-sm-4 col-xs-6",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime));
                    }else if(k>4 && k <=6){
                        s_sml = Tools.stringFormat(compiliter.lithtml,"col-lg-2 col-md-3 col-sm-4 hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime));
                    }else if(k>6 && k <=8){
                        s_sml = Tools.stringFormat(compiliter.lithtml,"col-lg-2 col-md-3 hidden-sm hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime));
                    }else if(k>8 && k <=12){
                        s_sml = Tools.stringFormat(compiliter.lithtml,"col-lg-2 hidden-md hidden-sm hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime));
                    }
                    srow.append(s_sml);

                })
                swrap.append(srow);
                $("#"+$h+" .hrow1").append(bwrap);
                $("#"+$h+" .hrow1").append(swrap);

                var s2wrap="";
                $.each(row2, function(k, v) {
                    if(v.image =="" || v.image == null ){
                        v.image ="http://images.181show.com/c32caba0b2bb669870247e21125c6d16";
                    }
                    if(k<=1){
                        s2wrap +=Tools.stringFormat(compiliter.lithtml,"hidden-lg hidden-md hidden-sm col-xs-3",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime));
                    }else if(k>1 && k <=2){
                        s2wrap +=Tools.stringFormat(compiliter.lithtml,"hidden-lg hidden-md col-sm-3 col-xs-3",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime));
                    }else if(k>2 && k <=5){
                        s2wrap +=Tools.stringFormat(compiliter.lithtml,"hidden-lg col-md-2 col-sm-3 col-xs-3",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime));
                    }else{

                        s2wrap +=Tools.stringFormat(compiliter.lithtml,"hidden-lg col-md-2 col-sm-3 hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime));
                    }
                })

                $("#"+$h+" .hrow2").append(s2wrap);

                var s3wrap ="";
                var s3img =
                    '<div class="col-lg-3 col-md-4 col-sm-4 col-xs-6">\
                        <a href="#" class="thumbnail">\
                            <img src="/images/kedo/hotImg.png" alt="">\
                        </a>\
                    </div>';

                $.each(row3, function(k, v) {
                    if(v.image =="" || v.image == null ){
                        v.image ="http://images.181show.com/c32caba0b2bb669870247e21125c6d16";
                    }
                    if(k<=1){
                        s3wrap += Tools.stringFormat(compiliter.lithtml,"col-lg-2 col-md-3 col-sm-4 col-xs-6",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }else if(k == 2){
                        s3wrap += Tools.stringFormat(compiliter.lithtml,"col-lg-2 col-md-3 col-sm-4 hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }else if(k==3){
                        s3wrap += Tools.stringFormat(compiliter.lithtml,"col-lg-2 col-md-3 hidden-sm hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }else{
                        s3wrap += Tools.stringFormat(compiliter.lithtml,"col-lg-2 hidden-md hidden-sm hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }
                })
                var s3html = $('<div class="col-lg-9 col-md-8 col-sm-8 col-xs-6"></div>');
                s3html.append($('<div class="row"></div>').append(s3wrap));
                $("#"+$h+" .hrow3").append(s3img);
                $("#"+$h+" .hrow3").append(s3html);

                

                var s4wrap="";
                $.each(row4, function (k,v) {
                    if(v.image =="" || v.image == null ){
                        v.image ="http://images.181show.com/c32caba0b2bb669870247e21125c6d16";
                    }
                    if(k==0){
                        s4wrap += Tools.stringFormat(compiliter.lithtml,"hidden-lg hidden-md hidden-sm col-xs-3",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }else if(k == 1){
                        s4wrap += Tools.stringFormat(compiliter.lithtml,"hidden-lg hidden-md col-sm-3 col-xs-3",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }else if(k>1 || k<=3){
                        s4wrap += Tools.stringFormat(compiliter.lithtml,"hidden-lg col-md-2 col-sm-3 col-xs-3",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }else if(k==4){
                        s4wrap += Tools.stringFormat(compiliter.lithtml,"hidden-lg col-md-2 col-sm-3 hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }else{
                        s4wrap += Tools.stringFormat(compiliter.lithtml,"hidden-lg col-md-2 hidden-sm hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }
                });
                $("#"+$h+" .hrow4").append(s4wrap);        
        }
        
    }

   
    compiliter.parseNewAnchors = function(url,type){
    	var anchorNew=[{"city":"","image":"","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u6735\u6735","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1034","totalpoint":"1"},{"city":"\u5e7f\u5143","image":"http:\/\/images.181show.com\/d6cf736aafa0f79313e986a19dc0d8eb","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u6625\u5929\u7684\u96ea\u82b1","numbers":"0","online":"0","onlineTime":0,"roomNumber":"1032","totalpoint":"1"},{"city":"","image":"http:\/\/images.181show.com\/c5f59f0b306fbf3a27a65df45ee60094","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u6735\u6735\u5440","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1030","totalpoint":"1"},{"city":"","image":"http:\/\/images.181show.com\/49e47f67557b2fdff1807130397b14ec","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u03b9 \u5154\u5b50\u590f\u76ee","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1029","totalpoint":"1"},{"city":"","image":"http:\/\/images.181show.com\/2203b0a4b47e78812e73f41ee10807c4","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u7cd6\u7cd6baby","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1028","totalpoint":"1"},{"city":"","image":"http:\/\/images.181show.com\/815cb8fea58d370b3fc4098870cfbd28","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u7eb8\u9e22","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1027","totalpoint":"1"},{"city":"","image":"http:\/\/images.181show.com\/abff32180f257586bda80d7fc41a19a4","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u63d0\u83ab\u961f\u957f\u6b63\u5728\u9001\u547d\uff0c","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1024","totalpoint":"1"},{"city":"","image":"http:\/\/images.181show.com\/b921960259b9b618d156a6443ec72ed2","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u6c61\u529b\u5927\u80f8\u5f1f","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1025","totalpoint":"3"},{"city":"","image":"http:\/\/images.181show.com\/45ecdffc3c09b8d801c55fa45212e5f8","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u9b45\u60d1","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1026","totalpoint":"1"},{"city":"","image":"http:\/\/images.181show.com\/5de2dfa9b102da0d3e8fea5ce7999531","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u8bfa\u8bfa","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1023","totalpoint":"1"},{"city":"","image":"http:\/\/images.181show.com\/394ed018603d43355eac42cd055ff710","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u6843\u5b89","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1021","totalpoint":"1"},{"city":"","image":"http:\/\/images.181show.com\/3c3b645eee9b3badc80ac8bbc5e998c5","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u5c0f\u96e8\u71d5","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1022","totalpoint":"1"},{"city":"","image":"http:\/\/images.181show.com\/bcb05f903766a38e425fb285b62999a9","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u6708\u4eae\u5c0f\u5fae","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1018","totalpoint":"1"},{"city":"","image":"http:\/\/images.181show.com\/f306f4f45dc64a5dba4d795004e17f20","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u4e5d\u59b9 \ud83c\udf49","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1017","totalpoint":"1"},{"city":"","image":"http:\/\/images.181show.com\/f1c187e1829b7e8a7d502eb3d2f76128","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u6ecb\u6ecb \u3043","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1020","totalpoint":"2"},{"city":"\u7ef5\u9633\u5e02","image":"http:\/\/images.181show.com\/fbd9e3aa94dea5e17b9db13d4e921cf1","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u96c5\u59b9\u59b9\u4e36","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1014","totalpoint":"1"},{"city":"","image":"http:\/\/images.181show.com\/e3d19f37d7e37096f05be8fbb9570c92","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u6de1\u6de1DE","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1015","totalpoint":"1"},{"city":"","image":"http:\/\/images.181show.com\/2cebf9a46e6326e780865147f3d4f998","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u563f\uff0c\u6211\u662f\u5927\u7f8e\uff01","numbers":"0","online":"1","onlineTime":0,"roomNumber":"1009","totalpoint":"2"},{"city":"","image":"http:\/\/images.181show.com\/3319fc08b4deb43c9d3fc5fa3fcba9b8","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u8f6f\u8f6f\u4e36","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1011","totalpoint":"1"},{"city":"","image":"http:\/\/images.181show.com\/46cb6eb14780d5604787e266e33c7772","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u6cbb\u6108\u7cfb\u2764\u6960\u6960","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1013","totalpoint":"3"},{"city":"","image":"http:\/\/images.181show.com\/f9ff6aff8fe39b7f1f019211e0428492","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u718a\u5409","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1008","totalpoint":"1"},{"city":"","image":"http:\/\/images.181show.com\/8cf20aeb93688622d80e2a9a2d901c53","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u874c\u86aa\u76f4\u64ad\u62db\u52df","numbers":"0","online":null,"onlineTime":0,"roomNumber":"1007","totalpoint":"5"},{"city":"","image":"http:\/\/images.181show.com\/c8b064da691cbd42c425d425e86e4996","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u6652\u592a\u9633\u4e00\u53f7","numbers":"0","online":"0","onlineTime":0,"roomNumber":"1001","totalpoint":"6"},{"city":"","image":"http:\/\/images.181show.com\/da46e9e3777d2fdb5a6365da429ac775","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u964c\u964c\u4e0d\u9ad8\u5174","numbers":"0","online":"0","onlineTime":0,"roomNumber":"10001","totalpoint":"5"},{"city":"","image":"http:\/\/images.181show.com\/dc03386c5b279505fd183f7def087495","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u8089\u8089\u7684\u8349\u8393","numbers":"0","online":"0","onlineTime":0,"roomNumber":"10002","totalpoint":"5"},{"city":"","image":"http:\/\/images.181show.com\/37167dca57bb8eddff048cff31e73448","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u5c0f\u871c\u6843","numbers":"0","online":"0","onlineTime":0,"roomNumber":"10003","totalpoint":"8"},{"city":"","image":"http:\/\/images.181show.com\/8b023d13b6b55ebae8cb1ece92848e73","levelImg":"sprite liverlevel-pic_liverlevel_1","nickName":"\u5c0f\u4e0d\u70b9\u4e0d\u9ad8\u5174","numbers":"0","online":null,"onlineTime":0,"roomNumber":"10004","totalpoint":"5"}];
    		/*if(anchorNew == "" || anchorNew ==undefined){
                return 0;
            }*/

            /*try{
            	var dealData=JSON.parse(anchorNew);
            }catch(e){
            	var dealData="";
            	return false;
            }*/

            var $new="newList";
            if (anchorNew != null && anchorNew.length > 0) {
                var row1=anchorNew.slice(0,13);
                var row2=anchorNew.slice(5,15);
                var row3=anchorNew.slice(15,21);
                var row4=anchorNew.slice(17,25);
                var rowAdd=anchorNew.slice(25,27);

                var s_big,s_sml;
                var bwrap = $('<div class="col-lg-3 col-md-4 col-sm-4 col-xs-6"></div>');
                var swrap = $('<div class="col-lg-9 col-md-8 col-sm-8 col-xs-6"></div>');
                var srow = $('<div class="row"></div>');
                $.each(row1, function(k, v) {
                    if(v.image =="" || v.image == null ){
                        v.image ="http://images.181show.com/c32caba0b2bb669870247e21125c6d16";
                    }
                    if(k==0){
                        s_big = Tools.stringFormat(compiliter.bightmlNew,v.roomNumber,v.image,v.nickName, v.numbers,v.nickName,compiliter.totime(v.onlineTime), v.city);
                        bwrap.append(s_big);
                    }else if(k>0 && k<=4){
                        s_sml = Tools.stringFormat(compiliter.lithtmlNew,"col-lg-2 col-md-3 col-sm-4 col-xs-6",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime));
                    }else if(k>4 && k <=6){
                        s_sml = Tools.stringFormat(compiliter.lithtmlNew,"col-lg-2 col-md-3 col-sm-4 hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime));
                    }else if(k>6 && k <=8){
                        s_sml = Tools.stringFormat(compiliter.lithtmlNew,"col-lg-2 col-md-3 hidden-sm hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime));
                    }else if(k>8 && k <=12){
                        s_sml = Tools.stringFormat(compiliter.lithtmlNew,"col-lg-2 hidden-md hidden-sm hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime));
                    }
                    srow.append(s_sml);
                })
                swrap.append(srow);
                $("#"+$new+" .hrow1").append(bwrap);
                $("#"+$new+" .hrow1").append(swrap);

                var s2wrap="";
                $.each(row2, function(k, v) {
                    if(v.image =="" || v.image == null ){
                        v.image ="http://images.181show.com/c32caba0b2bb669870247e21125c6d16";
                    }

                    if(k<=1){
                        s2wrap +=Tools.stringFormat(compiliter.lithtmlNew,"hidden-lg hidden-md hidden-sm col-xs-3",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime));
                    }else if(k>1 && k <=3){
                        s2wrap +=Tools.stringFormat(compiliter.lithtmlNew,"hidden-lg hidden-md col-sm-3 col-xs-3",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime));
                    }else if(k>3 && k <=7){
                        s2wrap +=Tools.stringFormat(compiliter.lithtmlNew,"hidden-lg col-md-2 col-sm-3 col-xs-3",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime));
                    }else if(k>7 && k <=9){
                        s2wrap +=Tools.stringFormat(compiliter.lithtmlNew,"hidden-lg col-md-2 col-sm-3 hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime));
                    }
                })

                $("#"+$new+" .hrow2").append(s2wrap);

                var s3wrap ="";
                var s3img ="";
                $.each(rowAdd,function(k,v){
                    if(v.image =="" || v.image == null ){
                        v.image ="http://images.181show.com/c32caba0b2bb669870247e21125c6d16";
                    }
                    if(k==0){
                        s3img += Tools.stringFormat(compiliter.lithtmlNew,"col-lg-6 col-md-3 col-sm-4 col-xs-6",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }else if(k==1){
                        s3img += Tools.stringFormat(compiliter.lithtmlNew,"col-lg-6 col-md-3 col-sm-4 col-xs-6",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }
                })

                $.each(row3, function(k, v) {
                    if(v.image =="" || v.image == null ){
                        v.image ="http://images.181show.com/c32caba0b2bb669870247e21125c6d16";
                    }
                    
                    if(k<=1){
                        s3wrap += Tools.stringFormat(compiliter.lithtmlNew,"col-lg-2 col-md-3 col-sm-4 col-xs-6",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }else if(k == 2){
                        s3wrap += Tools.stringFormat(compiliter.lithtmlNew,"col-lg-2 col-md-3 col-sm-4 hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }else if(k==3){
                        s3wrap += Tools.stringFormat(compiliter.lithtmlNew,"col-lg-2 col-md-3 hidden-sm hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }else{
                        s3wrap += Tools.stringFormat(compiliter.lithtmlNew,"col-lg-2 hidden-md hidden-sm hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }
                })
                var s3html = $('<div class="col-lg-9 col-md-8 col-sm-8 col-xs-6"></div>');
                var s3htmlAdd = $('<div class="col-lg-3 col-md-4 col-sm-4 col-xs-6"></div>');
                s3htmlAdd.append(s3img);
                s3html.append($('<div class="row"></div>').append(s3wrap));
                $("#"+$new+" .hrow3").append(s3htmlAdd);
                $("#"+$new+" .hrow3").append(s3html);
                    
                var s4wrap="";
                $.each(row4, function (k,v) {
                    if(v.image =="" || v.image == null ){
                        v.image ="http://images.181show.com/c32caba0b2bb669870247e21125c6d16";
                    }
                    if(k==0){
                        s4wrap += Tools.stringFormat(compiliter.lithtmlNew,"hidden-lg hidden-md hidden-sm col-xs-3",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }else if(k == 1){
                        s4wrap += Tools.stringFormat(compiliter.lithtmlNew,"hidden-lg hidden-md col-sm-3 col-xs-3",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }else if(k>1 || k<=3){
                        s4wrap += Tools.stringFormat(compiliter.lithtmlNew,"hidden-lg col-md-2 col-sm-3 col-xs-3",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }else if(k==4){
                        s4wrap += Tools.stringFormat(compiliter.lithtmlNew,"hidden-lg col-md-2 col-sm-3 hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }else{
                        s4wrap += Tools.stringFormat(compiliter.lithtmlNew,"hidden-lg col-md-2 hidden-sm hidden-xs",v.roomNumber,v.image, v.nickName,v.numbers,v.nickName,compiliter.totime(v.onlineTime))
                    }
                });
                $("#"+$new+" .hrow4").append(s4wrap);
            }
        
    }

    compiliter.parseAnchors();
    compiliter.parseNewAnchors();
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
                datas=JSON.parse(data);
            }
            catch (e)
            {
                datas="";
                return false;
            }
            var li="";
            if (datas != null && datas.length > 0) {
                $.each(datas, function(k, v) {
                    li += Tools.stringFormat(compiliter.gameHtml,v.roomNumber,v.image, v.nickName, v.nickName,v.numbers,"","");
                })
                $("#gameAnchors").append(li);
            }
        });
    }();
    compiliter.parseBanner=function(){
        Tools.getJson({
            url: ulList.anc_banner,
            data: ""
        }, function (data) {
            if(data == "" || data ==undefined){
                return 0;
            }
            datas=JSON.parse(data.json);
            var li="";
            var lo="";

            if (datas != null && datas.length > 0) {
                $.each(datas, function(k, v) {
                    if(v.url !=''){
                        li +='<li><a href="'+v.url+'" target="_blank"><img  src="'+v.image+'" alt="'+v.name+'" width="1128px;" height="298px;" /></a></li>';
                    }else{
                        li +='<li><img   src="'+v.image+'" width="1128px;" height="298px;" alt="'+v.name+'" /></li>';
                    }
                    if(k==0){
                        lo= '<li class="active"></li>';
                    }else{
                        lo += "<li></li>";
                    }
                })
                $("#bannerList").append(li);
                $("#ol").append(lo);
            }
        });
    }();


})

})