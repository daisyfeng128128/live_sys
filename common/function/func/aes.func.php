<?php
if(version_compare(PHP_VERSION,'5.6.0','ge')){
    # --- 加密 ---

    # 密钥应该是随机的二进制数据，
    # 开始使用 scrypt, bcrypt 或 PBKDF2 将一个字符串转换成一个密钥
    # 密钥是 16 进制字符串格式



    function aes_encrypt($aaa){
        $key = pack('H*', "bcb04b7e103a0cd8b54669051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
        $key_size =  strlen($key);
        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
        $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);

        $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key,$aaa, MCRYPT_MODE_CBC, $iv);
        $ciphertext = $iv . $ciphertext;
        $ciphertext_base64 = base64_encode($ciphertext);
        return $ciphertext_base64;
    }

    //  echo "加密后:". encrypt($plaintext) . "<br />";

    # === 警告 ===

    # 密文并未进行完整性和可信度保护，
    # 所以可能遭受 Padding Oracle 攻击。

    # --- 解密 ---

    function aes_decrypt($ccc){
        $key = pack('H*', "bcb04b7e103a0cd8b54669051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
        $key_size =  strlen($key);
        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
        $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);

        $ciphertext_dec = base64_decode($ccc);
        $iv_dec = substr($ciphertext_dec, 0, $iv_size);
        $ciphertext_dec = substr($ciphertext_dec, $iv_size);
        $plaintext_dec = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key,$ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);
        return $plaintext_dec;
    }

    //echo  "解密后:". decrypt(encrypt($plaintext)) . "<br />";

}else{

    /*
     * 实现AES加密
    * $str : 要加密的字符串
    * $keys : 加密密钥
    * $iv : 加密向量
    * $cipher_alg : 加密方式
    */
    function aes_encrypt($str,$keys="h1f2ae11k345ydev",$iv="320211233333dseddev",$cipher_alg=MCRYPT_RIJNDAEL_128){
        $encrypted_string = bin2hex(mcrypt_encrypt($cipher_alg, $keys, $str, MCRYPT_MODE_CBC,$iv));
        return $encrypted_string;
    }
    /*
     * 实现AES解密
    * $str : 要解密的字符串
    * $keys : 加密密钥
    * $iv : 加密向量
    * $cipher_alg : 加密方式
    */

    function aes_decrypt($str,$keys="h1f2ae11k345ydev",$iv="320211233333dseddev",$cipher_alg=MCRYPT_RIJNDAEL_128){
        $decrypted_string = mcrypt_decrypt($cipher_alg, $keys, pack("H*",$str),MCRYPT_MODE_CBC, $iv);
        return $decrypted_string;
    }


}


