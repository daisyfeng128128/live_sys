<?php 
include('head.php');
include_once($app_path."include/level.func.php");
//$db->debug = true;
if($_POST["action"]=="save"){
	
	$res_array = array();
	$res_array["level"] = (int)$_POST["level"];
	$res_array["name"] = $_POST["name"];
	$res_array["value"] = (int)$_POST["value"];
	$res = $db->GetRow("select * from jifen_tixian_conf where level='{$res_array["level"]}'");
	if(!$res){
		$db->Execute("INSERT INTO `jifen_tixian_conf` (`level`)VALUES ('{$res_array["level"]}')");
	}
	$db->Execute("UPDATE jifen_tixian_conf SET {$res_array["name"]}='{$res_array["value"]}' WHERE level='{$res_array["level"]}' limit 1");
	if($db->Affected_Rows()>0){
		$res_array["txt"] = "保存成功";
		operational_log(4,"修改主播提现",$_REQUEST);
	}else{
		$res_array["txt"] = "保存失败";
	}
	echo json_encode($res_array);
	
	//清空缓存
	$db->CacheExecute(1,"select * from jifen_tixian_conf where level='{$res_array["level"]}'");
	
	include('../../include/footer.inc.php');
	exit;
}
$arr = $db->GetArray("select * from jifen_tixian_conf");
$data = array();
foreach ($arr as $v){
	$data[$v["level"]] = $v;
}
include('../../include/footer.inc.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>主播<?php echo $page_var['money_name2']?>提现配置</title>
<style>p.a{padding-left:10px}</style>
<script>
$(function(){
	//change
	$("[name=jifen_tixian],[name=xnb_ti_min]").bind('input propertychange', function() {
	//	gogogo($(this));
	});
	
	$("[name=jifen_tixian],[name=xnb_ti_min]").change( function() {
	  gogogo($(this));
	});
});
function gogogo(t){
	var level=t.attr("level");
	var name=t.attr("name");
	var value=t.val();
	$.post("?", {action:"save",level:level,name:name,value:value},function(data){
		$("#span_level_"+data.level).html(data.txt);
		$("[name="+data.name+"][level="+data.level+"]").val(data.value);
	},"json");
}
</script>
</head>
<body>
<p class="a">修改完成后会及时存</p>
<form action="" method="post">
<input type="hidden" name="type" value="save"/>
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
<tr class="head_1"><td>主播等级</td><td>提现比例,最低提现</td><td></td></tr>
<?php foreach ($point_array as $key => $value):
if(isset($data[$key])){
	$jifen_tixian = $data[$key]["jifen_tixian"];
	$xnb_ti_min = $data[$key]["xnb_ti_min"];
}else{
	$jifen_tixian = JF_TIXIAN_TEMP;
	$xnb_ti_min = XNB_TI_MIN_TEMP;
}
?>
<tr class="b"><td><?php echo $key?>级: </td><td>
提现比例<input type="text" name="jifen_tixian" value="<?php echo $jifen_tixian?>" level="<?php echo $key?>"/>
,
最低提现<?php echo $page_var['money_name2']?><input type="text" name="xnb_ti_min" value="<?php echo $xnb_ti_min?>" level="<?php echo $key?>"/>
<span class="red" id="span_level_<?php echo $key?>"></span>
</td></tr>
<?php endforeach;?>
    </table>
</form>

<?php if(!empty($info)):?>
<script>
alert('<?php echo $info?>');
</script>
<?php endif;?>

</body>
</html>
