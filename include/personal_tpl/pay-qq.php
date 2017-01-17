<?php
include_once('../header.inc.php');
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>充值 - <?php echo $page_var['site_name']?></title>
<meta name="description" content="" />
<link href="<?php echo $page_var['cdn_domain']?>/css/qq_pay01.css" type="text/css" rel="stylesheet" media="all" />
<script type="text/javascript" src="<?php echo $page_var['cdn_domain']?>/js/jquery.min.js"></script>
<script src="<?php echo $page_var['cdn_domain']?>/js/jquery.easing.1.3.js"></script>
<script src="<?php echo $page_var['cdn_domain']?>/js/slides.jquery.js"></script>
<?php if(!$page_var['IS_QQ']):?>
<script type="text/javascript" src="<?php echo $page_var['cdn_domain']?>/js/lib/jquery.fancybox.js?v=2.0.6"></script>
<link rel="stylesheet" type="text/css" href="<?php echo $page_var['cdn_domain']?>/css/ext/jquery.fancybox.css?v=2.0.6" media="screen" />
<?php endif;?>
<script src="http://fusion.qq.com/fusion_loader?appid=1101493466&platform=qzone"></script>
<script>
function buy_goods(videomoney){
	$.get("/apis/qq/pay.php?money="+videomoney+"&agentid="+agentid+"&showuserid="+showuserid,function(r){
		//alert(r.url_params);
		//alert('跳进来了');
		if(r.url_params=="" || r.url_params==undefined){
			if(confirm('充值失败，可能是您的登陆已经过期，是否返回首页重新充值？')){
				parent.self.location="/";
			}
		}
		else{
			if(r.ret==1000){
				alert(r.msg);
			}
			fusion2.dialog.buy ({param : r.url_params,sandbox : false}); //用于测试，正式上线后得改为false
			parent.$.fancybox.close();
		}
	},'json');
}
var agentid=0;
var showuserid=0;
<?php 
if($_GET['a']!=""){
// $db->debug =true;
	$aid=$db->GetRow("select userid,b.nickname,b.usernumber from user b where b.usernumber='".(int)$_GET['a']."'");
	if(!empty($aid)){
?>
showuserid=<?php echo $aid["userid"]?>;
<?php }}?>
</script>
</head>
<body>
<!--
<a href="javascript:buy_goods(1000)">购买1000游戏币 100 Q点</a><br>
<a href="javascript:buy_goods(2000)">购买2000游戏币 180 Q点</a><br>
<a href="javascript:buy_goods(8000)">购买8000游戏币 600 Q点</a><br>
<a href="javascript:buy_goods(15000)">购买1000游戏币 1000 Q点</a><br>
-->
<div id="pay01">
	<div>
		<img src="/images/pay01.jpg" />
	</div>
	<div id="pay01_logo04">
		<img src="/images/pay06.jpg" style="position:absolute; left:15px; top:60px;" />
		<div id="logo04_word">轻松充值，即刻享受自由欢唱，为梦想积聚正能量</div>
	</div>
	<div>
		<ul class="pay01_li">
		<li><input type="radio" name="optype" value="1" onclick="showHint(1)" checked="checked"/><b>8000金币</b>(100个Q点)</li>
		<div id="pay01_logo1" style="display:block;">
			<div id="p_logo_div1">
				<ul>
					<li>原&nbsp;&nbsp;&nbsp;价：<font color="#FF0000">10元</font></li>
					<li>黄钻8折：<font color="#FF0000">8元</font>(80个Q点)</li>
				</ul>
			</div>
		</div>
		<li><input type="radio" name="optype" value="2" onclick="showHint(2)"/><b>40000金币</b>(500个Q点)</li>
		<div id="pay01_logo2" style="display:none;">
			<div id="p_logo_div1">
				<ul>
					<li>原&nbsp;&nbsp;&nbsp;价：<font color="#FF0000">50元</font></li>
					<li>黄钻8折：<font color="#FF0000">40元</font>(400个Q点)</li>
				</ul>
			</div>
		</div>
		<li><input type="radio" name="optype" value="3" onclick="showHint(3)"/><b>80000金币</b>(1000个Q点)</li>
		<div id="pay01_logo3" style="display:none;">
			<div id="p_logo_div1">
				<ul><li>原&nbsp;&nbsp;&nbsp;价：<font color="#FF0000">100元</font></li><li>黄钻8折：<font color="#FF0000">80元</font>(800个Q点)</li></ul></div></div>
	<li><input type="radio" name="optype" value="4" onclick="showHint(4)"/><b>160000金币</b>(2000个Q点)</li>
	<div id="pay01_logo4" style="display:none;"><div id="p_logo_div1"><ul><li>原&nbsp;&nbsp;&nbsp;价：<font color="#FF0000">200元</font></li><li>黄钻8折：<font color="#FF0000">160元</font>(1600个Q点)</li></ul></div></div>
	<li><input type="radio" name="optype" value="5" onclick="showHint(5)"/><b>400000金币</b>(5000个Q点)</li>
	<div id="pay01_logo5" style="display:none;"><div id="p_logo_div1"><ul><li>原&nbsp;&nbsp;&nbsp;价：<font color="#FF0000">500元</font></li><li>黄钻8折：<font color="#FF0000">400元</font>(4000个Q点)</li></ul></div></div>
	<li><input type="radio" id="optype" name="optype" value="6" onclick="showHint(0)" /><b>其他：</b>
		<input type="text" id="pay_coin_cus" name="pay_coin_cus" style="width:40px; height:12px;"  onclick="$('#pay_coin_cus').focus();showHint(0);" onkeyup="MyCheckInt(this,event)"
		onfocus ="$('#optype').attr('checked',true);"/><b>×800金币</b></li>
	</ul>
	</div>
	<div id="pay01_logo02"><a href="#"><img src="/images/pay04.jpg" onclick="checkMoney()"/></a></div>
