<?php
/*以下代码，仅供参考*/


#demo的appid是1105428760
# appkey： RfTuL2cNePiavmI7 ，做签名的时候， 是 appkey + & 为密钥的
$appid = 1105729630;
$appkey = "KEYGDaXiC1F2zf7qOYG"."&";

#输出标准的json
$result = array("ret"=>0, "msg"=>"OK");

//1. 获取输入参数和sig
$orgSig = "";
$payParam = array();
foreach ($_GET as $key => $value) {
    if( $key == "sig" ) {
        $orgSig = $value;
        continue;
    }
    $payParam[$key] = $value;
}
ksort($payParam);
$curTime = time();

#2. 签名校验，合法后才能走发货逻辑
$r = CheckSig($result);
if ($r != 0){
    # 签名校验错误
	$result['ret'] = $r;
} else {
    # 3. 发货逻辑 
    deliver($result);
}
#4.输出发货结果
echo json_encode($result);

//5.发货成功的话，通知确认成功
$cmdParam = " ".$payParam["openid"]." ".$payParam["payitem"]." ".$payParam["token"]." ".$payParam["billno"]." ".$payParam["amt"]." ".$payParam["payamt_coins"]." ".$payParam["zoneid"]." ".$result["ret"]." ";

$cmd = "php -q ./confirm_delivery_web.php ".$cmdParam." > /dev/null &";
exec($cmd);

function myUrlEncode($string) {
	# (除了 0~9 a~z A~Z !*() 之外其他字符按其ASCII码的十六进制加%进行表示，例如“-”编码为“%2D”) 
	$encodeStr = urlencode($string);
	$encodeStr = str_replace("%2A", "*", $encodeStr);
	$encodeStr = str_replace("%21", "!", $encodeStr);
	$encodeStr = str_replace("%28", "(", $encodeStr);
	$encodeStr = str_replace("%29", ")", $encodeStr);

	$encodeStr = str_replace('+','%20',$encodeStr); 
	$encodeStr = str_replace('_','%5F',$encodeStr); 
	$encodeStr = str_replace('.','%2E',$encodeStr); 
	$encodeStr = str_replace('-','%2D',$encodeStr); 

	return $encodeStr;
}

function CheckSig(&$result)
{
	if (function_exists('hash_hmac')){
        global $orgSig;
        global $payParam;
        global $curTime;
        global $appkey;
        if( $orgSig == ""){
            $result['msg'] = "sig error";
            return 4;
        }
        
		$sigStr = "";
		$sigArr = array();
		foreach ($payParam as $key => $value) {
			if ($key == "token" && $value == ""){
				$result['msg'] = "token unexist";
				return 3;
			}
			if ($key == "ts"){
				if ($curTime - $value > 900){
					# 注意开发者的机器时间与计费服务器的时间相差不能超过15分钟
					$result['msg'] = "token overdue";
					return 2;
				}
			}
			$sigArr[] = $key."=".myUrlEncode($value);
		}
		$sigStr = join('&', $sigArr);

        $deliverapi = "/delivery_web.php";
		$encodeSigStr = "GET&".rawurlencode($deliverapi)."&".rawurlencode($sigStr);
        
		$sig = base64_encode(hash_hmac("sha1", $encodeSigStr, $appkey, true));
		if ($sig != $orgSig){
			# 调试使用，不要在页面上面展示这些信息
			$result['msg'] = "sig not match:".$sig." orgsig:".$orgSig;
			return 1;
		}
	}else{
        $result['msg'] = "function hash_hmac is null";
		return -1;
	}	
	return 0;
}

function deliver(&$result) {
    # 最后输出的json结构必须要是{"ret":0,"msg":"OK"}，发生错误的时候，ret为错误码
    #0: 成功
    #1: 系统繁忙
    #2: token已过期
    #3: token不存在
    #4: 请求参数错误：（这里填写错误的具体参数）
    
    #请游戏自行实现发货逻辑
    
    return 0;
}

?>