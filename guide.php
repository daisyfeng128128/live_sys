<?php
include('include/header.inc.php');
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
<html xmlns:ng="http://angularjs.org" id="liveApp" class="ng-app:liveApp" ng-app="liveApp">
<head>
    <meta charset="utf-8">
    <meta
        http-equiv="X-UA-Compatible" content="IE=9" >
    <link rel="stylesheet" type="text/css" href="/css/buttons.css">
    <link rel="stylesheet" href="/public/Glive/css/Glive.css">
    <link href="/static_data/images_css/icons.css" rel="stylesheet">
    <script>
        var currentToken = "<?php echo $currentToken;?>";
        var currentUserID = "<?php echo $user['userId'];?>";
        var currentRoomNumber = "<?php echo $roomnumber;?>";
    </script>
</head>

<body>

<div class="liveBg">
    <div class="pic_1"></div>
    <div class="pic_2"></div>
    <div class="pic_3"></div>
    <div class="pic_4"></div>
    <div class="pic_5"></div>
    <div class="pic_6"></div>
    <div class="pic_7"></div>
    <div class="pic_8"></div>

<div class="video-area">

    <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="player" name="player" align="middle">
        <param name="movie" value="/js/sea-modules/swf/player.swf?c7276516fb279c29d1a5ccb8c5098556">
        <param name="flashvars" value="token=&amp;chat=1&amp;roomnumber=<?php echo $roomnumber;?>&amp;fn=<?php echo $roomnumber;?>&amp;mtadd=/rest/site/flashs.mt">
        <param name="quality" value="high">
        <param name="wmode" value="transparent">
        <param name="allowScriptAccess" value="always">
        <param name="allowfullscreen" value="true"><!--[if !IE]>-->
        <object type="application/x-shockwave-flash" data="/js/sea-modules/swf/player.swf?c7276516fb279c29d1a5ccb8c5098556" id="player" name="player">
            <param name="movie" value="/js/sea-modules/swf/player.swf?c7276516fb279c29d1a5ccb8c5098556">
            <param name="flashvars" value="token=&amp;chat=1&amp;roomnumber=<?php echo $roomnumber;?>&amp;fn=<?php echo $roomnumber;?>&amp;mtadd=/rest/site/flashs.mt">
            <param name="quality" value="high">
            <param name="wmode" value="transparent">
            <param name="allowScriptAccess" value="always">
            <param name="allowfullscreen" value="true"><!--<![endif]-->
            <a href="http://www.adobe.com/go/getflash">
                <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player">
            </a><!--[if !IE]>-->
        </object><!--<![endif]-->
    </object>
</div>
    <div class="no-live">
        <div class="no-live-text">主播已下播</div>
        <div class="no-live-next">下次开播时间：<span class="no-live-week">星期五</span>&nbsp;&nbsp;&nbsp;<span
                class="no-live-time">19:20</span></div>
        <ul id="bglis">
        </ul>
    </div>
    <div class="live-info" ng-controller="live">
        <div class="self-photo">
            <img class="showerImg" ng-src="<?php echo _IMAGES_DOMAIN_;?>/{{anchorInfo.avatar}}" onerror="javascript:this.src='http://img.kedo.tv/46a920d47a9c287e627693554180598a'">
        </div>
        <div class="self-name">
            <div class="s-name">
                <span ng-if="anchorInfo.nickname"><span ng-cloak class="anchor-info-names" ng-bind="anchorInfo.nickname|decode"></span></span>
                <span class="anchor-level sprite {{anchorInfo.il}}"></span>
            </div>
            <div class="s-else"><span class="s-position"> </span><span class="s-people" ng-bind="anchorInfo.numbers"></span></div>
        </div>
        <div class="self-level">
            <div class="level-bar-area">
                <div class="lvout"><div class="lvinner" style="width: {{anchorInfo.nc}}%;"></div></div>
                <span class="anchor-level-next anchor-level sprite {{anchorInfo.inl}}"></span>
                <div class="lhaicha" ng-cloak>升级还差<span ng-if="anchorInfo.dc"><span ng-bind="anchorInfo.dc|decode"></span></span>经验值</div>
            </div>
            <div class="level-margin-area">
                <span class="l-fire" ng-bind="anchorInfo.heatNumber"></span><span class="l-xin" ng-bind="anchorInfo.followNumber"></span>
            </div>
        </div>
        <div class="self-care" id="addFav2" style="display: block">
            <a id="isfollow1" href="javascript:;" class="button button-highlight button-rounded followme" title="关注TA" style="display: none;">关注</a>
            <a id="isfollow0" href="javascript:;" title="已关注" class="button button-rounded button-tiny followout" style="">取消关注</a>
        </div>
    </div>
</div>

<script src="/public/min/jquery-1.12.2.min.js"></script>
<script src="/public/index/js/json2.js"></script>
<script src="/public/min/angular-1.2.min.js"></script>
<script src="/public/Glive/js/Glive.js"></script>
</body>
</html>