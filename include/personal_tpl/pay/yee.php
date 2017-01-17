<?php //易宝充值,网上银行?>
				<div class="rec_yee rec_info" style="display: none;">
					<!--文字提示-->
					<style type="text/css">.base_info input{vertical-align: middle;}</style>
					<div class="base_info" style="height:210px; border-bottom:1px dashed #eee;">
						<p>当前充值方式：<span class="colorfo">易宝网银</span>（需开通网上银行或信用卡）</p>
						<p>请选择充值金额：
							<input type="radio" name="zhifutype_yeepay" value="0" checked="checked" onchange="selectRmbyee();">
							<select id="selectRmbyee" onchange="selectRmbyee();">
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
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="zhifutype_yeepay" value="1" onchange="$('#zhifupalRmbex_yeepay').blur()">&nbsp;其他金额&nbsp;&nbsp;<input type="text" id="zhifupalRmbex_yeepay" class="intBd input180 " style="width:90px">元
						</p>
						<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="0" id="orderAmount_yeepay" disabled="true"></p>
						<div class="color999">兑换比例：人民币和<?php echo $page_var['money_name']?>兑换比例1:<?php echo RMB_XNB?></div>
					</div>
					<!--选择银行-->
					<div class="choose_bank">
						<p>支付银行：</p>
						<ul id="bankName">
