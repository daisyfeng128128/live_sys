<link rel="stylesheet" href="<?php echo $page_var['cdn_domain']?>/css/memberQ2v1.4.css" type="text/css" media="screen">
<link rel="stylesheet" href="<?php echo $page_var['cdn_domain']?>/css/mallv1.5.css" type="text/css" media="screen">
<script src="<?php echo $page_var['cdn_domain']?>/js/common-nsr0.8.js?20140402"></script>
<script type="text/javascript" src="<?php echo $page_var['cdn_domain']?>/js/mallQ2v1.6.6.js?20140402"></script>
<?php if(!$page_var['IS_QQ']):?>
<script type="text/javascript" src="<?php echo $page_var['cdn_domain']?>/js/lib/jquery.fancybox.js?v=2.0.6"></script>
<link rel="stylesheet" type="text/css" href="<?php echo $page_var['cdn_domain']?>/css/ext/jquery.fancybox.css?v=2.0.6" media="screen" />
<?php endif;?>
<style type="text/css">
.chargefor{text-align:center;display:none;}
.chargefor input,.chargefor label{vertical-align:middle}
#forUserName{border:2px solid #B7B7B7;margin:9px 0 5px;padding:5px 4px;width:122px;color:#999}
.chargefor .tip{text-align:left;color:red}
.forothersDet{position:relative;display:none;}
.chargefor input.getUidBad{color:red!important}
#cforNick,#cforNick a{font-size:14px;}
.none{display:none;}
</style>
<div id="middle">
	<div class="content mb" style="margin:15px 0 0 0; ">
		<div class="mb_left">
			<div class="mb_ucentr">
				<div id="balance">
					<p class="label">您的账户余额：</p>
					<p><span class="money fl"><?php echo $page_var['money_name']?>：<span class="myscore_balance" id="xmoney">0</span></span><a href="/ucenter.php?ptype=pay" onClick="return islogin()" class="tbbuybtn" style="margin:0">充值</a></p>
			          <div class="clear"></div>
<?php if(!IS_SINGLE_MONEY):?>
			          <p><span class="beans fl"><?php echo $page_var['money_name2']?>：<span class="myscore_point" id="xpoint">0</span></span><a href="/ucenter.php?ptype=exchange" onClick="return islogin()" class="btnexc">兑换&gt;</a></p>
<?php endif;?>
			          <div class="clear"></div>
<?php if($db->CacheGetOne(60,"select u.nickname,u.usernumber,u.userid from user as u,agentsalary a where a.userid=u.userid and u.usertype=7 and istrade=0")):?>
					<p class="mt10 mb10 txc"><em class="btn_blue88 btns" id="btn_agent">通过代理充值</em></p>
<?php endif;?>
					<p id="addProxy"></p>
				</div>
				<img src="img/icon_line.png" width="160" height="1">
				<ul class="recharge_menu" id="recmenu">
<?php $pay_interface = explode(",",$global_config_data["pay_interface"]);?>
<?php if(in_array("rec_wxpay",$pay_interface)):?>
					<li class="txt rec2" data-rel="rec_wxpay"><span class="none">微信支付</span><img src="/img/indexQ2/pay_wx.png"/></li>
<?php endif;?>
<?php if(in_array("rec_alipay",$pay_interface)):?>
					<li class="txt rec2" data-rel="rec_alipay"><span class="none">支付宝</span><img src="/img/indexQ2/pay_alipay.png"/></li>
<?php endif;?>
<?php if(in_array("rec_chinabank",$pay_interface)):?>
					<li class="txt rec2" data-rel="rec_chinabank" rel="网银在线"><span class="none">网银在线</span><img src="/img/indexQ2/pay_bank.png"/></li>
<?php endif;?>
<?php if(in_array("rec_ips",$pay_interface)):?>
					<li class="txt rec2" data-rel="rec_ips" rel="IPS网银"><span class="none">网银</span><img src="/img/indexQ2/pay_bank.png"/></li>
<?php endif;?>
<?php if(in_array("rec_ips_szx",$pay_interface)):?>
					<li class="txt rec2" data-rel="rec_ips_szx" rel="移动储值卡"><span class="none">移动储值卡</span><img src="/img/indexQ2/pay_szx.png"/></li>
<?php endif;?>
<?php if(in_array("rec_ips_zglt",$pay_interface)):?>
					<li class="txt rec2" data-rel="rec_ips_zglt" rel="联通储值卡"><span class="none">联通储值卡</span><img src="/img/indexQ2/pay_liantong.png"/></li>
<?php endif;?>
<?php if(in_array("rec_ips_dx",$pay_interface)):?>
					<li class="txt rec2" data-rel="rec_ips_dx" rel="电信储值卡"><span class="none">电信储值卡</span><img src="/img/indexQ2/pay_dx.jpg"/></li>
