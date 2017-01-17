define(function(require, exports, module) {
	var that = null;
	module.exports = {
		orderDoc : null,
		xmlUrl : "assets/backLoad.xml",
		loadDelay : 1000 * 10,
		// 初始化加载
		init : function() {
			that = this;
			//setTimeout(this.startBackLoad, this.loadDelay);
		},
		startBackLoad : function() {
			console.log("startBackLoad");
			that.loadXMLDoc(that.xmlUrl);
		},
		// 加载xml方法
		loadXMLDoc : function(url) {
			xmlhttp = null;
			if (window.XMLHttpRequest) {// code for IE7, Firefox, Mozilla, etc.
				xmlhttp = new XMLHttpRequest();
			} else if (window.ActiveXObject) {// code for IE5, IE6
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			if (xmlhttp != null) {
				xmlhttp.onreadystatechange = that.onLoadXmlResponse;
				xmlhttp.open("GET", url, true);
				xmlhttp.send(null);
			} else {
				alert("Your browser does not support XMLHTTP.");
			}
		},
		// xml加载完成
		onLoadXmlResponse : function() {
			if (xmlhttp.readyState != 4)
				return;
			if (xmlhttp.status != 200) {
				alert("Problem retrieving XML data");
				return;
			}
			orderDoc = xmlhttp.responseXML;
			var items = orderDoc.getElementsByTagName("list");
			for (i = 0; i < items.length; i++) {
				that.loadSwfByImage(items[i].textContent);
			}
		},
		// 加载swf
		loadSwfByImage : function(url) {
			var imgloader = new window.Image();
			imgloader.src = url;
			imgloader.onload = that.onLoadSwfComplete(url);
		},
		// swf加载完毕
		onLoadSwfComplete : function(url) {
			console.log(url);
		}
	}
});