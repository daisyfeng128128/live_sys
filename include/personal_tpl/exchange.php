<!--main-->
<div class="personbody">
<!--left-->
<div class="person_left">
<?php $current_page="exchange";
include_once('./include/personal_tpl/person_menu.html');
?>
</div>
<!--leftend-->
<!--right-->
<div class="person_right">
<div class="person_tab">
<ul id="tags">
<li class="selectTag"><a href="javascript:void(0)" onclick="selectTag('tagContent0',this)" id="tagContent0Btn"><?php echo $page_var['money_name2']?>兑换<?php echo $page_var['money_name']?></a></li>
<li <?php if(!$page_var['site_ishave_game']):?>style="display:none;"<?php endif;?>><a href="javascript:void(0)" onclick="selectTag('tagContent1',this)" id="tagContent1Btn"><?php echo $page_var['money_name']?>兑换游戏币</a></li>
<li <?php if(!$page_var['site_ishave_game']):?>style="display:none;"<?php endif;?>><a href="javascript:void(0)" onclick="selectTag('tagContent3',this)" id="tagContent3Btn">游戏币兑换<?php echo $page_var['money_name']?></a></li>
<li><a href="javascript:void(0)" onclick="selectTag('tagContent2',this)" id="tagContent2Btn"><?php echo $page_var['money_name2']?>提现</a></li>
</ul>
</div>
<div id="tagContent">
<div class="tagContent selectTag" id="tagContent0">
<div class="zhyk">您的账户余额:<em class="hfb"><?php echo $page_var['money_name']?><span id="selfbalance"><?php echo (int)$user['balance']?></span></em><em class="jf"><?php echo $page_var['money_name2']?><span id="selfpoint"><?php echo (int)$user['point']?></span></em><em style="display:none" class="yxb">游戏币<span id="selfyxb"><?php echo (int)$user['gamemoney']?></span></em></div>
<div>
<h5><span class="dhyxbtitle"><?php echo $page_var['money_name2']?>兑换<?php echo $page_var['money_name']?></span></h5>
<form>
<ul class="dhjf">
  <li><span class="dhjftxt">需兑换的<?php echo $page_var['money_name2']?>数量：</span>
  <span>
    <input class="dhjfinput" type="text" value="0" id="exchange1value"><em class="duequal">=</em><span id="exchange1result">0</span><?php echo $page_var['money_name']?>
  </span>
  </li>
  <li class="attention_1">提示：<?php echo $page_var['money_name2']?>和<?php echo $page_var['money_name']?>的兑换比率是 1 : <?php echo JF_XNB?></li>
</ul>
<div class="dhjfbtns"><input id="exchange1btn" type="button" value="兑换" class="sure"/><input id="viewlog1" type="button" value="查看兑换记录" class="sure"/></div>
</form>
<div class="lhcont" id="exchangelog1">

</div>
</div>
</div>
<div class="tagContent" id="tagContent1">
<div class="zhyk">您的账户余额:<em class="hfb"><?php echo $page_var['money_name']?><?php echo (int)$user['balance']?></em><em class="jf"><?php echo $page_var['money_name2']?><?php echo (int)$user['point']?></em><em class="yxb">游戏币<?php echo (int)$user['gamemoney']?></em></div>
<div>
<h5><span class="dhyxbtitle"><?php echo $page_var['money_name']?>兑换游戏币</span></h5>
<form>
<ul class="dhjf">
  <li><span class="dhjftxt">需兑换的<?php echo $page_var['money_name']?>数量：</span>
  <span>
    <input class="dhjfinput" type="text" value="0" id="exchange2value"><em class="duequal">=</em><span id="exchange2result">0</span>游戏币
  </span>
  </li>
  <li class="attention_1">提示：<?php echo $page_var['money_name']?>和游戏币的兑换比率是 1 : <?php echo XNB_YXB?></li>
</ul>
<div class="dhjfbtns"><input id="exchange2btn" type="button" value="兑换" class="sure"/><input id="viewlog2" type="button" value="查看兑换记录" class="sure"/></div>

