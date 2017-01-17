<div style="display:none;" class="popBox-gift giftBox toggleBox">
	<div class="giftcontent" id="giftcontent">
	<ul class="tab">
<?php foreach($giftcate as $giftcateid=>$arr):
	if($giftcateid==1 || $giftcateid==14 || $giftcateid==8)continue;
	$ac = '';
	if($giftcateid==2){
		$ac = ' class="on"';
	}
?>
<li id="gt<?php echo $giftcateid;?>" class="n<?php echo $giftcateid;?>"><a<?php echo $ac;?> href="javascript:void(0)"><?php echo $arr["catename"];?></a></li>
<?php endforeach;?>
	</ul>
	
<?php
foreach($giftinfo as $cateid=>$gifts){
	if(in_array($cateid, array("0","1","8")))continue;//分类为0,1的不显示,8是汽车
	if($cateid==2){
		$display='style="display:block"';
	}else{
		$display='style="display:none;"';
	}
	echo '<ul class="gift fix" id="gln'.$cateid.'" '.$display.'>';
	foreach($gifts as $gift){
?><li id="gift<?php echo $gift['giftid']?>" price="<?php echo $gift['giftprice']?>"><img title="价值<?php echo $gift['giftprice']?><?php echo $page_var['money_name']?>" src="/images/pixel.gif" class="tooltip giftbig <?php echo $gift['class']?>"/> <span title="<?php echo $gift['giftname']?>" class="tooltip gfname"><?php echo $gift['giftname']?></span></li>
<?php }
	echo '</ul>';
}?>
	<div class="clear"></div>
	</div>
</div>
<ul id="taglist" class="taglist subList">
<?php //显示贴条
foreach($giftId as $gif){
	if($gif["giftflash"] == "tietiao"){
		$fid=str_replace(array('gift_','.png'),'',$gif['giftimage']);
		$title = ' title="价值'.$gif[giftprice].$page_var[money_name].'"';
		echo '<li class="tooltip" id="'.$gif['giftid'].'" giftimage_tietiao="'.$fid.'" '.$title.'><a href="">'.$gif["giftname"].'</a></li>';
	}
}
?>
</ul>