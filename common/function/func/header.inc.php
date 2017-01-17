<?php
function getMillisecond() {
    list($s1, $s2) = explode(' ', microtime());
    $str=(float)sprintf('%.0f', (floatval($s1) + floatval($s2)) * 1000);
    $haomiao=substr($str,-3,strlen($str));
    $miao=substr($str,0,-3);
    $time=date("y-m-d H:i:s",$miao);
    return $time.":".$haomiao;
}
if(isset($_GET['c'])){
    $tm=true;
}

//vision

$http_host=$_SERVER['HTTP_HOST'];
switch($http_host){
    case "127.0.0.1":
        define("SITENAME","local");
        break;
	case "localhost":
        define("SITENAME","local");
        break;
    case "www.kedo.cn":
        define("SITENAME","local");
        break;
    case "www.kedo.xin":
        define("SITENAME","local");
        break;
    case "10.1.1.17":
        define("SITENAME","local");
        break;
    case "www.181show.com":
        define("SITENAME","181show");
        break;
    case "tester.kedo.tv":
        define("SITENAME","tester");
        break;
    case "www.kedo.tv":
        define("SITENAME","kedo");
        break;
    default :
        define("SITENAME","kedo");
}
function console_log($data){
    if (is_array($data) || is_object($data))
    {
        echo("<script>console.log('".json_encode($data)."');</script>");
    }else{
        echo("<script>console.log('".$data."');</script>");
    }
}

$app_path=str_replace('\\','/',str_replace('common\\function\\func\\header.inc.php','',str_replace('common/function/func/header.inc.php','',__FILE__)));
//echo $app_path;

include_once($app_path."common/conf/config_".SITENAME.".php");
include_once($app_path."libs/extend/session/session.php");
ini_set('session.save_handler',"user");
session::getSession('redis',array(
    'host' => _REDIS_HOST_,
    'port' => "6379",
    'auth' => _REDIS_PWD_,
))->begin();


session_start();
global $page_var;
$page_var['vsn']=$vsn;
define('_COOKIE_DOMAIN_',$_SERVER['HTTP_HOST']);//cookie域
//echo _COOKIE_DOMAIN_;
define('_API_URL_','http://'.$_SERVER['HTTP_HOST'].'/apis/');
define('_RESET_PWD_URL_','http://'.$_SERVER['HTTP_HOST'].'/resetpassword/');
define('_MAIN_DOMAIN_',$_SERVER['HTTP_HOST']);
define('IS_SINGLE_MONEY',false);//是否为单货币系统,	true,表示是单货币,false
$page_var['IS_SINGLE_MONEY']=IS_SINGLE_MONEY;
$page_var['site_skin']=$_GET[skin]?$_GET[skin]:'desert';//网站样式,可以是以下值,kugou,kuwo,lebo,qq,2339,xiu8,nowfc
$page_var['site_live_skin']=$_GET[skin]?$_GET[skin]:'desert';//网站样式,可以是以下值,default,2339,swf
$page_var['site_ishave_game'] = false;//是否有游戏(只是显示游戏的导航),true,false
$page_var['IS_QQ'] = false;//是否为qq空间站,true,false
if($page_var['IS_QQ']){//正式环境和测试环境下需要修改，include/QQZone/QQZone.inc.php里面的变量$HTTP_HOST，请查看此文件
    header('P3P: CP=CAO PSA OUR');
    $page_var['appid'] = 101321404;
    $page_var['appkey'] = "97047c25e765fdf012b118efd2d46293";
}
$page_var['cdn_domain']=_CDNDOMAIN_;
date_default_timezone_set('PRC');

include($app_path.'libs/extend/adodb_65495/adodb.inc.php');
include($app_path.'common/function/func/mysql_config.php');

//echo ($app_path.'common/function/mysql_config.php');

