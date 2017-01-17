<?php
$smarty_path=str_replace('\\','/',str_replace('tpl_header.php','',__FILE__));
require_once($smarty_path.'include/smarty/Smarty.class.php');
//smarty初始化
$smarty = new Smarty;
$smarty->caching = false;
$smarty->template_dir = $smarty_path."templates";
$smarty->compile_dir = $smarty_path."/templates_c";
$page_var['current_page']=$current_page;
foreach($page_var as $key=>$val){
$smarty->assign($key,$val);
}
$smarty->assign("user",$user);
$smarty->display('header_desert.html');
?>