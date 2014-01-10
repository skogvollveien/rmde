var line = '';
for (var i = 0; i < 6; i++)
{
	line += "'";
	for (var j = 0; j <= i; j++)
	{
		line += '#';
	}
	line += "': 'h";
	line += (i + 1);
	line += "',";
	line += "\n";
}

console.log(line);