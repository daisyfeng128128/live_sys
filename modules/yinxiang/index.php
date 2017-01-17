<?php 
include("../../include/header.inc.php");
$roomnumber = (int)$_GET["roomnumber"];
$showinfo = $db->GetRow("select * from user where usernumber='{$roomnumber}'");
if(empty($showinfo)){
	echo "出错了";
	include($app_path."include/footer.inc.php");
	exit;
}
$showtype_list = array(1,2,3,4,5,6);
if(isset($_GET["action"]) && $_GET["action"]=="yinxiang"){
	$user=checklogin();
	if(empty($user)){
		echo "出错了";
		include($app_path."include/footer.inc.php");
		exit;
	}
	$showtype = (int)$_GET["showtype"];
	if(!in_array($showtype,$showtype_list)){
		echo "出错了";
		include($app_path."include/footer.inc.php");
		exit;
	}
	$db->Execute("insert into show_yinxiang(showuserid,userid,showtype)values('{$showinfo["userid"]}','{$user["userid"]}','{$showtype}')");
	if($db->Affected_Rows()==0){
		echo "您已经添加过印象了，不能再次添加";
	}else{
		echo "success";
	}
	include($app_path."include/footer.inc.php");
	exit;
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title><?php echo $page_var['site_name']?>_视频交友_视频聊天室_美女视频秀</title>
<script type="text/javascript" src="<?php echo $page_var['cdn_domain']?>/js/jquery-1.7.2.min.js"></script>
<style>
body{margin:0;}
.yinxiang{position:relative;width:454px;height:270px;background:transparent url(votebg.jpg) repeat scroll 0 0;}
.yinxiang .show_info{padding-left:10px;color:#fff;line-height:40px;}
.yinxiang .show_info .num1{color:#ffe911;}
.yinxiang .item2{position:absolute;color:#fff;text-align:center;font-size:20px;cursor:pointer;}
.yinxiang .item2.h80 .num2{display:inline-block;padding-top:20px;}
.yinxiang .item2.h165 .num2{display:inline-block;padding-top:50px;}
.yinxiang .item2.h245 .num2{display:inline-block;padding-top:30px;}
.yinxiang .rencaijiji{top:45px;left:10px;width:80px;height:80px;}
.yinxiang .gaoxiao{top:45px;left:95px;width:140px;height:80px;}
.yinxiang .meinvruyun{top:130px;left:10px;width:140px;height:80px;}
.yinxiang .taifengkuang{top:130px;left:155px;width:80px;height:80px;}
.yinxiang .taijinbao{top:45px;left:240px;width:130px;height:165px;}
.yinxiang .tianlanzhiyin{top:45px;left:375px;width:70px;height:165px;}
.yinxiang .show_bottom{position:absolute;width:100%;color:#b5a5ca;text-align:center;font-size:14px!important;}
.yinxiang .show_bottom.bottom1{bottom:30px;left:0;}
.yinxiang .show_bottom.bottom2{bottom:10px;left:0;}
</style>
<script>
function goyinxiang(showtype){
	$.get("?action=yinxiang&roomnumber=<?php echo $roomnumber;?>&showtype="+showtype,function(r){
		if(r=='success'){
			refreshShow();
			alert("添加成功");
		}
		else{
			alert(r);
		}
	});
}
function refreshShow(){
	$("#yinxiang").load("?action=refresh&roomnumber=<?php echo $roomnumber;?>");
}
</script>
</head>
<body>
<div id="yinxiang" class="yinxiang">
<?php 
$tmp1 = $db->GetArray("select showtype,count(*) num from show_yinxiang where showuserid='{$showinfo["userid"]}' GROUP BY showtype");
$data = array();
$data_sum = 0;
foreach($tmp1 as $value){
	if(!in_array($value["showtype"],$showtype_list)){
		continue;
	}
	$data[$value["showtype"]] = $value["num"];
	$data_sum+=$value["num"];
}

//返回百分比
function yinxiang100($s,$d,$t){
	if(isset($d[$t])){
		return floor(($d[$t]/$s)*100);
	}else{
		return 0;
	}
}

$html = '<div class="show_info">'.$showinfo["nickname"].'('.$roomnumber.') 共有<span class="num1">'.$data_sum.'</span>次印象</div>
	<div class="item2 h80 rencaijiji" onClick="goyinxiang(1)"><span class="num2" title="人才济济">'.yinxiang100($data_sum,$data,1).'%</span></div>
	<div class="item2 h80 gaoxiao" onClick="goyinxiang(2)"><span class="num2" title="搞笑死了">'.yinxiang100($data_sum,$data,2).'%</span></div>
	<div class="item2 h80 meinvruyun" onClick="goyinxiang(3)"><span class="num2" title="美女如云">'.yinxiang100($data_sum,$data,3).'%</span></div>
	<div class="item2 h80 taifengkuang" onClick="goyinxiang(4)"><span class="num2" title="太疯狂了">'.yinxiang100($data_sum,$data,4).'%</span></div>
	<div class="item2 h165 taijinbao" onClick="goyinxiang(5)"><span class="num2" title="太劲爆了">'.yinxiang100($data_sum,$data,5).'%</span></div>
	<div class="item2 h245 tianlanzhiyin" onClick="goyinxiang(6)"><span class="num2" title="天癞之音">'.yinxiang100($data_sum,$data,6).'%</span></div>
	<div class="show_bottom bottom1">房间只有注册用户才能添加印象哦!</div>
	<div class="show_bottom bottom2">每个用户只能使用一次!</div>';
	echo $html;
?>
</div>
</body>
</html>
<?php 
if(isset($_GET["action"]) && $_GET["action"]=="refresh"){
	ob_end_clean();
	echo $html;
}
include($app_path."include/footer.inc.php");?>