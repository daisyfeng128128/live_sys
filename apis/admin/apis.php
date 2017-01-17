<?php
header("Content-type:text/html;charset=utf-8");
include('../../include/header.inc.php');
include('../../include/page.inc.php');
//$db->debug = true;
switch($_REQUEST['action']){
	case 'agentinfo'://取得代理的信息，jsonp请求的
		$userid=(int)$_REQUEST['userid'];
		$info=$db->GetRow("SELECT * FROM `agentsalary` where userid=$userid");
		$info["RMB_XNB"]=RMB_XNB;
		$callback = $_GET['callback'];
		echo $callback.'('.json_encode($info).')';
	break;
}
include('../../include/footer.inc.php');