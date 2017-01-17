<!--main-->
<div class="inmiddle">
    <?php
    $current_page="recive";
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
            <div class="re-title-area"><span class="re-title">收到礼物</span>
                <div class="recharge-search"><span class="research-condition">查询条件</span>
                    <select name="research-year" id="research-year">
                        <option>2016</option>
                    </select>
                    &nbsp;年&nbsp;
                    <select name="research-month" id="research-month">
                        <?php echo  getmonth();?>
                    </select>
                    &nbsp;月&nbsp;
                    <button class="re-search-button small-button">查询</button>
                </div>
                <div class="research-table">
                    <table id="conTable"    style="border-collapse:collapse;" border="1">
                        <tr  class="fir">
                            <th style="width: 152px;">赠送者</th>
                            <th style="width: 200px;">赠送时间</th>
                            <th style="width: 240px;">获得礼物</th>
                            <th style="width: 362px;">消费K豆</th>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="nexts"> </div>
        </div>
    </div>
    </div>


    <script>
        seajs.use("ajax/recive");
    </script>
</div>


<!--main-->

<?php include('tpl_footer.php'); ?>

</body>
</html>





