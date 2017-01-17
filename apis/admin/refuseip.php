<?php 
exit;
//封ip,解封ip接口
header("Content-type:text/html;charset=utf-8");
include('../../include/header.inc.php');
$url = $_SERVER["HTTP_REFERER"];

if($_REQUEST["act"]=="delete"){
	$id = (int)$_REQUEST["id"];
	$ipv4=$db->GetOne("select lastloginip from refuseip where id='$id'");
	$ipv4 = long2ip($ipv4);
	$db->Execute("delete from refuseip where id='$id'");
}else{
	$ipv4=$_REQUEST["lastloginip"];
	$db->Execute("INSERT INTO `refuseip`(lastloginip,addtime) VALUES ('$ipv4', '".date("Y-m-d H:i:s")."');");
}

//$ipv4="82.237.3.3";
$ip = filter_var($ipv4,FILTER_VALIDATE_IP);
if(!$ip){
	echo "<script>alert('请求信息不正确');window.location.href='$url';</script>";
	include('../../include/footer.inc.php');
	exit();
}

if($_REQUEST["act"]=="addrefuseip"){//封ip
	shell_exec("iptables -A input -s $ipv4 -p tcp --dport 80 -j DROP");
}else if($_REQUEST["act"]=="delete"){
	shell_exec("iptables -D input -s $ipv4 -p tcp --dport 80 -j REJECT");
}

echo "<script>window.location.href='$url';</script>";
include('../../include/footer.inc.php');