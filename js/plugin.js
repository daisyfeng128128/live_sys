function isIE2() { //ie?
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}

var havePlugin=true;
	function noplugin(){
		havePlugin=false;
	}
	function isHavePlugin(){
		if(isIE2()){
			return havePlugin;
		} 
　　 	else {
			return false;
		}
	}

	function getVideoQuality(device) {
        var options = {};
        options.dwCamWidth = 320;
        options.dwCamHeight = 240;
        options.dwVideoWidth = 320;
        options.dwVideoHeight = 240;
        options.dwVideoFPS = 10;
        options.dwAudioDeviceID = device.microphone;
        options.dwAudioSampleRate = 22050;
        options.dwAudioChannel = 2;
        options.dwAudioBitRate = 32000;
        options.dwCameraID = device.camera;
        options.dwVideoBitRate = 150;
        return options;
    }
	function stopPublish(){
		if(!isHavePlugin()){
			//alert('没有安装插件');
			return;
		}
		var obj=document.getElementById("HDPlugin");
		try{
            var res = obj.Stop();
		}
		catch(e){
			//alert(e);
		}
	}
	function startPublish(mediaAddress,_cam,_mic) {
	//alert("mediaAddress,"+mediaAddress+",_cam,"+_cam+",_mic,"+_mic);
		if(!isHavePlugin()){
			//alert('没有安装插件');
			return;
		}
		var obj=document.getElementById("HDPlugin");
        var options = getVideoQuality({microphone:_mic,camera:_cam});
        if (!options) {
            throw new Error("Fail to get video options");
            return;
        }
		try{
            var res = obj.Start(options.dwCamWidth, options.dwCamHeight, options.dwCameraID, options.dwVideoWidth, options.dwVideoHeight, options.dwVideoFPS, options.dwVideoBitRate, options.dwAudioDeviceID, options.dwAudioSampleRate, options.dwAudioChannel, options.dwAudioBitRate, mediaAddress);
		}
		catch(e){
			//alert(e);
		}
	}