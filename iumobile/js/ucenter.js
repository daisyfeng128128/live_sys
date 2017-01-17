$(function(){
	loadData_bill_gift();
	loadData_bill_pay();
	loadData_buy_car();
	loadData_my_car();
	
	$(".buy_vip_tab li").click(function(){
		$("#content_buy_vip>div").hide();
		$("#"+$(this).attr("rel")).show();
		$(".buy_vip_tab li").removeClass("on");
		$(this).addClass("on");
	});
	//滚动条滚动时
	$(document).scroll(function(){
		if ($(document).height() - $(window).scrollTop() - $(window).height()<100){
			thisPage=fnCalledFromAs3("getPage");
			if(thisPage=='bill_gift'){
				loadData_bill_gift();
			}else if(thisPage=='bill_pay'){
				loadData_bill_pay();
			}else if(thisPage=='buy_car'){
				loadData_buy_car();
			}
		}
	});
});
function fnCalledFromAs3( data )
{
	if(data=="getPage"){
		var url = window.location.toString();
		var id = url.split('#')[1];
		return id;
	}
}
//消费记录
photoWallPage_bill_gift = 1;
photoIsLoading_bill_gift = false;
function loadData_bill_gift(){
	if(photoWallPage_bill_gift<1){
		$("#wfLoading_bill_gift").html("已经是最后一页了");
		return false;
	}
	if(photoIsLoading_bill_gift){
		return false;
	}
	photoIsLoading_bill_gift = true;
	$.ajax({
		url : '/iumobile/ucenter.php?action=getgiftlist&p='+photoWallPage_bill_gift,
		dataType : 'json',
		success : function(json){
			photoIsLoading_bill_gift = false;
			if(typeof json == 'object'){
				var $row=$("#datalist_bill_gift");
				var len = json.length;
				if(len>1){
					photoWallPage_bill_gift++;
				}else{
					photoWallPage_bill_gift=0;
				}
				for(var i=0, l=len; i<l; i++){
					row = json[i];
var htmltmp = '<li>\
          <dl>\
            <dt><h4 class="title">消费项目：'+row.giftname+'</h4></dt>\
			<dd>接受人：'+row.touserinfo+'</dd>\
			<dd>数量:'+row.giftnum+'</dd>\
			<dd>消费'+money_name+':'+row.money+'</dd>\
            <dd class="date ect-color999">'+row.when+'</dd>\
          </dl>\
</li>';
					$item = $(htmltmp).hide();
					
					$row.append($item);
					$item.fadeIn();
				}	
			}
		}
	});
}
//充值记录
photoWallPage_bill_pay = 1;
photoIsLoading_bill_pay = false;
function loadData_bill_pay(){
	if(photoWallPage_bill_pay<1){
		$("#wfLoading_bill_pay").html("已经是最后一页了");
		return false;
	}
	if(photoIsLoading_bill_pay){
		return false;
	}
	photoIsLoading_bill_pay = true;
	$.ajax({
		url : '/iumobile/ucenter.php?action=getpaylist&p='+photoWallPage_bill_pay,
		dataType : 'json',
		success : function(json){
			photoIsLoading_bill_pay = false;
			if(typeof json == 'object'){
				var $row=$("#datalist_bill_pay");
				var len = json.length;
				if(len>1){
					photoWallPage_bill_pay++;
				}else{
					photoWallPage_bill_pay=0;
				}
				for(var i=0, l=len; i<l; i++){
					row = json[i];
var htmltmp = '<li>\
          <dl>\
            <dt><h4 class="title">充值单号：'+row.orderid+'</h4></dt>\
			<dd>充值方式:'+row.paychannel+'</dd>\
			<dd>充值金额:￥'+row.money+'</dd>\
			<dd>获取'+money_name+':'+row.balanceadd+'</dd>\
			<dd>状态:'+row.status+'</dd>\
            <dd class="date ect-color999">'+row.lastupdate+'</dd>\
          </dl>\
</li>';
					$item = $(htmltmp).hide();
					
					$row.append($item);
					$item.fadeIn();
				}	
			}
		}
	});
}
//我的坐驾列表
photoIsLoading_my_car = false;
function loadData_my_car(){
	if(photoIsLoading_my_car){
		return false;
	}
	photoIsLoading_my_car = true;
	$.ajax({
		url : '/iumobile/ucenter.php?action=getmycarlist',
		dataType : 'json',
		success : function(json){
			photoIsLoading_my_car = false;
			if(typeof json == 'object'){
				var $row=$("#datalist_my_car");
				$row.html("");
				var len = json.length;
				var ishave;
				for(var i=0, l=len; i<l; i++){
					row = json[i];
					if(row.active=="1"){
						ishave='<span class="active1">当前正在使用</span>';
					}else{
						var url1 = '/ucenter.php?action=caractive&type=json&carid='+row.carid;
						var url2 = '/ucenter.php?action=cardel&type=json&carid='+row.carid;
						ishave='<div class="info3"><a href="javascript:;" onClick="if(confirm('+"'"+'确定启用此坐驾吗？'+"'"+'))getUrlmyCar('+"'"+url1+"'"+')" class="tbbuybtn_red buybtn ui-link">启用</a><a href="javascript:;" onClick="if(confirm('+"'"+'确定删除此座驾吗？'+"'"+'))getUrlmyCar('+"'"+url2+"'"+')" class="tbbuybtn_red buybtn ui-link" style="margin-right:5px;background:red!important;">删除</a></div>';
					}
var htmltmp = '<li><img class="carimg" src="/static_data/car/smallimages/'+row.giftimage+'"/><div class="info2"><span class="f_name">'+row.giftname+'</span><span class="youxiaoqi">有效期:'+row.vailddate+'</span></div>'+ishave+'</li>';
					$item = $(htmltmp).hide();
					$row.append($item);
					$item.fadeIn();
				}
				$item = $(htmltmp).hide();
				$item.fadeIn();
			}
		}
	});
}
function getUrlmyCar(url){
	$.ajax({
		url : url,
		dataType : 'json',
		success : function(json){
			window.location.reload();
		}
	});
}
//购买坐驾列表
photoWallPage_buy_car = 1;
photoIsLoading_buy_car = false;
function loadData_buy_car(){
	if(photoWallPage_buy_car<1){
		$("#wfLoading_buy_car").html("已经是最后一页了");
		return false;
	}
	if(photoIsLoading_buy_car){
		return false;
	}
	photoIsLoading_buy_car = true;
	$.ajax({
		url : '/iumobile/ucenter.php?action=getbuycarlist&p='+photoWallPage_buy_car,
		dataType : 'json',
		success : function(json){
			photoIsLoading_buy_car = false;
			if(typeof json == 'object'){
				var $row=$("#datalist_buy_car");
				var len = json.length;
				if(len>1){
					photoWallPage_buy_car++;
				}else{
					photoWallPage_buy_car=0;
				}
				for(var i=0, l=len; i<l; i++){
					row = json[i];
var htmltmp = '<li><img class="carimg" src="/static_data/car/smallimages/'+row.giftimage+'"/><div class="info2"><span class="f_name">'+row.giftname+'</span><span class="f_r">'+row.giftprice+'</span><span class="balance">'+money_name+'</span></div><a href='+"'"+'javascript:buy_car("'+row.giftid+'","'+row.giftname+'","'+row.giftprice+'")'+"'"+' class="tbbuybtn_red buybtn ui-link">购买</a></li>';
					$item = $(htmltmp).hide();
					
					$row.append($item);
					$item.fadeIn();
				}	
			}
		}
	});
}
var carid;
function buy_car(id,name,money){
	if(confirm("您确定要购买"+name+"? 这将花费"+money+money_name)){
		carid=id;
		buyokcar();
	}
}
function buyokcar(){
	//发出购买请求
	$.post("/ajax/buy_car.php",{'id':carid},function(r){
		if(r=="-1"){
			alert("余额不足，请先充值");
		}
		else if(r=="-2"){
			alert("请先登录");
		}
		else{
			alert("恭喜您，购买成功");
			window.location.reload();
		}
	});
	return true;

}
//买vip
var vipid;
function buy_vip(id,name,money,month){
	if(confirm("您确定要购买"+name+"? 这将花费"+money+money_name)){
		vipid=id;
		buyokvip();
	}
}
function buyokvip(){
	$.post("/ajax/buy_vip.php",{	'id':vipid	},function(r){
		if(r=="-1"){
			alert("余额不足，请先充值");
		}
		else if(r=="-2"){
			alert("请先登录");
		}
		else if(r=="-4"){
			alert("出错了，请刷新页面再试");
		}
		else if(r=="-5"){
			alert("等级不够，不可以购买");
		}
		else{
			alert("恭喜您，购买成功");
			window.location.reload();
		}
	});
	return true;
}
//买守护
function buy_guard(type,txt,money,nickname,roomnumber,userid){
	if(confirm("您确定要购买"+nickname+"("+roomnumber+")的守护,"+txt+"? 这将花费"+money+money_name)){
		if(userid==0||userid==""){
			alert("出错了，请重新操作");
			return false;
		}
		if(type==0||type==""){
			alert("出错了,请重新操作");
			return false;
		}
		$.get("/ajax/buy_guard.php?guard_userid="+userid+"&type="+type, function(data){
			alert(data);
		});
	}
}
//充值页
function select_pay(v,obj){
	$(".pay_top a").removeClass("pay_link_on");
	if(v==""){
		$(".pay_top a[rel=other]").addClass("pay_link_on");
		$("#pay .info_input1").show();
	}else{
		$("#p3_Amt").val(v);
		$(".pay_top a[rel="+v+"]").addClass("pay_link_on");
		$("#pay .info_input1").hide();
	}
	change_money()
}
function change_money(){
	var tmp = parseInt($("#p3_Amt").val())*RMB_XNB;
	$("#pay_txt").html("可获得"+tmp+money_name);
}
function pay_go(){
	if(!$.isNumeric($("#p3_Amt").val())){
		alert('请选择/输入正确的充值金额');
		return;
	}
	if($("#p3_Amt").val()<=0){
		alert('充值金额需要大于0');
		return;
	}
	window.location.href="/apis/alipay_wap/alipayto.php?p3_Amt="+$("#p3_Amt").val()+"&paychannel=7";
}