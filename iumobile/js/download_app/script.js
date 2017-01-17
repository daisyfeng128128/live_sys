$(function () {
    //回到顶部
    $("#totop").click(function(){
        $('body,html').animate({scrollTop:0},500);
        return false;
    });
    setHeight();
});

$(window).resize(function(){
	setHeight();
});

//列表图片设置高度
function setHeight(){
	$width = $(".icon").width();
    $height = Math.floor(($width*240)/337);
    $(".icon").css("height",$height);
}




