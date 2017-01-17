<?php
/*
注册成功回调
*/
if(false && $register_success_userid){
	$user = $db->GetRow("select * from user where userid='$register_success_userid'");
	
	//注册就送3天体验座驾（新注册用户自动生成3天体验座驾）
	$giftinfo = array("type"=>"car","giftid"=>"9166","txt"=>"乌龟座驾3天","valid_day"=>"3");
	giveGift($giftinfo,$user);
	
	//注册赠送四款0秀币礼物放置库存，赠送每款礼物99个,闪耀，毽子，忐忑，小礼炮。
	$db->Execute("insert into giftstore(userid,giftid,num)values 
	('$register_success_userid','9134','99'),
	('$register_success_userid','9130','99'),
	('$register_success_userid','9116','99'),
	('$register_success_userid','9083','99')");
}