function init_sm_player(){
	$("body").append("<div id=\"sm_player\" style=\"width:320px;height:240px\"></div>");
}
function showPlayer(sw_userid,sw_token){
	$.ajax({
            url:'http://5iu.qiyew.com/apis/sm_player.php?userid='+sw_userid+'&token='+sw_token,
            dataType:"jsonp",
            jsonp:"callback",
            success:function(data){
				var flashvars=data.flashvars;
                $("#sm_player").html('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="320" height="240" id="sm_player" name="sm_player" align="middle"><param name="movie" value="http://5iu.qiyew.com/inner.swf" /><param name="flashvars" value="'+flashvars+'"><param name="quality" value="high" /><param name="wmode" value="opaque" /><param name="allowScriptAccess" value="always" /><!--[if !IE]>--><object type="application/x-shockwave-flash" data="http://5iu.qiyew.com/inner.swf" id="sm_player" name="sm_player" width="320" height="240"><param name="movie" value="http://5iu.qiyew.com/inner.swf" /><param name="flashvars" value="'+flashvars+'"><param name="quality" value="high" /><param name="wmode" value="opaque" /><param name="allowScriptAccess" value="always" /><!--<![endif]--><a href="http://www.adobe.com/go/getflash">Install Player</a><!--[if !IE]>--></object><!--<![endif]--></object>');
            }
    });
}