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
					<p class="mt10 mb10 txc"><em class="btn_blue88 btns" id="btn_agent">通过代理充值</em></p>
					<p id="addProxy"></p>
				</div>
				<img src="img/icon_line.png" width="160" height="1">
				<ul class="recharge_menu" id="recmenu">
					<li class="rec1 icon_rec hightlight" data-rel="rec_ob_zfb"></li>
				</ul>
			</div>
		</div>
		<!--右边加载区域-->
		<div id="mall_content">
			<div class="mb_top"></div>
			<div class="mb_content">
				<div class="porc-pay-tit"> 
				<p class="pry-t02"> 充值账户：<span>当前登录帐号</span></p> <p class="pry-t02"></p>
				<p class="pry-t03"> <a onclick="openChooseWindow();" href="javascript:void(0);">给他人充值</a> </p>
				</div>
				<!--网银-->
				<div class="base_info" style="height:210px; border-bottom:1px dashed #eee;">
					<p>当前充值方式：<span class="colorfo">网银</span>（需开通网上银行或信用卡）</p>
					<p>请选择充值金额：
						<input type="radio" name="chargtype" value="0" checked="checked" onchange="selectRmb2();">
						<select id="selectRmb2" onchange="selectRmb2();">
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="30">30</option>
							<option value="50" selected="selected">50</option>
							<option value="100">100</option>
							<option value="200">200</option>
							<option value="300">300</option>
							<option value="500">500</option>
							<option value="1000">1000</option>
							<option value="2000">2000</option>
							<option value="3000">3000</option>
							<option value="5000">5000</option>
							<option value="10000">10000</option>
							<option value="50000">50000</option>
						</select>&nbsp;元 
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="chargtype" value="1" onchange="$('#selectRmbex').blur()">&nbsp;其他金额&nbsp;&nbsp;<input type="text" id="selectRmbex" class="intBd input180 " style="width:90px">元
					</p>
					<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="0" id="orderAmount" disabled="true"></p>
					<div class="color999">兑换比例：人民币和<?php echo $page_var['money_name']?>兑换比例1:<?php echo RMB_XNB?></div>
					<!--选择银行-->
					<div class="choose_bank">
						<div class="clear"></div>
						<button class="btn_porange" id="gotoBank" style="margin:20px 0 0 300px;">充&nbsp;&nbsp;值</button>
					</div>
				</div>
			</div>				
		</div>
	</div>			
</div>
<a class="fancybox" href="#changeuserdiv" id="changeuserdivA" style="display:none">Inline</a>
<div style="display:none;" class="xz_agent xz_agent_m" id="changeuserdiv">
<div class="agent_m"> <span>充值靓号</span> <input type="text" class="agt_m_t" id="chooseuserid"> </div>
<a onclick="checkReUserID();" class="agent_sure agent_sure_m" href="javascript:void(0);">确认</a>
</div>
<script type="text/javascript">
var data_value,pgname="rec_ob_zfb";
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
			var rectype=$(this).attr("data-rectype");
			Main.tabIndex=$(this).attr("data-num");
			data_value = $(this).attr("data-value");
			if(pgname=="rec_phone"){
				$('.rec_phone .rtype').html(rectype);
				if(data_value=="10"){//神州行充值卡(对应的充值折扣)
					Phone_REDUCE = YD_REDUCE;
					$(".ltYd").html(YD_REDUCE*RMB_XNB);
				}else if(data_value=="15"){//中国联通充值卡
					Phone_REDUCE = LT_REDUCE;
					$(".ltYd").html(LT_REDUCE*RMB_XNB);
				}
				selectRmb();
			}
			if(data_value=="13"){//骏网
				$(".gscale").html(JUN_REDUCE*RMB_XNB);
				Phone_REDUCE = JUN_REDUCE;
			}
			if(pgname=="rec_game"){
				$('.rec_game .rtype').html(rectype);
			}
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
$(".btn_porange").click(function(){
	if(!islogin()){
		return false;
	}
	var url="/apis/chinabank/Send.php";
	if(pgname=='rec_ob_zfb'){//银行充值
		var bankid=$('input[name=chargtype]:checked').val();
		if(bankid=="0")//请选择充值金额
			var cash = $("#selectRmb2").val();
		else
			var cash = $("#selectRmbex").val();
		if(!cash){
			Main.alert('请输入正确的充值金额');
			return;
		}
		if(cash.indexOf('.')!=-1){
			Main.alert('充值金额不能有小数！');
			return;
		}
		if(cash<=0){
			Main.alert('充值金额需要大于0');
			return;
		}
		url+="?chooseuserid="+chooseuserid+"&p3_Amt="+cash+"&paychannel=2&agentid="+agentid+"&showuserid="+showuserid;
	}
	Main.confirm('充值遇到问题？','充值完成前不要关闭此窗口。完成充值后请根据你的情况点击下面按钮<br><b>请在新开网上储蓄卡页面完成付款后再选择。</b>','已完成充值',function(){
		window.location.reload();
	},'充值遇到问题',function(){
		window.location.href='/html/help.html';
	});
	window.open(url);
});
var showuserid=0;
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
selectRmb2();
selectRmb5();
selectRmb();
selectRmb3();
</script>