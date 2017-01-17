<?php 
	class a001451Controller{
		
		public function index(){
			global $view;
			
			$get=$_GET;
			//广告参数ID；
			$exId=$get['exId'];
			setcookie("exId","$exId",time()+360*24*3600);
			//exit();
			foreach ($get as $keys=>$vals){
				$page_var[$keys]=$vals;
			}
			
			$page_var['cdn']=_CDNDOMAIN_;
			
			foreach($page_var as $key=>$val){
				$view->assign($key,$val);
			}
			
			$view->display('001451.html');
		}
	}	
?>