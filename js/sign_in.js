/*签到功能js*/
$(function(){
	$("#signin_tips .botbox li").live({
        mouseenter:function(){
            $(this).find('.tips').show();
        },
        mouseleave:function(){
            $(this).find('.tips').hide();
        }
     });
	$(".fancybox").fancybox();
});

/**
 * 绘制宝箱HTML
 */
function draw_chest(){
	$("#signin_tips").load("/sign_in.php?type=ajax");
}

/**
 * 邀请事件
 */
function event_invite(v){
	if(!is_bu){
		$("#showSuccessa").click();
		return;
	}
	$.get("/sign_in.php", {type:"buqian",time:v}, function(response){
        if(response.code == "200"){
        	draw_chest();
            alert(response.msg);
        }else{
            alert(response.msg);
        }
    }, "json");
}

/**
 * 签到事件
 */
function event_signin(obj){
    if($(obj).attr("class") == "signin_btn2") return;
    $.get("/sign_in.php", {type:"signin"}, function(response){
        if(response.code == "200"){
        	draw_chest();
            alert(response.msg);
            //$("#signin_tips .singin_tex .f_f24").text(response.data.sign_count);
            $("#today_focus").attr("class", "yes");
            $("#signin_tips .signin_btn").attr("class", "signin_btn2");
        }else{
            alert(response.msg);
        }
    }, "json");
}

/**
 * 开宝箱事件
 */
function event_receive(obj, location){
    $.get("/sign_in.php", {type:"recevie", location:location}, function(response){
        alert(response.msg);
        if(response.code == "200"){
        	draw_chest();
        }
    }, "json");
}
