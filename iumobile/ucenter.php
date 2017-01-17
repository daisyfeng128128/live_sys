<?php 
session_start();
if(isset($_GET['isiphone']) && $_GET['isiphone']=="1"){
	$_SESSION['isiphone']=1;
}
include("../include/header.inc.php");
include($app_path."include/level.func.php");
require($app_path.'include/smarty/Smarty.class.php');
$user=checklogin();
if(!$user){
	include($app_path."include/footer.inc.php");
	//header("location:/");
	exit();
}
$user['starlevel']=point2star($user['totalpoint']);
$user['richlevel']=cost2rich($user['totalcost']);
//$db->debug = true;
$action=$_GET['action'];
switch($action){
	case 'getpaylist'://取得充记记录
		$page = max((int) $_GET['p'], 1);
		$limit = 10;
		$start = ($page - 1) * $limit;
		$where_limit = " limit $start, $limit";
		$list = $db->GetArray("SELECT * from orders WHERE userid='{$user['userid']}' order by `lastupdate` desc$where_limit");
		$data = array();
		$photos = "";
		foreach($list as $value){
			$value["orderid"] = sprintf("%s%05d",$value['adddate'],$value['id']);
			$value["paychannel"] = $global_order_paychannel[$value["paychannel"]];
			$value["lastupdate"] = date("Y-m-d G:i:s",$value["lastupdate"]);
			if($value['status']==0){
				$value['status']="未付款";
			}
			else if($value['status']==1){
				$value['status']="已成功";
			}
			$data[] = $value;
		}
		$data = array_values($data);
		echo json_encode($data);
		include($app_path."include/footer.inc.php");
		exit;
		break;
	case 'getgiftlist'://取得送礼记录
		$page = max((int) $_GET['p'], 1);
		$limit = 10;
		$start = ($page - 1) * $limit;
		$where_limit = " limit $start, $limit";
		//显示7天内的数据
		$list = $db->GetArray("SELECT a.*,b.giftname,b.giftprice,d.nickname ,d.usernumber FROM balance_change_log a left join user d on a.touserid=d.userid ,gift b WHERE  a.giftid=b.giftid and a.userid='{$user['userid']}'  and 	a.`when`>".(time()-86400*7)." order by `when` desc$where_limit");
		$data = array();
		$photos = "";
		foreach($list as $value){
			$value["when"] = date("Y-m-d",$value["when"]);
			$value["money"] = $value["money"]*-1;
			if($value['nickname']==""){
				$value['touserinfo'] = $user['nickname'].'/'.$user['usernumber'];
			}else{
				$value['touserinfo'] = $value['nickname'].'/'.$value['usernumber'];
			}
			$data[] = $value;
		}
		$data = array_values($data);
		echo json_encode($data);
		include($app_path."include/footer.inc.php");
		exit;
		break;
	case 'getbuycarlist'://取得所有坐驾列表
		$page = max((int) $_GET['p'], 1);
		$limit = 10;
		$start = ($page - 1) * $limit;
		$where_limit = " limit $start, $limit";
		$list = $db->GetArray("select * from gift where giftcateid=8 order by giftprice asc $where_limit");
		$data = $list;
		echo json_encode($data);
		include($app_path."include/footer.inc.php");
		exit;
		break;
	case 'getmycarlist'://取得我购买的坐驾列表
		$list=$db->GetArray("select a.*,b.* from gift a, usercars b where b.carid=a.giftid and b.userid='{$user['userid']}' and vailddate>".time());
		foreach ($list as $key=>$value){
			$value["vailddate"] = date("Y-m-d",$value["vailddate"]);
			$list[$key] = $value;
		}
		$data = $list;
		echo json_encode($data);
		include($app_path."include/footer.inc.php");
		exit;
		break;
    default:
		$smarty = new Smarty;
		$smarty->caching = false;
		$smarty->template_dir = "./templates";
		$smarty->compile_dir = "./templates_c";
		if($user["viplevel"]==1){
			$user["viptext"] = "黄色VIP";
		}else if($user["viplevel"]==2){
			$user["viptext"] = "紫色VIP";
		}else if($user["viplevel"]==3){
			$user["viptext"] = "黑色VIP";
		}else{
			$user["viptext"] = "普通用户";
		}
		//用户当前座驾
		$page_var["car"]=$db->GetRow("select a.*,b.* from gift a,usercars b where b.carid=a.giftid and b.userid={$user[userid]} and b.vailddate>".time()." order by b.active desc,a.giftprice desc");
		
		//购买vip页面,vip价格等等
		$service = $db->GetArray("select * from gift where giftid>=401 and giftid<=413 order by giftid asc");
		$vipType = array();
		foreach ($service as $value) {
			$vipType[$value["giftid"]] = $value;
		}
		$page_var["vipType"] = $vipType;
		
		//守护价格http://www.wpy.demo2015.com/iumobile/ucenter.php?roomnumber=666#buy_guard
		$guard_price = $db->CacheGetOne(60,"select giftprice from gift where giftid='9021'");
		$grard_tmparr = array(
			1=>"1个月",
			3=>"3个月 (送10天)",
			6=>"6个月 (送1个月)",
			12=>"一年 (送3个月)",
		);
		foreach($grard_tmparr as $key=>$value){
			$guardType[$key] = array(
				"txt"=>$value,
				"type"=>$key,
				"price"=>$key*$guard_price,
			);
		}
		$page_var["guardType"] = $guardType;
		$roomnumber = (int)$_GET["roomnumber"];
		if(!empty($roomnumber)){
			$guardShowinfo = $db->GetRow("select * from user where usernumber='{$roomnumber}'");
			$page_var["guardShowinfo"] = $guardShowinfo;
		}
		
		//家族
		if(!empty($user["clanid"])){
			$page_var["clan_medalname"] = $db->GetOne("select medalname from clan where clanid={$user["clanid"]}");
			$page_var["clan_url"] = "find.php?id={$user["clanid"]}#clandetail";
		}else{
			$clanid = $db->GetOne("select clanid from clanapply where userid={$user["userid"]}");
			if(!!$clanid){
				$page_var["clan_medalname"] = "审核中";
			}else{
				$page_var["clan_medalname"] = "未申请";
			}
			$page_var["clan_url"] = "find.php#clan";
		}
		
		
		$page_var["RMB_XNB"] = RMB_XNB;
		
		$page_var['user']=$user;
		$page_var['android']=isset($_GET["android"])?$_GET["android"]:0;//是否为安卓手机
		foreach($page_var as $key=>$val){
			$smarty->assign($key,$val);
		}
		$smarty->display("uccenter".$action.".html");
		break;
}
include($app_path."include/footer.inc.php");