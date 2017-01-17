<?php 
include('../include/header.inc.php');
include('../include/level.func.php');
session_start();
safe_output($_POST);
$user=checklogin();
if(!$user){
	echo "error";
    exit();
}
$type=$_POST['type'];
$ajax_data=array();
$userId=$user[userId];
    if($type=='send'){

        /*
            $ajax_data[resultMessage]="test!";
            $ajax_data[resultCode]="200";
            echo json_encode($ajax_data);
            exit();
        */
        if($_POST['number']==''){
            $ajax_data[resultMessage]="require number with no!";
            echo json_encode($ajax_data);
            exit();
        }
        $phoneNumber=$_POST['number'];
        $datas = curl_post(_CDNDOMAIN_."/rest/personCenter/sendMessage.mt","number=$phoneNumber");
        $acceptData=json_decode($datas, true);
        if($acceptData!=null and $acceptData[data] !=''){
            $send_phone_info['time']=$_SERVER['REQUEST_TIME'];
            $send_phone_info['phone']=$phoneNumber;
            $send_phone_info['code']=$acceptData[data];
            $_SESSION[phone_array]=$send_phone_info;

            $ajax_data[resultMessage]="success";
            $ajax_data[resultCode]="200";
            $ajax_data[ts]=$_SESSION[phone_array];
        }else{
            $ajax_data[resultMessage]="send messae error!";
            $ajax_data[resultCode]="100";
        }
        echo json_encode($ajax_data);
        exit();
    }

    if($type=='bind'){
        $code=$_POST['code'];

        //没有短信信息
        if(!empty($_SESSION[phone_array]) and count($_SESSION[phone_array]) >0){
            $phone_infos=$_SESSION[phone_array];
        }else{
            $ajax_data[resultMessage]="no send message!";
            $ajax_data[resultCode]="100";
            $ajax_data[ts]=$_SESSION;
            echo json_encode($ajax_data);
            exit();
        }
        //验证码错误
        if($code!=$phone_infos['code']){
            $ajax_data[resultMessage]="code error!";
            $ajax_data[resultCode]="100";
            $ajax_data[ts]=$_SESSION[phone_array];
            echo json_encode($ajax_data);
            exit();
        }
        $bind_phone=$phone_infos['phone'];
        global $db;
        $sql="update bu_user set mobile =$bind_phone where userId=$userId";
        if($db->Execute($sql)){
            $ajax_data[resultMessage]="success";
            $ajax_data[resultCode]="200";
        }else{
            $ajax_data[resultMessage]="update phone error!";
            $ajax_data[resultCode]="100";
            $ajax_data[ts]=$_SESSION[phone_array];

        }

        echo json_encode($ajax_data);
        exit();
    }
include('../include/footer.inc.php');
?>