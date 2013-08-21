<?php
header('Content-type:text/html;charset=utf-8');

$dir_names = array(
    'netcool' => '网酷文档',
    'andriod' => '安卓组文档',
    'win8' => 'win8组文档',
    'share' => '团队分享',
);

$list = array(
	array(
		'name' => '新思路团队',
		'list' => get_file_list('data')
	),
);

function file_title_sort($a, $b) {
    if ($a['text'] == $b['text']) {
        return 0;
    }
	$arr = array(strtolower($a['text']), strtolower($b['text']));
	sort($arr);
	if($arr[0] == strtolower($a['text'])){
		return -1;
	}
	return 1;
}

function get_file_list($dir){
    global $dir_names;
	$file_list = array();
	@$file_handle = opendir($dir);
    if(!$file_handle){
        return $file_list;
    }
	while(false !== ($file = readdir($file_handle))){

		$file_path = "$dir/$file";
        if($file !== '.' && $file !== '..' && $file !== '.svn'){
            if(is_file($file_path)){
                array_push($file_list, array(
                    'url' => $file_path,
                    'text' => get_file_title($file_path)
                ));
            }else{
                array_push($file_list, array(
                    'url' => $file_path,
                    'text' => array_key_exists($file, $dir_names) ? $dir_names[$file] : $file,
                    'children' => get_file_list($file_path)
                ));
            }
		}
	}
	closedir($file_handle);
	usort($file_list, 'file_title_sort');
    return $file_list;
}

function get_file_title($file){
    $ext = pathinfo($file, PATHINFO_EXTENSION);
    if($ext == 'text' || $ext == 'txt'){
        $content = file_get_contents($file);

        if(preg_match("/% ([^\n]+)\n/", $content, $title)){
            return $title[1];
        }else if(preg_match("/#+([^\n]+)\n/", $content, $title)){
            return $title[1];
        }else{
            return '错误的标题!!';
        }
    }
    return pathinfo($file, PATHINFO_BASENAME);
}

if(isset($_GET['wd']) && !empty($_GET['wd'])){
	$keyword = $_GET['wd'];
	$keyword = preg_replace("/'/", '', $keyword);
	$path = realpath('./data');

	$cmd = "grep --max-count=1 -Irn '$keyword' $path";
	$result = shell_exec($cmd);
	
	//直接输出grep后的文本，js去分析显示吧
	echo $result;

}else{
	//输出列表
	echo 'Doc=' . json_encode($list);
}
