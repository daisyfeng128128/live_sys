<?php 
//www.wpy.suhexiu.com/apis/levelImg.php?u=2182&t=1
include('../include/header.inc.php');
$userid = (int)$_GET["u"];
$t = (int)$_GET["t"];
include('../include/level.func.php');
//富豪等级
if($t == "1"){
	$totalcost = $db->CacheGetOne(60,"select totalcost from user where userid='$userid'");
	if(empty($totalcost))
		$totalcost=0;
	$level = cost2rich($totalcost);
	//if(empty($level)){
	//	header("Location:/images/h19.png");
	//}else{
		//header("Location:/img/lvv2/user/V$level.gif");
		header("Location:/img/lvv2/user/V$level.gif");
	//}
}
//主播等级
else if($t=="2"){
	$totalpoint = $db->CacheGetOne(60,"select totalpoint from user where userid='$userid'");
	if(empty($totalpoint))
		$totalpoint=0;
	$level = point2star($totalpoint);
	if(empty($level))
		header("Location:/images/h19.png");
	else{
		//因为图片的命名不一样，所以对应的转换一下
		$arr = array(1=>"1-1.png",2=>"1-2.png",3=>"1-3.png",4=>"2-1.gif",5=>"2-2.gif",6=>"2-3.gif",7=>"3-1.gif",8=>"3-2.gif",9=>"3-3.gif",10=>"4-1.gif",11=>"4-2.gif",12=>"4-3.gif",13=>"5-1.gif",14=>"5-2.gif",15=>"5-3.gif");
		$tmp = $arr[$level];
		header("Location:/img/lvv2/shower/$tmp");
	}
}
//新人王
else if($t=="3"){
	$xinren = $db->CacheGetRow(60,"select xinren,xinren_vailddate from user where userid='$userid'");
	
	if($xinren["xinren"]=="1" && $xinren["xinren_vailddate"]>time()){
		header("Location:/images/xinrensmall.png");
	}else{
		header("Location:/images/h19.png");
	}
}
//<img src="/images/xinren.png" title="新人王">
include('../include/footer.inc.php');