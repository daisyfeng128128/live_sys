define('ajax/cancelCare', function(require, exports, module){

    $(".find-bump-oxx,#no-cc").click(function () {
        $(".zhezhao").hide();
        $(".win-phone").hide();

    });
    $("#sure-cc").on("click", function() {

        $.ajax({
            type: "POST",
            cache: false,
            url: "/ajax/refactorUserInfo.php?action=cancelfav&roomNumber="+$("#usernumber").val(),
            data:"",
            contentType: "application/x-www-form-urlencoded",
            success: function (data) {
               window.location.reload();
            }
        });
    })

    exports.showBox = function(){
        $(".zhezhao").show();
        $(".iscc").show();
        return false;
    };

});