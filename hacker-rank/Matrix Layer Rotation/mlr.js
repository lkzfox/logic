'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the matrixRotation function below.
function matrixRotation(matrix, r, h, w) {
    let positions = [];

    function snake(x, y, h, w, mat) {
        let snake = []
        for( let i = 0; i < w; i++) {
            snake.push(mat[y][x + i]);
            positions.push({y, x: x + i})
        }
        for( let i = 1; i < h - 1; i++) {
            snake.push(mat[y + i][w + x - 1]);
            positions.push({y: y + i, x: w + x - 1})
        }
        for( let i = 1 ; i <= w && h > 1; i++) {
            snake.push(mat[y + h - 1][x + w - i]);
            positions.push({y: y + h - 1, x: x + w - i})
        }
        for( let i = 2; i < h && w > 1; i++) {        
            snake.push(mat[y + h - i][x]);
            positions.push({y: y + h - i, x})
        }
        // console.log(snake);
        
        return snake;
        
    }

    let nMatrix = new Array(h).fill('').map(x => {
        let z = new Array(w).fill('');
        return [...z];
    })

    let rotated = [];
    let pos = 0;

    while (h > 1 && w > 1) {
        let sn1 = snake(pos, pos, h, w, matrix);
        let desl = r % sn1.length;
        let rem = sn1.splice(0, desl)
        sn1.push(...rem);
        rotated.push(...sn1);

        pos += 1;
        h -= 2;
        w -= 2;
    }

    for(let i = 0; i < rotated.length; i++) {    
        let {x, y} = positions[i];
        nMatrix[y][x] = rotated[i];
    }

    nMatrix.forEach(e => {
        let prt = e.join(' ');
        console.log(prt)
    })
}

function main() {
    const mnr = readLine().replace(/\s+$/g, '').split(' ');

    const m = parseInt(mnr[0], 10);

    const n = parseInt(mnr[1], 10);

    const r = parseInt(mnr[2], 10);

    let matrix = Array(m);

    for (let i = 0; i < m; i++) {
        matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    matrixRotation(matrix, r, m, n);
}


/**
 * LOCAL SOLUTION
 */

// const fs = require('fs')

// let inp = [];


// let res = fs.readFileSync('tests.txt', 'utf-8');
// inp = res.split("\r\n");

// let [h, w, r] = inp[0].split(' ').map(x => parseInt(x));
// let matrix = [];
// let positions = [];
// inp.slice(1, inp.length).forEach(x => {
//     matrix.push(x.split(' '))
// })

// function snake(x, y, h, w, mat) {
//     let snake = []
//     for( let i = 0; i < w; i++) {
//         snake.push(mat[y][x + i]);
//         positions.push({y, x: x + i})
//     }
//     for( let i = 1; i < h - 1; i++) {
//         snake.push(mat[y + i][w + x - 1]);
//         positions.push({y: y + i, x: w + x - 1})
//     }
//     for( let i = 1 ; i <= w && h > 1; i++) {
//         snake.push(mat[y + h - 1][x + w - i]);
//         positions.push({y: y + h - 1, x: x + w - i})
//     }
//     for( let i = 2; i < h && w > 1; i++) {        
//         snake.push(mat[y + h - i][x]);
//         positions.push({y: y + h - i, x})
//     }
//     // console.log(snake);
    
//     return snake;
    
// }
// console.log(matrix);
// console.log('');


// let nMatrix = new Array(h).fill('').map(x => {
//     let z = new Array(w).fill('');
//     return [...z];
// })

// let rotated = [];
// let pos = 0;

// while (h > 1 && w > 1) {
//     let sn1 = snake(pos, pos, h, w, matrix);
//     let desl = r % sn1.length;
//     let rem = sn1.splice(0, desl)
//     sn1.push(...rem);
//     rotated.push(...sn1);

//     pos += 1;
//     h -= 2;
//     w -= 2;
// }

// for(let i = 0; i < rotated.length; i++) {    
//     let {x, y} = positions[i];
//     nMatrix[y][x] = rotated[i];
// }

// console.log(nMatrix);