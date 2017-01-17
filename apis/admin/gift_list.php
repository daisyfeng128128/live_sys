<?php 
include('head.php');
include('../../include/level.func.php');
$msg = $_GET["msg"];
//$db->debug = true;
if($_REQUEST["action"]=="del"){
	if(!empty($_GET[giftid])){
		$row = $db->GetRow("delete from gift where giftid='$_GET[giftid]'");
		operational_log(5,"删除礼物id{$_GET[giftid]}",$_REQUEST);
		unset($_GET["giftid"]);
		$msg = "操作成功";
	}
}else if($_REQUEST["action"]=="clear"){
	//$db->CacheFlush("select * from gift order by giftcateid asc,giftid asc");
	//$db->CacheFlush("select * from gift");
	$db->CacheExecute(1,"select * from giftcate order by giftcateid asc");
	$db->CacheExecute(1,"select * from gift order by giftcateid asc,giftid asc");
	$db->CacheExecute(1,"select * from gift");
	//成功后重新生成一下礼物图片
	@file_get_contents("http://"._SITE_URL_."/tools/makegift.php");
	$msg = "清除缓存操作成功";
	operational_log(4,"清除礼物缓存",$_REQUEST);
}
$where = null;
if(isset($_GET["giftcateid"]) && $_GET["giftcateid"]!=""){
	$catename = $db->GetOne("select catename from giftcate where giftcateid=".((int)$_GET["giftcateid"]));
	if($catename=="内部礼物"){
		$where .= " and g.giftcateid=0";
	}else{
		$where .= " and c.giftcateid=".((int)$_GET["giftcateid"]);
	}
}
if($_GET["giftid"]){
	$where .= " and g.giftid=".((int)$_GET["giftid"]);
}
if($_GET["giftname"]){
	$where .= " and g.giftname like '%".($_GET["giftname"])."%'";
}
$page = max((int) $_GET['p'], 1);
$limit = 15;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";

$sql = "select g.*,c.catename,c.commission from gift g left join giftcate c on g.giftcateid=c.giftcateid where 1=1 {$where} order by giftid desc {$where_limit}";
$sql_count = "select count(*) from gift g left join giftcate c on g.giftcateid=c.giftcateid where 1=1 {$where}";

$total = (int) $db->GetOne($sql_count);
$multi = multi($total, $page, $limit);
$p = new page($page, $multi["pages"], $limit);
$page_count = $p->return_array();

$data = $db->GetArray($sql);
//print_r($data);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>礼物列表</title>
<script>
$(function(){
	<?php foreach ($_GET as $k=>$v):?>
	$("#<?php echo $k?>").val("<?php echo $v?>");
	<?php endforeach;?>
});
</script>
</head>
<body>
<div class="pageexplain">礼物是直播间向主播赠送的虚拟物品,直播间的彩条、飞屏、广播，及商城中的VIP、守护、座驾、道具也称为礼物，可以找开对应的礼物修改它的价格；普通礼物可以删除，系统、内部礼物分类下的礼物要谨慎删除。</div>
<table width="99%" align="center" cellspacing="1" cellpadding="3" class="i_table">
    <tbody><tr><td colspan="18">
    <b><a href="gift_cate_list.php"><span class="tal_01_01"></span><span class="tal_01_02">礼物分类管理</span><span class="tal_01_03"></span></a>
    <a href="gift_edit.php"><span class="tal_01_01"></span><span class="tal_01_02">添加礼物</span><span class="tal_01_03"></span></a>
    <a href="?action=clear"><span class="tal_01_01"></span><span class="tal_01_02">清空礼物缓存</span><span class="tal_01_03"></span></a>
	<span style="color:red">编辑完礼物后，点击清空礼物缓存，否则修改后的数据无法及时显示</span>
	</b>
	   </td></tr>
	<tr><td class="head" colspan="18"><b>用户列表</b></td></tr>
	<tr><td colspan="18">
	     <form action="?">
	           礼物编号:<input type="text" name="giftid" id="giftid" value="<?php echo $_GET["giftid"]?>">
	           礼物名:<input type="text" name="giftname" id="giftname" value="<?php echo $_GET["giftname"]?>">
	            礼物分类<select id="giftcateid" name="giftcateid">
	              <option value="">请选择</option>
<?php 
$giftcate = $db->GetArray("select * from giftcate");
foreach ($giftcate as $value):?>
<option value="<?php echo $value["giftcateid"]?>"><?php echo $value["catename"]?></option>
<?php endforeach;?>
	            </select>
	                <input type="submit" value="-查询-" class="input_k">
	     </form> 
	   </td></tr>
	<tr class="head_1">
	<td>礼物编号</td>
	<td>礼物名称</td>
	<td>礼物类别</td>
	<td>礼物价格</td>
	<td>礼物图片路径</td>
	<td>礼物动画路径</td>
<?php if(_IS_PHONE_):?>
	<td>手机上显示</td>
<?php endif;?>
	<td>操作</td>
	</tr>
		<?php foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["giftid"]?></td>
		<td><?php echo $v["giftname"]?></td>
		<td><?php echo $v["catename"]?></td>
		<td><?php echo $v["giftprice"]?></td>
		<td><?php echo $v["giftimage"]?></td>
		<td><?php echo $v["giftflash"]?></td>
<?php if(_IS_PHONE_):?>
		<td><?php echo empty($v["isphone"])?"显示":"不显示"?></td>
<?php endif;?>
		<td>
		  <a href="gift_edit.php?giftid=<?php echo $v["giftid"]?>"><img src="../images/root/bdttn.png" style="width: 46px; height:20px;"></a>
		  <a href="?action=del&giftid=<?php echo $v["giftid"]?>" onclick="return confirm('确定要删除记录吗?')"><img src="../images/root/bbttn.png" style="width: 46px; height:20px;"></a>
		</td>
		</tr>
		
	</tr>
	<?php endforeach;?>
	<tr class="b"><td colspan="18">
<?php 
$get=null;
foreach ($_GET as $key=>$value) {
if($key=="p")continue;
	$get .= "&$key=$value";
}
?>
		共<?php echo $multi["pages"]?>页 &nbsp;|&nbsp; 共<?php echo $multi["total"]?>条记录 &nbsp;|&nbsp; 当前<?php echo $multi["page"]?>/<?php echo $multi["pages"]?>
		<?php foreach ($page_count as $value):?>
		<a <?php if($page==$value)echo "class=active_page";?> href="?p=<?php echo $value?><?php echo $get?>"><?php echo $value?></a>&nbsp;
		<?php endforeach;?>
	     </td>
	</tr>	
	
</tbody></table>
<center>
<blockquote><hr class="hr" size="1">

</blockquote><br>
</center>
<?php if($msg):?>
<script>alert("<?php echo $msg?>");</script>
<?php endif;?>
</body>
</html>
<?php include('../../include/footer.inc.php');?>