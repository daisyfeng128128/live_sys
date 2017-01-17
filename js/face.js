/**
表情页js
默认是:/img/face/lx/lx01.gif
lx可以是以下目录
		'lx':[0,49],
		'jd':[50,99],
		'yc':[100,149],
		'dd':[150,189],
		'st':[190,229]
		'sj':[230,257]


彩条在:  1-10.gif
img/face/1.gif
*/
var FaceData=[["lx/lx01.gif","抱抱"],["lx/lx02.gif","拜拜"],["lx/lx03.gif","酷"],["lx/lx04.gif","黑线"],["lx/lx05.gif","冷汗"],["lx/lx06.gif","讨厌"],["lx/lx07.gif","偷笑"],["lx/lx08.gif","好色"],["lx/lx09.gif","大笑"],["lx/lx10.gif","喜欢"],["lx/lx11.gif","敲打"],["lx/lx12.gif","伤心"],["lx/lx13.gif","脸红"],["lx/lx14.gif","嘻嘻"],["lx/lx15.gif","右哼哼"],["lx/lx16.gif","左哼哼"],["lx/lx17.gif","好"],["lx/lx18.gif","超赞"],["lx/lx19.gif","耶"],["lx/lx20.gif","勾引"],["lx/lx21.gif","咖啡"],["lx/lx22.gif","蛋糕"],["lx/lx23.gif","干杯"],["lx/lx24.gif","心"],["lx/lx25.gif","给力"],["lx/lx26.gif","囧"],["lx/lx27.gif","萌"],["lx/lx28.gif","赞"],["lx/lx29.gif","膜拜"],["lx/lx30.gif","威武"],["lx/lx31.gif","热吻"],["lx/lx32.gif","抓狂"],["lx/lx33.gif","震撼"],["lx/lx34.gif","围观"],["lx/lx35.gif","坑爹啊"],["lx/lx36.gif","伤不起"],["lx/lx37.gif","爱你"],["lx/lx38.gif","得意"],["lx/lx39.gif","偷笑"],["lx/lx40.gif","蹭"],["lx/lx41.gif","扯"],["lx/lx42.gif","凌乱"],["lx/lx43.gif","管不着"],["lx/lx44.gif","色"],["lx/lx45.gif","晃头"],["lx/lx46.gif","开心"],["lx/lx47.gif","纠结"],["lx/lx48.gif","卖萌"],["lx/lx49.gif","压力"],["lx/lx50.gif","甩舌头"],["jd/jd01.gif","jd微笑"],["jd/jd02.gif","jd色"],["jd/jd03.gif","jd发呆"],["jd/jd04.gif","jd得意"],["jd/jd05.gif","jd流泪"],["jd/jd06.gif","jd害羞"],["jd/jd07.gif","jd闭嘴"],["jd/jd08.gif","jd睡"],["jd/jd09.gif","jd大哭"],["jd/jd10.gif","jd尴尬"],["jd/jd11.gif","jd发怒"],["jd/jd12.gif","jd调皮"],["jd/jd13.gif","jd呲牙"],["jd/jd14.gif","jd惊讶"],["jd/jd15.gif","jd难过"],["jd/jd16.gif","jd酷"],["jd/jd17.gif","jd抓狂"],["jd/jd18.gif","jd吐"],["jd/jd19.gif","jd偷笑"],["jd/jd20.gif","jd可爱"],["jd/jd21.gif","jd白眼"],["jd/jd22.gif","jd傲慢"],["jd/jd23.gif","jd困"],["jd/jd24.gif","jd惊恐"],["jd/jd25.gif","jd流汗"],["jd/jd26.gif","jd咒骂"],["jd/jd27.gif","jd疑问"],["jd/jd28.gif","jd嘘"],["jd/jd29.gif","jd晕"],["jd/jd30.gif","jd折磨"],["jd/jd31.gif","jd衰"],["jd/jd32.gif","jd骷髅"],["jd/jd33.gif","jd敲打"],["jd/jd34.gif","jd再见"],["jd/jd35.gif","jd擦汗"],["jd/jd36.gif","jd抠鼻"],["jd/jd37.gif","jd鼓掌"],["jd/jd38.gif","jd糗大了"],["jd/jd39.gif","jd坏笑"],["jd/jd40.gif","jd哈欠"],["jd/jd41.gif","jd鄙视"],["jd/jd42.gif","jd委屈"],["jd/jd43.gif","jd阴险"],["jd/jd44.gif","jd亲亲"],["jd/jd45.gif","jd可怜"],["jd/jd46.gif","jd猪"],["jd/jd47.gif","jd拥抱"],["jd/jd48.gif","jd石化"],["jd/jd49.gif","jd安慰"],["jd/jd50.gif","jd无语"],["yc/yct01.gif","yc我来了"],["yc/yct02.gif","yc哈哈"],["yc/yct03.gif","yc满足"],["yc/yct04.gif","yc嘿嘿"],["yc/yct05.gif","yc奸笑"],["yc/yct06.gif","yc得瑟"],["yc/yct07.gif","yc邪恶"],["yc/yct08.gif","yc抠鼻"],["yc/yct09.gif","yc害羞"],["yc/yct10.gif","yc滚动"],["yc/yct11.gif","yc爱"],["yc/yct12.gif","yc花痴"],["yc/yct13.gif","yc期待"],["yc/yct14.gif","yc扭动"],["yc/yct15.gif","yc汗"],["yc/yct16.gif","yc擦汗"],["yc/yct17.gif","yc寒"],["yc/yct18.gif","yc黑线"],["yc/yct19.gif","yc惊恐"],["yc/yct20.gif","yc惊吓"],["yc/yct21.gif","yc发怒"],["yc/yct22.gif","yc画圈圈"],["yc/yct23.gif","yc打滚"],["yc/yct24.gif","yc哭"],["yc/yct25.gif","yc不要"],["yc/yct26.gif","yc哭走"],["yc/yct27.gif","yc叹气"],["yc/yct28.gif","yc酷"],["yc/yct29.gif","yc叼花"],["yc/yct30.gif","yc落叶"],["yc/yct31.gif","yc困"],["yc/yct32.gif","yc疑惑"],["yc/yct33.gif","yc纳尼"],["yc/yct34.gif","yc怒火"],["yc/yct35.gif","yc摔桌"],["yc/yct36.gif","yc抓狂"],["yc/yct37.gif","yc忧愁"],["yc/yct38.gif","yc墙角"],["yc/yct39.gif","yc无语"],["yc/yct40.gif","yc死"],["yc/yct41.gif","yc腹黑"],["yc/yct42.gif","yc摊手"],["yc/yct43.gif","yc石化"],["yc/yct44.gif","yc握拳"],["yc/yct45.gif","yc木鱼"],["yc/yct46.gif","yc晕"],["yc/yct47.gif","yc泡澡"],["yc/yct48.gif","yc拜托"],["yc/yct49.gif","yc再见"],["yc/yct50.gif","yc好梦"],["dd/ddt01.gif","dd嗨"],["dd/ddt02.gif","dd欢迎"],["dd/ddt03.gif","dd鼓掌"],["dd/ddt04.gif","dd撒花"],["dd/ddt05.gif","dd挤眼"],["dd/ddt06.gif","dd坏笑"],["dd/ddt07.gif","dd偷笑"],["dd/ddt08.gif","dd吐舌"],["dd/ddt09.gif","dd扭扭"],["dd/ddt10.gif","dd笑趴"],["dd/ddt11.gif","dd哭"],["dd/ddt12.gif","dd骂"],["dd/ddt13.gif","dd变脸"],["dd/ddt14.gif","dd乞求"],["dd/ddt15.gif","dd囧"],["dd/ddt16.gif","dd蹭"],["dd/ddt17.gif","dd抓"],["dd/ddt18.gif","dd欠抽"],["dd/ddt19.gif","dd捏脸"],["dd/ddt20.gif","dd鼻血"],["dd/ddt21.gif","dd汗"],["dd/ddt22.gif","dd摊手"],["dd/ddt23.gif","dd闪"],["dd/ddt24.gif","dd体操"],["dd/ddt25.gif","dd舞蹈"],["dd/ddt26.gif","dd唱歌"],["dd/ddt27.gif","dd亲"],["dd/ddt28.gif","dd怒"],["dd/ddt29.gif","dd期待"],["dd/ddt30.gif","dd签到"],["dd/ddt31.gif","dd飞"],["dd/ddt32.gif","dd画"],["dd/ddt33.gif","dd左右"],["dd/ddt34.gif","dd棒棒糖"],["dd/ddt35.gif","dd花花"],["dd/ddt36.gif","dd点烟"],["dd/ddt37.gif","dd惊讶"],["dd/ddt38.gif","dd鄙视"],["dd/ddt39.gif","dd装傻"],["dd/ddt40.gif","dd再见"],["st/pst01.gif","st微笑"],["st/pst02.gif","st哈"],["st/pst03.gif","st调皮"],["st/pst04.gif","st吐舌"],["st/pst05.gif","st偷笑"],["st/pst06.gif","st贼笑"],["st/pst07.gif","st羞"],["st/pst08.gif","st萌"],["st/pst09.gif","st痴"],["st/pst10.gif","st倾慕"],["st/pst11.gif","st哭"],["st/pst12.gif","st大哭"],["st/pst13.gif","st呆"],["st/pst14.gif","st瞪"],["st/pst15.gif","st怒"],["st/pst16.gif","st黑线"],["st/pst17.gif","st无语"],["st/pst18.gif","st寒"],["st/pst19.gif","st汗"],["st/pst20.gif","st火星"],["st/pst21.gif","st斜视"],["st/pst22.gif","st嘿嘿"],["st/pst23.gif","st晕"],["st/pst24.gif","st吐"],["st/pst25.gif","st闭嘴"],["st/pst26.gif","sthoho"],["st/pst27.gif","st纳尼"],["st/pst28.gif","st酷"],["st/pst29.gif","st哦"],["st/pst30.gif","st切"],["st/pst31.gif","st糗"],["st/pst32.gif","st可怜"],["st/pst33.gif","st火大"],["st/pst34.gif","st谢谢"],["st/pst35.gif","st火星"],["st/pst36.gif","st宅"],["st/pst37.gif","st基"],["st/pst38.gif","st腐"],["st/pst39.gif","st呸"],["st/pst40.gif","st吓"],["fl/1.png","笑脸"],["fl/2.png","花心"],["fl/3.png","亲亲"],["fl/4.png","发呆"],["fl/5.png","眨眼"],["fl/6.png","发怒"],["fl/7.png","发困"],["fl/8.png","无语"],["fl/9.png","大哭"],["fl/10.png","吐舌"],["fl/11.png","难受"],["fl/12.png","无奈"],["fl/13.png","冒汗"],["fl/14.png","喜泣"],["fl/15.png","微笑"],["fl/16.png","耍宝"],["fl/17.png","吓到"],["fl/18.png","闭眼"],["fl/19.png","阴笑"],["fl/20.png","惊恐"],["fl/21.png","咳嗽"],["fl/22.png","便秘"],["fl/23.png","享受"],["fl/24.png","动怒"],["fl/25.png","闭嘴"],["fl/26.png","嘻嘻"],["fl/27.png","心碎"],["fl/28.png","喜欢"],["mb/mb1.gif","mb微笑"],["mb/mb2.gif","mb撇嘴"],["mb/mb3.gif","mb色"],["mb/mb4.gif","mb得意"],["mb/mb5.gif","mb流泪"],["mb/mb6.gif","mb害羞"],["mb/mb7.gif","mb闭嘴"],["mb/mb8.gif","mb睡"],["mb/mb9.gif","mb大哭"],["mb/mb10.gif","mb汗"],["mb/mb11.gif","mb怒"],["mb/mb12.gif","mb调皮"],["mb/mb13.gif","mb呲牙"],["mb/mb14.gif","mb惊讶"],["mb/mb15.gif","mb难过"],["mb/mb16.gif","mb酷"],["mb/mb17.gif","mb冷汗"],["mb/mb18.gif","mb淘气"],["mb/mb19.gif","mb吐"],["mb/mb20.gif","mb捂嘴"],["mb/mb21.gif","mb可爱"],["mb/mb22.gif","mb白眼"],["mb/mb23.gif","mb刀"],["mb/mb24.gif","mb心"],["mb/mb25.gif","mb翔"],["mb/mb26.gif","mb勾引"],["mb/mb27.gif","mb不行"],["mb/mb28.gif","mb双喜"],["p1/face0.gif","face0"],["p1/face1.gif","face1"],["p1/face2.gif","face2"],["p1/face3.gif","face3"],["p1/face4.gif","face4"],["p1/face5.gif","face5"],["p1/face6.gif","face6"],["p1/face7.gif","face7"],["p1/face8.gif","face8"],["p1/face9.gif","face9"],["p1/face10.gif","face10"],["p1/face11.gif","face11"],["p1/face12.gif","face12"],["p1/face13.gif","face13"],["p1/face14.gif","face14"],["p1/face15.gif","face15"],["p1/face16.gif","face16"],["p1/face17.gif","face17"],["p1/face18.gif","face18"],["p1/face19.gif","face19"],["p1/face20.gif","face20"],["p1/face21.gif","face21"],["p1/face22.gif","face22"],["p1/face23.gif","face23"],["p1/face24.gif","face24"],["p1/face25.gif","face25"],["p1/face26.gif","face26"],["p1/face27.gif","face27"]];
function getReplaceFace(code){
	for(var i=0;i<FaceData.length;i++){
		var arr=FaceData[i];
		if(code==arr[0]){
			return "["+arr[1]+"]"; 
		}
	}
}
function getFaceGIFByCode(code,lazy){
	for(var i=0;i<FaceData.length;i++){    
		var arr=FaceData[i];
		if(arr[1]==code||arr[0]==code){
			if(lazy){
				return '<img class="lazy" src="'+cdn_domain+'/img/pixel.gif" data-original="/img/face/'+arr[0]+'" alt="'+arr[1]+'" title="'+arr[1]+'">';
			}else{
				return '<img src="'+cdn_domain+'/img/face/'+arr[0]+'" alt="'+arr[1]+'" title="'+arr[1]+'">';
			}
		}
	}
}
function faceReplaceImg(str,lazy){
	var arr;
	var src=str;
	var re=/\[()([^[]+)()\]/g;
	while((arr = re.exec(str)) != null){
		var s = getFaceGIFByCode(arr[2],lazy);
		if(s){
		src = src.replace(/\[()([^[]+)()\]/,s);
		}
	}
	if(lazy){
		src=src.replace(/@(\d{1,2})@/g,'<img class="lazy" src="'+cdn_domain+'/img/pixel.gif" data-original="/img/ribbon/$1.gif" />');
	}else{
		src=src.replace(/@(\d{1,2})@/g,'<img src="'+cdn_domain+'/img/ribbon/$1.gif"/>');
	}
	return src;
}
var initFaceType=function(type){
	var iRange={
		'lx':[0,49],
		'jd':[50,99],
		'yc':[100,149],
		'dd':[150,189],
		'st':[190,229]
	};
	var sIdx=iRange[type][0],eIdx=iRange[type][1],len=sIdx+50;
	var faceHtml='<table class="tab_'+type+'"><tbody>';
	for(var i=sIdx;i<len;i++){
		if(0==i%10){faceHtml+='<tr>';}
		var img=(i>eIdx)?'':'<img src="'+cdn_domain+'/img/face/'+FaceData[i][0]+'" alt="'+FaceData[i][1]+'" title="'+FaceData[i][1]+'">';
		faceHtml+='<td>'+img+'</td>';
		if(0==(i+1)%10){faceHtml+='</tr>';}
	}
	faceHtml+='</tbody></table>';
	$('#facesBd').html(faceHtml);
};
var initFaceList=function(callback){
	initFaceType('lx');
	//点击聊天分类
	$('#faces li').click(function(){
		$(this).parent().children().removeClass('on');
		$(this).addClass('on');
		var type=$(this).attr('data_tp');
		initFaceType(type);
		return false;
	});
	//点击聊天中的表情
	$('#faces img').live('click',function(){
		var em='['+$(this).attr('title')+']';
		callback(em);
		return false;
	});
};
//手机表情相关
var FaceData_phone=[["mb/mb1.gif","mb微笑"],["mb/mb2.gif","mb撇嘴"],["mb/mb3.gif","mb色"],["mb/mb4.gif","mb得意"],["mb/mb5.gif","mb流泪"],["mb/mb6.gif","mb害羞"],["mb/mb7.gif","mb闭嘴"],["mb/mb8.gif","mb睡"],["mb/mb9.gif","mb大哭"],["mb/mb10.gif","mb汗"],["mb/mb11.gif","mb怒"],["mb/mb12.gif","mb调皮"],["mb/mb13.gif","mb呲牙"],["mb/mb14.gif","mb惊讶"],["mb/mb15.gif","mb难过"],["mb/mb16.gif","mb酷"],["mb/mb17.gif","mb冷汗"],["mb/mb18.gif","mb淘气"],["mb/mb19.gif","mb吐"],["mb/mb20.gif","mb捂嘴"],["mb/mb21.gif","mb可爱"],["mb/mb22.gif","mb白眼"],["mb/mb23.gif","mb刀"],["mb/mb24.gif","mb心"],["mb/mb25.gif","mb翔"],["mb/mb26.gif","mb勾引"],["mb/mb27.gif","mb不行"],["mb/mb28.gif","mb双喜"]];
var faceHtml_phone='<table class="tab_mb"><tbody>';
for(var i=0;i<FaceData_phone.length;i++){    
	var arr=FaceData_phone[i];
	if(0==i%7){faceHtml_phone+='<tr>';}
	faceHtml_phone+='<td>'+'<img src="/img/face/'+arr[0]+'" alt="'+arr[1]+'" title="'+arr[1]+'">';+'</td>';
	if(0==(i+1)%7){faceHtml_phone+='</tr>';}
}
faceHtml_phone+='</tbody></table>';

var initFaceList_phone=function(obj,callback){
	//点击聊天中的表情
	obj.find("img").live('click',function(){
		var em='['+$(this).attr('title')+']';
		callback(em);
		return false;
	});
};