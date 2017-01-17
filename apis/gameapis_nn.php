<?php
include("../include/header.inc.php");
//$db->debug = true;
$game_type=(int)$global_config_data["game_nn_type"];//0 全随机,1 固定胜率
$game_win_point=(int)$global_config_data["game_nn_win_point"];//0 0%胜率 1 25%胜率 2 50%胜率 3 75%胜率
switch($_GET['action']){
	case 'sendcoin';//下注
		//gameapi.app100688440.twsapp.com/gameThirdParty/payMoney?token=c8j5afv9cl4dwjqyfl9do&userId=100804&money=100
		/*
		$result_obj=json_decode(file_get_contents('http://gameapi.app100688440.twsapp.com/gameThirdParty/payMoney?token='.$_GET['token'].'&userId='.$_GET['userid']."&money=".(int)$_GET['betmoney']));
		echo $result_obj->data->balance."|".$result_obj->data->orderNumber;
		if($result_obj->result==1){
			$db->Execute("insert into nnbet(userid,orderid,betnum,betmoney,token)values('$_GET[userid]','".$result_obj->data->orderNumber."','$_GET[betnum]','$_GET[betmoney]','$_GET[token]')");
		}
		*/
		$betmoney = (int)$_GET['betmoney'];
		$betmoney = $betmoney<0?0:$betmoney;
		
		$user=checklogin();
		$db->Execute("update user set gamemoney=gamemoney-$betmoney where userid='{$user["userid"]}' and gamemoney>=$betmoney");
		if($db->Affected_Rows()>0){
			$db->Execute("insert into nnbet(userid,betnum,betmoney)values('$_GET[userid]','$_GET[betnum]','$betmoney')");
			echo ($user["gamemoney"]-$betmoney)."|".$db->Insert_ID();
		}
	break;
	case 'roundover'://计算胜率
		$cards=getRandCards(25);		
		if($game_type==0){//全随机
			$cardstr=implode(',',$cards);
			$tmp=getNN(array_slice ($cards, 0, 5));
			$result[0]=$tmp['maxN'];
			if($result[0]==0) $result[0]=11;
			$tmp=getNN(array_slice ($cards, 5, 5));
			$result[1]=$tmp['maxN'];
			if($result[1]==0) $result[1]=11;
			$tmp=getNN(array_slice ($cards, 10, 5));
			$result[2]=$tmp['maxN'];
			if($result[2]==0) $result[2]=11;
			$tmp=getNN(array_slice ($cards, 15, 5));
			$result[3]=$tmp['maxN'];
			if($result[3]==0) $result[3]=11;
			$tmp=getNN(array_slice ($cards, 20, 5));
			$result[4]=$tmp['maxN'];
			if($result[4]==0) $result[4]=11;
			$resultstr=implode(',',$result);
			$betresult[1]=getMaxPeer(array_slice ($cards, 0, 5),array_slice ($cards, 5, 5));
			$betresult[2]=getMaxPeer(array_slice ($cards, 0, 5),array_slice ($cards, 10, 5));
			$betresult[3]=getMaxPeer(array_slice ($cards, 0, 5),array_slice ($cards, 15, 5));
			$betresult[4]=getMaxPeer(array_slice ($cards, 0, 5),array_slice ($cards, 20, 5));
		}
		else if($game_type==1){//固定胜率
			$tableCards = array (array_slice ($cards, 0, 5), 
			 array_slice ($cards, 5, 5),
			 array_slice ($cards, 10, 5),
			 array_slice ($cards, 15, 5),
			 array_slice ($cards, 20, 5)); 
			//25%胜率，就是天地玄黄只有一家比庄家大，就是庄家排行第二，50%庄家排行第三，75%庄家排行第四
			//从大到小取出5副牌
			usort($tableCards, "cmp"); // 排序处理（从大到小）
			$dealerCards=$tableCards[$game_win_point];
			unset($tableCards[$game_win_point]);//删除庄家牌
			//然后天地玄黄打乱
			shuffle($tableCards);
			$cardstr=implode(',',$dealerCards).",".implode(',',$tableCards[0]).",".implode(',',$tableCards[1]).",".implode(',',$tableCards[2]).",".implode(',',$tableCards[3]);
			$tmp=getNN($dealerCards);
			$result[0]=$tmp['maxN'];
			if($result[0]==0) $result[0]=11;
			$tmp=getNN($tableCards[0]);
			$result[1]=$tmp['maxN'];
			if($result[1]==0) $result[1]=11;
			$tmp=getNN($tableCards[1]);
			$result[2]=$tmp['maxN'];
			if($result[2]==0) $result[2]=11;
			$tmp=getNN($tableCards[2]);
			$result[3]=$tmp['maxN'];
			if($result[3]==0) $result[3]=11;
			$tmp=getNN($tableCards[3]);
			$result[4]=$tmp['maxN'];
			if($result[4]==0) $result[4]=11;
			$resultstr=implode(',',$result);
			$betresult[1]=getMaxPeer($dealerCards,$tableCards[0]);
			$betresult[2]=getMaxPeer($dealerCards,$tableCards[1]);
			$betresult[3]=getMaxPeer($dealerCards,$tableCards[2]);
			$betresult[4]=getMaxPeer($dealerCards,$tableCards[3]);
		}
		$rs=$db->Execute("select * from nnbet where awardresult is null");
		$z=0;
		while($arr=$rs->FetchRow()){
			$add=$betresult[$arr['betnum']]*$arr['betmoney']*2;
			if($add){
				$addmoney[$arr['userid']]+=$add;
				roomAnn("恭喜 ".$db->GetOne("select nickname from user where userid='{$arr['userid']}'")." 在牛牛游戏中赚得 ".($add)." 游戏币");
				$db->Execute("update user set gamemoney=gamemoney+$add where userid='{$arr["userid"]}'");
				//file_get_contents('http://gameapi.app100688440.twsapp.com/gameThirdParty/moneyBack?token='.$arr['token'].'&userId='.$arr['userid']."&money=".$add."&orderNumber=".$arr['orderid']);
				$z-=$add;
				$db->Execute("update nnbet set awardresult='$resultstr',token='{$add}' where orderid={$arr["orderid"]}");
			}
			else{
				$z+=$arr['betmoney'];
				$db->Execute("update nnbet set awardresult='$resultstr',token=0 where orderid={$arr["orderid"]}");
			}
		}
		//$db->Execute("update nnbet set awardresult='$resultstr' where awardresult is null");
		$str[]="0:0";
		foreach($addmoney as $uid=>$money){
			$str[]=$uid.":".$money;
		}
		echo $cardstr.'|'.$resultstr.'|'.$z.'|'.implode(',',$str);
	break;
}
function cmp($a, $b) {
	if (getMaxPeer($a,$b)==0) {
		return -1 ;
	}
	else{
		return 1;
	}
}
function getMaxPeer($cards1,$cards2){
	$nn1=getNN($cards1);
	$nn2=getNN($cards2);
	if($nn1['maxN']>$nn2['maxN']){
		return 0;
	}
	else if($nn1['maxN']==$nn2['maxN']){
		if($nn1['maxCard']>=$nn2['maxCard']){
			return 0;
		}
		else{
			return 1;
		}
	}
	else{
		return 1;
	}
}
function getMaxCard($card1,$card2){
	$card1val=$card1-(13*floor($card1/13));
	if($card1val==0){
		$card1val=13;//K
	}
	$card2val=$card2-(13*floor($card2/13));
	if($card2val==0){
		$card2val=13;//K
	}
	if($card1val>$card2val){
		return $card1;
	}
	else if($card1val<$card2val){
		return $card2;
	}
	else{//相等比花色
		if($card1<$card2){
			return $card1;
		}
		else{
			return $card2;
		}
	}
}
function getMaxCardInArray($cards){
	$maxCard=-1;
	for($i=0;$i<count($cards);$i++){
		if($maxCard==-1){
			$maxCard=$cards[$i];
		}
		else{
			$maxCard=getMaxCard($cards[$i],$maxCard);
		}
	}
}
//计算牛牛结果
function getNN($cards){
	$source_cards=$cards;
	for($i=0;$i<5;$i++){//去花色JQK=10
		$cards[$i]=$cards[$i]-(13*floor($cards[$i]/13));
		if($cards[$i]==0){
			$cards[$i]=13;//K
		}
		if($cards[$i]>10){
			$cards[$i]=10;
		}
	}
	$maxN=0;
	$maxCard=-1;
	if(($cards[0]+$cards[1]+$cards[2])%10==0){
		$maxN=($cards[3]+$cards[4])%10;
	}
	if(($cards[0]+$cards[1]+$cards[3])%10==0){
		$nowN=($cards[2]+$cards[4])%10;
		if($nowN==0){
			$nowN=10;
		}
		if($nowN>$maxN){
			$maxN=$nowN;
		}
	}
	/*----------------------------------------xuefen wirte-----*/
	if(($cards[0]+$cards[1]+$cards[4])%10==0){
		$nowN=($cards[2]+$cards[3])%10;
		if($nowN==0){
			$nowN=10;
		}
		if($nowN>$maxN){
			$maxN=$nowN;
		}
	}
	if(($cards[0]+$cards[2]+$cards[3])%10==0){
		$nowN=($cards[1]+$cards[4])%10;
		if($nowN==0){
			$nowN=10;
		}
		if($nowN>$maxN){
			$maxN=$nowN;
		}
	}
	if(($cards[0]+$cards[2]+$cards[4])%10==0){
		$nowN=($cards[1]+$cards[3])%10;
		if($nowN==0){
			$nowN=10;
		}
		if($nowN>$maxN){
			$maxN=$nowN;
		}
	}
	if(($cards[0]+$cards[3]+$cards[4])%10==0){
		$nowN=($cards[1]+$cards[2])%10;
		if($nowN==0){
			$nowN=10;
		}
		if($nowN>$maxN){
			$maxN=$nowN;
		}
	}
	if(($cards[1]+$cards[2]+$cards[3])%10==0){
		$nowN=($cards[0]+$cards[4])%10;
		if($nowN==0){
			$nowN=10;
		}
		if($nowN>$maxN){
			$maxN=$nowN;
		}
	}
	if(($cards[1]+$cards[2]+$cards[4])%10==0){
		$nowN=($cards[0]+$cards[3])%10;
		if($nowN==0){
			$nowN=10;
		}
		if($nowN>$maxN){
			$maxN=$nowN;
		}
	}
	if(($cards[2]+$cards[3]+$cards[4])%10==0){
		$nowN=($cards[0]+$cards[1])%10; 
		if($nowN==0){
			$nowN=10;
		}
		if($nowN>$maxN){
			$maxN=$nowN;
		}
	}
	/*------------------------------------------------------------------xuefen wirte-----*/
	
	$maxCard=getMaxCardInArray($source_cards);
	return array('maxN'=>$maxN,'maxCard'=>$maxCard);
}
//获取随机num张牌
function getRandCards($num){
	//5副牌
	$allcard=array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52);
	//洗牌
	shuffle($allcard);
	return array_slice ($allcard, 0, $num);  
}
include("../include/footer.inc.php");