##新思路文档平台

让所有的团队成员更优雅的编写文档

##配置

###index.html 

+ 配置网站根目录：

		var ADOC_URL_PRE = 'http://localhost/wiki/';

+ 配置网站标题

		var ADOC_TITLE = '新思路团队文档平台';

+ 配置主页目录：

		var ADOC_HOME_URL = 'data/home.text';
		
###doc_list.php

+ 配置文档目录的中英文映射：
		
		$dir_names = array(
    			'netcool' => '网酷文档',
    			'andriod' => '安卓组文档',
    			'win8' => 'win8组文档',
    			'share' => '团队分享',
		);

	

##使用

在data目录里面的相应分类文件夹中添加文档，文档使用markdown语法。如果文档中需要引用图片或者文件，可在根目录下建立相应文件夹存放

