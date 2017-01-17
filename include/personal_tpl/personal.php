<div class="personbody">
<div class="person_left">
<?php $current_page="person";
include_once('./include/personal_tpl/person_menu.html');
?>
</div>
<div class="person_right">
<div class="person_tab">
<ul id="tags">
<li class="selectTag"><a href="javascript:void(0)" onclick="selectTag('tagContent0',this)" id="tag0Btn">基本资料</a></li>
<li><a href="javascript:void(0)" onclick="selectTag('tagContent1',this)"  id="tag1Btn">修改昵称</a></li>
<li><a href="javascript:void(0)" onclick="selectTag('tagContent2',this)"  id="tag2Btn">修改密码</a></li>
<li><a href="javascript:void(0)" onclick="selectTag('tagContent3',this)"  id="tag3Btn">修改邮箱</a></li>
<!--li><a href="javascript:void(0)" onclick="selectTag('tagContent4',this)">帐号信息</a></li-->
</ul>
</div>
<div id="tagContent">
<!--基本资料-->
<div class="tagContent selectTag" id="tagContent0">
<div class="basiccont">
<ul>
<li><em><?php echo $user['nickname']?>(<?php echo $user['usernumber']?>)</em></li>
<li class="basiclevel">主播等级：<em class="zlevel zlv<?php echo $user['starlevel']?>"></em><?php if($user['starlevel']!=count($point_array)-1){ ?>距离<em class="zlevel zlv<?php echo $user['starlevel']+1?>"></em>还差<?php echo ($point_array[$user['starlevel']+1]-$user['totalpoint'])?><?php echo $page_var['money_name2']?><?php }?></li>
<li class="basiclevel">富豪等级：<em class="level lv<?php echo $user['richlevel']?>"></em><?php if($user['richlevel']!=count($cost_array)-1){ ?>距离<em class="level lv<?php echo $user['richlevel']+1?>"></em>还差<?php echo ($cost_array[$user['richlevel']+1]-$user['totalcost'])?><?php echo $page_var['money_name']?><?php }?></li>
<li class="basiclevel">VIP等级：
<?php if($user['vip_vailddate']>time()):?>
<img src="/images/vip<?php echo $user['viplevel']?>.gif">&nbsp;有效期截止到:<?php echo date("Y-m-d H:i:s",$user['vip_vailddate']);?>
<?php else:?>
无&nbsp;<a href="/market.php#tab=0" style="color:red">立即购买</a>
<?php endif;?>
</li>
<li>
<!--div><img src="/apis/avatar.php?uid=<?php echo $user['userid']?>&_t=<?php echo time();?>" width="120" height="96" class="personavatar" id="personavatar" /></div-->
<div>
	<p id="swfContainer">
		本组件需要安装Flash Player后才可使用，请从<a href="http://www.adobe.com/go/getflashplayer">这里</a>下载安装。
	</p>
<button type="button" id="upload" style="display:none;margin-top:8px;"></button>
</div>
</li>
<form action="?action=base" target="ipost" method="post">
<li><label>出生日期：</label><em>
<select name="year" id="year">
	<option value="">年</option>
<optgroup label="00后">
	<option>2000</option>
	<option>2001</option>
	<option>2002</option>
	<option>2003</option>
	<option>2004</option>
	<option>2005</option>
	<option>2006</option>
	<option>2007</option>
	<option>2008</option>
	<option>2009</option>
</optgroup>
<optgroup label="90后">
	<option>1990</option>
	<option>1991</option>
	<option>1992</option>
	<option>1993</option>
	<option>1994</option>
	<option>1995</option>
	<option>1996</option>
	<option>1997</option>
	<option>1998</option>
	<option>1999</option>
</optgroup>
<optgroup label="80后">
	<option>1980</option>
	<option>1981</option>
	<option>1982</option>
	<option>1983</option>
	<option>1984</option>
	<option>1985</option>
	<option>1986</option>
	<option>1987</option>
	<option>1988</option>
	<option>1989</option>
</optgroup>
<optgroup label="70后">
	<option>1970</option>
	<option>1971</option>
	<option>1972</option>
	<option>1973</option>
	<option>1974</option>
	<option>1975</option>
	<option>1976</option>
	<option>1977</option>
	<option>1978</option>
	<option>1979</option>
