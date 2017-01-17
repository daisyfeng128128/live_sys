<?php 
include('head.php');
if($_REQUEST["username"] && $_REQUEST["userpass"]){
	$info = $db->GetRow("select * from rootadmin where ADMINNAME='{$_REQUEST["username"]}' and ADMINPASS='".md5($_REQUEST["userpass"])."'");
	if($info!==false){
		$_SESSION["admin"] = $info;
		$_SESSION["admin"]["logintime"] = time();
	}
}
/*
 * 
 * 

echo '
flightHandler({
    "code": "CA1998",
    "price": 1780,
    "tickets": 5
});
';



echo 'localHandler("a");';
*/
?>
<script>
self.location='<?php echo _JAVA_DOMAIN_?>/red5/root/logon.do?username=<?php echo $_POST['username']?>&userpass=<?php echo $_POST['userpass']?>&verifycode=<?php echo $_POST['verifycode']?>&act=checklog';
</script>
<?php include('../../include/footer.inc.php');?>