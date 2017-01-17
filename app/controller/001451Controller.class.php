<?php 
	class a001451Controller{
		
		public function index(){
			global $view;
			
			$page_var['cdn']=_CDNDOMAIN_;
			foreach($page_var as $key=>$val){
				$view->assign($key,$val);
			}
			
			$view->display('001451.html');
		}
?>