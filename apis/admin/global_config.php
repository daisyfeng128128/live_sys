<?php 
include('head.php');
$input_radio = array("guestshow");//单选按钮
$input_checkbox = array("pay_interface");//复选按钮
//$db->debug = true;
if($_POST["type"]=="save"){
	operational_log(4,"网站配置",$_REQUEST);
	$verify0_1 = array("_LUCK_IN_VALUE_","_PAY_ADD_","_BUY_NUMBER_ADD_","_CHANCE_ADD_");
	$verify_gt1 = array("_SHOWS_VALID_");
	$exclude = array("type");
	
	foreach ($_POST as $k=>$v){
		if(in_array($k,$exclude)){
			continue;
		}
		if(in_array($k,$input_checkbox)){
			$v = implode(",",$v);
		}
		/*if(in_array($k,$verify0_1)){
			$v = (float)$v;
			if(!($v>=0&&$v<1)){
				$info = "数据不正确";
				break;
			}
		}
		if(in_array($k,$verify_gt1)){
			$v = (int)$v;
			if(!($v>=1)){
				$info = "数据不正确";
				break;
			}
		}*/
		
		$one = $db->GetOne("select k from global_config where k='$k'");
		if($one){
			$sql = "UPDATE global_config SET v='$v' WHERE k='$k' limit 1";
		}else{
			$sql = "INSERT INTO `global_config` (`k` ,`v`)VALUES ('$k','$v')";
		}
		$db->Execute($sql);
	}
	//上传logo
	if(!empty($_FILES['logo']["tmp_name"])){
		$file_type = strtolower(pathinfo($_FILES['logo']['name'],PATHINFO_EXTENSION));
		if($file_type!='png' && $file_type!='gif'){
			$info = "网站LOGO上传错误,只能上传png,gif图像";
		}else{
			$uploadfile = $app_path."img/logo.png";
			include_once $app_path.'tools/phpthumb.php';
			@unlink($uploadfile);
			move_uploaded_file($_FILES['logo']['tmp_name'], $uploadfile);
		}
		@unlink($_FILES['logo']['tmp_name']);
	}
	//清空缓存
	$db->CacheExecute(1,"select * from global_config");
}
$arr = $db->GetArray("select * from global_config");
$data = array();
foreach ($arr as $v){
	$data[$v["k"]] = $v["v"];
}
include('../../include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>网站全局配置</title>
<style>
p.a{padding-left:10px}
.hide{display:none;}
a{padding:0 5px;}
</style>
<script type="text/javascript">
$(function() {
<?php foreach ($data as $k=>$v):
if(in_array($k,$input_radio)){//是单选择框
?>
	$("[name=<?php echo $k?>][value=\"<?php echo $v?>\"]").attr("checked","checked");
<?php }else if(in_array($k,$input_checkbox)){//是复选择框
	foreach(explode(",",$v) as $vchkbox):
?>
	$("[name=<?php echo $k?>:checkbox][value=\"<?php echo $vchkbox?>\"]").attr("checked",true);
	<?php endforeach;?>
<?php }?>
<?php endforeach;?>

	//只允许数字和英文逗号
	jQuery(".num_douhao").bind("input propertychange",function(){ 
		$(this).val($(this).val().replace(/[^\d,]/g,''));
	});
});

function tr_show(c){
	$(".toggleBox:not("+c+")").hide();
	$(c).toggle(300);	
}
</script>

</head>
<body>
<div class="pageexplain">修改之前一定先要明白在修改什么，如果修改错了，整个网站会出现异常，所以请看清说明之后再修改。</div>
<div class="pageexplain">如果修改网标题,网站qq等等，修改完成后,需 <a href="http://<?php echo _SITE_URL_?>/tools/makehtml.php" target="_blank" class="phppagelink">点击</a> 重新生成静态页面。</div>
<form action="" method="post" enctype="multipart/form-data">
<input type="hidden" name="type" value="save"/>
<table width=99% align=center cellspacing=1 cellpadding=3 class="i_table">
		<tr class="b"><td>网站标题:  </td><td><input type="text" name="site_name" value="<?php echo $data["site_name"]?>"/>   <span></span></td></tr>
		<tr class="b"><td>网站LOGO:  </td><td><input type="file" name="logo"/><img src='/img/logo.png?_t=<?php echo time();?>'/><span>请上传高52px,宽114px(请上传透明的png图片)</span></td></tr>
		<tr class="b"><td>网站qq:  </td><td><input type="text" name="site_info_qq" value="<?php echo $data["site_info_qq"]?>"/>   <span></span></td></tr>
		<tr class="b"><td>网站邮箱:  </td><td><input type="text" name="site_info_email" value="<?php echo $data["site_info_email"]?>"/>   <span></span></td></tr>
		<tr class="b"><td>帮助页面qq:  </td><td><input type="text" name="site_info_help_qq" value="<?php echo $data["site_info_help_qq"]?>"/>   <span></span></td></tr>
		<tr class="b"><td>客服电话:  </td><td><input type="text" name="site_info_phone" value="<?php echo $data["site_info_phone"]?>"/>   <span></span></td></tr>
		<tr class="b"><td>备案号:  </td><td><input type="text" name="site_info_beian" value="<?php echo $data["site_info_beian"]?>"/>   <span></span></td></tr>
		<tr class="b"><td>技术支持qq:  </td><td><input type="text" name="site_info_jishu_qq" value="<?php echo $data["site_info_jishu_qq"]?>"/>   <span></span></td></tr>
		<tr class="b"><td>网站用户的币名称:  </td><td><input type="text" name="money_name" value="<?php echo $data["money_name"]?>"/>   <span></span></td></tr>
<?php if(!IS_SINGLE_MONEY):?>
		<tr class="b"><td>主播的积分的名称:  </td><td><input type="text" name="money_name2" value="<?php echo $data["money_name2"]?>"/>   <span></span></td></tr>
<?php endif;?>
		<tr class="b"><td>显示在直播间跑道:  </td><td><input type="text" name="live_gift_announce_max" value="<?php echo $data["live_gift_announce_max"]?>"/>   <span>礼物金额大于多少<?php echo $data["money_name"]?></span></td></tr>
		<tr class="b"><td>cdn域名:  </td><td><input type="text" name="cdn_domain" value="<?php echo $data["cdn_domain"]?>"/>   <span>css,js,img通过它加载,为空则用本机的,如果有配置，最后不能有"/",例:http://img.xxx.com</span></td></tr>
		<tr class="b"><td>通过用户充值加提成百分比:  </td><td><input type="text" name="_PAY_ADD_" value="<?php echo $data["_PAY_ADD_"]?>"/>   <span></span></td></tr>
		<tr class="b"><td>通过用户购买靓号提成百分比:  </td><td><input type="text" name="_BUY_NUMBER_ADD_" value="<?php echo $data["_BUY_NUMBER_ADD_"]?>"/>   <span></span></td></tr>
		<tr class="b"><td>主播每天播放几个小时算1天有效:  </td><td><input type="text" name="_SHOWS_VALID_" value="<?php echo $data["_SHOWS_VALID_"]?>"/>   <span></span></td></tr>
		<tr class="b"><td>家族提成比例:  </td><td><input type="text" name="_CLAN_CONSUMERATE_" value="<?php echo $data["_CLAN_CONSUMERATE_"]?>"/>   <span>(0.08表示提成为8%)</span></td></tr>
		<tr class="b"><td>每分钟进多少机器人用户:  </td><td><input type="text" name="_bot_num_" value="<?php echo $data["_bot_num_"]?>"/>   <span>1到60之间有效，0表示关闭机器人(约1分钟生效)</span></td></tr>
		<tr class="b"><td>房间机器人用户上限:  </td><td><input type="text" name="_bot_num_max_" value="<?php echo $data["_bot_num_max_"]?>"/>   <span>超过此数值，机器人将不再进入,<a href="bot_set.php" target="_blank" class="phppagelink">单个房间设置</a></span></td></tr>
		<tr class="b"><td>房间机器人游客数量:  </td><td><input type="text" name="_bot_num_guest_" value="<?php echo $data["_bot_num_guest_"]?>"/>   <span>房间开播就会显示,<a href="bot_set.php" target="_blank" class="phppagelink">单个房间设置</a></span></td></tr>
		<tr class="b"><td>显示游客进入房间:  </td><td><label><input type="radio" value="0" name="guestshow">显示</label><label><input type="radio" value="1" name="guestshow">不显示</label>   <span></span></td></tr>
		<tr class="b"><td>签到1次得多少币:  </td><td><input type="text" name="sing_in_balance" value="<?php echo $data["sing_in_balance"]?>"/>   <span></span></td></tr>
		<tr class="b"><td>首充抽奖概率:  </td><td><input type="text" name="pay_first_probability" value="<?php echo $data["pay_first_probability"]?>"/>   <span>如：9,3,9,13,16,7,16,27(表示:中QQ座驾1天有9%,中30%币有3%,中奔驰1天有9%,中隐身符道具1天有13%,中10%币有16%,中10%币有7%,中紫色VIP1天有16%,中普通VIP1天有27%)</span><span class="red">所有数值相加应为100否则会出错</span>,<a target="_blank" href="/first_order.php" class="phppagelink">查看</a></td></tr>
		<tr class="b"><td>富豪升级值:  </td><td><input style="width:100%" type="text" name="level_cost" value="<?php echo $data["level_cost"]?>"/>   <span></span></td></tr>
		<tr class="b"><td>主播升级值:  </td><td><input style="width:100%" type="text" name="level_point" value="<?php echo $data["level_point"]?>"/>   <span></span></td></tr>
		<tr class="b"><td>主播可以录制视频最多次数:  </td><td><input type="text" name="live_record_count" value="<?php echo $data["live_record_count"]?>"/>   <span>5,表示一个主播最多可以录5段视频</span></td></tr>
		<tr class="b"><td>主播可以录制视频最大时长:  </td><td><input type="text" name="live_record_max_time" value="<?php echo $data["live_record_max_time"]?>"/>   <span>秒</span></td></tr>
		<tr class="b"><td>主播放离线视频地址:  </td><td><input type="text" name="live_record_rtmp" value="<?php echo $data["live_record_rtmp"]?>"/>   <span>与flash中的录视频地址对应</span></td></tr>
		<tr class="b"><td>主播放离线视频后缀:  </td><td><input type="text" name="live_record_suffix" value="<?php echo $data["live_record_suffix"]?>"/>   <span>与flash中的录视频地址对应</span></td></tr>
		<tr class="b"><td>全Flash视频上传地址:  </td><td><input type="text" name="full_live_record" value="<?php echo $data["full_live_record"]?>"/>   <span>只有全Flash版本用到</span></td></tr>
		<tr class="b"><td>全Flash视频下载地址:  </td><td><input type="text" name="full_live_player" value="<?php echo $data["full_live_player"]?>"/>   <span>只有全Flash版本用到</span></td></tr>
		<tr class="b"><td>全Flash麦时及价格:  </td><td><input type="text" name="mic_price" value='<?php echo $data["mic_price"]?>' class="mic_price"/>   <span>例60:500,120:1000(含义是上60秒需要500币,上120秒需要1000币)</span></td></tr>
		<tr class="b"><td>本周参与排名礼物:  </td><td><input type="text" name="top_week0" value="<?php echo $data["top_week0"]?>" class="num_douhao"/>   <span>10个礼物id,只允许数字和英文逗号</span></td></tr>
		<tr class="b"><td>上周参与排名礼物:  </td><td><input type="text" name="top_week1" value="<?php echo $data["top_week1"]?>" class="num_douhao"/>   <span>10个礼物id,只允许数字和英文逗号</span></td></tr>
		<!--tr class="b"><td>每天最多加几个红包(掌声):  </td><td><input type="text" name="max_giftstore1" value="<?php echo $data["max_giftstore1"]?>" class="max_giftstore1"/>   <span></span></td></tr-->
		<tr class="b"><td>页脚代码:  </td><td><textarea id="tongji" name="tongji" style="height:50px;width:100%"><?php echo $data["tongji"]?></textarea><span>可以加入统计代码等，显示在页脚</span></td></tr>
		<tr class="b"><td>使用哪种支付接口:  </td><td>
			<label><input type="checkbox" value="rec_wxpay" name="pay_interface[]">微信</label>
			<label><input type="checkbox" value="rec_alipay" name="pay_interface[]">支付宝</label>
			<label><input type="checkbox" value="rec_chinabank" name="pay_interface[]">网银在线</label>
			<label><input type="checkbox" value="rec_ips" name="pay_interface[]">IPS环讯网银</label>
			<label><input type="checkbox" value="rec_ips_szx" name="pay_interface[]">IPS环讯移动储值卡</label>
			<label><input type="checkbox" value="rec_ips_zglt" name="pay_interface[]">IPS环讯联通储值卡</label>
			<label><input type="checkbox" value="rec_ips_dx" name="pay_interface[]">IPS环讯电信储值卡</label>
			<label><input type="checkbox" value="rec_yee" name="pay_interface[]">易宝网银</label>
			<label><input type="checkbox" value="rec_yee_szx" name="pay_interface[]">易宝神州行充值卡</label>
			<label><input type="checkbox" value="rec_yee_zglt" name="pay_interface[]">易宝中国联通充值卡</label>
			<label><input type="checkbox" value="rec_yee_jw" name="pay_interface[]">易宝骏网一卡通</label>
			<label><input type="checkbox" value="rec_kuaiqian" name="pay_interface[]">快钱支付</label>
			<label><input type="checkbox" value="rec_kuaiqian_szx" name="pay_interface[]">快钱神州行充值卡</label>
			<label><input type="checkbox" value="rec_kuaiqian_zglt" name="pay_interface[]">快钱中国联通充值卡</label>
			<label><input type="checkbox" value="rec_kuaiqian_jw" name="pay_interface[]">快钱骏网一卡通</label>
			<label><input type="checkbox" value="rec_tonhui" name="pay_interface[]">通汇卡</label>
			<label><input type="checkbox" value="rec_5iu" name="pay_interface[]">5iu(选择此项时不要选择其它项)</label>
		<span></span></td></tr>
<!--支付接口相关-->
		<tr class="b"><td colspan="2">
			<a href="javascript:tr_show('.alpay')">支付宝支付设置</a>
			<a href="javascript:tr_show('.yee')">易宝支付设置</a>
			<a href="javascript:tr_show('.kq')">快钱支付配置</a>
			<a href="javascript:tr_show('.chinabank')">网银在线支付配置</a>
			<a href="javascript:tr_show('.qqlogin')">QQ登录</a>
			<a href="javascript:tr_show('.duihuan')">兑换提现设置</a>
			<a href="javascript:tr_show('.weiboloing')">微博登录</a>
			<a href="javascript:tr_show('.ips')">环迅支付</a>
			<a href="javascript:tr_show('.wxpay')">微信支付</a>
			<a href="javascript:tr_show('.tonghui')">通汇卡</a>
			<!--a href="javascript:tr_show('.pcdd')">联盟PC蛋蛋(没有/不需要则不用设置)</a>
			<a href="javascript:tr_show('.juxiang')">聚享登录(没有/不需要则不用设置)</a-->
		</td></tr>
		
		<tr class="b alpay hide toggleBox"><td>支付宝合作身份者id:  </td><td><input type="text" name="pay_alipay_partner" value="<?php echo $data["pay_alipay_partner"]?>"/>   <span>如：2088411995618888</span></td></tr>
		<tr class="b alpay hide toggleBox"><td>支付宝安全检验码:  </td><td><input type="text" name="pay_alipay_key" value="<?php echo $data["pay_alipay_key"]?>"/>   <span>如：qnlpugal3vc7zdphikaalspqv1v68888</span></td></tr>
		<tr class="b alpay hide toggleBox"><td>支付宝卖家支付宝帐户:  </td><td><input type="text" name="pay_alipay_seller_email" value="<?php echo $data["pay_alipay_seller_email"]?>"/>   <span>如：2217998888@qq.com</span></td></tr>
		
		<tr class="b yee hide toggleBox"><td>易宝商户编号:  </td><td><input type="text" name="pay_yee_MerId" value="<?php echo $data["pay_yee_MerId"]?>"/>   <span>如：10012128888</span></td></tr>
		<tr class="b yee hide toggleBox"><td>易宝商户密钥:  </td><td><input type="text" name="pay_yee_merchantKey" value="<?php echo $data["pay_yee_merchantKey"]?>"/>   <span>如：15072324196yRKL39083065UEkG2P59ho1IP1K85Uh30W4649bhXMt1F8888</span></td></tr>
		
		<tr class="b kq hide toggleBox"><td>快钱网银账号:  </td><td><input type="text" name="pay_kq_merchantAcctId" value="<?php echo $data["pay_kq_merchantAcctId"]?>"/>   <span>如：1002355278888</span></td></tr>
		<tr class="b kq hide toggleBox"><td>快钱网银密钥:  </td><td><input type="text" name="pay_kq_key" value="<?php echo $data["pay_kq_key"]?>"/>   <span>如：6BWSTKKZLXJC8888</span></td></tr>
		<tr class="b kq hide toggleBox"><td>快钱骏网账号:  </td><td><input type="text" name="pay_kq_id3" value="<?php echo $data["pay_kq_id3"]?>"/>   <span>如：1002355278888</span></td></tr>
		<tr class="b kq hide toggleBox"><td>快钱骏网密钥:  </td><td><input type="text" name="pay_kq_key3" value="<?php echo $data["pay_kq_key3"]?>"/>   <span>如：E36WZ23DJABX8888</span></td></tr>
		<tr class="b kq hide toggleBox"><td>快钱神州行充值卡账号:  </td><td><input type="text" name="pay_kq_id4" value="<?php echo $data["pay_kq_id4"]?>"/>   <span>如：1002355278888</span></td></tr>
		<tr class="b kq hide toggleBox"><td>快钱神州行充值卡密钥:  </td><td><input type="text" name="pay_kq_key4" value="<?php echo $data["pay_kq_key4"]?>"/>   <span>如：LJHLQXSCK3DK8888</span></td></tr>
		<tr class="b kq hide toggleBox"><td>快钱中国联通充值卡账号:  </td><td><input type="text" name="pay_kq_id5" value="<?php echo $data["pay_kq_id5"]?>"/>   <span>如：1002355278888</span></td></tr>
		<tr class="b kq hide toggleBox"><td>快钱中国联通充值卡密钥:  </td><td><input type="text" name="pay_kq_key5" value="<?php echo $data["pay_kq_key5"]?>"/>   <span>如：HMYFJBWZXQMS8888</span></td></tr>
		<tr class="b chinabank hide toggleBox"><td>网银在线支付商户号:  </td><td><input type="text" name="CHINABANK_v_mid" value="<?php echo $data["CHINABANK_v_mid"]?>"/>   <span>如：23138888</span></td></tr>
		<tr class="b chinabank hide toggleBox"><td>网银在线支付md5私钥值:  </td><td><input type="text" name="CHINABANK_key" value="<?php echo $data["CHINABANK_key"]?>"/>   <span>如：lx0o34lkn6a8888</span></td></tr>
		<tr class="b duihuan hide toggleBox"><td>人民币到虚拟币比例:  </td><td><input type="text" name="pay_RMB_XNB" value="<?php echo $data["pay_RMB_XNB"]?>"/>   <span>如：100表示充1元可以得100币</span></td></tr>
		<tr class="b duihuan hide toggleBox"><td>虚拟币转游戏币比例:  </td><td><input type="text" name="pay_XNB_YXB" value="<?php echo $data["pay_XNB_YXB"]?>"/>   <span>如：10表示10个游戏币可换1个游戏币</span></td></tr>
		<tr class="b duihuan hide toggleBox"><td>游戏币转虚拟币比例:  </td><td><input type="text" name="pay_YXB_XNB" value="<?php echo $data["pay_YXB_XNB"]?>"/>   <span>如：0.1表示1个币可换10个游戏币</span></td></tr>
		<tr class="b duihuan hide toggleBox"><td>积分转虚拟币比例:  </td><td><input type="text" name="pay_JF_XNB" value="<?php echo $data["pay_JF_XNB"]?>"/>   <span>如：1表示1积分可换1币</span></td></tr>
		<tr class="b duihuan hide toggleBox"><td>主播提现比例:  </td><td><input type="text" name="pay_JF_TIXIAN_TEMP" value="<?php echo $data["pay_JF_TIXIAN_TEMP"]?>"/>   <span>如：250表示250积分可换1元</span>，<a href="jifen_tixian_conf.php" target="_blank" class="phppagelink">按等级设置</a></td></tr>
		<tr class="b duihuan hide toggleBox"><td>主播最低提现积分:  </td><td><input type="text" name="pay_XNB_TI_MIN_TEMP" value="<?php echo $data["pay_XNB_TI_MIN_TEMP"]?>"/>   <span>如：25000表示主播大于此积分才可以提现</span></td></tr>
		
		<tr class="b qqlogin hide toggleBox"><td>QQ APP ID:  </td><td><input type="text" name="qq_oauth_consumer_key" value="<?php echo $data["qq_oauth_consumer_key"]?>"/>   <span>如：101088888，申请地址http://connect.qq.com/,回调地址请填写,http://<?php echo _MAIN_DOMAIN_;?>/opensns/qq/reg</span></td></tr>
		<tr class="b qqlogin hide toggleBox"><td>QQ APP KEY:  </td><td><input type="text" name="qq_oauth_consumer_secret" value="<?php echo $data["qq_oauth_consumer_secret"]?>"/>   <span>如：062edb90e0c40a0a0a287f48831b8888</span></td></tr>
		
		<tr class="b weiboloing hide toggleBox"><td>微博AKEY:  </td><td><input type="text" name="weibo_AKEY" value="<?php echo $data["weibo_AKEY"]?>"/>   <span>如：1079818888,申请地址:http://open.weibo.com/connect ,上传图标是要80*80和16*16的清晰图标，否则审核不通过</span></td></tr>
		<tr class="b weiboloing hide toggleBox"><td>微博SKEY:  </td><td><input type="text" name="weibo_SKEY" value="<?php echo $data["weibo_SKEY"]?>"/>   <span>如：9d85c97f39cfd360b952bd2d4f608888</span></td></tr>
		<tr class="b ips hide toggleBox"><td>环迅商户号:  </td><td><input type="text" name="ips_Mer_code" value="<?php echo $data["ips_Mer_code"]?>"/>   <span>如：000818</span></td></tr>
		<tr class="b ips hide toggleBox"><td>环迅商户证书:  </td><td><input type="text" name="ips_Mer_key" value="<?php echo $data["ips_Mer_key"]?>"/>   <span><br/>如：NyLdKDVyUrPv2on3VB0JaavTYqqSweFCb7ZpBbTMsL2XjTjQ1ZR0rWmn3r4UO21qaBKvDxstjeRFXOl57PONCFM4LnmKXzxpKBxW8nC6hYHB5WEe6yMzedcKqEaRAXLj</span></td></tr>
		<tr class="b ips hide toggleBox"><td>环迅商户名:  </td><td><input type="text" name="ips_Mer_Name" value="<?php echo $data["ips_Mer_Name"]?>"/>   <span>环迅商户号以17开头时需要</span></td></tr>
		<tr class="b ips hide toggleBox"><td>环迅交易账号:  </td><td><input type="text" name="ips_Mer_Account" value="<?php echo $data["ips_Mer_Account"]?>"/>   <span>环迅商户号以17开头时需要</span></td></tr>
		
		<tr class="b wxpay hide toggleBox"><td>微信APPID:  </td><td><input type="text" name="wxpay_APPID" value="<?php echo $data["wxpay_APPID"]?>"/>   <span></span></td></tr>
		<tr class="b wxpay hide toggleBox"><td>微信商户号:  </td><td><input type="text" name="wxpay_MCHID" value="<?php echo $data["wxpay_MCHID"]?>"/>   <span></span></td></tr>
		<tr class="b wxpay hide toggleBox"><td>微信商户支付密钥:  </td><td><input type="text" name="wxpay_KEY" value="<?php echo $data["wxpay_KEY"]?>"/>   <span>https://mch.weixin.qq.com取得，支付需要的证书也要到这里下载，上传到apis\Wxpay\cert</span></td></tr>
		<tr class="b wxpay hide toggleBox"><td>微信公众帐号secert:  </td><td><input type="text" name="wxpay_APPSECRET" value="<?php echo $data["wxpay_APPSECRET"]?>"/>   <span>https://mp.weixin.qq.com/上面取得</span></td></tr>
		
		<tr class="b tonghui hide toggleBox"><td>通汇卡商户号:  </td><td><input type="text" name="tonghui_no" value="<?php echo $data["tonghui_no"]?>"/>   <span>如：18212702</span></td></tr>
		<tr class="b tonghui hide toggleBox"><td>通汇卡Key:  </td><td><input type="text" name="tonghui_key" value="<?php echo $data["tonghui_key"]?>"/>   <span><br/>如：f7440bf5b813477e8526c62fe5c10988</span></td></tr>
		
		<tr class="b pcdd hide toggleBox"><td>本站对应的PC蛋蛋联盟id:  </td><td><input type="text" name="pcdd_unionid" value="<?php echo $data["pcdd_unionid"]?>"/>   <span>在本站联盟管理中新建，得到的联盟id</span></td></tr>
		<!--tr class="b pcdd hide toggleBox"><td>PC蛋蛋帐号ID:  </td><td><input type="text" name="pcdd_pcid" value="<?php echo $data["pcdd_pcid"]?>"/>   <span>到PC蛋蛋网站获取</span></td></tr-->
		<tr class="b pcdd hide toggleBox"><td>广告验证码（常量）:  </td><td><input type="text" name="pcdd_adid" value="<?php echo $data["pcdd_adid"]?>"/>   <span>到PC蛋蛋网站获取</span></td></tr>
		<tr class="b pcdd hide toggleBox"><td>PC蛋蛋key:  </td><td><input type="text" name="pcdd_key" value="<?php echo $data["pcdd_key"]?>"/>   <span>到PC蛋蛋网站获取</span></td></tr>
		<tr class="b pcdd hide toggleBox"><td>说明(需将下面的地址告诉PC蛋蛋):  </td><td>
			<span>PC蛋蛋广告奖励查询接口：http://<?php echo _MAIN_DOMAIN_;?>/apis/unionapis.php?action=pcdd&merid=111&keycode=xxxxxx</span><br/>
			<span>PC蛋蛋到本站推广链接：http://<?php echo _MAIN_DOMAIN_;?>/union.php?u=【PC蛋蛋联盟id】</span>
		</td></tr>
		
		<tr class="b juxiang hide toggleBox"><td>本站对应的聚享联盟id:  </td><td><input type="text" name="jx_unionid" value="<?php echo $data["jx_unionid"]?>"/>   <span>在本站联盟管理中新建，得到的联盟id</span></td></tr>
		<tr class="b juxiang hide toggleBox"><td>聚享id:  </td><td><input type="text" name="jx_tokenid" value="<?php echo $data["jx_tokenid"]?>"/>   <span>到聚享网站获取</span></td></tr>
		<tr class="b juxiang hide toggleBox"><td>聚享key:  </td><td><input type="text" name="js_tokenkey" value="<?php echo $data["js_tokenkey"]?>"/>   <span>到聚享网站获取</span></td></tr>
		<tr class="b juxiang hide toggleBox"><td>说明(需将下面的地址告诉聚享):  </td><td>
			<span>聚享到本站推广链接：http://<?php echo _MAIN_DOMAIN_;?>/?u=【聚享联盟id】&recordID=【聚享id】</span>
		</td></tr>
		
<!--支付接口相关end-->
		<tr class="b"><td colspan="2">  <input type="submit" value="-修改-" class="input_k" onclick="return confirm('确定要修改记录吗?')" /></td></tr>
    </table>
</form>
<div style="padding-bottom:300px;"></div>

<?php if(!empty($info)):?>
<script>
alert('<?php echo $info?>');
</script>
<?php endif;?>

</body>
</html>
