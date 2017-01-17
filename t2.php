<?php

phpinfo();
ini_set("display_errors",1);
error_reporting (E_ALL);
include_once('include/RedisSession.php');

ini_set('session.save_handler',"user");
$data=array(
    "host"=>_REDIS_HOST_,
    "port"=>6379,
    "auth"=>_REDIS_PWD_,
);
$redisSession =new RedisSession($data);
session_start();
$_SESSION['name']="ming";
echo $_SESSION['name'];
exit();


ini_set('session.save_path',"tcp://112.124.58.61:6379?auth=foobareds");

$_SESSION['test_session']= @array('name' =>'fanqie' , 'ccc'=>'hello redis ');
$_SESSION['name']="ming";
$redis = new redis();
$redis->connect('112.124.58.61:6379', "6379");
$redis->auth("foobareds");

exit();
/**
 * 遍历目录，结果存入数组。支持php4及以上。php5以后可用scandir()函数代替while循环。
 * @param string $dir
 * @return array
 */
function my_scandir($dir)
{
    $files = array();
    if ( $handle = opendir($dir) ) {
        while ( ($file = readdir($handle)) !== false )
        {
            if ( $file != ".." && $file != "." )
            {
                if ( is_dir($dir . "/" . $file) )
                {
                    $files[$file] = my_scandir($dir . "/" . $file);
                }
                else
                {
                    $files[] = $file;
                }
            }
        }
        closedir($handle);
        return $files;
    }
}

function my_scandir1($dir)
{
    $files = array();
    $dir_list = scandir($dir);
    /*foreach($dir_list as $file)
    {
        if ( $file != ".." && $file != "." )
        {
            if ( is_dir($dir . "/" . $file) )
            {
                $files[$file] = my_scandir1($dir . "/" . $file);
            }
            else
            {
                $files[] = $file;
            }
        }
    }*/

    return $dir_list;
}
var_dump(scandir('./'));
if(function_exists("scandir")){
    echo ";1";
}else{
    echo "11";
}

?>

