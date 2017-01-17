<?php
/**
 *
 * 功能说明：广场控制器。
 *
 **/

	class squareController{
	
	    public function index(){
	    	global $view;
            global $page_var;
	    	
	    	$page_var['cdn']=_CDNDOMAIN_;
	    	$page_var['current_page']="square";
	    	
	    	$user=checklogin();
	    	$page_var['user']=$user;
	    	foreach($page_var as $key=>$val){
	    		$view->assign($key,$val);
	    	}
	    	
	        $view->display('square.html');
	       
	    }
	}
?>	
	