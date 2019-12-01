'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the formingMagicSquare function below.
function formingMagicSquare(s) {        
    const sumRow = (i, m) => m[i][0] + m[i][1] + m[i][2]

    const sumCol = (i, m) => m[0][i] + m[1][i] + m[2][i]

    const sumDR = (m) => m[0][0] + m[1][1] + m[2][2]

    const sumDL = (m) => m[0][2] + m[1][1] + m[2][0]

    const isMagic = m => {
        return sumRow(0, m) == 15 &&
            sumRow(1, m) == 15 &&
            sumRow(2, m) == 15 &&
            sumCol(0, m) == 15 &&
            sumCol(1, m) == 15 &&
            sumCol(2, m) == 15 &&
            sumDR(m) == 15 &&
            sumDL(m) == 15;
    }

    const uniques = (ar1, ar2, ar3) => {
        let all = [...ar1, ...ar2, ...ar3];
        let valid = true;

        all.forEach(e => {
            if (all.filter(x => x == e).length > 1)
                valid = false;
        })

        return valid;
    }

    const fullCombine = () => {
        let combinations = [];
        let magics = [];
        for(let i = 1; i < 10; i++) {
            for(let j = 1; j < 10; j++) {
                for(let k = 1; k < 10; k++) {
                    if (k !== j && j !== i && i !== k && (i + k + j) == 15)
                        combinations.push([i, j, k])
                }
            }   
        }
        
        for(let i = 0; i < combinations.length; i++) {
            for(let j = 0; j < combinations.length; j++) {
                for(let k = 0; k < combinations.length; k++) {
                    if (
                        k !== j && 
                        j !== i && 
                        i !== k && 
                        uniques(combinations[i], combinations[j], combinations[k]) &&
                        isMagic([combinations[i], combinations[j], combinations[k]])
                    ){
                        magics.push([combinations[i], combinations[j], combinations[k]])
                    }
                }
            }   
        }

        return magics;
        
        
        
    }

    let magics = fullCombine();

    let min = 1000000;
    magics.forEach(m => {
        let total = 0;
        for(let y = 0; y < 3; y++) {
            for(let x = 0; x < 3; x++) {
                total += Math.abs(m[y][x] - s[y][x])
            }   
        }

        if (total < min)
            min = total
    })

    return min;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let s = Array(3);

    for (let i = 0; i < 3; i++) {
        s[i] = readLine().split(' ').map(sTemp => parseInt(sTemp, 10));
    }

    const result = formingMagicSquare(s);

    ws.write(result + '\n');

    ws.end();
}


/**
 * LOCAL SOLUTION
 */

// const fs = require('fs')
// const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// let inp = [];


// let res = fs.readFileSync('tests.txt', 'utf-8');
// inp = res.split("\r\n");
// let matrix = inp.map(x => x.split(' ').map(y => parseInt(y)));

// const sumRow = (i, m) => m[i][0] + m[i][1] + m[i][2]

// const sumCol = (i, m) => m[0][i] + m[1][i] + m[2][i]

// const sumDR = (m) => m[0][0] + m[1][1] + m[2][2]

// const sumDL = (m) => m[0][2] + m[1][1] + m[2][0]

// const isMagic = m => {
//     return sumRow(0, m) == 15 &&
//            sumRow(1, m) == 15 &&
//            sumRow(2, m) == 15 &&
//            sumCol(0, m) == 15 &&
//            sumCol(1, m) == 15 &&
//            sumCol(2, m) == 15 &&
//            sumDR(m) == 15 &&
//            sumDL(m) == 15;
// }

// const uniques = (ar1, ar2, ar3) => {
//     let all = [...ar1, ...ar2, ...ar3];
//     let valid = true;

//     all.forEach(e => {
//         if (all.filter(x => x == e).length > 1)
//             valid = false;
//     })

//     return valid;
// }

// const fullCombine = () => {
//     let combinations = [];
//     let magics = [];
//     for(let i = 1; i < 10; i++) {
//         for(let j = 1; j < 10; j++) {
//             for(let k = 1; k < 10; k++) {
//                 if (k !== j && j !== i && i !== k && (i + k + j) == 15)
//                     combinations.push([i, j, k])
//             }
//         }   
//     }
    
//     for(let i = 0; i < combinations.length; i++) {
//         for(let j = 0; j < combinations.length; j++) {
//             for(let k = 0; k < combinations.length; k++) {
//                 if (
//                     k !== j && 
//                     j !== i && 
//                     i !== k && 
//                     uniques(combinations[i], combinations[j], combinations[k]) &&
//                     isMagic([combinations[i], combinations[j], combinations[k]])
//                 ){
//                     magics.push([combinations[i], combinations[j], combinations[k]])
//                 }
//             }
//         }   
//     }

//     return magics;
    
    
    
// }

// let magics = fullCombine();

// let min = 1000000;
// magics.forEach(m => {
//     let total = 0;
//     for(let y = 0; y < 3; y++) {
//         for(let x = 0; x < 3; x++) {
//             total += Math.abs(m[y][x] - matrix[y][x])
//         }   
//     }

//     if (total < min)
//         min = total
// })

// console.log(matrix);
// console.log(min);
