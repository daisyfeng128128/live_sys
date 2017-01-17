<div class="clear"></div>
<div class="footer">
	<a target="_blank" href="/news/5.html">关于我们</a>
	<span style="color:#c8b9c8;">|</span>
	<a target="_blank" href="/news/4.html">服务条款</a>
	<span style="color:#c8b9c8;">|</span>
	<a target="_blank" href="/news/6.html">联系我们</a>
	<span style="color:#c8b9c8;">|</span>
	<a target="_blank" href="/html/feedback.html">意见建议</a>
	<span style="color:#c8b9c8;">|</span>
	<a href="/html/help.html" target="_blank">帮助中心</a>
	<?php if($page_var['tongji']):?><span style="color:#c8b9c8;">|</span><?php echo $page_var['tongji'];?><?php endif;?>
	
	<div class="bottom">
			<p><?php echo $page_var['site_info_beian']?></p><p>客服热线：<?php echo $page_var['site_info_phone']?>&nbsp;&nbsp;运营QQ：<?php echo $page_var['site_info_qq']?></p>
	</div>
	<div class="clear"></div>
</div>
<div style="display:none;" class="FaceBox toggleBox" id="faces">
	<div class="col" id="facesBd"></div>
	<ul><li data_tp="lx" class="on">流行</li><li data_tp="jd">经典</li>
<?php if($creeent_acc_perm&$access_type["facegaoji"]["value"]):?>
		<li data_tp="yc">VIP表情</li><li data_tp="dd">VIP表情</li><li data_tp="st">VIP表情</li>
<?php endif;?>
	</ul>
	<div class="clear"></div>
</div>