<?php
include('../../include/header.inc.php');
include('../../include/login.func.php');
header("Expires: Mon, 26 Jul 1970 05:00:00 GMT");      
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");      
header("Cache-Control: no-cache, must-revalidate");      
header("Pragma: no-cache");
$action=$_REQUEST['action'];
$return['action']=$action;

switch($action){
	case 'all_gifts': //所有手机可以送的礼物列表（android）
		$rs=$db->Execute("select * from giftcate where giftcateid not in(1,8,13,14) and isphone=0");
		while($arr=$rs->FetchRow()){
			$result[]=array('cateid'=>$arr['giftcateid'],'catename'=>$arr['catename'],'gifts'=>$db->GetArray("select * from gift where giftcateid='{$arr['giftcateid']}' and isphone=0"));
		}
		echo json_encode($result);
	break;
	case 'all_gifts_iphone': //所有手机可以送的礼物列表（iphone）
		//iphone礼物
		$cate1_name="幸运";
		$cate1_cateids="7";
		$cate2_name="普通";
		$cate2_cateids="2,3,4";
		$cate3_name="贵族";
		$cate3_cateids="6";
		$cate4_name="特殊";
		$cate4_cateids="9,12";
		$result[]=array('cateid'=>"1",'catename'=>$cate1_name,'gifts'=>$db->GetArray("select * from gift where giftcateid in ($cate1_cateids) and isphone=0"));
		$result[]=array('cateid'=>"2",'catename'=>$cate2_name,'gifts'=>$db->GetArray("select * from gift where giftcateid in ($cate2_cateids) and isphone=0"));
		$result[]=array('cateid'=>"3",'catename'=>$cate3_name,'gifts'=>$db->GetArray("select * from gift where giftcateid in ($cate3_cateids) and isphone=0"));
		$result[]=array('cateid'=>"4",'catename'=>$cate4_name,'gifts'=>$db->GetArray("select * from gift where giftcateid in ($cate4_cateids) and isphone=0"));
		echo json_encode($result);
	break;
	case 'get_gift_list'://所有手机可以送的礼物列表（废弃）
		//2345
		$result['gift1']=array();
		$result['gift2']=array();
		$result['gift3']=array();
		$result['gift4']=array();
		$rs=$db->Execute("select * from gift where giftcateid in(2,3,4,5)");
		while($arr=$rs->FetchRow()){
			$info=array('giftid'=>$arr['giftid'],'giftname'=>$arr['giftname']
				,'giftimage'=>"/static_data/gift/gift_".$arr['giftid'].".png"
				,'giftprice'=>$arr['giftprice']);
			if($arr['giftcateid']==2){
				$result['gift1'][]=$info;
			}
			else if($arr['giftcateid']==3){
				$result['gift2'][]=$info;
			}
			else if($arr['giftcateid']==4){
				$result['gift3'][]=$info;
			}
			else if($arr['giftcateid']==5){
				$result['gift4'][]=$info;
			}
		}
		echo json_encode($result);
	break;
	/*case 'subnewpassword':
		$userid=$db->GetOne("select userid from users where mobileno='{$_REQUEST['mobileno']}'");
		$vcode=$db->GetOne("select code from findpassword where userid='$userid' order by ts desc");
		if($vcode==$_REQUEST['vcode'] && $vcode!=""){
			$db->Execute("update users set password='$_REQUEST[password]' where userid='$userid'");
			$return['code']=200;
		}
		else{
			$return['code']=500;
		}
		echo json_encode($return);
		break;
	case 'findpassword':
		$userid=$db->GetOne("select userid from users where mobileno='{$_REQUEST['mobileno']}'");
		if($userid){
			$return['isok']=1;
			$token=rand(1000,9999);
			$db->Execute("insert into findpassword values($userid,$token,'".time()."')");
			$mobileno=$_REQUEST['mobileno'];
			$smstxt="您在麦友的验证码是".$token;
			include('sms.php');
		}
		else{
			$return['isok']=0;
		}
		echo json_encode($return);
		break;
	case 'send_gift':
		//giftid giftnum touserid roomnumber fromuserid
		//扣钱
		$giftid=$_GET['giftid'];
		$giftnum=$_GET['giftnum'];
		$touserid=$_GET['touserid'];
		$fromuserid=$_GET['fromuserid'];
		$roomnumber=$_GET['roomnumber'];
		$totalprice=$giftprice[$giftid]*$giftnum;
		$db->Execute("update users set balance=balance-$totalprice where balance>=$totalprice and userid='$fromuserid'");
		if($db->Affected_Rows()!=0){
			$db->Execute("INSERT INTO `my`.`giftlog` (`id`, `giftid`, `giftnum`, `fromuserid`, `touserid`, `roomnumber`,`totalprice`) VALUES (NULL, '$giftid', '$giftnum', '$fromuserid', '$touserid', '$roomnumber','$totalprice');");
			echo 'SGG'.$roomnumber.",|".$db->GetOne("select balance from users where userid='$fromuserid'");
		}
		else{
			echo 'SGF';
		}
		break;
	case 'join':
		echo '1|1';
		$type=$_REQUEST['type'];
		if($type=='join'){
			$db->Execute("insert into roomusers(roomid,userid)values('$_REQUEST[roomnumber]','$_REQUEST[userid]')");
		}
		else{
			$db->Execute("delete from roomusers where roomid='$_REQUEST[roomnumber]' and userid='$_REQUEST[userid]'");
			$db->Execute("delete from signinfo where userid='$_REQUEST[userid]'");
		}
		break;
	case 'giftlist':
		$userid=$_REQUEST['userid'];
		$return['code']="200";
		$rs=$db->Execute("select a.*,b.nickname from giftlog a,users b where a.touserid=$userid and a.fromuserid=b.userid order by ts desc");
		while($arr=$rs->FetchRow()){
			$arr['sendtime']=$arr['ts'];
			$return['response'][]=$arr;
		}
		echo json_encode($return);
		break;*/
	case 'showerlist'://主播排行（android）
		$return['code']="200";
		$rs=$db->Execute("SELECT sum( a.money*-1 ) AS totalprice, b.nickname,b.userid
FROM `balance_change_log` a, user b
WHERE a.touserid = b.userid
AND b.nickname <> ''
GROUP BY a.touserid
ORDER BY totalprice DESC 
LIMIT 10 ");
		$i=1;
		while($arr=$rs->FetchRow()){
			$arr['rank']=$i;
			$arr['type']="shower";
			$return['response'][]=$arr;
			$i++;
		}
		echo json_encode($return);
		break;
	case 'richerlist'://富豪排行（android）
		$return['code']="200";
		$rs=$db->Execute("SELECT sum( a.money*-1 ) AS totalprice, b.nickname,b.userid
FROM `balance_change_log` a, user b
WHERE a.userid = b.userid
AND b.nickname <> ''
GROUP BY a.userid
ORDER BY totalprice DESC 
LIMIT 10 ");
		$i=1;
		while($arr=$rs->FetchRow()){
			$arr['rank']=$i;
			$arr['type']="richer";
			$return['response'][]=$arr;
			$i++;
		}
		echo json_encode($return);
		break;
	case 'getuserlist'://获取在线用户列表
		include("../../include/level.func.php");
		$return['code']=200;
		$roomnumber=$_REQUEST['roomnumber'];
		
		$userinfo=checklogin();
		if($userinfo['viplevel']==3 || (!empty($userinfo['usernumber']) && $userinfo['usernumber']<10000)){//是黑vip或运营，看到ishide＝1的
			$aquery="";
		}else{
			$aquery="and a.ishide<>1";
		}
		$return['num']=$db->GetOne("select count(DISTINCT usernumber) from show_users a where roomnumber='$roomnumber' $aquery");
		$rs=$db->CacheSelectLimit(2,"select DISTINCT(a.usernumber) as anum,a.tietiao,b.totalcost,b.userid,b.usertype,b.viplevel,b.usernumber,b.nickname,c.medalname,c.clantype,b.medalvalid from show_users a left join user b on a.userid=b.userid left join clan c on b.clanid=c.clanid where  a.roomnumber='$roomnumber' $aquery  order by viplevel desc,totalcost desc",50);
		while($arr=$rs->FetchRow($rs)){
			$arr=safe_output($arr);
			$arr['richlevel']=cost2rich($arr['totalcost']);
			if($arr['medalvalid']>time() && $arr['medalname']!=""){
				$arr['medal']=$arr['medalname'];
			}
			if($arr['nickname']==""){
				//continue;
				$arr['nickname']="游客_".substr($arr['anum'],-5);
			}
			$user[]=$arr;
		}
		$return['user']=$user;
		echo json_encode($return);
		break;
	/*case 'getCitys':
		$return['province']=array('上海市','北京市','江苏省');
		$return['city']=array(
			array('上海市'),
			array('北京市'),
			array('无锡市','苏州市','南京市','常州市'),
		);
		$return['allcitys']=array('上海市','北京市','无锡市','苏州市','南京市','常州市');
		echo json_encode($return);
	break;*/
	case 'get_room_info'://获取房间信息
		include("../../include/level.func.php");
		$roomnumber=(int)$_GET['roomnumber'];
		$userinfo=checklogin();
		$showinfo=$db->GetRow("select 
		a.*,   
		b.starttime,b.id as showid,b.showtitle,b.sofa1num,b.sofa2num,b.sofa3num,b.sofa4num,b.sofa5num,b.sofa1userid,b.sofa2userid,b.sofa3userid,b.sofa4userid,b.sofa5userid,
		c.roomnumber as config_roomnumber,c.*,
		d.clanname ,d.medalname,d.clantype,d.leaderid,d.secondleaders,b.endtime
		from user a left join shows b on a.usernumber=b.roomnumber
		left join room_config c on c.roomnumber=a.usernumber 
		left join clan d on d.clanid=a.clanid 
		where a.usernumber='$roomnumber' ORDER BY b.id desc");
		$showinfo['endtime'] = empty($showinfo['endtime'])?"":$showinfo['endtime'];
		//level exchange
		$showinfo['starlevel']=point2star($showinfo['totalpoint']);
		$showinfo['richlevel']=cost2rich($showinfo['totalcost']);

		$showinfo['nextstar']=($showinfo['starlevel']!=count($point_array)-1)?($point_array[$showinfo['starlevel']+1]-$showinfo['totalpoint']):'0';
		$showinfo['nextrich']=($showinfo['richlevel']!=count($cost_array)-1)?($cost_array[$showinfo['richlevel']+1]-$showinfo['totalcost']):'0';
		//主播升级还差
		if($showinfo['nextstar']!=0){
			$showinfo['starshenji'] = $point_array[$showinfo['starlevel']+1]-$showinfo['totalpoint'];
			if($showinfo['starlevel']!=count($point_array)-1){
				$showinfo['starshenjiB'] = ($showinfo['totalpoint']-($point_array[$showinfo['starlevel']]))/(($point_array[$showinfo['starlevel']+1])-($point_array[$showinfo['starlevel']]))*100;
			}
			$showinfo['nextstarJ'] = $showinfo['starlevel']+1;
		}else{
			$showinfo['starshenji'] =0;
			$showinfo['starshenjiB']=100;
			$showinfo['nextstarJ'] = $showinfo['starlevel'];
		}
		//富豪升级还差
		if($showinfo['nextrich']!=0){
			$showinfo['nextstarJ'] = $showinfo['starlevel']+1;
			$showinfo['richshenji'] = $cost_array[$showinfo['richlevel']+1]-$showinfo['totalcost'];
			if($showinfo['richlevel']!=count($cost_array)-1){
				$showinfo['richshenjiB'] = ($showinfo['totalpoint']-($cost_array[$showinfo['richlevel']]))/(($cost_array[$showinfo['richlevel']+1])-($cost_array[$showinfo['richlevel']]))*100;
			}
			$showinfo['nextrichJ'] = $showinfo['richlevel']+1;
		}else{
			$showinfo['nextstarJ'] =0;
			$showinfo['richshenjiB']=100;
			$showinfo['nextrichJ'] = $showinfo['richlevel'];
		}
		//将沙发显示昵称
		if($showinfo['sofa1userid']){
			$showinfo['sofa1nickname']=$db->CacheGetOne(60,"select nickname from user where userid='{$showinfo['sofa1userid']}'");
		}else{
			$showinfo['sofa1nickname']="";
		}
		if($showinfo['sofa2userid']){
			$showinfo['sofa2nickname']=$db->CacheGetOne(60,"select nickname from user where userid='{$showinfo['sofa2userid']}'");
		}else{
			$showinfo['sofa2nickname']="";
		}
		if($showinfo['sofa3userid']){
			$showinfo['sofa3nickname']=$db->CacheGetOne(60,"select nickname from user where userid='{$showinfo['sofa3userid']}'");
		}else{
			$showinfo['sofa3nickname']="";
		}
		if($showinfo['sofa4userid']){
			$showinfo['sofa4nickname']=$db->CacheGetOne(60,"select nickname from user where userid='{$showinfo['sofa4userid']}'");
		}else{
			$showinfo['sofa4nickname']="";
		}
		if($showinfo['sofa5userid']){
			$showinfo['sofa5nickname']=$db->CacheGetOne(60,"select nickname from user where userid='{$showinfo['sofa5userid']}'");
		}else{
			$showinfo['sofa5nickname']="";
		}
		$showinfo['isfav']=$db->GetOne("select count(*) from bu_user_studio where showernumber='".$roomnumber."' and userid='{$userinfo["userid"]}'");
		echo json_encode($showinfo);
	break;
	/*case 'getvid';
		$info=$db->GetRow("select * from ktvs where id='$_REQUEST[ktvid]'");
		if($info['living']==0){
			$return['vid']="rtmp://down.suhexiu.com/suhexiu/jstest";
		}
		else{
			$return['vid']="rtmp://115.29.51.180/live/ktv".$_REQUEST[ktvid];
		}
		
		$shower=$db->GetRow("select * from users where userid=$info[showerid]");
		$return['vnickname']=$shower['nickname'];
		$return['vuserid']=$shower['userid'];
		$return['code']="200";
		echo json_encode($return);
		break;
	case 'getvodlist':
		$sql="select a.nickname,b.* from vod b,users a where a.userid=b.userid and b.ktvid='$_REQUEST[ktvid]'";
		$rs=$db->Execute($sql);
		$result=array();
		while($arr=$rs->FetchRow()){
			$result[]=$arr;
		}
		if(count($result)==0){
			$return['code']="404";
		}
		else{
			$return['code']="200";
		}
		$return['response']=$result;
		echo json_encode($return);
	break;
	case 'sendmessage':
		$return['code']="200";
		$fromid=$_REQUEST['fromid'];
		$toid=$_REQUEST['toid'];
		$msg=$_REQUEST['msg'];
		if(trim($msg)!=""){
			$db->Execute("insert into msg(fromid,toid,msg,isreaded,ts)values('$fromid','$toid','$msg','0','".time()."')");
			$return['info']['id']=$db->Insert_ID();
			$return['info']['toid']=$toid;
			$return['info']['fromid']=$fromid;
			$return['info']['msg']=$msg;
			$return['info']['ts']=time();
			echo json_encode($return);
			//发送通知
			//$apnstoken=$db->GetOne("select apnstoken from users where userid='$toid'");
			//if($apnstoken!=""){
				//$msgnum=$db->GetOne("select count(id) from msg where toid='$toid' and isreaded=0");
				//$url="http://www.5iu.org/my/apis/sendapns.php?token=$apnstoken&num=$msgnum";
				//file_get_contents($url);
			//}
		}
		
		
		break;
	case 'getlastmessage':
		$return['code']="200";
		$fromid=$_REQUEST['fromid'];
		$toid=$_REQUEST['toid'];
		$i=0;
		while(true){
			$i++;
			if($i==30){
				$return['code']='404';
				break;
			}
			$rs=$db->Execute("select * from msg where fromid='$fromid' and toid='$toid' and isreaded=0 order by ts asc");
			$lastid=0;
			if($rs->RecordCount()!=0){
				while($arr=$rs->FetchRow()){
					$lastid=$arr['id'];
					$return['info'][]=$arr;
				}
				break;
			}
			else{
				sleep(1);
			}
		}
		
		$db->Execute("update msg set isreaded=1 where id<=$lastid and fromid='$fromid' and toid='$toid'");
		echo json_encode($return);
		break;
	case 'detail':
		$id=$_REQUEST['id'];
		$sql="select * from ktvs where id='$id'";
		$row=$db->GetRow($sql);
		$return['action']=$action;
		$return['code']="200";
		$return['response']=$row;
		echo json_encode($return);
	break;*/
	case 'roomlist'://所有主播列表(android)
		$return['code']="200";
		$jsonstr=file_get_contents("http://{$_SERVER['SERVER_NAME']}/mobilelist.php");
		$result=json_decode($jsonstr,true);
		$return['response']=$result;
		echo json_encode($return);
	break;
	/*case 'list':
		$lat=$_REQUEST['lat'];
		$lon=$_REQUEST['lon'];
		if(!$lat){
			$lat=0;
		}
		if(!$lon){
			$lon=0;
		}
		$city=$_REQUEST['city'];
		$area=$_REQUEST['area'];
		$sql="select *,MyDistance($lat,$lon,lat,lon) as distance from ktvs where city='$city'";
		if($area!=''){
			$sql.=" and area = '$area'";
		}
		$sql.=" order by distance asc";
		$rs=$db->Execute($sql);
		$result=array();
		while($arr=$rs->FetchRow()){
			$arr['distance']=round($arr['distance'],2);
			$result[]=$arr;
		}
		$return['action']=$_REQUEST['action'];
		if(count($result)==0){
			$return['code']="404";
		}
		else{
			$return['code']="200";
		}
		$return['response']=$result;
		if($city=='上海'){
			$return['area']=array('卢湾区','黄浦区','静安区','徐汇区','虹口区','长宁路','普陀区','闸北区','杨浦区','浦东新区');
		}
		echo json_encode($return);
	break;
	case 'deleteplaze':
		$db->Execute("delete from plaze where id='$_REQUEST[itemid]'");
		$userid=$_REQUEST['userid'];
		$rs=$db->Execute("SELECT count(id) as n,fromid FROM `msg` where toid=$userid and isreaded=0 group by fromid");
		while($arr=$rs->FetchRow()){
			$unreaded[$arr[fromid]]=$arr['n'];
		}
		$sql="select a.nickname,b.* from plaze b,users a where a.userid=b.userid and b.endtime>".time()." order by b.id desc";
		$rs=$db->Execute($sql);
		$result=array();
		while($arr=$rs->FetchRow()){
			$arr['endtime']=date('Y-m-d G:i',$arr['endtime']);
			$arr['unreaded']=(int)($unreaded['userid']);
			$result[]=$arr;
		}
		$return['action']=$_REQUEST['action'];
		if(count($result)==0){
			$return['code']="404";
		}
		else{
			$return['code']="200";
		}
		$return['action']='plazelist';
		$return['response']=$result;
		echo json_encode($return);
	break;
	case 'plazelist':
		$userid=$_REQUEST['userid'];
		$rs=$db->Execute("select * from fav where userid1=$userid");
		while($arr=$rs->FetchRow()){
			$favusers[]=$arr['userid2'];
		}
		$rs=$db->Execute("SELECT count(id) as n,fromid FROM `msg` where toid=$userid and isreaded=0 group by fromid");
		while($arr=$rs->FetchRow()){
			$unreaded[$arr[fromid]]=$arr['n'];
		}
		$sql="select a.nickname,b.* from plaze b,users a where a.userid=b.userid and b.endtime>".time()." order by b.id desc";
		$rs=$db->Execute($sql);
		$result=array();
		while($arr=$rs->FetchRow()){
			if(in_array($arr[userid],$favusers)){
				$arr['isfav']=true;
			}
			else{
				$arr['isfav']=false;
			}
			$arr['endtime']=date('Y-m-d G:i',$arr['endtime']);
			$arr['unreaded']=(int)($unreaded['userid']);
			$result[]=$arr;
		}
		$return['action']=$_REQUEST['action'];
		if(count($result)==0){
			$return['code']="404";
		}
		else{
			$return['code']="200";
		}
		$return['response']=$result;
		echo json_encode($return);
	break;*/
	case 'register':
		$code="200";
		//if(strlen($_REQUEST['mobileno'])!='11'){
		//	$code="500";
		//	$info="请输入11位手机号";
		//}
		$_REQUEST[nickname] = urldecode($_REQUEST[nickname]);
		$pass=$db->GetOne("select password from user where username='{$_REQUEST['mobileno']}'");
		if($pass){
			$code="501";
			$info="您输入的邮箱已经存在";
		}
		$pass=$db->GetOne("select password from user where nickname='{$_REQUEST['nickname']}'");
		if($pass){
			$code="501";
			$info="您输入的昵称已经存在";
		}
		if($code=="200"){
			if(!$_REQUEST['gender']){
				$_REQUEST['gender']='0';
			}
			;
			$db->Execute("insert into user(nickname,username,password,regtime,lastlogin,lastloginip,unionid)values('$_REQUEST[nickname]','$_REQUEST[mobileno]','".password_deal($_REQUEST[password])."','".time()."','".time()."','".ip2long($_SERVER['REMOTE_ADDR'])."',0)");
			$userid=$db->Insert_ID();
			$usernumber=get_usernumber();
			$db->Execute("update user set usernumber='$usernumber' where userid='$userid'");
			$db->Execute("insert into user_number(number,userid)values('$usernumber','$userid')");
			$db->Execute("insert into giftstore(userid,giftid,num)values('$userid','1','10')");
			$return['userid']=$userid;
			$return['nickname']=$_REQUEST[nickname];
			$info=$userid;
		}
		$return['code']=$code;
		$return['info']=$info;
		$return['token']=logincookie(array('userid'=>$return['userid'],'usernumber'=>$usernumber,'nickname'=>$return['nickname']));
		echo json_encode($return);
	break;
	case 'loginbysns'://qq登陆（android）
		if(!$_REQUEST['gender']){
			$_REQUEST['gender']='0';
		}
		$return['code']="200";
		$row=$db->GetRow("select * from user where snsid='{$_REQUEST['snsid']}'");
		$userid=$row['userid'];
		if($row){
			$return['isexist']="1";
			$return['info']=$row;
			$return['userid']=$userid;
			
			//$db->Execute("update users set apnstoken='$_REQUEST[apnstoken]' where userid='$userid'");
		}
		else{
			$return['isexist']="0";
			register_by_opensns($_REQUEST['snstype'],$_REQUEST['snsid'],$_REQUEST['nickname'],$_REQUEST['avatar']);
			$row=$db->GetRow("select * from user where snsid='{$_REQUEST['snsid']}'");
			$return['info']=array('userid'=>$userid,'gender'=>$_REQUEST['gender'],'avatar'=>$_REQUEST['avatar'],'birthday'=>$_REQUEST['birthday'],'nickname'=>$_REQUEST['nickname'],'balance'=>0,'photo1'=>'','photo2'=>'','photo3'=>'','photo4'=>'');
		}
		$return['token']=logincookie($row);
		echo json_encode($return);
	break;
	case 'getuserinfo'://取得用户资料
			include("../../include/level.func.php");
			$user=checklogin();
			if(empty($user)){
				$userid = $_GET['userid'];
			}else{
				$userid = $user['userid'];
			}
            $return['code']="200";
            $userinfo=$db->GetRow("select totalcost,userid,usernumber,nickname,balance,gender,viplevel,birthday from user where userid='{$userid}'");
                //if($userid){
                //        $return['isexist']="1";
                //}
                //else{
                //        $return['isexist']="0";
                //        $db->Execute("insert into users(gender,avatar,birthday,nickname)values('{$_REQUEST['gender']}','{$_REQUEST['avatar']}','{$_REQUEST['birthday']}','{$_REQUEST['$
            //$userid=$db->Insert_ID();
            //$return['userid']=$userid;
			$userinfo['richlevel']=cost2rich($userinfo['totalcost']);
            $return['info']=$userinfo;
			//$return["info"]["token"]=logincookie($userinfo);
            //}
            echo json_encode($return);
        break;
	/*case 'focuslist':
		
		$return['code']="200";
		$type=$_REQUEST['type'];
		$userid=$_REQUEST['userid'];
		$rs=$db->Execute("SELECT count(id) as n,fromid FROM `msg` where toid=$userid and isreaded=0 group by fromid");
		while($arr=$rs->FetchRow()){
			$unreaded[$arr[fromid]]=$arr['n'];
		}
		if($type==1){//我关注的
			$rs=$db->Execute("select b.userid,b.nickname,b.avatar from fav a,users b where a.userid2=b.userid and a.userid1=$userid");
		}
		else{//关注我的
			$rs=$db->Execute("select b.userid,b.nickname,b.avatar from fav a,users b where a.userid1=b.userid and a.userid2=$userid");
		}
		$result=array();
		while($arr=$rs->FetchRow()){
			$row=$db->GetRow("select b.name from signinfo a,ktvs b where a.ktvid=b.id and a.userid='$arr[userid]' order by signts desc");
			if($row){
				$arr['online']=1;
				$arr['shop']=$row['name'];
			}
			else{
				$arr['online']=0;
				$arr['shop']="";
			}
			$arr['unreaded']=(int)($unreaded[$arr['userid']]);
			$result[]=$arr;
		}
		$return['response']=$result;
		echo json_encode($return);
	break;*/
	/*case 'switchfav':
		$userid=$_REQUEST['userid'];
		$selfuid=$_REQUEST['selfuid'];
		$return['code']="200";
		if($db->GetRow("select * from fav where userid1='$selfuid' and userid2='$userid'")){
			$db->Execute("delete from fav where userid1='$selfuid' and userid2='$userid'");
		}
		else{
			$db->Execute("insert into fav(userid1,userid2)values('$selfuid','$userid')");
		}
		echo json_encode($return);
		break;
	case 'profile':
		$userid=$_REQUEST['userid'];
                $return['code']="200";
                $userinfo=$db->GetRow("select * from users where userid='{$_REQUEST['userid']}'");
                $return['userid']=$userid;
                $return['info']=$userinfo;
                
				//是否已经关注
				$selfuid=$_REQUEST['selfuid'];
				if($db->GetRow("select * from fav where userid1='$selfuid' and userid2='$userid'")){
					$return['info']['focus']=1;
				}
				else{
					$return['info']['focus']=0;
				}
				//是否签到
				$row=$db->GetRow("select * from signinfo where userid='$userid' order by signts desc limit 1");
				if($row){
					$return['info']['hassign']=1;
					$return['info']['signinfo']=$row;
				}
				else{
					$return['info']['hassign']=0;
				}
                echo json_encode($return);
        break;
	case 'sign':
		$return['code']="200";
		$db->Execute("insert into signinfo (roomnumber,male,female,merge,accept,userid,signts,ktvid)values('$_REQUEST[roomnumber]','$_REQUEST[male]','$_REQUEST[female]','$_REQUEST[merge]','$_REQUEST[accept]','$_REQUEST[userid]','".time()."','$_REQUEST[ktvid]')");
		echo json_encode($return);
		break;*/
	case 'login':
		$userinfo=$db->GetRow("select * from user where username='{$_REQUEST['mobileno']}'");
		$pass=$userinfo['password'];
		unset($userinfo["password"]);
		if($pass==password_deal($_REQUEST['password'])){
			//$db->Execute("update user set apnstoken='$_REQUEST[apnstoken]' where mobileno='$_REQUEST[mobileno]'");
			$return['code']="200";
			$return['userid']=$userinfo['userid'];
			$return['info']=$userinfo;
			$return['token']=logincookie($userinfo);
		}
		else{
			$return['code']="401";
		}
		echo json_encode($return);
	break;
	case 'changepassword':
		$return['code']="200";
		$oldpassword=$db->GetOne("select password from users where userid='{$_REQUEST['userid']}'");
		if($oldpassword!=$_REQUEST['oldpassword']){
			$return["code"]="500";
			$return["info"]="您输入的旧密码不正确";
		}
		else{
			$db->Execute("update users set password='$_REQUEST[newpassword]' where userid='$_REQUEST[userid]'");
		}
		echo json_encode($return);
	break;
	case 'full'://http://www.wpy.demo2015.com/iumobile/apis/index.php?action=full&nickname=test123
	file_put_contents(("full.".date("YmdHis").rand(1, 100)), json_encode($_REQUEST));
		$userinfo=checklogin();
		if(!$userinfo){
			$return['code']="500";
			$return['info']="请先登录";
		}else{
			$userid=$userinfo['userid'];
			$nickname=$_REQUEST['nickname'];
			if($userinfo['nickname']==$nickname){
				$r="yes";
			}else{
				$r=check_nickname($nickname);
			}
			
			if($r!='yes'){
				$return['code']="500";
				$return['info']=$r;
			}
			else{
				$updateStr=array();
				$updateStr[]="nickname='$nickname'";
				$birthday=$_REQUEST['birthday'];
				$gender=$_REQUEST['gender'];
				if($birthday!=""){
					$updateStr[]="birthday='$birthday'";
				}
				if($_FILES["avatar"]["name"]){
					include($app_path.'include/path_config.php');
					$avatar_path=$avatar_path.substr($userid,0,1)."/";
					if(!file_exists($avatar_path)){
						mkdir($avatar_path,0755);
					}
					$uploadfile = $avatar_path.$userid.'.gif';
					$uploadfile_b = $avatar_path.'b_'.$userid.'.gif';
					exec('convert "'.$_FILES['avatar']['tmp_name'].'" -thumbnail "120x96^" -gravity center -extent "120x96" "'.$uploadfile.'"');
					exec('convert "'.$_FILES['avatar']['tmp_name'].'" -thumbnail "175x131^" -gravity center -extent "175x131" "'.$uploadfile_b.'"');
					@unlink($_FILES['avatar']['tmp_name']);
				}
				if($gender!=""){
					$updateStr[]="gender='$gender'";
				}
				
				$sql="update user set ".join(",",$updateStr)." where userid='$userid'";
			
				$db->Execute($sql);
				$return['code']="200";
			}
		}
		echo json_encode($return);
	break;
	case 'avatar_android':
		$HTTP_RAW_POST_DATA = isset($GLOBALS['HTTP_RAW_POST_DATA']) ? $GLOBALS['HTTP_RAW_POST_DATA'] : file_get_contents("php://input");
		if ($HTTP_RAW_POST_DATA) {
			$user=checklogin();
			$userid=$user[userid];
			$flux = $HTTP_RAW_POST_DATA;
			include('../../include/path_config.php');
			$avatar_path=$avatar_path.substr($userid,0,1)."/";
			if(!file_exists($avatar_path)){
				mkdir($avatar_path,0755);
			}
			$uploadfile_tmp = $avatar_path."tmp.".$userid.'tmp.jpg';
			$fp = fopen($uploadfile_tmp, "a");
			fwrite($fp, $flux);
			fclose($fp);
			$uploadfile = $avatar_path.$userid.'.gif';
			$uploadfile_b = $avatar_path.'b_'.$userid.'.gif';
			$uploaddir = '../upload/';
			exec('convert "'.$uploadfile_tmp.'" -thumbnail "120x96^" -gravity center -extent "120x96" "'.$uploadfile.'"');
			exec('convert "'.$uploadfile_tmp.'" -thumbnail "175x131^" -gravity center -extent "175x131" "'.$uploadfile_b.'"');
			@unlink($uploadfile_tmp);
		}
		//$ttt = json_encode($GLOBALS)."\n".json_encode($_GET)."\n".$uploadfile_tmp."\n".$HTTP_RAW_POST_DATA."\n";
		//file_put_contents("/var/www/site_9stvdir43/static_data/uploaddata/avatar/2/aa.txt",$ttt,FILE_APPEND);
	break;
	case 'avatar'://iphone上传头像
		$user=checklogin();
		$userid=$user[userid];
		if($_FILES["avatar"]["name"]){
				include('../../include/path_config.php');
				$avatar_path=$avatar_path.substr($userid,0,1)."/";
				if(!file_exists($avatar_path)){
					mkdir($avatar_path,0755);
				}
				$uploadfile = $avatar_path.$userid.'.gif';
				$uploadfile_b = $avatar_path.'b_'.$userid.'.gif';
				$uploaddir = '../upload/';
				exec('convert "'.$_FILES['avatar']['tmp_name'].'" -thumbnail "120x96^" -gravity center -extent "120x96" "'.$uploadfile.'"');
				exec('convert "'.$_FILES['avatar']['tmp_name'].'" -thumbnail "175x131^" -gravity center -extent "175x131" "'.$uploadfile_b.'"');
				@unlink($_FILES['avatar']['tmp_name']);
			
			//$sql="update user set ".join(",",$updateStr)." where userid='$userid'";
		
			//$db->Execute($sql);
			$return['code']="200";
		}
		echo json_encode($return);
	break;
	/*case 'pay'://现在无效了，以前给android用的，现在直接通过网页付款
		$coinid=$_REQUEST['coinid'];
		switch($coinid){
			case '0':
				$money=6;
			break;
			case '1':
				$money=18;
			break;
			case '2':
				$money=50;
			break;
			case '3':
				$money=108;
			break;
			case '4':
				$money=208;
			break;
			case '5':
				$money=1998;
			break;
		}
		$userid=$_REQUEST['userid'];
		$db->Execute("INSERT INTO `orders` (`orderid`, `userid`, `money`, `status`, `adddate`) VALUES (NULL, '$userid', '$money', '1', '".time()."')");
		$db->Execute("update users set balance=balance+$money where userid='$userid'");
		$return['balance']=$db->GetOne("select balance from users where userid='$userid'");
		$return['code']="200";
		echo json_encode($return);
	break;*/
	/*case 'vod':
		$userid=$_REQUEST['userid'];
		$roomno=$_REQUEST['roomno'];
		$words=$_REQUEST['words'];
		$ktvid=$_REQUEST['ktvid'];
		$db->Execute("update users set balance=balance-99 where balance>99 and userid='$userid'");
		if($db->Affected_Rows()!=0){
			$db->Execute("insert into vod(userid,roomno,words,ktvid)values('$userid','$roomno','$words','$ktvid')");
			$return['code']="200";
			$return['balance']=$db->GetOne("select balance from users where userid='$userid'");
		}
		else{
			$return['code']="500";
			$return['balance']=$db->GetOne("select balance from users where userid='$userid'");
		}
		echo json_encode($return);
	break;
	case 'plazepost':
		$db->Execute("insert into plaze(`userid`,`address`,`cost`,`actiondate`,`endtime`,`male`,`female`)values('{$_REQUEST['userid']}','{$_REQUEST['address']}','{$_REQUEST['cost']}','{$_REQUEST['actiondate']}','".strtotime($_REQUEST['endtime'])."','{$_REQUEST['male']}','{$_REQUEST['female']}')");
		$return['code']="200";
		echo json_encode($return);
	break;*/
	case 'update'://android检查更新
		$return['code']="404";
		$return['platform']=$_REQUEST['platform'];
		$return['url']="";
		echo json_encode($return);
	case 'alipay'://手机支付宝充值
		$return['code']=500;
		$return['info']="";
		$user=checklogin();
		if(!$user){
			$return["info"] = "请先登录";
			echo json_encode($return);
			include $app_path.'include/footer.inc.php';
			exit;
		}
		$money=(int)$_REQUEST['p3_Amt'];
		$channel=7;
		$balanceadd=$money*RMB_XNB*ALI_REDUCE;
		$orderid=payInsertOrders($user,$money,$channel,$balanceadd);

		$return["code"] = 200;
		$return["orderid"] = sprintf("%s%05d",date(Ymd),$orderid);
		echo json_encode($return);
	break;
}
include $app_path.'include/footer.inc.php';
?>