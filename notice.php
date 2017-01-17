<?php 
	include_once("include/header.inc.php");
	$userId = $_POST['userId'];
	$retData = array();
	$retData['state'] = 0;
	$stateNum = getNoticeState($userId);
	if ($stateNum>0) {
		$retData['state'] = 1;
	}
	$retData['userId'] = $userId;
	echo json_encode($retData);

	function getNoticeState($userId){
		global $db;
		//$userId = 6856;
		$userinfo = $db->Execute("select state from bu_station_message where userId = {$userId} and (state  = 0 or state is null)");
		if ($userinfo) {
			return $userinfo->RecordCount();
		}else{
			return 0;
		}
		
	}
 ?>