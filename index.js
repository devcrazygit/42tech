import io from './io.js';

let SORT_METRIC = 'net_sales';
const metricFn = row => row[SORT_METRIC];

const compare = (row1, row2) => {
    let propertyTotalExist = false;
    let result = 0;
    // check property 
    let i = 0;
    let itKey = 'property' + i;
    while (row1[itKey]) {
        if (row1[itKey] === row2[itKey]) {
            i++; itKey = 'property' + i;
            continue;
        }

        if (row1[itKey] === '$total') {
            result = -1;
            propertyTotalExist = true;
        } else if (row2[itKey] === '$total') {
            result = 1;
            propertyTotalExist = true;
        } else {
            result = row1[itKey] > row2[itKey] ? -1 : 1;
            i++; itKey = 'property' + i;
        }
        break;
    }

    if (!propertyTotalExist && !row1[itKey]) {
        const diff = metricFn(row1) - metricFn(row2);
        result = diff > 0 ? -1 : (diff < 0 ? 1 : 0);
    }
    
    return result;
}
const merge = (arr, left, middle, right) => {
    let n1 = middle - left + 1;
    let n2 = right - middle;

    let i = 0, j = 0;
    const lArray = new Array(n1);
    const rArray = new Array(n2);
    for (i = 0; i < n1; i++) {
        lArray[i] = arr[left + i];
    }
    for (j = 0; j < n2; j++) {
        rArray[j] = arr[middle + 1 + j];
    }

    let k = left;
    i = 0; j = 0;

    while (i < n1 && j < n2) {
        if (compare(lArray[i], rArray[j]) <= 0) {
            arr[k] = lArray[i];
            i++;
        } else {
            arr[k] = rArray[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = lArray[i];
        i++; k++;
    }

    while (j < n2) {
        arr[k] = rArray[j];
        j++; k++;
    }
}

const _sort = (arr, left, right) => {
    if (left >= right) return;

    const middle = left + parseInt((right - left) / 2);
    _sort(arr, left, middle);
    _sort(arr, middle + 1, right);
    merge(arr, left, middle, right);
}


const hierachicalSort = (rows) => {
    const len = rows.length;
    _sort(rows, 0, len - 1);
    io.printCsv(rows);
}

const main = () => {
    const args = process.argv.slice(2);
    const [inputFile, sortMetric] = args;
    SORT_METRIC = sortMetric;
    io.getCsv(inputFile)
    .then(rows => {
        hierachicalSort(rows);
    })
    .catch(e => {
        console.error(e);
    })
}

main();
