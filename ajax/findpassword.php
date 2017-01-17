<?php 
$smtp_server="smtp.126.com";//smtp服务器
$smtp_username="halley_email@126.com";//smtp用户名
$smtp_password="jinying";//smtp密码
$frommail="halley_email@126.com";//发件人邮件地址
include('../include/header.inc.php');
include($app_path."include/aes.func.php");
include "../include/Zend_Mail/class.phpmailer.php";    //包函邮件发送类  
$userid=$db->GetOne("select userid from user where email='{$_GET['email']}'");
if(!$userid){
	echo '您输入的邮箱不存在';
}
else{
	$key=uniqid('fpk');
	$token=$userid."|".$key."|".time();
	$token_encrypt=aes_encrypt($token);
	$url=_RESET_PWD_URL_."?token=$token_encrypt";
	$db->Execute("insert into findpassword(userid,`key`,addtime)values('$userid','$key','".time()."')");
	$mail = new PHPMailer();  
	$mail->IsMail();                            // 经smtp发送  
	$mail->CharSet = "utf-8";
	//$mail->Host     = $smtp_server;           // SMTP 服务器  
	//$mail->SMTPAuth = true;                     // 打开SMTP 认证  
	//$mail->Username = $smtp_username;    // 用户名  
	//$mail->Password = $smtp_password;          // 密码  
	$mail->From     = $frommail;                  // 发信人  
	$mail->FromName = $page_var['site_name'];        // 发信人别名  
	$mail->AddAddress($_GET['email']);                 // 收信人  
	$mail->WordWrap = 50;  
	$mail->IsHTML(true);                            // 以html方式发送  
	$mail->Subject  = $page_var['site_name'].'--找回密码邮件';                 // 邮件标题  
	$mail->Body     = '请点击下面的链接找回密码<br><a href="'.$url.'" target="_blank">'.$url.'</a><br>本链接24小时内有效';                    // 邮件内空  
	$mail->AltBody  =  '请点击下面的链接找回密码'."\r\n".$url."\r\n".'本链接24小时内有效';  
	$mail->Send();
	echo '1';
}
include('../include/footer.inc.php');
//
?>