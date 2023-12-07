import {FileUtils} from "../utils/file-utils";

const testInputFilePath = 'testInput.txt';
const inputFilePath = 'input.txt';

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
    // Time:      7  15   30
    const times = input[0].split(':')[1].trim().split(' ').filter(Boolean).map(s => Number(s));
    // Distance:  9  40  200
    const distances = input[1].split(':')[1].trim().split(' ').filter(Boolean).map(s => Number(s));
    return getNumberOfPossibleWins(times, distances);
}

function solveSecondPart(input: string[]): number {
    // Time:      7  15   30
    const time = Number(input[0].split(':')[1].trim().split(' ').filter(Boolean).join(''));
    // Distance:  9  40  200
    const distance = Number(input[1].split(':')[1].trim().split(' ').filter(Boolean).join(''));
    return getNumberOfPossibleWins([time], [distance]);
}

function getNumberOfPossibleWins(times: number[], distances: number[]) {
    let numberOfPossibleWins = 1;
    for (let i = 0; i < times.length; i++) {
        let sum = 0;
        const minDistanceToWin = distances[i];
        for (let j = 1; j < times[i]; j++) {
            const speed = j;
            const remainingTime = times[i] - j;
            if (speed * remainingTime > minDistanceToWin) {
                sum += 1;
            }
        }
        numberOfPossibleWins *= sum;
    }
    return numberOfPossibleWins;
}