<li><input type="radio" name="bank_yee" id="zhongguo" value="BOC-NET-B2C"/><a href="javascript:void(0)"><label class="zhongguo" for="zhongguo"></label></a></li>
<li><input type="radio" name="bank_yee" id="gongshang" value="ICBC-NET-B2C"/><a href="javascript:void(0)"><label  class="gongshang" for="gongshang"></label></a></li>
<li><input type="radio" name="bank_yee" id="zhaohang" value="CMBCHINA-NET-B2C"/><a href="javascript:void(0)"><label class="zhaohang" for="zhaohang"></label></a></li>
<li><input type="radio" name="bank_yee" id="nongye" value="ABC-NET-B2C"/><a href="javascript:void(0)"><label class="nongye" for="nongye"></label></a></li>
<li><input type="radio" name="bank_yee" id="jianshe" value="CCB-NET-B2C"/><a href="javascript:void(0)"><label class="jianshe" for="jianshe"></label></a></li>
<li><input type="radio" name="bank_yee" id="jiaotong" value="BOCO-NET-B2C"/><a href="javascript:void(0)"><label class="jiaotong" for="jiaotong"></label></a></li>
<li><input type="radio" name="bank_yee" id="xingye" value="CIB-NET-B2C"/><a href="javascript:void(0)"><label class="xingye" for="xingye"></label></a></li>
<li><input type="radio" name="bank_yee" id="minsheng" value="CMBC-NET-B2C"/><a href="javascript:void(0)"><label class="minsheng" for="minsheng"></label></a></li>
<li><input type="radio" name="bank_yee" id="guangda" value="CEB-NET-B2C"/><a href="javascript:void(0)"><label class="guangda" for="guangda"></label></a></li>
<li><input type="radio" name="bank_yee" id="pingan" value="PINGANBANK-NET"/><a href="javascript:void(0)"><label class="pingan" for="pingan"></label></a></li>
<li><p><a style="color:#ff6c00; text-decoration:underline" href="javascript:;" onclick="$(this).parent().parent().hide();$('.mrBk').show();return false;">更多银行</a></p></li>	
<li class="mrBk"><input type="radio" name="bank_yee" id="ningbo" value="NBCB-NET-B2C"/><a href="javascript:void(0)"><label class="ningbo" for="ningbo"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_yee" id="zhongxin" value="ECITIC-NET-B2C"/><a href="javascript:void(0)"><label class="zhongxin" for="zhongxin"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_yee" id="shenfa" value="SDB-NET-B2C"/><a href="javascript:void(0)"><label class="shenfa" for="shenfa"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_yee" id="guangfa" value="GDB-NET-B2C"/><a href="javascript:void(0)"><label class="guangfa" for="guangfa"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_yee" id="shanghaibank" value="SHB-NET-B2C"/><a href="javascript:void(0)"><label class="shanghaibank" for="shanghaibank"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_yee" id="beijing" value="BCCB-NET-B2C"/><a href="javascript:void(0)"><label class="beijing" for="beijing"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_yee" id="shangpufa" value="SPDB-NET-B2C"/><a href="javascript:void(0)"><label class="shangpufa" for="shangpufa"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_yee" id="nongcunshangye" value="BJRCB-NET-B2C"/><a href="javascript:void(0)"><label class="nongcunshangye" for="nongcunshangye"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_yee" id="zheshang" value="CZ-NET-B2C"/><a href="javascript:void(0)"><label class="zheshang" for="zheshang"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_yee" id="nanjing" value="NJCB-NET-B2C"/><a href="javascript:void(0)"><label class="nanjing" for="nanjing"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_yee" id="hebei" value="SCCB-NET-B2C"/><a href="javascript:void(0)"><label class="hebei" for="hebei"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_yee" id="buohai" value="CBHB-NET-B2C"/><a href="javascript:void(0)"><label class="buohai" for="buohai"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_yee" id="dongya" value="HKBEA-NET-B2C"/><a href="javascript:void(0)"><label class="dongya" for="dongya"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_yee" id="hangzhou" value="HZBANK-NET-B2C"/><a href="javascript:void(0)"><label class="hangzhou" for="hangzhou"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_yee" id="huaxia" value="HXB-NET-B2C"/><a href="javascript:void(0)"><label class="huaxia" for="huaxia"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_yee" id="youzheng" value="POST-NET-B2C"/><a href="javascript:void(0)"><label class="youzheng" for="youzheng"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_yee" id="shangnongshang" value="SHRCB-NET-B2C"/><a href="javascript:void(0)"><label class="shangnongshang" for="shangnongshang"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_yee" id="nanyanbank" value="NCBBANK-NET-B2C"/><a href="javascript:void(0)"><label class="nanyanbank" for="nanyanbank"></label></a></li>
						</ul>
						<div class="clear"></div>
						<button class="btn_porange" onClick="pay_go_yeepay()" style="margin:20px 0 0 300px;">充&nbsp;&nbsp;值</button>
					</div>
				</div>
				<!--手机充值-神州行-中国联通-->
				<div class="rec_yee_szx rec_info" style="display: none;">
					<div class="base_info">
						<p>当前充值方式：<span class="colorfo rtype">神州行充值卡</span></p>
						<p>手机充值卡面额：
							<select id="selectRmbyeeSzx" onchange="selectRmbyeeSzx()">
								<option value="10">10元</option>
								<option value="20">20元</option>
								<option value="30">30元</option>
								<option value="50" selected="selected">50元</option>
								<option value="100">100元</option>
								<option value="200">200元</option>
								<option value="300">300元</option>
								<option value="500">500元</option>
								<option value="1000">1000元</option>
								<option value="2000">2000元</option>
								<option value="3000">3000元</option>
								<option value="5000">5000元</option>
								<option value="10000">10000元</option>
								<option value="50000">50000元</option>
							</select>&nbsp;元
							<span style="color:red; font-size:12px;">&nbsp;&nbsp;&nbsp;&nbsp;请确保您持有的充值卡面额与选择的充值面额相同，以免造成损失。</span>
						</p>
						<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="45000" id="orderAmountYeeSzx" disabled="true"></p>
						<div class="color999">提示：人民币和<?php echo $page_var['money_name']?>兑换比例1:<span class="ltYd"><?php echo YD_REDUCE*RMB_XNB;?></span></div>
					</div>	
					<button class="btn_porange" onClick="pay_go_yeepay()">充&nbsp;&nbsp;值</button>	
					<p class="color999" style="margin:20px 0;">请务必使用与您选择的面额相同的充值卡进行支付，否则引起的交易失败交易金额不予退还。
					<br>如：选择50元面额但使用100元卡支付，则系统认为实际支付金额为50元，
					<br>高于50元部分不予退还；选择50元面额但使用30元卡支付则系统认为支付失败， 30元不予退还。</p>
				</div>
				<!--中国联通-->
				<div class="rec_yee_zglt rec_info" style="display: none;">
					<div class="base_info">
						<p>当前充值方式：<span class="colorfo rtype">中国联通充值卡</span></p>
						<p>手机充值卡面额：
							<select id="selectRmbYeeZglt" onchange="selectRmbYeeZglt()">
								<option value="10">10元</option>
								<option value="20">20元</option>
								<option value="30">30元</option>
								<option value="50" selected="selected">50元</option>
								<option value="100">100元</option>
								<option value="200">200元</option>
								<option value="300">300元</option>
								<option value="500">500元</option>
								<option value="1000">1000元</option>
								<option value="2000">2000元</option>
								<option value="3000">3000元</option>
								<option value="5000">5000元</option>
								<option value="10000">10000元</option>
								<option value="50000">50000元</option>
							</select>&nbsp;元
							<span style="color:red; font-size:12px;">&nbsp;&nbsp;&nbsp;&nbsp;请确保您持有的充值卡面额与选择的充值面额相同，以免造成损失。</span>
						</p>
						<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="45000" id="orderAmountYeeZglt" disabled="true"></p>
						<div class="color999">提示：人民币和<?php echo $page_var['money_name']?>兑换比例1:<span class="ltYd"><?php echo LT_REDUCE*RMB_XNB;?></span></div>
					</div>	
					<button class="btn_porange" onClick="pay_go_yeepay()">充&nbsp;&nbsp;值</button>	
					<p class="color999" style="margin:20px 0;">请务必使用与您选择的面额相同的充值卡进行支付，否则引起的交易失败交易金额不予退还。
					<br>如：选择50元面额但使用100元卡支付，则系统认为实际支付金额为50元，
					<br>高于50元部分不予退还；选择50元面额但使用30元卡支付则系统认为支付失败， 30元不予退还。</p>
				</div>
				<!--游戏卡充值-骏网一卡通-冒泡一卡通-盛大一卡通-->
				<div class="rec_yee_jw rec_info" style="display: none;">
					<!--文字提示-->
					<div class="base_info">
						<p>当前充值方式：<span class="colorfo rtype">冒泡一卡通点卡充值</span></p>
						<p>游戏充值卡面额：
							<select id="selectRmbYeeJw" onchange="selectRmbYeeJw()">
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
							<span style="color:red; font-size:12px;">&nbsp;&nbsp;&nbsp;&nbsp;请确保您持有的充值卡面额与选择的充值面额相同，以免造成损失。</span>
						</p>
						<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="4250" id="orderAmountYeeJw" disabled="true"></p>
						<div class="color999">提示：人民币和<?php echo $page_var['money_name']?>兑换比例1:<span class="gscale"><?php echo JUN_REDUCE*RMB_XNB;?></span></div>
					</div>	
					<button class="btn_porange" onClick="pay_go_yeepay()">充&nbsp;&nbsp;值</button>	
					<p class="color999" style="margin:20px 0;">请务必使用与您选择的面额相同的充值卡进行支付，否则引起的交易失败交易金额不予退还。
					<br>如：选择50元面额但使用100元卡支付，则系统认为实际支付金额为50元，
					<br>高于50元部分不予退还；选择50元面额但使用30元卡支付则系统认为支付失败， 30元不予退还。</p>			
				</div>

