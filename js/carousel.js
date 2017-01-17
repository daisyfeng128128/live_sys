// JavaScript Document
window.onload = function () {
    var oCaro = document.getElementById('carousel');
    var oPlay = document.getElementById('play');
    var oL = document.getElementById("ol");
    var aLi = oL.getElementsByTagName("li");
    var oUl = oPlay.children[2];

    var oNext = document.getElementById('ne');
    var oPrev = document.getElementById('pr');

    var now = 0;
    var ready = true;
    oUl.innerHTML += oUl.innerHTML;
    if(oUl.getElementsByTagName("li").length <3){
		return;
	}else{
		oUl.style.width = oUl.children.length * oUl.children[0].offsetWidth + 'px';

		for (var i = 0; i < aLi.length; i++) {//添加点击
			(function (index) {
				aLi[i].onclick = function () {
					now = index
					tab();
				};
			})(i);
		}
		function tab() {//切换
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].className = '';
			}
			if (now == aLi.length) {
				aLi[0].className = 'active';
			} else if (now < aLi.length) {
				aLi[now].className = 'active';
			}
			//oUl.style.left=-index*oUl.children[0].offsetWidth+'px';
			move(oUl, {left: -now * oUl.children[0].offsetWidth}, {
				time: 700, fn: function () {
					ready = true;
					if (now == aLi.length) {
						//归位
						oUl.style.left = 0;
						now = 0;
					}
				}
			});
		}

		function next() {
			now++;
			if (now == 2 * aLi.length) {
				now = aLi.length;
			}
			tab();

		}

		var timer = setInterval(next, 2500);
		oCaro.onmouseover = function () {
			clearInterval(timer);
		};
		clearInterval(timer);
		oCaro.onmouseout = function () {
			timer = setInterval(next, 2500);
		};

		oNext.onclick = function () {
			if (!ready) return;
			ready = false;
			now++;
			tab();
		};

		oPrev.onclick = function () {
			if (!ready) return;
			ready = false;
			now--;
			if (now == -1) {
				oUl.style.left = -oUl.offsetWidth / 2 + 'px';
				now = aLi.length - 1;
			}
			tab();
		};

		for (var i = 0; i < aLi.length; i++) {
			aLi[i].index = i;
			aLi[i].onmouseover = function () {
				now = this.index;
				tab();
			};
		}
	}
}


