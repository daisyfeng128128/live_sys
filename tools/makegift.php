<?php
/**
 * /tools/makegift.php
 * 1.根据礼物，将每个礼物的小图生成一张大图作为礼物的背景显示,并生成对应的css
 * 2.根据豪华礼物的id,输出xml，放到指定的位置
 */
include('../include/header.inc.php');
class images_to_sprite {
	function images_to_sprite($folder, $output, $x, $y, $giftimgarr) {
		$this->folder = ($folder ? $folder : 'myfolder'); // Folder name to get images from, i.e. C:\\myfolder or /home/user/Desktop/folder
		$this->giftimgarr = ($giftimgarr ? $giftimgarr : null);
		$this->filetypes = array (
				'jpg' => true,
				'png' => true,
				'gif' => true 
		); // Acceptable file extensions to consider
		$this->output = ($output ? $output : 'mysprite'); // Output filenames, mysprite.png and mysprite.css
		$this->x = $x; // Width of images to consider
		$this->y = $y; // Heigh of images to consider
		$this->files = array ();
	}
	function create_sprite() {
		$basedir = $this->folder;
		if(empty($this->giftimgarr)){
			$files = array ();
			// Read through the directory for suitable images
			if ($handle = opendir ( $this->folder )) {
				while ( false !== ($file = readdir ( $handle )) ) {
					$split = explode ( '.', $file );
					// Ignore non-matching file extensions
					if ($file [0] == '.' || ! isset ( $this->filetypes [$split [count ( $split ) - 1]] )){
	// 					echo 'Do not match file types<br>';
						continue;
					}
						
						// Get image size and ascertain it has the correct dimensions
					//$output = getimagesize ( $this->folder . '/' . $file );
					//if ($output [0] != $this->x && $output [1] != $this->y){
					//	echo 'Do not match file SIZE'.$output [0].'x'.$output [1].'<br>';
					//	continue;
					//}
						
						// Image will be added to sprite, add to array
					$this->files [$file] = $file;
				}
				closedir ( $handle );
			}
		}else{
			foreach ( $this->giftimgarr as $file ) {
				$file = $file["giftimage"];
				if(file_exists($this->folder . '/' . $file)){
					$this->files [$file] = $file;
				}
			}
		}
		// yy is the height of the sprite to be created, basically X * number of images
		$this->yy = $this->y * count ( $this->files );
		$im = imagecreatetruecolor ( $this->x, $this->yy );
		// Add alpha channel to image (transparency)
		imagesavealpha ( $im, true );
		$alpha = imagecolorallocatealpha ( $im, 0, 0, 0, 127 );
		imagefill ( $im, 0, 0, $alpha );
		
		// Append images to sprite and generate CSS lines
		$i = $ii = 0;
		$returncss="";
		//$fp = fopen ( $this->output . '.css', 'w' );
if($this->output=="giftsmall"){
	$h = "_x";
}else if($this->output=="giftbig_wap"){
	$h = "_wap";
}else{
	$h = "";
}
		//fwrite ( $fp, '.' . $this->output . ' { width: ' . $this->x . 'px; height: ' . $this->y . 'px; background-image: url(' . $this->output . '.png); text-align:center; }' . "\n" );
		$returncss.='.' . $this->output . ' { width: ' . $this->x . 'px; height: ' . $this->y . 'px; background-image: url(/images/' . $this->output . '.png?'.time().'); text-align:center; }' . "\n";
		global $app_path;
		foreach ( $this->files as $key => $file ) {
			//fwrite ( $fp, '.' . $this->output . (++ $ii) . ' { background-position: -0px -' . ($this->y * $i) . 'px; }' . "\n" );
			$tmp=explode('.',$file);
			
			$returncss.='' . 'img.'. str_replace('.'.$tmp[count($tmp)-1],'',$file) .$h. ' { background-position: -0px -' . ($this->y * $i) . 'px; }' . "\n";
			$functionname="imagecreatefrom".$tmp[count($tmp)-1];
			$im2 = $functionname( $this->folder . '/' . $file );
			$output = getimagesize ( $this->folder . '/' . $file );
			ImageCopyResized ( $im, $im2, 0, ($this->y * $i), 0, 0, $this->x, $this->y,$output[0],$output[1] );
			
if($this->output=="giftbig"){
	//生成缩略图，保存
	$file_type=$tmp[count($tmp)-1];
	$dist_filename=$app_path."static_data/gift_s/".$file;
	$source_filename=$app_path."static_data/gift/".$file;
	
	if(strtolower($file_type)=="png"){//如果是png图片，做无损压缩
		$srcImg = imagecreatefrompng($source_filename);
		$srcWidth = imagesx($srcImg);
		$srcHeight = imagesy($srcImg);
		
		$newImg = imagecreatetruecolor($this->x, $this->y);
		//分配颜色 + alpha，将颜色填充到新图上
		$alpha = imagecolorallocatealpha($newImg, 0, 0, 0, 127);
		imagefill($newImg, 0, 0, $alpha);
		
		//将源图拷贝到新图上，并设置在保存 PNG 图像时保存完整的 alpha 通道信息
		imagecopyresampled($newImg, $srcImg, 0, 0, 0, 0, $this->x, $this->y, $srcWidth, $srcHeight);
		imagesavealpha($newImg, true);
		imagepng($newImg, $dist_filename);
	}else{
		include_once $app_path.'tools/phpthumb.php';
		makeThumb($source_filename,$dist_filename,$this->x,$this->y);
	}
}
			$i ++;
		}
		//fclose ( $fp );
		imagepng ( $im, ($app_path."images/".$this->output . '.png') ); //生成一张大图
		imagedestroy ( $im );
		return $returncss;//返回css
	}
	
}