</form>
<div class="lhcont" id="exchangelog2">

</div>
</div>
</div>
<div class="tagContent" id="tagContent2">
<div class="zhyk">您的账户余额:<em class="hfb"><?php echo $page_var['money_name']?><?php echo (int)$user['balance']?></em><em class="jf"><?php echo $page_var['money_name2']?><?php echo (int)$user['point']?></em></div>
<div>
<h5><span class="dhyxbtitle"><?php echo $page_var['money_name2']?>提现</span></h5>
<form>
<ul class="dhjf">
  <li><span class="dhjftxt">需兑换的<?php echo $page_var['money_name2']?>数量：</span>
  <span>
    <input class="dhjfinput" type="text" value="0" id="exchange3value"><em class="duequal">=</em>￥<span id="exchange3result">0</span>
  </span>
  </li>
  <li class="attention_1">提示：主播可以将自己获得的<?php echo $page_var['money_name2']?>按<?php echo JF_TIXIAN?>:1的比例兑换成人民币 <?php echo JF_TIXIAN?><?php echo $page_var['money_name2']?>=1RMB。每次兑换不得低于<?php echo XNB_TI_MIN?><?php echo $page_var['money_name2']?>。</li>
</ul>
<br/><br/><br/>
<div class="dhjfbtns"><input id="exchange3btn" type="button" value="提现" class="sure"/><input id="viewlog3" type="button" value="查看提现记录" class="sure"/></div>
</form>
<div class="lhcont" id="exchangelog3">

</div>
</div>
</div>

<div class="tagContent" id="tagContent3">
<div class="zhyk">您的账户余额:<em class="hfb"><?php echo $page_var['money_name']?><?php echo (int)$user['balance']?></em><em class="jf"><?php echo $page_var['money_name2']?><?php echo (int)$user['point']?></em><em class="yxb">游戏币<?php echo (int)$user['gamemoney']?></em></div>
<div>
<h5><span class="dhyxbtitle">游戏币兑换<?php echo $page_var['money_name']?></span></h5>
<form>
<ul class="dhjf">
  <li><span class="dhjftxt">需兑换的游戏币数量：</span>
  <span>
    <input class="dhjfinput" type="text" value="0" id="exchange4value"><em class="duequal">=</em><span id="exchange4result">0</span><?php echo $page_var['money_name']?>
  </span>
  </li>
  <li class="attention_1">提示：游戏币和<?php echo $page_var['money_name']?>的兑换比率是 1 : <?php echo YXB_XNB?></li>
</ul>
<div class="dhjfbtns"><input id="exchange4btn" type="button" value="兑换" class="sure"/><input id="viewlog4" type="button" value="查看兑换记录" class="sure"/></div>
</form>
<div class="lhcont" id="exchangelog4">

</div>
</div>
</div>

</div>
</div>
</div>
<!--mainend-->
<script>
function isInt(str) 
{
	var i;
	for(i=0; i<str.length; i++) {
		if (str.charAt(i) == ".") {
			return false;
		}
	}
	return !isNaN(str);
}
$("#exchange4value").keyup(function(){//游戏币转虚拟币
	var thisv=parseInt($(this).val());
	if(isNaN(thisv))
		$("#exchange4result").html("0");
	else
		$("#exchange4result").html(thisv*<?php echo YXB_XNB?>);
});

$("#exchange1value").keyup(function(){
	$("#exchange1result").html(parseInt($(this).val())*<?php echo JF_XNB?>);
});
$("#exchange1btn").click(function(){
	if(parseInt($("#exchange1value").val())>parseInt($("#selfpoint").html())){
		alert("您没有那么多<?php echo $page_var['money_name2']?>");
		return;
	}
	if(!$.isNumeric($("#exchange1value").val())){
		alert("请输入正确的<?php echo $page_var['money_name2']?>值");
		return;
	}
	if(parseInt($("#exchange1value").val())<=0){
		alert('请输入要兑换的<?php echo $page_var['money_name2']?>值');
		return;
	}
	if(parseInt($("#exchange1result").text())!=$("#exchange1result").text()){
		alert('只能兑换整数值');
		return;
	}
	if(!confirm("确认进行此操作吗?"))return false;
	$.post("/ucenter.php?action=exchange1",{point:parseInt($("#exchange1value").val())},function(r){
		if(r!=""){
			alert(r);
		}
		else{
			alert("操作成功");
			self.location="ucenter.php?ptype=exchange&t=0";
		}
	});
});

