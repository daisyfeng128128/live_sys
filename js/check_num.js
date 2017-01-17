// JavaScript Document

$(function(){
	$(".phone_num").focus(function(){
		$(".phone_num").parent().addClass("show1");
	
	});
	$(".phone_num").blur(function(){
		var re=/^(13\d|147|15\d|18\d)\d{8}$/;

		if($(".phone_num").val()==""){
			$(".phone_num").parent().removeClass("show1");
			$(".phone_num").parent().removeClass("show2");
			$(".phone_num").parent().removeClass("show3");
			
			
		}else if(re.test($(".phone_num").val())){
			$(".phone_num").parent().removeClass("show3");
			$(".phone_num").parent().addClass("show2");
		}else{
			$(".phone_num").parent().removeClass("show2");
			$(".phone_num").parent().addClass("show3");
		}
	});
	
	$(".qq_num").focus(function(){
		$(".qq_num").parent().addClass("cur1");
	
	});
	$(".qq_num").blur(function(){
		var re=/^[1-9]\d{4,11}$/;

		if($(".qq_num").val()==""){
			$(".qq_num").parent().removeClass("cur1");
			$(".qq_num").parent().removeClass("cur2");
			$(".qq_num").parent().removeClass("cur3");
			
			
		}else if(re.test($(".qq_num").val())){
			$(".qq_num").parent().removeClass("cur3");
			$(".qq_num").parent().addClass("cur2");
		}else{
			$(".qq_num").parent().removeClass("cur2");
			$(".qq_num").parent().addClass("cur3");
		}
	});
	
	
	$(".idCard").focus(function(){
		$(".idCard").parent().addClass("show1");
	
	});
	$(".idCard").blur(function(){
		var re=/^(^\d{18}$|^\d{17}(\d|X|x))$/;

		if($(".idCard").val()==""){
			$(".idCard").parent().removeClass("show1");
			$(".idCard").parent().removeClass("show2");
			$(".idCard").parent().removeClass("show3");


		}else if(re.test($(".idCard").val())){
			$(".idCard").parent().removeClass("show3");
			$(".idCard").parent().addClass("show2");
		}else{
			$(".idCard").parent().removeClass("show2");
			$(".idCard").parent().addClass("show3");
		}
	});

});

function checkform1(){
    if($("#accept").is(':checked')){
        $(".isacpt").hide();
        return true;
    }else{
        $(".isacpt").show();
        return false;
    }
}