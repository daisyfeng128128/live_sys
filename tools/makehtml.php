<?php
set_time_limit(0);
include('../include/header.inc.php');
//帮助
ob_start();
$rs=$db->Execute("select * from help where `type`=0 order by id asc");
while($arr=$rs->FetchRow()){
	$questions[$arr['id']]=$arr;
}
$rs=$db->Execute("select * from help where `type`=1 order by id asc");
while($arr=$rs->FetchRow()){
	$questions_show[$arr['id']]=$arr;
}
include('tpl_html/help.php');
$html = ob_get_contents();
file_put_contents('../html/help.html',$html);
unset($html);
ob_end_clean();

//靓号,和商城在一起，现在不用了
ob_start();
include('tpl_html/beauty_num.php');
$html = ob_get_contents();
file_put_contents('../html/beauty_num.html',$html);
unset($html);
ob_end_clean();

//首页公告列表
ob_start();
$rs=$db->Execute("select id,title from news where id not in(4,5,6,7) order by id desc");
while($arr=$rs->FetchRow()){
	echo '<li><a href="/news/'.$arr['id'].'.html">'.$arr['title'].'</a></li>';
}
$html = ob_get_contents();
file_put_contents('./tpl_html/index_announce.html',$html);
unset($html);
ob_end_clean();

//首页帮助列表
ob_start();
$rs=$db->SelectLimit("select id,title from help order by id desc",8);
while($arr=$rs->FetchRow()){
	$arr=safe_output($arr);
	echo '<li><a href="/html/help.html#'.$arr[id].'">'.$arr['title'].'</a></li>';
}
$html = ob_get_contents();
file_put_contents('./tpl_html/index_help.html',$html);
unset($html);
ob_end_clean();

//feedback
ob_start();
include('tpl_html/feedback.html');
$html = ob_get_contents();
file_put_contents('../html/feedback.html',$html);
unset($html);
ob_end_clean();

//sign
ob_start();
include('tpl_html/signing.html');
$html = ob_get_contents();
file_put_contents('../html/signing.html',$html);
unset($html);
ob_end_clean();

//find password
ob_start();
include('tpl_html/findpassword.html');
$html = ob_get_contents();
file_put_contents('../html/findpassword.html',$html);
unset($html);
ob_end_clean();
header("Content-Type: text/html; charset=UTF-8");
echo "页面生成成功";