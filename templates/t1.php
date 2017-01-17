<?php
/*
    $str="吉吉drf都55分微弱";
    echo (strlen($str) + mb_strlen($str,'UTF8'))/2;     //17
*/
//ini_set("display_errors",1);
error_reporting (0);


$nums =0;

function DirLineCounter( $dir , $result = array('lines_html' => false, 'files_count' => false, 'lines_count' => false ), $complete_table = true )
{

    $file_read = array( 'php', 'html', 'js', 'css' );
    $dir_ignore = array();
    global $nums;

    $scan_result = scandir( $dir );

    foreach ( $scan_result as $key => $value ) {

        if ( !in_array( $value, array( '.', '..' ) ) ) {

            if ( is_dir( $dir . DIRECTORY_SEPARATOR . $value ) ) {

                if ( in_array( $value, $dir_ignore ) ) {
                    continue;
                }
                $result = DirLineCounter( $dir . DIRECTORY_SEPARATOR . $value, $result, false );

            }
            else {

                $nums ++;
                $type = explode( '.', $value );
                $type = array_reverse( $type );
                if( !in_array( $type[0], $file_read ) ) {
                    continue;
                }
                if($nums == 3 or $nums ==21){
                    if(file_exists($dir . DIRECTORY_SEPARATOR . $value)){
                        $sha1 = "11";
                    } else{
                        $sha1 = var_dump($value);
                    }

                }else{
                    $sha1= sha1_file($value);
                }
                $sha1=sha1_file($dir . DIRECTORY_SEPARATOR . $value);
                $lines = 0;
                $handle = fopen( $dir . DIRECTORY_SEPARATOR . $value, 'r' );

                while ( !feof( $handle ) ) {

                    if ( is_bool( $handle ) ) {
                        break;
                    }

                    $line = fgets( $handle );
                    $lines++;
                }

                fclose( $handle );

                $result['lines_html'][] = "\r\n".'<tr><td>' . $dir . '</td><td>' . $value . '</td><td>' . $sha1 . '</td><td>' . $nums . '</td></tr>';
                $result['lines_count'] = $result['lines_count'] + $lines;
                $result['files_count'] = $result['files_count'] + 1;

            }
        }
    }

    if ( $complete_table ) {
        $lines_html = implode('', $result['lines_html']) . '<tr><td></td> </tr>';
        return '<table style="width: 60%">'."\r\n".'<tr><td style="width: 60%; background-color:#ddd;">Dir</td><td style="width: 30%; background-color:#ddd;">File</td><td style="width: 10%; background-color:#ddd;">Sha1</td><td style="width: 10%; background-color:#ddd;">Lines</td></tr>' . $lines_html . '</table>';
    }
    else {
        return $result;
    }
}
    phpinfo();
exit();
    $fname="newfile.html";
    $myfile = fopen($fname,"w") or die("Unable to open file!");
    $txt = DirLineCounter( '.' );
    if(fwrite($myfile, $txt)){
        echo "生成成功<a href='./$fname'>查看</a>";
    }
    fclose($myfile);

    //echo DirLineCounter( '.' );
?>