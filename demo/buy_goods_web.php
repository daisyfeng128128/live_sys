<?php
/*以下代码，仅供参考*/

    $jsonType = "json";
    $callback = $_REQUEST["callback"];
    if(isset($callback)) {
        $jsonType = "jsonp";
    }

    function outPut($ret) {
        global $jsonType;
        global $callback;
        if( strcmp($jsonType, "json") == 0 ) {
            echo json_encode($ret);
        } else if ( strcmp($jsonType, "jsonp") == 0) {
            echo $callback."(".$ret.")";
        }
    }
    
    function payUrlEncode($string) {
        # (除了 0~9 a~z A~Z !*() 之外其他字符按其ASCII码的十六进制加%进行表示，例如“-”编码为“%2D”) 
        $encodeStr = rawurlencode($string);
        
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
    
if (function_exists('hash_hmac'))      {
	$openid = $_REQUEST["openid"];
	$openkey = $_REQUEST["openkey"];
    $appid = 1105428760;
    $appkey = "RfTuL2cNePiavmI7"."&";   
    $pf = $_REQUEST["pf"];   //形如 "qqgame"
    $pfkey = $_REQUEST["pfkey"];
	$goodsNum = $_REQUEST["goodsNum"];
    
    $ts = time();
    $goodsurl = "http://minigame.qq.com/plat/social_hall/app_frame/demo/img/pic_02.jpg";
    
    //1.支付所需输入参数（对value值按照开平要求进行编码）
    $payParam = array();
    $payParam["appid"] = $appid;
    $payParam["goodsmeta"] = "钻石*测试";
    $payParam["goodsurl"] = $goodsurl;
    $payParam["openid"] = $openid;
    $payParam["openkey"] = $openkey;
    $payParam["payitem"] = "1*2*".$goodsNum;
    $payParam["pf"] = $pf;
    $payParam["pfkey"] = $pfkey;
    $payParam["ts"] = $ts;
    $payParam["zoneid"] = "0";
    
    #2.字典升序排列
    ksort($payParam);
    
    $payParamStr = "";
    $paramArr = array();
    foreach ($payParam as $key => $value) {
        $paramArr[] = $key."=".$value;
    }
    $payParamStr = join('&', $paramArr);
    
    //3.按OpenAPI V3.0的签名生成说明，构造源串(所有参数练成一个字符串，对字符串进行整体编码)
    $payapi = "/v3/pay/buy_goods";
	$encodeSigStr = "GET&".rawurlencode($payapi)."&".rawurlencode($payParamStr);

    //4.计算签名
	$sig = base64_encode(hash_hmac("sha1", $encodeSigStr, $appkey, true));

    
    //5.发送请求时所有参数都要进行URL编码（每个参数的value分别进行编码）
    $urlencodeParamStr = "";
    $urlencodeParamArr = array();
    foreach ($payParam as $key => $value) {
        $urlencodeParamArr[] = $key."=".rawurlencode($value);
    }
    $urlencodeParamStr = join('&', $urlencodeParamArr);
    $urlencodeParamStr .= "&sig=".rawurlencode($sig);
    
    //正式环境的host
    // $host = "https://openapi.tencentyun.com";
    //测试环境的host
    $host = "http://119.147.19.43";
    
    $url = $host.$payapi."?".$urlencodeParamStr;
    
	exec('curl "'.$url.'"', $retArr, $retVal);

	// $ch = curl_init();
	// curl_setopt($ch, CURLOPT_URL, $url);
	// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	// curl_setopt($ch, CURLOPT_HEADER, 0);
	// curl_setopt($ch, CURLOPT_COOKIE, "session_id=openid;session_type=openkey;org_loc=%2Fv3%2Fr%2Fmpay%2Fbuy_goods_m");
	// $output = curl_exec($ch);
	// curl_close($ch);
	// print_r($output);
	
	outPut($retArr[0]);
	
}else{
    outPut(array("ret"=>1, "msg"=>"function hash_hmac is null"));
}
?>