<!--main-->
<div class="personbody">
<div class="person_left">
<?php 
$current_page="car";
include_once('./include/personal_tpl/person_menu.html');
?>
</div>
<div class="person_right">
<div class="person_tab">
<ul id="tags">
<li class="selectTag"><a href="javascript:void(0)">我的座驾</a></li>
</ul>
</div>
<div id="tagContent">
<!--我的订阅-->
<div class="tagContent selectTag" id="tagContent0">
<div class="basiccont">
<div class="mybook">
<a class="btn_car" href="/market.php#tab=1" style="margin-bottom:10px;">购买座驾</a>
<p style="color:red">注:如果当前没有启用的座驾则按有效期内价格最高的座驾进入房间!</p>
<?php 
$flage = false;
$rs=$db->Execute("select a.*,b.* from gift a, usercars b where b.carid=a.giftid and b.userid='{$user['userid']}'");
while($arr=$rs->FetchRow()){
$flage = true;
	$arr=safe_output($arr,true);
?>
<div class="bookzb">
<img style="margin-top:20px;" src="/static_data/car/smallimages/<?php echo $arr['giftimage']?>">
<p>座驾：<?php echo $arr['giftname']?> &nbsp;</p>

<?php if($arr['active']=="1" && $arr['vailddate']>time()){?>
	<p style="color:red">当前正在使用</p>
	<p>有效期：<?php echo date('Y-m-d',$arr['vailddate'])?></p>
<?php }else if($arr['vailddate']>time()){?>
	<p>有效期：<?php echo date('Y-m-d',$arr['vailddate'])?></p>
	<p><a class="btn_car" href="?action=caractive&carid=<?php echo $arr['carid']?>">启用</a><a class="btn_car" onClick="return confirm('确定此操作吗？')" href="?action=cardel&carid=<?php echo $arr['carid']?>">删除</a></p>
<?php }else{?>
	<p>已经过期</p>
	<p><a class="btn_car" onClick="return confirm('确定此操作吗？')" href="?action=cardel&carid=<?php echo $arr['carid']?>">删除</a></p>
<?php }?>
</div>
<?php 
}
if(!$flage){
?>
<?php }?>
</div>
</div>
</div>
</div>
</div>
</div>