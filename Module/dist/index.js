/*
 * Author: Zoltan Tran
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function csvReader() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { delimiter: ',' };

        _classCallCheck(this, csvReader);

        this._delimiter = args.delimiter;
        this._data = [];
    }
    /*
     * Adds one or more rows to the collection.
     * @param string UTF-8 string
     */


    _createClass(csvReader, [{
        key: 'addData',
        value: function addData(string) {
            var newlineChar = getNewlineChar(string);
            // Split the data into rows
            var rows = string.split(newlineChar);
            // Check row by row
            for (var i = 0; i < rows.length; ++i) {
                // Add the row to the collection
                this.addRow(rows[i].split(this._delimiter));
            }
        }
        /*
         * Adds a single row to the collection.
         * @param cells An array of values
         */

    }, {
        key: 'addRow',
        value: function addRow(cells) {
            // Find the index of the new row in our collection, then initialize
            var dataRowIndex = this._data.length;
            this._data[dataRowIndex] = [];
            // Save the trimmed values
            for (var j = 0; j < cells.length; ++j) {
                this._data[dataRowIndex][j] = cells[j].trim();
            }
        }
        /*
         * Clears the array.
         */

    }, {
        key: 'clearData',
        value: function clearData() {
            this._data = [];
        }
        /*
         * Returns the array from a specific index.
         * @param index The row number
         */

    }, {
        key: 'getWithIndex',
        value: function getWithIndex(index) {
            if (this._data[index]) return this._data[index];else return false;
        }
        /*
         * Returns the array of the latest row.
         */

    }, {
        key: 'getLatest',
        get: function get() {
            var N = this._data.length - 1;
            if (N > 0) return this._data[N];else return false;
        }
        /*
         * Returns the entire collection.
         */

    }, {
        key: 'getAll',
        get: function get() {
            return this._data;
        }
    }]);

    return csvReader;
}();
/*
 * Get a newline character from a given string
 */
function getNewlineChar(string) {
    var lfFound = string.indexOf('\n') > 0;
    var crFound = string.indexOf('\r') > 0;
    if (crFound) return '\r';else return '\n';
}