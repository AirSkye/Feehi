 

var brushes = [
		'AS3',
		'AppleScript',
		'Bash',
		'CSharp',
		'ColdFusion',
		'Cpp',
		'Css',
		'Delphi',
		'Diff',
		'Erlang',
		'Groovy',
		'JScript',
		'Java',
		'JavaFX',
		'Perl',
		'Php',
		'Plain',
		'PowerShell',
		'Python',
		'Ruby',
		'Sass',
		'Scala',
		'Sql',
		'Vb',
		'Xml'
	];
	
$(document).ready(function()
{
	var html = '';
	
	$.each(brushes, function(index)
	{
		var name = this;
		
		html += ''
			+ '<div class="test-wrap">'
			+ '<h1>'
				+ '<a href="#theme' + (index + 1) + '">next</a> '
				+ '<a name="theme' + index + '">'
					+ name
				+ '</a>'
			+ '</h1>'
			;
		
		$.ajax({
			url: 'brushes/' + name.toLowerCase() + '.html',
			type: 'GET',
			dataType: 'text',
			async: false,
			success: function(data)
			{
				html += data;
			},
			error: function()
			{
				html += '<p>Not found...</p>';
			}
		});
		
		html += '</div>\n';
	
		if (index % 2 != 0)
			html += '<div style="clear:both"></div>\n';
	});
	
	$('#output')[0].innerHTML = html;
	$('#output a[name]:first').attr('name', 'top');
	$('#output a[href]:last').attr('href', '#top').html('top');
	
	SyntaxHighlighter.highlight();
});

  

var testQueue = [],
	renderTests = [
		'001_basic',
		'002_brushes',
		'003_script_tag',
		'004_url_parsing',
		'005_no_gutter',
		'006_pad_line_numbers',
		'007_collapse',
		'008_first_line',
		'009_class_name',
		'010_highlight',
		'011_smart_tabs',
		'012_server_side',
		'013_html_script',
		'014_legacy'
	],
	interactionTests = [
		'007_collapse_interaction'
	]
	;

function queue(func)
{
	testQueue.push(func);
};

function ok_sh($sh)
{
	ok($sh.length > 0, 'Element present');
	ok($sh.is('div'), 'Element is DIV');
	ok($sh.find('> div').is('.syntaxhighlighter'), 'Nested DIV is a .syntaxhighlighter');
};

function ok_toolbar($sh)
{
	var $target = $sh.find('> .syntaxhighlighter > .toolbar');
	ok($target.length > 0, 'Toolbar present');
	ok($target.is(':visible'), 'Toolbar visible');
};

function ok_caption($sh, value)
{
	var $target = $sh.find('> .syntaxhighlighter > table > caption');
	ok($target.length > 0, 'Caption present');
	ok($target.is(':visible'), 'Caption visible');
	
	if (value != null)
		equals($target.text(), value, 'Caption text');
};

function ok_gutter($sh)
{
	var $target = $sh.find('> .syntaxhighlighter > table > tbody > tr > .gutter');
	ok($target.length > 0, 'Gutter present');
	ok($target.is(':visible'), 'Gutter visible');
};

function ok_code($sh)
{
	var $target = $sh.find('> .syntaxhighlighter > table > tbody > tr > .code');
	ok($target.length > 0, 'Code present');
	ok($target.is(':visible'), 'Code visible');
};

function ok_collapsed($sh)
{
	ok($sh.find('> .syntaxhighlighter.collapsed').length == 1, '.collapsed present');
};

function loadTests(tests, addHtml)
{
	var html = '';
	
	$.each(tests, function(index)
	{
		var name = this;
		
		if (addHtml != false)
		{
			html += '<div class="test-wrap">\n'
			html += '<h3>' + name + '</h3>\n';
		}
		
		$.ajax({
			url: 'cases/' + name + '.html',
			type: 'GET',
			dataType: 'text',
			async: false,
			success: function(data)
			{
				html += data;
			},
			error: function()
			{
				html += '<p>Not found...</p>';
			}
		});
		
		if (addHtml != false)
		{
			html += '</div>\n';
		
			if (index % 2 != 0)
				html += '<div style="clear:both"></div>\n';
		}
	});

	//
	// Looks like .html() is producing different results when it comes to
	// content that has <script /> which type is NOT "text/javascript".
	// $('#output').html(html);
	//
	$('#output')[0].innerHTML += html;
		
	//
	// However, if HTML assigned to to .innerHTML container <script/> tags,
	// they are not executed, so we have to manually walk all of them and
	// eval() the content.
	//
	$('#output script[type="text/javascript"][class!="executed"]').each(function()
	{
		eval($(this).text() || $(this).html());
		$(this).addClass('executed')
	});
};

