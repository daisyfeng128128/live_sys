<!--main-->
<div class="personbody">
<div class="person_left">
<?php $current_page="mymailbox";
include_once('./include/personal_tpl/person_menu.html');
?>
</div>
<div class="person_right">


<style type="text/css">
	/*commen*/
	.col{background:none;text-align: left;width: 100%;}
	h1{font-size:18px;height:40px;line-height:40px;}
	h2{font-size:16px;height:30px;line-height:30px;font-weight:bold}
	ul.list li{padding:0 10px;height:36px;line-height:36px;border-bottom:1px solid #E4E5E6;position:relative}
	ul.list li:hover,ul.list li:hover a{background:#EEE;color:#333}
	ul.list li span{display:block;float:left;margin-left:10px;}
	ul.list li b{color:#777;font-weight:normal}
	hr{margin:0;*margin:0 0 -14px 0;float:left;display:block;width:100%;height:1px;border:none;border-top:1px solid #E4E5E6;}
	hr.line-dashed{height:1px;border-top:1px dashed #FFD4AC;}
	blockquote{color:#777;text-indext:0;margin:0;height:25px;line-height:25px;}
	.text-bold,.text-bold a{font-weight:bold}
	.bg-orange,.bg-orange a,.bg-orange b{background:#FE7E00!important;color:#fff!important;}
	.icon-newmail{background-position:-172px -134px}
	.icon-mail{background-position:-172px -167px}
	.link{cursor:pointer;color:#FF6C00;text-decoration:underline}
	.avatar50{width:50px;margin-right:10px;}
	.avatar50 img{display:block;width:50px;height:50px;}
	.icon{background-image:url(../img/new/b3.png);background-repeat: no-repeat;}
	
	/*表情*/
	.FaceBox{text-align:left;background-color:#E9E9E9;border:1px solid #ddd;border-radius:3px;height:191px;width:330px;padding:5px;position:absolute;z-index:1501;box-shadow:0 1px 1px #CCC;}
	.FaceBox ul{height:25px;width:300px;float:left;}
	.FaceBox ul li{display:block;float:left;cursor: pointer;height:25px;line-height:22px;text-align:center;width:46px;}
	.FaceBox li.on{background:url(img/mbicon.png) no-repeat -171px -233px;color:#fff}
	#facesBd{height:167px;width:331px;overflow:hidden}
	.FaceBox table{border-collapse:collapse;empty-cells:show}
	.FaceBox table td{border:1px solid #E4E5E7;cursor:pointer;height:32px;text-align:center;width:32px;background:#fff}
	.FaceBox table img{max-width:32px;max-height:32px;}
	.FaceBox table.tab_yc img,.FaceBox table.tab_dd img,.FaceBox table.tab_st img{width:32px;height:32px;}
	
	/*new*/
	.Content .box .article{margin:10px 20px;}
	.Content .box .article-body{margin:10px 0;height:20px;line-height:20px}
	
	.listpnl{width:410px;margin-left:-20px;border-right:2px solid #FFCD9D;min-height:609px}
	.Content .box .list{width:410px;}
	.Content .box .list li{cursor:pointer;padding:0;overflow:hidden;}
	.Content .box .article{width:327px;margin:10px 0 0 20px}
	
	.hilightBox{border:1px solid #FFCB99!important;border-radius:4px!important;box-shadow:0 0 3px #FFD7B0!important;behavior:url(PIE.htc)}
	.mb_received{padding-bottom:0}
	ul.list li.newmaill,ul.list li.newmaill b{font-weight:bold;color:#333}
	ul.list li i.icons{margin:0 12px 0 24px}
	ul.list li span.s0{width:125px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;_display:inline;_margin-top:9px}
	ul.list li span.s1{width:154px;margin-left:19px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
	ul.list li .icon_close{top:13px;right:6px;visibility:hidden}
	ul.list li:hover .icon_close{visibility:visible}
	ul.list li.bg-orange,ul.list li.bg-orange b{font-weight:bold}
	.listpnl .toolbar{margin:10px 0;display:none}
	.listpnl .toolbar .col{height:24px;line-height:24px;margin:6px 0 6px 15px;width:178px;}
	.listpnl .toolbar .col span{margin:0 5px}
	.listpnl .toolbar .colr{width:217px;}
	.msg-body{width:267px;_width:263px;overflow:hidden;}
	.mbdet .mbot .col{width:120px}
	.mbot{color:#999;}
	.mbot a{margin-right:10px;color:#999;}
	.mbot a:hover,.reviewbox .mmid a.sybtn:hover{color:#FF6C00;text-decoration:underline}
	.mbot{height:30px;line-height:30px;}
	.reviewInt{width:248px;_width:244px;height:24px;line-height:24px;padding:2px 8px;border:1px solid #CCC;border-radius:4px;box-shadow:0 0 3px #CCC;overflow:auto;}
	.smileyBtn{vertical-align:middle;display:inline-block;width:26px;height:25px;background-position:-31px -73px;}
	.reviewbox .btn_porange{width:60px;height:25px;line-height:25px;font-size:12px;font-weight:normal;float:right}
	.reviewstool .col,.reviewstool .colr{width:45%}
	.reviewstool{margin:10px 0}
	.mmid p{line-height:24px;}
	p.f_gray{width:100%;overflow:hidden}
	p.f_gray a{text-decoration:underline}
</style>
<script src="<?php echo $page_var['cdn_domain']?>/js/common-nsr0.8.js?20140402"></script>
<script src="<?php echo $page_var['cdn_domain']?>/js/face.js"></script>
<script src="<?php echo $page_var['cdn_domain']?>/js/mailboxv1.2.js"></script>
<script>
$(function(){
	MailBox.init();
});
</script>
<div class="mb_top"></div>
<div class="mb_received Content">
	<h1 class="col">收件箱</h1>
	<hr />
	<div class="box col">
		<div class="listpnl col" id="mailList">
			<ul class="list col"></ul>
			<div class="toolbar col">
				<div class="col stool"><span>全部标为已读</span>|<span class="link">删除本页邮件</span></div>
				<div class="colr"><div class="sPaginer" id="pager"></div></div>
			</div>
		</div>
		<div class="article col">
			<div class="col" id="mailDetail" style="display:none">
				<h2></h2>
				<blockquote></blockquote>
				<hr class="line-dashed" />
				<div class="article-body"></div>
			</div>
			<div class="col" id="reviewMsg">

			</div>
		</div>
	</div>
	<div class="clear"></div>
</div>
<div id="faces" class="FaceBox toggleBox" style="display:none;">
	<div class="mbIcon mbarrow"></div>
	<ul><li class="on" data_tp="lx">流行</li><li data_tp="jd">经典</li><li data_tp="yc">洋葱头</li><li data_tp="dd">达达兔</li><li data_tp="st">潘斯特</li></ul>
	<div id="facesBd" class="col"></div>
	<div class="clear"></div>
</div>



</div>
</div>
<!--main-->