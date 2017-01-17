<?php //请求币js:Main.queryBalance();
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include '../../include/header.inc.php';
$user=checklogin();
if($user){
?>
{"bean_balance":<?php echo $user[point]?>,"gold_balance":<?php echo $user[balance]?>,"error":"succ"}
<?php }else{?>
{"bean_balance":0,"gold_balance":0,"error":"err"}
<?php }
include '../../include/footer.inc.php';
?>