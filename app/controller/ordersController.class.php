<?php
//控制器作用调用模型，调用视图，将模型生成的数据传给视图，让相关视图去显示；
	class ordersController{
	public function index(){
		global $view;
        global $page_var;
			//$testModel=M('test');
			//$data=$testModel->get();
			//$view->assign('str',$data);
		//魅力总表
		$datas = curl_post(_INTERFACE_."/rest/homeAnchors/ranking.mt","");
		$acceptData=json_decode($datas, true);
		$page_var['rank_super_star']=$acceptData[data];
		//爵位榜总榜
		$datas = curl_post(_INTERFACE_."/rest/homeAnchors/theTitle.mt","");
		$acceptData=json_decode($datas, true);
		$page_var['rank_super_rich']=$acceptData[data];
		//获取活跃榜总榜
		$datas = curl_post(_INTERFACE_."/rest/homeAnchors/active.mt","");
		$acceptData=json_decode($datas, true);
		$page_var['rank_fans_list']=$acceptData[data];
		$user=checklogin();
		$page_var['user']=$user;
		
		$page_var['current_page']="order";
		
		$page_var['cdn']=_CDNDOMAIN_;
		foreach($page_var as $key=>$val){
			$view->assign($key,$val);
		}
		
		$view->registerPlugin("function","toColor","toColor");
		$view->registerPlugin("function","toTime","toTime");
		
		$view->display('orders.html');
		}
	}

?>