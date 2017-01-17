<?php
exit;
set_time_limit(0);
include('../include/header.inc.php');
include('../include/level.func.php');
ob_start();
?>	
<h2 class="order-title">
    	<p class="cl vm"><em class="fl">明星排行</em><a class="fr more-font f12" target="_blank" href="/?action=700001">更多 >></a></p>
    </h2>
	<div class="ranklist">
		<div class="item">
			<a href="javascript:void(0)" class="active showerbtn" id="showbtn0">日榜</a>
			<a class="showerbtn" id="showbtn1" href="javascript:void(0)">周榜</a><a class="showerbtn" id="showbtn2" href="javascript:void(0)">月榜</a>
			<a class="showerbtn" id="showbtn3" href="javascript:void(0)">总榜</a>
		</div>
		<div class="rankcont" style="display:block" id="showerorder0">
			<ul class="i_r_gift_list">
			<?php 
			//昨天
			$starttime=strtotime(date('Y-m-d 00:00:00',strtotime("-1 day")));
			$endtime=strtotime(date('Y-m-d 23:59:59',strtotime("-1 day")));
			$timewhen="(b.`when`>=$starttime and b.`when`<=$endtime)";
			$rs=$db->Selectlimit("SELECT a.nickname,a.usernumber,a.totalpoint, b.touserid, sum( b.money ) * -1 as cmoney FROM `balance_change_log` b,`user` a WHERE a.userid=b.touserid and b.why =1 and $timewhen GROUP BY b.touserid order by cmoney desc",6);
			$i=0;
			while($arr=$rs->FetchRow()){
			$i++;
			$arr=safe_output($arr);
			$arr['starlevel']=point2star($arr['totalpoint']);
			?>
			<ol>
			<li class="i_r_income_num"><?php echo $i?></li>
			<li class="i_r_income_name"><a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?></a></li>
			<li class="i_r_income_img"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></li>
			</ol>
			<?php 
			}
			?>
			</ul>
		</div>
		<div class="rankcont" id="showerorder1">
			<ul class="i_r_gift_list">
			<?php 
			//7天
			$endtime=strtotime(date('Y-m-d 00:00:00'));
			$starttime=$endtime-3600*24*7;
			$timewhen="(b.`when`>=$starttime and b.`when`<=$endtime)";
			$rs=$db->Selectlimit("SELECT a.nickname,a.usernumber,a.totalpoint, b.touserid, sum( b.money ) * -1 as cmoney FROM `balance_change_log` b,`user` a WHERE a.userid=b.touserid and b.why =1 and $timewhen GROUP BY b.touserid order by cmoney desc",6);
			$i=0;
			while($arr=$rs->FetchRow()){
			$i++;
			$arr=safe_output($arr);
			$arr['starlevel']=point2star($arr['totalpoint']);
			?>
			<ol>
			<li class="i_r_income_num"><?php echo $i?></li>
			<li class="i_r_income_name"><a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?></a></li>
			<li class="i_r_income_img"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></li>
			</ol>
			<?php 
			}
			?>
			</ul>
		</div>
		<div class="rankcont" id="showerorder2">
			<ul class="i_r_gift_list">
			<?php 
			//30天
			$endtime=strtotime(date('Y-m-d 00:00:00'));
			//$starttime=strtotime(date('Y-m-1 00:00:00',strtotime("-1 month")));
			$starttime=$endtime-30*24*3600;
			$timewhen="(b.`when`>=$starttime and b.`when`<=$endtime)";
			$rs=$db->Selectlimit("SELECT a.nickname,a.usernumber,a.totalpoint, b.touserid, sum( b.money ) * -1 as cmoney FROM `balance_change_log` b,`user` a WHERE a.userid=b.touserid and b.why =1 and $timewhen GROUP BY b.touserid order by cmoney desc",6);
			$i=0;
			while($arr=$rs->FetchRow()){
			$i++;
			$arr=safe_output($arr);
			$arr['starlevel']=point2star($arr['totalpoint']);
			?>
			<ol>
			<li class="i_r_income_num"><?php echo $i?></li>
			<li class="i_r_income_name"><a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?></a></li>
			<li class="i_r_income_img"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></li>
			</ol>
			<?php 
			}
			?>
			</ul>
		</div>
		<div class="rankcont" id="showerorder3">
			<ul class="i_r_gift_list">
			<?php 
			//总榜
			$timewhen="1";
			$rs=$db->Selectlimit("SELECT a.nickname,a.usernumber,a.totalpoint, b.touserid, sum( b.money ) * -1 as cmoney FROM `balance_change_log` b,`user` a WHERE a.userid=b.touserid and b.why =1 and $timewhen GROUP BY b.touserid order by cmoney desc",6);
			$i=0;
			while($arr=$rs->FetchRow()){
			$i++;
			$arr=safe_output($arr);
			$arr['starlevel']=point2star($arr['totalpoint']);
			?>
			<ol>
			<li class="i_r_income_num"><?php echo $i?></li>
			<li class="i_r_income_name"><a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?></a></li>
			<li class="i_r_income_img"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></li>
			</ol>
			<?php 
			}
			?>
			</ul>
		</div>
	</div>
	<h2 class="order-title">
            	<p class="cl vm"><em class="fl">富豪排行</em><a class="fr more-font f12" target="_blank" href="/?action=700001">更多 >></a></p>
    </h2>
  <div class="ranklist">
	<div class="item">
		<a href="javascript:void(0)" class="richerbtn active" id="richbtn0">日榜</a>
		<a href="javascript:void(0)" class="richerbtn" id="richbtn1">周榜</a>
		<a href="javascript:void(0)" class="richerbtn" id="richbtn2">月榜</a>
		<a href="javascript:void(0)" class="richerbtn" id="richbtn3">总榜</a>
	</div>
	<div class="rankcont" style="display:block" id="richerorder0">
		<ul class="i_r_gift_list">
		<?php 
		//昨天
		$starttime=strtotime(date('Y-m-d 00:00:00',strtotime("-1 day")));
		$endtime=strtotime(date('Y-m-d 23:59:59',strtotime("-1 day")));
		$timewhen="(b.`when`>=$starttime and b.`when`<=$endtime)";
		$rs=$db->Selectlimit("SELECT a.nickname,a.usernumber,a.totalcost, b.userid, sum( b.money ) * -1 as cmoney FROM `balance_change_log` b,`user` a WHERE a.userid=b.userid and b.why =1 and $timewhen GROUP BY b.userid order by cmoney desc",6);
		$i=0;
		while($arr=$rs->FetchRow()){
		$i++;
		$arr=safe_output($arr);
		$arr['richlevel']=cost2rich($arr['totalcost']);
		?>
		<ol>
		<li class="i_r_income_num"><?php echo $i?></li>
		<li class="i_r_income_name"><?php echo $arr['nickname']?></li>
		<li class="i_r_income_img"><em class="level lv<?php echo $arr['richlevel']?>"></em></li>
		</ol>
		<?php 
		}
		?>
		</ul>
	</div>
	<div class="rankcont" id="richerorder1">
		<ul class="i_r_gift_list">
		<?php 
		//7天
		//$starttime=strtotime("last monday");
		$endtime=strtotime(date('Y-m-d 00:00:00'));
		$starttime=$endtime-7*24*3600;
		$timewhen="(b.`when`>=$starttime and b.`when`<=$endtime)";
		$rs=$db->Selectlimit("SELECT a.nickname,a.usernumber,a.totalcost, b.userid, sum( b.money ) * -1 as cmoney FROM `balance_change_log` b,`user` a WHERE a.userid=b.userid and b.why =1 and $timewhen GROUP BY b.userid order by cmoney desc",6);
		$i=0;
		while($arr=$rs->FetchRow()){
		$i++;
		$arr=safe_output($arr);
		$arr['richlevel']=cost2rich($arr['totalcost']);
		?>
		<ol>
		<li class="i_r_income_num"><?php echo $i?></li>
		<li class="i_r_income_name"><?php echo $arr['nickname']?></li>
		<li class="i_r_income_img"><em class="level lv<?php echo $arr['richlevel']?>"></em></li>
		</ol>
		<?php 
		}
		?>
		</ul>
	</div>
	<div class="rankcont" id="richerorder2">
		<ul class="i_r_gift_list">
		<?php 
		//30天
		//$starttime=strtotime(date('Y-m-1 00:00:00',strtotime("-1 month")));
		//$endtime=$starttime+3600*24*30;
		$endtime=strtotime(date('Y-m-d 00:00:00'));
		$starttime=$endtime-30*24*3600;
		$timewhen="(b.`when`>=$starttime and b.`when`<=$endtime)";
		$rs=$db->Selectlimit("SELECT a.nickname,a.usernumber,a.totalcost, b.userid, sum( b.money ) * -1 as cmoney FROM `balance_change_log` b,`user` a WHERE a.userid=b.userid and b.why =1 and $timewhen GROUP BY b.userid order by cmoney desc",6);
		$i=0;
		while($arr=$rs->FetchRow()){
		$i++;
		$arr=safe_output($arr);
		$arr['richlevel']=cost2rich($arr['totalcost']);
		?>
		<ol>
		<li class="i_r_income_num"><?php echo $i?></li>
		<li class="i_r_income_name"><?php echo $arr['nickname']?></li>
		<li class="i_r_income_img"><em class="level lv<?php echo $arr['richlevel']?>"></em></li>
		</ol>
		<?php 
		}
		?>
		</ul>
	</div>
	<div class="rankcont" id="richerorder3">
		<ul class="i_r_gift_list">
		<?php 
		//总榜
		$timewhen="1";
		$rs=$db->Selectlimit("SELECT a.nickname,a.usernumber,a.totalcost, b.userid, sum( b.money ) * -1 as cmoney FROM `balance_change_log` b,`user` a WHERE a.userid=b.userid and b.why =1 and $timewhen GROUP BY b.userid order by cmoney desc",6);
		$i=0;
		while($arr=$rs->FetchRow()){
		$i++;
		$arr=safe_output($arr);
		$arr['richlevel']=cost2rich($arr['totalcost']);
		?>
		<ol>
		<li class="i_r_income_num"><?php echo $i?></li>
		<li class="i_r_income_name"><?php echo $arr['nickname']?></li>
		<li class="i_r_income_img"><em class="level lv<?php echo $arr['richlevel']?>"></em></li>
		</ol>
		<?php 
		}
		?>
		</ul>
	</div>
  </div>
<?php 
$html = ob_get_contents();
file_put_contents('../templates/rank.html',$html);
unset($html);
ob_end_clean();
?>