<script src="/js/lib/jquery.cal.js"></script>
<script type="text/javascript" src="<?php echo $page_var['cdn_domain']?>/js/lib/jquery.fancybox.js?v=2.0.6"></script>
<link rel="stylesheet" type="text/css" href="<?php echo $page_var['cdn_domain']?>/css/ext/jquery.fancybox.css?v=2.0.6" media="screen" />
<style>table.bgcor tr{line-height:40px;}
table.bgcor tr.tdtitle{border-bottom:0;}
table.bgcor td{padding:5px;border-right:1px dotted #eee;}
table.bgcor .tdtitle td{border-right:0;}
table.bgcor img{height:22px;vertical-align:middle;}
table.bgcor .tdtitle{height:25px;background:#ffcb99;}
table.bgcor .tdtitle td{font-size:14px;}
.tbbuybtn{display:inline-block;width:40px;height:22px;background:#3ac2e9;color:#FFF;vertical-align:middle;text-align:center;line-height:22px;}
.tbbuybtn:hover{background:#60d9fb;}
.bgcor .sure{display:inline-block;margin:0;width:40px;height:22px;font-size:12px;line-height:22px;}
.agent_m{overflow:hidden;margin:15px auto 25px;width:230px;}
.agent_m span{float:left;display:block;color:#333;font-size:13px;line-height:26px;}
.agent_m .agt_m_t{float:left;display:block;margin-left:5px;width:150px;height:26px;border:1px solid #c1c1c1;}
#changeuserdiv .agent_sure{float:right;display:block;width:100px;height:28px;background:#fb629d none repeat scroll 0 0;color:#fff;text-align:center;font-size:14px;line-height:28px;}
</style>
<!--main-->
<div class="personbody">
<div class="person_left">
<?php $current_page="agentpay";
include_once('./include/personal_tpl/person_menu.html');
?>
</div>
<div class="person_right">
<div class="person_tab">
<ul id="tags">
<li class="selectTag"><a href="javascript:void(0)" onclick="selectTag('tagContent0',this)" id="tagContent0Btn">充值</a></li>
</ul>
</div>
<div id="tagContent">
<!--收到的礼物-->
<div class="tagContent selectTag" id="tagContent0">
<div class="basiccont">
<?php 
//价格等等
$service = $db->GetArray("select * from gift where giftid>=501 and giftid<=505 order by giftid asc");
$payType = array();
foreach ($service as $value) {
	$payType[$value["giftid"]] = $value;
}

$service2 = $db->GetArray("select * from agentpay where userid='{$user["userid"]}'");
$pay_num = array();
foreach ($service2 as $value) {
	$pay_num[$value["giftid"]] = $value["num"];
}
?>
<table width="100%" class="bgcor">
<tr class="tdtitle"><td>面值</td><td>剩余数量</td><td>单价(<?php echo $page_var['money_name']?>)</td><td>购买</td><td>充值</td></tr>
<?php foreach ($service as $value) :
$num = isset($pay_num[$value["giftid"]])?$pay_num[$value["giftid"]]:0;
?>
	<tr><td><?php echo $value["giftname"];?></td><td><?php echo $num;?></td><td><?php echo $value["giftprice"];?></td><td><a href="javascript:;" onClick="buy_giftpay(<?php echo $value["giftid"];?>)" class="tbbuybtn">购买</a></td><td><?php if($num>0){?><a href="javascript:;" onClick="openChooseAgent(<?php echo $value["giftid"];?>)" class="sure">充值</a><?php }?></td></tr>
<?php endforeach;?>
</table>

</div>
</div>
</div>

</div>
</div>
<!--main-->
<a class="fancybox" href="#changeuserdiv" id="changeuserdivA" style="display:none">Inline</a>
<div style="display:none;" class="xz_agent xz_agent_m" id="changeuserdiv">
<div class="agent_m"> <span>充值靓号</span> <input type="text" class="agt_m_t" id="chooseuserid"> </div>
<a onclick="PaycheckReUserID();" class="agent_sure agent_sure_m" href="javascript:void(0);">确认</a>
</div>
<script>
$('.infotxt').simpleDatepicker();
var payid = 0;
function openChooseAgent(id){
	payid = id;
	$("#chooseuserid").val("");
	$("#changeuserdivA").click();
}
function PaycheckReUserID(){
	//$.fancybox.close();
	if(!confirm('请确认给此用户充值吗？')){
		return false;
	}
	var tmp = $.trim($("#chooseuserid").val());
	if(tmp=="" || tmp==0){
		alert("请输入 充值靓号");
		return false;
	}
	$.post("/ajax/agentpay.php?action=pay",{'id':payid,'usernumber':tmp},function(r){
		alert(r.info);
		if(r.code==200){
			window.location.reload();
		}
	},"json");
}
function buy_giftpay(id){
	if(!confirm('请确认购买吗？')){
		return false;
	}
	$.post("/ajax/agentpay.php?action=buy",{'id':id},function(r){
		alert(r.info);
		if(r.code==200){
			window.location.reload();
		}
	},"json")
}
$(function(){
	$('.fancybox').fancybox();
});
</script>
<?php if($_GET['t']){
echo '<script>$("#'.$_GET['t'].'Btn").click();</script>';
}
?>