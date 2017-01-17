<?php //点击公聊旁边的礼物先项卡时会请求js:Room.getGiftLog();
//http://*/ajax/le/shop_query_gift_log.php?showid=23
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include '../../include/header.inc.php';
$showid = (int)$_GET[showid];
$sql="select rows.*,b.giftname,b.giftimage from (SELECT a.giftid,a.userid,a.giftnum,u.nickname,a.`when` FROM `balance_change_log` a,`user` u where u.userid=a.userid and a.why=1 and a.`showid`='$showid' order by a.`when` desc)
as rows ,`gift` b where b.giftcateid not in(0,1,8) and b.giftid=rows.giftid limit 100";
$rs=$db->CacheExecute(60,$sql);
$giftinfo = array();
while($arr=$rs->FetchRow()){
	$arr["giftimg"] = "<img src='/images/pixel.gif' class='giftsmall ".$arr['class']=str_replace(array('.png','.gif'),'',$arr['giftimage'])."_x' title='$arr[giftname]'>";
	$arr["time"] = date("H:i",$arr["when"]);
	$giftinfo[]=$arr;
}
echo json_encode(array("error"=>"succ","items"=>$giftinfo));
include '../../include/footer.inc.php';