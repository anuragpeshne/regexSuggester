# regexSuggester
Provide suggestion based on Regular Expression

Sample input:
>    parser('/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/');

>    // output:

>    [ { regex: '^[0-9]{4}$', suggestion: '-' }, { regex: '^[0-9]{4}-[0-9]{1,2}$', suggestion: '-' } ]

Made to solve SO question: http://stackoverflow.com/q/30698837/1291435
