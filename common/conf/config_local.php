<?php 
	$vw=isset($_GET['c'])?daddslashes($_GET['c']):'index';
	
	//$vw用于动态模板地址路径；
	$config=array(
		//smarty配置；
		'viewconfig'=>array(
				'left_delimiter'	=>	'<{',
				'right_delimiter'	=>	'}>',
				'template_dir'		=>	'app/view/'.$vw,
				'compile_dir'		=>	'runtime',
				'caching'			=>	'false',
		),
		//数据库配置文件；暂时不用待DB优化替换后使用；
		'dbconfig'=>array(
				//'dbtype' => 'mysql', // 数据库类型
				'dbhost' => '10.1.1.17', // 服务器地址
				'dbname' => 'anchors', // 数据库名
				'dbuser' => 'root', // 用户名
				'dbpsw' => 'ecdf50H31b1a', // 密码
				//'dbport' => '3306', // 端口
				//'dbprerix' => '', // 数据库表前缀
				'dbcharset' => 'utf8', // 数据库编码默认采用utf8
		)
	);
	//echo $vw;
	
	ini_set('display_errors','on');
	error_reporting(E_ALL ^ E_NOTICE  ^E_WARNING);
	define('_CDNDOMAIN_','');//cdn服务器
	define('_INTERFACE_','http://10.1.1.17');//接口
	define('_IMAGES_DOMAIN_','http://images.181show.com');//图片服务器
    define('_IMGPLUS_DOMAIN_','http://images.181show.com');//图片服务器
	define('_MYSQL_HOST_','10.1.1.17');//数据库地址
	define('_MYSQL_DB_','anchors');//数据库名
	define('_MYSQL_USER_','root');//数据库用户名
	define('_MYSQL_PWD_','ecdf50H31b1a');//数据库密码
	define('_COREWEB_','http://10.1.1.17:8080/survival/guildsSoc/checkToken.mt');//公会地址
	define('_REDIS_HOST_','112.124.58.61');//redis地址
	define('_REDIS_PWD_','foobareds');//redis地址
	define('_REDIS_KEYB_','loc');
	define('_dbds_','debug');
	$vsn = md5(date('Y-d-m')."S%sdfgd");
	//允许地址栏直接访问的控制器名；
	/* $controllername=array();
	//允许地址栏直接访问控制器下面的方法名；
	$methodname=array(); */

?>