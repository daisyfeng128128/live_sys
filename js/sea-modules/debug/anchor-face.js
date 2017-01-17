define(function(require, exports, module) {
	var Tools = require('./anchor-tools');
	module.exports = {
		botFaceOn : true,
		init : function() {
			var base = this;
			// 聊天表情初始化
			$('.smileyBtn').on('mousedown', function() {
				var pnl = $('#faces');
				$('#ribbons').hide();
				var offset = $(this).offset();
				if ('' == $('#facesBd').html()) {
					base.initFaceList(function(em) {
						var text = $("#msgContent").val();
						var tmp = text + em;
						if(base.length(tmp) <= 50){
							$("#msgContent").val(tmp).focus();
						}
					});
				}
                if ('' == $('#faces').find('ul').html()) {
                    var html ='\
                        <li data_tp="lx" class="on">流行</li>\
                        <li data_tp="jd">经典</li>\
                        <li data_tp="db">逗逗</li>\
                    ';
                    $('#faces').find('ul').html(html);
                }
				if ('msgFace' == this.id) {
					base.botFaceOn = false;
					pnl.css({
						top : 290
					}).toggle();
				} else {
					base.botFaceOn = true;
					pnl.css({
						top : 290
					}).toggle();
				}
				return false;
			}).on('click', function() {
				return false
			});
		},
        FaceDB:
            [
                {"key": "cry.gif", "text": "哭"},
                {"key": "excited.gif", "text": "兴奋"},
                {"key": "happyNewYear.gif", "text": "新年快乐"},
                {"key": "like.gif", "text": "点赞"},
                {"key": "love.gif", "text": "爱心"},
                {"key": "luckyMoney.gif", "text": "吃惊"},
                {"key": "shock.gif", "text": "坏笑"},
                {"key": "snicker.gif", "text": "求红包"}
            ],
        FaceData : [ [ "lx/lx01.gif", "\u62B1\u62B1" ], [ "lx/lx02.gif", "\u62DC\u62DC" ], [ "lx/lx03.gif", "\u9177" ], [ "lx/lx04.gif", "\u9ED1\u7EBF" ], [ "lx/lx05.gif", "\u51B7\u6C57" ], [ "lx/lx06.gif", "\u8BA8\u538C" ],
						[ "lx/lx07.gif", "\u5077\u7B11" ], [ "lx/lx08.gif", "\u597D\u8272" ], [ "lx/lx09.gif", "\u5927\u7B11" ], [ "lx/lx10.gif", "\u559C\u6B22" ], [ "lx/lx11.gif", "\u6572\u6253" ], [ "lx/lx12.gif", "\u4F24\u5FC3" ],
						[ "lx/lx13.gif", "\u8138\u7EA2" ], [ "lx/lx14.gif", "\u563B\u563B" ], [ "lx/lx15.gif", "\u53F3\u54FC\u54FC" ], [ "lx/lx16.gif", "\u5DE6\u54FC\u54FC" ], [ "lx/lx17.gif", "\u597D" ], [ "lx/lx18.gif", "\u8D85\u8D5E" ],
						[ "lx/lx19.gif", "\u8036" ], [ "lx/lx20.gif", "\u52FE\u5F15" ], [ "lx/lx21.gif", "\u5496\u5561" ], [ "lx/lx22.gif", "\u86CB\u7CD5" ], [ "lx/lx23.gif", "\u5E72\u676F" ], [ "lx/lx24.gif", "\u5FC3" ],
						[ "lx/lx25.gif", "\u7ED9\u529B" ], [ "lx/lx26.gif", "\u56E7" ], [ "lx/lx27.gif", "\u840C" ], [ "lx/lx28.gif", "\u8D5E" ], [ "lx/lx29.gif", "\u819C\u62DC" ], [ "lx/lx30.gif", "\u5A01\u6B66" ],
						[ "lx/lx31.gif", "\u70ED\u543B" ], [ "lx/lx32.gif", "\u6293\u72C2" ], [ "lx/lx33.gif", "\u9707\u64BC" ], [ "lx/lx34.gif", "\u56F4\u89C2" ], [ "lx/lx35.gif", "\u5751\u7239\u554A" ], [ "lx/lx36.gif", "\u4F24\u4E0D\u8D77" ],
						[ "lx/lx37.gif", "\u7231\u4F60" ], [ "lx/lx38.gif", "\u5F97\u610F" ], [ "lx/lx39.gif", "\u5077\u7B11" ], [ "lx/lx40.gif", "\u8E6D" ], [ "lx/lx41.gif", "\u626F" ], [ "lx/lx42.gif", "\u51CC\u4E71" ],
						[ "lx/lx43.gif", "\u7BA1\u4E0D\u7740" ], [ "lx/lx44.gif", "\u8272" ], [ "lx/lx45.gif", "\u6643\u5934" ], [ "lx/lx46.gif", "\u5F00\u5FC3" ], [ "lx/lx47.gif", "\u7EA0\u7ED3" ], [ "lx/lx48.gif", "\u5356\u840C" ],
						[ "lx/lx49.gif", "\u538B\u529B" ], [ "lx/lx50.gif", "\u7529\u820C\u5934" ], [ "jd/jd01.gif", "jd\u5FAE\u7B11" ], [ "jd/jd02.gif", "jd\u8272" ], [ "jd/jd03.gif", "jd\u53D1\u5446" ], [ "jd/jd04.gif", "jd\u5F97\u610F" ],
						[ "jd/jd05.gif", "jd\u6D41\u6CEA" ], [ "jd/jd06.gif", "jd\u5BB3\u7F9E" ], [ "jd/jd07.gif", "jd\u95ED\u5634" ], [ "jd/jd08.gif", "jd\u7761" ], [ "jd/jd09.gif", "jd\u5927\u54ED" ], [ "jd/jd10.gif", "jd\u5C34\u5C2C" ],
						[ "jd/jd11.gif", "jd\u53D1\u6012" ], [ "jd/jd12.gif", "jd\u8C03\u76AE" ], [ "jd/jd13.gif", "jd\u5472\u7259" ], [ "jd/jd14.gif", "jd\u60CA\u8BB6" ], [ "jd/jd15.gif", "jd\u96BE\u8FC7" ], [ "jd/jd16.gif", "jd\u9177" ],
						[ "jd/jd17.gif", "jd\u6293\u72C2" ], [ "jd/jd18.gif", "jd\u5410" ], [ "jd/jd19.gif", "jd\u5077\u7B11" ], [ "jd/jd20.gif", "jd\u53EF\u7231" ], [ "jd/jd21.gif", "jd\u767D\u773C" ], [ "jd/jd22.gif", "jd\u50B2\u6162" ],
						[ "jd/jd23.gif", "jd\u56F0" ], [ "jd/jd24.gif", "jd\u60CA\u6050" ], [ "jd/jd25.gif", "jd\u6D41\u6C57" ], [ "jd/jd26.gif", "jd\u5492\u9A82" ], [ "jd/jd27.gif", "jd\u7591\u95EE" ], [ "jd/jd28.gif", "jd\u5618" ],
						[ "jd/jd29.gif", "jd\u6655" ], [ "jd/jd30.gif", "jd\u6298\u78E8" ], [ "jd/jd31.gif", "jd\u8870" ], [ "jd/jd32.gif", "jd\u9AB7\u9AC5" ], [ "jd/jd33.gif", "jd\u6572\u6253" ], [ "jd/jd34.gif", "jd\u518D\u89C1" ],
						[ "jd/jd35.gif", "jd\u64E6\u6C57" ], [ "jd/jd36.gif", "jd\u62A0\u9F3B" ], [ "jd/jd37.gif", "jd\u9F13\u638C" ], [ "jd/jd38.gif", "jd\u7CD7\u5927\u4E86" ], [ "jd/jd39.gif", "jd\u574F\u7B11" ], [ "jd/jd40.gif", "jd\u54C8\u6B20" ],
						[ "jd/jd41.gif", "jd\u9119\u89C6" ], [ "jd/jd42.gif", "jd\u59D4\u5C48" ], [ "jd/jd43.gif", "jd\u9634\u9669" ], [ "jd/jd44.gif", "jd\u4EB2\u4EB2" ], [ "jd/jd45.gif", "jd\u53EF\u601C" ], [ "jd/jd46.gif", "jd\u732A" ],
						[ "jd/jd47.gif", "jd\u62E5\u62B1" ], [ "jd/jd48.gif", "jd\u77F3\u5316" ], [ "jd/jd49.gif", "jd\u5B89\u6170" ], [ "jd/jd50.gif", "jd\u65E0\u8BED" ], [ "yc/yct01.gif", "yc\u6211\u6765\u4E86" ],
						[ "yc/yct02.gif", "yc\u54C8\u54C8" ], [ "yc/yct03.gif", "yc\u6EE1\u8DB3" ], [ "yc/yct04.gif", "yc\u563F\u563F" ], [ "yc/yct05.gif", "yc\u5978\u7B11" ], [ "yc/yct06.gif", "yc\u5F97\u745F" ],
						[ "yc/yct07.gif", "yc\u90AA\u6076" ], [ "yc/yct08.gif", "yc\u62A0\u9F3B" ], [ "yc/yct09.gif", "yc\u5BB3\u7F9E" ], [ "yc/yct10.gif", "yc\u6EDA\u52A8" ], [ "yc/yct11.gif", "yc\u7231" ],
						[ "yc/yct12.gif", "yc\u82B1\u75F4" ], [ "yc/yct13.gif", "yc\u671F\u5F85" ], [ "yc/yct14.gif", "yc\u626D\u52A8" ], [ "yc/yct15.gif", "yc\u6C57" ], [ "yc/yct16.gif", "yc\u64E6\u6C57" ],
						[ "yc/yct17.gif", "yc\u5BD2" ], [ "yc/yct18.gif", "yc\u9ED1\u7EBF" ], [ "yc/yct19.gif", "yc\u60CA\u6050" ], [ "yc/yct20.gif", "yc\u60CA\u5413" ], [ "yc/yct21.gif", "yc\u53D1\u6012" ],
						[ "yc/yct22.gif", "yc\u753B\u5708\u5708" ], [ "yc/yct23.gif", "yc\u6253\u6EDA" ], [ "yc/yct24.gif", "yc\u54ED" ], [ "yc/yct25.gif", "yc\u4E0D\u8981" ], [ "yc/yct26.gif", "yc\u54ED\u8D70" ],
						[ "yc/yct27.gif", "yc\u53F9\u6C14" ], [ "yc/yct28.gif", "yc\u9177" ], [ "yc/yct29.gif", "yc\u53FC\u82B1" ], [ "yc/yct30.gif", "yc\u843D\u53F6" ], [ "yc/yct31.gif", "yc\u56F0" ],
						[ "yc/yct32.gif", "yc\u7591\u60D1" ], [ "yc/yct33.gif", "yc\u7EB3\u5C3C" ], [ "yc/yct34.gif", "yc\u6012\u706B" ], [ "yc/yct35.gif", "yc\u6454\u684C" ], [ "yc/yct36.gif", "yc\u6293\u72C2" ],
						[ "yc/yct37.gif", "yc\u5FE7\u6101" ], [ "yc/yct38.gif", "yc\u5899\u89D2" ], [ "yc/yct39.gif", "yc\u65E0\u8BED" ], [ "yc/yct40.gif", "yc\u6B7B" ], [ "yc/yct41.gif", "yc\u8179\u9ED1" ],
						[ "yc/yct42.gif", "yc\u644A\u624B" ], [ "yc/yct43.gif", "yc\u77F3\u5316" ], [ "yc/yct44.gif", "yc\u63E1\u62F3" ], [ "yc/yct45.gif", "yc\u6728\u9C7C" ], [ "yc/yct46.gif", "yc\u6655" ],
						[ "yc/yct47.gif", "yc\u6CE1\u6FA1" ], [ "yc/yct48.gif", "yc\u62DC\u6258" ], [ "yc/yct49.gif", "yc\u518D\u89C1" ], [ "yc/yct50.gif", "yc\u597D\u68A6" ], [ "dd/ddt01.gif", "dd\u55E8" ],
						[ "dd/ddt02.gif", "dd\u6B22\u8FCE" ], [ "dd/ddt03.gif", "dd\u9F13\u638C" ], [ "dd/ddt04.gif", "dd\u6492\u82B1" ], [ "dd/ddt05.gif", "dd\u6324\u773C" ], [ "dd/ddt06.gif", "dd\u574F\u7B11" ],
						[ "dd/ddt07.gif", "dd\u5077\u7B11" ], [ "dd/ddt08.gif", "dd\u5410\u820C" ], [ "dd/ddt09.gif", "dd\u626D\u626D" ], [ "dd/ddt10.gif", "dd\u7B11\u8DB4" ], [ "dd/ddt11.gif", "dd\u54ED" ],
						[ "dd/ddt12.gif", "dd\u9A82" ], [ "dd/ddt13.gif", "dd\u53D8\u8138" ], [ "dd/ddt14.gif", "dd\u4E5E\u6C42" ], [ "dd/ddt15.gif", "dd\u56E7" ], [ "dd/ddt16.gif", "dd\u8E6D" ], [ "dd/ddt17.gif", "dd\u6293" ],
						[ "dd/ddt18.gif", "dd\u6B20\u62BD" ], [ "dd/ddt19.gif", "dd\u634F\u8138" ], [ "dd/ddt20.gif", "dd\u9F3B\u8840" ], [ "dd/ddt21.gif", "dd\u6C57" ], [ "dd/ddt22.gif", "dd\u644A\u624B" ],
						[ "dd/ddt23.gif", "dd\u95EA" ], [ "dd/ddt24.gif", "dd\u4F53\u64CD" ], [ "dd/ddt25.gif", "dd\u821E\u8E48" ], [ "dd/ddt26.gif", "dd\u5531\u6B4C" ], [ "dd/ddt27.gif", "dd\u4EB2" ],
						[ "dd/ddt28.gif", "dd\u6012" ], [ "dd/ddt29.gif", "dd\u671F\u5F85" ], [ "dd/ddt30.gif", "dd\u7B7E\u5230" ], [ "dd/ddt31.gif", "dd\u98DE" ], [ "dd/ddt32.gif", "dd\u753B" ],
						[ "dd/ddt33.gif", "dd\u5DE6\u53F3" ], [ "dd/ddt34.gif", "dd\u68D2\u68D2\u7CD6" ], [ "dd/ddt35.gif", "dd\u82B1\u82B1" ], [ "dd/ddt36.gif", "dd\u70B9\u70DF" ], [ "dd/ddt37.gif", "dd\u60CA\u8BB6" ],
						[ "dd/ddt38.gif", "dd\u9119\u89C6" ], [ "dd/ddt39.gif", "dd\u88C5\u50BB" ], [ "dd/ddt40.gif", "dd\u518D\u89C1" ], [ "st/pst01.gif", "st\u5FAE\u7B11" ], [ "st/pst02.gif", "st\u54C8" ],
						[ "st/pst03.gif", "st\u8C03\u76AE" ], [ "st/pst04.gif", "st\u5410\u820C" ], [ "st/pst05.gif", "st\u5077\u7B11" ], [ "st/pst06.gif", "st\u8D3C\u7B11" ], [ "st/pst07.gif", "st\u7F9E" ],
						[ "st/pst08.gif", "st\u840C" ], [ "st/pst09.gif", "st\u75F4" ], [ "st/pst10.gif", "st\u503E\u6155" ], [ "st/pst11.gif", "st\u54ED" ], [ "st/pst12.gif", "st\u5927\u54ED" ], [ "st/pst13.gif", "st\u5446" ],
						[ "st/pst14.gif", "st\u77AA" ], [ "st/pst15.gif", "st\u6012" ], [ "st/pst16.gif", "st\u9ED1\u7EBF" ], [ "st/pst17.gif", "st\u65E0\u8BED" ], [ "st/pst18.gif", "st\u5BD2" ], [ "st/pst19.gif", "st\u6C57" ],
						[ "st/pst20.gif", "st\u706B\u661F" ], [ "st/pst21.gif", "st\u659C\u89C6" ], [ "st/pst22.gif", "st\u563F\u563F" ], [ "st/pst23.gif", "st\u6655" ], [ "st/pst24.gif", "st\u5410" ],
						[ "st/pst25.gif", "st\u95ED\u5634" ], [ "st/pst26.gif", "sthoho" ], [ "st/pst27.gif", "st\u7EB3\u5C3C" ], [ "st/pst28.gif", "st\u9177" ], [ "st/pst29.gif", "st\u54E6" ],
						[ "st/pst30.gif", "st\u5207" ], [ "st/pst31.gif", "st\u7CD7" ], [ "st/pst32.gif", "st\u53EF\u601C" ], [ "st/pst33.gif", "st\u706B\u5927" ], [ "st/pst34.gif", "st\u8C22\u8C22" ],
						[ "st/pst35.gif", "st\u706B\u661F" ], [ "st/pst36.gif", "st\u5B85" ], [ "st/pst37.gif", "st\u57FA" ], [ "st/pst38.gif", "st\u8150" ], [ "st/pst39.gif", "st\u5478" ], [ "st/pst40.gif", "st\u5413" ],
						[ "fl/1.png", "\u7B11\u8138" ], [ "fl/2.png", "\u82B1\u5FC3" ], [ "fl/3.png", "\u4EB2\u4EB2" ], [ "fl/4.png", "\u53D1\u5446" ], [ "fl/5.png", "\u7728\u773C" ], [ "fl/6.png", "\u53D1\u6012" ], [ "fl/7.png", "\u53D1\u56F0" ],
						[ "fl/8.png", "\u65E0\u8BED" ], [ "fl/9.png", "\u5927\u54ED" ], [ "fl/10.png", "\u5410\u820C" ], [ "fl/11.png", "\u96BE\u53D7" ], [ "fl/12.png", "\u65E0\u5948" ], [ "fl/13.png", "\u5192\u6C57" ], [ "fl/14.png", "\u559C\u6CE3" ],
						[ "fl/15.png", "\u5FAE\u7B11" ], [ "fl/16.png", "\u800D\u5B9D" ], [ "fl/17.png", "\u5413\u5230" ], [ "fl/18.png", "\u95ED\u773C" ], [ "fl/19.png", "\u9634\u7B11" ], [ "fl/20.png", "\u60CA\u6050" ], [ "fl/21.png", "\u54B3\u55FD" ],
						[ "fl/22.png", "\u4FBF\u79D8" ], [ "fl/23.png", "\u4EAB\u53D7" ], [ "fl/24.png", "\u52A8\u6012" ], [ "fl/25.png", "\u95ED\u5634" ], [ "fl/26.png", "\u563B\u563B" ], [ "fl/27.png", "\u5FC3\u788E" ], [ "fl/28.png", "\u559C\u6B22" ],
						[ "mb/mb1.gif", "mb\u5FAE\u7B11" ], [ "mb/mb2.gif", "mb\u6487\u5634" ], [ "mb/mb3.gif", "mb\u8272" ], [ "mb/mb4.gif", "mb\u5F97\u610F" ], [ "mb/mb5.gif", "mb\u6D41\u6CEA" ], [ "mb/mb6.gif", "mb\u5BB3\u7F9E" ],
						[ "mb/mb7.gif", "mb\u95ED\u5634" ], [ "mb/mb8.gif", "mb\u7761" ], [ "mb/mb9.gif", "mb\u5927\u54ED" ], [ "mb/mb10.gif", "mb\u6C57" ], [ "mb/mb11.gif", "mb\u6012" ], [ "mb/mb12.gif", "mb\u8C03\u76AE" ],
						[ "mb/mb13.gif", "mb\u5472\u7259" ], [ "mb/mb14.gif", "mb\u60CA\u8BB6" ], [ "mb/mb15.gif", "mb\u96BE\u8FC7" ], [ "mb/mb16.gif", "mb\u9177" ], [ "mb/mb17.gif", "mb\u51B7\u6C57" ], [ "mb/mb18.gif", "mb\u6DD8\u6C14" ],
						[ "mb/mb19.gif", "mb\u5410" ], [ "mb/mb20.gif", "mb\u6342\u5634" ], [ "mb/mb21.gif", "mb\u53EF\u7231" ], [ "mb/mb22.gif", "mb\u767D\u773C" ], [ "mb/mb23.gif", "mb\u5200" ], [ "mb/mb24.gif", "mb\u5FC3" ],
						[ "mb/mb25.gif", "mb\u7FD4" ], [ "mb/mb26.gif", "mb\u52FE\u5F15" ], [ "mb/mb27.gif", "mb\u4E0D\u884C" ], [ "mb/mb28.gif", "mb\u53CC\u559C" ], [ "p1/face0.gif", "face0" ],
						[ "p1/face1.gif", "face1" ], [ "p1/face2.gif", "face2" ], [ "p1/face3.gif", "face3" ], [ "p1/face4.gif", "face4" ], [ "p1/face5.gif", "face5" ],
						[ "p1/face6.gif", "face6" ], [ "p1/face7.gif", "face7" ], [ "p1/face8.gif", "face8" ], [ "p1/face9.gif", "face9" ], [ "p1/face10.gif", "face10" ],
						[ "p1/face11.gif", "face11" ], [ "p1/face12.gif", "face12" ], [ "p1/face13.gif", "face13" ], [ "p1/face14.gif", "face14" ], [ "p1/face15.gif", "face15" ],
						[ "p1/face16.gif", "face16" ], [ "p1/face17.gif", "face17" ], [ "p1/face18.gif", "face18" ], [ "p1/face19.gif", "face19" ], [ "p1/face20.gif", "face20" ],
						[ "p1/face21.gif", "face21" ], [ "p1/face22.gif", "face22" ], [ "p1/face23.gif", "face23" ], [ "p1/face24.gif", "face24" ], [ "p1/face25.gif", "face25" ],
						[ "p1/face26.gif", "face26" ], [ "p1/face27.gif", "face27" ] ],
		getReplaceFace : function(code) {
			var base = this;
			for (var i = 0; i < base.FaceData.length; i++) {
				var arr = base.FaceData[i];
				if (code == arr[0]) {
					return "[" + arr[1] + "]";
				}
			}
		},
		getFaceGIFByCode : function(code, lazy) {
			var base = this;
            if(code.indexOf('db') == 0){
                for (var i = 0; i < base.FaceDB.length; i++) {
                    var arr = base.FaceDB[i];
                    if (arr['text'] == code || code.indexOf(arr['text']) >= 0) {
                        return '<img src="/img/face/db/' + arr['key'] + '" alt="' + arr['text'] + '" title="' + arr['text'] + '">';
                    }
                }
            }else{
                for (var i = 0; i < base.FaceData.length; i++) {
                    var arr = base.FaceData[i];
                    if (arr[1] == code || arr[0] == code) {
                        if (lazy) {
                            return '<img class="lazy" src="/img/pixel.gif" data-original="/img/face/' + arr[0] + '" alt="' + arr[1] + '" title="' + arr[1] + '">';
                        } else {
                            return '<img src="/img/face/' + arr[0] + '" alt="' + arr[1] + '" title="' + arr[1] + '">';
                        }
                    }
                }
            }

		},
		faceReplaceImg : function(str, lazy) {
			var base = this;
			var arr;
			var src = str;
			try {
				var re = /\[()([^[]+)()\]/g;
				while ((arr = re.exec(str)) != null) {
					var s = base.getFaceGIFByCode(arr[2], lazy);
					if (s) {
						src = src.replace(/\[()([^[]+)()\]/, s);
					}
				}
				if (lazy) {
					src = src.replace(/@(\d{1,2})@/g, '<img class="lazy" src="/img/pixel.gif" data-original="/img/ribbon/$1.gif" />');
				} else {
					src = src.replace(/@(\d{1,2})@/g, '<img src="/img/ribbon/$1.gif"/>');
				}
			} catch (e) {
				UIF.log(e);
			}
			return src;
		},
        initFaceType : function(type) {
            var base = this;
            var iRange = {
                'lx' : [ 0, 49 ],
                'jd' : [ 50, 99 ],
                'yc' : [ 100, 149 ],
                'dd' : [ 150, 189 ],
                'st' : [ 190, 229]
            };
            var sIdx = iRange[type][0], eIdx = iRange[type][1], len = sIdx + 50;
            var faceHtml = '<table class="tab_' + type + '"><tbody>';
            for (var i = sIdx; i < len; i++) {
                if (0 == i % 10) {
                    faceHtml += '<tr>';
                }
                var img = (i > eIdx) ? '' : '<img src="/img/face/' + base.FaceData[i][0] + '" alt="' + base.FaceData[i][1] + '" title="' + base.FaceData[i][1] + '">';
                faceHtml += '<td>' + img + '</td>';
                if (0 == (i + 1) % 10) {
                    faceHtml += '</tr>';
                }
            }
            faceHtml += '</tbody></table>';
            $('#facesBd').html(faceHtml);
        },
        initFaceType2 : function(type) {
            var base = this;
            var iRange = {
                'lx' : [ 0, 49 ],
                'jd' : [ 50, 99 ],
                'yc' : [ 100, 149 ],
                'dd' : [ 150, 189 ],
                'st' : [ 190, 229],
                'db' : [ 0, 7]
            };
            var sIdx = iRange[type][0];
            var eIdx = iRange[type][1];
            var len = sIdx + 8;
            var faceHtml = '<table class="tab_' + type + '"><tbody>';
            for (var i = sIdx; i < len; i++) {
                if (0 == i % 10) {
                    faceHtml += '<tr>';
                }
                var img = (i > eIdx) ? '' : '<img src="/img/face/db/' + base.FaceDB[i]['key'] + '" alt="' + base.FaceDB[i]['text'] + '" title="db' + base.FaceDB[i]['text'] + '"><span>' +base.FaceDB[i]['text']+ '</span>';
                faceHtml += '<td>' + img + '</td>';
                if (0 == (i + 1) % 4) {
                    faceHtml += '</tr>';
                }
            }
            faceHtml += '</tbody></table>';
            $('#facesBd').html(faceHtml);
        },
		initFaceList : function(callback) {
			var base = this;
            base.initFaceType('lx');
			// 点击聊天分类
			$('#faces ul').on("click",'li',function(){
				$(this).parent().children().removeClass('on');
				$(this).addClass('on');
				var type = $(this).attr('data_tp');
                if(type == "db"){
                    base.initFaceType2("db");
                }else{
                    base.initFaceType(type);
                }
				return false;
			});
			// 点击聊天中的表情
            $('#facesBd').on('click', "table img", function() {
                var em = '[' + $(this).attr('title') + ']';
                callback(em);
                return false;
            });
		},
		initFaceList_phone : function(obj, callback) {
			// 点击聊天中的表情
			obj.find("img").on('click', function() {
				var em = '[' + $(this).attr('title') + ']';
				callback(em);
				return false;
			});
		},
		replace_face : function(words, fly) {
			if (fly == undefined) {
				words = this.faceReplaceImg(words);
			} else {
				words = Tools.str_replace('/', '', words);
			}
			return words;
		},
		length : function(str){
			return str.replace(/[^\x00-\xff]/g,"rr").length;
		}
	}
})
