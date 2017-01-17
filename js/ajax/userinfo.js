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
        $.ajax({
            type: "POST",
            cache: false,
            url: "/ajax/refactorUserInfo.php?action=base",
            data:data,
            contentType: "application/x-www-form-urlencoded",
            success: function (data) {
                common.clert(data.errorMessage);
            }
        });
    })

});