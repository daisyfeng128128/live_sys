$(function(){
	$("ul.tab_nav li").click(function(){
		$(this).parent().find("li").removeClass("on");
		$(this).addClass("on");
		
		var rel = $(this).attr("rel");
		$(this).parent().parent().parent().find(".tab_list .tab").hide()
		$("#"+rel).show();
	});
});

function top_mingxing(){
	//StageWebViewBridge.call('fnCalledFromJS', null, 'to2');
	$.ajax({
		url : '/iumobile/top.php?action=getlistmingxing',
		dataType : 'json',
		success : function(json){
			photoIsLoading_bill_gift = false;
			if(typeof json == 'object'){
				top_show_mingxing(json.day,"datalist_mingxing_day");
				top_show_mingxing(json.week,"datalist_mingxing_week");
				top_show_mingxing(json.month,"datalist_mingxing_month");
				top_show_mingxing(json.all,"datalist_mingxing_all");
			}
		}
	});
}
function top_fuhao(){
	//StageWebViewBridge.call('fnCalledFromJS', null, 'to2');
	$.ajax({
		url : '/iumobile/top.php?action=getlistfuhao',
		dataType : 'json',
		success : function(json){
			photoIsLoading_bill_gift = false;
			if(typeof json == 'object'){
				top_show_fuhao(json.day,"datalist_fuhao_day");
				top_show_fuhao(json.week,"datalist_fuhao_week");
				top_show_fuhao(json.month,"datalist_fuhao_month");
				top_show_fuhao(json.all,"datalist_fuhao_all");
			}
		}
	});
}
function top_show_mingxing(json,id){
	var $row=$("#"+id);
	var len = json.length;
	if(len>0){
		$row.html("");
		for(var i=0, l=len; i<l; i++){
			var row = json[i];
var htmltmp = '<li class="top'+(i+1)+'" onClick="fl_inroom('+row.usernumber+')">\
<i><span>'+(i+1)+'</span></i>\
<img src="/apis/avatar.php?uid='+row.userid+'">\
<em class="zlevel zlv'+row.starlevel+'"></em>\
<span class="nickname">'+row.nickname+'</span>\
</li>';
			var $item = $(htmltmp).hide();
			
			$row.append($item);
			$item.fadeIn();
		}
	}else{
		$row.html("<li class='text-center'>暂无数据</li>");
	}
}

function top_renqi(){
	//StageWebViewBridge.call('fnCalledFromJS', null, 'to2');
	$.ajax({
		url : '/iumobile/top.php?action=getlistrenqi',
		dataType : 'json',
		success : function(json){
			photoIsLoading_bill_gift = false;
			if(typeof json == 'object'){
				top_show_mingxing(json.day,"datalist_renqi_day");
				top_show_mingxing(json.week,"datalist_renqi_week");
				top_show_mingxing(json.month,"datalist_renqi_month");
				top_show_mingxing(json.all,"datalist_renqi_all");
			}
		}
	});
}
function top_show_fuhao(json,id){
	var $row=$("#"+id);
	var len = json.length;
	if(len>0){
		$row.html("");
		for(var i=0, l=len; i<l; i++){
			var row = json[i];
var htmltmp = '<li class="top'+(i+1)+'">\
<i><span>'+(i+1)+'</span></i>\
<img src="/apis/avatar.php?uid='+row.userid+'"/>\
<em class="level lv'+row.richlevel+'"></em>\
<span class="nickname">'+row.nickname+'</span>\
</li>';
			var $item = $(htmltmp).hide();
			
			$row.append($item);
			$item.fadeIn();
		}
	}else{
		$row.html("<li class='text-center'>暂无数据</li>");
	}
}

function top_gift(){
	//StageWebViewBridge.call('fnCalledFromJS', null, 'to2');
	$.ajax({
		url : '/iumobile/top.php?action=getlistgift',
		dataType : 'json',
		success : function(json){
			photoIsLoading_bill_gift = false;
			if(typeof json == 'object'){
				top_show_gift(json.a0,"datalist_gift_0");
				top_show_gift(json.a1,"datalist_gift_1");
			}
		}
	});
}
function top_show_gift(json,id){
	var $row=$("#"+id);
	if(json==undefined){
		var len = 0;
	}else{
		var len = json.length;
	}
	if(len>0){
		$row.html("");
		for(var i=0, l=len; i<l; i++){
			var row = json[i];
var htmltmp = '<li class="ligift top'+(i+1)+'" onClick="fl_inroom('+row.usernumber+')">\
<i><span>'+(i+1)+'</span></i>\
<img class="giftbig '+row.giftimage+'" src="/images/pixel.gif"/>\
<span class="giftname">'+row.giftname+' '+row.giftnum+'个</span><br/>\
<em class="zlevel zlv'+row.starlevel+'"></em>\
<span class="nickname">'+row.nickname+'</span>\
</li>';
			var $item = $(htmltmp).hide();
			
			$row.append($item);
			$item.fadeIn();
		}
	}else{
		$row.html("<li class='text-center'>暂无数据</li>");
	}
}
function fnCalledFromAs3( data )
{
	if(data=="getPage"){
		var url = window.location.toString();
		var id = url.split('#')[1];
		return id;
	}
}
function top_show_clandetail_show(json,id){
	var $row=$("#"+id);
	if(json==undefined){
		var len = 0;
	}else{
		var len = json.length;
	}
	if(len>0){
		$row.html("");
		for(var i=0, l=len; i<l; i++){
			var row = json[i];
var htmltmp = '<li class="top'+(i+1)+'" onClick="fl_inroom('+row.usernumber+')">\
<img src="/static_data/showcover/thumb200x150_'+row.showcover+'"/>\
<h3>'+row.nickname+'</h3>\
<span class="showing showing'+row.showing+'">'+row.showing_txt+'</span>\
<span class="fav">'+row.fav+'</span>\
</li>';
			var $item = $(htmltmp).hide();
			
			$row.append($item);
			$item.fadeIn();
		}
	}else{
		$row.html("<li class='text-center'>暂无数据</li>");
	}
}
