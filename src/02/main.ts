import {FileUtils} from "../utils/file-utils";

const testInputFilePath = 'testInput.txt';
const inputFilePath = 'input.txt';

const maxNumberOfCubes: any = {
    "red": 12,
    "green": 13,
    "blue": 14
}

main();

async function main() {
    const testInput = await FileUtils.readFileAtPath(testInputFilePath);
    const input = await FileUtils.readFileAtPath(inputFilePath);

    console.log(`Test input solution first part: ${solveFirstPart(testInput)}`)
    console.log(`Test input solution second part: ${solveSecondPart(testInput)}`)

    console.log(`Input solution first part: ${solveFirstPart(input)}`)
    console.log(`Input solution second part: ${solveSecondPart(input)}`)
}

function solveFirstPart(input: string[]): number {
    let sum = 0;
    for (const inp of input) {
        // "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
        const gameAndSets = inp.split(':');
        // " 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
        const sets = gameAndSets[1].split(';');
        let gameIsPossible = true;
        for (let set of sets) {
            // " 3 blue, 4 red"
            const cubesList = set.split(',');
            for (let cubes of cubesList) {
                const numberAndColor = cubes.trim().split(' ');
                const number = Number(numberAndColor[0]);
                const color = numberAndColor[1];
                if (number > maxNumberOfCubes[color]) {
                    gameIsPossible = false;
                }
            }
        }
        if (gameIsPossible) {
            sum += Number(gameAndSets[0].split(' ')[1])
        }
    }
    return sum;
}

function solveSecondPart(input: string[]): number {
    let sum = 0;
    for (const inp of input) {
        // "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
        // " 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
        const sets = inp.split(':')[1].split(';');
        let minCubes: any = {
            red: 0,
            green: 0,
            blue: 0
        }
        for (let set of sets) {
            // " 3 blue, 4 red"
            const cubesList = set.split(',');
            for (let cubes of cubesList) {
                const numberAndColor = cubes.trim().split(' ');
                const number = Number(numberAndColor[0]);
                const color = numberAndColor[1];
                if (number > minCubes[color]) {
                    minCubes[color] = number;
                }
            }
        }
        sum += (minCubes.red * minCubes.green * minCubes.blue)
    }
    return sum;
}

