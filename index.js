const defaultOptions = {
    padding: 1,
    minimumColumnWidth: 5
}

async function prettyPrintAsync(markDownTable, options) {
    return new Promise((resolve) => {
        resolve(prettyPrint(markDownTable, options))
    })
}

function prettyPrint (markDownTable, options) {
    let padding
    let minimumColumnWidth
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
        minimumColumnWidth = options?.minimumWidth || defaultOptions.minimumColumnWidth
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
                if(item.length > (columnMaxLength[i] ?? 0)) {
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
            const widthOfColumn = Math.max(columnMaxLength[i] + padding, minimumColumnWidth)
            formattedLine += item.padEnd(widthOfColumn, " ") + "|";
        }
        return formattedLine
    }

    function generateSeparatorLine(){
        let getPrefixPostfix = (char) => char === ':' ? ':' : ' '

        let line = "|"
        for (let i = 0; i < maxItemsInRow; i++) {
            let divider = dividerRow[i] ?? ''
            let formattedDivider = ''
            formattedDivider += getPrefixPostfix(divider[0] ?? '')
            let widthOfColumn = Math.max(columnMaxLength[i] + padding, minimumColumnWidth) -1
            formattedDivider = formattedDivider.padEnd(widthOfColumn, '-')
            formattedDivider += getPrefixPostfix(divider[divider.length - 1] ?? '')
            line += formattedDivider + "|";
        }
        return line
    }
}

module.exports = { prettyPrint, prettyPrintAsync }