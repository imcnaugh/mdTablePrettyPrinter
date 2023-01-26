const {prettyPrint, prettyPrintAsync} = require('./index.js')

test('md links', () => {
  expect(prettyPrint('some text')).toBe('|some text |')
})

test('with options', () => {
  expect(prettyPrint('some text', { padding: 2 })).toBe('|some text  |')
})

test('with options and a divider row', () => {
    let input = 'some Text\nvalues'
    let expected = '|some Text  |\n| --------- |\n|values     |'
    expect(prettyPrint(input, { padding: 2 })).toBe(expected)
})

test('negative options', () => {
  expect(prettyPrint('some text', { })).toBe('|some text |')
})

test('reallyLongText', () => {
    expect(prettyPrint('reallyLongTextWithALotOfText')).toBe('|reallyLongTextWithALotOfText |')
})

test('more of a real test', () => {
    const input = `Column 1 | Column 2 | Column 3
1|2|3
4|5
7|8|9`

    const expected = `|Column 1 |Column 2 |Column 3 |\n| ------- | ------- | ------- |\n|1        |2        |3        |\n|4        |5        |         |\n|7        |8        |9        |`

    expect(prettyPrint(input)).toBe(expected)
})

test('sanitizes input', () => {
    const input = '  |single header|  '
    const expected = '|single header |'
    expect(prettyPrint(input)).toBe(expected)
})

test('divider line is processed properly', () => {
    const input = `Column 1 | Column 2 | Column 3\n|:---:----|:--:|---::---:|\n1|2|3\n4|5\n7|8|9`
    const expected = `|Column 1 |Column 2 |Column 3 |\n|:------- |:-------:| -------:|\n|1        |2        |3        |\n|4        |5        |         |\n|7        |8        |9        |`
    expect(prettyPrint(input)).toBe(expected)
})

test('minimum column width is respected', () => {
  expect(prettyPrint('a')).toBe('|a    |')
})

test('minimum column width options are respected', () => {
  expect(prettyPrint('a', { minimumWidth: 10 })).toBe('|a         |')

})

test('async test', async () => {
  expect(await prettyPrintAsync('some text')).toBe('|some text |')
})