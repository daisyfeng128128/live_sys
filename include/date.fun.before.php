<?php
//这个星期的星期一  
// @$timestamp ，某个星期的某一个时间戳，默认为当前时间  
// @is_return_timestamp ,是否返回时间戳，否则返回时间格式  
function this_monday($timestamp=0,$is_return_timestamp=true){  
    static $cache ;  
    $id = $timestamp.$is_return_timestamp;  
    if(!isset($cache[$id])){  
        if(!$timestamp) $timestamp = time();  
        $monday_date = date('Y-m-d', $timestamp-86400*date('w',$timestamp)+(date('w',$timestamp)>0?86400:-/*6*86400*/518400));  
        if($is_return_timestamp){  
            $cache[$id] = strtotime($monday_date);  
        }else{  
            $cache[$id] = $monday_date;  
        }  
    }  
    return $cache[$id];  
  
}  
  
//这个星期的星期天  
// @$timestamp ，某个星期的某一个时间戳，默认为当前时间  
// @is_return_timestamp ,是否返回时间戳，否则返回时间格式  
function this_sunday($timestamp=0,$is_return_timestamp=true){  
    static $cache ;  
    $id = $timestamp.$is_return_timestamp;  
    if(!isset($cache[$id])){  
        if(!$timestamp) $timestamp = time();  
        $sunday = this_monday($timestamp) + /*6*86400*/518400;  
        if($is_return_timestamp){  
            $cache[$id] = $sunday;  
        }else{  
            $cache[$id] = date('Y-m-d',$sunday);  
        }  
    }  
    return $cache[$id];  
}  
  
//上周一  
// @$timestamp ，某个星期的某一个时间戳，默认为当前时间  
// @is_return_timestamp ,是否返回时间戳，否则返回时间格式  
function last_monday($timestamp=0,$is_return_timestamp=true){  
    static $cache ;  
    $id = $timestamp.$is_return_timestamp;  
    if(!isset($cache[$id])){  
        if(!$timestamp) $timestamp = time();  
        $thismonday = this_monday($timestamp) - /*7*86400*/604800;  
        if($is_return_timestamp){  
            $cache[$id] = $thismonday;  
        }else{  
            $cache[$id] = date('Y-m-d',$thismonday);  
        }  
    }  
    return $cache[$id];  
}  
  
//上个星期天  
// @$timestamp ，某个星期的某一个时间戳，默认为当前时间  
// @is_return_timestamp ,是否返回时间戳，否则返回时间格式  
function last_sunday($timestamp=0,$is_return_timestamp=true){  
    static $cache ;  
    $id = $timestamp.$is_return_timestamp;  
    if(!isset($cache[$id])){  
        if(!$timestamp) $timestamp = time();  
        $thissunday = this_sunday($timestamp) - /*7*86400*/604800;  
        if($is_return_timestamp){  
            $cache[$id] = $thissunday;  
        }else{  
            $cache[$id] = date('Y-m-d',$thissunday);  
        }  
    }  
    return $cache[$id];  
  
}  
  
//这个月的第一天  
// @$timestamp ，某个月的某一个时间戳，默认为当前时间  
// @is_return_timestamp ,是否返回时间戳，否则返回时间格式  
  
function month_firstday($timestamp = 0, $is_return_timestamp=true){  
    static $cache ;  
    $id = $timestamp.$is_return_timestamp;  
    if(!isset($cache[$id])){  
        if(!$timestamp) $timestamp = time();  
        $firstday = date('Y-m-d', mktime(0,0,0,date('m',$timestamp),1,date('Y',$timestamp)));  
        if($is_return_timestamp){  
            $cache[$id] = strtotime($firstday);  
        }else{  
            $cache[$id] = $firstday;  
        }  
    }  
    return $cache[$id];  
}  
  
//这个月的第一天  
// @$timestamp ，某个月的某一个时间戳，默认为当前时间  
// @is_return_timestamp ,是否返回时间戳，否则返回时间格式  
  
function month_lastday($timestamp = 0, $is_return_timestamp=true){  
    static $cache ;  
    $id = $timestamp.$is_return_timestamp;  
    if(!isset($cache[$id])){  
        if(!$timestamp) $timestamp = time();  
        $lastday = date('Y-m-d', mktime(0,0,0,date('m',$timestamp),date('t',$timestamp),date('Y',$timestamp)));  
        if($is_return_timestamp){  
            $cache[$id] = strtotime($lastday);  
        }else{  
            $cache[$id] = $lastday;  
        }  
    }  
    return $cache[$id];  
}  
  
//上个月的第一天  
// @$timestamp ，某个月的某一个时间戳，默认为当前时间  
// @is_return_timestamp ,是否返回时间戳，否则返回时间格式  
  
function lastmonth_firstday($timestamp = 0, $is_return_timestamp=true){  
    static $cache ;  
    $id = $timestamp.$is_return_timestamp;  
    if(!isset($cache[$id])){  
        if(!$timestamp) $timestamp = time();  
        $firstday = date('Y-m-d', mktime(0,0,0,date('m',$timestamp)-1,1,date('Y',$timestamp)));  
        if($is_return_timestamp){  
            $cache[$id] = strtotime($firstday);  
        }else{  
            $cache[$id] = $firstday;  
        }  
    }  
    return $cache[$id];  
}  
  
//上个月的第一天  
// @$timestamp ，某个月的某一个时间戳，默认为当前时间  
// @is_return_timestamp ,是否返回时间戳，否则返回时间格式  
  
function lastmonth_lastday($timestamp = 0, $is_return_timestamp=true){  
    static $cache ;  
    $id = $timestamp.$is_return_timestamp;  
    if(!isset($cache[$id])){  
        if(!$timestamp) $timestamp = time();  
        $lastday = date('Y-m-d', mktime(0,0,0,date('m',$timestamp)-1, date('t',lastmonth_firstday($timestamp)),date('Y',$timestamp)));  
        if($is_return_timestamp){  
            $cache[$id] = strtotime($lastday);  
        }else{  
            $cache[$id] =  $lastday;  
        }  
    }  
    return $cache[$id];  
}  
/*
echo '本周星期一：'.this_monday(0,false).'';  
echo '本周星期天：'.this_sunday(0,false).'';  
echo '上周星期一：'.last_monday(0,false).'';  
echo '上周星期天：'.last_sunday(0,false).'';  
echo '本月第一天：'.month_firstday(0,false).'';  
echo '本月最后一天：'.month_lastday(0,false).'';  
echo '上月第一天：'.lastmonth_firstday(0,false).'';  
echo '上月最后一天：'.lastmonth_lastday(0,false).'';  
*/