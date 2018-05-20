let fs = require('fs')
let csvReader = require('csv-parser')

function tester () {
    let csvReaderObj = new csvReader ()
    let string = fs.readFileSync ('sample.csv', 'utf8')
    csvReaderObj.addData(string)
    console.log(csvReaderObj.getAll)
    console.log(csvReaderObj.getLatest)
    console.log(csvReaderObj.getWithIndex(4))
    csvReaderObj.clearData()
    if (!csvReaderObj.getLatest) console.log('good.')
}

tester()