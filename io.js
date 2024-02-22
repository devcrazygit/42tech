import fs from 'fs';
import csvParser from 'csv-parser';;

const DELIMITER = '|';

const getCsv = async (filePath) => {
    const result = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
        .pipe(csvParser({ separator: DELIMITER }))
        .on('data', (data) => {
            result.push(data);
        })
        .on('end', () => {
            resolve(result);
        })
        .on('error', error => {
            reject(error);
        })
    });
}

const printCsv = async (arr, filePath = null) => {
    if (!arr.length) {
        console.log('empty data');
        return;
    } 
    const outputPath = filePath || 'output.csv';
    const writer = fs.createWriteStream(outputPath, { flags: 'w+'})
    const headers = Object.keys(arr[0]);
    
    writer.write(headers.join(DELIMITER) + "\n");
    arr.forEach(item => {
        const row = headers.reduce((acc, curr) => ([...acc, item[curr]]), []);
        writer.write(row.join(DELIMITER) + "\n");
    })
    writer.end();
}

const exportMap = {
    getCsv,
    printCsv
}
export default exportMap;