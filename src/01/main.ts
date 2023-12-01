import * as fs from 'fs';

const testInputFilePath = 'testInput.txt';
const testInput2FilePath = 'testInput2.txt';
const inputFilePath = 'input.txt';

const numberMapping: any = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
}

main();

function readFileAtPath(filePath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            const rows = data.split('\n').map(line => line.trim());
            resolve(rows);
        });
    });
}

function findFirstNumber(chars: string): string {
    const match = chars.match(/\d/);
    if (match) {
        return match[0];
    } else {
        return '';
    }
}

function solveFirstPart(input: string[]): number {
    let sum = 0;
    for (let row of input) {
        const strNumber = findFirstNumber(row) + findFirstNumber(row.split('').reverse().join(''));
        sum += Number(strNumber)
    }
    return sum;
}

function findFirstNumberOrDescriptiveNumber(chars: string, reverse: boolean): string {
    for (let i = 0; i < chars.length; i++) {
        if (Number(chars[i])) {
            return chars[i];
        } else {
            const s = Object.keys(numberMapping).find(
                descriptiveNumber => chars.substring(i).startsWith(
                    reverse ? descriptiveNumber.split('').reverse().join('') : descriptiveNumber));
            if (s) {
                return numberMapping[s].toString();
            }
        }
    }
    return '';
}

function solveSecondPart(input: string[]): number {
    let sum = 0;
    for (let row of input) {
        const strNumber = findFirstNumberOrDescriptiveNumber(row, false) +
            findFirstNumberOrDescriptiveNumber(row.split('').reverse().join(''), true);
        sum += Number(strNumber)
    }
    return sum;
}

async function main() {
    const testInput = await readFileAtPath(testInputFilePath);
    const testInput2 = await readFileAtPath(testInput2FilePath);
    const input = await readFileAtPath(inputFilePath);

    console.log(`Test input solution first part: ${solveFirstPart(testInput)}`)
    console.log(`Test input solution second part: ${solveSecondPart(testInput2)}`)

    console.log(`Input solution first part: ${solveFirstPart(input)}`)
    console.log(`Input solution second part: ${solveSecondPart(input)}`)
}

