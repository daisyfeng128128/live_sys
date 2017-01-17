//ipview  统计；
function ipview(){
	
	var url ='/rest/homeAnchors/ipView.mt';
	var data ={
	       // userId:currentUserId,
	    }
	
	$.ajax({
        type: "POST",
        url: url,
        data: "",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

//执行ipview函数；
ipview();