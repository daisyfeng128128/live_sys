<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>美女主播、视频交友、美女视频、在线K歌</title>
<link href="/css/global.css" type="text/css" rel="stylesheet" />
<link href="/css/help.css" type="text/css" rel="stylesheet" />
<link href="/css/level.css" type="text/css" rel="stylesheet" />
<script src="/js/jquery.min.js" type="text/javascript"></script>
</head>
<body>
<script src="/js/login.js"></script>
<!--head-->
<?php include($app_path.'tpl_header.php');
?>
<!--head-->
<div id="main">
<div id="container">
<div style="margin-top:15px"></div>
<div class="mainbody">
<div class="help">
<p class="helptitle"><a name="top"></a>使用帮助</p>
<div class="kfonline">
<!-- WPA Button Begin -->
<em class="helpbutton">
<a href="http://wpa.qq.com/msgrd?v=3&amp;uin=<?php echo $page_var['site_info_help_qq']?>&amp;site=qq&amp;menu=yes" target="_blank"><img border="0" title="客服" alt="客服" src="http://wpa.qq.com/pa?p=2:<?php echo $page_var['site_info_help_qq']?>:41"></a></em>
<em class="zmzb">客服电话：<?php echo $page_var['site_info_phone']?></em>
</div>
<div class="helpquestion">用户常见问题</div>
<div class="question"><ul>
<?php foreach($questions as $id=>$arr){?>
<li><a href="#<?php echo $id?>"><?php echo $arr['title']?></a></li>
<?php }?>
</ul>
</div>

<div class="helpquestion">主播常见问题</div>
<div class="question"><ul>
<?php foreach($questions_show as $id=>$arr){?>
<li><a href="#<?php echo $id?>"><?php echo $arr['title']?></a></li>
<?php }?>
</ul>
</div>

<div class="grayline"></div>

<?php foreach($questions as $id=>$arr){?>
<div class="helpcont">
<div class="questiontitle"><a name="<?php echo $id?>"></a><?php echo $arr['title']?></div>
<p class="questioncont"><?php echo $arr['content']?></p>
<span class="questiontop"><a href="#top">TOP↑</a></span>
<div class="grayline_1"></div>
</div>
<?php }?>
<?php foreach($questions_show as $id=>$arr){?>
<div class="helpcont">
<div class="questiontitle"><a name="<?php echo $id?>"></a><?php echo $arr['title']?></div>
<p class="questioncont"><?php echo $arr['content']?></p>
<span class="questiontop"><a href="#top">TOP↑</a></span>
<div class="grayline_1"></div>
</div>
<?php }?>

</div>
</div>
<div class="clear"></div>
</div>
</div>
<!--foot-->
<?php include($app_path.'tpl_footer.php');
?>
<!--footend-->
<script>refreshIndexLogin()</script>
</body>
</html>
