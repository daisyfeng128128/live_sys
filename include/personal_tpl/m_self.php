
<!--main-->
<div class="inmiddle">
    <?php
        $current_page="info";
        include_once('./include/personal_tpl/center-info.php');
        include_once('./include/personal_tpl/menu_left.php');
    ?>

    <script src="/js/sea.js"></script>
    <script>
        seajs.use("ajax/userinfo");
        seajs.use("ajax/jqueryform");
    </script>

    <div class="center-right">
        <div class="cr-basics" style="">
            <div class="cr-title">基本资料</div>
            <table id="info-table">
                <tr  class="cr-hline">
                    <td class="n-type">昵称：</td> <td class="" colspan="3"><input type="text" name="aliasname" id="aliasname" style="padding-left: 5px;" maxlength="8" value="<?php echo $user['nickname']?>"/></td>
                </tr>
                <tr class="cr-hline">
                    <td  class="n-type"> <span>性别：</span></td> <td colspan="3">
                        <input class="inputnoborder" type="radio" name="gender" value='0' id="female" <?php echo $femalechecked?>>&nbsp;<label for="female">女</label>&nbsp;&nbsp;&nbsp;<input type="radio" class="inputnoborder" name="gender" value='1' id="male" <?php echo $malechecked?>>&nbsp;<label for="male">男</label>
                    </td>
                </tr>
                <tr class="cr-hline">
                    <td class="n-type">所在地：</td>
                    <td> <select name="province" id="province"></select></td>
                    <td><select name="city"  id="city"></select></td>
                    <td> <input type="radio" name="issecret" id="" value="1">&nbsp;保密 <input type="radio" name="issecret" value="2" />&nbsp;公开</td>
                </tr>
                <script language="javascript" src="/js/PCASClass.js"></script>
                <script language="javascript" src="/skin/ym/js/birthday.js"></script>

                <script>new PCAS("province","city","<?php echo $user['province']?>","<?php echo $user['city']?>");</script>
                <tr class="cr-hline">
                    <td class="n-type">生日：</td>
                    <td>  <select id="year"  name="year" rel="<?php echo (int)$birthday_year?>"></select>
                    <td> <select id="month" name="month" rel="<?php echo (int)$birthday_month?>"></select> </td>
                    <td> <select id="day" name="day" rel="<?php echo (int)$birthday_day?>"></select></td></td>
                </tr>
                <tr class="cr-hline">
                    <td  class="n-type"> <td colspan="3"><button id="submits">保存</button></td>
                </tr>
            </table>
        </div>
    </div>
    </div>
    <!--main-->
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
            if($("#day").get(0).options[i].text == day) {
                $("#day").get(0).options[i].selected = true;
                break;
            }
        }
    }
    birthday_selected(<?php echo (int)$birthday_year?>,<?php echo (int)$birthday_month?>,<?php echo (int)$birthday_day?>);

    $(function() {
        $.ms_DatePicker({
            YearSelector: "#year",
            MonthSelector: "#month",
            DaySelector: "#day"
        });
    });
    </script></div>



<!--main-->

<?php include('tpl_footer.php'); ?>

</body>
</html>