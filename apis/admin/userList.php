<?php 
include('head.php');
include('../../include/level.func.php');
$msg = $_GET["msg"];
if($_GET["act"]=="disable"){
	$db->Execute("UPDATE user SET isblock='{$_GET["isblockValue"]}' WHERE userid='{$_GET["userid"]}' limit 1");
	if($_GET["isblockValue"]=="1"){
		$msg = "该用户已被禁用!";
		operational_log(4,"禁用用户userid,{$_GET["userid"]}",$_REQUEST,$_GET["userid"]);
	}else{
		$msg = "该用户已启用!";
		operational_log(4,"启用用户userid,{$_GET["userid"]}",$_REQUEST,$_GET["userid"]);
	}
}
$where = " and u.accountfrom!=9";
if($_GET["userid"]){
	$where .= " and u.userid=".((int)$_GET["userid"]);
}
if($_GET["usernumber"]){
	$where .= " and u.usernumber=".((int)$_GET["usernumber"]);
}
if($_GET["clanid"]){
	$where .= " and u.clanid=".((int)$_GET["clanid"]);
}
if($_GET["agentid"]){
	$where .= " and u.agentid=".((int)$_GET["agentid"]);
}
if($_GET["username"]){
	$where .= " and u.username='".($_GET["username"])."'";
}
if($_GET["nickname"]){
	$where .= " and u.nickname='".($_GET["nickname"])."'";
}
if($_GET["email"]){
	$where .= " and u.email='".($_GET["email"])."'";
}
if($_GET["usertype"]){
	$where .= " and u.usertype='".((int)$_GET["usertype"])."'";
}
if($_GET["isblock"]){
	$where .= " and u.isblock='".((int)$_GET["isblock"])."'";
}
if($_GET["loginIP"]){
	$where .= " and u.lastloginip='".ip2long($_GET["loginIP"])."'";
}
if($_GET["begin"]){
	$where .= " and u.regtime>=".strtotime($_GET["begin"]);
}
if($_GET["end"]){
	$where .= " and u.regtime<=".(strtotime($_GET["end"])+86400-1);
}
$page = max((int) $_GET['p'], 1);
$limit = 15;
$start = ($page - 1) * $limit;
$where_limit = " limit $start, $limit";

$sql = "select * from user as u where 1=1 {$where} order by userid desc {$where_limit}";
$sql_count = "select count(*) from user as u where 1=1 {$where}";

$total = (int) $db->GetOne($sql_count);
$multi = multi($total, $page, $limit);
$p = new page($page, $multi["pages"], $limit);
$page_count = $p->return_array();

$data = $db->GetArray($sql);
//print_r($data);
$usertypeArr = array("0"=>"普通用户","9"=>"站长","8"=>"运营","6"=>"客服");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script src="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="/js/lib/jquery_ui/jquery-ui-1.8.12.custom.css">
<title>用户列表</title>
<script>
$(function(){
	$("#isblock option[value=<?php echo $_GET["isblock"]?>]").attr("selected","selected");
	$("#usertype option[value=<?php echo $_GET["usertype"]?>]").attr("selected","selected");
	$('.infotxt').datepicker({ dateFormat:'yy-mm-dd',changeMonth:true,changeYear: true});
});
</script>
</head>
<body>

<table width="99%" align="center" cellspacing="1" cellpadding="3" border="0">
	<tbody><tr class="head">
		<td width="30%" align="center">
			
			PlatForm Administrator</td>
	</tr>
