<?php 
//include('../../include/header.inc.php');
include('head.php');
include($app_path."include/live_access_permission.php");
//$db->debug = true;
if($_GET["type"]=="admin"){
	session_start();
	session_set_cookie_params(0,'/'); //让所有子域名都共享会话
	if((isset($_SESSION["admin"])) || (time()-$_SESSION["admin"]["logintime"])<1800){//管理员已经登
		$roomnumber = "-1";
	}else{
		include('../../include/footer.inc.php');
		echo "no login";
		exit;
	}
}else{
	//$user=checklogin();
	$roomnumber = (int)$_GET["type"];
	if(!$db->GetOne("select roomnumber from room_config where roomnumber=$roomnumber")){
	/*if($user){//用户已经登录，并且已经签约。设置自己的房间
		$tmp = $db->GetOne("select userid from applysign where userid='$user[userid]' and pass=1");
		if(empty($tmp)){
			include('../../include/footer.inc.php');
			exit;
		}
		$roomnumber = $user["usernumber"];
	}else{*/
		include('../../include/footer.inc.php');
		exit;
	}
}
include($app_path."include/level.func.php");
// print_r($access_type);
// print_r($user_type);
//会员功能
header("Content-type:text/html;charset=utf-8");
if($_POST["action"]=="save"){
	$key = trim($_POST["name"]);
	$value = trim($_POST["value"]);
	$tmp = $db->GetOne("select roomnumber from access_permission where roomnumber='$roomnumber' and `k`='$key'");
	if($tmp){
		$db->Execute("update access_permission set `value`='$value' where roomnumber='$roomnumber' and `k`='$key'");
	}else{
		$db->Execute("INSERT INTO `access_permission`(roomnumber,`k`,`value`) VALUES ('$roomnumber', '$key', '$value');");
	}
	operational_log(4,"修改房间权限",$_REQUEST);
	include('../../include/footer.inc.php');
	exit;
}else if($_POST["action"]=="save_count"){
	$key = trim($_POST["user"]);
	$value = trim($_POST["value"]);
	$tmp = $db->GetOne("select roomnumber from access_permission where roomnumber='$roomnumber' and `k`='$key'");
	if(trim($_POST["name"])=='fayan'){
		$field="fayan";
	}
	else{
		$field="caitiao";
	}
	if($tmp){
		$db->Execute("update access_permission set `$field`='$value' where roomnumber='$roomnumber' and `k`='$key'");
	}else{
		$db->Execute("INSERT INTO `access_permission`(roomnumber,`k`,`$field`) VALUES ('$roomnumber', '$key', '$value');");
	}
	operational_log(4,"修改房间权限数量",$_REQUEST);
	include('../../include/footer.inc.php');
	exit;
}

//读取当前权限
$where = "roomnumber='-1'";
if($roomnumber!="-1"){
	$where .= " or roomnumber='$roomnumber'";
}
$arr = $db->GetArray("select * from `access_permission` where $where");
$user_arr_val = array();
$global_arr_val = array();

