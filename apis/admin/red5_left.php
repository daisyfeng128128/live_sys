<?php 
header("Content-type:text/html;charset=utf-8");
include('head.php');
include('../../include/footer.inc.php');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
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
td { BORDER-RIGHT: 1px; BORDER-TOP: 0px; FONT-SIZE: 12px; COLOR: #000000; line-height:150%;}
.b{background:#F7F7F7;}
.head { color: #154BA0;background: #0378ae;font-weight:bold;background-image:url('../images/root/header_bg.gif');}
.head td{color: #ffffff;}
.head a{color: #ffffff;}
.head_2 {background: #0378ae;}
.head_2 td{color: #000000;}
.left_padding{background:#F7F7F7; padding-left:20px;}
.hr  {border-top: 1px solid #739ACE; border-bottom: 0; border-left: 0; border-right: 0; }
.bold {font-weight:bold;}
.smalltxt {font-family: Tahoma, Verdana; font-size: 12px;color: #000000;}
.i_table{border: 1px solid #86B9D6;background:#DEE3EF;}
.style1 {color: #FFFFFF}
.head_n{border-left: 1px solid #E9EAF1;border-bottom: 1px solid #E9EAF1;border-right: 1px solid #E9EAF1;background-color:#B4C0C1;background-image: url('../images/root/01_bgrd_right.gif');}
</style>
<script language="JavaScript">
ifcheck = true;
function CheckAll(form)
{
	for (var i=0;i<form.elements.length-2;i++)
	{
		var e = form.elements[i];
		e.checked = ifcheck;
	}
	ifcheck = ifcheck == true ? false : true;
}
</script>
<!---->
<base target="main" />
</head>
<body topmargin=5 leftmargin=5>

<table width="100%" align=center cellspacing=2 cellpadding=4 border=0>

    <tr>
        <td class="head_n" height=31 align=center>
            <a target=main href="red5_wel.php"><b>首页</b></a> | 
            <a target="_top" href="red5.php?action=logout"><b>退出</b></a>
        </td>
    </tr>
    
    <tr>
        <td class=b align=center>
            <a href="#" onClick="return ClearAdminDeploy()">+ 全部展开</a> 
            <a href="#" onClick="return SetAdminDeploy()">- 全部折叠</a>
        </td>
    </tr>
    
    <tr>
        <td>
            <table width=98% align=center cellspacing=1 cellpadding=4 class=i_table>
                <tr><td class=head><b>管理员信息</b></td></tr>
                <tr>
                    <td class=left_padding>
						用户名:<?php echo $_SESSION["admin"]["ADMINNAME"];?><br>
						组别:管理员<br>
					 </td>
                </tr>
            </table>
        </td>
    </tr>
    
    <!---->
	<tr><td>
	<table width=98% align=center cellspacing=1 cellpadding=4 class=i_table>
	    <tr>
	        <td class=head height=18>
	            <a style="float:right" href="#" onClick="return IndexDeploy('a1',1)">
	                <img id="img_a1" src="../images/root/cate_fold.gif" border=0 alt='open'>
	            </a>
	            <b>管理菜单</b>
	        </td>
	    </tr>
	    <tbody id="cate_a1" style="">
	        <tr>
	            <td class="left_padding">
					<a href="gift_list.php">礼物管理</a>
					<a href="news.php">新闻管理</a><br/>
					<a href="helps.php">帮助管理</a>
					<a href="clan_list.php">家族列表</a><br/>
					<a href="agent_list.php">代理管理</a>
	            	<a href="badwords.php">屏蔽词汇</a><br/>
					<a href="pic_banner.php">图片广告</a>
					<a href="global_config.php">网站配置</a><br/>
					<a href="global_announcement.php">发布公告</a>
					<a href="global_config_phone.php">手机配置</a><br/>
					<a href="refuseip_list.php">封IP</a>
					<a href="download_config.localhost.php">更新配置</a><br/>
					<a href="global_config_xingyun.php">幸运礼物配置</a><br/>
<?php if($page_var['site_ishave_game']):?>
					<!--a href="game_buyu_config.php">捕鱼抽水设置</a><br/-->
					<a href="game_car_admin.php">车行游戏管理</a><br/>
					<a href="game_farm_admin.php">鸡同鸭讲游戏</a><br/>
					<a href="game_nn_admin.php">牛牛游戏</a><br/>
<?php endif;?>
					<!--a href="video.php">首页视频</a><br/-->
				</td>
	        </tr>
	    </tbody>
	</table>
	</td></tr>
<tr><td>
	<table width=98% align=center cellspacing=1 cellpadding=4 class=i_table>
	    <tr>
	        <td class=head height=18>
	            <a style="float:right" href="#" onClick="return IndexDeploy('a2',2)">
	                <img id="img_a2" src="../images/root/cate_fold.gif" border=0 alt='open'>
	            </a>
	            <b>用户管理</b>
	        </td>
	    </tr>
	    <tbody id="cate_a2" style="">
	        <tr>
	            <td class=left_padding>
					<a href="userList.php">用户管理</a>
					<a href="add_money.php">会员加钱</a><br/>
					<a href="daoju_number.php">道具管理</a>
				</td>
	        </tr>
	    </tbody>
	</table>
	</td>
</tr>
<tr><td>
	<table width=98% align=center cellspacing=1 cellpadding=4 class=i_table>
	    <tr>
	        <td class=head height=18>
	            <a style="float:right" href="#" onClick="return IndexDeploy('a3',3)">
	                <img id="img_a3" src="../images/root/cate_fold.gif" border=0 alt='open'>
	            </a>
	            <b>直播管理</b>
	        </td>
	    </tr>
	    <tbody id="cate_a3" style="">
	        <tr>
	            <td class=left_padding>
					<a href="user_give_number.php">赠送靓号</a>
					<a href="backbuttynumber.php">回收靓号</a><br/>
					<a href="applysignList.php">主播管理</a>
					<a href="applyShowerCate.php">分类管理</a><br/>
					<a href="zhibo_zhubo.php">正在直播所有房间</a><br/>
					<a href="usernumber_edit.php">主播靓号修改</a><br/>
					<a href="access_permission.php?type=admin">房间权限设置</a><br/>
					<a href="jifen_tixian_conf.php">主播提现配置</a><br/>
					<a href="switchroom.php">大小房间切换</a><br/>
				</td>
	        </tr>
	    </tbody>
	</table>
	</td>
</tr>
<tr><td>
	<table width=98% align=center cellspacing=1 cellpadding=4 class=i_table>
	    <tr>
	        <td class=head height=18>
	            <a style="float:right" href="#" onClick="return IndexDeploy('a4',4)">
	                <img id="img_a4" src="../images/root/cate_fold.gif" border=0 alt='open'>
	            </a>
	            <b>联盟信息</b>
	        </td>
	    </tr>
	    <tbody id="cate_a4" style="">
	        <tr>
	            <td class=left_padding>
					<a href="union_list.php">联盟管理</a>
	            	<a href="../union_statistics.php">联盟统计</a><br/>
				</td>
	        </tr>
	    </tbody>
	</table>
	</td>
</tr>
	<tr><td>
	<table width=98% align=center cellspacing=1 cellpadding=4 class=i_table>
	    <tr>
	        <td class=head height=18>
	            <a style="float:right" href="#" onClick="return IndexDeploy('a5',5)">
	                <img id="img_a5" src="../images/root/cate_fold.gif" border=0 alt='open'>
	            </a>
	            <b>数据分析</b>
	        </td>
	    </tr>
	    <tbody id="cate_a5" style="">
	        <tr>
	            <td class=left_padding>
	                <a href="balance_change_log.php">充值消费</a>
	                <a href="reg_count.php">注册统计</a><br/>
	            	<a href="orders_sta.php">充值统计</a>
	            	<a href="orders_list.php">充值记录</a><br/>
	            	<a href="exchange_log.php">兑换记录</a>
	            	<a href="phone_download_statistics.php">手机统计</a><br/>
				</td>
	        </tr>
	    </tbody>
	</table>
	</td>
	</tr>
	<!--  -->
	<tr><td>
	<table width=98% align=center cellspacing=1 cellpadding=4 class=i_table>
	    <tr>
	        <td class=head height=18>
	            <a style="float:right" href="#" onClick="return IndexDeploy('a6',6)">
	                <img id="img_a6" src="../images/root/cate_fold.gif" border=0 alt='open'>
	            </a>
	            <b>财务管理</b>
	        </td>
	    </tr>
	    <tbody id="cate_a6" style="">
	        <tr>
	            <td class=left_padding>
					<a href="liveSta.php">主播直播统计</a><br/>
	                <a href="drawcash_list.php">提现管理</a>
				</td>
	        </tr>
	    </tbody>
	</table>
	</td>
	</tr> 	 	
	<!---->
	<tr><td>
	<table width=98% align=center cellspacing=1 cellpadding=4 class=i_table>
	    <tr>
	        <td class=head height=18>
	            <a style="float:right" href="#" onClick="return IndexDeploy('a7',7)">
	                <img id="img_a7" src="../images/root/cate_fold.gif" border=0 alt='open'>
	            </a>
	            <b>管理员</b>
	        </td>
	    </tr>
	    <tbody id="cate_a7" style="display:;">
	        <tr>
	            <td class=left_padding>
					 <a href="adminList.php">管理员</a>
				</td>
	        </tr>
	    </tbody>
	</table>
	</td></tr>
</table>
<script language="JavaScript" src="../javascript/root/Deploy.js"></script>
<script language="JavaScript" src="../javascript/root/DeployInit.js"></script>
</body></html>