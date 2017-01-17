<?php //echo $current_page.$stateNum;?>
<style type="text/css">
    .noticedot{
        display:block;
        background:#f00;
        border-radius:50%;
        width:8px;
        height:8px;
        top:12px;
        right:0px;
        position:absolute;
    }
</style>
<div class="clearFix">
<div class="center-left">

    <div class="pi">
        <div class="cl-div  <?php if($current_page=="index"){ echo "cl-focus";}?>">
            <a href="/centeros.php?ptype=index"><div class="cl-index cl-title color33">我的首页</div></a>
        </div>
    </div>
    <div class="pi">
        <div class="cl-div  hasnenu<?php if($current_page=="recharge" or $current_page=="record"  or $current_page=="recive"){ echo " cl-focus";}?>" >
            <div class="cl-trade cl-title color33">交易中心</div>
            <div class="arrow-down"></div>
        </div>
        <div class="cl-set-info" style="display: none;">
            <ul>
                <li <?php if($current_page=="recharge"){ echo "class=li-hover";}?> ><a class="color33" href="centeros.php?ptype=recharge">充值记录</a></li>
                <li <?php if($current_page=="record"){ echo "class=li-hover";}?>><a class="color33" href="centeros.php?ptype=record">交易记录</a></li>
                <li  <?php if($current_page=="recive"){ echo "class=li-hover";}?>><a class="color33" href="centeros.php?ptype=recive">收到礼物</a></li>
            </ul>
        </div>
    </div>
    <div class="pi">
        <div class="cl-div  <?php if($current_page=="care"){ echo "cl-focus";}?>" >
            <a href="/centeros.php?ptype=history"><div class="cl-care cl-title color33">我的关注</div></a>
        </div>
    </div>
    <div class="pi">
        <div class="cl-div <?php if($current_page=="notice"){ echo "cl-focus";}?>">
            <a href="/centeros.php?ptype=notice"><div class="cl-notice cl-title color33">消息中心<?php if($stateNum>0){echo "<i class='noticedot'></i>";}?></div></a>
        </div>
    </div>
   <!-- <div class="pi">
        <div class="cl-div <?php /*if($current_page=="treasure"){ echo "cl-focus";}*/?>">
            <a href="/centeros.php?ptype=treasure"><div class="cl-treasure cl-title">我的财富</div></a>
        </div>
    </div>-->

    <div  class="pi">
        <div class="cl-div hasnenu<?php if($current_page=="mportrait" or $current_page =="info" or $current_page=="mpass"  or $current_page=="mphone" ){ echo " cl-focus";}?>">
            <div class="cl-setting cl-title color33">我的设置</div>
            <div class="<?php if($current_page !="history"){ echo "arrow-down";}else{ echo "arrow-up"; }?>"></div>
        </div>
        <div class="cl-set-info <?php if($current_page !="history"){ echo "hiddens";}?>" >
            <ul>
                <li <?php if($current_page=="info"){ echo "class=li-hover";}?> ><a class="color33" href="centeros.php?ptype=info">基本资料</a></li>
                <li <?php if($current_page=="mportrait"){ echo "class=li-hover";}?> ><a class="color33" href="centeros.php?ptype=mportrait">修改头像</a></li>
                <li <?php if($current_page=="mpass"){ echo "class=li-hover";}?> ><a class="color33" href="centeros.php?ptype=mpass">修改密码</a></li>
                <li <?php if($current_page=="mphone"){ echo "class=li-hover";}?> ><a class="color33" href="centeros.php?ptype=mphone">绑定手机</a></li>
            </ul>
        </div>
    </div>

</div>
<script type="text/javascript">
    // var userId = "{$user['userId']}";
    // alert("ll"+userId);
</script>