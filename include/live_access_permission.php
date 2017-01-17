<?php
//有哪些权限
$access_type = array(
	'switchchat'=>array("value"=>"1","text"=>"禁言/解禁"),//00000001
	'kicout'=>array("value"=>"2","text"=>"踢出1小时"),//00000010
	'blockip'=>array("value"=>"4","text"=>"封IP"),//00000100
	'queryip'=>array("value"=>"8","text"=>"查询IP"),//00001000
	'setadmin'=>array("value"=>"16","text"=>"设为管理"),//00010000
	'shoufei'=>array("value"=>"32","text"=>"进收费房间"),//00100000
	'facegaoji'=>array("value"=>"64","text"=>"直播间高级表情"),//01000000
);
//彩条和发言的时间间隔
$access_type_time = array(
	//'fayan'=>array("value"=>"0","text"=>"发言间隔(秒)"),
	//'caitiao'=>array("value"=>"0","text"=>"彩条间隔(秒)"),
);