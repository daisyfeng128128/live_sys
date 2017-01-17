<?php
/*
* Copyright (C) 2006-2007 foolmen.com
* 
* File Name: picThumb.func.php
* 生成缩略图.
* 
* Last Modified:
*         2006-02-24 11:49
*/
define('OP_TO_FILE', 1);              //输出到指定文件
define('OP_OUTPUT', 2);               //图片内容输出到浏览器
define('OP_TO_ALL', 12);              //输出到指定文件和浏览器
define('OP_NOT_KEEP_SCALE', 4);       //不保持图片比例, 即使用拉伸
define('OP_BEST_RESIZE_WIDTH', 8);    //宽度最佳缩放 
define('OP_BEST_RESIZE_HEIGHT', 16);  //高度最佳缩放 
define('CM_DEFAULT',  0);             // 默认模式
define('CM_LEFT_OR_TOP',  1);         // 左或上
define('CM_MIDDLE',       2);         // 中
define('CM_RIGHT_OR_BOTTOM',  3);     // 右或下
/**************************************************************************
* 函数名: makeThumb
* 功能: 生成缩略图片,用这个函数生成图片前需要先删除需要生成的文件
* @param string $srcFile 源文件
* @param string $srcFile 目标文件
* @param int $dstW 目标图片的宽度（单位：像素）
* @param int $dstH 目标图片的高度（单位：像素）
* @param int $option 附加参数，可以相加使用，如1+2(或者 1|2)表示同时执行1和2的功能。
*      1: 默认，输出到指定文件 2: 图片内容输出到浏览器 4: 不保持图片比例 
*      8：宽度最佳缩放 16：高度最佳缩放
* @param int $cutmode 剪切模式 0: 默认模式，剪切模式 1: 左或上 2: 中 3: 右或下
* @param int $startX 剪切的起始横坐标（像素）
* @param int $startY 剪切的起始纵坐标（像素）
* @return array return[0]=0: 正常; return[0] 为错误代码 return[1] string: 错误描述
* 错误代码：* -1 源文件不存在。-2 不支持的图片输出函数
* -3 不支持的图片创建函数
* -4 HTTP头信息已经输出，无法向浏览器输出图片。
* -5 无法检测输出的图片类型
**************************************************************************/
function makeThumb( $srcFile, $dstFile, $dstW, $dstH, $option=OP_TO_FILE, 
    $cutmode=CM_DEFAULT, $startX=0, $startY=0 ) {
    $img_type = array(1=>"gif", 2=>"jpeg", 3=>"png");
    $type_idx = array("gif"=>1, "jpg"=>2, "jpeg"=>2, "jpe"=>2, "png"=>3);
    
    if (!file_exists($srcFile)) {
        return array(-1, "Source file not exists: $srcFile.");
    }

    $path_parts = @pathinfo($dstFile);
    $ext = strtolower ($path_parts["extension"]);
    if ($ext == "") {
        return array(-5, "Can't detect output image's type.");
    }

    $func_output = "image" . $img_type[$type_idx[$ext]];
    if (!function_exists ($func_output)) {
        return array(-2, "Function not exists for output：$func_output.");
    }

    $data = @GetImageSize($srcFile);
    $func_create = "imagecreatefrom" . $img_type[$data[2]];
    if (!function_exists ($func_create)) {
        return array(-3, "Function not exists for create：$func_create.");
    }

    $im = @$func_create($srcFile);
    $srcW = @ImageSX($im);
    $srcH = @ImageSY($im);
    $srcX = 0;
    $srcY = 0;
    $dstX = 0;
    $dstY = 0;

    if ($option & OP_BEST_RESIZE_WIDTH) {
        $dstH = round($dstW * $srcH / $srcW);
    }

    if ($option & OP_BEST_RESIZE_HEIGHT) {
        $dstW = round($dstH * $srcW / $srcH);
    }

    $fdstW = $dstW;
    $fdstH = $dstH;

    if ($cutmode != CM_DEFAULT) { // 剪切模式 1: 左或上 2: 中 3: 右或下
        $srcW -= $startX;
        $srcH -= $startY;
        if ($srcW*$dstH > $srcH*$dstW) { 
            $testW = round($dstW * $srcH / $dstH);
            $testH = $srcH;
        } else {
            $testH = round($dstH * $srcW / $dstW);
            $testW = $srcW;
        }
        switch ($cutmode) {
            case CM_LEFT_OR_TOP: $srcX = 0; $srcY = 0; break;
            case CM_MIDDLE: $srcX = round(($srcW - $testW) / 2); 
                            $srcY = round(($srcH - $testH) / 2); break;
            case CM_RIGHT_OR_BOTTOM: $srcX = $srcW - $testW; 
                                     $srcY = $srcH - $testH;
        }
        $srcW = $testW;
        $srcH = $testH;
        $srcX += $startX;
        $srcY += $startY;
    } else { // 原始缩放
        if (!($option & OP_NOT_KEEP_SCALE)) {
            // 以下代码计算新大小，并保持图片比例
            if ($srcW*$dstH>$srcH*$dstW) { 
                $fdstH=round($srcH*$dstW/$srcW); 
                $dstY=floor(($dstH-$fdstH)/2); 
                $fdstW=$dstW;
            } else { 
                $fdstW=round($srcW*$dstH/$srcH); 
                $dstX=floor(($dstW-$fdstW)/2); 
                $fdstH=$dstH;
            }

            $dstX=($dstX<0)?0:$dstX;
            $dstY=($dstX<0)?0:$dstY;
            $dstX=($dstX>($dstW/2))?floor($dstW/2):$dstX;
            $dstY=($dstY>($dstH/2))?floor($dstH/s):$dstY;
        }
    } /// end if ($cutmode != CM_DEFAULT) { // 剪切模式

    if( function_exists("imagecopyresampled") and 
        function_exists("imagecreatetruecolor") ){
        $func_create = "imagecreatetruecolor";
        $func_resize = "imagecopyresampled";
    } else {
        $func_create = "imagecreate";
        $func_resize = "imagecopyresized";
    }

    $newim = @$func_create($dstW,$dstH);
    $black = @ImageColorAllocate($newim, 255,255,255);//背景为白色
    $back = @imagecolortransparent($newim, $black);
    @imagefilledrectangle($newim,0,0,$dstW,$dstH,$black);
    @$func_resize($newim,$im,$dstX,$dstY,$srcX,$srcY,$fdstW,$fdstH,$srcW,$srcH);

    if ($option & OP_TO_FILE) {
        @$func_output($newim,$dstFile);
    }

    if ($option & OP_OUTPUT) {
        if (function_exists("headers_sent")) {
            if (headers_sent()) {
                return array(-4, "HTTP already sent, can't output image to browser.");
            }
        }
        header("Content-type: image/" . $img_type[$type_idx[$ext]]);
        @$func_output($newim);
    }
    if ($option & OP_TO_ALL) {
    	@$func_output($newim,$dstFile);
        if (function_exists("headers_sent")) {
            if (headers_sent()) {
                return array(-4, "HTTP already sent, can't output image to browser.");
            }
        }
        header("Content-type: image/" . $img_type[$type_idx[$ext]]);
        @$func_output($newim);
    }
    

    @imagedestroy($im);
    @imagedestroy($newim);
    return array(0, "OK");
}
?>