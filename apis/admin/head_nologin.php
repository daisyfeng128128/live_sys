<?php 
header("Content-type:text/html;charset=utf-8");
include('../../include/header.inc.php');
include('../../include/page.inc.php');
session_start();
session_set_cookie_params(0,'/'); //让所有子域名都共享会话