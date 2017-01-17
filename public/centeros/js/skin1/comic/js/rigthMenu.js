function initLoginInfoHead(user){
	user =  user==undefined?"":user;
	//页面头部处理
	$("#j_header_login,#j_header_logininfo").remove();
	if(user!=""){
		var tmptop ='<ul id="j_header_logininfo" class="header-logininfo" style="display: block;">\
			<li><a id="j_header_logininfo_name" class="text-overflow" target="_blank" href="/ucenter.php"><i class="icon-base icon-base-people"></i>'+user.nickname+'/'+user.usernumber+'</a></li>\
			<li><a title="我要签约" class="text-play" target="_blank" href="/html/signing.html">签约</a></li>\
			<li><a title="我要开播" class="text-play" target="_blank" href="/go.php?action=toshow" onclick="return islogin();">开播</a></li>\
		</ul>';
	}else{
		var tmptop ='<ul class="header-login" id="j_header_login"><li><a href="javascript:;" class="btn2 btn-primary btn-lg btn-w8" onclick="javascript:login.show()">登录</a></li><li><a href="javascript:;" class="btn2 btn-primary btn-lg btn-w8" onclick="javascript:login.reg()">注册</a></li></ul>';
	}
	$(".header .container").append(tmptop);
	//页面右侧内容
    if(user.result!="false"){
        var tmphtml = '<div id="j_fixedbar" class="fixedbar j_fixedbars">\
				<div class="fixedbar-broadcast" id="bcbtn"><a href="javascript:;" class="fixedbar-broadcast-btn"><i class="icon-base icon-base-broadcast"></i></a></div>\
				<a data-login="1" data-for="ucenter" href="javascript:;" class="fixedbar-header" id="fixedbar-header">\
					<img src="'+cdn_domain+'/apis/avatar.php?uid='+user.userid+'">\
					<i class="icon-base icon-base-pic-cover"></i>\
				</a>';
    }else{
        var tmphtml = '<div id="j_fixedbar" class="fixedbar"> <div class="fixedbar-broadcast" id="bcbtn"><a href="javascript:;" class="fixedbar-broadcast-btn"><i class="icon-base icon-base-broadcast"></i></a></div>';
    }

				//登录了
                if(user.result!="false"){
					tmphtml +='<div title="'+user.balance+'个'+money_name+'" class="fixedbar-coin" id="j_fixedbar_user_coin"><strong>'+money_name+'</strong><span id="xmoney">'+user.balance+'</span></div>';
				}else{
                    tmphtml +='<div class="notlogin"><span class="log" onclick=" login.show();">登录</span><span class="reg" onclick=" login.reg();">注册</span></div>';
                }
				tmphtml +='<ul class="fixedbar-list" id="fixedbar-list">\
		<li><a data-for="recommend" href="/" target="_blank" class=""><span>首页</span></a></li>\
		<li><a data-for="recommend" href="" class=""><span>大厅</span></a></li>\
		<li><a data-for="history" href="/market.php" target="_blank"  class=""><span>商城</span></a></li>\
		<li><a data-login="1" data-for="follow" href="" class="" onclick="return islogin()"><span>人员</span></a></li>\
		<li><a data-login="1" data-for="follow" href="/order.html" target="_blank" class=""><span>福利</span></a></li>\
		<li><a data-login="1" data-for="follow" href="/market.php" target="_blank" class=""><span>背包</span></a></li>\
		\
	</ul>\
	        <ul class="euc">\
                <li style="height: 30px;  margin-top:30px;border-top: 1px #000 solid;"></li>\
                <li class="eu"><a data-login="1" data-for="follow" href="/market.php" target="_blank" class="download"><span>下载</span></a></li>\
                <li class="eu"><a data-login="1" data-for="follow" href="/market.php" target="_blank" class="wenjuan"><span>问卷</span></a></li>\
                <li class="eu"><a data-login="1" data-for="follow" href="/market.php" target="_blank" class="libao"><span>礼包</span></a></li>\
                <li class="eu"><a data-login="1" data-for="follow" href="/market.php" target="_blank" class="jubao"><span>举报</span></a></li>\
            </ul>\
            <div class="left-expand-area live-common-tran" id="left-expand-area">\
                <i class="live-icons icon-unfold">\
             </i>\
                <i class="live-icons icon-fold">\
                </i>\
            </div>\
			</div>\
			\
			<div class="fixedbar-dialog has-scrollbar dialog-has-hd" id="j_fixedbar_dialog" style="right: -220px; display: none;">\
				<div class="fixedbar-dialog-hd" id="j_fixedbar_dialog_hd">\
					<h2 class="fixedbar-dialog-hd-recommend" id="fixedbar-dialog-hd-recommend">\
						<span><i class="icon-base icon-fixed-follow-white"></i>主播推荐</span>\
					</h2>\
				</div>\
				<div id="fixedbar-dialog-cnt" class="fixedbar-dialog-cnt" tabindex="0" style="right: -17px;">\
					<div class="fixedbar-dialog-loading" id="j_fixedbar_loading" style="display: none;">正在拼命加载中…</div>\
					<div class="fixedbar-dialog-item" id="j_fixedbar_ucenter" style="display: none;">';
	if(user!=""){
	tmphtml +='<div class="fixedbar-ucenter ">\
		<div class="ucenter-logout">\
			<a href="/login.php?action=logout&type=html"><i class="icon-base icon-base-logout"></i>退出</a>\
		</div>\
		<div class="ucenter-info">\
			<div class="ucenter-info-pic"><img src="'+cdn_domain+'/apis/avatar.php?uid='+user.userid+'" alt="'+user.nickname+'"></div>\
			<p class="ucenter-info-nickname"><span class="text-overflow">'+user.nickname+'</span></p>\
			<p>靓号：'+user.usernumber+'</p>\
			<p class="ucenter-info-finance">'+user.balance+''+money_name+'<span class="">&nbsp;|&nbsp;'+user.point+''+money_name2+'</span>\
			</p>\
			<p class="ucenter-info-pay">\
				<a class="btn btn-primary btn-sm btn-w5" href="/ucenter.php?ptype=pay" target="_blank">充值</a>\
			</p>\
		</div>\
		<div class="ucenter-progress">\
			<div class="progress-group">\
				<span class="progress-group-name">明星等级</span>\
				<div class="progress-bar">\
					<i class="progress-bar-val" style="width:'+user.starshenjiB+'%;"></i>\
					<span class="progress-bar-text">'+user.totalpoint+'/'+user.nextstarV+'</span>\
				</div>\
				<em class="zlevel zlv'+user.starlevel+'"></em>\
			</div>\
			<div class="progress-group">\
				<span class="progress-group-name">财富等级</span>\
				<div class="progress-bar">\
					<span class="progress-bar-text">'+user.totalcost+'/'+user.nextrichV+'</span>\
					<i class="progress-bar-val" style="width:'+user.richshenjiB+'%;"></i>\
				</div>\
				<em class="level lv'+user.richlevel+'"></em>\
			</div>\
		</div>\
		<div class="ucenter-nav">\
			<ul class="fix">\
				<li><a target="user" href="/ucenter.php"><i class="icon-base icon-my-center"></i>个人中心</a></li>\
				<li><a target="user" href="/ucenter.php?ptype=car"><i class="icon-base icon-my-home"></i>我的座驾</a></li>\
				<li><a target="user" href="/ucenter.php?ptype=clan"><i class="icon-base icon-my-family"></i>我的家族</a></li>\
				<li><a target="user" href="/ucenter.php?ptype=bill"><i class="icon-base icon-my-record"></i>消费记录</a></li>\
			</ul>\
		</div>\
	</div>';
	}else{
		tmphtml +='<div class="fixedbar-login">\
		<p class="fixedbar-login-pic"><img src="'+cdn_domain+'/skin/2339/images/1403510731734.jpg"></p>\
		<h3>未登录</h3>\
		<p>登录让交友更真实</p>\
		<p><a onclick="javascript:login.show();" class="btn btn-primary btn-lg btn-w8" href="javascript:;"><span class="icon-base"></span>登录</a></p>\
	</div>';
	}
	tmphtml +='</div>\
					<div class="fixedbar-dialog-item" id="j_fixedbar_qq" style="display: none;">\
						<div class="fixedbar-dialog-bd">\
							<div class="fixedbar-qq">\
	<ul>\
	<li><i class="icon-base icon-fixed-qq-green-s"></i><span>官方客服：</span><a href="http://wpa.qq.com/msgrd?v=3&amp;uin='+site_info_qq+'&amp;site=qq&amp;menu=yes" target="_blank"><img border="0" title="客服" alt="客服" src="http://wpa.qq.com/pa?p=2:'+site_info_qq+':41"></a></li>\
	<li><i class="icon-base icon-fixed-qq-green-s"></i><span>招募主播：</span><a href="http://wpa.qq.com/msgrd?v=3&amp;uin='+site_info_qq+'&amp;site=qq&amp;menu=yes" target="_blank"><img border="0" title="客服" alt="客服" src="http://wpa.qq.com/pa?p=2:'+site_info_qq+':41"></a></li>\
	<li><i class="icon-base icon-fixed-qq-green-s"></i><span>视频调节：</span><a href="http://wpa.qq.com/msgrd?v=3&amp;uin='+site_info_qq+'&amp;site=qq&amp;menu=yes" target="_blank"><img border="0" title="客服" alt="客服" src="http://wpa.qq.com/pa?p=2:'+site_info_qq+':41"></a></li>\
	<li><i class="icon-base icon-fixed-msg-green-s"></i><span>意见反馈：</span> <a href="/html/feedback.html" class="btn btn-sm btn-primary" target="_blank"><i></i>留&nbsp;言</a></li>\
	</ul>\
							</div>\
							<div class="fixedbar-help" id="j_fixedbar_help">\
								<h3>常用帮助</h3>\
	<ul>\
	<li><a href="/html/help.html#6">1.签约主播有什么要求与好处？</a></li>\
	<li><a href="/html/help.html#9">2.什么是掌声？如何获得？</a></li>\
	<li><a href="/html/help.html#10">3.主播直播时上不了首页？</a></li>\
	</ul>\
							</div>\
						</div>\
					</div>\
					<div class="fixedbar-dialog-item " id="j_fixedbar_recommend" style="display: none;">\
						<div class="fixedbar-dialog-bd">\
	<ul class="fixedbar-star fix"></ul>\
						</div>\
					</div>\
					<div class="fixedbar-dialog-item " id="j_fixedbar_history" style="display: none;">\
						<div class="fixedbar-dialog-bd">\
	<ul class="follow-star fix"></ul>\
						</div>\
					</div>\
					<div class="fixedbar-dialog-item " id="j_fixedbar_follow" style="display: none;">\
						<div class="fixedbar-dialog-bd">\
							<div class="fixedbar-tab-hd fixedbar-follow-hd fixedbar-tab-hd-2">\
								<a data-type="follow" href="javascript:;" class="on">关注</a>\
								<a data-type="manage" href="javascript:;">管理</a>\
							</div>\
							<div class="fixedbar-follow-bd">\
								<ul class="follow-star fix" id="j_fixedbar_follow_follow" style="display: block;">\
								</ul>\
								<ul class="follow-star fix" id="j_fixedbar_follow_manage" style="display: none;">\
									<li class="text-info">你暂无管理的主播，给喜欢的主播送礼有机会成为她的房间管理哦！</li>\
								</ul>\
								<ul class="follow-star fix" id="j_fixedbar_follow_sign" style="display: none;"></ul>\
							</div>\
						</div>\
					</div>\
				</div>\
			</div>';
	$("#j_fixedbar,#j_fixedbar_dialog").remove();
	$("#page").append(tmphtml);
	//关注菜单
	$(".fixedbar-tab-hd-2 a").click(function(){
		var rel=$(this).attr("data-type");
		$(".fixedbar-tab-hd-2 a").removeClass("on");
		$(this).addClass("on");
		$("#j_fixedbar_follow_follow,#j_fixedbar_follow_manage").hide();
		$("#j_fixedbar_follow_"+rel).show();
	});
	//登录后再绑定
	try{
		if(currentUserNumber){
			$(".fancybox_sign").fancybox({
				fitToView : false,
				scrolling:'no',
				padding : 0,
				width : 580,
				height : 480,
				autoSize : false,
				closeClick : false,
				openEffect : 'none',
				closeEffect : 'none'
			});
		}
	}
	catch(err){}
	//右侧菜单
	$("#fixedbar-list li a").click(function(){
		if($(this).attr("href")!==""){
			return true;
		}
		var rel = $(this).attr("data-for");
		if(rel=="coin"){
			return true;
		}
		if(rel=="recommend"){
			//主播推荐
			$("#fixedbar-dialog-hd-recommend span").html('<i class="icon-base icon-fixed-follow-white"></i>主播推荐');
			main_2339_recommend();
		}else if(rel=="history"){
			$("#fixedbar-dialog-hd-recommend span").html('<i class="icon-base icon-fixed-history-white"></i>最近看过');
			main_2339_history();
		}else if(rel=="follow"){
			$("#fixedbar-dialog-hd-recommend span").html('<i class="icon-base icon-fixed-follow-white"></i>我的主播');
			main_2339_follow();
		}else if(rel=="qq"){
			$("#fixedbar-dialog-hd-recommend span").html('<i class="icon-base icon-fixed-qq-white"></i>帮助中心');
		}
		main_2339_right_menu_rel(rel,$(this));
		return false;
	});
	//右侧菜单，头像
	$("#fixedbar-header").click(function(){
		var rel = $(this).attr("data-for");
		main_2339_right_menu_rel(rel,$(this));
		return false;
	});
	if(user!=''){
		$('#xmoney').html(user.balance);
		$('#xpoint').html(user.point);
	}
}
function main_2339_right_menu_rel(rel,obj){
	if(rel!="ucenter"){
		$("#j_fixedbar_dialog").addClass("dialog-has-hd");
	}else{
		$("#j_fixedbar_dialog").removeClass("dialog-has-hd");
	}
	//点击我的本来就是展开的
	if($("#j_fixedbar_"+rel).is(":visible")){
		obj.removeClass("on");
		$("#j_fixedbar_dialog").hide();
		$("#j_fixedbar_dialog").css("right"," -220px");
		$("#j_fixedbar_"+rel).hide();
	}else{
		$(".fixedbar-dialog-item").hide();
		$("#fixedbar-header,#fixedbar-list li a").removeClass("on");
		obj.addClass("on");
		$("#j_fixedbar_dialog").show();
		$("#j_fixedbar_dialog").css("right"," 60px");
		$("#j_fixedbar_"+rel).show();
	}
}
//加载推荐
var main_2339_recommend_time = 0;
function main_2339_recommend(){
	if(getTimestamp()-main_2339_recommend_time<60){
		return;
	}
	main_2339_recommend_time = getTimestamp();
	$.get("/skin/api.php?type=recommend&_t="+getTimestamp(), function(data){
		var list="";
		for(var i=0;i<data.length;i++){
			list+='<li><a class="fixedbar-star-pic" target="_blank" href="/'+data[i].usernumber+'.html"><img alt="'+data[i].nickname+'" src="'+cdn_domain+'/static_data/showcover/thumb200x150_'+data[i].showcover+'"><span class="fixedbar-star-live">直播</span></a>\
    <a class="fixedbar-star-name" target="_blank" href="/'+data[i].usernumber+'.html"><em class="fl zlevel zlv'+data[i].starlevel+'" ></em>'+data[i].nickname+'</a>\
    <p><i class="icon-base icon-base-eye-gray"></i>'+data[i].viewernum+'人</p><p><i class="icon-base icon-base-time-gray"></i>'+data[i].playedtime+'</p></li>';
		}
		$('.fixedbar-star').html(list);
	},"json");
}
//看过的主播
var main_2339_history_time = 0;
function main_2339_history(){
	if(getTimestamp()-main_2339_history_time<60){
		return;
	}
	main_2339_history_time = getTimestamp();
	$.get("/skin/api.php?type=history&_t="+getTimestamp(), function(data){
		var list="";
		for(var i=0;i<data.length;i++){
			list+='<li><a href="/'+data[i].usernumber+'.html" target="_blank">\
	<span class="follow-star-pic"><img alt="'+data[i].nickname+'" src="'+cdn_domain+'/apis/avatar.php?uid='+data[i].userid+'"></span>\
    <span class="follow-star-name">'+data[i].nickname+'</span>\
</a></li>';
		}
		$("#j_fixedbar_history ul").html(list);
	},"json");
}
//关注的主播
var main_2339_follow_time = 0;
function main_2339_follow(){
	if(getTimestamp()-main_2339_follow_time<60){
		return;
	}
	main_2339_follow_time = getTimestamp();
	$.get("/ajax/le/getAddFavList.php?_t="+getTimestamp(), function(data){
		var list="";
		var list_manage="";
		for(var i=0;i<data.length;i++){
			var tmp='<li><a href="/'+data[i].usernumber+'.html" target="_blank"><span class="follow-star-pic"><img alt="'+data[i].nickname+'" src="'+cdn_domain+'/apis/avatar.php?uid='+data[i].userid+'"></span><span class="follow-star-name"> '+data[i].nickname+'</span></a></li>';
			list+=tmp;
			if(data[i].isadmin==1){
				list_manage+=tmp;
			}
		}
		if(list==""){
			list='<li class="text-info">暂无关注的主播</li>';
		}
		$('#j_fixedbar_follow_follow').html(list);
		if(list_manage==""){
			list_manage='<li class="text-info">你暂无管理的主播，给喜欢的主播送礼有机会成为她的房间管理哦！</li>';
		}
		$('#j_fixedbar_follow_manage').html(list_manage);
	},"json");
}