</div>
</body>
<script>
function MyGetKeyCode(e)
{
   var code;
   if (!e) var e = window.event;
   if (e.keyCode){
     code = e.keyCode;
   }else if (e.which){
     code = e.which;
   }
   return code;
 }
 
//-2.36onkeypress
 function MyCheckNum(obj,e)
 {
   var code = MyGetKeyCode(e);
   if ((code<45 || code>57 || code==47) && code!=45 && code!=9 && code!=8) return false;
   if(code==46 && obj.value.indexOf(".")>-1) return false;
   return true;
 }
 
function MyCheckInt(obj,e)
 {
   var code = MyGetKeyCode(e);
   if ((code<48 || code>57) && (code<96 || code>105) && code!=45 && code!=9 && code!=8) 
   {
		obj.value = "0";
		usermoney = 1;
		return false;
   }
   else
   {
       usermoney = parseInt(obj.value,10); 
	   return true;
    }

 }
function checkMoney()
{
	if(usermoney<10){
		alert("10元起充");
		return false;
	}
	buy_goods(usermoney);
}
function showHint(n)
{
	switch(n)
	{
		case 1:
			usermoney = 10;
			document.getElementById("pay01_logo1").style.display = 'block';
			document.getElementById("pay01_logo2").style.display = 'none';
			document.getElementById("pay01_logo3").style.display = 'none';
			document.getElementById("pay01_logo4").style.display = 'none';
			document.getElementById("pay01_logo5").style.display = 'none';
			break;
		case 2:
			usermoney = 50;
			document.getElementById("pay01_logo1").style.display = 'none';
			document.getElementById("pay01_logo2").style.display = 'block';
			document.getElementById("pay01_logo3").style.display = 'none';
			document.getElementById("pay01_logo4").style.display = 'none';
			document.getElementById("pay01_logo5").style.display = 'none';
			break;
		case 3:
			usermoney = 100;
			document.getElementById("pay01_logo1").style.display = 'none';
			document.getElementById("pay01_logo2").style.display = 'none';
			document.getElementById("pay01_logo3").style.display = 'block';
			document.getElementById("pay01_logo4").style.display = 'none';
			document.getElementById("pay01_logo5").style.display = 'none';
			break;
		case 4:
			usermoney = 200;
			document.getElementById("pay01_logo1").style.display = 'none';
			document.getElementById("pay01_logo2").style.display = 'none';
			document.getElementById("pay01_logo3").style.display = 'none';
			document.getElementById("pay01_logo4").style.display = 'block';
			document.getElementById("pay01_logo5").style.display = 'none';
			break;
		case 5:
			usermoney = 500;
			document.getElementById("pay01_logo1").style.display = 'none';
			document.getElementById("pay01_logo2").style.display = 'none';
			document.getElementById("pay01_logo3").style.display = 'none';
			document.getElementById("pay01_logo4").style.display = 'none';
			document.getElementById("pay01_logo5").style.display = 'block';
			break;
		default:
			document.getElementById("pay01_logo1").style.display = 'none';
			document.getElementById("pay01_logo2").style.display = 'none';
			document.getElementById("pay01_logo3").style.display = 'none';
			document.getElementById("pay01_logo4").style.display = 'none';
			document.getElementById("pay01_logo5").style.display = 'none';
			break;
	}
}
var usermoney = 10 ;
//关闭当前页面
function closeWin() {
    window.opener=null;
    window.open('','_self');
    window.close();
}
</script>
</html>
<?php include_once('../footer.inc.php');?>