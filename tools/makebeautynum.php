<?php
exit;
set_time_limit(0);
include('../include/header.inc.php');
for($i=10000;$i<99999999;$i++){
	$y=strlen($i);
	$c=count_num($i);
	$d=count_num_special($i,6);
	$e=count_num_special($i,8);
	$price=0;
	if(($c==1 && $y==$d) || ($c==1 && $y==$e)){
		$price=10000*pow(0.6,($y-5));
	}
	else if($c==1){
		
		$price=5000*pow(0.6,($y-5));
	}
	else if(($d+$e)==$y){
		$price=5000*pow(0.6,($y-5));
	}
	else if($c==2 && (($d+$e)*2)>=$y){
		$price=1000*pow(0.6,($y-5));
	}
	else if($c==2){
		$price=800*pow(0.6,($y-5));
	}
	else if(is_equaladd($i)){
		$price=500*pow(0.6,($y-5));
	}
	else if(($y<6 && is_endof($i,"88",2)) || ($y<6 && is_endof($i,"66",2))){
		$price=200*pow(0.6,($y-5));
	}
	else if(($y<9 && is_endof($i,"88",3)) || ($y<9 && is_endof($i,"66",3))){
		$price=200*pow(0.6,($y-6));
	}
	else if(is_dc($i)){
		$price=200*pow(0.6,($y-5));
	}
	//var_dump($price);
	if($price!=0){
		$db->Execute("insert into beauty_number(number,price)values('$i','$price')");
	}
}
function count_num($num){
	$result=array();
	for($i=0;$i<strlen($num);$i++){
		$result[substr($num,$i,1)]++;
	}
	return count($result);
}
function count_num_special($num,$s){
	$result=array();
	for($i=0;$i<strlen($num);$i++){
		$result[substr($num,$i,1)]++;
	}
	return (int)$result[$s];
}
function is_endof($num,$end,$length){
	if(substr($num,0-$length,$length)==$end)
		return true;
	return false;
}
function is_equaladd($num){
	$first=-1;
	if(substr($num,0,1)>substr($num,1,1)){
		$z=-1;
	}
	else{
		$z=1;
	}
	for($i=0;$i<strlen($num);$i++){
		if($first==-1){
			$first=substr($num,$i,1);
		}
		else{
			$th=substr($num,$i,1);
			if(($th-$first)!=$z){
				return false;
			}
			$first=$th;
		}
	}
	return true;
}
function is_dc($num){
	$half_num=floor($num/2);
	if(substr($num,0,$half_num)==substr($num,(0-$half_num),$half_num)){
		return true;
	}
	return false;
}