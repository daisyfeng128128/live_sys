<?PHP
include '../../include/header.inc.php';
/*
秘钥为
gwau6izfDXVHFe91eiqer8cl3cvb75aa

充值的地址是
http://5iu.qiyew.com/apis/third/pay.php?amount=10&userid=811&orderno=aaaa&partnerid=6&token=c2ba24a7787b5ff8e16d2bf016c7a651
http://5iu.qiyew.com/apis/third/pay.php?amount=-10&userid=811&orderno=aaay&partnerid=6&token=3ba5ff2ed07054730a17b049579fd880


http://www.wpy.demo1.com/apis/third/pay.php?amount=10&userid=811&orderno=aaaa&partnerid=6&token=c2ba24a7787b5ff8e16d2bf016c7a651
http://www.wpy.demo1.com/apis/third/pay.php?amount=-10&userid=811&orderno=aaay&partnerid=6&token=3ba5ff2ed07054730a17b049579fd880
*/

$response = array(
	"response"=>array(
		"action"=>"consume",
		"mestat"=>array(
			"status"=>500,
			"message"=>"验证失败",
		),
		"info"=>"",
	)
);
if($_REQUEST['amount'] && $_REQUEST['userid'] && $_REQUEST['orderno'] && $_REQUEST['token']){
	$auth = md5($_REQUEST['amount'].$_REQUEST['userid'].$_REQUEST['orderno'].PAY_THIRD_KEY);
	if($auth==strtolower($_REQUEST['token'])){
		echo deal();
	}else{
		echo json_encode($response);
	}
}
include('../../include/footer.inc.php');
function deal(){
	global $db,$response;
	//$db->debug = true;
	$orderid = $_REQUEST['orderno'];
	$money = $_REQUEST['amount'];
	$snsid = $_REQUEST['userid'];
	$partnerid = $_REQUEST['partnerid'];
	$partnerid=1;//后台用q点记录，所以为1,传过来的是6
	
	$db->StartTrans();
	$row=$db->GetRow("select * from orders where sid='$orderid' and paychannel='$partnerid' and status=1 FOR UPDATE");
	if(!$row){//此订单号之前没有充值过
		$user=$db->GetRow("select * from user where accountfrom='$partnerid' and snsid='$snsid' FOR UPDATE");
		if($user){//用户不存在
			$balanceadd=$money*RMB_XNB;
			$balance=$user['balance']+$balanceadd;
			//扣钱时要判断用户有没有这么多钱
			if($balanceadd<0 && $user['balance']<abs($balanceadd)){
				$response["response"]["mestat"]["message"]="用户帐号没有那么多钱";
			}else{
				$db->Execute("update user set balance='$balance' where userid='$user[userid]'");
			
				$agentid=(int)$_GET['agentid'];
				$chooseuserid=(int)$_GET['chooseuserid'];
				$db->Execute("insert into orders(adddate,money,userid,status,paychannel,balanceadd,agentid,lastupdate,chooseuserid,sid) values('".date('Ymd')."','$money','$user[userid]','1','$partnerid','$balanceadd','$agentid','".time()."','$chooseuserid','$orderid')");
				
				//记录
				$db->Execute("insert into balance_change_log (`when`,`why`,`userid`,`money`,`balance`,`channel`,`agentid`)values('".time()."','0','$chooseuserid','$money','$balance','$partnerid','$agentid')");
				finish_task($user[userid], 8);
			}
		}else{
			$response["response"]["mestat"]["status"]=404;
			$response["response"]["mestat"]["message"]="账户不存在";
		}
	}else{
		$response["response"]["mestat"]["message"]="订单重复";
	}
	$db->CompleteTrans();
	if($response["response"]["mestat"]["message"]=="验证失败"){
		$response["response"]["mestat"]["status"]=200;
		$response["response"]["mestat"]["message"]="";
		$response["response"]["info"]["balance"]=$balance;
	}
	return json_encode($response);
}