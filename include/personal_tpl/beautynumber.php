<!--main-->
<div class="personbody">
<!--left-->
<div class="person_left">

<?php $current_page="number";
include_once('./include/personal_tpl/person_menu.html');
?>

</div>
<!--leftend-->
<!--right-->
<div class="person_right">
<h3 class="righttitle"><span class="lhtxt">我的靓号</span><span class="buylh"><a href="/market.php#tab=3" target="_blank">购买其他靓号？</a></span></h3>
<div class="rightcont">
<div class="lhcont">
<table cellpadding="0" cellspacing="0" border="0" width="100%" class="tablelist">
<thead>
<tr><td>靓号</td><td>操作项</td></tr>
</thead>
<tbody>
<?php $rs=$db->Execute("select * from user_number where userid='{$user['userid']}'");
while($arr=$rs->FetchRow()){
?>
<tr>
<td><?php echo $arr['number']?></td>
<td>
<?php if($arr['number']==$user['usernumber']){
	echo '正在使用';
	$btn="";
} 
else{
	
	$btn='<a href="?action=usenumber&number='.$arr['number'].'" target="ipost"><img src="images/qy.gif" /></a>';
	echo $btn;
}
?>
</td>
</tr>
<?php }
?>
</tbody>
</table>
</div>
</div>
</div>
</div>
<!--mainend-->