<?php
class phpAes
{
	
	private $td;
	private $key;
	private $blocksize;
	
	public function __construct($base64key){
		$this->key = base64_decode($base64key);
		$this->td = mcrypt_module_open(MCRYPT_RIJNDAEL_128, '', "ecb", '');
		$this->blocksize = mcrypt_get_block_size(MCRYPT_RIJNDAEL_128, 'ecb');
		$this->iv = mcrypt_create_iv(mcrypt_enc_get_iv_size($this->td), MCRYPT_RAND);
	}
	
	
	public function __destruct(){
		mcrypt_module_close($this->td);
	}

	public function encrypt($plainSrc){
		$td = $this->td;
		mcrypt_generic_init($td, $this->key, $this->iv);
		$encrypted = mcrypt_generic($td,$this->PaddingPKCS7($plainSrc));
		mcrypt_generic_deinit($td);
		return base64_encode($encrypted);
	}
	
	public function decrypt($base64Src){
		$src = base64_decode($base64Src);
		$td = $this->td;
		mcrypt_generic_init($td, $this->key, $this->iv);
		$decrypted = mdecrypt_generic($td,$src);
		mcrypt_generic_deinit($td);
		return $this->UnPaddingPKCS7($decrypted);
	}
	
	private function PaddingPKCS7 ($data){
		$block_size =  $this->blocksize;
		$padding_char = $block_size - (strlen($data) % $block_size);
		$data .= str_repeat(chr($padding_char), $padding_char);
		return $data;
	}

	private function UnPaddingPKCS7($text){
		$pad = ord($text{strlen($text) - 1});
		if ($pad > strlen($text)) {
			return false;
		}
		if (strspn($text, chr($pad), strlen($text) - $pad) != $pad) {
			return false;
		}
		return substr($text, 0, - 1 * $pad);
	}
}
?>