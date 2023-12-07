import {FileUtils} from "../utils/file-utils";

const testInputFilePath = 'testInput.txt';
const inputFilePath = 'input.txt';

main();

async function main() {
    const testInput = await FileUtils.readFileAtPath(testInputFilePath, '\n\n');
    const input = await FileUtils.readFileAtPath(inputFilePath, '\n\n');

    console.log(`Test input solution first part: ${solveFirstPart(testInput)}`)
    console.log(`Test input solution second part: ${solveSecondPart(testInput)}`)

    console.log(`Input solution first part: ${solveFirstPart(input)}`)
    console.log(`Input solution second part: ${solveSecondPart(input)}`)
}

function solveFirstPart(input: string[]): number {
    let seeds = input[0].split(':')[1].trim().split(' ').map(s => Number(s));
    for (let i = 1; i < input.length; i++) {
        seeds = mapTo(seeds, input[i]);
    }
    return Math.min(...seeds);
}

function mapTo(seeds: number[], mapping: string): number[] {
    const ranges = mapping.split(':')[1].trim().split('\n').map(s => s.split(' ').map(s => Number(s)));
    let mappedTo: number[] = [];
    for (let i = 0; i < seeds.length; i++) {
        for (let j = 0; j < ranges.length; j++) {
            const destinationRange = ranges[j][0];
            const sourceRange = ranges[j][1];
            const rangeLength = ranges[j][2];
            if (sourceRange <= seeds[i] && seeds[i] < (sourceRange + rangeLength)) {
                if (!mappedTo[i]) {
                    mappedTo.push(seeds[i] + (destinationRange - sourceRange));
                }
            }
        }
        if (!mappedTo[i]) {
            mappedTo.push(seeds[i]);
        }
    }
    return mappedTo;
}

function solveSecondPart(input: string[]): number {
    let sum = 0;
    return sum;
}

