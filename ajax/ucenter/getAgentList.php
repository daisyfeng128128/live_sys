<?php 
/**
 * 输出代理列表
 */
include '../../include/header.inc.php';
$rs=$db->Execute("select b.nickname,a.userid,b.usernumber from agentsalary a ,user b where a.userid=b.userid and a.istrade=0 and b.usertype=7");
$res = "";
while($arr=$rs->FetchRow()){
	$arr=safe_output($arr);
//<a href="javascript:void(0)" id="agent{$arr['userid']}" un="{$arr['usernumber']}" class="agentname">{$arr['nickname']}</a>
//<ul>\r\n<li><a target=\"_blank\" a target=\"_blank\" href=\"http://wpa.qq.com/msgrd?v=3&uin=451488&site=qq&menu=yes\"><img border=\"0\" src=\"http://wpa.qq.com/pa?p=2:451488:46\"><\/a><span id=\"451488\" onclick=\"$('#agent_close').click();\">芭宝莉<\/span><\/li>\r\n<\/ul>
$res .= <<<eto
<li><span id=\"agent$arr[userid]\" un=\"$arr[usernumber]\" class=\"agentname\" onclick=\"$('#agent_close').click();\">$arr[nickname]</span></li>
eto;
}

include '../../include/footer.inc.php';
?>
{"brief":"新增代理时复制<li><a target=\"_blank\" href=\"http://wpa.qq.com/msgrd?v=3&uin=QQ号码&site=qq&menu=yes\"><img border=\"0\" src=\"http://wpa.qq.com/pa?p=2:QQ号码:46\"><\/a><span id=\"代理SKYID\">代理名称<\/span><\/li>",
"content":"<ul><?php echo $res?><\/ul>",
"createTime":"2013-01-24 11:36:52",
"id":1,
"status":1,
"updateTime":"2013-10-18 13:44:46"}