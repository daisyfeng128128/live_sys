define(function(require, exports, module) {
	require('jquery');
	var Tools = require('./anchor-tools');
	module.exports = {
		mo : function() {
			$(".live-video #video").html(this.bg());
			$(".live-video #video #bglis").append(this.childBg());
			$(".live-video #video .no-live-text").text("正在加载中");
		},
		stat : function(data) {
			if (UIF.handler.anchorId != UIF.handler.userId) {
				if (data != null && data.online != null && data.online) {
					$(".live-video #video").html(this.player());
				} else {
					$(".live-video #video").html(this.bg());
					$(".live-video #video #bglis").append(this.childBg());
					$(".live-video #video .no-live-text").text("主播已下播");
				}
			}
		},
		init : function(options) {
			var data = options.data;
			if (data.anchors && data.status == 200 && UIF.handler.anchorId == UIF.handler.userId) {
				$(".live-video #video").html(this.record());
			} else if (data.online && data.status == 200 && UIF.handler.anchorId != UIF.handler.userId) {
				$(".live-video #video").html(this.player());
			} else {
				$(".live-video #video").html(this.bg());
				$(".live-video #video #bglis").append(this.childBg());
				if (data.messag == "success")
					data.messag = "主播未开播";
				$(".live-video #video .no-live-text").text(data.messag);
			}
		},
		record : function() {
			var content = new Array;
			var token = UIF.handler.token;
			var flashPath = UIF.handler.flash;
			var roomNumber = UIF.handler.roomNumber;
            content.push(' <div class="flash-area">');
			content.push('<div id="mwin1">');
			content.push(' <!--<![endif]-->');
            content.push('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="player" name="player" align="middle">');
			content.push('<param name="movie" value="/js/sea-modules/swf/record.swf?' + UIF.version + '">');
			content.push('<param name="flashvars" value="chat=1&amp;usernumber=' + roomNumber + '&amp;roomnumber=' + roomNumber + '&amp;c=' + token + '&amp;mtadd=' + flashPath
					+ '">');
			content.push('<param name="quality" value="high">');
			content.push('<param name="wmode" value="transparent">');
			content.push('<param name="allowScriptAccess" value="always">');
			content.push('<param name="allowfullscreen" value="true">');
			content.push('<!--[if !IE]>-->');
            content.push('<object type="application/x-shockwave-flash" data="/js/sea-modules/swf/record.swf?' + UIF.version
            + '" id="player" name="player">');
			content.push('<param name="movie" value="/js/sea-modules/swf/record.swf?' + UIF.version + '">');
			content.push('<param name="flashvars" value="chat=1&amp;usernumber=' + userId + '&amp;roomnumber=' + roomNumber + '&amp;c=' + token + '&amp;mtadd=' + flashPath + '">');
			content.push('<param name="quality" value="high">');
			content.push('<param name="wmode" value="transparent">');
			content.push('<param name="allowScriptAccess" value="always">');
			content.push('<param name="allowfullscreen" value="true">');
			content.push('<!--<![endif]-->');
			content.push('<a href="http://www.adobe.com/go/getflash">');
			content.push('<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player">');
			content.push('</a>');
			content.push('<!--[if !IE]>-->');
			content.push('</object>');
			content.push('<!--<![endif]-->');
			content.push('</object>');
			content.push('</div>');
			content.push('</div>');
			return content.join("");
		},
		player : function() {
			var content = new Array;
			var flashPath = UIF.handler.flash;
			var roomNumber = UIF.handler.roomNumber;
            content.push(' <div class="flash-area">');
			content.push('<div id="mwin1">');
			content.push(' <!--<![endif]-->');

            content.push('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"  id="player" name="player" align="middle">');
			content.push('<param name="movie" value="/js/sea-modules/swf/player.swf?' + UIF.version + '">');
			content.push('<param name="flashvars" value="token=&amp;chat=1&amp;roomnumber=' + roomNumber + '&amp;fn=' + roomNumber + '&amp;mtadd=' + flashPath + '">');
			content.push('<param name="quality" value="high">');
			content.push('<param name="wmode" value="transparent">');
			content.push('<param name="allowScriptAccess" value="always">');
			content.push('<param name="allowfullscreen" value="true">');
			content.push('<!--[if !IE]>-->');
            content.push('<object type="application/x-shockwave-flash" data="/js/sea-modules/swf/player.swf?' + UIF.version
            + '" id="player" name="player">');
			content.push('<param name="movie" value="/js/sea-modules/swf/player.swf?' + UIF.version + '">');
			content.push('<param name="flashvars" value="token=&amp;chat=1&amp;roomnumber=' + roomNumber + '&amp;fn=' + roomNumber + '&amp;mtadd=' + flashPath + '">');
			content.push('<param name="quality" value="high">');
			content.push('<param name="wmode" value="transparent">');
			content.push('<param name="allowScriptAccess" value="always">');
			content.push('<param name="allowfullscreen" value="true">');
			content.push('<!--<![endif]-->');
			content.push('<a href="http://www.adobe.com/go/getflash">');
			content.push('<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player">');
			content.push('</a>');
			content.push('<!--[if !IE]>-->');
			content.push('</object>');
			content.push('<!--<![endif]-->');
			content.push('</object>');
			content.push('</div>');
			content.push('</div>');
			return content.join("");
		},
		bg : function() {
			var content = new Array;
			content.push('<div class="no-live">');
            content.push('<div class="no-live-text">主播未开播</div>');
            content.push('<div class="no-live-next">下次开播时间：<span class="no-live-week">星期五</span>&nbsp;&nbsp;&nbsp;<span class="no-live-time">19:20</span></div>');
			content.push('<ul id="bglis">');
			content.push('</ul>');
			content.push('</div>');
			return content.join("");
		},
		childBg : function() {
			var liCt = new Array;
			liCt.push('<li>');
			liCt.push('<a href="{0}"></a>');
			liCt.push('<div class="noanchor-kuang">');
			liCt.push('<div class="nocnchor-k bk-color"></div>');
			liCt.push('<img src="{1}" alt="{2}">');
			liCt.push('</div>');
			liCt.push('<div class="noanchor-info">');
			liCt.push('<div class="noanchor-level anchor-level {3}"></div>');
			liCt.push('<div class="noanchor-name">{4}</div>');
			liCt.push('<div class="clear"></div>');
			liCt.push('<div class="noanchor-num">{5}</div>');
			liCt.push('</div>');
			liCt.push('</li>');
			var content = new Array;
			$.ajax({
				type : "post",
				url : "/rest/site/ats.mt",
				data : "roomNumber=" + UIF.handler.roomNumber,
				async : false,
				success : function(data) {
					if (data.resultStatus == 200 && data.data != null) {
						data.data.forEach(function(e) {
							var $s = liCt.join("");
							var $nums = Tools.stringFormat("{0} 在线", e.numbers)
							if (e.numbers == 0)
								$nums = " 离线";
							var ps = Tools.stringFormat($s, e.roomNumber, e.image, decodeURIComponent(e.nickName), e.levelImg, decodeURIComponent(e.nickName), $nums);
							content.push(ps);
						});
					}
				}
			});
            $.ajax({
                type : "post",
                url : "/rest/site/atsTime.mt",
                data : "roomNumber=" + UIF.handler.roomNumber,
                async : false,
                success : function(data) {
                    if (data.resultStatus == 200 && data.data != null) {
                        $(".no-live-week").text(data.data[0]);
                        $(".no-live-time").text(data.data[1]);
                      $('.no-live-next').show();
                    }
                }
            });
			return content.join("");
		}
	}
});