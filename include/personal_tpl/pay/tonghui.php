<?php //支付宝?>
<div class="rec_tonhui rec_info" style="display: none;">
		<style type="text/css">.base_info input{vertical-align: middle;}</style>
		<div class="base_info" style="height:210px; border-bottom:1px dashed #eee;">
			<p>当前充值方式：<span class="colorfo">网银</span>（需开通网上银行或信用卡）</p>
			<p>请选择充值金额：
				<input type="radio" name="chargtype_tonghui" value="0" checked="checked" onchange="selectRmbtonghui();">
				<select id="selectRmbtonghui" onchange="selectRmbtonghui();">
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
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="chargtype_tonghui" value="1" onchange="$('#zhifupalRmbex_tonghui').blur()">&nbsp;其他金额&nbsp;&nbsp;<input type="text" id="zhifupalRmbex_tonghui" class="intBd input180 " style="width:90px">元
			</p>
			<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="0" id="orderAmount_tonghui" disabled="true"></p>
			<div class="color999">兑换比例：人民币和<?php echo $page_var['money_name']?>兑换比例1:<?php echo RMB_XNB?></div>
		</div>
		<!--选择银行-->
		<div class="choose_bank">
			<p>支付银行：</p>
			<ul id="bankName">
<li><input type="radio" name="bank_tonghui" id="nongye" value="ABC"/><a href="javascript:void(0)"><label class="nongye" for="nongye"></label></a></li>
<li><input type="radio" name="bank_tonghui" id="gongshang" value="ICBC"/><a href="javascript:void(0)"><label  class="gongshang" for="gongshang"></label></a></li>
<li><input type="radio" name="bank_tonghui" id="jianshe" value="CCB"/><a href="javascript:void(0)"><label class="jianshe" for="jianshe"></label></a></li>
<li><input type="radio" name="bank_tonghui" id="youzheng" value="PSBC"/><a href="javascript:void(0)"><label class="youzheng" for="youzheng"></label></a></li>
<li><input type="radio" name="bank_tonghui" id="zhongguo" value="BOC"/><a href="javascript:void(0)"><label class="zhongguo" for="zhongguo"></label></a></li>
<li><input type="radio" name="bank_tonghui" id="zhaohang" value="CMBC"/><a href="javascript:void(0)"><label class="zhaohang" for="zhaohang"></label></a></li>
<li><input type="radio" name="bank_tonghui" id="jiaotong" value="BOCOM"/><a href="javascript:void(0)"><label class="jiaotong" for="jiaotong"></label></a></li>
<li><input type="radio" name="bank_tonghui" id="shangpufa" value="SPDB"/><a href="javascript:void(0)"><label class="shangpufa" for="shangpufa"></label></a></li>
<li><input type="radio" name="bank_tonghui" id="guangda" value="CEBBANK"/><a href="javascript:void(0)"><label class="guangda" for="guangda"></label></a></li>
<li><input type="radio" name="bank_tonghui" id="zhongxin" value="ECITIC"/><a href="javascript:void(0)"><label class="zhongxin" for="zhongxin"></label></a></li>
<li><input type="radio" name="bank_tonghui" id="pingan" value="PINGAN"/><a href="javascript:void(0)"><label class="pingan" for="pingan"></label></a></li>
<li><input type="radio" name="bank_tonghui" id="minsheng" value="CMBCS"/><a href="javascript:void(0)"><label class="minsheng" for="minsheng"></label></a></li>
<li><input type="radio" name="bank_tonghui" id="huaxia" value="HXB"/><a href="javascript:void(0)"><label class="huaxia" for="huaxia"></label></a></li>
<li><input type="radio" name="bank_tonghui" id="guangfa" value="CGB"/><a href="javascript:void(0)"><label class="guangfa" for="guangfa"></label></a></li>
			</ul>
			<div class="clear"></div>
			<button class="btn_porange" onClick="pay_go_tonghui()" style="margin:20px 0 0 300px;">充&nbsp;&nbsp;值</button>	
		</div>		
</div>
<script type="text/javascript">
$(function(){
	selectRmbtonghui();
	$('#zhifupalRmbex_tonghui').live('input propertychange',function(){
		var bankid=$('input[name=chargtype_tonghui]:checked').val();
		if(bankid==0){
			return false;
		}
		var vzp = $('#zhifupalRmbex_tonghui').val();
		var rzp = /^[0-9]*[1-9][0-9]*$/;
		if(!rzp.test(vzp)){
			$(this).val(0);
			$('#orderAmount_tonghui').val(0);
			Main.alert('请输入正整数');
		}else{
			$('#orderAmount_tonghui').val(RMB_XNB*vzp);
		}
	});
});
function selectRmbtonghui(){
	var bankid=$('input[name=chargtype_tonghui]:checked').val();
	if(bankid==1){
		return false;
	}
	$('#orderAmount_tonghui').val(RMB_XNB*$('#selectRmbtonghui').val());
}
function pay_go_tonghui(){
	if(!islogin()){
		return false;
	}
	var bankid=$('input[name=chargtype_tonghui]:checked').val();
	if(bankid=="0"){//请选择充值金额
		var cash = $("#selectRmbtonghui").val();
	}else if(bankid=="1"){
		var cash = $("#zhifupalRmbex_tonghui").val();
	}
	var bankid=$('input[name=bank_tonghui]:checked').val();
	if(bankid=="" || bankid==undefined){
		Main.alert('请选择银行');
		return;
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
		
	var url="/apis/tonghui/paySubmit.php";
	url+="?chooseuserid="+chooseuserid+"&p3_Amt="+cash+"&paychannel=9&pd_FrpId="+bankid+"&agentid="+agentid+"&showuserid="+showuserid;
	goPayPage(url);
}
</script>