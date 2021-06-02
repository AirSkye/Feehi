 

queue(function()
{
	var $sh;
	
	module('001_basic');

	test('basic html check of default elements', function()
	{
		$sh = $('#sh_001_basic');
		ok_sh($sh);
		ok_toolbar($sh);
		ok_caption($sh, 'Title/caption should render');
		ok_gutter($sh);
		ok_code($sh);
	});
});

  

queue(function()
{
	var $sh;
	
	module('002_brushes');

	test('check that all brushes loaded and rendered', function()
	{
		$sh = $('#sh_002_brushes');
		
		$sh.find('> div > .syntaxhighlighter').each(function()
		{
			var $sh = $(this).parent();
			ok_sh($sh);
			ok_sh($sh);
			ok_toolbar($sh);
			ok_code($sh);
		});
	});
});

  
<![CDATA[
	partial class Foo
	{
		function test()
		{
			yield return;
			yield break;
		}
	}

	function foo()
	{
		var vector:Vector.<Vector.<String>> = new Vector<Vector.String>>();
	
		for (var i = 0; i < 10; i++)
		{
			/* comments */
		}
	}
]]>
  

queue(function()
{
	var $sh;
	
	module('003_script_tag');

	test('basic html check of default elements', function()
	{
		$sh = $('#sh_003_script_tag');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_caption($sh, 'Title/caption should render');
		ok_gutter($sh);
		ok_code($sh);
	});
});

  

queue(function()
{
	var $sh;
	
	module('004_url_parsing');

	test('check that urls are present', function()
	{
		$sh = $('#sh_004_url_parsing');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_code($sh);
		
		var expected = [
			'http://www.alexgorbatchev.come/?test=1&y=2',
			'http://www.alexgorbatchev.come/?test=1&y=2;test/1/2/3;',
			'http://www.gnu.org/licenses/?test=1&y=2',
			'http://bitbucket.org/alexg/syntaxhighlighter/issue/28/',
			'http://www.example.com/song2.mp3'
		];
		
		$sh.find('td.code a').each(function(index)
		{
			equal($(this).attr('href'), expected[index], 'href');
			equal($(this).text(), expected[index], 'text');
		})
	});
});

  

queue(function()
{
	var $sh;
	
	module('005_no_gutter');

	test('check that there is no gutter', function()
	{
		$sh = $('#sh_005_no_gutter');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_code($sh);
		
		ok($sh.find('> .syntaxhighlighter.nogutter').length == 1, '.nogutter present');
		ok($sh.find('> .syntaxhighlighter > table > tbody > tr > .gutter').length == 0, 'Gutter not present');
	});
});

  

queue(function()
{
	var $sh;
	
	module('006_pad_line_numbers');

	test('check that line numbers are padded with zeroes', function()
	{
		$sh = $('#sh_006_pad_line_numbers');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_gutter($sh);
		ok_code($sh);
		
		$sh.find('.gutter > .line').each(function(index)
		{
			var text = $(this).text();
			
			if (parseInt(text) < 10)
				ok(text.charAt(0) == '0', 'Line ' + index + ' has leading zero: ' + text);
		});
	});
});

  

queue(function()
{
	var $sh;
	
	module('007_collapse');
	
	test('collapsed block with title', function()
	{
		$sh = $('#sh_007_collapse_a');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_collapsed($sh);
		
		var $title = $sh.find('.toolbar a.toolbar_item.command_expandSource');
		ok($title.length == 1, 'Expand present');
		equal($title.text(), 'This is a title for collapsed block', 'Expand text');
	});

	test('collapsed block without title', function()
	{
		$sh = $('#sh_007_collapse_b');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_collapsed($sh);
		
		var $title = $sh.find('.toolbar a.toolbar_item.command_expandSource');
		ok($title.length == 1, 'Expand present');
		equal($title.text(), SyntaxHighlighter.config.strings.expandSource, 'Expand text');
	});
});

  

queue(function()
{
	var $sh;
	
	module('007_collapse_interaction');
	
	function clickA($a)
	{
		SyntaxHighlighter.toolbar.handler({
			target: $a[0],
			preventDefault: function() {}
		});	
	};
	
	test('expand collapsed block with title', function()
	{
		$sh = $('#sh_007_collapse_a');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_collapsed($sh);
		
		var $a = $sh.find('.toolbar a.toolbar_item.command_expandSource');
		clickA($a);
		ok($a.not(':visible'), 'Expand not visible');
		ok_code($sh);
	});

	test('expand collapsed block without title', function()
	{
		$sh = $('#sh_007_collapse_b');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_collapsed($sh);
		
		var $a = $sh.find('.toolbar a.toolbar_item.command_expandSource');
		clickA($a);
		ok($a.not(':visible'), 'Expand not visible');
		ok_code($sh);
	});
});

  

queue(function()
{
	var $sh;
	
	module('008_first_line');

	test('check the first line', function()
	{
		$sh = $('#sh_008_first_line');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_gutter($sh);
		ok_code($sh);
		equals($sh.find('.gutter .index0').text(), '10', 'First line');
	});
});

  

