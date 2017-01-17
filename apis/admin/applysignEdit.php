<?php 
include('head.php');
$id = (int)$_REQUEST["id"];
// $db->debug = true;
if(!empty($id)){
	$row = $db->GetRow("select * from bu_user_anchors where id='$id'");
	$roominfo = $db->GetRow("select * from room_config where roomnumber=(select usernumber from user where userid='$row[userid]')");
}
if($_REQUEST["type"]=="save"){
	$userid = (int)$_REQUEST["userid"];
	if(!empty($userid)){
		$isuser = $db->GetRow("select * from user where userid='$userid'");
		if(!$isuser){
			echo "<script>alert('您输入的用户id不存在');</script>";
			include('../../include/footer.inc.php');
			exit;
		}
	}else{
		echo "<script>alert('您输入的用户id不存在2');</script>";
		include('../../include/footer.inc.php');
		exit;
	}
	$gender = (int)$_REQUEST["gender"];
	$status = (int)$_REQUEST["status"];
	$idcard = (int)$_REQUEST["idcard"];
	$phone = (int)$_REQUEST["phone"];
	$qq = (int)$_REQUEST["qq"];
	$banktype = (int)$_REQUEST["banktype"];
	$agentnumber = (int)$_REQUEST["agentnumber"];
	$basicsalary = (int)$_REQUEST["basicsalary"];
	$pass = strip_tags($_REQUEST["pass"]);
	$bgtype = (int)$_REQUEST["bgtype"];
	$shoufei = (int)$_REQUEST["shoufei"];
	$showercateid = (int)$_REQUEST["showercateid"];
	$orderby = (int)$_REQUEST["orderby"];
	$max_online_people = (int)$_REQUEST["max_online_people"];
	if(empty($id)){//新增
		operational_log(3,("添加主播id,".$userid),$_REQUEST,$userid);
		$sql = "INSERT INTO `bu_user_anchors`(userid,truename,gender,status,idcard,phone,qq,banktype,banknumber,bankname,agentnumber,pass,basicsalary) VALUES (
'$userid','$_REQUEST[truename]','$gender','$status','$idcard','$phone','$qq','$banktype','$_REQUEST[banknumber]','$_REQUEST[bankname]','$_REQUEST[agentnumber]','$pass','$basicsalary');";
	}else{
		operational_log(4,"修改主播信息userid,{$userid}",$_REQUEST,$userid);
		$sql = "UPDATE bu_user_anchors set 
userid='$userid',
truename='$_REQUEST[truename]',
gender='$gender',
status='$status',
idcard='$idcard',
phone='$phone',
qq='$qq',
banktype='$banktype',
banknumber='$_REQUEST[banknumber]',
bankname='$_REQUEST[bankname]',
agentnumber='$agentnumber',
pass='$pass',
orderby='$orderby',
basicsalary='$basicsalary'
where id='$_REQUEST[id]'";
	}
	if(!$roominfo){
		$sql_room="INSERT INTO `room_config` (`roomnumber` ,`background` ,`public_announce` ,`public_link` ,`private_announce` ,`private_link` ,`room_announce` ,`userecord` ,`room_picture`,bgtype,shoufei,`showercateid`,`colorid`,`room_direct`,`room_admin`,`is_big_room`,`orderby`,`max_online_people`)VALUES (
		'$isuser[usernumber]', '', '', '', '', '', '','0', '','$bgtype','$shoufei','$showercateid','0','','','0',$orderby,$max_online_people)";
	}else{
		$sql_room = "UPDATE room_config set
		bgtype='$bgtype',
		shoufei='$shoufei',
		max_online_people='$max_online_people',
		showercateid='$showercateid'
		where roomnumber='$isuser[usernumber]'";
	}
	
	
	$db->Execute($sql);
	$db->Execute($sql_room);
	if($_FILES['picupload']['name']){
		if(strtolower(pathinfo($_FILES['picupload']['name'],PATHINFO_EXTENSION))!='jpg'){
			echo '<script>alert("图片上传错误,只能上传JPG图像")</script>';
			include('../../include/footer.inc.php');
			exit;
		}
		else{
			include($app_path.'include/path_config.php');
			$uuid=uniqid('');
			$upload_path=$pic_path.substr($isuser['userid'],0,1)."/";
			if(!file_exists($upload_path)){
				mkdir($upload_path,0755);
			}
			$uploadfile = $upload_path . $uuid .'.jpg';
			if (move_uploaded_file($_FILES['picupload']['tmp_name'], $uploadfile)) {
				exec('convert -quality 70 '.$uploadfile." ".$uploadfile);
				$db->Execute("update room_config set background='".$uuid."' where roomnumber='{$isuser[usernumber]}'");
			}
			else{
				echo '<script>alert("图片上传错误")</script>';
				include('../../include/footer.inc.php');
				exit;
			}
		}
	}
