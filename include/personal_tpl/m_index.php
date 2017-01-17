<!--main-->
<div class="inmiddle">
    <?php
    $current_page="index";
    include_once('./include/personal_tpl/center-info.php');
    include_once('./include/personal_tpl/menu_left.php');
    ?>

    <div class="center-right">
        <div class="mindex-title">我的首页</div>
        <div class="mindex-level-area">
            <div class="titleee"><span class="lev-inf">等级信息</span><span class="blank-btline"></span></div>
            <div class="info-middle active-level">
                <div class="c-mylevel">活跃等级</div>
                <div class="c-level-bar">
                    <div class="center-level activelevel sprite activelevel-pic_activelevel_<?php echo $user['active'];?>"></div>
                    <div class="c-all-bars">
                        <div class="c-i-bar" style="width:<?php echo $user['nextActive']?>%"></div>
                    </div>
                    <div  class="center-level  activelevel sprite activelevel-pic_activelevel_<?php echo $user['active']+1;?>"></div>
                </div>
                <div class="c-level-message" style="margin-left:30px; ">还差<?php echo $user['activeDiffer']?>经验升级 </div>
            </div>

            <div class="info-middle  mindex-level">
                <div class="c-mylevel">我的爵位</div>
                <div class="c-level-bar">
                    <div class="center-level sprite consumelevel-pic_consumelevel_<?php echo $user['spender'];?>"></div>
                    <div class="c-all-bars">
                        <div class="c-i-bar" style="width:<?php echo $user['nextSpender']?>%"></div>
                    </div>
                    <div class="center-level sprite consumelevel-pic_consumelevel_<?php echo $user['spender']+1;?>"></div>
                </div>
                <div class="c-level-message">消费<?php echo $user['differ'];?>蚪币升级</div>
            </div>
        </div>

        <div class="mindex-else-title"> 我守护的</div>
        <div class="mycare-list">
            <?php
                $datas = curl_post(_INTERFACE_."/rest/personCenter/myGuard.mt","userid=$user[userId]");
                $acceptData=json_decode($datas, true);
                foreach($acceptData[data] as $k=>$v) {
            ?>

                    <div class="mycare-box">
                        <div class="mycare-box-left">
                            <div class="careImg"><a href="/<?php echo $v['roomNumber'];?>"><img src="<?php echo $v['himage']?>"/></a></div>
                        </div>
                        <div class="mycare-box-right">
                            <div class="mybr1"><span class="mbysp1"><a href="/<?php echo $v['roomNumber'];?>"><?php echo urldecode($v['name'])?></a></span> <span class="mbysp2">守护中..</span></div>
                            <div class="mybr2"><?php echo $v['followeds']?> 粉丝</div>
                            <div class="mybr3">守护等级：<span class="color33"><?php echo $v['grds']?></span></div>
                            <div class="mybr4">剩余天数：<span class="colorcc"><?php echo $v['days']?> </span>天</div>
                            <a class="mindex-recharge-button" href="/pay.php">充值</a>
                        </div>
                    </div>
            <?php
                }
            ?>
        </div>
        <div class="mindex-else-title"> 我的进场特效</div>
            <div class="mcar-list">

                <?php
                /*
                SELECT g.giftid,g.giftimage,g.giftname,g.giftprice,

(SELECT if(Count(1) = 1,1,0) FROM  bu_user_cars c WHERE  g.giftid = c.giftId AND c.userId = 1006) as ts,
(SELECT c.active FROM  bu_user_cars c WHERE  g.giftid = c.giftId AND c.userId = 1006) as active,
(SELECT c.valiDT FROM  bu_user_cars c WHERE  g.giftid = c.giftId AND c.userId = 1006) as valiDT,
(SELECT c.id FROM  bu_user_cars c WHERE  g.giftid = c.giftId AND c.userId = 1006) as id
FROM gift g where g.giftcateid = 8*/

                $flage = false;
                $rs=$db->Execute("SELECT g.giftid,g.giftimage,g.giftname,g.giftprice,
(SELECT if(Count(1) = 1,1,0) FROM  bu_user_cars c WHERE  g.giftid = c.giftId AND c.userId = $user[userId] AND c.`status`=1) as ts,
(SELECT c.active FROM  bu_user_cars c WHERE  g.giftid = c.giftId AND c.userId = $user[userId] AND c.`status`=1) as active,
(SELECT c.valiDT FROM  bu_user_cars c WHERE  g.giftid = c.giftId AND c.userId = $user[userId] AND c.`status`=1) as valiDT,
(SELECT c.id FROM  bu_user_cars c WHERE  g.giftid = c.giftId AND c.userId = $user[userId] AND c.`status`=1) as id
FROM gift g where g.giftcateid = 8 ORDER BY g.giftid ASC");


                while($arr=$rs->FetchRow()){
                    $flage = true;
                    $arr=safe_output($arr,true);
                    if($arr['ts']==0){
                        $tss='?g=1';
                        $use="尚未拥有";
                    }else{
                        $tss ='';
                        $day = floor((strtotime($arr[valiDT]) - time())/3600/24);
                        if($arr['active']==1){
                            $use="<span class=\"use-car\">正在使用</span>";
                        }else{
                            $use="<span class=\"no-use-car\">使用</span>";
                        }
                    }

                    ?>
                    <div class="mcar-box" <?php if($arr['id']) echo "idd=".$arr['id']?>>
                        <div class="mcar-left">
                            <div class=""><img src="<?php echo _IMAGES_DOMAIN_."/".$arr['giftimage'].$tss?>"></div>
                        </div>
                        <div class="mcar-right">
                            <div class="mcar-right-1 clearFix"><span class="car-name"><?php echo $arr['giftname']?> </span><span class="xufei">续费</span></div>
                            <div class="mcar-right-2 clearFix">剩余天数：<span><?php echo $day;?>天</span></div>
                            <div class="mcar-right-3 learFix" <?php if($arr['id']) echo "idd=".$arr['id']?> ><?php echo $use;?></div>
                        </div>
                    </div>
                <?php
                }
                if(!$flage){
                    ?>
                <?php }?>

            </div>
        <div class="clear"></div>
        </div>

    </div>
</div>
    <!--main-->
<?php include('tpl_footer.php');?>
<script>
    seajs.use("ajax/usecar");
</script>
    </body>
    </html>