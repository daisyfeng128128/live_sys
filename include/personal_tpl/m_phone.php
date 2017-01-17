<!--main-->
<div class="inmiddle">
    <?php
    $current_page="mphone";
    include_once('./include/personal_tpl/center-info.php');
    include_once('./include/personal_tpl/menu_left.php');
    ?>

    <div class="center-right">
        <div calass="cr-bind-phone" >
            <div class="cr-title">绑定手机</div>
            <div class="cr-phone-main">
                <div class="bind-phone-area">
                    <?php
                        global $db;
                        $sql="select mobile from bu_user where userId=$user[userId]";
                        $mo=$db->GetOne($sql);
                        if($mo != ""){
                            ?>
                            <table>
                                <tr>
                                    <td class="bind-phone-aright">已绑定手机号码：</td><td><?php echo   substr_replace($mo,'****',3,4);?></td>
                                </tr>
                            </table>
                        <?php
                        }else{
                        ?>
                            <table>
                                <tr >
                                    <td></td><td class="bind-text">为了你的账号安全,请尽快绑定手机</td>
                                </tr>
                                <tr>
                                    <td class="bind-phone-aright">手机号码：</td><td><input  type="text" max_length=11 id="phone"/><span class="phone_error">手机号码有误</span></td>
                                </tr>
                                <tr>
                                    <td  class="bind-phone-aright">验证码：</td><td><input  type="text" id="code"/> <button class="send">发送验证码<span></span></button><span class="resend-ms">35</span></td>
                                </tr>
                                <tr>
                                    <td></td><td><button id="bindPhone">绑定手机</button></td>
                                </tr>
                            </table>
                        <?php
                        }?>

                </div>
                <div class="bind-phone-why">
                    <p><a href="#">我为什么要绑定手机号码</a></p>
                    <p><a href="#">绑定失败???</a></p>
                </div>
            </div>
        </div>
    </div>
</div>
</div>


<!--main-->
<script>
    seajs.use("ajax/phone");
</script>
<?php include('tpl_footer.php'); ?>

</body>
</html>