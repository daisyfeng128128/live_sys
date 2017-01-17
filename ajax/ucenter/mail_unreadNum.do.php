<?php //2 新信息,在页面头部js:Main.getUnReadMsg();?>
<?php 
include '../../include/header.inc.php';
$user=checklogin();
if(!$user){
	echo '{"body":0,"code":200,"msg":"succ"}';
}
$count = $db->GetOne("select count(*) from mailbox where userid=$user[userid] and `read`=0");
echo '{"body":'.$count.',"code":200,"msg":"succ"}';

include '../../include/footer.inc.php';
?>
