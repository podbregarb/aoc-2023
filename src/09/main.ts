import {FileUtils} from "../utils/file-utils";

const testInputFilePath = 'testInput.txt';
const inputFilePath = 'input.txt';

main();

async function main() {
    const testInput = await FileUtils.readFileAtPath(testInputFilePath);
    const input = await FileUtils.readFileAtPath(inputFilePath);

    console.log(`Test input solution first part: ${solve(testInput)}`)
    console.log(`Test input solution second part: ${solve(testInput, false)}`)

    console.log(`Input solution first part: ${solve(input)}`)
    console.log(`Input solution second part: ${solve(input, false)}`)
}

function solve(input: string[], next = true): number {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        // 0 3 6 9 12 15
        const sequence = input[i].split(' ').map(s => Number(s));
        const differences = getDifferences([sequence]);
        const newSequenceElement = getNewSequenceElement(differences, next);
        sum += newSequenceElement;
    }
    return sum;
}

function getNewSequenceElement(differences: number[][], next = true) {
    let difference = 0;
    for (let i = differences.length - 1; i > 0; i--) {
        if (next) {
            difference += differences[i][differences[i].length - 1];
        } else {
            difference = differences[i][0] - difference;
        }
    }
    const startingElementIndex = next ? differences[0].length - 1 : 0;
    const startingElement = differences[0][startingElementIndex];
    return next ? startingElement + difference : startingElement - difference;
}

function getDifferences(sequences: number[][]): number[][] {
    if (sequences[sequences.length - 1].filter(n => n != 0).length == 0) {
        return sequences;
    }
    let newSequence: number[] = [];
    for (let i = 1; i < sequences[sequences.length - 1].length; i++) {
        newSequence.push(sequences[sequences.length - 1][i] - sequences[sequences.length - 1][i - 1]);
    }
    sequences.push(newSequence);
    return getDifferences(sequences);
}
