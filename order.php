<?php 
include("include/header.inc.php");
include($app_path."include/level.func.php");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="description" content="<?php echo $page_var['site_name']?>排行榜" />
<meta name="keywords" content="视频聊天,美女,视频交友" />
<title>排行榜 – <?php echo $page_var['site_name']?></title>
<link rel="stylesheet" href="<?php echo $page_var['cdn_domain']?>/css/topQ2v1.0.css" type="text/css" media="screen">
<link rel="stylesheet" href="<?php echo $page_var['cdn_domain']?>/css/level.css?20140402" type="text/css" media="screen" />
<link href="/css/gift.css?<?php echo time()?>" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="<?php echo $page_var['cdn_domain']?>/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<?php echo $page_var['cdn_domain']?>/js/login.js"></script>
<link rel="shortcut icon" href="new.ico" />
</head>
<body style="padding-top:60px;">
<?php 
$current_page="order";
include('tpl_header.php');
?>
<div id="main">
  <div class="clear"></div>
  <div class="mt20"></div>
  <div class="middle">
    <div class="topOrder20">
      <div class="col mr20">
        <div class="rank">
          <h1 class="rank_top fs20" title="主播收到的钱越多排名越靠前">明星排行榜</h1>
          <ul class="rank_sort">
            <li _tab="dayList" class="sort_current">日榜</li>
            <li>|</li>
            <li _tab="weekList">周榜</li>
            <li>|</li>
            <li _tab="monthList">月榜</li>
            <li>|</li>
            <li _tab="superList">超级</li>
          </ul>
          <em class="lb mt10"></em>
          <ul class="rank_list" _tab="dayList">
            <?php //昨天
			$i=0;
foreach (get_top_rank_mingxing("day",20) as $arr) {
			$i++;
			$arr=safe_output($arr);
			$arr['starlevel']=point2star($arr['totalpoint']);
			?>
			<?php if($i>=1&&$i<=3){?>
            <li class="rank_first">
              <em class="num num123"><?php echo $i?></em>
              <span class="rank_img rank_img_first"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></span>
              <a href="/<?php echo $arr['usernumber']?>.html" target="_blank" class="fa"><img src="<?php echo get_avatar_img($arr['userid']);?>"></a>
              <div class="rank_fcon"><span class="chp"><a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?></a></span>
              <span class="cnum"><span class="f_gray">房间号 <?php echo $arr['usernumber']?></span></span>
              </div>
            </li>
			<?php }else{?>
            <li><span class="rank_img"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></span><em class="num"><?php echo $i?></em>
            <a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?><span class="f_gray">(<?php echo $arr['usernumber']?>)</span></a>
            <span></span></li>
            <?php }}?>
          </ul>
          <ul class="rank_list" _tab="weekList">
            <?php //7天
			$i=0;
foreach (get_top_rank_mingxing("week",20) as $arr) {
			$i++;
			$arr=safe_output($arr);
			$arr['starlevel']=point2star($arr['totalpoint']);
			?>
			<?php if($i>=1&&$i<=3){?>
            <li class="rank_first">
              <em class="num num123"><?php echo $i?></em>
              <span class="rank_img rank_img_first"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></span>
              <a href="/<?php echo $arr['usernumber']?>.html" target="_blank" class="fa"><img src="<?php echo get_avatar_img($arr['userid']);?>"></a>
              <div class="rank_fcon"><span class="chp"><a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?></a></span>
              <span class="cnum"><span class="f_gray">房间号 <?php echo $arr['usernumber']?></span></span>
              </div>
            </li>
			<?php }else{?>
            <li><span class="rank_img"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></span><em class="num"><?php echo $i?></em>
            <a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?><span class="f_gray">(<?php echo $arr['usernumber']?>)</span></a>
            <span></span></li>
            <?php }}?>
          </ul>
          <ul class="rank_list" _tab="monthList">
            <?php //30天
			$i=0;
