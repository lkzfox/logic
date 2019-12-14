const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inp = [];

rl.on('line', (line) => {
    line == '--' && rl.pause();
    inp = inp.concat(line);
}).on('pause', () => {
    run();
})
const num = new Array(91);
num[0] = "zero";    
num[1] = "one";
num[2] = "two";
num[3] = "three";
num[4] = "four";
num[5] = "five";
num[6] = "six";
num[7] = "seven";
num[8] = "eight";
num[9] = "nine";
num[10] = "ten";
num[11] = "eleven";
num[12] = "twelve";
num[13] = "thirteen";
num[14] = "fourteen";
num[15] = "fifteen";
num[16] = "sixteen";
num[17] = "seventeen";
num[18] = "eighteen";
num[19] = "nineteen";
num[20] = "twenty";
num[30] = "thirty";
num[40] = "forty";
num[50] = "fifty";
num[60] = "sixty";
num[70] = "seventy";
num[80] = "eighty";
num[90] = "ninety";

function run() {
    for(let i = 0; i < inp.length; i++) {
        let numbers = inp[i].match(/\d+/g);
        for(let j = 0; numbers && j < numbers.length; j++) {
            let writen = convertNumber(numbers[j])
            if (j == 0) {
                if (inp[i].indexOf(numbers[j]) == 0){
                    writen = writen[0].toUpperCase() + writen.slice(1,100);
                }
            }
            inp[i] = inp[i].replace(numbers[j], writen)
        }
        console.log(inp[i]);
    }

}

function convertNumber(number) {
    if (number.length == 1 || number < 20) {
        return num[number];
    }

    let un = number[1];
    let dz = number[0] * 10;

    if (un == 0)
        return num[dz]
    
    return num[dz] + '-' + num[un];
}