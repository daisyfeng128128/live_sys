<?php 
//此文件不用了，将此文件的值放到，third_part_config.php文件里了
//所有任务配置
$task_config=array(
		5=>array('gold'=>5,'addition'=>'完成邮箱验证'),
		2=>array('gold'=>10,'addition'=>'送出1朵玫瑰'),
		4=>array('gold'=>10,'addition'=>'和主播打个招呼'),
		6=>array('gold'=>10,'addition'=>'关注1位主播'),
		3=>array('gold'=>10,'addition'=>'送出1个掌声'),
		7=>array('gold'=>20,'addition'=>'成为房间管理'),
		8=>array('gold'=>200,'addition'=>'第1次充值'),
);
/*
define(TASK_DOWNLOAD_SHORTCART,1);
define(TASK_SEND_KICKBACK,2);
define(TASK_ADD_FAV,3);
define(TASK_SEND_ROSE,4);
define(TASK_LOGIN_3TIMES,5);
define(TASK_FIRST_PAY,6);
$task_desc=array(
array('taskid'=>TASK_DOWNLOAD_SHORTCART,'title'=>'下载桌面快捷方式','money'=>20),
array('taskid'=>TASK_SEND_KICKBACK,'title'=>'送出一个红包','money'=>5),
array('taskid'=>TASK_ADD_FAV,'title'=>'收藏一个房间','money'=>5),
array('taskid'=>TASK_SEND_ROSE,'title'=>'送出一朵玫瑰','money'=>5),
array('taskid'=>TASK_LOGIN_3TIMES,'title'=>'连续3天登陆','money'=>20),
array('taskid'=>TASK_FIRST_PAY,'title'=>'首次充值','money'=>100)
);

function is_task_complete($userid,$taskid){
	global $db,$task_desc;
	if(!$task_desc[$taskid]){
		return false;
	}
	$complete=$db->GetOne("select complete from task where taskid='$taskid' and userid='$userid'");
	if($complete==1){
		return true;
	}
	return false;
}
function get_task_award($taskid){
	global $db,$task_desc;
	foreach($task_desc as $task){
		if($task['taskid']==$taskid){
			return $task['money'];
		}
	}
}
function set_task_complete($userid,$taskid,$complete){
	global $db,$task_desc;
	$task=$db->GetRow("select * from task where taskid='$taskid' and userid='$userid'");
	if($task['complete']==1){
		return;
	}
	if($task){
		$db->Execute("update task set complete=complete+$complete where taskid='$taskid'");
	}
	else{
		$db->Execute("insert into task (userid,taskid,complete)values('$userid','$taskid','$complete')");
	}
	if(($task['complete']+$complete)==1){//完成任务
		//加钱
		$money=get_task_award($taskid);
		$db->Execute("update user set balance=balance+$money where userid='$userid'");
		//记录
		//$db->Execute("insert into balance_change_log (`when`,`why`,`userid`,`money`,`balance`,`channel`,`agentid`)values('".time()."','6','$userid','$money','$balance','0','0')");
	}
	return;
}
*/