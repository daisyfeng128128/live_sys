<?php 
include('../../include/header.inc.php');
switch($_REQUEST['action']){
	case '':
	case 'unionbill':
		echo json_encode(getUnionBill());
	break;
	case 'unionlogin':
		echo json_encode(unionLogin());
	break;
	case 'unionchangepwd':
		echo json_encode(changePwd());
	break;
	case 'daydetail':
		echo json_encode(getDayDetail());
	break;
}
include('../../include/footer.inc.php');
function changePwd(){
	global $db;
	$unionid=(int)$_REQUEST['unionid'];
	$password=$_REQUEST['password'];
	$oldpassword=$_REQUEST['oldpassword'];
	$current_password=$db->GetOne("select loginpwd from `union` where unionid='$unionid'");
	if($current_password==$oldpassword){
		$db->Execute("update `union` set loginpwd='$password' where unionid='$unionid'");
		return array('code'=>200);
	}
	return array('code'=>403);
}
function unionLogin(){
	global $db;
	$unionid=(int)$_REQUEST['unionid'];
	$password=$_REQUEST['password'];
	$current_password=$db->GetOne("select loginpwd from `union` where unionid='$unionid'");
	if($current_password==$password && $current_password){
		return array('code'=>200);
	}
	return array('code'=>403);
}
function getDayDetail(){
	global $db;
	$unionid=(int)$_REQUEST['unionid'];
	$startdate=strtotime($_REQUEST['day'].' 00:00:00');
	$enddate=strtotime($_REQUEST['day'].' 23:59:59');
	if(!$unionid){
		//return array('code'=>500,'info'=>'Union ID is required');
	}
	if(!$startdate){
		return array('code'=>500,'info'=>'Date range is required');
	}
	$sql="select nickname,lastloginip,regtime,accountfrom from user where unionid=$unionid and regtime>$startdate and regtime<$enddate order by regtime desc";
	$rs=$db->Execute($sql);
	while($arr=$rs->FetchRow()){
		$arr['ip']=long2ip($arr['lastloginip']);
		$content[]=$arr;
	}
	return array('code'=>200,'info'=>'success','content'=>$content);
}
function getUnionBill(){
	global $db;
	$unionid=(int)$_REQUEST['unionid'];
	$startdate=strtotime($_REQUEST['startdate'].' 00:00:00');
	$enddate=strtotime($_REQUEST['enddate'].' 23:59:59');
	$today0=strtotime(date('Y-m-d 00:00:00'));
	$level=(int)$_REQUEST['level'];
	
	$query_startdate=strtotime($_REQUEST['query_startdate'].' 00:00:00');
	$query_enddate=strtotime($_REQUEST['query_enddate'].' 23:59:59');
	
	if($level==1){
		$startunion=$unionid*1000;
		$endunion=$startunion+999;
		$unionquery="(b.unionid>$startunion and b.unionid < $endunion)";
	}
	else{
		$unionquery="b.unionid=$unionid";
	}
	if($query_startdate && $query_enddate){
		$querydate=" and (a.lastupdate>$query_startdate and a.lastupdate<$query_enddate)";
	}
	else{
		$querydate="";
	}
	if($enddate>$today0){
		return array('code'=>500,'info'=>'Date range is out of range');
	}
	if(!$unionid){
		//return array('code'=>500,'info'=>'Union ID is required');
	}
	if(!$startdate || !$enddate){
		return array('code'=>500,'info'=>'Date range is required');
	}
	if(($enddate-$startdate)>24*3600*31){
		return array('code'=>500,'info'=>'Date range is to long');
	}
	
	//当日注册的人 总共充值多少钱
	$sql="SELECT sum(a.money) as money,FROM_UNIXTIME(b.regtime, '%Y-%m-%d') as ymd FROM `orders` a,user b WHERE b.userid=a.userid and $unionquery and b.regtime>$startdate and b.regtime<$enddate  and a.status=1 $querydate group by ymd";
	$rs=$db->Execute($sql);
	while($arr=$rs->FetchRow()){
		$d_m[$arr['ymd']]=$arr['money'];
	}
	//当日注册 总共充值多少人
	$sql="SELECT count(distinct a.userid) as pnum,FROM_UNIXTIME(b.regtime, '%Y-%m-%d') as ymd FROM `orders` a,user b WHERE b.userid=a.userid and $unionquery and b.regtime>$startdate and b.regtime<$enddate  and a.status=1 $querydate group by ymd";
	$rs=$db->Execute($sql);
	while($arr=$rs->FetchRow()){
		$d_p[$arr['ymd']]=$arr['pnum'];
	}
	//当日注册统计
	$sql="SELECT count(userid) as pnum,FROM_UNIXTIME(regtime, '%Y-%m-%d') as ymd from user b where $unionquery and (regtime>$startdate and regtime<$enddate) group by ymd";
	$rs=$db->Execute($sql);
	while($arr=$rs->FetchRow()){
		$d_r[$arr['ymd']]=$arr['pnum'];
	}
	//当日注册二登统计
	$sql="SELECT count(userid) as pnum,FROM_UNIXTIME(regtime, '%Y-%m-%d') as ymd from user b where $unionquery and (regtime>$startdate and regtime<$enddate) and (lastlogin-regtime)>3000  group by ymd";
	$rs=$db->Execute($sql);
	while($arr=$rs->FetchRow()){
		$d_s[$arr['ymd']]=$arr['pnum'];
	}
	//当日充值总额统计
	$sql="SELECT sum(a.money) as money,FROM_UNIXTIME(a.lastupdate, '%Y-%m-%d') as ymd FROM `orders` a,user b WHERE b.userid=a.userid and $unionquery and a.lastupdate>$startdate and a.lastupdate<$enddate  and a.status=1 group by ymd";
	$rs=$db->Execute($sql);
	while($arr=$rs->FetchRow()){
		$d_t[$arr['ymd']]=$arr['money'];
	}
	//当日充值总额统计
	$sql="SELECT count(distinct a.userid) as pnum,FROM_UNIXTIME(a.lastupdate, '%Y-%m-%d') as ymd FROM `orders` a,user b WHERE b.userid=a.userid and $unionquery and a.lastupdate>$startdate and a.lastupdate<$enddate  and a.status=1 group by ymd";
	$rs=$db->Execute($sql);
	while($arr=$rs->FetchRow()){
		$d_tp[$arr['ymd']]=$arr['pnum'];
	}
	while(true){
		$ntime=date('Y-m-d',$startdate);
		$content[$ntime]=array('register_num'=>$d_r[$ntime],'login_after_3m'=>$d_s[$ntime],'transfer_people'=>$d_p[$ntime],'transfer_money'=>$d_m[$ntime],'total_money'=>$d_t[$ntime],'total_pay_people'=>$d_tp[$ntime]);
		$startdate+=24*3600;
		if($startdate>=$enddate){
			break;
		}
	}
	return array('code'=>200,'info'=>'success','content'=>$content);
}
?>