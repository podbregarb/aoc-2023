import {FileUtils} from "../utils/file-utils";

const testInputFilePath = 'testInput.txt';
const inputFilePath = 'input.txt';

const galaxy = '#';

main();

async function main() {
    const testInput = await FileUtils.readFileAtPath(testInputFilePath);
    const input = await FileUtils.readFileAtPath(inputFilePath);

    console.log(`Test input solution first part: ${solveFirstPart(testInput)}`)
    console.log(`Test input solution second part x 10: ${solveSecondPart(testInput, 10)}`)
    console.log(`Test input solution second part x 100: ${solveSecondPart(testInput, 100)}`)

    console.log(`Input solution first part: ${solveFirstPart(input)}`)
    console.log(`Input solution second part: ${solveSecondPart(input, 1000000)}`)
}

function solveFirstPart(input: string[]): number {
    let sum = 0;
    const doubleRows = getDoubleRows(input);
    const doubleColumns = getDoubleColumns(input);
    const galaxies = getGalaxies(input);
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            sum += getPathLength(galaxies[i], galaxies[j], doubleRows, doubleColumns, 2);
        }
    }
    return sum;
}

function solveSecondPart(input: string[], pathMultiplier: number): number {
    let sum = 0;
    const doubleRows = getDoubleRows(input);
    const doubleColumns = getDoubleColumns(input);
    const galaxies = getGalaxies(input);
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            sum += getPathLength(galaxies[i], galaxies[j], doubleRows, doubleColumns, pathMultiplier);
        }
    }
    return sum;
}

function getPathLength(
    galaxy1: number[],
    galaxy2: number[],
    doubleRows: number[],
    doubleColumns: number[],
    pathMultiplier: number
): number {
    const doubleRowsBetweenGalaxies = doubleRows
        .filter(row => galaxy1[0] < galaxy2[0] ?
            galaxy1[0] < row && row < galaxy2[0] :
            galaxy2[0] < row && row < galaxy1[0]).length;
    const doubleColumnsBetweenGalaxies = doubleColumns
        .filter(column => galaxy1[1] < galaxy2[1] ?
            galaxy1[1] < column && column < galaxy2[1] :
            galaxy2[1] < column && column < galaxy1[1]).length;
    const originalLength = Math.abs(galaxy1[0] - galaxy2[0]) + Math.abs(galaxy1[1] - galaxy2[1]);
    return (pathMultiplier - 1) * (doubleRowsBetweenGalaxies + doubleColumnsBetweenGalaxies) + originalLength;
}

function getGalaxies(input: string[]) {
    // Input:
    // ...#......
    // .......#..
    // #.........
    // ..........
    // ......#...
    // .#........
    // .........#
    // ..........
    // .......#..
    // #...#.....

    let galaxies = [];

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] == galaxy) {
                galaxies.push([i, j]);
            }
        }
    }
    return galaxies;
}

function getDoubleRows(input: string[]) {
    let double: number[] = [];
    for (let i = 0; i < input.length; i++) {
        if (!input[i].match(galaxy)) {
            double.push(i);
        }
    }
    return double;
}

function getDoubleColumns(input: string[]) {
    let double: number[] = [];
    for (let i = 0; i < input[0].length; i++) {
        let empty = true;
        for (let j = 0; j < input.length; j++) {
            if (input[j][i] == galaxy) {
                empty = false;
            }
        }
        if (empty) {
            double.push(i);
        }
    }
    return double;
}

