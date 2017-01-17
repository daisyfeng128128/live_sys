<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include('../include/header.inc.php');
include_once($app_path."include/aes.func.php");
$action=$_GET['action'];
switch($action){
	case 'getinfo':
	//获取系统庄
	$user=$db->GetRow("select * from user where userid=888");
	$result=array();
	$result[]=$user['userid'];
	$result[]=$user['nickname'];
	$result[]=$user['gamemoney'];
	$result[]=20000000;//最小坐庄
	$result[]=20;//最大坐庄轮
	$result[]=20;//下注时间（秒）
	echo join('|',$result);
	break;
	case 'getuserinfo':
		$user=$db->GetRow("select * from user where userid='$_GET[userid]'");
		echo $user['gamemoney'];
	break;
	case 'quit':
		$db->Execute("update user set gamemoney='$_GET[money]' where userid='$_GET[userid]'");
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
