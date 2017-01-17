define('ajax/phone', function(require, exports, module){
    var Tools = require('./common');
    var sendPhone=0;

    $(".send").click(function(){

        var re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

        if($('#phone').val()!=null && re.test($('#phone').val())){
            if($('.phone_error').is(":visible")){
                $('.phone_error').hide();
            }
            $.ajax({
                type: "POST",
                url: '/ajax/sendPhone.php',
                data: {
                    number:$('#phone').val(),
                    type:'send'
                },
                cache: false
            }).done(function (data) {
                data =jQuery.parseJSON(data);
                if(data.resultCode=="200"){
                    sendPhone=1;
                    var $all=$('body');
                    var time = 60;
                    $all.find(".bind-phone-area .send").attr({ disabled: "disabled" });
                    $all.find(".bind-phone-area .send").addClass('disabled-button');
                    $all.find(".bind-phone-area .send span").text("(60)");
                    var wait = function () {
                        time = time - 1;
                        $all.find(".bind-phone-area .send span").text("(" + time + ")");
                        if (time == 0) {
                            clearInterval(timetime);
                            $all.find(".bind-phone-area .send").removeAttr("disabled");
                            $all.find(".bind-phone-area .send").removeClass('disabled-button');
                            $all.find(".bind-phone-area .send span").text("");
                        };
                    };
                    var timetime = setInterval(wait, 1000);

                }
            }).error(function (jqXHR, textStatus, errorThrown) {
                1;
            });

        }else{
            $('.phone_error').show();
            $('#phone').focus();
        }

    });

    $('#bindPhone').on('click',function(){
        if(!sendPhone){
            alert('短信未发!');
            return;
        }
        if($('#code').val()==''){
            $('.resend-ms').text('请输入手机上接收的验证码!').show();
            return;
        }

        $.ajax({
            type: "POST",
            url: '/ajax/sendPhone.php',
            data: {
                code:$('#code').val(),
                type:'bind'
            },
            cache: false
        }).done(function (data) {
            data =jQuery.parseJSON(data);
            if(data.resultCode=="200"){
                Tools.blert('绑定成功!');
                window.location.reload();
            }
        }).error(function (jqXHR, textStatus, errorThrown) {
            2;
        });


    });



});


