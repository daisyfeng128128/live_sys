<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="max-age=0" />
<meta name="apple-touch-fullscreen" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="viewport" content="width=device-width, initial-scale=1.0,  minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<title>应用下载</title>
<link href="../css/download_app_public_wap.css" rel="stylesheet" type="text/css" />
</head>
<style>

</style>

<body>
<div class="header"></div>
<div id="content">
	<div class="gallery" id="gallery">
		<ul class="galleryinner" >
			<li>
				<div class="galleryimage">
				    <img src="../images/down_img1.png" >
				</div>
			</li>
			<li>
				<div class="galleryimage">
					<img src="../images/down_img2.png" >
				</div>
			</li>
			<li>
				<div class="galleryimage">
					<img src="../images/down_img3.png" >
				</div>
			</li>
		</ul>
	    <ul class="gallerydot">
	        <li class=""></li>
	        <li class=""></li>
	        <li class=""></li>
	    </ul>
	</div>
	<script type="text/javascript" src="../js/download_app/zepto.min.js"></script>
	<script type="text/javascript" src="../js/download_app/index.v1.js"></script>
	<div class="list">
		<div class="downc">
		<table cellpadding="0" cellspacing="0" align="center" >
			<tr>
				<td  class="td1"><a href="<?php echo $global_config_phone_data["android_address"];?>?<?php echo time()?>"><img src="../images/downw.png"></a></td>
				<td  class="td1"><a href="<?php echo $global_config_phone_data["ios_add_address"];?>?<?php echo time()?>"><img src="../images/IOSdown.png"></a></td>
			</tr>
			<!--tr>
				<td class="td2" valign="middle">
					软件大小：7.6MB
				</td>
				<td class="td2" valign="middle">
					软件大小：19.1MB
				</td>
			</tr-->
			<tr>
				<td class="td2" valign="middle">软件版本：<?php echo $global_config_phone_data["android_version"];?></td>
				<td class="td2" valign="middle">软件版本：<?php echo $global_config_phone_data["ios_version"];?></td>
			</tr>
			<tr>
				<td class="td2" valign="middle">系统要求：Android2.3</td>
				<td class="td2" valign="middle">系统要求：iOS 7.0</td>
			</tr>
		</table>
		</div>
		<!--<div class="info">
			<p class="title">热门主播：</p>
			<p class="content-desc pngfix"><span></span>人正在为位主播尖叫</p> 
		</div>
		<div>
			<ul id="list">
						</ul>
		</div>-->
		<div class="bottom"></div>
		<div class="footer">
			<!-- <img src="static/images/footer-coin.png"> -->
			<p><?php echo _MAIN_DOMAIN_;?> &nbsp;&nbsp;&nbsp;版权所有</p>
			<div id="totop"><img src="../images/totop.png"></div>
		</div>
	</div>
</div>

<script type="text/javascript" src="../js/download_app/jquery.js"></script>
<script type="text/javascript" src="../js/download_app/script.js"></script>
</body>
</html>
