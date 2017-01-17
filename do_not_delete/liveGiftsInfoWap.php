<div class="popBox-gift giftBox toggleBox">
	<div id="giftcontent" class="giftcontent">
	<ul class="tab">
		<li class="n2" id="gt2"><a href="javascript:void(0)" class="on">初级</a></li>
		<li class="n3" id="gt3"><a href="javascript:void(0)">中级</a></li>
		<li class="n4" id="gt4"><a href="javascript:void(0)">高级</a></li>
		<li class="n5" id="gt5"><a href="javascript:void(0)">豪华</a></li>
		<li class="n9" id="gt9"><a href="javascript:void(0)">特殊</a></li>
		<!--li class="n10" id="gt10"><a href="javascript:void(0)">趣味</a></li>
		<li class="n11" id="gt11"><a href="javascript:void(0)">伴舞</a></li>
		<li class="n12" id="gt12"><a href="javascript:void(0)">守护</a></li>
		<li class="n6" id="gt6"><a href="javascript:void(0)">贵族</a></li>
		<li class="n7" id="gt7"><a href="javascript:void(0)">幸运</a></li-->
	</ul>
<div class="giftul">
<?php
foreach($giftinfo as $cateid=>$gifts){
	if(!in_array($cateid, array(2,3,4,5,9)))continue;//分类为0,1的不显示,8是汽车
	if($cateid==2){
		$display='style="display:block"';
	}else{
		$display='style="display:none;"';
	}
	echo '<ul class="gift fix" id="gln'.$cateid.'" '.$display.'>';
	foreach($gifts as $gift){
?><li id="gift<?php echo $gift['giftid']?>"><img class="giftbig_wap gift_<?php echo $gift['giftid']?>_wap" src="/images/pixel.gif"/><span class="gfname"><?php echo $gift['giftname']?></span><span class="gfprice"><?php echo $gift['giftprice']?><?php echo $page_var['money_name']?></span></li>
<?php }
	echo '</ul>';
}?>
</div>
		<div class="clear"></div>
	</div>
	<div class="info">
		<span class="balance"><label>余额：</label><span>23</span></span>
		<a target="_blank" class="chargeLink" onclick="return islogin()" href="/iumobile/ucenter.php#pay">立即充值</a>
	</div>
	<div class="sendinfo">
		<label>送给</label>
		<div class="selectdiv">
			<select id="sendToUser">
				<option value="<?php echo $showinfo["userid"]?>"><?php echo $showinfo["nickname"]?></option>
			</select>
		</div>
		<div class="giftnum">
			<label>数量</label>
			<input type="text" value="1" id="sendGiftNum">
			<a href="javascript:;" id="giftShapeBtns"></a>
			<div style="display: none;" id="stdSps">
				<a href="javascript:;" rel="50" class="choosenumlist_s1">V(50个)</a>
				<a href="javascript:;" rel="99" class="choosenumlist_s2">心(99个)</a>
				<a href="javascript:;" rel="100" class="choosenumlist_s3">笑脸(100个)</a>
				<a href="javascript:;" rel="300" class="choosenumlist_s4">LOVE(300个)</a>
				<a href="javascript:;" rel="520" class="choosenumlist_s6">爱之箭(520个)</a>
				<a href="javascript:;" rel="999" class="choosenumlist_s5">比翼双飞(999个)</a>
				<a href="javascript:;" rel="1314" class="choosenumlist_s7">一生一世(1314个)</a>
				<a href="javascript:;" rel="3344" class="choosenumlist_s8">生生世世(3344个)</a>
			</div>
		</div>
		<button id="sendGiftBtn" class="sub icon">赠送</button>
	</div>
</div>