<?php 
 /***url形式 kedo.php?c=控制器名&m=方法名      ***/

	header("Content-type: text/html; charset=utf-8");
	//引入库文件 ；
	require_once ('libs/function/function.php');
	//引入开发配置中的公用方法；
	include_once("common/function/include.list.php");
	foreach ($pathss as $pathas){
		include_once('common/function/'.$pathas);
	}
	//启用并初始化视图Smarty引擎；
 	$view=ORG('Smarty/', 'Smarty',$config['viewconfig']);

 	if (isset($_GET['rndcode']) || isset($_POST['rndcode'])) {
 		$res = C('centeros','imgupload');
 		echo $res;
 		exit;
 	}
 	
 	 if ($_GET['c']==''){
 		C('index', 'index');
 	}else { 
	 	
 		$controller=isset($_GET['c'])?daddslashes($_GET['c']):'index';
 		$method=isset($_GET['m'])?daddslashes($_GET['m']):'index';
	 	C($controller, $method);
 	}
 ?>