<?php //快钱支付,网上银行?>
				<div class="rec_kuaiqian rec_info" style="display: none;">
					<!--文字提示-->
					<style type="text/css">.base_info input{vertical-align: middle;}</style>
					<div class="base_info" style="height:210px; border-bottom:1px dashed #eee;">
						<p>当前充值方式：<span class="colorfo">快钱支付</span>（需开通网上银行或信用卡）</p>
						<p>请选择充值金额：
							<input type="radio" name="zhifutype_kuaiqianpay" value="0" checked="checked" onchange="selectRmbkuaiqian();">
							<select id="selectRmbkuaiqian" onchange="selectRmbkuaiqian();">
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
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="zhifutype_kuaiqianpay" value="1" onchange="$('#zhifupalRmbex_kuaiqianpay').blur()">&nbsp;其他金额&nbsp;&nbsp;<input type="text" id="zhifupalRmbex_kuaiqianpay" class="intBd input180 " style="width:90px">元
						</p>
						<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="0" id="orderAmount_kuaiqianpay" disabled="true"></p>
						<div class="color999">兑换比例：人民币和<?php echo $page_var['money_name']?>兑换比例1:<?php echo RMB_XNB?></div>
					</div>
					<!--选择银行-->
					<div class="choose_bank">
						<p>支付银行：</p>
						<ul id="bankName">
<li><input type="radio" name="bank_kuaiqian" id="zhongguo" value="BOC"/><a href="javascript:void(0)"><label class="zhongguo" for="zhongguo"></label></a></li>
<li><input type="radio" name="bank_kuaiqian" id="gongshang" value="ICBC"/><a href="javascript:void(0)"><label  class="gongshang" for="gongshang"></label></a></li>
<li><input type="radio" name="bank_kuaiqian" id="zhaohang" value="CMB"/><a href="javascript:void(0)"><label class="zhaohang" for="zhaohang"></label></a></li>
<li><input type="radio" name="bank_kuaiqian" id="nongye" value="ABC"/><a href="javascript:void(0)"><label class="nongye" for="nongye"></label></a></li>
<li><input type="radio" name="bank_kuaiqian" id="jianshe" value="CCB"/><a href="javascript:void(0)"><label class="jianshe" for="jianshe"></label></a></li>
<li><input type="radio" name="bank_kuaiqian" id="jiaotong" value="BCOM"/><a href="javascript:void(0)"><label class="jiaotong" for="jiaotong"></label></a></li>
<li><input type="radio" name="bank_kuaiqian" id="xingye" value="CIB"/><a href="javascript:void(0)"><label class="xingye" for="xingye"></label></a></li>
<li><input type="radio" name="bank_kuaiqian" id="minsheng" value="CMBC"/><a href="javascript:void(0)"><label class="minsheng" for="minsheng"></label></a></li>
<li><input type="radio" name="bank_kuaiqian" id="guangda" value="CEB"/><a href="javascript:void(0)"><label class="guangda" for="guangda"></label></a></li>
<li><input type="radio" name="bank_kuaiqian" id="pingan" value="PAB"/><a href="javascript:void(0)"><label class="pingan" for="pingan"></label></a></li>
<li><p><a style="color:#ff6c00; text-decoration:underline" href="javascript:;" onclick="$(this).parent().parent().hide();$('.mrBk').show();return false;">更多银行</a></p></li>	
<li class="mrBk"><input type="radio" name="bank_kuaiqian" id="ningbo" value="NBCB"/><a href="javascript:void(0)"><label class="ningbo" for="ningbo"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_kuaiqian" id="zhongxin" value="CITIC"/><a href="javascript:void(0)"><label class="zhongxin" for="zhongxin"></label></a></li>
<!--li class="mrBk"><input type="radio" name="bank_kuaiqian" id="shenfa" value="SDB"/><a href="javascript:void(0)"><label class="shenfa" for="shenfa"></label></a></li-->
<li class="mrBk"><input type="radio" name="bank_kuaiqian" id="guangfa" value="GDB"/><a href="javascript:void(0)"><label class="guangfa" for="guangfa"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_kuaiqian" id="shanghaibank" value="SHB"/><a href="javascript:void(0)"><label class="shanghaibank" for="shanghaibank"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_kuaiqian" id="beijing" value="BOB"/><a href="javascript:void(0)"><label class="beijing" for="beijing"></label></a></li>

