// JavaScript Document
window.onload = function () {
    var oCaro = document.getElementById('carousel');
    var oPlay = document.getElementById('play');
    var oL = document.getElementById("ol");
    var aLi = oL.getElementsByTagName("li");
    var oUl = oPlay.children[2];

    var oNext = document.getElementById('ne');
    var oPrev = document.getElementById('pr');

    var now = 0;
    var ready = true;
    oUl.innerHTML += oUl.innerHTML;
    if(oUl.getElementsByTagName("li").length==0){
		return;
	}else{
		oUl.style.width = oUl.children.length * oUl.children[0].offsetWidth + 'px';
	
		for (var i = 0; i < aLi.length; i++) {//添加点击
			(function (index) {
				aLi[i].onclick = function () {
					now = index
					tab();
				};
			})(i);
		}
		function tab() {//切换
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].className = '';
			}
			if (now == aLi.length) {
				aLi[0].className = 'active';
			} else if (now < aLi.length) {
				aLi[now].className = 'active';
			}
			//oUl.style.left=-index*oUl.children[0].offsetWidth+'px';
			move(oUl, {left: -now * oUl.children[0].offsetWidth}, {
				time: 700, fn: function () {
					ready = true;
					if (now == aLi.length) {
						//归位
						oUl.style.left = 0;
						now = 0;
					}
				}
			});
		}
	
		function next() {
			now++;
			if (now == 2 * aLi.length) {
				now = aLi.length;
			}
			tab();
	
		}
	
		var timer = setInterval(next, 2500);
		oCaro.onmouseover = function () {
			clearInterval(timer);
		};
		clearInterval(timer);
		oCaro.onmouseout = function () {
			timer = setInterval(next, 2500);
		};
	
		oNext.onclick = function () {
			if (!ready) return;
			ready = false;
			now++;
			tab();
		};
	
		oPrev.onclick = function () {
			if (!ready) return;
			ready = false;
			now--;
			if (now == -1) {
				oUl.style.left = -oUl.offsetWidth / 2 + 'px';
				now = aLi.length - 1;
			}
			tab();
		};
	
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].index = i;
			aLi[i].onmouseover = function () {
				now = this.index;
				tab();
			};
		}
	}

}
$(function(){
	$("#writeBg").click(function(){
		$("#modify").fadeIn().slideDown();
	});
	$("#modBtn").click(function(){
		$("#modify").fadeOut().slideUp();
	});
	$(".chargeBg").click(function(){
		$(".qkCharge").fadeIn().slideDown();
	});
	$(".chargeBtn .btn").click(function(){
		$(".qkCharge").fadeIn().slideDown();
	});
	
	$('#close').click(function(ev){
			$('.qkCharge').fadeOut().slideUp();
			ev.stopPropagation();//阻止冒泡	
		});



});