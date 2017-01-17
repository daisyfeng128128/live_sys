$(function(){
	$("ul.tab_nav li").click(function(){
		$(this).parent().find("li").removeClass("on");
		$(this).addClass("on");
		
		var rel = $(this).attr("rel");
		$(this).parent().parent().parent().find(".tab_list .tab").hide()
		$("#"+rel).show();
	});
});

function top_clan(){
	//StageWebViewBridge.call('fnCalledFromJS', null, 'to2');
	$.ajax({
		url : '/iumobile/top.php?action=getlistclan',
		dataType : 'json',
		success : function(json){
			photoIsLoading_bill_gift = false;
			if(typeof json == 'object'){
				top_show_clan(json.clan,"datalist_clan_clan");
			}
		}
	});
}
function top_show_clan(json,id){
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
			// onClick="$('+"'#clan"+row.clanid+"'"+').click()"
var htmltmp = '<li class="top'+(i+1)+'">\
<a id="clan'+row.clanid+'" href="#clandetail" onClick="top_clandetail('+row.clanid+')" data-transition="slide">\
<img src="/apis/avatar.php?uid='+row.leaderid+'"/>\
<h4 class="clanname">'+row.clanname+'</h4>\
<span class="nickname">族长:'+row.nickname+'</span>\
<span class="renshu">成员:'+row.member_num+'位 | 主播:'+row.actor_num+'位</span>\
<em class="clanmedal famhuiz'+row.clantype+'">'+row.medalname+'</em>\
</a>\
</li>';
			var $item = $(htmltmp).hide();
			
			$row.append($item);
			$item.fadeIn();
		}
	}else{
		$row.html("<li class='text-center'>暂无数据</li>");
	}
}
function top_clandetail(id){
	clanid=id;
	StageWebViewBridge.call('fnCalledFromJS', null, 'toClanDetail');
	$.ajax({
		url : '/iumobile/top.php?action=getlistclandetail&id='+id,
		dataType : 'json',
		success : function(json){
			photoIsLoading_bill_gift = false;
			if(typeof json == 'object'){
				//基本信息
				$("#datalist_clan_clandetail_info .clanmedal").html(json.claninfo.medalname);
				$("#datalist_clan_clandetail_info .nickname").html("族长:"+json.claninfo.nickname);
				$("#datalist_clan_clandetail_info .craate").html("创建于:"+json.claninfo.addtime);
				if(json.claninfo.inclan=="1"){
					$("#datalist_clan_clandetail_info .inclan").html("<a href='javascript:applyquit()' class='tbbuybtn_red buybtn ui-link'>退出</a>");
				}else{
					$("#datalist_clan_clandetail_info .inclan").html("<a href='javascript:applyjoin()' class='tbbuybtn_red buybtn ui-link'>加入</a>");
				}
				$("#datalist_clan_clandetail_info .announce").html(json.claninfo.announce);
				$("#clandetail .user_num").html(json.claninfo.member_num);
				$("#clandetail .show_num").html(json.claninfo.actor_num);
				
				top_show_clandetail_user(json.clanzz,"datalist_clan_clandetail_member_zz");
				top_show_clandetail_user(json.clanfzz,"datalist_clan_clandetail_member_fzz");
				top_show_clandetail_user(json.user,"datalist_clan_clandetail_member_cy");
				top_show_clandetail_show(json.show,"datalist_clan_clandetail_show");
				
			}
		}
	});
}

function top_show_clandetail_user(json,id){
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
var htmltmp = '<li class="top'+(i+1)+'">\
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

function applyjoin(){
	$.get("/ajax/applyjoinclan.php?clanid="+clanid,function(r){
		alert(r);
		top_clandetail(clanid);
	});
}
function applyquit(){
	if(confirm('您确定要退出家族？')){
		$.get("/ajax/applyquitclan.php?clanid="+clanid,function(r){
			if(r!=""){
				alert(r);
			}
			else{
				top_clandetail(clanid);
			}
		});
	}
	
}
