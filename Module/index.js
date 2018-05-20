'use strict'

module.exports = class csvReader {
    constructor (args = {delimiter: ','}) {
        this._delimiter = args.delimiter
        this._data = []
    }
    /*
     * Adds one or more rows to the collection.
     * @param string UTF-8 string
     */
    addData (string) {
        // Find out the line endings of the given string
        let lfFound = string.indexOf('\n') > 0
        let crFound = string.indexOf('\r') > 0
        let newlineChar = '\n'
        if (lfFound && crFound) {
            throw new Error('Inconsistent line endings with both CR and LF.')
        } else if (crFound) {
            newlineChar = '\r'
        }
        let rows = string.split(newlineChar)
        for (let i = 0;  i < rows.length; ++i) {
            let cells = rows[i].split(this._delimiter)
            let dataRowIndex = this._data.length
            this._data[dataRowIndex] = []
            for (let j = 0; j < cells.length; ++j) {
                this._data[dataRowIndex][j] = cells[j].trim()
            }
        }
    }
    /*
     * Clears the array.
     */
    clearData () {
        this._data = []
    }
}