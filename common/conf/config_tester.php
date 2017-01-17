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
	
	ini_set('display_errors','On');
	error_reporting(0);
	define('_CDNDOMAIN_','');//cdn服务器
	define('_INTERFACE_','http://tester.kedo.tv');//接口
	define('_IMAGES_DOMAIN_','http://img.kedo.tv');//图片服务器
    define('_IMGPLUS_DOMAIN_','http://img.kedo.tv');//图片服务器
	define('_MYSQL_HOST_','rm-bp13gx2a9433w42r1.mysql.rds.aliyuncs.com');//数据库地址
	define('_MYSQL_DB_','anchors');//数据库名
	define('_MYSQL_USER_','anchors');//数据库用户名
	define('_MYSQL_PWD_','a@n#c$h%o&r*sZ');//数据库密码
	define('_COREWEB_','http://core.kedo.tv/guildsSoc/checkToken.mt');//公会地址
	define('_REDIS_HOST_','09ede0159aa64f40.m.cnhza.kvstore.aliyuncs.com');//redis地址
	define('_REDIS_PWD_','09ede0159aa64f40:fooBa4eds');//redis地址
	define('_REDIS_KEYB_','ext');
	define('_dbds_','dest');
	
	$vsn = md5(date('Y-d-m')."S%000");

?>