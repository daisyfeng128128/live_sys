<?php 
if(isset($global_config_data["level_point"]) && !empty($global_config_data["level_point"])){
	$point_array=explode(",",$global_config_data["level_point"]);
}else{
   // $point_array=array(0,2000,4000,12000,24000,40000,80000,160000,280000,440000,640000,960000,1200000,1600000,2400000,3000000);
    $point_array=array(
            0,
            5000,
            13000,
            5000,
            13000,
            36000,
            84000,
            200000,
            400000,
            600000,
            1000000,
            2000000,
            3000000,
            4000000,
            5000000,
            8000000,
            11000000,
            15000000,
            21000000,
            29000000,
            39000000,
            54000000,
            71000000,
            95000000,
            130000000,
            170000000,
            220000000,
            290000000,
            380000000,
            660000000,
            860000000
    );
}
function point2star($point){
    global $point_array;
    $top=$point_array[(count($point_array)-1)];

    if($point>$top){
        return (count($point_array)-1);

    }
    for($i=1;$i<count($point_array);$i++){
        if($point<$point_array[$i]){
            return ($i-1);
        }
    }
    return 0;
}
    $fans_array=array(0,
        40,
        85,
        148,
        245,
        385,
        576,
        825,
        1140,
        1528,
        1998,
        2557,
        3213,
        3974,
        4847,
        5841,
        6963,
        8221,
        9622,
        11174,
        12886,
        14764,
        16817,
        19052,
        21477,
        24100,
        26929,
        29971,
        33235,
        36727
    );

function fans2star($point){
    global $fans_array;
    $top=$fans_array[(count($fans_array)-1)];
    if($point>$top){
        return (count($fans_array)-1);
    }
    for($i=1;$i<count($fans_array);$i++){
        if($point<$fans_array[$i]){
            return ($i);
        }
    }
    return 1;
}

if(isset($global_config_data["level_cost"]) && !empty($global_config_data["level_cost"])){
	$cost_array=explode(",",$global_config_data["level_cost"]);
}else{
	$cost_array=array(0,1000,5000,15000,30000,60000,100000,200000,400000,650000,1000000,1500000,2000000,2500000,3500000,5000000,7000000,10000000,14000000,19000000,25000000,32000000,40000000);
}
function cost2rich($cost){
	global $cost_array;
	$top=$cost_array[(count($cost_array)-1)];
	if($cost>$top){
		return (count($cost_array)-1);
	}
	for($i=1;$i<count($cost_array);$i++){
		if($cost<$cost_array[$i]){
			return ($i-1);
		}
	}
	return 0;
}

function toColor($arr){
    $level=$arr['level'];
    $biankuang="white";
    if($level<5){
        $biankuang="white";
    }else if($level>5 and $level <11){
        $biankuang="blue";
    }else if($level>10 and $level <16){
        $biankuang="size"; //紫色
    }else if($level>15 and $level <21){
        $biankuang="yellow";
    }else if($level>20 and $level <26){
        $biankuang="orange";
    }else if($level>25 and $level <31){
        $biankuang="black";
    }

    return $biankuang;
}
function toTime($jtime){
    $jtime=$jtime['st'];
    if(!$jtime){
        return 0;
    }
    return ceil($jtime/60000);
}


function breakLen($baseurl,$currentPage,$pageNum,$pageLenth){
    $init=1; 	//开始数
    $max=$pageNum;		//结束数
    $pageoffset = ($pageLenth-1)/2;
    $pagelink = "";

    if($max ==1){
        return null;
    }

    if($pageNum>$pageLenth){
        if($currentPage <= $pageoffset){
            $init=1;
            $max = $pageLenth;
        }else{
            if($currentPage+$pageoffset>=$pageNum+1){
                $init = $pageNum-$pageLenth+1;
            }else{
                $init = $currentPage-$pageoffset;
                $max = $currentPage+$pageoffset;
            }
        }
    }
    $pagelink = "";
    for($i=$init;$i<=$max;$i++){
        if($i==$currentPage){
            $pagelink.="<span hf={$i} class='achange'>$i</span>";
        }else{
            if($i==1){
                $pagelink.="<span hf='1'>1</span>";
            }else{
                $pagelink.="<span hf='{$i}'>$i</span>";
            }
        }
    }
    return $pagelink;
}

function getSignature($str, $key) {
    $signature = "";
    if (function_exists('hash_hmac')) {
        $signature = base64_encode(hash_hmac("sha1", $str, $key));
    } else {
        $blocksize = 64;
        $hashfunc = 'sha1';
        if (strlen($key) > $blocksize) {
            $key = pack('H*', $hashfunc($key));
        }
        $key = str_pad($key, $blocksize, chr(0x00));
        $ipad = str_repeat(chr(0x36), $blocksize);
        $opad = str_repeat(chr(0x5c), $blocksize);
        $hmac = pack(
            'H*', $hashfunc(
                ($key ^ $opad) . pack(
                    'H*', $hashfunc(
                        ($key ^ $ipad) . $str
                    )
                )
            )
        );
        $signature = base64_encode($hmac);
    }
    return $signature;
}


function i_safe($str){
    $html_string = array("&amp;", "&nbsp;", "'", '"', "<", ">", "\t", "\r");
    $html_clear = array("&", " ", "&#39;", "&quot;", "&lt;", "&gt;", "&nbsp; &nbsp; ", "");
    $js_string = array("/<script(.*)<\/script>/isU");
    $js_clear = array("");
    $frame_string = array("/<frame(.*)>/isU", "/<\/fram(.*)>/isU", "/<iframe(.*)>/isU", "/<\/ifram(.*)>/isU",);
    $frame_clear = array("", "", "", "");
    $style_string = array("/<style(.*)<\/style>/isU", "/<link(.*)>/isU", "/<\/link>/isU");
    $style_clear = array("", "", "");
    $str = trim($str);
    //过滤字符串
    $str = str_replace($html_string, $html_clear, $str);
    //过滤JS
    $str = preg_replace($js_string, $js_clear, $str);
    //过滤ifram
    $str = preg_replace($frame_string, $frame_clear, $str);
    //过滤style
    $str = preg_replace($style_string, $style_clear, $str);
    return $str;

}
function inject_check($sql_str) {
    $check= eregi('select|insert|update|delete|\'|\/\*|\*|\.\.\/|\.\/|union|into|load_file
|outfile', $sql_str);
    if($check)
    {
        echo "非法字符!";
        exit();
    }else
    {
        return $sql_str;
    }
}

