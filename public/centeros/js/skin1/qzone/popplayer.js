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
$(function(){
	$("#writeBg").click(function(){
		$("#modify").fadeIn().slideDown();
	});
	$("#modBtn").click(function(){
		$("#modify").fadeOut().slideUp();
	});
	$(".chargeBg").click(function(){
		$(".qkCharge").fadeIn().slideDown();
	});
	$(".chargeBtn .btn").click(function(){
		$(".qkCharge").fadeIn().slideDown();
	});
	$('#close').click(function(ev){
			$('.qkCharge').fadeOut().slideUp();
			ev.stopPropagation();//阻止冒泡	
	});


    var Mycare = {};
    Mycare.listlen=0;
    Mycare.loop=0;
    canBottomNum=0;

    Mycare.li='<li class="clearFix">\
        <img class="fl" src="{1}" alt="{2}">\
        <span class="deg fl sprite liverlevel-pic_liverlevel_{3}"></span>\
        <a href="{0}" target="_blank" class="fl entry">\
        <p class="name">{4}</p>\
        <p class="state">{5}</p>\
        </a>\
        </li>';
    Mycare.init=function(){
        htm ="";
        Tools.getDate({
            url: '/rest/homeAnchors/followList.mt',
            data: {userid:currentUserId}
        }, function (data) {
            if (data != null) {
                $x=data.data;
                var  $listObj = $.extend(true,$x,data.data);
                $num=$listObj.length;
                $.each($listObj, function() {
                    var _self = $(this)[0];
                    if(_self.tj!=undefined && _self.Abc!=undefined =="11"){_self.nickname += "c"};
                    if (_self.online == true) {
                        htm += Tools.stringFormat(Mycare.li,_self.roomNumber,_self.imagePrivate, _self.nickName,_self.totalpoint,_self.nickName, "<p>已开播</p>");
                    }else{
                        htm += Tools.stringFormat(Mycare.li,_self.roomNumber,_self.imagePrivate, _self.nickName,_self.totalpoint,_self.nickName, "<p>未开播</p>");
                    }
                })
                $(".focus h3 span").html('');
                $(".focus .focusList").html(htm);

                Mycare.listlen=$num*1;
                if(Mycare.listlen>3){
                    canBottomNum = Math.floor(Mycare.listlen/5);
                    Mycare.addEvent();
                    $(".focus .xii").removeClass('xia_hover').addClass('xia');
                }
            }
        });

    };

    var canTop=false;
    var canBottom=false;
    // alert(Math.ceil(12/5));
    Mycare.addEvent=function(){
        var li_len=64;
        scrollerTop=0;
        scrollNum=0;
        function changeClose(name1){
            switch (name1){
                case 'xia':
                    $(".focus .xii").removeClass('xia').addClass('xia_hover');
                    break;
                case 'shang':
                    $(".focus .shh").removeClass('shang').addClass('shang_hover');
                    break;
                case 'shang_hover':
                    $(".focus .shh").removeClass('shang_hover').addClass('shang');
                    break;
                case 'xia_hover':
                    $(".focus .xii").removeClass('xia_hover').addClass('xia');
                    break;
            }
        }
        function setScrollRange(range){
            scrollerTop = range;
        }

        $('.focus').on('click','.xia',function(){
            if(canBottomNum>0){
                $('.list_care .focusList').animate({top:scrollerTop -li_len * 3}, 300);
                canBottomNum--;
                scrollNum++;
                setScrollRange(-scrollNum*180);
                if(canBottomNum <=0){
                    changeClose('xia');
                }
                changeClose('shang_hover');
            }
        });

        $('.focus').on('click','.shang',function(){
            $('.list_care .focusList').animate({top:scrollerTop + li_len * 3}, 300);
            scrollNum--;
            canBottomNum++;
            setScrollRange(-scrollNum*180);
            if(scrollNum<=0){
                changeClose('shang');
            }
            changeClose('xia_hover');
        });

    }

    Mycare.init();

});