$user_arr_val_count = array();
$global_arr_val_count = array();
foreach ($arr as $key => $value) {
	if($value["roomnumber"]=="-1"){
		$global_arr_val[$value["k"]]=$value["value"];
	}else{
		$user_arr_val[$value["k"]]=$value["value"];
	}
	
	if($value["roomnumber"]=="-1"){
		$global_arr_val_count[$value["k"].'_fayan']=$value["fayan"];
		$global_arr_val_count[$value["k"].'_caitiao']=$value["caitiao"];
	}else{
		$user_arr_val_count[$value["k"].'_fayan']=$value["fayan"];
		$user_arr_val_count[$value["k"].'_caitiao']=$value["caitiao"];
	}
}
// print_r($global_arr_val);
// print_r($user_arr_val);
include('../../include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>权限管理</title>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<style>
body{min-width:1024px;overflow:auto;}
table,table tr,table tr td{border:1px solid #ccc;border-collapse:collapse;}
table tr td{overflow:hidden;text-align:center;line-height:30px;}
tbody{overflow:auto;width:100%;height:100%;}
.red{color:red;}
select{width: 40px;}
input{border:0;}
</style>
<script>
$(function(){
	$("#tabaccess [name=role]").change( function() {
		var user=($(this).attr("user"));
		var access=($(this).attr("access"));
		go(user);
	});
	$("#tabaccess [name=role_count]").change( function() {
		var user=($(this).attr("user"));
		var access=($(this).attr("access"));
		$.post("", {action:"save_count",name:access,user:user,value:$(this).val()},function(data){
	// 		alert(data);
		});
	});
});
function go(user){
	var value = 0;
	//选择同一级的所有,判断当前选择级别的值,发送到后台
	var seachboxs=$("#tabaccess [name=role][user="+user+"]");
	var len=seachboxs.length;
	seachboxs.each(function(i){
		if(!!$(this).attr("checked")){
			var t = $(this).val();
			t = parseInt(t)
			value = value | t;
		}
		if(i==(len-1)){
			$.post("access_permission.php?type=<?php echo $_GET["type"];?>", {action:"save",name:user, value:value},function(data){
	// 			alert(data);
			});
		}
	});
}
</script>
</head>
<body>
<div style="padding-top:10px;">
<?php if($roomnumber=="-1"):?>
<h1 class="red">当前设置:全局设置，将会影响所有房间</h1>
<?php else:?>
<h1>当前设置:<?php echo $roomnumber?> 房间有效</h1>
<?php endif;?>
<div>设置用户为,运营，在后台<span class="phppagelink">用户管理</span>，找到对应的用户,点击<span class="phppagelink">设置</span>，更改账户类型</div>
<?php 
$user_type = array();
//设置哪些用户
//if($_GET["type"]=="admin"){
	$user_type["show"] = "主播";
	$user_type["usertype8"] = "运营";
	$user_type["admin"] = "房间管理员";
//}
$user_type["vip3"] = "VIP3";
$user_type["vip2"] = "VIP2";
$user_type["vip1"] = "VIP1";
for ($key = (count($cost_array)-1); $key >=0 ; $key--) {
	$user_type["level_".$key] = $key."级";
}
//$user_type["guest"] = "游客";
?>
<table id="tabaccess" width="100%" border="1px" cellpadding="0" cellspacing="1">
<thead>
<tr>
<td>权限/等级</td>
<?php foreach ($user_type as $key => $value):?>
<td><?php echo $value;?></td>
<?php endforeach;?>
</tr>
</thead>
<tbody>
<?php foreach ($access_type as $k => $role){?>
<tr>
<td class="fixLeft"><?php echo $role["text"];?></td>
<?php foreach ($user_type as $key => $value):
$current = 0;
//如果是全局设置则只读全局设置的
if($roomnumber=="-1" && isset($global_arr_val[$key])){
	$current = $global_arr_val[$key];
}else{//房间设置，如果已经设置了就按房间的，如果没有设置就按全局设置的
	if(isset($user_arr_val[$key])){
		$current = $user_arr_val[$key];
	}else{
		if(isset($global_arr_val[$key])){
			$current = $global_arr_val[$key];
		}
	}
}
$selected = "";
$mm = (int)$current&(int)($role["value"]);
if($mm){
	$selected = " checked='checked'";
}
?>
<td><input<?php echo $selected;?> type='checkbox' title="<?php echo $value.":".$role["text"]?>" name='role' value="<?php echo $role["value"]?>" user="<?php echo $key;?>" access="<?php echo $k;?>"/></td>
<?php endforeach;?>
</tr>
<?php }?>

<?php 

$selected_count = array();
foreach ($access_type_time as $k => $role){?>
<tr>
<td class="fixLeft"><?php echo $role["text"];?></td>
<?php foreach ($user_type as $key => $value):
$current = 0;
//如果是全局设置则只读全局设置的
if($roomnumber=="-1" && isset($global_arr_val_count[$key])){
	$current = $global_arr_val_count[$key];
}else{//房间设置，如果已经设置了就按房间的，如果没有设置就按全局设置的
	if(isset($user_arr_val_count[($key."_".$k)])){
		$current = $user_arr_val_count[($key."_".$k)];
	}else{
		if(isset($global_arr_val_count[($key."_".$k)])){
			$current = $global_arr_val_count[($key."_".$k)];
		}
	}
}
$selected_count["[user=$key][access=$k]"] = $current;
?>
<td><select title="<?php echo $value.":".$role["text"]?>" name='role_count' value="<?php echo $role["value"]?>" user="<?php echo $key;?>" access="<?php echo $k;?>">
	<option value="0">0</option>
	<option value="5">5</option>
	<option value="10">10</option>
	<option value="15">15</option>
	<option value="20">20</option>
</select></td>
<?php endforeach;?>
</tr>
<?php }?>
</tbody>
</table>
</div>
<script>
$(function(){
<?php foreach ($selected_count as $key => $value):?>
$("select<?php echo $key?>").val(<?php echo $value?>);
<?php endforeach;?>
});
</script>
</body>
</html>