function SwapTab(name, title, content, Sub, cur) {
    $(name + ' ' + title).mouseover(function () {
        $(this).addClass(cur).siblings().removeClass(cur);
        $(content + " > " + Sub).eq($(name + ' ' + title).index(this)).show().siblings().hide();
    })
}
$(function () {
    SwapTab(".type", "a", ".cons", ".rank_list", "active");
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
                            htm += Tools.stringFormat(Mycare.li,_self.roomNumber,_self.imagePrivate, _self.nickName,_self.totalpoint,_self.nickName, "<p><span>"+Math.ceil(_self.onlineTime/600000)+"</span>分钟前开播</p>");
                        }else{
                            htm += Tools.stringFormat(Mycare.li,_self.roomNumber,_self.imagePrivate, _self.nickName,_self.totalpoint,_self.nickName, "<p>未开播</p>");
                        }
                    })
                    $(".follow_tit h3 span").html('');
                    $(".fr .follow .list").html(htm);

                    Mycare.listlen=$num*1;
                    if(Mycare.listlen>5){
                        canBottomNum = Math.floor((Mycare.listlen-1)/5);
                        Mycare.addEvent();
                        $(".follow_tit .xii").removeClass('xia_hover').addClass('xia');
                    }
                }
            });
        };

        var canTop=false;
        var canBottom=false;
       // alert(Math.ceil(12/5));
        Mycare.addEvent=function(){
            var li_len=52+6;
            scrollerTop=0;
            scrollNum=0;
            function changeClose(name1){
                switch (name1){
                    case 'xia':
                        $(".follow_tit .xii").removeClass('xia').addClass('xia_hover');
                        break;
                    case 'shang':
                        $(".follow_tit .shh").removeClass('shang').addClass('shang_hover');
                        break;
                    case 'shang_hover':
                        $(".follow_tit .shh").removeClass('shang_hover').addClass('shang');
                        break;
                    case 'xia_hover':
                        $(".follow_tit .xii").removeClass('xia_hover').addClass('xia');
                        break;
                }
            }
            function setScrollRange(range){
                scrollerTop = range;
            }

            $('.follow_tit').on('click','.xia',function(){
                if(canBottomNum>0){
                    $('.list_care .list').animate({top:scrollerTop -li_len * 5}, 300);
                    canBottomNum --;
                    scrollNum ++;
                    setScrollRange(-scrollNum*290);
                    if(canBottomNum <=0){
                        changeClose('xia');
                    }
                    changeClose('shang_hover');
                }
            });
            $('.follow_tit').on('click','.shang',function(){
                $('.list_care .list').animate({top:scrollerTop + li_len * 5}, 300);
                scrollNum--;
                canBottomNum++;
                setScrollRange(-scrollNum*290);
                if(scrollNum<=0){
                    changeClose('shang');
                }
                changeClose('xia_hover');
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
            "dayList":"/files/giftWeels.json",
            "weekList":"/files/giftMonth.json",
            "monthList":"/files/giftYear.json",
            "th_week":"/files/localTyrantDay.json",
            "th_month":"/files/localTyrantMonth.json",
            "th_year":"/files/localTyrantYear.json",
            "hy_week":"/files/fansActive.json",
            "hy_month":"/files/fansActive.json",
            "hy_year":"/files/fansActive.json",
            "anc_banner":"/files/banners.json",
            "anc_hot":"/files/anchors.json",
            "anc_new":"/files/newAnchors.json"
        }
        var ht_rank='<li class="clearFix">\
            <span class="icon_shuzi_{0} sprite_top fl"></span>\
                <img class="rank_pho" src="{1}" alt="{2}">\
                    {3}\
                <span class="diamond fl sprite liverlevel-pic_liverlevel_{4}"></span>\
                <a href="{5}" target="_blank"><span class="name fl">{6}</span> </a>\
            </li>';
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
                            s_ht3 = Tools.stringFormat(ht_rank,k+1,v.avatar, v.nickname,'<span class="crown"></span>',v.totalpoint,roomnumber,v.nickname);
                        }else{
                            s_ht3 = Tools.stringFormat(ht_rank,k+1,v.avatar, v.nickname,"",v.totalpoint,roomnumber,v.nickname);
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
                '<div class="first fl">\
                <a href="/{0}" target="_blank">\
                <em class="sprite_big_box biankuang-{1}"></em>\
                <img class="lazy" dataoriginal="{2}" longdesc="{3}" src="{4}" alt="{5}" style="display: block;">\
                <span class="sprite_l pic_liverlevel_L_{6}"></span>\
                <i>当前人数：{7}</i>\
                {8}\
                <div>\
                    <p>{9}</p>\
                    <p>{10}</p>\
                    <b class="b1"></b><b class="b2"></b></div></a>\
                </div>',
            lithtml:
                '<li class="fl">\
                <a href="/{0}" target="_blank">\
                <em class="sprite_small_box biankuang_{1}_little"></em>\
                <img class="lazy" dataoriginal="{2}" longdesc="{3}" src="{4}" alt="{5}" style="display: block;">\
                <span class="span sprite_s pic_liverlevel_S_{6}"></span>\
                <i>当前人数：{7}</i>\
                {8}\
                <div>\
                    <p>{9}</p>\
                    <p>{10}</p>\
                    <b class="b1"></b><b class="b2"></b></div></a>\
                </li>',
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
        compiliter.parseAnchors = function(url,type){
            Tools.getJson({
                url: url,
                data: ""
            }, function (data) {
                if(data == "" || data ==undefined){
                    return 0;
                }
                data=JSON.parse(data);
                data =data.data;
                if (data != null && data.length > 0) {
                    var s_big,s_sml;
                    var ul = $('<ul class="sright"></ul>');
                    $.each(data, function(k, v) {
                        if(k==0){
                            s_big = Tools.stringFormat(compiliter.bightml,v.roomNumber,compiliter.toboard(v.totalpoint),v.image, v.image,v.image,v.nickName,v.totalpoint, v.numbers,compiliter.tolive(v.online,1),v.nickName, compiliter.totime(v.onlineTime),v.city);
                        }else{
                            s_sml = Tools.stringFormat(compiliter.lithtml,v.roomNumber,compiliter.toboard(v.totalpoint),v.image, v.image,v.image,v.nickName,v.totalpoint, v.numbers,compiliter.tolive(v.online,0),v.nickName,compiliter.totime(v.onlineTime));
                        }
                        ul.append(s_sml);
                    })
                    if(type == "new"){
                        $container=".hotlistss";
                    }else{
                        $container=".breauList";
                    }
                    $($container).append(s_big);
                    $($container).append(ul);
                }
            });
        }
        compiliter.parseAnchors(ulList.anc_new,"new");
        compiliter.parseAnchors(ulList.anc_hot,"hot");
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
