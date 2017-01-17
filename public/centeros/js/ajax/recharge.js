define('ajax/recharge', function(require, exports, module){
    var Tools = require('./common');
    var $h="";
    var html='<tr class="dd">\
            <td>SN{0}</td>\
            <td>{1}</td>\
            <td class="sendss">送给<a href="{2}" class="sendTo">{3}</a>{4}个<img src="{5}" /><span class="sendGiftNames">{6}</span></td>\
            <td>{7}</td>\
            </tr>';
    function UrlDecode(str){
        var ret="";
        for(var i=0;i<str.length;i++){
            var chr = str.charAt(i);
            if(chr == "+"){
                ret+=" ";
            }else if(chr=="%"){
                var asc = str.substring(i+1,i+3);
                if(parseInt("0x"+asc)>0x7f){
                    ret+=asc2str(parseInt("0x"+asc+str.substring(i+4,i+6)));
                    i+=5;
                }else{
                    ret+=asc2str(parseInt("0x"+asc));
                    i+=2;
                }
            }else{
                ret+= chr;
            }
        }
        return ret;
    }
    function toMoneys(s){
        return s != null ?s:0
    }
/*    function toStyle($int){
        if($int ==1){
            return "微信";
        }
        if($int ==2){
            return "支付宝";
        }
        if($int ==4){
            return "银行支付";
        }
        return "充值";
    }

    function toStatus($int){
        if($int == 0){
            return "<span style='color: #c0c0c0'>未处理</span>";
        }
        if($int ==1){
            return "<span style='color: #59db28'>成功</span>";
        }
        if($int ==2){
            return "<span style='color: #cd4e47'>失败</span>";
        }
        return "<span style='color: #9db28'>成功</span>";
    }*/
    function initHtml($page){
		var oldurl = '/ajax/get_record.php';
		var newurl = '/kedo.php?c=centerosAPI&m=get_record';
        $h="";
        $p=$page?$page:1;
        Tools.getDate({
            url: newurl,
            data:{
                y:$("#research-year").val(),
                m:$("#research-month").val(),
                p:$p,
                t:0
            }
        }, function (data) {
            console.log(data);
            if(data.data){
                $.each(data.data, function(k,v) {
                    if(v.serialNum != null){
                        $h += '<tr  class="dd">\
                        <td>'+ v.serialNum+'</td>\
                        <td>'+v.createDT+'</td>\
                        <td>'+Math.abs(v.money)+'</td>\
                        <td>'+ toMoneys(v.consume)+'</td>\
                        <td>'+ v.topups+'</td>\
                        <td>'+ v.tradeStatus +'</td>\
                        </tr>';
                    }
                });

            }else{
                $h="<tr><td colspan='6'>没有数据!</td></tr>"
            }
            $('#conTable .fir').siblings().remove();
            $('#conTable .fir').after($h);
            $('.nexts').html(data.pagelinks);
        });
    };
    $(".re-search-button").click(function(){
        initHtml();
    });
    $(".nexts").on("click","span",function(){
        initHtml($(this).attr('hf'));
    })
    initHtml();

});


