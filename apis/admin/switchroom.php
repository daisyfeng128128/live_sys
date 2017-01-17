<?php 
include('head.php');
header("Content-type:text/html;charset=utf-8");
if($_GET['roomnumber']){
	$rn=(int)$_GET['roomnumber'];
	$db->Execute("update room_config set is_big_room=is_big_room xor 1 where roomnumber='$rn'");
	operational_log(4,"修改大小房间切换",$_REQUEST);
}
$rs=$db->Execute("select a.*,b.nickname from room_config a,user b,bu_user_anchors p where a.roomnumber=b.usernumber and b.userid=p.userid and p.pass=1 and a.roomnumber!=0");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>大小房间切换</title>
</head>
<body screen_capture_injected="true">
<h1>大小房间切换</h1><ul>
<?php while($arr=$rs->FetchRow()){
?>
<li><?php echo $arr['nickname']?>(<?php echo $arr['roomnumber']?>),当前为<?php if($arr['is_big_room']==1){echo '大';}else{echo '小';} ?>房间 &nbsp <a href="?roomnumber=<?php echo $arr['roomnumber']?>">切换</a></li>
<?php } ?>
</ul>
</body>
</html>
<?php include('../../include/footer.inc.php');?>