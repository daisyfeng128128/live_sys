<?php 
include('head.php');
include('../../include/level.func.php');
$msg = $_REQUEST["msg"];
if($_REQUEST["action"]=="update"){
	if($_REQUEST["giftcateid"]==null || $_REQUEST["giftcateid"]==""){
		echo "<script>alert('类别名称不能为空');</script>";
		include('../../include/footer.inc.php');
		return;
	}
	if(empty($_REQUEST["giftname"])){
		echo "<script>alert('礼物名称不能为空');</script>";
		include('../../include/footer.inc.php');
		return;
	}
	if($_REQUEST["giftprice"]==""){
		echo "<script>alert('礼物价格不能为空');</script>";
		include('../../include/footer.inc.php');
		return;
	}
	if(!is_numeric($_REQUEST[giftprice])){
		echo "<script>alert('礼物价格只能为数字');</script>";
		include('../../include/footer.inc.php');
		return;
	}
	$giftid = $_REQUEST["giftid"];
	$isphone = (int)$_REQUEST["isphone"];
	if(empty($giftid)){
		$db->Execute("INSERT INTO `gift`(giftcateid,giftname,giftprice,giftimage,giftflash,isphone) VALUES ('$_REQUEST[giftcateid]','$_REQUEST[giftname]','$_REQUEST[giftprice]','$_REQUEST[giftimage]','$_REQUEST[giftflash]',$isphone);");
		$giftid=$db->Insert_ID();
		operational_log(3,"添加礼物id{$giftid}",$_REQUEST);
	}else{
		$db->Execute("update gift set giftcateid='$_REQUEST[giftcateid]',giftname='$_REQUEST[giftname]',giftprice='$_REQUEST[giftprice]',giftimage='$_REQUEST[giftimage]',giftflash='$_REQUEST[giftflash]',isphone=$isphone where giftid='$giftid'");
		operational_log(4,"修改礼物id{$giftid}",$_REQUEST);
	}
	//上传图片路径,giftimage,gift_25.png
	if(!empty($_FILES['picupload']["name"])){
		$file_type = strtolower(pathinfo($_FILES['picupload']['name'],PATHINFO_EXTENSION));
		if($file_type!='png' && $file_type!='gif'){
			echo '<script>alert("图片路径上传错误,只能上传png,gif图像")</script>';
		}else{
			$file_name = "gift_".$giftid.".".$file_type;
			if($_REQUEST[giftflash]=="tietiao"){//贴条上传目录,/img/tag2/gift_9007.png
				$uploadfile=$app_path."img/tag2/".$file_name;
			}else if($_REQUEST[giftcateid]=="8"){//座驾上传目录，/static_data/car/images/3.png
				$uploadfile=$app_path."static_data/car/images/".$file_name;
			}else{
				$uploadfile=$app_path."static_data/gift/".$file_name;
			}
			
			if (!move_uploaded_file($_FILES['picupload']['tmp_name'], $uploadfile)) {
				echo '<script>alert("图片上传错误")</script>';
			}else{
				$db->Execute("update gift set giftimage='$file_name' where giftid='$giftid'");
				
				if($_REQUEST[giftcateid]=="8"){//座驾上传后生成小图
					$dist_filename=$app_path."static_data/car/smallimages/".$file_name;
					$source_filename=$app_path."static_data/car/images/".$file_name;
					
					$arr=getimagesize($source_filename);
					//$width = 130;
					//$height = $width/$arr[0]*$arr[1];
					$height = 69;
					$width = $height/$arr[1]*$arr[0];
					if(strtolower($file_type)=="png"){//如果是png图片，做无损压缩
						$srcImg = imagecreatefrompng($source_filename);
						$srcWidth = imagesx($srcImg);
						$srcHeight = imagesy($srcImg);
							
						$newImg = imagecreatetruecolor($width,$height);
						//分配颜色 + alpha，将颜色填充到新图上
						$alpha = imagecolorallocatealpha($newImg, 0, 0, 0, 127);
						imagefill($newImg, 0, 0, $alpha);
							
						//将源图拷贝到新图上，并设置在保存 PNG 图像时保存完整的 alpha 通道信息
						imagecopyresampled($newImg, $srcImg, 0, 0, 0, 0, $width,$height, $srcWidth, $srcHeight);
						imagesavealpha($newImg, true);
						imagepng($newImg, $dist_filename);
					}else{
						include_once $app_path.'tools/phpthumb.php';
						makeThumb($source_filename,$dist_filename,$width,$height);
					}
					
					
				}
			}
		}
	}
	//上传动画路径,giftflash,48.swf
	if(!empty($_FILES['picuploadswf']["name"])){
		$file_type = strtolower(pathinfo($_FILES['picuploadswf']['name'],PATHINFO_EXTENSION));
		if($file_type!='png' && $file_type!='gif' && $file_type!='swf' && $file_type!='jpg'){
			echo '<script>alert("动画路径上传错误,只能上传png,gif,swf格式的文件")</script>';
		}else{
			$file_name = $giftid.".".$file_type;
			if($_REQUEST[giftcateid]=="5"){//swf(豪华)礼物上传目录,static_data/showGift/48.swf
				$uploadfile=$app_path."static_data/showGift/".$file_name;
			}else if($_REQUEST[giftcateid]=="8"){//座驾上传目录，/static_data/car/logo/38.png
				$uploadfile=$app_path."static_data/car/logo/".$file_name;
			}else{
				$uploadfile=$app_path."static_data/showGift/".$file_name;
			}
			if (!move_uploaded_file($_FILES['picuploadswf']['tmp_name'], $uploadfile)) {
				echo '<script>alert("动画路径上传错误")</script>';
			}else{
				$db->Execute("update gift set giftflash='$file_name' where giftid='$giftid'");
			}
		}
	}
	
	//座驾flash
	if($_REQUEST[giftcateid]=="8"){
		if(!empty($_FILES['carflash']["name"])){
			$file_type = strtolower(pathinfo($_FILES['carflash']['name'],PATHINFO_EXTENSION));
			if($file_type!='swf'){
				echo '<script>alert("动画路径上传错误,只能上传swf格式的文件")</script>';
			}else{
				$file_name = $giftid.".".$file_type;
				$uploadfile=$app_path."static_data/car/swf/".$file_name;
				if (!move_uploaded_file($_FILES['carflash']['tmp_name'], $uploadfile)) {
					echo '<script>alert("座驾Flash上传错误")</script>';
				}
			}
		}
	}
	echo "<script>alert('操作成功');parent.window.location='gift_list.php?giftid=$giftid';</script>";
	
	//成功后重新生成一下礼物图片
	//@file_get_contents("http://"._SITE_URL_."/tools/makegift.php");
	return;
}
// $db->debug = true;
if(!empty($_GET["giftid"])){
	$row = $db->GetRow("select * from gift where giftid='$_GET[giftid]'");
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
<title>礼物编辑</title>
<style>
.red{color:red;}
li {float: none;list-style-type:decimal;}
a{color:red;}
h3{margin:30px 0 0 0;}
</style>
<script>
$(function(){
	<?php if($row)foreach ($row as $k=>$v):?>
	<?php if($k=="isphone"):?>
		$("[name=isphone][value=<?php echo $v?>]").attr("checked","checked");
	<?php else:?>
		$("[name=<?php echo $k?>]").val("<?php echo $v?>");
	<?php endif;?>
	
	<?php endforeach;?>
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

<script type="text/javascript">
$(function() {
    $("#giftprice").focus(function() {
        var giftprice = $("#giftprice").val();
        if (giftprice == '') {
            $("#notegiftprice").html('礼物价格不能为空!')
        }
    });
    $("#giftprice").blur(function() {
        var giftprice = $("#giftprice").val();
        if (giftprice == '') {
            $("#notegiftprice").html('礼物价格不能为空!')
        } else {
            $("#notegiftprice").html('')
        }
    });
    $("#giftname").focus(function() {
        var giftname = $("#giftname").val();
        if (giftname == '') {
            $("#notegiftname").html('礼物名称不能为空!')
        }
    });
    $("#giftname").blur(function() {
        var giftname = $("#giftname").val();
        if (giftname == '') {
            $("#notegiftname").html('礼物名称不能为空!')
        } else {
            $("#notegiftname").html('')
        }
    });
	$("[name=isphone][value=<?php echo $_REQUEST["isphone"]?>]").attr("checked","checked");
});
</script>
<iframe width="0" height="0" style="display:none" name="ipost"></iframe>
<form method="post" enctype="multipart/form-data" target="ipost">
<table width=99% align=center cellspacing=1 cellpadding=3 class=i_table>
	<tr><td class=head colspan=15><b>修改礼物</b></td></tr>
	<tr class="b">
	<td>类别名称:&nbsp;&nbsp;
	          <select name="giftcateid" id="giftcateid">
	              <option value="0">请选择分类</option>
<?php 
$giftcate = $db->GetArray("select * from giftcate");
foreach ($giftcate as $value):?>
<option value="<?php echo $value["giftcateid"]?>"><?php echo $value["catename"]?></option>
<?php endforeach;?>
	         </select>
	         <font color="red"><span id="notegiftcate"></span></font>
	</td>
	</tr>
	<tr class="b"><td>礼物名称:&nbsp;&nbsp;<input type="text" name="giftname" id="giftname" value=""/><font color="red"><span id="notegiftname"></span></font></td></tr>
	<tr class="b"><td>礼物价格:&nbsp;&nbsp;<input type="text" name="giftprice" id="giftprice" value=""/><font color="red"><span id="notegiftprice"></span></font></td></tr>
	<tr class="b"><td>
	图片路径&nbsp;&nbsp;<input type="text" name="giftimage" id="giftimage" value=""/>
	<input type="file" id="picupload" name="picupload">
<?php 
if($row["giftimage"]){
	if($row["giftflash"]=="tietiao"){//贴条上传的目录,/img/tag2/gift_9007.png
		echo "<img src='/img/tag2/$row[giftimage]?".time()."'/>";
	}else if($row[giftcateid]=="8"){//座驾上传目录，/static_data/car/images/3.png
		echo "<img src='/static_data/car/images/$row[giftimage]?".time()."'/>";
	}else{//礼物上传的目录
		echo "<img src='/static_data/gift/$row[giftimage]?".time()."'/>";
	}
}
?>
	</td></tr>
	<tr class="b"><td>
	动画路径&nbsp;&nbsp;<input type="text" name="giftflash" id="giftflash" value=""/>
	<input type="file" id="picuploadswf" name="picuploadswf">
<?php 
if($row["giftflash"]){
	if($row[giftcateid]=="8"){//座驾上传目录，/static_data/car/logo/38.png
		echo "<img src='/static_data/car/logo/$row[giftflash]?".time()."'/>";
	}
	if($row[giftcateid]=="5"){//豪华查看礼物
		echo "<a href='/static_data/showGift/$row[giftflash]?".time()."' target='_blank'>查看礼物动画</a>";
	}
}
?>
	</td></tr>
	<tr class="b"><td>
	座驾Flash&nbsp;&nbsp;
	<input type="file" id="carflash" name="carflash">
<?php 
if($row[giftcateid]=="8" && file_exists($app_path."/static_data/car/swf/$row[giftid].swf")){
	echo "<a href='/static_data/car/swf/$row[giftid].swf?".time()."' target='_blank'>查看</a>";
}
?>
	</td></tr>
<?php if(_IS_PHONE_):?>
	<tr class="b"><td colspan="5">手机显示:<input type="radio" value="0" name="isphone">显示<input type="radio" value="1" name="isphone">不显示</td></tr>
<?php endif;?>
	<tr class="b">
	<td>
	    <input type="submit" class="input_k" value="-修改-"/>
	    <input type="hidden" name="action" value="update" />
	    <input type="hidden" name="giftid" value="" />
	</td>
	</tr>
</table>
</form>
<div style="padding:10px;">
<h1 style="color:red">操作礼物前请先阅读下面的说明</h1>
<h3>修改礼物</h3>
<ol>
<li>在礼物列表页，找到需要修改的礼物，点击修改</li>
<li style="color:red">操作完成后到礼物列表页中，清空礼物缓存</li>
</ol>

<h3>添加豪华礼物分类中的礼物</h3>
<p class="red">豪华礼物是指在直播页中，豪华分类中的礼物。用户送出的礼物是以Flash来展示.</p>
<ol>
<li>选择类别名称为豪华，填写礼物名称及价格</li>
<li>上传礼物的图标，表单中的图片路径（图片路径输入框里的内容根据上传的文件自动产生，不需要填写）</li>
<li>上传礼物的Flash文件，表单中的动画路径（动画路径输入框里的内容根据上传的文件自动产生，不需要填写）</li>
<li><a href="../images/gift_hh.gif" target="_blank">查看完整的填写信息</a></li>
<li>操作完成后到礼物列表页中，清空礼物缓存</li>
<li>添加完成后，到直播间页面豪华礼物分类下查看是否正常显示</li>
</ol>

<h3>添加普通礼物</h3>
<p class="red">普通礼物是指在直播页中，初级、中级、高级、贵族、幸运礼物等。用户送出的礼物是以图片的形式来展示.</p>
<ol>
<li>选择对应的类别名称，填写礼物名称及价格</li>
<li>上传礼物的图标，表单中的图片路径（图片路径输入框里的内容根据上传的文件自动产生，不需要填写）</li>
<li>动画路径不需要填写</li>
<li><a href="../images/gift_common.gif" target="_blank">查看完整的填写信息</a></li>
<li>操作完成后到礼物列表页中，清空礼物缓存</li>
<li>添加完成后，到直播间页面对应礼物分类下查看是否正常显示</li>
</ol>

<h3>添加座驾</h3>
<p class="red">拥有座驾的用户进入直播间后会显示出座驾，并播放进入房间的座驾动画；在商城中可以购买</p>
<ol>
<li>选择类别名称为座驾，填写礼物名称及价格</li>
<li>上传座驾图片，表单中的图片路径（图片路径输入框里的内容根据上传的文件自动产生，不需要填写）</li>
<li>上传座驾品牌，表单中的动画路径（动画路径输入框里的内容根据上传的文件自动产生，不需要填写）</li>
<li>上传座驾Flash（上传成功后，再次编辑时，后面会有查看两字，点击它查看已经上传的Flash）</li>
<li><a href="../images/gift_car.gif" target="_blank">查看完整的填写信息</a></li>
<li>添加完成后，到商城页面查看座驾是否正常显示</li>
</ol>

<h3>添加贴条</h3>
<p class="red">在直播间里，贴条是对在线的用户贴上标签</p>
<ol>
<li>选择类别名称为系统，填写礼物名称及价格</li>
<li>上传贴条图片，需要上传透明的png图片，否则不能正常显示，表单中的图片路径（图片路径输入框里的内容根据上传的文件自动产生，不需要填写）</li>
<li>填写动画路径为:tietiao</li>
<li><a href="../images/gift_tietiao.gif" target="_blank">查看完整的填写信息</a></li>
<li>操作完成后到礼物列表页中，清空礼物缓存</li>
<li>添加完成后，到直播间页面查看贴条是否正常显示</li>
</ol>


</div>
</body>
</html>
<?php include('../../include/footer.inc.php');?>