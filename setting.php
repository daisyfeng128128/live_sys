<html>
<head>
    <script src="/skin/desert/js/jquery.min.js"></script>

    <script>
        $.ajax({
            url: "http://10.1.1.17/remot.js", //请求的url
            dataType : "jsonp",
            //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            jsonp: "callback",
            //自定义的jsonp回调函数名称"jsonpCallback"，返回的json也必须有这个函数名称
            jsonpCallback:"jsonpCallback",
            success : function(json){
                if(json.s=="successfully")
                { console.log("request successfully");}
            },
            error: function(xhr,status,error)
            { console.log(xhr); }
        });

        /*  remot.js:
            jsonpCallback({"s":"我是远程js带来的数据"});
            return "jsonpCallback"+"({\"s\":\"successfuly\"})";//返回必须是json字符串
        */
    </script>
</head>
<body>

</body>
</html>