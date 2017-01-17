<?php
require "RtmpClient.class.php";

/*
$client = new RtmpClient();

define(_RTMP_DOMAIN_,'chat.5iu.org');
define(_RTMP_DOMAIN_APP_,'Chat_5see');

$roomnumber = "300077";
$userinfo["nickname"] = "88ddqq";
$userinfo["token"] = "b384e9b2bf5c12833742177f2c9b1249a8025d6e627e3a4c898c17cfae29d63d";
$userinfo["usernumber"] = "10211825";
$userinfo["userid"] = "19838";

//退出房间,quit,进入房间,join,
$client->connect(_RTMP_DOMAIN_,(_RTMP_DOMAIN_APP_."/".$roomnumber),1935,array($userinfo["nickname"],$userinfo["token"],$userinfo["usernumber"],$userinfo["userid"],'quit'));
$client->close();
*/


//rtmp_connect(300030,19838,"join");
//连接rmtp服务器
function rtmp_connect($roomnumber,$_userid,$type){
	$userinfo = rtmp_userinfo($_userid);
	
	$client = new RtmpClient();
	//nc.connect(_addr+_roomnumber,_nickname,_token,_usernumber,_userid);
	//$client->connect(_RTMP_DOMAIN_.$roomnumber,$userinfo["nickname"],$userinfo["token"],$userinfo["usernumber"],$userinfo["userid"]);
	//$result = $client->call("myMethod");
	//$result->close();
	
	//退出房间,quit,进入房间,join,
	$client->connect(_RTMP_DOMAIN_,(_RTMP_DOMAIN_APP_."/".$roomnumber),_RTMP_PORT_,array($userinfo["nickname"],$userinfo["token"],$userinfo["usernumber"],$userinfo["userid"],$type));
	$client->close();
}
//查用户信息
function rtmp_userinfo($_userid){
	global $db;
	$userinfo = $db->GetRow("select * from user where userid='$_userid'");
	$userinfo["token"] = logincookie($userinfo);
	return $userinfo;
}


function dumpHex($value)
{
	
	print "\n === DUMP Hex === \n";
	for($i = 0; $i<strlen($value); $i++)
	{
		printf("%02X ",ord($value{$i}));
		if(($i+1) % 16 == 0)
			print "\n";
	}
	print "\n===\n";
}
function dumpBin($value)
{
	print "\n === DUMP Bin === \n";
	for($i = 0; $i<strlen($value); $i++)
	{
		printf("%08b ",ord($value{$i}));
		if(($i+1) % 16 == 0)
			print "\n";
	}
	print "\n===\n";
}