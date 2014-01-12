$(document).ready(function () {
    rmde.init();
});

var rmde =
{
    banana: "mmmmmmm yellow",

    init: function ()
    {
        $('#markdown').bind('input propertychange', this.parseAndUpdate)
        console.log("bound");
    },

    parseAndUpdate: function ()
    {
        console.log("parseAndUpdate called");
        
        var $this = $('#markdown');

        var $html = $("#html");
        var input = $this.val();

        // Clear the output field.
        $html.empty();

        var lines = input.split('\n');

        for (var i = 0; i < lines.length; i++)
        {
            var line = lines[i];

            var output = -1; // no match

            // Check for headings.
            output = checkForHeading(line);
            output = checkForOrderedList(line);

            if (output === -1)
            {
                output = line;
            }

            appendToHTML(output)
        }

        function checkForHeading(line)
        {
            var output = -1; // no match

            for (var tag in tags.headings)
            {
                if (Object.prototype.hasOwnProperty.call(tags.headings, tag))
                {
                    if (line.substring(0, tags.headings[tag].length) === tags.headings[tag])
                    {
                        output = '<' + tag + '>' + line.substring(tags.headings[tag].length) + '</' + tag + '>';
                    }
                }
            }

            return output;
        }

        function checkForOrderedList(line)
        {
            var output = -1;

            if (tags.lists.ordered.test(line))
            {
                output = '<li>' + line + '</li>';
            }

            return output;
        }

        function appendToHTML(data)
        {
            $field = $('#html');
            $existing = $field.html();

            $field.html($existing + data);
        }
    }
};
