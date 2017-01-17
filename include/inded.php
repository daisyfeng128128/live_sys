<?php
    $k=strtr("KEYGDaXiC1F2zf7qOYG", '-_', '+/');
    $str="POST&%2Fv3%2Fuser%2Fget_info&appid%3D1105729630%26format%3Djson%26openid%3DDCC716C16B61639C5FB674B96A5ED7BF%26openkey%3D92BEBA85FA1265C1FD40114597C857D5%26pf%3Dqqgame%26userip%3D116.226.47.97";
    $my_sign = hash_hmac("sha1",$mk,$k, true);
    echo $my_sign."<br>";
    $my_sign = base64_encode($my_sign);

    echo $my_sign;

?>


