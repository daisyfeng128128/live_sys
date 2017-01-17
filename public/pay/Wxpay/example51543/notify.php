<?php
ini_set('date.timezone','Asia/Shanghai');
date_default_timezone_set('PRC');
file_put_contents(("data/notify.".date("YmdHis").".".rand(1, 100)), json_encode($_REQUEST));
file_put_contents(("data/notify_xml.".date("YmdHis").".".rand(1, 100)), file_get_contents ( "php://input" ));
include '../../../include/header.inc.php';
//-------------
require_once "../lib/WxPay.Api.php";
require_once '../lib/WxPay.Notify.php';
require_once 'log.php';

//初始化日志
$logHandler= new CLogFileHandler("../logs/".date('Y-m-d').'.log');
$log = Log::Init($logHandler, 15);
class PayNotifyCallBack extends WxPayNotify
{
	//查询订单
	public function Queryorder($transaction_id)
	{
		$input = new WxPayOrderQuery();
		$input->SetTransaction_id($transaction_id);
		$result = WxPayApi::orderQuery($input);
		Log::DEBUG("query:" . json_encode($result));
		if(array_key_exists("return_code", $result)
			&& array_key_exists("result_code", $result)
			&& $result["return_code"] == "SUCCESS"
			&& $result["result_code"] == "SUCCESS")
		{
			return true;
		}
		return false;
	}

	//重写回调处理函数
	public function NotifyProcess($data, &$msg)
	{
		Log::DEBUG("call back:" . json_encode($data));  //付款回调信息
		$notfiyOutput = array();

		if(!array_key_exists("transaction_id", $data)){
			$msg = "输入参数不正确";
			return false;
		}
		//查询订单，判断订单真实性
		if(!$this->Queryorder($data["transaction_id"])){
			$msg = "订单查询失败 ";
			return false;
		}
		return true;
	}
}
/*
Log::DEBUG("begin notify");
$notify = new PayNotifyCallBack();
$notify->Handle(false);
*/
$postStr = file_get_contents ( "php://input" );
$postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);

$orderid=$postObj->out_trade_no;
$r3_Amt=$postObj->cash_fee/100;
$r2_TrxId=$postObj->transaction_id;
$result_code=$postObj->result_code;
payback($orderid,$r3_Amt,$r2_TrxId,$result_code,$postStr);
//payOrdersDeal($orderid,$r3_Amt,$r2_TrxId);
//ob_end_clean();
echo "success";

include $app_path.'include/footer.inc.php';