<?php
/*
从空间第1次进入时,下面是传入的参数
/?openid=B357520DA66582E8CAB9D7F832D368B3&openkey=7EB8E2D701F63638E4B373702D39280F&pf=qzone&pfkey=4b3840337ceed02da45c63f5bc759ddds
{"qz_height":"2000","qz_width":"950","openid":"CE701CB6314F220BE7305831B3B8207F","openkey":"22ECFEA8CBAA6F2E3AD24C6B9ED3226C","pf":"qzone","pfkey":"5030571b6c7bc1bd2b408e33222b4fe5","qz_ver":"8","appcanvas":"1","qz_style":"1","params":"","app_custom":"","app_isfirst":"1"} 1002231500
*/


include_once $app_path.'include/QQZone/OpenApiV3.php';
$appid = '1105466404';
$appkey ='G9UJH77yWNoGcjKT';

//正式环境下使用域名,openapi.tencentyun.com,测试环境下使用IP,119.147.19.43
$server_name = 'openapi.tencentyun.com';
$openid = $_GET['openid'];
$openkey = $_GET['openkey'];
$pfkey=$_GET['pfkey'];
$pf = $_GET['pf'];
if($openid!=""){
    setcookie('openid',$openid,time()+3600*2,"/",_COOKIE_DOMAIN_);
    setcookie('openkey',$openkey,time()+3600*2,"/",_COOKIE_DOMAIN_);
    setcookie('pfkey',$pfkey,time()+3600*2,"/",_COOKIE_DOMAIN_);
    setcookie('pf',$pf,time()+3600*2,"/",_COOKIE_DOMAIN_);
    $page_var['pf']=$pf;
}
if($openid==""){
    $openid=$_COOKIE['openid'];
    $openkey=$_COOKIE['openkey'];
    $pfkey=$_COOKIE['pfkey'];
    $pf = $_COOKIE['pf'];
}

if($openid==""){
    include($app_path.'include/footer.inc.php');
    header(('Location:http://rc.qzone.qq.com/'.$page_var['appid']));
    exit;
}
function get_user_info($sdk, $openid, $openkey, $pf)
{
    $params = array(
        'openid' => $openid,
        'openkey' => $openkey,
        'pf' => $pf,
    );

    $script_name = '/v3/user/get_info';     //参数: http://wiki.open.qq.com/wiki/v3/user/get_info
    return $sdk->api($script_name, $params,'post');

}

$sdk = new OpenApiV3($appid, $appkey);
$sdk->setServerName($server_name);
$qq_user_info = get_user_info($sdk, $openid, $openkey, $pf);

if($_GET['openid']){//优先设置qq id

//如果设置了openid
    $qq_user_info = get_user_info($sdk, $openid, $openkey, $pf);
    //file_put_contents("/opt/get_user_info.txt",json_encode($qq_user_info));
    if($qq_user_info){//登陆token正确
        $user=$db->GetRow("select * from bu_user where snsid='$openid'");
        if($user){
            $cookiestr=logincookie($user);
            setcookie("KDUUS",$cookiestr,time()+3600*24,"/",_COOKIE_DOMAIN_);
            $_SESSION['KDCOOKIE']=$cookiestr;
            $_COOKIE['KDUUS']=$cookiestr;
            setcookie("firstinstall",'0',time()+360,"/",_COOKIE_DOMAIN_);
            $_COOKIE['firstinstall']=0;

            $userinfo=search_save_user($user['userId']);
            set_login_info($userinfo);

        }else{
            if($qq_user_info['gender'] == "男"){
                $gender=1;
            }else{
                $gender=0;
            }
            $tk=register_by_opensns(3,$openid,$qq_user_info['nickname'],$qq_user_info['figureurl'],$gender,"qzone");
            if($tk){
                $user=checklogin();
                setcookie("firstinstall",'1',time()+360,"/",_COOKIE_DOMAIN_);
                $_COOKIE['firstinstall']=1;
                header("location:/index.php?openid=$openid&openkey=$openkey&tk=reg_login");
            }
        }
    }else{//无法从qq获取正确信息，返回到首页
        //header('Location:http://app1101493466.qzoneapp.com');
        //echo "ok->go";
        //include($app_path.'include/footer.inc.php');
        //exit;
    }
}
else{
    $user=checklogin();
}