<div class="data_content ">
	<p class="apply">入驻申请</p>
	<div class="basic">
		<h3>
			财务信息息(<i>2</i>/3)
		</h3>
		<form action="/ajax/applysigning.php" method="post" name="financeForm" id="financeForm" enctype="multipart/form-data">


            <div class="account_place">
                <label class="lable">银行卡开户地址</label> <input class="space" type="text" name="bankCardAddress" id="bankCardAddress" required />
            </div>
			<input type="hidden" name="step" id="step" value="finance">
			<div class="bank">
				<label>开户银行</label> <select name="banktype" id="banktype">
					<option value="0">中国工商银行</option>
					<option value="1">中国农业银行</option>
					<option value="2">中国银行</option>
					<option value="3">中国建设银行</option>
					<option value="4">中国光大银行</option>
					<option value="5">中国民生银行</option>
					<option value="6">华夏银行</option>
					<option value="7">中信银行</option>
					<option value="8">恒丰银行</option>
					<option value="9">上海浦东发展银行</option>
					<option value="10">交通银行</option>
					<option value="11">浙商银行</option>
					<option value="12">兴业银行</option>
					<option value="13">深圳发展银行</option>
					<option value="14">招商银行</option>
					<option value="15">广东发展银行</option>
				</select>
			</div>
			<div class="num">
				<label class="lable">银行卡卡号</label> <input class="space" type="text" name="banknumber" id="banknumber" required />
			</div>
			<div class="id_num">
				<label class="lable">身份证号码</label> <input class="space" type="text" name="idcard" id="idcard" />
			</div>
			<div class="positive clearFix">
				<label class="lable fl">身份证正面</label> <input class="space fl space1" type="text" name="idc_zhengmian" id="idc_zhengmian" />
				<div class="id_file fl " id="id_file1" style="overflow: hidden">
					<input type="file" name="idCardP1" id="idCardP1" />
				</div>
				<p class="tip">支持JPG,PNG图片大小建议不要超过2M</p>
			</div>

			<div class="opposite clearFix">
				<label class="lable fl">身份证反面</label> <input class="space fl space2" type="text" name="idc_fanmian" id="idc_fanmian" />
				<div class="id_file fl" style="overflow: hidden">
					<input type="file" name="idCardP2" id="idCardP2" />
				</div>
				<p class="tip">支持JPG,PNG图片大小建议不要超过2M</p>
			</div>

			<div class="prev_next">
				<input type="submit" onclick="history.back()" value="上一步" /> <input class="next" type="submit" value="下一步" />
			</div>

		</form>
	</div>

</div>
<style>
.view_images {
	width: 655px;
	overflow: hidden;
	z-index: 99999;
	position: absolute;
	border-radius: 3px;
	margin: 0 auto;
	height: 466px;
	left: 0;
	top: 30%;
	right: 0;
	bottom: 0;
	text-align: center
}

.view_images img {
	max-width: 655px;
	max-height: 466px;
}

.imgmask {
	width: 100%;
	height: 100%;
	position: absolute;
	display: none;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	background-color: #0005;
	filter: Alpha(Opacity = 50);
	z-index: 20001;
	text-align: center
}

#show_img {
	display: none
}
</style>
<script>
    $('#idCardP1').uploadify({
        width: '118',
        height: '40',
        swf: '/uploadify.swf',
        multi: false,
        fileSizeLimit: 4096,
        fileTypeExts: '*.gif; *.jpg; *.png; *.jpeg;',
        buttonText: '上传图片',
        buttonClass: 'btn1',
        uploader: '/apis/common_upload.php',
        onSelectError: function (file, errorCode, errorMsg) {
            switch (errorCode) {
                case -110:
                    $(this)[0].queueData.errorMsg = "文件 [" + file.name + "] 大小超出限制的2m大小！";
                    break;
                case -130:
                    $(this)[0].queueData.errorMsg = "文件 [" + file.name + "] 类型不正确！";
                    break;
            }
        },
        onUploadSuccess: function (e, response) {
            var data =JSON.parse(response);
            console.log(data.src);
            $(".space1").val(data.src);
            $(".space1").addClass("hasImg");
        }
    });

    $('#idCardP2').uploadify({
        width: '118',
        height: '40',
        swf: '/uploadify.swf',
        multi: false,
        fileSizeLimit: 4096,
        fileTypeExts: '*.gif; *.jpg; *.png; *.jpeg;',
        buttonText: '上传图片',
        buttonClass: 'btn1',
        uploader: '/apis/common_upload.php',
        onSelectError: function (file, errorCode, errorMsg) {
            switch (errorCode) {
                case -110:
                    $(this)[0].queueData.errorMsg = "文件 [" + file.name + "] 大小超出限制的2m大小！";
                    break;
                case -130:
                    $(this)[0].queueData.errorMsg = "文件 [" + file.name + "] 类型不正确！";
                    break;
            }
        },
        onUploadSuccess: function (e, response) {
            var data =JSON.parse(response);
            console.log(data.src);
            $(".space2").val(data.src);
            $(".space2").addClass("hasImg");
        }
    });

    $("#idc_zhengmian,#idc_fanmian").on("click",function(){
        var _val=$(this).val();
        if(_val != ""){
            $(".view_images img").attr("src",_val);
            $(".imgmask").show();
            $("#show_img").show();
        }
    })
    $("div.imgmask").click(function(){
        $(".imgmask").hide();
        $("#show_img").hide();
    })
</script>