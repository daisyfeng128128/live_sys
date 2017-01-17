<?php
$ch=curl_init();
curl_setopt($ch,CURLOPT_URL,"https://sms-api.luosimao.com/v1/send.json");
curl_setopt($ch,CURLOPT_HTTP_VERSION,CURL_HTTP_VERSION_1_0);
curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,30);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch,CURLOPT_HEADER,false);
curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,true);
curl_setopt($ch,CURLOPT_SSLVERSION,3);
curl_setopt($ch,CURLOPT_HTTPAUTH,CURLAUTH_BASIC);
curl_setopt($ch,CURLOPT_USERPWD,'api:key-d7c88ae9ef8480e1e5efce2fcc59971d');
curl_setopt($ch,CURLOPT_POST,true);
curl_setopt($ch,CURLOPT_POSTFIELDS,array('mobile' => $mobileno,'message' => $smstxt."【上海视友文化传播有限公司】"));
$res=curl_exec($ch);
curl_close( $ch );
//$res  = curl_error( $ch );
?>
