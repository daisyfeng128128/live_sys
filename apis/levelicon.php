<?php
include('../include/header.inc.php');
include('../include/level.func.php');
$userid=(int)$_GET['userid'];
$usernumber=(int)$_GET['usernumber'];
$info=$db->GetRow("select totalcost,totalpoint from user where userid='$userid' or usernumber='$usernumber'");
if($_GET['type']=='fh'){
	$img=rich2img($info['totalcost']);
}
else{
	$img=point2img($info['totalpoint']);
}
header("Location:$img");
include('../include/footer.inc.php');
function rich2img($totalcost){
	$l=cost2rich($totalcost);
	if($l==0){
		$img="http://img.kainei.com/images/fhicon/rich/pm1.gif";
	}
	else if($l==1){
		$img="http://img.kainei.com/images/fhicon/rich/pm2.gif";
	}
	else if($l==2){
		$img="http://img.kainei.com/images/fhicon/rich/pm3.gif";
	}
	else if($l==3){
		$img="http://img.kainei.com/images/fhicon/rich/pm4.gif";
	}
	else if($l==4){
		$img="http://img.kainei.com/images/fhicon/rich/pm5.gif";
	}
	else if($l==5){
		$img="http://img.kainei.com/images/fhicon/rich/nj1.gif";
	}
	else if($l==6){
		$img="http://img.kainei.com/images/fhicon/rich/nj2.gif";
	}
	else if($l==7){
		$img="http://img.kainei.com/images/fhicon/rich/nj3.gif";
	}
	else if($l==8){
		$img="http://img.kainei.com/images/fhicon/rich/nj4.gif";
	}
	else if($l==9){
		$img="http://img.kainei.com/images/fhicon/rich/nj5.gif";
	}
	else if($l==10){
		$img="http://img.kainei.com/images/fhicon/rich/zj1.gif";
	}
	else if($l==11){
		$img="http://img.kainei.com/images/fhicon/rich/zj2.gif";
	}
	else if($l==12){
		$img="http://img.kainei.com/images/fhicon/rich/zj3.gif";
	}
	else if($l==13){
		$img="http://img.kainei.com/images/fhicon/rich/zj4.gif";
	}
	else if($l==14){
		$img="http://img.kainei.com/images/fhicon/rich/zj5.gif";
	}
	else if($l==15){
		$img="http://img.kainei.com/images/fhicon/rich/bj1.gif";
	}
	else if($l==16){
		$img="http://img.kainei.com/images/fhicon/rich/bj2.gif";
	}
	else if($l==17){
		$img="http://img.kainei.com/images/fhicon/rich/bj3.gif";
	}
	else if($l==18){
		$img="http://img.kainei.com/images/fhicon/rich/bj4.gif";
	}
	else if($l==19){
		$img="http://img.kainei.com/images/fhicon/rich/bj5.gif";
	}
	else if($l==20){
		$img="http://img.kainei.com/images/fhicon/rich/hj1.gif";
	}
	else if($l==21){
		$img="http://img.kainei.com/images/fhicon/rich/hj2.gif";
	}
	else if($l==22){
		$img="http://img.kainei.com/images/fhicon/rich/hj3.gif";
	}
	else if($l==23){
		$img="http://img.kainei.com/images/fhicon/rich/hj4.gif";
	}
	else if($l==24){
		$img="http://img.kainei.com/images/fhicon/rich/hj5.gif";
	}
	else if($l==25){
		$img="http://img.kainei.com/images/fhicon/rich/gj1.gif";
	}
	else if($l==26){
		$img="http://img.kainei.com/images/fhicon/rich/gj2.gif";
	}
	else if($l==27){
		$img="http://img.kainei.com/images/fhicon/rich/gj3.gif";
	}
	else if($l==28){
		$img="http://img.kainei.com/images/fhicon/rich/gj4.gif";
	}
	else if($l==29){
		$img="http://img.kainei.com/images/fhicon/rich/gj5.gif";
	}
	return $img;
}
function point2img($totalpoint){
	$l=point2star($totalpoint);
	if($l==0){
		$img="http://img.kainei.com/images/fhicon/star/rookie1.gif";
	}
	else if($l==1){
		$img="http://img.kainei.com/images/fhicon/star/rookie2.gif";
	}
	else if($l==2){
		$img="http://img.kainei.com/images/fhicon/star/rookie3.gif";
	}
	else if($l==3){
		$img="http://img.kainei.com/images/fhicon/star/rookie4.gif";
	}
	else if($l==4){
		$img="http://img.kainei.com/images/fhicon/star/rookie5.gif";
	}
	else if($l==5){
		$img="http://img.kainei.com/images/fhicon/star/actress1.gif";
	}
	else if($l==6){
		$img="http://img.kainei.com/images/fhicon/star/actress2.gif";
	}
	else if($l==7){
		$img="http://img.kainei.com/images/fhicon/star/actress3.gif";
	}
	else if($l==8){
		$img="http://img.kainei.com/images/fhicon/star/actress4.gif";
	}
	else if($l==9){
		$img="http://img.kainei.com/images/fhicon/star/actress5.gif";
	}
	else if($l==10){
		$img="http://img.kainei.com/images/fhicon/star/idol1.gif";
	}
	else if($l==11){
		$img="http://img.kainei.com/images/fhicon/star/idol2.gif";
	}
	else if($l==12){
		$img="http://img.kainei.com/images/fhicon/star/idol3.gif";
	}
	else if($l==13){
		$img="http://img.kainei.com/images/fhicon/star/idol4.gif";
	}
	else if($l==14){
		$img="http://img.kainei.com/images/fhicon/star/idol5.gif";
	}
	else if($l==15){
		$img="http://img.kainei.com/images/fhicon/star/star1.gif";
	}
	else if($l==16){
		$img="http://img.kainei.com/images/fhicon/star/star2.gif";
	}
	else if($l==17){
		$img="http://img.kainei.com/images/fhicon/star/star3.gif";
	}
	else if($l==18){
		$img="http://img.kainei.com/images/fhicon/star/star4.gif";
	}
	else if($l==19){
		$img="http://img.kainei.com/images/fhicon/star/star5.gif";
	}
	else if($l==20){
		$img="http://img.kainei.com/images/fhicon/star/king1.gif";
	}
	else if($l==21){
		$img="http://img.kainei.com/images/fhicon/star/king2.gif";
	}
	else if($l==22){
		$img="http://img.kainei.com/images/fhicon/star/king3.gif";
	}
	else if($l==23){
		$img="http://img.kainei.com/images/fhicon/star/king4.gif";
	}
	else if($l==24){
		$img="http://img.kainei.com/images/fhicon/star/king5.gif";
	}
	return $img;
}