</optgroup>
<optgroup label="60后">
	<option>1965</option>
	<option>1966</option>
	<option>1967</option>
	<option>1968</option>
	<option>1969</option>
</optgroup>

</select>
<select name="month" id="month">
	<option value="">月</option>
	<option>01</option>
	<option>02</option>
	<option>03</option>
	<option>04</option>
	<option>05</option>
	<option>06</option>
	<option>07</option>
	<option>08</option>
	<option>09</option>
	<option>10</option>
	<option>11</option>
	<option>12</option>
</select>
<select name="day" id="day">
	<option value="">日</option>
	<option>01</option>
	<option>02</option>
	<option>03</option>
	<option>04</option>
	<option>05</option>
	<option>06</option>
	<option>07</option>
	<option>08</option>
	<option>09</option>
	<option>10</option>
	<option>11</option>
	<option>12</option>
	<option>13</option>
	<option>14</option>
	<option>15</option>
	<option>16</option>
	<option>17</option>
	<option>18</option>
	<option>19</option>
	<option>20</option>
	<option>21</option>
	<option>22</option>
	<option>23</option>
	<option>24</option>
	<option>25</option>
	<option>26</option>
	<option>27</option>
	<option>28</option>
	<option>29</option>
	<option>30</option>
	<option>31</option>
</select>
<script>
function birthday_selected(year,month,day){
	var count=$("#year option").length;
	for(var i=0;i<count;i++){
		if($("#year").get(0).options[i].text == year)  
		{  
			$("#year").get(0).options[i].selected = true;  
			break;
		}  
	} 
	var count=$("#month option").length;
	for(var i=0;i<count;i++){
		if($("#month").get(0).options[i].text == month)  
		{  
			$("#month").get(0).options[i].selected = true;  
			break;
		}  
	}
	var count=$("#day option").length;
	for(var i=0;i<count;i++){
		if($("#day").get(0).options[i].text == day)  
		{  
			$("#day").get(0).options[i].selected = true;  
			break;
		}  
	}
}
birthday_selected(<?php echo (int)$birthday_year?>,<?php echo (int)$birthday_month?>,<?php echo (int)$birthday_day?>);
</script>
</em></li>
<li><label>性&nbsp;&nbsp;&nbsp;&nbsp;别：</label><em><input class="inputnoborder" type="radio" name="gender" value='0' id="female" <?php echo $femalechecked?>><label for="female">女</label><input type="radio" class="inputnoborder" name="gender" value='1' id="male" <?php echo $malechecked?>><label for="male">男</label></em></li>
<li><label>地&nbsp;&nbsp;&nbsp;&nbsp;区：</label><em><select name="province"></select><select name="city"></select></em></li>
<script language="javascript" src="js/PCASClass.js"></script>
<script>new PCAS("province","city","<?php echo $user['province']?>","<?php echo $user['city']?>");</script>
<li><input type="submit" class="sure" value="提交" /></li>
</form>
</ul>
</div>
</div>
<!--基本资料end-->
<!--修改昵称-->
<div  id="tagContent1" class="tagContent">
<div class="basiccont">
<form action="?action=nickname" target="ipost" method="post">
<ul>
<li><label>当前昵称：</label><em><?php echo $user['nickname']?></em></li>
<li><label>修改昵称：</label><em><input type="text"  class="infotxt" name="nickname"/></em></li>
<li><span class="attention">注：修改昵称后原昵称可能被抢注。昵称不允许含有 ',",-,|,空格,</span></li>
<li><input type="submit" class="sure" value="确定" /></li>
</ul>
</form>
</div>
</div>
<!--修改昵称end-->
<!--修改密码-->
<div id="tagContent2" class="tagContent">
<div class="basiccont">
<form action="?action=password" target="ipost" method="post">
<ul>
<li><label>当前密码：</label><em><input type="password"  class="infotxt" name="current_password"/></em></li>
</ul>
</div>
<div class="basiccont">
<ul>
<li><label>新&nbsp;密&nbsp;码：</label><em><input type="password"  class="infotxt" name="new_password" /></em><em class="attention"> 6~30个字符，区分大小写</em></li>
<li><label>密码确认：</label><em><input type="password"  class="infotxt" name="new_repassword" /></em></li>
<li><input type="submit" class="sure" value="提交" /></li>
<li><span class="attention">备注：QQ,sina登录用户不可用</span></li>
</ul>
</form>
</div>
</div>
<!--修改密码end-->
<!--验证邮箱-->
<div  id="tagContent3" class="tagContent">
<div class="basiccont">
<ul>
<li><?php echo $user['email']?></li>
</ul>
</div>