<li class="mrBk"><input type="radio" name="bank_kuaiqian" id="nongcunshangye" value="BJRCB"/><a href="javascript:void(0)"><label class="nongcunshangye" for="nongcunshangye"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_kuaiqian" id="zheshang" value="CZB"/><a href="javascript:void(0)"><label class="zheshang" for="zheshang"></label></a></li>


<li class="mrBk"><input type="radio" name="bank_kuaiqian" id="buohai" value="CBHB"/><a href="javascript:void(0)"><label class="buohai" for="buohai"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_kuaiqian" id="dongya" value="BEA"/><a href="javascript:void(0)"><label class="dongya" for="dongya"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_kuaiqian" id="hangzhou" value="HZB"/><a href="javascript:void(0)"><label class="hangzhou" for="hangzhou"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_kuaiqian" id="huaxia" value="HXB"/><a href="javascript:void(0)"><label class="huaxia" for="huaxia"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_kuaiqian" id="youzheng" value="PSBC"/><a href="javascript:void(0)"><label class="youzheng" for="youzheng"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_kuaiqian" id="shangnongshang" value="SRCB"/><a href="javascript:void(0)"><label class="shangnongshang" for="shangnongshang"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_kuaiqian" id="qitayinhang" value=""/><a href="javascript:void(0)"><label class="qitayinhang" for="qitayinhangyinhang"></label></a></li>

						</ul>
						<div class="clear"></div>
						<button class="btn_porange" onClick="pay_go_kuaiqianpay()" style="margin:20px 0 0 300px;">充&nbsp;&nbsp;值</button>
					</div>
				</div>
				<!--手机充值-神州行-中国联通-->
				<div class="rec_kuaiqian_szx rec_info" style="display: none;">
					<div class="base_info">
						<p>当前充值方式：<span class="colorfo rtype">神州行充值卡</span></p>
						<p>手机充值卡面额：
							<select id="selectRmbkuaiqianSzx" onchange="selectRmbkuaiqianSzx()">
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
						<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="45000" id="orderAmountkuaiqianSzx" disabled="true"></p>
						<div class="color999">提示：人民币和<?php echo $page_var['money_name']?>兑换比例1:<span class="ltYd"><?php echo YD_REDUCE*RMB_XNB;?></span></div>
					</div>	
					<button class="btn_porange" onClick="pay_go_kuaiqianpay()">充&nbsp;&nbsp;值</button>	
					<p class="color999" style="margin:20px 0;">请务必使用与您选择的面额相同的充值卡进行支付，否则引起的交易失败交易金额不予退还。
					<br>如：选择50元面额但使用100元卡支付，则系统认为实际支付金额为50元，
					<br>高于50元部分不予退还；选择50元面额但使用30元卡支付则系统认为支付失败， 30元不予退还。</p>
				</div>
				<!--中国联通-->
				<div class="rec_kuaiqian_zglt rec_info" style="display: none;">
					<div class="base_info">
						<p>当前充值方式：<span class="colorfo rtype">中国联通充值卡</span></p>
						<p>手机充值卡面额：
							<select id="selectRmbkuaiqianZglt" onchange="selectRmbkuaiqianZglt()">
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
						<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="45000" id="orderAmountkuaiqianZglt" disabled="true"></p>
						<div class="color999">提示：人民币和<?php echo $page_var['money_name']?>兑换比例1:<span class="ltYd"><?php echo LT_REDUCE*RMB_XNB;?></span></div>
					</div>	
					<button class="btn_porange" onClick="pay_go_kuaiqianpay()">充&nbsp;&nbsp;值</button>	
					<p class="color999" style="margin:20px 0;">请务必使用与您选择的面额相同的充值卡进行支付，否则引起的交易失败交易金额不予退还。
					<br>如：选择50元面额但使用100元卡支付，则系统认为实际支付金额为50元，
					<br>高于50元部分不予退还；选择50元面额但使用30元卡支付则系统认为支付失败， 30元不予退还。</p>
				</div>
				<!--游戏卡充值-骏网一卡通-冒泡一卡通-盛大一卡通-->
				<div class="rec_kuaiqian_jw rec_info" style="display: none;">
					<!--文字提示-->
					<div class="base_info">
						<p>当前充值方式：<span class="colorfo rtype">骏网一卡通点卡充值</span></p>
						<p>游戏充值卡面额：
							<select id="selectRmbkuaiqianJw" onchange="selectRmbkuaiqianJw()">
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
						<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="4250" id="orderAmountkuaiqianJw" disabled="true"></p>
						<div class="color999">提示：人民币和<?php echo $page_var['money_name']?>兑换比例1:<span class="gscale"><?php echo JUN_REDUCE*RMB_XNB;?></span></div>
					</div>	
					<button class="btn_porange" onClick="pay_go_kuaiqianpay()">充&nbsp;&nbsp;值</button>	
					<p class="color999" style="margin:20px 0;">请务必使用与您选择的面额相同的充值卡进行支付，否则引起的交易失败交易金额不予退还。
					<br>如：选择50元面额但使用100元卡支付，则系统认为实际支付金额为50元，
					<br>高于50元部分不予退还；选择50元面额但使用30元卡支付则系统认为支付失败， 30元不予退还。</p>			
				</div>

