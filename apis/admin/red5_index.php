<?php include('head.php');?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>后台管理系统 <?php echo $global_config_data["site_name"]?></title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    

	<style type="text/css">
	table { BORDER-TOP: 0px; BORDER-LEFT: 0px; BORDER-BOTTOM: 2px}
	select {
		FONT-SIZE: 12px;
		COLOR: #000000; background-color: #E0E2F1;
	}
	a { TEXT-DECORATION: none; color:#000000}
	a:hover{ text-decoration: underline;}
	body {font-family:Verdana;FONT-SIZE: 12px;MARGIN: 0;color: #000000;background: #F7F7F7;}
	textarea,input,object{font-size: 12px;}
	td { BORDER-RIGHT: 1px; BORDER-TOP: 0px; FONT-SIZE: 12px; COLOR: #000000;}
	.b{background:#F7F7F7;}

	.head { color: #ffffff;background: #739ACE;font-weight:bold;}
	.head td{color: #ffffff;}
	.head a{color: #ffffff;}
	.head_2 {background: #CED4E8;}
	.head_2 td{color: #000000;}
	.left_padding{background:#F7F7F7;}
	.hr  {border-top: 1px solid #739ACE; border-bottom: 0; border-left: 0; border-right: 0; }
	.bold {font-weight:bold;}
	.smalltxt {font-family: Tahoma, Verdana; font-size: 12px;color: #000000;}
	.i_table{border: 1px solid #739ACE;background:#DEE3EF;}
	</style>
  </head>
	<frameset rows="*" cols="170,*" framespacing="0" frameborder="1" border="false" id="frame" scrolling="yes">
	<frame name="left" scrolling="auto" marginwidth="0" marginheight="0" src="red5_left.php">
	<frame name="main" scrolling="auto" src="red5_wel.php">
	</frameset>
	
	
	<noframes>
  	<body leftmargin="2" topmargin="0" marginwidth="0" marginheight="0">
  	<p>Please Use IE 6.0</p>
  	</body>
	</noframes>
</html><?php include('../../include/footer.inc.php');?>