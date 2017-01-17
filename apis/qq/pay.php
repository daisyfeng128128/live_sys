<?php
header("Expires: Mon, 26 Jul 1970 05:00:00 GMT");      
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");      
header("Cache-Control: no-cache, must-revalidate");      
header("Pragma: no-cache");
include '../../include/header.inc.php';
include_once($app_path.'include/QQZone/QQZone.inc.php');
$user=checklogin();
function buy_goods($money,$sdk, $openid, $openkey, $pf,$pfkey){
	global $db,$user;
	//插入数据库
	$balanceadd=$money*800;
	$qqmoney=$money*10;
	$agentid=(int)$_GET['agentid'];
	$db->Execute("insert into orders(adddate,money,userid,status,paychannel,balanceadd,agentid,lastupdate) values('".date('Ymd')."','$qqmoney','$user[userid]','0','1','$balanceadd','$agentid','".time()."')");
	$orderid=$db->Insert_ID();
	$params = array(
		'ts'=>time(),
		'pfkey'=>$pfkey,
		'openid' => $openid,
		'openkey' => $openkey,
		'pf' => $pf,
		'payitem'=>"$orderid*".$qqmoney."*1",
		'goodsmeta'=>$balanceadd.' 金币*'.$balanceadd.' 金币',
		'goodsurl'=>'http://i.gtimg.cn/open/app_icon/01/49/34/66//1101493466_100.png',
		'zoneid'=>'0',
	);
	$script_name = '/v3/pay/buy_goods';
	return $sdk->api($script_name, $params,'get','https');
}
$arr=buy_goods($_GET['money'],$sdk, $_COOKIE['openid'], $_COOKIE['openkey'], $_COOKIE['pf'],$_COOKIE['pfkey']);
//array(3) { ["ret"]=> int(0) ["url_params"]=> string(129) "/v1/009//qz_goods_info?token_id=322DC7CF92C9AF5995A8F3F615AEC89902002&sig=i6Y3pMq4vkR3fqs41i7esuqj0q8%3D&appid=" ["token"]=> string(37) "322DC7CF92C9AF5995A8F3F615AEC89902002" } 
echo json_encode($arr);
include '../../include/footer.inc.php';