foreach (get_top_rank_mingxing("month",20) as $arr) {
			$i++;
			$arr=safe_output($arr);
			$arr['starlevel']=point2star($arr['totalpoint']);
			?>
			<?php if($i>=1&&$i<=3){?>
            <li class="rank_first">
              <em class="num num123"><?php echo $i?></em>
              <span class="rank_img rank_img_first"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></span>
              <a href="/<?php echo $arr['usernumber']?>.html" target="_blank" class="fa"><img src="<?php echo get_avatar_img($arr['userid']);?>"></a>
              <div class="rank_fcon"><span class="chp"><a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?></a></span>
              <span class="cnum"><span class="f_gray">房间号 <?php echo $arr['usernumber']?></span></span>
              </div>
            </li>
			<?php }else{?>
            <li><span class="rank_img"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></span><em class="num"><?php echo $i?></em>
            <a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?><span class="f_gray">(<?php echo $arr['usernumber']?>)</span></a>
            <span></span></li>
            <?php }}?>
          </ul>
          <ul class="rank_list" _tab="superList">
            <?php //总榜
			$i=0;
foreach (get_top_rank_mingxing("all",20) as $arr) {
			$i++;
			$arr=safe_output($arr);
			$arr['starlevel']=point2star($arr['totalpoint']);
			?>
			<?php if($i>=1&&$i<=3){?>
            <li class="rank_first">
              <em class="num num123"><?php echo $i?></em>
              <span class="rank_img rank_img_first"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></span>
              <a href="/<?php echo $arr['usernumber']?>.html" target="_blank" class="fa"><img src="<?php echo get_avatar_img($arr['userid']);?>"></a>
              <div class="rank_fcon"><span class="chp"><a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?></a></span>
              <span class="cnum"><span class="f_gray">房间号 <?php echo $arr['usernumber']?></span></span>
              </div>
            </li>
			<?php }else{?>
            <li><span class="rank_img"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></span><em class="num"><?php echo $i?></em>
            <a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?><span class="f_gray">(<?php echo $arr['usernumber']?>)</span></a>
            <span></span></li>
            <?php }}?>
          </ul>
          <div class="clear"></div>
        </div>
      </div>
      <div class="col mr20">
        <div class="rank">
          <h1 class="rank_top fs20" title="用户花出的钱越多排名越靠前">富豪排行榜</h1>
          <ul class="rank_sort">
            <li _tab="dayList" class="sort_current">日榜</li>
            <li>|</li>
            <li _tab="weekList">周榜</li>
            <li>|</li>
            <li _tab="monthList">月榜</li>
            <li>|</li>
            <li _tab="superList">超级</li>
          </ul>
          <em class="lb mt10"></em>
          <ul class="rank_list rank_fh" _tab="dayList">
            <?php //昨天
			$i=0;
foreach (get_top_rank_fuhao("day",20) as $arr) {
			$i++;
			$arr=safe_output($arr);
			$arr['richlevel']=cost2rich($arr['totalcost']);
			?>
			<?php if($i>=1&&$i<=3){?>
           
            <li class="rank_first">
              <em class="num num123"><?php echo $i?></em>
              <span class="rank_img rank_img_first"><em class="level lv<?php echo $arr['richlevel']?>"></em></span>
              <a href="javascript:;" class="fa"><img src="<?php echo get_avatar_img($arr['userid']);?>"></a>
              <div class="rank_fcon"><span class="chp"><a href="javascript:;"><?php echo $arr['nickname']?></a></span>
              <span class="cnum"><span class="fluck">(<?php echo $arr['usernumber']?>)</span></span>
              </div>
            </li>
			<?php }else{?>
            <!--<li><span class="rank_img"><em class="level lv10"></em></span><em class="num">4</em>
            <a href="javascript:;">铜锣湾扛把子<span class="fluck">(66666)</span></a>
            <span></span></li> -->
            <li><span class="rank_img"><em class="level lv<?php echo $arr['richlevel']?>"></em></span><em class="num"><?php echo $i?></em>
            <a href="javascript:;"><?php echo $arr['nickname']?><span class="fluck">(<?php echo $arr['usernumber']?>)</span></a>
            <span></span></li>
            <?php }}?>
          </ul>
          <ul class="rank_list rank_fh" _tab="weekList">
            <?php //7天
			$i=0;
