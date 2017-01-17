<div class="details">
	<div class="wrapper">
		<div class="data_content ">
			<p class="apply">入驻申请</p>
			<div class="basic">
				<form action="/ajax/applysigning.php" method="post" name="infoform" id="infoform" onsubmit="return checkform1();">
					<h3>
						基本资料(<i>1</i>/3)
					</h3>
					<input type="hidden" name="step" id="step" value="infoform">
					<div class="input name">
						<label class="lable">姓名</label> <input type="text" class="toLeft" name="truename" id="truename" required oninvalid="setCustomValidity('必须填写！');"
							oninput="setCustomValidity('')" />
					</div>
					<div class="sex">
						<label class="lable">性别</label> <input type="radio" class="toLeft" name="sex" value="1" checked />男 <input type="radio" name="sex" value="0" />女
					</div>
					<div class="input tel">
						<label class="lable">手机号</label> <input type="text" class="toLeft phone_num" name="phone" id="phone" maxlength="11" required /> <span class="info_num">请输入您的手机号</span>
						<span class="ok">√</span> <span class="err">请再核实您的号码</span>
					</div>
					<div class="input qq">
						<label class="lable">QQ</label> <input type="text" class="toLeft qq_num" name="qq" id="qq" maxlength="11" required /> <span class="ok">√</span> <span
							class="err">请再核实您的QQ号码</span>
					</div>
					<div class="area">
						<label class="lable">地区</label> <select name="live_province" class="toLeft" id="live_province" required="required"></select> <select name="live_city"
							id="live_city" required="required"></select>
					</div>
					<script language="javascript" src="/js/PCASClass.js"></script>
					<script>
						new PCAS("live_province", "live_city", "", "");
					</script>
					<div class="input video">
						<label class="lable">个人视频</label> <input type="url" class="toLeft" value="http://" name="videoUrl" required />
					</div>
					<p class="check">
						<input type="checkbox" class="toLeft" name="accept" id="accept">蝌蚪平台合作协议 <span class="err isacpt">需要同意平台直播协议</span>
					</p>
					<div class="data_next">
						<input type="submit" value="下一步" />
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
