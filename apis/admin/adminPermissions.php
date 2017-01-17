<?php 
include('head.php');
//$db->debug = true;
$msg = $_GET["msg"];
$id=(int)$_REQUEST["id"];
if($_POST["action"]=="per"){
	$db->Execute("delete from rootrights where rootid=$id");
	if(!empty($_REQUEST["ckbox"])){
		foreach($_REQUEST["ckbox"] as $value){
			$db->Execute("INSERT INTO `rootrights`(rootid,`strurl`) VALUES ('$id', '$value')");
		}
	}
	operational_log(4,"修改管理员权限id,{$id}",$_REQUEST);
	$msg = "操作成功!";
}
$rootadmin = $db->GetRow("select * from rootadmin where ID=$id");
$rootrights = $db->GetArray("select strurl from rootrights where rootid=$id");
$strurl = "";
foreach($rootrights as $value){
	$strurl .= "input[value='$value[strurl]'],";
}
$strurl = trim($strurl,",");
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>管理员权限设置</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<link rel="stylesheet" type="text/css" href="style.css">
	<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<script>
$(function(){
	$("<?php echo $strurl?>").attr("checked",true);
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
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr><td class="head" colspan="4"><b>权限管理</b></td></tr>
	<form action="?id=<?php echo $rootadmin["ID"]?>" method="post" name="myform">
	<tr class="b">
	<td colspan="4">
		<input type="hidden" name="action" value="per"/>
	     <b>管理员用户&nbsp;&nbsp;</b><b>ID:<?php echo $rootadmin["ID"]?>,名称:<span class="red"><?php echo $rootadmin["ADMINNAME"]?></span></b>
	</td>
	</tr>
	<tr class="b">
	<td colspan="4">
	     <b class="red">选中是无权限</b>
	</td>
	</tr>
	<tr class="b">
	<td colspan="1" width="5%;"><font color="blue">管理菜单</font></td>
	<td colspan="3">
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/gift_list.php"/>礼物管理
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/news.php"/>新闻管理
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/helps.php"/>帮助管理
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/clan_list.php"/>家族列表
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/agent_list.php"/>代理管理
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/badwords.php"/>屏蔽词汇
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/pic_banner.php"/>图片广告
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/global_config.php"/>网站配置
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/global_announcement.php"/>发布公告
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/global_config_phone.php"/>手机配置
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/game_car_admin.php"/>车行游戏管理
	    <!--<input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/game_buyu_config.php"/>捕鱼抽水设置
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/game_farm_admin.php"/>鸡同鸭讲游戏管理
	   -->
	</td>
	</tr>
	<tr class="b">
	<td colspan="1" width="5%;"><font color="blue">用户管理</font></td>
	<td colspan="3">
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/userList.php"/>用户管理
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/add_money.php"/>会员加钱
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/daoju_vip.php"/>VIP查询
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/daoju_number.php"/>靓号查询
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/daoju_guard.php"/>守护查询
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/daoju_car.php"/>座驾查询
	</td>
	</tr>
		<tr class="b">
	<td colspan="1" width="5%;"><font color="blue">直播管理</font></td>
	<td colspan="3">
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/user_give_number.php"/>赠送靓号
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/backbuttynumber.php"/>回收靓号
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/applysignList.php"/>主播管理
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/applyShowerCate.php"/>分类管理
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/zhibo_zhubo.php"/>正在直播所有房间
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/usernumber_edit.php"/>主播靓号修改
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/switchroom.php"/>大小房间切换
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/access_permission.php"/>房间权限设置
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/jifen_tixian_conf.php"/>主播提现配置
	</td>
	</tr>
	<tr class="b">
	<td colspan="1" width="5%;"><font color="blue">联盟信息</font></td>
	<td colspan="3">
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/union_list.php"/>联盟管理
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/union_statistics.php"/>联盟统计
	</td>
	</tr>
	<tr class="b">
	<td colspan="1" width="5%;"><font color="blue">数据分析</font></td>
	<td colspan="3">
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/balance_change_log.php"/>充值消费
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/reg_count.php"/>注册统计
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/orders_sta.php"/>充值统计
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/orders_list.php"/>充值记录
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/exchange_log.php"/>兑换记录
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/phone_download_statistics.php"/>手机统计
	</td>
	</tr>
	<tr class="b">
	<td colspan="1" width="5%;"><font color="blue">财务管理</font></td>
	<td colspan="3">
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/liveSta.php"/>主播直播统计
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/drawcash_list.php"/>提现管理
	</td>
	</tr>
	<tr class="b">
	<td colspan="1" width="5%;"><font color="blue">管理员</font></td>
	<td colspan="3">
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/adminList.php"/>管理员
	   <input type="checkbox" name="ckbox[]" value="/apis/<?php echo _ADMIN_DIR_;?>/adminPermissions.php"/>权限管理
	</td>
	</tr>
	<tr>
	<td colspan="4">
	    <input type="submit" class="input_k" value="-保存-" onclick="return confirm('您确认要执行这项操作吗？')"  />
	    <input type="hidden" name="act" value="add" />
	</td>
	</tr>
	</form>
</table>
<?php if($msg):?>
<script>alert("<?php echo $msg?>");</script>
<?php endif;?>
</body>
</html>
<?php include('../../include/footer.inc.php');?>