<?php

/**
 * OpenAPI V3 SDK 示例代码，适用于大部分OpenAPI。如果是上传文件类OpenAPI，请参考本SDK包中的“Test_UploadFile.php”文件中的示例代码。
 *
 * @version 3.0.4
 * @author open.qq.com
 * @copyright © 2012, Tencent Corporation. All rights reserved.
 * @History:
 *               3.0.4 | coolinchen | 2012-09-07 10:20:12 | initialization
 */


require_once 'OpenApiV3.php';

// 应用基本信息
$appid = '1105729630';
$appkey ='GDaXiC1F2zf7qOYG';

// OpenAPI的服务器IP 
// 最新的API服务器地址请参考wiki文档: http://wiki.open.qq.com/wiki/API3.0%E6%96%87%E6%A1%A3 
$server_name = '119.147.19.43';
//http://www.kedo.tv/index_qqgame.php?access_token=F78FAFE6DE11509A11F4F5F6A7662186&param=&openid=DCC716C16B61639C5FB674B96A5ED7BF&openkey=F78FAFE6DE11509A11F4F5F6A7662186&pf=qqgame&pfkey=CCFDE18FE156822665C660B940FA8117

// 用户的OpenID/OpenKey
$openid = 'DCC716C16B61639C5FB674B96A5ED7BF';
$openkey = 'F78FAFE6DE11509A11F4F5F6A7662186';
// 所要访问的平台, pf的其他取值参考wiki文档: http://wiki.open.qq.com/wiki/API3.0%E6%96%87%E6%A1%A3 
$pf = "qqgame";

$sdk = new OpenApiV3($appid, $appkey);
$sdk->setServerName($server_name);

$ret = get_user_info($sdk, $openid, $openkey, $pf);
print_r("===========================\n");
print_r($ret);

/**
 * 获取好友资料
 *
 * @param object $sdk OpenApiV3 Object
 * @param string $openid openid
 * @param string $openkey openkey
 * @param string $pf 平台
 * @return array 好友资料数组
 */
function get_user_info($sdk, $openid, $openkey, $pf)
{
	$params = array(
		'openid' => $openid,
		'openkey' => $openkey,
        'pf' => $pf,
        'flag' => 1,
        'format'=>'json',
        'charset'=>'utf-8'
	);
	
	$script_name = '/v3/user/get_info';
	return $sdk->api($script_name, $params,'post');
	
	
}

// end of script
