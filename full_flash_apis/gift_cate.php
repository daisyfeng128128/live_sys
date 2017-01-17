<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: no-cache");
include('../include/header.inc.php');
//读取分类
$giftcates=$db->GetArray("select * from giftcate where giftcateid not in (0,1,8,12)");
echo json_encode($giftcates);
include('../include/footer.inc.php');