include_once('global.func.php');
if(($_SESSION['pf'] == "QQGame" or $_SESSION['pf'] == "qqgame") and $_SESSION['openid'] != null){
    $index_page = "index_qqgame.php";
    $page_var['index_page'] =$index_page;
}else{
    $index_page = "";
    $page_var['index_page'] = "";
}
/*读取网站配置结束*/
if (!get_magic_quotes_gpc()) {
    function addslashesDeep($var) {
        return is_array($var) ? array_map('addslashesDeep', $var) : add_slashes($var);
    }
    $_GET = addslashesDeep($_GET);
    $_POST = addslashesDeep($_POST);
    $_COOKIE = addslashesDeep($_COOKIE);
    $_REQUEST = addslashesDeep($_REQUEST);
}
if($_GET['token']){
    $exptime=time()+3600*24*365;
    setcookie("KDUUS",$_GET['token'],$exptime,'/',_COOKIE_DOMAIN_);
    $_COOKIE['KDUUS']=$_GET['token'];
}
if($_GET['u']){
    setcookie ( "unionid" , (int)($_GET['u']) , time()+3600*24 ,"/",_COOKIE_DOMAIN_ );
}
//post请求
function curl_post($url, $post) {

    $options = array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADER         => false,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $post,
    );
    $ch = curl_init($url);
    curl_setopt_array($ch, $options);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}


function curl_get($get_url,$get_param){
	global $tm;
	if($tm){
		return  "<br>loadBegin:".getMillisecond();
	}

    $oCurl = curl_init();
    if(stripos($get_url,"https://")!==FALSE){
        curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($oCurl, CURLOPT_SSL_VERIFYHOST, FALSE);
    }
    $aGet = array();
    foreach($get_param as $key=>$val){
        $aGet[] = $key."=".urlencode($val);
    }
    curl_setopt($oCurl, CURLOPT_URL, $get_url."?".join("&",$aGet));
    curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt($oCurl, CURLOPT_TIMEOUT, 1);
    $sContent = curl_exec($oCurl);
    $aStatus = curl_getinfo($oCurl);
    curl_close($oCurl);

    if(intval($aStatus["http_code"])==200){
        return $sContent;
    }else{
        return FALSE;
    }
}


function get_login_info(){
    if($_SESSION['login_info'] or !empty($_SESSION['login_info'])){
        $_SESSION['login_info']['isc']='1';
        return $_SESSION['login_info'];
    }
    return false;
}

function set_login_info($array){
    $_SESSION['login_info'] = $array;
}

function search_save_user($userid){
    global $db;
    $userinfo=$db->GetRow("select u.userId as userId,u.nickname as nickname,u.password as password,a.roomNumber as roomNumber,u.avatar as avatar,u.username as username,u.loginDT as loginDT,u.logins as logins,u.gender as gender,u.birthday as birthday,u.province as province,u.city as city from bu_user u left JOIN bu_user_anchors a ON u.userId = a.userId where u.userId ={$userid}");

    $loginDT = $userinfo[loginDT];
    $nowDT = date('Y-m-d H:i:s',$_SERVER['REQUEST_TIME']);
    $logins = $userinfo[logins]?$userinfo[logins]:0;
    if($loginDT=='' or $loginDT == null){       //初始化
        $loginDT = $nowDT;
        $db->Execute("update bu_user  set loginDT ='{$loginDT}',logins =1 where userId=$userinfo[userId]");
    }else{
        //判断加否
        $loginDT_str = date('Y-m-d',strtotime($loginDT));
        $nowDT_str = date('Y-m-d',strtotime($nowDT));
        if($nowDT_str > $loginDT_str){
            $logins ++;
            $db->Execute("update bu_user  set loginDT ='{$nowDT}',logins =$logins where userId=$userinfo[userId]");
        }
    }

    if($userinfo){
        if($userinfo['isblock']==1){
            return false;
        }
        $datas1 = curl_post(_INTERFACE_."/rest/homeAnchors/personInfo.mt","userId={$userinfo['userId']}");
        $acceptData1=json_decode($datas1, true);
        $uuname = urldecode($userinfo['nickname']);

        if($acceptData1[resultStatus] == 200){
          //  $uuname=$acceptData1[data]['user']?$acceptData1[data]['user']:$uuname;
            $userinfo['coins'] =intval($acceptData1[data]['coins']);
            $userinfo['spender'] =$acceptData1[data]['spender'];
            $userinfo['differ'] = $acceptData1[data]['differ'];
            $userinfo['nextSpender'] = $acceptData1[data]['nextSpender'];
            $userinfo['active'] = $acceptData1[data]['active'];
            $userinfo['activeDiffer'] = $acceptData1[data]['activeDiffer'];
            $userinfo['nextActive'] = $acceptData1[data]['nextActive'];
            $userinfo['socType'] = $acceptData1[data]['socType'];
            $userinfo['xcoins'] = $acceptData1[data]['xcoins'];
        }else{
            $userinfo['coins'] =0;
            $userinfo['spender'] =0;
            $userinfo['differ'] = 0;
            $userinfo['nextSpender'] = 1;
            $userinfo['active'] = 0;
            $userinfo['activeDiffer'] = 0;
            $userinfo['nextActive'] =1; //比例
            $userinfo['socType'] =0;
            $userinfo['xcoins'] =0;
        }
    }
    $userinfo['nickname'] =$uuname;
    $userinfo=safe_output($userinfo,true);
    return $userinfo;
}

