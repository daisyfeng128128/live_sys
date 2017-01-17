<div class="payArea">
    <div class="amount clearFix">
        <h3 class="fl">充值金额:</h3>
        <ul class="fl amoLi">
            <li class="fl hover">
                <span val="1000">1000K豆</span>
            </li>
            <li class="fl">
                <span val="5000">5000K豆</span>
            </li>
            <li class="fl">
                <span val="10000">10000K豆</span>
            </li>
            <li class="fl">
                <span val="20000">20000K豆</span>
            </li>
            <li class="fl">
                <span val="30000">30000K豆</span>
            </li>
            <li class="fl">
                <span val="50000">50000K豆</span>
            </li>
            <li class="fl">
                <span val="80000">80000K豆</span>
            </li>
            <li class="fl">
                <span val="100000">100000K豆</span>
            </li>
            <li class="fl">
                <span val="200000">200000K豆</span>
            </li>
            <li class="fl">
                <span val="300000">300000K豆</span>
            </li>
            <li class="fl">
                <span val="500000">500000K豆</span>
            </li>
            <li class="fl">
                <span val="800000">800000K豆</span>
            </li>
            <li class="fl">
                <span val="1000000">1000000K豆</span>
            </li>
            <li class="fl">
                <span val="2000000">2000000K豆</span>
            </li>
            <li class="fl">
                <span val="3000000">3000000K豆</span>
            </li>
        </ul>
        <div class="less-close"></div>
    </div>

    <div class="qqgameWay" data-type="QQGame">

        <form name="QQCloud" id="QQCloud" action="/rest/www/cloud.jsp" method="post">
            <div style="margin: 15px 10px 0 5px;">
                <p>实付金额：<i id="P_RMB">10</i>元(<span id="P_DB">1000</span>K豆)</p>
            </div>
            <input type="hidden" name="WIDtotal_fee" id="WIDtotal_fee">
            <input type="hidden" name="WIDtotal_Id" id="WIDtotal_Id">
            <input type="hidden" id="openid" name="openid" value="<?php echo $_SESSION['openid']?>">
            <input type="hidden" id="openkey" name="openkey" value="<?php echo $_SESSION['openkey']?>">
            <input type="hidden" id="pf" name="pf" value="qqgame">
            <input type="hidden" id="pfkey" name="pfkey" value="<?php echo $_SESSION['pfkey']?>">
            <a class="imChar">立即充值</a>
        </form>
    </div>
</div>
<script>
    var data={
        "openid":$("#openid").val(),
        "openkey":$("#openkey").val(),
        "pf":$("#pf").val(),
        "pfkey":$("#pfkey").val(),
        "WIDtotal_fee":"10",
        "WIDtotal_Id":UIF.currentUserID
    };
    $(".payArea .less-close").on('click',function(){
        $(".payArea").hide();
    });
    $(".amount .amoLi li").on('click',function(){
        $(this).addClass('hover').siblings().removeClass('hover');
        var spvalue=$(this).find("span").attr("val");
        $("#P_RMB").text(spvalue/100);
        $("#P_DB").text(spvalue);
        data.WIDtotal_fee = parseInt(spvalue/100);
    });
    $('.imChar').on('click',function(){
        $("#WIDtotal_fee").val(data.WIDtotal_fee);
        $("#WIDtotal_Id").val(UIF.currentUserID);

        $.ajax({
            type: "POST",
            url: "/rest/www/cloud.jsp",
            data: data,
            cache: false,
            success: function (data, textStatus, jqXHR) {
                if(data != "fail"){
                    $('.payArea').hide();
                    $("body").append(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(params.url+" error code:"+textStatus);
            }
        });


    })

    $(function(){
          $(".hoverAble").hover(function(){
            $(".infoBox2").show();
        },function(){
            setTimeout(function(){
                var divThis = $(".infoBox2");
                if (!divThis.hasClass('hov'))
                {
                    divThis.hide();
                }
            }, 1000); // 延迟，这个看你多久合适。
        });

        $(".infoBox2").mousemove(function () {
            $(".infoBox2").addClass("hov");
        }).mouseleave(function(){
            $(".infoBox2").removeClass("hov").hide();
        });
        $(".showPay").on('click',function(){
            $('.payArea').show();
        });
    })

</script>
