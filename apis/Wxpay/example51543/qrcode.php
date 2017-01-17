<?php
error_reporting(E_ERROR);
require_once 'phpqrcode/phpqrcode.php';
$url = urldecode($_GET["data"]);
$errorCorrectionLevel = "L";
$matrixPointSize = "4";
QRcode::png($url,false,$errorCorrectionLevel,$matrixPointSize);
