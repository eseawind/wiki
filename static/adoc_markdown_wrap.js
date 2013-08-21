function __adoc(text){
	var lines = text.replace(/\r/g,'').split('\n');
    var html = [], shift_length = 0;
	if(lines[0].match(/% /)){
		html[0] = '<h1 class="adoc_title">' + lines[0].slice(2) + '</h1>';
        shift_length ++;
	};

	if(lines[1] && lines[1].match(/% /)){
		html[1] = '<div class="adoc_author">作者：' + lines[1].slice(2) + '</div>';
        shift_length ++;
	}

	if(lines[2] && lines[2].match(/% /)){
		html[2] = '<div class="adoc_date">时间：' + lines[2].slice(2) + '</div>';
        shift_length ++;
	}

	if(lines[3] && lines[3].match(/% /)){
        var tags = lines[3].slice(2).split(/,|\s+/);
        var x = [];
        $.each(tags, function(i, t){
            x.push('<a target="_blank" href="http://fe.baidu.com/doc/_ADoc/search.py/tag_list?dir=aladdin#' + t + '">' + 
                t + '</a>');
        });
		html[3] = '<div class="adoc_tag">tags：' + x.join(', '); + '</div>';
        shift_length ++;
	}

    for(var i=0; i<shift_length; i++){
        lines.shift();
    }

    html = ['<div class="adoc">'].concat(html);

    html.push(window.markdown.toHTML(lines.join('\n')), '</div>');

    return html.join('\n');
}

