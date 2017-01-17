<?php
/**
 *
 * 功能说明：支付系统控制器。
 *
 **/

	class payController{
	
	    public function index(){
	    	global $view;
	    	global $vsn;
	    	
	    	$page_var['cdn']=_CDNDOMAIN_;
	    	
	    	$user=checklogin();
	    	$page_var['user']=$user;
	    	
	    	$datas = curl_get(_CDNDOMAIN_."/files/allAnchors.json","");
	    	$acceptData=json_decode($datas, true);
	    	$page_var['sqAnchorList']=json_decode($acceptData[json],true);
	    	
	    	
	    	$page_var['openid']=$_SESSION['openid'];
	    	$page_var['openkey']=$_SESSION['openkey'];
	    	$page_var['pf']=$_SESSION['pf'];
	    	$page_var['pfkey']=$_SESSION['pfkey'];
	    	
	    	
	    	foreach($page_var as $key=>$val){
	    		$view->assign($key,$val);
	    	}
	    	
	        $view->display('pay.html');
	       
	    }
	}
?>	