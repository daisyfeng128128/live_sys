define('ajax/userinfo', function(require, exports, module){

    $("#submits").on("click", function() {
        var data={
            aliasname:$("#aliasname").val(),
            gender: $("input[name='gender']:checked").val(),
            year: $("#year").val(),
            month: $("#month").val(),
            day: $("#day").val(),
            province: $("#province").val(),
            city: $("#city").val()
        }
        var common=require("./common");
		var oldurl = '/ajax/refactorUserInfo?action=base';
		var newurl = '/kedo.php?c=centerosAPI&m=base';
        $.ajax({
            type: "POST",
            cache: false,
            url: newurl,
            data:data,
            contentType: "application/x-www-form-urlencoded",
            success: function (data) {
				//console.log(data);
                common.clert(data.errorMessage);
            }
        });
    })

});