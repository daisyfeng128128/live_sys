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
    if(oUl.getElementsByTagName("li").length==0){
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
        type: "GET",
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
Tools.postDate = function (params, callback) {
    $.ajax({
        type: "POST",
        url: params.url,
        data: params.data,
        dataType: "json",
        timeout: 1200000,
        success: function (data, textStatus, jqXHR) {
            if (data && data.nologin) {
                Main.alert('没有登录，请重新登录。');
            } else {
                callback(data, textStatus, jqXHR);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //alert(params.url+" error code:"+textStatus);
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

        Mycare.li = '<li class="clearFix"><a href="/{0}" target="_blank">\
                <img class="fl" src="/apis/avatar.php?uid={1}" alt="{2}">\
                <span class="diamond fl sprite liverlevel-pic_liverlevel_{3}"></span>\
                <span class="name fl">{4}</a></span>\
                {5}\
                </li>';

        Mycare.init=function(){
            htm ="";
            Tools.getDate({
                url: '/ajax/index_get_care.php',
                data: {}
            }, function (data) {
                if (data != null) {
                    $.each(data.array, function() {
                        var _self = $(this)[0];
                        if(_self.tj!=undefined && _self.Abc!=undefined =="11"){_self.nickname += "c"};
                        if (_self.online == true) {
                            htm += Tools.stringFormat(Mycare.li,_self.roomNumber,_self.userid, _self.nickname,17 ,_self.nickname, "<p><span>26</span>分钟前开播</p>");
                        }else{
                            htm += Tools.stringFormat(Mycare.li,_self.roomNumber,_self.userid, _self.nickname,17,_self.nickname, "<p>未开播</p>");
                        }
                    })
                    $(".follow_tit h3 span").html("("+data.num+")");
                    $(".fr .follow .list").html(htm);
                }
            });
        };
        Mycare.init();
    })