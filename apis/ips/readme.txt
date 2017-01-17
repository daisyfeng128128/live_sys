验证方式：
	订单支付接口采用Md5摘要验证(OrderEncodeType=5)

	交易返回接口采用Md5withRSA验证(RetEncodeType=16) 或 Md5摘要验证(RetEncodeType=17)

使用说明：
	1、将demo文件夹下文件放于站点文件夹

	2、若:订单支付接口采用Md5摘要验证(OrderEncodeType=5)
		1)、将订单支付接口OrderEncodeType字段设置为5
		2)、参考范例程序来生成Md5摘要
		3)、Md5摘要原文=billno+订单编号+ currencytype +币种+ amount +订单金额+ date +订单日期+ orderencodetype +订单支付接口加密方式+商户内部证书字符串	

	3、若:交易返回接口采用Md5withRSA验证(RetEncodeType=16)
		1)、把key/PubKey文件夹下publickey.txt(测试环境和正式环境不同)复制到某一目录下(demo设置为C:\PubKey\), 如更改路径请在程序中做相应更改
		2)、将订单支付接口RetEncodeType字段设置为16
		3)、修改商户接受交易返回页面，参考范例程序来进行Md5withRSA验证
		4)、签名验证原文=billno+订单编号+currencytype+币种+amount+订单金额+date+订单日期+succ+成功标志+ipsbillno+IPS订单编号+retencodetype +交易返回签名方式

	4、若:交易返回接口采用Md5摘要验证(RetEncodeType=17)
		1)、将订单支付接口RetEncodeType字段设置为17
		2)、参考范例程序来进行Md5摘要验证
		3)、签名验证原文=billno+订单编号+currencytype+币种+amount+订单金额+date+订单日期+succ+成功标志+ipsbillno+IPS订单编号+retencodetype +交易返回签名方式+商户内部证书
	
相关信息：
	测试商户号000015  
	测试证书：GDgLwwdK270Qj1w4xho8lyTpRQZV9Jm5x4NwWOTThUa4fMhEBK9jOXFrKRT6xhlJuU2FEa89ov0ryyjfJuuPkcGzO5CeVx5ZIrkkt1aBlZV36ySvHOMcNv8rncRiy3DQ
	测试环境提交地址：https://pay.ips.net.cn/ipayment.aspx
	正式环境提交地址：https://pay.ips.com.cn/ipayment.aspx
	

