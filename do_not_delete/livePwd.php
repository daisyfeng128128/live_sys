<?php
//判断房间是否需要密码
if($showinfo['pwd']!="" && $showinfo['roomnumber']!=$user["usernumber"] && $user["usernumber"]!="10000"){
	if($_COOKIE['roompwd'.$showinfo['roomnumber']]!=$showinfo['pwd']){
		header("Location:/html/isroompwd.php?roomnumber=".$roomnumber);
		include($app_path."include/footer.inc.php");
		exit;
	}
}