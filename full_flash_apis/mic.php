<?php
include('../include/header.inc.php');
$action=$_GET['action'];
if($_GET['cookie']){
	$_COOKIE['HFCOOKIE']=$_GET['cookie'];
}
//$db->debug = true;
switch($action){
	case 'up'://上麦,http://www.wpy.demo2015.com/full_flash_apis/mic.php?action=up&userid=19843&roomnumber=300030&cookie=861fd8b6c48938ff91b58ca919196b0c09a62ff85cd0b27fa00373581c5534d7&location=2&time=60
		$user=checklogin();
		$userid=(int)$_GET["userid"];
		$usernumber=$db->GetOne("select usernumber from user where userid=$userid");
		$roomnumber=(int)$_GET["roomnumber"];
		$touserid=$db->GetOne("select userid from user where usernumber=$roomnumber");
		$location=(int)$_GET["location"];
		$time=(int)$_GET["time"];
		if(!$user){//必须登录
			echo -1;
		}else if(!($user["userid"]==$userid || $user["usernumber"]==$roomnumber)){//用户只能操作自己，房主可以操作力
			echo -2;
		}else if(!in_array($location,array(2,3))){//只能操作2,3麦
			echo -3;
		}else if($usernumber==$roomnumber){//主播不能参于排麦
			echo -5;
		}else{
			$room = $db->GetRow("select m2,m3 from room_config where roomnumber='$roomnumber'");
			$price = getMicPrice($time);
			/*if($room["m".$location]==$usernumber){//自己已经在上面了
				echo -6;
			}else */if(!is_numeric($price)){//传入的麦时不正确
				echo -7;
			//}else if($room["m".$location]!=-1){//有人上麦则不允许其它人上
			//	echo -4;
			}else{
				//扣钱
				$db->Execute("update user set balance=balance-".$price.",totalcost=totalcost+".$price." where userid='{$user['userid']}' and balance>=".$price);
				if($price==0 || $db->Affected_Rows()>0){
					$db->Execute("update room_config set m{$location}=".$usernumber." where roomnumber={$roomnumber}");
					$balance=$user['balance']-$price;
					//记录消费
						$db->Execute("insert into balance_change_log
					 (`when`,why,giftid,giftnum,userid,touserid,money,balance,point,roomnumber,showid)
					 values('".time()."','1','470','$price','{$user['userid']}','$touserid','".(0-$price)."','$balance','0','$roomnumber','0')");
					echo $usernumber;
				}else{
					echo -8;
				}
			}
		}
		break;
	case 'down'://下麦,http://www.wpy.demo2015.com/full_flash_apis/mic.php?action=down&userid=19843&roomnumber=300030&cookie=861fd8b6c48938ff91b58ca919196b0c09a62ff85cd0b27fa00373581c5534d7&location=2
		$user=checklogin();
		$userid=(int)$_GET["userid"];
		$roomnumber=(int)$_GET["roomnumber"];
		$location=(int)$_GET["location"];
		if(!$user){//必须登录
			echo -1;
		}else if(!($user["userid"]==$userid || $user["usernumber"]==$roomnumber)){//用户只能操作自己，房主可以操作力
			echo -2;
		}else if(!in_array($location,array(2,3))){//只能操作2,3麦
			echo -3;
		}else{
			$db->Execute("update room_config set m{$location}=-1 where roomnumber={$roomnumber}");
			echo $userid;
		}
		break;
	case 'price'://排麦时间价格,http://www.wpy.demo2015.com/full_flash_apis/mic.php?action=price
		//60:500,120:1000,300:2500,1000:5000,1200:6000
		$res = getMicPrice();
		//print_r($res);
		/*
		$res = array(
			array(60,500),
			array(120,1000),
			array(300,2500),
			array(1000,5000),
			array(1200,6000),
		);
		*/
		echo json_encode($res);
		break;
}
include('../include/footer.inc.php');
//传入值是取时间段需要多少钱,不传，则是返回价格列表,echo getMicPrice(60);
function getMicPrice($time=null){
	global $global_config_data;
	$res = array();
	$tmp = explode(",",$global_config_data["mic_price"]);
	foreach($tmp as $value){
		$v = explode(":",$value);
		if(isset($v[0]) && isset($v[1])){
			$res[] = array(((int)$v[0]),((int)$v[1]));
			
			if($v[0]==$time){
				return (int)$v[1];
			}
		}
	}
	
	if($time==null){
		return $res;
	}
}