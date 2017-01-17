<!--main-->
<div class="inmiddle">
    <?php
        $current_page="mpass";
        include_once('./include/personal_tpl/center-info.php');
        include_once('./include/personal_tpl/menu_left.php');
    ?>
    <script>
        seajs.use("ajax/userpass");
    </script>
    <div class="center-right">
        <div calass="cr-mid-passwd">
            <div class="cr-title">修改密码</div>
            <div class="midfy-passwd-area">
                <table>
                    <tr>
                        <td class="bind-phone-aright">原密码： </td><td><input class="input-pass"  type="password" id="old-pass"/></td>
                    </tr>
                    <tr>
                        <td class="bind-phone-aright">新密码： </td><td><input  class="input-pass"   type="password" id="new-pass"/></td>
                    </tr>
                    <tr>
                        <td class="bind-phone-aright">确认密码： </td><td><input  class="input-pass"   type="password" id="re-pass"/></td>
                    </tr>
                    <tr>
                        <td></td><td><button id="save"  class="small-button">保存</button> <button id="cancel"  class="small-button">取消</button></td>
                    </tr>
                </table>
            </div>
            <div class="midfy-passwd-area-else">
                <div class="else-pass-title">其他方式修改</div>
                <div class="midify-else">
                    <div class="modify-by-">
                        <div class="mod-bleft"> <img src="/skin/ym/images/mpass-phone.png" /> </div>
                        <div class="mod-bright">
                            <div>通过手机修改</div>
                            <button class="ck-pass-phone">点击修改</button>
                        </div>
                    </div>
                    <div class="modify-by-" style="float:right;">
                        <div class="mod-bleft"> <img src="/skin/ym/images/mpass-email.png" style="margin-top:40px"/> </div>
                        <div class="mod-bright">
                            <div>通过邮箱修改</div>
                            <button class="ck-pass-phone">点击修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="win-phone" style="display: none">
        <div class="phone-find-passwd1" style="display: none">
            <div class="find-bump-title">手机找到回密码 <div class="find-bump-oxx"></div></div>
            <div class="find-main1">
                <div class="divv"><span class="fin-pro">手机号:</span> <span class="fin-current-phone divv2">18745465467</span><span class="fin-mb">更换手机</span></div>
                <div  class="divvv"><span class="fin-pro">验证码号:</span> <input type="text" value=""  class="divv2" maxlength="11" id="y-code"><button class="fin-mb-send small-button">发送验证码</button> <span class="fmbResend">重新发送  <i>39s</i></span></div>
                <div  class="divvvv"><button id="next-step" class="small-button">下一步</button></div>
            </div>
        </div>

        <div class="repass-next" style="display: none">
            <div class="find-bump-title">手机找到回密码 <div class="find-bump-oxx"></div></div>
            <div class="find-main2">
                <table >
                    <tr>
                        <td class="n-type">新密码：</td><td class="input-pass2"><input type="password" id="fin-new-pass"/></td><td colspan="2">34e2</td>
                    </tr>
                    <tr>
                        <td class="n-type">确认密码：</td><td class="input-pass2"><input type="password" id="fin-renew-pass"/></td>
                    </tr>
                    <tr ><td></td><td class="next-bt-area"><button class="small-button" id="nnext-step">下一步</button></td></tr>
                </table>
            </div>
        </div>
        <div class="repass-end" style="text-align: center;display: none">
            <div class="find-bump-title">手机找到回密码 <div class="find-bump-oxx"></div></div>
            <div class="">
                <div class="setting-gous">
                    <div class="fin-endding1">你的新登录设置成功!</div>
                    <div class="fin-endding2">今后将使用新密码登录蝌蚪账户,请牢记!</div>
                </div>
                <div class="setting-gous2">您可能需要:<a href="#">重新登录</a></div>
            </div>
        </div>
    </div></div>
    </div>


<!--main-->

<?php include('tpl_footer.php'); ?>

</body>
</html>