foreach (get_top_rank_fuhao("week",20) as $arr) {
			$i++;
			$arr=safe_output($arr);
			$arr['richlevel']=cost2rich($arr['totalcost']);
			?>
			<?php if($i>=1&&$i<=3){?>
            <li class="rank_first">
              <em class="num num123"><?php echo $i?></em>
              <span class="rank_img rank_img_first"><em class="level lv<?php echo $arr['richlevel']?>"></em></span>
              <a href="javascript:;" class="fa"><img src="<?php echo get_avatar_img($arr['userid']);?>"></a>
              <div class="rank_fcon"><span class="chp"><a href="javascript:;"><?php echo $arr['nickname']?></a></span>
              <span class="cnum"><span class="fluck">(<?php echo $arr['usernumber']?>)</span></span>
              </div>
            </li>
			<?php }else{?>
            <li><span class="rank_img"><em class="level lv<?php echo $arr['richlevel']?>"></em></span><em class="num"><?php echo $i?></em>
            <a href="javascript:;"><?php echo $arr['nickname']?><span class="fluck">(<?php echo $arr['usernumber']?>)</span></a>
            <span></span></li>
            <?php }}?>
          </ul>
          <ul class="rank_list rank_fh" _tab="monthList">
            <?php //30天
			$i=0;
foreach (get_top_rank_fuhao("month",20) as $arr) {
			$i++;
			$arr=safe_output($arr);
			$arr['richlevel']=cost2rich($arr['totalcost']);
			?>
			<?php if($i>=1&&$i<=3){?>
            <li class="rank_first">
              <em class="num num123"><?php echo $i?></em>
              <span class="rank_img rank_img_first"><em class="level lv<?php echo $arr['richlevel']?>"></em></span>
              <a href="javascript:;" class="fa"><img src="<?php echo get_avatar_img($arr['userid']);?>"></a>
              <div class="rank_fcon"><span class="chp"><a href="javascript:;"><?php echo $arr['nickname']?></a></span>
              <span class="cnum"><span class="fluck">(<?php echo $arr['usernumber']?>)</span></span>
              </div>
            </li>
			<?php }else{?>
            <li><span class="rank_img"><em class="level lv<?php echo $arr['richlevel']?>"></em></span><em class="num"><?php echo $i?></em>
            <a href="javascript:;"><?php echo $arr['nickname']?><span class="fluck">(<?php echo $arr['usernumber']?>)</span></a>
            <span></span></li>
            <?php }}?>
          </ul>
          <ul class="rank_list rank_fh" _tab="superList">
            <?php //总榜
			$i=0;
foreach (get_top_rank_fuhao("all",20) as $arr) {
			$i++;
			$arr=safe_output($arr);
			$arr['richlevel']=cost2rich($arr['totalcost']);
			?>
			<?php if($i>=1&&$i<=3){?>
            <li class="rank_first">
              <em class="num num123"><?php echo $i?></em>
              <span class="rank_img rank_img_first"><em class="level lv<?php echo $arr['richlevel']?>"></em></span>
              <a href="javascript:;" class="fa"><img src="<?php echo get_avatar_img($arr['userid']);?>"></a>
              <div class="rank_fcon"><span class="chp"><a href="javascript:;"><?php echo $arr['nickname']?></a></span>
              <span class="cnum"><span class="fluck">(<?php echo $arr['usernumber']?>)</span></span>
              </div>
            </li>
			<?php }else{?>
            <li><span class="rank_img"><em class="level lv<?php echo $arr['richlevel']?>"></em></span><em class="num"><?php echo $i?></em>
            <a href="javascript:;"><?php echo $arr['nickname']?><span class="fluck">(<?php echo $arr['usernumber']?>)</span></a>
            <span></span></li>
            <?php }}?>
          </ul>
          <div class="clear"></div>
        </div>
      </div>
      <div class="col">
        <div class="rank">
          <h1 class="rank_top fs20" title="主播收到的掌声越多排名越靠前">人气排行榜</h1>
          <ul class="rank_sort">
            <li _tab="dayList" class="sort_current">日榜</li>
            <li>|</li>
            <li _tab="weekList">周榜</li>
            <li>|</li>
            <li _tab="monthList">月榜</li>
            <li>|</li>
            <li _tab="superList">超级</li>
          </ul>
          <em class="lb mt10"></em>
          <ul class="rank_list" _tab="dayList">
            <?php //昨天
			$i=0;