function runTestQueue()
{
	
	$.each(testQueue, function()
	{
		this.apply(null);
	});
	
	testQueue = [];
};

$(document).ready(function()
{
	loadTests(renderTests);
	SyntaxHighlighter.highlight();
	runTestQueue();
	
	$('#interaction').click(function()
	{
		loadTests(interactionTests, false /* addHtml */);
		runTestQueue();
	});
});

  

	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>SyntaxHighlighter Theme Tests</title>
	</head>
	
	<body>
		&lt;script>
		/**
		 * Looks for a child or parent node which has specified classname.
		 * Equivalent to jQuery's $(container).find(".className")
		 * @param {Element} target Target element.
		 * @param {String} search Class name or node name to look for.
		 * @param {Boolean} reverse If set to true, will go up the node tree instead of down.
		 * @return {Element} Returns found child or parent element on null.
		 */
		function findElement(target, search, reverse /* optional */)
		{
			if (target == null)
				return null;
		
			var nodes			= reverse != true ? target.childNodes : [ target.parentNode ],
				propertyToFind	= { '#' : 'id', '.' : 'className' }[search.substr(0, 1)] || 'nodeName',
				expectedValue,
				found
				;
				
			// main return of the found node
			if ((target[propertyToFind] || '').indexOf(expectedValue) != -1)
				return target;
		
			return found;
		};
		&lt;/script>
		
	</body>
	</html>

  

var themes = [
		['#fff', 'Default'],
		['#000', 'Django'],
		['#fff', 'Eclipse'],
		['#000', 'Emacs'],
		['#000', 'FadeToGrey'],
		['#000', 'MDUltra'],
		['#000', 'Midnight'],
		['#000', 'RDark']
	];
	
$(document).ready(function()
{
	var sample = $('#sample').text().replace(/</g, '&lt;');
	
	$.each(themes, function(index)
	{
		var $iframe = $('<iframe class="test-wrap" src="about:blank" />'),
			background = this[0],
			themeName = this[1]
			;
		
		$('#output')
			.append(''
				+ '<h1>'
					+ '<a href="#theme' + (index + 1) + '">next</a> '
					+ '<a name="theme' + index + '">'
						+ themeName
					+ '</a>'
				+ '</h1>'
			)
			.append($iframe)
			;
			
		$iframe.ready(function()
		{
			var doc = $iframe[0].contentDocument;
			$iframe.css('background', background);
			
			doc.write(''
				+ '<scr' + 'ipt type="text/javascript" src="/sh/scripts/XRegExp.js"></scr' + 'ipt>'
				+ '<scr' + 'ipt type="text/javascript" src="/sh/scripts/shCore.js"></scr' + 'ipt>'
				+ '<scr' + 'ipt type="text/javascript" src="/sh/scripts/shBrushXml.js"></scr' + 'ipt>'
				+ '<scr' + 'ipt type="text/javascript" src="/sh/scripts/shBrushJScript.js"></scr' + 'ipt>'
				+ '<link type="text/css" rel="stylesheet" href="/sh/styles/shCore' + themeName + '.css"/>'
				+ '<pre type="syntaxhighlighter" class="brush: js; html-script: true; highlight: [5, 20]" title="This is SyntaxHighlighter theme ' + themeName + ' in action!">'
					+ sample
				+ '</pre>'
				+ '<pre type="syntaxhighlighter" class="brush: js; html-script: true; collapse: true">'
					+ sample
				+ '</pre>'
				+ '<scr' + 'ipt type="text/javascript">'
					+ 'SyntaxHighlighter.highlight();'
				+ '</scr' + 'ipt>'
				);
			doc.close();
		});
	});
	
	$('#output a[name]:first').attr('name', 'top');
	$('#output a[href]:last').attr('href', '#top').html('top');
});

 