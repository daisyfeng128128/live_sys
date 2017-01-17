define(function(require, exports, module) {
	var Tools = require('./anchor-tools');
	module.exports = {
		init : function() {
			var base = this;
            $(".live-info").on('click',"#setting",function(){
				$("#pop").show();
				$("#pop").css("z-index", "999");
				$("#shadow").css("display", "block");
				$("#setting").css("background", "#ffab03");
				// \u7F16\u8F91\u516C\u544A
				UIF.handler.getNotice({}, function(data) {
					data = jQuery.parseJSON(data);
					if (data != null && data.id != undefined) {
						$("#id").val(data.id);
						$("#roomNotice").val(data.notice);
					}
				});
			});

			$("#save").click(function() {
				var oNotice = $("#roomNotice").val();
				var oId = $("#id").val();
				UIF.handler.sendNotice({id : oId,notice : oNotice}, function(data) {
					if(jQuery.parseJSON(data).resultStatus == 200){
						$("#close").click();
						Tools.dialog("\u516C\u544A\u4FDD\u5B58\u6210\u529F!");
					}
				});
			});
			
			$("#close").click(function() {
				$("#pop").hide();
				$("#shadow").hide();
				$("#setting").css("background", "#ffab03");
			});

			$("#noti_mana_song a").on("click", function() {
				$(this).addClass("active").siblings().removeClass("active");
				$("#info >div").hide();
				$("#info >div").eq($(this).index()).show();
			});

			var $aAnchor = $("#noti_mana_song a");
			var $aInfo = $("#info >div");
			$aAnchor.eq(1).click(function() {
				$aAnchor.removeClass("active");
				$(this).addClass("active");
				$aInfo.hide();
				$aInfo.eq($(this).index()).show();
				/** \u4E3B\u64AD\u8BBE\u7F6E\u7BA1\u7406 \u5148\u67E5\u627E\u7BA1\u7406\u5217\u8868 */
				base.getRoomMan();
			});

			$aAnchor.eq(2).click(function() {
				$aAnchor.removeClass("active");
				$(this).addClass("active");
				$aInfo.hide();
				$aInfo.eq($(this).index()).show();
				base.getSongList();
			});

			$("#add_btn").click(function() {
				$("#mana_shadow").css("display", "block");
				$("#search_btn").show();
			});
			$("#add_user").click(function() {
				$("#mana_shadow").css("display", "block");
				$("#search_btn").css("display", "block");
			});

			$("#mana_close").click(function() {
				$("#appear").css("display", "none");
				$("#mana_shadow").css("display", "none");
			});
			/**\u67E5\u627E\u7528\u6237*/
			$("#search_btn").click(function() {
				var userId = $("#userId").val();
				UIF.handler.getUser({
					userid : userId
				}, function(data) {
					data = jQuery.parseJSON(data);
					if (data != null && data.userid != undefined) {
						$("#idNum").html(data.userid);
						$("#userName").html(decodeURIComponent(data.nickName));
						$("#userImg").attr('src', "/apis/avatar.php?uid=" + data.userid);
					}
					$("#appear").css("display", "block");
					$("#search_btn").css("display", "none");
				});
			});

			/**添加管理*/
			$("#user_add").click(function() {
				var userid = $("#idNum").html();
				UIF.handler.roomManagers({
					toIds : userid,
					drives : "adds"
				}, function(data) {
					data = jQuery.parseJSON(data);
					if (data != null && data.resultMessage == "success") {
						$("#mana_shadow").css("display", "none");
						base.getRoomMan();
					}
					$("#userId").val("");
					$("#search_btn").css("display", "block");
					$("#appear").css("display", "none");

				});
			});

			/** \u6DFB\u52A0\u6B4C\u66F2 */
			$("#songsSave").click(function() {
				var songsName = $("#songsName").val();
				UIF.handler.saveSongs({
					singer : "",
					songname : songsName
				}, function(data) {
					data = jQuery.parseJSON(data);
					if (data != null && data.resultMessage == "success") {
						base.getSongList();
					}
					$("#songsName").val("");
					$("#songsName").focus();
				});
			});

			/** \u5220\u9664\u7BA1\u7406 */
			$(".added_list").on("click", ".clearFix .fl", function(data) {
				var userId = "";
				var self = $(this);
				var clazz = $(this).attr("class");
				if (clazz != null && clazz.split(" ").length > 0) {
					userId = clazz.split(" ")[2];
				}
				UIF.handler.roomManagers({
					toIds : userId,
					drives : "dels"
				}, function(data) {
					data = jQuery.parseJSON(data);
					if (data != null && data.resultMessage == "success") {
						self.parent().remove();
					}
				});
			});

			/** \u5220\u9664\u6B4C\u66F2 */
			$(".song_detail").on("click", ".clearFix .fl", function(data) {
				var ids = "";
				var self = $(this);
				var clazz = $(this).attr("class");
				if (clazz != null && clazz.split(" ").length > 0) {
					ids = clazz.split(" ")[2];
				}
				UIF.handler.delSongs({
					songid : ids
				}, function(data) {
					data = jQuery.parseJSON(data);
					if (data != null && data.resultMessage == "success") {
						self.parent().remove();
					}
				});
			});
            /**设置皮肤*/
            $("#skin_info").on("click",".sk-useit",function(){
                var skid=$(this).attr("data-sk");
                var data={
                    roomNumber:UIF.handler.roomNumber,
                    skid:skid
                };

                Tools.dialog(
                    "确定使用新皮肤并重新开播吗?",
                    function(){
                        $.post(
                            "/ajax/roomSettings.php",
                            data,
                            function(result){
                                if(result == "success"){
                                    window.location.reload();
                                }
                            }
                        );
                    },function(e){return;}
                );

            })
		},
		getRoomMan : function() {
			/** \u4E3B\u64AD\u8BBE\u7F6E\u7BA1\u7406 \u5148\u67E5\u627E\u7BA1\u7406\u5217\u8868 */
			UIF.handler.getRoomMan({}, function(data) {
				data = jQuery.parseJSON(data);
				var html = "";
				if (data != null && data.length > 0) {
					$("#add_user").css("display", "block");
					$("#no_added").hide();
					$("#added").show();
					$.each(data, function(index, $data) {
						html += '<li class="clearFix"> <span class="num fl">' + (index + 1) + '</span> <span class="level-bg fl"></span> <span class="name fl">' + decodeURIComponent($data.nickName)
								+ '</span> <a href="javascript:;" class="delete fl ' + $data.userid + '">\u5220\u9664</a> </li>';
					});
				}
				$("#added_list").html(html);
			});
		},
		getSongList : function() { // \u70B9\u6B4C\u5217\u8868
			UIF.handler.songsListDetails({}, function(data) {
				data = jQuery.parseJSON(data);
				var html = "";
				if (data != null && data.length > 0) {
					$("#add_user").css("display", "block");
					$.each(data, function(index, $data) {
						html += '<li class="clearFix"> <span class="fl num">' + (index + 1) + '</span><span class="fl item">' + $data.songname
								+ '</span> <a href="javascript:;" class="delete fl ' + $data.songid + '">\u5220\u9664</a> </li>';
					});
				}
				$("#song_detail").html(html);
			});
		}
	}
})