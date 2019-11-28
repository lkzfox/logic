const readline = require('readline');

const PERSON = '@'
const FIRE = '*'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inp = [];

rl.on('line', (line) => {
    line == '--' && rl.pause();
    inp = inp.concat(line);
}).on('pause', () => {
    getTests();
    return 0;
})

const getTests = () => {
    let cases = parseInt(inp[0]);
    let testPos = 1, idx = 0;
    let map, test, positions;
    while (idx < cases) {
        const [w, h] = inp[testPos].split(" ").map(v => parseInt(v));        
        map = inp.slice(testPos + 1, testPos + h + 1).map(e =>  e.split(""));
        test = {
            map,
            w,
            h,
        }
        positions = getPositions(test);
        let steps = 0;


        while (true) {
            let result = fill(positions, map, w, h);
            steps++;

            if (result.survided) {
                console.log(steps);
                break;                
            } else if (result.survided === false) {
                console.log('IMPOSSIBLE');
                break                
            }

            positions = result.positions;
            map = result.map;

        }

        testPos += h+1;
        idx++
    }
    
}

const getPositions = test => {
    let positions = [];
    let map = test.map;
    map.forEach((e, y) => {        
        for(let x = 0; x < e.length; x++) {
            if (map[y][x] == PERSON || map[y][x] == FIRE) {
                positions.push({x, y, char: map[y][x]})
            }
        }
    })

    return positions;
}

const canMove = (char, square) => {
    if (char == PERSON) return square == '.';
    if (char == FIRE) return (square == '.') || (square == PERSON);
    return false;
}

const isEdge = (x, y, w, h) => {
    return (y == 0) ||
    (y == h - 1) ||
    (x == 0) ||
    (x == w - 1);
}

const fill = (positions, map, w, h) => {
    
    
    let personPositions = positions.filter(p => p.char == '@');
    for(let i = 0; i < personPositions.length; i++) {
        let pos = personPositions[i];
        let {x, y} = pos;
        if (isEdge(x, y, w, h) && map[y][x] != FIRE) {            
            return {survided: true, steps: 0}
        }
    }
    
    
    let newPositions = [];
    for (let i = 0; i < positions.length; i++) {
        let pos = positions[i];
        let {x, y, char} = pos;
        let per = char == PERSON;
        
        if (y - 1 >= 0 && canMove(char, map[y - 1][x])) {
            map[y - 1][x] = char;
            newPositions.push({x, y: y - 1, char});
        } 

        if (y + 1 < h && canMove(char, map[y + 1][x])) {
            map[y + 1][x] = char;
            newPositions.push({x, y: y + 1, char});
        }  

        if (x + 1 < w && canMove(char, map[y][x + 1])) {
            map[y][x + 1] = char;
            newPositions.push({x: x + 1, y, char});
        }  

        if (x - 1 >= 0 && canMove(char, map[y][x - 1])) {
            map[y][x - 1] = char;
            newPositions.push({x: x - 1, y, char});
        }   
    }    

    if (newPositions.length > 0) {        
        return {positions: newPositions, map, w, h};
    } else {        
        return {survided: false};      
    }
        
}