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


function run() {
    for(let i = 0; i < inp.length; i++) {
        checkCicles(inp[i]);
    }

}

function checkCicles(data) {
    let [M , P, L, E, R, S, N] = data.split(' ');
    for(let i = 0; i < parseInt(N); i++) {
        let nc = [
            Math.floor(P/S), 
            Math.floor(L/R), 
            M * E
        ];
        
        [M, P, L] = [...nc];
        
    }
    console.log(M);
    
}