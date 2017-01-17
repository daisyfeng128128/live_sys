<?php

    $db->CacheExecute(1,"select * from giftcate order by giftcateid asc");
    $db->CacheExecute(1,"select * from gift order by giftcateid asc,giftid asc");
    $db->CacheExecute(1,"select * from gift");
    //成功后重新生成一下礼物图片
    @file_get_contents("http://"._SITE_URL_."/tools/makegift.php");
    $msg = "清除缓存操作成功";
    operational_log(4,"清除礼物缓存",$_REQUEST);

?>