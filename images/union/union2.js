$(document).ready(function(){
		// 用户名事件
		$('#username_reg').blur(function() {
			checkUserName();
		});
		
		// 密码的事件
		$('#password').blur(function() {
			checkPassword();
		});

		// 密码校验的事件
		$('#conf_passsword').blur(function() {
			checkCfmPassword();
		});
		
		//设置注册弹出层
		setTimeout("abc();", 1000 * 5);
		type = new Date().getTime() % 2;
		
		if (type == 0) {
			$("#showView1").show();
			var html = new Array();
			html[html.length] = '<object classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" id="obj1" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" border="0" width="316" height="237">';
			html[html.length] = '<param name="movie" value="/images/union/img/mugua.swf">';
			html[html.length] = '<param name="quality" value="High">';
			html[html.length] = '<param name="loop" value="false">';
			html[html.length] = '<param name="wmode" value="transparent">';
			html[html.length] = '<embed src="/images/union/img/mugua.swf" wmode="transparent"  type="application/x-shockwave-flash" name="obj1" width="316" height="237" quality="High" loop="false">';
			html[html.length] = '</object>';
			$("#showView1").prepend(html.join(''));
		} else {
			$("#showView2").show();
			var html = new Array();
			html[html.length] = '<object classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" id="obj1" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" border="0" width="338" height="237">';
			html[html.length] = '<param name="movie" value="/images/union/img/vsp.swf">';
			html[html.length] = '<param name="quality" value="High">';
			html[html.length] = '<param name="loop" value="false">';
			html[html.length] = '<param name="wmode" value="transparent">';
			html[html.length] = '<embed src="/images/union/img/vsp.swf" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" name="obj1" width="316" height="237" quality="High" loop="false">';
			html[html.length] = '</object>';
			$("#showView2").prepend(html.join(''));
		}
		
		// 点击from 提交
		 $('#unionButtonSubmit').click(function(){
			  	//获取url 的参数 
				var Request = new Object();
				Request = GetRequest();
				var from;
				from = Request['from']; // 渠道号 
				if (_regValid.valid()) {
					document.getElementById("signform").submit();
				}
		 }); 
 	 });


	var  fromChannel; //设置 渠道 的编号 
	
	//设置 渠道的值
	function setFromValue(from){
		fromChannel =from ;
	}

	if (window.innerWidth)
		winWidth = window.innerWidth;
	else if ((document.body) && (document.body.clientWidth))
		winWidth = document.body.clientWidth;
	//获取窗口高度
	if (window.innerHeight)
		winHeight = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;
	//通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientHeight
			&& document.documentElement.clientWidth) {
		winHeight = document.documentElement.clientHeight;
		winWidth = document.documentElement.clientWidth;
	}
	//结果输出至两个文本框

	var show = false;
	var h = winHeight / 2 - 210;
	var sh = h + 'px';
	$('.showPopMark2').css('top', sh);
	var type = 0;
	function abc() {
		$('#signwin').show();
		//$('#markShow').show();
		if (type == 0) {
			$("#showPopMark2").show();
		} else {
			$("#showPopMark3").show();
		}
	}
	

	
	//js 获取url 的参数值
	function GetRequest() {
		   var url = location.search; //获取url中"?"符后的字串
		   var theRequest = new Object();
		   if (url.indexOf("?") != -1) {
		      var str = url.substr(1);
		      strs = str.split("&");
		      for(var i = 0; i < strs.length; i ++) {
		         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		      }
		   }
		   return theRequest;
	}
	

	if (top.location != location)
		top.location.href = location.href;
	self.moveTo(0, 0);
	self.resizeTo(screen.availWidth, screen.availHeight);
	
	//注册页面显示
	function signshow() {
		$("#showPopMark2").hide();
		$("#showPopMark3").hide();
		$("#signwin").show(500);
	}
	
	// 关闭注册也面
	function closesign() {
		if (type == 0) {
			$("#showPopMark2").show();
		} else {
			$("#showPopMark3").show();
		}
		$("#signwin").hide(500);
	}
	
	
	// 客户端校验用户名的规则
	function checkUserName() {
		var itemObj = $('#username_reg');
		clearTip(itemObj);
		var valid = checkEmpty(itemObj) &&checkCNChar(itemObj) && checkNotNumber(itemObj)&& checkValueLen(itemObj);
		if (valid) {
			setRight(itemObj);
		}
		
		_regValid.username = valid;
		
		return valid;
	}
	

	// 客户端 校验两次密码时候一直
	function checkPassword() {
		var pwdItem = $('#password');
		clearTip(pwdItem);
		var valid = checkEmpty(pwdItem) && checkCharactor(pwdItem)&& checkValueLen(pwdItem);
		if (valid == true) {
			setRight(pwdItem);
			var confPwdItem = $('#conf_passsword');
			if (confPwdItem.val() != '') {
				valid = confPwdItem.val() == pwdItem.val();
				if (valid == false) {
					setTip(confPwdItem, "密码不一致");
				} else {
					setRight(confPwdItem);
				}
			}

		}
		_regValid.pwd = valid;
		return valid;
	}
	
	// 校验 第二次密码 和第一次密码时候一直
	function checkCfmPassword() {
		var pwdItem = $('#password');
		var confPwdItem = $('#conf_passsword');
		clearTip(confPwdItem);
		var valid = checkEmpty(confPwdItem) && checkCharactor(confPwdItem);
		if (valid == true) {
			valid = confPwdItem.val() == pwdItem.val();
			if (valid == false) {
				setTip(confPwdItem, "两次密码不一致");
			} else {
				setRight(confPwdItem);
			}
		}
		_regValid.cfmpwd = valid;
		return valid;
	}
		
	
	
	// from 提交的时候 的验证 
	var _regValid = {
			username : false,
			pwd : false,
			cfmpwd : false,
			valid : function() {
				if (this.username == false) {
					if (checkUserName() == false) {
						return false;
					}
				}
				if (this.pwd == false) {
					if (checkPassword() == false) {
						return false;
					}
				}
				if (this.cfmpwd == false) {
					if (checkCfmPassword() == false) {
						return false;
					}
				}
				return true;
			}
		};