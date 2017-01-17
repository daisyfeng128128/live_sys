var FaceData_phone=[["mb/mb1.gif","mb微笑"],["mb/mb2.gif","mb撇嘴"],["mb/mb3.gif","mb色"],["mb/mb4.gif","mb得意"],["mb/mb5.gif","mb流泪"],["mb/mb6.gif","mb害羞"],["mb/mb7.gif","mb闭嘴"],["mb/mb8.gif","mb睡"],["mb/mb9.gif","mb大哭"],["mb/mb10.gif","mb汗"],["mb/mb11.gif","mb怒"],["mb/mb12.gif","mb调皮"],["mb/mb13.gif","mb呲牙"],["mb/mb14.gif","mb惊讶"],["mb/mb15.gif","mb难过"],["mb/mb16.gif","mb酷"],["mb/mb17.gif","mb冷汗"],["mb/mb18.gif","mb淘气"],["mb/mb19.gif","mb吐"],["mb/mb20.gif","mb捂嘴"],["mb/mb21.gif","mb可爱"],["mb/mb22.gif","mb白眼"],["mb/mb23.gif","mb刀"],["mb/mb24.gif","mb心"],["mb/mb25.gif","mb翔"],["mb/mb26.gif","mb勾引"],["mb/mb27.gif","mb不行"],["mb/mb28.gif","mb双喜"]];
var faceHtml_phone='<table class="tab_mb"><tbody>';
for(var i=0;i<FaceData_phone.length;i++){    
	var arr=FaceData_phone[i];
	if(0==i%10){faceHtml_phone+='<tr>';}
	faceHtml_phone+='<td>'+'<img src="/img/face/'+arr[0]+'" alt="'+arr[1]+'" title="'+arr[1]+'">';+'</td>';
	if(0==(i+1)%10){faceHtml_phone+='</tr>';}
}
faceHtml_phone+='</tbody></table>';

var initFaceList_phone=function(callback){
	//点击聊天中的表情
	$('#faces img').live('click',function(){
		var em='['+$(this).attr('title')+']';
		callback(em);
		return false;
	});
};