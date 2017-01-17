<?php
/**
 *
 * 功能说明：公告 协议 帮助类控制器。
 *
 **/

	class assistController  {
	
		//服务协议；
	    public function serviceArgument(){
	    	global $view;
	    	global $vsn;
	    	
	    	$page_var['vsn']=$vsn;
	    	$page_var['cdn']=_CDNDOMAIN_;
	    	
	    	$user=checklogin();
	    	$page_var['user']=$user;
	    	
	    	foreach($page_var as $key=>$val){
	    		$view->assign($key,$val);
	    	}
	    	
	        $view->display('serviceArgument.html');
	       
	    }
	    
	    //客服帮助；
	    public function help(){
	    	global $view;
	    	global $vsn;
	    	
	    	$page_var['vsn']=$vsn;
	    	$page_var['cdn']=_CDNDOMAIN_;
	    	
	    	$user=checklogin();
	    	$page_var['user']=$user;
	    	
	    	foreach($page_var as $key=>$val){
	    		$view->assign($key,$val);
	    	}
	    	 
	    	$view->display('help.html');
	    	 
	    }
	    
	    //轮播图入口签约工会OW;
	    public function applyHome(){
	    
	    	global $view;
	    	global $vsn;
	    	
	    	$page_var['vsn']=$vsn;
	    	$page_var['cdn']=_CDNDOMAIN_;
	    	
	    	$user=checklogin();
	    	$page_var['user']=$user;
	    	
	    	foreach($page_var as $key=>$val){
	    		$view->assign($key,$val);
	    	}
	    	
	    	$view->display('applyHome.html');
	    
	    }
	    
	    //签约工会流程介绍页面；
	    public function applymain(){
	    
	    	global $view;
	    	global $vsn;
	    	
	    	$page_var['vsn']=$vsn;
	    	$page_var['cdn']=_CDNDOMAIN_;
	    	
	    	$user=checklogin();
	    	$page_var['user']=$user;
	    	
	    	foreach($page_var as $key=>$val){
	    		$view->assign($key,$val);
	    	}
	    	
	    	$view->display('applyMain.html');
	    }
    
}
?>