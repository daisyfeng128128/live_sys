<?php //微信充值?>
<div class="rec_wxpay rec_info" style="display: none;">
	<div class="base_info">
		<p class="p1" style="margin-top:10px;">当前充值方式：<span class="colorfo">微信充值</span></p>
		<p>请选择充值金额：

				<input type="radio" name="zhifutype_wxpay" value="0" checked="checked" onchange="selectRmbwxpay()">
				<select id="selectRmbwxpay" onchange="selectRmbwxpay()">
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
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="zhifutype_wxpay" value="1" onchange="$('#zhifupalRmbex_wxpay').blur()">&nbsp;其他金额&nbsp;&nbsp;<input type="text" id="zhifupalRmbex_wxpay" class="intBd input180 " style="width:90px">元
			</p>
			<p>可得到<?php echo $page_var['money_name']?>：<input type="text" class="colorfo input_special" value="0" id="orderAmount_wxpay" disabled="true"></p>
			<div class="color999">兑换比例：人民币和<?php echo $page_var['money_name']?>兑换比例1:<?php echo RMB_XNB?></div>
			<button class="btn_porange" onClick="pay_go_wxpay()" style="margin:20px 0 0 300px;">充&nbsp;&nbsp;值</button>	
		</div>			
</div>
<script type="text/javascript">
$(function(){
	selectRmbwxpay();
	$('#zhifupalRmbex_wxpay').live('input propertychange',function(){
		var bankid=$('input[name=zhifutype_wxpay]:checked').val();
		if(bankid==0){
			return false;
		}
		var vzp = $('#zhifupalRmbex_wxpay').val();
		var rzp = /^[0-9]*[1-9][0-9]*$/;
		if(!rzp.test(vzp)){
			$(this).val(0);
			$('#orderAmount_wxpay').val(0);
			Main.alert('请输入正整数');
		}else{
			$('#orderAmount_wxpay').val(RMB_XNB*vzp);
		}
	});
});
function selectRmbwxpay(){
	var bankid=$('input[name=zhifutype_wxpay]:checked').val();
	if(bankid==1){
		return false;
	}
	$('#orderAmount_wxpay').val(RMB_XNB*$('#selectRmbwxpay').val());
}
function pay_go_wxpay(){
	if(!islogin()){
		return false;
	}
	var bankid=$('input[name=zhifutype_wxpay]:checked').val();
	if(bankid=="0"){//请选择充值金额
		var cash = $("#selectRmbwxpay").val();
	}else if(bankid=="1"){
		var cash = $("#zhifupalRmbex_wxpay").val();
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
	var url="/apis/Wxpay/example51543/native.php";
	url+="?chooseuserid="+chooseuserid+"&p3_Amt="+cash+"&paychannel=10&agentid="+agentid+"&showuserid="+showuserid;
	goPayPage(url);
}
</script>