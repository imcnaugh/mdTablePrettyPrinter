# Markdown Table Pretty Printer
A lightweight tool to pretty print markdown tables.

I get it, this will be parsed and displayed properly by any markdown parser, but it's just so ugly.
```markdown
Col1 | Col2 | Col3
--- | :-: | --: |
1 |2 | 3
super unreadable| data point| who needs formatting anyways?
```

Why not format that so it reads a bit easier?
```markdown
|Col1             |Col2       |Col3                          |
| --------------- |:---------:| ----------------------------:|
|1                |2          |3                             |
|super unreadable |data point |who needs formatting anyways? |
```

Oh my goodness, a million times better.