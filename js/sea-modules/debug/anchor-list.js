define(function(require, exports, module) {
	var cons = require("cons");
	var map = require("map");
	var Tools = require('./anchor-tools');
	module.exports = {
		page : 0,
		init : function(data) {
			var base = this;
			$(".aud").click(function() {
				base.page = 0;
				$(".audience").css({
					opacity : 0,
					display : "block"
				}).animate({
					left : 70,
					opacity : 1
				}, 500, "swing", function(e) {
					$(this).addClass("bg-show");
					base.flushUsers();
				});
			});
			$(".nexp").on("click", function() {
				base.page++;
				var addUserData = base.getUserlist(base.page);
				if (addUserData != null && addUserData != undefined) {
					base.addToUsers(addUserData);
				}
			});
			$(".viewer").on("click", function() {
				base.page = 0;
				if ($(this).hasClass("on")) {
					base.flushUsers();
					return !1;
				}
				$(".manager").removeClass("on"), $(this).addClass("on"), $(".viewer-list").show(), $(".manager-list").hide();
			});
			$(".manager").on("click", function() {
				base.flushManagers();
				if ($(this).hasClass("on")) {
					return !1;
				}
				$(".viewer").removeClass("on"), $(this).addClass("on"), $(".manager-list").show(), $(".viewer-list").hide();
			});

		},
        welcome : function(data){
            UIF.handler.weblog(JSON.stringify(data)+'进入');
        },
		addUsers : function(data) {
			if (!UIF.handler.userList.containsKey(data.userId)) {
				UIF.handler.userList.put(data.userId, data);
				if (UIF.handler.userList.size() > 20) {
					$('.nexp').show();
				} else {
					$('.nexp').hide();
				}
			}
		},
		getUserlist : function(page) {
			var lis = UIF.handler.userList;
			var newmp = new map;
			var st = 20 + page * 5;
			if (lis.size() < st) {
				return false;
			}
			if (lis.size() > 0) {
				for (var i = st - 5; i < st; i++) {
					newmp.put(lis.elements[i].key, lis.elements[i].value);
				}
			}
			return newmp;
		},
		addToUsers : function(data) {
			var base = this;
			if (data == null || data == '' || data == undefined) {
				return false;
			}
			var html = this.parseHtml(data);
			$(".usersList").append(html);
			$(".viewer-list").nanoScroller();
			$(".viewer-list").nanoScroller({
				scroll : 'bottom'
			});
		},
		parseHtml : function(data) {
			if (data == null || data == '' || data == undefined) {
				return false;
			}
			var base = this;
			var lis = '<li data-cardid="{0}" class="anchor">\
							<span class="ICON-noble-level ICON-nl-13"></span>\
							<i class="ICON-medal">{1}</i>\
							<span class="name" title="{2}">{3}</span>\
					  </li>';
			var hs = "";
			var values = data.values();
			for (var i = 0; i < values.length; i++) {
				for (var j = 0; j < values.length; j++) {
					if (parseInt(values[i].splev) > parseInt(values[j].splev)) {
						var t = values[i];
						values[i] = values[j];
						values[j] = t;
					}
				}
			}
			values.forEach(function(e) {
				var filter = e.levs;
				if (filter != null && filter.indexOf("pic_liverlevel") > 0) {
					hs += Tools.stringFormat(lis, e.userId, base.headimg(e.levs), decodeURIComponent(e.nickname), decodeURIComponent(e.nickname));
				}
			});
			values.forEach(function(e) {
				var filter = e.levs;
				if (filter != null && filter.indexOf("pic_liverlevel") < 0) {
					hs += Tools.stringFormat(lis, e.userId, base.headimg(e.levs), decodeURIComponent(e.nickname), decodeURIComponent(e.nickname));
				}
			});
			return hs;
		},
		flushUsers : function() {
			var base = this;
			var lis = '<li data-cardid="{0}" class="anchor">\
							<span class="ICON-noble-level ICON-nl-13"></span>\
							<i class="ICON-medal">{1}</i>\
							<span class="name" title="{2}">{3}</span>\
					  </li>';
			var hs = "";
			var values = UIF.handler.userList.values();
			for (var i = 0; i < values.length; i++) {
				for (var j = 0; j < values.length; j++) {
					if (parseInt(values[i].splev) > parseInt(values[j].splev)) {
						var t = values[i];
						values[i] = values[j];
						values[j] = t;
					}
				}
			}
			values.forEach(function(e, k) {
				if (k > 20) {
					return !1;
				}
				var filter = e.levs;
				if (filter != null && filter.indexOf("pic_liverlevel") > 0) {
					hs += Tools.stringFormat(lis, e.userId, base.headimg(e.levs), decodeURIComponent(e.nickname), decodeURIComponent(e.nickname));
				}
			});
			values.forEach(function(e, k) {
				if (k > 20) {
					return !1;
				}
				var filter = e.levs;
				if (filter != null && filter.indexOf("pic_liverlevel") < 0) {
					hs += Tools.stringFormat(lis, e.userId, base.headimg(e.levs), decodeURIComponent(e.nickname), decodeURIComponent(e.nickname));
				}
			});
			$(".usersList").html(hs);
			$(".viewer-list").nanoScroller();
			$(".viewer-list").nanoScroller({
				scroll : 'bottom'
			});
		},
        flushBuUsers : function(userlist) {
            var base = this;
            var lis = '<li data-cardid="{0}" class="anchor">\
							<span class="ICON-noble-level ICON-nl-13"></span>\
							<i class="ICON-medal">{1}</i>\
							<span class="name" title="{2}" style="font-size: 12px;">{3}</span>\
					  </li>';
            var hs = "";
            if(userlist != null){
                values = userlist
            }else{
                values = UIF.handler.userList.values();
            }
            values = Tools.uniqueArrayKey(values,'userId');
            values = values.sort(Tools.sortBy('levs', 1));//spvs缺陷
            values.forEach(function(e, k) {
                if (e.userId != null && e.userId == UIF.handler.anchorId) {
                    hs += Tools.stringFormat(lis, e.userId, base.headimg(e.levs), decodeURIComponent(e.nickname), decodeURIComponent(e.nickname));
                }
            });
            values.forEach(function(e, k) {
                if (e.userId != null && e.userId != UIF.handler.anchorId) {
                    hs += Tools.stringFormat(lis, e.userId, base.headimg(e.levs), decodeURIComponent(e.nickname), decodeURIComponent(e.nickname));
                }
            });
            $("#song_item").html(hs);
            try {
                $("#nano-guardList").nanoScroller();

            } catch (e) {
                UIF.handler.weblog(e);
            }

        },
		flushManagers : function() {
			var base = this;
			var lim = '<li data-cardid="{0}" class="anchor">\
						<span class=""></span>\
						<i class="ICON-medal">{1}</i>\
						<span class="name" title="{2}">{3}</span>\
					</li>';
			var hs = "";
			var values = UIF.handler.userList.values();
			for (var i = 0; i < values.length; i++) {
				for (var j = 0; j < values.length; j++) {
					if (values[i].splev < values[j].splev) {
						var t = values[j];
						values[j] = values[j];
						values[j] = t;
					}
				}
			}
			var count = 0;
			values.forEach(function(e) {
				var filter = e.levs;
				if (filter != null && filter.indexOf("pic_guanli") > 0) {
					hs += Tools.stringFormat(lim, e.userId, base.headimg(e.levs), decodeURIComponent(e.nickname), decodeURIComponent(e.nickname));
					count = count + 1;
				}
			});
			$(".managerList").html(hs);
			$(".manager-list").nanoScroller();
			$(".manager-list").nanoScroller({
				scroll : 'bottom'
			});
			$(".manager>span").text(count);
		},
		headimg : function(data) {
			var heads = "";
			var img = '<span class="{0}"></span>';
			try{
                var $data = jQuery.parseJSON(data);
            }catch(e){
                var $data = "";
            }

			if ($data != null && $data.length > 0) {
				for (var i = 0; i < $data.length; i++) {
					var $img = $data[i];
					if ($img != null
							&& $img != ""
							&& ($img.indexOf("pic_consumelevel") > 0 || $img.indexOf("pic_activelevel") > 0 || $img.indexOf("pic_relationlevel") > 0
									|| $img.indexOf("pic_liverlevel") > 0 || $img.indexOf("pic_guanli") > 0))
						heads += Tools.stringFormat(img, $img);
				}
			}
			return heads;
		}
	}
});