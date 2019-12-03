'use strict';

const fs = require('fs');

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

// Complete the climbingLeaderboard function below.
function climbingLeaderboard(scores, alice) {

    let positions = Array.from(new Set(scores));
    let pos = []
    
    let max = positions.length - 1;

    for(let i = 0; i < alice.length; i++) {    
        pos.push(bSearch(alice[i], positions, 0, max, Math.floor(max/2)) + 1);
    }

    function bSearch(val, arr, str, end, mid) {
        // console.log('S ' + str, ' | E ' + end, ' | M ' + mid);
        
        if (arr[mid] == val) return mid;
        if (mid <= 0 && val > arr[0]) return 0;
        if (mid >= arr.length - 1 && arr[arr.length - 1] > val) return arr.length;
        if (str == end && arr[mid] < val) return mid;
        if (str == end && arr[mid] > val) return mid + 1;
        if (str > end || end < str) return bSearch(val, arr, end, end, mid)

        if (arr[mid] > val) {
            return bSearch(val, arr, mid + 1, end, Math.floor((end + mid + 1) / 2))
        }
        if (arr[mid] < val) {
            return bSearch(val, arr, str, mid - 1, Math.floor((str + mid - 1) / 2))
        }
    }

    return pos

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const scoresCount = parseInt(readLine(), 10);

    const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const aliceCount = parseInt(readLine(), 10);

    const alice = readLine().split(' ').map(aliceTemp => parseInt(aliceTemp, 10));

    let result = climbingLeaderboard(scores, alice);

    ws.write(result.join("\n") + "\n");

    ws.end();
}


// /**
//  * LOCAL SOLUTION
//  */

// const fs = require('fs')
// let inp = [];


// let res = fs.readFileSync('tests.txt', 'utf-8');
// inp = res.split("\r\n");

// let scores = inp[0].split(' ').map(x => parseInt(x))
// let alice = inp[1].split(' ').map(x => parseInt(x))

// let positions = Array.from(new Set(scores));
// let max = positions.length - 1;

// // console.log(positions, alice);


// for(let i = 0; i < alice.length; i++) {    
//     console.log(bSearch(alice[i], positions, 0, max, Math.floor(max/2)));
// }

// function bSearch(val, arr, str, end, mid) {
//     // console.log('S ' + str, ' | E ' + end, ' | M ' + mid);
    
//     if (arr[mid] == val) return mid;
//     if (mid <= 0 && val > arr[0]) return 0;
//     if (mid >= arr.length - 1 && arr[arr.length - 1] > val) return arr.length;
//     if (str == end && arr[mid] < val) return mid;
//     if (str == end && arr[mid] > val) return mid + 1;
//     if (str > end || end < str) return bSearch(val, arr, end, end, mid)

//     if (arr[mid] > val) {
//         return bSearch(val, arr, mid + 1, end, Math.floor((end + mid + 1) / 2))
//     }
//     if (arr[mid] < val) {
//         return bSearch(val, arr, str, mid - 1, Math.floor((str + mid - 1) / 2))
//     }
// }

// // console.log(bSearch(25, [ 100, 50, 40, 20, 10 ], 0, 4, Math.floor(5/2)));

