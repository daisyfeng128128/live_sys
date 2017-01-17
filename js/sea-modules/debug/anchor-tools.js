define(function(require, exports, module) {
	var tins = require("tins");
	module.exports = {
        sortBy : function (filed, rev, primer) {
            rev = (rev) ? -1 : 1;
            return function (x, y) {
                x = x[filed];
                y = y[filed];
                if (typeof (primer) != 'undefined') {
                    x = primer(x);
                    y = primer(y);
                }
                if (x < y) {
                    return rev * -1;
                }
                if (x > y) {
                    return rev * 1;
                }
                return 1;
            }
        },
       uniqueArrayKey : function(arr,key){
            var res = [];
            var json = {};
            for(var i = 0; i < arr.length; i++){
                if(!json[arr[i][key]]){
                    res.push(arr[i]);
                    json[arr[i][key]] = 1;
                }
            }
            return res;
        }, encodeHtml: function (e) {
            return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        }, decodeHtml: function (e) {
            return String(e).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
        },
		dialog : function(msg, ok,cancel){
			var oks = '<a href="javascript:;" class="button button-highlight button-rounded oks">确定</a>';
			var cacens = '<a href="javascript:;" class="button button-rounded button-tiny cancels">取消</a>';
			var heads = UIF.handler.ie6 ? '<iframe style="position:absolute;top:0;left:0;z-index:-1;height:100%;width:100%;border:0;background-color:transparent"></iframe>' : '';
			var bodys = '<div class="tinyAlert">{0}\
							<div class="h">\u4FE1\u606F</div><div class="c">{1}</div>\
							<div class="t">{2}{3}</div>\
						</div>';
			var bools = false;
			var $ok = "";
			var $can = "";
			if(ok){
				$ok = oks;
			}
			if(cancel){
				$can = cacens;
			}
			if(!ok && !cancel){
				$ok = oks;
				bools = true;
			}
			tins.box.show(this.stringFormat(bodys,heads,msg,$ok,$can),0, 0, 0, 0, 3600);
			if(bools){
				$(".tinyAlert .oks").click(function(){
					tins.box.hide();
				});
			}else{
				$(".tinyAlert .oks").click(function(){
					ok();
					tins.box.hide();
				});
				$(".tinyAlert .cancels").click(function(){
					cancel();
					tins.box.hide();
				});
			}
		},
		uuid : function(len, radix) {
			var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
			var chars = CHARS, uuid = [], i;
			radix = radix || chars.length;
			if (len) {
				for (i = 0; i < len; i++)
					uuid[i] = chars[0 | Math.random() * radix];
			} else {
				var r;
				uuid[8] = uuid[13] = uuid[18] = uuid[23] = '';
				uuid[14] = '4';
				for (i = 0; i < 36; i++) {
					if (!uuid[i]) {
						r = 0 | Math.random() * 16;
						uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
					}
				}
			}
			return uuid.join('').toLowerCase();
		},
		stringFormat : function() {
			if (arguments.length == 0)
				return this;
			var $ = arguments[0];
			if ($ != null && $ != "") {
				for (var i = 1; i < arguments.length; i++) {
					var vas = new RegExp("\\{" + (i - 1) + "\\}", "gm");
					if (arguments[i] != null) {
						$ = $.replace(vas, arguments[i]);
					}
				}
			}
			return $;
		},
		rand : function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		document : window.document,
		arrayDistinct : function(arr) {
			var tempArr = {};
			for (var i = 0; i < arr.length; i++) {
				if (tempArr[arr[i] + 1]) {
					arr.splice(i, 1);
					i--;
					continue;
				}
				tempArr[arr[i] + 1] = true;
			}
			tempArr = null;
			return arr;
		},
		arrayIndexOf : function(arr, obj, iStart) {
			if (Array.prototype.indexOf) {
				return arr.indexOf(obj, (iStart || 0));
			} else {
				for (var i = (iStart || 0), j = arr.length; i < j; i++) {
					if (arr[i] === obj) {
						return i;
					}
				}
				return -1;
			}
		},
		arrayContains : function(arrays,item){
			for(var i=0;i<arrays.length;i++){
				if(arrays[i] == item){return true;}
			}
			return false;
		},
		htmlEncode : function(sHtml) {
			var div = this.document.createElement("div"), text = this.document.createTextNode(sHtml);
			div.appendChild(text);
			return div.innerHTML;
		},
		htmlDecode : function(sHtml) {
			var div = this.document.createElement("div");
			div.innerHTML = sHtml;
			return div.innerText || div.textContent;
		},
		getCookie : function(sKey) {
			if (!sKey)
				return "";
			if (document.cookie.length > 0) {
				var startIndex = document.cookie.indexOf(sKey + "=")
				if (startIndex != -1) {
					startIndex = startIndex + sKey.length + 1
					var endIndex = document.cookie.indexOf(";", startIndex)
					if (endIndex == -1) {
						endIndex = document.cookie.length;
					}
					return decodeURIComponent(document.cookie.substring(startIndex, endIndex));
				}
			}
			return ""
		},
		setCookie : function(sKey, sValue, iExpireSeconds) {
			if (!sKey)
				return;
			var expireDate = new Date();
			expireDate.setTime(expireDate.getTime() + iExpireSeconds * 1000);
			this.document.cookie = sKey + "=" + encodeURIComponent(sValue) + ";expires=" + expireDate.toGMTString() + ";";
		},
		deleteCookie : function(sKey) {
			if (!sKey)
				return;
			this.document.cookie = sKey + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		},
		getStorage : function(sKey) {
			if (!sKey)
				return;
			if (window.localStorage) {
				return decodeURIComponent(localStorage.getItem(sKey));
			} else {
				return this.getCookie(sKey);
			}
		},
		setStorage : function(sKey, sValue, iExpireSeconds) {
			if (!sKey)
				return;
			if (window.localStorage) {
				localStorage.setItem(sKey, encodeURIComponent(sValue));
			} else {
				this.setCookie(sKey, sValue, iExpireSeconds);
			}
		},
		deleteStorage : function(sKey) {
			if (!sKey)
				return;
			if (window.localStorage) {
				localStorage.removeItem(sKey);
			} else {
				this.deleteCookie(sKey);
			}
		},
		daysInFebruary : function(obj) {
			var year = 0;
			if (obj instanceof Date) {
				year = obj.getFullYear();
			} else if (typeof obj === "number") {
				year = obj;
			} else {
				return 0;
			}
			if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
				return 29;
			}
			return 28;
		},
		daysInYear : function(obj) {
			var year = 0;
			if (obj instanceof Date) {
				year = obj.getFullYear();
			} else if (typeof obj === "number") {
				year = obj;
			} else {
				return 0;
			}
			if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
				return 366;
			}
			return 365;
		},
		dateFormat : function(date, sFormat, sLanguage) {
			var time = {};
			time.Year = date.getFullYear();
			time.TYear = ("" + time.Year).substr(2);
			time.Month = date.getMonth() + 1;
			time.TMonth = time.Month < 10 ? "0" + time.Month : time.Month;
			time.Day = date.getDate();
			time.TDay = time.Day < 10 ? "0" + time.Day : time.Day;
			time.Hour = date.getHours();
			time.THour = time.Hour < 10 ? "0" + time.Hour : time.Hour;
			time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
			time.Thour = time.hour < 10 ? "0" + time.hour : time.hour;
			time.Minute = date.getMinutes();
			time.TMinute = time.Minute < 10 ? "0" + time.Minute : time.Minute;
			time.Second = date.getSeconds();
			time.TSecond = time.Second < 10 ? "0" + time.Second : time.Second;
			time.Millisecond = date.getMilliseconds();
			time.Week = date.getDay();

			var MMMArrEn = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ], MMMArr = [ "\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708",
					"\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708" ], WeekArrEn = [ "Sun", "Mon", "Tue", "Web", "Thu", "Fri", "Sat" ], WeekArr = [ "\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D" ], oNumber = time.Millisecond / 1000;

			if (sFormat != undefined && sFormat.replace(/\s/g, "").length > 0) {
				if (sLanguage != undefined && sLanguage === "en") {
					MMMArr = MMMArrEn.slice(0);
					WeekArr = WeekArrEn.slice(0);
				}
				sFormat = sFormat.replace(/yyyy/ig, time.Year).replace(/yyy/ig, time.Year).replace(/yy/ig, time.TYear).replace(/y/ig, time.TYear).replace(/MMM/g,
						MMMArr[time.Month - 1]).replace(/MM/g, time.TMonth).replace(/M/g, time.Month).replace(/dd/ig, time.TDay).replace(/d/ig, time.Day)
						.replace(/HH/g, time.THour).replace(/H/g, time.Hour).replace(/hh/g, time.Thour).replace(/h/g, time.hour).replace(/mm/g, time.TMinute).replace(/m/g,
								time.Minute).replace(/ss/ig, time.TSecond).replace(/s/ig, time.Second).replace(/fff/ig, time.Millisecond).replace(/ff/ig, oNumber.toFixed(2) * 100)
						.replace(/f/ig, oNumber.toFixed(1) * 10).replace(/EEE/g, WeekArr[time.Week]);
			} else {
				sFormat = time.Year + "-" + time.Month + "-" + time.Day + " " + time.Hour + ":" + time.Minute + ":" + time.Second;
			}
			return sFormat;
		},
		dateDiff : function(biggerDate, smallerDate) {
			var intervalSeconds = parseInt((biggerDate - smallerDate) / 1000);
			if (intervalSeconds < 60) {
				return intervalSeconds + "\u79D2";
			} else if (intervalSeconds < 60 * 60) {
				return Math.floor(intervalSeconds / 60) + "\u5206\u949F";
			} else if (intervalSeconds < 60 * 60 * 24) {
				return Math.floor(intervalSeconds / (60 * 60)) + "\u5C0F\u65F6";
			} else if (intervalSeconds < 60 * 60 * 24 * 7) {
				return Math.floor(intervalSeconds / (60 * 60 * 24)) + "\u5929";
			} else if (intervalSeconds < 60 * 60 * 24 * 31) {
				return Math.floor(intervalSeconds / (60 * 60 * 24 * 7)) + "\u5468";
			} else if (intervalSeconds < 60 * 60 * 24 * 365) {
				return Math.floor(intervalSeconds / (60 * 60 * 24 * 30)) + "\u6708";
			} else if (intervalSeconds < 60 * 60 * 24 * 365 * 1000) {
				return Math.floor(intervalSeconds / (60 * 60 * 24 * 365)) + "\u5E74";
			} else {
				return Math.floor(intervalSeconds / (60 * 60 * 24)) + "\u5929";
			}
		},
		dateInterval : function(biggerDate, smallerDate) {
			var intervalSeconds = parseInt((biggerDate - smallerDate) / 1000), day = Math.floor(intervalSeconds / (60 * 60 * 24)), hour = Math
					.floor((intervalSeconds - day * 24 * 60 * 60) / 3600), minute = Math.floor((intervalSeconds - day * 24 * 60 * 60 - hour * 3600) / 60), second = Math
					.floor(intervalSeconds - day * 24 * 60 * 60 - hour * 3600 - minute * 60);
			return day + "\u5929:" + hour + "\u5C0F\u65F6:" + minute + "\u5206\u949F:" + second + "\u79D2";
		},
		replaceURLWithHTMLLinks : function(sText, bBlank) {
			var pattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
			if (bBlank) {
				sText = sText.replace(pattern, "<a target='_blank' href='$1'>$1</a>");
			} else {
				sText = sText.replace(pattern, "<a href='$1'>$1</a>");
			}
			return sText;
		},
		getLength : function(sVal, bChineseDouble) {
			var chineseRegex = /[\u4e00-\u9fa5]/g;
			if (bChineseDouble != undefined && bChineseDouble === false) {
				return sVal.length;
			} else {
				if (chineseRegex.test(sVal)) {
					return sVal.replace(chineseRegex, "zz").length;
				}
				return sVal.length;
			}
		},
		str_replace : function(search, replace, subject, count) {
			var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0, f = [].concat(search), r = [].concat(replace), s = subject, ra = Object.prototype.toString.call(r) === '[object Array]', sa = Object.prototype.toString
					.call(s) === '[object Array]';
			s = [].concat(s);
			if (count) {
				this.window[count] = 0;
			}

			for (i = 0, sl = s.length; i < sl; i++) {
				if (s[i] === '') {
					continue;
				}
				for (j = 0, fl = f.length; j < fl; j++) {
					temp = s[i] + '';
					repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
					s[i] = (temp).split(f[j]).join(repl);
					if (count && s[i] !== temp) {
						this.window[count] += (temp.length - s[i].length) / f[j].length;
					}
				}
			}
			return sa ? s : s[0];
		},
		nreplace : function(content){
			if(content != null && content != "")
				return content.replace(".00","");
			return "";
		}
	}
});
define("tins",[],function(require, exports, module) {
	var TINY = {};
	function T$(i) {
		return document.getElementById(i)
	}
	TINY.box = function() {
		var p, m, b, fn, ic, iu, iw, ih, ia, f = 0;
		return {
			show : function(c, u, w, h, a, t) {
				if (!f) {
					p = document.createElement('div');
					p.id = 'tinybox';
					m = document.createElement('div');
					m.id = 'tinymask';
					b = document.createElement('div');
					b.id = 'tinycontent';
					document.body.appendChild(m);
					document.body.appendChild(p);
					p.appendChild(b);
					m.onclick = TINY.box.hide;
					window.onresize = TINY.box.resize;
					f = 1
				}
				if (!a && !u) {
					p.style.width = w ? w + 'px' : 'auto';
					p.style.height = h ? h + 'px' : 'auto';
					p.style.backgroundImage = 'none';
					b.innerHTML = c
				} else {
					b.style.display = 'none';
					p.style.width = p.style.height = '100px'
				}
				this.mask();
				ic = c;
				iu = u;
				iw = w;
				ih = h;
				ia = a;
				this.alpha(m, 1, 80, 3);
				if (t) {
					setTimeout(function() {
						TINY.box.hide()
					}, 1000 * t)
				}
			},
			fill : function(c, u, w, h, a) {
				if (u) {
					p.style.backgroundImage = '';
					var x = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
					x.onreadystatechange = function() {
						if (x.readyState == 4 && x.status == 200) {
							TINY.box.psh(x.responseText, w, h, a)
						}
					};
					x.open('GET', c, 1);
					x.send(null)
				} else {
					this.psh(c, w, h, a)
				}
			},
			psh : function(c, w, h, a) {
				if (a) {
					if (!w || !h) {
						var x = p.style.width, y = p.style.height;
						b.innerHTML = c;
						p.style.width = w ? w + 'px' : '';
						p.style.height = h ? h + 'px' : '';
						b.style.display = '';
						w = parseInt(b.offsetWidth);
						h = parseInt(b.offsetHeight);
						b.style.display = 'none';
						p.style.width = x;
						p.style.height = y;
					} else {
						b.innerHTML = c
					}
					this.size(p, w, h, 4)
				} else {
					p.style.backgroundImage = 'none'
				}
			},
			hide : function() {
				TINY.box.alpha(p, -1, 0, 5)
			},
			resize : function() {
				TINY.box.pos();
				TINY.box.mask()
			},
			mask : function() {
				m.style.height = TINY.page.theight() + 'px';
				m.style.width = '';
				m.style.width = TINY.page.twidth() + 'px'
			},
			pos : function() {
				var t = (TINY.page.height() / 2) - (p.offsetHeight / 2);
				t = t < 10 ? 10 : t;
				p.style.top = (t + TINY.page.top()) + 'px';
				p.style.left = (TINY.page.width() / 2) - (p.offsetWidth / 2) + 'px'
			},
			alpha : function(e, d, a, s) {
				clearInterval(e.ai);
				if (d == 1) {
					e.style.opacity = 0;
					e.style.filter = 'alpha(opacity=0)';
					e.style.display = 'block';
					this.pos()
				}
				e.ai = setInterval(function() {
					TINY.box.twalpha(e, a, d, s)
				}, 20)
			},
			twalpha : function(e, a, d, s) {
				var o = Math.round(e.style.opacity * 100);
				if (o == a) {
					clearInterval(e.ai);
					if (d == -1) {
						e.style.display = 'none';
						e == p ? TINY.box.alpha(m, -1, 0, 3) : b.innerHTML = p.style.backgroundImage = ''
					} else {
						e == m ? this.alpha(p, 1, 100, 5) : TINY.box.fill(ic, iu, iw, ih, ia)
					}
				} else {
					var n = o + Math.ceil(Math.abs(a - o) / s) * d;
					e.style.opacity = n / 100;
					e.style.filter = 'alpha(opacity=' + n + ')'
				}
			},
			size : function(e, w, h, s) {
				e = typeof e == 'object' ? e : T$(e);
				clearInterval(e.si);
				var ow = e.offsetWidth, oh = e.offsetHeight, wo = ow - parseInt(e.style.width), ho = oh - parseInt(e.style.height);
				var wd = ow - wo > w ? -1 : 1, hd = (oh - ho > h) ? -1 : 1;
				e.si = setInterval(function() {
					TINY.box.twsize(e, w, wo, wd, h, ho, hd, s)
				}, 20)
			},
			twsize : function(e, w, wo, wd, h, ho, hd, s) {
				var ow = e.offsetWidth - wo, oh = e.offsetHeight - ho;
				if (ow == w && oh == h) {
					clearInterval(e.si);
					p.style.backgroundImage = 'none';
					b.style.display = 'block'
				} else {
					if (ow != w) {
						e.style.width = ow + (Math.ceil(Math.abs(w - ow) / s) * wd) + 'px'
					}
					if (oh != h) {
						e.style.height = oh + (Math.ceil(Math.abs(h - oh) / s) * hd) + 'px'
					}
					this.pos()
				}
			}
		}
	}();

	TINY.page = function() {
		return {
			top : function() {
				return document.body.scrollTop || document.documentElement.scrollTop
			},
			width : function() {
				return self.innerWidth || document.documentElement.clientWidth
			},
			height : function() {
				return self.innerHeight || document.documentElement.clientHeight
			},
			theight : function() {
				var d = document, b = d.body, e = d.documentElement;
				return Math.max(Math.max(b.scrollHeight, e.scrollHeight), Math.max(b.clientHeight, e.clientHeight))
			},
			twidth : function() {
				var d = document, b = d.body, e = d.documentElement;
				return Math.max(Math.max(b.scrollWidth, e.scrollWidth), Math.max(b.clientWidth, e.clientWidth))
			}
		}
	}();
	module.exports = TINY;
})
