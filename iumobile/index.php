<?php 
session_start();
if(isset($_GET['isiphone']) && $_GET['isiphone']=="1"){
	$_SESSION['isiphone']=1;
}
include("../include/header.inc.php");
include($app_path."include/level.func.php");
$user=checklogin();

//广告条(改为从后台读)
$data['ads']=array(
	array('img'=>'http://img0.ph.126.net/L2wryoPrsqELT3cUvIwGUg==/6619386554166230907.jpg','id'=>'1'),array('img'=>'http://bobo-public.nosdn.127.net/bobo_1438593404705_37086436.jpg','id'=>'2'),array('img'=>'http://img0.ph.126.net/1CbVs9-beHGdHEt5cup0hg==/6631340444582518470.jpg','id'=>'3')
);
$recommend_shows=$db->CacheGetArray(5,"select a.totalpoint,a.nickname,a.birthday,b.roomnumber,b.showcover,c.num as viewernum,b.starttime,b.endtime from shows b , user a,viewernum_count c,bu_user_anchors p ,room_config rc where rc.roomnumber=a.usernumber and a.userid=p.userid $pointlimit_sql $catelimit_sql and p.pass=1 and b.roomnumber=c.roomnumber and b.showcover<>'' and b.lastdisconnect is null and a.userid=b.userid and b.endtime is null and rc.pwd is null and rc.shoufei=0 order by c.num desc");
for($i=0;$i<count($recommend_shows);$i++){
	$recommend_shows[$i]['i']=$i;
	$recommend_shows[$i]['starlevel']=point2star($recommend_shows[$i]['totalpoint']);
	$recommend_shows[$i]['playedtime']=playedTime($recommend_shows[$i]['starttime']);
	$recommend_shows[$i]['endtime']==''?$recommend_shows[$i]['status']=2:$recommend_shows[$i]['status']=0;
	$recommend_shows[$i]['newStar']=0;
	$recommend_shows[$i]=safe_output($recommend_shows[$i]);
}
$data['showing']=$recommend_shows;

for($i=0;$i<count($recommend_shows);$i++){
	$tmpjoin[]=$recommend_shows[$i][roomnumber];
}
$noids=@join(',',$tmpjoin);
if(!$noids){
	$noids=0;
}
$recommend_shows2=$db->CacheGetArray(5,"select * from(select a.totalpoint,a.nickname,b.roomnumber,b.showcover 
	,b.starttime,b.endtime,'0' as viewernum from shows b , user a,bu_user_anchors p 
	,room_config rc where rc.roomnumber=a.usernumber and  a.userid=p.userid $pointlimit_sql $catelimit_sql and p.pass=1 and b.showcover<>'' and a.userid=b.userid and b.roomnumber not in ($noids) and rc.pwd is null and rc.shoufei=0 order by starttime  desc) as rows group by roomnumber order by endtime desc limit 100");
for($i=0;$i<count($recommend_shows2);$i++){
	$recommend_shows2[$i]['i']=$i;
	$recommend_shows2[$i]['starlevel']=point2star($recommend_shows2[$i]['totalpoint']);
	$recommend_shows2[$i]['playedtime']=playedTime($recommend_shows2[$i]['starttime']);
	//$recommend_shows2[$i]['endtime']==''?$recommend_shows2[$i]['status']=2:$recommend_shows2[$i]['status']=0;
	//$recommend_shows2[$i]['newStar']=0;
	$recommend_shows2[$i]=safe_output($recommend_shows2[$i]);
}
$data['show']=$recommend_shows2;


if($user){
	//$data['fav']=$db->CacheGetArray(30,"select b.nickname,b.usernumber from user b,fav a where a.showernumber=b.usernumber and a.userid='$user[userid]'");
	$fav=$db->CacheGetArray(30,"select * from(select a.totalpoint,a.nickname,b.roomnumber,b.showcover 
	,b.starttime,b.endtime,'0' as viewernum from shows b , user a,bu_user_anchors p 
	,room_config rc,bu_user_studio f where rc.roomnumber=a.usernumber and  a.userid=p.userid and f.showernumber=rc.roomnumber and f.userid='$user[userid]' and b.showcover<>'' and a.userid=b.userid and rc.pwd is null and rc.shoufei=0 order by starttime  desc) as rows group by roomnumber order by endtime desc limit 100");
	for($i=0;$i<count($fav);$i++){
		$fav[$i]['i']=$i;
		$fav[$i]['starlevel']=point2star($fav[$i]['totalpoint']);
		$fav[$i]['playedtime']=playedTime($fav[$i]['starttime']);
		//$fav[$i]['endtime']==''?$fav[$i]['status']=2:$fav[$i]['status']=0;
		//$fav[$i]['newStar']=0;
		$fav[$i]=safe_output($fav[$i]);
	}
	$data['fav']=$fav;
}
else{
	$data['fav']=array();
}
echo json_encode($data );
include($app_path."include/footer.inc.php");