// 	echo "<script>alert('操作完成');parent.location='agent_list.php?userid=$userid';</script>";
	echo "<script>alert('操作完成');</script>";
	include('../../include/footer.inc.php');
	exit;
}
$showercate = $db->GetArray("select * from showercate");
include('../../include/footer.inc.php');
?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>房间信息编辑</title>
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
span{color:red;}
.red{color:red}
.trlink span{color:#0060BA;}
	</style>
<script>
$(function(){
	$("select[name=banktype]").val("<?php echo $row["banktype"]?>");
	$("select[name=gender]").val("<?php echo $row["gender"]?>");
	$("select[name=pass]").val("<?php echo $row["pass"]?>");
	$("[name=bgtype][value=<?php echo $roominfo["bgtype"]?>]").attr("checked","checked");
	$("[name=shoufei][value=<?php echo $roominfo["shoufei"]?>]").attr("checked","checked");
	$("#showercateid option[value=<?php echo $roominfo["showercateid"]?>]").attr("selected","selected");
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
<iframe width="0" height="0" style="display:none" name="ipost"></iframe>
<form method="post" target="ipost" enctype="multipart/form-data">
<input type="hidden" name="type" value="save"/>
<input type="hidden" name="id" value="<?php echo $row["id"]?>"/>
	<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
<?php if(!empty($roominfo["roomnumber"])){?>
	<!-- >tr><td colspan="2" class="trlink">
         <a href="access_permission.php?type=<?php echo $roominfo["roomnumber"]?>" target="_blank"><b><span class="tal_01_01"></span><span class="tal_01_02">设置房间权限</span><span class="tal_01_03"></span></b></a>
    </td></tr -->
<?php }?>
		<tr><td class="head" colspan="2"><b>房间信息</b></td></tr>
		<tr class="red"><td colspan="2"><span>注:房间号是房主的的用户号</span></td></tr>
		<tr class="b"><td width="10%">房主用户ID:</td><td><input type="text" name="userid" value="<?php echo $row["userid"]?>"/>   <span>*必须填写</span></td></tr>
		<tr class="b"><td>真实姓名:  </td><td><input type="text" name="truename" value="<?php echo $row["truename"]?>"/>   <span>必须填写</span></td></tr>
		<tr class="b"><td>性别:</td><td>
		<select name="gender">
<option value="0">男</option>
<option value="1">女</option>
</select><span>*必须填写0表示男,1表示女</span></td></tr>
		<tr class="b"><td>身份证号:</td><td><input type="text" name="idcard" value="<?php echo $row["idcard"]?>"/>   <span>*必须填写</span></td></tr>
	    <tr class="b"><td>QQ:</td><td><input type="text" name="qq" value="<?php echo $row["qq"]?>"/>   <span>*必须填写</span></td></tr>
		<tr class="b"><td>开户银行:</td><td>
<select name="banktype">
<?php foreach(getAllBankInfo() as $k=>$v):?>
<option value="<?php echo $k?>"><?php echo $v?></option>
<?php endforeach;?>
</select><span>*必须填写</span></td></tr>
		<tr class="b"><td>银行卡号:</td><td><input type="text" name="banknumber" value="<?php echo $row["banknumber"]?>"/><span>*必须填写</span></td></tr>
		<tr class="b"><td>开户姓名:</td><td><input type="text" name="bankname" value="<?php echo $row["bankname"]?>"/><span>*必须填写</span></td></tr>
	    <!--tr class="b"><td>代理视频号:</td><td><input type="text" name="agentnumber" value="<?php echo $row["agentnumber"]?>"/><span>*必须填写</span></td></tr-->
		<tr class="b"><td>联系方式:  </td><td><input type="text" name="phone" value="<?php echo $row["phone"]?>"/><span>必填填写</span></td></tr>
		<tr class="b"><td>直播底薪:  </td><td><input type="text" name="basicsalary" value="<?php echo $row["basicsalary"]?>"/>可不填写</td></tr>
		<tr class="b"><td>在职否:</td><td><input type="text" name="status" value="<?php echo $row["status"]?>"/><span>*0-表示在职，1-表示离职</span></td></tr>
		<tr class="b"><td>是否已经审核:</td><td><select name="pass">
<option value="1">审核通过</option>
<option value="0">未通过</option>
</select><span>选择未通过后，此房间将无法开播</span></td></tr>
	<tr class="b">
	<td>主播分类</td>
	<td>
		<select name="showercateid" id="showercateid" style="width: 100px;">
		   <option value="0">请选择</option>
<?php foreach ($showercate as $value):?>
		   <option value="<?php echo $value["id"]?>"><?php echo $value["catename"]?></option>
<?php endforeach;?>
		</select>
	</td>
	</tr>
		<tr class="b"><td>背景图片:</td><td><input type="radio" value="0" name="bgtype">固定<input type="radio" value="1" name="bgtype">滚动 		<span></span></td></tr>
		<tr class="b"><td>上传背景图片:</td><td><input type="file" name="picupload"/><span>做为房间的大背景显示</span>
		<?php if(!empty($roominfo['background'])){?>
		<a href="<?php echo "/static_data/uploaddata/pics/".substr($row['userid'],0,1)."/".$roominfo['background'].".jpg";?>" target="_blank">查看已经上传的背景图片</a>
		<?php }?>
		</td></tr>
		<tr class="b"><td>是否为收费房间:</td><td><input type="radio" value="0" name="shoufei">否<input type="radio" value="1" name="shoufei">是<span>选择是之后用户需要购买才可以进入</span></td></tr>
		<tr class="b"><td>推荐主播值:</td><td><input type="text" name="orderby" value="<?php echo $row["orderby"]?>"/><span>值越大,首页，推荐主播，越靠前</span></td></tr>
		<tr class="b"><td>最多在线人数:</td><td><input type="text" name="max_online_people" value="<?php echo $roominfo["max_online_people"]?>"/><span>超过此人数，其它用户则不允许进入房间.0表示不限制</span></td></tr>
		<tr class="b"><td colspan="2">  <input type="submit" value="-修改-" class="input_k" onclick="return confirm('确定要修改记录吗?')" /></td></tr>
    </table>
    <input type="hidden" name="str" value=""/>
</form>
</body>
</html>