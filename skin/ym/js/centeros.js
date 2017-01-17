$(function () {
    $(".pi .cl-div").on({
        click:function(){
            var self=$(this);
            if(!self.hasClass("hasnenu")){
                return;
            }
            self.siblings(".cl-set-info").slideDown("slow");
            self.addClass("cl-focus");
            self.parents(".pi").siblings().each(function(){
                $(this).children().eq(0).removeClass("cl-focus").addClass("cl-div");
                $(this).children().eq(1).hide();
            });
            self.parents(".pi").siblings().children(".hasnenu .arrow-up").removeClass("arrow-up").addClass("arrow-down");

        }
    })
    $(".cl-focus").siblings(".cl-set-info").show();
    $(".cl-set-info ul li a").click(function(){
        $('.pi .cl-div').removeClass('cl-focus');
    })
    function closeWindow(fun){
        $(".zhezhao").hide();
        $("."+fun).hide();
        $("."+fun).parent().hide();
    }
    function showWindow(fun){
        $(".zhezhao").show();
        $("."+fun).show();
        $("."+fun).parent().show();
    }
    $(".find-bump-oxx").click(function () {
        closeWindow("phone-find-passwd1");

    });
    $(".ck-pass-phone").click(function(){
        showWindow("phone-find-passwd1");
    })

    function jump(count,cls) {
        window.setTimeout(function(){
            count--;
            if(count > 0) {
                $("."+cls+" i").html(count);
                jump(count);
            } else {
                //location.href="/";
            }
        }, 1000);
    }

    $(".fin-mb-send").click(function(){
        $(this).hide();
        $(".fmbResend").show();
        jump(60,"fmbResend");
    })
    $("#next-step").click(function () {
        closeWindow("phone-find-passwd1");
        showWindow("repass-next");
    });

})