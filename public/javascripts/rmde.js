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

        var finalHTML = [];
        
        for (var i = 0; i < lines.length; i++)
        {
            var line = lines[i];

            var output = -1; // no match

            // Check for headings.
            for (var tag in tags.headings)
            {
                if (Object.prototype.hasOwnProperty.call(tags.headings, tag))
                {
                    // TODO http://img.ctrlv.in/img/52d06e49df541.jpg
                    if (line.substring(0, tags.headings[tag].length) === tags.headings[tag])
                    {
                        if (output === -1)
                        {
                            output = "";
                        }
                        
                        output += '<' + tag + '>' + line.substring(tags.headings[tag].length) + '</' + tag + '>';
                    }
                }
            }
            
            // Ordered list
            if (tags.lists.ordered.test(line))
            {
                var htmlAsArrayString = completeHTML.toString();
                
                // The current list has already been started, but not closed -- TODO: just add an element.
                if (htmlAsArrayString.lastIndexOf('<ol>') > htmlAsArrayString.lastIndexOf('</ol'))
                {
                    
                }
            }
                
            // didn't match anything, so it's a regular paragraph
            if (output === -1)
            {
                // TODO: Lines below one another are printed as separate paragraphs.     
                output = '<p>' + line + '</p>';
            }
            
            finalHTML.push(output);
            console.log(finalHTML);
        }
        
        var htmlToDisplay = "";
        for (var i = 0; i < finalHTML.length; i++)
        {
            var line = finalHTML[i];
            htmlToDisplay += line;
        }
        
        updateHTML(htmlToDisplay);

        function updateHTML(data)
        {
            $field = $('#html');
            $existing = $field.html();

            $field.html($existing + data);
        }
    }
};
