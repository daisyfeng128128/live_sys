<?php //ips网上银行
$isnew = substr($global_config_data["ips_Mer_code"],0,2)=="03"?false:true;
?>
				<div class="rec_ips rec_info" style="display: none;">
					<!--文字提示-->
					<style type="text/css">.base_info input{vertical-align: middle;}</style>
					<div class="base_info" style="height:210px; border-bottom:1px dashed #eee;">
						<p>当前充值方式：<span class="colorfo">IPS网银</span>（需开通网上银行或信用卡）</p>
						<p>请选择充值金额：
							<input type="radio" name="chargtype_ipspay" value="0" checked="checked" onchange="selectRmbipspay();">
							<select id="selectRmbipspay" onchange="selectRmbipspay();">
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
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="chargtype_ipspay" value="1" onchange="$('#zhifupalRmbex_ipspay').blur()">&nbsp;其他金额&nbsp;&nbsp;<input type="text" id="zhifupalRmbex_ipspay" class="intBd input180 " style="width:90px">元
						</p>
						<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="0" id="orderAmount_ipspay" disabled="true"></p>
						<div class="color999">兑换比例：人民币和<?php echo $page_var['money_name']?>兑换比例1:<?php echo RMB_XNB?></div>
					</div>
					<!--选择银行-->
					<div class="choose_bank">
