<?php
header("Content-Type: text/html; charset=UTF-8");
include("include/header.inc.php");
include("include/QQZone/QQZone.inc.php");
/*
http://www.wpy.qq.com/task_check_award.php?appid=24885&billno=4BE1D6AE-5324-11E3-BC76-00163EB7F40B&cmd=check_award&contractid=24885T320131118114134&openid=000000000000000000000000025900A0&payitem=pkg&pf=qzone&providetype=2&step=3&ts=1385089780&version=V3&sig=E%2BS6dC%2BhooDCtwvhnGTFIFGrfng%3D
1、进入游戏  送10张投票权
2、进入房间给主播投票 奖励坐骑1天(自行车)
3、给主播送出 红玫瑰 礼物 奖励5金券
4、连续登陆3天 奖励10金币
*/
/*
$str = "";
foreach($_REQUEST as $key=>$value){
	if($key=="sig"){
		continue;
	}
	$str.= "$key%3D$value%26";
}
$str = str_replace("-","%2D",$str);
$str = str_replace("_","%5F",$str);
$str = "GET&%2Ftask_check_award.php&".rtrim($str,"%26");
$sig = get_signature($str, ($appkey."&"));
$sig = base64_encode($sig);
if($sig!=$_REQUEST["sig"]){
	echo '{"ret":103,"msg":"OK","zoneid":""}';
	include("include/footer.inc.php");
	exit;
}
*/
echo task_award();
function task_award(){
	global $db;
	$contractid = $_REQUEST["contractid"];//哪个任务
	$openid = $_REQUEST["openid"];
	$billno = $_REQUEST["billno"];
	//$db->debug = true;
	$user = $db->GetRow("select * from user where snsid='$openid'");
	if(!$user){
		return '{"ret":101,"msg":"OK","zoneid":""}';
	}
	$step = (int)$_REQUEST["step"];
	$cmd = $_REQUEST["cmd"];
	//if($contractid=="1"){
		$complete = $db->GetOne("select complete from task_qq where userid=$user[userid] and taskid='$contractid' and `step`=$step");
		if(!$complete){
			$db->Execute("INSERT INTO `task_qq`(userid,taskid,`step`,complete,`billno`) VALUES ('$user[userid]', '$contractid', '$step', '1','$billno')");
		}else if($complete=="3"){//已经领过了
			return '{"ret":3,"msg":"OK","zoneid":""}';
		}
		switch ($step) {
			case 1:
				if($cmd=="award"){//第1步，给用户发奖励
					if($complete!="3"){
						$db->Execute("update giftstore set num=num+10 where userid='{$user['userid']}' and giftid=1");
						$db->Execute("update task_qq set complete=3 where userid=$user[userid] and taskid='$contractid' and `step`=$step");
					}
					return '{"ret":0,"msg":"OK","zoneid":""}';
				}
				break;
			case 2:
				$gift = $db->GetOne("select userid from balance_change_log where userid=$user[userid] and giftid='1'");
				if($cmd=="check"){//返回步骤完成状态
					if(!$gift){//未完成
						return '{"ret":2,"msg":"OK","zoneid":""}';
					}else{
						$db->Execute("update task_qq set complete=2 where userid=$user[userid] and taskid='$contractid' and `step`=$step");
						return '{"ret":0,"msg":"OK","zoneid":""}';
					}
				}
				else if($cmd=="check_award"){//开发者需要查询任务步骤是否完成，若步骤已完成，直接给用户发货（payitem），并返回发货是否成功。
					if(!$gift){//未完成
						return '{"ret":2,"msg":"OK","zoneid":""}';
					}else{
						$db->Execute("insert into usercars(userid,carid,vailddate)values('{$user[userid]}','217','".(time()+86400)."')");
						$db->Execute("update task_qq set complete=3 where userid=$user[userid] and taskid='$contractid' and `step`=$step");
						return '{"ret":0,"msg":"OK","zoneid":""}';
					}
				}
				break;
			case 3:
				$gift = $db->GetOne("select userid from balance_change_log where userid=$user[userid] and giftid='5'");
				if($cmd=="check"){//返回步骤完成状态
					if(!$gift){//未完成
						return '{"ret":2,"msg":"OK","zoneid":""}';
					}else{
						$db->Execute("update task_qq set complete=2 where userid=$user[userid] and taskid='$contractid' and `step`=$step");
						return '{"ret":0,"msg":"OK","zoneid":""}';
					}
				}
				else if($cmd=="check_award"){
					if(!$gift){//未完成
						return '{"ret":2,"msg":"OK","zoneid":""}';
					}else{
						$db->Execute("update task_qq set complete=2 where userid=$user[userid] and taskid='$contractid' and `step`=$step");
						return '{"ret":0,"msg":"OK","zoneid":""}';
					}
				}
				break;
			case 4:
				//$continuou = $db->GetOne("select userid from user where userid=$user[userid] and continuou_login>=3");
				$continuou=3;//每次都成功
				if($cmd=="award"){
					if($continuou<3){//未完成
						return '{"ret":2,"msg":"OK","zoneid":""}';
					}else{
						$db->Execute("update user set balance=balance+10 where userid='{$user['userid']}'");
						$db->Execute("update task_qq set complete=3 where userid=$user[userid] and taskid='$contractid' and `step`=$step");
						return '{"ret":0,"msg":"OK","zoneid":""}';
					}
				}
				break;
		}
	//}
}

/**
 * @brief 使用HMAC-SHA1算法生成oauth_signature签名值 
 *
 * @param $key  密钥
 * @param $str  源串
 *
 * @return 签名值
 */
 function get_signature($str, $key)
{
    $signature = "";
    if (function_exists('hash_hmac'))
    {
        $signature = hash_hmac("sha1", $str, $key);
    }
    else
    {
        $signature = custom_hmac("sha1", $str, $key);
        
    }
 
    return $signature;
}
function custom_hmac($algo, $data, $key, $raw_output = false)
{
    $algo = strtolower($algo);
    $pack = 'H'.strlen($algo('test'));
    $size = 64;
    $opad = str_repeat(chr(0x5C), $size);
    $ipad = str_repeat(chr(0x36), $size);
 
    if (strlen($key) > $size) {
        $key = str_pad(pack($pack, $algo($key)), $size, chr(0x00));
    } else {
        $key = str_pad($key, $size, chr(0x00));
    }
 
    for ($i = 0; $i < strlen($key) - 1; $i++) {
        $opad[$i] = $opad[$i] ^ $key[$i];
        $ipad[$i] = $ipad[$i] ^ $key[$i];
    }
 
    $output = $algo($opad.pack($pack, $algo($ipad.$data)));
 
    return ($raw_output) ? pack($pack, $output) : $output;
}
include("include/footer.inc.php");