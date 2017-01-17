<?php //取得星际争霸数据
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include '../../include/header.inc.php';
//查本月的数据
$firstday=date('Y-m-01');
$lastday=date('Y-m-d',strtotime("$firstday +1 month"));
$firstday = strtotime($firstday);
$lastday = strtotime($lastday);
//$db->debug = true;
//每月重新计算
$arr=$db->GetRow("SELECT a.*,b.giftname,b.giftimage,c.nickname,c.usernumber,d.nickname as tonickname,d.usernumber as tousernumber FROM `balance_change_log` a,`gift` b,`user` c,`user` d where c.userid=a.userid and d.userid=a.touserid and b.giftid=a.giftid and a.why=1 and a.giftid=51 and a.when>=$firstday and a.when<$lastday order by a.`giftnum` desc");
//所有中最高的
//$arr=$db->CacheGetRow(60,"SELECT a.*,b.giftname,b.giftimage,c.nickname,c.usernumber,d.nickname as tonickname,d.usernumber as tousernumber FROM `balance_change_log` a,`gift` b,`user` c,`user` d where c.userid=a.userid and d.userid=a.touserid and b.giftid=a.giftid and a.why=1 and a.giftid=51 order by a.`giftnum` desc");
?>
<?php if($arr):?>
{"amount":<?php echo $arr['giftnum']?>,"dstNickName":"<?php echo $arr['tonickname']?>","srcNickName":"<?php echo $arr['nickname']?>"}
<?php else:?>
{"amount":"","dstNickName":"","srcNickName":""}
<?php endif;
include '../../include/footer.inc.php';
?>
