/**
 * Created by Administrator on 2016/10/19.
 */
// JavaScript Document
$(function(){
    var $aBtn=$(".amoLi li");
    var now=0;
    var paytype=$(".ways .cli").attr('ptype')?$(".ways .cli").attr('ptype'):"ZFB";
    paytype ="QQCloud"
    if($(".qqgameWay").attr("data-type") =="QQGame"){
        paytype ="QQCloud"
    }
    var btype="";
    var timer="";
    var request_num =0;
    var pay_url = {
        "ZFB": "/rest/www/alipay.jsp",
        "CFT": "/rest/www/tenpay.jsp",
        "ZXZF": "/rest/www/bpay.jsp",
        "QQCloud": "/rest/www/cloud.jsp"
    }
    String.prototype.gblen = function() {
        var len = 0;
        for (var i=0; i<this.length; i++) {
            if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {
                len += 2;
            } else {
                len ++;
            }
        }
        return len;
    }
    var pvalue,spvalue;
    $(".amoLi li").on("click",function(){
        $(this).addClass('clickBg').siblings().removeClass("clickBg");
        spvalue=$(this).find("span").attr("val");
        $("#P_RMB").text(spvalue/100);
        $("#P_DB").text(spvalue);
    })

    /*$aBtn.click(function(){
     now=$(this).index();
     $aBtn.removeClass('clickBg');
     $aBtn.eq(now).addClass('clickBg');
     spvalue=$(this).find("span").text();
     $("#P_RMB").text(spvalue.substr(0,spvalue.gblen()-4)/100);
     $("#P_DB").text(spvalue.substr(0,spvalue.gblen()-4));
     })
     */
    var $waysBtn=$(".ways li");
    $waysBtn.click(function(){
        now=$(this).index();
        tabCli($(this));
    })

    $(".banks").on("click","li",function(){
        btype=$(this).attr("btype");
        $("#WIDbank_type").val(btype);
        $(this).addClass("cli").siblings().removeClass("cli");
    })
    function sleep(numberMillis) {
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
                return;
        }
    }
    function tabCli(ths){
        paytype=ths.attr('ptype');
        $waysBtn.removeClass('cli');
        $waysBtn.eq(now).addClass('cli');
        $("#alpay").attr("action",pay_url[paytype]);
        if(paytype == "ZXZF"){
            $(".banks").slideDown();
        }else{
            if(!$(".banks").is(":hidden")){
                $(".banks").slideToggle();
            }
        }
    }
    $(".wximage .x").on("click",function(){
        $('.wxximage,.mks').hide();
        $('.wxximage img').remove();
        clearInterval(timer);
        request_num=0;
        $('.imChar').attr("disabled",false);
    });
    var $orderid='';
    $(".imChar").on("click",function(){
        if(currentUserId==null || currentUserId ==''){
            // login.show();
            //return false;
        }
        money= $("#P_RMB").text();
        $("#WIDtotal_fee").val(money);
        $("#WIDtotal_Id").val(currentUserId);
        var data={
            "openid":$("#openid").val(),
            "openkey":$("#openkey").val(),
            "pf":$("#pf").val(),
            "pfkey":$("#pfkey").val(),
            "WIDtotal_fee":money,
            "WIDtotal_Id":currentUserId
        };

        $.ajax({
            type: "POST",
            url: "/rest/www/cloud.jsp",
            data: data,
            cache: false
        }).done(function (data) {

            if(data != "fail"){
                //$(".paybox").html().show();
                $("body").append(data);
            }


        }).error(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        });
    });



})