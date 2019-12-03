'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the extraLongFactorials function below.

function extraLongFactorials(n, cur) {
    if (n == 1) {
        // console.log(n, cur);
        return cur;
    }
    let nCur = '';
    let over = 0;
    for(let i = cur.length - 1; i >= 0; i--) {
        let last = parseInt(cur[i]);
        let res = (n * last) + over;
        if (i == 0) nCur = res.toString() + nCur;
        else {
            nCur = (res % 10).toString() + nCur;
            over = Math.floor(res / 10);
        }
    }    
    return extraLongFactorials(n - 1, nCur);
}

function main() {
    const n = parseInt(readLine(), 10);

    console.log(extraLongFactorials(n, '1'));
}

// /**
//  * LOCAL SOLUTION
//  */

// const fs = require('fs')
// let inp = [];


// let res = fs.readFileSync('tests.txt', 'utf-8');
// inp = res.split("\r\n");

// let n = parseInt(inp[0]);

// function extraLongFactorials(n, cur) {
//     if (n == 1) {
//         // console.log(n, cur);
//         return cur;
//     }
//     let nCur = '';
//     let over = 0;
//     for(let i = cur.length - 1; i >= 0; i--) {
//         let last = parseInt(cur[i]);
//         let res = (n * last) + over;
//         if (i == 0) nCur = res.toString() + nCur;
//         else {
//             nCur = (res % 10).toString() + nCur;
//             over = Math.floor(res / 10);
//         }
//     }    
//     return extraLongFactorials(n - 1, nCur);
// }

// console.log(extraLongFactorials(n, '1'));
