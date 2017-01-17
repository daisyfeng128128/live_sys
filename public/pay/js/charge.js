// JavaScript Document
$(function(){
	var $aBtn=$(".amoLi li");
	var now=0;
    var paytype=$(".ways .cli").attr('ptype')?$(".ways .cli").attr('ptype'):"ZFB";

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
            login.show();
            return false;
        }
        if(paytype=="WXP"){
			$(this).attr("disabled",true);
           // window.open("/apis/Wxpay/example51543/wx_ajax_code.php?p3_Amt="+$("#P_RMB").text()+"&paychannel=3","_blank");
            $.ajax({
                type: "POST",
                url: "/public/pay/Wxpay/example51543/rtimg.php",
                data: "p3_Amt="+$("#P_RMB").text(),
                cache: false
            }).done(function (data) {
                data=jQuery.parseJSON(data);
                $orderid=data.orderid;
                $src='/public/pay/Wxpay/example51543/qrcode.php?data='+data.src;
                var $img = $('<img />');
                $img.attr("class",'wk').attr('src',$src);
                $img.appendTo($('.mn-box'));
                $('.wxximage,.mks').show();
                $('#mys').text($("#P_RMB").text());


                function payIsOk(){
                    if(request_num>20){
                        confirm("支付超时");
                        window.location.reload();
                        clearInterval(timer);
                    }
                    request_num ++;
                    $.ajax({
                        type: "POST",
                        url: "/public/pay/Wxpay/example51543/payIsOk.php",
                        data: "id="+$orderid,
                        cache: false
                    }).done(function (obj) {
                        if(obj !=""){
                            obj = jQuery.parseJSON(obj);
                            if(obj.code==200){
                                window.location.href='/public/pay/Wxpay/example51543/payIsOkRes.php';
                            }
                        }
                    });
                }
                timer=setInterval(payIsOk,2000);

            }).error(function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            });

        }else if(paytype=="ZFB" || paytype=="CFT"){
            var money=0;
            money= $("#P_RMB").text();
            $("#WIDtotal_fee").val(money);
            $("#WIDtotal_Id").val(currentUserId);
            $('#alpay').submit();
        }else if(paytype=="ZXZF"){
            var money=0;
            if(btype=="" || btype == undefined){
                alert("请选择支付银行!");
                return false;
            }
            money= $("#P_RMB").text();
            $("#WIDtotal_fee").val(money);
            $("#WIDtotal_Id").val(currentUserId);
            $('#alpay').submit();
        }else if(paytype =="QQCloud"){
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
                    $(".paybox").html(data).show();
                }


            }).error(function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            });
        }
    });



})