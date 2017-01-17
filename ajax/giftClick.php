<?php
include('../include/header.inc.php');
include('../include/level.func.php');
$user=checklogin();
safe_output($_POST);
if(!$user){
    echo "nologin!";
}else{
    global $db;
    $userId=$user['userId'];
    $rsc=$db->GetRow("select packs from bu_user_packs WHERE userId=$userId");
    if($rsc){
        $arr_packs_array=json_decode($rsc['packs'],true);
        $arr_packs_array[isread]=0;
        $json=json_encode($arr_packs_array);
        $db->Execute("update  bu_user_packs set packs='{$json}' WHERE userId=$userId");
        echo "1";
    }
}
include('../include/footer.inc.php');
?>