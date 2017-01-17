<?php 
session_start();
if($_GET['isiphone']=="1"){
	$_SESSION['isiphone']=1;
}
include("../include/header.inc.php");
include($app_path."include/level.func.php");
require($app_path.'include/smarty/Smarty.class.php');
$user=checklogin();
$user['starlevel']=point2star($user['totalpoint']);
$user['richlevel']=cost2rich($user['totalcost']);
//$db->debug = true;

$action=$_GET['action'];
switch($action){
	case 'getlistmingxing'://明星榜
		$data["day"] = level_show(get_top_rank_mingxing("day",20));
		$data["week"] = level_show(get_top_rank_mingxing("week",20));
		$data["month"] = level_show(get_top_rank_mingxing("month",20));
		$data["all"] = level_show(get_top_rank_mingxing("all",20));
		echo json_encode($data);
		break;
	case 'getlistfuhao'://富豪榜
		$data["day"] = level_show(get_top_rank_fuhao("day",20));
		$data["week"] = level_show(get_top_rank_fuhao("week",20));
		$data["month"] = level_show(get_top_rank_fuhao("month",20));
		$data["all"] = level_show(get_top_rank_fuhao("all",20));
		echo json_encode($data);
		break;
	case 'getlistrenqi'://明星榜
		$data["day"] = level_show(get_top_rank_renqi("day",20));
		$data["week"] = level_show(get_top_rank_renqi("week",20));
		$data["month"] = level_show(get_top_rank_renqi("month",20));
		$data["all"] = level_show(get_top_rank_renqi("all",20));
		echo json_encode($data);
		break;
	case 'getlistgift'://礼物
		$data["a0"] = level_show(giftRank(0),"gift");
		$data["a1"] = level_show(giftRank(1),"gift");
		echo json_encode($data);
		break;
	case 'getlistclan'://家族列表
		$data["clan"] = $db->GetArray("select a.*,b.nickname from clan a,user b where a.leaderid=b.userid order by a.member_num desc");
		echo json_encode($data);
		break;
	case 'getlistclandetail'://单个家族
		$clanid = (int)$_GET["id"];
		$data["claninfo"] = $db->GetRow("select a.*,b.nickname from clan a,user b where a.leaderid=b.userid and a.clanid=$clanid");
		$data["claninfo"]["addtime"] = date("Y-m-d",$data["claninfo"]["addtime"]);
		if(empty($data["claninfo"]["announce"])){
			$data["claninfo"]["announce"] = "";
		}
		$data["claninfo"]["inclan"] = ($user["clanid"]==$clanid)?"1":"0";
		
		$data["clanzz"] = array();//族长
		$data["clanfzz"] = array();//副族长
		$clan_fzz_ids = explode(",",$data["claninfo"]["secondleaders"]);
		
		//家族主播
		$show = $db->GetArray("select a.*,s.endtime,s.showcover,c.num from (SELECT a.userid,a.usernumber,a.nickname,a.totalpoint,a.totalcost 
FROM `user` a,`bu_user_anchors` b 
WHERE a.userid=b.userid and b.pass=1 and a.clanid=$clanid) a
LEFT JOIN shows as s on s.userid=a.userid
left JOIN viewernum_count as c on c.roomnumber=a.usernumber
group by s.userid ");
		//$show = $db->GetArray("SELECT a.userid,a.usernumber,a.nickname,a.totalpoint,a.totalcost FROM `user` a,`bu_user_anchors` b WHERE a.userid=b.userid and b.pass=1 and a.clanid=$clanid");
		$userids = null;
		foreach($show as $k=>$v){
			$v['starlevel'] = point2star($v['totalpoint']);
			$v['richlevel'] = point2star($v['totalcost']);
			if($v['userid']==$data["claninfo"]["leaderid"]){
				$data["clanzz"][] = $v;
			}else if(in_array($v['userid'],$clan_fzz_ids)){
				$data["clanfzz"][] = $v;
			}
			$v["num"] = (int)$v["num"];
			if(empty($v["endtime"])){
				$v["showing"] = "1";
				$v["showing_txt"] = $v["num"]." 人观看";
			}else{
				$v["showing"] = "1";
				$v["showing_txt"] = "休息中";
			}
			$v["fav"] = $db->GetOne("select count(*) from bu_user_studio where showernumber=".$v["usernumber"]);
			$data["show"][] = $v;
			$userids .= ",".$v["userid"];
		}
		$userids = ltrim($userids,",");
		if(empty($userids))$userids=0;
		//$shows = $db->GetArray("select * from shows where userid in($userids) order by id");
		
		//家族用户
		$user = $db->GetArray("select a.userid,a.usernumber,a.nickname,a.totalpoint,a.totalcost from user a where clanid='$clanid' and userid not in($userids) order by totalcost desc");
		foreach($user as $k=>$v){
			$v['starlevel'] = point2star($v['totalpoint']);
			$v['richlevel'] = point2star($v['totalcost']);
			if($v['userid']==$data["claninfo"]["leaderid"]){
				$data["clanzz"][] = $v;
			}else if(in_array($v['userid'],$clan_fzz_ids)){
				$data["clanfzz"][] = $v;
			}else{
				$data["user"][] = $v;
			}
		}
		//print_r($data);exit;
		echo json_encode($data);
		break;
    default:
		$smarty = new Smarty;
		$smarty->caching = false;
		$smarty->template_dir = "./templates";
		$smarty->compile_dir = "./templates_c";
		
		
		$page_var["RMB_XNB"] = RMB_XNB;
		$page_var['user']=$user;
		$page_var['id']=isset($_GET["id"])?$_GET["id"]:0;
		$page_var['time']=time();
		
		foreach($page_var as $key=>$val){
			$smarty->assign($key,$val);
		}
		$smarty->display("find.html");
		break;
}

include($app_path."include/footer.inc.php");


function level_show($data,$type=""){
	if($data){
		foreach($data as $key =>$value ){
			$data[$key]["starlevel"] = point2star($data[$key]['totalpoint']);
			$data[$key]["richlevel"] = point2star($data[$key]['totalcost']);
			if($type=="gift"){
				$data[$key]["giftimage"] = str_replace(array('.png','.gif'),'',$data[$key]["giftimage"]);
			}
		}
	}
	return $data;
}