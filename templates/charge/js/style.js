// JavaScript Document
$(function(){
	var $aBtn=$(".amoLi li");
	var now=0;
	$aBtn.click(function(){
		now=$(this).index();
		tab();
	})
	
	function tab(){
		$aBtn.removeClass('clickBg');
		$aBtn.eq(now).addClass('clickBg');

	}
	
	var $waysBtn=$(".ways li");

	$waysBtn.click(function(){
		now=$(this).index();
		tabCli();
	})
	
	function tabCli(){
		$waysBtn.removeClass('cli');
		$waysBtn.eq(now).addClass('cli');

	}
	
	/*var $moreBtn=$(".banks li");

	$moreBtn.click(function(){
		now=$(this).index();
		tabClick();
	})
	
	function tabClick(){
		$moreBtn.removeClass('click');
		$moreBtn.eq(now).addClass('click');

	}*/



})