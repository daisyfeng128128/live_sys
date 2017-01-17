<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/1/4
 * Time: 19:54
 */
header("Content-Type: text/html; charset=UTF-8");
$current_page="person";

include("../include/header.inc.php");
include_once($app_path."include/level.func.php");
include_once('../include/login.func.php');
$user=checklogin();

if(!$user){
    include("../include/footer.inc.php");
    header("location:index.php");
    exit();
}
$_GET=safe_output($_GET);
$_POST=safe_output($_POST);
 if($_REQUEST["action"] =="editName"){
     $nickname = $_REQUEST['nickname'];
     $r=check_nickname($nickname);
     if($r!="yes"){
         echo json_encode(array("resultStatus"=>100,"errorMessage"=>$r));
         exit();
     }else{
         $snic=$nickname;
         $nickname = urlencode($nickname);
         $db->Execute("update bu_user set nickname='{$nickname}' where userId='{$user['userId']}'");

         $userinfo=search_save_user($user['userId']);
         set_login_info($userinfo);
         echo json_encode(array("resultStatus"=>200,"errorMessage"=>"用户名Ok"));
         exit();
     }

 }elseif($_REQUEST["action"] =="base"){

     if($_POST['year']!="" && $_POST['month']!="" && $_POST['day']!=""){
         $birthday=(int)$_POST['year']."-".(int)$_POST['month']."-".(int)$_POST['day'];
     }
     else{
         $birthday="0000-00-00";
     }
     $gender=$_POST['gender']?$_POST['gender']:0;
     $snic=$nickname;
     $nickname=urlencode($_POST['aliasname']);
     if(check_nickname($nickname) != "yes"){
         header('Content-Type:application/json; charset=utf-8');
         echo json_encode(array("resultStatus"=>100,"errorMessage"=>"昵称非法"));
         exit();
     }
     $res=$db->Execute("update bu_user set nickname='{$nickname}', birthday='$birthday',gender=$gender,province='{$_POST['province']}',city='{$_POST['city']}' where userId=$user[userId]");
     if($res){
         header('Content-Type:application/json; charset=utf-8');
         echo json_encode(array("resultStatus"=>200,"errorMessage"=>"修改成功","post"=>"update bu_user set nickname='{$nickname}', birthday='$birthday',gender=$gender,province='{$_POST['province']}',city='{$_POST['city']}' where userId='{$user['userId']}'"));
         $userinfo=search_save_user($user['userId']);
         set_login_info($userinfo);
         exit();
     }else{
         header('Content-Type:application/json; charset=utf-8');
         echo json_encode(array("resultStatus"=>100,"errorMessage"=>"信息修改失败"));
         exit();
     }
 }

if($_REQUEST["action"] =="cancelfav"){
    $roomNumber=(int)$_GET['roomNumber'];
    $db->Execute("update  bu_user_studio set isFollow =0 where userId='{$user['userId']}' and roomNumber='$roomNumber'");
    echo json_encode(array("resultStatus"=>"update  bu_user_studio set isFollow =0 where userId='{$user['userId']}' and roomNumber='$roomNumber'","errorMessage"=>"取消成功"));
    exit();
}

if($_REQUEST["action"] =="pass"){
    if(trim($_POST['current_password'])=='' || trim($_POST['new_password'])=='' || trim($_POST['new_repassword'])==''){
        echo json_encode(array("resultStatus"=>100,"errorMessage"=>"请填写当前密码和新密码"));
        exit();
    }
    if($db->GetOne("select password from bu_user where userId='{$user['userId']}'")!=password_deal($_POST['current_password'])){
        echo json_encode(array("resultStatus"=>100,"errorMessage"=>"您输入的当前密码不正确"));
        exit();
    }
    if(strlen($_POST['new_password'])<6 || strlen($_POST['new_password'])>30) {
        echo json_encode(array("resultStatus" => 100, "errorMessage" => "密码长度6到30"));
        exit();
    }
    if($_POST['new_password']!=$_POST['new_repassword']){
        echo json_encode(array("resultStatus"=>100,"errorMessage"=>"您输入的两次密码不一致"));
        exit();
    }

    $db->Execute("update bu_user set password='".password_deal($_POST['new_repassword'])."' where userId='{$user['userId']}'");
    echo json_encode(array("resultStatus"=>200,"errorMessage"=>"yes"));
    exit();
}



