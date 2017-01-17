<?php
//最新入驻";
$shows_new=$db->CacheGetArray(5,"select a.totalpoint,a.nickname,a.birthday,a.userid,a.city,b.roomnumber,b.showcover,c.num as viewernum,b.starttime,b.endtime from shows b , user a,viewernum_count c,applysign p ,room_config rc where rc.roomnumber=a.usernumber and a.userid=p.userid and a.totalpoint <= $point_array[3]  and p.pass=1 and b.roomnumber=c.roomnumber and b.showcover<>'' and b.lastdisconnect is null and a.userid=b.userid and b.endtime is null and rc.pwd is null order by c.num desc limit 13");
if(count($shows_new)<13){
	$tmpjoin=array();
	for($i=0;$i<count($shows_new);$i++){
		$tmpjoin[]=$shows_new[$i][roomnumber];
	}
	$noids=@join(',',$tmpjoin);
	if(!$noids){
		$noids=0;
	}
	$bot_guest = get_bot_guest_num($noids);
	$shows_new_ext=$db->CacheGetArray(5,"select * from(select a.totalpoint,a.nickname,a.birthday,a.city,a.userid,b.roomnumber,b.showcover 
	,b.starttime,b.endtime,'0' as viewernum from shows b , user a,applysign p 
	,room_config rc where rc.roomnumber=a.usernumber and  a.userid=p.userid and a.totalpoint <= $point_array[3] and p.pass=1 and b.showcover<>'' and a.userid=b.userid and b.roomnumber not in ($noids) and rc.pwd is null order by starttime  desc) as rows group by roomnumber order by endtime desc limit ".(13-count($shows_new)));
	$shows_new = (!empty($shows_new))?array_merge($shows_new,$shows_new_ext):$shows_new_ext;
}
$page_var['shows_new']=zhuboShowInfo($shows_new,$weekGiftUserid,$bot_guest);
