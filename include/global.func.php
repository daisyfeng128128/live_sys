<?php 
function safe_output($arr,$return=true){
	if(!is_array($arr)){
		return;
	}
	foreach($arr as $key=>$val){
		if(is_array($val)){
			$val=safe_output($val);
			$arr[$key]=$val;
		}
		else{
			$arr[$key]=nl2br(htmlspecialchars($val));
		}
	}
	if($return){
		return $arr;
	}
}
//addslashes 
function add_slashes($string) { 
	if (!is_array($string)) return addslashes($string); 
	foreach ($string as $key => $val) { 
		$string[$key] = add_slashes($val); 
    } 
    return $string; 
}
/**
 * 将任务完成与领取约币分成两步 
 * @param number $uid
 * @param number $taskid
 * @return number
 */
function multi($total, $page, $per = 20)
{
	$meta['total'] = (int) $total;
	$meta['pages'] = (int) ceil($total / ((0 == $per) ? 1 : $per));
	$meta['page'] = (int) max(1, min($page, $meta['pages']));
	$meta['start'] = (int) ($meta['page'] - 1) * $per;
	$meta['limit'] = (int) min($per, $meta['total']- $meta['start']);
	return $meta;
}
function interval_time($time){
 $days = 0;        //多少天
 $hour = interval_hour($time-86400*$days);
 $minute = interval_minute($time-86400*$days-3600*$hour);
 $second = interval_second($time-86400*$days-3600*$hour-60*$minute);

 $str = "";
 $str.= $days ? $days."天":"";
 $str.= $hour ? $hour."小时":"";
 $str.= $minute ? $minute."分":"";
 $str.= $second ? $second."秒":"";
 return empty($str)?0:$str;
}
function interval_day($time){
 //if ($time>=86400){
  return floor($time/86400);        //多少天
 //}
}
function interval_hour($time){
 //if ($time>=3600 and $time<86400){
  return floor($time/3600);        //多少小时
 //}
}
function interval_minute($time){
 //if ($time>=60 and $time<3600){
  return floor($time/60);        //多少分钟
 //}
}
function interval_second($time){
 //if ($time>0 and $time<60){
  return $time;        //多少秒
 //}
}
/**
 * 返回各榜查询开始和结时间
 * 如果现在是5号,0点30分前，则返回3号的时间,0点30分后，返回4号的时间
 */
function get_top_rank_time($t="day"){
	$h = (int)date("G");
	$i = ((int)date("i"));
	if(($h==0 && $i<30)){
		switch ($t) {
			case "day":
				return array(
				"starttime"=>strtotime(date('Y-m-d 00:00:00',strtotime("-2 day"))),
				"endtime"=>strtotime(date('Y-m-d 23:59:59',strtotime("-2 day")))
				);
				break;
			case "week":
				$endtime=strtotime(date('Y-m-d 00:00:00'));
				$starttime=$endtime-3600*24*7;
				$endtime -= 86400;
				$starttime -= 86400;
				return array(
						"starttime"=>$starttime,
						"endtime"=>$endtime-1
				);
				break;
			case "month":
				$endtime=strtotime(date('Y-m-d 00:00:00'));
				$starttime=$endtime-30*24*3600;
				$endtime -= 86400;
				$starttime -= 86400;
				return array(
						"starttime"=>$starttime,
						"endtime"=>$endtime-1
				);
				break;
			case "ji":
				$endtime=strtotime(date('Y-m-d 00:00:00'));
				$starttime=$endtime-3*30*24*3600;
				$endtime -= 86400;
				$starttime -= 86400;
				return array(
						"starttime"=>$starttime,
						"endtime"=>$endtime-1
				);
				break;
		}
	}else{
		switch ($t) {
			case "day":
				return array(
				"starttime"=>strtotime(date('Y-m-d 00:00:00',strtotime("-1 day"))),
				"endtime"=>strtotime(date('Y-m-d 23:59:59',strtotime("-1 day")))
				);
				break;
			case "week":
				$endtime=strtotime(date('Y-m-d 00:00:00'));
				$starttime=$endtime-3600*24*7;
				return array(
						"starttime"=>$starttime,
						"endtime"=>$endtime-1
				);
				break;
			case "month":
				$endtime=strtotime(date('Y-m-d 00:00:00'));
				$starttime=$endtime-30*24*3600;
				return array(
						"starttime"=>$starttime,
						"endtime"=>$endtime-1
				);
				break;
			case "ji":
				$endtime=strtotime(date('Y-m-d 00:00:00'));
				$starttime=$endtime-3*30*24*3600;
				return array(
						"starttime"=>$starttime,
						"endtime"=>$endtime-1
				);
				break;
		}
	}
}


//通过curl取得内容
function getCurlContent($url){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0);
	$ip = rand(1, 244).".".rand(1, 244).".".rand(1, 244).".".rand(1, 244);
	//请求头信息
	$headers = array(
		"Accept:image/png,image/*;q=0.8,*/*;q=0.5",
		"Accept-Encoding:gzip, deflate",
		"Accept-Language:zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3",
		"Cache-Control:max-age=0",
		"Connection:keep-alive",
		"Host:qzapp.qlogo.cn",
		"If-Modified-Since:Mon, 01 Jan 1990 00:00:00 GMT",
		"Referer:http://".$_SERVER['HTTP_HOST']."/",
		"User-Agent:Mozilla/5.0 (Windows NT 6.1; WOW64; rv:32.0) Gecko/20100101 Firefox/32.0",
		"CLIENT-IP:{$ip}",
		"X-FORWARDED-FOR:{$ip}",
	);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	$output = curl_exec($ch);
	curl_close($ch);
	return $output;
}


