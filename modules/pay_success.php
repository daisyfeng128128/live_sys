<?php
/*
充值成功回调
1.首充10~99：世界喇叭*3；黄色VIP*7；新人驾到”绿色徽章*7天座驾自行车*7；等级 直升3富“ ；
2.首充100~299： 世界喇叭*5；紫色VIP*7 ；“钱力股”黄色徽章*10天,座驾“平衡车”10天；等级直升4富；
3.首充300以上： 世界喇叭*9黑色VIP *15；“钱力无限”红色徽章*15天；座驾“摩托车”*15；等级 直升5富；
*/
//file_put_contents(($app_path."modules/data/pay_success.php.".date("YmdHis").".".rand(1, 100)), $pay_success_userid);
if(false && $pay_success_userid){
	//$db->debug = true;
	$count = $db->GetOne("select count(*) from orders where userid='$pay_success_userid' and paychannel!=0 and `status`=1");
	if($count==1){//第1次成功充值
		$user = $db->GetRow("select * from user where userid='$pay_success_userid'");
		$arr = $db->GetRow("select * from orders where userid='$pay_success_userid' and paychannel!=0 and `status`=1");
		file_put_contents(($app_path."modules/data/pay_success.php.".date("YmdHis").".ok.".rand(1, 100)), ("money:".$arr["money"]));
		global $global_config_data;//level.func.php文件需要用到,下次写是时，函数里面不要再include
		if($arr["money"]>=10 && $arr["money"]<=99){
			giveGift(array("type"=>"daoju","giftid"=>"65","txt"=>"广播","valid_day"=>"3"),$user);
			giveGift(array("type"=>"vip","giftid"=>"401","txt"=>"黄色VIP","valid_day"=>"7"),$user);
			giveGift(array("type"=>"xinren","giftid"=>"451","txt"=>"绿色徽章","valid_day"=>"7"),$user);
			//giveGift(array("type"=>"car","giftid"=>"9222","txt"=>"自行车","valid_day"=>"7"),$user);
		}else if($arr["money"]>=100 && $arr["money"]<=299){
			giveGift(array("type"=>"daoju","giftid"=>"65","txt"=>"广播","valid_day"=>"5"),$user);
			giveGift(array("type"=>"vip","giftid"=>"402","txt"=>"紫色VIP","valid_day"=>"7"),$user);
			giveGift(array("type"=>"xinren","giftid"=>"452","txt"=>"黄色徽章","valid_day"=>"10"),$user);
			//giveGift(array("type"=>"car","giftid"=>"9220","txt"=>"平衡木","valid_day"=>"10"),$user);
		}else if($arr["money"]>=300){
			giveGift(array("type"=>"daoju","giftid"=>"65","txt"=>"广播","valid_day"=>"9"),$user);
			giveGift(array("type"=>"vip","giftid"=>"403","txt"=>"黑色VIP","valid_day"=>"15"),$user);
			giveGift(array("type"=>"xinren","giftid"=>"453","txt"=>"红色徽章","valid_day"=>"15"),$user);
			//giveGift(array("type"=>"car","giftid"=>"9221","txt"=>"摩托","valid_day"=>"15"),$user);
		}
	}
}