$css_content = "/*程序自动生成，直接修改无效*/\n";

$giftimgarr = $db->GetArray("select giftimage from gift where giftcateid!=8 and giftimage!=''");
$class = new images_to_sprite ( $app_path.'static_data/gift', 'giftbig', 69, 69, $giftimgarr);
$css_content.=$class->create_sprite ();

$class = new images_to_sprite ( $app_path.'static_data/gift', 'giftsmall', 22, 22, $giftimgarr);
$css_content.=$class->create_sprite ();

$class = new images_to_sprite ( $app_path.'static_data/gift', 'giftbig_wap', 80, 80, $giftimgarr);
$css_content.=$class->create_sprite ();

//保存生成的css
file_put_contents($app_path."css/gift.css",$css_content);

//生成swf礼物xml
$url = empty($page_var['cdn_domain'])?("http://"._SITE_URL_."/"):($page_var['cdn_domain']."/");
$url = "http://"._SITE_URL_."/";
$gift_hh = $db->GetArray("select * from gift where giftflash like '%.swf%'");
$xml = "<root>";
foreach ($gift_hh as $value) {
	$xml .= "<gift id='$value[giftid]' name='$value[giftname]' url='{$url}static_data/showGift/$value[giftflash]'/>\n";
}
$xml .= "</root>";
file_put_contents($app_path."static_data/showGift/gift.xml",$xml);


//生成指定礼物数量图形xml
$tmp = <<<eto
<gift_shape>
	<v url="{$url}static_data/giftShape/giftShape/v.xml" type="1"/>
	<xin url="{$url}static_data/giftShape/giftShape/xin.xml" type="1"/>
	<xiaolian url="{$url}static_data/giftShape/giftShape/xiaolian.xml" type="1"/>
	<love url="{$url}static_data/giftShape/giftShape/love.xml" type="1"/>
	<x url="{$url}static_data/giftShape/giftShape/x.xml" type="1"/>
	<v520 url="{$url}static_data/giftShape/giftShape/v520.xml" type="1"/>
	<v1314 url="{$url}static_data/giftShape/giftShape/v1314.xml" type="1"/>
	<v3344 url="{$url}static_data/giftShape/giftShape/v3344.xml" type="1"/>
</gift_shape>
eto;
file_put_contents($app_path."static_data/giftShape/shape2.xml",$tmp);

//下载swf配置
file_get_contents('http://'.$_SERVER['HTTP_HOST'].'/apis/admin/download_config.php?type=download');

include('../include/footer.inc.php');