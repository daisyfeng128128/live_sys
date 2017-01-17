<div class="data_content ">
	<p class="apply">入驻申请</p>
	<div class="photo changelogo">
		<h3>
			认证照片(<i>3</i>/3)
		</h3>
		<div class="clearFix">
			<div class="pho_l fl">
				<div class="l_content">
					<div class="clearFix">
						<div class="pho_chose fl">
							<input type="file" id="file0" name="logoImage" />
						</div>
						<span class="fl support">支持JPG，PNG图片大小建议不要超过2M</span>
					</div>
					<div class="clearFix">
						<div class="big_pho fl">
							<img class="img1" src="/img/95559.png" />
						</div>
						<!--<span class="big_support fl">800*600像素以上，大小不超过2M</span>-->
					</div>
					<p class="pho_tip">此图片用在首页展示大图显示</p>
					<div class="clearFix">
						<div class="portrait fl">
							<img class="img2" src="/img/95559.png">
						</div>
						<span class="use fl">头像使用(自动裁剪)</span>
					</div>
					<div class="div2" styel="width:0;height:0;overflow:hidden;">
						<img class="img3" />
					</div>
					<div class="step">
						<input type="submit" value="上一步" /> <input class="next btn2" type="submit" value="下一步" />
					</div>
				</div>

			</div>
			<div class="pho_r fr">
				<div class="r_content">
					<h4>照片审核要求</h4>
					<ul class="pho_list clearFix">
						<li class="fl"><img src="img/demo1.png" /></li>
						<li class="fl"><img src="img/demo2.png" /></li>
						<li class="fl"><img src="img/demo3.png" /></li>
						<li class="fl"><img src="img/demo4.png" /></li>
					</ul>
					<div class="require">
						<p><span>1</span>必须使用本人照片800*600(宽/高)</p>
						<p><span>2</span>照片人物至少半身二分之一以上入镜</p>
						<p><span>3</span>背景尽量使用艺术照，突出人物表情，艺术照片最佳</p>
						<p><span>4</span>图片不许拼接，不许露点
						<p><span>5</span>尽量使用化妆上镜照，注意远近景适中</p>
						<p><span>6</span>上传拖欠要填满上传框，四边不允许出现白边和黑边</p>
					</div>
				</div>

			</div>
		</div>
	</div>
