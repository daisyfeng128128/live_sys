<!--main-->
<div class="inmiddle">
    <?php
    $current_page="recharge";
    include_once('./include/personal_tpl/center-info.php');
    include_once('./include/personal_tpl/menu_left.php');
    function getmonth(){
        $monlist="";
        $time = time();
        $month = date('m',$time);
        for($m=1;$m<13;$m++){
            if($m==$month){
                $monlist.="<option selected = 'selected'>".$m."</option>";
            }else{
                $monlist.="<option>".$m."</option>";
            }
        }
        return $monlist;
    }
    ?>

    <div class="center-right">
        <div calass="cr-bind-phone" >
            <div class="re-title-area"><span class="re-title">充值记录</span>
                <div class="recharge-search"><span class="research-condition">查询条件</span>
                    <select name="research-year" id="research-year">
                        <option>2016</option>
                    </select>
                    年
                    <select name="research-month" id="research-month">
                        <?php echo  getmonth();?>
                    </select>
                    月
                    <button class="re-search-button small-button">查询</button>
                </div>
                <div class="research-table">
                    <table id="conTable"  style="border-collapse:collapse;" border="1">
                        <tr  class="fir">
                            <th style="width: 152px;">流水号</th>
                            <th style="width: 200px;">交易时间</th>
                            <th style="width: 150px;">充值K豆</th>
                            <th style="">支付金额</th>
                            <th style="width: 120px;">支付方式</th>
                            <th style="width: 120px;">支付状态</th>
                        </tr>
                    </table>
                </div>

            </div>
            <div class="nexts"> </div>
        </div>
    </div>
    </div>

    <script>
        seajs.use("ajax/recharge");
    </script>


</div>

<!--main-->

<?php include('tpl_footer.php'); ?>

</body>
</html>






