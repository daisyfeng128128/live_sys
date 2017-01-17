define('ajax/userpass', function(require, exports, module){

    var common=require("./common");
    $("#save").on("click", function() {
        var data={
            current_password:$("#old-pass").val(),
            new_password:$("#new-pass").val(),
            new_repassword:$("#re-pass").val()
        }
        $.ajax({
            type: "POST",
            cache: false,
            url: "/ajax/refactorUserInfo.php?action=pass",
            data:data,
            contentType: "application/x-www-form-urlencoded",
            success: function (data) {
                data=$.parseJSON(data);
                common.clert(data.errorMessage);
                if(data.resultStatus == 200){
                    $('.midfy-passwd-area input').val("");
                }
            }
        });
    })

});