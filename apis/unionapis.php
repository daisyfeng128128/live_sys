<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include('../include/header.inc.php');
include($app_path."include/level.func.php");
$action=$_GET['action'];
switch($action){
	case 'pcdd'://PC蛋蛋,查询接口,http://www.cc1314.cn/apis/unionapis.php?action=pcdd&merid=20031&keycode=aa63ba2fe62651d7b5891a5942692082
		$userid = (int)$_GET["merid"];
		if(md5($_GET["merid"].$global_config_data["pcdd_key"])==strtolower($_GET["keycode"])){
			$user = $db->GetRow("select * from user where userid='$userid'");
			$zhangsheng = (int)$db->GetOne("select count(*) from balance_change_log where userid='$userid' and giftid=1");
			if($user){
				echo '<?xml version="1.0" encoding="utf-8" ?>
<Result>
<GameName>'.str_replace("&","&amp;",$user["username"]).'</GameName>
<nickname>'.str_replace("&","&amp;",$user["nickname"]).'</nickname>
<fuhao>'.$user['totalcost'].'</fuhao>
<zhangsheng>'.$zhangsheng.'</zhangsheng>
<Status>1</Status>
</Result>';
			}else{
				echo '<?xml version="1.0" encoding="UTF-8"?>
<Result>
	<ErrMsg>无此用户</ErrMsg>
	<Status>-1</Status >
</Result>';
			}
		}else{
			echo '<?xml version="1.0" encoding="UTF-8"?>
<Result>
	<ErrMsg>验证错误</ErrMsg>
	<Status>-1</Status >
</Result>';
		}
		break;
	case 'jx'://聚享,查询接口,http://www.cc1314.cn/apis/unionapis.php?action=jx&merid=23973&keycode=35eb43244af12143cee1e57162047507
		//验证方式为:md5(merid的值与聚享key)=keycode
		$userid = (int)$_GET["merid"];
		if(md5($_GET["merid"].$global_config_data["js_tokenkey"])==strtolower($_GET["keycode"])){
			$user = $db->GetRow("select * from user where userid='$userid'");
			$reCharge = (int)$db->GetOne("select sum(money) from orders where userid='$userid' and status=1 and paychannel!=0");
			$zhangsheng = (int)$db->GetOne("select count(*) from balance_change_log where userid='$userid' and giftid=1");
			if($user){
				echo '<?xml version="1.0" encoding="utf-8" ?>
<UserID>'.$userid.'</UserID> 
<UserName>'.str_replace("&","&amp;",$user["username"]).'</UserName>
<UserServer>1</UserServer>
<ServerName>1</ServerName>
<UserRole>'.str_replace("&","&amp;",$user["nickname"]).'</UserRole>
<totalcost>'.$user['totalcost'].'</totalcost>
<UserLevel>'.$zhangsheng.'</UserLevel>
<reCharge>'.$reCharge.'</reCharge>
<Status>1</Status>';
			}else{
				echo '<?xml version="1.0" encoding="UTF-8"?>
<Result>
	<ErrMsg>无此用户</ErrMsg>
	<Status>-1</Status >
</Result>';
			}
		}else{
			echo '<?xml version="1.0" encoding="UTF-8"?>
<Result>
	<ErrMsg>验证错误</ErrMsg>
	<Status>-1</Status >
</Result>';
		}
		break;
}
include($app_path.'include/footer.inc.php');