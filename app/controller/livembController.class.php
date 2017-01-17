<?php 
	class livembController{
		public function index(){
			global $view;
			//global $vsn;
			//$page_var['cdn']=_CDNDOMAIN_;
			
			$roomnumber = (int)$_GET['roomnumber'];
			//$roomnumber ='10005';
			//数据获取；
			$datas = curl_post(_INTERFACE_."/rest/homeAnchors/livePhone.mt?roomNumber={$roomnumber}");
			$data = json_decode($datas,true);
			
			$zhuboinfo = $data['data'];
			$roomUsers = $zhuboinfo['roomUsers'];
			$hotAnchors = $zhuboinfo['hotAnchors'];
			$hotNum = count($hotAnchors)<5?count($hotAnchors):5;
			$roomnum=count($roomUsers);
			$imgsize = '&w=330&h=181';
			//print_r($zhuboinfo);
			//echo count($roomnum);
			//转码作用；
			
			$result = curl_post("http://1b7a61-0.sh.1252349838.clb.myqcloud.com/rest/site/transcoding.mt?roomNumber={$roomnumber}");
			
			 //print_r($hotAnchors);
			 $view->assign('zhuboinfo',$zhuboinfo);
			 $view->assign('hotAnchors',$hotAnchors);
			 $view->assign('hotNum',$hotNum);
			 $view->assign('roomUsers',$roomUsers);
			 $view->assign('imgsize',$imgsize);
			 $view->assign('rmb',$roomnumber);
			 $view->assign('rmbu',$roomnum);
			 
			$view->display('livemoblie.html');
		}
		
	}

?>