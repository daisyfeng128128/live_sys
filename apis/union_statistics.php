<?php
header("Content-type:text/html;charset=utf-8");
include('../include/header.inc.php');
include($app_path.'include/page.inc.php');
session_start();
session_set_cookie_params(0,'/'); //让所有子域名都共享会话
if(!isset($_SESSION["admin"])){
	$islogin = false;
	if(isset($_GET["loginpwd"])){
		$unioninfo=$db->GetRow("select * from `union` where unionid='{$_GET['unionid']}'");
		if($unioninfo["loginpwd"]==$_GET["loginpwd"]){
			$islogin = true;
		}
	}else if(isset($_SERVER['PHP_AUTH_USER'])){
		$unioninfo=$db->GetRow("select * from `union` where unionid='{$_SERVER['PHP_AUTH_USER']}'");
		if($unioninfo["loginpwd"]==$_SERVER['PHP_AUTH_PW']){
			$islogin = true;
		}
	} 
	if(!$islogin){
		header('WWW-Authenticate: Basic realm="Admin Login"');
		header('HTTP/1.0 401 Unauthorized');
		echo 'Please Login';
		include($app_path."include/footer.inc.php");
		exit;
	}
}
//$db->debug = true;
//select DISTINCT unionid from user where unionid!=0
$union_temp = $db->GetArray("select * from `union`");
$union_str = null;
foreach ($union_temp as $v) {
	$union_list[$v["unionid"]] = $v;
	if(empty($union_str))
		$union_str = $v["unionid"];
	else 
		$union_str .= ",".$v["unionid"];
}

if($_GET["unionid"]){
	$unionid = (int)$_GET["unionid"];
}else{
	$unionid = $union_str;
}
if($islogin){//是联盟查看
	$unionid = (int)$unioninfo["unionid"];
}
if($_GET["begin"]){
	$begin = strtotime($_GET["begin"]);
}else{
	$end = strtotime(date("Y-m-d 00:00:00"))+86400-1;
	$begin = strtotime(date("Y-m-d 00:00:00"));
}
if($_GET["end"]){
	$end = strtotime($_GET["end"])+86400-1;
}

$_GET["begin"] = date("Y-m-d",$begin);
$_GET["end"] = date("Y-m-d",$end);

$data = getUnionData($unionid,$begin,$end);
// print_r($data);

/**
 * @param string $unionid 联盟id|为空则是查全部
 * @param unknown $start 开始时间
 * @param unknown $end 结束时间戳
 */
function getUnionData($unionids,$start=null,$end=null){
	if(empty($unionids))return;
	$unionid_array = explode(",", $unionids);
	global $db;
	
	$where_unionid = empty($unionids)?null:"and unionid in({$unionids})";
	if(!empty($start) && !empty($end)){
		$where_date = " and regtime>=$start and regtime<=$end";
	}else{
		$where_date = null;
	}
	//注册用户数
	$reg_user_count = $db->GetArray("SELECT unionid,count(userid) as num from `user` where 1=1 $where_unionid $where_date GROUP BY unionid;");
	$reg_user_count = foremtArray($reg_user_count);
	
	//注册用户数
	$reg_user_count_login2 = $db->GetArray("SELECT unionid,count(userid) as num from user where 1=1 $where_unionid $where_date and lastlogin!=regtime GROUP BY unionid;");
	$reg_user_count_login2 = foremtArray($reg_user_count_login2);
	
	//有效用户数
// 	$reg_user_count_youxiao = $db->GetArray("SELECT unionid,count(distinct lastloginip) as num from `user` where unionid!=0 $where_unionid $where_date GROUP BY lastloginip;");
	foreach ($unionid_array as $v) {
		$count = $db->GetOne("SELECT count(distinct lastloginip) as num from `user` where unionid='{$v}' $where_date;");
		$reg_user_count_youxiao[] = array("unionid"=>$v,"num"=>$count);
	}
	$reg_user_count_youxiao = foremtArray($reg_user_count_youxiao);
	
	//点击收藏桌面[任务表重新计算]
	/*
	foreach ($unionid_array as $v) {
		$count = $db->GetOne("select count(*) from task,user where `user`.userid=task.taskid and taskid=6 and unionid='{$v}' $where_date");
		$download_shortcut[] = array("unionid"=>$v,"num"=>$count);
	}
	*/
	$download_shortcut = $db->GetArray("SELECT unionid,count(task.userid) as num from user,task where `user`.userid=task.taskid and taskid=6 $where_unionid $where_date GROUP BY unionid;");
	$download_shortcut = foremtArray($download_shortcut);
	
	
	//点击关注[任务表重新计算]
	foreach ($unionid_array as $v) {
		$count = $db->GetOne("select count(DISTINCT bu_user_studio.userid) from bu_user_studio,user where `user`.userid=bu_user_studio.userid and unionid='{$v}' $where_date");
		$fav[] = array("unionid"=>$v,"num"=>$count);
	}
	$fav = foremtArray($fav);
	
	//关注并收藏[任务表重新计算]
	foreach ($unionid_array as $v) {
		$count = $db->GetOne("select count(DISTINCT user.userid) from bu_user_studio,task,user where `user`.userid=bu_user_studio.userid and `user`.userid=task.userid and bu_user_studio.userid=task.userid and taskid=6 and unionid='{$v}' $where_date");
		$cut_fav[] = array("unionid"=>$v,"num"=>$count);
	}
	$cut_fav = foremtArray($cut_fav);
	
	//充值人数
	$chongzhi_count = $db->GetArray("SELECT unionid,count(distinct a.userid) as num FROM `orders` a,user b WHERE b.userid=a.userid and sid!='' $where_unionid $where_date GROUP BY unionid;");
	$chongzhi_count = foremtArray($chongzhi_count);
	
	//充值总金额
	$chongzhi_sum = $db->GetArray("SELECT unionid,sum(a.money) as money FROM `orders` a,user b WHERE b.userid=a.userid and sid!='' $where_unionid $where_date GROUP BY unionid;");
	$chongzhi_sum = foremtArray($chongzhi_sum,"unionid","money");
	
	
	if(empty($reg_user_count))
		return array();
	
	$res = array();
	//将所有结果合并
	foreach ($unionid_array as $v) {
		$res[$v]["reg"] = isset($reg_user_count[$v])?$reg_user_count[$v]:0;
		$res[$v]["reg2"] = isset($reg_user_count_login2[$v])?$reg_user_count_login2[$v]:0;
		$res[$v]["reg_youxiao"] = isset($reg_user_count_youxiao[$v])?$reg_user_count_youxiao[$v]:0;
		//$res[$v]["download_shortcut"] = isset($download_shortcut[$v])?$download_shortcut[$v]:0;
		//$res[$v]["fav"] = isset($fav[$v])?$fav[$v]:0;
		//$res[$v]["cut_fav"] = isset($cut_fav[$v])?$cut_fav[$v]:0;
		
		$res[$v]["chongzhi_count"] = isset($chongzhi_count[$v])?$chongzhi_count[$v]:0;
		$res[$v]["chongzhi_sum"] = isset($chongzhi_sum[$v])?$chongzhi_sum[$v]:0;
	}
	return $res;
}