foreach (get_top_rank_renqi("day",20) as $arr) {
			$i++;
			$arr=safe_output($arr);
			$arr['starlevel']=point2star($arr['totalpoint']);
			?>
			<?php if($i>=1&&$i<=3){?>
            <li class="rank_first">
              <em class="num num123"><?php echo $i?></em>
              <span class="rank_img rank_img_first"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></span>
              <a href="/<?php echo $arr['usernumber']?>.html" target="_blank" class="fa"><img src="<?php echo get_avatar_img($arr['userid']);?>"></a>
              <div class="rank_fcon"><span class="chp"><a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?></a></span>
              <span class="cnum"><span class="f_gray">房间号 <?php echo $arr['usernumber']?></span></span>
              </div>
            </li>
			<?php }else{?>
            <li><span class="rank_img"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></span><em class="num"><?php echo $i?></em>
            <a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?><span class="f_gray">(<?php echo $arr['usernumber']?>)</span></a>
            <span></span></li>
            <?php }}?>
          </ul>
          <ul class="rank_list" _tab="weekList">
            <?php //7天
			$i=0;
foreach (get_top_rank_renqi("week",20) as $arr) {
			$i++;
			$arr=safe_output($arr);
			$arr['starlevel']=point2star($arr['totalpoint']);
			?>
			<?php if($i>=1&&$i<=3){?>
            <li class="rank_first">
              <em class="num num123"><?php echo $i?></em>
              <span class="rank_img rank_img_first"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></span>
              <a href="/<?php echo $arr['usernumber']?>.html" target="_blank" class="fa"><img src="<?php echo get_avatar_img($arr['userid']);?>"></a>
              <div class="rank_fcon"><span class="chp"><a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?></a></span>
              <span class="cnum"><span class="f_gray">房间号 <?php echo $arr['usernumber']?></span></span>
              </div>
            </li>
			<?php }else{?>
            <li><span class="rank_img"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></span><em class="num"><?php echo $i?></em>
            <a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?><span class="f_gray">(<?php echo $arr['usernumber']?>)</span></a>
            <span></span></li>
            <?php }}?>
          </ul>
          <ul class="rank_list" _tab="monthList">
            <?php //30天
			$i=0;
foreach (get_top_rank_renqi("month",20) as $arr) {
			$i++;
			$arr=safe_output($arr);
			$arr['starlevel']=point2star($arr['totalpoint']);
			?>
			<?php if($i>=1&&$i<=3){?>
            <li class="rank_first">
              <em class="num num123"><?php echo $i?></em>
              <span class="rank_img rank_img_first"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></span>
              <a href="/<?php echo $arr['usernumber']?>.html" target="_blank" class="fa"><img src="<?php echo get_avatar_img($arr['userid']);?>"></a>
              <div class="rank_fcon"><span class="chp"><a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?></a></span>
              <span class="cnum"><span class="f_gray">房间号 <?php echo $arr['usernumber']?></span></span>
              </div>
            </li>
			<?php }else{?>
            <li><span class="rank_img"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></span><em class="num"><?php echo $i?></em>
            <a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?><span class="f_gray">(<?php echo $arr['usernumber']?>)</span></a>
            <span></span></li>
            <?php }}?>
          </ul>
          <ul class="rank_list" _tab="superList">
            <?php //总榜
			$i=0;
