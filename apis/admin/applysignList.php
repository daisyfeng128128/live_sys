<?php 
include('head.php');
include('../../include/level.func.php');
$msg = $_GET["msg"];
//$db->debug = true;
if($_GET["act"]=="pass"){
	$id = (int)$_GET["id"];
	$value = (int)$_GET["value"];
	$db->Execute("UPDATE bu_user_anchors SET pass='{$value}' WHERE id='{$id}' limit 1");
	$optuserid = $db->GetOne("select userid from bu_user_anchors where id='{$id}'");
	if($value=="0"){
		$msg = "取消通过成功!";
		operational_log(4,"主播取消申核通过userid,{$optuserid}",$_REQUEST,$optuserid);
	}else{
		$msg = "此主播已经通过审核!";
		operational_log(4,"主播申核通过userid,{$optuserid}",$_REQUEST,$optuserid);
	}
}
$where = "";
if($_GET["usernumber"]){
	$where .= " and u.usernumber=".((int)$_GET["usernumber"]);
}
if($_GET["nickname"]){
	$where .= " and u.nickname='".($_GET["nickname"])."'";
}
if($_GET["userid"]){
	$where .= " and u.userid='".((int)$_GET["userid"])."'";
}
if(isset($_GET["pass"]) && $_GET["pass"]!="-1"){
	$where .= " and a.pass='".((int)$_GET["pass"])."'";
}
$page = max((int) $_GET['p'], 1);
$limit = 15;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";

$sql = "select a.*,u.nickname,u.usernumber,u.totalpoint from user u,bu_user_anchors a where u.userid=a.userid {$where} order by a.id desc {$where_limit}";
$sql_count = "select count(*) from user u,bu_user_anchors a where u.userid=a.userid {$where}";

$total = (int) $db->GetOne($sql_count);
$multi = multi($total, $page, $limit);
$p = new page($page, $multi["pages"], $limit);
$page_count = $p->return_array();

$data = $db->GetArray($sql);

$end_time = time();
$start_time = $end_time-86400*7;
$_GET['begin'] = date('Y-m-d',$start_time);
$_GET['end'] = date('Y-m-d',$end_time);
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>签约管理</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
	<style>
		@charset "utf-8";
