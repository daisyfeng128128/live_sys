<?php

class page {
	private $current_page;
	private $total_page;
	private $line_size;
	
	/**
	 * @return unknown
	 */
	public function getCurrent_page () {
		return $this->current_page ;
	}
	
	/**
	 * @return unknown
	 */
	public function getLine_size () {
		return $this->line_size ;
	}
	
	/**
	 * @return unknown
	 */
	public function getTotal_page () {
		return $this->total_page ;
	}
	
	/**
	 * @param unknown_type $current_page
	 */
	public function setCurrent_page ( $current_page ) {
		$this->current_page = $current_page ;
	}
	
	/**
	 * @param unknown_type $line_size
	 */
	public function setLine_size ( $line_size ) {
		$this->line_size = $line_size ;
	}
	
	/**
	 * @param unknown_type $total_page
	 */
	public function setTotal_page ( $total_page ) {
		$this->total_page = $total_page ;
	}
	
	function page($c,$t,$n){
		$this->current_page=$c;
		$this->total_page=$t;
		$this->line_size=$n;
	}
	function return_array(){
		$page_arr=array();
		if ($this->total_page<$this->line_size) {
			for($i=1;$i<=$this->total_page;$i++){
				$page_arr[]=$i;
			}
		}
		else{
			if ($this->current_page<($this->line_size-3)) {
				for ($i=1;$i<($this->line_size-2);$i++){
					$page_arr[]=$i;
				}
				$page_arr[]='...';
				$page_arr[]=$this->total_page-1;//最后第二页
				$page_arr[]=$this->total_page;//最后一页
			}
			else{
				if ($this->total_page<$this->line_size+4 || $this->current_page>($this->total_page-($this->line_size-4))) {
					$page_arr[]=1;//第一页
					$page_arr[]=2;//第二页
					$page_arr[]='...';
					for ($i=($this->total_page-($this->line_size-4));$i<=$this->total_page;$i++){
						$page_arr[]=$i;
					}
				}
				else{
					$page_arr[]=1;//第一页
					$page_arr[]=2;//第二页
					$page_arr[]='...';
					//===========
					
					for($i=floor(($this->line_size-7)/2);$i>=0-($this->line_size-7-floor(($this->line_size-7)/2));$i--){
						$page_arr[]=$this->current_page-$i;
					}
					//===========
					$page_arr[]='...';
					$page_arr[]=$this->total_page-1;//最后第二页
					$page_arr[]=$this->total_page;//最后一页
				}
			}
		}
		return $page_arr;
	}
	function return_il(){
				
	}
}
?>
