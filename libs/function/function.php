<?php 

	//系统封装 勿动；
	function C($name,$method){
		require_once ('././app/controller/'.$name.'Controller.class.php');
		//$testController=new testController();
		//$testController->show();
		//eval('$obj=new '.$name.'Controller();$obj->'.$mothod().';');
		//eval ()函数调用简单但不安全；
		$controller=$name.'Controller';
		$obj=new $controller();
		return $obj->$method();
	}
	
	
	function M($name){
		require_once ('././app/model/testModel.class.php');
		$model=$name.'Model';
		$obj=new $model();
		return $obj;
	}
	
	function V($name){
		require_once ('././app/view/testView.class.php');
		$view=$name.'View';
		$obj=new $view();
		return $obj;
	}
	
	function daddslashes($str){
		return (!get_magic_quotes_gpc())?addslashes($str):$str;
	}
	
	function ORG($path,$name,$params=array()){
		//path路径 ，name第三方类名 ，params该类初始化多需指定，赋值的属性，格式array(属性1=>属性值，属性2=>属性2值)；
		require_once ('././libs/view/'.$path.$name.'.class.php');
		$obj=new $name();
		if (!empty($params)){
			foreach ($params as $key=>$value){
				$obj->$key=$value;
			}
		}
		return $obj;
	}
?>