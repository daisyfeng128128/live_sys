define('ajax/common', function(require, exports, module){
    //var html=require("./common-html");
/*
    html='<div class="clert"><span></span></div>';
    exports.clert = function(str){
        $(".zhezhao").show();
        $(".clert span").html(str);
        $(".alert").show();
    }*/

    exports.clert = function (text, width, height, time) {
        $(".threesecond").remove();
        $(".zhezhao-threesecond").remove();
        $("body").append("<div class='threesecond'></div><div class='zhezhao-threesecond'></div>");
        $(".threesecond").text(text);
        if (width == undefined || height == undefined) {
            $(".threesecond").css({ width: 200, height: 100, lineHeight: "100px" });
        }
        else {
            $(".threesecond").css({ width: width, height: height, lineHeight: height + "px" });
        }

        $(".zhezhao-threesecond").show();
        $(".threesecond").show();
        if (time == undefined || time == '') {
            setTimeout(function () {
                $(".zhezhao-threesecond").hide();
                $(".threesecond").hide();
            }, 1000);
        }
        else {
            setTimeout(function () {
                $(".zhezhao-threesecond").hide();
                $(".threesecond").hide();
            }, time);
        }
    };
    exports.stringFormat=function(){
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
    };
    exports.postDate = function (params, callback) {
        $.ajax({
            type: "POST",
            url: params.url,
            data: params.data,
            dataType: "json",
            timeout: 1200000,
            success: function (data, textStatus, jqXHR) {
                if (data.nologin) {
                    this.clert('没有登录，请重新登录。');
                } else {
                    callback(data, textStatus, jqXHR);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(params.url+" error code:"+textStatus);
            }
        });
    };
    exports.getDate = function (params, callback) {
        $.ajax({
            type: "POST",
            url: params.url,
            data: params.data,
            dataType: "json",
            timeout: 120000,
            success: function (data, textStatus, jqXHR) {
                callback(data, textStatus, jqXHR);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(params.url+" error code:"+textStatus);
            }
        });
    };
    exports.dateFormat = function(date, sFormat, sLanguage) {
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
    };

});