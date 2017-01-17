var url = "/rest/checkToken/checkOW.mt";
        var data ={
            sessionId:sid,
            userId:currentUserId,
            ip:ip
        }
        $(".oww").click(function(){
            var _this =$(this);
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                dataType: "json",
                timeout: 120000,
                success: function (data, textStatus, jqXHR) {
                    //location.href=$('.oww').attr("ahref");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //alert(params.url+" error code:"+textStatus);
    
                }
            });
        })