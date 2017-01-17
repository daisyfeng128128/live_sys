<?php 
	class a404Controller{
		
		public function index(){
			global $view;

			$user=checklogin();
			$page_var['user']=$user;
			
			$page_var['fhsy']=_INTERFACE_;
			$page_var['qww']=(_INTERFACE_."/kedo.php?c=square");
			foreach($page_var as $key=>$val){
				$view->assign($key,$val);
			}
			
			$view->display('404.html');
		}
	}	
?>