</tbody></table>
<br>
<table width="99%" align="center" cellspacing="1" cellpadding="3" class="i_table">
    <tbody>
	<tr><td class="head" colspan="18"><b>用户列表</b></td></tr>
	<tr><td colspan="18">
	     <form action="?">
	           注册日期:<input type="text" class="infotxt" name="begin" value="<?php echo $_GET["begin"]?>" style="width:64px;"/>
				到:<input type="text" class="infotxt" name="end" value="<?php echo $_GET["end"]?>" style="width:64px;"/>
	           Userid:<input type="text" name="userid" id="userid" value="<?php echo $_GET["userid"]?>" style="width: 40px;"/>
	           视频号:<input type="text" name="usernumber" id="username" value="<?php echo $_GET["usernumber"]?>" style="width:80px;"/>
	           家族ID:<input type="text" name="clanid" id="clanid" value="<?php echo $_GET["clanid"]?>" style="width:40px;"/>
	           代理ID:<input type="text" name="agentid" id="agentid" value="<?php echo $_GET["agentid"]?>" style="width:40px;"/>
	           帐号:<input type="text" name="username" id="username" value="<?php echo $_GET["username"]?>" style="width:74px;"/>
	           昵称:<input type="text" name="nickname" id="nickname" value="<?php echo $_GET["nickname"]?>" style="width:74px;"/>
	           邮箱:<input type="text" name="email" id="email" value="<?php echo $_GET["email"]?>" style="width:74px;"/>
	          用户类型:<select id="usertype" name="usertype">
	       <option value="">请选择..</option>
		   <option value="0">普通用户</option>
		   <option value="8">运营</option>
	            </select>
	            账号状态<select id="isblock" name="isblock">
	              <option value="">请选择..</option>
	              <option value="0">正常</option>
	              <option value="1">冻结</option>
	            </select>
	            登录IP<input type="text" name="loginIP" id="loginIP" value="<?php echo $_GET["loginIP"]?>" style="width:90px;"/>  
	                <input type="submit" value="-查询-" class="input_k">
	     </form> 
	   </td></tr>
	<tr class="head_1">
	<td>用户UserID</td>
	<td>家族ID</td>
	<td>代理ID</td>
	<td>账号</td>
	<td>昵称</td>
	<td>视频号</td>
	<td>用户类型</td>
	<td>主播等级</td>
	<td>会员等级</td>
	<td>账户余额</td>
	<td><?php echo $page_var['money_name2']?>余额</td>
	<td>游戏币余额</td>
	<td>注册时间</td>
	<td>最后登录时间</td>
	<td>登录IP</td>
	<td>累计<?php echo $page_var['money_name2']?></td>
	<td>累计消费</td>
	<td>操作</td>
	</tr>
		<?php foreach ($data as $v):?>
		<tr class="b">
		<td><?php echo $v["userid"]?></td>
		<td><?php echo $v["clanid"]?></td>
		<td><?php echo $v["agentid"]?></td>
		<td><?php echo $v["username"]?></td>
		<td><?php echo $v["nickname"]?></td>
		<td><?php echo $v["usernumber"]?></td>
		<td><?php echo $usertypeArr[$v["usertype"]]?></td>
		<td><?php echo point2star($v["totalpoint"])?>星</td>
		<td><?php echo cost2rich($v["totalcost"])?>富</td>
		<td><?php echo $v["balance"]?></td>
		<td><?php echo $v["point"]?></td>
		<td><?php echo $v["gamemoney"]?></td>
		<td><?php echo date("Y-m-d H:i:s",$v["regtime"])?></td>
		<td><?php echo date("Y-m-d H:i:s",$v["lastlogin"])?></td>
		<td><?php echo long2ip($v["lastloginip"])?></td>
		<td><?php echo $v["totalpoint"]?></td>
		<td><?php echo $v["totalcost"]?></td>
		<td>
		<?php if($v["isblock"]=="1"):?>
			<a href="?userid=<?php echo $v["userid"]?>&act=disable&isblockValue=0">激活</a>
		<?php else:?>
			<a href="?userid=<?php echo $v["userid"]?>&act=disable&isblockValue=1">禁用</a>
		<?php endif;?>
		  <a target="_blank" href="userdetail.php?userid=<?php echo $v["userid"]?>">详细</a>
		  <a target="_blank" href="password_edit.php?usernumber=<?php echo $v["usernumber"]?>">修改密码</a>
		  <a target="_blank" href="user_opt.php?usernumber=<?php echo $v["usernumber"]?>&type=user">设置</a>
		  <a target="_blank" href="user_clear.php?userid=<?php echo $v["userid"]?>&type=user">清理</a>
		</td>
		</tr>
		
	</tr>
	<?php endforeach;?>
	<tr class="b"><td colspan="20">
<?php 
$get=null;
foreach ($_GET as $key=>$value) {
if($key=="p")continue;
	$get .= "&$key=$value";
}?>
		共<?php echo $multi["pages"]?>页 &nbsp;|&nbsp; 共<?php echo $multi["total"]?>条记录 &nbsp;|&nbsp; 当前<?php echo $multi["page"]?>/<?php echo $multi["pages"]?>
		<?php foreach ($page_count as $value):?>
		<a <?php if($page==$value)echo "class=active_page";?> href="?p=<?php echo $value?><?php echo $get?>"><?php echo $value?></a>&nbsp;
		<?php endforeach;?>
	     </td>
	</tr>
</tbody></table>
<?php if($msg):?>
<script>alert("<?php echo $msg?>");</script>
<?php endif;?>
</body>
</html>
<?php include('../../include/footer.inc.php');?>