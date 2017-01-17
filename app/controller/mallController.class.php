<?php 
	class mallController{
		
		public function index(){
			global $view;
			global $page_var;
			
			$page_var['cdn']=_CDNDOMAIN_;
			$page_var['current_page']="mall";
			$user=checklogin();
			$page_var['user']=$user;
			
			foreach($page_var as $key=>$val){
				$view->assign($key,$val);
			}
			
			$view->display('mall.html');
		}
		
		public function mall_prop(){
			global $view;
			global $page_var;
				
			$page_var['cdn']=_CDNDOMAIN_;
			$page_var['current_page']="mall";
			$user=checklogin();
			$page_var['user']=$user;
			
			foreach ($page_var as $key=>$val){
				$view->assign($key,$val);
			}
			
			$view->display('mall_prop.html');
		}
		
		public function mall_ride(){
			global $view;
			global $page_var;
				
			$page_var['cdn']=_CDNDOMAIN_;
			$page_var['current_page']="mall";
			$user=checklogin();
			$page_var['user']=$user;
				
			foreach ($page_var as $key=>$val){
				$view->assign($key,$val);
			}
			
			$view->display('mall_ride.html');
		}
	
	}

?>