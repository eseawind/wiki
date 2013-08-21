function __adoc(x){
	x = x.replace(/(`)([^`]*)(`)/g, function(a, b, c, d){
		return c.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, "&quot;");
	});
	x = x.replace(/\r/g,'').split('\n');
	x.push('');

	//处理预格式
	var pre_ing = false,pre_cursor = 0;
	while(typeof x[pre_cursor] == 'string'){
		if(x[pre_cursor].match(/^\t/)){
			
			x[pre_cursor] = x[pre_cursor].replace(/^\t/,'');
			if(pre_ing){
				x[pre_cursor-1] += x[pre_cursor] + '\n';
				x.splice(pre_cursor,1);
				pre_cursor --;
			}else{
				pre_ing = true;
				var HightLightenTypeReg=/\:{3}(.*)/;
				var codeType=HightLightenTypeReg.exec(x[pre_cursor]);
				if(codeType){
					x[pre_cursor] = '<div class="code"><pre class="adoc-sy adoc-sy-'+codeType[1]+'">';
				}else{
					x[pre_cursor] = '<div class="code"><pre>' + x[pre_cursor] + '\n';
				}
				
			}
		}else{
			if(pre_ing){
				pre_ing = false;
				x[pre_cursor-1] += '</pre></div>';
			}
		}
		pre_cursor ++;
	}

	//处理表格
	var	tb_ing = false,tb_cursor = 0;
	while(typeof x[tb_cursor] == 'string'){
		if(x[tb_cursor].match(/^\|[\u0000-\uffff]+\|\s*$/)){
			if(tb_ing){
				var s = x[tb_cursor].split('|');
				s.shift();
				s.pop();
				$.each(s,function(i){
					if(s[i].match(/^\*[\u0000-\uffff]+\*$/)){
						s[i] = '<th>' + s[i].slice(1,-1) + '&nbsp;</th>';
					}else{
						s[i] = '<td>' + s[i] + '&nbsp;</td>';
					}
				});
				x[tb_cursor-1] += '<tr>' + s.join('') + '</tr>';
				x.splice(tb_cursor,1);
				tb_cursor --;
			}else{
				tb_ing = true;
				x.splice(tb_cursor,0,'<table cellspacing="0">');
			}
		}else{
			if(tb_ing){
				tb_ing = false;
				x[tb_cursor-1] += '</table>';
			}
		}
		tb_cursor ++;
	}

	var xx = [];

	//处理基本的标签
	for(var i=0;i<x.length;i++){
		if(x[i]){
			x[i] = x[i].replace(/^#####\s*([^<>\n\r]+?)$/g,'<h5>$1</h5>')
			.replace(/^####\s*([^<>\n\r]+?)$/g,'<h4>$1</h4>')
			.replace(/^###\s*([^<>\n\r]+?)$/g,'<h3>$1</h3>')
			.replace(/^##\s*([^<>\n\r]+?)$/g,'<h2>$1</h2>')
			.replace(/^#\s*([^<>\n\r]+?)$/g,'<h1>$1</h1>')
			.replace(/([^^])(\t)/g,'$1&nbsp;&nbsp;&nbsp;&nbsp;')
			.replace(/^={5,}$/g,'<hr>')
			.replace(/^\s*---\s*$|^\s\*\*\*\s*$/g,'<hr />')
			.replace(/==([^=<>\n\r]+?)==/g,'<strong>$1</strong>')
			.replace(/[^\\]\*\*([^=<>\n\r\*]+?)\*\*/g,'<strong>$1</strong>')
			.replace(/\*([^=<>\n\r\*]+?)\*/g,'<em>$1</em>')
			.replace(/\[([^\[\]]+?)\]\((https?:\/\/[a-zA-Z0-9_%-\.:/\[\]\?=#]+)(\s+"([^"]+?)")?\)/g,
			'<a target="_blank" href="$2" title="$4">$1</a>')
			.replace(/<(http:\/\/[#;~a-zA-Z0-9_%-\.:/\[\]\?=]+)>/g,'<a target="_blank" href="$1">$1</a>')
			.replace(/\!\[([^\[\[]+)\]\(([a-zA-Z0-9_%-\.:/\[\]\?=~]+) "([^"]+)"\)/g, '<img src="$2" alt="$1" title="$3">');

			xx.push(x[i]);
		}
	}

	if(xx[0].match(/% /)){
		xx[0] = '<h1 class="adoc_title">' + xx[0].slice(2) + '</h1>';
	};

	if(xx[1] && xx[1].match(/% /)){
		xx[1] = '<span class="adoc_author">作者：' + xx[1].slice(2) + '</span>';
	}

	if(xx[2] && xx[2].match(/% /)){
		xx[2] = '<span class="adoc_date">时间：' + xx[2].slice(2) + '</span>';
	}

	if(xx[3] && xx[3].match(/% /)){
        var tags = xx[3].slice(2).split(/,|\s+/);
        var html = [];
        $.each(tags, function(i, t){
            html.push('<a target="_blank" href="http://fe.baidu.com/doc/_ADoc/search.py/tag_list?dir=aladdin#' + t + '">' + 
                t + '</a>');
        });
		xx[3] = '<span class="adoc_tag">tags：' + html.join(', ') + '</span>';
	}

	var html = '<div class="adoc">' + xx.join('<br>\n').replace(/(<\/h\d>|<\/div>)<br>/g,'$1') + '</div>';

	return html;
}

