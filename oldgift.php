<?php
//phpinfo();
?>
<div class="gift-area myDiv1"  style="display: ">
    <div class="gf-outer-header">
        <div class="gf-header">

            <?php foreach($giftcate as $giftcateid=>$arr):
                if($giftcateid != 25){
                    $ac = 'class="gf-noSelect"';
                }else{
                    $ac = 'class="gf-select"';
                }
                ?>
                <div id="gt<?php echo $giftcateid;?>"  rel="<?php echo $giftcateid;?>"  <?php echo $ac;?>><?php echo $arr["catename"];?></div>

            <?php endforeach;?>

        </div>
    </div>

    <div class="gf-content">
        <?php

        foreach($giftinfo as $cateid=>$gifts){
            if(in_array($cateid, array("0","1","8","15")))continue;//分类为0,1的不显示,8是汽车
            if($cateid==25){
                $display='style="display:block"';
            }else{
                $display='style="display:none;"';
            }
            echo '<div  class="gift-list-'.$cateid.' content nano" '.$display.'><div class="gf-content-list content"><ul id="gln'.$cateid.'">';
            foreach($gifts as $gift){
                ?>
                <li id="gift<?php echo $gift['giftid']?>" price="<?php echo $gift['giftprice']?>"><img rel="价值<?php echo $gift['giftprice']?><?php echo $page_var['money_name']?>" src="/images/pixel.gif" class="tooltip giftbig <?php echo $gift['class']?>"/>
                    <span title="<?php echo $gift['giftname']?>" class="tooltip gfname"><?php echo $gift['giftname']?></span>
                    <span class="live-icons icon-gift-selected"></span></li>
            <?php }
            echo '</ul></div></div>';
        }?>

    </div>

    <div class="gf-footer">
        <?php
        foreach($giftinfo as $cateid=>$gifts){
            if($cateid =="25"){
                echo "";
            }
        }?>
        <div class="gftbox">
            <span>
                <input type="text" id="sendGiftNum" class="sendGiftNum" value="1" maxlength="5"/>
                <em id="giftShapeBtns"></em>
            </span>
            <div id="stdSps" class="live-popup live-popup-menu" style="display: none">
                <ul>
                    <li data-count="3344">生生世世 (3344个)</li>
                    <li data-count="1314">一生一世 (1314个)</li>
                    <li data-count="999">比翼双飞 (999个)</li>
                    <li data-count="520">爱之箭 (520个)</li>
                    <li data-count="300">LOVE (300个)</li>
                    <li data-count="100">笑脸 (100个)</li>
                    <li data-count="99">心 (99个)</li>
                    <li data-count="50">V (50个)</li>
                </ul>
            </div>
            <button class="sendGift" id="sendGiftBtn">赠送</button>
        </div>
    </div>
</div>
