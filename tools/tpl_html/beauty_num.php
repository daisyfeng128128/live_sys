<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>美女主播、视频交友、美女视频、在线K歌</title>
<link href="/css/global.css" type="text/css" rel="stylesheet" />
<link href="/css/help.css" type="text/css" rel="stylesheet" />
<link href="/css/commonv4.5.2.css?20140402" type="text/css" rel="stylesheet" />
<script src="/js/jquery.min.js" type="text/javascript"></script>
<?php if(!$page_var['IS_QQ']):?>
<script type="text/javascript" src="<?php echo $page_var['cdn_domain']?>/js/lib/jquery.fancybox.js?v=2.0.6"></script>
<link rel="stylesheet" type="text/css" href="<?php echo $page_var['cdn_domain']?>/css/ext/jquery.fancybox.css?v=2.0.6" media="screen" />
<?php endif;?>
<script src="/js/login.js"></script>
<script>
$.ajaxSetup({
cache: false
});
var Live={
	user_role:1
}
function refresh_number(num){
	$.get('/ajax/get_beauty_number.php?num='+num,function(r){
		$("#number"+num).html(r);
	});
}
$(function(){
	$('.fancybox').fancybox();
	$("#searchnumber").focus(function(){
		if($(this).val()=='请输入5-8位数字'){
			$(this).val("");
		}
	}).blur(function(){
		if($(this).val()==''){
			$(this).val("请输入5-8位数字");
		}
	});
	$("#searchBtn").click(function(){
		if(Live.user_role==1){
			login.show();
			return;
		}
		if(!$.isNumeric($("#searchnumber").val())){
			alert('请输入要搜索的号码');
			return;
		}
		$.get('/ajax/get_beauty_number.php?searchnum='+$("#searchnumber").val(),function(r){
			if(!r.number){
				$("#shownotexsitLink").click();
			}
			else{
				$("#buyNumber").html(r.number);
				$("#buyPrice").html(r.price);
				$("#showWinLink").click();
			}
		},'json');
	});
	refreshIndexLogin();
})
function buy_number(number){
	if(number==undefined){
		number=$("#buyNumber").html();
	}
	if(!confirm('请确认购买靓号：'+number)){
		return false;
	}
	if(Live.user_role==1){
		login.show();
		return;
	}
	$.post("/ajax/buy_number.php",{'number':number},function(r){
		if(r=="-1"){
			$("#shownomoneyLink").click();
		}
		else if(r=="-3"){
			$("#showhaveboughtLink").click();
		}
		else if(r=="-2"){
			login.show();
		}
		else{
			$.fancybox.close();
			$("#showSuccessLink").click();
		}
	})
}
</script>
</head>
<body>
<div id="main">
<div id="container">
<!--head-->
<?php $current_page="beauty_number";
include($app_path.'tpl_header.php');
?>
<div style="margin-top:15px"></div>
<!--head-->
<div class="mainbody">
<div class="sqzb">

<div class="lhsearch">
<div class="lhsearchcont">
<span><input type="text" id="searchnumber" class="lhsearchinput" value="请输入5-8位数字"/></span><span><input type="button" id="searchBtn" class="lhsearchbtn" value="搜索靓号"/></span><span class="glzh"><a href="/ucenter.php?ptype=number" onclick="return islogin()" target="_blank">管理我的帐号</a></span></div>
</div>
<div class="lhlist">
<p class="helptitle">官方正在销售的靓号</p>
<div class="gflh">
<div class="lhlistcont">
<div class="lhlistcontdt"><span class="fbold lhlisttxt">5位靓号</span><span class="lhlisttxt_1"><a href="javascript:refresh_number(5)">换一批</a></span></div>

<div id="number5">

</div>
<script>refresh_number(5);</script>
</div>
<div class="cutline"></div>
<div class="lhlistcont">
<div class="lhlistcontdt"><span class="fbold lhlisttxt">6位靓号</span><span class="lhlisttxt_1"><a href="javascript:refresh_number(6)">换一批</a></span></div>
<div id="number6">

