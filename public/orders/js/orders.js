$(function(){

    function SwapTab(name, title, content, Sub, cur) {
        $(name + ' ' + title).mouseover(function () {
            $(this).addClass(cur).siblings().removeClass(cur);
            $(content + " > " + Sub).eq($(name + ' ' + title).index(this)).show().siblings().hide();
        })
    }
    SwapTab("#orderTit", "li", "#orderBody", ".orderItem", "active");
})