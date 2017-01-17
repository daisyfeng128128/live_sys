<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include('../include/header.inc.php');
$roomnumber=(int)$_GET['roomnumber'];
$showinfo=$db->CacheGetRow(10,"select 
	a.*,
	b.starttime,b.id as showid,b.showtitle,b.sofa1num,b.sofa2num,b.sofa3num,b.sofa4num,b.sofa5num,b.sofa1userid,b.sofa2userid,b.sofa3userid,b.sofa4userid,b.sofa5userid,
	c.roomnumber as config_roomnumber,c.*,
	d.clanname ,d.medalname,d.clantype
	from user a left join shows b on a.usernumber=b.roomnumber AND b.endtime IS NULL 
	left join room_config c on c.roomnumber=a.usernumber 
	left join clan d on d.clanid=a.clanid 
	where a.usernumber='$roomnumber' and b.endtime is null");

/*$showinfo=$db->CacheGetRow(10,"select 
	a.*,
	b.starttime,b.id as showid,b.showtitle,b.sofa1num,b.sofa2num,b.sofa3num,b.sofa4num,b.sofa5num,b.sofa6num,b.sofa1userid,b.sofa2userid,b.sofa3userid,b.sofa4userid,b.sofa5userid,b.sofa6userid,
	c.roomnumber as config_roomnumber,c.*,
	d.clanname ,d.medalname,d.clantype
	from user a left join shows b on a.usernumber=b.roomnumber AND b.endtime IS NULL 
	left join room_config c on c.roomnumber=a.usernumber 
	left join clan d on d.clanid=a.clanid 
	where a.usernumber='$roomnumber' and b.endtime is null");*/
echo json_encode($showinfo);
include('../include/footer.inc.php');
?>