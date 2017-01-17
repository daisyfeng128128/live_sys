<?php 
session_start();
if($_GET['isiphone']=="1"){
	$_SESSION['isiphone']=1;
}
include("../include/header.inc.php");
include($app_path."include/level.func.php");
require($app_path.'include/smarty/Smarty.class.php');

$smarty = new Smarty;
$smarty->caching = false;
$smarty->template_dir = "./templates";
$smarty->compile_dir = "./templates_c";


$action=$_GET['action'];
switch($action){
	case '_vip'://取得送礼记录
		//vip价格等等
		$service = $db->GetArray("select * from gift where giftid>=401 and giftid<=413 order by giftid asc");
		$vipType = array();
		foreach ($service as $value) {
			$vipType[$value["giftid"]] = $value;
		}
		$page_var["vipType"] = $vipType;
		break;
    default:
		if($user["viplevel"]==1){
			$user["viptext"] = "黄色VIP";
		}else if($user["viplevel"]==2){
			$user["viptext"] = "紫色VIP";
		}else if($user["viplevel"]==3){
			$user["viptext"] = "黑色VIP";
		}else{
			$user["viptext"] = "普通用户";
		}
		$page_var["car"]=$db->GetRow("select a.*,b.* from gift a,usercars b where b.carid=a.giftid and b.userid={$user[userid]} and b.vailddate>".time()." order by b.active desc,a.giftprice desc");
		break;
}
foreach($page_var as $key=>$val){
	$smarty->assign($key,$val);
}
$smarty->display("market".$action.".html");

include($app_path."include/footer.inc.php");