/*
 * Author: Zoltan Tran
 */

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
        let newlineChar = getNewlineChar(string)
        // Split the data into rows
        let rows = string.split(newlineChar)
        // Check row by row
        for (let i = 0;  i < rows.length; ++i) {
            // Add the row to the collection
            this.addRow(rows[i].split(this._delimiter))
        }
    }
    /*
     * Adds a single row to the collection.
     * @param cells An array of values
     */
    addRow(cells) {
        // Find the index of the new row in our collection, then initialize
        let dataRowIndex = this._data.length
        this._data[dataRowIndex] = []
        // Save the trimmed values
        for (let j = 0; j < cells.length; ++j) {
            this._data[dataRowIndex][j] = cells[j].trim()
        }
    }
    /*
     * Clears the array.
     */
    clearData () {
        this._data = []
    }
    /*
     * Returns the array from a specific index.
     * @param index The row number
     */
    getWithIndex (index) {
        if (this._data[index]) return this._data[index]
        else return false
    }
    /*
     * Returns the array of the latest row.
     */
    get getLatest () {
        let N = this._data.length-1
        if (N > 0) return this._data[N]
        else return false
    }
    /*
     * Returns the entire collection.
     */
    get getAll () {
        return this._data
    }
}

function getNewlineChar (string) {
    // Find out the line endings of the given string
    let lfFound = string.indexOf('\n') > 0
    let crFound = string.indexOf('\r') > 0
    if (lfFound && crFound) {
        throw new Error('Inconsistent line endings with both CR and LF.')
    } else if (crFound) {
        return '\r'
    } else return '\n'
}