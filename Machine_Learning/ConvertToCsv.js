///////////
const csvjson = require('csvjson');
const fs = require('fs');

module.exports.write = function (msg) {
    // console.log(finalTxs.toString());
    var to = JSON.parse(msg);
    console.log(to.id);

    const csvData = csvjson.toCSV(to, headers = false);

    try {
        if (fs.existsSync('./test-data.csv')) {
          
            fs.appendFile('./test-data.csv', csvData, (err) => {
                if (err) {
                    console.log(err); // Do something to handle the error or just throw it
                }
                console.log('Success next row!');
            });
        }
        else {
            fs.writeFile('./test-data.csv', csvData, (err) => {
                if (err) {
                    console.log(err); // Do something to handle the error or just throw it
                }
                console.log('Success first row !');
            });
        }
    }

    catch (err) {
    }



};




