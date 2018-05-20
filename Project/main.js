let fs = require('fs')
let csvReader = require('csv-parser')

function tester () {
    let csvReaderObj = new csvReader ()
    let string = fs.readFileSync ('sample.csv', 'utf8')
    csvReaderObj.addData(string)
    console.log(csvReaderObj.latest)
    csvReaderObj.clearData()
    console.log(csvReaderObj.latest)
}

tester()