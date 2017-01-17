<?php
ini_set('date.timezone','Asia/Shanghai');
error_reporting(E_ERROR);

include '../../../include/header.inc.php';
file_put_contents(("data/notify.".date("YmdHis").".".rand(1, 100)), json_encode($_REQUEST));
require_once "../lib/WxPay.Api.php";
require_once '../lib/WxPay.Notify.php';
require_once 'log.php';

//初始化日志 
$logHandler= new CLogFileHandler("../logs/".date('Y-m-d').'.log');
$log = Log::Init($logHandler, 15);

class NativeNotifyCallBack extends WxPayNotify
{
	public function unifiedorder($openId, $orderid,$fee)
	{
        //统一下单
        $input = new WxPayUnifiedOrder();
        $input->SetBody("蝌蚪直播充值");      //描述
        $input->SetAttach("蝌蚪直播充值");    //附加信息
        $input->SetOut_trade_no($orderid); //商家订单号
        $input->SetTotal_fee($fee*100);
        $input->SetTime_start(date("YmdHis"));
        $input->SetTime_expire(date("YmdHis", time() + 600));
        $input->SetGoods_tag("蚪币充值");
        $input->SetNotify_url("http://www.kedo.tv/apis/Wxpay/example51543/notify.php");  //接收支付成功
        $input->SetTrade_type("NATIVE");        //JSAPI,NATIVE,APP
        $input->SetOpenid($openId);
        $input->SetProduct_id($orderid); //商品id
        $result = WxPayApi::unifiedOrder($input);

        return $result;
    }

	
	public function NotifyProcess($data, &$msg)
	{
		//echo "处理回调";
		//Log::DEBUG("call back2:" . json_encode($data));

        if(!array_key_exists("openid", $data) ||
			!array_key_exists("product_id", $data))
		{
			$msg = "回调数据异常";
			return false;
		}

		$openid = $data["openid"];
        $orderid = $data["product_id"];
        global $db;
        $feecccc=$db->GetOne("select consume from bu_gift_details WHERE  orderId='{$orderid}'");
       // Log::DEBUG("call back3:" . "select moneys from bu_gift_details WHERE  orderId='{$orderid}'");
        //统一下单
		$result = $this->unifiedorder($openid, $orderid,$feecccc);
		if(!array_key_exists("appid", $result) ||
			 !array_key_exists("mch_id", $result) ||
			 !array_key_exists("prepay_id", $result))
		{
		 	$msg = "统一下单失败";
		 	return false;
		 }
		
		$this->SetData("appid", $result["appid"]);
		$this->SetData("mch_id", $result["mch_id"]);
		$this->SetData("nonce_str", WxPayApi::getNonceStr());
		$this->SetData("prepay_id", $result["prepay_id"]);
		$this->SetData("result_code", "SUCCESS");
		$this->SetData("err_code_des", "OK");
		return true;
	}
}

$notify = new NativeNotifyCallBack();
$notify->Handle(true);
