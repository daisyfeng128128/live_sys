// JavaScript Document
$(function(){
	function login() {
	  var btn = $("#btn_login");
	  btn.button('loading');
	  setTimeout(function () { btn.button('reset'); },2000);
	}
});
