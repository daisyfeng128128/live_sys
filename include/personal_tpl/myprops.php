<!--main-->
<div class="personbody">
<div class="person_left">
<?php 
$current_page="myprops";
include_once('./include/personal_tpl/person_menu.html');
?>
</div>
<div class="person_right">
<div class="person_tab">
<ul id="tags">
<li class="selectTag"><a href="javascript:void(0)">我的道具</a></li>
</ul>
</div>
<div id="tagContent">
<!--我的订阅-->
<div class="tagContent selectTag" id="tagContent0">
<div class="basiccont">
<div class="mybook buy_props">

<table width="100%" cellspacing="0" cellpadding="0" border="0">
	<tbody>
		<tr class="tdtitle"> 
			<td width="20%">道具</td>
			<td>威力</td>
			<td width="25%">有效期/剩余数量</td>
		</tr>
<?php if($user["yinshen_vailddate"]>time() && $user["yinshen"]=="1"){?>
		<tr> 
			<td>隐身符</td>
			<td>进入房间，不会展示欢迎语
改为提示“有人“咻”的一声进入了房间”</td>
			<td><?php echo date("Y-m-d H:i:s",$user["yinshen_vailddate"]);?></td>
		</tr>
<?php }?>
<?php 
$giftstore = $db->GetArray("select * from giftstore where userid='{$user['userid']}'");
$daoju = array();
foreach ($giftstore as $key => $value) {
	$daoju[$value["giftid"]] = $value;
}
?>
<?php if(isset($daoju["1"]) && $daoju["1"]["num"]>0):
$gift1 = $db->CacheGetOne(86400,"select giftname from gift where giftid=1");
?>
		<tr> 
			<td><?php echo $gift1?></td>
			<td>在房间内给主播送<?php echo $gift1?></td>
			<td><?php echo $daoju["1"]["num"];?></td>
		</tr>
<?php endif;?>
<?php if(isset($daoju["65"]) && $daoju["65"]["num"]>0):?>
		<tr> 
			<td>喇叭</td>
			<td>喇叭可用于发布广播</td>
			<td><?php echo $daoju["65"]["num"];?></td>
		</tr>
<?php endif;?>


	</tbody>
</table>
	
</div>
</div>
</div>
</div>
</div>
</div>