<script type="text/javascript">
$(function(){
	selectRmbkuaiqian();
	selectRmbkuaiqianSzx();
	selectRmbkuaiqianZglt();
	selectRmbkuaiqianJw();
	$('#zhifupalRmbex_kuaiqianpay').live('input propertychange',function(){
		var bankid=$('input[name=zhifutype_kuaiqianpay]:checked').val();
		if(bankid==0){
			return false;
		}
		var vzp = $('#zhifupalRmbex_kuaiqianpay').val();
		var rzp = /^[0-9]*[1-9][0-9]*$/;
		if(!rzp.test(vzp)){
			$(this).val(0);
			$('#orderAmount_kuaiqianpay').val(0);
			Main.alert('请输入正整数');
		}else{
			$('#orderAmount_kuaiqianpay').val(RMB_XNB*vzp);
		}
	});
});
function selectRmbkuaiqian(){
	var bankid=$('input[name=zhifutype_kuaiqianpay]:checked').val();
	if(bankid==1){
		return false;
	}
	$('#orderAmount_kuaiqianpay').val(RMB_XNB*$('#selectRmbkuaiqian').val());
}
function selectRmbkuaiqianSzx(){
	$('#orderAmountkuaiqianSzx').val(RMB_XNB*$('#selectRmbkuaiqianSzx').val()*YD_REDUCE);
}
function selectRmbkuaiqianZglt(){
	$('#orderAmountkuaiqianZglt').val(RMB_XNB*$('#selectRmbkuaiqianZglt').val()*LT_REDUCE);
}
function selectRmbkuaiqianJw(){
	$('#orderAmountkuaiqianJw').val(RMB_XNB*$('#selectRmbkuaiqianJw').val()*JUN_REDUCE);
}
function pay_go_kuaiqianpay(){
	if(!islogin()){
		return false;
	}
	var paychannel=1;
	var url="/apis/kuaiqian/req_other.php";
	if(pgname=='rec_kuaiqian'){//银行充值
		var bankid=$('input[name=zhifutype_kuaiqianpay]:checked').val();
		if(bankid=="0"){//请选择充值金额
			var cash = $("#selectRmbkuaiqian").val();
		}else if(bankid=="1"){
			var cash = $("#zhifupalRmbex_kuaiqianpay").val();
		}
		
		var bankid=$('input[name=bank_kuaiqian]:checked').val();
		if(bankid=="" || bankid==undefined){
			//Main.alert('请选择银行');
			bankid="";
			//return;
		}
		url="/apis/kuaiqian/req.php";
		paychannel=11;
	}else if(pgname=='rec_kuaiqian_szx'){//神州行充值卡
		var cash = $("#selectRmbkuaiqianSzx").val();
		paychannel=12;
	}else if(pgname=='rec_kuaiqian_zglt'){//中国联通充值卡
		var cash = $("#selectRmbkuaiqianZglt").val();
		paychannel=13;
	}else if(pgname=='rec_kuaiqian_jw'){//骏网一卡通
		var cash = $("#selectRmbkuaiqianJw").val();
		paychannel=14;
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
	url+="?chooseuserid="+chooseuserid+"&p3_Amt="+cash+"&paychannel="+paychannel+"&pd_FrpId="+bankid+"&agentid="+agentid+"&showuserid="+showuserid;
	goPayPage(url);
}
</script>