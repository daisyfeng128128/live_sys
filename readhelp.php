<?php include("include/header.inc.php");$id=(int)$_GET['id'];$news=$db->GetRow("select * from help where id='$id'");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo $news['title']?>－<?php echo $page_var['site_name']?>－美女主播、视频交友、美女视频、在线K歌</title>
<meta name="description" content="<?php echo $page_var['site_name']?>是超人气视频直播互动娱乐社区，在这里你可以展示自己的才艺，也可以跟众多优秀的美女主播在线互动聊天、视频交友" />
<link href="<?php echo $page_var['cdn_domain']?>/css/global.css" type="text/css" rel="stylesheet" />
<link href="<?php echo $page_var['cdn_domain']?>/css/help.css" type="text/css" rel="stylesheet" />
<script src="<?php echo $page_var['cdn_domain']?>/js/jquery.min.js" type="text/javascript"></script><style>.mainbody img{max-width:95%;}</style>
</head>
<body>
<script src="<?php echo $page_var['cdn_domain']?>/js/login.js"></script>
<div id="main">
<div id="container">
<!--head-->
<?php include('tpl_header.php');
?>
<!--head-->
<div style="margin-top:15px"></div>
<div class="mainbody">
<div class="help">
<p class="helptitle"><a name="top"></a><?php echo $news['title']?></p>
<div class="newscontent">
<p><?php echo $news['content']?></p>
</div>
</div>
</div>
</div>
</div>
<!--foot-->
<div class="clear"></div>
<?php include('tpl_footer.php');
?>
<!--footend-->
<script>
refreshIndexLogin();
</script>
</body>
</html>
<?php include('include/footer.inc.php');?>