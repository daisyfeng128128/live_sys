<?php
/*以下代码，仅供参考*/


#demo的appid是1105428760
# appkey： RfTuL2cNePiavmI7 ，做签名的时候， 是 appkey + & 为密钥的
$appid = 1105729630;
$appkey = "KEYGDaXiC1F2zf7qOYG"."&";

//1.支付所需输入参数（对value值按照开平要求进行编码）
$comfirmParam = array();
$comfirmParam["appid"] = $appid;
$comfirmParam["openid"] = $argv[1];
$comfirmParam["pf"] = "qqgame";

$comfirmParam["payitem"] = $argv[2];
$comfirmParam["token_id"] = $argv[3];
$comfirmParam["billno"] = $argv[4];
$comfirmParam["amt"] = $argv[5];
$comfirmParam["payamt_coins"] = $argv[6];
$comfirmParam["zoneid"] = $argv[7];

$comfirmParam["ts"] = time();
$comfirmParam["provide_errno"] = $argv[8];
    
#2.字典升序排列
ksort($comfirmParam);

$confirmParamStr = "";
$paramArr = array();
foreach ($comfirmParam as $key => $value) {
    $paramArr[] = $key."=".$value;
}
$confirmParamStr = join('&', $paramArr);

//3.按OpenAPI V3.0的签名生成说明，构造源串(所有参数练成一个字符串，对字符串进行整体编码)
$confirmapi = "/v3/pay/confirm_delivery";
$encodeSigStr = "GET&".rawurlencode($confirmapi)."&".rawurlencode($confirmParamStr);

//4.计算签名
$sig = base64_encode(hash_hmac("sha1", $encodeSigStr, $appkey, true));


//5.发送请求时所有参数都要进行URL编码（每个参数的value分别进行编码）
$urlencodeParamStr = "";
$urlencodeParamArr = array();
foreach ($comfirmParam as $key => $value) {
    $urlencodeParamArr[] = $key."=".rawurlencode($value);
}
$urlencodeParamStr = join('&', $urlencodeParamArr);
$urlencodeParamStr .= "&sig=".rawurlencode($sig);

//正式环境的host
// $host = "https://openapi.tencentyun.com";
//测试环境的host
$host = "http://119.147.19.43";

$url = $host.$confirmapi."?".$urlencodeParamStr;

exec('curl "'.$url.'"', $retArr, $retVal);
    
echo json_encode($retArr[0]);

?>