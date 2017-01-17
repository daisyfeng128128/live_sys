<?php
exit;
set_time_limit(0);
include('../include/header.inc.php');
init();
//samenum_times(1000);
function init(){
	global $db;
	for($i=1000;$i<=9999;$i++){
		if(samenum_times($i)>=3){
			continue;
		}
		else{
			$startnum=mt_rand(1000,3999);
			$db->Execute("insert into  number_prefix_table (prefix,outnum)values('$i','$startnum')");
		}
    }
}
function samenum_times($num){
	$str=$num."";
	for($i=0;$i<strlen($str);$i++){
		$arr[$str[$i]]++;
	}
	
	rsort($arr,SORT_NUMERIC);
	return $arr[0];
}