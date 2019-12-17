const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let st = new Date();

let inp = [];

rl.on('line', (line) => {    
    line == '--' && rl.pause();
    inp = parseInt(line)
}).on('pause', () => {
    calcMult()
})


function calcMult() {
    let count = 0;

    
    while (true) {
        if(prime(inp)) {
            count++
            break;
        }
        let div = false;
        for(let i = 2; i < inp; i++) {
            if (inp % i == 0) {
                inp = inp / i;
                div = true;
                break;
            }
        }
        count++;
        if (!div) break;
    }
    console.log(count);
    

}



function prime(num) {
    for(let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i == 0) return false
    }
    return true
}
