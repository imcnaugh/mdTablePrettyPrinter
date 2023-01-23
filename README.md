# Markdown Table Pretty Printer
A 0 dependency tool to pretty print Markdown tables.

I get it, this will be parsed and displayed properly by any Markdown parser, but it's just so ugly.
```markdown
Col1 | Col2 | Col3
--- | :-: | --: |
1 |2 | 3
super unreadable| data point| who needs formatting anyway?
```

Why not format that, so it reads a bit easier?
```markdown
|Col1             |Col2       |Col3                         |
| --------------- |:---------:| ---------------------------:|
|1                |2          |3                            |
|super unreadable |data point |who needs formatting anyway? |
```

Oh my goodness, a million times better.

## Usage

Bwo methods are available, `prettyPrint` and `prettyPrintAsync` they do the same thing but the response is a promise in the async version.

The methods take 2 arguments, the first is the Markdown table as a string, the second is an options object that is optional.

The options object can have the following properties:
 - `padding`: The number of spaces to pad the columns with, defaults to 1
 - `minimumColumnWidth`: The minimum width of a column, defaults to 5

## Examples

```javascript
const { prettyPrint } = require('markdown-table-pretty-printer');
const table = 'Col1 | Col2 | Col3\n' +
              '1 |2 | 3';

const prettyTable = prettyPrint(table);
console.log(prettyTable);
```

```javascript
const { prettyPrintAsync } = require('markdown-table-pretty-printer');
const table = 'Col1 | Col2 | Col3\n' +
              '--- | --- | --- |\n' +
              '1 |2 | 3';

const options = {
    padding = 2
}

prettyPrintAsync(table).then(prettyTable => {
    console.log(prettyTable, options);
});
```
