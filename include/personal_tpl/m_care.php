<!--main-->
<div class="inmiddle">
    <?php
        $current_page="care";
        include_once('./include/personal_tpl/center-info.php');
        include_once('./include/personal_tpl/menu_left.php');
    ?>


    <div class="center-right">

    <div class="cr-care" >
        <div class="cr-title">我的关注</div>
        <div class="cr-care-main">
            <?php

            $rs=$db->Execute("select b.roomNumber,
(SELECT o.online from bu_user_online o where o.roomnumber = b.roomNumber and o.anchors=1) online,
u.nickname,u.userId,u.avatar,
a.followeds
from  bu_user_studio b,bu_user u,bu_user_anchors a
where b.userId='{$user['userId']}'
and a.roomNumber = b.roomNumber
and u.userId = a.userId
and b.isFollow =1
");
            while($arr=$rs->FetchRow()){
                $arr=safe_output($arr,true);
                $arr['starlevel']=point2star($arr['totalpoint']);
                $arr['nickname'] = urldecode($arr['nickname']);
                ?>
                <div class="care-li">
                    <div class="care-img"><a href="/<?php echo $arr['roomNumber']?>.html"><img src="<?php echo _IMAGES_DOMAIN_."/".$arr['avatar']?>" alt="name"></a></div>
                    <div class="care-info">
                        <div class="care-title">
                            <input type="hidden" value="<?php echo $arr['roomNumber']?>" id="usernumber"/>
                            <span class="care-an-level sprite liverlevel-pic_liverlevel_<?php echo $arr['starlevel'] ?>"></span><span class="care-an-name"><a href="/<?php echo $arr['roomNumber']?>.html"><?php echo $arr['nickname']?></a></span>
                        </div>
                        <div class="care-fans-num"><?php echo $arr['followeds']?>粉丝</div><div class="canel-care"><a href='javascript:void(0)' onclick="seajs.use('ajax/cancelCare', function(test){ test.showBox();});">取消关注</a></div>
                        <?php
                            if($arr['online']) {
                          ?>
                                <div class="care-current-title">直播中</div>
                        <?php
                            }else{
                         ?>
                             <div class="care-next-title">下次开播时间</div>
                         <?php
                            }
                        ?>
                        <div class="care-next-time">12月10日  13:00</div>
                    </div>
                </div>
            <?php
            }
            ?>
<!--            <div class="care-li">
                    <div class="care-img"><img src="http://r4.ykimg.com/05100000566A96CF67BC3D026E00F9D9"></div>
                    <div class="care-info">
                        <div class="care-title">
                            <span care="care-an-level">lv12</span><span calss="care-an-name">愤怒的龙木耳</span>
                        </div>
                        <div class="care-fans-num">222粉丝</div>
                        <div class="care-next-title">下次开播时间</div>
                        <div class="care-next-time">12月10日  13:00</div>
                    </div>

            </div>-->

        </div>
    </div>
</div>
    <div class="win-phone iscc" style="display: none;" >
        <div class="find-bump-title">温馨提示 <div class="find-bump-oxx"></div></div>
        <div class="issc-tips"> 取消了<span><?php echo $arr['nickname'];?></span>的关注后,您在本播间的贡献值讲清零,请问您还要取消吗?</div>
        <div class="issc-button"><button class="small-button" id="sure-cc">确定</button><button  id="no-cc" class="small-button">取消</button></div>
    </div>

</div>
</div>


<!--main-->

<?php include('tpl_footer.php'); ?>

</body>
</html>