$("#exchange2value").keyup(function(){
	$("#exchange2result").html(parseInt($(this).val())*<?php echo XNB_YXB?>);
});
$("#exchange2btn").click(function(){
	if(parseInt($("#exchange2value").val())>parseInt($("#selfbalance").html())){
		alert("您没有那么多<?php echo $page_var['money_name']?>");
		return;
	}
	if(!$.isNumeric($("#exchange2value").val())){
		alert("请输入正确的<?php echo $page_var['money_name']?>");
		return;
	}
	if(parseInt($("#exchange2value").val())<=0){
		alert('请输入要兑换的<?php echo $page_var['money_name']?>');
		return;
	}
	if(!confirm("确认进行此操作吗?"))return false;
	$.post("/ucenter.php?action=exchange2",{balance:parseInt($("#exchange2value").val())},function(r){
		if(r!=""){
			alert(r);
		}
		else{
			alert("操作成功");
			self.location='ucenter.php?ptype=exchange&t=1';
		}
	});
});

$("#exchange3value").keyup(function(){
	$("#exchange3result").html(parseInt($(this).val())/<?php echo JF_TIXIAN?>);
});
$("#exchange3btn").click(function(){
	if(parseInt($("#exchange3value").val())>parseInt($("#selfpoint").html())){
		alert("您没有那么多<?php echo $page_var['money_name2']?>");
		return;
	}
	if(!$.isNumeric($("#exchange3value").val())){
		alert("请输入正确的<?php echo $page_var['money_name2']?>值");
		return;
	}
	if(parseInt($("#exchange3value").val())<<?php echo XNB_TI_MIN?>){
		alert('<?php echo XNB_TI_MIN?><?php echo $page_var['money_name2']?>起兑');
		return;
	}
	if(!confirm("确认进行此操作吗?"))return false;
	$.post("/ucenter.php?action=exchange3",{point:parseInt($("#exchange3value").val())},function(r){
		if(r!=""){
			alert(r);
			self.location='ucenter.php?ptype=exchange&t=2';
		}
	});
});
$("#exchange4btn").click(function(){
	if(!isInt($("#exchange4result").html())){
		alert('只能兑换整数虚拟币');
		return;
	}
	if(parseInt($("#exchange4value").val())>parseInt($("#selfyxb").html())){
		alert("您没有那么多游戏币");
		return;
	}
	if(!$.isNumeric($("#exchange4value").val())){
		alert("请输入正确的游戏币");
		return;
	}
	if(parseInt($("#exchange4value").val())<=0){
		alert('请输入要兑换的游戏币');
		return;
	}
	$.post("/ucenter.php?action=exchange4",{yxb:parseInt($("#exchange4value").val())},function(r){
		if(r!="" && r!=undefined){
			alert(r);
		}
		else{
			alert('兑换成功');
			self.location="ucenter.php?ptype=exchange&t=3";
		}
	});
});
$("#viewlog1").click(function(){
	$.get('/ucenter.php?action=getexchangelog&why=1',function(html){
		$("#exchangelog1").html(html);
	});
});
$("#viewlog2").click(function(){
	$.get('/ucenter.php?action=getexchangelog&why=2',function(html){
		$("#exchangelog2").html(html);
	});
});
$("#viewlog3").click(function(){
	$.get('/ucenter.php?action=getdrawlog',function(html){
		$("#exchangelog3").html(html);
	});
});
$("#viewlog4").click(function(){
	$.get('/ucenter.php?action=getexchangelog&why=4',function(html){
		$("#exchangelog4").html(html);
	});
});
</script>
<?php if($_GET['t']){
echo '<script>$("#tagContent'.$_GET['t'].'Btn").click()</script>';
}
?>