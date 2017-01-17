<?php
//http://www.wpy.demo1.com/iumobile/apis/update_andorid_version.php
include('../../include/header.inc.php');
include($app_path.'iumobile/apis/phone_init.php');

include($app_path.'include/footer.inc.php');
echo $global_config_phone_data["android_version"];