<?php if($isnew){?>
<p style="display:none">支付卡种：</p>
						<ul id="bankName_ips" style="display:none">
<li><input type="radio" name="bank_ips" id="cardtype02" value="02"/><a href="javascript:void(0)"><label for="cardtype02">信用卡</label></a></li>
<li><input type="radio" name="bank_ips" id="cardtype01" value="01" checked="checked"/><a href="javascript:void(0)"><label for="cardtype01">借记卡</label></a></li>
						</ul>
<?php }else{?>
<p style="">支付银行：</p>
						<ul id="bankName_ips" style="">
<li><input type="radio" name="bank_ips" id="zhongguo" value="00083"/><a href="javascript:void(0)"><label class="zhongguo" for="zhongguo"></label></a></li>
<li><input type="radio" name="bank_ips" id="gongshang" value="00018"/><a href="javascript:void(0)"><label  class="gongshang" for="gongshang"></label></a></li>
<li><input type="radio" name="bank_ips" id="zhaohang" value="00027"/><a href="javascript:void(0)"><label class="zhaohang" for="zhaohang"></label></a></li>
<li><input type="radio" name="bank_ips" id="nongye" value="00017"/><a href="javascript:void(0)"><label class="nongye" for="nongye"></label></a></li>
<li><input type="radio" name="bank_ips" id="jianshe" value="00003"/><a href="javascript:void(0)"><label class="jianshe" for="jianshe"></label></a></li>
<li><input type="radio" name="bank_ips" id="jiaotong" value="00005"/><a href="javascript:void(0)"><label class="jiaotong" for="jiaotong"></label></a></li>
<li><input type="radio" name="bank_ips" id="xingye" value="00016"/><a href="javascript:void(0)"><label class="xingye" for="xingye"></label></a></li>
<li><input type="radio" name="bank_ips" id="minsheng" value="00013"/><a href="javascript:void(0)"><label class="minsheng" for="minsheng"></label></a></li>
<li><input type="radio" name="bank_ips" id="guangda" value="00057"/><a href="javascript:void(0)"><label class="guangda" for="guangda"></label></a></li>
<li><input type="radio" name="bank_ips" id="pingan" value="00087"/><a href="javascript:void(0)"><label class="pingan" for="pingan"></label></a></li>
<li><p><a style="color:#ff6c00; text-decoration:underline" href="javascript:;" onclick="$(this).parent().parent().hide();$('#bankName_ips .mrBk').show();return false;">更多银行</a></p></li>	
<li class="mrBk"><input type="radio" name="bank_ips" id="ningbo" value="00206"/><a href="javascript:void(0)"><label class="ningbo" for="ningbo"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_ips" id="zhongxin" value="00092"/><a href="javascript:void(0)"><label class="zhongxin" for="zhongxin"></label></a></li>
<!--li class="mrBk"><input type="radio" name="bank_ips" id="shenfa" value="00023"/><a href="javascript:void(0)"><label class="shenfa" for="shenfa"></label></a></li-->
<li class="mrBk"><input type="radio" name="bank_ips" id="guangfa" value="00052"/><a href="javascript:void(0)"><label class="guangfa" for="guangfa"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_ips" id="shanghaibank" value="00084"/><a href="javascript:void(0)"><label class="shanghaibank" for="shanghaibank"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_ips" id="beijing" value="00050"/><a href="javascript:void(0)"><label class="beijing" for="beijing"></label></a></li>
<!--li class="mrBk"><input type="radio" name="bank_ips" id="shangpufa" value="SPDB-NET-B2C"/><a href="javascript:void(0)"><label class="shangpufa" for="shangpufa"></label></a></li-->
<li class="mrBk"><input type="radio" name="bank_ips" id="nongcunshangye" value="00056"/><a href="javascript:void(0)"><label class="nongcunshangye" for="nongcunshangye"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_ips" id="zheshang" value="00086"/><a href="javascript:void(0)"><label class="zheshang" for="zheshang"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_ips" id="nanjing" value="00055"/><a href="javascript:void(0)"><label class="nanjing" for="nanjing"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_ips" id="hebei" value="00149"/><a href="javascript:void(0)"><label class="hebei" for="hebei"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_ips" id="buohai" value="00095"/><a href="javascript:void(0)"><label class="buohai" for="buohai"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_ips" id="dongya" value="00096"/><a href="javascript:void(0)"><label class="dongya" for="dongya"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_ips" id="hangzhou" value="00081"/><a href="javascript:void(0)"><label class="hangzhou" for="hangzhou"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_ips" id="huaxia" value="00041"/><a href="javascript:void(0)"><label class="huaxia" for="huaxia"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_ips" id="youzheng" value="00051"/><a href="javascript:void(0)"><label class="youzheng" for="youzheng"></label></a></li>
<!--li class="mrBk"><input type="radio" name="bank_ips" id="shangnongshang" value="00030"/><a href="javascript:void(0)"><label class="shangnongshang" for="shangnongshang"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_ips" id="nanyanbank" value="NCBBANK-NET-B2C"/><a href="javascript:void(0)"><label class="nanyanbank" for="nanyanbank"></label></a></li-->
						</ul>
<?php }?>
						<div class="clear"></div>
						<button class="btn_porange" onClick="pay_go_ipspay()" style="margin:20px 0 0 300px;">充&nbsp;&nbsp;值</button>
					</div>
				</div>
				<?php //神州行充值卡?>
				<div class="rec_ips_szx rec_info" style="display: none;">
					<div class="base_info">
						<p>当前充值方式：<span class="colorfo rtype">神州行充值卡</span></p>
						<p>手机充值卡面额：
							<select id="selectRmbipsSzx" onchange="selectRmbipsSzx()">
								<option value="10">10元</option>
								<option value="30">30元</option>
								<option value="50" selected="selected">50元</option>
								<option value="100">100元</option>
								<option value="200">200元</option>
								<option value="300">300元</option>
								<option value="500">500元</option>
							</select>&nbsp;元
							<span style="color:red; font-size:12px;">&nbsp;&nbsp;&nbsp;&nbsp;请确保您持有的充值卡面额与选择的充值面额相同，以免造成损失。</span>
						</p>
						<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="45000" id="orderAmountipsSzx" disabled="true"></p>
						<div class="color999">提示：人民币和<?php echo $page_var['money_name']?>兑换比例1:<span class="ltYd"><?php echo YD_REDUCE*RMB_XNB;?></span></div>
					</div>	
					<button class="btn_porange" onClick="pay_go_ipspay()">充&nbsp;&nbsp;值</button>	
					<p class="color999" style="margin:20px 0;">请务必使用与您选择的面额相同的充值卡进行支付，否则引起的交易失败交易金额不予退还。
					<br>如：选择50元面额但使用100元卡支付，则系统认为实际支付金额为50元，
					<br>高于50元部分不予退还；选择50元面额但使用30元卡支付则系统认为支付失败， 30元不予退还。</p>
				</div>
				<?php //中国联通?>
				<div class="rec_ips_zglt rec_info" style="display: none;">
					<div class="base_info">
						<p>当前充值方式：<span class="colorfo rtype">中国联通充值卡</span></p>
						<p>手机充值卡面额：
							<select id="selectRmbipsZglt" onchange="selectRmbipsZglt()">
								<option value="20">20元</option>
								<option value="30">30元</option>
								<option value="50" selected="selected">50元</option>
								<option value="100">100元</option>
								<option value="200">200元</option>
								<option value="300">300元</option>
								<option value="500">500元</option>
							</select>&nbsp;元
							<span style="color:red; font-size:12px;">&nbsp;&nbsp;&nbsp;&nbsp;请确保您持有的充值卡面额与选择的充值面额相同，以免造成损失。</span>
						</p>
						<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="45000" id="orderAmountipsZglt" disabled="true"></p>
						<div class="color999">提示：人民币和<?php echo $page_var['money_name']?>兑换比例1:<span class="ltYd"><?php echo LT_REDUCE*RMB_XNB;?></span></div>
					</div>	
					<button class="btn_porange" onClick="pay_go_ipspay()">充&nbsp;&nbsp;值</button>	
					<p class="color999" style="margin:20px 0;">请务必使用与您选择的面额相同的充值卡进行支付，否则引起的交易失败交易金额不予退还。
					<br>如：选择50元面额但使用100元卡支付，则系统认为实际支付金额为50元，
					<br>高于50元部分不予退还；选择50元面额但使用30元卡支付则系统认为支付失败， 30元不予退还。</p>
				</div>
				<?php //电信储值卡?>
				<div class="rec_ips_dx rec_info" style="display: none;">
					<!--文字提示-->
					<div class="base_info">
						<p>当前充值方式：<span class="colorfo rtype">电信储值卡</span></p>
						<p>充值卡面额：
							<select id="selectRmbipsDx" onchange="selectRmbipsDx()">
								<option value="20">20</option>
								<option value="30">30</option>
								<option value="50" selected="selected">50</option>
								<option value="100">100</option>
							</select>&nbsp;元
							<span style="color:red; font-size:12px;">&nbsp;&nbsp;&nbsp;&nbsp;请确保您持有的充值卡面额与选择的充值面额相同，以免造成损失。</span>
						</p>
						<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="4250" id="orderAmountipsDx" disabled="true"></p>
						<div class="color999">提示：人民币和<?php echo $page_var['money_name']?>兑换比例1:<span class="gscale"><?php echo JUN_REDUCE*RMB_XNB;?></span></div>
					</div>	
					<button class="btn_porange" onClick="pay_go_ipspay()">充&nbsp;&nbsp;值</button>	
					<p class="color999" style="margin:20px 0;">请务必使用与您选择的面额相同的充值卡进行支付，否则引起的交易失败交易金额不予退还。
					<br>如：选择50元面额但使用100元卡支付，则系统认为实际支付金额为50元，
					<br>高于50元部分不予退还；选择50元面额但使用30元卡支付则系统认为支付失败， 30元不予退还。</p>			
				</div>
