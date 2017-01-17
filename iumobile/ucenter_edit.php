<?php 
session_start();
if($_GET['isiphone']=="1"){
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
	case 'edit_gender':
		$db->Execute("update user set gender='{$_REQUEST['gender']}' where userid='{$user['userid']}'");
		$data = array("errorCode"=>200,"errorMessage"=>"");
		echo json_encode($data);
		include($app_path."include/footer.inc.php");
		exit;
		break;
	case 'edit_ctiy':
		$db->Execute("update user set province='{$_REQUEST['province']}',city='{$_REQUEST['city']}' where userid='{$user['userid']}'");
		$data = array("errorCode"=>200,"errorMessage"=>"");
		echo json_encode($data);
		include($app_path."include/footer.inc.php");
		exit;
		break;
	case 'edit_birthday':
		if($_REQUEST['year']!="" && $_REQUEST['month']!="" && $_REQUEST['day']!=""){
			$birthday=(int)$_REQUEST['year']."-".(int)$_REQUEST['month']."-".(int)$_REQUEST['day'];
		}
		else{
			$birthday="0000-00-00";
		}
		$db->Execute("update user set birthday='$birthday' where userid='{$user['userid']}'");
		$data = array("errorCode"=>200,"errorMessage"=>"");
		echo json_encode($data);
		include($app_path."include/footer.inc.php");
		exit;
		break;
    default:
		$smarty = new Smarty;
		$smarty->caching = false;
		$smarty->template_dir = "./templates";
		$smarty->compile_dir = "./templates_c";
		
		$tmp_b=explode('-',$user['birthday']);
		if(is_array($tmp_b)){
			$page_var['birthday_year']=(int)$tmp_b[0];
			$page_var['birthday_month']=(int)$tmp_b[1];
			$page_var['birthday_day']=(int)$tmp_b[2];
		}
		$page_var['user']=$user;
		$page_var['time']=time();
		foreach($page_var as $key=>$val){
			$smarty->assign($key,$val);
		}
		$smarty->display("uccenter_edit.html");
		break;
}
include($app_path."include/footer.inc.php");