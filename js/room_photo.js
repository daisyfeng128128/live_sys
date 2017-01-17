var Live= {
	ChatReLogin:function(){
		self.location.reload();
	}
}
var Photo = {};
//加载相册列表
Photo.photoWallPage = 1;
Photo.photoIsLoading = false;
Photo.loadPhotoMore = function(){
	if(Photo.photoWallPage<1){
		$("#wfLoading").html("已经是最后一页了");
		return false;
	}
	if(Photo.photoIsLoading){
		return false;
	}
	Photo.photoIsLoading = true;
	$.ajax({
		url : '/apis/photo_api.php?action=getlist&roomnumber='+currentRoomNumber+"&p="+Photo.photoWallPage,
		dataType : 'json',
		success : function(json){
			Photo.photoIsLoading = false;
			if(typeof json == 'object'){
				var oPic, $row, iHeight, iTempHeight;
				var len = json.length;
				if(len>1){
					Photo.photoWallPage++;
				}else{
					Photo.photoWallPage=0;
				}
				for(var i=0, l=len; i<l; i++){
					oPic = json[i];
					
					// 找出当前高度最小的列, 新内容添加到该列
					iHeight = -1;
					$('#stage>li').each(function(){
						iTempHeight = Number( $(this).height() );
						if(iHeight==-1 || iHeight>iTempHeight)
						{
							iHeight = iTempHeight;
							$row = $(this);
						}
					});
					var itemurl = '/live_photo_comment.php?photoid='+oPic.photoid;
					if(oPic.like_text=="赞"){
						var itemzan = '<a class="l5k6_wzf zanA" href="javascript:Photo.zan('+oPic.photoid+');"><span class="zantxt">'+oPic.like_text+'</span>(<span class="zancount">'+oPic.zancount+'</span>)</a>';
					}else{
						var itemzan = '<a class="l5k6_wzf zanA" href="javascript:Photo.zan_cancel('+oPic.photoid+');"><span class="zantxt">'+oPic.like_text+'</span>(<span class="zancount">'+oPic.zancount+'</span>)</a>';
					}
					var isvideohtml="";
					if(currentRoomNumber==currentUserNumber){
						if(oPic.isvideo=="1"){
							isvideohtml = '设为离线';
						}else if(oPic.isvideo=="2"){
							isvideohtml = '取消离线';
						}
					}
					if(isvideohtml!=""){
						isvideohtml = '<span class="isvideo_span"> | </span><a class="l5k6_isvideo" href="javascript:Photo.isvideo_fun('+oPic.photoid+','+oPic.isvideo+');" title="离线视频是指直播间主播不在线会播放的视频">'+isvideohtml+'</a>';
					}
					oPic.title = faceReplaceImg(oPic.title);
var htmltmp = '	<div class="divbox"><div class="wf_box isvideo'+oPic.isvideo+'" id="picItem'+oPic.photoid+'">\
<div class="wf_imgbox"><a href="'+itemurl+'"><img alt="" src="/static_data/uploaddata/photo/thumb202x0_'+oPic.path+'"></a></div>\
<a href="'+itemurl+'"><div class="layer_play"></div></a>\
<ul class="r5r6_wfigure"><li><div class="wall_6info"><p>'+oPic.title+'</p></div></li></ul>\
<div class="r5r6_wlink">\
<span class="zanhtml">'+itemzan+'</span>\
|<a class="l5k6_wpl" href="'+itemurl+'">评论('+oPic.commentcount+')</a>\
'+isvideohtml+'\
</div>\
<div class="r5r6_wtop"><span class="DD_png i5n6_top1"><em class="t6e_mh">'+oPic.month+'月</em><em class="t6e_dy">'+oPic.day+'日</em></span></div>\
					</div>\
</div>';
					$item = $(htmltmp).hide();
					
					$row.append($item);
					$item.fadeIn();
				}
				setTimeout(function(){
					Main.autoSetPageHeightQQ();
				}, 300)		
			}
		}
	});
}
//赞
Photo.zan = function(id){
	if(!islogin()){
		return false;
	}
	$.post("/apis/photo_api.php?action=zan", { id: id },function(obj){
		if(obj.code==200){
			var zancount = parseInt($("#picItem"+id+" .zancount").text())+1;
			$("#picItem"+id+" .zanhtml .zancount").html(zancount);
			$("#picItem"+id+" .zanhtml .zantxt").html("取消赞");
			$("#picItem"+id+" .zanhtml .zanA").attr('href','javascript:Photo.zan_cancel('+id+');');
		}else{
			Main.alert(obj.info);
		}
	},"json");
}
//取消赞
Photo.zan_cancel = function(id){
	if(!islogin()){
		return false;
	}
	$.post("/apis/photo_api.php?action=zan_cancel", { id: id },function(obj){
		if(obj.code==200){
			var zancount = parseInt($("#picItem"+id+" .zancount").text())-1;
			$("#picItem"+id+" .zanhtml .zancount").html(zancount);
			$("#picItem"+id+" .zanhtml .zantxt").html("赞");
			$("#picItem"+id+" .zanhtml .zanA").attr('href','javascript:Photo.zan('+id+');');
		}else{
			Main.alert(obj.info);
		}
	},"json");
}
//评论
Photo.photoComment = function(opt_photoid){
	if(!islogin()){
		return false;
	}
	if(opt_photoid!=""){
		var content = $("#photoname").val();
		if($.trim(content)==""){
			Main.alert("写点东西吧，评论内容不能为空哦。");
			return false;
		}
		var url = "/apis/photo_api.php?action=photocomment&photoid="+opt_photoid+"&content="+content;
		$.get(encodeURI(url), function(o){
			if(o.code==200){
				$("#photoname").val("");
				content = faceReplaceImg(content);
				var tmphtml = '<li id="photoComment'+o.photocommentid+'">\
								<a title="'+o.nickname+'"><img class="pic" src="'+cdn_domain+'/apis/avatar.php?uid='+o.userid+'"></a>\
								<p class="i6f_hd"><a>'+o.nickname+'</a>\
								</p>\
								<div class="i6f_ctrl"><div class="i6f_con">\
									<span class="faceReplace">'+content+'</span><span class="i5n_time">('+o.addtime+')</span>\
								</div></div></li>';
				$("#xsns_cmt_list").prepend(tmphtml);
				Main.alert("评论成功");
				$("#commentcountnum").html(parseInt($("#commentcountnum").html())+1);
				Main.autoSetPageHeightQQ();
			}else{
				Main.alert(o.txt);
			}
		},"json");
	}else{
		alert("请点击相册后再评论");
	}
}