<script type="text/javascript">
$(function(){
	selectRmbyee();
	selectRmbyeeSzx();
	selectRmbYeeZglt();
	selectRmbYeeJw();
	$('#zhifupalRmbex_yeepay').live('input propertychange',function(){
		var bankid=$('input[name=zhifutype_yeepay]:checked').val();
		if(bankid==0){
			return false;
		}
		var vzp = $('#zhifupalRmbex_yeepay').val();
		var rzp = /^[0-9]*[1-9][0-9]*$/;
		if(!rzp.test(vzp)){
			$(this).val(0);
			$('#orderAmount_yeepay').val(0);
			Main.alert('请输入正整数');
		}else{
			$('#orderAmount_yeepay').val(RMB_XNB*vzp);
		}
	});
});
function selectRmbyee(){
	var bankid=$('input[name=zhifutype_yeepay]:checked').val();
	if(bankid==1){
		return false;
	}
	$('#orderAmount_yeepay').val(RMB_XNB*$('#selectRmbyee').val());
}
function selectRmbyeeSzx(){
	$('#orderAmountYeeSzx').val(RMB_XNB*$('#selectRmbyeeSzx').val()*YD_REDUCE);
}
function selectRmbYeeZglt(){
	$('#orderAmountYeeZglt').val(RMB_XNB*$('#selectRmbYeeZglt').val()*LT_REDUCE);
}
function selectRmbYeeJw(){
	$('#orderAmountYeeJw').val(RMB_XNB*$('#selectRmbYeeJw').val()*JUN_REDUCE);
}
function pay_go_yeepay(){
	if(!islogin()){
		return false;
	}
	var paychannel=1;
	if(pgname=='rec_yee'){//银行充值
		var bankid=$('input[name=zhifutype_yeepay]:checked').val();
		if(bankid=="0"){//请选择充值金额
			var cash = $("#selectRmbyee").val();
		}else if(bankid=="1"){
			var cash = $("#zhifupalRmbex_yeepay").val();
		}
		var bankid=$('input[name=bank_yee]:checked').val();
		if(bankid=="" || bankid==undefined){
			Main.alert('请选择银行');
			return;
		}
	}else if(pgname=='rec_yee_szx'){//神州行充值卡
		var cash = $("#selectRmbyeeSzx").val();
		paychannel=4;
	}else if(pgname=='rec_yee_zglt'){//中国联通充值卡
		var cash = $("#selectRmbYeeZglt").val();
		paychannel=5;
	}else if(pgname=='rec_yee_jw'){//骏网一卡通
		var cash = $("#selectRmbYeeJw").val();
		paychannel=3;
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
	var url="/apis/yee/req.php";
	url+="?chooseuserid="+chooseuserid+"&p3_Amt="+cash+"&paychannel="+paychannel+"&pd_FrpId="+bankid+"&agentid="+agentid+"&showuserid="+showuserid;
	goPayPage(url);
}
</script>