//取得用户头像的图片地址
function get_avatar_img($uid=null){
	if(empty($uid)){
		return $page_var['cdn_domain']."/images/2456_120x120.jpg";
	}else{
		return $page_var['cdn_domain'].'/static_data/uploaddata/avatar/'.substr($uid,0,1).'/'.$uid.'.gif';
	}
}




//充值成功调1
function payback($orderid,$money,$tradeid,$code,$postStr){
    global $db;
    if($code=="SUCCESS"){
        $get_order_sql = "select * from bu_gift_details where orderId='$orderid' FOR UPDATE";
        $row=$db->GetRow($get_order_sql);
        $userid=$row["userId"];
        $money=$money*100;

        $packs=$db->GetRow("select * from bu_user_packs where userId=$userid FOR UPDATE");
        $coins=$packs[coins];

        $addB=$coins+$money;
        $db->Execute("update bu_user_packs set coins='$addB' where userId='$userid'");
        //tradeStatus 0.未处理 1成功 2.失败
        $db->Execute("update bu_gift_details set tradeStatus=1,logs=$postStr,balance='$addB' where  orderId='$orderid' ");
    }

}


//充值成功调
function payOrdersDeal($r6_Order,$r3_Amt,$r2_TrxId){

	global $db,$app_path;
	$orderid=(int)substr($r6_Order,8);
	$get_order_sql = "select * from orders where id='$orderid' FOR UPDATE";
	$db->StartTrans();
	$row=$db->GetRow($get_order_sql);
	$isok = false;
	if($row['status']==0 && $row['money']==$r3_Amt){    //尚未付款的订单
		$db->Execute("update orders set status=1,sid='$r2_TrxId' where id='$orderid'");
		$chooseuserid = empty($row["chooseuserid"])?$row["userid"]:$row["chooseuserid"];//给他人充值
		$user=$db->GetRow("select * from bu_user_packs where userId=$chooseuserid FOR UPDATE");
		$money=$row["balanceadd"];
		$balance=$user['coins']+$money;
		//加钱
		$db->Execute("update bu_user_packs set coins='$balance' where userId=$chooseuserid");
		$touserid = 0;
		$point = 0;
		if($row[showuserid]){
			$touserid = $row[showuserid];
			$point = $money*_PAY_ADD_;
			addPoint($touserid,$point);
		}
		//记录
		$db->Execute("insert into balance_change_log (`when`,`why`,`userid`,touserid,point,`money`,`balance`,`channel`,`agentid`)values('".time()."','0','$chooseuserid','$touserid','$point','$money','$balance','$row[paychannel]','$row[agentid]')");
		finish_task($row[userid], 8);
		$isok = true;
	}
	$db->CompleteTrans();
	if($isok){
		if(file_exists($app_path."modules/pay_success.php")){
			$pay_success_userid = $row[userid];
			include($app_path."modules/pay_success.php");
		}
	}
	
}
/**
 * 导出数据，第一行可以是标题
 */
function exportDataArray($data,$filename=""){
	if(empty($filename)){
		$filename = date("Ymd_His").".csv";
	}
	ob_clean();
	ob_end_flush();
	header("Cache-Control: public");
	header("Pragma: public");
	header("Content-type:application/vnd.ms-excel");
        header("Content-Disposition:attachment;filename=$filename");
        header('Content-Type:APPLICATION/OCTET-STREAM');
        ob_start();
        $file_str = null;
        foreach ($data as $value) {
            $tmp = null;
            foreach ($value as $v) {
                $tmp .= strip_tags($v).",";
            }
            $tmp = trim($tmp,",");
            $tmp = iconv("utf-8",'gbk',$tmp);

            $file_str .= $tmp."\n";
        }
//	$file_str=  iconv("utf-8",'gbk',$file_str);
        ob_end_clean();
        echo $file_str;
    }


function get_client_ip($type = 0) {
    $type       =  $type ? 1 : 0;
    static $ip  =   NULL;
    if ($ip !== NULL) return $ip[$type];
    if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $arr    =   explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        $pos    =   array_search('unknown',$arr);
        if(false !== $pos) unset($arr[$pos]);
        $ip     =   trim($arr[0]);
    }elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
        $ip     =   $_SERVER['HTTP_CLIENT_IP'];
    }elseif (isset($_SERVER['REMOTE_ADDR'])) {
        $ip     =   $_SERVER['REMOTE_ADDR'];
    }
    // IP地址合法验证
    $long = ip2long($ip);
    $ip   = $long ? array($ip, $long) : array('0.0.0.0', 0);
    return $ip[$type];
}

function get_real_ips(){
    static $realip;
    if(isset($_SERVER)){
        if(isset($_SERVER['HTTP_X_FORWARDED_FOR'])){
            $realip=$_SERVER['HTTP_X_FORWARDED_FOR'];
        }else if(isset($_SERVER['HTTP_CLIENT_IP'])){
            $realip=$_SERVER['HTTP_CLIENT_IP'];
        }else{
            $realip=$_SERVER['REMOTE_ADDR'];
        }
    }else{
        if(getenv('HTTP_X_FORWARDED_FOR')){
            $realip=getenv('HTTP_X_FORWARDED_FOR');
        }else if(getenv('HTTP_CLIENT_IP')){
            $realip=getenv('HTTP_CLIENT_IP');
        }else{
            $realip=getenv('REMOTE_ADDR');
        }
    }
    return $realip;
}

function reArrayNickname($array){
    if(isset($array) and !empty($array) and count($array)>0){
        $newArray=array();
        foreach($array as $k =>$v){
            if($v['nickname']!=null){
                $v['nickname']= urldecode($v['nickname']);
            }
            $newArray[]=$v;
        }
    }
    return $newArray;
}