<?php
    include("include/header.inc.php");
    include_once('./include/login.func.php');
    $user = checklogin();
    if(!$user){
        header("location:/");
    }
    global $message;
    $anchors=$db->GetRow("select roomNumber,pass from bu_user_anchors WHERE userId='{$user['userid']}' and status =1");
    $step=$_GET['step']?$_GET['step']:1;
    $steps=array(
        1=>array(
            sel
        ),
    );
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>入驻蝌蚪</title>
    <script src="/js/sea.js"></script>
    <script>
        seajs.config({
            base: "/js/ajax",
            alias: {
                "jquery": "jquery.min.js"
            }
        });
        seajs.use(['jquery'],function($){});
    </script>
    <script type="text/javascript" src="/js/ajax/jquery.min.js"></script>
    <script type="text/javascript" src="/js/check_num.js"></script>
    <script type="text/javascript" src="/js/login.js?20150908"></script>
    <script src="/skin/desert/js/jquery.Jcrop.min.js"></script>
    <script src="/skin/desert/js/jquery.uploadify.min.js"></script>
</head>
<body style="position: relative">
<div  class="imgmask"></div>
<div id="show_img">
    <div class="view_images"><img src="" alt=""/></div>
</div>
<?php include_once('tpl_header.php'); ?>
<div class="wrapper">
    <div class="progress clearFix">
        <span class="fl pro  <?php if($step==1){ echo "sel";}?>">基本资料</span>
        <span class="fl arrow"></span>
        <span class="fl pro <?php if($step==2){ echo "sel";}?>">财务信息</span>
        <span class="fl arrow"></span>
        <span class="fl pro <?php if($step==3){ echo "sel";}?>">认证照片</span>
        <span class="fl arrow"></span>
        <span class="fl pro <?php if($step==4){ echo "sel";}?>">提交审核</span>
    </div>
</div>
<div class="details">
    <div class="wrapper">
		<?php include_once("include/sign/tpl_sign".$step.".php"); ?>
	</div>
</div>
<?php include('tpl_footer.php'); ?>
</body>
</html>








