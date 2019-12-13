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
    for(let i = 1; i < inp.length; i++) {
        checkStudent(inp[i]);
    }

}

function checkStudent(student) {
    let [name, start, birth, courses] = student.split(' ');

    let startYear = new Date(start);
    if (startYear.getFullYear() > 2009) {
        console.log(name, 'eligible')
        return;
    }
    
    let bornYear = new Date(birth);
    if (bornYear.getFullYear() > 1990) {
        console.log(name, 'eligible')
        return;
    }

    if (courses/5 > 8) {
        console.log(name, 'ineligible')
        return;
    }

    console.log(name, 'coach petitions')
    return;
}