<?php endif;?>
<?php if(in_array("rec_yee",$pay_interface)):?>
					<li class="txt rec2" data-rel="rec_yee" rel="易宝网银"><span class="none">网银</span><img src="/img/indexQ2/pay_bank.png"/></li>
<?php endif;?>
<?php if(in_array("rec_yee_szx",$pay_interface)):?>
					<li class="txt rec2" data-rel="rec_yee_szx"><span class="none">神州行充值卡</span><img src="/img/indexQ2/pay_szx.png"/></li>
<?php endif;?>
<?php if(in_array("rec_yee_zglt",$pay_interface)):?>
					<li class="txt rec2" data-rel="rec_yee_zglt"><span class="none">中国联通充值卡</span><img src="/img/indexQ2/pay_liantong.png"/></li>
<?php endif;?>
<?php if(in_array("rec_yee_jw",$pay_interface)):?>
					<li class="txt rec2" data-rel="rec_yee_jw"><span class="none">骏网一卡通</span><img src="/img/indexQ2/pay_jw.png"/></li>
<?php endif;?>
<?php if(in_array("rec_kuaiqian",$pay_interface)):?>
					<li class="txt rec2" data-rel="rec_kuaiqian"><span class="none">快钱支付</span><img src="/img/indexQ2/pay_bank.png"/></li>
<?php endif;?>
<?php if(in_array("rec_kuaiqian_szx",$pay_interface)):?>
					<li class="txt rec2" data-rel="rec_kuaiqian_szx"><span class="none">神州行充值卡</span><img src="/img/indexQ2/pay_szx.png"/></li>
<?php endif;?>
<?php if(in_array("rec_kuaiqian_zglt",$pay_interface)):?>
					<li class="txt rec2" data-rel="rec_kuaiqian_zglt"><span class="none">中国联通充值卡</span><img src="/img/indexQ2/pay_liantong.png"/></li>
<?php endif;?>
<?php if(in_array("rec_kuaiqian_jw",$pay_interface)):?>
					<li class="txt rec2" data-rel="rec_kuaiqian_jw"><span class="none">骏网一卡通</span><img src="/img/indexQ2/pay_jw.png"/></li>
<?php endif;?>
<?php if(in_array("rec_tonhui",$pay_interface)):?>
					<li class="txt rec2" data-rel="rec_tonhui" rel="通汇网银"><span class="none">网银</span><img src="/img/indexQ2/pay_bank.png"/></li>
<?php endif;?>
<?php if(in_array("rec_5iu",$pay_interface)):?>
					<li class="txt rec2" data-rel="rec_5iu_alipay"><span class="none">支付宝</span><img src="/img/indexQ2/pay_alipay.png"/></li>
					<li class="txt rec2" data-rel="rec_5iu_ips" rel="IPS网银"><span class="none">网银</span><img src="/img/indexQ2/pay_bank.png"/></li>
					<li class="txt rec2" data-rel="rec_5iu_ips_szx" rel="移动储值卡"><span class="none">移动储值卡</span><img src="/img/indexQ2/pay_szx.png"/></li>
					<li class="txt rec2" data-rel="rec_5iu_ips_zglt" rel="联通储值卡"><span class="none">联通储值卡</span><img src="/img/indexQ2/pay_liantong.png"/></li>
					<li class="txt rec2" data-rel="rec_5iu_ips_dx" rel="电信储值卡"><span class="none">电信储值卡</span><img src="/img/indexQ2/pay_dx.jpg"/></li>
<?php endif;?>

				</ul>
			</div>
		</div>
		<!--右边加载区域-->
		<div id="mall_content">
			<div class="mb_top"></div>
			<div class="mb_content" style="margin-bottom: 20px;padding-bottom: 20px;">
				<div class="porc-pay-tit"> 
				<p class="pry-t02"> 充值账户：<span>当前登录帐号</span></p> <p class="pry-t02"></p>
				<p class="pry-t03"> <a onclick="openChooseWindow();" href="javascript:void(0);">给他人充值</a> </p>
				</div>
<?php if(in_array("rec_wxpay",$pay_interface)):?>
				<?php include($app_path."include/personal_tpl/pay/wx.php");?>
<?php endif;?>
<?php if(in_array("rec_alipay",$pay_interface)):?>
				<?php include($app_path."include/personal_tpl/pay/alipay.php");?>
<?php endif;?>
<?php if(in_array("rec_chinabank",$pay_interface)):?>
				<?php include($app_path."include/personal_tpl/pay/chinabank.php");?>
<?php endif;?>
<?php if(in_array("rec_ips",$pay_interface)||in_array("rec_ips_szx",$pay_interface)||in_array("rec_ips_zglt",$pay_interface)||in_array("rec_ips_dx",$pay_interface)):?>
				<?php include($app_path."include/personal_tpl/pay/ips.php");?>
