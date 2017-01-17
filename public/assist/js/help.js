// JavaScript Document
$(function(){
	$('.serContent .serviLeft >li').click(function (){
		$('.serContent .serviLeft >li').removeClass('active');
		$(this).addClass('active');
		
		$('.serContent .seRight >li').hide();
		$('.serContent .seRight >li').eq($(this).index()).show();
	});
});