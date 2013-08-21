;(function($){

	function sshBrush(type, code, opt){
		var type_map = {
			'javascript' : 'JScript',
			'js' : 'JScript',
			'css' : 'CSS',
			'xml' : 'Xml',
			'html' : 'Xml',
			'xhtml' : 'Xml'
		};

		type = type_map[type || 'html'];
		var brush = new SyntaxHighlighter.brushes[type]();
		brush.init(opt);
		return brush.getHtml(code);
	}

	$.ssh = sshBrush;

	$.fn.ssh = function(type, opt){
		return this.each(function(i, el){
		
			el = $(el);

			el.html($.ssh(type, el.html(), opt));
		
		});
	}

})(jQuery);
