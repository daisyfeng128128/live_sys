<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include('../include/header.inc.php');
include_once($app_path."include/aes.func.php");
$action=$_GET['action'];
switch($action){
	case 'getinfo':
	$rs=$db->Execute("select * from carconfig");
	while($arr=$rs->FetchRow()){
		$config[$arr['name']]=$arr['value'];
	}
	//获取系统庄（id==1）和其他信息
	$rs=$db->Execute("select * from user where userid={$config['systemdealerid']}");
	$user=$rs->FetchRow();
	$result=array();
	$result[]=1;//用户id
	$result[]="大财主是我";//昵称
	$result[]=5000000;//有多少钱
	$result[]=$config['dealerlimit'];//最小坐庄
	$result[]=$config['roundlimit'];//坐庄轮数
	$result[]=20;//下注时间（秒）不能修改
	$result[]=$config['taxrate'];//收税百分之
	$result[]=$config['taxfree'];//收税免征额
	$result[]=$config['winrate'];//吃大赔小
	echo join('|',$result);
	break;
	case 'getuserinfo':
		//用户进入，获取用户钱数，添加gamelock记录
		//$db->Execute("insert into gamelock (userid,game) values(".$_GET['userid'].",'0')");
		$balance=$db->GetOne("select gamemoney from user where userid=".$_GET['userid']);
        echo $balance;
	break;
	case 'quit':
		//在这里更新用户的钱数，get方式2个字段，money和userid
		//$db->Execute("update user set gamemoney='$_GET[money]' where userid={$_GET['userid']}");
		//mysql_query("update ss_member set coinbalance=".$_GET['money']." where id=".$_GET['userid']);
		//在这里删除gamelock中用户记录
		//$db->Execute("delete from gamelock where userid=".$_GET['userid']." and game='0'");
	break;
	case 'roundover':
		//每轮结束，记录税收和结果，读取下一个开奖值
		//开奖
		$res = $db->GetArray("select * from carrecord_person where awardnum=0");
		if(!empty($res)){
			$rs=$db->Execute("select * from carconfig");
			while($arr=$rs->FetchRow()){
				$config[$arr['name']]=$arr['value'];
			}
	
			$awardnum = (int)$_GET["result"];
			$mulit = getMulit($awardnum);
			foreach($res as $value){
				$bet = explode(",",$value["bet"]);
				$awardmoney=0;
				$taxNumber = 0;
				if(!empty($bet[$awardnum])){
					$awardmoney = $bet[$awardnum]*$mulit;
					if($awardmoney-$bet[$awardnum]>=$config["taxfree"]){
						$taxNumber = floor(($awardmoney-$bet[$awardnum])*($config["taxrate"]/100));
					}
				}
				$balance = $value['moneybalance'];
				$win=0;
				if($awardmoney>0){
					$win = ($awardmoney-$bet[$awardnum]);
					if($win>0){
						roomAnn("恭喜 ".$db->GetOne("select nickname from user where userid='{$value['userid']}'")." 在车行游戏中共计赚得 ".($win)." 游戏币");
					}
					$db->Execute("update user set gamemoney=gamemoney+".($awardmoney-$taxNumber)." where userid={$value['userid']}");
					$balance = $db->GetOne("select gamemoney from user where userid={$value['userid']}");
				}
				
				$db->Execute("update carrecord_person set awardnum='$awardnum',awardmoney='".$win."',tax='$taxNumber',moneybalance='$balance' where id='$value[id]'");
			}
			
		}
		$db->Execute("insert into carrecord(dealerid,dealercj,result,tax)values('$_GET[dealerid]','$_GET[dealercj]','$_GET[result]','$_GET[tax]')");
		
		$rs=$db->Execute("select id,num from caraward order by id asc limit 1");
		$arr=$rs->FetchRow();
		if($arr){
			echo (int)$arr['num'];
			$db->Execute("delete from caraward where id='{$arr['id']}'");
		}
		else{
			echo '0';
		}
	break;
	/*case 'personrecord':
		$db->Execute("INSERT INTO `carrecord_person` 
			(`userid`, `bet`, `awardnum`, `awardmoney`, `tax`, `moneybalance`) 
			VALUES 
			('$_GET[userid]', '$_GET[bet]', '$_GET[awardnum]', '$_GET[awardmoney]', '$_GET[tax]', '$_GET[balance]')");
	*/
	case 'bet'://下注及时扣钱
		$_GET[money] = (int)$_GET[money];
		$db->Execute("update user set gamemoney=gamemoney-'$_GET[money]' where userid={$_GET['userid']} and gamemoney>=$_GET[money] and gamemoney>0");
		if($db->Affected_Rows()!=0){
			$balance = $db->GetOne("select gamemoney from user where userid={$_GET['userid']}");
			$res = array(0,0,0,0,0,0,0,0,0);
			$res[$_GET[num]]=$_GET[money];
			$db->Execute("INSERT INTO `carrecord_person` 
				(`userid`, `bet`, `awardnum`, `awardmoney`, `tax`, `moneybalance`) 
				VALUES 
				('$_GET[userid]', '".implode(",",$res)."', '0', '0', '0', '$balance')");
			echo $balance;
		}else{
			echo -1;
		}
	break;
}
include('../include/footer.inc.php');

function getMulit($awardnum){
	if($awardnum<=4){
		return 5;
	}
	else if($awardnum==5){
		return 40;
	}
	else if($awardnum==6){
		return 30;
	}
	else if($awardnum==7){
		return 20;
	}
	else if($awardnum==8){
		return 10;
	}
}
