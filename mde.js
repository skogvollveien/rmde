/* Syntax */
var containerTags =
{
	'#': 'h1',
	'##': 'h2',
	'###': 'h3',
	'####': 'h4',
	'#####': 'h5',
	'######': 'h6',
};

$(document).ready(function()
{

	
	$('#markdown').bind('input propertychange', function()
	{
		$this = $(this);

		$html = $("#html");
		var input = $this.val();

		// Clear the output field.
		$html.empty();

		var lines = input.split('\n');

		for (var i = 0; i < lines.length; i++)
		{
			var line = lines[i];

			var output = -1; // nope

			for (var key in a)
			{
				if (line.substring(0, key.length) === key)
				{
					var tag = a[key];
					output = '<' + tag + '>' + line + '</' + tag + '>' 
				}
			}

			if (output === -1)
			{
				output = line;
			}

			appendToHTML(output);
		};

		function appendToHTML(data)
		{
			$field = $('#html');
			$existing = $field.html();

			$field.html($existing + data);
		}
	});
});
