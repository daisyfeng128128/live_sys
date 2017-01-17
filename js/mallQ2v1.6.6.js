//充值页面用
var Mall={};
//充值页面通过代理充值
Mall.initProxyList=function(){
	Main.getDate({
		url:'ajax/ucenter/getAgentList.php'
	}, function(json){
		if(json){
			$('#proxyEdList').html(json.content);
			$('#proxyEdList li span').on('click',function(){
				agentid=$(this).attr('id').replace('agent','')
					$('#addProxy').html('<label>代理：</label><span id="ppNickName" class="fblod">'+$(this).text()+'</span> <a style="color:#FF6C00;font-size:14px" onclick="agentid=0;this.parentNode.style.display=\'none\';this.parentNode.innerHTML=\'\';">取消</a>').show();
				return false;
			});
			$('.proxyList iframe').height(89+$('#proxyEdList').height());
		}
	});
};
Mall.init=function(){
	$('.fancybox').fancybox();
	$('#bankName li').live({
		'click':function(){
			var chekNd=$(this).find('input');
			if(!chekNd.attr('checked')){
				chekNd.attr('checked','true');
			}
			return false;
		}
	});
	$(':radio').live('click',function(e){
		e.stopPropagation();
	});
	$('#selectRmbex').live('blur',function(){
		var v=$('#selectRmbex').val();
		var r = /^[0-9]*[1-9][0-9]*$/;
		if(!r.test(v)){
			$(this).val(0);
			$('#orderAmount2').val(0);
			Main.alert('请输入正整数');
		}else{
			$('#orderAmount').val(RMB_XNB*v);
		}
	});
	$('#selectRmbexips').live('blur',function(){
		var v=$('#selectRmbexips').val();
		var r = /^[0-9]*[1-9][0-9]*$/;
		if(!r.test(v)){
			$(this).val(0);
			Main.alert('请输入正整数');
		}else{
			$('#orderAmountips').val(RMB_XNB*v);
		}
	});
	$('#selectRmbex2').live('blur',function(){
		var v=$('#selectRmbex2').val();
		var r = /^[0-9]*[1-9][0-9]*$/;
		if(!r.test(v)){
			$(this).val(0);
			$('#orderAmount6').val(0);
			Main.alert('请输入正整数');
		}else{
			$('#orderAmount6').val(RMB_XNB*v);
		}
	});
	$('#paypalRmbex').live('blur',function(){
		var vp = $('#paypalRmbex').val();
		var rp = /^[0-9]*[1-9][0-9]*$/;
		if(!rp.test(vp)){
			$(this).val(0);
			$('#orderAmount4').val(0);
			Main.alert('请输入正整数');
		}else{
			$('#orderAmount4').val(6000*vp);
		}
	});
	$('#zhifupalRmbex').live('blur',function(){
		var vzp = $('#zhifupalRmbex').val();
		var rzp = /^[0-9]*[1-9][0-9]*$/;
		if(!rzp.test(vzp)){
			$(this).val(0);
			$('#orderAmount5').val(0);
			Main.alert('请输入正整数');
		}else{
			$('#orderAmount5').val(RMB_XNB*vzp);
		}
	});
	//代理弹出框,是面没有代理列表，再通过Mall.initProxyList();调用代理列表
	$("#btn_agent").live("click",function(){
		if(Main.logBox2){
			Main.logBox2.show();
		}else{
			Main.logBox2=new Popbox('ajax/ucenter/agent.html',520,452,'agent_close',function(){
				if(ie6){				
					$('.box_content').removeClass('box_content').addClass('box_content');
					$('.loginswitch').removeClass('loginswitch').addClass('loginswitch');
				}
				Mall.initProxyList();
			});
			Main.logBox2.init();
		}
		Mall.initProxyList();
	});
	//充值页面
	$('.base_info input:radio').live('change',function(){
		if($(this).parent().hasClass('gcard')){
			$('#selectRmb3').change();
		}else{
			$('#selectRmb1').change();
		}
	});
	
};
//网上充值 用户下来列表
function selectRmb2(){
	$('#orderAmount').val(RMB_XNB*$('#selectRmb2').val());
}
//ips
function selectRmbips(){
	$('#orderAmount').val(RMB_XNB*$('#selectRmb2').val());
}
function selectRmb6(){
	$('#orderAmount6').val(RMB_XNB*$('#selectRmb6').val());
}
//手机充值
function selectRmb(){
	$('#orderAmount1').val(Phone_REDUCE*RMB_XNB*$('#selectRmb1').val());
	$('.gscale').text(Phone_REDUCE*RMB_XNB);
}
//
function selectRmb3(){
	$('#orderAmount3').val(JUN_REDUCE*RMB_XNB*$('#selectRmb3').val());
	$('.gscale').text(JUN_REDUCE*RMB_XNB);
}
//paypal充值
function selectRmb4(){
	$('#orderAmount4').val(6000*$('#selectRmb4').val());
}
//支付宝充值
function selectRmb5(){
	$('#orderAmount5').val(RMB_XNB*$('#selectRmb5').val());
}
//显示通过代理充值框
var Popbox=function(url,w,h,cls,fun,p,nmsk,hFun){
	this.url=url;this.w=w;this.h=h;this.cls=cls,this.fun=fun,this.nmsk=nmsk,this.hFun=hFun;
	if(p){
		this.p=p
	}else{
		this.p=document.createElement('div');
		this.p.id='popbox'+new Date().getTime();
	}
	this.p.className+=' popbox';
	if(!nmsk){
		this.m=document.createElement('div');
		this.m.className='bgmask';
	}
};
Popbox.prototype={
	get:function(){
		var that=this;
		if(that.url){
			var x=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
			x.onreadystatechange=function(){
				if(x.readyState==4&&x.status==200){
					that.p.innerHTML=x.responseText;
					that.p.style.width=that.w+'px';that.p.style.height=that.h+'px';
					that.show();
					if(that.fun){that.fun();}
					$ID(that.cls).onclick=function(){
						that.hide.call(that);
					}
				}
			};
			x.open('GET',that.url,1);x.send(null)
		}else{
			this.p.style.width=this.w+'px';this.p.style.height=this.h+'px';
			if(this.fun){this.fun();}
			$ID(this.cls).onclick=function(){
				that.hide.call(that);
			}
		}
	},
	init:function(){
		var that=this;
		if(!this.nmsk){
			document.body.appendChild(this.m);
			this.m.onclick=function(){
				that.hide.call(that);
			};
		}
		document.body.appendChild(this.p);
		this.get();
	},
	show:function(text){
		var d=document,b=d.body,e=d.documentElement,$p=$('#'+this.p.id);
		this.p.style.display='block';
		if(text){
			$('#msgCon').html(text);
		}
		if(!this.nmsk){
			this.m.style.display='block';
			this.m.style.height=Math.max(Math.max(b.scrollHeight,e.scrollHeight),Math.max(b.clientHeight,e.clientHeight))+'px';
			this.m.style.zIndex=$p.css('zIndex')-1;
		}
		posCenter($p);
	},
	hide:function(){
		this.p.style.display='none';
		if(!this.nmsk){
			this.m.style.display='none';
		}
		if(this.hFun){
			this.hFun();
		}
	}
};
var posCenter=function(p){
	var position=p.css('position');
	var page={
		top:'fixed'==position?0:(document.documentElement.scrollTop||document.body.scrollTop),
		width:document.documentElement.clientWidth||document.body.clientWidth,
		height:document.documentElement.clientHeight||document.body.clientHeight
	};
	var t=(page.height/2)-(p.height()/2); t=t<10?10:t;
	p.css('top',t+page.top);
	p.css('left',(page.width/2)-(p.width()/2));
};
//给他人充值
function openChooseWindow(){
	$("#changeuserdivA").click();
}
function checkReUserID(){
	var tmp = $.trim($("#chooseuserid").val());
	if(tmp=="" || tmp==0){
		Main.alert("请输入 充值靓号");
		return false;
	}
	$.get('/ajax/get_user_info.php?usernumber='+tmp,function(r){
		if(r.status==200){
			$(".pry-t02 span").html(r.usernumber+'('+r.nickname+')');
			chooseuserid = r.userid;
			$.fancybox.close();
		}else{
			Main.alert("输入 充值靓号不正确");
		}
	},'json');
}