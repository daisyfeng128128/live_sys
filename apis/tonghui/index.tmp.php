<?php

header("Content-type: text/html; charset=utf-8");

$productName = "一个Apple笔记本电脑配件";
$productNum = "1";
$orderNo = rand(10000000, 99999999);
$orderAmount = round((rand() / getrandmax()) * 10000) / 100;
$customerPhone = "18909091212";
$receiveAddress = "上海市浦东新区浦东南路200号";
$returnParams = "0|EF9012AB21";

?>
<!DOCTYPE html>
<html>
<head>
    <title>网关支付</title>
    <link type="text/css" rel="stylesheet" href="static/bootstrap-2.3.2/css/bootstrap.css"/>
    <link type="text/css" rel="stylesheet" href="static/css/radio-banks.css"/>
    <link type="text/css" rel="stylesheet" href="static/css/simple-radius-border.css"/>
    <script type="text/javascript" src="static/jquery/js/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="static/bootstrap-2.3.2/js/bootstrap.min.js"></script>
</head>
<body>
<form id="mainForm" class="form-horizontal" action="paySubmit.php" method="POST">
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="span10 offset1">
                <div style="margin-top: 4px;">
                    <!--<img src="static/imgs/head-logo.jpg" class="img-rounded">-->
                </div>
                <ul class="nav nav-pills nav-stacked" style="margin-top: 2px; margin-bottom: -1px;">
                    <li class="active">
                        <a href="#" style="font-size: 18px;">订单信息</a>
                    </li>
                </ul>
                <div class="low-half-radius-border" style="padding-top: 10px;">
                    <div class="control-group">
                        <label class="control-label" style="width: 100px; font-size: 16px;"><strong>商品名称：</strong></label>
                        <div class="controls" style="margin-left: 110px; padding-top: 5px;">
                            <span><?php echo $productName?></span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" style="width: 100px; font-size: 16px;"><strong>订单号：</strong></label>
                        <div class="controls" style="margin-left: 110px; padding-top: 5px;">
                            <span><?php echo $orderNo?></span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" style="width: 100px; font-size: 16px;"><strong>金额：</strong></label>
                        <div class="controls" style="margin-left: 110px; padding-top: 5px;">
                            <span style="color: red;"><strong><?php echo $orderAmount?>元</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row-fluid">
            <div class="span10 offset1">
                <ul class="nav nav-tabs">
                    <li class="active">
                        <a href="#"><strong>银行卡在线支付</strong></a>
                    </li>
                </ul>
                <div style="border-left: 1px solid #ddd; border-right: 1px solid #ddd; border-bottom: 1px solid #ddd; margin-top: -20px;">
                    <div class="container-fluid" style="padding-top:20px;">
                        <div class="row-fluid" style="padding-left: 20px; margin-bottom: 10px;">
                            <div class="span2">
                                <label class="radio">
                                    <input type="radio" name="bankCode" class=" radio-img-bank" value="ABC"><div class="radio-img-abc"></div>
                                </label>
                            </div>
                            <div class="span2">
                                <label class="radio">
                                    <input type="radio" name="bankCode" class="radio-img-bank" value="ICBC"><div class="radio-img-icbc"></div>
                                </label>
                            </div>
                            <div class="span2">
                                <label class="radio">
                                    <input type="radio" name="bankCode" class="radio-img-bank" value="CCB"><div class="radio-img-ccb"></div>
                                </label>
                            </div>
                            <div class="span2">
                                <label class="radio">
                                    <input type="radio" name="bankCode" class="radio-img-bank" value="PSBC"><div class="radio-img-psbc"></div>
                                </label>
                            </div>
                        </div>
                        <div class="row-fluid" style="padding-left: 20px; margin-bottom: 10px;">
                            <div class="span2">
                                <label class="radio">
                                    <input type="radio" name="bankCode" class="radio-img-bank" value="BOC"><div class="radio-img-boc"></div>
                                </label>
                            </div>
                            <div class="span2">
                                <label class="radio">
                                    <input type="radio" name="bankCode" class="radio-img-bank" value="CMBC"><div class="radio-img-cmbc"></div>
                                </label>
                            </div>
                            <div class="span2">
                                <label class="radio">
                                    <input type="radio" name="bankCode" class="radio-img-bank" value="BOCOM"><div class="radio-img-bocom"></div>
                                </label>
                            </div>
                            <div class="span2">
                                <label class="radio">
                                    <input type="radio" name="bankCode" class="radio-img-bank" value="SPDB"><div class="radio-img-spdb"></div>
                                </label>
                            </div>
                        </div>
                        <div class="row-fluid" style="padding-left: 20px; margin-bottom: 10px;">
                            <div class="span2">
                                <label class="radio">
                                    <input type="radio" name="bankCode" class="radio-img-bank" value="CEBBANK"><div class="radio-img-cebbank"></div>
                                </label>
                            </div>
                            <div class="span2">
                                <label class="radio">
                                    <input type="radio" name="bankCode" class="radio-img-bank" value="ECITIC"><div class="radio-img-ecitic"></div>
                                </label>
                            </div>
                            <div class="span2">
                                <label class="radio">
                                    <input type="radio" name="bankCode" class="radio-img-bank" value="PINGAN"><div class="radio-img-pingan"></div>
                                </label>
                            </div>
                            <div class="span2">
                                <label class="radio">
                                    <input type="radio" name="bankCode" class="radio-img-bank" value="CMBCS"><div class="radio-img-cmbcs"></div>
                                </label>
                            </div>
                        </div>
                        <div class="row-fluid" style="padding-left: 20px; margin-bottom: 10px;">
                            <div class="span2">
                                <label class="radio">
                                    <input type="radio" name="bankCode" class="radio-img-bank" value="HXB"><div class="radio-img-hxb"></div>
                                </label>
                            </div>
                            <div class="span2">
                                <label class="radio">
                                    <input type="radio" name="bankCode" class="radio-img-bank" value="CGB"><div class="radio-img-cgb"></div>
                                </label>
                            </div>
                        </div>
                        <div class="row-fluid" style="padding-left: 20px; margin-bottom: 10px;">
                            <button id="submitBtn" class="btn btn-large btn-primary" type="button">确认支付</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <input type="hidden" name="product_name" value="<?php echo $productName?>"><!--商品名称-->
    <input type="hidden" name="product_num" value="<?php echo $productNum?>"><!--商品数量-->
    <input type="hidden" name="order_no" value="<?php echo $orderNo?>"><!--订单号-->
    <input type="hidden" name="order_amount" value="<?php echo $orderAmount?>"><!--订单金额-->
    <input type="hidden" name="customer_phone" value="<?php echo $customerPhone?>"><!--付款人联系电话-->
    <input type="hidden" name="receive_address" value="<?php echo $receiveAddress?>"><!--收货地址-->
    <input type="hidden" name="return_params" value="<?php echo $returnParams?>"><!--回传参数-->
    <input type="hidden" name="bank_code" value=""><!--银行编码-->
</form>
<script type="text/javascript">
    $(function () {
        var bankCode = $('input[name="bank_code"]');
        $('#submitBtn').click(function () {
            var checked = $('input[name="bankCode"]:checked').val();
            if (typeof (checked) == 'undefined') {
                alert('请选择银行');
            }
            else {
                bankCode.val(checked);
                $('#mainForm').submit();
            }
        });
    });
</script>
</body>
</html> 