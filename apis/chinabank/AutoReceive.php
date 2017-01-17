<?php
date_default_timezone_set('PRC');
file_put_contents(("data/AutoReceive.".date("YmdHis").".".rand(1, 100)), json_encode($_REQUEST));
include '../../include/header.inc.php';
//****************************************	//MD5密钥要跟订单提交页相同，如Send.asp里的 key = "test" ,修改""号内 test 为您的密钥
											//如果您还没有设置MD5密钥请登陆我们为您提供商户后台，地址：https://merchant3.chinabank.com.cn/
	$key=CHINABANK_key;							//登陆后在上面的导航栏里可能找到“资料管理”，在资料管理的二级导航栏里有“MD5密钥设置” 
											//建议您设置一个16位以上的密钥或更高，密钥最多64位，但设置16位已经足够了
//****************************************

$v_oid     =trim($_POST['v_oid']);
$v_pmode   =trim($_POST['v_pmode']);
$v_pstatus =trim($_POST['v_pstatus']);
$v_pstring =trim($_POST['v_pstring']);
$v_amount  =trim($_POST['v_amount']);
$v_moneytype  =trim($_POST['v_moneytype']);
$remark1   =trim($_POST['remark1' ]);
$remark2   =trim($_POST['remark2' ]);
$v_md5str  =trim($_POST['v_md5str' ]);
/**
 * 重新计算md5的值
 */
$md5string=strtoupper(md5($v_oid.$v_pstatus.$v_amount.$v_moneytype.$key)); //拼凑加密串
if ($v_md5str==$md5string){
	if($v_pstatus=="20"){
		//支付成功
		//商户系统的逻辑处理（例如判断金额，判断支付状态(20成功,30失败),更新订单状态等等）......
		ob_end_clean();
		payOrdersDeal(trim($_POST['v_oid']),trim($_POST['v_amount']),trim($_POST['v_oid']));
	}
	echo "ok";
}else{
	ob_end_clean();
	echo "error";
}
include('../../include/footer.inc.php');