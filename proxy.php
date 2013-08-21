<?php
$url = $_GET['url'];
if(isset($url)){
    if (strpos($url, '..')) {
        die('Not Allowed!');
    }
	echo file_get_contents($url);
}else{
	echo 'please give me a url param.';
}
?>