<!--main-->
<div class="personbody">
<div class="person_left">
<?php 
$current_page="history";
include_once('./include/personal_tpl/person_menu.html');
?>
</div>
<div class="person_right">
<div class="person_tab">
<ul id="tags">
<li class="selectTag"><a href="javascript:void(0)">我的关注</a></li>
<!--li><a href="javascript:void(0)" onclick="selectTag('tagContent1',this)">我的收藏</a></li-->
<!--li><a href="javascript:void(0)" onclick="selectTag('tagContent2',this)">观看记录</a></li-->
</ul>
</div>
<div id="tagContent">
<!--我的订阅-->
<div class="tagContent selectTag" id="tagContent0">
<div class="basiccont">
<!--p class="tixiantxt">您最多可以收藏10个主播</p-->
<div class="mybook">
<?php 
$rs=$db->Execute("select a.* from user a, bu_user_studio b where b.showernumber=a.usernumber and b.userid='{$user['userid']}'");
while($arr=$rs->FetchRow()){
	$arr=safe_output($arr,true);
	$arr['starlevel']=point2star($arr['totalpoint']);
	//$arr['richlevel']=cost2rich($arr['totalcost']);
?>



<div class="sborder" style="border: 1px solid rgb(200, 200, 200);"><div class="spic">
<p class="lnum">
<a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><img width="130" height="98" src="/apis/avatar.php?uid=<?php echo $arr['userid']?>"></a><b class="offlive"></b>
<a class="btn_st" href="/<?php echo $arr['usernumber']?>.html" target="_blank" style="display: none;"></a></div>
<div class="sinfo">
<p class="lname"><span><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></em></span><a target="_blank" href="/<?php echo $arr['usernumber']?>.html"><?php echo urldecode($arr['nickname'])?>(<?php echo $arr['usernumber']?>)</a></p>
<p><span class="dFav"><span class="dline"></span> <a onclick="return confirm('确定要取消收藏吗')" href='/ucenter.php?action=cancelfav&showernumber=<?php echo $arr['usernumber']?>' class="dFav">取消关注</a></span></p>
<p>房间号：<?php echo $arr['usernumber']?><span class=""></span></p><p>开播时间：<span>不定时</span></p></div>
</div>
<?php 
}
?>



</div>
</div>
</div>
<!--我的订阅end-->
<!--我的收藏-->
<!--div  id="tagContent1" class="tagContent">
<div class="basiccont">
<div class="mybook">
<div class="bookzb">
<a href="javascript:void(0)"><img src="/images/zbdr1.jpg" class="bookzbimg"></a>
<em class="bookzbname"><a href="javascript:void(0)" >三世迷离(15151) </a></em>
<p class="bookzbinfo">性别：女</p>
<p class="bookzbinfo">地区：江苏省</p>
<p class="bookzbinfo">上次直播: 2012-07-18 09:47</p>
<p class="bookzbinfo">主播等级:<em class="ranklevel_1">1</em><em class="alive"></em></p>
<p class="bookzbinfo"><em class="bookzbbtn"><a href="javascript:void(0)">进入房间</a></em><em class="bookzbbtn"><a href="javascript:void(0)">取消收藏</a></em></p>
</div>
</div>
</div>
</div-->
<!--我的收藏end-->
<!--观看记录-->
<!--div  id="tagContent2" class="tagContent">
<div class="basiccont">
<div class="mybook">



<div class="bookzb">
<a href="javascript:void(0)"><img src="/images/zbdr1.jpg" class="bookzbimg"></a>
<em class="bookzbname"><a href="javascript:void(0)" >三世迷离(15151) </a></em>
<p class="bookzbinfo">性别：女</p>
<p class="bookzbinfo">地区：江苏省</p>
<p class="bookzbinfo">上次直播: 2012-07-18 09:47</p>
<p class="bookzbinfo">主播等级:<em class="ranklevel_1">1</em><em class="alive"></em></p>
<p class="bookzbinfo"><em class="bookzbbtn"><a href="javascript:void(0)">进入房间</a></em><em class="bookzbbtn"><a href="javascript:void(0)">删除记录</a></em></p>
</div>
</div>
</div>
</div-->
<!--观看记录end-->
</div>
</div>
</div>
<!--main-->