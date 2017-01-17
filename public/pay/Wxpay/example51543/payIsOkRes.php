<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>充值成功</title>
    <script type="" src="/js/jquery.min.js"></script>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
-->
    .info-box{position: absolute;width: 510px;height: 320px;margin: auto;left: 0;top: 0;right: 0;bottom: 0;border: 1px solid #ccc;}
    .inf-header{width: 100%;height: 50px;background:#f77599;font-size: 16px;color: #fff;text-align: center;line-height: 50px;}
    .img {margin:30px auto;  width: 36px;  height: 36px;}
    .onf-t{text-align: center;line-height: 30px;font-size: 16px;color: #333333}
    .onf-t .t{color:#f77599;text-decoration: none }
</style>
    <script>
       // setTimeout(window.location.href='http://www.baidu.com',5);

       $(function() {
           function jump(count) {
               window.setTimeout(function(){
                   count--;
                   if(count > 0) {
                       $('.s').html(count);
                       jump(count);
                   } else {
                       location.href="/centeros.php";
                   }
               }, 1000);
           }
           jump(5);

       });
    </script>
</head>
<body>
    <div class="info-box">
        <div class="inf-header">充值成功</div>
        <div class="inf-s">
            <div class="img"><img src="/img/icon_login.png" alt=""/></div>
            <div class="onf-t">尊敬的用户 您充值的<span class="y"><?php echo $_SESSION[dou];?></span>蝌蚪币 已经充值成功</div>
            <div class="onf-t"><span class="s">5</span>秒后 <a href="/pay.php" class="t"> 自动跳转</a> </div>
        </div>
    </div>
</body>
</html>




















