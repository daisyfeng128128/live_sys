<?php 
session_start();
if(isset($_GET['isiphone']) && $_GET['isiphone']=="1"){
	$_SESSION['isiphone']=1;
}
include("../include/header.inc.php");
include($app_path."include/level.func.php");
$user=checklogin();
//$db->debug = true;
//广告条


$where = "";
if(isset($_GET["keyword"]) && !empty($_GET["keyword"])){
	$where .= " and (b.roomnumber='$_GET[keyword]' or a.nickname like '%$_GET[keyword]%')";
}
$recommend_shows=$db->CacheGetArray(5,"select a.totalpoint,a.nickname,a.birthday,b.roomnumber,b.showcover,c.num as viewernum,b.starttime,b.endtime,rc.showercateid from shows b , user a,viewernum_count c,bu_user_anchors p ,room_config rc where rc.roomnumber=a.usernumber and a.userid=p.userid $pointlimit_sql $catelimit_sql and p.pass=1 and b.roomnumber=c.roomnumber and b.showcover<>'' and b.lastdisconnect is null and a.userid=b.userid and b.endtime is null and rc.pwd is null and rc.shoufei=0 {$where} order by c.num desc");
for($i=0;$i<count($recommend_shows);$i++){
	$recommend_shows[$i]['i']=$i;
	$recommend_shows[$i]['starlevel']=point2star($recommend_shows[$i]['totalpoint']);
	$recommend_shows[$i]['playedtime']=playedTime($recommend_shows[$i]['starttime']);
	$recommend_shows[$i]['endtime']==''?$recommend_shows[$i]['status']=2:$recommend_shows[$i]['status']=0;
	$recommend_shows[$i]['newStar']=0;
	$recommend_shows[$i]=safe_output($recommend_shows[$i]);
}
//$data['showing']=$recommend_shows;

for($i=0;$i<count($recommend_shows);$i++){
	$tmpjoin[]=$recommend_shows[$i][roomnumber];
}
$noids=@join(',',$tmpjoin);
if(!$noids){
	$noids=0;
}
$recommend_shows2=$db->CacheGetArray(5,"select * from(select a.totalpoint,a.nickname,b.roomnumber,b.showcover 
	,b.starttime,b.endtime,'0' as viewernum,rc.showercateid from shows b , user a,bu_user_anchors p 
	,room_config rc where rc.roomnumber=a.usernumber and  a.userid=p.userid $pointlimit_sql $catelimit_sql and p.pass=1 and b.showcover<>'' and a.userid=b.userid and b.roomnumber not in ($noids) and rc.pwd is null and rc.shoufei=0  {$where} order by starttime  desc) as rows group by roomnumber order by endtime desc limit 100");
for($i=0;$i<count($recommend_shows2);$i++){
	$recommend_shows2[$i]['i']=$i;
	$recommend_shows2[$i]['starlevel']=point2star($recommend_shows2[$i]['totalpoint']);
	$recommend_shows2[$i]['playedtime']=playedTime($recommend_shows2[$i]['starttime']);
	//$recommend_shows2[$i]['endtime']==''?$recommend_shows2[$i]['status']=2:$recommend_shows2[$i]['status']=0;
	//$recommend_shows2[$i]['newStar']=0;
	$recommend_shows2[$i]=safe_output($recommend_shows2[$i]);
}
//$data['show']=$recommend_shows2;
if(	(!empty($recommend_shows)) && (!empty($recommend_shows2))	){
	$recommend_shows = array_merge($recommend_shows,$recommend_shows2);
}else{
	if(!empty($recommend_shows)){
		$recommend_shows = $recommend_shows;
	}else{
		$recommend_shows = $recommend_shows2;
	}
}
$pagecount = (int)(isset($_GET['pagesize'])?$_GET['pagesize']:20);
$arr = pageAjax($recommend_shows,$pagecount,max((int) $_GET['page'], 1));
$data['show'] = $arr;

echo json_encode($data);
include($app_path."include/footer.inc.php");

function pageAjax($array,$pagesize,$current){
	$_return=array();

	$total=ceil(Count($array)/$pagesize);//求总页数
	$prev=(($current-1)<=0 ? "1":($current-1));//确定上一页，如果当前页是第一页，点击显示第一页
	$next=(($current+1)>=$total ?   $total:$current+1);//确定下一页，如果当前页是最后一页，点击下页显示最后一页
	if($current>$total){//当前页如果大于总页数，当前页为最后一页
		//$pagearray["source"]=array();
		//$pagearray["total"]=$total;
		return $_return;
	}
	$start=($current-1)*$pagesize;//分页显示时，应该从多少条信息开始读取

	$startcount = Count($array)-$start;
	if($startcount >= $pagesize){
		$startcount = $pagesize;
	}
	for($i=$start;$i<$start+$pagesize;$i++){
		if(!isset($array[$i])){
			break;
		}
		array_push($_return,$array[$i]);//将该显示的信息放入数组 $_return 中
	}
	return $_return;
}