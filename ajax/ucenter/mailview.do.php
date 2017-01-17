<?php //用户的个人信息,js:MailBox.open();
/*
如果没有登录则返回
{"body":{"createTime":"2013-11-13 14:28:08","fromSkyId":0,"id":"5285d1a2da0aa07ccd037174","read":true,"text":"幸运礼物中奖大升级，\r\n\r\n现在中奖直接返还乐币，\r\n\r\n快来送幸运礼物吧！！","title":"幸运礼物中奖升级","type":1},"code":200,"msg":"succ"}
*/

include '../../include/header.inc.php';
include($app_path."include/level.func.php");
$user=checklogin();
if(!$user){
	echo '{"code":83404,"msg":"抱歉，该信件不存在"}';
}
else{
	$temp = array();
	$temp['code']='200';
	$temp['msg']='';
	
	$id = (int)$_GET["id"];
	$v = $db->GetRow("select * from mailbox where id='$id' and userid='$user[userid]'");
	//{"createTime":"2013-11-13 14:28:08","fromSkyId":0,"id":"5285d1a2da0aa07ccd037174","read":true,
	//"text":"幸运礼物中奖大升级，\r\n\r\n现在中奖直接返还乐币，\r\n\r\n快来送幸运礼物吧！！","title":"幸运礼物中奖升级","type":1}
	$item = array();
	$item["createTime"] = $v["createTime"];
	$item["fromSkyId"] = $v["fromSkyId"];
	$item["id"] = $v["id"];
	$item["read"] = empty($v["read"])?"false":"true";
	$item["title"] = $v["title"];
	$item["type"] = $v["type"];
	$item["text"] = $v["text"];
	
	if($v["read"]=="0"){
		$db->Execute("update mailbox set `read`='1' where id='{$v["id"]}'");
	}
	
	$temp['body'] = $item;
	
	echo json_encode($temp);
}
include '../../include/footer.inc.php';