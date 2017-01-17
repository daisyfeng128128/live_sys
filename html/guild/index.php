<?php

include('../../include/header.inc.php');
include($app_path . "include/level.func.php");
$roomnumber = (int)$_GET['roomnumber'];

$user = checklogin();
//tokern校验
$db->Execute("update bu_user_packs set liveDT='" . time() . "' where userId=$user[userId]");
$liveDT = $db->GetRow("select liveDT from bu_user_packs where userId=$user[userId]");
if ($liveDT) {
    $currentToken = base64_encode(md5($user["username"] . $user["password"] . $liveDT["liveDT"]));
    $tokens = $user["username"] . $user["password"] . $liveDT["liveDT"];
}

?>


<html>
<head>
<link rel="stylesheet" href="/public/Glive/css/Glive.css">
<script>
var currentToken = "<?php echo $currentToken;?>";
var currentUserID = "<?php echo $currentUserID;?>";
var currentRoomNumber = "<?php echo $currentRoomNumber;?>";
</script>
<script src="/public/min/jquery-1.12.2.min.js"></script>
<script src="/public/min/angular.min.js"></script>
<script src="/public/Glive/js/Glive.js"></script>
</head>

<body ng-app="live" ng-controller="live">
	<div class="liveBg">
    	
    </div>
</body>
</html>