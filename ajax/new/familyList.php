<?php //家簇列表页排行?>
<?php 
exit;//现在直接在页面中查询实现了
include '../../include/header.inc.php';

$limit = (int)$_GET["rankSize"];
$limit = (is_numeric($limit)&&$limit>0&&$limit<100)?$limit:20;
$cacheTime = 3600;
//家族消费[送出礼物的价格最高]
$xiaofei = $db->CacheGetArray($cacheTime, "select u.clanid,sum(abs(b.money)) as usemoney,c.clanname,c.medalname,c.clantype from balance_change_log b,user u,clan c where b.userid=u.userid and c.clanid=u.clanid and u.clanid!=0 GROUP BY u.clanid ORDER BY usemoney desc limit $limit");
//家族人气榜[收到的掌声最多]
$packets = $db->CacheGetArray($cacheTime+100, "select u.clanid,count(b.userid) as usemoney,c.clanname,c.medalname,c.clantype from balance_change_log b,user u,clan c where b.touserid=u.userid and c.clanid=u.clanid and u.clanid!=0 and b.giftid=1 GROUP BY u.clanid ORDER BY usemoney desc limit $limit");
//家族礼物榜[收到的礼物价格最高]
$shower = $db->CacheGetArray($cacheTime+200, "select u.clanid,sum(abs(b.money)) as usemoney,c.clanname,c.medalname,c.clantype from balance_change_log b,user u,clan c where b.touserid=u.userid and c.clanid=u.clanid and u.clanid!=0 GROUP BY u.clanid ORDER BY usemoney desc limit $limit");
$res = array(
	"code"=>"200",
	"msg"=>"succ",
	"result"=>array(
		"cost"=>array(
			"day"=>$xiaofei,
			"month"=>array(),
			"week"=>array(),
			"total"=>array(),
		),
		"medal"=>array(
			"day"=>array(),
			"month"=>array(),
			"week"=>array(),
			"total"=>array(),
		),
		"packets"=>array(
			"day"=>$packets,
			"month"=>array(),
			"week"=>array(),
			"total"=>array(),
		),
		"shower"=>array(
			"day"=>$shower,
			"month"=>array(),
			"week"=>array(),
			"total"=>array(),
		),
	)
);
echo json_encode($res);
include '../../include/footer.inc.php';