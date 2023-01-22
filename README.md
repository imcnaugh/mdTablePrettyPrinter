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