/* CSS Document */
.datepicker { border-collapse: collapse; border: 1px solid #ccc; position: absolute; }
.datepicker tr.controls th { height: 22px; font-size: 12px; }
.datepicker select { font-size: 12px; }
.datepicker tr.days th { height: 18px; }
.datepicker tfoot td { height: 18px; text-align: center; text-transform: capitalize; }
.datepicker th, .datepicker tfoot td { background: #eee; font: 10px/18px Verdana, Arial, Helvetica, sans-serif; }
.datepicker th span, .datepicker tfoot td span { font-weight: bold; }

.datepicker tbody td { width: 24px; height: 24px; border: 1px solid #ccc; font: 12px/22px Arial, Helvetica, sans-serif; text-align: center; background: #fff; }
.datepicker tbody td.date { cursor: pointer; }
.datepicker tbody td.date.over { background-color: #99ffff; }
.datepicker tbody td.date.chosen { font-weight: bold; background-color: #ccffcc; }
.red{color:red;}
	</style>
<script>
$(function(){
	$("#pass option[value=<?php echo $_GET["pass"]?>]").attr("selected","selected");
});
</script>
</head>
<body>

<table width="99%" align=center cellspacing=1 cellpadding=3 border=0>
	<tr class=head>
		<td width='30%' align=center>
			PlatForm Administrator</td>
	</tr>
</table>
<br />
<script type="text/javascript">
  function select(name,id){ 
    var value=name.value;
    if(value==1 || value==0){
    	location.href="?act=pass&id="+id+"&value="+value;
    }
  }
</script>
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
    <tr><td>
         <a href="applysignEdit.php"><b><span class="tal_01_01"></span><span class="tal_01_02">添加签约主播</span><span class="tal_01_03"></span></b></a>
         <a href="applyShowerCate.php"><b><span class="tal_01_01"></span><span class="tal_01_02">主播分类管理</span><span class="tal_01_03"></span></b></a>
         <a href="applyShowerAutoShow.php"><b><span class="tal_01_01"></span><span class="tal_01_02">判断主播为什么不在首页显示</span><span class="tal_01_03"></span></b></a>
    </td></tr>
    <tr><td class="head" colspan="15"><b>签约主播列表</b></td></tr>
	<tr><td colspan="15">
	     <form action="">
	          主播用户ID<input type="text" name="userid" id="userid" value="<?php echo $_GET["userid"]?>"/> 
	           视频号:<input type="text" name="usernumber" id="username" value="<?php echo $_GET["usernumber"]?>">
	           昵称:<input type="text" name="nickname" id="nickname" value="<?php echo $_GET["nickname"]?>">
	           状态<select id="pass" name="pass">
              <option value="-1">请选择..</option>
              <option value="0">未通过</option>
              <option value="1">已通过</option>
            </select>
	          <input type="submit" value="-查询-" class="input_k"/>
	     </form> 
	   </td></tr>
	 </table>
	<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr class="head_1">
	<td>签约编号</td>
	<td>主播ID用户</td>
	<td>视频号</td>
	<td>主播昵称</td>
	<td>主播等级</td>
	<td>真实姓名</td>
	<td>联系方式</td>
	<td>直播底薪</td>
	<td>审核状态</td>
	<td>在职否</td>
	<td>操作</td>
	</tr>
<?php foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["id"]?></td>
		<td><?php echo $v["userid"]?></td>
		<td><?php echo $v["usernumber"]?></td>
		<td><?php echo $v["nickname"]?></td>
		<td><?php echo point2star($v["totalpoint"])?>星</td>
		<td><?php echo $v["truename"]?></td>
		<td><?php echo $v["phone"]?></td>
		<td><?php echo $v["basicsalary"]?></td>
		<td><font color="green"><?php echo $v["pass"]=="1"?"审核通过":"<span class=red>未通过</span>";?></font></td>
		<td><font color="blue"><?php echo $v["status"]=="1"?"离职":"在职";?></font></td>
		<td>
		<?php if($v["pass"]=="0"):?>
			<a href="?act=pass&id=<?php echo $v["id"]?>&value=1">通过审核</a>
		<?php else:?>
			<a href="?act=pass&id=<?php echo $v["id"]?>&value=0">取消通过</a>
		<?php endif;?>
		    <a href="applysignEdit.php?id=<?php echo $v["id"]?>">修改</a>
			<a href="user_opt.php?usernumber=<?php echo $v["usernumber"]?>&type=show">设置主播等级</a>
		    <a href="uploadcover.php?usernumber=<?php echo $v["usernumber"]?>">上传封面</a>
		    <a href="applysignEditAgent.php?userid=<?php echo $v["userid"]?>">更改代理</a>
		    <a href="liveSta_more.php?userid=<?php echo $v["userid"]?>&begin=<?php echo $_GET['begin']?>&end=<?php echo $_GET['end']?>">直播记录</a>
			</td>
		</tr>
<?php endforeach;?>
	<tr class="b"><td colspan="15">
<?php 
$get=null;
foreach ($_GET as $key=>$value) {
if(in_array($key,array("p","act")))continue;
	$get .= "&$key=$value";
}?>
		共<?php echo $multi["pages"]?>页 &nbsp;|&nbsp; 共<?php echo $multi["total"]?>条记录 &nbsp;|&nbsp; 当前<?php echo $multi["page"]?>/<?php echo $multi["pages"]?>
		<?php foreach ($page_count as $value):?>
		<a <?php if($page==$value)echo "class=active_page";?> href="?p=<?php echo $value?><?php echo $get?>"><?php echo $value?></a>&nbsp;
		<?php endforeach;?>
	     </td>
	</tr>	
</table>
<script type="text/javascript">
  var msg=''
  if(msg!='')
  {
    alert(msg);
  }
</script>
<?php if($msg):?>
<script>alert("<?php echo $msg?>");</script>
<?php endif;?>
</body>
</html>
<?php include('../../include/footer.inc.php');?>