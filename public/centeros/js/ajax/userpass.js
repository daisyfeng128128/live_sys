define('ajax/userpass', function(require, exports, module){

    var common=require("./common");
    $("#save").on("click", function() {
        var data={
            current_password:$("#old-pass").val(),
            new_password:$("#new-pass").val(),
            new_repassword:$("#re-pass").val()
        }
		var old = '/ajax/refactorUserInfo.php?action=pass';
		var newurl = '/kedo.php?c=centerosAPI&m=changePass';
        $.ajax({
            type: "POST",
            cache: false,
            url: newurl,
            data:data,
            contentType: "application/x-www-form-urlencoded",
            success: function (data) {
				console.log(data);
                data=$.parseJSON(data);
                common.clert(data.errorMessage);
                if(data.resultStatus == 200){
                    $('.midfy-passwd-area input').val("");
                }
            }
        });
    })

});