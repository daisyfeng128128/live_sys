/**
 * \u529F\u80FD\uFF1A\u9001\u793C\u8BB0\u5F55
 * */
define(function(require, exports, module) {
	var Tools = require('./anchor-tools');
	module.exports = {
		lihtml : '\
			<li>\
			<div class="rkb-img">\
				<img src="/apis/avatar.php?uid={0}" alt="{1}">\
			</div>\
			<div class="rkb-con">\
				<p class="rkb-p1" style="font-size: 12px;">{2}</p>\
				<p style="font-size: 12px;">{3}</p>\
			</div>\
			</li>',
		onMessage : function(data) {
			this.appendHtmls(data);
		},
		init : function() {
			var base = this;
			this.sswapTab(".rk-header", "div", ".rk-contents", ".rk-conn", "nosel");
			$(".r-week").on('click', function() {
				var data = UIF.handler.cache.get("Month_Fan_top");
				if (data == null) {
					UIF.handler.weekNotice({}, function($data) {
						data = jQuery.parseJSON($data);
						if (data != null) {
							base.append2Htmls(data, "#formerly_month_fan_top");
							data = UIF.handler.cache.put("Month_Fan_top", data);
						}
					});
				} else {
					base.append2Htmls(data, "#formerly_month_fan_top");
                    $(".rk-con2").nanoScroller();
                }
			})
			$(".r-active").on('click', function() {
				var data = UIF.handler.cache.get("Formerly_Fan_top");
				if (data == null) {
					UIF.handler.cohesion({}, function($data) {
						data = jQuery.parseJSON($data);
						if (data != null) {
							base.append3Htmls(data, "#formerly_all_fan_top");
							UIF.handler.cache.put("Formerly_Fan_top", data);
						}
					})
				} else {
					base.append3Htmls(data, "#formerly_all_fan_top");
                    $(".rk-con3").nanoScroller();
				}
			})
		},
		sswapTab : function(name, title, content, Sub, cur) {
			$(name + ' ' + title).click(function() {
				$(this).removeClass(cur).siblings().addClass(cur);
				$(content + " > " + Sub).eq($(name + ' ' + title).index(this)).show().siblings().hide();
			})
		},
		appendHtmls : function(data) {
			var $html = "";
			if (data != null) {
				for (var i = 0; i < data.length; i++) {
					$html += Tools.stringFormat(this.lihtml, data[i].userId, decodeURIComponent(data[i].nickname), decodeURIComponent(data[i].nickname), "\u8D21\u732E\u5EA6\uFF1A"+data[i].moneys);
				}
			}
			$('#current_fan_top').html($html);
		},
		append2Htmls : function(data, bs) {
			if (data != null) {
				var $html = "";
				for (var i = 0; i < data.length; i++) {
					$html += Tools.stringFormat(this.lihtml, data[i].userId, decodeURIComponent(data[i].nickname), decodeURIComponent(data[i].nickname), "\u8D21\u732E\u5EA6\uFF1A"+data[i].moneys);
				}
				if ($html != null && $html.length > 0)
					$(bs).html($html);
			}
		},
		append3Htmls : function(data, bs) {
			if (data != null) {
				var $html = "";
				for (var i = 0; i < data.length; i++) {
					$html += Tools.stringFormat(this.lihtml, data[i].userId, decodeURIComponent(data[i].name), decodeURIComponent(data[i].name), "\u4EB2\u5BC6\u5EA6\uFF1A"+data[i].cohe);
				}
				if ($html != null && $html.length > 0)
					$(bs).html($html);
			}
		}
	}
})