//弹出主播上传相册
Photo.ShowUpload=function(id,e){
	$("#"+id).css("left",($("body").width()-$("#"+id).width())/2+"px");
	$("#"+id).show();
	$('body,html').animate({scrollTop:0},100);
	return false;
};
Photo.ShowUploadSuccess=function(){
	$("#stage").html("<li></li><li></li><li></li><li></li>");
	Photo.photoWallPage = 1;
	Photo.loadPhotoMore();
	Main.alert('操作成功');
	$('#photoUpload .close').click();
};

//删除相册
Photo.photoDel = function(opt_photoid){
	if(!islogin()){
		return false;
	}
	if(opt_photoid!=""){
		Main.confirm('删除确认?','删除相册会同时删除对应的评论，无法恢复，确认进行此操作?','删除',function(){
			$.get("/apis/photo_api.php?action=photodel&photoid="+opt_photoid, function(o){
				if(o.code==200){
					Main.confirm('','删除成功','返回相册列表',function(){
						window.location.href="/live_photo.php?roomnumber="+currentRoomNumber;
					},'返回直播间',function(){
						window.location.href="/"+currentRoomNumber+".html";
					});
				}else{
					Main.alert(o.txt);
				}
			},"json");
		});
	}else{
		alert("请点击相册上方的删除");
	}
}