<script type="text/javascript">
$(function(){
	selectRmbipspay();
	$('#zhifupalRmbex_ipspay').live('input propertychange',function(){
		var vzp = $('#zhifupalRmbex_ipspay').val();
		var rzp = /^[0-9]*[1-9][0-9]*$/;
		if(!rzp.test(vzp)){
			$(this).val(0);
			$('#orderAmount_ipspay').val(0);
			Main.alert('请输入正整数');
		}else{
			$('#orderAmount_ipspay').val(RMB_XNB*vzp);
		}
	});
});
function selectRmbipspay(){
	$('#orderAmount_ipspay').val(RMB_XNB*$('#selectRmbipspay').val());
}
function selectRmbipsSzx(){
	$('#orderAmountipsSzx').val(RMB_XNB*$('#selectRmbipsSzx').val()*YD_REDUCE);
}
function selectRmbipsZglt(){
	$('#orderAmountipsZglt').val(RMB_XNB*$('#selectRmbipsZglt').val()*LT_REDUCE);
}
function selectRmbipsDx(){
	$('#orderAmountipsDx').val(RMB_XNB*$('#selectRmbipsDx').val()*JUN_REDUCE);
}
function pay_go_ipspay(){
	if(!islogin()){
		return false;
	}
	var paychannel=8;
	if(pgname=='rec_ips'){//银行充值
		var type=$('input[name=chargtype_ipspay]:checked').val();
		if(type=="0"){//请选择充值金额
			var cash = $("#selectRmbipspay").val();
		}else if(type=="1"){
			var cash = $("#zhifupalRmbex_ipspay").val();
		}
<?php if($isnew){?>
	var bankid=$('input[name=bank_ips]:checked').val();
	if(bankid=="" || bankid==undefined){
		Main.alert('请选择支付卡种');
		return;
	}
<?php }else{?>
	var bankid=$('input[name=bank_ips]:checked').val();
	if(bankid=="" || bankid==undefined){
		Main.alert('请选择银行');
		return;
	}
<?php }?>
	}else if(pgname=='rec_ips_szx'){
		var cash = $("#selectRmbipsSzx").val();
		paychannel=17;
		bankid="00077";
	}else if(pgname=='rec_ips_zglt'){
		var cash = $("#selectRmbipsZglt").val();
		paychannel=18;
		bankid="10016";
	}else if(pgname=='rec_ips_dx'){
		var cash = $("#selectRmbipsDx").val();
		paychannel=19;
		bankid="10018";
	}
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
	if(cash.indexOf('.')!=-1){
		Main.alert('充值金额不能有小数！');
		return;
	}
	if(cash<=0){
		Main.alert('充值金额需要大于0');
		return;
	}
	var url="/apis/<?php if($isnew){?>ips17<?php }else{?>ips<?php }?>/redirect.php";
	url+="?chooseuserid="+chooseuserid+"&p3_Amt="+cash+"&paychannel="+paychannel+"&agentid="+agentid+"&showuserid="+showuserid+"&pd_FrpId="+bankid;
	goPayPage(url);
}
</script>