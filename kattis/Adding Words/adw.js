const fs = require('fs')
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
    
    const definitions = new Map();

    let commands = inp.map(x => x.split(' '))

    const calculate = cmd => {
        // console.log(cmd);
        let result = 0;
        let response = '';
        for(let i = 1; i < cmd.length - 1; i += 2) {
            
            if (definitions.get(cmd[i]) == undefined) {
                response = null;
                break;
            }

            if (i > 1 && cmd[i-1] == '-') {
                result -= parseInt(definitions.get(cmd[i]));
            } else {
                result += parseInt(definitions.get(cmd[i]));
            }

        }

        definitions.forEach((val, key) => {
            
            if (response !== null && val == result) {
                response = key;
            }
        })

        if (response == null || response == '') response = 'unknown'

        return cmd.slice(1, cmd.length).join(' ') + ' ' + response;
    }

    const execute = cmd => {
        switch (cmd[0]) {
            case 'def':
                definitions.set(cmd[1], cmd[2]);
                break;
            case 'calc':
                console.log(calculate(cmd));
                break;
            default:
                definitions.clear();
        }
    }

    commands.forEach(cmd => {
        execute(cmd);
    })
})