</div>
<script>refresh_number(6);</script>
</div>
<div class="cutline"></div>
<div class="lhlistcont" >
<div class="lhlistcontdt"><span class="fbold lhlisttxt">7位靓号</span><span class="lhlisttxt_1"><a href="javascript:refresh_number(7)">换一批</a></span></div>
<div id="number7">

</div>
<script>refresh_number(7);</script>
</div>
<div class="cutline"></div>
<div class="lhlistcont" >
<div class="lhlistcontdt"><span class="fbold lhlisttxt">8位靓号</span><span class="lhlisttxt_1"><a href="javascript:refresh_number(8)">换一批</a></span></div>
<div id="number8">

</div>
<script>refresh_number(8);</script>
</div>
</div>
</div>
</div>
<div class="bcsm">
<p class="helptitle">常见问题<a class="fancybox" href="#buyNumberSuccess" id="showSuccessLink" style="display:none">Inline</a><a class="fancybox" href="#buyNumberWin" id="showWinLink" style="display:none">Inline</a><a class="fancybox" href="#buyNumbernotexist" id="shownotexsitLink" style="display:none">Inline</a><a class="fancybox" href="#buyNumbernomoney" id="shownomoneyLink" style="display:none">Inline</a><a class="fancybox" href="#buyNumberhavebought" id="showhaveboughtLink" style="display:none">Inline</a></p>
<div class="bcsmcont">
<p class="fbold">什么是靓号？</p>
<p>靓号是秀场房号中珍贵稀有的号码，精品靓号则是靓号中的珍藏极品，尊贵之中的王者。</p> 
<p>1、靓号购买方式：进入靓号选购页 → 点击“购买”即可 。</p> 
<p>2、注意：靓号只能替换购买的账号的编号，不能赠送。</p> 
<div class="cutline"></div>
<p class="fbold"><br />靓号有什么用？</p>
<p>靓号就是漂亮的号，有规律的号，吉祥的号，稀少的号，有深刻含义的号。如像520（我爱你）还有一些易记的连号即美观又能加强记忆，用靓号的显示效果好，具有一定震撼力。</p>
</div>
</div>
</div>
</div>
</div>
<div class="clear"></div>
<!--foot-->
<?php include($app_path.'tpl_footer.php')?>
<!--footend-->
<div class="gmtc" id="buyNumberWin">
<div class="gmtctitle">
<span class="gmtxt">购买靓号</span>
</div>
<!--<div class="gmtscont"><?php echo $page_var['money_name']?>不足，<a href="javascript:void(0)">点击充值</a></div>-->
<div class="gmtscont">
<p class="gmtsconttxt">恭喜你,此靓号可以购买使用！</p>
<p>靓号：<span id="buyNumber"></span></p>
<p>价值：<span id="buyPrice"></span>个<?php echo $page_var['money_name']?></p>
<p><span class="gmtcbtn"><a href="javascript:;" onclick="return buy_number()">购买</a></span></p>
</div>
</div>

<div class="gmtc" id="buyNumberSuccess">
<div class="gmtctitle">
<span class="gmtxt">靓号购买成功</span>
</div>
<div class="gmtscont">靓号购买成功，<a href="/ucenter.php?ptype=number">去个人中心查询</a></div>
</div>

<div class="gmtc" id="buyNumbernotexist">
<div class="gmtctitle">
<span class="gmtxt">靓号未上架</span>
</div>
<div class="gmtscont">该靓号尚未上架销售,如欲购买请联系代理或者官方客服。</div>
</div>

<div class="gmtc" id="buyNumbernomoney">
<div class="gmtctitle">
<span class="gmtxt"><?php echo $page_var['money_name']?>不够</span>
</div>
<div class="gmtscont">您的<?php echo $page_var['money_name']?>不够，请充值</div>
</div>

<div class="gmtc" id="buyNumberhavebought">
<div class="gmtctitle">
<span class="gmtxt">靓号已被购买</span>
</div>
<div class="gmtscont">您选择的号码已经被人捷足先登，请重新选择靓号</div>
</div>
</body>

</html>
