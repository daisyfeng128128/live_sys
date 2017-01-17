<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/12
* Time: 10:35
*/
include_once('include/aes.func.php');

$str='fgz%2B28Xab%2FcbvPx1vuzMWGYZuAF1BsaBWmM1t26aaDT2%2FJ3%2BaoZFPgYsHxf0%2FWHc'; //错
$str2 = 'CTl18IJNIEE79EssGXNIM46T1tQDX6NGLu5Qhoy2OSvD4mGkvNZub9J7nXHkZZjl';     //不知道     能解
$str3 = "w7J%2Br9BCYQL4NSM8R9G%2B7cXAb2Gg5xIgwtbgMLfzMACjbv4cHCRfkEyo72KQHcQJ"; //不掉线     不能解
$str4 = 'tiS1bhXrIvS9b%2FwS6OT9gBDpzT6Y1%2FFSBO1%2FEz3Rf73V873MQ8q8BYsikFgBZorm'; //不掉线         不能解
$str5 ='Ls6RMzX2ll1S34TlbPZNRn8bBPqDQmZ%2F4ohLpx68FaBRx8W4xKwd87iy4mzNdCSF';     //不掉线         不能解
$str6 = '46a2d959bc52e9af5847662abf566060'; //(赵海刚的) 不能解
if(isset($_GET['str'])){
    var_dump(aes_decrypt($_GET['str']));
}
else{
    var_dump(aes_decrypt($str5));
}

if($_GET['info'] == 'info'){
    phpinfo();
}
if($_GET['server'] == 'server'){
   var_dump($_SERVER);
}
