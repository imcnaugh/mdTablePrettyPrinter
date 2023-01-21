const defaultOptions = {
    padding: 1
}

module.exports = function (markDownTable, options) {
    let padding = 1
    const separatorLineRegex = /^[\- :]*$/;

    let originalText = markDownTable
    let itemArray
    let dividerRow = []
    let maxItemsInRow
    let columnMaxLength = []
    let formattedLines = []

    setOptions(options);
    setItemArray();
    if (isLineADividerRow(1)) {
        dividerRow = itemArray.splice(1, 1)[0]
    }
    setMaxItemsInRow()
    setColumnMaxLength();
    setFormattedLines();
    if (formattedLines.length > 1) {
        formattedLines.splice(1, 0, generateSeparatorLine());
    }
    return formattedLines.join("\n");

    function setOptions(options) {
        padding = options?.padding || defaultOptions.padding
    }

    function setItemArray() {
        itemArray = originalText.split("\n")
            .map(line => line.trim())
            .filter(line => line.length > 0)  // remove empty lines
            .map(line => line.replace(/^\|/, "") // remove leading pipe
                .replace(/\|$/, "") // remove trailing pipe
                .split("|") // split into columns
                .map(item => item.trim()) // trim each column
            );
    }

    function isLineADividerRow(lineNumber) {
        return itemArray[lineNumber]?.every(element => separatorLineRegex.test(element)) ?? false
    }

    function setMaxItemsInRow() {
        maxItemsInRow = Math.max(...itemArray.map(line => line.length));
    }

    function setColumnMaxLength(){
        itemArray.forEach(line => {
            line.forEach((item, i) => {
                if(item.length > (columnMaxLength[i] ?? 0)){
                    columnMaxLength[i] = item.length;
                }
            })
        })
    }

    function setFormattedLines() {
        formattedLines = itemArray.map(prettyPrintLine);
    }

    function prettyPrintLine(line) {
        let formattedLine = "|"
        for (let i = 0; i < maxItemsInRow; i++) {
            const item = line[i] ?? "";
            formattedLine += item.padEnd(columnMaxLength[i] + padding, " ") + "|";
        }
        return formattedLine
    }

    function generateSeparatorLine(){
        let line = "|"
        for (let i = 0; i < maxItemsInRow; i++) {
            let formattedDivider = ""
            let divider = dividerRow[i] ?? ""
            if ((divider[0] ?? '') === ':') {
                formattedDivider += ":"
            }
            formattedDivider = formattedDivider.padEnd(columnMaxLength[i], "-")
            formattedDivider += (divider[divider.length - 1] ?? '') === ':' ? ":" : "-"
            line += formattedDivider + "|";
        }
        return line
    }
};