queue(function()
{
	var $sh;
	
	module('009_class_name');

	test('check custom classes', function()
	{
		$sh = $('#sh_009_class_name');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_gutter($sh);
		ok_code($sh);
		ok($sh.find('.syntaxhighlighter').is('.custom.class.here'), 'Check custom classes');
	});
});

  
<![CDATA[
	/**
	 * Checks a password and returns a value indicating whether the password is a "strong" 
	 * password. The criteria for a strong password are:
	 * 
	 * <ul>
	 *   <li>Minimum 8 characters</li>
	 *   <li>Maxmium 32 characters</li>
	 *   <li>Contains at least one lowercase letter</li>
	 *   <li>Contains at least one uppercase letter</li>
	 *   <li>Contains at least one number or symbol character</li>
	 * </ul>
	 * 
	 * @param password The password to check
	 * 
	 * @return A value indicating whether the password is a strong password (<code>true</code>) 
	 * or not (<code>false</code>).
	 */
	public function validateStrongPassword(password:String):Boolean
	{
		if (password == null || password.length <= 0)
		{
			return false;
		}
		
		return STRONG_PASSWORD_PATTERN.test(password);
	}
]]>
  

queue(function()
{
	var $sh;
	
	module('010_highlight');
	
	test('one highlighted line', function() 
	{
		$sh = $('#sh_010_highlight_a');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_code($sh);
		ok($sh.find('.gutter .number2').is('.highlighted'), 'Line 2 is highlighted');
	});

	test('multiple highlighted lines', function() 
	{
		$sh = $('#sh_010_highlight_b');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_code($sh);
		ok($sh.find('.gutter .number2').is('.highlighted'), 'Line 2 is highlighted');
		ok($sh.find('.gutter .number4').is('.highlighted'), 'Line 4 is highlighted');
		ok($sh.find('.gutter .number12').is('.highlighted'), 'Line 12 is highlighted');
	});
});

  

queue(function()
{
	var $sh;
	
	module('011_smart_tabs');
	
	var evenLines = [
			'the     words   in      this    paragraph',
			'should  look    like    they    are',
			'evenly  spaced  between columns'
		],
		unevenLines = [
			'the        words    in        this    paragraph',
			'should    look    out        of        whack',
			'because    smart    tabs    are        disabled'
		]
		;
		
	function fixSpaces(s)
	{
		s = encodeURIComponent(s).replace(/%C2%A0/g, '%20');
		return unescape(s).replace(/\s+$/g, '');
	};
	
	test('default tab size is 4', function()
	{
		$sh = $('#sh_011_smart_tabs_a');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_code($sh);
		
		$sh.find('.code .line').each(function(index)
		{
			var s1 = fixSpaces($(this).text()),
				s2 = fixSpaces(evenLines[index])
				;
				
			equal(s1, s2, 'Line ' + index);
		});
	});

	test('tab size changed to 8', function() 
	{
		$sh = $('#sh_011_smart_tabs_b');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_code($sh);
		
		$sh.find('.code .line').each(function(index)
		{
			var s1 = fixSpaces($(this).text()),
				s2 = fixSpaces(evenLines[index])
				;
				
			equal(s1, s2, 'Line ' + index);
		});
	});
	
	test('smart tabs are off', function() 
	{
		$sh = $('#sh_011_smart_tabs_c');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_code($sh);
		
		$sh.find('.code .line').each(function(index)
		{
			var s1 = fixSpaces($(this).text()),
				s2 = fixSpaces(unevenLines[index])
				;
				
			equal(s1, s2, 'Line ' + index);
		});
	});
});

  

function helloWorld()
{
	// this is great!
	for(var i = 0; i <= 1; i++)
		alert("yay");
}

  

queue(function()
{
	var $sh;
	
	module('012_server_side');

	test('generate markup', function()
	{
		var brush = new SyntaxHighlighter.brushes.JScript(),
			code = $('#sh_012_server_side_input').html()
			;
	
		brush.init({ toolbar: false });
		$sh = $('#sh_012_server_side_output');
		$sh.html(brush.getHtml(code));
		
		ok_sh($sh);
		ok_gutter($sh);
		ok_code($sh);
	});
});

  

queue(function()
{
	var $sh;
	
	module('013_html_script');

	test('check markup', function()
	{
		$sh = $('#sh_013_html_script');
		
		ok_sh($sh);
		ok_gutter($sh);
		ok_code($sh);
		
		ok($sh.find('.code .number1 > .htmlscript').length > 0, 'Has .htmlscript on line 1');
		ok($sh.find('.code .number3 > .groovy').length > 0, 'Has .groovy on line 3');
		ok($sh.find('.code .number10 > .groovy').length > 0, 'Has .groovy on line 10');
	});
});

  

queue(function()
{
	var $sh;
	
	dp.SyntaxHighlighter.HighlightAll('code');
	
	module('014_legacy');
	
	test('basic check', function() 
	{
		$sh = $('#sh_014_legacy_a');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_code($sh);
	});

	test('no toolbar', function() 
	{
		$sh = $('#sh_014_legacy_b');
		
		ok_sh($sh);
		ok_code($sh);
		ok($sh.find('> .syntaxhighlighter > .toolbar').length == 0, 'Toolbar not present');
	});
	
	test('no gutter', function() 
	{
		$sh = $('#sh_014_legacy_c');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_code($sh);
		
		ok($sh.find('> .syntaxhighlighter.nogutter').length == 1, '.nogutter present');
		ok($sh.find('> .syntaxhighlighter > table > tbody > tr > .gutter').length == 0, 'Gutter not present');
	});
	
	test('collapsed check', function()
	{
		$sh = $('#sh_014_legacy_d');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_collapsed($sh);
		
		var $title = $sh.find('.toolbar a.toolbar_item.command_expandSource');
		ok($title.length == 1, 'Expand present');
		equal($title.text(), SyntaxHighlighter.config.strings.expandSource, 'Expand text');
	});
	
	test('first line check', function()
	{
		$sh = $('#sh_014_legacy_e');
		
		ok_sh($sh);
		ok_toolbar($sh);
		ok_gutter($sh);
		ok_code($sh);
		equals($sh.find('.gutter .index0').text(), '10', 'First line');
	});
});

 