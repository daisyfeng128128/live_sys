<?php
header("Content-type:text/html; charset=gb2312");

//商户订单号
$BillNo = date('YmdHis') . mt_rand(100000,999999);

//商户交易日期
$BillDate = date('Ymd');

//商户返回地址
$url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') ? 'https://' : 'http://';
$url .= str_ireplace('localhost', '127.0.0.1', $_SERVER['HTTP_HOST']) . $_SERVER['SCRIPT_NAME'];
$url = str_ireplace('orderpay', 'OrderReturn', $url);
?>
<html>
  <head>
    <meta http-equiv="content-Type" content="text/html; charset=gb2312">
    <title>标准商户订单支付接口(新接口)</title>
    <style type="text/css">
      <!--
      TD {FONT-SIZE: 9pt}
      SELECT {FONT-SIZE: 9pt}
      OPTION {COLOR: #5040aa; FONT-SIZE: 9pt}
      INPUT {FONT-SIZE: 9pt}
      -->
    </style>
  </head>

  <body bgcolor="#FFFFFF">
    <form action="redirect.php" METHOD="POST" name="frm1">	
      <table width="450px" border="1" cellspacing="0" cellpadding="3" bordercolordark="#FFFFFF" bordercolorlight="#333333" bgcolor="#F0F0FF" align="center">
        <tr bgcolor="#8070FF"> 
          <td colspan="2" align="center">
            <font color="#FFFF00"><b>标准商户订单支付接口(新接口)</b></font>
          </td>
        </tr>
        <tr>
          <td width="37%">提交地址</td>
          <td width="63%">
            <select name="test">
              <option value="1" selected="selected">测试环境</option>
              <option value="0" >正式环境</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>商户号</td>
          <td>
            <input type="text" name="Mer_code" size="18" value="000015" /><!--测试商户号-->
          </td>
        </tr>
        <tr>
          <td>商户证书</td>
          <td>
            <input type="text" name="Mer_key" size="40" value="GDgLwwdK270Qj1w4xho8lyTpRQZV9Jm5x4NwWOTThUa4fMhEBK9jOXFrKRT6xhlJuU2FEa89ov0ryyjfJuuPkcGzO5CeVx5ZIrkkt1aBlZV36ySvHOMcNv8rncRiy3DQ" /><!--测试商户号-->
          </td>
        </tr>
        <tr>
          <td>订单号</td>
          <td>
            <input type="text" name="Billno" size="24" value="<?php echo $BillNo; ?>" />
          </td>
        </tr>
        <tr>
          <td>金&nbsp;&nbsp;额</td>
          <td>
            <input type="text" name="Amount" size="18" value="0.02" /><!--保留两位小数-->
          </td>
        </tr>
        <tr>
          <td>显示金额</td>
          <td>
            <input type="text" name="DispAmount" size="18" value="0.10" />
          </td>
        </tr>
        <tr>
          <td>日&nbsp;&nbsp;期</td>
          <td>
            <input type="text" name="Date" size="18" value="<?php echo $BillDate; ?>" />
          </td>
        </tr>
        <tr>
          <td>支付币种</td>
          <td>
            <select name="Currency_Type">
              <option value="RMB" selected="selected">人民币</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>支付方式</td>
          <td>
            <select name="Gateway_Type">
              <option value="01" selected="selected">借记卡</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>语言</td>
          <td>
            <select name="Lang">
              <option value="GB">GB中文</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>支付成功返回URL</td>
          <td>
            <input type="text" name="Merchanturl" size="40" value="<?php echo $url; ?>" />
          </td>
        </tr>
        <tr>
          <td>支付失败返回URL</td>
          <td>
            <input type="text" name="FailUrl" size="40" value="" />
          </td>
        </tr>
        <tr>
          <td>商户附加数据包</td>
          <td>
            <input type="text" name="Attach" size="40" value="" />
          </td>
        </tr>
        <tr>
          <td>订单支付加密方式</td>
          <td>
            <select name="OrderEncodeType">
              <option value="5" selected="selected">md5摘要</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>交易返回加密方式</td>
          <td>
            <select name="RetEncodeType">
              <option value="16">md5withRsa</option>
              <option value="17" selected="selected">md5摘要</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>是否提供Server返回方式</td>
          <td>
            <select name="Rettype">
              <option value="0">无Server to Server</option>
              <option value="1" selected="selected">有Server to Server</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Server to Server返回页面</td>
          <td>
            <input type="text" name="ServerUrl" size="40" value="<?php echo $url; ?>" />
          </td>
        </tr>
        <tr>
          <td colspan="2" align="center">
            <input type="submit" value="提交" />
            <input type="reset" value="重写" />
          </td>
        </tr>
      </table>
    </form> 
  </body> 
</html>