<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include('../include/header.inc.php');
include_once($app_path."include/aes.func.php");
$action=$_GET['action'];


switch($action){
	case 'getinfo':
		//$rs=$db->Execute("select * from frameconfig");
		//while($arr=$rs->FetchRow()){
			//$config[$arr['name']]=$arr['value'];
		//}
		//获取系统庄（id==1）和其他信息
		//$rs=$db->Execute("select * from user where userid={$config['systemdealerid']}");
		//$user=$rs->FetchRow();
		//$result=array();
		//$result[]=$user['userid'];
		//$result[]=$user['nickname'];
		//$result[]=$user['gamemoney'];
		//$result[]=$config['dealerlimit'];//最小坐庄
		//$result[]=$config['roundlimit'];//坐庄轮数
		//$result[]=20;//下注时间（秒）不能修改
		//$result[]=$config['taxrate'];//收税百分之
		//$result[]=$config['taxfree'];//收税免征额
		$result[]=888;
		$result[]="大财主是我";
		$result[]=9187732;
		$result[]=5000000;//最小坐庄
		$result[]=10;//坐庄轮数
		$result[]=20;//下注时间（秒）不能修改
		echo join('|',$result);
	break;
	case 'getuserinfo':
		//用户进入，获取用户钱数，添加gamelock记录
		$db->Execute("insert into gamelock (userid,game) values(".$_GET['userid'].",'1')");
		$balance=$db->GetOne("select gamemoney from user where userid=".$_GET['userid']);
        echo $balance;
	break;
	case 'quit':
		$balance=$db->GetOne("select gamemoney from user where userid=".$_GET['userid']);
		if($balance<$_GET[money]){
			roomAnn("恭喜 ".$db->GetOne("select nickname from user where userid='{$_GET['userid']}'")." 在鸡同鸭讲游戏中共计赚得 ".($_GET[money]-$balance)." 游戏币");
		}
		//在这里更新用户的钱数，get方式2个字段，money和userid
		$db->Execute("update user set gamemoney='$_GET[money]' where userid={$_GET['userid']}");
		//mysql_query("update ss_member set coinbalance=".$_GET['money']." where id=".$_GET['userid']);
		//在这里删除gamelock中用户记录
		$db->Execute("delete from gamelock where userid=".$_GET['userid']." and game='1'");
	break;
	case 'roundover':
		$db->Execute("insert into framerecord(dealerid,dealercj,result)values('$_GET[dealerid]','$_GET[dealercj]','$_GET[result]')");
		//$numrow=$db->GetRow("select id,num from caraward order by id asc limit 1");
		//if($numrow){
		//	echo (int)$numrow['num'];
		//	$db->Execute("delete from frameaward where id='$numrow[id]'");
		//}
		//else{
			echo '0';
		//}
	break;
}
include('../include/footer.inc.php');