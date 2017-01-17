<?php

include('../../../../common/function/func/header.inc.php');

$qq_oauth_config = array(
    'scope'=>'get_user_info',
    'oauth_consumer_key'=>"101321404",//APP ID
    'oauth_consumer_secret'=>"97047c25e765fdf012b118efd2d46293",//APP KEY
    'oauth_callback'=>("http://".$_SERVER['HTTP_HOST']."/opensns/qq/reg"),//回调地址
    'oauth_request_token_url'=>"http://openapi.qzone.qq.com/oauth/qzoneoauth_request_token",
    'oauth_authorize_url'=>'http://openapi.qzone.qq.com/oauth/qzoneoauth_authorize',
    'oauth_request_access_token_url'=>'http://openapi.qzone.qq.com/oauth/qzoneoauth_access_token',
    'user_info_url' => 'http://openapi.qzone.qq.com/user/get_user_info',
);
if(isset($_GET['isiphone']) && $_GET['isiphone']=="1"){
			$_SESSION['isiphone']=1;
		}
$action = isset($_GET['action']) ? $_GET['action'] : '';
$rid = isset($_GET['rid']) ? $_GET['rid'] : '';
if($rid){
    $_SESSION['rid'] = $rid ;
}
function qq_login()
{
	global $qq_oauth_config;
    $_SESSION['state'] = md5(uniqid(rand(), TRUE)); //CSRF protection
    $login_url = "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=" 
        . $qq_oauth_config['oauth_consumer_key'] . "&redirect_uri=" . urlencode($qq_oauth_config['oauth_callback'])
        . "&state=" . $_SESSION['state']
        . "&scope=".$qq_oauth_config['scope'];
    header("Location:$login_url");
}



switch($action){
	//用户登录 Step1：请求临时token
	case '':
	case 'login':
		if($_GET['from']=="client"){
			$_SESSION['from']='client';
		}
		if($_GET['from']=="mobile"){
			$_SESSION['from']='mobile';
		}
		if($_GET['from']=="mobile_new"){
			$_SESSION['from']='mobile_new';
		}
		qq_login();
	break;
	//Step4：Qzone引导用户跳转到第三方应用
	case 'regmobile':
	case 'reg':
		include_once("../../../../common/function/func/header.inc.php");
		include_once('../../../../common/function/func/login.func.php');
		include_once('../../../../common/function/func/path_config.php');
		qq_callback();
		
		if($_SESSION['from']=='mobile'){
			echo "<script src='/iumobile/js/StageWebViewBridge.php?20141114c'></script>"."<script>StageWebViewBridge.call('fnCalledFromJS', null, '".$_COOKIE['KDUUS']."');</script>";
		}
		else if($_SESSION['from']=='mobile_new'){
			echo "<script src='/iumobile/js/StageWebViewBridge.php?20141114c'></script>"."<script>StageWebViewBridge.call('fnCalledFromJS', null, '".$_COOKIE['KDUUS']."|$userinfo[userId]|$userinfo[nickname]');</script>";
		}
		else if($_SESSION['from']=='client'){
			echo '<script>self.location="/index.php"</script>';
		}
		else{
            if('' != $_SESSION['rid'] and is_numeric($_SESSION['rid'])){
                echo '<script>window.opener.location.href="/'.$_SESSION["rid"].'";window.close()</script>';
            }
			echo '<script>window.opener.location.href="/";window.close()</script>';
		}
		include_once("../../../../common/function/func/footer.inc.php");
	break;
	
}
include_once("../../../../common/function/function.php");
$ip=cip();

function qq_callback()
{
	global $qq_oauth_config,$db,$userinfo;
    //debug
    //print_r($_REQUEST);
    //print_r($_SESSION);

    if($_REQUEST['state'] == $_SESSION['state']) //csrf
    {
        $token_url = "https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&"
            . "client_id=" . $qq_oauth_config["oauth_consumer_key"]. "&redirect_uri=" . urlencode($qq_oauth_config["oauth_callback"])
            . "&client_secret=" . $qq_oauth_config["oauth_consumer_secret"]. "&code=" . $_REQUEST["code"];

        $response = file_get_contents($token_url);
        if (strpos($response, "callback") !== false)
        {
            $lpos = strpos($response, "(");
            $rpos = strrpos($response, ")");
            $response  = substr($response, $lpos + 1, $rpos - $lpos -1);
            $msg = json_decode($response);
            if (isset($msg->error))
            {
                echo "<h3>error:</h3>" . $msg->error;
                echo "<h3>msg  :</h3>" . $msg->error_description;
                exit;
            }
        }

        $params = array();
        parse_str($response, $params);

        //debug
        //print_r($params);

        //set access token to session
        $_SESSION["access_token"] = $params["access_token"];
		get_openid();
		$qq_user_info = get_user_info();	
		//var_dump($qq_user_info);
		//检查数据库是否存在相同的openid
		if(empty($_SESSION['openid']) || empty($qq_user_info)){
			echo "The state does not match. You may be a victim of CSRF.";
		}else{
			$userinfo=$db->GetRow("select userId from bu_user where snsid='{$_SESSION['openid']}'");
			if($userinfo){
                $users=search_save_user($userinfo['userId']);
                set_login_info($users);
                setcookie("KDUUS",logincookie($users),time()+3600*24,'/',_COOKIE_DOMAIN_);
                $_COOKIE['KDUUS']=logincookie($users);
                
                $db->Execute("update bu_user set loginIp='{$ip}' where userId='{$userinfo['userId']}'");
			}
			else{
                if($qq_user_info['gender'] == "男"){
                    $gender=1;
                }else{
                    $gender=0;
                }
                $avatar=$qq_user_info['figureurl_qq_2']?$qq_user_info['figureurl_qq_2']:$qq_user_info['figureurl_qq_1'];
				$_COOKIE['KDUUS']=register_by_opensns(1,$_SESSION['openid'],$qq_user_info['nickname'],$avatar,$gender,"QQ");
			}
		}
    }
    else 
    {
        echo("The state does not match. You may be a victim of CSRF.");
    }
}
function get_user_info()
{
	global $qq_oauth_config;

    //参数: http://wiki.open.qq.com/wiki/website/get_user_info
    $get_user_info = "https://graph.qq.com/user/get_user_info?"
        . "access_token=" . $_SESSION['access_token']
        . "&oauth_consumer_key=" . $qq_oauth_config["oauth_consumer_key"]
        . "&openid=" . $_SESSION["openid"]
        . "&format=json";

    $info = file_get_contents($get_user_info);
    $arr = json_decode($info, true);
    return $arr;
}
function get_openid()
{
    $graph_url = "https://graph.qq.com/oauth2.0/me?access_token=" 
        . $_SESSION['access_token'];

    $str  = file_get_contents($graph_url);
    if (strpos($str, "callback") !== false)
    {
        $lpos = strpos($str, "(");
        $rpos = strrpos($str, ")");
        $str  = substr($str, $lpos + 1, $rpos - $lpos -1);
    }

    $user = json_decode($str);
    if (isset($user->error))
    {
        echo "<h3>error:</h3>" . $user->error;
        echo "<h3>msg  :</h3>" . $user->error_description;
        exit;
    }

    //debug
    //echo("Hello " . $user->openid);

    //set openid to session
    $_SESSION["openid"] = $user->openid;
}
