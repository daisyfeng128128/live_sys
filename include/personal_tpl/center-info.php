<script src="/js/sea.js"></script>
<script>

    seajs.config({
        base: "/js/",
        alias: {
            // "jquery": "jquery/jquery/1.10.1/jquery.js"
        }
    });
    seajs.use("ajax/username");
</script>
<div class="zhezhao"></div>
<?php
if ($user['roomNumber']) {
    ?>
    <div class="duikdou" >
        <div class="dui-header">兑换K豆</div>
        <div class="dui-mian dui-first" style="display: none">
            <div class="dui-input"><input type="text" name="duiv" id="duiv" class="duiv" placeholder="请输入100的整数"/></div>
            <div class="dui-control">
                <button class="dui-queren">确认</button>
                <button class="dui-cancel">退出</button>
            </div>
        </div>
        <div class="dui-mian dui-next" >
            <div class="dui-cert-text">确定兑换k豆</div>
            <div class="dui-cert-notice">温馨提示K豆不可兑换星豆</div>
            <div class="dui-control">
                <button class="dui-queren">确认</button>
                <button class="dui-cancel">退出</button>
            </div>
        </div>

        <div class="dui-mian dui-end dui-cg"  style="display: none">
            <div class="dui-icon ic-success"></div>
            <div class="dui-suc">兑换成功</div>
            <div class="dui-message">

            </div>
            <div class="dui-control">
                <button class="dui-cancel">退出</button>
            </div>
        </div>
        <div class="dui-mian dui-end dui-gg"  style="display: none">
            <div class="dui-icon ic-success"></div>
            <div class="dui-suc">兑换失败</div>
            <div class="dui-message">

            </div>
            <div class="dui-control">
                <button class="dui-cancel">退出</button>
            </div>
        </div>
    </div>
<?php
}?>
<div class="center-info">
    <div class="info-left">
        <div class="c-photo">
            <img src="<?php echo _IMAGES_DOMAIN_ . "/" . $user[avatar]; ?>" alt="<?php echo $user['nickname']; ?>"/>
        </div>

        <div class="a-myname">
            <div class="m-name">
                <span class="center-name"><?php echo $user['nickname'] ?></span><span class="center-edit"></span>
            </div>
            <div class="uid">ID:<?php echo $user['userId'] ?></div>
        </div>
        <div class="c-myname" style="display: none">
            <div><input type="input" id="nickname" value="<?php echo $user['nickname'] ?>" maxlength="16"/></div>
            <button id="sure" class="small-button"
                    onclick="seajs.use('ajax/username', function(test){ test.check(); });">确定
            </button>
            <button id="cancel" class="small-button">取消</button>
        </div>
    </div>
    <div class="info-middle">
        <div class="c-mylevel">我的爵位</div>
        <div class="c-level-bar">
            <div class="center-level sprite consumelevel-pic_consumelevel_<?php echo $user['spender'] ?>"></div>
            <div class="c-all-bars">
                <div class="c-i-bar" style="width:<?php echo $user['nextSpender'] ?>%"></div>
            </div>
            <div class="center-level sprite consumelevel-pic_consumelevel_<?php echo $user['spender'] + 1 ?>"></div>
        </div>
        <div class="c-level-message">还差<?php echo $user['differ']; ?>经验升级</div>
    </div>
    <div class="c-right">
        <div class="c-myfund">我的资产</div>
        <div class="c-funds">
            <div class="c-funds-kd">K 豆 :</div>
            <div class="c-funds-jb"><?php echo (int)$user['coins'] ?> </div>
            <div class="c-funds-cz"><a href="/pay.php" style="color: #fff;">充值</a></div>
        </div>
        <div class="c-funds">
            <?php
            if ($user['roomNumber']) {
                ?>
                <div class="c-funds-xd">星 豆 ：<span style="color: #E74152"><?php echo (int)$user['xcoins'] ?></span> </div>
                <div class="c-funds-dh"><a href="javascript:;" class="lbutton">兑换K豆</a></div>

            <?php } ?>
        </div>
    </div>
</div>
