 

@mixin round_corners_custom($top, $right, $bottom, $left) {
	-moz-border-radius: $top $right $bottom $left !important;
	-webkit-border-radius: $top $right $bottom $left !important;
}

@mixin round_corners($radius) {
	@include round_corners_custom($radius, $radius, $radius, $radius);
}

.syntaxhighlighter {
	a,
	div,
	code,
	table,
	table td,
	table tr,
	table tbody,
	table thead,
	table caption,
	textarea {
		@include round_corners(0);
		
		background: none !important;
		border: 0 !important;
		bottom: auto !important;
		float: none !important;
		height: auto !important;
		left: auto !important;
		line-height: 1.1em !important;
		margin: 0 !important;
		outline: 0 !important;
		overflow: visible !important;
		padding: 0 !important;
		position: static !important;
		right: auto !important;
		text-align: left !important;
		top: auto !important;
		vertical-align: baseline !important;
		width: auto !important;
		font: {
			family: "Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace !important;
			weight: normal !important;
			style: normal !important;
			size: 1em !important;
		}
		min: {
			// For IE8, FF & WebKit
			height: inherit !important;
			// For IE7
			height: auto !important;
		}
	}
}

.syntaxhighlighter {
	width: 100% !important;
	margin: 1em 0 1em 0 !important;
	
	position: relative !important;
	overflow: auto !important;
	font-size: 1em !important;
	
	&.source { overflow: hidden !important; }
	
	// set up bold and italic
	.bold { font-weight: bold !important; }
	.italic { font-style: italic !important; }
	
	.line { white-space: pre !important; }
	
	// main table and columns
	table {
		width: 100% !important;
		caption {
			text-align: left !important;
			padding: .5em 0 0.5em 1em !important;
		}
		
		td.code {
			width: 100% !important;
			
			.container {
				position: relative !important;
				
				textarea {
					position: absolute !important;
					left: 0 !important;
					top: 0 !important;
					width: 100% !important;
					height: 120% !important;
					border: none !important;
					background: white !important;
					padding-left: 1em !important;
					overflow: hidden !important;
					white-space: pre !important;
				} 
			} 
		}
		
		// middle spacing between line numbers and lines
		td.gutter .line {
			text-align: right !important;
			padding: 0 0.5em 0 1em !important; 
		}
		
		td.code .line {
			padding: 0 1em !important;
		}
	}
	
	&.nogutter {
		td.code {
			.container textarea, .line { padding-left: 0em !important; }
		}
	}
	
	&.show { display: block !important; }
	
	// Adjust some properties when collapsed
	&.collapsed {
		table { display: none !important; }
		
		.toolbar {
			padding: 0.1em 0.8em 0em 0.8em !important;
			font-size: 1em !important;
			position: static !important;
			width: auto !important;
			height: auto !important;
			
			span {
				display: inline !important;
				margin-right: 1em !important;
				
				a {
					padding: 0 !important;
					display: none !important;
					&.expandSource, &.help { display: inline !important; } 
				}
			}
		}
	}
	
	// Styles for the toolbar
	.toolbar {
		position: absolute !important;
		right: 1px !important;
		top: 1px !important;
		width: 11px !important;
		height: 11px !important;
		font-size: 10px !important;
		z-index: 10 !important;
		
		span.title { display: inline !important; }
		
		a {
			display: block !important;
			text-align: center !important;
			text-decoration: none !important;
			padding-top: 1px !important;
			
			&.expandSource { display: none !important; }
		}
	}
	
	// Print view.
	// Colors are based on the default theme without background.
	&.printing {
		.line.alt1 .content,
		.line.alt2 .content,
		.line.highlighted .number,
		.line.highlighted.alt1 .content,
		.line.highlighted.alt2 .content { background: none !important; }
		
		// Gutter line numbers
		.line {
			.number { color: #bbbbbb !important; }
			// Add border to the lines
			.content { color: black !important; }
		}
		
		// Toolbar when visible
		.toolbar { display: none !important; }
		a { text-decoration: none !important; }
		.plain, .plain a { color: black !important; }
		.comments, .comments a { color: #008200 !important; }
		.string, .string a { color: blue !important; }
		.keyword {
			color: #006699 !important;
			font-weight: bold !important; 
		}
		.preprocessor { color: gray !important; }
		.variable { color: #aa7700 !important; }
		.value { color: #009900 !important; }
		.functions { color: #ff1493 !important; }
		.constants { color: #0066cc !important; }
		.script { font-weight: bold !important; }
		.color1, .color1 a { color: gray !important; }
		.color2, .color2 a { color: #ff1493 !important; }
		.color3, .color3 a { color: red !important; }
		.break, .break a { color: black !important; }
	}
}

 