foreach (get_top_rank_renqi("all",20) as $arr) {
			$i++;
			$arr=safe_output($arr);
			$arr['starlevel']=point2star($arr['totalpoint']);
			?>
			<?php if($i>=1&&$i<=3){?>
            <li class="rank_first">
              <em class="num num123"><?php echo $i?></em>
              <span class="rank_img rank_img_first"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></span>
              <a href="/<?php echo $arr['usernumber']?>.html" target="_blank" class="fa"><img src="<?php echo get_avatar_img($arr['userid']);?>"></a>
              <div class="rank_fcon"><span class="chp"><a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?></a></span>
              <span class="cnum"><span class="f_gray">房间号 <?php echo $arr['usernumber']?></span></span>
              </div>
            </li>
			<?php }else{?>
            <li><span class="rank_img"><em class="zlevel zlv<?php echo $arr['starlevel']?>"></em></span><em class="num"><?php echo $i?></em>
            <a href="/<?php echo $arr['usernumber']?>.html" target="_blank"><?php echo $arr['nickname']?><span class="f_gray">(<?php echo $arr['usernumber']?>)</span></a>
            <span></span></li>
            <?php }}?>
          </ul>
          <div class="clear"></div>
        </div>
      </div>
      <div class="colspan weekStar rank">
        <h1 class="rank_top fs20 " style="position:relative;">本周礼物周星榜<span class="trt ml10">（*如收到礼物数量相同，根据“先到先得”的规则评选礼物周星）</span></h1>
        <div class="clear"></div>
        <em class="bl2"></em>
        <ul id="giftCurRank">
<?php foreach (giftRank(0) as $v) {?>        
        <li><span class="lt"><img class="giftbig <?php echo str_replace(array('.png','.gif'),'',$v['giftimage'])?>" src="/images/pixel.gif"><?php echo $v["giftname"]?> <?php echo $v["giftnum"]?>个</span><span class="rt"><a target="_blank" href="/<?php echo $v["usernumber"]?>.html"><?php echo $v["nickname"]?></a><em class="zlevel zlv<?php echo point2star($v["totalpoint"])?>"></em></span></li>
<?php }?>
        </ul>
      </div>
      <div class="colspan weekStar rank">
        <h1 class="rank_top fs20 " style="position:relative;">上周礼物周星榜<span class="trt ml10">（*如收到礼物数量相同，根据“先到先得”的规则评选礼物周星）</span></h1>
        <div class="clear"></div>
        <em class="bl2"></em>
        <ul id="giftPreRank">
        <?php foreach (giftRank(1) as $v) {?>        
        <li><span class="lt"><img class="giftbig <?php echo str_replace(array('.png','.gif'),'',$v['giftimage'])?>" src="/images/pixel.gif"><?php echo $v["giftname"]?> <?php echo $v["giftnum"]?>个</span><span class="rt"><a target="_blank" href="/<?php echo $v["usernumber"]?>.html"><?php echo $v["nickname"]?></a><em class="zlevel zlv<?php echo point2star($v["totalpoint"])?>"></em></span></li>
<?php }?>
        </ul>
      </div>
    </div>
  </div>
</div>
<div class="clear ht20"></div>
<!--底部内容开始-->
<?php include('tpl_footer.php'); ?>
<!--底部内容结束-->
<div class="stat"> 
<script>
$(function(){
	$(".rank_list").hide();
	$(".rank_list").each(function(index, element) {
        if($(this).attr("_tab")=="dayList"){
			$(this).show();
		}else{
			$(this).hide();
		}
    });
	$(".rank_sort li").click(function(){
		var _tab=$(this).attr("_tab");
		if(_tab=="" || _tab==undefined){
			return false;
		}
		$(this).addClass("sort_current").siblings().removeClass("sort_current");
		$(this).parent().parent().children("ul.rank_list").each(function(index, element) {
			if($(this).attr("_tab")==_tab){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	});
//本周礼物周星榜,第三列右侧不要边框
	var bd=3;
	for(n=1;n<30;n++){
		var j=bd*n-1;	
		$("#giftCurRank li").eq(j).css("border-right","0");	
		$("#giftPreRank li").eq(j).css("border-right","0");
	}
	
});
refreshIndexLogin();
</script>
  <!--[if IE 6]>   
<script src="js/DD_belatedPNG.js" mce_src="DD_belatedPNG.js"></script>   
<script type="text/javascript">
$(function(){
 DD_belatedPNG.fix('#logo img,.zstar,.hot_top,em.zlevel,em.level,.box_head .box_close,.sublist_fav .camstate1,.sublist_fav .camstate2,.getNickName, .icons, .pngfix'); 
});
</script>
<![endif]--> 
</div>
</body>
</html>
<?php include("include/footer.inc.php");?>