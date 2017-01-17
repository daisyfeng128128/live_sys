function CheckReg()
{
	if(document.getElementById("username").value.length <= 0)
	{
		document.getElementById("username").focus();
		alert("请填写您需要申请的登陆账号");
		return false;
	}
	
	if(document.getElementById("userpass").value.length <= 0)
	{
		document.getElementById("userpass").focus();
		alert("请填写登陆密码");
		return false;
	}
	
	if(document.getElementById("userpass").value.length < 6)
	{
		document.getElementById("userpass").focus();
		alert("登陆密码最少6位!!");
		return false;
	}
	
	if(document.getElementById("siteurl").value.length <= 0 || document.getElementById("siteurl").value=='http://')
	{
		document.getElementById("siteurl").focus();
		alert("请填写您的站点地址");
		return false;
	}
	
	if(document.getElementById("linkman").value.length <= 0)
	{
		document.getElementById("linkman").focus();
		alert("请填写联系人");
		return false;
	}
	
	if(document.getElementById("bankname").value.length <= 0)
	{
		document.getElementById("bankname").focus();
		alert("请填写您的开户银行详细名称");
		return false;
	}
	
	if(document.getElementById("bankaccount").value.length <= 0)
	{
		document.getElementById("bankaccount").focus();
		alert("请填写您的银行开户人姓名");
		return false;
	}
	
	if(document.getElementById("bankcardnum").value.length <= 0)
	{
		document.getElementById("bankcardnum").focus();
		alert("请填写您的银行卡号");
		return false;
	}
	
	if(document.getElementById("qq").value.length <= 0)
	{
		document.getElementById("qq").focus();
		alert("请填写您的联系QQ或者MSN");
		return false;
	}
	
	if(document.getElementById("phone").value.length <= 0)
	{
		document.getElementById("phone").focus();
		alert("请填写您的联系电话");
		return false;
	}
	
	if(document.getElementById("vercode").value.length <= 0)
	{
		document.getElementById("vercode").focus();
		alert("-请填写验证码-");
		return false;
	}
}