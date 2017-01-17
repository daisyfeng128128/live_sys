define('ajax/receive', function(require, exports, module){
    var Tools = require('./common');
    var $h="";
    var html='<tr class="dd">\
            <td>{0}</td>\
            <td>{1}</td>\
            <td class="sendss">{2}个<img src="{3}" /><span class="sendGiftNames">{4}</span></td>\
            <td>{5}</td>\
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
    function initHtml($page){
		var oldurl = '/ajax/get_recive.php';
		var newurl = '/kedo.php?c=centerosAPI&m=get_record';
        $h="";
        $p=$page?$page:1;
        Tools.getDate({
            url: newurl,
            data:{
                y:$("#research-year").val(),
                m:$("#research-month").val(),
                p:$p,
                t:2
            }
        }, function (data) {
            console.log(data);
            if(data.data){
                $.each(data.data, function(k,v) {
                    v.nickName = decodeURIComponent(v.nickName);
                    if(v.type==1){  //礼物
                        $h += Tools.stringFormat(html,v.nickName,v.createDT,v.numbers, v.img,v.giftName,Math.abs(v.money));
                    }else if(v.type==2){ //点歌
                        $h += '<tr class="dd"><td>'+v.nickName+'</td><td>'+v.createDT+'</td><td class="sendss">点歌</td><td>'+Math.abs(v.money)+'</td></tr>';
                    }else if(v.type==3){ //守护
                        $h += '<tr class="dd"><td>'+v.nickName+'</td><td>'+v.createDT+'</td><td class="sendss">开通守护</td><td>'+Math.abs(v.money)+'</td></tr>';
                    }else if(v.type==4){ //弹幕
                        $h += '<tr class="dd"><td>'+v.nickName+'</td><td>'+v.createDT+'</td><td class="sendss">发弹幕</td><td>'+Math.abs(v.money)+'</td></tr>';
                    }
                });

            }else{
                $h="<tr><td colspan='4'>没有数据!</td></tr>"
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


