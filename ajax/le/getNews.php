<?php
include '../../include/header.inc.php';
echo $db->GetOne("select `content` from news where id=10");
include '../../include/footer.inc.php';