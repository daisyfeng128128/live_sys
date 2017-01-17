define(function(require, exports, module) {
    var Tools = require('./anchor-tools');
    module.exports = {
        init: function () {
            // \u6B4C\u66F2\u5217\u8868
            var base=this;
            $(".chat-header #choSong111").click(function() {
                UIF.handler.songsListDetails({},function(data) {
                    data = jQuery.parseJSON(data);
                    var html = '<li class="price">\u6BCF\u9996\u6B4C1000\u9017\u5E01</li>';
                    if (data != null && data.length > 0) {
                        $.each(data,function(index, $data) {
                            html += '<li class="clearFix">  <span>'+$data.songname+'</span> <span class="singer">'+$data.singer+'</span> <a href="javascript:;" data = "'+ $data.songid +'">\u70B9\u6B4C</a> </li>';
                        });
                    }
                    /*html+='<div id="scroll"><div id="bar"></div></div>';*/
                    $("#song_item").html(html);
                });
            });

            $("#nano-songList ul").on("click","li a",function(){
                //base.chooseSong($(this).attr("data"));
            });
        },chooseSong: function (songId) {
            UIF.handler.chooseSong({songId:songId},function(data){
                data = jQuery.parseJSON(data);
                Tools.dialog("\u70B9\u6B4C\u6210\u529F");
            });
        }
    }


});