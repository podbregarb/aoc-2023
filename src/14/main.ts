import {FileUtils} from "../utils/file-utils";

const testInputFilePath = 'testInput.txt';
const inputFilePath = 'input.txt';

const emptySpace = '.';
const roundRock = 'O';
const cubeRock = '#';

main();

async function main() {
    const testInput = await FileUtils.readFileAtPath(testInputFilePath);
    const input = await FileUtils.readFileAtPath(inputFilePath);

    console.log(`Test input solution first part: ${solveFirstPart(testInput)}`)
    //console.log(`Test input solution second part: ${solveSecondPart(testInput)}`)

    console.log(`Input solution first part: ${solveFirstPart(input)}`)
    //console.log(`Input solution second part: ${solveSecondPart(input)}`)
}

function solveFirstPart(input: string[]): number {
    // input
    // O....#....
    // O.OO#....#
    // .....##...
    // OO.#O....O
    // .O.....O#.
    // O.#..O.#.#
    // ..O..#O..O
    // .......O..
    // #....###..
    // #OO..#....

    let sum = 0;

    for (let j = 0; j < input[0].length; j++) {
        let rowLoad = input.length;
        for (let i = 0; i < input.length; i++) {
            if (input[i][j] == cubeRock) {
                rowLoad = input.length - i - 1;
            } else if (input[i][j] == roundRock) {
                sum += rowLoad;
                rowLoad--;
            }
        }
    }

    return sum;
}
