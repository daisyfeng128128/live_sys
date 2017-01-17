<?php 
$favcount = $db->GetOne("select COUNT(*) from bu_user_studio where showernumber=$roomnumber");
$photocount = $db->GetOne("select COUNT(*) from live_photo where userid=$showinfo[userid]");
?>
	<div class="head_toolspnl" style="height: 55px;position:relative;">
		<div class="head_toolspnl_top f14">
			<div class="wrap">
				<div class="col menubg wrapl"></div>
				<div class="col menubg wrapc"> 
				<a class="htt1_b htt orange" href="/<?php echo $roomnumber?>.html"><span class="icon"> </span>直播房间</a>
				<b class="icon"> </b>
				<span class="htt2_b htt btn_ss orange"><span class="icon"> </span>照片墙</span>
				</div>
				<div class="colr menubg wrapr"></div>
			</div>
			<a class="icon backLink" href="/">返回首页</a>
		</div>
	</div>
	<!--主播信息-->
	<div class="m56_com x56_mydate">
			<div class="fleft i56_myfig">
				<div class="i5_img">
                    <a target="_blank" href="/<?php echo $roomnumber?>.html">
                        <img src="/apis/avatar.php?uid=<?php echo $showinfo["userid"];?>" alt="<?php echo $showinfo["nickname"];?>">
                    </a> 
                </div>
				<div class="i6_num">
					<p class="fleft i6i_n1" style="margin-left: 34px;">
						<span class="fsf20"><?php echo $favcount;?></span>
						<span class="fsf12"><span class="anlink">粉丝</span></span>
					</p>
					<p class="fleft i6i_n3">
						<span class="fsf20"><?php echo $photocount;?></span>
						<span class="fsf12"><span class="anlink">照片</span></span>
					</p>
				</div>
			</div>
			<div class="fright i56_myinfo">
			   <div class="i5_auth">
				    <h2><?php echo $showinfo["nickname"];?></h2>
				    <p class="fsf16 m5i6_flive"><em class="r5ev_live"></em><em class="fsf16"><?php echo $showinfo["public_announce"]?></em></p>
			   </div>
			   <div class="i6_grade">
					<p class="fleft i6i_g1">主播等级：<em class="zlevel zlv<?php echo $showinfo["starlevel"]?>"></em></p>
					<p class="fleft i6i_g1">财富等级：<em class="level lv<?php echo $showinfo["richlevel"]?>"></em></p>
					<p class="fleft i6i_g5">性别：<?php echo $showinfo["gender"]=="1"?"男":"女";?></p>
				    <p class="fleft i6i_g7">房间号：<?php echo $roomnumber?></p>
				    <p class="fleft i6i_g8">地区：<span><?php echo $showinfo['province']?>-<?php echo $showinfo['city']?></span> </p>
			   </div>
			   <div class="i5_room">
				<span class="DD_png rev_btn rbv004"><a class="" href="/<?php echo $roomnumber?>.html">进入房间</a></span>
			   </div>
			</div>
	</div>
	<!--主播信息end-->