<?php //支付宝?>
<div class="rec_5iu_alipay rec_info" style="display: none;">
	<div class="base_info">
		<p class="p1" style="margin-top:10px;">当前充值方式：<span class="colorfo">支付宝充值</span></p>
		<p>请选择充值金额：

				<input type="radio" name="zhifutype_alipay" value="0" checked="checked" onchange="selectRmbalipay()">
				<select id="selectRmbalipay" onchange="selectRmbalipay()">
					<option value="10" selected="selected">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
					<option value="50">50</option>
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
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="zhifutype_alipay" value="1" onchange="$('#zhifupalRmbex_alipay').blur()">&nbsp;其他金额&nbsp;&nbsp;<input type="text" id="zhifupalRmbex_alipay" class="intBd input180 " style="width:90px">元
			</p>
			<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="0" id="orderAmount_alipay" disabled="true"></p>
			<div class="color999">兑换比例：人民币和<?php echo $page_var['money_name']?>兑换比例1:<?php echo RMB_XNB?></div>
			<button class="btn_porange" onClick="pay_go_alipay()" style="margin:20px 0 0 300px;">充&nbsp;&nbsp;值</button>	
	</div>
</div>
<script type="text/javascript">
$(function(){
	selectRmbalipay();
	$('#zhifupalRmbex_alipay').live('input propertychange',function(){
		var bankid=$('input[name=zhifutype_alipay]:checked').val();
		if(bankid==0){
			return false;
		}
		var vzp = $('#zhifupalRmbex_alipay').val();
		var rzp = /^[0-9]*[1-9][0-9]*$/;
		if(!rzp.test(vzp)){
			$(this).val(0);
			$('#orderAmount_alipay').val(0);
			Main.alert('请输入正整数');
		}else{
			$('#orderAmount_alipay').val(RMB_XNB*vzp);
		}
	});
});
function selectRmbalipay(){
	var bankid=$('input[name=zhifutype_alipay]:checked').val();
	if(bankid==1){
		return false;
	}
	$('#orderAmount_alipay').val(RMB_XNB*$('#selectRmbalipay').val());
}
function pay_go_alipay(){
	if(!islogin()){
		return false;
	}
	var bankid=$('input[name=zhifutype_alipay]:checked').val();
	if(bankid=="0"){//请选择充值金额
		var cash = $("#selectRmbalipay").val();
	}else if(bankid=="1"){
		var cash = $("#zhifupalRmbex_alipay").val();
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
	var url="/apis/5iu/post4.php";
	url+="?chooseuserid="+chooseuserid+"&p3_Amt="+cash+"&paychannel=2&agentid="+agentid+"&showuserid="+showuserid;
	goPayPage(url);
}
</script>
<?php //5iu ips网上银行?>
				<div class="rec_5iu_ips rec_info" style="display: none;">
					<!--文字提示-->
					<style type="text/css">.base_info input{vertical-align: middle;}</style>
					<div class="base_info" style="height:210px; border-bottom:1px dashed #eee;">
						<p>当前充值方式：<span class="colorfo">IPS网银</span>（需开通网上银行或信用卡）</p>
						<p>请选择充值金额：
							<input type="radio" name="chargtype_5iu_ipspay" value="0" checked="checked" onchange="selectRmb5iuipspay();">
							<select id="selectRmb5iuipspay" onchange="selectRmb5iuipspay();">
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
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="chargtype_5iu_ipspay" value="1" onchange="$('#zhifupalRmbex_5iuipspay').blur()">&nbsp;其他金额&nbsp;&nbsp;<input type="text" id="zhifupalRmbex_5iuipspay" class="intBd input180 " style="width:90px">元
						</p>
						<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="0" id="orderAmount_5iuipspay" disabled="true"></p>
						<div class="color999">兑换比例：人民币和<?php echo $page_var['money_name']?>兑换比例1:<?php echo RMB_XNB?></div>
					</div>
					<!--选择银行-->
					<div class="choose_bank">
						<p style="">支付银行：</p>
						<ul id="bankName_5iuips" style="">
<li><input type="radio" name="bank_5iuips" id="zhongguo" value="00083"/><a href="javascript:void(0)"><label class="zhongguo" for="zhongguo"></label></a></li>
<li><input type="radio" name="bank_5iuips" id="gongshang" value="00018"/><a href="javascript:void(0)"><label  class="gongshang" for="gongshang"></label></a></li>
<li><input type="radio" name="bank_5iuips" id="zhaohang" value="00027"/><a href="javascript:void(0)"><label class="zhaohang" for="zhaohang"></label></a></li>
<li><input type="radio" name="bank_5iuips" id="nongye" value="00017"/><a href="javascript:void(0)"><label class="nongye" for="nongye"></label></a></li>
<li><input type="radio" name="bank_5iuips" id="jianshe" value="00003"/><a href="javascript:void(0)"><label class="jianshe" for="jianshe"></label></a></li>
<li><input type="radio" name="bank_5iuips" id="jiaotong" value="00005"/><a href="javascript:void(0)"><label class="jiaotong" for="jiaotong"></label></a></li>
<li><input type="radio" name="bank_5iuips" id="xingye" value="00016"/><a href="javascript:void(0)"><label class="xingye" for="xingye"></label></a></li>
<li><input type="radio" name="bank_5iuips" id="minsheng" value="00013"/><a href="javascript:void(0)"><label class="minsheng" for="minsheng"></label></a></li>
<li><input type="radio" name="bank_5iuips" id="guangda" value="00057"/><a href="javascript:void(0)"><label class="guangda" for="guangda"></label></a></li>
<li><input type="radio" name="bank_5iuips" id="pingan" value="00087"/><a href="javascript:void(0)"><label class="pingan" for="pingan"></label></a></li>
<li><p><a style="color:#ff6c00; text-decoration:underline" href="javascript:;" onclick="$(this).parent().parent().hide();$('#bankName_5iuips .mrBk').show();return false;">更多银行</a></p></li>	
<li class="mrBk"><input type="radio" name="bank_5iuips" id="ningbo" value="00206"/><a href="javascript:void(0)"><label class="ningbo" for="ningbo"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_5iuips" id="zhongxin" value="00092"/><a href="javascript:void(0)"><label class="zhongxin" for="zhongxin"></label></a></li>
<!--li class="mrBk"><input type="radio" name="bank_5iuips" id="shenfa" value="00023"/><a href="javascript:void(0)"><label class="shenfa" for="shenfa"></label></a></li-->
<li class="mrBk"><input type="radio" name="bank_5iuips" id="guangfa" value="00052"/><a href="javascript:void(0)"><label class="guangfa" for="guangfa"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_5iuips" id="shanghaibank" value="00084"/><a href="javascript:void(0)"><label class="shanghaibank" for="shanghaibank"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_5iuips" id="beijing" value="00050"/><a href="javascript:void(0)"><label class="beijing" for="beijing"></label></a></li>
<!--li class="mrBk"><input type="radio" name="bank_5iuips" id="shangpufa" value="SPDB-NET-B2C"/><a href="javascript:void(0)"><label class="shangpufa" for="shangpufa"></label></a></li-->
<li class="mrBk"><input type="radio" name="bank_5iuips" id="nongcunshangye" value="00056"/><a href="javascript:void(0)"><label class="nongcunshangye" for="nongcunshangye"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_5iuips" id="zheshang" value="00086"/><a href="javascript:void(0)"><label class="zheshang" for="zheshang"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_5iuips" id="nanjing" value="00055"/><a href="javascript:void(0)"><label class="nanjing" for="nanjing"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_5iuips" id="hebei" value="00149"/><a href="javascript:void(0)"><label class="hebei" for="hebei"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_5iuips" id="buohai" value="00095"/><a href="javascript:void(0)"><label class="buohai" for="buohai"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_5iuips" id="dongya" value="00096"/><a href="javascript:void(0)"><label class="dongya" for="dongya"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_5iuips" id="hangzhou" value="00081"/><a href="javascript:void(0)"><label class="hangzhou" for="hangzhou"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_5iuips" id="huaxia" value="00041"/><a href="javascript:void(0)"><label class="huaxia" for="huaxia"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_5iuips" id="youzheng" value="00051"/><a href="javascript:void(0)"><label class="youzheng" for="youzheng"></label></a></li>
<!--li class="mrBk"><input type="radio" name="bank_5iuips" id="shangnongshang" value="00030"/><a href="javascript:void(0)"><label class="shangnongshang" for="shangnongshang"></label></a></li>
<li class="mrBk"><input type="radio" name="bank_5iuips" id="nanyanbank" value="NCBBANK-NET-B2C"/><a href="javascript:void(0)"><label class="nanyanbank" for="nanyanbank"></label></a></li-->
						</ul>
						<div class="clear"></div>
						<button class="btn_porange" onClick="pay_go_5iuipspay()" style="margin:20px 0 0 300px;">充&nbsp;&nbsp;值</button>
					</div>
				</div>
				<?php //神州行充值卡?>
				<div class="rec_5iu_ips_szx rec_info" style="display: none;">
					<div class="base_info">
						<p>当前充值方式：<span class="colorfo rtype">神州行充值卡</span></p>
						<p>手机充值卡面额：
							<select id="selectRmb5iuipsSzx" onchange="selectRmb5iuipsSzx()">
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
						<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="45000" id="orderAmount5iuipsSzx" disabled="true"></p>
						<div class="color999">提示：人民币和<?php echo $page_var['money_name']?>兑换比例1:<span class="ltYd"><?php echo YD_REDUCE*RMB_XNB;?></span></div>
					</div>	
					<button class="btn_porange" onClick="pay_go_5iuipspay()">充&nbsp;&nbsp;值</button>	
					<p class="color999" style="margin:20px 0;">请务必使用与您选择的面额相同的充值卡进行支付，否则引起的交易失败交易金额不予退还。
					<br>如：选择50元面额但使用100元卡支付，则系统认为实际支付金额为50元，
					<br>高于50元部分不予退还；选择50元面额但使用30元卡支付则系统认为支付失败， 30元不予退还。</p>
				</div>
				<?php //中国联通?>
				<div class="rec_5iu_ips_zglt rec_info" style="display: none;">
					<div class="base_info">
						<p>当前充值方式：<span class="colorfo rtype">中国联通充值卡</span></p>
						<p>手机充值卡面额：
							<select id="selectRmb5iuipsZglt" onchange="selectRmb5iuipsZglt()">
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
						<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="45000" id="orderAmount5iuipsZglt" disabled="true"></p>
						<div class="color999">提示：人民币和<?php echo $page_var['money_name']?>兑换比例1:<span class="ltYd"><?php echo LT_REDUCE*RMB_XNB;?></span></div>
					</div>	
					<button class="btn_porange" onClick="pay_go_5iuipspay()">充&nbsp;&nbsp;值</button>	
					<p class="color999" style="margin:20px 0;">请务必使用与您选择的面额相同的充值卡进行支付，否则引起的交易失败交易金额不予退还。
					<br>如：选择50元面额但使用100元卡支付，则系统认为实际支付金额为50元，
					<br>高于50元部分不予退还；选择50元面额但使用30元卡支付则系统认为支付失败， 30元不予退还。</p>
				</div>
				<?php //电信储值卡?>
				<div class="rec_5iu_ips_dx rec_info" style="display: none;">
					<!--文字提示-->
					<div class="base_info">
						<p>当前充值方式：<span class="colorfo rtype">电信储值卡</span></p>
						<p>充值卡面额：
							<select id="selectRmb5iuipsDx" onchange="selectRmb5iuipsDx()">
								<option value="20">20</option>
								<option value="30">30</option>
								<option value="50" selected="selected">50</option>
								<option value="100">100</option>
							</select>&nbsp;元
							<span style="color:red; font-size:12px;">&nbsp;&nbsp;&nbsp;&nbsp;请确保您持有的充值卡面额与选择的充值面额相同，以免造成损失。</span>
						</p>
						<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="4250" id="orderAmount5iuipsDx" disabled="true"></p>
						<div class="color999">提示：人民币和<?php echo $page_var['money_name']?>兑换比例1:<span class="gscale"><?php echo JUN_REDUCE*RMB_XNB;?></span></div>
					</div>	
					<button class="btn_porange" onClick="pay_go_5iuipspay()">充&nbsp;&nbsp;值</button>	
					<p class="color999" style="margin:20px 0;">请务必使用与您选择的面额相同的充值卡进行支付，否则引起的交易失败交易金额不予退还。
					<br>如：选择50元面额但使用100元卡支付，则系统认为实际支付金额为50元，
					<br>高于50元部分不予退还；选择50元面额但使用30元卡支付则系统认为支付失败， 30元不予退还。</p>			
				</div>
<script type="text/javascript">
$(function(){
	selectRmb5iuipspay();
	$('#zhifupalRmbex_5iuipspay').live('input propertychange',function(){
		var vzp = $('#zhifupalRmbex_5iuipspay').val();
		var rzp = /^[0-9]*[1-9][0-9]*$/;
		if(!rzp.test(vzp)){
			$(this).val(0);
			$('#orderAmount_5iuipspay').val(0);
			Main.alert('请输入正整数');
		}else{
			$('#orderAmount_5iuipspay').val(RMB_XNB*vzp);
		}
	});
});
function selectRmb5iuipspay(){
	$('#orderAmount_5iuipspay').val(RMB_XNB*$('#selectRmb5iuipspay').val());
}
function selectRmb5iuipsSzx(){
	$('#orderAmount5iuipsSzx').val(RMB_XNB*$('#selectRmb5iuipsSzx').val()*YD_REDUCE);
}
function selectRmb5iuipsZglt(){
	$('#orderAmount5iuipsZglt').val(RMB_XNB*$('#selectRmb5iuipsZglt').val()*LT_REDUCE);
}
function selectRmb5iuipsDx(){
	$('#orderAmount5iuipsDx').val(RMB_XNB*$('#selectRmb5iuipsDx').val()*JUN_REDUCE);
}
function pay_go_5iuipspay(){
	if(!islogin()){
		return false;
	}
	var paychannel=8;
	if(pgname=='rec_5iu_ips'){//银行充值
		var type=$('input[name=chargtype_5iu_ipspay]:checked').val();
		if(type=="0"){//请选择充值金额
			var cash = $("#selectRmb5iuipspay").val();
		}else if(type=="1"){
			var cash = $("#zhifupalRmbex_5iuipspay").val();
		}
		var bankid=$('input[name=bank_5iuips]:checked').val();
		if(bankid=="" || bankid==undefined){
			Main.alert('请选择银行');
			return;
		}
	}else if(pgname=='rec_5iu_ips_szx'){
		var cash = $("#selectRmb5iuipsSzx").val();
		paychannel=17;
		bankid="00077";
	}else if(pgname=='rec_5iu_ips_zglt'){
		var cash = $("#selectRmb5iuipsZglt").val();
		paychannel=18;
		bankid="10016";
	}else if(pgname=='rec_5iu_ips_dx'){
		var cash = $("#selectRmb5iuipsDx").val();
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
	var url="/apis/5iu/post4.php";
	url+="?chooseuserid="+chooseuserid+"&p3_Amt="+cash+"&paychannel="+paychannel+"&agentid="+agentid+"&showuserid="+showuserid+"&pd_FrpId="+bankid;
	goPayPage(url);
}
</script>