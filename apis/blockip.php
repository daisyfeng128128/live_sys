<?php if($_SERVER['REMOTE_ADDR']!="61.160.101.182"){
	exit('fail');
}
$ip=$_GET['ip'];
$opt=$_GET['opt'];
exec("/usr/local/sbin/ipdrop $ip $opt");
?>