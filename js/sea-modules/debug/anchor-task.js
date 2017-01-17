define(function(require, exports, module) {
	var _taskId;
	var _groupId;
	var initTaskHtml = function(tid, title, ms, gifts, finish) {
		this.tableGift = "";
		this.h = '<div class="task'
				+ tid
				+ ' temp" >\
                    <div class="task11-header">\
                        <div class="task-qiandao-name">'
				+ title
				+ '</div>\
                    </div>\
                    <div class="task11-p1">'
				+ ms
				+ '</div>\
                    <div class="task11-fenjiexian"></div>\
                    <div class="task111-name">'
				+ title
				+ '</div>\
                    <div class="task111">\
                    <table>[GIFTTABLE]\
                    </table>\
                    <div class="task111-lingqu" id="sendAnyGift">\
                    <span class="task111-btn [LQ]" id="task'
				+ tid + '-btn">[LQT]</span>\
                    </div>\
                    </div>\
            </div>';
		this.tid = tid;
		this.gifts = jQuery.parseJSON(gifts);
		this.duration = gifts.duration;
		this.finish = finish;
	}
	initTaskHtml.prototype = {
		init : function() {
			var ht = "<tr>";
			for (var i = 0; i < this.gifts.prize[0].gift.length; i++) {
				ht += '<td><img src="/static_data/gift/' + this.gifts.prize[0].gift[i].pic + '"></td><td>\u5956\u52B1' + this.gifts.prize[0].gift[i].text + this.gifts.prize[0].gift[i].num
						+ '\u4E2A</td>';
			}
			ht += "</tr>";

			if (this.finish == 2) {
				lq = "hasling";
				lqt = "\u5DF2\u9886\u53D6";
			} else if (this.finish == 1) {
				lq = "";
				lqt = "\u9886\u53D6";
			} else if (this.finish == 0) {
				lq = "weiling";
				lqt = "\u9886\u53D6";
			} else {
				lq = "weiling";
				lqt = "\u672A\u5F00\u542F";
			}
			this.h = this.h.replace("[LQT]", lqt);
			this.h = this.h.replace("[LQ]", lq);
			this.h = this.h.replace("[GIFTTABLE]", ht);
			$(".temp").remove();
			$(".task-right").append(this.h);
			$(".task-right .task" + this.tid).show();
		}
	}

	var seeOnline = function(options) {
		var setting = $.extend({}, {
			duration : [],
			handle : [],
			minutes : "",
			prize : "",
			finsh : "",
			callback : function() {
			}
		}, options);
		for ( var name in setting)
			this[name] = setting[name]
	};
	seeOnline.prototype = {
		init : function() {
			console.log(this.minutes);
			this.initMenu(), this.initBenifit(), this.addEnent()
		},
		initMenu : function() {
			var container = $(".jin-outer");
			var texts = $(".jin-text-list");
			var html = "";
			var textli = "";
			var max = 8;
			var deg = this.minutes / max * 100;
			if (this.minutes > 0) {
				deg = deg > 97 ? 97 : deg;
				html += '<div class="jin-inner" style="width: ' + deg + '%"></div>';
				html += '<div class="tuoyuan"></div>';
			}
			for (var i = 0; i < this.duration.length; i++) {
				var precent = this.duration[i] / max * 100;
				if (i != (this.duration.length - 1)) {
					if (precent < deg || precent == deg) {
						html += '<div class="tuoyuan" style="left:' + precent + '%"></div>';
					} else {
						html += '<div class="sanjiao" style="left:' + precent + '%"></div>';
					}
				}
				if (i == 1) {
					textli += '<div class="jin-text" style="left:30%">' + this.duration[i] + '\u5206\u949F</div>';
				} else if (i == 2) {
					textli += '<div class="jin-text" style="left:60%">' + this.duration[i] + '\u5206\u949F</div>';
				} else if (i == 3) {
					textli += '<div class="jin-text" style="left:90%">' + this.duration[i] + '\u5206\u949F</div>';
				} else {
					textli += '<div class="jin-text" style="left:' + this.duration[i] + '%">' + this.duration[i] + '\u5206\u949F</div>';
				}
			}
			if (this.minutes > max || this.minutes == max) {
				html += '<div class="tuoyuan" style="left:98%"></div>';
			}
			container.html(html);
			texts.html(textli);
		},
		initBenifit : function() {
			var _finish = this.finish;
			var _prize = this.prize;
			var _duration = this.duration;
			var _handle = this.handle; //  0\u5F00\u542F 1\u5B8C\u6210 2\u9886\u53D6\u5B8C\u6210
			var _table = $("#seeOnlineTable table");
			var tr = "<tr>";
			var _btnHtml = _table.siblings(".task111-lingqu");
			var _btn = "";
			for (var j = 0; j < _prize[0].gift.length; j++) {
				tr += '<td><img src="/static_data/gift/' + _prize[0].gift[j].pic + '"></td><td>\u5956\u52B1' + _prize[0].gift[j].text + _prize[0].gift[j].num + '\u4E2A</td>';
			}
			tr += "</tr>";
			_btn = '<span class="task111-btn" id="seeOnline5" dur="5">\u9886\u53D6\u5956\u52B1</span>';

			var _class = "weiling";
			_i = 0;
			_k = 0;
			for (var i = 0; i < _handle.length; i++) { //3 2 1 0
				if (_handle[i] == 1) {
					break;
				}
				_i++;
			}
			if (_i == _handle.length) {
				_i = 0;
				for (var i = 0; i < _handle.length; i++) { //3 2 1 0
					if (_handle[i] == 0) {
						_k = 1;
						break;
					}
					_i++;
				}
			}
			if (_i < _handle.length) {
				tr = "<tr>";
				for (var j = 0; j < _prize[_i].gift.length; j++) {
					tr += '<td><img src="/static_data/gift/' + _prize[_i].gift[j].pic + '"></td><td>\u5956\u52B1' + _prize[_i].gift[j].text + _prize[_i].gift[j].num + '\u4E2A</td>';
				}
			}
			if (_i < _handle.length && _k == 0) {
				_btn = '<span class="task111-btn lingqu" id="seeOnline' + _duration[_i] + '" dur="' + _duration[_i] + '">\u9886\u53D6\u5956\u52B1</span>';
			} else {
				if (_i == _handle.length) {
					_btn = '<span class="task111-btn hasling" id="seeOnline' + _duration[0] + '" dur="' + _duration[0] + '">\u5DF2\u9886\u5B8C</span>';
				} else {
					_btn = '<span class="task111-btn weiling" id="seeOnline' + _duration[0] + '" dur="' + _duration[0] + '">\u9886\u53D6\u5956\u52B1</span>';
				}
			}
			if (_finish == 3) {
				_btn = '<span class="task111-btn weiling">\u672A\u5F00\u542F</span>';
			}
			_table.html(tr);
			_btnHtml.html(_btn);
		},
		addEnent : function() {
			$(".task111-lingqu").on("click", ".lingqu", function() {
				UIF.handler.claimeLookLive({
					groupId : _groupId,
					taskId : _taskId,
					duration : $(this).attr("dur")
				}, function(data) {
					tasking(_taskId, _groupId);
				});
			})
		}
	}

	var tasking = function(tid, gid) {
		if (tid == 2) {
			UIF.handler.taskDetails({
				groupId : gid,
				taskId : tid
			}, function(data) {
				var data = jQuery.parseJSON(data); // finish 0:\u5F00\u542F\u4E2D,1:\u5B8C\u6210\u4E2D,2:\u5DF2\u9886\u5956,3:\u672A\u5F00\u542F
				var title = "\u6BCF\u65E5\u7B7E\u5230";
				var ms = "\u6BCF\u5929\u7B7E\u5230\u4E00\u6B21\u9886\u53D6\u5956\u52B1!"
				new initTaskHtml(data.taskId, title, ms, data.parameters, data.finish).init();
			});

		} else if (tid == 1) {
			UIF.handler.taskDetails({
				groupId : gid,
				taskId : tid
			}, function(data) {
				data = jQuery.parseJSON(data);
				var parameters = jQuery.parseJSON(data.parameters);
				new seeOnline({
					duration : parameters.duration,
					handle : parameters.handle,
					minutes : parameters.minutes,
					prize : parameters.prize,
					finish : data.finish
				}).init();
			});
		} else if (tid == 6) {
			UIF.handler.taskDetails({
				groupId : gid,
				taskId : tid
			}, function(data) {
				var data = jQuery.parseJSON(data);
				var title = "\u8D60\u9001\u793C\u7269\u4E00\u679A";
				var ms = "\u8D60\u9001\u4EFB\u610F\u793C\u7269\u4E00\u4E2A\u53EF\u9886\u53D6\u5956\u52B1!"
				new initTaskHtml(data.taskId, title, ms, data.parameters, data.finish).init();
			});
		} else if (tid == 7) {
			UIF.handler.taskDetails({
				groupId : gid,
				taskId : tid
			}, function(data) {
				var data = jQuery.parseJSON(data);
				var title = "\u8D60\u9001\u793C\u7269\u8D85\u8FC71000\u9017\u5E01";
				var ms = "\u8D60\u9001\u4E3B\u64AD\u793C\u7269\u7D2F\u8BA1\u8D85\u8FC71000\u9017\u5E01!"
				new initTaskHtml(data.taskId, title, ms, data.parameters, data.finish).init();
			});
		}

		if (typeof (tid) == undefined || tid == "") {
			$(".task-left").hide();
			$(".task-right").hide();
		}
		$(".task-left .task-li[rel='" + tid + "']").addClass('task-li-hover').siblings().removeClass('task-li-hover');
		$(".task-right >div").hide();
		$(".task-right").find(".task" + tid).show();
	}

	$(".task-header div").click(function() {
		$(this).siblings().removeClass("bottom-line");
		$(this).addClass("bottom-line");
		var indexs = $(this).attr("indexs");
		var firstTid, firstGid;
		UIF.handler.sendTaskGroups({}, function(data) {
			var data = jQuery.parseJSON(data);
			var html = "";
			$.each(data, function() {
				var _self = $(this);
				html += '<div class="task-area">';
				html += '<div class="task-type"><div class="jian dk" zid="' + _self[0].id + '" >' + _self[0].name + '</div></div> ';
				firstGid = _self[0].id;
				if (_self[0].taskList.length > 0) {
					html += '<div class="task-list">';
					$.each(_self[0].taskList, function(k, v) {
						if (indexs == 0) {
							html += ' <div class="task-li" rel="' + v.id + '" clazz="' + v.clazz + '">' + v.taskName + '</div>';
						} else {
							if (v.finishStatus == indexs) {
								firstTid = v.id;
								html += ' <div class="task-li" rel="' + v.id + '" clazz="' + v.clazz + '">' + v.taskName + '</div>';
							}
						}
					});
					html += '</div>';
				}
				html += "</div>";
			});
			$(".task-left").html(html);
			tasking(firstTid, firstGid);
		})
	})
	$(".switch-area").on("click", '#sw-mission', function(e) {
		if(!UIF.handler.login){
			UIF.handler.loging();
			return;
		}
		if ($(".TaskBox").is(":hidden")) {
			UIF.handler.sendTaskGroups({}, function(data) {
				var data = jQuery.parseJSON(data);
				var html = "";
				$.each(data, function() {
					var _self = $(this);
					html += '<div class="task-area">';
					html += '<div class="task-type"><div class="jian dk" zid="' + _self[0].id + '" >' + _self[0].name + '</div></div> ';
					if (_self[0].taskList.length > 0) {
						html += '<div class="task-list">';
						$.each(_self[0].taskList, function(k, v) {
							html += ' <div class="task-li" rel="' + v.id + '" clazz="' + v.clazz + '">' + v.taskName + '</div>';
						});
						html += '</div>';
					}
					html += "</div>";
				});
				$(".task-left").html(html);
				tasking(2, 1);
				$(".TaskBox").show();
			})
			$(this).addClass("sw-mission").removeClass("sw-mission-hover");
		} else {
			$(".TaskBox").hide();
			$(this).addClass("sw-mission-hover").removeClass("sw-mission");
		}
	})
	$(".task-left").on("click", ' .task-area .dk', function(e) {
		var _self = $(this);
		_self.parent().siblings(".task-list").slideToggle();
		if (_self.hasClass('jian')) {
			_self.removeClass('jian').addClass('jia');
		} else {
			_self.removeClass('jia').addClass('jian');
		}
	})
	$(".task-left").on("click", '.task-area .task-list .task-li', function(e) { //\u83DC\u5355\u6837\u5F0F.\u53F3\u4FA7\u9875\u9762\u5207\u6362 \u4EFB\u52A1\u72B6\u6001
		_taskId = $(this).attr("rel");
		_groupId = $(this).parents().siblings('.task-type').find(".dk").attr("zid");
		tasking(_taskId, _groupId);
	})
	$(".task-right").on("click", '#task2-btn', function(e) {
		var _selff = $(this);
		UIF.handler.signin({
			groupId : "1",
			taskId : "2"
		}, function(data) {
			var data = jQuery.parseJSON(data);
			if (data.finish == 2) {
				_selff.addClass("hasling");
			}
		});
	})
	$(".xx").click(function() {
		$(".TaskBox").hide();
		$("#sw-mission").removeClass("sw-mission").addClass("sw-mission-hover");
	})
	$('.task11btn').click(function() {
		$(this).addClass("hasling");
	})
})