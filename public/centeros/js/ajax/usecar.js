define('ajax/usecar', function(require, exports, module){
    var Tools = require('./common');
	var oldurl = '/ajax/useCar.php';
	var newurl = '/kedo.php?c=centerosAPI&m=usercar';
    $('.no-use-car').on('click',function(){
        var idd=$(this).parent(".mcar-right-3").attr("idd");
        $.ajax({
            type: "POST",
            url: newurl,
            data: {
                idd:idd
            },
            cache: false
        }).done(function (data) {
            data =jQuery.parseJSON(data);
            if(data.resultCode==200){
                Tools.clert('已装备!');
                window.location.reload();
            }
        }).error(function (jqXHR, textStatus, errorThrown) {
            console.log('error');
        });

    });

});