//检查用户登录情况
function checklogin(){
    //session login
    $a = get_login_info();
    if($a  and !empty($a)){
        return $a;
    }

    if(!$_COOKIE['KDUUS'] and !$_SESSION['KDCOOKIE']){
        return false;
    }
    if(!function_exists("aes_decrypt")){
        global $app_path;
        include($app_path.'common/function/func/aes.func.php');
    }
    if(!$_COOKIE['KDUUS']){
        setcookie("KDUUS",$_SESSION['KDCOOKIE'],time()+3600*24,"/",_COOKIE_DOMAIN_);
        $cookie_decode=aes_decrypt($_SESSION['KDCOOKIE']);
    }else{
        $cookie_decode=aes_decrypt($_COOKIE['KDUUS']);
    }
    $cookie_arr=explode(',',$cookie_decode);
    $cookie_arr[0];
    $userinfo=search_save_user($cookie_arr[0]);
    set_login_info($userinfo);
    return $userinfo;
}
function playedTime($time){
    return date("H:i",$time);
    $t=time()-$time;
    $f=array(
        '31536000'=>':',
        '2592000'=>':',
        '604800'=>':',
        '86400'=>':',
        '3600'=>':',
        '60'=>':',
        '1'=>''
    );
    foreach ($f as $k=>$v){
        if (0!=$c=floor($t/(int)$k)){
            $m = floor($t%$k);
            foreach($f as $x=>$y){
                if (0!=$r=floor($m/(int)$x))
                    return trim($c.$v.$r.$y.'',":");
            }
            return $c.$v.'';
        }
    }
}
function ismobile() {
    // 如果有HTTP_X_WAP_PROFILE则一定是移动设备
    if (isset ($_SERVER['HTTP_X_WAP_PROFILE']))
        return true;

    //此条摘自TPM智能切换模板引擎，适合TPM开发
    if(isset ($_SERVER['HTTP_CLIENT']) &&'PhoneClient'==$_SERVER['HTTP_CLIENT'])
        return true;
    //如果via信息含有wap则一定是移动设备,部分服务商会屏蔽该信息
    if (isset ($_SERVER['HTTP_VIA']))
        //找不到为flase,否则为true
        return stristr($_SERVER['HTTP_VIA'], 'wap') ? true : false;
    //判断手机发送的客户端标志,兼容性有待提高
    if (isset ($_SERVER['HTTP_USER_AGENT'])) {
        $clientkeywords = array(
            'nokia','sony','ericsson','mot','samsung','htc','sgh','lg','sharp','sie-','philips','panasonic','alcatel','lenovo','iphone','ipod','blackberry','meizu','android','netfront','symbian','ucweb','windowsce','palm','operamini','operamobi','openwave','nexusone','cldc','midp','wap'
        );
        //从HTTP_USER_AGENT中查找手机浏览器的关键字
        if (preg_match("/(" . implode('|', $clientkeywords) . ")/i", strtolower($_SERVER['HTTP_USER_AGENT']))) {
            return true;
        }
    }
    //协议法，因为有可能不准确，放到最后判断
    if (isset ($_SERVER['HTTP_ACCEPT'])) {
        // 如果只支持wml并且不支持html那一定是移动设备
        // 如果支持wml和html但是wml在html之前则是移动设备
        if ((strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') !== false) && (strpos($_SERVER['HTTP_ACCEPT'], 'text/html') === false || (strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') < strpos($_SERVER['HTTP_ACCEPT'], 'text/html')))) {
            return true;
        }
    }
    return false;
}