function foremtArray($arr,$key="unionid",$value="num"){
	if(!$arr)return array();
	$temp = array();
	foreach ($arr as $v) {
		$temp[$v[$key]] = $v[$value];
	}
	return $temp;
}
if(!isset($_GET["loginpwd"])){
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script src="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.css">
<title>联盟ID列表</title>
<script>
$(function(){
	$('.infotxt').datepicker({ dateFormat: 'yy-mm-dd',changeMonth:true,changeYear: true,currentText: "Now"});
	$('select[name=unionid]').val("<?php echo $_GET["unionid"];?>");
});
</script>
</head>
<body>

<table width="99%" align="center" cellspacing="1" cellpadding="3" border="0">
	<tbody><tr class="head">
		<td width="30%" align="center">
			PlatForm Administrator</td>
	</tr>
</tbody></table>
<br>
<table width="99%" align="center" cellspacing="1" cellpadding="3" class="i_table">
	<tbody><tr><td class="head" colspan="15"><b>联盟ID列表</b></td></tr>
<tr>
	<td class="head" colspan="14">
	    <form>
<?php if(!$islogin){?>
	推广ID:
<select name="unionid">
	<option value="">不限</option>
	<?php foreach ($union_list as $v):?>
	<option value="<?php echo $v["unionid"]?>"><?php echo $v["unionid"]?>--<?php echo $v["name"]?></option>
	<?php endforeach;?>
</select>
<?php }?>	
	 &nbsp;
	   日期: <input type="text" style="width:74px;" class="infotxt" id="beginTime" name="begin" value="<?php echo $_GET["begin"]?>">
	-日期: <input type="text" style="width:74px;" class="infotxt" id="endTime" name="end" value="<?php echo $_GET["end"]?>">
	&nbsp;
		 <input type="submit" value="-查 询-" class="input_k"><br>	
	</form>
	</td></tr>
	<tr class="head_1">
	<td>推广ID</td>
	<td>联盟名</td>
	<td>注册用户数</td>
	<td title="最后登录时间和注册时间不一样">二次登录数</td>
	<td>有效用户数(1个唯一ip算一个用户数)</td>
	<td>有效率(有效用户数除以注册用户数x100%)</td>
	<td>充值人数</td>
	<td>充值总金额</td>
	<td>人均充值(充值总金额除以有效用户数)</td>
	<td>明细</td>
	</tr>
<?php foreach ($data as $k => $v):?>
		<tr class="b">
		<td><?php echo $k?></td>
		<td><?php echo $union_list[$k]["name"]?></td>
		<td><?php echo $v["reg"]?></td>
		<td><?php echo $v["reg2"]?></td>
		<td><?php echo $v["reg_youxiao"]?></td>
		<td><?php echo round(($v["reg_youxiao"]/$v["reg"]*100),2)?>%</td>
		<td><?php echo $v["chongzhi_count"]?></td>
		<td><font color="red"><?php echo $v["chongzhi_sum"]?></font></td>
		<td><?php echo round(($v["chongzhi_sum"]/$v["reg_youxiao"]),2)?></td>
		<td><a href="union_user_statistics.php?unionid=<?php echo $k?>&begin=<?php echo $_GET[begin]?>&end=<?php echo $_GET[end]?>">查看</a></td>
		</tr>
<?php endforeach;?>
</tbody></table>
<script type="text/javascript">
var msg='';
if(msg!='')
{
 alert(msg);
}
</script>

<center>
<blockquote><hr class="hr" size="1">

</blockquote><br>
</center>

</body>
</html>
<?php 
}else{
	ob_end_clean();
	echo json_encode($data);
}
include($app_path."include/footer.inc.php");?>