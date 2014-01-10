$(document).ready(function () {
    mde.init()
});

var mde =
{
    banana: "mmmmmmm yellow",

    init: function () {
        $('#markdown').bind('input propertychange', this.parseAndUpdate)
    },

    parseAndUpdate: function () {
        console.log("parseAndUpdate was called");

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

            if (output === -1)
            {
                output = line;
            }

            appendToHTML(output)
        }

        function appendToHTML(data) {
            $field = $('#html');
            $existing = $field.html();

            $field.html($existing + data);
        }
    }
};
