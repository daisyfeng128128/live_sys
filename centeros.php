<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/12/30
 * Time: 10:17
 */

header("Content-Type: text/html; charset=UTF-8");
$current_page = "person";
if (isset($_GET['ptype']) && $_GET['ptype'] == 'pay') {
    $current_page = "pay";
}
include("include/header.inc.php");
include_once($app_path . "include/level.func.php");
include_once('./include/login.func.php');
$user = checklogin();
if (!$user) {
    include("include/footer.inc.php");
    header("location:index.php");
    exit();
}

$userinfo=search_save_user($user['userId']);
set_login_info($userinfo);
$user=$userinfo;

$_GET = safe_output($_GET);
$_POST = safe_output($_POST);
//notice state
global $db;
$states = $db->Execute("select state from bu_station_message where userId = {$user['userId']} and (state = 0 or state is null)");
if ($states) {
    $stateNum = $states->RecordCount();
}else{
    $stateNum = 0;
}
//var_dump($states);exit;
//over
    ?>
<!DOCTYPE html>
<html  xmlns:ng="http://angularjs.org" id="ng-app" class="ng-app:personalCenter" ng-app="personalCenter">
<head lang="en">
<meta charset="UTF-8">
<title>个人中心－蝌蚪TV</title>
<link data-fixed="true" href="/templates/centeros.css" rel="stylesheet">
<link href="/static_data/images_css/icons.css" rel="stylesheet">

<script src="/js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo $page_var['cdn_domain']?>/js/login.js?20150908"></script>
<script type="text/javascript" src="<?php echo $page_var['cdn_domain']?>/skin/ym/js/centeros.js?20150908"></script>
<script type="text/javascript" src="<?php echo $page_var['cdn_domain']?>/js/angular/angular.min.js"></script>
<script type="text/javascript" src="<?php echo $page_var['cdn_domain']?>/public/index/js/json2.js"></script>
<script type="text/javascript" src="<?php echo $page_var['cdn_domain']?>/js/angular/center.js"></script>
<script type="text/javascript" src="<?php echo $page_var['cdn_domain']?>/public/min/html5shiv.min.js"></script>
<script type="text/javascript" src="<?php echo $page_var['cdn_domain']?>/public/min/respond.min.js"></script>

</head>
<body>
	<?php
    include_once('tpl_header.php');

    $tmp_b = explode('-', $user['birthday']);
    if (is_array($tmp_b)) {
    $birthday_year = $tmp_b[0];
    $birthday_month = $tmp_b[1];
    $birthday_day = $tmp_b[2];
}
if ($user['ender'] == '') {

} else if ($user['gender'] == 0) {
    $femalechecked = 'checked';
} else {
    $malechecked = 'checked';
}
switch ($_GET['ptype']) {
    case "index";
        include('include/personal_tpl/m_index.php');
        break;
    case "history";
        include('include/personal_tpl/m_care.php');
        break;
    case "info";
        include('include/personal_tpl/m_self.php');
        break;
    case "mpass";
        include('include/personal_tpl/m_pass.php');
        break;
    case "mphone";
        include('include/personal_tpl/m_phone.php');
        break;
    case "mportrait";
        include('include/personal_tpl/m_portrait.php');
        break;
    case "recharge";
        include('include/personal_tpl/m_recharge.php');
        break;
    case "record";
        include('include/personal_tpl/m_record.php');
        break;
    case "recive";
        include('include/personal_tpl/m_recive.php');
        break;
    case "notice";
        include('include/personal_tpl/m_notice.php');
        break;
    case "treasure";
        include('include/personal_tpl/m_treasure.php');
        break;
    default :
        include('include/personal_tpl/m_index.php');
        break;
}


