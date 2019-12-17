const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let st = new Date();

let inp = [];
let primes = [2];

for(let i = 3; i < 32000; i+=2) {
    if (prime(i))
        primes.push(i)
}

function bb (element, start, end) {
    let mid = Math.floor((end + start) / 2);
    let value = primes[mid];
    if (value == element) return mid;
    if (start >= end) return -1;
    if (element < value) {
        return bb(element, start, mid - 1)
    } else {
        return bb(element, mid + 1, end)
    }
}


rl.on('line', (line) => {    
    line == '--' && rl.pause();
    inp.push(parseInt(line))
}).on('pause', () => {
    
    for(let i = 1; i < inp.length; i ++){
        calculate(inp[i])
    }
    
})


function calculate(num) {
    let listaValores = [];
    for(let i = 0; primes[i] <= num/2; i++) {
        if (bb(num - primes[i], 0, primes.length) > -1)
            listaValores.push({v1: primes[i], v2: num - primes[i]});
    }
    console.log(`${num} has ${listaValores.length} representation(s)`);
    listaValores.forEach(x => {
        console.log(`${x.v1}+${x.v2}`);
    })
    console.log('');

}

function prime(num) {
    for(let i = 2; i <= num / 2; i++) {
        if (num % i == 0) return false
    }
    return true
}
