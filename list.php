<?php include("include/header.inc.php");
include($app_path."include/level.func.php");
require('include/smarty/Smarty.class.php');
//smarty初始化
$smarty = new Smarty;
$smarty->caching = false;
$smarty->template_dir = "./templates";
$smarty->compile_dir = "./templates_c";

//当前页面标示
//$page_var['current_page']="index";
//当前在线
$page_var['now_online']=(int)$db->CacheGetOne(300,"select sum(num) from viewernum_count");
//主播分类
/*$rs=$db->CacheExecute(3600*24,"select * from showercate order by id desc");
while($arr=$rs->FetchRow()){
	$page_var['showercate'][]=$arr;
}*/
$user=checklogin();
if($user){
	$user['starlevel']=point2star($user['totalpoint']);
	$user['richlevel']=cost2rich($user['totalcost']);
	$user['nextstar']=($user['starlevel']!=24)?($point_array[$user['starlevel']+1]-$user['totalpoint']):'0';
	$user['nextrich']=($user['richlevel']!=26)?($cost_array[$user['richlevel']+1]-$user['totalcost']):'0';
	$page_var['user']=$user;
}
$cateid=(int)$_GET['cateid'];
//$rs=$db->CacheExecute(120,"select a.totalpoint,a.nickname,b.roomnumber,b.showcover,b.viewernum,b.starttime from shows b , user a where (a.usernumber>=600000 and a.usernumber<700000) and a.userid=b.userid and b.endtime is null and b.showcover<>'' and b.lastdisconnect is null and b.showercateid='$cateid' order by b.isrecommend desc");
$rs=$db->CacheExecute(120,"select a.totalpoint,a.nickname,b.roomnumber,b.showcover,b.viewernum,b.starttime from shows b , user a where (a.usernumber>=600000 and a.usernumber<700000) and a.userid=b.userid and b.showcover<>'' and b.showercateid='$cateid' order by b.isrecommend desc");
while($arr=$rs->FetchRow()){
	$arr=safe_output($arr);
	$arr['starlevel']=point2star($arr['totalpoint']);
	$page_var['shows'][]=$arr;
}
foreach($page_var as $key=>$val){
	$smarty->assign($key,$val);
}
$smarty->display('list.html');
include("include/footer.inc.php");
?>


