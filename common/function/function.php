<?php
//如自己需要额外建立公共函数方法文件，请保持将common/function作为根目录；并将自己建的文件引入include.list.php

//echo '5654635163';

function curl_post_data($url,$post){
	$options = array(
			CURLOPT_RETURNTRANSFER=>true,
			CURLOPT_HEADER=>false,
			CURLOPT_POST=>true,
			CURLOPT_POSTFIELDS=>$post,
	);
	$ch = curl_init($url);
	curl_setopt_array($ch,$options);
	$result = curl_exec($ch);
	curl_close($ch);
	return $result;
}

function jsonp_encode($arr){
	$str=json_encode($arr);
	if($_GET['_callback']){
		$str=$_GET['_callback'] . '('.$str. ')';
	}
	return $str;
}

//获取客户端IP

function ip() {
	$ip = $_SERVER['REMOTE_ADDR'];
	if (isset($_SERVER['HTTP_CLIENT_IP']) && preg_match('/^([0-9]{1,3}\.){3}[0-9]{1,3}$/', $_SERVER['HTTP_CLIENT_IP'])) {
		$ip = $_SERVER['HTTP_CLIENT_IP'];
	} elseif(isset($_SERVER['HTTP_X_FORWARDED_FOR']) AND preg_match_all('#\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}#s', $_SERVER['HTTP_X_FORWARDED_FOR'], $matches)) {
		foreach ($matches[0] AS $xip) {
			if (!preg_match('#^(10|172\.16|192\.168)\.#', $xip)) {
				$ip = $xip;
				break;
			}
		}
	}
	return $ip;
}
/**
 * 获取客户端IP地址
 * @return string
 */
function cip() {
	if(getenv('HTTP_CLIENT_IP')){
		$client_ip = getenv('HTTP_CLIENT_IP');
	} elseif(getenv('HTTP_X_FORWARDED_FOR')) {
		$client_ip = getenv('HTTP_X_FORWARDED_FOR');
	} elseif(getenv('REMOTE_ADDR')) {
		$client_ip = getenv('REMOTE_ADDR');
	} else {
		$client_ip = $_SERVER['REMOTE_ADDR'];
	}
	return $client_ip;
}
/**
 * 获取服务器端IP地址
 * @return string
 */
function sip() {
	if (isset($_SERVER)) {
		if($_SERVER['SERVER_ADDR']) {
			$server_ip = $_SERVER['SERVER_ADDR'];
		} else {
			$server_ip = $_SERVER['LOCAL_ADDR'];
		}
	} else {
		$server_ip = getenv('SERVER_ADDR');
	}
	return $server_ip;
}

?>