<?php 
	class livegamecomicController{
		
		public function index(){
			global $view;
			global $vsn;
			global $page_var;
			
			$page_var['vsn']=$vsn;
			$page_var['cdn']=_CDNDOMAIN_;
			
			$user=checklogin();
			$page_var['user']=$user;
			
			
			foreach($page_var as $key=>$val){
				$view->assign($key,$val);
			}
			
			$view->display('gamecomic.html');
		}
		
	}	
?>