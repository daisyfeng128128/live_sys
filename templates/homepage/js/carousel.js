// JavaScript Document
window.onload=function(){
	var oCaro=document.getElementById('carousel');
	var oPlay=document.getElementById('play');
	var oL=document.getElementById("ol");
	var aLi=oL.children;
	var oUl=oPlay.children[2];
	var now=0;
	var ready=true;
	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=oUl.children.length*oUl.children[0].offsetWidth+'px';
	
	for(var i=0;i<aLi.length;i++){//添加点击
		(function(index){
			aLi[i].onclick=function(){
				now=index
				tab();
			};	
		})(i);
	}
	function tab(){//切换
		for(var i=0;i<aLi.length;i++){
			aLi[i].className='fl';	
		}
		if(now==3){
			aLi[0].className='active fl';	
		}else{
			aLi[now].className='active fl';	
		}
		//oUl.style.left=-index*oUl.children[0].offsetWidth+'px';
		move(oUl,{left:-now*oUl.children[0].offsetWidth},{time:700,fn:function(){
			ready=true;
			if(now==3){
				//归位
				oUl.style.left=0;
				now=0;	
			}
		}});	
	}
	
	function next(){
		now++;
		if(now==2*aLi.length){
			now=aLi.length;
		}
		tab();
	
	}
	
	var timer=setInterval(next,2500);
	oCaro.onmouseover=function(){
		clearInterval(timer);
	};
	clearInterval(timer);
	oCaro.onmouseout=function(){
		timer=setInterval(next,2500);
	};
	
}