</div>
<script>
	$(function() {
		var upload = function() {
			var $aaa;
			var upx;
			var upy;
			var upw;
			var uph;
			var upsize;
			var upimage;
			var upimage2;
			var upimage3;
			var toup = function() {
				var updatePreview = function(data) { //move
					var bounds = this.getBounds();
					boundx = bounds[0];
					boundy = bounds[1];
					var xsize = $('.changelogo .portrait').width();
					var ysize = $('.changelogo .portrait').height();
					var rx = xsize / data.w;
					var ry = ysize / data.h;
					$(".img2").css({
						width : Math.round(rx * boundx) + 'px',
						height : Math.round(ry * boundy) + 'px',
						marginLeft : '-' + Math.round(rx * data.x) + 'px',
						marginTop : '-' + Math.round(ry * data.y) + 'px'
					});
				};
				var updataCoords = function(data) {
					upx = data.x;
					upy = data.y;
					upw = data.w;
					uph = data.h;
				};

				$('.img1').Jcrop({
					bgOpacity : 0.267,
					aspectRatio : 0.654,
					onChange : updatePreview,
					onSelect : updataCoords,
					allowSelect : false
				}, function() {
					$aaa = this;
					var thisx = $('.changelogo .img1').width();
					var thisy = $('.changelogo .img1').height();
					if (thisx <= 268 || thisy <= 408) {
						this.setSelect([ 0, 0, 268, 408 ]);
						var thistell = this.tellSelect();
						this.setSelect([ thisx / 2 - thistell.w / 2, thisy / 2 - thistell.h / 2, thisx / 2 + thistell.w / 2, thisy / 2 + thistell.h / 2 ])
					} else {
						this.setSelect([ thisx / 2 - 75, thisy / 2 - 75, thisx / 2 + 75, thisy / 2 + 75 ])
					}
					$(".jcrop-holder").css({
						position : "absolute",
						left : 0,
						right : 0,
						top : 0,
						bottom : 0,
						margin : "auto"
					});
				});
			};
			$(".changelogo .changelogoout,.changelogo .btn3").click(function() {
				$(".zhezhao").hide();
				$(".changelogo").hide();
				if ($aaa != undefined) {
					$aaa.destroy();
					upimage = null;
					$('.changelogo .img1').attr({
						"src" : "/img/95559.png"
					});
					$('.changelogo .img2').attr({
						"src" : "/img/95559.png"
					});
					$('.changelogo .img1').css({
						width : "auto",
						height : "auto"
					});
					$('.changelogo .img2').css({
						width : "auto",
						height : "auto",
						marginLeft : 0,
						marginTop : 0
					});
				}
			}); //返回
			$(".changelogo .btn2").click(
					function() {
						if (upimage != null && upimage != undefined) {
							upsize = $('.changelogo .img3').width() / $('.changelogo .img1').width();
							oldwidth = $('.changelogo .img3').width();
							oldheight = $('.changelogo .img3').height();
							$.ajax({
								type : "POST",
								async : false,
								url : '/apis/uploadLittlePhoto.php',
								data : "srcImage=" + upimage2 + "&startX=" + Math.ceil(upx * upsize) + "&startY=" + Math.ceil(upy * upsize) + "&newWidth="
										+ Math.ceil(upw * upsize) + "&newHeight=" + Math.ceil(uph * upsize) + "&oldwidth=" + oldwidth + "&newHeight=" + oldheight,
								cache : false
								}).success(function(re) {
									data = jQuery.parseJSON(re);
									if (data.code == 200) {
										window.location.href = "/sign.php?step=4"
									} else {
										alert(data.message);
									}
							}).error(function(jqXHR, textStatus, errorThrown) {
								console.log(11)
							});
						} else {
							$.threesecond("请选择图片")
						}
						$('.photo .img1').attr({
							"src" : "/img/95559.png"
						});
						$('.photo .img2').attr({
							"src" : "/img/95559.png"
						});
						$('.photo .img3').attr({
							"src" : "/img/95559.png"
						});
						$('.photo .img1').css({
							width : "auto",
							height : "auto"
						});
						$('.photo .img2').css({
							width : "auto",
							height : "auto",
							marginLeft : 0,
							marginTop : 0
						});
						$('.photo .img3').css({
							width : "auto",
							height : "auto"
						});
					});// 保存
			$("#file0").uploadify({
				width : '118',
				height : '40',
				swf : '/uploadify.swf',
				multi : false,
				fileSizeLimit : 4096,
				fileTypeExts : '*.gif; *.jpg; *.png; *.jpeg;',
				buttonText : '上传图片',
				buttonClass : 'btn1',
				uploader : '/apis/uploadPhoto.php',
				onSelectError : function(file, errorCode, errorMsg) {
					switch (errorCode) {
					case -110:
						$(this)[0].queueData.errorMsg = "文件 [" + file.name + "] 大小超出限制的2m大小！";
						break;
					case -130:
						$(this)[0].queueData.errorMsg = "文件 [" + file.name + "] 类型不正确！";
						break;
					}
				},
				onUploadSuccess : function(e, response) {
					var data = JSON.parse(response);
					upimage = data.ht1;
					upimage2 = data.ht1;
					$(".photo .img1").attr({
						"src" : upimage
					});
					$(".photo .img2").attr({
						"src" : upimage
					});
					$(".photo .img3").attr({
						"src" : upimage
					});
					if ($aaa != undefined) {
						$aaa.destroy();
						$('.photo .img1').css({
							width : "auto",
							height : "auto"
						});
						$('.photo .img2').css({
							width : "auto",
							height : "auto",
							marginLeft : 0,
							marginTop : 0
						});
					}
					toup();
				}
			});
		}
		upload();
	})
</script>