
$(function(){
    var indexs={
        init: function(){
           // this.overlist();
            $(".seright ul li").each(function (index) {
                if((index+1)%5==0){
                    $(this).css("margin-right","0px");
                }
            });
            $('.s_btn').on({
                mouseover:function(){
                    $(this).css("background","url(/skin/ym/images/search-hover.png) no-repeat");
                },mouseleave:function(){
                    $(this).css("background","url(/skin/ym/images/search.png) no-repeat");
                }
            });

            $(".myname").hover(function(){
                $(".user-card").show();
            },function(){
                setTimeout(function(){
                    var divThis = $(".user-card");
                    if (!divThis.hasClass('hov'))
                    {
                        divThis.hide();
                    }
                }, 1000); // 延迟，这个看你多久合适。
            });
            $(".user-card").mousemove(function () {
                $(".user-card").addClass("hov");
            }).mouseleave(function(){
                $(".user-card").removeClass("hov").hide();

            });
        /*
            var sumWidth =0;
            $(".banner .flip-img").each(function(){
                sumWidth += $(this).outerWidth();
            });
            $(".banner").css("width",sumWidth);

            lefts=$(".banner").position().left;
            c_left =0;

            $(".uper").click(function(){
                if($(".banner").position().left < 0 || $(".banner").position().left ===0){
                    c_left +=345;
                }else{
                    c_left = 345-sumWidth;
                }
                if(sumWidth==345){
                    c_left = 0;
                }
                 $(".banner").animate({left:c_left+"px"});
            });

            $(".downer").click(function(){
                if((-$(".banner").position().left)+345 > sumWidth || (-$(".banner").position().left)+345 == sumWidth){
                    c_left =0;
                }else{
                    c_left -=345;
                }
                 $(".banner").animate({left:c_left+"px"});
            })*/
        },login: function () {
            $(".log").click(function(){
                login.show();
            })
            $(".reg").click(function(){
                login.reg();
            })
        },lunbo: function () {

            var oFull=$('.banner');
            var aFullImg=$('.banner .flip-img');

            var iNow=0;
            var timer=null;

            var oFullImg=aFullImg.eq(0).clone();
            oFull.append(oFullImg);

            var aFllImgL=oFull.find('.flip-img').length;
            var aFullImgW=parseInt(aFullImg.css('width'));
            oFull.css({'width':aFllImgL*100+'%'});

            $(".uper").click(function(){
              prevTab();
            });
            $(".downer").click(function(){
                nextTab();
            });
            timer=setInterval(nextTab,3000);
            var flag=true;
            function nextTab(){
                if(flag){
                    iNow++;
                    if(iNow>aFllImgL-1){
                        oFull.css({'left':0});
                        iNow=1;
                    };
                    tab();
                    flag=false;
                };
            };
            function prevTab(){
                if(flag){
                    iNow--;
                    if(iNow<0){
                        oFull.css({'left':-(aFllImgL-1)*aFullImgW});
                        iNow=aFllImgL-2;
                    };
                    tab();
                    flag=false;
                };
            };

            function tab(){
                oFull.animate({'left':-(aFullImg.eq(0).width())*iNow},function(){
                    flag=true;
                });
            };

        },mlist:function(){
            $(".title-list li").mouseover(function(){
                $(this).addClass("curr").siblings().removeClass("curr");
            })
        },SwapTab: function (name,title,content,Sub,cur) {
            $(name + ' ' + title).mouseover(function () {
                $(this).addClass(cur).siblings().removeClass(cur);
                $(content + " > " + Sub).eq($(name + ' ' + title).index(this)).show().siblings().hide();
            })
        },overlist: function () {
            $('.s_btn').on({
                mouseover:function(){
                    $(this).css("background","url(/skin/ym/images/search-hover.png) no-repeat");
                },mouseleave:function(){
                    $(this).css("background","url(/skin/ym/images/search.png) no-repeat");
                }
            });
            $(".list-Schedule").find("li").on({
                mouseover:function(){
                    $(this).addClass("hasimg").removeClass("noimg").siblings().addClass("noimg").removeClass("hasimg");
                    $(this).find(".weixianshi").show().sibling(".weixianshi").hide();
                    $(this).find(".yixianshi").hide().sibling(".yixianshi").show();
                }/*,mouseleave:function(){
                    $(this).addClass("noimg").removeClass("hasimg").siblings().addClass("hasimg").removeClass("noimg");
                    $(this).find(".yixianshi").show();
                    $(this).find(".weixianshi").hide();
                }*/
            })
        }

    }

    indexs.init();
    indexs.lunbo();
    indexs.login();
    indexs.mlist();
    indexs.SwapTab(".mxselect","a",".lll",".mxlist","active");

})
