<?php
ini_set("display_errors", 1); // 将程序的错误在页面上直接输出，方便调试
error_reporting(E_ERROR);
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
header("Content-Type: text/html; charset=UTF-8");
include('../include/header.inc.php');
include('../include/path_config.php');
$user=checklogin();
if(!$user){
	echo '<script>alert("请先登录");</script>';
    exit();
}
else{
	$_POST=safe_output($_POST);
    if($_POST['step'] =="infoform"){
        if($_POST['sex']=="" or !$_POST['truename'] or !$_POST['phone'] or !$_POST['qq']){
           echo '<script>alert("所有资料必须完整填写");window.location.href="/sign.php";</script>';
           exit();
        }
        $row=$db->GetRow("select id,usernumber from bu_user_anchors WHERE userId='{$user['userId']}'");
        if($row){
            $db->Execute("update  bu_user_anchors set addtime='".date("Y-m-d H:i:s",time())."',status=1,gender='$_POST[sex]',truename='$_POST[truename]',phone='$_POST[phone]',qq='$_POST[qq]' where userId='{$user['userId']}'");
        }else{
            $db->Execute("update bu_user set city='$_POST[live_province]',city='$_POST[live_city]',gender='$_POST[sex]',mobile='$_POST[phone]',qq='$_POST[qq]' WHERE  userId='{$user['userId']}");
            $db->Execute("insert into bu_user_anchors(createDT,addtime,userId,gender,followeds,basicsalary,roomNumber,truename,phone,qq,status)values('".date("Y-m-d H:i:s",time())."','".date("Y-m-d H:i:s",time())."','{$user['userId']}','$_POST[sex]',0,0,'00000','$_POST[truename]','$_POST[phone]','$_POST[qq]',1)");
        }
        if($db->Affected_Rows()>0){
            echo '<script>parent.location="/sign.php?step=2"</script>';
        }else{
            //  echo "insert into bu_user_anchors(addtime,userId,gender,followeds,basicsalary,roomNumber,truename,phone,qq,status)values('".date("Y-m-d H:i:s",time())."','{$user['userId']}','$_POST[sex]',0,0,'00000','$_POST[truename]','$_POST[phone]','$_POST[qq]',1)";
            echo '<script>parent.location="/sign.php?step=1"</script>';
        }
    }elseif($_POST['step'] =="finance"){

        if(!$_POST['idc_zhengmian'] or !$_POST['idc_fanmian']){
            echo '<script>alert("所有资料必须完整填写");window.location.href="/sign.php?step=2";</script>';
            exit();
        }
        $tmp_zhengmian=_CDNDOMAIN_.$_POST['idc_zhengmian'];
        $tmp_fanmian=_CDNDOMAIN_.$_POST['idc_fanmian'];
        function curl_file_get_contents($durl){
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $durl);
            curl_setopt($ch, CURLOPT_TIMEOUT, 2);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            $r = curl_exec($ch);
            curl_close($ch);
            return $r;
        }
        function uploadImages($imgurl){
            $zimg_upload_url = _IMAGES_DOMAIN_;
            $simg=$imgurl;
            $ch = curl_init();
            $post_data = curl_file_get_contents($simg); // raw_post方式
            $headers = array();
            $headers[] = 'Content-Type:jpg'; // 还有这里！
            curl_setopt($ch, CURLOPT_URL, $zimg_upload_url);
            curl_setopt($ch, CURLOPT_HEADER, false);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
            $info = curl_exec($ch);
            curl_close($ch);
            $json = json_decode($info, true);
            if($json['ret']==true){
                return $json['info']['md5'];
            }
            return false;
        }
        $md5_zhengmian=uploadImages($tmp_zhengmian);
        $md5_fanmian=uploadImages($tmp_fanmian);
        if(!$md5_zhengmian or ! $md5_fanmian){
            echo '<script>alert("上传图片到服务器失败!");window.location.href="/sign.php?step=2";</script>';
            exit();
        }
        if($_POST['banktype']=="" or !$_POST['bankCardAddress']or !$_POST['banknumber']  or !$_POST['idcard']){
            echo '<script>alert("所有资料必须完整填写");window.location.href="/sign.php?step=2";</script>';
            exit();
            //print_r($_POST);
        }
        $owner=$_POST['bankCardAddress'];
        $db->Execute("update bu_user_anchors set addtime='".date("Y-m-d H:i:s",time())."',banktype='$_POST[banktype]',banknumber='$_POST[banknumber]',idcardPosImage='$md5_zhengmian',idcardOthImage='$md5_fanmian',idcard='$_POST[idcard]',bankOwner='$owner' where userId='{$user['userId']}'");

        if($db->Affected_Rows()>0){
            header("location:/sign.php?step=3");
            exit();
        }else{
            $sql_message="update bu_user_anchors set addtime='".date("Y-m-d H:i:s",time())."',banktype='$_POST[banktype]',banknumber='$_POST[banknumber]',idcard='$_POST[idcard]',bankOwner='$owner' where userId='{$user['userId']}'";
            //echo $sql_message;
        }
    }
}
include('../include/footer.inc.php');
?>