<div class="basiccont">
<form action="?action=email" target="ipost" method="post">
<ul>
<li><label class="srmmlable">输入密码：</label><em><input type="password" name="current_password"  class="infotxt"/></em></li>
<li><label>新安全邮箱：</label><em><input type="text" name="email"  class="infotxt"/></em></li>
<li><input type="submit" class="sure" value="提交" /></li>
<li><span class="attention">修改安全邮箱后，密码找回时密码重置邮件将发送到此邮箱中<br />备注：QQ,sina登录用户不可用</span></li>
</ul>
</form>
</div>
</div>
<!--验证邮箱end-->
<!--帐号信息-->
<div  id="tagContent4" class="tagContent">
<div class="basiccont">
<ul>
<li><label>富豪等级：</label><em class="fhrank_1">1</em><span class="levelbar"></span><em class="fhrank_2">2</em></li>
<li><label>主播等级： </label><em class="ranklevel_1">1</em><span class="levelbar"></span> <em class="ranklevel_2">2</em></li>
</ul>
</div>
</div>
<!--帐号信息end-->
</div>
</div>
</div>
<script src="<?php echo $page_var['cdn_domain']?>/js/swfobject.js"></script>
<script src="<?php echo $page_var['cdn_domain']?>/js/fullAvatarEditor.js"></script>
<script>
function avatarUploadComplete(){
	$("#personavatar").attr("src","/apis/avatar.php?uid=<?php echo $user['userid']?>&_t="+new Date().getTime());
}
$(function(){
	//swfobject.embedSWF("/static_data/swf/uploadavatar.swf?chf=<?php echo $_COOKIE['HFCOOKIE']?>", "uploadavatarbtn", "130", "38", "10.0.0", "expressInstall.swf",{confadd:"<?php echo _SWF_CONF_ADD_?>"},{wmode: "transparent",allowScriptAccess: "always"});
	swfobject.addDomLoadEvent(function () {
				var swf = new fullAvatarEditor("/static_data/swf/fullAvatarEditor.swf", "/static_data/swf/expressInstall.swf", "swfContainer", {
					    id : 'uploadavatarbtn',
						upload_url : 'avatarupload.php?username=looselive',	//上传接口
						method : 'post',	//传递到上传接口中的查询参数的提交方式。更改该值时，请注意更改上传接口中的查询参数的接收方式
						src_upload : 0,		//是否上传原图片的选项，有以下值：0-不上传；1-上传；2-显示复选框由用户选择
						avatar_box_border_width : 0,
						avatar_sizes : '175*131',
						//src_url : '/apis/avatar.php?null=1&uid=<?php echo $user["userid"]?>',
						avatar_sizes_desc : '175*131像素'
					}, function (msg) {
						switch(msg.code)
						{
							case 1 : break;//页面成功加载了组件！
							case 2 : //已成功加载图片到编辑面板。
								document.getElementById("upload").style.display = "inline";
								break;
							case 3 :
								if(msg.type == 0)
								{
									alert("摄像头已准备就绪且用户已允许使用。");
								}
								else if(msg.type == 1)
								{
									alert("摄像头已准备就绪但用户未允许使用！");
								}
								else
								{
									alert("摄像头被占用！");
								}
							break;
							case 5 : 
								avatarUploadComplete();
							break;
						}
					}
				);
				document.getElementById("upload").onclick=function(){
					swf.call("upload");
				};
            });
});
</script>
<?php if($_GET['t']){
echo '<script>$("#tag'.$_GET['t'].'Btn").click()</script>';
}
?>