<?php endif;?>
<?php if(in_array("rec_yee",$pay_interface)||in_array("rec_yee_szx",$pay_interface)||in_array("rec_yee_zglt",$pay_interface)||in_array("rec_yee_jw",$pay_interface)):?>
				<?php include($app_path."include/personal_tpl/pay/yee.php");?>
<?php endif;?>
<?php if(in_array("rec_kuaiqian",$pay_interface)||in_array("rec_kuaiqian_szx",$pay_interface)||in_array("rec_kuaiqian_zglt",$pay_interface)||in_array("rec_kuaiqian_jw",$pay_interface)):?>
				<?php include($app_path."include/personal_tpl/pay/kuaiqian.php");?>
<?php endif;?>
<?php if(in_array("rec_tonhui",$pay_interface)):?>
				<?php include($app_path."include/personal_tpl/pay/tonghui.php");?>
<?php endif;?>
<?php if(in_array("rec_5iu",$pay_interface)):?>
				<?php include($app_path."include/personal_tpl/pay/5iu.php");?>
<?php endif;?>
			</div>				
		</div>
	</div>			
</div>
<a class="fancybox" href="#changeuserdiv" id="changeuserdivA" style="display:none">Inline</a>
<div style="display:none;width:250px;" class="xz_agent xz_agent_m" id="changeuserdiv">
<div class="agent_m"> <span>充值靓号</span> <input type="text" class="agt_m_t" id="chooseuserid"> </div>
<a onclick="checkReUserID();" class="agent_sure agent_sure_m" href="javascript:void(0);">确认</a>
</div>
<script type="text/javascript">
var data_value,pgname="rec_zfb";
var chooseuserid=0;
$(function(){
	Mall.init();
	// 为浏览器地址栏URL添加参数
	if ( document.location.hash == "" ) {
		window.location.hash = "#tab=0";
	}			
	// 实现用户界面的tab切换功能
	$( "#recmenu li" ).click(function() {
		var index = $(this).index();
		var is_current_tab = $(this).hasClass( "hightlight" );
		$(this).addClass( "hightlight" ).siblings().removeClass( "hightlight" );				
		pgname=$(this).attr( "data-rel" );
		Main.tabIndex=$(this).attr("data-num");
		$(".rec_info").hide();
		$("."+pgname).show();
		window.location.hash = "#tab="+index;
	});
	// 刷新页面时，模拟点击索引值为tab1的<li>标签
	var tab1=parseInt(window.location.hash.split("=")[1]);
	$( "#recmenu li" ).eq(tab1).trigger( "click" );
})
function isNum_litter(v){
	var v=v.replace(/\s/g,''),r=/^[A-Za-z0-9]+$/g;
	return r.test(v);
}
var reduce=1;
var RMB_XNB=<?php echo RMB_XNB?>;
var BANK_REDUCE=<?php echo BANK_REDUCE?>;
var JUN_REDUCE=<?php echo JUN_REDUCE?>;
var YD_REDUCE=<?php echo YD_REDUCE?>;
var LT_REDUCE=<?php echo LT_REDUCE?>;
var ALI_REDUCE=<?php echo ALI_REDUCE?>;

var Phone_REDUCE = YD_REDUCE;
var agentid=0;
var showuserid=0;
function goPayPage(url){
	Main.confirm('充值遇到问题？','充值完成前不要关闭此窗口。完成充值后请根据你的情况点击下面按钮<br><b>请在新开网上储蓄卡页面完成付款后再选择。</b>','已完成充值',function(){
		window.location.reload();
	},'充值遇到问题',function(){
		window.location.href='/html/help.html';
	});
	window.open(url);
}
<?php 
if($_GET['a']!=""){
// $db->debug =true;
	$aid=$db->GetRow("select userid,b.nickname,b.usernumber from user b where b.usernumber='".(int)$_GET['a']."'");
	if(!empty($aid)){
?>
showuserid=<?php echo $aid["userid"]?>;
$('#addProxy').html('<label>主播：</label><span id="ppNickName" class="fblod"><?php echo $aid["nickname"]?></span> <a style="color:#FF6C00;font-size:14px" onclick="showuserid=0;this.parentNode.style.display=\'none\';this.parentNode.innerHTML=\'\';">取消</a>').show();
<?php }}?>
<?php
if($_GET['agentid']!=""){
	$agent_number=$db->GetRow("select userid,b.nickname,b.usernumber from user b where b.usernumber='".(int)$_GET['agentid']."'");
	if(!empty($agent_number)){
?>
agentid=<?php echo $agent_number["userid"]?>;
$('#addProxy').html('<label>代理：</label><span id="ppNickName" class="fblod"><?php echo $agent_number["nickname"]?></span> <a style="color:#FF6C00;font-size:14px" onclick="agentid=0;this.parentNode.style.display=\'none\';this.parentNode.innerHTML=\'\';">取消</a>').show();
<?php }}?>
</script>