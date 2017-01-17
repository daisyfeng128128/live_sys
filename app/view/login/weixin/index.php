<?php
$code = $_GET['code'];
$state = $_GET['state'];
//换成自己的接口信息
$appid = 'wxedb924ffe29990ab';
$appsecret = '7649359358fe7d106b0e3a965ecfea42';
if (empty($code)) $this->error('授权失败');
$token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appid.'&secret='.$appsecret.'&code='.$code.'&grant_type=authorization_code';
$token = json_decode(file_get_contents($token_url));
if (isset($token->errcode)) {
    echo '<h1>错误：</h1>'.$token->errcode;
    echo '<br/><h2>错误信息：</h2>'.$token->errmsg;
    exit;
}
$access_token_url = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid='.$appid.'&grant_type=refresh_token&refresh_token='.$token->refresh_token;
//转成对象
$access_token = json_decode(file_get_contents($access_token_url));
if (isset($access_token->errcode)) {
    echo '<h1>错误：</h1>'.$access_token->errcode;
    echo '<br/><h2>错误信息：</h2>'.$access_token->errmsg;
    exit;
}
// 参数: http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html
$user_info_url = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$access_token->access_token.'&openid='.$access_token->openid.'&lang=zh_CN';

//转成对象
$user_info = json_decode(file_get_contents($user_info_url),true);
if (isset($user_info->errcode)) {
    echo '<h1>错误：</h1>'.$user_info->errcode;
    echo '<br/><h2>错误信息：</h2>'.$user_info->errmsg;
    exit;
}

include_once("common/function/func/header.inc.php");
include_once('common/function/func/login.func.php');

include_once("../../../../common/function/function.php");
$ip=cip();

if(empty($user_info)){
    echo "The state does not match. You may be a victim of CSRF.";
}else{

    $userinfo=$db->GetRow("select userId from bu_user where snsid='{$user_info['openid']}'");
    if($userinfo){
        $users=search_save_user($userinfo['userId']);
        set_login_info($users);
        setcookie("KDUUS",logincookie($users),time()+3600*24,'/',_COOKIE_DOMAIN_);
        $_COOKIE['KDUUS']=logincookie($users);
        $db->Execute("update bu_user set loginIp='{$ip}' where userId='{$userinfo['userId']}'");
        echo '<script>window.opener.location.href="/";window.close()</script>';
    }
    else{
        /*echo $user_info['openid'];
        exit();*/
        function GrabImage($url, $dir='', $filename=''){
            if(empty($url)){
                return false;
            }
            $ext = strrchr($url, '.');
            //为空就当前目录
            if(empty($dir))$dir = dirname(__FILE__).'/upload';

           // $dir = realpath($dir);
            //目录+文件
            $filename = $dir . (empty($filename) ? '/'.time().$ext : '/'.$filename);
            //开始捕捉
           /* ob_start();
            readfile($url);
            $img = ob_get_contents();
            ob_end_clean();*/

            $ch = curl_init ($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
            $img = curl_exec ($ch);
            curl_close ($ch);

            $size = strlen($img);
            $fp2 = fopen($filename , "a");
            if(!$fp2){
                return $dir;
            }
            fwrite($fp2, $img);
            fclose($fp2);
            return $filename;
        }
        $ac = GrabImage($user_info['headimgurl'],dirname(dirname(dirname(__FILE__)))."/upload", $user_info['openid'].".jpg");
         if(!empty($ac)){
             $tmp_img=$_SERVER['HTTP_HOST']."/upload/".$user_info['openid'].".jpg";
         }else{
             $tmp_img =$user_info['headimgurl'];
         }
        $tmp_img1=$_SERVER['HTTP_HOST']."/upload/".$user_info['openid'].".jpg";
        $imghttp = get_headers($user_info['headimgurl'],true);

        $_COOKIE['KDUUS']=register_by_opensns(2,$user_info['openid'],$user_info['nickname'],$tmp_img,$user_info['sex'],"WX");

        echo '<script>window.opener.location.href="/";window.close()</script>';
    }
}

/*
echo '<pre>';
var_dump($user_info);
echo '</pre>';*/

?>