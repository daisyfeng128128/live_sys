<?php
include('../../include/header.inc.php');
$userinfo=checklogin();
$p=true;
if(!$userinfo){
	header("Location:/html/nologin.html");
	exit;
}
else if($userinfo['gamemoney']<=0){
	header("Location:/html/nomoney.html");
	$p=false;
}
include('../../include/footer.inc.php');
if(!$p){
	exit();
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!-- saved from url=(0014)about:internet -->
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en"> 
    <!-- 
    Smart developers always View Source. 
    
    This application was built using Adobe Flex, an open source framework
    for building rich Internet applications that get delivered via the
    Flash Player or to desktops via Adobe AIR. 
    
    Learn more about Flex at http://flex.org 
    // -->
    <head>
        <title>深海捕鱼2－－快捷键：空格键发射，← →炮台方向，+ -炮台大小</title>
        <meta name="google" value="notranslate" />         
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!-- Include CSS to eliminate any default margins/padding and set the height of the html element and 
             the body element to 100%, because Firefox, or any Gecko based browser, interprets percentage as 
             the percentage of the height of its parent container, which has to be set explicitly.  Fix for
             Firefox 3.6 focus border issues.  Initially, don't display flashContent div so it won't show 
             if JavaScript disabled.
        -->
        <style type="text/css" media="screen"> 
            html, body  { height:100%; }
            body { margin:0; padding:0; overflow:hidden; text-align:center; border:0;
                   background-color: #000000; }   
            object:focus { outline:none; }
            #flashContent { display:none; }
        </style>
        
        <!-- Enable Browser History by replacing useBrowserHistory tokens with two hyphens -->
        <!-- BEGIN Browser History required section -->
        <link rel="stylesheet" type="text/css" href="history/history.css" />
        <script type="text/javascript" src="history/history.js"></script>
        <!-- END Browser History required section -->  
        <script>
		function getFlashVer() {
			var f="";
     			var n=navigator;
     			if (n.plugins && n.plugins.length) {
         for (var ii=0;ii<n.plugins.length;ii++) {
         
             if (n.plugins[ii].name.indexOf('Shockwave Flash')!=-1) {
             
                 f=n.plugins[ii].description.split('Shockwave Flash ')[1].split(' ')[0];
                 
                 break;
             
             }
         
         }
     
     } else if (window.ActiveXObject) {
 
         for (var ii=12;ii>=2;ii--) {
             
             try {
             
             var fl=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+ii+"');");
             if (fl) {f=ii; break; }
             
             }
             
             catch(e) {}
             
             }
         
         }
         
         return f;
 }

	</script>    
        <script type="text/javascript" src="swfobject.js"></script>
        <script type="text/javascript">
            // For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. 
            var swfVersionStr = "11.1.0";
            // To use express install, set to playerProductInstall.swf, otherwise the empty string. 
            var xiSwfUrlStr = "playerProductInstall.swf";
            var flashvars = {port:'9999',gm:'GM_S',username:'<?php echo $userinfo[userid]?>',password:'<?php echo $userinfo[password]?>',time:'300',ServerAddress:'<?php echo _SITE_URL_?>'};
            var params = {};
            params.quality = "high";
            params.bgcolor = "#000000";
            params.wmode = "direct";
            params.allowscriptaccess = "sameDomain";
            params.allowfullscreen = "true";
            var attributes = {};
            attributes.id = "DEEPSEA";
            attributes.name = "DEEPSEA";
            attributes.align = "middle";
            swfobject.embedSWF(
                "/static_data/swf/DEEPSEA.swf", "flashContent", 
                "1024", "590", 
                swfVersionStr, xiSwfUrlStr, 
                flashvars, params, attributes);
            // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
            swfobject.createCSS("#flashContent", "display:block;text-align:left;");
	 </script>
    </head>
    <body scroll="no" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
        <!-- SWFObject's dynamic embed method replaces this alternative HTML content with Flash content when enough 
             JavaScript and Flash plug-in support is available. The div is initially hidden so that it doesn't show
             when JavaScript is disabled.
        -->
        <div id="flashContent">
            <p>
                To view this page ensure that Adobe Flash Player version 
                11.1.0 or greater is installed. 
            </p>
            <script type="text/javascript"> 
                var pageHost = ((document.location.protocol == "https:") ? "https://" : "http://"); 
                document.write("<a href='http://www.adobe.com/go/getflashplayer'><img src='" 
                                + pageHost + "www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' /></a>" ); 
            </script> 
        </div>
        
        <noscript>
            <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="1024" height="590" id="DEEPSEA">
                <param name="movie" value="/static_data/swf/DEEPSEA.swf" />
                <param name="quality" value="high" />
                <param name="wmode" value="direct" />
                <param name="bgcolor" value="#000000" />
                <param name="allowScriptAccess" value="sameDomain" />
                <param name="allowFullScreen" value="true" />
                <!--[if !IE]>-->
                <object type="application/x-shockwave-flash" data="/static_data/swf/DEEPSEA.swf" width="1024" height="590">
                    <param name="quality" value="high" />
                    <param name="wmode" value="direct" />
                    <param name="bgcolor" value="#000000" />
                    <param name="allowScriptAccess" value="sameDomain" />
                    <param name="allowFullScreen" value="true" />
                <!--<![endif]-->
                <!--[if gte IE 6]>-->
                    <p> 
                        Either scripts and active content are not permitted to run or Adobe Flash Player version
                        11.1.0 or greater is not installed.
                    </p>
                <!--<![endif]-->
                    <a href="http://www.adobe.com/go/getflashplayer">
                        <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash Player" />
                    </a>
                <!--[if !IE]>-->
                </object>
                <!--<![endif]-->
            </object>
        </noscript>     
<script>
if(getFlashVer()<11){
	alert('您的Flash版本太低，无法进行游戏，请前往http://get.adobe.com/flashplayer/获取最新的flash插件');
}
</script>
   </body>
</html>
