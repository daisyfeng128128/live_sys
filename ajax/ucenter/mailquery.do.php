<?php //个人中心,返回信件标题等等,js:MailBox.getLs();
/*
登录返回
{"body":{"beginIndex":1,"data":[{"createTime":"2013-11-13 14:28:08","fromSkyId":0,"id":"5285d1a2da0aa07ccd037174","read":true,"title":"幸运礼物中奖升级","type":1},{"createTime":"2013-10-21 18:06:54","fromSkyId":0,"id":"5272163bda0a75ff620232c8","read":true,"title":"魅力之星即将开奖！","type":2}],"endIndex":2,"firstPage":1,"hasNextPage":false,"hasPreviousPage":false,"items":2,"lastPage":true,"nextPage":1,"page":1,"pageCount":1,"pageNum":20,"pages":1,"previousPage":1},"code":200,"msg":"succ"}
*/
include '../../include/header.inc.php';
$user=checklogin();
if(!$user){
	echo '{"body":{"beginIndex":0,"data":[],"endIndex":0,"firstPage":0,"hasNextPage":false,"hasPreviousPage":false,"items":0,"lastPage":false,"nextPage":0,"page":1,"pageCount":0,"pageNum":20,"pages":0,"previousPage":0},"code":200,"msg":"succ"}';
}
else{
	
	$temp = array();
	$temp['code']='200';
	$temp['msg']='';
	
	include_once($app_path."include/page.inc.php");
	$page = max((int) $_GET['page'], 1);
	$limit = (int)$_GET['pageNum'];
	$start = ($page - 1) * $limit;
	$where_limit = " limit $start, $limit";
	
	$sql = "select * from mailbox where 1=1 and userid='$user[userid]' order by id desc {$where_limit}";
	$sql_count = "select count(*) from mailbox where 1=1 and userid='$user[userid]'";
	
	$total = (int) $db->GetOne($sql_count);
	//Array ( [total] => 26 [pages] => 2 [page] => 2 [start] => 20 [limit] => 6 ) 
	$multi = multi($total, $page, $limit);
	$res = $db->GetArray($sql);
	//{"body":{"beginIndex":1,"data":[{"createTime":"2013-11-13 14:28:08","fromSkyId":0,"id":"5285d1a2da0aa07ccd037174","read":true,"title":"幸运礼物中奖升级","type":1},{"createTime":"2013-10-21 18:06:54","fromSkyId":0,"id":"5272163bda0a75ff620232c8","read":true,"title":"魅力之星即将开奖！","type":2}],"endIndex":2,"firstPage":1,"hasNextPage":false,"hasPreviousPage":false,"items":2,"lastPage":true,"nextPage":1,"page":1,"pageCount":1,"pageNum":20,"pages":1,"previousPage":1},"code":200,"msg":"succ"}
	//{"createTime":"2013-11-13 14:28:08","fromSkyId":0,"id":"5285d1a2da0aa07ccd037174","read":true,"title":"幸运礼物中奖升级","type":1}
	$data = array();
	foreach ($res as $v) {
		$item = array();
		$item["createTime"] = $v["createTime"];
		$item["fromSkyId"] = $v["fromSkyId"];
		$item["id"] = $v["id"];
		$item["read"] = empty($v["read"])?false:true;
		$item["title"] = $v["title"];
		$item["type"] = $v["type"];
		$data[] = $item;
	}
	$temp['body']['data'] = $data;
	//分页
	$temp['body']['beginIndex'] = $start;
	$temp['body']['endIndex'] = $start+$limit;
	$temp['body']['firstPage'] = 1;
	$temp['body']['hasNextPage'] = ($page==$multi["pages"])?false:true;
	$temp['body']['hasPreviousPage'] = ($page!=1)?false:true;
	$temp['body']['items'] = $multi["total"];
	$temp['body']['lastPage'] = $multi["pages"];
	$temp['body']['page'] = $page;
	$temp['body']['pageCount'] = $limit;
	$temp['body']['pages'] = $multi["pages"];
	$temp['body']['previousPage'] = ($page+1)>$multi["pages"]?$page:($page+1);
	
	echo json_encode($temp);
}
include '../../include/footer.inc.php';