//删除相册评论
Photo.photoCommentDel = function(id){
	if(!islogin()){
		return false;
	}
	if(id!=""){
		Main.confirm('删除确认?','删除评论，无法恢复，确认进行此操作?','删除',function(){
			$.get("/apis/photo_api.php?action=photoCommentDel&id="+id, function(o){
				if(o.code==200){
					Main.alert("操作成功");
					$("#photoComment"+id).hide("fast",function(){
						$(this).remove();
					});
					$("#commentcountnum").html(parseInt($("#commentcountnum").html())-1);
				}else{
					Main.alert(o.txt);
				}
			},"json");
		});
	}else{
		alert("请点击评论右侧的删除");
	}
}

//弹出录视频
Photo.recordVideo=function(id,e,isvideo){
	$("#"+id).css("left",($("body").width()-$("#"+id).width())/2+"px");
	$("#"+id).show();
	swfobject.embedSWF("/static_data/swf/record-file.swf", (id+"_content"), 420, 315, "10.0", "", {confadd:_SWF_CONF_ADD_,c:ctoken,isvideo:isvideo},{wmode: "transparent",allowScriptAccess: "always"});
	$('body,html').animate({scrollTop:0},100);
	return false;
};

//录视频开始,flash回调
function recordStart(id){
	Photo.record_time = setTimeout(function(){
		self.location="/html/endRecord.html";
	},live_record_max_time*1000);
}
function clearTimeout_record(){
	clearTimeout(Photo.record_time);
}

//录视频出现异常,flash回调
function recordStopped(){
	self.location="/html/endRecord.html";
}

//设为(取消)离线
Photo.isvideo_fun = function(id,isvideo){
	if(!islogin()){
		return false;
	}
	$.post("/apis/photo_api.php?action=isvideo", { id: id,isvideo: isvideo },function(obj){
		if(obj.code==200){
			if(obj.isvideo=="1"){
				var isvideohtml = '设为离线';
			}else if(obj.isvideo=="2"){
				var isvideohtml = '取消离线';
			}
			isvideohtml = '<span class="isvideo_span"> | </span><a class="l5k6_isvideo" href="javascript:Photo.isvideo_fun('+id+','+obj.isvideo+');" title="离线视频是指直播间主播不在线会播放的视频">'+isvideohtml+'</a>';
			$("#picItem"+id+" .l5k6_isvideo").remove();
			$("#picItem"+id+" .isvideo_span").remove();
			$("#picItem"+id+" .l5k6_wpl").after(isvideohtml);
		}else{
			Main.alert(obj.info);
		}
	},"json");
}
$(function(){
	//点击页面的任意位置时,将弹出的窗口隐藏,礼物选择等等地方
	$(document).on('mousedown',function(event) {
		var et=$(event.target);
		if(et.hasClass('toggleBox')||et.parents('.toggleBox')[0]){
			return;
		}else if(et.parents('.tip-yellow')[0]){
			return;
		}else{
			$('.toggleBox').hide();
		}
	});
	
	//表情替换
	$(".faceReplace").each(function(i){
	   $(this).html(faceReplaceImg($(this).html()));
	});
	
	//聊天表情初始化
	$('.smileyBtn').live('mousedown',function(){
		var pnl=$('#faces');
		$('#ribbons').hide();
		var offset=$(this).offset();
		if(''==$('#facesBd').html()){
			initFaceList(function(em){
				var id,limit;
				id='#photoname';
				limit=100;
				var text=$(id).val();
				var tmp=text+em;
				if(limit>=tmp.len()){
					text+=em;
				}
				$(id).val(text).focus();
			});
		}

		pnl.css({top:offset.top-215,left:offset.left-352}).toggle();
		return false;
	}).live('click',function(){return false});
});
