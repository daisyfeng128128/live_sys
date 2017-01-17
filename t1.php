<?php

ini_set("display_errors",1);
error_reporting (E_ALL);
phpinfo();
exit;


ini_set('session.save_handler',"redis");
ini_set('session.save_path',"tcp://112.124.58.61:6379?auth=foobareds");

session_start();
$_SESSION['test_session']= @array('name' =>'fanqie' , 'ccc'=>'hello redis ');
$_SESSION['name']="ming";

$redis = new redis();
$redis->connect('112.124.58.61:6379', "6379");
$redis->auth("foobareds");
echo 'sessionid>>>>>>> PHPREDIS_SESSION:' . session_id();
echo '<br/>';
echo '<br/>';
//redis用session_id作为key并且是以string的形式存储
$c=$redis->get("PHPREDIS_SESSION:gnb1pnip9toigkpp8lone1ebb7");

echo '通过php用redis获取>>>>>>>'.$redis->get("PHPREDIS_SESSION:gnb1pnip9toigkpp8lone1ebb7");
echo '<br/>';
echo $c;
//var_dump($c);
echo '<br/>';
echo '通过php用session获取>>>>>>><br/>';
echo '<pre>';
var_dump($_SESSION['test_session']);
echo '</pre>';
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

